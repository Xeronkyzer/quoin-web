import "dotenv/config"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createHmac } from "crypto"
import { Redis } from "@upstash/redis"

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5
const DEDUPLICATION_WINDOW_MS = 15 * 60_000
const IS_PRODUCTION = process.env.VERCEL_ENV === "production"

type RateLimitEntry = {
  count: number
  resetAt: number
}

const memoryRateBuckets = new Map<string, RateLimitEntry>()
const memorySubmissions = new Map<string, number>()

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return ""
  return value
    .replace(/\u0000/g, "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, maxLength)
}

/**
 * Defensive mitigation against CSV/Spreadsheet Formula Injection.
 * Escapes leading formula command characters (=, +, -, @, tab, cr).
 */
function sanitizeForSpreadsheet(value: string): string {
  if (!value) return ""
  const trimmed = value.trim()
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`
  }
  return trimmed
}

/**
 * Validates outbound webhooks to prevent Server-Side Request Forgery (SSRF).
 */
function isSafeGoogleScriptUrl(url: string | undefined): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === "https:" && parsed.hostname === "script.google.com"
    )
  } catch {
    return false
  }
}

/**
 * Vercel supplies this header at the edge. Do not trust generic forwarding
 * headers, which a caller may be able to supply themselves.
 */
function getClientIp(req: VercelRequest): string {
  const vercelIp = req.headers["x-vercel-forwarded-for"]
  if (vercelIp && typeof vercelIp === "string") {
    return vercelIp.split(",")[0].trim()
  }

  return req.socket?.remoteAddress || "127.0.0.1"
}

function getInternalSalt(): string | null {
  const salt = process.env.INTERNAL_SALT?.trim()
  return salt || null
}

async function takeRateLimit(
  key: string,
): Promise<{
  allowed: boolean
  retryAfterSeconds: number
}> {
  if (!redis) {
    const now = Date.now()
    const existing = memoryRateBuckets.get(key)

    if (!existing || existing.resetAt <= now) {
      memoryRateBuckets.set(key, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      })
      return { allowed: true, retryAfterSeconds: 0 }
    }

    if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((existing.resetAt - now) / 1000),
        ),
      }
    }

    existing.count += 1
    return { allowed: true, retryAfterSeconds: 0 }
  }

  const p = redis.pipeline()
  p.incr(`rate:sub:${key}`)
  p.pttl(`rate:sub:${key}`)
  const [count, ttl] = await p.exec<[number, number]>()

  if (count === 1 || ttl === -1) {
    await redis.pexpire(`rate:sub:${key}`, RATE_LIMIT_WINDOW_MS)
  }

  if (count > MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds:
        ttl > 0
          ? Math.ceil(ttl / 1000)
          : Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

async function isDuplicateSubmission(
  ip: string,
  email: string,
): Promise<boolean> {
  const saltSecret = getInternalSalt()
  if (!saltSecret) return false
  const fingerprint = createHmac("sha256", saltSecret)
    .update(`${ip}\u0000${email}\u0000newsletter`)
    .digest("hex")

  if (!redis) {
    const now = Date.now()
    for (const [key, expiresAt] of memorySubmissions.entries()) {
      if (expiresAt <= now) memorySubmissions.delete(key)
    }
    if (memorySubmissions.has(fingerprint)) return true
    memorySubmissions.set(fingerprint, now + DEDUPLICATION_WINDOW_MS)
    return false
  }

  const set = await redis.setnx(`sub:${fingerprint}`, 1)
  if (set === 1) {
    await redis.pexpire(`sub:${fingerprint}`, DEDUPLICATION_WINDOW_MS)
    return false
  }
  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & Strict Origin Validation
  const allowedOrigins = new Set(
    [
      "http://localhost:5173",
      "http://localhost:8443",
      "http://localhost:3000",
      "http://localhost:3001",
      ...(process.env.PORT ? [`http://localhost:${process.env.PORT}`] : []),
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "",
      process.env.ALLOWED_ORIGIN || "",
      process.env.PRODUCTION_DOMAIN
        ? `https://${process.env.PRODUCTION_DOMAIN}`
        : "",
      "https://quoin.online",
      "https://www.quoin.online",
    ].filter(Boolean),
  )

  let origin = req.headers.origin
  if (!origin && req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin
    } catch {
      origin = undefined
    }
  }

  const isLocalhost = origin
    ? /^http:\/\/localhost(:\d+)?$/.test(origin)
    : false
  const isVercelPreview =
    origin &&
    /^https:\/\/(quoin|quoin-web)(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)

  const isAllowed =
    !origin || isLocalhost || allowedOrigins.has(origin) || isVercelPreview

  if (origin && isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    if (origin && !isAllowed) {
      return res.status(403).end()
    }
    return res.status(200).end()
  }

  if (origin && !isAllowed) {
    console.warn(`[SECURITY] Blocked cross-origin request from: ${origin}`)
    return res.status(403).json({ error: "Forbidden: Invalid Origin." })
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed." })
  }

  if (!getInternalSalt() || (IS_PRODUCTION && !redis)) {
    console.error("[SECURITY] Required anti-abuse configuration is missing.")
    return res.status(503).json({
      error:
        "Subscription service is temporarily unavailable. Please try again later.",
    })
  }

  if (!process.env.WEBHOOK_SECRET?.trim()) {
    console.error(
      "[SECURITY] WEBHOOK_SECRET is required to forward subscriptions.",
    )
    return res.status(503).json({
      error:
        "Subscription service is temporarily unavailable. Please try again later.",
    })
  }

  const ip = getClientIp(req)
  const rateLimit = await takeRateLimit(ip)

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds))
    return res.status(429).json({
      error: "Too many requests. Please wait a moment and try again.",
    })
  }

  const body = req.body && typeof req.body === "object" ? req.body : {}

  // Anti-spam honeypot
  if (body._hp_website) {
    return res.status(200).json({
      success: true,
      message: "Subscription confirmed.",
    })
  }

  const email = cleanText(body.email, 254).toLowerCase()
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!email || !emailIsValid) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." })
  }

  const duplicate = await isDuplicateSubmission(ip, email)
  if (duplicate) {
    return res.status(200).json({
      success: true,
      duplicate: true,
      message: "You are already subscribed. Thank you!",
    })
  }

  const GOOGLE_SHEET_SUBSCRIBE_URL = process.env.GOOGLE_SHEET_SUBSCRIBE_URL

  if (
    !GOOGLE_SHEET_SUBSCRIBE_URL ||
    !isSafeGoogleScriptUrl(GOOGLE_SHEET_SUBSCRIBE_URL)
  ) {
    console.error(
      "[SECURITY] Invalid or unconfigured GOOGLE_SHEET_SUBSCRIBE_URL.",
    )
    return res.status(500).json({
      error:
        "Subscription service is temporarily unavailable. Please try again later.",
    })
  }

  try {
    const rawSource = cleanText(body.source, 60) || "Website Newsletter"
    const sheetResponse = await fetch(GOOGLE_SHEET_SUBSCRIBE_URL, {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WEBHOOK_SECRET
          ? { "x-webhook-secret": process.env.WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        email: sanitizeForSpreadsheet(email),
        source: sanitizeForSpreadsheet(rawSource),
        status: "Active",
        ...(process.env.WEBHOOK_SECRET
          ? { secret: process.env.WEBHOOK_SECRET }
          : {}),
      }),
    })
    if (!sheetResponse.ok) {
      throw new Error(`Google Sheets returned HTTP ${sheetResponse.status}`)
    }

    const sheetData = (await sheetResponse.json().catch(() => ({}))) as Record<
      string,
      unknown
    >
    if (sheetData.error) {
      throw new Error(`Google Sheets returned error: ${sheetData.error}`)
    }
  } catch (err) {
    console.error(
      "Failed to forward newsletter subscription to Google Sheets:",
      err,
    )
    return res.status(502).json({
      error:
        "Subscription service is temporarily unavailable. Please try again later.",
    })
  }

  return res.status(200).json({
    success: true,
    message: "Thank you for subscribing! We'll keep you updated.",
  })
}
