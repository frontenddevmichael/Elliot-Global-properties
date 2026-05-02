import { useEffect, useRef, useState } from 'react'
import './About.css'

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12, once = true) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true)
                    if (once) obs.unobserve(el)
                }
            },
            { threshold, rootMargin: '0px 0px -56px 0px' }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold, once])
    return [ref, visible]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PILLARS = [
    {
        number: '01',
        title: 'Trust & Integrity',
        quote: 'We build more than properties — we build peace of mind.',
        body: 'Honest dealings, clear communications and integrity at every stage of the real estate process. From land acquisition to property delivery, transparent documentation is the foundation of everything we do.',
        tag: 'FOUNDATION',
    },
    {
        number: '02',
        title: 'Innovation & Excellence',
        quote: 'Redefining modern living in Lekki-Epe.',
        body: 'We blend contemporary design with sustainability in every development. This is where quality meets innovation — creating spaces that raise the standard of modern Nigerian living.',
        tag: 'STANDARD',
    },
    {
        number: '03',
        title: 'Customer-Centricity',
        quote: 'Our clients are at the heart of every decision.',
        body: 'Flexible payment plans for every income bracket. After-sales support and property management. Easy communication and prompt issue resolution. We always build around you.',
        tag: 'VALUE',
    },
    {
        number: '04',
        title: 'Sustainable Growth',
        quote: 'We develop with purpose and for posterity.',
        body: 'Environmentally responsible development. Community impact and infrastructure improvement. Long-term value creation for clients and investors — estates with roads, drainage, and security.',
        tag: 'IMPACT',
    },
    {
        number: '05',
        title: 'Local Expertise, Global Vision',
        quote: 'Rooted in Lekki-Epe, aligned with global standards.',
        body: 'Deep understanding of the local property market. Internationally inspired practices in design, management, and investment. Bridging the gap for Nigerians in the diaspora seeking real estate security.',
        tag: 'REACH',
    },
    {
        number: '06',
        title: 'Professionalism & Accountability',
        quote: 'A professional approach to real estate excellence.',
        body: 'Our operations are handled with the utmost professionalism — from staff conduct to documentation and delivery timelines. We take responsibility and deliver on every promise we make.',
        tag: 'CONDUCT',
    },
]

const WHY_REASONS = [
    {
        number: '01',
        title: 'Prime Location in Lagos',
        body: 'We focus on fast-growing areas like Lekki-Epe — a hotbed for future development, infrastructure investment, and high return on investment.',
    },
    {
        number: '02',
        title: 'Flexible Payment Plans',
        body: 'Whether you\'re a market woman, student, cooperative group, or salary earner — EGPL offers tailored payment structures to fit your budget.',
    },
    {
        number: '03',
        title: 'Verified & Secure Titles',
        body: 'All properties come with genuine, verifiable documents — C of O, Excision, Gazette, or Registered Survey. No omo-onile drama.',
    },
    {
        number: '04',
        title: 'Affordable Investment',
        body: 'Properties are priced to ensure accessibility for first-time buyers and seasoned investors alike. You don\'t need millions to start.',
    },
    {
        number: '05',
        title: 'Transparent Transactions',
        body: 'No hidden charges. No surprises. Everything clearly stated and professionally handled from inspection to allocation.',
    },
    {
        number: '06',
        title: 'Excellent Customer Service',
        body: 'From first enquiry to post-sale, EGPL guides every client every step of the way — with patience, expertise, and genuine care.',
    },
    {
        number: '07',
        title: 'Land Appreciation Guarantee',
        body: 'Our portfolio is strategically located in areas with high appreciation potential, ensuring your investment grows in value over time.',
    },
    {
        number: '08',
        title: 'Open for Inspection',
        body: 'Visit any property, anytime. We believe in seeing before buying — no pressure, no rush. Just the facts, and the land under your feet.',
    },
    {
        number: '09',
        title: 'Community Development Focus',
        body: 'EGPL doesn\'t just sell land — we actively develop estates with roads, drainage, and security, building thriving communities from the ground up.',
    },
    {
        number: '10',
        title: 'Trusted Local Brand',
        body: 'A growing reputation across Lagos, with satisfied clients throughout Nigeria and abroad. Elliot Global Properties is a name you can rely on.',
    },
]

