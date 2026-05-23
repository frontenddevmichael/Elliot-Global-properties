import { useEffect, useRef, useState, useCallback } from 'react'
import './Contact.css'

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
            { threshold, rootMargin: '0px 0px -48px 0px' }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, visible]
}


function BlueprintSVG({ active }) {
    return (
        <svg
            className={`contact__blueprint ${active ? 'contact__blueprint--drawn' : ''}`}
            viewBox="0 0 420 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Ground line */}
            <line x1="20" y1="500" x2="400" y2="500"
                className="bp__line" strokeWidth="1.5" stroke="rgba(192,0,26,0.5)" />

            {/* Main building silhouette */}
            <polyline points="60,500 60,120 210,40 360,120 360,500"
                className="bp__line" strokeWidth="1.2" stroke="rgba(248,247,245,0.6)" />

            {/* Floor lines */}
            {[420, 340, 260, 180].map((y, i) => (
                <line key={i} x1="60" y1={y} x2="360" y2={y}
                    className="bp__line"
                    style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                    strokeWidth="0.5" stroke="rgba(248,247,245,0.15)" />
            ))}

            {/* Windows — left column */}
            {[150, 230, 310, 390].map((y, i) => (
                <g key={`wl${i}`} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
                    <rect x="90" y={y - 28} width="40" height="32"
                        className="bp__rect" strokeWidth="0.7" stroke="rgba(248,247,245,0.3)" />
                    <line x1="110" y1={y - 28} x2="110" y2={y + 4}
                        strokeWidth="0.4" stroke="rgba(248,247,245,0.15)" />
                </g>
            ))}

            {/* Windows — right column */}
            {[150, 230, 310, 390].map((y, i) => (
                <g key={`wr${i}`} style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
                    <rect x="280" y={y - 28} width="40" height="32"
                        className="bp__rect" strokeWidth="0.7" stroke="rgba(248,247,245,0.3)" />
                    <line x1="300" y1={y - 28} x2="300" y2={y + 4}
                        strokeWidth="0.4" stroke="rgba(248,247,245,0.15)" />
                </g>
            ))}

            {/* Central entrance */}
            <rect x="175" y="420" width="70" height="80"
                className="bp__rect" strokeWidth="1" stroke="rgba(192,0,26,0.5)"
                style={{ animationDelay: '0.8s' }} />
            <line x1="210" y1="420" x2="210" y2="500"
                strokeWidth="0.6" stroke="rgba(192,0,26,0.3)"
                style={{ animationDelay: '0.9s' }} />

            {/* Roof triangle detail */}
            <polyline points="100,120 210,56 320,120"
                className="bp__line" strokeWidth="0.7" stroke="rgba(248,247,245,0.2)"
                style={{ animationDelay: '0.2s' }} />

            {/* Surveyor crosshairs — top */}
            <line x1="210" y1="20" x2="210" y2="44"
                strokeWidth="0.8" stroke="rgba(192,0,26,0.6)" />
            <line x1="195" y1="30" x2="225" y2="30"
                strokeWidth="0.8" stroke="rgba(192,0,26,0.6)" />
            <circle cx="210" cy="30" r="3"
                strokeWidth="0.8" stroke="rgba(192,0,26,0.6)" />

            {/* Dimension lines */}
            <line x1="30" y1="120" x2="30" y2="500"
                strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" strokeDasharray="3 4" />
            <line x1="25" y1="120" x2="35" y2="120"
                strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" />
            <line x1="25" y1="500" x2="35" y2="500"
                strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" />

         
            <text x="35" y="310" fontFamily="DM Mono, monospace"
                fontSize="8" fill="rgba(248,247,245,0.2)" letterSpacing="0.08em"
                writingMode="vertical-rl">
                14,500mm
            </text>

            {/* Grid dots */}
            {[80, 140, 200, 260, 320, 380].map(x =>
                [140, 220, 300, 380, 460].map(y =>
                    y < 510 && (
                        <circle key={`${x}${y}`} cx={x} cy={y}
                            r="1.2" fill="rgba(248,247,245,0.08)" />
                    )
                )
            )}
        </svg>
    )
}

// ─── SVG: Animated coordinate locator pin ─────────────────────────────────────
function LocationPin() {
    return (
        <div className="contact__pin" aria-hidden="true">
            <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ripple rings */}
                <circle cx="30" cy="30" r="24" className="pin__ripple pin__ripple--1"
                    stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
                <circle cx="30" cy="30" r="18" className="pin__ripple pin__ripple--2"
                    stroke="rgba(192,0,26,0.4)" strokeWidth="1" />
                {/* Pin body */}
                <path d="M30 4 C18 4 10 14 10 24 C10 38 30 62 30 62 C30 62 50 38 50 24 C50 14 42 4 30 4Z"
                    fill="var(--signal)" />
                {/* Inner dot */}
                <circle cx="30" cy="24" r="6" fill="white" />
                {/* Drop shadow line */}
                <ellipse cx="30" cy="72" rx="8" ry="2.5"
                    fill="rgba(13,13,13,0.2)" />
            </svg>
        </div>
    )
}

