import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { CustomCursor } from "./CustomCursor"
import { useSmoothScroll, smoothScrollTo } from "./useSmoothScroll"
import { TermsPage, PrivacyPage, RefundPage } from "./LegalPages"

export const services = [
  {
    number: "01",
    letter: "W",
    title: "Web Scraping",
    link: "/scraping",
    audience: "For teams that need structured public web data",
    description:
      "Public web data collected, cleaned, and delivered in a format that fits your workflow.",
    features: [
      "Dynamic and browser-based extraction",
      "Custom fields and crawling",
      "Structured, usable outputs",
    ],
    setup: "From $99 setup",
    monthly: "Project or recurring",
    price: "From $99",
  },
  {
    number: "02",
    letter: "K",
    title: "Internal Knowledge Assistant",
    link: "/knowledge-assistant",
    audience: "For service businesses with 20–100 employees",
    description:
      "A company-specific assistant that helps your team find answers across SOPs, handbooks, and approved knowledge sources.",
    features: [
      "Private, company-specific chatbot",
      "SOP and handbook ingestion",
      "Knowledge updates",
    ],
    setup: "From $299 setup",
    monthly: "From $250 / month",
    price: "From $299",
  },
  {
    number: "03",
    letter: "S",
    title: "SEO & Search Intelligence",
    link: "/seo",
    audience: "For businesses focused on search visibility",
    description:
      "Research, track, and understand your search visibility with structured intelligence and reporting.",
    features: [
      "Rankings, clicks, and competitors",
      "Search performance audit",
      "Actionable recommendations",
    ],
    monthly: "From $99 / month",
    price: "From $99/mo",
  },
]

const process = [
  {
    title: "Consultation",
    phase: "Fit and scope",
    text: "We confirm fit, scope, and the business decisions the service needs to support.",
    output: "Defined brief",
  },
  {
    title: "Configuration",
    phase: "Secure setup",
    text: "We collect the required sources and configure your workflow around the agreed scope.",
    output: "Working system",
  },
  {
    title: "Delivery",
    phase: "Operating rhythm",
    text: "You receive the agreed output on a clear, dependable schedule.",
    output: "First delivery",
  },
  {
    title: "Review",
    phase: "Continuous refinement",
    text: "We review the output, answer questions, and refine the service as needed.",
    output: "Monthly review",
  },
]

const faqs = [
  {
    question: "Are there long-term contracts?",
    answer:
      "No. Managed services are billed monthly after the initial setup or audit. You can cancel before the next billing cycle.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most engagements begin within one to two weeks of the consultation, depending on access to the required data and documents.",
  },
  {
    question: "How is our information handled?",
    answer:
      "We only request the access needed to deliver the service. Details about data handling, retention, and permissions are agreed during configuration.",
  },
  {
    question: "Can a service be customized?",
    answer:
      "The standard packages are intentionally focused. If you need additional locations, competitors, or document sources, we can scope those separately.",
  },
]

const chatbotKnowledge = [
  {
    keywords: [
      "contract",
      "long-term",
      "lock",
      "commitment",
      "cancel",
      "cancellation",
    ],
    answer:
      "Engagement and cancellation terms depend on the agreed service and written scope. For recurring work, please review the Refund & Cancellation Policy before the next billing cycle or ask us to clarify the terms for your proposed scope.",
  },
  {
    keywords: [
      "start",
      "started",
      "begin",
      "onboard",
      "timeline",
      "how long",
      "when",
    ],
    answer:
      "Timing depends on the agreed scope, source access, and technical requirements. We can assess feasibility and provide a proposed timetable during scoping, but we do not promise a start or delivery date before that work is agreed.",
  },
  {
    keywords: [
      "data",
      "information",
      "security",
      "privacy",
      "safe",
      "secure",
      "handle",
    ],
    answer:
      "We request only the access needed for the agreed work, and the relevant data-handling details are set during scoping and configuration. For the current policy on personal data, retention, and safeguards, please review Quoin's Privacy Policy or ask us about your specific use case.",
  },
  {
    keywords: [
      "custom",
      "customize",
      "modify",
      "change",
      "tailor",
      "additional",
    ],
    answer:
      "The public services are focused, but a scope can be tailored around your sources, requirements, and workflow. We can discuss any additional locations, competitors, integrations, or document sources during scoping.",
  },
  {
    keywords: [
      "price",
      "pricing",
      "cost",
      "fee",
      "charge",
      "expensive",
      "afford",
      "budget",
      "pay",
      "payment",
    ],
    answer:
      "Our published starting points are From $99 one-time for Web Scraping & Data Extraction, From $299 one-time setup for an Internal Knowledge Assistant, and From $99 per month for SEO & Search Intelligence. These are starting points rather than fixed quotes; the final scope and price are confirmed in writing after scoping.",
  },
  {
    keywords: [
      "competitor",
      "price intelligence",
      "monitor",
      "tracking",
      "e-commerce",
      "ecommerce",
    ],
    answer:
      "Quoin can scope public-web data extraction around the sources, fields, format, and cadence you need. We confirm the practical and permitted collection approach before committing to a project rather than promising a fixed monitoring package.",
  },
  {
    keywords: [
      "knowledge",
      "assistant",
      "chatbot",
      "sop",
      "handbook",
      "internal",
      "employee",
    ],
    answer:
      "An Internal Knowledge Assistant can organize approved documents, SOPs, handbooks, and other internal sources into a searchable assistant. Its sources, access controls, integrations, and update process are defined around your organization during scoping.",
  },
  {
    keywords: [
      "local",
      "search",
      "seo",
      "ranking",
      "google",
      "business",
      "dentist",
      "lawyer",
      "hvac",
    ],
    answer:
      "SEO & Search Intelligence can be scoped around keyword research, search visibility, rankings, competitors, audits, and supported data sources. It provides research and monitoring; it does not guarantee rankings, traffic, or business results.",
  },
  {
    keywords: ["process", "how", "work", "step", "workflow"],
    answer:
      "A typical engagement moves through consultation, configuration, delivery, and review. The exact milestones, sources, outputs, and cadence are agreed for the particular scope rather than assumed in advance.",
  },
  {
    keywords: [
      "consult",
      "consultation",
      "call",
      "meeting",
      "book",
      "schedule",
      "talk",
    ],
    answer:
      "You can book a free scoping consultation through our website. It is a focused first conversation to understand your requirements and assess fit; any scope, price, or timeline is confirmed separately in writing.",
  },
  {
    keywords: ["refund", "money back", "guarantee"],
    answer:
      "Refund and cancellation outcomes depend on the current Refund & Cancellation Policy and the agreed scope. Please review the policy before relying on a specific outcome, or ask the team to clarify how it applies to your proposed engagement.",
  },
  {
    keywords: [
      "ai",
      "artificial intelligence",
      "automated",
      "machine learning",
    ],
    answer:
      "Some Quoin services can include AI-assisted workflows and knowledge systems. The appropriate sources, access controls, review process, and limitations are scoped for the use case; important business decisions should remain subject to suitable human review.",
  },
  {
    keywords: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "sup",
    ],
    answer:
      "Hey there. Welcome to Quoin. I'm here to help you understand our services, pricing, and process. What would you like to know?",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
    answer:
      "You're welcome. If you have more questions later, I'm always here. You can also book a free consultation to talk to our team directly.",
  },
  {
    keywords: ["who", "about", "quoin", "company", "what do you do"],
    answer:
      "Quoin provides operational intelligence through Web Scraping & Data Extraction, Internal Knowledge Assistants, and SEO & Search Intelligence. The website shows clear starting points and service descriptions; a written scope confirms the deliverables for a specific engagement.",
  },
  {
    keywords: ["newsletter", "subscribe", "mailing list", "updates"],
    answer:
      "You can subscribe to our newsletter directly by sharing your email address with me right here, or using the newsletter box on our homepage. We share monthly field notes on automation and operational intelligence.",
  },
]

const chatTopics = [
  { label: "Pricing", query: "pricing" },
  { label: "Getting started", query: "how to start" },
  { label: "Data security", query: "data security" },
  { label: "Services", query: "what do you do" },
  { label: "Process", query: "how does it work" },
  { label: "Book a call", query: "consultation" },
  { label: "Newsletter", query: "subscribe to newsletter" },
]

function findBestAnswer(input: string): string {
  const lower = input.toLowerCase()
  let bestMatch = { score: 0, answer: "" }
  for (const item of chatbotKnowledge) {
    let score = 0
    for (const keyword of item.keywords) {
      if (lower.includes(keyword)) score += keyword.length
    }
    if (score > bestMatch.score) {
      bestMatch = { score, answer: item.answer }
    }
  }
  if (bestMatch.score > 0) return bestMatch.answer
  return "I'm not sure about that one. You can browse the topics above or book a free consultation to speak with our team directly. We're happy to help."
}

type ChatMessage = {
  role: "user" | "bot"
  text: string
  action?: string
}

