import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
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
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
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
    }, 700)
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
    }, 700)
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
          <span>Last updated —</span>
        </div>
        <div className="terms-heading">
          <p className="eyebrow">Quoin / Terms</p>
          <h1>
            Terms &amp;
            <br />
            conditions.
          </h1>
        </div>
        <div className="terms-reserved" aria-hidden="true" />
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
    window.scrollTo(0, 0)
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