// ─── Animated form field ──────────────────────────────────────────────────────
function FormField({ label, type = 'text', name, index, required = false, options }) {
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const coordinateLabel = `→ 0${index}_${label.toUpperCase().replace(/\s/g, '_')}`
    const isActive = focused || hasValue

    return (
        <div className={`cf__field ${isActive ? 'cf__field--active' : ''} ${focused ? 'cf__field--focused' : ''}`}>
            <label className="cf__label" htmlFor={name}>
                <span className="cf__label-default">{label}</span>
                <span className="cf__label-active">{coordinateLabel}</span>
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={name} name={name}
                    className="cf__input cf__textarea"
                    rows={4} required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value) }}
                    onChange={(e) => setHasValue(!!e.target.value)}
                />
            ) : type === 'select' ? (
                <select
                    id={name} name={name}
                    className="cf__input cf__select"
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); setHasValue(e.target.value !== '') }}
                    onChange={(e) => setHasValue(e.target.value !== '')}
                    defaultValue=""
                >
                    <option value="" disabled />
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            ) : (
                <input
                    id={name} name={name}
                    type={type} required={required}
                    className="cf__input"
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value) }}
                    onChange={(e) => setHasValue(!!e.target.value)}
                />
            )}

            {/* Animated underline */}
            <div className="cf__underline">
                <div className="cf__underline-base" />
                <div className="cf__underline-active" />
            </div>
        </div>
    )
}

