import { useEffect, useRef, useState, useCallback } from 'react'
import './styles/Testimonials.css'

export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Chinedu Adeyemi',
        role: 'First-time Buyer',
        location: 'Ikoyi, Lagos',
        initials: 'CA',
        rating: 5,
        daysAgo: 11,
        text: 'I was nervous about buying my first home, but the process was smooth from start to finish. Everything was transparent, and I found a property that perfectly fits my budget and lifestyle.',
    },
    {
        id: 2,
        name: 'Sandra Eze',
        role: 'Property Investor',
        location: 'Victoria Island, Lagos',
        initials: 'SE',
        rating: 5,
        daysAgo: 11,
        text: 'Working with Elliot Global felt nothing like dealing with a typical agency. They understood what I needed and delivered — without pressure, without compromise.',
    },
    {
        id: 3,
        name: 'Tunde Balogun',
        role: 'Commercial Client',
        location: 'Lekki Phase 1',
        initials: 'TB',
        rating: 5,
        daysAgo: 18,
        text: 'Their advisory team helped us identify the right commercial opportunity in Lekki and closed the deal with remarkable speed and efficiency. Genuinely impressive.',
    },
    {
        id: 4,
        name: 'Amaka Okafor',
        role: 'Estate Management',
        location: 'Abuja, FCT',
        initials: 'AO',
        rating: 5,
        daysAgo: 24,
        text: 'The estate management service is second to none. My property runs smoothly, tenants are properly screened, and the monthly financial reports are always clear and on time.',
    },
    {
        id: 5,
        name: 'Kola Fashola',
        role: 'HNW Investor',
        location: 'Port Harcourt',
        initials: 'KF',
        rating: 5,
        daysAgo: 30,
        text: 'Structured advice, real market data, and an approach that respects your time. I expanded my portfolio by three properties this year — all through Elliot Global.',
    },
]

const AUTO_INTERVAL = 2500
const EXIT_MS = 380
const ENTER_MS = 560

