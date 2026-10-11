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
      "A private assistant trained on your SOPs and handbook, giving your team reliable answers from approved sources.",
    features: [
      "Private, company-specific chatbot",
      "SOP and handbook ingestion",
      "Monthly knowledge refresh",
    ],
    setup: "From $299 setup",
    monthly: "$250 / month",
    price: "From $299",
  },
  {
    number: "03",
    letter: "S",
    title: "SEO & Search Intelligence",
    link: "/seo",
    audience: "For businesses wanting organic search growth",
    description:
      "Research, track, and improve your search visibility with continuous intelligence and reporting.",
    features: [
      "Rankings, clicks, and competitors",
      "Search performance audit",
      "Actionable recommendations",
    ],
    setup: "From $99 audit",
    monthly: "$99 / month",
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
    text: "We securely collect the required sources and configure your reporting workflow.",
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
    text: "We review performance, answer questions, and refine the service as needed.",
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
      "No long-term contracts. Managed services are billed monthly after the initial setup or audit. You can cancel before the next billing cycle with 30 days' written notice.",
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
      "Most engagements begin within 1–2 weeks of the consultation, depending on access to the required data and documents. You'll have your first delivery shortly after configuration.",
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
      "We only request the access needed to deliver the service. Each client gets a separate instance. Details about data handling, retention, and permissions are agreed during configuration. We comply with DPDP Act 2023 and GDPR where relevant.",
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
      "The standard packages are intentionally focused. If you need additional locations, competitors, or document sources, we can scope those separately via a change request.",
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
      "Our pricing is transparent and fixed:\n\n• Competitor Price Intelligence — $500 setup, $300/month\n• Internal Knowledge Assistant — $1,500 setup, $250/month\n• Local Search Reporting — $499 audit, $199/month/location\n\nAll prices in USD. No hidden fees.",
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
      "Our Competitor Price Intelligence service monitors up to 5 competitors weekly, delivering price and stock reports in a structured Google Sheet with alerts on price drops. Perfect for e-commerce brands.",
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
      "The Internal Knowledge Assistant is a private chatbot trained on your SOPs and handbook. It gives your team reliable answers from approved sources, with monthly content refreshes. Ideal for service businesses with 20–100 employees.",
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
      "Local Search Reporting provides a monthly scorecard covering rankings, clicks, competitors, Google Business Profile review, and 3 recommended fixes. Built for dentists, law firms, HVAC companies, and med spas.",
  },
  {
    keywords: ["process", "how", "work", "step", "workflow"],
    answer:
      "Our 4-step process:\n\n01 — Consultation: We confirm fit, scope, and business decisions.\n02 — Configuration: We collect sources and set up your workflow.\n03 — Delivery: You receive output on a clear schedule.\n04 — Review: We review performance and refine as needed.",
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
      "You can book a free 30-minute consultation through our website. It's a focused, no-obligation first conversation where we confirm whether Quoin is a fit for your needs. No sales pressure.",
  },
  {
    keywords: ["refund", "money back", "guarantee"],
    answer:
      "Setup fees are non-refundable once work has begun. Recurring fees are non-refundable for a period already started. However, if we fail to deliver a month's deliverables for reasons within our control, we'll credit or refund that month's fee on a pro-rata basis.",
  },
  {
    keywords: [
      "ai",
      "artificial intelligence",
      "automated",
      "machine learning",
    ],
    answer:
      "Some of our deliverables use AI for assistant answers and report summaries. AI output is for general business information — not legal, HR, or financial advice. You should review output before relying on it for important decisions.",
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
      "Quoin provides operational intelligence for growing businesses. We turn recurring operational questions into dependable workflows through three managed services with fixed pricing and clear deliverables.",
  },
]

const chatTopics = [
  { label: "Pricing", query: "pricing" },
  { label: "Getting started", query: "how to start" },
  { label: "Data security", query: "data security" },
  { label: "Services", query: "what do you do" },
  { label: "Process", query: "how does it work" },
  { label: "Book a call", query: "consultation" },
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
          "\n\n*(I've successfully submitted your requirements to our team! We will be in touch shortly.)*"
      } else if (data.duplicateLead) {
        botText +=
          "\n\n*(Your requirements have already been submitted. We'll be in touch soon!)*"
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
                <span>Always online · Instant replies</span>
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


function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".section-heading, .service-card, .process-list article, .process-outcome, .pricing-row, .faq-item, .home-footer",
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
          Each service has a defined scope, clear cadence, and a useful
          output your team can act on.
        </p>
      </div>

      {/* 3. Three Operating Standards Bar */}
      <div className="service-standards">
        <div>
          <span>Commercial model</span>
          <strong>Fixed base pricing</strong>
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
              className={`service-card${isInteractive ? " is-interactive" : ""}`}
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
                  <span>{service.setup}</span>
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
}: {
  onNavigate?: (path: string) => void
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
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
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
            We turn recurring operational questions into dependable
            workflows.
          </p>

          <h1 id="hero-title">
            Operational intelligence for growing businesses.
          </h1>

          <div className="hero-bottom">
            <p>
              Three managed services with fixed pricing and clear
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
            <span>Fixed pricing</span>
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
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="site-shell" aria-hidden={isBackground ? true : undefined}>
      <header className="site-header">
        <a
          href="#top"
          className="wordmark"
          aria-label="Quoin home"
          data-magnetic
          data-magnetic-strength="0.25"
          onClick={(event) => scrollToSection(event, "top")}
        >
          <span data-magnetic-inner>
            Quoin<span>®</span>
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
        <HeroSection onNavigate={navigate} />

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
      </main>
      <footer className="home-footer">
        <a
          href="#top"
          className="wordmark"
          onClick={(event) => scrollToSection(event, "top")}
        >
          Quoin<span>®</span>
        </a>
        <a href="/terms" onClick={(event) => openPage(event, "/terms")}>
          Terms &amp; conditions
        </a>
        <a
          href="/consultation"
          onClick={(event) => openPage(event, "/consultation")}
        >
          Book a consultation <Arrow />
        </a>
      </footer>
    </div>
  )
}

