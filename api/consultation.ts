import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createHash } from "crypto"
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

function getClientIp(req: VercelRequest): string {
  const vercelIp =
    req.headers["x-real-ip"] || req.headers["x-vercel-forwarded-for"]
  if (vercelIp && typeof vercelIp === "string")
    return vercelIp.split(",")[0].trim()

  const forwarded = req.headers["x-forwarded-for"]
  const forwardedIp = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]

  return forwardedIp?.trim() || req.socket?.remoteAddress || "127.0.0.1"
}

async function takeRateLimit(
  key: string,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
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
  p.incr(`rate:consult:${key}`)
  p.pttl(`rate:consult:${key}`)
  const [count, ttl] = await p.exec<[number, number]>()

  if (count === 1 || ttl === -1) {
    await redis.pexpire(`rate:consult:${key}`, RATE_LIMIT_WINDOW_MS)
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
  phone: string,
  service: string,
): Promise<boolean> {
  const fingerprint = createHash("sha256")
    .update(`${ip}\u0000${email}\u0000${phone}\u0000${service}`)
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

  const set = await redis.setnx(`consult:${fingerprint}`, 1)
  if (set === 1) {
    await redis.pexpire(`consult:${fingerprint}`, DEDUPLICATION_WINDOW_MS)
    return false
  }
  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & Origin Validation
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
      "https://quoin.example.com",
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

  const isLocalhost = origin ? /^http:\/\/localhost(:\d+)?$/.test(origin) : false
  const isVercelPreview =
    origin &&
    /^https:\/\/(quoin|quoin-web)(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)

  const isAllowed =
    !origin ||
    isLocalhost ||
    allowedOrigins.has(origin) ||
    isVercelPreview

  res.setHeader(
    "Access-Control-Allow-Origin",
    origin && isAllowed ? origin : "*",
  )
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
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

  const ip = getClientIp(req)
  const rateLimit = await takeRateLimit(ip)

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds))
    return res.status(429).json({
      error: "Too many requests. Please wait a moment and try again.",
    })
  }

  const body = req.body && typeof req.body === "object" ? req.body : {}
  const name = cleanText(body.name, 120).replace(/\s+/g, " ")
  const email = cleanText(body.email, 254).toLowerCase()
  const phone = cleanText(body.phone, 40).replace(/\s+/g, " ")
  const service = cleanText(body.service, 100) || "General Consultation"
  const message = cleanText(body.message, 2000).replace(/\s+/g, " ")

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const phoneDigits = phone.replace(/\D/g, "")

  if (!name || name.length < 2) {
    return res.status(400).json({ error: "Please enter your full name." })
  }

  if (!email || !emailIsValid) {
    return res
      .status(400)
      .json({ error: "Please provide a valid work email address." })
  }

  if (phoneDigits.length < 6 || phoneDigits.length > 15) {
    return res
      .status(400)
      .json({ error: "Please provide a valid phone number." })
  }

  if (!service) {
    return res.status(400).json({ error: "Please select a service." })
  }

  if (!message || message.length < 5) {
    return res
      .status(400)
      .json({ error: "Please provide a brief message describing your goal." })
  }

  const duplicate = await isDuplicateSubmission(ip, email, phone, service)
  if (duplicate) {
    return res.status(200).json({
      success: true,
      duplicate: true,
      message: "Your consultation request has already been received.",
    })
  }

  const GOOGLE_SHEET_URL =
    process.env.GOOGLE_SHEET_URL ||
    "https://script.google.com/macros/s/AKfycbwNW360QUZrhZFVtVYwsOUNem5_8eXQB66Ko-qSxOdoZnnVJlTJVsjimE8ditj8WzfYBA/exec"

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        message,
        timestamp: new Date().toISOString(),
      }),
    })

    return res.status(200).json({
      success: true,
      message: "Consultation request successfully received.",
    })
  } catch (err) {
    console.error("Failed to forward consultation to Google Sheets:", err)
    return res.status(502).json({
      error:
        "Unable to record consultation request at this time. Please email us directly.",
    })
  }
}
