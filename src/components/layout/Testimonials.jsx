import { useEffect, useRef, useState, useCallback } from 'react'
import "./styles/Testimonials.css"
export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Chinedu Adeyemi',
        role: 'First-time Buyer',
        location: 'Ikoyi, Lagos',
        avatar: null,
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
        avatar: null,
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
        avatar: null,
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
        avatar: null,
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
        avatar: null,
        initials: 'KF',
        rating: 5,
        daysAgo: 30,
        text: 'Structured advice, real market data, and an approach that respects your time. I expanded my portfolio by three properties this year — all through Elliot Global.',
    },
]

const AUTO_INTERVAL = 7000
const EXIT_DURATION = 500
const ENTER_DURATION = 700

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5, light = false }) {
    return (
        <div className="tm__stars" aria-label={`${rating} out of ${max} stars`}>
            {Array.from({ length: max }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                        d="M7 1l1.62 3.28L12 4.9 9.5 7.3l.59 3.44L7 9.1 3.91 10.74 4.5 7.3 2 4.9l3.38-.62L7 1z"
                        fill={i < rating
                            ? (light ? 'rgba(255,255,255,0.9)' : '#F59E0B')
                            : 'transparent'}
                        stroke={i < rating
                            ? (light ? 'rgba(255,255,255,0.8)' : '#F59E0B')
                            : (light ? 'rgba(255,255,255,0.25)' : 'rgba(13,13,13,0.18)')}
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </div>
    )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ avatar, initials, name, size = 'md' }) {
    const [err, setErr] = useState(false)
    if (avatar && !err) {
        return <img src={avatar} alt={name} className="tm__avatar-img" onError={() => setErr(true)} />
    }
    return (
        <div className={`tm__avatar-initials tm__avatar-initials--${size}`} aria-label={name}>
            {initials}
        </div>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Testimonials() {
    const [active, setActive] = useState(0)
    const [display, setDisplay] = useState(0)
    const [phase, setPhase] = useState('idle')   // idle | exiting | entering
    const [direction, setDirection] = useState('next')
    const [progress, setProgress] = useState(0)

    const rafRef = useRef(null)
    const startRef = useRef(null)
    const pausedRef = useRef(false)
    const lockRef = useRef(false)

    const total = TESTIMONIALS.length

    // ── Three-phase cinematic transition ─────────────────────────────────────
    const goTo = useCallback((next, dir = 'next') => {
        if (lockRef.current) return
        lockRef.current = true
        cancelAnimationFrame(rafRef.current)
        setProgress(0)
        startRef.current = null
        setDirection(dir)

        setPhase('exiting')

        setTimeout(() => {
            setDisplay(next)
            setActive(next)
            setPhase('entering')
            setTimeout(() => {
                setPhase('idle')
                lockRef.current = false
            }, ENTER_DURATION)
        }, EXIT_DURATION)
    }, [])

    const goNext = useCallback(() => goTo((active + 1) % total, 'next'), [active, total, goTo])
    const goPrev = useCallback(() => goTo((active - 1 + total) % total, 'prev'), [active, total, goTo])

    // ── rAF progress + auto-advance ───────────────────────────────────────────
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

    useEffect(() => {
        startProgress()
        return () => cancelAnimationFrame(rafRef.current)
    }, [active])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goNext, goPrev])

    const t = TESTIMONIALS[display]

    return (
        <section
            className="tm"
            aria-label="Client testimonials"
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false }}
        >

            {/* ── Background decorative SVG ──────────────────────────────── */}
            <div className="tm__bg-art" aria-hidden="true">
                {/* Concentric survey rings from bottom-right */}
                <svg width="100%" height="100%" viewBox="0 0 900 600"
                    preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg">
                    {[...Array(7)].map((_, i) => (
                        <circle key={i}
                            cx={900} cy={600}
                            r={120 + i * 95}
                            fill="none"
                            stroke={`rgba(255,255,255,${0.04 - i * 0.004})`}
                            strokeWidth="1"
                        />
                    ))}
                    {/* Survey grid lines */}
                    {[...Array(5)].map((_, i) => (
                        <line key={`h${i}`}
                            x1="0" y1={120 * i + 40} x2="900" y2={120 * i + 40}
                            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"
                        />
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <line key={`v${i}`}
                            x1={150 * i + 30} y1="0" x2={150 * i + 30} y2="600"
                            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"
                        />
                    ))}
                    {/* Crosshair at bottom right */}
                    <line x1="870" y1="560" x2="900" y2="560" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                    <line x1="885" y1="545" x2="885" y2="575" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                </svg>
            </div>

            {/* ── Grain ─────────────────────────────────────────────────── */}
            <div className="tm__grain" aria-hidden="true" />

            <div className="container tm__inner">

                {/* ── TOP: section label row ──────────────────────────────── */}
                <div className="tm__top-row">
                    <div className="tm__top-left">
                        <span className="tm__eyebrow">Client Reviews</span>
                        <h2 className="tm__headline">
                            What our clients
                            <br /><em>say about us.</em>
                        </h2>
                    </div>

                    {/* Counter + progress */}
                    <div className="tm__top-right">
                        <div className="tm__count-display">
                            <span className="tm__count-active">{String(active + 1).padStart(2, '0')}</span>
                            <div className="tm__count-bar">
                                <div className="tm__count-bar-fill" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="tm__count-total">{String(total).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* ── MAIN QUOTE STAGE ────────────────────────────────────── */}
                <div
                    className={`tm__stage tm__stage--${phase} tm__stage--${direction}`}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* Decorative large quote mark — stays put, content shifts */}
                    <div className="tm__deco-quote" aria-hidden="true">"</div>

                    {/* The quote text — this is the hero of this section */}
                    <blockquote className="tm__quote">
                        <p className="tm__quote-text">{t.text}</p>
                    </blockquote>

                    {/* Stars */}
                    <div className="tm__rating-row">
                        <StarRating rating={t.rating} light />
                        <span className="tm__rating-label">
                            {t.rating === 5 ? 'Exceptional experience' : 'Great experience'}
                        </span>
                    </div>
                </div>

                {/* ── BOTTOM: client info + navigation ────────────────────── */}
                <div className="tm__bottom-row">

                    {/* Client identity */}
                    <div
                        className={`tm__client tm__client--${phase} tm__client--${direction}`}
                    >
                        <div className="tm__avatar-wrap">
                            <Avatar avatar={t.avatar} initials={t.initials} name={t.name} />
                            {/* Red ring on avatar */}
                            <div className="tm__avatar-ring" aria-hidden="true" />
                        </div>
                        <div className="tm__client-info">
                            <p className="tm__client-name">{t.name}</p>
                            <p className="tm__client-role">
                                {t.role}
                                <span className="tm__client-sep" aria-hidden="true"> · </span>
                                {t.location}
                            </p>
                        </div>
                    </div>

                    {/* Navigation arrows + dots */}
                    <div className="tm__nav">
                        <div className="tm__dots" role="tablist">
                            {TESTIMONIALS.map((item, i) => (
                                <button
                                    key={item.id}
                                    role="tab"
                                    className={`tm__dot ${i === active ? 'tm__dot--active' : ''}`}
                                    aria-selected={i === active}
                                    aria-label={`Review by ${item.name}`}
                                    onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                                />
                            ))}
                        </div>
                        <div className="tm__arrows">
                            <button
                                className="tm__arrow"
                                onClick={goPrev}
                                aria-label="Previous testimonial"
                            >
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                                    <path d="M21 8H1M7 2L1 8l6 6"
                                        stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className="tm__arrow tm__arrow--next"
                                onClick={goNext}
                                aria-label="Next testimonial"
                            >
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                                    <path d="M1 8h20M15 2l6 6-6 6"
                                        stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}