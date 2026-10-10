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
    letter: "P",
    title: "Competitor Price Intelligence",
    audience: "For e-commerce brands",
    description:
      "A weekly view of price and stock movements across five competitors, delivered in a structured Google Sheet.",
    features: [
      "Five competitors monitored",
      "Weekly price and stock report",
      "Alerts on price drops",
    ],
    setup: "$500 setup",
    monthly: "$300 / month",
  },
  {
    number: "02",
    letter: "K",
    title: "Internal Knowledge Assistant",
    audience: "For service businesses with 20–100 employees",
    description:
      "A private assistant trained on your SOPs and handbook, giving your team reliable answers from approved sources.",
    features: [
      "Private, company-specific chatbot",
      "SOP and handbook ingestion",
      "Monthly knowledge refresh",
    ],
    setup: "$1,500 setup",
    monthly: "$250 / month",
  },
  {
    number: "03",
    letter: "L",
    title: "Local Search Reporting",
    audience: "For dentists, law firms, HVAC, and med spas",
    description:
      "A concise monthly scorecard that turns local search data into a short list of practical improvements.",
    features: [
      "Rankings, clicks, and competitors",
      "Google Business Profile review",
      "Three recommended fixes",
    ],
    setup: "$499 initial audit",
    monthly: "$199 / month / location",
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
            href="#pricing"
            onClick={(event) => scrollToSection(event, "pricing")}
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
              <article className="service-card" key={service.title}>
                <div className="service-art" aria-hidden="true">
                  <span>{service.letter}</span>
                  <small>{service.number}</small>
                </div>
                <div className="service-body">
                  <div className="service-number">{service.number}</div>
                  <p className="eyebrow">{service.audience}</p>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="service-price">
                    <span>{service.setup}</span>
                    <strong>{service.monthly}</strong>
                  </div>
                </div>
              </article>
            ))}
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

        <section id="pricing" className="section-frame pricing-section">
          <div className="section-meta">
            <span>03 — Pricing</span>
            <span>Transparent by default</span>
          </div>
          <div className="section-heading">
            <h2>
              Know the cost
              <br />
              before we start.
            </h2>
            <p>
              Fixed base pricing makes evaluation straightforward. Any expanded
              scope is agreed before work begins.
            </p>
          </div>
          <div
            className="pricing-table"
            role="table"
            aria-label="Pricing summary"
          >
            <div className="pricing-row pricing-head" role="row">
              <span role="columnheader">Service</span>
              <span role="columnheader">Best for</span>
              <span role="columnheader">Initial</span>
              <span role="columnheader">Ongoing</span>
            </div>
            {services.map((service) => (
              <div className="pricing-row" role="row" key={service.title}>
                <span role="cell">
                  <small>{service.number}</small>
                  <strong>{service.title}</strong>
                </span>
                <span role="cell">{service.audience.replace("For ", "")}</span>
                <span role="cell">{service.setup}</span>
                <span role="cell">{service.monthly}</span>
              </div>
            ))}
          </div>
          <p className="pricing-note">
            All prices in USD. Local Search Reporting is priced per location.
          </p>
        </section>

        <section id="faq" className="section-frame faq-section">
          <div className="section-meta">
            <span>04 — FAQ</span>
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

function ConsultationPage({ navigate }: { navigate: Navigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [serviceError, setServiceError] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    const nextErrors = {
      name: name ? "" : "Please enter your name.",
      email: !email
        ? "Please enter your work email."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Please enter a valid email address.",
      message: message ? "" : "Please describe what you would like to improve.",
    }

    setFieldErrors(nextErrors)
    setServiceError(!selectedService)
    setSubmitted(false)

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.message ||
      !selectedService
    ) {
      return
    }

    setSubmitted(true)
    setServiceError(false)
    setFieldErrors({ name: "", email: "", message: "" })
    setSelectedService("")
    event.currentTarget.reset()
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
                {serviceOpen && (
                  <div
                    className="service-options"
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
                )}
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
              >
                Book a consultation <Arrow />
              </button>
              {submitted && (
                <p className="form-success" role="status">
                  Thank you. Your request has been recorded for this demo.
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

  const isModalOpen = route === "/consultation" || route === "/terms"

  return (
    <>
      <HomePage navigate={navigate} isBackground={isModalOpen} />
      {route === "/consultation" && <ConsultationPage navigate={navigate} />}
      {route === "/terms" && <TermsPage navigate={navigate} />}
    </>
  )
}