/* ─── Stars ─────────────────────────────────────────────────── */
function Stars({ count = 5, filled = 5 }) {
    return (
        <div className="tm2-stars" aria-label={`${filled} out of ${count} stars`}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path
                        d="M6.5 1l1.5 3.05L11 4.63 8.75 6.83l.53 3.1L6.5 8.43 3.72 9.93l.53-3.1L2 4.63l3-.58L6.5 1z"
                        fill={i < filled ? '#fff' : 'transparent'}
                        stroke={i < filled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)'}
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </div>
    )
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function Testimonials() {
    const [index, setIndex] = useState(0)
    const [displayed, setDisplayed] = useState(0)
    const [phase, setPhase] = useState('idle')   // idle | exit | enter
    const [progress, setProgress] = useState(0)

    const rafRef = useRef(null)
    const startRef = useRef(null)
    const pausedRef = useRef(false)
    const lockRef = useRef(false)

    const total = TESTIMONIALS.length
    const t = TESTIMONIALS[displayed]

    /* ── Transition ────────────────────────────────────────────── */
    const goTo = useCallback((next) => {
        if (lockRef.current || next === index) return
        lockRef.current = true
        cancelAnimationFrame(rafRef.current)
        setProgress(0)
        startRef.current = null

        setPhase('exit')
        setTimeout(() => {
            setDisplayed(next)
            setIndex(next)
            setPhase('enter')
            setTimeout(() => {
                setPhase('idle')
                lockRef.current = false
            }, ENTER_MS)
        }, EXIT_MS)
    }, [index])

    const goNext = useCallback(() => goTo((index + 1) % total), [index, total, goTo])
    const goPrev = useCallback(() => goTo((index - 1 + total) % total), [index, total, goTo])

    /* ── Auto-advance + progress ───────────────────────────────── */
    const startProgress = useCallback(() => {
        cancelAnimationFrame(rafRef.current)
        startRef.current = null
        const tick = (ts) => {
            if (pausedRef.current) { rafRef.current = requestAnimationFrame(tick); return }
            if (!startRef.current) startRef.current = ts
            const elapsed = ts - startRef.current
            setProgress(Math.min((elapsed / AUTO_INTERVAL) * 100, 100))
            if (elapsed >= AUTO_INTERVAL) goNext()
            else rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
    }, [goNext])

    useEffect(() => { startProgress(); return () => cancelAnimationFrame(rafRef.current) }, [index])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goNext, goPrev])

    return (
        <section
            className="tm2"
            aria-label="Client testimonials"
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false; startRef.current = null }}
        >

            {/* ── Decorative SVG noise/grid ─────────────────────────── */}
            <svg className="tm2-bg-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric rings — bottom-right anchor */}
                {[160, 270, 390, 520, 660, 810, 970].map((r, i) => (
                    <circle key={i} cx="1200" cy="600" r={r}
                        fill="none" stroke={`rgba(255,255,255,${0.055 - i * 0.007})`} strokeWidth="0.8" />
                ))}
                {/* Horizontal rules */}
                {[0.08, 0.28, 0.5, 0.72, 0.92].map((y, i) => (
                    <line key={i} x1="0" y1={y * 600} x2="1200" y2={y * 600}
                        stroke="rgba(255,255,255,0.03)" strokeWidth="0.6" />
                ))}
                {/* Vertical rules */}
                {[0.14, 0.35, 0.57, 0.78].map((x, i) => (
                    <line key={i} x1={x * 1200} y1="0" x2={x * 1200} y2="600"
                        stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" />
                ))}
                {/* Cross-hair */}
                <line x1="1168" y1="568" x2="1200" y2="568" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
                <line x1="1184" y1="552" x2="1184" y2="584" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
            </svg>

            {/* ── Grain ────────────────────────────────────────────────── */}
            <div className="tm2-grain" aria-hidden="true" />

            <div className="tm2-inner">

                {/* ══════════════════════════════════════════════════════════
            LEFT RAIL
        ════════════════════════════════════════════════════════════ */}
                <aside className="tm2-rail">

                    {/* Brand mark */}
                    <div className="tm2-rail-brand">
                        <span className="tm2-rail-eyebrow">Elliot Global</span>
                        <span className="tm2-rail-label">Client Reviews</span>
                    </div>

                    {/* Large counter */}
                    <div className="tm2-counter-block">
                        <div className="tm2-counter-num" aria-hidden="true">
                            <span className="tm2-counter-ghost">{String(index + 1).padStart(2, '0')}</span>
                            <span className="tm2-counter-live">{String(index + 1).padStart(2, '0')}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="tm2-counter-track" role="progressbar"
                            aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                            <div className="tm2-counter-fill" style={{ width: `${progress}%` }} />
                        </div>

                        <div className="tm2-counter-fraction">
                            <span className="tm2-counter-cur">{String(index + 1).padStart(2, '0')}</span>
                            <span className="tm2-counter-sep"> / </span>
                            <span className="tm2-counter-tot">{String(total).padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Stars in rail */}
                    <div className="tm2-rail-footer">
                        <Stars filled={t.rating} />
                        <span className="tm2-rail-verdict">Exceptional</span>
                    </div>
                </aside>

                {/* ══════════════════════════════════════════════════════════
            RIGHT: QUOTE + IDENTITY
        ════════════════════════════════════════════════════════════ */}
                <div className="tm2-right">

                    {/* ── Quote stage ──────────────────────────────────────── */}
                    <div
                        className={`tm2-stage tm2-stage--${phase}`}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {/* Decorative large open-quote */}
                        <div className="tm2-deco-quote" aria-hidden="true">&ldquo;</div>

                        <blockquote className="tm2-quote">
                            <p className="tm2-quote-text">{t.text}</p>
                        </blockquote>
                    </div>

                    {/* ── Divider ──────────────────────────────────────────── */}
                    <div className="tm2-divider" aria-hidden="true" />

                    {/* ── Bottom: identity + nav ───────────────────────────── */}
                    <div className="tm2-bottom">

                        {/* Client identity */}
                        <div className={`tm2-identity tm2-identity--${phase}`}>
                            <div className="tm2-avatar-wrap">
                                <div className="tm2-avatar">{t.initials}</div>
                                <div className="tm2-avatar-ring" aria-hidden="true" />
                            </div>
                            <div className="tm2-client-info">
                                <p className="tm2-client-name">{t.name}</p>
                                <p className="tm2-client-meta">
                                    <span>{t.role}</span>
                                    <span className="tm2-dot-sep" aria-hidden="true">·</span>
                                    <span>{t.location}</span>
                                </p>
                            </div>
                            <div className="tm2-days-badge">{t.daysAgo}d ago</div>
                        </div>

                        {/* Navigation */}
                        <nav className="tm2-nav" aria-label="Testimonial navigation">
                            <div className="tm2-dots" role="tablist">
                                {TESTIMONIALS.map((item, i) => (
                                    <button
                                        key={item.id}
                                        role="tab"
                                        className={`tm2-pip${i === index ? ' tm2-pip--active' : ''}`}
                                        aria-selected={i === index}
                                        aria-label={`Review by ${item.name}`}
                                        onClick={() => goTo(i)}
                                    />
                                ))}
                            </div>
                            <div className="tm2-arrows">
                                <button className="tm2-arrow" onClick={goPrev} aria-label="Previous testimonial">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M17 7H1M6 2L1 7l5 5"
                                            stroke="currentColor" strokeWidth="1.4"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button className="tm2-arrow tm2-arrow--next" onClick={goNext} aria-label="Next testimonial">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M1 7h16M12 2l5 5-5 5"
                                            stroke="currentColor" strokeWidth="1.4"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </nav>

                    </div>
                </div>

            </div>
        </section>
    )
}