function Chatbot({ navigate }: { navigate: (path: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi, I'm Quoin's assistant. Ask me anything about our services, pricing, or process — or pick a topic below.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function scrollToBottom() {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 50)
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return
    const userText = text.trim()
    const userMsg: ChatMessage = { role: "user", text: userText }

    // We need the current history to send to Gemini
    const currentHistory = [...messages]

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)
    scrollToBottom()

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: currentHistory }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        const fallbackText = data.error || findBestAnswer(userText)
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: fallbackText,
            action: "book_consultation",
          },
        ])
        return
      }

      let botText = data.response || findBestAnswer(userText)
      let action = undefined

      if (data.action === "SUBMIT_LEAD" && data.lead) {
        // Securely handled by the backend edge function now!
        botText +=
          "\n\nI've successfully submitted your requirements to our team! We will be in touch shortly."
      } else if (data.action === "SUBSCRIBE_NEWSLETTER") {
        botText +=
          "\n\nYou've been successfully subscribed to our newsletter list!"
      } else if (data.duplicateLead) {
        botText +=
          "\n\nYour requirements have already been submitted. We'll be in touch soon!"
      } else if (data.action === "BOOK_CONSULTATION") {
        action = "book_consultation"
      }

      setMessages((prev) => [...prev, { role: "bot", text: botText, action }])
    } catch (e) {
      const fallbackText = findBestAnswer(userText)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: fallbackText,
          action: "book_consultation",
        },
      ])
    } finally {
      setIsTyping(false)
      if (!isOpen) setHasUnread(true)
      scrollToBottom()
    }
  }

  function handleTopicClick(query: string) {
    sendMessage(query)
  }

  function toggleChat() {
    setIsOpen((open) => !open)
    if (!isOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">Q</div>
              <div>
                <strong>Quoin Assistant</strong>
                <span>Services, pricing &amp; policies</span>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1 1 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                {msg.role === "bot" && (
                  <div className="chatbot-msg-avatar">Q</div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="chatbot-msg-bubble">
                    {msg.text.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.action === "book_consultation" && (
                    <button
                      className="button button-acid"
                      style={{
                        fontSize: "14px",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        alignSelf: "flex-start",
                        marginTop: "4px",
                      }}
                      onClick={() => {
                        setIsOpen(false)
                        navigate("/consultation")
                      }}
                    >
                      Book a consultation <Arrow />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-msg chatbot-msg-bot">
                <div className="chatbot-msg-avatar">Q</div>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="chatbot-topics">
              {chatTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  className="chatbot-topic-chip"
                  onClick={() => handleTopicClick(topic.query)}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          )}

          <form
            className="chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault()
              if (!isTyping && messages.length < 20) {
                sendMessage(input)
              }
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                messages.length >= 20
                  ? "Conversation limit reached."
                  : "Type your question…"
              }
              className="chatbot-input"
              disabled={isTyping || messages.length >= 20}
              maxLength={300}
            />
            <button
              type="submit"
              className="chatbot-send"
              disabled={!input.trim() || isTyping || messages.length >= 20}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 10h14M12 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`chatbot-fab${isOpen ? " chatbot-fab-open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1l12 12M13 1 1 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {hasUnread && !isOpen && <span className="chatbot-unread-dot" />}
      </button>
    </div>
  )
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d={diagonal ? "M5 15 15 5M8 5h7v7" : "M3 10h14M12 5l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-logo ${className}`}>
      <img
        src="/logo.png"
        alt="Quoin logo"
        width={456}
        height={180}
        className="brand-logo-img brand-logo-dark"
      />
      <img
        src="/logo-white.png"
        alt="Quoin logo"
        width={456}
        height={180}
        className="brand-logo-img brand-logo-light"
      />
    </span>
  )
}

function NewsletterForm({
  source = "Website Newsletter",
  compact = false,
}: {
  source?: string
  compact?: boolean
}) {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setStatus("error")
      setMessage("Please enter your work email to subscribe.")
      inputRef.current?.focus()
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error")
      setMessage("Please enter a valid work email (e.g. name@company.com).")
      inputRef.current?.focus()
      return
    }

    if (submitting) return

    setSubmitting(true)
    setStatus("idle")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, source }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Unable to subscribe. Please try again.")
        inputRef.current?.focus()
        return
      }

      setStatus("success")
      setMessage(data.message || "Thank you for subscribing!")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className={`newsletter-form${compact ? " is-compact" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="text"
        name="_hp_website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div
        className={`newsletter-input-group${
          status === "error" ? " is-invalid" : ""
        }`}
      >
        <div className="newsletter-input-wrap">
          <input
            ref={inputRef}
            id={`newsletter-email-${compact ? "footer" : "section"}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status !== "idle") setStatus("idle")
            }}
            placeholder="Enter your work email"
            disabled={submitting || status === "success"}
            aria-label="Email address for newsletter"
            aria-invalid={status === "error"}
            aria-describedby={
              status === "error"
                ? `newsletter-error-${compact ? "footer" : "section"}`
                : undefined
            }
          />
        </div>
        <button
          type="submit"
          className="button button-acid newsletter-submit-btn"
          disabled={submitting || status === "success"}
          aria-label="Subscribe to newsletter"
        >
          {submitting ? (
            <span className="submit-loading">
              <span className="submit-spinner" />
              <span>Joining...</span>
            </span>
          ) : status === "success" ? (
            <span>Subscribed ✓</span>
          ) : (
            <>
              <span>Subscribe</span>
              <Arrow />
            </>
          )}
        </button>
      </div>

      <div className="newsletter-feedback" aria-live="polite">
        {status === "error" && (
          <p
            id={`newsletter-error-${compact ? "footer" : "section"}`}
            className="newsletter-error-msg"
            role="alert"
          >
            <span className="newsletter-error-badge" aria-hidden="true">
              !
            </span>
            <span>{message}</span>
          </p>
        )}
        {status === "success" && (
          <p className="newsletter-success-msg">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {message}
          </p>
        )}
        {status === "idle" && (
          <p className="newsletter-disclaimer">
            No unnecessary emails. Delivered monthly. Unsubscribe at any time.
          </p>
        )}
      </div>
    </form>
  )
}

function NewsletterSection() {
  return (
    <section id="newsletter" className="section-frame newsletter-section">
      <div className="section-meta">
        <span>04 — Newsletter</span>
        <span>Stay in the loop</span>
      </div>
      <div className="newsletter-layout">
        <div className="newsletter-content">
          <h2>
            Field notes on
            <br />
            automation &amp; scale.
          </h2>
          <p>
            Actionable takeaways on data extraction, workflow automation, and
            operational intelligence. Delivered directly to your inbox.
          </p>
        </div>
        <div className="newsletter-form-wrap">
          <NewsletterForm source="Homepage Newsletter Section" />
        </div>
      </div>
    </section>
  )
}

function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".section-heading, .service-card, .process-list article, .process-outcome, .pricing-row, .faq-item, .newsletter-section, .home-footer",
    )

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    elements.forEach((element) => element.classList.add("scroll-reveal"))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

type Navigate = (path: string) => void