// ─── Contact info item ────────────────────────────────────────────────────────
function InfoItem({ icon, label, value, href, delay = 0, visible }) {
    const content = (
        <div
            className={`ci__item ${visible ? 'ci__item--in' : ''}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            <div className="ci__icon" aria-hidden="true">{icon}</div>
            <div className="ci__text">
                <span className="ci__label">{label}</span>
                <span className="ci__value">{value}</span>
            </div>
        </div>
    )
    return href
        ? <a href={href} className="ci__link" aria-label={`${label}: ${value}`}>{content}</a>
        : <div>{content}</div>
}

// ─── Form success state ───────────────────────────────────────────────────────
function FormSuccess() {
    return (
        <div className="cf__success">
            <div className="cf__success-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30"
                        stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
                    <circle cx="32" cy="32" r="30"
                        stroke="var(--signal)" strokeWidth="1"
                        strokeDasharray="188.5"
                        className="cf__success-ring" />
                    <path d="M18 32l10 10 18-18"
                        stroke="var(--signal)" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="cf__success-check" />
                </svg>
            </div>
            <h3 className="cf__success-title">Message received.</h3>
            <p className="cf__success-body">
                We'll be in touch within 24 hours.
                Your first consultation is always complimentary.
            </p>
            <p className="cf__success-coord">6.5244°N · 3.3792°E · LAGOS</p>
        </div>
    )
}

// ─── Main Contact Page ────────────────────────────────────────────────────────
export default function Contact() {

    const sectionRef = useRef(null)

    useEffect(() => {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }, [])
    
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)
    const [blueprintActive, setBlueprintActive] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const heroRef = useRef(null)
    const [infoRef, infoVisible] = useInView(0.2)
    const [formRef, formVisible] = useInView(0.15)

    // Blueprint draws in on mount
    useEffect(() => {
        const t = setTimeout(() => setBlueprintActive(true), 300)
        return () => clearTimeout(t)
    }, [])

    // Hero parallax on mouse move
    useEffect(() => {
        const onMove = (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return
            const x = (e.clientX / window.innerWidth - 0.5) * 18
            const y = (e.clientY / window.innerHeight - 0.5) * 10
            setMousePos({ x, y })
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const name = formData.get('name')
        const phone = formData.get('phone')
        const email = formData.get('email')
        const interest = formData.get('interest')
        const message = formData.get('message')

        const text = `
New Client Enquiry

Name: ${name}
Phone: ${phone}
Email: ${email}
Interest: ${interest}

Message:
${message}
    `

        const whatsappURL =
            `https://wa.me/2349061712509?text=${encodeURIComponent(text)}`

        window.open(whatsappURL, '_blank')
        formData.forEach((_, key) => e.target.elements[key].value = '')
        setSubmitted(true)
    }

    return (
        <main className="contact page-content">

            {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO BANNER
      ══════════════════════════════════════════════════════════ */}
            <section className="contact__hero" ref={heroRef} aria-label="Contact Elliot Global">
                    <div ref={sectionRef}></div>
                <div className="contact__hero-bg" aria-hidden="true">
                    {/* Survey grid */}
                    <svg className="contact__hero-grid" width="100%" height="100%">
                        <defs>
                            <pattern id="contact-grid" width="72" height="72" patternUnits="userSpaceOnUse">
                                <path d="M 72 0 L 0 0 0 72"
                                    fill="none" stroke="rgba(209,205,198,0.06)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#contact-grid)" />
                    </svg>

                    {/* Red atmospheric glow */}
                    <div className="contact__hero-glow" />
                </div>

                {/* Blueprint SVG — parallax on mouse */}
                <div
                    className="contact__blueprint-wrap"
                    style={{
                        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    }}
                    aria-hidden="true"
                >
                    <BlueprintSVG active={blueprintActive} />
                </div>

                {/* Location pin — animated */}
                <LocationPin />

                {/* Hero copy */}
                <div className="container contact__hero-inner">
                    <div className="contact__hero-copy">

                        <div className="contact__hero-eyebrow">
                            <span className="contact__eyebrow-line" aria-hidden="true" />
                            <span>Get In Touch</span>
                        </div>

                        <h1 className="contact__hero-h1">
                            Let's find your
                            <br /><em>next property.</em>
                        </h1>

                        <p className="contact__hero-lead">
                            Whether you're buying, selling, or seeking
                            strategic advisory — our team responds to
                            every enquiry within 24 hours. No obligation.
                            Always confidential.
                        </p>

                        {/* Quick action pills */}
                        <div className="contact__hero-actions">
                            <a href="tel:+2348086949157" className="contact__pill contact__pill--light">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                                </svg>
                                Call us directly
                            </a>
                            <a href="mailto:hello@elliotglobal.ng" className="contact__pill contact__pill--ghost">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Email us
                            </a>
                        </div>
                    </div>

                    {/* Coordinate badge — bottom right */}
                    <div className="contact__hero-coord" aria-hidden="true">
                        <span className="contact__coord-label">OFFICE LOCATION</span>
                        <span className="contact__coord-value">6.5244°N · 3.3792°E</span>
                        <span className="contact__coord-city">Victoria Island, Lagos</span>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="contact__scroll-cue" aria-hidden="true">
                    <div className="contact__scroll-line" />
                    <span className="contact__scroll-label">Scroll</span>
                </div>
            </section>

            <section className="contact__info-strip" ref={infoRef} aria-label="Contact details">
                <div className="container contact__info-inner">

                    <InfoItem
                        visible={infoVisible} delay={0}
                        label="Phone"
                        value="+2348086949157"
                        href="tel:+2348086949157"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                            </svg>
                        }
                    />

                    <div className="ci__divider" aria-hidden="true" />

                    <InfoItem
                        visible={infoVisible} delay={100}
                        label="Email"
                        value="hello@elliotglobal.ng"
                        href="mailto:hello@elliotglobal.ng"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        }
                    />

                    <div className="ci__divider" aria-hidden="true" />

                    <InfoItem
                        visible={infoVisible} delay={200}
                        label="Office Hours"
                        value="Mon – Fri · 8AM – 6PM WAT"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        }
                    />

                    <div className="ci__divider" aria-hidden="true" />

                    <InfoItem
                        visible={infoVisible} delay={300}
                        label="Address"
                        value="Victoria Island, Lagos"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        }
                    />

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          SECTION 3 — FORM + MAP SPLIT
      ══════════════════════════════════════════════════════════ */}
            <section className="contact__main" aria-label="Contact form">
                <div className="contact__split">

                    {/* LEFT — form panel */}
                    <div
                        className={`contact__form-panel ${formVisible ? 'contact__form-panel--in' : ''}`}
                        ref={formRef}
                    >
                        <div className="contact__form-header">
                            <span className="contact__form-eyebrow">Send a Message</span>
                            <h2 className="contact__form-title">
                                Start the
                                <br /><em>conversation.</em>
                            </h2>
                            <p className="contact__form-sub">
                                Every enquiry is reviewed personally by our team.
                                We respond within 24 hours, every time.
                            </p>
                        </div>

                        {submitted ? (
                            <FormSuccess />
                        ) : (
                            <form
                                className="contact__form"
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <div className="cf__row cf__row--half">
                                    <FormField label="Full Name" name="name" index={1} required />
                                    <FormField label="Phone Number" name="phone" index={2} type="tel" required />
                                </div>

                                <FormField label="Email Address" name="email" index={3} type="email" required />

                                <FormField
                                    label="I'm interested in"
                                    name="interest"
                                    index={4}
                                    type="select"
                                    required
                                    options={[
                                        'Property Purchase',
                                        'Property Sale',
                                        'Building & Construction',
                                        'Estate Management',
                                        'Investment Advisory',
                                        'General Enquiry',
                                    ]}
                                />

                                <FormField label="Your Message" name="message" index={5} type="textarea" required />

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className={`cf__submit ${sending ? 'cf__submit--sending' : ''}`}
                                    disabled={sending}
                                >
                                    <span className="cf__submit-text">
                                        {sending ? 'Sending…' : 'Send Message'}
                                    </span>
                                    <span className="cf__submit-fill" aria-hidden="true" />
                                    {!sending && (
                                        <svg className="cf__submit-arrow" width="20" height="12"
                                            viewBox="0 0 20 12" fill="none">
                                            <path d="M0 6h17M12 1l5 5-5 5"
                                                stroke="currentColor" strokeWidth="1.4"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    {sending && (
                                        <span className="cf__spinner" aria-hidden="true" />
                                    )}
                                </button>

                                <p className="cf__disclaimer">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <circle cx="6" cy="6" r="5" stroke="rgba(13,13,13,0.25)" strokeWidth="1" />
                                        <path d="M4 6l1.5 1.5L8 4"
                                            stroke="rgba(13,13,13,0.4)" strokeWidth="1"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    No obligation · 100% confidential · Response within 24 hrs
                                </p>
                            </form>
                        )}
                    </div>

                    {/* RIGHT — decorative map panel */}
                    <div className="contact__map-panel" aria-hidden="true">

                        {/* SVG Nigeria map placeholder with styling */}
                        <div className="contact__map-visual">

                            {/* Topographic concentric rings */}
                            <svg className="contact__map-topo"
                                viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {[...Array(8)].map((_, i) => (
                                    <circle key={i}
                                        cx="250" cy="280" r={50 + i * 52}
                                        stroke={`rgba(192,0,26,${0.12 - i * 0.012})`}
                                        strokeWidth="1" />
                                ))}
                                {/* Grid */}
                                {[100, 200, 300, 400].map(x => (
                                    <line key={`mx${x}`} x1={x} y1="0" x2={x} y2="500"
                                        stroke="rgba(209,205,198,0.06)" strokeWidth="0.5" />
                                ))}
                                {[100, 200, 300, 400].map(y => (
                                    <line key={`my${y}`} x1="0" y1={y} x2="500" y2={y}
                                        stroke="rgba(209,205,198,0.06)" strokeWidth="0.5" />
                                ))}
                                {/* Active location dot with pulse */}
                                <circle cx="250" cy="280" r="6" fill="var(--signal)" />
                                <circle cx="250" cy="280" r="6"
                                    fill="none" stroke="rgba(192,0,26,0.4)" strokeWidth="1"
                                    className="map__pulse map__pulse--1" />
                                <circle cx="250" cy="280" r="6"
                                    fill="none" stroke="rgba(192,0,26,0.2)" strokeWidth="1"
                                    className="map__pulse map__pulse--2" />
                                {/* City labels */}
                                {[
                                    { x: 250, y: 268, label: 'Lagos' },
                                    { x: 310, y: 170, label: 'Edo' },
                                    { x: 350, y: 320, label: 'Uyo' },
                                    { x: 290, y: 240, label: 'Ogun' },
                                ].map(city => (
                                    <g key={city.label}>
                                        <circle cx={city.x} cy={city.y + 12} r="2.5"
                                            fill="rgba(192,0,26,0.4)" />
                                        <text x={city.x + 6} y={city.y + 16}
                                            fontFamily="DM Mono, monospace"
                                            fontSize="9" fill="rgba(13,13,13,0.35)"
                                            letterSpacing="0.08em">
                                            {city.label}
                                        </text>
                                    </g>
                                ))}
                            </svg>

                            {/* Map info card */}
                            <div className="contact__map-card">
                                <div className="contact__map-card-dot" />
                                <div>
                                    <p className="contact__map-card-name">Elliot Global Properties</p>
                                    <p className="contact__map-card-addr">Victoria Island, Lagos, Nigeria</p>
                                    <p className="contact__map-card-coord">6.5244°N · 3.3792°E</p>
                                </div>
                            </div>

                            {/* Office hours badge */}
                            <div className="contact__map-hours">
                                <span className="contact__hours-dot" />
                                <span className="contact__hours-text">Open today · 8AM – 6PM WAT</span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </main>
    )
}