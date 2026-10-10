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

const services = [
  {
    number: "01",
    letter: "W",
    title: "Web Scraping",
    link: "/scraping",
    price: "From $99",
    description: "Custom web data extraction and structured data collection.",
  },
  {
    number: "02",
    letter: "K",
    title: "Internal Knowledge Assistant",
    link: "/knowledge-assistant",
    price: "From $299",
    description: "Turn your business knowledge and documents into an AI-powered assistant.",
  },
  {
    number: "03",
    letter: "S",
    title: "SEO & Search Intelligence",
    link: "/seo",
    price: "From $99/mo",
    description: "Research, track, and improve your search visibility.",
  },
]

const process = [
  {
    title: "Consultation",
    text: "We confirm fit, scope, and the business decisions the service needs to support.",
  },
  {
    title: "Configuration",
    text: "We securely collect the required sources and configure your reporting workflow.",
  },
  {
    title: "Delivery",
    text: "You receive the agreed output on a clear, dependable schedule.",
  },
  {
    title: "Review",
    text: "We review performance, answer questions, and refine the service as needed.",
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
  { keywords: ["contract", "long-term", "lock", "commitment", "cancel", "cancellation"], answer: "No long-term contracts. Managed services are billed monthly after the initial setup or audit. You can cancel before the next billing cycle with 30 days' written notice." },
  { keywords: ["start", "started", "begin", "onboard", "timeline", "how long", "when"], answer: "Most engagements begin within 1–2 weeks of the consultation, depending on access to the required data and documents. You'll have your first delivery shortly after configuration." },
  { keywords: ["data", "information", "security", "privacy", "safe", "secure", "handle"], answer: "We only request the access needed to deliver the service. Each client gets a separate instance. Details about data handling, retention, and permissions are agreed during configuration. We comply with DPDP Act 2023 and GDPR where relevant." },
  { keywords: ["custom", "customize", "modify", "change", "tailor", "additional"], answer: "The standard packages are intentionally focused. If you need additional locations, competitors, or document sources, we can scope those separately via a change request." },
  { keywords: ["price", "pricing", "cost", "fee", "charge", "expensive", "afford", "budget", "pay", "payment"], answer: "Our pricing is transparent and fixed:\n\n• Competitor Price Intelligence — $500 setup, $300/month\n• Internal Knowledge Assistant — $1,500 setup, $250/month\n• Local Search Reporting — $499 audit, $199/month/location\n\nAll prices in USD. No hidden fees." },
  { keywords: ["competitor", "price intelligence", "monitor", "tracking", "e-commerce", "ecommerce"], answer: "Our Competitor Price Intelligence service monitors up to 5 competitors weekly, delivering price and stock reports in a structured Google Sheet with alerts on price drops. Perfect for e-commerce brands." },
  { keywords: ["knowledge", "assistant", "chatbot", "sop", "handbook", "internal", "employee"], answer: "The Internal Knowledge Assistant is a private chatbot trained on your SOPs and handbook. It gives your team reliable answers from approved sources, with monthly content refreshes. Ideal for service businesses with 20–100 employees." },
  { keywords: ["local", "search", "seo", "ranking", "google", "business", "dentist", "lawyer", "hvac"], answer: "Local Search Reporting provides a monthly scorecard covering rankings, clicks, competitors, Google Business Profile review, and 3 recommended fixes. Built for dentists, law firms, HVAC companies, and med spas." },
  { keywords: ["process", "how", "work", "step", "workflow"], answer: "Our 4-step process:\n\n01 — Consultation: We confirm fit, scope, and business decisions.\n02 — Configuration: We collect sources and set up your workflow.\n03 — Delivery: You receive output on a clear schedule.\n04 — Review: We review performance and refine as needed." },
  { keywords: ["consult", "consultation", "call", "meeting", "book", "schedule", "talk"], answer: "You can book a free 30-minute consultation through our website. It's a focused, no-obligation first conversation where we confirm whether Quoin is a fit for your needs. No sales pressure." },
  { keywords: ["refund", "money back", "guarantee"], answer: "Setup fees are non-refundable once work has begun. Recurring fees are non-refundable for a period already started. However, if we fail to deliver a month's deliverables for reasons within our control, we'll credit or refund that month's fee on a pro-rata basis." },
  { keywords: ["ai", "artificial intelligence", "automated", "machine learning"], answer: "Some of our deliverables use AI for assistant answers and report summaries. AI output is for general business information — not legal, HR, or financial advice. You should review output before relying on it for important decisions." },
  { keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "sup"], answer: "Hey there. Welcome to Quoin. I'm here to help you understand our services, pricing, and process. What would you like to know?" },
  { keywords: ["thank", "thanks", "bye", "goodbye", "see you"], answer: "You're welcome. If you have more questions later, I'm always here. You can also book a free consultation to talk to our team directly." },
  { keywords: ["who", "about", "quoin", "company", "what do you do"], answer: "Quoin provides operational intelligence for growing businesses. We turn recurring operational questions into dependable workflows through three managed services with fixed pricing and clear deliverables." },
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

type ChatMessage = { role: "user" | "bot"; text: string; action?: string }

function Chatbot({ navigate }: { navigate: (path: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi, I'm Quoin's assistant. Ask me anything about our services, pricing, or process — or pick a topic below." },
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
        body: JSON.stringify({ message: userText, history: currentHistory })
      })
      const data = await res.json()
      
      if (!res.ok || data.error) {
        setMessages((prev) => [...prev, { role: "bot", text: data.error || "I'm having trouble connecting to my brain right now. Try again later!", action: "book_consultation" }])
        return
      }

      let botText = data.response || "I couldn't process that properly."
      let action = undefined

      if (data.action === "SUBMIT_LEAD" && data.lead) {
        // Securely handled by the backend edge function now!
        botText += "\n\n*(I've successfully submitted your requirements to our team! We will be in touch shortly.)*"
      } else if (data.duplicateLead) {
        botText += "\n\n*(Your requirements have already been submitted. We'll be in touch soon!)*"
      } else if (data.action === "BOOK_CONSULTATION") {
        action = "book_consultation"
      }
      
      setMessages((prev) => [...prev, { role: "bot", text: botText, action }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please book a consultation instead.", action: "book_consultation" }])
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
                <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                {msg.role === "bot" && <div className="chatbot-msg-avatar">Q</div>}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
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
                      style={{ fontSize: "14px", padding: "8px 16px", borderRadius: "100px", alignSelf: "flex-start", marginTop: "4px" }}
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
                  <span /><span /><span />
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
              placeholder={messages.length >= 20 ? "Conversation limit reached." : "Type your question…"}
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
                <path d="M3 10h14M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
            <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
      ".section-heading, .service-card, .process-list article, .process-banner, .pricing-row, .faq-item, .home-footer",
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

function HomePage({
  navigate,
  isBackground = false,
}: {
  navigate: Navigate
  isBackground?: boolean
}) {
  useScrollReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const heroBoundsRef = useRef<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)
  const heroRafRef = useRef<number | null>(null)
  const heroCoordsRef = useRef<{ clientX: number; clientY: number } | null>(null)
  const heroTargetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      if (heroRafRef.current !== null) {
        cancelAnimationFrame(heroRafRef.current)
      }
    }
  }, [])

  function openPage(event: ReactMouseEvent<HTMLAnchorElement>, path: string) {
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

  function onPointerEnterHero(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    heroBoundsRef.current = {
      left: bounds.left,
      top: bounds.top,
      width: bounds.width || 1,
      height: bounds.height || 1,
    }
    heroTargetRef.current = event.currentTarget
  }

  function moveHero(event: ReactPointerEvent<HTMLElement>) {
    heroCoordsRef.current = { clientX: event.clientX, clientY: event.clientY }
    heroTargetRef.current = event.currentTarget

    if (heroRafRef.current !== null) return

    heroRafRef.current = requestAnimationFrame(() => {
      heroRafRef.current = null
      const target = heroTargetRef.current
      const coords = heroCoordsRef.current
      if (!target || !coords) return

      let bounds = heroBoundsRef.current
      if (!bounds) {
        const rect = target.getBoundingClientRect()
        bounds = {
          left: rect.left,
          top: rect.top,
          width: rect.width || 1,
          height: rect.height || 1,
        }
        heroBoundsRef.current = bounds
      }

      const x = (coords.clientX - bounds.left) / bounds.width - 0.5
      const y = (coords.clientY - bounds.top) / bounds.height - 0.5
      target.style.setProperty("--hero-note-x", `${x * -10}px`)
      target.style.setProperty("--hero-note-y", `${y * -7}px`)
      target.style.setProperty("--hero-title-x", `${x * 6}px`)
      target.style.setProperty("--hero-title-y", `${y * 4}px`)
      target.style.setProperty("--hero-ghost-x", `${x * 20}px`)
      target.style.setProperty("--hero-ghost-y", `${y * 10}px`)
    })
  }

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroEl = document.querySelector<HTMLElement>(".hero")
          if (heroEl) {
            const scrollY = window.scrollY
            if (scrollY < window.innerHeight * 1.5) {
              heroEl.style.setProperty("--hero-scroll-y", `${scrollY * 0.12}px`)
              heroEl.style.setProperty("--hero-ghost-scroll-y", `${scrollY * -0.22}px`)
              heroEl.style.setProperty("--hero-ghost-scroll-x", `${scrollY * 0.08}px`)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function resetHero(event: ReactPointerEvent<HTMLElement>) {
    if (heroRafRef.current !== null) {
      cancelAnimationFrame(heroRafRef.current)
      heroRafRef.current = null
    }
    heroCoordsRef.current = null
    heroBoundsRef.current = null
    const target = event.currentTarget
    target.style.setProperty("--hero-note-x", "0px")
    target.style.setProperty("--hero-note-y", "0px")
    target.style.setProperty("--hero-title-x", "0px")
    target.style.setProperty("--hero-title-y", "0px")
    target.style.setProperty("--hero-ghost-x", "0px")
    target.style.setProperty("--hero-ghost-y", "0px")
  }

  function onTouchMoveHero(event: ReactTouchEvent<HTMLElement>) {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      heroCoordsRef.current = { clientX: touch.clientX, clientY: touch.clientY }
      heroTargetRef.current = event.currentTarget

      if (heroRafRef.current !== null) return

      heroRafRef.current = requestAnimationFrame(() => {
        heroRafRef.current = null
        const target = heroTargetRef.current
        const coords = heroCoordsRef.current
        if (!target || !coords) return

        let bounds = heroBoundsRef.current
        if (!bounds) {
          const rect = target.getBoundingClientRect()
          bounds = {
            left: rect.left,
            top: rect.top,
            width: rect.width || 1,
            height: rect.height || 1,
          }
          heroBoundsRef.current = bounds
        }

        const x = (coords.clientX - bounds.left) / bounds.width - 0.5
        const y = (coords.clientY - bounds.top) / bounds.height - 0.5
        target.style.setProperty("--hero-note-x", `${x * -10}px`)
        target.style.setProperty("--hero-note-y", `${y * -7}px`)
        target.style.setProperty("--hero-title-x", `${x * 6}px`)
        target.style.setProperty("--hero-title-y", `${y * 4}px`)
        target.style.setProperty("--hero-ghost-x", `${x * 20}px`)
        target.style.setProperty("--hero-ghost-y", `${y * 10}px`)
      })
    }
  }

  function resetHeroTouch(event: ReactTouchEvent<HTMLElement>) {
    if (heroRafRef.current !== null) {
      cancelAnimationFrame(heroRafRef.current)
      heroRafRef.current = null
    }
    heroCoordsRef.current = null
    heroBoundsRef.current = null
    const target = event.currentTarget
    target.style.setProperty("--hero-note-x", "0px")
    target.style.setProperty("--hero-note-y", "0px")
    target.style.setProperty("--hero-title-x", "0px")
    target.style.setProperty("--hero-title-y", "0px")
    target.style.setProperty("--hero-ghost-x", "0px")
    target.style.setProperty("--hero-ghost-y", "0px")
  }

  return (
    <div
      className="site-shell"
      aria-hidden={isBackground ? true : undefined}
    >
      <header className="site-header">
        <a
          href="#top"
          className="wordmark"
          aria-label="Quoin home"
          onClick={(event) => scrollToSection(event, "top")}
        >
          Quoin<span>®</span>
        </a>
        <nav aria-label="Primary navigation">
          <a
            href="#services"
            onClick={(event) => scrollToSection(event, "services")}
          >
            Services
          </a>
          <a
            href="#process"
            onClick={(event) => scrollToSection(event, "process")}
          >
            Process
          </a>
          <a
            href="#services"
            onClick={(event) => scrollToSection(event, "services")}
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={(event) => scrollToSection(event, "faq")}
          >
            FAQ
          </a>
        </nav>
        <div className="header-actions">
          <a
            href="/consultation"
            className="header-cta"
            onClick={(event) => openPage(event, "/consultation")}
          >
            Book a consultation
          </a>
        </div>
      </header>

      <main id="top">
        <section
          className="hero section-frame"
          aria-labelledby="hero-title"
          onPointerEnter={onPointerEnterHero}
          onPointerMove={moveHero}
          onPointerLeave={resetHero}
          onTouchMove={onTouchMoveHero}
          onTouchEnd={resetHeroTouch}
        >
          <div className="section-meta">
            <span>Independent managed services</span>
            <span>Est. 2025</span>
          </div>
          <div className="hero-layout">
            <aside className="hero-note">
              <p className="eyebrow">Quoin / 01</p>
              <p>
                Clear systems for teams that need better information without
                adding headcount.
              </p>
              <a
                href="#services"
                onClick={(event) => scrollToSection(event, "services")}
              >
                Explore services <Arrow />
              </a>
            </aside>
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
                <a
                  href="/consultation"
                  className="circle-link"
                  aria-label="Book a consultation"
                  onClick={(event) => openPage(event, "/consultation")}
                >
                  <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-ghost" aria-hidden="true">
            quoin
          </div>
        </section>

        <section id="services" className="section-frame services-section">
          <div className="section-meta">
            <span>01 — Managed services</span>
            <span>Three focused systems</span>
          </div>
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
          <div className="service-grid">
            {services.map((service) => (
              <article 
                className={`service-card ${service.link ? 'is-clickable' : ''}`} 
                key={service.title}
                onClick={service.link ? (e) => openPage(e, service.link!) : undefined}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  ...(service.link ? { cursor: 'pointer' } : {})
                }}
              >
                <div className="service-art" aria-hidden="true">
                  <span>{service.letter}</span>
                  <small>{service.number}</small>
                </div>
                <div className="service-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{service.title}</h3>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '16px', display: 'block' }}>{service.price}</strong>
                  <p className="service-description" style={{ flexGrow: 1, marginBottom: '24px', color: 'var(--ink-light)' }}>{service.description}</p>
                  
                  {service.link && (
                    <div style={{ marginTop: "auto" }}>
                      <span className="header-cta" style={{ color: "var(--ink)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "1rem" }}>
                        Explore Service <Arrow />
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <span style={{ background: "var(--acid)", color: "var(--ink)", padding: "8px 16px", borderRadius: "0px", fontSize: "0.875rem", fontWeight: 500 }}>
              Starting prices. Final pricing depends on project scope and requirements.
            </span>
          </div>
        </section>

        <section id="process" className="section-frame process-section">
          <div className="section-meta">
            <span>02 — Process</span>
            <span>Start to first delivery</span>
          </div>
          <div className="process-layout">
            <h2>
              How we
              <br />
              work.
            </h2>
            <div className="process-list">
              {process.map((step, index) => (
                <article key={step.title}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <Arrow diagonal />
                </article>
              ))}
              <div className="process-banner">
                <strong>01 → 04</strong>
                <span>Defined scope</span>
                <span>Fixed pricing</span>
                <span>Regular delivery</span>
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
                      setOpenFaq((current) => (current === index ? null : index))
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
        <a
          href="/terms"
          onClick={(event) => openPage(event, "/terms")}
        >
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

// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNW360QUZrhZFVtVYwsOUNem5_8eXQB66Ko-qSxOdoZnnVJlTJVsjimE8ditj8WzfYBA/exec"

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
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          message,
          timestamp: new Date().toISOString(),
        }),
      })

      // no-cors mode always returns opaque response, so we treat it as success
      void response
      setSubmitted(true)
      setServiceError(false)
      setFieldErrors({ name: "", email: "", phone: "", message: "" })
      setSelectedService("")
      form.reset()
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.")
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
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
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
                  aria-describedby={
                    fieldErrors.phone ? "phone-error" : undefined
                  }
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
                <input
                  type="hidden"
                  name="service"
                  value={selectedService}
                />
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
                  {[...services.map((service) => service.title), "Not sure yet"].map(
                    (service, index) => (
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
                    ),
                  )}
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
                  Thank you. We've received your request and will reply within two business days.
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
            <a
              href="/terms"
              onClick={(event) => leavePage(event, "/terms")}
            >
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
              These Terms and Conditions (&ldquo;Terms&rdquo;) are a binding agreement between Quoin (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), and the business or person that engages us or uses our website (&ldquo;Client&rdquo;, &ldquo;you&rdquo;). You accept these Terms when you submit an enquiry form, accept a proposal, pay an invoice, or use the Services.
            </p>
            <p>
              If you accept on behalf of a company, you confirm you have authority to bind it. The Services are for business use only. If a signed proposal or order form conflicts with these Terms, the proposal controls for that engagement only.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Definitions</h2>
            <ul>
              <li><strong>Services:</strong> the managed services described in Section 3.</li>
              <li><strong>Proposal:</strong> the written quote, order form, or statement of work we issue and you accept, setting out the Services, scope, schedule, and Fees.</li>
              <li><strong>Deliverables:</strong> reports, spreadsheets, alerts, scorecards, configured assistants, and other outputs we produce for you under a Proposal.</li>
              <li><strong>Client Materials:</strong> documents, data, credentials, access rights, and other content you provide to us, including SOPs, handbooks, and price sheets.</li>
              <li><strong>Public Sources:</strong> web pages and data that anyone can view without logging in, paying, or bypassing an access restriction.</li>
              <li><strong>Third-Party Tools:</strong> software, platforms, and services operated by others that we use or that you subscribe to in connection with the Services.</li>
              <li><strong>Fees:</strong> all amounts payable under a Proposal, including setup and recurring fees.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. The Services</h2>
            <p>We provide the following managed services. Exact scope, volumes, and schedule are set out in your Proposal.</p>
            <h3>3.1 Competitor Price Intelligence</h3>
            <p>
              We monitor publicly available product pages of up to the number of competitors named in your Proposal (typically five) and deliver a weekly price and stock report in a shared spreadsheet, with alerts on price reductions. Alerts are sent on a best-efforts basis, with a target of one business day from detection.
            </p>
            <h3>3.2 Internal Knowledge Assistant</h3>
            <p>
              We configure a private chatbot that answers staff questions using the Client Materials you supply, such as SOPs, handbooks, and price sheets. We refresh its content monthly from updated documents you provide. Each Client receives a separate instance.
            </p>
            <h3>3.3 Local Search Reporting</h3>
            <p>
              We deliver a monthly scorecard covering the keywords, search clicks, competitors, Google Business Profile review, and recommended actions stated in your Proposal. We may also provide a one-time initial audit. This service is reporting and recommendation only. We do not implement changes to your website or profiles unless agreed in writing.
            </p>
            <h3>3.4 Changes and additional work</h3>
            <p>
              We may update our methods, tools, and formats if the Services remain materially equivalent. Work outside the Proposal, including extra competitors, locations, keywords, or documents, requires a written change request and may carry additional Fees.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Engagement, Onboarding, and Acceptance of Deliverables</h2>
            <p>
              A Proposal becomes binding when you accept it in writing, including by email or electronic signature, or when you pay the first invoice. Work begins once we receive the setup Fee, the Client Materials, and any access we need.
            </p>
            <p>
              We will deliver on the schedule in the Proposal. Delays caused by late or incomplete Client Materials, or by missing access, extend our timelines by the same period.
            </p>
            <p>
              Each Deliverable is deemed accepted unless you notify us of a material defect within seven days of delivery. We will correct a reported defect within a reasonable time. Corrections are your remedy for defective Deliverables, in addition to any rights that cannot be excluded by law.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Client Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate, complete, and timely information, and name one contact who can approve decisions.</li>
              <li>Ensure you own or have the right to share all Client Materials, and that sharing them with us does not breach any law, contract, or third-party right.</li>
              <li>Not include passwords, government ID numbers, payment card data, or medical records in Client Materials unless we have agreed in writing how they will be protected.</li>
              <li>Grant and maintain the access we reasonably need, such as spreadsheet sharing and Google Business Profile access. You may revoke access at any time, but Services depending on it may stop.</li>
              <li>Keep your own Third-Party Tool subscriptions active and paid where the Proposal requires.</li>
              <li>For the Internal Knowledge Assistant, tell your staff it is an automated tool, review its answers for important decisions, and keep its content current by sending us updated documents.</li>
              <li>Use the Services and Deliverables only for lawful business purposes and in line with Section 8.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Fees, Payment, and Taxes</h2>
            <h3>6.1 Fees</h3>
            <p>Fees are stated in your Proposal in USD. Prices on our website are for guidance only and do not bind us.</p>
            <h3>6.2 Billing</h3>
            <p>Setup Fees are due before work begins. Recurring Fees are invoiced monthly in advance and are due within 7 days of the invoice date.</p>
            <h3>6.3 Third-party costs</h3>
            <p>Subscription, hosting, and data costs charged by Third-Party Tools, such as the platform that hosts your assistant, are separate from our Fees. Where the Proposal says you pay them, you pay the provider directly or reimburse us at cost.</p>
            <h3>6.4 Taxes</h3>
            <p>Fees exclude GST, VAT, sales tax, and similar taxes, which you pay in addition where applicable. If law requires you to withhold tax, you will gross up the payment unless the Proposal says otherwise.</p>
            <h3>6.5 Late payment</h3>
            <p>Overdue amounts accrue interest at 1.5% per month, or the highest rate allowed by law if lower. If an invoice remains unpaid 10 days after written notice, we may suspend the Services until it is paid.</p>
            <h3>6.6 Refunds</h3>
            <p>Setup Fees are non-refundable once work has begun. Recurring Fees are non-refundable for a period already started, except that if we fail to deliver a month's Deliverables for reasons within our control, we will credit or refund that month's Fee on a pro-rata basis.</p>
            <h3>6.7 Price changes</h3>
            <p>We may change recurring Fees on at least 30 days' written notice. If you do not agree, you may terminate under Section 13 before the change takes effect.</p>
          </section>

          <section className="terms-section">
            <h2>7. Third-Party Tools and Platforms</h2>
            <p>
              We deliver the Services using open-source software and third-party platforms, including data providers, spreadsheet services, AI model providers, and chatbot hosting platforms. Your use of any Third-Party Tool you subscribe to is governed by that provider's own terms.
            </p>
            <p>
              We do not control Third-Party Tools and are not responsible for their outages, changes, pricing, or discontinuation. If a Third-Party Tool becomes unavailable or unsuitable, we may replace it with an equivalent one and will tell you if the change materially affects the Deliverables.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Data Collection from Public Sources and Acceptable Use</h2>
            <h3>8.1 Public Sources only</h3>
            <p>Our monitoring and reporting collect data only from Public Sources. We do not log in to competitor accounts, access private or paid areas, or collect personal data about individuals.</p>
            <h3>8.2 Right to decline</h3>
            <p>We may decline, pause, or stop collecting from any source if we reasonably believe it could breach the law, a site's terms, or a third party's rights. If this affects a competitor you named, we will tell you and offer a replacement source or a pro-rata credit.</p>
            <h3>8.3 Competition law</h3>
            <p>You will use price and stock data only to make your own independent pricing decisions. You will not use the Services to agree, coordinate, or exchange prices with competitors, or for any other conduct that breaches competition or antitrust law.</p>
            <h3>8.4 Prohibited use</h3>
            <p>You will not use the Services or Deliverables to:</p>
            <ul>
              <li>Break the law or infringe another party's rights.</li>
              <li>Deceive, harass, or spam anyone.</li>
              <li>Upload malware or attempt to disrupt or gain unauthorised access to our systems or Third-Party Tools.</li>
              <li>Reverse engineer, resell, or sublicense our methods, configurations, or tools.</li>
              <li>Present assistant output as professional legal, HR, medical, or financial advice.</li>
            </ul>
            <p>We may suspend the Services immediately if you breach this Section.</p>
          </section>

          <section className="terms-section">
            <h2>9. AI-Generated Output</h2>
            <p>
              Some Deliverables, including assistant answers and report summaries, are produced with artificial intelligence. AI output can be incomplete, outdated, or wrong, and an assistant can only answer as well as the documents it was given.
            </p>
            <p>
              Output is for general business information. It is not legal, HR, medical, tax, or financial advice. You are responsible for reviewing output before relying on it, especially for decisions affecting employees, customers, pricing, or compliance.
            </p>
            <p>
              We select AI providers whose terms, where available, do not allow them to train their models on your Client Materials. We cannot guarantee how any provider handles data beyond its own terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. No Guarantee of Results</h2>
            <p>
              We do not guarantee any business outcome, including search rankings, website traffic, sales, cost savings, competitive position, or onboarding speed. Search engine algorithms, competitor behaviour, and website changes are outside our control.
            </p>
            <p>
              Price, stock, and ranking data reflect what was visible at the time of collection and may be delayed, incomplete, or affected by regional or personalised results. Time targets and example figures on our website or in Proposals are estimates, not commitments.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Intellectual Property</h2>
            <h3>11.1 Your materials</h3>
            <p>You keep all rights in the Client Materials. You grant us a limited, non-exclusive licence to use them only to provide the Services to you.</p>
            <h3>11.2 Our materials</h3>
            <p>We keep all rights in our software, scripts, templates, configurations, methods, and know-how, including anything we create before or apart from your engagement (&ldquo;Our Materials&rdquo;). Open-source components remain under their own licences.</p>
            <h3>11.3 Licence to Deliverables</h3>
            <p>Once you have paid the applicable Fees, we grant you a non-exclusive, non-transferable licence to use the Deliverables for your internal business purposes for as long as you continue to hold them. This does not transfer ownership of Our Materials, and you may not resell the Deliverables.</p>
            <h3>11.4 Aggregated insights</h3>
            <p>We may use anonymised, aggregated statistics that cannot identify you or your customers to improve our Services.</p>
            <h3>11.5 Feedback</h3>
            <p>You grant us a free, perpetual licence to use suggestions you give us about the Services.</p>
            <h3>11.6 Publicity</h3>
            <p>We will not use your name or logo publicly without your written consent.</p>
          </section>

          <section className="terms-section">
            <h2>12. Client Data, Confidentiality, and Privacy</h2>
            <h3>12.1 Confidentiality</h3>
            <p>
              Each party will keep the other's non-public business information confidential, use it only for the Services, and share it only with personnel and providers who need it and are bound by similar duties. This does not cover information that is public through no fault of the recipient, was already known to it, was independently developed, or must be disclosed by law, in which case the recipient will give prompt notice where permitted. These duties last for three years after the Services end, and for trade secrets as long as they remain secret.
            </p>
            <h3>12.2 Security</h3>
            <p>
              We use reasonable technical and organisational measures to protect Client Materials, including access controls and a separate assistant instance for each Client. We will notify you without undue delay after confirming a security incident that affects your Client Materials.
            </p>
            <h3>12.3 Personal data</h3>
            <p>
              Each party will comply with data protection laws that apply to it, including India's Digital Personal Data Protection Act, 2023 and, where relevant, the GDPR. If Client Materials contain personal data, you confirm you have a lawful basis to share it, and we will process it only on your instructions to provide the Services. We will sign a data processing agreement on request.
            </p>
            <h3>12.4 Return and deletion</h3>
            <p>
              On request within 30 days after the Services end, we will return your Client Materials in a standard format. We will then delete them from our active systems within 30 days, and from backups within 90 days, unless law requires us to keep them.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Term and Termination</h2>
            <h3>13.1 Term</h3>
            <p>Each Proposal starts on acceptance and, for recurring Services, renews month to month until ended under this Section.</p>
            <h3>13.2 For convenience</h3>
            <p>Either party may end recurring Services on 30 days' written notice, effective at the end of the billing period in which the notice period expires.</p>
            <h3>13.3 For cause</h3>
            <p>Either party may end the agreement immediately by written notice if the other commits a material breach and does not fix it within 14 days of notice, or becomes insolvent. We may end it immediately if you breach Section 8.</p>
            <h3>13.4 Effects</h3>
            <p>On termination, we stop the Services and you pay all Fees due up to the end date. We will deliver any completed Deliverables for the period paid. Section 12.4 applies to your Client Materials.</p>
            <h3>13.5 Survival</h3>
            <p>Sections 6 (for unpaid amounts), 10 to 12, 14 to 16, 18, and 19 survive termination.</p>
          </section>

          <section className="terms-section">
            <h2>14. Warranties and Disclaimers</h2>
            <p>
              We will perform the Services with reasonable skill and care. Each party confirms it has authority to enter into this agreement.
            </p>
            <p>
              Except as stated in these Terms, and to the fullest extent permitted by law, the Services and Deliverables are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We disclaim all other warranties, express or implied, including merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Services will be uninterrupted or error-free.
            </p>
          </section>

          <section className="terms-section">
            <h2>15. Limitation of Liability</h2>
            <h3>15.1 Excluded losses</h3>
            <p>To the fullest extent permitted by law, neither party is liable for indirect, incidental, special, or consequential loss, or for loss of profit, revenue, goodwill, business opportunity, or data, however caused and even if advised of the possibility.</p>
            <h3>15.2 Cap</h3>
            <p>Each party's total liability arising out of or relating to this agreement is limited to the Fees you paid us in the six months before the event giving rise to the claim.</p>
            <h3>15.3 Exceptions</h3>
            <p>Nothing in these Terms limits liability for fraud, wilful misconduct, death or personal injury caused by negligence, your obligation to pay Fees, or any liability that cannot be limited by law. The cap in 15.2 also does not apply to a breach of Section 12.1 or to your indemnity in Section 16.</p>
            <h3>15.4 Basis of the bargain</h3>
            <p>You agree these limits reflect the price of the Services and are a fair allocation of risk.</p>
          </section>

          <section className="terms-section">
            <h2>16. Indemnification</h2>
            <p>
              You will defend and indemnify us, our personnel, and our providers against third-party claims, and resulting losses and reasonable legal costs, arising from: (a) Client Materials or our use of them as permitted by these Terms; (b) your breach of Section 5 or Section 8; or (c) your use of the Deliverables in breach of law.
            </p>
            <p>
              We will give you prompt notice of a claim, let you control its defence and settlement (but not settle in a way that admits fault on our behalf without our consent), and reasonably cooperate at your cost.
            </p>
          </section>

          <section className="terms-section">
            <h2>17. Force Majeure</h2>
            <p>
              Neither party is liable for a delay or failure caused by events beyond its reasonable control, including natural disaster, war, civil unrest, government action, power or internet outages, failure of Third-Party Tools or cloud providers, or changes to a website that block collection. The affected party will tell the other promptly and resume as soon as reasonably possible. This does not excuse payment of Fees already due. If the event lasts more than 30 days, either party may end the affected Services.
            </p>
          </section>

          <section className="terms-section">
            <h2>18. Governing Law and Dispute Resolution</h2>
            <h3>18.1 Governing law</h3>
            <p>These Terms are governed by the laws of India, without regard to conflict-of-law rules.</p>
            <h3>18.2 Informal resolution</h3>
            <p>Before starting formal proceedings, the parties will try in good faith to resolve a dispute through written notice and discussion for 30 days.</p>
            <h3>18.3 Arbitration</h3>
            <p>Any dispute not resolved under 18.2 will be finally settled by arbitration under the Arbitration and Conciliation Act, 1996. There will be one arbitrator, the venue will be agreed by the parties, and the language will be English. The award is final and binding.</p>
            <h3>18.4 Urgent relief</h3>
            <p>Either party may seek an injunction or similar urgent relief from a competent court to protect confidential information or intellectual property.</p>
            <h3>18.5 Courts</h3>
            <p>Subject to 18.3, the competent courts have exclusive jurisdiction.</p>
          </section>

          <section className="terms-section">
            <h2>19. General Provisions</h2>
            <ul>
              <li><strong>Entire agreement:</strong> These Terms and your Proposal are the whole agreement and replace earlier discussions and proposals.</li>
              <li><strong>Changes to these Terms:</strong> We may update these Terms. For existing Clients, changes take effect 30 days after we notify you, and you may terminate under Section 13 if you object. Changes to the website version apply to new engagements from the date posted.</li>
              <li><strong>Order of precedence:</strong> The Proposal controls over these Terms for that engagement only.</li>
              <li><strong>Severability:</strong> If a provision is unenforceable, the rest remains in effect and the provision is limited to the minimum extent necessary.</li>
              <li><strong>No waiver:</strong> Delay in enforcing a right is not a waiver of it.</li>
              <li><strong>Assignment:</strong> You may not assign this agreement without our written consent. We may assign it to an affiliate or a successor to our business.</li>
              <li><strong>Independent contractors:</strong> The parties are independent. Nothing creates a partnership, employment, or agency relationship.</li>
              <li><strong>No third-party rights:</strong> Only the parties may enforce this agreement.</li>
              <li><strong>Notices:</strong> Notices are valid if sent by email to the addresses in the Proposal, and take effect when sent unless a delivery failure notice is received.</li>
              <li><strong>Electronic acceptance:</strong> The parties may accept and sign electronically and in counterparts.</li>
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

function ScrapingPage({ navigate }: { navigate: (path: string) => void }) {
  const [leaving, setLeaving] = useState(false)

  function leavePage(event: React.MouseEvent<HTMLAnchorElement>, destination: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  return (
    <div className={`site-shell consultation-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a href="/" className="wordmark" aria-label="Quoin home" onClick={(event) => leavePage(event, "/")}>
          Quoin<span>®</span>
        </a>
        <span className="consultation-header-label">Web Scraping</span>
        <a href="/" className="header-cta" onClick={(event) => leavePage(event, "/")}>
          Back to home
        </a>
      </header>

      <main className="scraping-page" style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* 1. Hero Section */}
        <section className="hero section-frame" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "80px", marginBottom: "80px" }}>
          <div className="hero-grid">
            <div className="hero-text">
              <h1>
                Web Scraping &<br />
                Data Extraction
              </h1>
              <p style={{ fontSize: "1.25rem", marginTop: "1rem", color: "var(--ink-light)" }}>Turn publicly available web data into clean, structured, usable information.</p>
              <div className="hero-actions" style={{ marginTop: "2rem" }}>
                <a href="/consultation" className="button button-acid" onClick={(e) => leavePage(e, "/consultation")}>
                  Start a Project <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. What We Do */}
        <section className="section-frame text-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta">
            <span>01 — What We Do</span>
          </div>
          <h2>Extract. Structure. Deliver.</h2>
          <p style={{ maxWidth: "600px", fontSize: "1.125rem", marginTop: "1rem" }}>We collect and transform web data into organized datasets tailored to your requirements — from individual pages to large-scale websites.</p>
        </section>

        {/* 3. Services Grid */}
        <section className="section-frame services-grid-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta" style={{ marginBottom: "2rem" }}>
            <span>02 — Services</span>
          </div>
          <div className="scraping-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Website Data Extraction", desc: "Extract specific information from websites and deliver it in a structured format." },
              { title: "Dynamic Web Scraping", desc: "Collect data from JavaScript-powered and dynamically rendered websites." },
              { title: "Web Crawling", desc: "Discover and collect information across multiple pages or entire websites." },
              { title: "Adaptive Scraping", desc: "Build resilient extraction workflows that can handle changes in website structure." },
              { title: "Browser-Based Scraping", desc: "Interact with websites through real browser environments when traditional requests aren't enough." },
              { title: "API & Network Data", desc: "Capture publicly accessible data delivered through APIs and network requests." },
              { title: "E-Commerce Scraping", desc: "Collect product details, pricing, availability, categories, ratings, and more." },
              { title: "Custom Data Extraction", desc: "Define exactly what information you need and receive a scraper built around your requirements." },
            ].map((s, idx) => (
              <article key={s.title} className="scraping-card">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.125rem", fontFamily: "var(--mono)", color: "var(--ink-light)" }}>{String(idx + 1).padStart(2, '0')}</span>
                  <h3 style={{ fontSize: "1.125rem", margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ color: "var(--ink-light)" }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 4. What We Can Extract */}
        <section className="section-frame extract-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta" style={{ marginBottom: "2rem" }}>
            <span>03 — Capabilities</span>
          </div>
          <h2>What We Can Extract</h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "12px", listStyle: "none", padding: 0, marginTop: "2rem" }}>
            {["Products", "Prices", "Listings", "Business Data", "Reviews", "Ratings", "Articles", "News", "Directories", "Documentation", "Public Market Data", "Custom Fields"].map((item) => (
              <li key={item} style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "100px", fontSize: "0.875rem" }}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 5 & 6. Scale and Delivery */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta">
              <span>04 — Scale</span>
            </div>
            <h2>Built for Different Data Needs</h2>
            <h3 style={{ marginTop: "1.5rem", fontSize: "1.25rem" }}>Single Page → Entire Website</h3>
            <p style={{ marginTop: "0.5rem", color: "var(--ink-light)" }}>From extracting a handful of fields from one page to crawling thousands of pages, the workflow can be tailored to the scale of your project.</p>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta">
              <span>05 — Format</span>
            </div>
            <h2>Data Delivery</h2>
            <h3 style={{ marginTop: "1.5rem", fontSize: "1.25rem" }}>Your Data. Your Format.</h3>
            <p style={{ marginTop: "0.5rem", color: "var(--ink-light)" }}>Deliver extracted information in formats that fit your workflow.</p>
            <div style={{ marginTop: "1rem", fontFamily: "var(--mono)", fontSize: "0.875rem", padding: "12px", background: "var(--ink)", color: "var(--paper)", borderRadius: "8px" }}>
              JSON · CSV · XML · JSONL · Markdown · HTML
            </div>
          </section>
        </div>

        {/* 7 & 8. AI-Ready and Use Cases */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>06 — AI</span></div>
            <h2>Turn the Web Into AI-Ready Knowledge</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)" }}>Collect, clean, and structure web content for modern AI workflows.</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>RAG datasets</li>
              <li>Knowledge bases</li>
              <li>LLM-ready content</li>
              <li>Website-to-Markdown</li>
              <li>Structured AI data</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>07 — Use Cases</span></div>
            <h2>Built for Real-World Data Collection</h2>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Competitor research</li>
              <li>Price intelligence</li>
              <li>Market research</li>
              <li>Product catalog collection</li>
              <li>Business research</li>
              <li>Content aggregation</li>
              <li>Lead data collection</li>
              <li>Research & analytics</li>
            </ul>
          </section>
        </div>

        {/* 9. How It Works */}
        <section className="section-frame process-section" style={{ marginBottom: "80px", background: "var(--ink)", color: "var(--paper)", padding: "48px", borderRadius: "16px" }}>
          <div className="section-meta" style={{ color: "var(--paper)" }}>
            <span>08 — How It Works</span>
          </div>
          <div className="process-layout" style={{ marginTop: "2rem" }}>
            <h2 style={{ color: "var(--paper)" }}>4-Step Process</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginTop: "2rem" }}>
              {[
                { step: "01", title: "Define", desc: "Tell us what data you need." },
                { step: "02", title: "Extract", desc: "We collect the required information from your target sources." },
                { step: "03", title: "Structure", desc: "Raw information is cleaned and organized into usable data." },
                { step: "04", title: "Deliver", desc: "Receive your dataset in the format you need." },
              ].map((s) => (
                <article key={s.step} style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "16px" }}>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--acid)" }}>{s.step}</span>
                  <h3 style={{ marginTop: "8px", fontSize: "1.125rem" }}>{s.title}</h3>
                  <p style={{ marginTop: "4px", fontSize: "0.875rem", opacity: 0.8 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Custom Scraping & 11. Final CTA */}
        <section className="section-frame cta-section" style={{ textAlign: "center", padding: "80px 0" }}>
          <h2>Have Data You Need to Extract?</h2>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "var(--ink-light)", maxWidth: "600px", margin: "1rem auto 0" }}>
            Every website is different. We can build a custom extraction workflow around your target website, required fields, output format, and scale. Tell us what you're looking for.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a href="/consultation" className="button button-acid" onClick={(e) => leavePage(e, "/consultation")}>
              Discuss Your Requirements <Arrow />
            </a>
          </div>
        </section>
        
        <footer style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
          <a href="/" className="wordmark" onClick={(event) => leavePage(event, "/")}>
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

function KnowledgeAssistantPage({ navigate }: { navigate: (path: string) => void }) {
  const [leaving, setLeaving] = useState(false)

  function leavePage(event: React.MouseEvent<HTMLAnchorElement>, destination: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  const tagList = ["RAG", "Knowledge Bases", "AI Agents", "AI Workflows", "Document Processing", "Semantic Search", "Contextual Answers", "Multi-Model AI", "API Integration", "MCP", "Self-Hosted AI", "LLMOps", "Custom Tools", "Enterprise Knowledge", "AI Automation"]

  return (
    <div className={`site-shell consultation-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a href="/" className="wordmark" aria-label="Quoin home" onClick={(event) => leavePage(event, "/")}>
          Quoin<span>®</span>
        </a>
        <span className="consultation-header-label">Knowledge Assistant</span>
        <a href="/" className="header-cta" onClick={(event) => leavePage(event, "/")}>
          Back to home
        </a>
      </header>

      <main className="scraping-page" style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto", animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {/* 1. Hero Section */}
        <section className="hero section-frame" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "80px", marginBottom: "80px" }}>
          <div className="hero-grid">
            <div className="hero-text" style={{ maxWidth: "800px" }}>
              <h1>
                Internal Knowledge<br />
                Assistant
              </h1>
              <h2 style={{ fontSize: "1.5rem", marginTop: "1rem", fontWeight: 400 }}>Your company’s knowledge, available through a conversation.</h2>
              <p style={{ fontSize: "1.125rem", marginTop: "1.5rem", color: "var(--ink-light)", lineHeight: 1.6 }}>
                Turn internal documents, processes, policies, and knowledge into an AI-powered assistant that can answer questions, find information, and help your team get work done.
              </p>
              <div className="hero-actions" style={{ marginTop: "2.5rem" }}>
                <a href="/consultation" className="button button-acid" style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} onClick={(e) => leavePage(e, "/consultation")}>
                  Build Your Assistant <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. What We Build */}
        <section className="section-frame text-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta">
            <span>01 — What We Build</span>
          </div>
          <h2>One place for your team's knowledge</h2>
          <p style={{ maxWidth: "600px", fontSize: "1.125rem", marginTop: "1rem" }}>
            Connect your organization's knowledge sources and give your team a simple way to find the information they need.
          </p>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "12px", listStyle: "none", padding: 0, marginTop: "2rem" }}>
            {["Internal documentation", "Company policies", "SOPs", "Employee handbooks", "Product documentation", "Technical documentation", "Project information", "Training materials", "FAQs", "Knowledge bases"].map((item, i) => (
              <li key={item} style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "100px", fontSize: "0.875rem", animation: `fadeIn 0.5s ease forwards ${i * 0.05}s`, opacity: 0 }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Core Features Grid */}
        <section className="section-frame services-grid-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta" style={{ marginBottom: "2rem" }}>
            <span>02 — Core Features</span>
          </div>
          <div className="scraping-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Knowledge Base", desc: "Centralize your organization's information into searchable knowledge bases." },
              { title: "Intelligent Q&A", desc: "Ask questions naturally and receive answers based on your organization's knowledge." },
              { title: "Document Understanding", desc: "Process and retrieve information from documents such as PDFs, presentations, and other supported formats." },
              { title: "Context-Aware Responses", desc: "Give the assistant relevant context before generating an answer." },
              { title: "Multiple Knowledge Sources", desc: "Organize information across different departments, projects, and knowledge collections." },
              { title: "Source-Aware Answers", desc: "Provide references to the information used to generate an answer, helping users verify the response." },
              { title: "Conversational Interface", desc: "Let employees interact with company knowledge through a familiar chat experience." },
              { title: "Custom AI Models", desc: "Connect the assistant to the AI model that best fits your requirements." },
            ].map((s, i) => (
              <article key={s.title} style={{ padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--paper)", transition: "all 0.3s ease", cursor: "default" }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)" }} onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "var(--ink-light)" }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 4. What You Can Connect & 5. AI Workflows */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>03 — Sources</span></div>
            <h2>Bring Your Knowledge With You</h2>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>PDF documents</li>
              <li>Presentations</li>
              <li>Text documents</li>
              <li>FAQs</li>
              <li>Internal documentation</li>
              <li>Product manuals</li>
              <li>Company policies</li>
              <li>SOPs</li>
              <li>Knowledge bases</li>
              <li>Structured datasets</li>
              <li>External data sources</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>04 — Workflows</span></div>
            <h2>More Than Just Questions & Answers</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)", marginBottom: "1rem" }}>Build automated AI workflows around your organization's knowledge.</p>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Document processing</li>
              <li>Information retrieval</li>
              <li>Content generation</li>
              <li>Classification</li>
              <li>Summarization</li>
              <li>Data extraction</li>
              <li>Multi-step AI workflows</li>
              <li>Automated responses</li>
              <li>Custom business logic</li>
            </ul>
          </section>
        </div>

        {/* 6. AI Agents & 7. Built for Teams */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>05 — Agents</span></div>
            <h2>Give Your Assistant the Ability to Act</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)", marginBottom: "1rem" }}>Go beyond answering questions by connecting AI agents with tools and external services.</p>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Tool integration</li>
              <li>API connections</li>
              <li>Custom tools</li>
              <li>MCP integrations</li>
              <li>Multi-step tasks</li>
              <li>Automated actions</li>
              <li>External service integrations</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>06 — Teams</span></div>
            <h2>One Assistant. Multiple Teams.</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)", marginBottom: "1.5rem" }}>Create knowledge experiences for different parts of an organization.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { title: "HR", desc: "Policies, employee guidelines, onboarding and internal processes." },
                { title: "Support", desc: "Product documentation, troubleshooting guides and FAQs." },
                { title: "Engineering", desc: "Technical documentation, APIs, architecture and development knowledge." },
                { title: "Sales", desc: "Product information, sales material and internal resources." },
                { title: "Operations", desc: "SOPs, workflows, procedures and operational documentation." },
                { title: "Management", desc: "Company information, reports and internal knowledge." },
              ].map((t) => (
                <div key={t.title} style={{ background: "var(--paper)", padding: "12px", borderLeft: "3px solid var(--acid)" }}>
                  <strong style={{ display: "block", marginBottom: "4px" }}>{t.title}</strong>
                  <span style={{ fontSize: "0.875rem", color: "var(--ink-light)" }}>{t.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 8, 9, 10, 11. Features Grid */}
        <section className="section-frame process-section" style={{ marginBottom: "80px", background: "var(--ink)", color: "var(--paper)", padding: "48px", borderRadius: "16px" }}>
          <div className="section-meta" style={{ color: "var(--paper)" }}>
            <span>07 — Platform Capabilities</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "40px", marginTop: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--acid)", marginBottom: "1rem" }}>AI Capabilities</h3>
              <p style={{ opacity: 0.7, marginBottom: "1rem", fontSize: "0.875rem" }}>Adapt the Assistant to Your Business</p>
              <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
                <li>Custom instructions</li><li>Prompt configuration</li><li>Multiple AI models</li><li>Context-aware generation</li><li>Structured outputs</li><li>Text generation</li><li>Summarization</li><li>Classification</li><li>Information extraction</li><li>AI-powered workflows</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: "var(--acid)", marginBottom: "1rem" }}>Security & Control</h3>
              <p style={{ opacity: 0.7, marginBottom: "1rem", fontSize: "0.875rem" }}>Keep Your Knowledge Under Control</p>
              <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
                <li>Self-hosted deployment</li><li>Controlled knowledge access</li><li>Private data environment</li><li>Custom authentication</li><li>API-based integration</li><li>Configurable AI workflows</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: "var(--acid)", marginBottom: "1rem" }}>Integrations</h3>
              <p style={{ opacity: 0.7, marginBottom: "1rem", fontSize: "0.875rem" }}>Connect AI to Your Existing Stack</p>
              <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
                <li>REST APIs</li><li>Internal applications</li><li>Business systems</li><li>Custom tools</li><li>External services</li><li>MCP servers</li><li>AI model providers</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: "var(--acid)", marginBottom: "1rem" }}>Monitoring</h3>
              <p style={{ opacity: 0.7, marginBottom: "1rem", fontSize: "0.875rem" }}>Understand How Your Assistant Performs</p>
              <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
                <li>Conversation logs</li><li>Application monitoring</li><li>Performance analysis</li><li>Prompt improvement</li><li>Dataset improvement</li><li>Model evaluation</li><li>Production analytics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 12. Use Cases & 13. How It Works */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>08 — Use Cases</span></div>
            <h2>Built for Knowledge-Driven Organizations</h2>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Internal company assistant</li>
              <li>Employee helpdesk</li>
              <li>HR knowledge assistant</li>
              <li>Customer support assistant</li>
              <li>Technical documentation assistant</li>
              <li>Product knowledge assistant</li>
              <li>IT helpdesk</li>
              <li>Training assistant</li>
              <li>Research assistant</li>
              <li>SOP assistant</li>
              <li>Enterprise search</li>
              <li>AI-powered knowledge base</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>09 — How It Works</span></div>
            <h2>From Documents to Answers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                { step: "01", title: "Connect", desc: "Provide your organization's documents and knowledge sources." },
                { step: "02", title: "Organize", desc: "Structure your information into searchable knowledge bases." },
                { step: "03", title: "Understand", desc: "The system processes and indexes your knowledge for retrieval." },
                { step: "04", title: "Ask", desc: "Employees interact with the assistant using natural language." },
                { step: "05", title: "Answer", desc: "The assistant retrieves relevant information and generates a contextual response." },
              ].map((s) => (
                <div key={s.step} style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ fontFamily: "var(--mono)", color: "var(--acid)", fontSize: "1.25rem", fontWeight: 500 }}>{s.step}</div>
                  <div>
                    <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>{s.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--ink-light)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 14. Custom Knowledge Assistant & CTA */}
        <section className="section-frame cta-section" style={{ textAlign: "center", padding: "80px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="section-meta" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
            <span>10 — Get Started</span>
          </div>
          <h2>Built Around Your Organization</h2>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "var(--ink-light)", maxWidth: "700px", margin: "1rem auto 0" }}>
            Every organization has different information, workflows, and requirements. We can configure an assistant around your knowledge sources, departments, user roles, AI models, business workflows, tools & integrations, access requirements, and existing applications.
          </p>
          <div style={{ marginTop: "2.5rem" }}>
            <a href="/consultation" className="button button-acid" style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} onClick={(e) => leavePage(e, "/consultation")}>
              Build Your Knowledge Assistant <Arrow />
            </a>
          </div>
        </section>

        {/* Tags */}
        <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
          {tagList.map(tag => (
            <span key={tag} style={{ fontSize: "0.75rem", color: "var(--ink-light)", background: "rgba(0,0,0,0.03)", padding: "4px 10px", borderRadius: "4px" }}>
              {tag}
            </span>
          ))}
        </div>
        
        <footer style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
          <a href="/" className="wordmark" onClick={(event) => leavePage(event, "/")}>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  )
}