export function ManagedServicesSection({
  navigate,
}: {
  navigate?: (path: string) => void
}) {
  return (
    <section id="services" className="section-frame services-section">
      {/* 1. Section Meta Header */}
      <div className="section-meta">
        <span>01 — Managed services</span>
        <span>Three focused systems</span>
      </div>

      {/* 2. Main Heading */}
      <div className="section-heading">
        <h2>
          Built for decisions,
          <br />
          not dashboards.
        </h2>
        <p>
          Each service has a defined scope, clear cadence, and a useful output
          your team can act on.
        </p>
      </div>

      {/* 3. Three Operating Standards Bar */}
      <div className="service-standards">
        <div>
          <span>Commercial model</span>
          <strong>Clear base pricing</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>Managed end to end</strong>
        </div>
        <div>
          <span>Commitment</span>
          <strong>Month to month</strong>
        </div>
      </div>

      {/* 4. Service Cards Grid */}
      <div className="service-grid">
        {services.map((service) => {
          const serviceRoute =
            service.link ??
            (service.number === "01"
              ? "/scraping"
              : service.number === "02"
                ? "/knowledge-assistant"
                : service.number === "03"
                  ? "/seo"
                  : null)
          const isInteractive = Boolean(serviceRoute)

          return (
            <article
              className={`service-card${
                isInteractive ? " is-interactive" : ""
              }`}
              key={service.title}
              role={isInteractive ? "link" : undefined}
              tabIndex={isInteractive ? 0 : undefined}
              data-cursor-text="OPEN"
              onClick={() => {
                if (serviceRoute && navigate) navigate(serviceRoute)
              }}
              onKeyDown={(event) => {
                if (
                  serviceRoute &&
                  navigate &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault()
                  navigate(serviceRoute)
                }
              }}
            >
              {/* Giant Graphic Art Box */}
              <div
                className="service-art"
                aria-hidden="true"
                data-magnetic
                data-magnetic-strength="0.25"
              >
                <span data-magnetic-inner>{service.letter}</span>
                <small>{service.number}</small>
              </div>

              {/* Service Card Body */}
              <div className="service-body">
                <div className="service-number">
                  <span>{service.number}</span>
                  <span>Managed service</span>
                </div>
                <p className="eyebrow">{service.audience}</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>

                {/* Features Checklist */}
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                {/* Price Bar */}
                <div className="service-price">
                  {service.setup ? <span>{service.setup}</span> : <span />}
                  <strong>{service.monthly}</strong>
                </div>

                {/* Animated Action Link */}
                <a
                  className="service-cta"
                  href={serviceRoute ?? "/consultation"}
                  data-magnetic
                  data-magnetic-strength="0.35"
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    if (serviceRoute && navigate) {
                      navigate(serviceRoute)
                    } else if (navigate) {
                      navigate("/consultation")
                    }
                  }}
                >
                  <span data-magnetic-inner>
                    {serviceRoute ? "Explore service" : "Discuss this service"}{" "}
                    <Arrow />
                  </span>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function HeroSection({
  onNavigate,
  isBackground = false,
}: {
  onNavigate?: (path: string) => void
  isBackground?: boolean
}) {
  const heroFrame = useRef<number | null>(null)
  const pendingHeroPosition = useRef<{
    element: HTMLElement
    x: number
    y: number
  } | null>(null)

  // Smooth mouse move parallax tracking using RequestAnimationFrame
  function setHeroPosition(element: HTMLElement, x: number, y: number) {
    element.style.setProperty("--hero-note-x", `${x * -10}px`)
    element.style.setProperty("--hero-note-y", `${y * -7}px`)
    element.style.setProperty("--hero-title-x", `${x * 6}px`)
    element.style.setProperty("--hero-title-y", `${y * 4}px`)
    element.style.setProperty("--hero-ghost-x", `${x * 20}px`)
    element.style.setProperty("--hero-ghost-y", `${y * 10}px`)
  }

  function moveHero(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    pendingHeroPosition.current = {
      element: event.currentTarget,
      x,
      y,
    }

    if (heroFrame.current !== null) return

    heroFrame.current = requestAnimationFrame(() => {
      const position = pendingHeroPosition.current
      if (position) {
        setHeroPosition(position.element, position.x, position.y)
      }
      heroFrame.current = null
    })
  }

  function resetHero(event: ReactPointerEvent<HTMLElement>) {
    if (heroFrame.current !== null) {
      cancelAnimationFrame(heroFrame.current)
      heroFrame.current = null
    }
    pendingHeroPosition.current = null
    setHeroPosition(event.currentTarget, 0, 0)
  }

  function scrollToSection(
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault()
    smoothScrollTo(sectionId, -72, 850)
  }

  return (
    <section
      className="hero section-frame"
      aria-labelledby="hero-title"
      onPointerMove={moveHero}
      onPointerLeave={resetHero}
    >
      {/* 1. Section Meta Header */}
      <div className="section-meta">
        <span>Independent managed services</span>
        <span>Est. 2025</span>
      </div>

      <div className="hero-layout">
        {/* 2. Floating Note Card (Acid Lime) */}
        <aside className="hero-note">
          <div className="hero-note-top">
            <span>Quoin / 01</span>
            <span>Independent</span>
          </div>

          <div className="hero-note-copy">
            <strong>Managed intelligence without additional headcount.</strong>
            <p>
              Focused systems, operated for you and delivered on a clear
              schedule.
            </p>
          </div>

          <div className="hero-note-bottom">
            <div>
              <strong>03</strong>
              <span>Managed services</span>
            </div>
            <a
              href="#services"
              data-magnetic
              data-magnetic-strength="0.3"
              onClick={(event) => scrollToSection(event, "services")}
            >
              <span data-magnetic-inner>
                Explore <Arrow />
              </span>
            </a>
          </div>
        </aside>

        {/* 3. Main Hero Content */}
        <div className="hero-content">
          <p className="hero-kicker">
            We turn recurring operational questions into dependable workflows.
          </p>

          {isBackground ? (
            <div id="hero-title" className="hero-title-text" aria-hidden="true">
              Operational intelligence for growing businesses.
            </div>
          ) : (
            <h1 id="hero-title">
              Operational intelligence for growing businesses.
            </h1>
          )}

          <div className="hero-bottom">
            <p>
              Three managed services with clear pricing and defined
              deliverables.
            </p>

            {/* Circular Consultation Action Button */}
            <a
              href="/consultation"
              className="circle-link"
              aria-label="Book a consultation"
              data-magnetic
              data-magnetic-strength="0.45"
              data-cursor-text="BOOK"
              onClick={(event) => {
                event.preventDefault()
                if (onNavigate) onNavigate("/consultation")
              }}
            >
              <span data-magnetic-inner>
                <Arrow diagonal />
              </span>
            </a>
          </div>

          {/* Three Bottom Principles */}
          <div className="hero-principles">
            <span>Clear pricing</span>
            <span>Clear deliverables</span>
            <span>Human reviewed</span>
          </div>
        </div>
      </div>

      {/* 4. Giant Background Typographic Ghost */}
      <div className="hero-ghost" aria-hidden="true">
        quoin
      </div>
    </section>
  )
}

function HomePage({
  navigate,
  isBackground = false,
}: {
  navigate: Navigate
  isBackground?: boolean
}) {
  useScrollReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function openPage(event: ReactMouseEvent<HTMLElement>, path: string) {
    event.preventDefault()
    navigate(path)
  }

  function scrollToSection(
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault()
    smoothScrollTo(sectionId, -72, 850)
  }

  return (
    <div className="site-shell" aria-hidden={isBackground ? true : undefined}>
      <header className="site-header">
        <a
          href="#top"
          className="wordmark"
          aria-label="quoin home"
          data-magnetic
          data-magnetic-strength="0.25"
          onClick={(event) => scrollToSection(event, "top")}
        >
          <span data-magnetic-inner>
            <BrandLogo />
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a
            href="#services"
            data-magnetic
            data-magnetic-strength="0.2"
            onClick={(event) => scrollToSection(event, "services")}
          >
            Services
          </a>
          <a
            href="#process"
            data-magnetic
            data-magnetic-strength="0.2"
            onClick={(event) => scrollToSection(event, "process")}
          >
            Process
          </a>
          <a
            href="#services"
            data-magnetic
            data-magnetic-strength="0.2"
            onClick={(event) => scrollToSection(event, "services")}
          >
            Pricing
          </a>
          <a
            href="#faq"
            data-magnetic
            data-magnetic-strength="0.2"
            onClick={(event) => scrollToSection(event, "faq")}
          >
            FAQ
          </a>
        </nav>

        <div className="header-actions">
          <a
            href="/consultation"
            className="header-cta"
            data-magnetic
            data-magnetic-strength="0.35"
            data-cursor-text="BOOK"
            onClick={(event) => openPage(event, "/consultation")}
          >
            <span data-magnetic-inner>Book a consultation</span>
          </a>
        </div>
      </header>

      <main id="top">
        <HeroSection onNavigate={navigate} isBackground={isBackground} />

        <ManagedServicesSection navigate={navigate} />

        <section id="process" className="section-frame process-section">
          <div className="section-meta">
            <span>02 — Process</span>
            <span>Start to first delivery</span>
          </div>

          <div className="process-layout">
            <div className="process-intro">
              <h2>
                How we
                <br />
                work.
              </h2>

              <p>
                A compact operating model designed to move from a clear brief to
                dependable delivery without unnecessary meetings.
              </p>

              <div className="process-timing">
                <span>Typical setup</span>
                <strong>1–2 weeks</strong>
              </div>

              <div
                className="process-principles"
                aria-label="Service principles"
              >
                <span>Fixed scope</span>
                <span>Named owner</span>
                <span>Regular cadence</span>
              </div>
            </div>

            <div className="process-list">
              <div className="process-list-head" aria-hidden="true">
                <span>Stage</span>
                <span>Engagement</span>
                <span>Deliverable</span>
              </div>

              {process.map((step, index) => (
                <article key={step.title}>
                  <div className="process-marker">
                    <span>0{index + 1}</span>
                    <i aria-hidden="true" />
                  </div>

                  <div className="process-copy">
                    <span>{step.phase}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>

                  <div className="process-output">
                    <span>Output</span>
                    <strong>{step.output}</strong>
                  </div>

                  <Arrow diagonal />
                </article>
              ))}

              <div className="process-outcome">
                <div>
                  <span>From first call to recurring delivery</span>
                  <strong>One clear operating rhythm.</strong>
                </div>

                <a
                  href="/consultation"
                  onClick={(event) => openPage(event, "/consultation")}
                >
                  Start a conversation
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-frame faq-section">
          <div className="section-meta">
            <span>03 — FAQ</span>
            <span>Common questions</span>
          </div>
          <div className="faq-layout">
            <div>
              <h2>
                Useful
                <br />
                details.
              </h2>
              <p>Everything you need to evaluate a first conversation.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item${openFaq === index ? " is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenFaq((current) =>
                        current === index ? null : index,
                      )
                    }
                  >
                    <span>0{index + 1}</span>
                    {faq.question}
                    <i aria-hidden="true" />
                  </button>
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    aria-hidden={openFaq !== index}
                  >
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <footer className="home-footer">
        <div className="footer-left">
          <a
            href="#top"
            className="wordmark"
            aria-label="quoin home"
            onClick={(event) => scrollToSection(event, "top")}
          >
            <BrandLogo />
          </a>
          <span className="footer-copyright">
            &copy; 2026 Quoin. All rights reserved.
          </span>
        </div>
        <div className="footer-legal">
          <a href="/terms" onClick={(event) => openPage(event, "/terms")}>
            Terms &amp; Conditions
          </a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <a href="/privacy" onClick={(event) => openPage(event, "/privacy")}>
            Privacy Policy
          </a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <a href="/refund" onClick={(event) => openPage(event, "/refund")}>
            Refund Policy
          </a>
        </div>
      </footer>
    </div>
  )
}

function ConsultationPage({ navigate }: { navigate: Navigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [serviceError, setServiceError] = useState(false)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)
  const lastSubmitRef = useRef(0)
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setServiceOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Anti-spam protection: debounce and block concurrent/repeated calls
    const now = Date.now()
    if (
      submitting ||
      submitted ||
      cooldown > 0 ||
      now - lastSubmitRef.current < 2500
    ) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    // Honeypot bot protection
    if (formData.get("_hp_website")) {
      return
    }

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    const service = selectedService.trim()

    const nextErrors = {
      name: name ? "" : "Please enter your name.",
      email: !email
        ? "Please enter your work email."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Please enter a valid email address.",
      phone: phone ? "" : "Please enter your phone number.",
      message: message ? "" : "Please describe what you would like to improve.",
    }

    setFieldErrors(nextErrors)
    setServiceError(!service)
    setSubmitError("")

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.phone ||
      nextErrors.message ||
      !service
    ) {
      return
    }

    lastSubmitRef.current = now
    setSubmitting(true)

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
          _hp_website: String(formData.get("_hp_website") ?? ""),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Submission failed.")
      }

      setSubmitted(true)
      setCooldown(60)
      setFieldErrors({ name: "", email: "", phone: "", message: "" })
      setSelectedService("")
      setServiceError(false)
      form.reset()
    } catch (err: any) {
      setSubmitError(
        err?.message ||
          "Something went wrong. Please try again or email us directly.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  function leavePage(
    event: ReactMouseEvent<HTMLAnchorElement>,
    destination: string,
  ) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  return (
    <div
      className={`site-shell consultation-shell${leaving ? " is-leaving" : ""}`}
    >
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quoin home"
          onClick={(event) => leavePage(event, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">Consultation / 05</span>
        <a
          href="/"
          className="header-cta"
          onClick={(event) => leavePage(event, "/")}
        >
          Back to home
        </a>
      </header>

      <main className="contact-section consultation-page">
        <div className="section-meta">
          <span>05 — Book a consultation</span>
          <span>Replies within two business days</span>
        </div>
        <div className="contact-layout">
          <div className="contact-intro">
            <p className="consultation-kicker">
              A focused, no-obligation first conversation.
            </p>
            <h1>
              Start with a<br />
              clear question.
            </h1>
            <p>
              Tell us what your team is trying to understand or improve. We’ll
              confirm whether Quoin is a fit.
            </p>
            <div className="consultation-points" aria-label="What to expect">
              <div>
                <span>01</span>
                <p>30-minute introductory call</p>
              </div>
              <div>
                <span>02</span>
                <p>Clear scope and fit assessment</p>
              </div>
              <div>
                <span>03</span>
                <p>No obligation or sales pressure</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <label className="minimal-field">
                <span className="minimal-label">Name</span>
                <div className="minimal-input-wrap">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
                    onChange={() =>
                      setFieldErrors((errors) => ({ ...errors, name: "" }))
                    }
                  />
                  <span className="minimal-line" aria-hidden="true" />
                </div>
                {fieldErrors.name && (
                  <p className="field-error" id="name-error" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </label>
              <label className="minimal-field">
                <span className="minimal-label">Work email</span>
                <div className="minimal-input-wrap">
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                    onChange={() =>
                      setFieldErrors((errors) => ({ ...errors, email: "" }))
                    }
                  />
                  <span className="minimal-line" aria-hidden="true" />
                </div>
                {fieldErrors.email && (
                  <p className="field-error" id="email-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </label>
            </div>
            <label className="minimal-field">
              <span className="minimal-label">Phone number</span>
              <div className="minimal-input-wrap">
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={
                    fieldErrors.phone ? "phone-error" : undefined
                  }
                  onChange={() =>
                    setFieldErrors((errors) => ({ ...errors, phone: "" }))
                  }
                />
                <span className="minimal-line" aria-hidden="true" />
              </div>
              {fieldErrors.phone && (
                <p className="field-error" id="phone-error" role="alert">
                  {fieldErrors.phone}
                </p>
              )}
            </label>

            {/* Select a Service Dropdown */}
            <div
              className="minimal-field service-select-field"
              ref={serviceDropdownRef}
            >
              <span
                className="minimal-label"
                style={{ color: serviceError ? "#ef4444" : undefined }}
              >
                Service of interest
              </span>
              <div className="minimal-input-wrap">
                <button
                  type="button"
                  className="service-select-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={serviceOpen}
                  aria-invalid={serviceError}
                  onClick={() => {
                    setServiceOpen((open) => !open)
                    if (serviceError) setServiceError(false)
                  }}
                >
                  <span
                    className={
                      selectedService ? "selected-value" : "placeholder-value"
                    }
                  >
                    {selectedService || "Select a service"}
                  </span>
                  <i className="chevron-icon" aria-hidden="true" />
                </button>
                <span
                  className="minimal-line"
                  style={{
                    transform: serviceOpen ? "scaleX(1)" : undefined,
                    backgroundColor: serviceError ? "#ef4444" : undefined,
                  }}
                  aria-hidden="true"
                />
              </div>
              <div
                className={`service-dropdown-curtain${
                  serviceOpen ? " is-open" : ""
                }`}
                aria-hidden={!serviceOpen}
              >
                <div
                  className="service-options"
                  role="listbox"
                  aria-label="Select a service"
                >
                  {services.map((service, index) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedService === service.title}
                      key={service.title}
                      style={{ "--item-index": index } as React.CSSProperties}
                      onClick={() => {
                        setSelectedService(service.title)
                        setServiceError(false)
                        setServiceOpen(false)
                      }}
                    >
                      <span>0{index + 1}</span>
                      <strong>{service.title}</strong>
                      <i aria-hidden="true" />
                    </button>
                  ))}
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedService === "General Consultation"}
                    style={
                      { "--item-index": services.length } as React.CSSProperties
                    }
                    onClick={() => {
                      setSelectedService("General Consultation")
                      setServiceError(false)
                      setServiceOpen(false)
                    }}
                  >
                    <span>04</span>
                    <strong>General Consultation</strong>
                    <i aria-hidden="true" />
                  </button>
                </div>
              </div>
              {serviceError && (
                <p className="field-error" role="alert">
                  Please select a service.
                </p>
              )}
            </div>

            <label className="minimal-field">
              <span className="minimal-label">
                What would you like to improve?
              </span>
              <div className="minimal-input-wrap">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="A short description of your current challenge"
                  required
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "message-error" : undefined
                  }
                  onChange={() =>
                    setFieldErrors((errors) => ({ ...errors, message: "" }))
                  }
                />
                <span className="minimal-line" aria-hidden="true" />
              </div>
              {fieldErrors.message && (
                <p className="field-error" id="message-error" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </label>
            {/* Honeypot field for anti-spam */}
            <input
              type="text"
              name="_hp_website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            {!submitted ? (
              <button
                className="button button-acid consultation-submit"
                type="submit"
                disabled={submitting || cooldown > 0}
              >
                {submitting ? (
                  <span className="submit-loading">
                    <span className="submit-spinner" aria-hidden="true" />
                    Sending request...
                  </span>
                ) : cooldown > 0 ? (
                  `Please wait (${cooldown}s)`
                ) : (
                  <>
                    Book a consultation <Arrow />
                  </>
                )}
              </button>
            ) : (
              <div className="minimal-success-banner" role="status">
                <div className="minimal-success-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5L8 14.5L16 6"
                      stroke="#11110f"
                      strokeWidth="2.4"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
                <div className="minimal-success-text">
                  <strong>Consultation Request Received</strong>
                  <p>
                    Thank you. We've recorded your details and will reply within
                    24 hours.
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <p className="field-error" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
        <footer>
          <div className="footer-left">
            <a
              href="/"
              className="wordmark"
              aria-label="quoin home"
              onClick={(event) => leavePage(event, "/")}
            >
              <BrandLogo />
            </a>
            <span className="footer-copyright">
              &copy; 2026 Quoin. All rights reserved.
            </span>
          </div>
          <div className="footer-legal">
            <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
              Terms &amp; Conditions
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="/privacy"
              onClick={(event) => leavePage(event, "/privacy")}
            >
              Privacy Policy
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href="/refund" onClick={(event) => leavePage(event, "/refund")}>
              Refund Policy
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

// Legal pages (TermsPage, PrivacyPage, RefundPage) imported from ./LegalPages

export const scrapingServices = [
  {
    title: "Website Data Extraction",
    description:
      "Extract specific information from publicly accessible websites and deliver it in a structured format.",
  },
  {
    title: "Dynamic Web Scraping",
    description:
      "Extract data from JavaScript-powered and dynamically rendered websites where standard requests are not sufficient.",
  },
  {
    title: "Web Crawling",
    description:
      "Discover and collect relevant information across multiple pages or larger website structures.",
  },
  {
    title: "Adaptive Scraping",
    description:
      "Build extraction workflows designed to remain resilient as supported website structures change.",
  },
  {
    title: "Browser-Based Scraping",
    description:
      "Use browser-based workflows when pages require client-side rendering or browser interaction to expose publicly accessible content.",
  },
  {
    title: "API & Network Data",
    description:
      "Extract data exposed through publicly accessible APIs and web requests where appropriate.",
  },
  {
    title: "E-Commerce Data",
    description:
      "Collect publicly available product details, pricing, availability, categories, ratings, and related information.",
  },
  {
    title: "Custom Data Extraction",
    description:
      "Define the fields, sources, output format, and scale you need, and we build the extraction workflow around your requirements.",
  },
]

export const scrapingCapabilities = [
  "Products",
  "Prices",
  "Listings",
  "Business data",
  "Reviews",
  "Ratings",
  "Articles",
  "News",
  "Directories",
  "Documentation",
  "Public market data",
  "Custom fields",
]

export const scrapingAiUses = [
  "RAG datasets",
  "Knowledge-base-ready datasets",
  "LLM-ready content",
  "Website-to-Markdown",
  "Structured AI data",
]

export const scrapingUseCases = [
  "Competitor research",
  "Price intelligence",
  "Market research",
  "Product catalog collection",
  "Business research",
  "Content aggregation",
  "Lead data collection",
  "Research and analytics",
]

export const scrapingProcess = [
  {
    step: "01",
    title: "Define",
    description: "Define the sources, fields, requirements, and output format.",
  },
  {
    step: "02",
    title: "Extract",
    description:
      "We extract information from the approved publicly accessible target sources.",
  },
  {
    step: "03",
    title: "Structure",
    description:
      "Raw information is cleaned, normalized, and organized into usable data.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Receive the resulting dataset in the format your workflow needs.",
  },
]

export function useScrapingScrollReveal() {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".scraping-hero-grid, .scraping-card, .scraping-capabilities li, .scraping-duo article, .scraping-insight-grid article, .scraping-process-grid article, .scraping-cta",
    )
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((el) => el.classList.add("is-visible"))
      return
    }
    elements.forEach((el) => el.classList.add("scroll-reveal"))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function ScrapingPage({
  navigate,
}: {
  navigate: (path: string) => void
}) {
  const [leaving, setLeaving] = useState(false)
  useScrapingScrollReveal()

  function leavePage(
    event: ReactMouseEvent<HTMLAnchorElement>,
    destination: string,
  ) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  return (
    <div
      className={`site-shell consultation-shell scraping-shell${
        leaving ? " is-leaving" : ""
      }`}
    >
      {/* Header */}
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quion home"
          onClick={(event) => leavePage(event, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">Web Scraping / 01</span>
        <a
          href="/"
          className="header-cta"
          onClick={(event) => leavePage(event, "/")}
        >
          Back to home
        </a>
      </header>

      <main className="scraping-page-content">
        {/* 1. Hero Section */}
        <section className="scraping-hero">
          <div className="section-meta">
            <span>01 — Web Scraping / Custom and recurring extraction</span>
            <span aria-hidden="true" />
          </div>
          <div className="scraping-hero-grid">
            <div>
              <p className="eyebrow">Public web data / Structured delivery</p>
              <h1>
                Web scraping &amp;
                <br />
                data extraction.
              </h1>
              <p className="scraping-hero-copy">
                Turn publicly available web data into clean, structured, usable
                information.
              </p>
              <a
                href="/consultation"
                className="scraping-primary-action"
                onClick={(e) => leavePage(e, "/consultation")}
              >
                Start a project <Arrow />
              </a>
            </div>
            <aside
              className="scraping-hero-panel"
              aria-label="Delivery formats"
            >
              <span aria-hidden="true">W</span>
              <div>
                <small>Delivery formats</small>
                <strong>JSON · CSV · XML · JSONL · Markdown</strong>
              </div>
            </aside>
          </div>
        </section>

        {/* 2. Intro Section */}
        <section className="scraping-intro scraping-section">
          <div className="section-meta">
            <span>02 — What we do</span>
            <span>Extract. Structure. Deliver.</span>
          </div>
          <div className="scraping-split-heading">
            <h2>
              Extract. Structure.
              <br />
              Deliver.
            </h2>
            <p>
              We extract, clean, and structure publicly accessible web data into
              organized datasets built around your requirements—from individual
              pages to large-scale websites.
            </p>
          </div>
        </section>

        {/* 3. Services Grid */}
        <section className="scraping-section scraping-services-section">
          <div className="section-meta">
            <span>03 — Services</span>
            <span>Eight extraction capabilities</span>
          </div>
          <div className="scraping-grid">
            {scrapingServices.map((service, index) => (
              <article className="scraping-card" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Arrow diagonal />
              </article>
            ))}
          </div>
        </section>

        {/* 4. Capabilities Badges */}
        <section className="scraping-section scraping-capabilities">
          <div className="section-meta">
            <span>04 — Capabilities</span>
            <span>Fields configured to your requirements</span>
          </div>
          <div className="scraping-split-heading">
            <h2>
              What we can
              <br />
              extract.
            </h2>
            <ul>
              {scrapingCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Scale & Format Duo */}
        <section className="scraping-section scraping-duo">
          <article>
            <div className="section-meta">
              <span>05 — Scale</span>
            </div>
            <h2>Built for different data needs.</h2>
            <h3>Single page → Entire website</h3>
            <p>
              From extracting a defined set of fields from a single page to
              crawling thousands of publicly accessible pages, the workflow is
              configured around your requirements, source structure, and scale.
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>06 — Format</span>
            </div>
            <h2>Data that fits your workflow.</h2>
            <h3>Your data. Your format.</h3>
            <p>
              Receive structured output in formats that fit the systems,
              analysis workflows, or AI pipelines you already use.
            </p>
            <div className="scraping-format">
              JSON · CSV · XML · JSONL · Markdown
            </div>
          </article>
        </section>

        {/* 6. AI Uses & Case Studies */}
        <section className="scraping-insight-section">
          <div className="section-meta">
            <span>07 — Applied data</span>
            <span>AI-ready and operational</span>
          </div>
          <div className="scraping-insight-grid">
            <article>
              <p className="eyebrow">AI-ready knowledge</p>
              <h2>Turn public web content into structured context.</h2>
              <p>
                Collect, clean, and structure publicly accessible web content
                for modern AI workflows.
              </p>
              <ul>
                {scrapingAiUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <p className="eyebrow">Real-world use cases</p>
              <h2>Built for practical data collection.</h2>
              <ul>
                {scrapingUseCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* 7. How It Works (Process) */}
        <section className="scraping-section scraping-process-section">
          <div className="section-meta">
            <span>08 — How it works</span>
            <span>Four controlled stages</span>
          </div>
          <div className="scraping-process-heading">
            <h2>
              From target
              <br />
              to dataset.
            </h2>
            <p>
              A defined workflow keeps extraction requirements, source
              boundaries, data fields, and delivery formats clear from the
              start.
            </p>
          </div>
          <div className="scraping-process-grid">
            {scrapingProcess.map((step) => (
              <article key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="scraping-cta">
          <p className="eyebrow">Custom scraping</p>
          <h2>
            Have data you
            <br />
            need to extract?
          </h2>
          <p>
            Every website and dataset has different requirements. We can build
            an extraction workflow around your target sources, required fields,
            output format, and scale.
          </p>
          <a
            href="/consultation"
            onClick={(e) => leavePage(e, "/consultation")}
          >
            Discuss your requirements <Arrow />
          </a>
        </section>

        {/* Footer */}
        <footer className="scraping-footer">
          <div className="footer-left">
            <a
              href="/"
              className="wordmark"
              aria-label="quion home"
              onClick={(event) => leavePage(event, "/")}
            >
              <BrandLogo />
            </a>
            <span className="footer-copyright">
              &copy; 2026 Quion. All rights reserved.
            </span>
          </div>
          <div className="footer-legal">
            <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
              Terms &amp; Conditions
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="/privacy"
              onClick={(event) => leavePage(event, "/privacy")}
            >
              Privacy Policy
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href="/refund" onClick={(event) => leavePage(event, "/refund")}>
              Refund Policy
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export const ScrapingContent = ScrapingPage

export const knowledgeTags = [
  "Knowledge Bases",
  "RAG",
  "Semantic Search",
  "AI Agents",
  "AI Workflows",
  "Document Processing",
  "API Integration",
  "MCP",
  "Multi-Model AI",
  "Self-Hosting",
]

export const knowledgeSources = [
  "Internal documents",
  "Policies",
  "SOPs",
  "Employee handbooks",
  "Product documentation",
  "Technical documentation",
  "Project information",
  "Training materials",
  "FAQs",
  "Knowledge bases",
]

export const knowledgeFeatures = [
  {
    title: "Knowledge Base",
    description:
      "Centralize your organization's information into structured, searchable knowledge bases.",
  },
  {
    title: "Intelligent Search & Q&A",
    description:
      "Search naturally and receive answers grounded in your organization's approved knowledge.",
  },
  {
    title: "Document Understanding",
    description:
      "Process and retrieve information from PDFs, presentations, and structured formats.",
  },
  {
    title: "Context-Aware Responses",
    description:
      "Provide relevant organizational context to ground responses before generation.",
  },
  {
    title: "Multiple Knowledge Sources",
    description:
      "Organize information across departments, teams, projects, and document collections.",
  },
  {
    title: "Source-Aware Answers",
    description:
      "Reference source documents and sections so your team can verify information directly.",
  },
  {
    title: "Conversational Interface",
    description:
      "Let employees interact with company knowledge through an intuitive chat experience.",
  },
  {
    title: "Custom AI Models",
    description:
      "Connect and configure the assistant with the AI models that best match your workload.",
  },
]

export const knowledgeConnections = [
  "PDFs",
  "Presentations",
  "Text documents",
  "FAQs",
  "Internal documents",
  "Product manuals",
  "Company policies",
  "SOPs",
  "Knowledge bases",
  "Structured datasets",
  "External knowledge sources",
]

export const knowledgeWorkflows = [
  "Document processing",
  "Information retrieval",
  "Content generation",
  "Classification",
  "Summarization",
  "Data extraction",
  "Multi-step AI workflows",
  "Automated responses",
  "Custom business logic",
]

export const knowledgeAgents = [
  "Tool integration",
  "API connections",
  "Custom tools",
  "MCP integrations",
  "Multi-step tasks",
  "Automated actions",
  "External service integrations",
]

export const knowledgeTeams = [
  {
    title: "HR",
    description:
      "Policies, employee guidelines, onboarding materials, and internal processes.",
  },
  {
    title: "Support",
    description:
      "Product documentation, troubleshooting guides, and service FAQs.",
  },
  {
    title: "Engineering",
    description:
      "Technical documentation, APIs, architecture, and development standards.",
  },
  {
    title: "Sales",
    description:
      "Product specifications, sales enablement materials, and internal resources.",
  },
  {
    title: "Operations",
    description:
      "SOPs, workflows, operational procedures, and execution guidelines.",
  },
  {
    title: "Management",
    description:
      "Company information, internal reports, and departmental knowledge.",
  },
]

export const knowledgeAiCapabilities = [
  "Custom instructions",
  "Prompt configuration",
  "Multiple AI models",
  "Context-aware generation",
  "Structured outputs",
  "Text generation",
  "Summarization",
  "Classification",
  "Information extraction",
  "AI-powered workflows",
]

export const knowledgeSecurity = [
  "Self-hosted deployment",
  "Controlled knowledge access",
  "Private data environment",
  "Custom authentication",
  "API integration",
  "Configurable workflows",
]

export const knowledgeIntegrations = [
  "REST APIs",
  "Internal applications",
  "Business systems",
  "Custom tools",
  "External services",
  "MCP servers",
  "AI model providers",
]

export const knowledgeMonitoring = [
  "Conversation logs",
  "Application monitoring",
  "Performance analysis",
  "Prompt improvement",
  "Dataset improvement",
  "Model evaluation",
  "Production analytics",
]

export const knowledgeUseCases = [
  "Internal company assistant",
  "Employee helpdesk",
  "HR knowledge assistant",
  "Customer support assistant",
  "Technical documentation assistant",
  "Product knowledge assistant",
  "IT helpdesk",
  "Training assistant",
  "Research assistant",
  "SOP assistant",
  "Enterprise search",
  "AI-powered knowledge base",
]

export const knowledgeProcess = [
  {
    step: "01",
    title: "Connect",
    description:
      "Bring the organization's approved knowledge sources together.",
  },
  {
    step: "02",
    title: "Organize",
    description: "Structure and prepare information for retrieval.",
  },
  {
    step: "03",
    title: "Understand",
    description:
      "Configure the assistant, retrieval behavior, models, prompts, and workflows around the organization's requirements.",
  },
  {
    step: "04",
    title: "Ask",
    description: "Team members ask questions using a conversational interface.",
  },
  {
    step: "05",
    title: "Answer",
    description:
      "The assistant retrieves relevant context and provides a grounded response, with sources where configured.",
  },
]

export const knowledgeCustomOptions = [
  "Knowledge sources",
  "Departments",
  "User roles",
  "AI models",
  "Business workflows",
  "Tools and integrations",
  "Access requirements",
  "Existing applications",
]

function ItemList({
  items,
  className = "",
}: {
  items: string[]
  className?: string
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function KnowledgeAssistantContent({
  navigate,
}: {
  navigate?: (path: string) => void
}) {
  const [leaving, setLeaving] = useState(false)

  function leavePage(
    event: ReactMouseEvent<HTMLAnchorElement>,
    destination: string,
  ) {
    if (!navigate) return
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  return (
    <div
      className={`knowledge-page site-shell consultation-shell${
        leaving ? " is-leaving" : ""
      }`}
    >
      {/* Header */}
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quion home"
          onClick={(event) => leavePage(event, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">
          Knowledge Assistant / 02
        </span>
        <a
          href="/"
          className="header-cta"
          onClick={(event) => leavePage(event, "/")}
        >
          Back to home
        </a>
      </header>
      <main>
        {/* 1. Hero with Interactive Chat Mockup */}
        <section className="knowledge-hero">
          <div className="section-meta">
            <span>01 — Internal Knowledge Assistant</span>
            <span>Turn organizational knowledge into an AI interface</span>
          </div>
          <div className="knowledge-hero-grid">
            <div>
              <p className="eyebrow">
                Company knowledge / Conversational access
              </p>
              <h1>Internal Knowledge Assistant.</h1>
              <h2>
                Your organization’s knowledge, available through a conversation.
              </h2>
              <p>
                Turn internal documents, processes, policies, and knowledge into
                an AI-powered assistant that helps your team find information,
                understand it, and act on it.
              </p>
              <a
                href="/consultation"
                onClick={(event) => leavePage(event, "/consultation")}
              >
                Build your assistant <Arrow />
              </a>
            </div>
            {/* Interactive Chat Mockup Window */}
            <aside className="knowledge-chat" aria-label="Assistant example">
              <div className="knowledge-chat-head">
                <span>Quion Knowledge</span>
                <i aria-hidden="true" />
              </div>
              <div className="knowledge-message is-question">
                Where can I find our remote-work policy?
              </div>
              <div className="knowledge-message is-answer">
                <span>Answer</span>
                <p>
                  The remote-work policy is documented in the Employee Handbook
                  under Workplace Guidelines.
                </p>
                <small>Employee Handbook · Source</small>
              </div>
              <div className="knowledge-chat-input">
                Ask your company knowledge
                <Arrow />
              </div>
            </aside>
          </div>
        </section>
        {/* 2. Horizontal Tag Carousel */}
        <div className="knowledge-tag-rail" aria-label="Feature tags">
          {knowledgeTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {/* 3. What We Build */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>02 — What we build</span>
            <span>Bring scattered knowledge into one system</span>
          </div>
          <div className="knowledge-split">
            <h2>
              Bring scattered knowledge
              <br />
              into one system.
            </h2>
            <div>
              <p>
                Quion takes knowledge distributed across documents and internal
                resources and turns it into a structured, searchable AI
                knowledge layer.
              </p>
              <ItemList items={knowledgeSources} className="knowledge-list" />
            </div>
          </div>
        </section>
        {/* 4. Core Features Grid */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>03 — Core features</span>
            <span>Retrieval with context and sources</span>
          </div>
          <div className="knowledge-feature-grid">
            {knowledgeFeatures.map((feature, index) => (
              <article key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
        {/* 5. Dark Section: Connected Sources */}
        <section className="knowledge-dark-section">
          <div className="section-meta">
            <span>04 — What you can connect</span>
            <span>Connect the knowledge your team already uses</span>
          </div>
          <div className="knowledge-dark-grid">
            <h2>
              Connect the knowledge
              <br />
              your team already uses.
            </h2>
            <ItemList
              items={knowledgeConnections}
              className="knowledge-dark-list"
            />
          </div>
        </section>
        {/* 6. AI Workflows & AI Agents Duo */}
        <section className="knowledge-section knowledge-paired">
          <article>
            <div className="section-meta">
              <span>05 — AI workflows</span>
            </div>
            <h2>Go beyond questions and answers.</h2>
            <p>
              Quion configures multi-step AI workflows tailored to your team’s
              document and operational requirements.
            </p>
            <ItemList items={knowledgeWorkflows} className="knowledge-list" />
          </article>
          <article>
            <div className="section-meta">
              <span>06 — AI agents</span>
            </div>
            <h2>Go beyond answers.</h2>
            <p>
              Connect the assistant to approved tools, APIs, and business
              systems so it can perform defined tasks within the workflows you
              configure.
            </p>
            <ItemList items={knowledgeAgents} className="knowledge-list" />
          </article>
        </section>
        {/* 7. Teams Grid */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>07 — Built for teams</span>
            <span>One assistant · Multiple teams</span>
          </div>
          <div className="knowledge-heading-row">
            <h2>
              One assistant.
              <br />
              Multiple teams.
            </h2>
            <p>
              Configured around your organization’s knowledge, access
              requirements, and workflows.
            </p>
          </div>
          <div className="knowledge-team-grid">
            {knowledgeTeams.map((team, index) => (
              <article key={team.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{team.title}</h3>
                <p>{team.description}</p>
              </article>
            ))}
          </div>
        </section>
        {/* 8. AI Capabilities (Numbered List) */}
        <section className="knowledge-section knowledge-control-section">
          <div className="knowledge-control-copy">
            <div className="section-meta">
              <span>08 — AI capabilities</span>
            </div>
            <h2>Configure the assistant around your business.</h2>
            <p>
              Configure models, instructions, outputs, and workflows around your
              organization’s specific requirements.
            </p>
          </div>
          <ItemList
            items={knowledgeAiCapabilities}
            className="knowledge-numbered-list"
          />
        </section>
        {/* 9. Security and Infrastructure */}
        <section className="knowledge-dark-section knowledge-security-section">
          <div className="section-meta">
            <span>09 — Security and control</span>
            <span>Deployment options for different security requirements</span>
          </div>
          <div className="knowledge-dark-grid">
            <div>
              <h2>
                Keep control over how
                <br />
                your knowledge is deployed and accessed.
              </h2>
              <p>
                Deployment options and access controls tailored to your
                technical environment and governance requirements.
              </p>
            </div>
            <ItemList
              items={knowledgeSecurity}
              className="knowledge-dark-list"
            />
          </div>
        </section>
        {/* 10. Integrations & Monitoring Duo */}
        <section className="knowledge-section knowledge-paired">
          <article>
            <div className="section-meta">
              <span>10 — Integrations</span>
            </div>
            <h2>
              Connect the assistant to the systems your team already uses.
            </h2>
            <p>
              Integration capabilities configured by Quion based on your
              existing software architecture and operational requirements.
            </p>
            <ItemList
              items={knowledgeIntegrations}
              className="knowledge-list"
            />
          </article>
          <article>
            <div className="section-meta">
              <span>11 — Monitoring</span>
            </div>
            <h2>Measure, evaluate, and improve.</h2>
            <p>
              Monitor how the assistant performs, identify areas for
              improvement, and continuously refine its knowledge, prompts,
              workflows, and models.
            </p>
            <ItemList items={knowledgeMonitoring} className="knowledge-list" />
          </article>
        </section>
        {/* 11. Use Cases Chips */}
        <section className="knowledge-section knowledge-use-section">
          <div className="section-meta">
            <span>12 — Use cases</span>
            <span>Knowledge-driven organizations</span>
          </div>
          <div className="knowledge-split">
            <h2>
              Built for knowledge-
              <br />
              driven organizations.
            </h2>
            <ItemList
              items={knowledgeUseCases}
              className="knowledge-chip-list"
            />
          </div>
        </section>
        {/* 12. 5-Stage Process */}
        <section className="knowledge-section knowledge-process-section">
          <div className="section-meta">
            <span>13 — How it works</span>
            <span>From documents to answers</span>
          </div>
          <div className="knowledge-heading-row">
            <h2>
              From documents
              <br />
              to answers.
            </h2>
            <p>
              A structured five-stage process for connecting, organizing, and
              retrieving organizational knowledge.
            </p>
          </div>
          <div className="knowledge-process-grid">
            {knowledgeProcess.map((step) => (
              <article key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
        {/* 13. Custom Assistant CTA */}
        <section className="knowledge-custom-section">
          <div>
            <p className="eyebrow">14 — Custom knowledge assistant</p>
            <h2>
              Built around your
              <br />
              organization.
            </h2>
            <p>
              Every organization has different information, workflows, access
              requirements, and systems. Quion configures the assistant around
              yours.
            </p>
            <a
              href="/consultation"
              onClick={(event) => leavePage(event, "/consultation")}
            >
              Build your knowledge assistant <Arrow />
            </a>
          </div>
          <ItemList
            items={knowledgeCustomOptions}
            className="knowledge-custom-list"
          />
        </section>
        {/* Footer */}
        <footer className="scraping-footer">
          <div className="footer-left">
            <a
              href="/"
              className="wordmark"
              aria-label="quion home"
              onClick={(event) => leavePage(event, "/")}
            >
              <BrandLogo />
            </a>
            <span className="footer-copyright">
              &copy; 2026 Quion. All rights reserved.
            </span>
          </div>
          <div className="footer-legal">
            <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
              Terms &amp; Conditions
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="/privacy"
              onClick={(event) => leavePage(event, "/privacy")}
            >
              Privacy Policy
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href="/refund" onClick={(event) => leavePage(event, "/refund")}>
              Refund Policy
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export const KnowledgeAssistantPage = KnowledgeAssistantContent

// ─── SEO & Search Intelligence — data ───────────────────────────────────────

export const seoTags = [
  "Keyword Research",
  "Rank Tracking",
  "Competitor Analysis",
  "Backlink Analysis",
  "Site Audits",
  "AI Visibility",
  "Local SEO",
  "SERP Research",
  "Google Search Console",
  "Search Signals",
  "MCP",
  "AI Agents",
  "Prompt Tracking",
  "Citation Tracking",
  "SEO Reports",
  "Technical SEO",
]

export const seoServices = [
  {
    title: "Keyword Research",
    description:
      "Discover keyword opportunities using search volume, difficulty, CPC, intent, and related search data.",
  },
  {
    title: "Rank Tracking",
    description:
      "Track keyword positions over time across configured search engines, locations, and target keywords.",
  },
  {
    title: "Competitor Insights",
    description:
      "Compare competitor visibility, rankings, keywords, and search performance across a defined market.",
  },
  {
    title: "Backlink Analysis",
    description:
      "Analyze backlink data, referring domains, and link profiles to understand a website’s link profile and identify relevant opportunities.",
  },
  {
    title: "Website SEO Audits",
    description:
      "Analyze websites for technical SEO issues, crawlability problems, metadata issues, and other configurable audit signals.",
  },
  {
    title: "AI Visibility Tracking",
    description:
      "Monitor brand mentions and citations in AI-generated answers using configured prompts and supported AI-search data sources.",
  },
  {
    title: "Local SEO Research",
    description:
      "Research local search visibility and business results for defined locations and target queries.",
  },
  {
    title: "SERP Research",
    description:
      "Inspect search results to understand ranking pages, SERP features, search intent, and competitive patterns.",
  },
]

export const seoSignals = [
  "Search volume",
  "Keyword difficulty",
  "CPC data",
  "Position tracking",
  "Ranking history",
  "SERP features",
  "Backlink metrics",
  "Domain metrics",
  "Organic clicks",
  "Click-through rate",
  "Impressions",
  "Crawl errors",
  "AI citations",
]

export const seoDataSources = [
  "Google Search Console",
  "Organic search results",
  "SERP result data",
  "Keyword search data",
  "Backlink data",
  "Domain metrics",
  "Competitor domains",
  "Local search results",
  "AI search visibility data",
]

export const seoAiWorkflows = [
  "AI-assisted keyword clustering",
  "Automated rank reporting",
  "AI-assisted SEO reports",
  "Content gap analysis",
  "Competitor monitoring",
  "Audit summaries",
  "Scheduled data collection",
  "Custom AI workflows",
  "Multi-step SEO analysis",
]

export const seoMcpCapabilities = [
  "MCP server integration",
  "AI agent access to SEO data",
  "Configured keyword queries",
  "Automated audit triggers",
  "Search Console via MCP",
  "Custom tooling",
]

export const seoSearchTypes = [
  {
    title: "Local SEO",
    description:
      "Research local rankings and business results for defined cities, regions, and target queries.",
  },
  {
    title: "Organic Search",
    description:
      "Track keyword rankings and search visibility across configured organic search results.",
  },
  {
    title: "AI Search",
    description:
      "Monitor brand visibility, mentions, and citations in supported AI-generated search answers.",
  },
  {
    title: "SERP Features",
    description:
      "Analyze featured snippets and other available search-result features that affect visibility.",
  },
]

export const seoAiCapabilities = [
  "AI-assisted keyword reports",
  "Automated rank monitoring",
  "Competitor analysis workflows",
  "AI-assisted site audit summaries",
  "Content gap identification",
  "Trend detection",
  "Search signal alerts",
  "AI-assisted reporting",
  "Custom AI workflows",
  "MCP integrations",
]

export const seoUseCases = [
  "Digital marketing teams",
  "Content strategists",
  "SEO agencies",
  "In-house SEO teams",
  "E-commerce brands",
  "SaaS companies",
  "Local businesses",
  "Growth teams",
  "Competitor research",
  "AI-assisted SEO",
  "Marketing intelligence",
  "Search performance monitoring",
]

export const seoProcess = [
  {
    step: "01",
    title: "Scope",
    description:
      "Define target keywords, competitors, locations, and search objectives.",
  },
  {
    step: "02",
    title: "Configure",
    description:
      "Connect supported data sources and configure the tracking and reporting workflow.",
  },
  {
    step: "03",
    title: "Collect",
    description:
      "Gather search rankings, SERP data, backlink signals, and other configured SEO data.",
  },
  {
    step: "04",
    title: "Analyze",
    description:
      "Identify trends, opportunities, competitive changes, and technical issues.",
  },
  {
    step: "05",
    title: "Report",
    description:
      "Deliver structured search intelligence in the format and cadence your team needs.",
  },
]

export const seoCustomOptions = [
  "Target keywords",
  "Tracked locations",
  "Competitor domains",
  "Data sources",
  "Reporting cadence",
  "AI workflow requirements",
  "Delivery format",
  "Integration requirements",
]

export const seoTechnicalAudit = [
  "Robots.txt & XML sitemap analysis",
  "Canonical tag checks",
  "Schema.org structured data checks",
  "Internal linking analysis",
  "Crawl depth analysis",
  "Metadata checks",
  "404 & redirect diagnostics",
  "Hreflang checks",
]

export const seoIntegrations = [
  "Google Search Console",
  "MCP",
  "REST API endpoints",
  "Webhooks",
  "Structured data exports",
  "Custom integrations",
]

export const seoMonitoring = [
  "Rank change monitoring",
  "Competitor position changes",
  "SERP feature monitoring",
  "Backlink changes",
  "AI visibility monitoring",
  "Ranking and visibility change detection",
  "Threshold-based alerts",
]

const heroKeywords = [
  {
    query: "b2b data extraction pipeline",
    rank: "01",
    change: "+2",
    volume: "18,400 / mo",
    difficulty: "38 (Low)",
    ctr: "32.4%",
    features: ["Featured Snippet", "AI Overview Cited", "Sitelinks"],
    aioCited: true,
    aioQuote:
      "Automated public web extraction pipelines provide structured data delivery for operational analytics.",
    snippet:
      "Sample search result: Enterprise data extraction and web crawling infrastructure. Structured, clean datasets delivered directly to your database, S3, or analytical warehouse on schedule.",
    slug: "intelligence/b2b-extraction",
  },
  {
    query: "internal knowledge assistant rag",
    rank: "01",
    change: "+4",
    volume: "24,200 / mo",
    difficulty: "46 (Med)",
    ctr: "28.9%",
    features: ["People Also Ask", "AI Overview Cited", "Knowledge Panel"],
    aioCited: true,
    aioQuote:
      "Internal knowledge assistants organize company documentation and SOPs into conversational search.",
    snippet:
      "Sample search result: Transform internal documentation, SOPs, and employee handbooks into an AI-powered conversational assistant with verified source citations and role permissions.",
    slug: "systems/internal-knowledge",
  },
  {
    query: "competitor serp rank tracker api",
    rank: "02",
    change: "+1",
    volume: "9,600 / mo",
    difficulty: "42 (Med)",
    ctr: "19.5%",
    features: ["Local Pack", "Sitelinks", "Image Pack"],
    aioCited: false,
    aioQuote: "Rank tracking with localized geo-fenced precision.",
    snippet:
      "Sample search result: Continuous SERP position tracking and competitor ranking intelligence across Google, Bing, and local markets with automated change notifications.",
    slug: "search/rank-tracking",
  },
  {
    query: "ai visibility & citation monitoring",
    rank: "01",
    change: "+3",
    volume: "12,800 / mo",
    difficulty: "31 (Low)",
    ctr: "34.1%",
    features: ["AI Overview", "Featured Snippet", "FAQ"],
    aioCited: true,
    aioQuote:
      "Monitors brand sentiment and citation presence across supported generative search engines.",
    snippet:
      "Sample search result: Track brand presence in AI-generated answers. Understand citation sources, prompt triggers, and analyze generative search visibility.",
    slug: "search/ai-visibility",
  },
]

// ─── SEO Page Component ───────────────────────────────────────────────────────

export function SeoPage({ navigate }: { navigate: (path: string) => void }) {
  const [leaving, setLeaving] = useState(false)
  const [activeKeywordIndex, setActiveKeywordIndex] = useState(0)
  const [activeEngine, setActiveEngine] = useState<"google" | "aio" | "local">(
    "google",
  )
  const [selectedSearchType, setSelectedSearchType] = useState<number | null>(
    null,
  )

  function leavePage(
    event: React.MouseEvent<HTMLAnchorElement>,
    destination: string,
  ) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  const currentKeyword = heroKeywords[activeKeywordIndex]

  return (
    <div
      className={`knowledge-page seo-page site-shell consultation-shell${
        leaving ? " is-leaving" : ""
      }`}
    >
      {/* Header */}
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quion home"
          onClick={(event) => leavePage(event, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">
          SEO &amp; Search Intelligence / 03
        </span>
        <a
          href="/"
          className="header-cta"
          onClick={(event) => leavePage(event, "/")}
        >
          Back to home
        </a>
      </header>

      <main>
        {/* 1. Hero with Interactive SERP Inspector Widget */}
        <section className="knowledge-hero">
          <div className="section-meta">
            <span>01 — SEO &amp; Search Intelligence</span>
            <span>Search visibility &amp; SERP analytics</span>
          </div>
          <div className="knowledge-hero-grid">
            <div>
              <p className="eyebrow">
                Search Intelligence / Scheduled insights
              </p>
              <h1>SEO &amp; Search Intelligence.</h1>
              <h2>
                Search visibility, rankings, and search signals—structured
                around your goals.
              </h2>
              <p>
                Research keywords, track rankings, analyze competitors, audit
                websites, and monitor how your brand appears across search and
                AI-generated answers.
              </p>
              <a
                href="/consultation"
                onClick={(event) => leavePage(event, "/consultation")}
              >
                Build your search intelligence <Arrow />
              </a>
            </div>

            {/* Interactive SERP Inspector Widget */}
            <aside
              className="seo-serp-widget"
              aria-label="Sample Search Intelligence Monitor"
            >
              <div className="seo-serp-head">
                <div className="seo-serp-title-group">
                  <i aria-hidden="true" />
                  <span>Quion Search Intelligence</span>
                </div>
                <div className="seo-engine-pills">
                  <button
                    type="button"
                    className={`seo-engine-btn${
                      activeEngine === "google" ? " is-active" : ""
                    }`}
                    onClick={() => setActiveEngine("google")}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className={`seo-engine-btn${
                      activeEngine === "aio" ? " is-active" : ""
                    }`}
                    onClick={() => setActiveEngine("aio")}
                  >
                    AI Overview
                  </button>
                  <button
                    type="button"
                    className={`seo-engine-btn${
                      activeEngine === "local" ? " is-active" : ""
                    }`}
                    onClick={() => setActiveEngine("local")}
                  >
                    Local
                  </button>
                </div>
              </div>

              {/* Keyword tabs */}
              <div className="seo-keyword-tabs" role="tablist">
                {heroKeywords.map((item, idx) => (
                  <button
                    key={item.query}
                    type="button"
                    role="tab"
                    aria-selected={activeKeywordIndex === idx}
                    className={`seo-keyword-btn${
                      activeKeywordIndex === idx ? " is-active" : ""
                    }`}
                    onClick={() => setActiveKeywordIndex(idx)}
                  >
                    <span className="seo-keyword-rank-pill">#{item.rank}</span>
                    <span>{item.query}</span>
                  </button>
                ))}
              </div>

              {/* Simulated Search Bar */}
              <div className="seo-search-bar-sim">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>
                  https://google.com/search?q=
                  {currentKeyword.query.replace(/\s+/g, "+")}
                </span>
              </div>

              {/* Live Metric Ribbon */}
              <div className="seo-metrics-ribbon">
                <div className="seo-metric-box">
                  <small>Rank Position</small>
                  <strong className="is-green">
                    #{currentKeyword.rank} ({currentKeyword.change})
                  </strong>
                </div>
                <div className="seo-metric-box">
                  <small>Monthly Vol</small>
                  <strong>{currentKeyword.volume}</strong>
                </div>
                <div className="seo-metric-box">
                  <small>Difficulty</small>
                  <strong>{currentKeyword.difficulty}</strong>
                </div>
                <div className="seo-metric-box">
                  <small>Est. CTR</small>
                  <strong>{currentKeyword.ctr}</strong>
                </div>
              </div>

              {/* SERP Result Preview */}
              <div className="seo-serp-preview-card">
                <div className="seo-serp-url">
                  <span className="seo-serp-favicon">S</span>
                  <span>example.com › {currentKeyword.slug}</span>
                </div>
                <div className="seo-serp-headline">
                  Search Intelligence &amp; Ranking Data — Sample Result
                </div>
                <p className="seo-serp-snippet">{currentKeyword.snippet}</p>

                {(activeEngine === "aio" || currentKeyword.aioCited) && (
                  <div className="seo-aio-box">
                    <strong>★ Sample AI Overview Citation</strong>
                    <span>"{currentKeyword.aioQuote}"</span>
                  </div>
                )}

                <div className="seo-serp-features">
                  {currentKeyword.features.map((feat) => (
                    <span key={feat} className="seo-feature-pill">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mock interactive CTA */}
              <a
                href="/consultation"
                className="seo-serp-cta"
                onClick={(e) => leavePage(e, "/consultation")}
              >
                <span>Track your target keywords &amp; competitors</span>
                <Arrow />
              </a>
            </aside>
          </div>
        </section>

        {/* 2. Horizontal Tag Carousel */}
        <div className="knowledge-tag-rail" aria-label="Feature tags">
          {seoTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {/* 3. What We Deliver */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>02 — What we deliver</span>
            <span>Comprehensive search telemetry</span>
          </div>
          <div className="knowledge-split">
            <h2>
              Discover. Track.
              <br />
              Understand.
            </h2>
            <div>
              <p>
                From keyword research and ranking data to competitor visibility,
                backlinks, technical audits, and AI search signals, we collect
                and structure the data your team needs to make better search
                decisions.
              </p>
              <ItemList items={seoSignals} className="knowledge-list" />
            </div>
          </div>
        </section>

        {/* 4. Core Services Grid */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>03 — Core capabilities</span>
            <span>Eight search intelligence workflows</span>
          </div>
          <div className="knowledge-feature-grid">
            {seoServices.map((service, index) => (
              <article key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 5. Dark Section: Connected Data Sources */}
        <section className="knowledge-dark-section">
          <div className="section-meta">
            <span>04 — Connected data sources</span>
            <span>Search data directly from the source</span>
          </div>
          <div className="knowledge-dark-grid">
            <h2>
              Search data
              <br />
              from the source.
            </h2>
            <ItemList items={seoDataSources} className="knowledge-dark-list" />
          </div>
        </section>

        {/* 6. AI Workflows & MCP Paired */}
        <section className="knowledge-section knowledge-paired">
          <article>
            <div className="section-meta">
              <span>05 — AI workflows</span>
            </div>
            <h2>AI-assisted search intelligence.</h2>
            <p>
              Use configured AI workflows to organize keywords, interpret search
              data, identify changes, and turn recurring SEO signals into
              structured insights.
            </p>
            <ItemList items={seoAiWorkflows} className="knowledge-list" />
          </article>
          <article>
            <div className="section-meta">
              <span>06 — MCP &amp; AI agents</span>
            </div>
            <h2>Connect search intelligence to AI tools.</h2>
            <p>
              Connect compatible AI tools and agents to configured search
              intelligence workflows through MCP, allowing SEO data to be
              queried and used inside AI-assisted workflows.
            </p>
            <ItemList items={seoMcpCapabilities} className="knowledge-list" />
          </article>
        </section>

        {/* 7. Search Environments */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>07 — Search environments</span>
            <span>Search visibility across key environments</span>
          </div>
          <div className="knowledge-heading-row">
            <h2>
              One workflow.
              <br />
              Multiple search signals.
            </h2>
            <p>
              Search visibility extends beyond traditional rankings. We can
              structure intelligence across organic search, local results, SERP
              features, and supported AI-generated search signals.
            </p>
          </div>
          <div className="knowledge-team-grid">
            {seoSearchTypes.map((type, index) => {
              const isSelected = selectedSearchType === index
              return (
                <article
                  key={type.title}
                  className={`seo-interactive-type-card${
                    isSelected ? " is-selected" : ""
                  }`}
                  onClick={() =>
                    setSelectedSearchType(isSelected ? null : index)
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* 8. AI Capabilities (Numbered List) */}
        <section className="knowledge-section knowledge-control-section">
          <div className="knowledge-control-copy">
            <div className="section-meta">
              <span>08 — AI capabilities</span>
            </div>
            <h2>Adapt search intelligence to your workflow.</h2>
            <p>
              Configure prompts, schedules, reporting workflows, alert
              conditions, and output formats around your team’s search
              objectives.
            </p>
          </div>
          <ItemList
            items={seoAiCapabilities}
            className="knowledge-numbered-list"
          />
        </section>

        {/* 9. Dark Section: Technical Audits */}
        <section className="knowledge-dark-section knowledge-security-section">
          <div className="section-meta">
            <span>09 — Technical audits &amp; crawlers</span>
            <span>Technical SEO diagnostics</span>
          </div>
          <div className="knowledge-dark-grid">
            <div>
              <h2>
                Understand your
                <br />
                technical SEO health.
              </h2>
              <p>
                For teams that need structured technical SEO analysis across
                crawlability, metadata, indexing signals, structured data,
                links, and site architecture.
              </p>
            </div>
            <ItemList
              items={seoTechnicalAudit}
              className="knowledge-dark-list"
            />
          </div>
        </section>

        {/* 10. Integrations & Monitoring Duo */}
        <section className="knowledge-section knowledge-paired">
          <article>
            <div className="section-meta">
              <span>10 — Integrations</span>
            </div>
            <h2>Connect search intelligence to your workflow.</h2>
            <p>
              Deliver structured search data and insights into the tools and
              workflows your team already uses.
            </p>
            <ItemList items={seoIntegrations} className="knowledge-list" />
          </article>
          <article>
            <div className="section-meta">
              <span>11 — Monitoring &amp; alerts</span>
            </div>
            <h2>Scheduled monitoring &amp; alerts.</h2>
            <p>
              Monitor configured search signals and surface meaningful changes
              in rankings, competitor visibility, backlinks, and AI search
              signals.
            </p>
            <ItemList items={seoMonitoring} className="knowledge-list" />
          </article>
        </section>

        {/* 11. Use Cases Chips */}
        <section className="knowledge-section knowledge-use-section">
          <div className="section-meta">
            <span>12 — Use cases</span>
            <span>Search-focused teams</span>
          </div>
          <div className="knowledge-split">
            <h2>
              Built for search-
              <br />
              focused teams.
            </h2>
            <ItemList items={seoUseCases} className="knowledge-chip-list" />
          </div>
        </section>

        {/* 12. 5-Stage Process */}
        <section className="knowledge-section knowledge-process-section">
          <div className="section-meta">
            <span>13 — How it works</span>
            <span>From keywords to intelligence</span>
          </div>
          <div className="knowledge-heading-row">
            <h2>
              From keywords
              <br />
              to intelligence.
            </h2>
            <p>
              A structured five-stage process for defining search objectives,
              collecting data, analyzing signals, and delivering actionable
              intelligence.
            </p>
          </div>
          <div className="knowledge-process-grid">
            {seoProcess.map((step) => (
              <article key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 13. Custom Intelligence CTA */}
        <section className="knowledge-custom-section">
          <div>
            <p className="eyebrow">14 — Custom search intelligence</p>
            <h2>
              Built around your
              <br />
              search goals.
            </h2>
            <p>
              Every business targets different keywords, competitors, markets,
              and reporting requirements. We configure the search intelligence
              workflow around your objectives.
            </p>
            <a
              href="/consultation"
              onClick={(event) => leavePage(event, "/consultation")}
            >
              Build your search intelligence <Arrow />
            </a>
          </div>
          <ItemList
            items={seoCustomOptions}
            className="knowledge-custom-list"
          />
        </section>

        {/* Footer */}
        <footer className="scraping-footer">
          <div className="footer-left">
            <a
              href="/"
              className="wordmark"
              aria-label="quion home"
              onClick={(event) => leavePage(event, "/")}
            >
              <BrandLogo />
            </a>
            <span className="footer-copyright">
              &copy; 2026 Quion. All rights reserved.
            </span>
          </div>
          <div className="footer-legal">
            <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
              Terms &amp; Conditions
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="/privacy"
              onClick={(event) => leavePage(event, "/privacy")}
            >
              Privacy Policy
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href="/refund" onClick={(event) => leavePage(event, "/refund")}>
              Refund Policy
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export const SITE_URL = "https://quoin.online"

export const ROUTE_SEO: Record<
  string,
  {
    title: string
    description: string
    canonical: string
  }
> = {
  "/": {
    title: "Web Scraping, AI Assistants & SEO for Businesses | Quoin",
    description:
      "Quoin builds custom web scraping, internal knowledge assistants and SEO reporting for businesses. Every project is scoped in writing before work starts.",
    canonical: `${SITE_URL}/`,
  },
  "/scraping": {
    title: "Web Scraping & Data Extraction Service | Quoin",
    description:
      "Custom web scraping and data extraction for businesses: public data collected into CSV, JSON or a database, with a written scope and 7-day review.",
    canonical: `${SITE_URL}/scraping`,
  },
  "/knowledge-assistant": {
    title: "Internal Knowledge Assistant for Your Documents | Quoin",
    description:
      "An internal AI assistant that answers staff questions from your own documents and handbooks. Scoped, built and handed over as a project.",
    canonical: `${SITE_URL}/knowledge-assistant`,
  },
  "/seo": {
    title: "SEO & Search Intelligence for Businesses | Quoin",
    description:
      "Monthly SEO and search intelligence reports with specific, prioritised recommendations. No ranking or traffic guarantees.",
    canonical: `${SITE_URL}/seo`,
  },
  "/consultation": {
    title: "Book a Consultation | Quoin",
    description:
      "Describe the data, assistant or SEO project you need. Quoin replies with questions or a written quote.",
    canonical: `${SITE_URL}/consultation`,
  },
  "/terms": {
    title: "Terms & Conditions | Quoin",
    description:
      "Terms & Conditions for Quoin's services, covering payment, scope, deliverables, data protection and dispute resolution.",
    canonical: `${SITE_URL}/terms`,
  },
  "/privacy": {
    title: "Privacy Policy | Quoin",
    description:
      "How Quoin collects, uses, shares and protects personal data, and how to exercise your privacy rights.",
    canonical: `${SITE_URL}/privacy`,
  },
  "/refund": {
    title: "Refund & Cancellation Policy | Quoin",
    description:
      "When Quoin refunds fees, how to cancel a project or monthly service, and how refunds are processed.",
    canonical: `${SITE_URL}/refund`,
  },
}

function updateMetaTag(selector: string, attr: string, value: string) {
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    const match = selector.match(/meta\[([a-zA-Z:-]+)=['"]?([^'"]+)['"]?\]/)
    if (match) {
      element.setAttribute(match[1], match[2])
    }
    document.head.appendChild(element)
  }
  element.setAttribute(attr, value)
}

function updateCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.appendChild(link)
  }
  link.href = url
}

function ClientNotFound({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "#11110f",
        color: "#f4f4f0",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: "1rem",
        }}
      >
        404 Error
      </p>
      <h1 style={{ fontSize: "2.5rem", margin: "0 0 1rem 0", fontWeight: 600 }}>
        Page Not Found
      </h1>
      <p
        style={{
          maxWidth: "460px",
          opacity: 0.75,
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault()
          navigate("/")
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.875rem 2rem",
          borderRadius: "9999px",
          background: "#f4f4f0",
          color: "#11110f",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Return to Homepage
      </a>
    </div>
  )
}

export default function App() {
  useSmoothScroll({ ease: 0.085 })
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handleHistoryChange = () => {
      setRoute(window.location.pathname)
      window.scrollTo(0, 0)
    }

    window.addEventListener("popstate", handleHistoryChange)
    return () => window.removeEventListener("popstate", handleHistoryChange)
  }, [])

  useEffect(() => {
    const isKnown = route in ROUTE_SEO
    if (!isKnown) {
      document.title = "404 - Page Not Found | Quoin"
      return
    }

    const seo = ROUTE_SEO[route]
    document.title = seo.title
    updateMetaTag('meta[name="description"]', "content", seo.description)
    updateMetaTag('meta[property="og:title"]', "content", seo.title)
    updateMetaTag('meta[property="og:description"]', "content", seo.description)
    updateMetaTag('meta[property="og:url"]', "content", seo.canonical)
    updateMetaTag('meta[property="og:site_name"]', "content", "Quoin")
    updateMetaTag('meta[property="og:type"]', "content", "website")
    updateCanonicalUrl(seo.canonical)

    // Remove any Twitter tags if present
    const twitterTags = document.querySelectorAll(
      'meta[name^="twitter:"], meta[property^="twitter:"]'
    )
    twitterTags.forEach((tag) => tag.remove())

    // Homepage only Organization JSON-LD
    const schemaScript = document.getElementById("schema-org-data")
    if (route === "/") {
      if (!schemaScript) {
        const script = document.createElement("script")
        script.id = "schema-org-data"
        script.type = "application/ld+json"
        script.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Quoin",
          url: SITE_URL,
          email: "contact@quoin.online",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Greater Noida",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
        })
        document.head.appendChild(script)
      }
    } else if (schemaScript) {
      schemaScript.remove()
    }
  }, [route])

  function navigate(path: string) {
    if (path === route) return
    window.history.pushState({}, "", path)
    setRoute(path)
    window.scrollTo(0, 0)
  }

  const isKnownRoute = route in ROUTE_SEO

  if (!isKnownRoute) {
    return (
      <>
        <CustomCursor />
        <ClientNotFound navigate={navigate} />
      </>
    )
  }

  const isModalOpen =
    route === "/consultation" ||
    route === "/terms" ||
    route === "/privacy" ||
    route === "/refund" ||
    route === "/scraping" ||
    route === "/knowledge-assistant" ||
    route === "/seo"

  return (
    <>
      <CustomCursor />
      <HomePage navigate={navigate} isBackground={isModalOpen} />
      {route === "/seo" && <SeoPage navigate={navigate} />}
      {route === "/knowledge-assistant" && (
        <KnowledgeAssistantPage navigate={navigate} />
      )}
      {route === "/scraping" && <ScrapingPage navigate={navigate} />}
      {route === "/consultation" && <ConsultationPage navigate={navigate} />}
      {route === "/terms" && <TermsPage navigate={navigate} />}
      {route === "/privacy" && <PrivacyPage navigate={navigate} />}
      {route === "/refund" && <RefundPage navigate={navigate} />}
      <Chatbot navigate={navigate} />
    </>
  )
}
