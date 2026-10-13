import { useState, type MouseEvent as ReactMouseEvent } from "react"
import { BrandLogo } from "./App"

export type Navigate = (path: string) => void

export function LegalNavTabs({
  current,
  onNavigate,
}: {
  current: "terms" | "privacy" | "refund"
  onNavigate: (e: ReactMouseEvent<HTMLAnchorElement>, path: string) => void
}) {
  return (
    <nav className="legal-nav-tabs" aria-label="Legal documents">
      <a
        href="https://quoin.online/terms"
        className={`legal-nav-tab${current === "terms" ? " is-active" : ""}`}
        onClick={(e) => onNavigate(e, "/terms")}
      >
        Terms &amp; Conditions
      </a>
      <a
        href="https://quoin.online/privacy"
        className={`legal-nav-tab${current === "privacy" ? " is-active" : ""}`}
        onClick={(e) => onNavigate(e, "/privacy")}
      >
        Privacy Policy
      </a>
      <a
        href="https://quoin.online/refund"
        className={`legal-nav-tab${current === "refund" ? " is-active" : ""}`}
        onClick={(e) => onNavigate(e, "/refund")}
      >
        Refund Policy
      </a>
    </nav>
  )
}

/* ==========================================================================
   TERMS & CONDITIONS PAGE
   ========================================================================== */