const STATS = [
    { value: '50+', label: 'Clients Served', sub: 'Across Nigeria' },
    { value: '₦20+', label: 'Projects', sub: 'Across Lagos' },
    { value: '4+', label: 'Market Authority', sub: 'Est. Lagos' },
    { value: '4', label: 'Active Cities', sub: 'And growing' },
]

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function AboutHero() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

    return (
        <section className="ap-hero" aria-label="About Elliot Global Properties">

            {/* Architectural grid background */}
            <div className="ap-hero__bg" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="ap-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(209,205,198,0.07)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ap-grid)" />
                </svg>
                {/* Diagonal red accent line */}
                <svg className="ap-hero__diagonal" viewBox="0 0 1440 700" preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <line x1="0" y1="700" x2="500" y2="0"
                        stroke="rgba(192,0,26,0.08)" strokeWidth="1" />
                    <line x1="80" y1="700" x2="580" y2="0"
                        stroke="rgba(192,0,26,0.05)" strokeWidth="0.5" />
                </svg>
                {/* Red glow bottom-left */}
                <div className="ap-hero__glow" />
            </div>

            <div className="container ap-hero__inner">
                <div className="ap-hero__copy">
                    <h1 className={`ap-hero__h1 ${mounted ? 'ap--in' : ''}`}
                        style={{ transitionDelay: '0.12s' }}>
                        We don't just
                        <br />sell property.
                        <br /><em>We place people.</em>
                    </h1>

                    <p className={`ap-hero__lead ${mounted ? 'ap--in' : ''}`}
                        style={{ transitionDelay: '0.26s' }}>
                        Elliot Global Properties Ltd is a premier Lagos-based real estate company
                        specialising in land acquisition, estate development, and property management
                        across the Lekki-Epe corridor and beyond. Since our founding, we have been
                        the bridge between ambition and address — for every income bracket, every dream.
                    </p>

                    <div className={`ap-hero__actions ${mounted ? 'ap--in' : ''}`}
                        style={{ transitionDelay: '0.4s' }}>
                        <a href="/contact" className="ap-btn ap-btn--primary">
                            <span>Start a Conversation</span>
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="ap-btn__fill" aria-hidden="true" />
                        </a>
                        <a href="/services" className="ap-btn ap-btn--ghost">View Services</a>
                    </div>
                </div>

                {/* Right: stat grid */}
                <div className={`ap-hero__stats ${mounted ? 'ap--in' : ''}`}
                    style={{ transitionDelay: '0.32s' }}>
                    {STATS.map((s, i) => (
                        <div key={s.label} className="ap-hero__stat"
                            style={{ transitionDelay: mounted ? `${0.38 + i * 0.08}s` : '0s' }}>
                            <span className="ap-hero__stat-num">{s.value}</span>
                            <span className="ap-hero__stat-label">{s.label}</span>
                            <span className="ap-hero__stat-sub">{s.sub}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Coordinate corner */}
            <div className="ap-hero__coord" aria-hidden="true">
                <span>6.5244°N · 3.3792°E</span>
                <span>LEKKI-EPE CORRIDOR · LAGOS</span>
            </div>
        </section>
    )
}

// ─── MISSION STATEMENT ────────────────────────────────────────────────────────
function MissionStatement() {
    const [ref, visible] = useInView(0.3)

    return (
        <section className="ap-mission" ref={ref} aria-label="Our mission">
            <div className="container">
                <div className={`ap-mission__inner ${visible ? 'ap--in' : ''}`}>

                    {/* Left: decorative mark */}
                    <div className="ap-mission__mark" aria-hidden="true">
                        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Surveyor crosshair */}
                            <line x1="40" y1="0" x2="40" y2="32" stroke="rgba(192,0,26,0.5)" strokeWidth="1" />
                            <line x1="40" y1="48" x2="40" y2="80" stroke="rgba(192,0,26,0.5)" strokeWidth="1" />
                            <line x1="0" y1="40" x2="32" y2="40" stroke="rgba(192,0,26,0.5)" strokeWidth="1" />
                            <line x1="48" y1="40" x2="80" y2="40" stroke="rgba(192,0,26,0.5)" strokeWidth="1" />
                            <circle cx="40" cy="40" r="8" stroke="rgba(192,0,26,0.4)" strokeWidth="1" />
                            <circle cx="40" cy="40" r="2" fill="rgba(192,0,26,0.8)" />
                            {/* Corner marks */}
                            <path d="M2 16 L2 2 L16 2" stroke="rgba(192,0,26,0.3)" strokeWidth="0.8" />
                            <path d="M64 2 L78 2 L78 16" stroke="rgba(192,0,26,0.3)" strokeWidth="0.8" />
                            <path d="M2 64 L2 78 L16 78" stroke="rgba(192,0,26,0.3)" strokeWidth="0.8" />
                            <path d="M78 64 L78 78 L64 78" stroke="rgba(192,0,26,0.3)" strokeWidth="0.8" />
                        </svg>
                    </div>

                    {/* Right: text */}
                    <div className="ap-mission__text">
                        <span className="ap-mission__eyebrow">Our Mission</span>
                        <blockquote className="ap-mission__quote">
                            To create flexible access to quality property ownership —
                            for low income earners, middle income earners, and high income
                            earners alike — because where you live should not be determined
                            solely by what you earn.
                        </blockquote>
                        <p className="ap-mission__attribution">
                            <span className="ap-mission__attr-line" aria-hidden="true" />
                            Elliot Global Properties Ltd · Lagos, Nigeria
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── BRAND PILLARS ────────────────────────────────────────────────────────────
function BrandPillars() {
    const [ref, visible] = useInView(0.08)
    const [active, setActive] = useState(0)

    return (
        <section className="ap-pillars" ref={ref} aria-label="Our brand pillars">

            {/* Section header */}
            <div className="container">
                <div className={`ap-section-header ${visible ? 'ap--in' : ''}`}>
                    <h2 className="ap-section-title">
                        Six commitments that
                        <br />define everything we do.
                    </h2>
                </div>
            </div>

            {/* Pillars layout: accordion left + detail right */}
            <div className={`ap-pillars__layout ${visible ? 'ap--in' : ''}`}>

                {/* Left: numbered list */}
                <div className="ap-pillars__list">
                    {PILLARS.map((p, i) => (
                        <button
                            key={p.number}
                            className={`ap-pillars__item ${active === i ? 'ap-pillars__item--active' : ''}`}
                            onClick={() => setActive(i)}
                            aria-expanded={active === i}
                            aria-controls={`pillar-detail-${i}`}
                        >
                            <span className="ap-pillars__num">{p.number}</span>
                            <span className="ap-pillars__title">{p.title}</span>
                            <span className="ap-pillars__tag">{p.tag}</span>
                            <svg className="ap-pillars__chevron" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Right: active pillar detail */}
                <div className="ap-pillars__detail" id={`pillar-detail-${active}`}
                    key={active} aria-live="polite">
                    <div className="ap-pillars__detail-inner">
                        <span className="ap-pillars__detail-num">{PILLARS[active].number}</span>
                        <span className="ap-pillars__detail-tag">{PILLARS[active].tag}</span>
                        <h3 className="ap-pillars__detail-title">{PILLARS[active].title}</h3>
                        <p className="ap-pillars__detail-quote">"{PILLARS[active].quote}"</p>
                        <p className="ap-pillars__detail-body">{PILLARS[active].body}</p>
                        {/* Progress indicator */}
                        <div className="ap-pillars__detail-progress" aria-hidden="true">
                            {PILLARS.map((_, i) => (
                                <span key={i}
                                    className={`ap-pillars__progress-dot ${i === active ? 'ap-pillars__progress-dot--active' : ''}`}
                                    onClick={() => setActive(i)}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Decorative large faint number */}
                    <div className="ap-pillars__detail-bg-num" aria-hidden="true">
                        {PILLARS[active].number}
                    </div>
                </div>

            </div>
        </section>
    )
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyChooseUs() {
    const [ref, visible] = useInView(0.08)

    return (
        <section className="ap-why" ref={ref} aria-label="Why choose Elliot Global">
            <div className="container">

                <div className={`ap-section-header ${visible ? 'ap--in' : ''}`}>
                    <span className="ap-eyebrow">Why Elliot Global</span>
                    <h2 className="ap-section-title">
                        Ten reasons our clients
                        <br />choose us — and stay.
                    </h2>
                    <p className="ap-section-sub">
                        From verified land titles to flexible payment plans, every reason
                        reflects our commitment to making property ownership accessible,
                        secure, and worth every naira.
                    </p>
                </div>

                <div className="ap-why__grid">
                    {WHY_REASONS.map((r, i) => (
                        <div
                            key={r.number}
                            className={`ap-why__card ${visible ? 'ap-why__card--in' : ''}`}
                            style={{ transitionDelay: visible ? `${i * 55}ms` : '0ms' }}
                        >
                            {/* Number */}
                            <span className="ap-why__num" aria-hidden="true">{r.number}</span>
                            {/* Red top accent — draws in on hover */}
                            <div className="ap-why__accent" aria-hidden="true" />
                            {/* Content */}
                            <div className="ap-why__content">
                                <h3 className="ap-why__title">{r.title}</h3>
                                <p className="ap-why__body">{r.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

// ─── LEKKI-EPE FOCUS SECTION ──────────────────────────────────────────────────
function LekkiEpeFocus() {
    const [ref, visible] = useInView(0.2)

    return (
        <section className="ap-lekki" ref={ref} aria-label="Our focus area">
            <div className="ap-lekki__bg" aria-hidden="true">
                {/* Abstract topographic rings representing Lekki peninsula */}
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                    {[...Array(9)].map((_, i) => (
                        <ellipse key={i} cx="650" cy="400" rx={80 + i * 70} ry={40 + i * 36}
                            stroke={`rgba(192,0,26,${0.15 - i * 0.014})`} strokeWidth="1" />
                    ))}
                    {/* Survey grid */}
                    {[100, 200, 300, 400, 500, 600, 700].map(x => (
                        <line key={x} x1={x} y1="0" x2={x} y2="500"
                            stroke="rgba(209,205,198,0.05)" strokeWidth="0.5" />
                    ))}
                    {[100, 200, 300, 400].map(y => (
                        <line key={y} x1="0" y1={y} x2="800" y2={y}
                            stroke="rgba(209,205,198,0.05)" strokeWidth="0.5" />
                    ))}
                    {/* Lekki marker */}
                    <circle cx="650" cy="400" r="5" fill="var(--signal)" opacity="0.9" />
                    <circle cx="650" cy="400" r="5" fill="none"
                        stroke="rgba(192,0,26,0.4)" strokeWidth="1"
                        className="ap-lekki__pulse" />
                </svg>
                <div className="ap-lekki__grain" />
            </div>

            <div className="container ap-lekki__inner">

                <div className={`ap-lekki__copy ${visible ? 'ap--in' : ''}`}>
                    <span className="ap-eyebrow ap-eyebrow--light">Where We Operate</span>
                    <h2 className="ap-lekki__title">
                        Lekki-Epe:
                        <br /><em>Lagos' fastest-growing corridor.</em>
                    </h2>
                    <p className="ap-lekki__body">
                        The Lekki-Epe axis is Nigeria's most significant growth corridor —
                        with billions in government infrastructure investment, the Lekki Free
                        Trade Zone, and the Dangote Refinery driving unprecedented land value
                        appreciation. Elliot Global Properties is positioned at the heart
                        of this transformation.
                    </p>

                    <div className="ap-lekki__factors">
                        {[
                            { label: 'Free Trade Zone', note: 'Economic catalyst' },
                            { label: 'Dangote Refinery', note: 'Infrastructure anchor' },
                            { label: 'Lekki Deep Sea Port', note: 'Regional connectivity' },
                            { label: 'Government Backing', note: 'Secured appreciation' },
                        ].map(f => (
                            <div key={f.label} className="ap-lekki__factor">
                                <span className="ap-lekki__factor-dot" aria-hidden="true" />
                                <div>
                                    <p className="ap-lekki__factor-label">{f.label}</p>
                                    <p className="ap-lekki__factor-note">{f.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: coordinate card */}
                <div className={`ap-lekki__card ${visible ? 'ap--in' : ''}`}
                    style={{ transitionDelay: '0.2s' }}>
                    <div className="ap-lekki__card-inner">
                        <p className="ap-lekki__card-eyebrow">Focus Area</p>
                        <p className="ap-lekki__card-name">Lekki-Epe Corridor</p>
                        <p className="ap-lekki__card-coord">6.4698°N · 3.5852°E</p>
                        <div className="ap-lekki__card-divider" aria-hidden="true" />
                        <p className="ap-lekki__card-stat-label">Appreciation potential</p>
                        <p className="ap-lekki__card-stat-value">HIGH</p>
                        <div className="ap-lekki__card-divider" aria-hidden="true" />
                        <p className="ap-lekki__card-note">
                            All EGPL properties are located in areas with verified government
                            documentation and active infrastructure development.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

// ─── VALUES MANIFEST ─────────────────────────────────────────────────────────
function ValuesManifest() {
    const [ref, visible] = useInView(0.15)

    const lines = [
        { text: 'We are trusted.', em: false },
        { text: 'We are transparent.', em: false },
        { text: 'We are here for the first-timer.', em: true },
        { text: 'For the investor.', em: false },
        { text: 'For the diaspora.', em: false },
        { text: 'For every Nigerian', em: false },
        { text: 'who deserves a place to call home.', em: true },
    ]

    return (
        <section className="ap-manifest" ref={ref} aria-label="Our values">
            <div className="ap-manifest__bg" aria-hidden="true">
                <div className="ap-manifest__bg-text">ELLIOT</div>
            </div>

            <div className="container ap-manifest__inner">
                <span className={`ap-eyebrow ap-eyebrow--light ${visible ? 'ap--in' : ''}`}>
                    What We Stand For
                </span>

                <div className="ap-manifest__lines">
                    {lines.map((line, i) => (
                        <p
                            key={i}
                            className={`ap-manifest__line ${line.em ? 'ap-manifest__line--accent' : ''} ${visible ? 'ap-manifest__line--in' : ''}`}
                            style={{ transitionDelay: visible ? `${i * 90 + 120}ms` : '0ms' }}
                        >
                            {line.text}
                        </p>
                    ))}
                </div>

                <div className={`ap-manifest__cta ${visible ? 'ap--in' : ''}`}
                    style={{ transitionDelay: '0.85s' }}>
                    <a href="/contact" className="ap-btn ap-btn--light">
                        <span>Speak with our team</span>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                            <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ap-btn__fill" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <main className="about-page page-content">
            <AboutHero />
            <MissionStatement />
            <BrandPillars />
            <WhyChooseUs />
            <LekkiEpeFocus />
            <ValuesManifest />
        </main>
    )
}