function SeoPage({ navigate }: { navigate: (path: string) => void }) {
  const [leaving, setLeaving] = useState(false)
  const [activeIntent, setActiveIntent] = useState(0)

  function leavePage(event: React.MouseEvent<HTMLAnchorElement>, destination: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(destination)
    }, 420)
  }

  const intents = [
    { id: "keywords", icon: "01", label: "Find the right keywords", desc: "Research search terms, search volume, locations, and related keyword opportunities.", target: "Keyword Research" },
    { id: "rankings", icon: "02", label: "Track rankings", desc: "Monitor how selected keywords perform in search results over time.", target: "Rank Tracking" },
    { id: "competitors", icon: "03", label: "Analyze competitors", desc: "Explore competitor search visibility and SEO data.", target: "Competitor Insights" },
    { id: "backlinks", icon: "04", label: "Understand backlinks", desc: "Analyze backlink information and discover links pointing to websites.", target: "Backlink Analysis" },
    { id: "audit", icon: "05", label: "Audit my website", desc: "Find technical and SEO issues across your website.", target: "Site Audit" },
    { id: "ai", icon: "06", label: "Measure AI visibility", desc: "Research how your brand appears in AI-generated search answers.", target: "AI Visibility" },
  ]

  const tagList = ["Keyword Research", "Rank Tracking", "Competitor Insights", "Backlinks", "Site Audits", "AI Visibility", "Local SEO", "SERP Research", "Google Search Console", "Google Analytics", "MCP", "AI Agents", "Prompt Tracking", "Citation Tracking", "SEO Reports"]

  return (
    <div className={`site-shell consultation-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a href="/" className="wordmark" aria-label="Quoin home" onClick={(event) => leavePage(event, "/")}>
          Quoin<span>®</span>
        </a>
        <span className="consultation-header-label">SEO & Search</span>
        <a href="/" className="header-cta" onClick={(event) => leavePage(event, "/")}>
          Back to home
        </a>
      </header>

      <main className="scraping-page" style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto", animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {/* 1. Hero Section */}
        <section className="hero section-frame" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "80px", marginBottom: "80px" }}>
          <div className="hero-grid">
            <div className="hero-text" style={{ maxWidth: "800px" }}>
              <h1>
                SEO & Search<br />
                Visibility
              </h1>
              <h2 style={{ fontSize: "1.5rem", marginTop: "1rem", fontWeight: 400 }}>Understand Search. Improve Visibility.</h2>
              <p style={{ fontSize: "1.125rem", marginTop: "1.5rem", color: "var(--ink-light)", lineHeight: 1.6 }}>
                Research keywords, track rankings, audit websites, analyze competitors, monitor backlinks, and understand how your brand appears across AI search.
              </p>
              <div className="hero-actions" style={{ marginTop: "2.5rem" }}>
                <a href="/consultation" className="button button-acid" style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} onClick={(e) => leavePage(e, "/consultation")}>
                  Explore SEO Solutions <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Needs Section */}
        <section className="section-frame text-section" style={{ marginBottom: "80px" }}>
          <div className="section-meta">
            <span>01 — What do you want to improve?</span>
          </div>
          <h2>Select your primary goal</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "2rem" }}>
            {intents.map((intent, i) => (
              <button
                key={intent.id}
                onClick={() => setActiveIntent(i)}
                style={{
                  textAlign: "left", padding: "20px", borderRadius: "12px", border: `2px solid ${activeIntent === i ? "var(--ink)" : "var(--border)"}`,
                  background: activeIntent === i ? "var(--paper)" : "transparent", cursor: "pointer", transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.125rem", fontFamily: "var(--mono)", color: "var(--ink-light)" }}>{intent.icon}</span>
                  <strong style={{ fontSize: "1.125rem" }}>{intent.label}</strong>
                </div>
                <p style={{ color: "var(--ink-light)", fontSize: "0.875rem" }}>{intent.desc}</p>
                <div style={{
                  display: "grid",
                  gridTemplateRows: activeIntent === i ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ 
                      paddingTop: "12px", color: "var(--ink)", fontWeight: 500, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "4px",
                      opacity: activeIntent === i ? 1 : 0,
                      transform: activeIntent === i ? "translateY(0)" : "translateY(-8px)",
                      transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}>
                      Go to: {intent.target} <Arrow diagonal />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Core SEO Services Grid */}
        <section className="section-frame process-section" style={{ marginBottom: "80px", background: "var(--ink)", color: "var(--paper)", padding: "48px", borderRadius: "16px" }}>
          <div className="section-meta" style={{ color: "var(--paper)" }}>
            <span>02 — Core SEO Services</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "2rem" }}>
            {[
              { title: "Keyword Research", desc: "Discover keywords worth targeting and research their search data.", items: ["Keyword discovery & grouping", "Search volume & metrics", "Location-based research", "City & regional targeting", "Related opportunities", "Deeper SERP results"] },
              { title: "Rank Tracking", desc: "Keep track of your website's position for selected keywords.", items: ["Keyword position tracking", "Ranking history & comparisons", "Multiple keywords", "Location-specific rankings", "Scheduled rank checks", "Keyword pinning"] },
              { title: "Competitor Insights", desc: "Understand how competitors are performing in search.", items: ["Competitor research", "Search visibility comparison", "Competitor keyword research", "Competitor SEO analysis", "Competitive search insights"] },
              { title: "Backlink Analysis", desc: "Understand the backlink profile of a website.", items: ["Backlink discovery", "Backlink analysis", "Recently discovered backlinks", "Link profile research", "Backlink comparisons"] },
              { title: "Website SEO Audits", desc: "Analyze your website for technical SEO issues.", items: ["Site crawling & page analysis", "SEO issue detection", "Robots & meta checks", "JavaScript-rendered auditing", "Audit reports"] },
              { title: "AI Visibility", desc: "See how your brand appears in AI search.", items: ["Brand mention tracking", "Prompt tracking", "ChatGPT & Gemini results", "Google AI Overviews", "Citation tracking"] }
            ].map((s, idx) => (
              <div key={s.title} className={`seo-card ${activeIntent === idx ? "is-active" : ""}`} style={{ background: "rgba(255,255,255,0.05)", padding: "24px", borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.125rem", fontFamily: "var(--mono)", color: "var(--acid)" }}>{String(idx + 1).padStart(2, '0')}</span>
                  <h3 style={{ color: "var(--acid)", margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ opacity: 0.8, marginBottom: "1rem", fontSize: "0.875rem" }}>{s.desc}</p>
                <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
                  {s.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Local SEO & Search Data */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>03 — Local SEO</span></div>
            <h2>Understand Search by Location</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)" }}>Use location-specific SEO research for:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Cities, Counties, Countries</li>
              <li>Local search queries & rankings</li>
              <li>Business profiles</li>
              <li>Reviews & Posts</li>
              <li>Categories</li>
              <li>Local rank grids</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>04 — Integration</span></div>
            <h2>Google Search Data</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)" }}>Connect performance data directly into workflows:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>Google Search Console</li>
              <li>Search performance data</li>
              <li>Discover data</li>
              <li>Google News data</li>
              <li>Google Analytics data</li>
              <li>Organic traffic information</li>
            </ul>
          </section>
        </div>

        {/* 5. SEO + AI & Reports */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", marginBottom: "80px" }}>
          <section className="section-frame text-section">
            <div className="section-meta"><span>05 — SEO + AI</span></div>
            <h2>Make SEO Data Available to AI</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)", marginBottom: "1rem" }}>We expose SEO data through MCP so compatible AI agents can use the data directly.</p>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>AI-assisted keyword research</li>
              <li>AI-assisted SEO audits</li>
              <li>SEO research through an AI agent</li>
              <li>Automated SEO workflows</li>
              <li>Search Console & Analytics via MCP</li>
              <li>Custom agent workflows</li>
            </ul>
          </section>

          <section className="section-frame text-section">
            <div className="section-meta"><span>06 — Reporting</span></div>
            <h2>Turn SEO Data Into Actionable Reports</h2>
            <p style={{ marginTop: "1rem", color: "var(--ink-light)", marginBottom: "1rem" }}>Deliver extracted information in beautiful formats.</p>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--ink-light)" }}>
              <li>SEO audit reports</li>
              <li>Saved reports</li>
              <li>Reusable report templates</li>
              <li>Project-based reports</li>
              <li>Exportable reports</li>
              <li>AI-generated SEO reports</li>
            </ul>
          </section>
        </div>

        {/* Implementation Note */}
        <div style={{ background: "var(--surface)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "80px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div>
            <h4 style={{ marginBottom: "8px" }}>Important Implementation Note</h4>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-light)", lineHeight: 1.5 }}>
              OpenSEO requires a DataForSEO API key to obtain SEO data when self-hosted. All workflows rely on this underlying data provider to function correctly.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <section className="section-frame cta-section" style={{ textAlign: "center", padding: "80px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="section-meta" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
            <span>07 — Get Started</span>
          </div>
          <h2>Ready to improve your visibility?</h2>
          <div style={{ marginTop: "2.5rem" }}>
            <a href="/consultation" className="button button-acid" style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} onClick={(e) => leavePage(e, "/consultation")}>
              Discuss Your SEO Needs <Arrow />
            </a>
          </div>
        </section>

        {/* Tags */}
        <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
          {tagList.map(tag => (
            <span key={tag} style={{ fontSize: "0.75rem", color: "var(--ink-light)", background: "rgba(0,0,0,0.03)", padding: "4px 10px", borderRadius: "4px" }}>
              {tag}
            </span>
          ))}
        </div>
        
        <footer style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
          <a href="/" className="wordmark" onClick={(event) => leavePage(event, "/")}>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
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

  const isModalOpen = route === "/consultation" || route === "/terms" || route === "/scraping" || route === "/knowledge-assistant" || route === "/seo"

  return (
    <>
      <HomePage navigate={navigate} isBackground={isModalOpen} />
      {route === "/seo" && <SeoPage navigate={navigate} />}
      {route === "/knowledge-assistant" && <KnowledgeAssistantPage navigate={navigate} />}
      {route === "/scraping" && <ScrapingPage navigate={navigate} />}
      {route === "/consultation" && <ConsultationPage navigate={navigate} />}
      {route === "/terms" && <TermsPage navigate={navigate} />}
      <Chatbot navigate={navigate} />
    </>
  )
}