function ConsultationPage({ navigate }: { navigate: Navigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [serviceOpen, setServiceOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [serviceError, setServiceError] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
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
    setServiceError(!selectedService)
    setSubmitted(false)
    setSubmitError("")

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.phone ||
      nextErrors.message ||
      !selectedService
    ) {
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Submission failed.")
      }

      setSubmitted(true)
      setServiceError(false)
      setFieldErrors({ name: "", email: "", phone: "", message: "" })
      setSelectedService("")
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
          aria-label="Quoin home"
          onClick={(event) => leavePage(event, "/")}
        >
          Quoin<span>®</span>
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
              <label>
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  onChange={() =>
                    setFieldErrors((errors) => ({ ...errors, name: "" }))
                  }
                />
                {fieldErrors.name && (
                  <p className="field-error" id="name-error" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </label>
              <label>
                <span>Work email</span>
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
                {fieldErrors.email && (
                  <p className="field-error" id="email-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </label>
            </div>
            <label>
              <span>Phone number</span>
              <input
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                onChange={() =>
                  setFieldErrors((errors) => ({ ...errors, phone: "" }))
                }
              />
              {fieldErrors.phone && (
                <p className="field-error" id="phone-error" role="alert">
                  {fieldErrors.phone}
                </p>
              )}
            </label>
            <div
              className="service-select-field"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setServiceOpen(false)
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setServiceOpen(false)
              }}
            >
              <span>Service</span>
              <input type="hidden" name="service" value={selectedService} />
              <button
                type="button"
                className="service-select-trigger"
                aria-haspopup="listbox"
                aria-expanded={serviceOpen}
                aria-controls="service-options"
                onClick={() => setServiceOpen((open) => !open)}
              >
                <span className={selectedService ? "" : "placeholder"}>
                  {selectedService || "Select a service"}
                </span>
                <i aria-hidden="true" />
              </button>
              <div
                className={`service-options ${serviceOpen ? "is-open" : ""}`}
                id="service-options"
                role="listbox"
                aria-label="Select a service"
              >
                {[
                  ...services.map((service) => service.title),
                  "Not sure yet",
                ].map((service, index) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedService === service}
                    key={service}
                    onClick={() => {
                      setSelectedService(service)
                      setServiceError(false)
                      setServiceOpen(false)
                    }}
                  >
                    <span>0{index + 1}</span>
                    <strong>{service}</strong>
                    <i aria-hidden="true" />
                  </button>
                ))}
              </div>
              {serviceError && (
                <p className="field-error" role="alert">
                  Please select a service.
                </p>
              )}
            </div>
            <label>
              <span>What would you like to improve?</span>
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
              {fieldErrors.message && (
                <p className="field-error" id="message-error" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </label>
            <button
              className="button button-acid consultation-submit"
              type="submit"
              disabled={submitting}
              style={{ opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Sending..." : "Book a consultation"} <Arrow />
            </button>
            {submitted && (
              <p className="form-success" role="status">
                Thank you. We've received your request and will reply within two
                business days.
              </p>
            )}
            {submitError && (
              <p className="field-error" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
        <footer>
          <a
            href="/"
            className="wordmark"
            onClick={(event) => leavePage(event, "/")}
          >
            Quoin<span>®</span>
          </a>
          <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
            Terms &amp; conditions
          </a>
          <a href="/" onClick={(event) => leavePage(event, "/")}>
            Return home <Arrow />
          </a>
        </footer>
      </main>
    </div>
  )
}

function TermsPage({ navigate }: { navigate: Navigate }) {
  const [leaving, setLeaving] = useState(false)

  function openHome(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate("/")
    }, 420)
  }

  return (
    <div className={`site-shell terms-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="Quoin home"
          onClick={openHome}
        >
          Quoin<span>®</span>
        </a>
        <span className="consultation-header-label">Legal / 06</span>
        <a href="/" className="header-cta" onClick={openHome}>
          Back to home
        </a>
      </header>
      <main className="terms-page">
        <div className="section-meta">
          <span>06 — Legal</span>
          <span>Last updated — Oct 10, 2026 · @Xeron</span>
        </div>
        <div className="terms-heading">
          <p className="eyebrow">Quoin / Terms</p>
          <h1>
            Terms &amp;
            <br />
            conditions.
          </h1>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Agreement and Acceptance</h2>
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) are a binding
              agreement between Quoin (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;), and the business or person that engages us or
              uses our website (&ldquo;Client&rdquo;, &ldquo;you&rdquo;). You
              accept these Terms when you submit an enquiry form, accept a
              proposal, pay an invoice, or use the Services.
            </p>
            <p>
              If you accept on behalf of a company, you confirm you have
              authority to bind it. The Services are for business use only. If a
              signed proposal or order form conflicts with these Terms, the
              proposal controls for that engagement only.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Definitions</h2>
            <ul>
              <li>
                <strong>Services:</strong> the managed services described in
                Section 3.
              </li>
              <li>
                <strong>Proposal:</strong> the written quote, order form, or
                statement of work we issue and you accept, setting out the
                Services, scope, schedule, and Fees.
              </li>
              <li>
                <strong>Deliverables:</strong> reports, spreadsheets, alerts,
                scorecards, configured assistants, and other outputs we produce
                for you under a Proposal.
              </li>
              <li>
                <strong>Client Materials:</strong> documents, data, credentials,
                access rights, and other content you provide to us, including
                SOPs, handbooks, and price sheets.
              </li>
              <li>
                <strong>Public Sources:</strong> web pages and data that anyone
                can view without logging in, paying, or bypassing an access
                restriction.
              </li>
              <li>
                <strong>Third-Party Tools:</strong> software, platforms, and
                services operated by others that we use or that you subscribe to
                in connection with the Services.
              </li>
              <li>
                <strong>Fees:</strong> all amounts payable under a Proposal,
                including setup and recurring fees.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. The Services</h2>
            <p>
              We provide the following managed services. Exact scope, volumes,
              and schedule are set out in your Proposal.
            </p>
            <h3>3.1 Competitor Price Intelligence</h3>
            <p>
              We monitor publicly available product pages of up to the number of
              competitors named in your Proposal (typically five) and deliver a
              weekly price and stock report in a shared spreadsheet, with alerts
              on price reductions. Alerts are sent on a best-efforts basis, with
              a target of one business day from detection.
            </p>
            <h3>3.2 Internal Knowledge Assistant</h3>
            <p>
              We configure a private chatbot that answers staff questions using
              the Client Materials you supply, such as SOPs, handbooks, and
              price sheets. We refresh its content monthly from updated
              documents you provide. Each Client receives a separate instance.
            </p>
            <h3>3.3 Local Search Reporting</h3>
            <p>
              We deliver a monthly scorecard covering the keywords, search
              clicks, competitors, Google Business Profile review, and
              recommended actions stated in your Proposal. We may also provide a
              one-time initial audit. This service is reporting and
              recommendation only. We do not implement changes to your website
              or profiles unless agreed in writing.
            </p>
            <h3>3.4 Changes and additional work</h3>
            <p>
              We may update our methods, tools, and formats if the Services
              remain materially equivalent. Work outside the Proposal, including
              extra competitors, locations, keywords, or documents, requires a
              written change request and may carry additional Fees.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Engagement, Onboarding, and Acceptance of Deliverables</h2>
            <p>
              A Proposal becomes binding when you accept it in writing,
              including by email or electronic signature, or when you pay the
              first invoice. Work begins once we receive the setup Fee, the
              Client Materials, and any access we need.
            </p>
            <p>
              We will deliver on the schedule in the Proposal. Delays caused by
              late or incomplete Client Materials, or by missing access, extend
              our timelines by the same period.
            </p>
            <p>
              Each Deliverable is deemed accepted unless you notify us of a
              material defect within seven days of delivery. We will correct a
              reported defect within a reasonable time. Corrections are your
              remedy for defective Deliverables, in addition to any rights that
              cannot be excluded by law.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Client Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>
                Provide accurate, complete, and timely information, and name one
                contact who can approve decisions.
              </li>
              <li>
                Ensure you own or have the right to share all Client Materials,
                and that sharing them with us does not breach any law, contract,
                or third-party right.
              </li>
              <li>
                Not include passwords, government ID numbers, payment card data,
                or medical records in Client Materials unless we have agreed in
                writing how they will be protected.
              </li>
              <li>
                Grant and maintain the access we reasonably need, such as
                spreadsheet sharing and Google Business Profile access. You may
                revoke access at any time, but Services depending on it may
                stop.
              </li>
              <li>
                Keep your own Third-Party Tool subscriptions active and paid
                where the Proposal requires.
              </li>
              <li>
                For the Internal Knowledge Assistant, tell your staff it is an
                automated tool, review its answers for important decisions, and
                keep its content current by sending us updated documents.
              </li>
              <li>
                Use the Services and Deliverables only for lawful business
                purposes and in line with Section 8.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Fees, Payment, and Taxes</h2>
            <h3>6.1 Fees</h3>
            <p>
              Fees are stated in your Proposal in USD. Prices on our website are
              for guidance only and do not bind us.
            </p>
            <h3>6.2 Billing</h3>
            <p>
              Setup Fees are due before work begins. Recurring Fees are invoiced
              monthly in advance and are due within 7 days of the invoice date.
            </p>
            <h3>6.3 Third-party costs</h3>
            <p>
              Subscription, hosting, and data costs charged by Third-Party
              Tools, such as the platform that hosts your assistant, are
              separate from our Fees. Where the Proposal says you pay them, you
              pay the provider directly or reimburse us at cost.
            </p>
            <h3>6.4 Taxes</h3>
            <p>
              Fees exclude GST, VAT, sales tax, and similar taxes, which you pay
              in addition where applicable. If law requires you to withhold tax,
              you will gross up the payment unless the Proposal says otherwise.
            </p>
            <h3>6.5 Late payment</h3>
            <p>
              Overdue amounts accrue interest at 1.5% per month, or the highest
              rate allowed by law if lower. If an invoice remains unpaid 10 days
              after written notice, we may suspend the Services until it is
              paid.
            </p>
            <h3>6.6 Refunds</h3>
            <p>
              Setup Fees are non-refundable once work has begun. Recurring Fees
              are non-refundable for a period already started, except that if we
              fail to deliver a month's Deliverables for reasons within our
              control, we will credit or refund that month's Fee on a pro-rata
              basis.
            </p>
            <h3>6.7 Price changes</h3>
            <p>
              We may change recurring Fees on at least 30 days' written notice.
              If you do not agree, you may terminate under Section 13 before the
              change takes effect.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Third-Party Tools and Platforms</h2>
            <p>
              We deliver the Services using open-source software and third-party
              platforms, including data providers, spreadsheet services, AI
              model providers, and chatbot hosting platforms. Your use of any
              Third-Party Tool you subscribe to is governed by that provider's
              own terms.
            </p>
            <p>
              We do not control Third-Party Tools and are not responsible for
              their outages, changes, pricing, or discontinuation. If a
              Third-Party Tool becomes unavailable or unsuitable, we may replace
              it with an equivalent one and will tell you if the change
              materially affects the Deliverables.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Data Collection from Public Sources and Acceptable Use</h2>
            <h3>8.1 Public Sources only</h3>
            <p>
              Our monitoring and reporting collect data only from Public
              Sources. We do not log in to competitor accounts, access private
              or paid areas, or collect personal data about individuals.
            </p>
            <h3>8.2 Right to decline</h3>
            <p>
              We may decline, pause, or stop collecting from any source if we
              reasonably believe it could breach the law, a site's terms, or a
              third party's rights. If this affects a competitor you named, we
              will tell you and offer a replacement source or a pro-rata credit.
            </p>
            <h3>8.3 Competition law</h3>
            <p>
              You will use price and stock data only to make your own
              independent pricing decisions. You will not use the Services to
              agree, coordinate, or exchange prices with competitors, or for any
              other conduct that breaches competition or antitrust law.
            </p>
            <h3>8.4 Prohibited use</h3>
            <p>You will not use the Services or Deliverables to:</p>
            <ul>
              <li>Break the law or infringe another party's rights.</li>
              <li>Deceive, harass, or spam anyone.</li>
              <li>
                Upload malware or attempt to disrupt or gain unauthorised access
                to our systems or Third-Party Tools.
              </li>
              <li>
                Reverse engineer, resell, or sublicense our methods,
                configurations, or tools.
              </li>
              <li>
                Present assistant output as professional legal, HR, medical, or
                financial advice.
              </li>
            </ul>
            <p>
              We may suspend the Services immediately if you breach this
              Section.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. AI-Generated Output</h2>
            <p>
              Some Deliverables, including assistant answers and report
              summaries, are produced with artificial intelligence. AI output
              can be incomplete, outdated, or wrong, and an assistant can only
              answer as well as the documents it was given.
            </p>
            <p>
              Output is for general business information. It is not legal, HR,
              medical, tax, or financial advice. You are responsible for
              reviewing output before relying on it, especially for decisions
              affecting employees, customers, pricing, or compliance.
            </p>
            <p>
              We select AI providers whose terms, where available, do not allow
              them to train their models on your Client Materials. We cannot
              guarantee how any provider handles data beyond its own terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. No Guarantee of Results</h2>
            <p>
              We do not guarantee any business outcome, including search
              rankings, website traffic, sales, cost savings, competitive
              position, or onboarding speed. Search engine algorithms,
              competitor behaviour, and website changes are outside our control.
            </p>
            <p>
              Price, stock, and ranking data reflect what was visible at the
              time of collection and may be delayed, incomplete, or affected by
              regional or personalised results. Time targets and example figures
              on our website or in Proposals are estimates, not commitments.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Intellectual Property</h2>
            <h3>11.1 Your materials</h3>
            <p>
              You keep all rights in the Client Materials. You grant us a
              limited, non-exclusive licence to use them only to provide the
              Services to you.
            </p>
            <h3>11.2 Our materials</h3>
            <p>
              We keep all rights in our software, scripts, templates,
              configurations, methods, and know-how, including anything we
              create before or apart from your engagement (&ldquo;Our
              Materials&rdquo;). Open-source components remain under their own
              licences.
            </p>
            <h3>11.3 Licence to Deliverables</h3>
            <p>
              Once you have paid the applicable Fees, we grant you a
              non-exclusive, non-transferable licence to use the Deliverables
              for your internal business purposes for as long as you continue to
              hold them. This does not transfer ownership of Our Materials, and
              you may not resell the Deliverables.
            </p>
            <h3>11.4 Aggregated insights</h3>
            <p>
              We may use anonymised, aggregated statistics that cannot identify
              you or your customers to improve our Services.
            </p>
            <h3>11.5 Feedback</h3>
            <p>
              You grant us a free, perpetual licence to use suggestions you give
              us about the Services.
            </p>
            <h3>11.6 Publicity</h3>
            <p>
              We will not use your name or logo publicly without your written
              consent.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Client Data, Confidentiality, and Privacy</h2>
            <h3>12.1 Confidentiality</h3>
            <p>
              Each party will keep the other's non-public business information
              confidential, use it only for the Services, and share it only with
              personnel and providers who need it and are bound by similar
              duties. This does not cover information that is public through no
              fault of the recipient, was already known to it, was independently
              developed, or must be disclosed by law, in which case the
              recipient will give prompt notice where permitted. These duties
              last for three years after the Services end, and for trade secrets
              as long as they remain secret.
            </p>
            <h3>12.2 Security</h3>
            <p>
              We use reasonable technical and organisational measures to protect
              Client Materials, including access controls and a separate
              assistant instance for each Client. We will notify you without
              undue delay after confirming a security incident that affects your
              Client Materials.
            </p>
            <h3>12.3 Personal data</h3>
            <p>
              Each party will comply with data protection laws that apply to it,
              including India's Digital Personal Data Protection Act, 2023 and,
              where relevant, the GDPR. If Client Materials contain personal
              data, you confirm you have a lawful basis to share it, and we will
              process it only on your instructions to provide the Services. We
              will sign a data processing agreement on request.
            </p>
            <h3>12.4 Return and deletion</h3>
            <p>
              On request within 30 days after the Services end, we will return
              your Client Materials in a standard format. We will then delete
              them from our active systems within 30 days, and from backups
              within 90 days, unless law requires us to keep them.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Term and Termination</h2>
            <h3>13.1 Term</h3>
            <p>
              Each Proposal starts on acceptance and, for recurring Services,
              renews month to month until ended under this Section.
            </p>
            <h3>13.2 For convenience</h3>
            <p>
              Either party may end recurring Services on 30 days' written
              notice, effective at the end of the billing period in which the
              notice period expires.
            </p>
            <h3>13.3 For cause</h3>
            <p>
              Either party may end the agreement immediately by written notice
              if the other commits a material breach and does not fix it within
              14 days of notice, or becomes insolvent. We may end it immediately
              if you breach Section 8.
            </p>
            <h3>13.4 Effects</h3>
            <p>
              On termination, we stop the Services and you pay all Fees due up
              to the end date. We will deliver any completed Deliverables for
              the period paid. Section 12.4 applies to your Client Materials.
            </p>
            <h3>13.5 Survival</h3>
            <p>
              Sections 6 (for unpaid amounts), 10 to 12, 14 to 16, 18, and 19
              survive termination.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Warranties and Disclaimers</h2>
            <p>
              We will perform the Services with reasonable skill and care. Each
              party confirms it has authority to enter into this agreement.
            </p>
            <p>
              Except as stated in these Terms, and to the fullest extent
              permitted by law, the Services and Deliverables are provided
              &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We disclaim
              all other warranties, express or implied, including
              merchantability, fitness for a particular purpose, accuracy, and
              non-infringement. We do not warrant that the Services will be
              uninterrupted or error-free.
            </p>
          </section>

          <section className="terms-section">
            <h2>15. Limitation of Liability</h2>
            <h3>15.1 Excluded losses</h3>
            <p>
              To the fullest extent permitted by law, neither party is liable
              for indirect, incidental, special, or consequential loss, or for
              loss of profit, revenue, goodwill, business opportunity, or data,
              however caused and even if advised of the possibility.
            </p>
            <h3>15.2 Cap</h3>
            <p>
              Each party's total liability arising out of or relating to this
              agreement is limited to the Fees you paid us in the six months
              before the event giving rise to the claim.
            </p>
            <h3>15.3 Exceptions</h3>
            <p>
              Nothing in these Terms limits liability for fraud, wilful
              misconduct, death or personal injury caused by negligence, your
              obligation to pay Fees, or any liability that cannot be limited by
              law. The cap in 15.2 also does not apply to a breach of Section
              12.1 or to your indemnity in Section 16.
            </p>
            <h3>15.4 Basis of the bargain</h3>
            <p>
              You agree these limits reflect the price of the Services and are a
              fair allocation of risk.
            </p>
          </section>

          <section className="terms-section">
            <h2>16. Indemnification</h2>
            <p>
              You will defend and indemnify us, our personnel, and our providers
              against third-party claims, and resulting losses and reasonable
              legal costs, arising from: (a) Client Materials or our use of them
              as permitted by these Terms; (b) your breach of Section 5 or
              Section 8; or (c) your use of the Deliverables in breach of law.
            </p>
            <p>
              We will give you prompt notice of a claim, let you control its
              defence and settlement (but not settle in a way that admits fault
              on our behalf without our consent), and reasonably cooperate at
              your cost.
            </p>
          </section>

          <section className="terms-section">
            <h2>17. Force Majeure</h2>
            <p>
              Neither party is liable for a delay or failure caused by events
              beyond its reasonable control, including natural disaster, war,
              civil unrest, government action, power or internet outages,
              failure of Third-Party Tools or cloud providers, or changes to a
              website that block collection. The affected party will tell the
              other promptly and resume as soon as reasonably possible. This
              does not excuse payment of Fees already due. If the event lasts
              more than 30 days, either party may end the affected Services.
            </p>
          </section>

          <section className="terms-section">
            <h2>18. Governing Law and Dispute Resolution</h2>
            <h3>18.1 Governing law</h3>
            <p>
              These Terms are governed by the laws of India, without regard to
              conflict-of-law rules.
            </p>
            <h3>18.2 Informal resolution</h3>
            <p>
              Before starting formal proceedings, the parties will try in good
              faith to resolve a dispute through written notice and discussion
              for 30 days.
            </p>
            <h3>18.3 Arbitration</h3>
            <p>
              Any dispute not resolved under 18.2 will be finally settled by
              arbitration under the Arbitration and Conciliation Act, 1996.
              There will be one arbitrator, the venue will be agreed by the
              parties, and the language will be English. The award is final and
              binding.
            </p>
            <h3>18.4 Urgent relief</h3>
            <p>
              Either party may seek an injunction or similar urgent relief from
              a competent court to protect confidential information or
              intellectual property.
            </p>
            <h3>18.5 Courts</h3>
            <p>
              Subject to 18.3, the competent courts have exclusive jurisdiction.
            </p>
          </section>

          <section className="terms-section">
            <h2>19. General Provisions</h2>
            <ul>
              <li>
                <strong>Entire agreement:</strong> These Terms and your Proposal
                are the whole agreement and replace earlier discussions and
                proposals.
              </li>
              <li>
                <strong>Changes to these Terms:</strong> We may update these
                Terms. For existing Clients, changes take effect 30 days after
                we notify you, and you may terminate under Section 13 if you
                object. Changes to the website version apply to new engagements
                from the date posted.
              </li>
              <li>
                <strong>Order of precedence:</strong> The Proposal controls over
                these Terms for that engagement only.
              </li>
              <li>
                <strong>Severability:</strong> If a provision is unenforceable,
                the rest remains in effect and the provision is limited to the
                minimum extent necessary.
              </li>
              <li>
                <strong>No waiver:</strong> Delay in enforcing a right is not a
                waiver of it.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign this agreement
                without our written consent. We may assign it to an affiliate or
                a successor to our business.
              </li>
              <li>
                <strong>Independent contractors:</strong> The parties are
                independent. Nothing creates a partnership, employment, or
                agency relationship.
              </li>
              <li>
                <strong>No third-party rights:</strong> Only the parties may
                enforce this agreement.
              </li>
              <li>
                <strong>Notices:</strong> Notices are valid if sent by email to
                the addresses in the Proposal, and take effect when sent unless
                a delivery failure notice is received.
              </li>
              <li>
                <strong>Electronic acceptance:</strong> The parties may accept
                and sign electronically and in counterparts.
              </li>
            </ul>
          </section>

          <div className="terms-footer">
            <span className="eyebrow">Quoin Legal</span>
            <a href="/" className="header-cta" onClick={openHome}>
              Return to home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export const scrapingServices = [
  {
    title: "Website Data Extraction",
    description:
      "Extract specific information from websites and deliver it in a structured format.",
  },
  {
    title: "Dynamic Web Scraping",
    description:
      "Collect data from JavaScript-powered and dynamically rendered websites.",
  },
  {
    title: "Web Crawling",
    description:
      "Discover and collect information across multiple pages or entire websites.",
  },
  {
    title: "Adaptive Scraping",
    description:
      "Build resilient extraction workflows that can handle changes in website structure.",
  },
  {
    title: "Browser-Based Scraping",
    description:
      "Interact with websites through real browser environments when traditional requests are not enough.",
  },
  {
    title: "API & Network Data",
    description:
      "Capture publicly accessible data delivered through APIs and network requests.",
  },
  {
    title: "E-Commerce Scraping",
    description:
      "Collect product details, pricing, availability, categories, ratings, and more.",
  },
  {
    title: "Custom Data Extraction",
    description:
      "Define exactly what information you need and receive a workflow built around your requirements.",
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
  "Knowledge bases",
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
  { step: "01", title: "Define", description: "Tell us what data you need." },
  {
    step: "02",
    title: "Extract",
    description: "We collect information from your approved target sources.",
  },
  {
    step: "03",
    title: "Structure",
    description: "Raw information is cleaned and organized into usable data.",
  },
  {
    step: "04",
    title: "Deliver",
    description: "Receive your dataset in the format your workflow needs.",
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
          aria-label="Quoin home"
          onClick={(event) => leavePage(event, "/")}
        >
          Quoin<span>®</span>
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
            <span>01 — Web scraping</span>
            <span>Custom and recurring extraction</span>
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
                <strong>JSON · CSV · XML · Markdown</strong>
              </div>
            </aside>
          </div>
        </section>

        {/* 2. Intro Section */}
        <section className="scraping-intro scraping-section">
          <div className="section-meta">
            <span>02 — What we do</span>
            <span>Extract · Structure · Deliver</span>
          </div>
          <div className="scraping-split-heading">
            <h2>
              Extract. Structure.
              <br />
              Deliver.
            </h2>
            <p>
              We collect and transform web data into organized datasets tailored
              to your requirements—from individual pages to large-scale
              websites.
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
            <span>Fields configured to your brief</span>
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
              From extracting a handful of fields from one page to crawling
              thousands of pages, the workflow is tailored to your project.
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>06 — Format</span>
            </div>
            <h2>Data that fits your workflow.</h2>
            <h3>Your data. Your format.</h3>
            <p>
              Receive extracted information in formats that connect cleanly with
              the systems your team already uses.
            </p>
            <div className="scraping-format">
              JSON · CSV · XML · JSONL · Markdown · HTML
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
              <h2>Turn the web into structured context.</h2>
              <p>
                Collect, clean, and structure web content for modern AI
                workflows.
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
              boundaries, and delivery formats clear from the start.
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
            Every website is different. We can build an extraction workflow
            around your target source, required fields, output format, and
            scale.
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
          <a
            href="/"
            className="wordmark"
            onClick={(event) => leavePage(event, "/")}
          >
            Quoin<span>®</span>
          </a>
          <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
            Terms &amp; conditions
          </a>
          <a href="/" onClick={(event) => leavePage(event, "/")}>
            Return home <Arrow />
          </a>
        </footer>
      </main>
    </div>
  )
}

export const ScrapingContent = ScrapingPage

export const knowledgeTags = [
  "RAG",
  "Knowledge Bases",
  "AI Agents",
  "AI Workflows",
  "Document Processing",
  "Semantic Search",
  "Contextual Answers",
  "Multi-Model AI",
  "API Integration",
  "MCP",
  "Self-Hosted AI",
  "LLMOps",
  "Custom Tools",
  "Enterprise Knowledge",
  "AI Automation",
]

export const knowledgeSources = [
  "Internal documentation",
  "Company policies",
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
      "Centralize your organization's information into searchable knowledge bases.",
  },
  {
    title: "Intelligent Q&A",
    description:
      "Ask questions naturally and receive answers based on your organization's knowledge.",
  },
  {
    title: "Document Understanding",
    description:
      "Process and retrieve information from PDFs, presentations, and other supported formats.",
  },
  {
    title: "Context-Aware Responses",
    description:
      "Give the assistant relevant context before generating an answer.",
  },
  {
    title: "Multiple Knowledge Sources",
    description:
      "Organize information across departments, projects, and knowledge collections.",
  },
  {
    title: "Source-Aware Answers",
    description:
      "Provide references to the information used so users can verify each response.",
  },
  {
    title: "Conversational Interface",
    description:
      "Let employees interact with company knowledge through a familiar chat experience.",
  },
  {
    title: "Custom AI Models",
    description:
      "Connect the assistant to the AI model that best fits your requirements.",
  },
]

export const knowledgeConnections = [
  "PDF documents",
  "Presentations",
  "Text documents",
  "FAQs",
  "Internal documentation",
  "Product manuals",
  "Company policies",
  "SOPs",
  "Knowledge bases",
  "Structured datasets",
  "External data sources",
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
      "Policies, employee guidelines, onboarding, and internal processes.",
  },
  {
    title: "Support",
    description:
      "Product documentation, troubleshooting guides, and FAQs.",
  },
  {
    title: "Engineering",
    description:
      "Technical documentation, APIs, architecture, and development knowledge.",
  },
  {
    title: "Sales",
    description:
      "Product information, sales material, and internal resources.",
  },
  {
    title: "Operations",
    description:
      "SOPs, workflows, procedures, and operational documentation.",
  },
  {
    title: "Management",
    description:
      "Company information, reports, and internal knowledge.",
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
  "API-based integration",
  "Configurable AI workflows",
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
      "Provide your organization's documents and knowledge sources.",
  },
  {
    step: "02",
    title: "Organize",
    description:
      "Structure information into searchable knowledge bases.",
  },
  {
    step: "03",
    title: "Understand",
    description:
      "The system processes and indexes your knowledge for retrieval.",
  },
  {
    step: "04",
    title: "Ask",
    description:
      "Employees interact with the assistant using natural language.",
  },
  {
    step: "05",
    title: "Answer",
    description:
      "The assistant retrieves relevant information and generates a contextual response.",
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
      className={`knowledge-page site-shell consultation-shell${leaving ? " is-leaving" : ""}`}
    >
      {/* Header */}
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="Quoin home"
          onClick={(event) => leavePage(event, "/")}
        >
          Quoin<span>®</span>
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
            <span>Private organizational knowledge</span>
          </div>
          <div className="knowledge-hero-grid">
            <div>
              <p className="eyebrow">
                Company knowledge / Conversational access
              </p>
              <h1>Internal Knowledge Assistant.</h1>
              <h2>
                Your company’s knowledge, available through a conversation.
              </h2>
              <p>
                Turn internal documents, processes, policies, and knowledge into
                an AI-powered assistant that can answer questions, find
                information, and help your team get work done.
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
                <span>Quoin Knowledge</span>
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
                <small>Employee Handbook · Source verified</small>
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
            <span>One place for your team’s knowledge</span>
          </div>
          <div className="knowledge-split">
            <h2>
              One place for your
              <br />
              team’s knowledge.
            </h2>
            <div>
              <p>
                Connect your organization’s knowledge sources and give your team
                a simple way to find the information they need.
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
            <span>Bring your knowledge with you</span>
          </div>
          <div className="knowledge-dark-grid">
            <h2>
              Bring your
              <br />
              knowledge with you.
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
            <h2>More than questions and answers.</h2>
            <p>
              Build automated AI workflows around your organization’s knowledge.
            </p>
            <ItemList items={knowledgeWorkflows} className="knowledge-list" />
            <p className="knowledge-evidence">
              Dify supports visual workflow construction and testing.
              <span>Source: GitHub</span>
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>06 — AI agents</span>
            </div>
            <h2>Give your assistant the ability to act.</h2>
            <p>
              Go beyond answers by connecting AI agents with tools and external
              services.
            </p>
            <ItemList items={knowledgeAgents} className="knowledge-list" />
            <p className="knowledge-evidence">
              Dify supports agents with tools, APIs, MCP servers, and
              marketplace integrations.
              <span>Source: GitHub</span>
            </p>
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
              Create focused knowledge experiences for different parts of your
              organization.
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
            <h2>Adapt the assistant to your business.</h2>
            <p>
              Configure models, instructions, outputs, and workflows around your
              requirements.
            </p>
            <p className="knowledge-evidence">
              Dify supports proprietary, open-source, and self-hosted model
              providers.
              <span>Source: GitHub</span>
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
            <span>Private infrastructure options</span>
          </div>
          <div className="knowledge-dark-grid">
            <div>
              <h2>
                Keep your knowledge
                <br />
                under control.
              </h2>
              <p>
                For organizations that need greater control over their AI
                infrastructure and data environment.
              </p>
              <p className="knowledge-evidence">
                Dify supports self-hosted, cloud, and VPC deployment options.
                <span>Source: GitHub</span>
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
            <h2>Connect AI to your existing stack.</h2>
            <ItemList
              items={knowledgeIntegrations}
              className="knowledge-list"
            />
            <p className="knowledge-evidence">
              Dify exposes APIs that integrate with applications and business
              logic.
              <span>Source: GitHub</span>
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>11 — Monitoring</span>
            </div>
            <h2>Understand how your assistant performs.</h2>
            <p>
              Monitor usage and improve the assistant’s performance over time.
            </p>
            <ItemList items={knowledgeMonitoring} className="knowledge-list" />
            <p className="knowledge-evidence">
              Dify includes LLMOps capabilities for application performance and
              log analysis.
              <span>Source: GitHub</span>
            </p>
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
              A controlled five-stage system for connecting, retrieving, and
              answering from organizational knowledge.
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
              Every organization has different information, workflows, and
              requirements. We configure the assistant around yours.
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
          <a
            href="/"
            className="wordmark"
            onClick={(event) => leavePage(event, "/")}
          >
            Quoin<span>®</span>
          </a>
          <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
            Terms &amp; conditions
          </a>
          <a href="/" onClick={(event) => leavePage(event, "/")}>
            Return home <Arrow />
          </a>
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
  "Google Analytics",
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
      "Discover keywords worth targeting and research their search volume, metrics, and related opportunities.",
  },
  {
    title: "Rank Tracking",
    description:
      "Monitor keyword positions in search results over time with location-specific tracking.",
  },
  {
    title: "Competitor Insights",
    description:
      "Explore competitor search visibility, keyword rankings, and SEO performance data.",
  },
  {
    title: "Backlink Analysis",
    description:
      "Understand the backlink profile of any website and discover new link opportunities.",
  },
  {
    title: "Website SEO Audits",
    description:
      "Crawl and analyze your website for technical SEO issues and improvement opportunities.",
  },
  {
    title: "AI Visibility Tracking",
    description:
      "Monitor how your brand appears in AI-generated answers across ChatGPT, Gemini, and Google AI Overviews.",
  },
  {
    title: "Local SEO Research",
    description:
      "Understand how your business performs in local search for specific cities, counties, and regions.",
  },
  {
    title: "SERP Research",
    description:
      "Analyze search engine results pages to understand content format, intent, and ranking factors.",
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
  "Domain authority",
  "Page authority",
  "Organic traffic",
  "Click-through rate",
  "Impressions",
  "Core Web Vitals",
  "Mobile usability",
  "Crawl errors",
  "AI citations",
]

export const seoDataSources = [
  "Google Search Console",
  "Google Analytics",
  "Google Discover data",
  "Google News data",
  "Organic search results",
  "SERP result pages",
  "Backlink databases",
  "Domain metrics",
  "Competitor domains",
  "Local listing data",
]

export const seoAiWorkflows = [
  "AI-assisted keyword clustering",
  "Automated rank reporting",
  "AI-generated SEO reports",
  "Content gap analysis",
  "Competitor monitoring",
  "Automated audit alerts",
  "Scheduled data exports",
  "Custom AI agents",
  "Multi-step SEO pipelines",
]

export const seoMcpCapabilities = [
  "MCP server integration",
  "AI agent access to SEO data",
  "Real-time keyword queries",
  "Automated audit triggers",
  "Search Console via MCP",
  "Analytics data via MCP",
  "Custom tooling",
]

export const seoSearchTypes = [
  {
    title: "Local SEO",
    description:
      "Rank tracking and keyword research segmented by city, county, and country.",
  },
  {
    title: "Organic Search",
    description:
      "Core web search visibility across Google and other major search engines.",
  },
  {
    title: "AI Search",
    description:
      "Brand visibility and citation tracking in AI-generated search answers.",
  },
  {
    title: "News & Discover",
    description:
      "Track how your content surfaces in Google News and Discover feeds.",
  },
  {
    title: "Image & Video",
    description:
      "Understand how your media assets perform in image and video search results.",
  },
  {
    title: "SERP Features",
    description:
      "Monitor featured snippets, knowledge panels, and other enriched SERP elements.",
  },
]

export const seoAiCapabilities = [
  "AI-generated keyword reports",
  "Automated rank monitoring",
  "Competitor tracking pipelines",
  "AI-assisted site audits",
  "Content gap identification",
  "Trend detection & alerts",
  "Multi-model AI support",
  "Search Console automation",
  "Custom AI agent workflows",
  "MCP server integration",
]

export const seoUseCases = [
  "Digital marketing teams",
  "Content strategists",
  "SEO agencies",
  "In-house SEO teams",
  "E-commerce brands",
  "SaaS companies",
  "Local businesses",
  "Enterprise marketing",
  "Competitor monitoring",
  "AI-assisted SEO",
  "Marketing automation",
  "B2B lead generation",
]

export const seoProcess = [
  {
    step: "01",
    title: "Scope",
    description: "Define target keywords, competitors, and locations to monitor.",
  },
  {
    step: "02",
    title: "Configure",
    description: "Connect data sources and configure tracking workflows.",
  },
  {
    step: "03",
    title: "Collect",
    description: "Gather ranking data, backlinks, and SEO signals on schedule.",
  },
  {
    step: "04",
    title: "Analyze",
    description: "Surface trends, opportunities, and issues from the data.",
  },
  {
    step: "05",
    title: "Report",
    description: "Deliver structured insights in the format your team needs.",
  },
]

export const seoCustomOptions = [
  "Target keywords",
  "Tracked locations",
  "Competitor domains",
  "Data sources",
  "Report cadence",
  "AI model choice",
  "Delivery format",
  "Integration points",
]

export const seoTechnicalAudit = [
  "Core Web Vitals telemetry",
  "Robots.txt & XML sitemap parsing",
  "Canonical tag conflict detection",
  "Schema.org structured data audit",
  "Internal crawl depth & PageRank distribution",
  "Mobile viewport rendering checks",
  "404 & redirect chain diagnostics",
  "Hreflang internationalization checks",
]

export const seoIntegrations = [
  "Google Search Console API",
  "Google Analytics 4 (GA4)",
  "BigQuery raw export warehouse",
  "Slack & Microsoft Teams anomaly alerts",
  "Looker Studio & Tableau dashboards",
  "Custom REST & MCP endpoints",
]

export const seoMonitoring = [
  "Automated rank volatility alerts",
  "Competitor position change digests",
  "SERP feature capture & archiving",
  "Lost & gained backlink tracking",
  "Algorithmic penalty detection",
  "AI Overview citation monitoring",
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
      "Quoin provides reliable, automated public web extraction pipelines with structured JSON/CSV delivery.",
    snippet:
      "Enterprise data extraction and web crawling infrastructure. Structured, clean datasets delivered directly to your database, S3, or analytical warehouse on schedule.",
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
      "Quoin Knowledge Assistant turns company documents and SOPs into grounded conversational intelligence.",
    snippet:
      "Transform internal documentation, SOPs, and employee handbooks into an AI-powered conversational assistant with verified source citations and role permissions.",
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
      "Continuous SERP position tracking and competitor ranking intelligence across Google, Bing, and local markets with automated change notifications.",
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
      "Monitors brand sentiment and citation presence across ChatGPT, Perplexity, Gemini, and Google SGE.",
    snippet:
      "Track brand presence in AI-generated answers. Understand citation sources, prompt triggers, and optimize for generative search visibility.",
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
          aria-label="Quoin home"
          onClick={(event) => leavePage(event, "/")}
        >
          Quoin<span>®</span>
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
              <p className="eyebrow">Search Intelligence / Continuous Signals</p>
              <h1>SEO &amp; Search Intelligence.</h1>
              <h2>
                Search visibility, rankings, and SERP signals on schedule.
              </h2>
              <p>
                Monitor keyword positions, audit search engines, track competitor
                SERP movements, and measure brand citations across traditional
                search and AI Overviews.
              </p>
              <a
                href="/consultation"
                onClick={(event) => leavePage(event, "/consultation")}
              >
                Configure search intelligence <Arrow />
              </a>
            </div>

            {/* Interactive SERP Inspector Widget */}
            <aside
              className="seo-serp-widget"
              aria-label="Live Search Intelligence Monitor"
            >
              <div className="seo-serp-head">
                <div className="seo-serp-title-group">
                  <i aria-hidden="true" />
                  <span>Quoin SERP Telemetry</span>
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
                  https://google.com/search?q={currentKeyword.query.replace(/\s+/g, "+")}
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
                  <span className="seo-serp-favicon">Q</span>
                  <span>quoin.io › {currentKeyword.slug}</span>
                </div>
                <div className="seo-serp-headline">
                  Quoin® Operational Intelligence — Automated SERP &amp; Market
                  Feeds
                </div>
                <p className="seo-serp-snippet">{currentKeyword.snippet}</p>

                {(activeEngine === "aio" || currentKeyword.aioCited) && (
                  <div className="seo-aio-box">
                    <strong>★ Google AI Overview Citation (Verified)</strong>
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
              Outrank.
            </h2>
            <div>
              <p>
                From keyword rankings and competitor visibility to technical health
                and AI Overviews, we collect and structure the search signals your
                team needs.
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
            <h2>Automated rank intelligence.</h2>
            <p>
              Deploy continuous AI workflows that cluster keywords, detect ranking
              shifts, and surface growth opportunities automatically.
            </p>
            <ItemList items={seoAiWorkflows} className="knowledge-list" />
            <p className="knowledge-evidence">
              Pipelines integrate with SerpApi, Search Console &amp; multi-model
              clustering.
              <span>Source: Quoin Engine</span>
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>06 — MCP &amp; AI agents</span>
            </div>
            <h2>Search intelligence for AI tools.</h2>
            <p>
              Connect autonomous marketing agents, Claude, and Cursor directly to
              real-time SERP and search data via standard MCP interfaces.
            </p>
            <ItemList items={seoMcpCapabilities} className="knowledge-list" />
            <p className="knowledge-evidence">
              Standardized Model Context Protocol servers for automated querying and
              monitoring.
              <span>Source: MCP Protocol</span>
            </p>
          </article>
        </section>

        {/* 7. Search Environments */}
        <section className="knowledge-section">
          <div className="section-meta">
            <span>07 — Search environments</span>
            <span>Every surface where customers search</span>
          </div>
          <div className="knowledge-heading-row">
            <h2>
              Every surface.
              <br />
              One pipeline.
            </h2>
            <p>
              Search is no longer just ten blue links. We capture visibility across
              traditional search, local maps, AI generation, and news feeds.
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
              Configure models, schedules, alert thresholds, and export schemas
              around your team’s exact reporting cadence.
            </p>
            <p className="knowledge-evidence">
              Supports custom LLM reasoning, OpenAI, Anthropic, and self-hosted
              models.
              <span>Source: Quoin Pipeline</span>
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
            <span>Continuous infrastructure diagnostics</span>
          </div>
          <div className="knowledge-dark-grid">
            <div>
              <h2>
                Keep your organic
                <br />
                health under control.
              </h2>
              <p>
                For marketing and engineering teams that require dependable
                technical auditing, schema validation, crawl diagnostics, and Core
                Web Vitals tracking.
              </p>
              <p className="knowledge-evidence">
                Scheduled crawler audits with headless rendering and Lighthouse
                metrics.
                <span>Source: Quoin Engine</span>
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
            <h2>Connect search data to your stack.</h2>
            <p>
              Seamlessly pipe clean ranking datasets and crawl results into your
              business intelligence tools and dashboards.
            </p>
            <ItemList items={seoIntegrations} className="knowledge-list" />
            <p className="knowledge-evidence">
              Native webhooks, REST API endpoints, and direct cloud storage sync.
              <span>Source: Quoin Platform</span>
            </p>
          </article>
          <article>
            <div className="section-meta">
              <span>11 — Monitoring &amp; alerts</span>
            </div>
            <h2>Real-time anomaly detection.</h2>
            <p>
              Instant alerts when critical keywords drop, competitors surge, or
              search engine algorithms shift unexpectedly.
            </p>
            <ItemList items={seoMonitoring} className="knowledge-list" />
            <p className="knowledge-evidence">
              Threshold-based trigger alerts to Slack, webhooks, and email.
              <span>Source: Quoin Platform</span>
            </p>
          </article>
        </section>

        {/* 11. Use Cases Chips */}
        <section className="knowledge-section knowledge-use-section">
          <div className="section-meta">
            <span>12 — Use cases</span>
            <span>Performance-driven marketing teams</span>
          </div>
          <div className="knowledge-split">
            <h2>
              Built for performance-
              <br />
              driven teams.
            </h2>
            <ItemList
              items={seoUseCases}
              className="knowledge-chip-list"
            />
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
              A controlled five-stage process for scoping, collecting, auditing, and
              delivering dependable search intelligence.
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
              Every business targets different keywords, competitors, and
              geographic markets. We configure the search pipeline around your
              requirements.
            </p>
            <a
              href="/consultation"
              onClick={(event) => leavePage(event, "/consultation")}
            >
              Build your search pipeline <Arrow />
            </a>
          </div>
          <ItemList
            items={seoCustomOptions}
            className="knowledge-custom-list"
          />
        </section>

        {/* Footer */}
        <footer className="scraping-footer">
          <a
            href="/"
            className="wordmark"
            onClick={(event) => leavePage(event, "/")}
          >
            Quoin<span>®</span>
          </a>
          <a href="/terms" onClick={(event) => leavePage(event, "/terms")}>
            Terms &amp; conditions
          </a>
          <a href="/" onClick={(event) => leavePage(event, "/")}>
            Return home <Arrow />
          </a>
        </footer>
      </main>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handleHistoryChange = () => {
      setRoute(window.location.pathname)
      window.scrollTo(0, 0)
    }

    window.addEventListener("popstate", handleHistoryChange)
    return () => window.removeEventListener("popstate", handleHistoryChange)
  }, [])

  function navigate(path: string) {
    if (path === route) return
    window.history.pushState({}, "", path)
    setRoute(path)
  }

  const isModalOpen =
    route === "/consultation" ||
    route === "/terms" ||
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
      <Chatbot navigate={navigate} />
    </>
  )
}