export function TermsPage({ navigate }: { navigate: Navigate }) {
  const [leaving, setLeaving] = useState(false)

  function openPage(event: ReactMouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(path)
    }, 420)
  }

  return (
    <div className={`site-shell terms-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quoin home"
          onClick={(e) => openPage(e, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">Legal / Terms</span>
        <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
          Back to home
        </a>
      </header>
      <main className="terms-page">
        <div className="section-meta">
          <span>01 — Legal</span>
          <span>Last Updated: 13 October 2026 · Version 1.0</span>
        </div>
        <div className="terms-heading">
          <p className="eyebrow">Quoin / Legal</p>
          <h1>
            Terms &amp;
            <br />
            conditions.
          </h1>
        </div>

        <LegalNavTabs current="terms" onNavigate={openPage} />

        <div className="terms-content">
          <div className="terms-intro-box">
            <p className="terms-date-tag">
              <strong>Quoin</strong> &nbsp;·&nbsp;{" "}
              <strong>Last Updated:</strong> 13 October 2026 &nbsp;·&nbsp;{" "}
              <strong>Version:</strong> 1.0
            </p>
            <h2>About These Terms</h2>
            <p>
              Quoin is a commercial technology practice operated by Suryash
              Rathore as a sole proprietor under the laws of the Republic of
              India, trading as &ldquo;Quoin&rdquo; (&ldquo;Quoin&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). Quoin is
              currently a sole proprietorship, not a company or a limited
              liability partnership. Unless a separate agreement signed by Quoin
              states otherwise, every proposal, statement of work, quotation,
              invoice and service order is a contract directly with Suryash Rathore
              trading as Quoin.
            </p>
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of
              the Quoin website at quoin.online and every Service that Quoin provides.
              They are read together with Quoin&apos;s{" "}
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>{" "}
              (https://quoin.online/privacy) and{" "}
              <a href="https://quoin.online/refund" onClick={(e) => openPage(e, "/refund")}>
                Refund &amp; Cancellation Policy
              </a>{" "}
              (https://quoin.online/refund), which are published on separate pages and form
              part of the Agreement as Section 1.5 explains.
            </p>
            <p>
              If you do not agree to these Terms, do not use the website or buy the
              Services.
            </p>
          </div>

          <section className="terms-section" id="terms-s1">
            <h2>1. Acceptance, Formation &amp; Order of Precedence</h2>
            <p>
              <strong>1.1 Acceptance.</strong> These Terms become binding on the
              Client when the Client: (a) signs or otherwise approves a Statement
              of Work (&ldquo;SOW&rdquo;) incorporating these Terms; (b)
              electronically accepts these Terms where an acceptance mechanism is
              provided; or (c) makes any payment for the Services after being
              provided these Terms. Use of the Quoin website alone does not
              constitute acceptance of these commercial Terms. Acceptance by
              electronic means is valid and binding under the Information
              Technology Act, 2000 and the Indian Contract Act, 1872. Quoin&apos;s
              records of emails, approvals, timestamps and payment confirmations
              are admissible evidence of Acceptance.
            </p>
            <p>
              <strong>1.2 Authority.</strong> If you accept on behalf of an
              organisation, you confirm that you have authority to bind it. If you
              do not, you accept these Terms personally.
            </p>
            <p>
              <strong>1.3 Applicable Version.</strong> Each SOW is governed by the
              version of these Terms published on the website on the date the SOW
              is accepted (the &ldquo;Applicable Version&rdquo;), unless the
              parties agree in writing to a later version. Section 31 explains how
              changes apply.
            </p>
            <p>
              <strong>1.4 Client terms excluded.</strong> No purchase order, vendor
              questionnaire, procurement-portal terms or other Client document
              changes these Terms unless Quoin expressly agrees to that specific
              change in a writing issued or confirmed by Quoin. Quoin starting work
              or accepting payment is not agreement to such terms.
            </p>
            <p>
              <strong>1.5 Documents and order of precedence.</strong> The
              &ldquo;Agreement&rdquo; consists of the following documents. If
              they conflict, the earlier item prevails: (a) a Statement of Work
              issued or countersigned by Quoin, but only as to its commercial
              particulars (scope, price, timetable, payment schedule) and any clause
              of these Terms that it identifies by number and expressly says it
              overrides; (b) these Terms, including Annex A; (c) the{" "}
              <a href="https://quoin.online/refund" onClick={(e) => openPage(e, "/refund")}>
                Refund &amp; Cancellation Policy
              </a>
              ; and (d) the{" "}
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>
              , which governs Quoin&apos;s own processing of personal data as a
              controller. For Client Personal Data that Quoin processes on the
              Client&apos;s behalf, Section 17 and Annex A prevail over the Privacy
              Policy.
            </p>
          </section>

          <section className="terms-section" id="terms-s2">
            <h2>2. Definitions &amp; Interpretation</h2>
            <p>
              <strong>2.1 Definitions.</strong> In these Terms:
            </p>
            <ul>
              <li>
                <strong>Agreement</strong> has the meaning in Section 1.5.
              </li>
              <li>
                <strong>Applicable Law</strong> means all laws, regulations and
                binding orders that apply to a party or to the Services, including
                Data Protection Laws.
              </li>
              <li>
                <strong>Business Day</strong> means a day other than a Saturday, a
                Sunday or a public holiday in Uttar Pradesh, India.
              </li>
              <li>
                <strong>Client</strong> means the commercial entity, business,
                organisation or authorised professional representative that buys
                Services from Quoin.
              </li>
              <li>
                <strong>Client Materials</strong> means all data, documents,
                credentials, API keys, specifications, source and target lists,
                instructions and other materials that the Client or its
                representatives supply to Quoin.
              </li>
              <li>
                <strong>Client Personal Data</strong> means personal data that
                Quoin processes on the Client&apos;s behalf in providing the
                Services.
              </li>
              <li>
                <strong>Confidential Information</strong> means non-public
                commercial, technical, financial or proprietary information that
                one party discloses to the other in connection with the Services
                and that is marked confidential or would reasonably be understood
                to be confidential. Client Materials are the Client&apos;s
                Confidential Information, and Pre-Existing IP is Quoin&apos;s.
              </li>
              <li>
                <strong>Custom Deliverables</strong> means datasets, reports,
                documents, configurations and indexes created specifically for the
                Client under an SOW. Software code, scripts, scrapers and
                pipelines are not Custom Deliverables unless the SOW expressly
                says they are.
              </li>
              <li>
                <strong>Data Protection Laws</strong> means laws on privacy and
                personal data that apply to the processing in question, including
                Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), the UK GDPR, the
                Digital Personal Data Protection Act, 2023 and applicable rules,
                as in force from time to time (&ldquo;DPDP Act&rdquo;), and the
                Information Technology Act, 2000 and rules made under it.
              </li>
              <li>
                <strong>Deliverables</strong> means everything that an SOW says
                Quoin will deliver, including datasets, software, scripts,
                indexing architectures, technical reports and system
                configurations.
              </li>
              <li>
                <strong>Fees</strong> means all amounts payable under an SOW, an
                invoice or these Terms.
              </li>
              <li>
                <strong>Pre-Existing IP</strong> means software, libraries, tools,
                scraper frameworks, prompt templates, workflows, methodologies,
                algorithms and know-how that Quoin owned or developed before, or
                independently of, the applicable engagement, together with
                improvements to them.
              </li>
              <li>
                <strong>Review Period</strong> means seven (7) calendar days from
                delivery of a Deliverable.
              </li>
              <li>
                <strong>Services</strong> has the meaning in Section 4.
              </li>
              <li>
                <strong>SOW or Statement of Work</strong> means any quotation,
                proposal, order form, invoice or written scope document that
                describes a project and references, or is issued under, these
                Terms.
              </li>
              <li>
                <strong>Target Source</strong> means any website, platform, API,
                database or other source from which data is collected at the
                Client&apos;s direction.
              </li>
              <li>
                <strong>Third-Party Services</strong> means external APIs, AI
                model providers, hosting environments, proxy networks, payment
                processors and other services, including Target Sources, that
                Quoin does not own or control.
              </li>
            </ul>
            <p>
              <strong>2.2 Interpretation.</strong> Headings are for convenience
              only. &ldquo;Including&rdquo; means &ldquo;including without
              limitation&rdquo;. A reference to a law includes that law as amended
              or replaced. &ldquo;Written&rdquo; and &ldquo;in writing&rdquo;
              include email. No rule of construction applies against a party
              because that party drafted a provision.
            </p>
          </section>

          <section className="terms-section" id="terms-s3">
            <h2>3. Business-to-Business Use Only</h2>
            <p>
              Quoin provides the Services and the website strictly to commercial,
              business, professional, corporate and enterprise clients.
            </p>
            <p>
              The Services are not designed for, marketed to or intended for
              individuals who want them for personal, family or household
              purposes. The Client represents, warrants and agrees that: (a) it is
              entering into the Agreement solely for business purposes; (b) it is
              not a consumer under the Consumer Protection Act, 2019 or any
              equivalent law; (c) it has legal capacity and, if an organisation, the
              corporate authority to bind itself; and (d) the person accepting is at
              least eighteen (18) years old.
            </p>
            <p>
              Quoin may decline or cancel any order that it reasonably believes is
              for non-business purposes, and will refund Fees paid for work not yet
              performed.
            </p>
          </section>

          <section className="terms-section" id="terms-s4">
            <h2>4. Services</h2>
            <p>
              <strong>4.1 Description.</strong> Quoin provides technology and
              professional services, including: web scraping and data extraction;
              internal knowledge assistant solutions; SEO and search intelligence;
              AI-assisted automation workflows; and custom data engineering,
              processing and transformation (together, the &ldquo;Services&rdquo;).
            </p>
            <p>
              <strong>4.2 Scope is set by the SOW.</strong> The exact scope,
              specifications, Deliverables, timeline, integrations and price of a
              project are those in the applicable SOW. Descriptions of Services on
              the website are general and illustrative. They do not mean that every
              feature or integration is included in every project.
            </p>
            <p>
              <strong>4.3 Timelines.</strong> Dates in an SOW are good-faith
              estimates unless the SOW expressly states that a date is fixed. Time
              is not of the essence. Quoin is not responsible for delay caused by
              the Client, by Third-Party Services or by events under Section 26.
            </p>
            <p>
              <strong>4.4 Remote delivery and service levels.</strong> Quoin
              delivers the Services remotely. Quoin gives no uptime, response-time
              or support commitment unless an SOW sets one out.
            </p>
            <p>
              <strong>4.5 Changes to offerings.</strong> Quoin may improve, change
              or discontinue a Service that it offers on its website. This does not
              affect an SOW already accepted, other than as Section 20 provides.
            </p>
          </section>

          <section className="terms-section" id="terms-s5">
            <h2>5. Pricing, Quotations &amp; Currency</h2>
            <p>
              <strong>5.1 Starting prices.</strong> The website shows starting
              prices for certain Services: Web Scraping &amp; Data Extraction from
              $99 one-time; Internal Knowledge Assistant from $299 one-time setup;
              and SEO &amp; Search Intelligence from $99 per month. These are
              baselines, not quotations, and do not bind Quoin.
            </p>
            <p>
              <strong>5.2 Final price.</strong> The final price depends on factors
              such as project complexity, data volume, number of sources, anti-bot
              defences, integrations, infrastructure, third-party API and AI
              usage, and ongoing maintenance. A binding price is set only in an SOW
              or invoice that Quoin issues before work begins.
            </p>
            <p>
              <strong>5.3 Validity.</strong> A quotation is valid for fourteen (14)
              days from its date unless it states otherwise. A change to website
              prices does not affect an SOW already accepted.
            </p>
            <p>
              <strong>5.4 Currency.</strong> Quotations and invoices are issued in
              the currency stated in the SOW, typically United States Dollars (USD)
              for international Clients and Indian Rupees (INR) for Clients in
              India.
            </p>
          </section>

          <section className="terms-section" id="terms-s6">
            <h2>6. Payments, Taxes &amp; Export of Services</h2>
            <p>
              <strong>6.1 Payment methods.</strong> The Client may pay by UPI,
              Razorpay, PayPal, bank wire transfer or another method that Quoin
              approves in writing. Payment processors may apply their own fees,
              verification requirements and restrictions.
            </p>
            <p>
              <strong>6.2 Invoicing and due dates.</strong> Fees are due as stated
              in the SOW or invoice. If neither states a date, payment is due within
              seven (7) calendar days of the invoice date. Quoin may require
              advance payment, full or partial, or milestone payments before it
              begins or continues work.
            </p>
            <p>
              <strong>6.3 Bank and processor charges.</strong> The Client bears all
              bank, wire, payment-gateway and currency-conversion charges. Payments
              must be made so that Quoin receives the full invoiced amount in the
              invoice currency.
            </p>
            <p>
              <strong>6.4 Taxes.</strong> All Fees are exclusive of taxes, levies
              and duties, including Goods and Services Tax (GST), value added tax,
              sales tax and customs duties. The Client pays all taxes that apply to
              its purchase, other than taxes on Quoin&apos;s net income. Where GST
              applies, Quoin adds it to the invoice at the applicable rate, and the
              Client must give its GST details on request.
            </p>
            <p>
              <strong>6.5 Export of services.</strong> Where the Client is located
              outside India, Quoin may treat the Services as an &ldquo;export of
              services&rdquo; under Section 2(6) of the Integrated Goods and
              Services Tax Act, 2017 and zero-rate them, to the extent Quoin is
              registered and all conditions are met, including receipt of payment
              in convertible foreign exchange. If the conditions are not met, the
              Client pays any GST that applies.
            </p>
            <p>
              <strong>6.6 Withholding taxes.</strong> Payments must be made without
              deduction or withholding unless Applicable Law requires it. If law
              requires withholding, then: (a) for a Client in India, the Client
              deducts tax as the law requires and gives Quoin the official
              certificate within the statutory period; and (b) for a Client outside
              India, the Client must increase the payment so that Quoin receives the
              full invoiced amount (a &ldquo;gross-up&rdquo;), unless the SOW
              provides that the Client will instead give Quoin official withholding
              certificates within thirty (30) calendar days.
            </p>
            <p>
              <strong>6.7 Late payment.</strong> An unpaid amount accrues interest
              from the due date until paid, at 1.5% per month or the maximum rate
              Applicable Law allows, whichever is lower. The Client also pays
              Quoin&apos;s reasonable costs of collection, including reasonable
              legal fees. Quoin may suspend the Services under Section 21.
            </p>
            <p>
              <strong>6.8 Disputed invoices.</strong> The Client must tell Quoin in
              writing within seven (7) calendar days of the invoice date if it
              disputes any part of an invoice, giving reasons. The Client must pay
              the undisputed part on time. The parties will work to resolve the
              dispute under Section 27.
            </p>
            <p>
              <strong>6.9 No set-off.</strong> The Client may not withhold or set
              off Fees against any claim it has against Quoin.
            </p>
            <p>
              <strong>6.10 Payment and delivery.</strong> Quoin may withhold final
              Deliverables, and the transfer of rights under Section 15, until it has
              received all Fees due in cleared funds.
            </p>
          </section>

          <section className="terms-section" id="terms-s7">
            <h2>7. Project Scope &amp; Change Requests</h2>
            <p>
              Quoin performs the Services according to the written scope in the
              SOW.
            </p>
            <p>
              A request that materially expands or alters that scope is a
              &ldquo;Change Request&rdquo;. Examples include additional websites,
              sources or data fields, more integrations or workflows, higher data
              volume or processing frequency, architectural or material redesigns,
              expedited deadlines, new functionality, and requirements introduced
              after approval.
            </p>
            <p>
              A Change Request may require additional Fees and a revised timeline.
              It takes effect only when both parties agree to it in writing,
              including by email. Quoin may pause related work until then and need
              not perform out-of-scope work without agreement.
            </p>
          </section>

          <section className="terms-section" id="terms-s8">
            <h2>8. Client Responsibilities &amp; Dormant Projects</h2>
            <p>
              <strong>8.1 Client duties.</strong> The Client will: (a) give
              accurate, complete and timely specifications; (b) supply required
              documents, credentials, API access and sample data promptly; (c) name
              a contact who can make decisions; (d) give feedback and approvals
              promptly and within any period stated in the SOW; (e) review
              Deliverables within the Review Period; and (f) cooperate in good
              faith throughout the project.
            </p>
            <p>
              <strong>8.2 Client Materials warranty.</strong> The Client warrants
              that it owns or has all necessary rights, licences, consents and
              permissions for the Client Materials and for each Target Source it
              instructs Quoin to use; that the Client Materials are lawful, do not
              infringe third-party rights and contain no malicious code; and that
              its instructions and its intended use of the Services and Deliverables
              comply with Applicable Law.
            </p>
            <p>
              <strong>8.3 Backups.</strong> The Client keeps its own copies of
              Client Materials and of everything delivered. Quoin is not a backup
              or archive service.
            </p>
            <p>
              <strong>8.4 Delay.</strong> Quoin is not responsible for delay or
              failure caused by inaccurate, incomplete, unauthorised or late Client
              Materials, approvals or access.
            </p>
            <p>
              <strong>8.5 Dormant projects.</strong> If a project is delayed for
              more than thirty (30) consecutive calendar days because the Client has
              not supplied required materials, credentials, feedback or approvals,
              Quoin may place the project on dormant status or end the engagement
              under Section 21.2. Quoin may invoice all work performed and milestones
              reached. Restarting a dormant project may require an administrative
              re-scoping fee and a revised schedule.
            </p>
          </section>

          <section className="terms-section" id="terms-s9">
            <h2>9. Acceptable Use</h2>
            <p>
              The Client must not use, and must not instruct Quoin to use, the
              Services or the Deliverables to:
            </p>
            <ul>
              <li>break Applicable Law or infringe another person&apos;s rights;</li>
              <li>
                commit fraud, send spam, harass or stalk any person, or build
                profiles of individuals in order to harm them;
              </li>
              <li>
                gain access to non-public systems, accounts, content or data without
                authorisation, or avoid authentication, paywalls or technical
                access controls;
              </li>
              <li>
                collect passwords, payment card data, government identity numbers,
                health records or data about children, unless a signed SOW
                expressly allows it and the Client has a lawful basis;
              </li>
              <li>
                carry out unlawful surveillance, or support military, weapons or
                cyber-weapon activity;
              </li>
              <li>
                disrupt, overload or damage any website, network or system; or
              </li>
              <li>
                reverse engineer, copy or resell Quoin&apos;s Pre-Existing IP except
                as Section 15 allows.
              </li>
            </ul>
            <p>
              Quoin may refuse, suspend or stop any work that it reasonably
              believes breaches this Section. Fees for work already performed
              remain payable.
            </p>
          </section>

          <section className="terms-section" id="terms-s10">
            <h2>10. Web Scraping &amp; Data Extraction</h2>
            <p>
              <strong>10.1 Technical contractor.</strong> Quoin provides technical
              automation and data collection as an independent contractor acting at
              the Client&apos;s explicit direction. Quoin collects publicly
              accessible information unless the SOW expressly authorises otherwise
              and Applicable Law allows it.
            </p>
            <p>
              <strong>10.2 Client decides and is responsible.</strong> The Client
              chooses the Target Sources and how it will use the data. The Client is
              responsible for making sure that its collection and use of data comply
              with Applicable Law, the Target Source&apos;s terms, contracts,
              intellectual property and database rights, and privacy law. Quoin does
              not give legal advice on whether collecting data from any particular
              Target Source is lawful.
            </p>
            <p>
              <strong>10.3 No circumvention.</strong> Quoin does not (a) access
              non-public areas, accounts or paid content without credentials that
              the Client has supplied and is entitled to use, (b) circumvent
              authentication, paywalls or technical access-control measures, or (c)
              knowingly collect data in breach of a court order. Quoin may use
              ordinary infrastructure, such as managed request rates and proxy
              networks, to operate reliably. This is not permission to bypass
              access controls.
            </p>
            <p>
              <strong>10.4 Right to refuse, suspend or stop.</strong> Quoin may
              refuse, suspend or stop any project or Target Source in its discretion
              if it determines that the Target Source has introduced anti-scraping
              measures or CAPTCHA escalation, changed its terms or created
              technical barriers, or that continuing creates legal or operational
              exposure. Section 19.5 then applies.
            </p>
            <p>
              <strong>10.5 Cease-and-desist and complaints.</strong> Quoin will stop
              collection from a Target Source immediately after it receives a
              cease-and-desist letter, abuse complaint, ISP notice or other formal
              legal demand from the owner or operator of that Target Source, or from
              a court or authority. Quoin may tell the Client about the demand and
              is not liable to the Client for complying. Fees for work performed to
              the date of stopping remain payable. The Client must not ask Quoin to
              resume without Quoin&apos;s written agreement.
            </p>
            <p>
              <strong>10.6 Personal data.</strong> Quoin does not configure
              scrapers to collect personal data, private directories, login
              credentials, passwords, health records or financial data. A project
              that needs personal data must say so in the SOW and confirm the
              Client&apos;s lawful basis, and Section 17 then applies. If personal
              data is collected incidentally, Quoin handles it only as the
              Client&apos;s processor on documented instructions, and will suspend
              collection, quarantine or delete it if the Client instructs or if
              Quoin determines that the collection is unlawful or unauthorised.
            </p>
            <p>
              <strong>10.7 Client-supplied credentials.</strong> If the Client asks
              Quoin to collect data through an authenticated account, or supplies
              logins, session cookies or API keys, the Client warrants that (a) it
              has full legal and contractual authority to automate that account, (b)
              it understands that automated access may breach the platform&apos;s
              terms and lead to throttling, suspension or termination of the
              account, and (c) it accepts sole responsibility for, and will indemnify
              Quoin under Section 24 against, resulting account actions, platform
              claims and damages.
            </p>
            <p>
              <strong>10.8 No warranty on data.</strong> Collected data reflects the
              Target Source at the time of collection. Quoin does not warrant that
              it is accurate, complete, current, lawful to use or free of
              third-party rights. The Client must verify data before relying on it.
            </p>
            <p>
              <strong>10.9 Target Source changes.</strong> Third parties may change
              their site structure, APIs, access rules or availability at any time.
              Quoin does not promise uninterrupted or permanent access to any Target
              Source. Ongoing maintenance of a scraper is provided only if the SOW
              or a retainer says so.
            </p>
          </section>

          <section className="terms-section" id="terms-s11">
            <h2>11. AI &amp; Internal Knowledge Assistant Services</h2>
            <p>
              <strong>11.1 Third-party models.</strong> AI-powered Services depend on
              third-party models (for example from OpenAI, Anthropic and Google),
              vector stores, retrieval-augmented generation pipelines and the
              Client&apos;s source documents. Quoin is not liable for a provider&apos;s
              model deprecation, outage or change in token pricing. Quoin may
              substitute a comparable model where reasonably necessary, and may pass
              through usage costs as the SOW provides.
            </p>
            <p>
              <strong>11.2 Verification required.</strong> AI outputs are
              probabilistic and non-deterministic. They can be wrong, incomplete, out
              of date or inconsistent between runs. The Client must independently
              review and verify AI outputs before relying on them for operational,
              commercial, legal or regulatory decisions.
            </p>
            <p>
              <strong>11.3 No professional advice or high-risk use.</strong> Unless
              an SOW expressly says otherwise, the Services are not legal, medical,
              financial, tax or engineering advice. The Client must not use them in
              life-critical, hazardous or fully autonomous consequential workflows
              without human oversight.
            </p>
            <p>
              <strong>11.4 Client responsibilities.</strong> The Client is
              responsible for the content it loads into a knowledge assistant; for
              having the rights to that content; for access controls over who can
              use the assistant; for not loading data that Section 9 prohibits; and
              for telling end users that they are interacting with AI where law
              requires it.
            </p>
            <p>
              <strong>11.5 Outputs.</strong> As between the parties, and subject to
              Section 15 and the providers&apos; terms, the Client may use outputs
              generated for it. Quoin does not warrant that outputs are original or
              free of third-party rights, and similar outputs may be generated for
              others.
            </p>
            <p>
              <strong>11.6 AI Service Providers.</strong> Section 17.9 governs the
              use of Client Materials and Client Personal Data with third-party AI
              and machine-learning providers.
            </p>
          </section>

          <section className="terms-section" id="terms-s12">
            <h2>12. SEO &amp; Search Intelligence</h2>
            <p>
              SEO and Search Intelligence Services depend on search engine
              algorithms, third-party data providers, competitors, market
              conditions and the Client&apos;s own website, all outside Quoin&apos;s
              control. Quoin does not guarantee any particular ranking, traffic
              level, lead, conversion, revenue, return on investment or visibility
              in AI-powered search.
            </p>
            <p>
              Recommendations are based on the information available when they are
              made. The Client decides whether and how to implement them. Quoin is
              not liable for ranking changes, penalties or loss that result from
              search engine changes, from issues that existed before the engagement,
              from changes that the Client or others make to its site, or from the
              Client not following Quoin&apos;s advice. Third-party tool data may be
              estimated or incomplete.
            </p>
          </section>

          <section className="terms-section" id="terms-s13">
            <h2>13. Third-Party Services</h2>
            <p>
              The Services may depend on Third-Party Services such as hosting, APIs,
              AI providers, proxy networks and payment gateways. These are governed
              by their own terms, pricing, availability and technical limits. Quoin
              does not warrant their continued availability, performance,
              compatibility or pricing.
            </p>
            <p>
              Third-party costs that the SOW does not expressly include are the
              Client&apos;s responsibility. If Quoin pays such a cost on the
              Client&apos;s behalf with the Client&apos;s approval, Quoin may
              invoice it at cost. Where a Third-Party Service account is opened in
              the Client&apos;s name, the Client is responsible for that account and
              its billing.
            </p>
          </section>

          <section className="terms-section" id="terms-s14">
            <h2>14. Deliverables, Acceptance &amp; Revisions</h2>
            <p>
              <strong>14.1 Delivery.</strong> A Deliverable is delivered when Quoin
              makes it available to the Client, for example by email, download link,
              repository or platform access.
            </p>
            <p>
              <strong>14.2 Review.</strong> The Client has the Review Period (seven
              (7) calendar days from delivery) to inspect each Deliverable and to give
              Quoin written notice that identifies in detail any material failure to
              meet the written specifications in the SOW.
            </p>
            <p>
              <strong>14.3 Correction.</strong> After a valid notice, Quoin has at
              least fifteen (15) calendar days to investigate and correct the
              failure. Section 19.4 applies if Quoin cannot.
            </p>
            <p>
              <strong>14.4 Acceptance.</strong> A Deliverable is accepted on the
              earliest of: (a) the Client&apos;s written approval; (b) the Client
              using it for its intended production purpose; and (c) the end of the
              Review Period without a valid notice of material failure.
            </p>
            <p>
              <strong>14.5 After acceptance.</strong> Changes requested after
              acceptance are Change Requests. Ongoing support or maintenance is
              provided only if the SOW or a retainer says so.
            </p>
            <p>
              <strong>14.6 Revisions.</strong> Any revisions included in the price
              are stated in the SOW. A revision is a change needed to make the work
              conform to the agreed scope. New requirements or a change of direction
              are quoted as separate work.
            </p>
            <p>
              <strong>14.7 Payment first.</strong> Section 6.10 applies to the release
              of final Deliverables.
            </p>
          </section>

          <section className="terms-section" id="terms-s15">
            <h2>15. Intellectual Property</h2>
            <p>
              <strong>15.1 Client Materials.</strong> The Client keeps all rights
              in its Client Materials, data, documents, trademarks and branding.
              The Client grants Quoin (and its sub-processors and subcontractors) a
              limited, non-exclusive, worldwide, royalty-free licence to use the
              Client Materials only to provide the Services.
            </p>
            <p>
              <strong>15.2 Quoin&apos;s Pre-Existing IP.</strong> Quoin owns all
              Pre-Existing IP, including reusable engines, libraries, tools,
              frameworks, scraper architectures, templates and general know-how.
              Nothing in the Agreement transfers Pre-Existing IP to the Client
              except through the licence in Section 15.5.
            </p>
            <p>
              <strong>15.3 Custom Deliverables.</strong> On Quoin&apos;s receipt of
              all Fees due under the SOW in cleared funds, Quoin assigns to the
              Client all of Quoin&apos;s rights in the Custom Deliverables,
              perpetually, worldwide, for the full term of protection and in all
              media and formats. The assignment excludes Pre-Existing IP and
              third-party components. Until full payment, the Client holds only a
              limited, revocable licence to evaluate the Custom Deliverables, not to
              use them in production.
            </p>
            <p>
              <strong>15.4 Software and tooling.</strong> Source code, scripts,
              scrapers and pipelines that Quoin delivers remain Quoin&apos;s
              property and are licensed under Section 15.5, unless the SOW expressly
              says that ownership of them is assigned to the Client. Where an SOW
              does assign them, the assignment takes effect on full payment and
              Section 15.3 applies to it.
            </p>
            <p>
              <strong>15.5 Licence to Pre-Existing IP and licensed Deliverables.</strong>{" "}
              On full payment of all Fees due, Quoin grants the Client a perpetual,
              worldwide, non-exclusive, royalty-free licence to use, run and
              reproduce Pre-Existing IP and licensed software Deliverables, as
              incorporated in the Deliverables, for the internal business purposes
              of the Client and its affiliates. The Client may modify delivered
              source code for its own internal use. The licence is not transferable,
              except to a successor to the Client&apos;s whole business who agrees to
              these Terms. The Client must not extract or isolate Pre-Existing IP,
              sub-license it, resell it, distribute it, or offer it as a standalone
              product or competing service, and must not remove Quoin&apos;s
              proprietary notices.
            </p>
            <p>
              <strong>15.6 Collected data.</strong> As between the parties, the
              Client owns datasets collected for it, subject to the rights of third
              parties in the underlying content. Quoin claims no ownership of them
              and gives no warranty about third-party rights. The Client is solely
              responsible for how it uses collected data.
            </p>
            <p>
              <strong>15.7 Third-party and open-source components.</strong> These
              are subject to their own licences, which prevail for those components.
              Quoin will identify the main ones on request.
            </p>
            <p>
              <strong>15.8 Residual knowledge.</strong> Quoin may use the general
              skills, ideas and techniques it learns or develops while providing the
              Services, provided it does not use or disclose the Client&apos;s
              Confidential Information or personal data.
            </p>
            <p>
              <strong>15.9 Feedback.</strong> The Client grants Quoin a free,
              perpetual licence to use any suggestions or feedback it gives about the
              Services.
            </p>
            <p>
              <strong>15.10 Portfolio and publicity.</strong> Quoin will not use the
              Client&apos;s name, logo, trademarks, brand names or non-public project
              information in any public portfolio, case study or marketing, or say
              that the Client is a customer, without the Client&apos;s prior written
              consent (email is enough). Quoin may describe general, anonymised
              technical methods and non-confidential technical accomplishments.
            </p>
            <p>
              <strong>15.11 Quoin&apos;s name.</strong> The Client may not use
              Quoin&apos;s name or marks without Quoin&apos;s consent.
            </p>
          </section>

          <section className="terms-section" id="terms-s16">
            <h2>16. Confidentiality</h2>
            <p>
              <strong>16.1 Duties.</strong> Each party will keep the other&apos;s
              Confidential Information confidential; use it only to give or receive
              the Services; protect it with at least the care it uses for its own
              confidential information, and not less than reasonable care; and
              disclose it only to personnel, contractors, advisers and sub-processors
              who need it for that purpose and who are bound by confidentiality duties appropriate to the information.
            </p>
            <p>
              <strong>16.2 Exceptions.</strong> These duties do not apply to
              information that (a) is or becomes public through no breach of the
              Agreement, (b) the recipient already knew, (c) the recipient lawfully
              received from a third party without restriction, or (d) the recipient
              developed independently without using the discloser&apos;s
              Confidential Information.
            </p>
            <p>
              <strong>16.3 Legal compulsion.</strong> A party may disclose
              Confidential Information to the extent Applicable Law, a court or a
              regulator requires. Where lawful, it will tell the other party first
              and disclose only what is required.
            </p>
            <p>
              <strong>16.4 Return or deletion.</strong> On request, or when the
              Services end, the recipient will return or delete the other
              party&apos;s Confidential Information as Sections 17 and 21.5 provide,
              except for copies that law requires it to keep or that sit in routine
              backups until they are overwritten. Those copies stay confidential.
            </p>
            <p>
              <strong>16.5 Duration.</strong> These duties apply while the Agreement
              is in force and for five (5) years afterwards. For trade secrets and
              personal data they continue for as long as the information remains a
              trade secret or personal data.
            </p>
            <p>
              <strong>16.6 Remedies.</strong> Damages may not be an adequate remedy
              for breach of this Section. Either party may seek an injunction or
              similar relief as Section 27.4 allows.
            </p>
          </section>

          <section className="terms-section" id="terms-s17">
            <h2>17. Data Protection &amp; Sub-Processors</h2>
            <p>
              <strong>17.1 Roles.</strong> For Client Personal Data, the Client is
              the Data Fiduciary or controller and Quoin is its Data Processor or
              processor, to the extent those roles apply under law. For personal data
              that visitors, prospects and business contacts give Quoin directly,
              Quoin is the Data Fiduciary or controller, as the{" "}
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>{" "}
              explains.
            </p>
            <p>
              <strong>17.2 Client responsibilities.</strong> The Client is
              responsible for having a lawful basis for the processing, giving all
              required notices, obtaining all required consents, the accuracy of
              Client Personal Data, and the lawfulness of its instructions. The
              Client will not instruct Quoin to collect or process sensitive
              categories of data unless a signed SOW expressly allows it.
            </p>
            <p>
              <strong>17.3 This Section is a data processing agreement.</strong>{" "}
              This Section 17, Annex A and the SOW together form the data processing
              agreement between the parties for the purposes of GDPR Article 28, the
              UK GDPR and any equivalent law that requires one. On request, Quoin
              will also sign a standalone data processing addendum that incorporates
              the Standard Contractual Clauses. If it conflicts with this Section,
              the signed addendum prevails.
            </p>
            <p>
              <strong>17.4 Quoin&apos;s processor obligations.</strong> Quoin will:
            </p>
            <ul>
              <li>
                (a) process Client Personal Data only on the Client&apos;s documented
                instructions, which are the Agreement and any further written
                instructions within the scope of the Services, and tell the Client if
                it believes an instruction breaches Data Protection Laws (Quoin may
                decline to follow an instruction that it reasonably believes is
                unlawful);
              </li>
              <li>
                (b) ensure that people authorised to process Client Personal Data are
                bound by confidentiality;
              </li>
              <li>(c) apply the security measures in Section 18;</li>
              <li>(d) comply with Section 17.5 on sub-processors;</li>
              <li>
                (e) forward to the Client within five (5) Business Days any request
                it receives from an individual about Client Personal Data, and give
                reasonable help so the Client can respond to such requests (Quoin may
                charge reasonable costs if the help needs substantial effort);
              </li>
              <li>
                (f) give reasonable help with security obligations, breach
                notification, data protection impact assessments and consultations
                with authorities;
              </li>
              <li>
                (g) notify the Client in writing without undue delay after becoming
                aware of a personal data breach affecting Client Personal Data,
                describing as far as then known the nature and scope of the breach,
                the categories of data and individuals affected, the measures taken
                or planned, and a contact point;
              </li>
              <li>
                (h) at the Client&apos;s choice, delete or return Client Personal Data
                within thirty (30) days after the Services end or upon written
                request, unless law requires retention (in which case Quoin keeps it
                protected and uses it for no other purpose), and delete temporary
                staging data and credentials within the periods in Sections 17.8 and
                17.10; and
              </li>
              <li>
                (i) give the Client the information reasonably needed to show
                compliance with this Section, and allow audits by the Client or its
                auditor once a year, or after a personal data breach, on at least
                thirty (30) days&apos; written notice, during business hours, starting
                with documents and remote review, bound by confidentiality, and at
                the Client&apos;s cost. Quoin may meet audit requests in part with
                reports or certifications from its sub-processors.
              </li>
            </ul>
            <p>
              <strong>17.5 Sub-processors.</strong> The Client gives Quoin general
              written authorisation to engage sub-processors. Quoin&apos;s current
              sub-processors are listed in Section 6 of the{" "}
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>
              , which Quoin keeps up to date. Quoin will: (a) bind each sub-processor in writing to data protection obligations that meet the requirements of Article 28 of the GDPR (or equivalent applicable law); (b) remain responsible for its
              sub-processors&apos; performance, subject to Section 23; and (c) give the Client at least fourteen (14) days&apos; prior notice of any new or replacement sub-processor, by email or a notice on its website. The Client may object on reasonable data protection grounds within that period, and the parties will discuss the objection in good faith. If
              they cannot resolve it, the Client&apos;s only remedy is to end the
              affected Service on written notice, and Quoin will refund prepaid Fees
              for the unperformed portion of that Service. Quoin may replace a
              sub-processor immediately where needed for security or continuity, and
              will then give notice as soon as practicable. Payment providers such as
              Razorpay, PayPal and UPI operators act as independent controllers for
              payment processing and are not sub-processors.
            </p>
            <p>
              <strong>17.6 International transfers.</strong> Quoin operates from
              India. Client Personal Data may be processed in India and in the
              locations of Quoin&apos;s sub-processors. Where a transfer of Client
              Personal Data is subject to the GDPR, the Standard Contractual Clauses
              in Commission Implementing Decision (EU) 2021/914 (the &ldquo;SCCs&rdquo;)
              apply and are incorporated by reference, as follows: Module Two
              (controller to processor), with the Client as exporter and Quoin as
              importer; the optional docking clause in Clause 7 applies; Clause 9(a),
              Option 2 (general authorisation), with the notice period in Section
              17.5; the optional wording in Clause 11 does not apply; for Clause 13,
              the supervisory authority is that of the Client&apos;s establishment; for
              Clause 17, Option 1, the law of Ireland; for Clause 18(b), the courts of
              Ireland; Annex I is Annex A to these Terms; Annex II is Section 18
              together with Section 7 of the Privacy Policy; and Annex III is the
              sub-processor list in Section 6 of the Privacy Policy. Where a transfer
              is subject to the UK GDPR, the UK International Data Transfer Addendum
              to the SCCs issued by the UK Information Commissioner applies and is
              incorporated, completed by Annex A, with the law and courts of England
              and Wales. Where the Swiss Federal Act on Data Protection applies, the
              SCCs apply with the adaptations that Swiss law requires. If the SCCs or
              the UK Addendum conflict with these Terms, they prevail as to the
              transfer. Nothing in these Terms limits an individual&apos;s rights
              under the SCCs or Quoin&apos;s liability to individuals under them.
            </p>
            <p>
              <strong>17.7 DPDP Act.</strong> Quoin will meet the obligations that the
              DPDP Act places on a Data Processor, as in force from time to time, and
              will follow any restrictions on cross-border transfers that the
              Government of India notifies under it.
            </p>
            <p>
              <strong>17.8 Client credentials.</strong> Quoin stores credentials and
              API keys that the Client supplies in encrypted form, limits access to
              those who need it, uses them only for the contracted scope, and removes them from active systems when no longer required for the contracted scope, and in any event within thirty (30) days after acceptance under Section 14.4 (backups are overwritten in the normal cycle), or immediately on the Client&apos;s written request. The Client should
              supply dedicated, revocable, least-privilege credentials and rotate them
              after the project.
            </p>
            <p>
              <strong>17.9 AI Service Providers.</strong> Where the Services use
              third-party AI or machine-learning providers, Quoin will use
              commercially available business or API offerings that, based on the
              applicable provider&apos;s published terms and configuration
              selected by Quoin, are intended to limit use of Client Materials and Client Personal Data for
              model training. The specific provider, applicable terms, retention
              practices and processing configuration may vary by Service. The
              Client acknowledges that third-party provider terms may apply. Quoin itself does not use Client Materials or Client Personal Data to train or fine-tune any model.
            </p>
            <p>
              <strong>17.10 Staging data.</strong> Temporary scraper caches, scratch datasets and delivery snapshots are retained only as long as reasonably necessary for quality inspection, delivery verification or troubleshooting, and are deleted or securely removed in any event within thirty (30) days after delivery, unless the parties agree a different period in writing or a longer period is needed to resolve a Client request or dispute.
            </p>
            <p>
              <strong>17.11 Liability.</strong> Section 23 applies to this Section 17
              to the extent Applicable Law allows.
            </p>
          </section>

          <section className="terms-section" id="terms-s18">
            <h2>18. Security</h2>
            <p>
              <strong>18.1 Safeguards.</strong> Quoin maintains reasonable
              administrative, technical and organisational safeguards that are
              appropriate to the nature of the Services and the data processed. These
              include the measures described in Section 7 of the{" "}
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>
              . Quoin may update its measures from time to time and will not materially
              reduce the protection they give.
            </p>
            <p>
              <strong>18.2 Client duties.</strong> The Client is responsible for the
              security of its own systems, accounts, devices, API keys and
              credentials, for using strong access controls, and for the access it
              grants to Quoin.
            </p>
            <p>
              <strong>18.3 No absolute security.</strong> No internet-connected system
              is completely secure. Quoin does not promise that the Services will be
              free of all security incidents.
            </p>
            <p>
              <strong>18.4 Incidents.</strong> Each party will notify the other
              promptly on discovering a security compromise that affects the
              Services. Section 17.4(g) applies to personal data breaches.
            </p>
            <p>
              <strong>18.5 Testing.</strong> The Client may not run penetration or
              vulnerability tests on Quoin&apos;s systems without Quoin&apos;s prior
              written consent.
            </p>
          </section>

          <section className="terms-section" id="terms-s19">
            <h2>19. Fees, Cancellation &amp; Refunds</h2>
            <p>
              <strong>19.1 Work Commencement.</strong> Work on a project begins on
              the earlier of (a) the date Quoin confirms project kickoff in writing,
              by email or electronic message, and (b) the date Quoin starts technical
              scoping, architectural design or code implementation (&ldquo;Work
              Commencement&rdquo;). Where the SOW divides the project into milestones,
              Work Commencement applies to each milestone separately.
            </p>
            <p>
              <strong>19.2 Cancellation before Work Commencement.</strong> The Client
              may cancel by written notice before Work Commencement. Quoin will refund
              all Fees paid, less non-recoverable payment-processor and bank charges
              and documented setup expenses that Quoin has already incurred.
            </p>
            <p>
              <strong>19.3 After Work Commencement.</strong> Once Work Commencement has
              occurred for a project, or for a milestone, the Client is not entitled to
              a refund of the Fees for it because of a change of mind, a change in need
              or commercial reprioritisation. Fees for work performed and resources
              committed are non-refundable. Fees paid for a milestone that has not yet
              reached Work Commencement are refunded if the Client terminates under
              Section 21.3, less non-recoverable charges.
            </p>
            <p>
              <strong>19.4 Delivery failure.</strong> If a Deliverable materially
              fails to meet the written specifications in the SOW, the Client must give
              written notice within the Review Period, and Quoin has at least fifteen
              (15) calendar days to investigate and correct it, as Section 14.3 states.
              If Quoin then still cannot deliver the agreed scope or materially correct
              the failure, Quoin will refund the Fees paid for the undelivered or
              unperformed portion of the project.
            </p>
            <p>
              <strong>19.5 Target Source blocking.</strong> If, before delivery, a
              Target Source&apos;s blocking, legal demand or technical barrier prevents
              Quoin from delivering the agreed scope, and the Client did not cause it,
              Quoin will either agree a revised scope with the Client or refund the
              Fees paid for the undelivered portion. After a Deliverable has been
              accepted, later changes at a Target Source are not grounds for a refund.
            </p>
            <p>
              <strong>19.6 Third-party costs and processing charges.</strong> Third-party
              costs and processing charges already incurred are non-refundable unless
              they were unused.
            </p>
            <p>
              <strong>19.7 How refunds are paid.</strong> Quoin pays an approved refund
              by the original payment method and in the original currency, normally
              within seven (7) to ten (10) Business Days of Quoin&apos;s written
              approval. Currency-conversion differences and processor fees that the
              processor does not return are borne by the Client.
            </p>
            <p>
              <strong>19.8 Payment disputes and chargebacks.</strong> If the Client
              believes a payment is wrong or a Service has not been delivered as
              agreed, it must first contact Quoin in writing so that the matter can be
              investigated. Quoin may give payment processors the Agreement, delivery
              records and correspondence to answer a chargeback. If the Client makes a
              chargeback without following this process and the chargeback is found to
              be unfounded, the Client is liable for the chargeback fees and
              Quoin&apos;s reasonable costs. Any unresolved dispute is subject to
              Section 27.
            </p>
            <p>
              <strong>19.9 Refund &amp; Cancellation Policy.</strong> The{" "}
              <a href="https://quoin.online/refund" onClick={(e) => openPage(e, "/refund")}>
                Refund &amp; Cancellation Policy
              </a>{" "}
              adds detail to this Section. If they conflict, this Section prevails.
            </p>
          </section>

          <section className="terms-section" id="terms-s20">
            <h2>20. Recurring Services &amp; Retainers</h2>
            <p>
              <strong>20.1 Billing.</strong> Recurring Services, such as SEO
              retainers or periodic scraping pipelines, are billed as the SOW
              provides. Unless the SOW says otherwise, they renew automatically each
              month.
            </p>
            <p>
              <strong>20.2 Cancellation.</strong> The Client may cancel by written
              notice (email is enough) given at least seven (7) calendar days before
              its next billing date. Cancellation takes effect at the end of the
              billing cycle already paid for. It stops future billing but does not
              entitle the Client to a refund for a cycle that has begun or for work
              already done. Outstanding invoices remain payable.
            </p>
            <p>
              <strong>20.3 Price changes.</strong> Quoin may change recurring Fees on
              thirty (30) days&apos; written notice. If the Client does not cancel
              before the new Fees take effect, the new Fees apply.
            </p>
            <p>
              <strong>20.4 Failed payments.</strong> If a recurring payment fails,
              Quoin may retry it and, after seven (7) days&apos; written notice, suspend
              the Service until payment is made.
            </p>
            <p>
              <strong>20.5 Scope.</strong> A retainer covers only the work that the SOW
              lists. Unused allowances do not roll over unless the SOW says so.
            </p>
            <p>
              <strong>20.6 Discontinuation.</strong> Quoin may discontinue a recurring
              Service on thirty (30) days&apos; written notice and will refund prepaid
              Fees for the period after the Service ends.
            </p>
          </section>

          <section className="terms-section" id="terms-s21">
            <h2>21. Suspension &amp; Termination</h2>
            <p>
              <strong>21.1 Suspension.</strong> Quoin may suspend the Services (a) if
              an undisputed invoice remains unpaid seven (7) days after Quoin gives
              written notice, and (b) immediately if an event in Section 21.2(c) to (g)
              occurs. Suspension does not stop Fees from accruing for work already done.
            </p>
            <p>
              <strong>21.2 Termination by Quoin.</strong> Quoin may terminate an SOW
              or the Agreement by written notice if: (a) an undisputed invoice remains
              unpaid seven (7) days after written notice; (b) the Client commits a
              material breach that it does not cure within fifteen (15) days of written
              notice, or that cannot be cured; (c) the Client uses the Services for
              unlawful purposes, unauthorised access or infringement, or breaches
              Section 9; (d) the Client creates a security risk or platform abuse; (e)
              the Client or its owners become subject to sanctions, or the Client
              becomes insolvent; (f) a demand under Section 10.5 makes the Service
              unlawful or unviable; or (g) the project has been dormant for thirty (30)
              days under Section 8.5.
            </p>
            <p>
              <strong>21.3 Termination by the Client for convenience.</strong> The
              Client may terminate an SOW at any time by written notice. The Client pays
              Fees for work performed up to the termination date, and for
              non-cancellable third-party commitments made for the project. Section 19
              determines any refund.
            </p>
            <p>
              <strong>21.4 Termination by the Client for Quoin&apos;s breach.</strong>{" "}
              The Client may terminate an SOW if Quoin commits a material breach that it
              does not cure within thirty (30) days of the Client&apos;s written notice
              describing it. Quoin will then refund Fees paid for the unperformed
              portion, as Section 19.4 provides.
            </p>
            <p>
              <strong>21.5 Effect of termination.</strong> Termination does not affect
              accrued rights or Fees due for work performed. On termination: Quoin will
              deliver completed work on payment of all Fees due; licences under
              Section 15 take effect only for Deliverables paid for in full; each party
              will return or delete the other&apos;s Confidential Information under
              Sections 16 and 17; and Section 29.7 (survival) applies.
            </p>
          </section>

          <section className="terms-section" id="terms-s22">
            <h2>22. Warranties &amp; Disclaimers</h2>
            <p>
              <strong>22.1 Service warranty.</strong> Quoin warrants that it will
              perform the Services with reasonable skill and care, in line with
              generally accepted professional standards, and materially in line with
              the SOW.
            </p>
            <p>
              <strong>22.2 Remedy.</strong> If Quoin breaches Section 22.1, the
              Client&apos;s sole and exclusive remedy is for Quoin to correct or
              re-perform the work as Section 14.3 provides and, if Quoin cannot, the
              refund in Section 19.4.
            </p>
            <p>
              <strong>22.3 Exclusions.</strong> The warranty does not cover problems
              caused by Client Materials or instructions, changes made by the Client
              or others, Third-Party Services, changes at a Target Source after
              delivery, misuse, or the inherent nature of AI outputs.
            </p>
            <p>
              <strong>22.4 Disclaimer.</strong> Except as Section 22.1 or a signed SOW
              expressly states, the Services, Deliverables, datasets, scrapers, code
              and AI solutions are provided &ldquo;AS IS&rdquo; and &ldquo;AS
              AVAILABLE&rdquo;, without warranties of any kind, whether express,
              statutory or implied, including warranties of merchantability, fitness
              for a particular purpose, non-infringement, accuracy, uninterrupted
              operation and error-free performance.
            </p>
            <p>
              <strong>22.5 No guarantee of results.</strong> Quoin does not guarantee
              any financial outcome, revenue, profit, traffic, lead volume,
              conversion, search ranking, AI-search visibility, cost saving, business
              growth or return on investment. Case studies, examples and estimates are
              illustrative.
            </p>
            <p>
              <strong>22.6 Mutual warranty.</strong> Each party warrants that it has the
              power and authority to enter into and perform the Agreement.
            </p>
          </section>

          <section className="terms-section" id="terms-s23">
            <h2>23. Limitation of Liability</h2>
            <p>
              <strong>23.1 Indirect loss.</strong> To the maximum extent Applicable
              Law allows, neither party is liable to the other for indirect,
              incidental, special, consequential, exemplary or punitive damages, or
              for loss of profit, revenue, business, goodwill, anticipated savings or
              data, however caused and even if advised of the possibility. This does
              not limit the Client&apos;s obligation to pay Fees.
            </p>
            <p>
              <strong>23.2 Cap.</strong> To the maximum extent Applicable Law allows,
              Quoin&apos;s total liability for all claims arising out of or related to
              an SOW, whether in contract, tort (including negligence), breach of
              statutory duty, indemnity or otherwise, will not exceed the Fees the
              Client actually paid to Quoin under that SOW. For recurring Services,
              the cap is the Fees actually paid in the twelve (12) months before the
              event that gave rise to liability. Several claims do not increase the
              cap.
            </p>
            <p>
              <strong>23.3 What the limits do not cover.</strong> Nothing in the
              Agreement excludes or limits liability for (a) fraud or fraudulent
              misrepresentation; (b) wilful misconduct; (c) death or personal injury
              caused by negligence; or (d) any liability that cannot be excluded or
              limited by law. The cap does not limit the Client&apos;s obligation to
              pay Fees, the Client&apos;s indemnity under Section 24, or the
              Client&apos;s liability for breach of Section 9 or for misuse of
              Pre-Existing IP.
            </p>
            <p>
              <strong>23.4 Client-caused loss.</strong> Quoin is not liable for loss
              that results from Client Materials or instructions, the Client not
              following Quoin&apos;s recommendations, Third-Party Services, actions of
              a Target Source, or the Client&apos;s use of a Deliverable in breach of
              the Agreement.
            </p>
            <p>
              <strong>23.5 Who is protected.</strong> The limits in this Section also
              protect Quoin&apos;s proprietor, personnel, contractors and
              subcontractors, and Quoin may enforce them on their behalf.
            </p>
            <p>
              <strong>23.6 Data protection.</strong> This Section applies to liability
              under Section 17 as between the parties to the extent Applicable Law
              allows, and does not limit any liability to individuals under the SCCs.
            </p>
            <p>
              <strong>23.7 Allocation of risk.</strong> The parties agree that these
              limits are a fair allocation of risk, that the Fees reflect it, and that
              each party will take reasonable steps to reduce its losses.
            </p>
          </section>

          <section className="terms-section" id="terms-s24">
            <h2>24. Client Indemnification</h2>
            <p>
              <strong>24.1 Client Indemnification.</strong> The Client will defend, indemnify and hold harmless Quoin, its proprietor, personnel and subcontractors from third-party claims (including claims and regulatory actions by Target Sources, platforms and individuals), and resulting losses, damages, liabilities, fines and penalties (where lawful to indemnify) and reasonable legal costs, arising from: (a) Client Materials; (b) the
              Client&apos;s instructions, credentials or access permissions; (c)
              websites, systems, datasets or targets selected by the Client; (d) the
              Client&apos;s unlawful use of the Services; or (e) the Client&apos;s
              violation of applicable law or third-party rights.
            </p>
            <p>
              <strong>24.2 Exclusions.</strong> The Client has no indemnification obligation to the extent a court or arbitral tribunal finally determines that the claim resulted from Quoin&apos;s fraud or wilful misconduct.
            </p>
            <p>
              <strong>24.3 Indemnification Procedures.</strong> Quoin will give the
              Client prompt written notice of a claim (delay relieves the Client only
              to the extent it is prejudiced), let the Client control the defence
              with counsel reasonably acceptable to Quoin, and cooperate at the
              Client&apos;s expense. The Client will not settle a claim in a way that
              imposes liability or an admission on Quoin without Quoin&apos;s consent.
              Quoin may take part with its own counsel at its own cost, and may take
              over the defence if the Client fails to conduct it.
            </p>
          </section>

          <section className="terms-section" id="terms-s25">
            <h2>25. Sanctions, Export Controls &amp; Anti-Bribery</h2>
            <p>
              <strong>25.1 Sanctions.</strong> The Client represents and warrants that
              neither it nor its affiliates, directors, officers or beneficial owners
              appear on any sanctions or designated-persons list of the US Office of
              Foreign Assets Control, the United Nations Security Council, the
              European Union, the United Kingdom or the Government of India, and that
              it will tell Quoin at once if that changes.
            </p>
            <p>
              <strong>25.2 Export controls and misuse.</strong> The Client will not
              access, export or use the Services in breach of export-control or
              sanctions law, and will not use them for military, cyber-weapon or
              unlawful surveillance purposes.
            </p>
            <p>
              <strong>25.3 Anti-bribery.</strong> Each party will comply with
              applicable anti-bribery and anti-corruption laws, including the US
              Foreign Corrupt Practices Act, the UK Bribery Act 2010 and India&apos;s
              Prevention of Corruption Act, 1988, and will not offer or accept
              improper payments.
            </p>
            <p>
              <strong>25.4 Verification and consequences.</strong> Quoin may ask the
              Client for reasonable business-verification information before or during
              an engagement. Quoin need not perform any obligation that would breach
              Applicable Law, and may terminate immediately without liability if the
              Client breaches this Section.
            </p>
          </section>

          <section className="terms-section" id="terms-s26">
            <h2>26. Force Majeure</h2>
            <p>
              Neither party is liable for delay or failure to perform caused by events
              beyond its reasonable control, including natural disaster, war, civil
              unrest, government action, labour disputes, widespread power or internet
              outages, upstream cloud or API failures, and major cyber incidents. The
              affected party will give prompt notice and use reasonable efforts to
              resume performance.
            </p>
            <p>
              This Section does not excuse payment of Fees for work already performed.
              If an event lasts more than thirty (30) days, either party may terminate
              the affected Services by written notice. The Client then pays for work
              performed, and Quoin refunds prepaid Fees for the unperformed portion.
            </p>
          </section>

          <section className="terms-section" id="terms-s27">
            <h2>27. Governing Law &amp; Dispute Resolution</h2>
            <p>
              <strong>27.1 Governing Law.</strong> These Terms, and any dispute or claim arising out of or in connection with them or the Services (including non-contractual claims), are governed by the laws of India, without regard to conflict-of-laws rules.
            </p>
            <p>
              <strong>27.2 Negotiation.</strong> The parties will first attempt in
              good faith to resolve any dispute through written negotiations for at
              least fifteen (15) calendar days after written notice of dispute is
              received.
            </p>
            <p>
              <strong>27.3 Arbitration.</strong> If the dispute is not resolved through negotiation, it will be finally resolved by arbitration administered by the Mumbai Centre for International Arbitration (MCIA) under the MCIA Arbitration Rules in force on the date of the notice of dispute. The tribunal will consist of one (1) arbitrator. The seat and legal place of arbitration will be Mumbai, India. The language of arbitration will be English. The award is final and binding.
            </p>
            <p>
              <strong>27.4 Courts.</strong> Courts having jurisdiction over the seat of arbitration may be approached for interim relief, enforcement or other matters permitted by applicable law. Either party may also (a) seek an urgent injunction to protect Confidential Information or intellectual property from any court of competent jurisdiction, and (b) sue to recover an undisputed sum of money in the courts at Gautam Buddha Nagar, Uttar Pradesh, which have non-exclusive jurisdiction over such claims.
            </p>
            <p>
              <strong>27.5 Continued Performance.</strong> While a dispute is
              pending, each party will keep performing its obligations that are not in
              dispute.
            </p>
          </section>

          <section className="terms-section" id="terms-s28">
            <h2>28. Notices</h2>
            <p>
              <strong>28.1 Form.</strong> A formal notice under the Agreement must be
              in writing and sent by email. Notices to Quoin go to{" "}
              <a href="mailto:legal@quoin.online">legal@quoin.online</a>. Notices to the
              Client go to the email address in the SOW or invoice, or the
              Client&apos;s last known email address. Putting &ldquo;Notice under the
              Terms&rdquo; in the subject line is recommended.
            </p>
            <p>
              <strong>28.2 Delivery.</strong> A notice is treated as delivered at
              10:00 India Standard Time on the next Business Day after it is sent, if
              the sender receives no bounce-back or delivery-failure message.
            </p>
            <p>
              <strong>28.3 Change of address.</strong> A party may change its notice
              address by notice to the other.
            </p>
            <p>
              <strong>28.4 Operational messages.</strong> Day-to-day support, scoping
              and project messages may be sent to{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a> and are not formal
              notices.
            </p>
          </section>

          <section className="terms-section" id="terms-s29">
            <h2>29. General Provisions</h2>
            <p>
              <strong>29.1 Subcontractors.</strong> Quoin may use qualified
              independent contractors, developers and sub-processors to provide the
              Services. Quoin remains responsible for their work and binds them in writing to confidentiality and data protection duties appropriate to the work they do.
            </p>
            <p>
              <strong>29.2 Assignment.</strong> The Client may not assign or transfer
              the Agreement without Quoin&apos;s prior written consent. Quoin may
              assign or transfer it to a successor to its business, including on
              incorporation as a limited liability partnership or private limited
              company, and will give the Client notice. The Agreement binds and benefits
              successors and permitted assigns.
            </p>
            <p>
              <strong>29.3 Independent contractors.</strong> The parties are
              independent contractors. Nothing creates an employment, partnership,
              joint venture, agency or fiduciary relationship.
            </p>
            <p>
              <strong>29.4 No third-party rights.</strong> Only the parties, and those
              protected by Sections 23.5 and 24, may rely on the Agreement.
            </p>
            <p>
              <strong>29.5 Waiver.</strong> A delay or failure to exercise a right is
              not a waiver of it. A waiver is effective only if written.
            </p>
            <p>
              <strong>29.6 Severability.</strong> If a provision is invalid or
              unenforceable, it will be enforced to the maximum extent permitted and the
              rest of the Agreement stays in force.
            </p>
            <p>
              <strong>29.7 Survival.</strong> Section 6 (as to Fees due), Sections
              10.5 to 10.8, 15, 16, 17 (while Quoin holds Client Personal Data), 19,
              21.5, 22, 23, 24, 27 and 29, and any other provision that by its nature
              should survive, survive termination or expiry.
            </p>
            <p>
              <strong>29.8 Entire agreement.</strong> The Agreement is the whole
              agreement between the parties on its subject matter and replaces all
              earlier discussions, proposals and understandings. Each party confirms
              that it has not relied on any statement that the Agreement does not
              contain, but this does not limit liability for fraud.
            </p>
            <p>
              <strong>29.9 Electronic signature and counterparts.</strong> The Agreement
              and any SOW may be signed or accepted electronically and in counterparts.
            </p>
            <p>
              <strong>29.10 Language.</strong> English is the governing language. A
              translation is for convenience only.
            </p>
          </section>

          <section className="terms-section" id="terms-s30">
            <h2>30. Website Use</h2>
            <p>
              <strong>30.1 Permitted use.</strong> You may browse the Quoin website
              and submit enquiries for lawful business purposes. You must not scrape,
              copy or republish it at scale without permission, interfere with its
              operation, try to gain unauthorised access, or use it to break the law.
            </p>
            <p>
              <strong>30.2 Content.</strong> The website&apos;s text, design, code
              and branding belong to Quoin or its licensors. Content is general
              information, is provided as is, and is not legal, financial or
              professional advice.
            </p>
            <p>
              <strong>30.3 Enquiries.</strong> An enquiry, quotation request or call
              does not create a contract. A contract arises only under Section 1. Please
              do not send confidential business information or personal data through
              contact forms before an agreement or confidentiality undertaking is in
              place.
            </p>
            <p>
              <strong>30.4 Availability and links.</strong> Quoin does not promise
              that the website will be uninterrupted or error-free. Links to third-party
              sites are provided for convenience, and Quoin is not responsible for
              them.
            </p>
          </section>

          <section className="terms-section" id="terms-s31">
            <h2>31. Changes to These Terms</h2>
            <p>
              Quoin may update these Terms from time to time. The updated version will
              be published on the website with a new &ldquo;Last Updated&rdquo; date
              and version number shown in the page header.
            </p>
            <p>
              A change applies to new SOWs, renewals and new Services from the date it
              is published. An SOW already accepted stays under its Applicable Version.
              For recurring Services, Quoin will give the Client at least thirty (30)
              days&apos; notice by email of any material change, and the Client may
              cancel under Section 20 before it takes effect. A change that Applicable
              Law requires may apply immediately. Continuing to use the website after an
              update constitutes acceptance of the updated Section 30 only.
            </p>
          </section>

          <section className="terms-section" id="terms-s32">
            <h2>32. Entity Identification, Contact &amp; Grievance Redressal</h2>
            <p>
              <strong>Brand and trade name:</strong> Quoin
            </p>
            <p>
              <strong>Proprietor and legal operator:</strong> Suryash Rathore, operating
              as a sole proprietor under the laws of the Republic of India
            </p>
            <p>
              <strong>Operating office:</strong> Delta II, Greater Noida, Gautam Buddha
              Nagar, Uttar Pradesh &ndash; 201308, India
            </p>
            <p>
              <strong>Website:</strong> quoin.online
            </p>
            <p>
              <strong>Legal and contractual notices:</strong>{" "}
              <a href="mailto:legal@quoin.online">legal@quoin.online</a>
            </p>
            <p>
              <strong>General client support:</strong>{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a>
            </p>
            <p>
              <strong>Grievance Officer:</strong> Suryash Rathore,{" "}
              <a href="mailto:grievance@quoin.online">grievance@quoin.online</a>
            </p>
            <p>
              <em>
                Grievances sent to the Grievance Officer will be acknowledged promptly and resolved within thirty (30) calendar days, or any shorter period that applicable Indian law requires. Requests to exercise data rights are handled under the{" "}
                <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                  Privacy Policy
                </a>
                .
              </em>
            </p>
          </section>

          <section className="terms-section terms-acceptance-block">
            <h2>Acceptance</h2>
            <p>
              These Terms become binding only as described in Section 1.1. Browsing or
              accessing the website alone does not constitute acceptance of these
              commercial Terms. By accepting a quotation or SOW, or making a payment after being provided these Terms, you confirm that you have read, understood and agree to be bound by these Terms.
            </p>
            <div className="terms-meta-signoff">
              <p>
                <strong>Quoin</strong>
                <br />
                Operated by Suryash Rathore (Sole Proprietorship)
                <br />
                Location: Greater Noida, Uttar Pradesh, India
                <br />
                Notices: legal@quoin.online &nbsp;·&nbsp; Support: contact@quoin.online
              </p>
            </div>
          </section>

          <section className="terms-section" id="terms-annex-a">
            <h2>Annex A: Data Processing Particulars</h2>
            <p>
              This Annex describes the processing of Client Personal Data under Section
              17. It is Annex I to the Standard Contractual Clauses (SCCs). The SOW may
              add detail.
            </p>
            <div className="terms-subprocessor-table-wrap">
              <table className="terms-table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Item</th>
                    <th>Particulars</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Data exporter</strong></td>
                    <td>The Client, as identified in the SOW (controller / Data Fiduciary)</td>
                  </tr>
                  <tr>
                    <td><strong>Data importer</strong></td>
                    <td>
                      Suryash Rathore trading as Quoin, Delta II, Greater Noida, Uttar
                      Pradesh &ndash; 201308, India (processor / Data Processor).
                      Contact:{" "}
                      <a href="mailto:grievance@quoin.online">grievance@quoin.online</a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Subject matter</strong></td>
                    <td>Provision of the Services described in the SOW</td>
                  </tr>
                  <tr>
                    <td><strong>Duration</strong></td>
                    <td>The term of the SOW, plus the retention periods in Section 17</td>
                  </tr>
                  <tr>
                    <td><strong>Nature and purpose</strong></td>
                    <td>
                      Collecting, storing, structuring, indexing, transforming,
                      analysing and delivering data, and configuring and running AI
                      retrieval systems, solely to provide the Services
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Types of personal data</strong></td>
                    <td>
                      Only the types the SOW specifies. Without a specification, none
                      beyond incidental business contact details (such as names and
                      business email addresses) found in Client Materials or collected
                      sources
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Categories of individuals</strong></td>
                    <td>
                      As the SOW specifies, for example the Client&apos;s staff,
                      customers, prospects or people named in public sources
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Special categories and children&apos;s data</strong></td>
                    <td>Not processed unless the SOW expressly says so</td>
                  </tr>
                  <tr>
                    <td><strong>Frequency</strong></td>
                    <td>Continuous or one-off, as the SOW specifies</td>
                  </tr>
                  <tr>
                    <td><strong>Retention</strong></td>
                    <td>
                      Credentials, staging data and other Client Personal Data are removed or returned within thirty (30) days after the Services end or acceptance under Section 14.4, or earlier on written request, as Section 17 provides.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Sub-processors</strong></td>
                    <td>
                      Listed in Section 6 of the{" "}
                      <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                        Privacy Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Technical and organisational measures</strong></td>
                    <td>
                      Section 18 and Section 7 of the{" "}
                      <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                        Privacy Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Competent supervisory authority (SCC Clause 13)</strong></td>
                    <td>The authority of the Client&apos;s establishment</td>
                  </tr>
                  <tr>
                    <td><strong>SCC and UK Addendum elections</strong></td>
                    <td>As stated in Section 17.6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="terms-footer">
            <div className="footer-left">
              <span className="footer-copyright">
                &copy; 2026 Quoin. All rights reserved.
              </span>
            </div>
            <div className="footer-legal">
              <a href="https://quoin.online/terms" onClick={(e) => openPage(e, "/terms")}>
                Terms &amp; Conditions
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a href="https://quoin.online/privacy" onClick={(e) => openPage(e, "/privacy")}>
                Privacy Policy
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a href="https://quoin.online/refund" onClick={(e) => openPage(e, "/refund")}>
                Refund Policy
              </a>
            </div>
            <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
              Return to home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ==========================================================================
   PRIVACY POLICY PAGE
   ========================================================================== */

export function PrivacyPage({ navigate }: { navigate: Navigate }) {
  const [leaving, setLeaving] = useState(false)

  function openPage(event: ReactMouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(path)
    }, 420)
  }

  return (
    <div className={`site-shell terms-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quoin home"
          onClick={(e) => openPage(e, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">Legal / Privacy</span>
        <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
          Back to home
        </a>
      </header>
      <main className="terms-page">
        <div className="section-meta">
          <span>02 — Legal</span>
          <span>Last Updated: Oct 13, 2026 · Version 1.0</span>
        </div>
        <div className="terms-heading">
          <p className="eyebrow">Quoin / Privacy</p>
          <h1>
            Privacy
            <br />
            policy.
          </h1>
        </div>

        <LegalNavTabs current="privacy" onNavigate={openPage} />

        <div className="terms-content">
          <div className="terms-intro-box">
            <p className="terms-date-tag">
              <strong>Quoin</strong> &nbsp;·&nbsp;{" "}
              <strong>Last Updated:</strong> Oct 13, 2026 &nbsp;·&nbsp;{" "}
              <strong>Version:</strong> 1.0
            </p>
            <h2>About This Policy</h2>
            <p>
              This Privacy Policy explains how Quoin, a sole proprietorship
              operated by Suryash Rathore in Greater Noida, India, collects, uses,
              shares and protects personal data. It applies to visitors to
              quoin.online, prospects, newsletter subscribers and the business
              contacts of our clients, and it explains how we handle personal data
              that we process for clients.
            </p>
            <p>
              Read it together with our{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms &amp; Conditions
              </a>
              , published on a separate page, which contain the data processing
              terms for client projects (Section 17 and Annex A of the Terms).
              Capitalised terms that this Policy does not define have the
              meanings given in the Terms. We do not sell personal data, and we do
              not use it for advertising.
            </p>
          </div>

          <section className="terms-section" id="privacy-s1">
            <h2>1. Roles: Data Fiduciary &amp; Data Processor</h2>
            <p>
              Under data protection laws, including the Digital Personal Data
              Protection Act, 2023 and applicable rules, as in force from time to
              time (&ldquo;DPDP Act&rdquo;), and the General Data Protection
              Regulation (&ldquo;GDPR&rdquo;), Quoin&apos;s legal role depends on
              the context.
            </p>
            <ul>
              <li>
                <strong>Quoin as Data Fiduciary / Controller:</strong> For
                personal data that website visitors, prospects and newsletter
                subscribers give us directly (such as names, business email
                addresses, billing details and contact form submissions), Quoin
                decides why and how the data is processed and acts as the Data
                Fiduciary or Data Controller.
              </li>
              <li>
                <strong>Quoin as Data Processor:</strong> Where Quoin processes
                personal data on behalf of a Client and strictly on the
                Client&apos;s documented instructions (for example in custom
                software development, client knowledge indexing or contracted data
                engineering), the Client is the Data Fiduciary or Controller and
                Quoin is its Data Processor, to the extent applicable under law.
                The Client&apos;s own privacy notice governs the Client&apos;s
                relationship with those individuals. The data processing terms
                between Quoin and the Client are in Section 17 and Annex A of our{" "}
                <a
                  href="https://quoin.online/terms"
                  onClick={(e) => openPage(e, "/terms")}
                >
                  Terms &amp; Conditions
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="terms-section" id="privacy-s2">
            <h2>2. Information We Collect &amp; Credential Security</h2>
            <p>
              We collect information that you give us directly when you engage with
              Quoin:
            </p>
            <ul>
              <li>
                <strong>Contact &amp; identification data:</strong> full name,
                business email address, phone number, company name, website URL
                and job title.
              </li>
              <li>
                <strong>Project briefs &amp; technical assets:</strong> technical
                specifications, sample datasets, target endpoints, project
                documentation and source files provided for project execution.
              </li>
              <li>
                <strong>Client credentials &amp; API keys:</strong> where a
                project needs access to client infrastructure, databases or API
                endpoints, credentials, API keys, access tokens or similar
                authentication information that the Client provides are stored in
                encrypted form within access-controlled configuration systems,
                accessed on a need-to-know basis, used only for the contracted
                scope, and removed from our active systems when no longer needed,
                and in any event within thirty (30) days after project acceptance
                (backups are overwritten in the normal cycle), or on the
                Client&apos;s written request.
              </li>
              <li>
                <strong>Billing &amp; transaction details:</strong> invoicing
                records, payment receipts and billing addresses. Payment card
                data is processed directly by PCI-compliant third-party gateways
                (UPI, Razorpay, PayPal) and is never handled or stored on our
                servers.
              </li>
              <li>
                <strong>Technical &amp; log data:</strong> browser type, IP
                address, operating system and essential interaction data collected
                automatically to diagnose server errors, preserve security and
                keep the site responsive.
              </li>
            </ul>
            <p>
              We do not ask for payment card numbers, passwords, government
              identity numbers or health information through our website or contact
              forms. Please do not send them.
            </p>
          </section>

          <section className="terms-section" id="privacy-s3">
            <h2>3. How We Use Your Information &amp; Lawful Bases</h2>
            <p>
              We process personal data only for the purposes below, each supported
              by a lawful basis:
            </p>
            <ul>
              <li>
                <strong>Service delivery (contractual necessity):</strong>{" "}
                carrying out contracted services (web scraping and data
                extraction, internal knowledge assistants, SEO and search
                intelligence, AI automation), preparing proposals, and providing
                technical support.
              </li>
              <li>
                <strong>Billing and legal compliance (legal obligation):</strong>{" "}
                issuing invoices, keeping accounting records, meeting tax
                obligations under Indian law, and enforcing our Terms.
              </li>
              <li>
                <strong>Infrastructure protection (legitimate interests):</strong>{" "}
                protecting our systems from denial-of-service attacks, credential
                abuse, fraud and unlawful activity.
              </li>
              <li>
                <strong>Marketing communications (consent):</strong> sending our
                newsletter, engineering insights or service updates only where you
                have opted in through our website form. Every marketing email
                contains an unsubscribe link, and you can withdraw consent at any
                time.
              </li>
            </ul>
            <p>
              Under the DPDP Act, we rely on your consent or on a &ldquo;legitimate
              use&rdquo; that the Act recognises, such as data you voluntarily give
              us to receive a quotation or a service, or processing needed to meet
              a legal obligation.
            </p>
            <p>
              We do not sell personal data. We do not use it for advertising, and
              we do not make decisions about individuals by solely automated means
              that have legal or similarly significant effects.
            </p>
          </section>

          <section className="terms-section" id="privacy-s4">
            <h2>4. AI &amp; Internal Knowledge Assistant Systems</h2>
            <p>
              For projects that involve internal knowledge assistants and
              AI-powered retrieval systems:
            </p>
            <ul>
              <li>
                Client proprietary documents, internal knowledge bases and source
                materials are used only to configure, index and ground the
                Client&apos;s dedicated retrieval system.
              </li>
              <li>
                <strong>Model training:</strong> Where Quoin uses third-party AI
                APIs (such as the Google Cloud Gemini API, OpenAI or Anthropic), it
                uses commercially available business or API offerings that, under
                the provider&apos;s published terms and the configuration Quoin
                selects, are intended to limit use of Client Materials and Client
                Personal Data for model training. Quoin itself does not use Client
                Materials or Client Personal Data to train or fine-tune any
                model. Providers may keep inputs and outputs for a limited period
                for safety and abuse monitoring under their terms.
              </li>
              <li>
                Assistant index stores and query logs remain confidential and
                accessible only within the Client&apos;s authorised administrative
                boundaries.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="privacy-s5">
            <h2>5. Web Scraping &amp; Handling of Personal Data</h2>
            <p>When we provide web scraping and data extraction services:</p>
            <ul>
              <li>
                Quoin collects publicly accessible information unless the Client
                expressly authorises otherwise in a signed Statement of Work and
                the law allows it.
              </li>
              <li>
                <strong>No unagreed personal data collection:</strong> Quoin does
                not configure scrapers to collect personal data unless the
                Statement of Work expressly authorises it and confirms the
                Client&apos;s lawful basis. In that case the processing is
                governed by Section 17 of our{" "}
                <a
                  href="https://quoin.online/terms"
                  onClick={(e) => openPage(e, "/terms")}
                >
                  Terms &amp; Conditions
                </a>{" "}
                and this Policy.
              </li>
              <li>
                <strong>Incidental personal data:</strong> if personal data is
                encountered by accident during extraction, Quoin processes it only
                as a Data Processor on the Client&apos;s documented instructions.
                Quoin will suspend collection, quarantine or delete it if the
                Client instructs or if Quoin determines that the collection is
                unlawful or unauthorised.
              </li>
              <li>
                Extracted datasets are stored securely and delivered directly to
                the Client in the agreed format.
              </li>
              <li>
                Temporary staging data, such as scratch extractions and
                intermediate files, is deleted when no longer reasonably needed,
                and in any event within thirty (30) days after delivery.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="privacy-s6">
            <h2>6. Sub-Processors, Payment Providers &amp; Other Recipients</h2>
            <p>
              <strong>Technical sub-processors.</strong> To provide our hosting,
              email, cloud compute and AI infrastructure, Quoin engages these
              third-party sub-processors:
            </p>
            <div className="terms-subprocessor-table-wrap">
              <table className="terms-table">
                <thead>
                  <tr>
                    <th style={{ width: "24%" }}>Sub-processor</th>
                    <th style={{ width: "40%" }}>Service provided</th>
                    <th>Processing location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Vercel Inc.</strong>
                    </td>
                    <td>
                      Website hosting, serverless compute and edge delivery
                    </td>
                    <td>United States / global edge</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Supabase Inc.</strong>
                    </td>
                    <td>Managed database infrastructure and storage</td>
                    <td>
                      AWS Mumbai (ap-south-1), India / AWS us-east-1, United States
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Cloudflare Inc.</strong>
                    </td>
                    <td>
                      DNS management and email forwarding for our business
                      addresses
                    </td>
                    <td>Global network</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google LLC (Google Cloud and Gmail)</strong>
                    </td>
                    <td>
                      AI model completions (Gemini API), cloud computing and
                      email hosting
                    </td>
                    <td>United States / global</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>OpenAI LLC</strong>
                    </td>
                    <td>AI model API inference and embeddings</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Anthropic PBC</strong>
                    </td>
                    <td>AI model API inference</td>
                    <td>United States</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Commitments.</strong> Quoin engages technical
              sub-processors under written data processing terms that meet the
              requirements of GDPR Article 28 and other applicable law and, where
              a transfer needs them, incorporate Standard Contractual Clauses.
              Quoin will give Clients at least fourteen (14) days&apos; prior
              notice of any new or replacement sub-processor, by email or a
              notice on this page, and Clients may object on reasonable data
              protection grounds as Section 17.5 of our{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms &amp; Conditions
              </a>{" "}
              provides. This list was last updated on 13 October 2026.
            </p>
            <p>
              <strong>
                Payment providers and banking rails (independent controllers).
              </strong>{" "}
              Payment gateways and rails, including Razorpay Software Pvt. Ltd.,
              PayPal and Unified Payments Interface (UPI) banking networks,
              process payment information, cardholder verification and
              settlement as independent controllers. They operate under banking
              regulation, Reserve Bank of India rules and PCI-DSS rather than
              under our instructions, so they are not our sub-processors. Their
              handling of financial data is governed by their own privacy
              policies and legal duties. Quoin never collects or stores raw card
              numbers or banking PINs.
            </p>
            <p>
              <strong>Other recipients.</strong> We may also share personal data
              with our professional advisers (for example accountants and lawyers)
              under confidentiality duties; with courts, regulators and
              law-enforcement authorities where the law requires; and with a
              successor, if our business is transferred, on terms that protect the
              data. We do not sell personal data.
            </p>
          </section>

          <section className="terms-section" id="privacy-s7">
            <h2>7. Technical &amp; Organizational Security Measures</h2>
            <p>
              Quoin maintains reasonable administrative, physical and technical
              measures designed to protect personal data and client data against
              accidental loss, unauthorised access, destruction and disclosure:
            </p>
            <ul>
              <li>
                <strong>Transmission security:</strong> TLS 1.2 or higher
                (HTTPS) for data sent through our website and APIs.
              </li>
              <li>
                <strong>Access controls:</strong> administrative and deployment
                accounts are protected by multi-factor authentication. Access to
                project data is limited to what each project needs.
              </li>
              <li>
                <strong>Credentials and secrets:</strong> credentials, API keys
                and secrets are stored in encrypted form, kept out of code
                repositories, and used only for the contracted scope.
              </li>
              <li>
                <strong>Credential lifecycle:</strong> client-provided
                credentials, API keys and access tokens are removed from our
                active systems when no longer needed, and in any event within
                thirty (30) days after project acceptance.
              </li>
              <li>
                <strong>Protective measures:</strong> reasonable measures
                designed to protect systems against abuse, unauthorised access
                and automated spam.
              </li>
              <li>
                <strong>Confidentiality obligations:</strong> any contractor or
                assistant who may have access to personal data is bound by
                appropriate confidentiality obligations.
              </li>
            </ul>
            <p>
              No method of transmission over the internet or method of electronic
              storage is completely secure. While Quoin implements reasonable
              safeguards, Quoin cannot guarantee absolute security or total
              protection against breaches. Clients are also responsible for
              maintaining the security of credentials and systems within their
              control.
            </p>
          </section>

          <section className="terms-section" id="privacy-s8">
            <h2>8. Personal Data Breach Notification</h2>
            <p>If a personal data breach affects Client Personal Data:</p>
            <ul>
              <li>
                <strong>Notification window:</strong> Quoin will notify affected
                Clients in writing without undue delay after becoming aware of the
                breach.
              </li>
              <li>
                <strong>Content of the notice:</strong> (a) the nature and scope of
                the breach; (b) the categories of individuals and personal data
                affected; (c) the measures taken or planned; and (d) contact
                details for further enquiries. Where some of this is not yet
                known, Quoin will provide it as it becomes available.
              </li>
            </ul>
            <p>
              If a breach affects personal data for which Quoin is the Data
              Fiduciary or Controller, Quoin will notify the Data Protection
              Board of India and each affected individual as required under
              Section 8(6) of the DPDP Act, and will notify other supervisory
              authorities and individuals as applicable law requires.
            </p>
          </section>

          <section className="terms-section" id="privacy-s9">
            <h2>9. Data Retention Schedules</h2>
            <p>
              We keep personal data and business records only as long as the
              schedule below or the law requires:
            </p>
            <ul>
              <li>
                <strong>Invoices, billing records and tax filings:</strong> at
                least seven (7) years, as applicable Indian tax and GST laws
                require.
              </li>
              <li>
                <strong>
                  Enquiries, consultations and sales communications:
                </strong>{" "}
                twenty-four (24) months, for correspondence, audit trail and
                follow-up.
              </li>
              <li>
                <strong>Newsletter subscriptions:</strong> until you unsubscribe
                or withdraw consent, after which we keep only a record that you
                opted out.
              </li>
              <li>
                <strong>Website technical and log data:</strong> only as long as
                needed for security and diagnostics, and generally not more than
                ninety (90) days.
              </li>
              <li>
                <strong>Client deliverables and project archives:</strong> up to
                thirty (30) calendar days after the Services end (for a one-time
                project, after acceptance), or earlier on the Client&apos;s
                written request. We then permanently delete them, or return them
                to the Client if the Client chooses.
              </li>
              <li>
                <strong>Temporary scraper caches and scratch datasets:</strong>{" "}
                deleted when no longer reasonably needed, and in any event within
                thirty (30) days after delivery.
              </li>
              <li>
                <strong>Client credentials and API keys:</strong> removed from our
                active systems when no longer needed, and in any event within
                thirty (30) days after project acceptance.
              </li>
            </ul>
            <p>
              Copies in routine backups are overwritten in the normal backup
              cycle. We may keep data longer where the law requires or where we
              need it to establish or defend a legal claim.
            </p>
          </section>

          <section className="terms-section" id="privacy-s10">
            <h2>10. International Transfers &amp; Standard Contractual Clauses</h2>
            <p>
              Quoin operates from Greater Noida, Uttar Pradesh, India. If you
              contact us or use our Services from the European Economic Area
              (EEA), the United Kingdom or elsewhere, personal data will be
              transferred to and processed in India and in the locations of our
              sub-processors.
            </p>
            <p>
              India has not received an adequacy decision from the European
              Commission or UK authorities. For transfers of Client Personal Data
              that are subject to the GDPR or UK GDPR:
            </p>
            <ul>
              <li>
                <strong>Standard Contractual Clauses:</strong> the
                Commission&apos;s Standard Contractual Clauses (Implementing
                Decision (EU) 2021/914, Module Two, controller to processor) or
                the UK International Data Transfer Addendum apply, and are
                incorporated by reference into our{" "}
                <a
                  href="https://quoin.online/terms"
                  onClick={(e) => openPage(e, "/terms")}
                >
                  Terms &amp; Conditions
                </a>{" "}
                (Section 17.6) and all client contracts involving such transfers.
              </li>
              <li>
                <strong>Standalone addendum:</strong> on request, Quoin will
                sign a standalone Data Processing Addendum incorporating the
                Standard Contractual Clauses for the Client&apos;s compliance
                records.
              </li>
            </ul>
            <p>
              For personal data you give us directly as a website visitor or
              prospect, the transfer to India happens because you choose to
              contact us, and we protect the data as this Policy describes.
            </p>
          </section>

          <section className="terms-section" id="privacy-s11">
            <h2>11. Cookies, Local Storage &amp; Anti-Abuse Mechanisms</h2>
            <p>
              Our website is built to keep client-side storage to a minimum. We
              do not use third-party advertising cookies, cross-site trackers or
              data-broker pixels.
            </p>
            <ul>
              <li>
                <strong>Essential local storage:</strong> we use your
                browser&apos;s localStorage only to remember your display theme
                (dark or light) and navigation state. This data stays on your
                device and is not sent to advertising networks.
              </li>
              <li>
                <strong>Anti-abuse and rate limiting:</strong> to protect our
                website and APIs from spam and denial-of-service attacks, we use
                server-side IP rate limiting and short-lived in-memory tokens. We
                do not use third-party CAPTCHA widgets, such as Google reCAPTCHA
                or Cloudflare Turnstile, that set persistent tracking cookies.
              </li>
            </ul>
            <p>
              Because we use only storage that is strictly necessary for the
              site to work, we do not show a cookie consent banner. If we
              introduce analytics or other non-essential tracking, we will first
              add a compliant consent mechanism and update this Policy.
            </p>
          </section>

          <section className="terms-section" id="privacy-s12">
            <h2>12. Age Restrictions &amp; Protection of Minors</h2>
            <p>
              Quoin provides business-to-business services only, to commercial
              entities and to individuals aged eighteen (18) and over. We do not
              knowingly request, collect or process personal data from minors.
            </p>
            <p>
              If we find that we have collected personal data of a person under
              eighteen without verifiable parental or guardian consent, we will
              promptly delete it, in line with Section 9 of the DPDP Act.
            </p>
          </section>

          <section className="terms-section" id="privacy-s13">
            <h2>13. Your Privacy Rights &amp; Verification Procedures</h2>
            <p>
              Subject to applicable data protection law (including the GDPR, the
              UK GDPR and the DPDP Act), you have these rights over personal
              data for which Quoin is the Data Fiduciary or Controller:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> ask for confirmation and a summary of
                the personal data we hold about you.
              </li>
              <li>
                <strong>Correction and completion:</strong> ask us to correct
                inaccurate, incomplete or outdated data.
              </li>
              <li>
                <strong>Erasure:</strong> ask us to delete your data where we no
                longer need it or the law does not require us to keep it.
              </li>
              <li>
                <strong>Restriction (GDPR Art. 18):</strong> ask us to restrict
                processing where accuracy is contested, processing is unlawful,
                or you need the data for legal claims.
              </li>
              <li>
                <strong>Portability (GDPR Art. 20):</strong> receive your data
                in a structured, commonly used, machine-readable format and have
                it sent to another controller where technically feasible.
              </li>
              <li>
                <strong>Objection (GDPR Art. 21):</strong> object at any time to
                processing based on legitimate interests, or to direct
                marketing.
              </li>
              <li>
                <strong>Withdrawal of consent:</strong> withdraw consent at any
                time (for example for the newsletter), without affecting
                processing that happened before.
              </li>
              <li>
                <strong>Grievance redressal (DPDP Act, Section 13):</strong> use
                our grievance process for any act or omission of Quoin
                concerning its obligations under data protection law.
              </li>
              <li>
                <strong>Nomination (DPDP Act, Section 14):</strong> nominate a
                person to exercise your rights if you die or become incapacitated,
                as the DPDP Act provides.
              </li>
              <li>
                <strong>Complaint:</strong> complain to a competent authority,
                such as the Data Protection Board of India or your national data
                protection authority in the EU or UK. You may do this at any
                time, including without first contacting us.
              </li>
            </ul>
            <p>
              <strong>Data processed on a Client&apos;s behalf.</strong> Where
              Quoin processes personal data only as a Client&apos;s Data
              Processor, Quoin does not answer rights requests itself. If you
              send us such a request, we will promptly forward it to the
              responsible Client and give the cooperation our Statement of Work
              provides.
            </p>
            <p>
              <strong>How to make a request and how we verify it.</strong> Send
              requests about data for which Quoin is the Data Fiduciary or
              Controller to{" "}
              <a href="mailto:privacy@quoin.online">privacy@quoin.online</a>,
              where possible from the email address associated with you. We may
              ask for additional information to confirm your identity before we
              act. Quoin will review valid requests and respond within the
              timeframe that applicable law requires or, where no specific
              timeframe applies, within a reasonable period that takes account
              of the nature and complexity of the request. We do not charge a
              fee unless a request is clearly unfounded or excessive.
            </p>
          </section>

          <section className="terms-section" id="privacy-s14">
            <h2>14. Changes to This Privacy Policy</h2>
            <p>
              We may update this Policy to reflect technical developments, legal
              changes or operational changes. The current version is always
              published on this page, with the &ldquo;Last Updated&rdquo; date
              and version number shown in the page header. Quoin will notify
              active Clients by email of material changes, and will give notice
              of sub-processor changes as Section 6 states. The updated Policy
              applies from its stated effective date. Where applicable law
              requires, Quoin will obtain consent or give any other notice that
              it requires before applying material changes.
            </p>
          </section>

          <section className="terms-section" id="privacy-s15">
            <h2>15. Grievance Officer &amp; Privacy Contact</h2>
            <p>
              For questions, concerns or grievances about this Policy or how we
              handle personal data, contact our Grievance Officer:
            </p>
            <p>
              <strong>Grievance Officer:</strong> Suryash Rathore
              <br />
              <strong>Entity:</strong> Quoin (operated by Suryash Rathore as a
              sole proprietorship)
              <br />
              <strong>Address:</strong> Delta II, Greater Noida, Gautam Buddha
              Nagar, Uttar Pradesh &ndash; 201308, India
              <br />
              <strong>Website:</strong>{" "}
              <a
                href="https://quoin.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://quoin.online
              </a>
              <br />
              <strong>General enquiries and support:</strong>{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a>
              <br />
              <strong>Privacy and data requests:</strong>{" "}
              <a href="mailto:privacy@quoin.online">privacy@quoin.online</a>
              <br />
              <strong>Grievance escalations:</strong>{" "}
              <a href="mailto:grievance@quoin.online">grievance@quoin.online</a>
              <br />
              <strong>Response time:</strong> acknowledgment promptly and
              resolution within thirty (30) calendar days.
            </p>
            <p>
              <em>
                Our{" "}
                <a
                  href="https://quoin.online/terms"
                  onClick={(e) => openPage(e, "/terms")}
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="https://quoin.online/refund"
                  onClick={(e) => openPage(e, "/refund")}
                >
                  Refund &amp; Cancellation Policy
                </a>{" "}
                are published on separate pages.
              </em>
            </p>
          </section>

          <div className="terms-footer">
            <div className="footer-left">
              <span className="footer-copyright">
                &copy; 2026 Quoin. All rights reserved.
              </span>
            </div>
            <div className="footer-legal">
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms &amp; Conditions
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a
                href="https://quoin.online/privacy"
                onClick={(e) => openPage(e, "/privacy")}
              >
                Privacy Policy
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a
                href="https://quoin.online/refund"
                onClick={(e) => openPage(e, "/refund")}
              >
                Refund Policy
              </a>
            </div>
            <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
              Return to home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ==========================================================================
   REFUND & CANCELLATION POLICY PAGE
   ========================================================================== */

export function RefundPage({ navigate }: { navigate: Navigate }) {
  const [leaving, setLeaving] = useState(false)

  function openPage(event: ReactMouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(path)
    }, 420)
  }

  return (
    <div className={`site-shell terms-shell${leaving ? " is-leaving" : ""}`}>
      <header className="site-header consultation-header">
        <a
          href="/"
          className="wordmark"
          aria-label="quoin home"
          onClick={(e) => openPage(e, "/")}
        >
          <BrandLogo />
        </a>
        <span className="consultation-header-label">Legal / Refund</span>
        <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
          Back to home
        </a>
      </header>
      <main className="terms-page">
        <div className="section-meta">
          <span>03 — Legal</span>
          <span>Last Updated: Oct 13, 2026 · Version 1.0</span>
        </div>
        <div className="terms-heading">
          <p className="eyebrow">Quoin / Refund</p>
          <h1>
            Refund &amp;
            <br />
            cancellation.
          </h1>
        </div>

        <LegalNavTabs current="refund" onNavigate={openPage} />

        <div className="terms-content">
          <div className="terms-intro-box">
            <p className="terms-date-tag">
              <strong>Quoin</strong> &nbsp;·&nbsp;{" "}
              <strong>Last Updated:</strong> Oct 13, 2026 &nbsp;·&nbsp;{" "}
              <strong>Version:</strong> 1.0
            </p>
            <h2>About This Policy</h2>
            <p>
              This Refund &amp; Cancellation Policy explains when Quoin refunds
              fees and how to cancel. It forms part of the Agreement under
              Section 1.5 of our{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms &amp; Conditions
              </a>
              , which are published on a separate page. Capitalised terms have the
              meanings given in the Terms. If this Policy conflicts with the
              Terms, including Section 19 of the Terms, the Terms prevail.
            </p>
            <p>
              Quoin sells custom engineering work to businesses, so refunds
              depend on whether work has started and whether the agreed scope was
              delivered.
            </p>
          </div>

          <section className="terms-section" id="refund-s1">
            <h2>1. Scope of Services</h2>
            <p>
              This Policy applies to all professional business-to-business
              technology services that Quoin provides, including:
            </p>
            <ul>
              <li>Web Scraping &amp; Data Extraction;</li>
              <li>Internal Knowledge Assistant solutions;</li>
              <li>SEO &amp; Search Intelligence retainers;</li>
              <li>AI-assisted automation workflows; and</li>
              <li>custom data engineering, indexing and technical consulting.</li>
            </ul>
          </section>

          <section className="terms-section" id="refund-s2">
            <h2>2. Custom Services &amp; Consumed Engineering Resources</h2>
            <p>
              Quoin builds custom solutions tailored to each Client&apos;s
              architecture, operations and data requirements. As an engagement
              progresses, developer time, infrastructure provisioning, proxy
              bandwidth, cloud compute and third-party API usage are consumed and
              cannot be returned.
            </p>
            <p>
              For that reason, fees for work performed and resources committed
              are non-refundable, except as this Policy expressly provides in
              Sections 3, 4, 6, 7 and 8.
            </p>
          </section>

          <section className="terms-section" id="refund-s3">
            <h2>3. Cancellation Before Work Begins</h2>
            <p>
              <strong>3.1 When work begins.</strong> For this Policy and the
              Terms, work on a project begins on the earlier of (a) the date Quoin
              confirms project kickoff in writing, by email or electronic
              message, and (b) the date Quoin starts technical scoping,
              architectural design or code implementation (&ldquo;Work
              Commencement&rdquo;). Where the Statement of Work divides the
              project into milestones, Work Commencement applies to each
              milestone separately.
            </p>
            <p>
              <strong>3.2 Cancelling before Work Commencement.</strong> The
              Client may cancel by written notice before Work Commencement. Quoin
              will confirm the cancellation in writing and refund all project
              fees paid, less:
            </p>
            <ul>
              <li>
                non-recoverable payment-gateway and bank charges (such as
                processing fees retained by Razorpay, PayPal or banking
                networks); and
              </li>
              <li>
                documented third-party setup costs that Quoin has already incurred
                for the project.
              </li>
            </ul>
            <p>Quoin will show the Client these deductions in writing.</p>
          </section>

          <section className="terms-section" id="refund-s4">
            <h2>4. Cancellation After Work Begins &amp; Delivery Failure</h2>
            <p>
              <strong>4.1 Change of mind or convenience.</strong> Once Work
              Commencement has occurred for a project or milestone, the Client is
              not entitled to a refund of the fees for it because of a change of
              mind, a change of commercial priority, lack of ongoing need or
              internal reorganisation. Fees for work performed, developer hours
              expended and infrastructure provisioned are earned and
              non-refundable.
            </p>
            <p>
              <strong>4.2 Terminating for convenience.</strong> The Client may
              still terminate a Statement of Work at any time under Section 21.3
              of the{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms
              </a>
              . The Client then pays for work performed up to the termination
              date and for non-cancellable third-party commitments. Fees the
              Client has paid for any milestone that has not reached Work
              Commencement are refunded, less non-recoverable payment charges.
            </p>
            <p>
              <strong>4.3 Delivery failure.</strong> If Quoin materially fails to
              deliver what the written Statement of Work specifies:
            </p>
            <ul>
              <li>
                the Client must give detailed written notice of the material
                non-conformity within the seven (7) calendar-day Review Period in
                Section 5;
              </li>
              <li>
                Quoin then has at least fifteen (15) calendar days from receiving
                the notice to investigate and correct the non-conformity so that
                the Deliverable substantially meets the Statement of Work; and
              </li>
              <li>
                if Quoin still cannot deliver the agreed scope or materially
                correct the non-conformity after that period, Quoin will refund the
                fees paid for the undelivered or unperformed portion of the
                project.
              </li>
            </ul>
            <p>
              Correction or, failing that, this refund is the Client&apos;s sole
              and exclusive remedy for non-conforming or undelivered work, as
              Section 22.2 of the Terms provides. Section 23 of the Terms
              (limitation of liability) applies, and nothing in this Policy limits
              liability that cannot be limited by law.
            </p>
            <p>
              <strong>4.4 Quoin&apos;s breach.</strong> The Client may also
              terminate under Section 21.4 of the Terms if Quoin commits a
              material breach that it does not cure within thirty (30) days of the
              Client&apos;s written notice. Quoin will then refund the fees paid
              for the unperformed portion.
            </p>
          </section>

          <section className="terms-section" id="refund-s5">
            <h2>5. Deliverables Review &amp; Acceptance</h2>
            <ul>
              <li>
                Unless otherwise agreed in writing, the Client has seven (7)
                calendar days from delivery (the &ldquo;Review Period&rdquo;) to
                inspect each Deliverable and give Quoin written notice of any
                material failure to meet the written specifications in the
                Statement of Work.
              </li>
              <li>
                Quoin will make diligent efforts to investigate and correct valid
                material issues within the agreed scope, as Section 4.3 states.
              </li>
              <li>
                A Deliverable is accepted on the earliest of: the Client&apos;s
                written approval; the Client using it for its intended production
                purpose; or the end of the Review Period without a valid notice of
                material non-conformity.
              </li>
              <li>
                After acceptance, requested changes are Change Requests under the
                Terms, and ongoing support or maintenance needs a separate
                retainer.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="refund-s6">
            <h2>6. Recurring Services &amp; Monthly Retainers</h2>
            <p>
              For ongoing monthly services, such as SEO &amp; Search Intelligence
              retainers or recurring scraping pipelines:
            </p>
            <ul>
              <li>
                <strong>Billing:</strong> billing follows the agreed retainer
                schedule or Statement of Work. Unless the Statement of Work says
                otherwise, the service renews automatically each month.
              </li>
              <li>
                <strong>How to cancel:</strong> send written notice by email to{" "}
                <a href="mailto:legal@quoin.online">legal@quoin.online</a> (or{" "}
                <a href="mailto:contact@quoin.online">contact@quoin.online</a>) at
                least seven (7) calendar days before the start of the next
                billing cycle.
              </li>
              <li>
                <strong>Effect of cancelling:</strong> cancellation takes effect
                at the end of the billing cycle already paid for and stops later
                billing. It does not entitle the Client to a refund for a cycle
                that has begun or for past cycles in which services were provided.
              </li>
              <li>
                <strong>Price changes:</strong> Quoin may change recurring fees on
                thirty (30) days&apos; written notice, and the Client may cancel
                before the new fees apply.
              </li>
              <li>
                <strong>Failed payments:</strong> if a recurring payment fails,
                Quoin may retry it and, after seven (7) days&apos; written notice,
                suspend the service until payment is made.
              </li>
              <li>
                <strong>If Quoin discontinues the service:</strong> Quoin will give
                thirty (30) days&apos; written notice and refund any prepaid fees
                for the period after the service ends.
              </li>
              <li>
                Outstanding invoices for services already provided remain payable.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="refund-s7">
            <h2>7. Target-Site Blocking &amp; Third-Party Dependencies</h2>
            <p>
              Data extraction and automation depend on target websites, anti-bot
              measures, proxy networks and third-party APIs that Quoin does not
              control.
            </p>
            <p>
              <strong>7.1 Blocking before delivery.</strong> If a target website
              permanently blocks collection, or makes it technically infeasible,
              through changes, anti-bot escalation, CAPTCHA changes or access
              barriers before the agreed dataset or scraper is delivered, and the
              Client did not cause it:
            </p>
            <ul>
              <li>
                the parties will first work in good faith to agree an adjusted
                scope, such as alternative sources, a different delivery format or
                a new schedule; and
              </li>
              <li>
                if they cannot agree a workable scope, Quoin will refund the fees
                paid for the part of the project that could not be delivered,
                worked out by the milestones in the Statement of Work or, if there
                are none, in proportion to the agreed scope, less documented
                non-recoverable third-party costs that Quoin has actually incurred
                (such as proxy allocations or verification costs).
              </li>
            </ul>
            <p>
              <strong>7.2 Changes after delivery.</strong> Once a Deliverable has
              been delivered and accepted, or is deemed accepted under Section 5,
              later changes at the target site, such as HTML restructuring,
              anti-bot escalation or outages, do not entitle the Client to a
              refund. Maintenance or redesign needs a separate retainer or change
              order.
            </p>
            <p>
              <strong>7.3 Direct third-party costs.</strong> Costs for
              third-party platforms, commercial AI model tokens, dedicated proxy
              pools or cloud compute are non-refundable unless they were unused.
            </p>
          </section>

          <section className="terms-section" id="refund-s8">
            <h2>8. Suspension, Termination &amp; Dormant Projects</h2>
            <p>
              Section 21 of the{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms
              </a>{" "}
              sets out when Quoin may suspend or terminate Services. The grounds
              include non-payment, uncured material breach, unlawful use, security
              risk, sanctions or insolvency, a legal demand under Section 10.5 of
              the Terms, and a project that stays dormant for more than thirty
              (30) consecutive calendar days because the Client has not supplied
              required materials, feedback or approvals (Section 8.5 of the
              Terms). This Section explains the financial effect.
            </p>
            <ul>
              <li>
                <strong>Fees for work done.</strong> Where Quoin suspends or
                terminates, fees for work performed up to that date, resources
                committed and documented direct third-party expenses remain
                earned and payable.
              </li>
              <li>
                <strong>
                  Termination because of the Client&apos;s breach, or a dormant
                  closure.
                </strong>{" "}
                Quoin keeps the fees described above and its documented direct
                losses caused by the breach. Quoin refunds the balance of any
                prepaid fees that relates to work not yet performed.
              </li>
              <li>
                <strong>Termination by Quoin for any other reason.</strong>{" "}
                Unearned prepaid fees for undelivered work are refunded pro
                rata, calculated in the same way as in Section 4.3.
              </li>
              <li>
                <strong>Delivery on payment.</strong> Quoin releases completed
                work once all fees due are paid, as Section 21.5 of the Terms
                provides.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="refund-s9">
            <h2>9. Payment Disputes &amp; Chargebacks</h2>
            <p>
              <strong>9.1 Contact Quoin first.</strong> If the Client believes a
              charge is wrong, or that a service was not delivered as the Statement
              of Work provides, it must first write to{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a> so
              that both parties can investigate and resolve the matter in good
              faith.
            </p>
            <p>
              <strong>9.2 Evidence.</strong> If a chargeback, payment reversal or
              other dispute is started with a payment processor, card network or
              bank, Quoin will give it the Statement of Work, written
              communications, project milestones, timestamped delivery records
              and access logs to support the charge.
            </p>
            <p>
              <strong>9.3 Unfounded chargebacks.</strong> If the Client starts a
              chargeback without following Section 9.1 and the chargeback is found
              to be unfounded, the Client is liable for the chargeback fees and
              Quoin&apos;s reasonable costs, as Section 19.8 of the Terms
              provides.
            </p>
            <p>
              <strong>9.4 Contract still applies.</strong> Starting a chargeback
              does not cancel the Client&apos;s obligations under the Terms. Any
              unresolved dispute is subject to the negotiation and arbitration
              procedure in Section 27 of the{" "}
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms
              </a>
              .
            </p>
          </section>

          <section className="terms-section" id="refund-s10">
            <h2>10. Approved Refund Processing</h2>
            <p>Where Quoin approves a refund in writing under this Policy:</p>
            <ul>
              <li>
                <strong>Original currency and method:</strong> the refund is paid
                in the currency of the original invoice and payment (for example
                USD or INR), by the original payment method (UPI, Razorpay,
                PayPal or wire transfer).
              </li>
              <li>
                <strong>Exchange-rate risk:</strong> any exchange-rate difference,
                conversion loss or bank conversion fee between the date of
                payment and the date of refund is borne by the Client.
              </li>
              <li>
                <strong>Gateway fees:</strong> payment-gateway and intermediary
                bank charges that the processor does not return to Quoin are
                deducted from the refund.
              </li>
              <li>
                <strong>Timeline:</strong> refunds usually take seven (7) to ten
                (10) Business Days from Quoin&apos;s written approval, depending
                on the banks and payment networks involved.
              </li>
              <li>
                <strong>Tax documents:</strong> where GST was charged on the
                refunded amount, Quoin will issue a credit note as the law
                requires.
              </li>
              <li>
                <strong>Confirmation:</strong> Quoin will confirm the refund by
                email with a transaction reference.
              </li>
            </ul>
          </section>

          <section className="terms-section" id="refund-s11">
            <h2>11. Contact &amp; Cancellation Requests</h2>
            <p>
              To cancel, request a refund or ask about this Policy, email{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a> and
              include the invoice or Statement of Work reference and the reason
              for the request.
            </p>
            <p>
              <strong>Quoin, operated by Suryash Rathore as a sole proprietorship</strong>
              <br />
              <strong>Operating address:</strong> Delta II, Greater Noida, Gautam
              Buddha Nagar, Uttar Pradesh &ndash; 201308, India
              <br />
              <strong>Website:</strong>{" "}
              <a
                href="https://quoin.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                quoin.online
              </a>
              <br />
              <strong>General enquiries and cancellations:</strong>{" "}
              <a href="mailto:contact@quoin.online">contact@quoin.online</a>
              <br />
              <strong>Formal legal notices under the Terms:</strong>{" "}
              <a href="mailto:legal@quoin.online">legal@quoin.online</a>
            </p>
          </section>

          <div className="terms-footer">
            <div className="footer-left">
              <span className="footer-copyright">
                &copy; 2026 Quoin. All rights reserved.
              </span>
            </div>
            <div className="footer-legal">
              <a
                href="https://quoin.online/terms"
                onClick={(e) => openPage(e, "/terms")}
              >
                Terms &amp; Conditions
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a
                href="https://quoin.online/privacy"
                onClick={(e) => openPage(e, "/privacy")}
              >
                Privacy Policy
              </a>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <a
                href="https://quoin.online/refund"
                onClick={(e) => openPage(e, "/refund")}
              >
                Refund Policy
              </a>
            </div>
            <a href="/" className="header-cta" onClick={(e) => openPage(e, "/")}>
              Return to home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
