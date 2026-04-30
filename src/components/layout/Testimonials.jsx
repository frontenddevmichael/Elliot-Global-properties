import { useEffect, useRef, useState, useCallback } from 'react'
import './styles/Testimonials.css'


export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Chinedu A.',
        role: 'First-time Buyer',
        avatar: null,
        initials: 'CA',
        rating: 5,
        daysAgo: 11,
        text: 'I was honestly nervous about buying my first home, but the process was smooth from start to finish. Everything was transparent, and I found a property that perfectly fits my budget and lifestyle.',
    },
    {
        id: 2,
        name: 'Sandra E.',
        role: 'Property Investor',
        avatar: null,
        initials: 'SE',
        rating: 5,
        daysAgo: 11,
        text: 'Working with Elliot Global felt nothing like dealing with a typical agency. They actually understood what I was looking for — and delivered it without unnecessary back and forth.',
    },
    {
        id: 3,
        name: 'Tunde B.',
        role: 'Commercial Client',
        avatar: null,
        initials: 'TB',
        rating: 5,
        daysAgo: 18,
        text: 'Elliot Global understood our commercial needs immediately. Their advisory team helped us identify the right opportunity in Lekki and closed the deal with remarkable efficiency.',
    },
    {
        id: 4,
        name: 'Amaka O.',
        role: 'Estate Management',
        avatar: null,
        initials: 'AO',
        rating: 5,
        daysAgo: 24,
        text: 'The estate management service is second to none. My property is always well-maintained, tenants are screened properly, and I receive transparent financial reports every month.',
    },
    {
        id: 5,
        name: 'Kola F.',
        role: 'HNW Investor',
        avatar: null,
        initials: 'KF',
        rating: 5,
        daysAgo: 30,
        text: 'Their investment consultancy gave me clarity I did not have before. Structured advice, real market data, and an approach that respected my time. I expanded my portfolio by three properties this year.',
    },
    {
        id: 6,
        name: 'Ngozi M.',
        role: 'Residential Buyer',
        avatar: null,
        initials: 'NM',
        rating: 4,
        daysAgo: 35,
        text: 'From the very first call I knew this was a different kind of firm. No pressure, no generic listings. They listened, understood exactly what I needed, and found it.',
    },
]

const AUTO_INTERVAL = 6000   // ms per slide
// Transition phases (must sum to roughly the full transition feel)
const PHASE_OUT = 420        // ms — active card exits
const PHASE_IN = 520        // ms — new card enters (slightly longer = premium feel)

// ─── Transition phases ─────────────────────────────────────────────────────
// 'idle'    — no transition happening
// 'exiting' — current card is animating out
// 'entering'— new card is animating in
// ──────────────────────────────────────────────────────────────────────────

// ─── Star rating ──────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }) {
    return (
        <div className="tm__stars" aria-label={`${rating} out of ${max} stars`}>
            {Array.from({ length: max }).map((_, i) => (
                <svg
                    key={i}
                    className={`tm__star ${i < rating ? 'tm__star--filled' : 'tm__star--empty'}`}
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.815L9 12.27l-4.326 2.54.826-4.815L2 6.583l4.837-.703L9 1.5z"
                        fill={i < rating ? '#F59E0B' : 'none'}
                        stroke={i < rating ? '#F59E0B' : 'rgba(13,13,13,0.2)'}
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </div>
    )
}

// ─── Avatar ───────────────────────────────────────────────────────────────
function Avatar({ avatar, initials, name }) {
    const [err, setErr] = useState(false)
    if (avatar && !err) {
        return <img src={avatar} alt={name} className="tm__avatar-img" onError={() => setErr(true)} />
    }
    return <div className="tm__avatar-initials" aria-label={name}>{initials}</div>
}

// ─── Progress bar ─────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
    return (
        <div className="tm__progress" aria-hidden="true">
            <div className="tm__progress-track">
                <div className="tm__progress-fill" style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}

// ─── Main component ───────────────────────────────────────────────────────
export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [displayIndex, setDisplayIndex] = useState(0)  // what card is actually rendered
    const [phase, setPhase] = useState('idle')  // 'idle' | 'exiting' | 'entering'
    const [direction, setDirection] = useState('next')
    const [progress, setProgress] = useState(0)

    const rafRef = useRef(null)
    const startRef = useRef(null)
    const pausedRef = useRef(false)
    const animatingRef = useRef(false)

    const total = TESTIMONIALS.length
    const nextIdx = (activeIndex + 1) % total

    // ── Premium three-phase transition ─────────────────────────────────────
    const goTo = useCallback((nextIndex, dir = 'next') => {
        if (animatingRef.current) return
        animatingRef.current = true
        cancelAnimationFrame(rafRef.current)
        setProgress(0)
        startRef.current = null
        setDirection(dir)

        // Phase 1: exit current card
        setPhase('exiting')

        setTimeout(() => {
            // Swap the card mid-animation (invisible moment)
            setDisplayIndex(nextIndex)
            setActiveIndex(nextIndex)
            setPhase('entering')

            setTimeout(() => {
                setPhase('idle')
                animatingRef.current = false
            }, PHASE_IN)

        }, PHASE_OUT)
    }, [])

    const goNext = useCallback(() => {
        goTo((activeIndex + 1) % total, 'next')
    }, [activeIndex, total, goTo])

    const goPrev = useCallback(() => {
        goTo((activeIndex - 1 + total) % total, 'prev')
    }, [activeIndex, total, goTo])

    // ── rAF progress bar + auto-advance ────────────────────────────────────
    const startProgress = useCallback(() => {
        cancelAnimationFrame(rafRef.current)
        startRef.current = null

        const tick = (ts) => {
            if (pausedRef.current) { rafRef.current = requestAnimationFrame(tick); return }
            if (!startRef.current) startRef.current = ts
            const elapsed = ts - startRef.current
            const pct = Math.min((elapsed / AUTO_INTERVAL) * 100, 100)
            setProgress(pct)
            if (elapsed >= AUTO_INTERVAL) {
                goNext()
            } else {
                rafRef.current = requestAnimationFrame(tick)
            }
        }
        rafRef.current = requestAnimationFrame(tick)
    }, [goNext])

    useEffect(() => {
        startProgress()
        return () => cancelAnimationFrame(rafRef.current)
    }, [activeIndex]) // restart on each new slide

    // ── Keyboard ────────────────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goNext, goPrev])

    const onMouseEnter = () => { pausedRef.current = true }
    const onMouseLeave = () => { pausedRef.current = false }

    const peek = TESTIMONIALS[nextIdx]
    const card = TESTIMONIALS[displayIndex]

    return (
        <section
            className="tm"
            aria-label="Client testimonials"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="container">

                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="tm__header">
                    <p className="tm__eyebrow">Client Reviews</p>
                    <h2 className="tm__headline">
                        Read Reviews,
                        <br /><strong>Get with confidence</strong>
                    </h2>
                </div>

                {/* ── Layout ────────────────────────────────────────────── */}
                <div className="tm__layout">

                    {/* LEFT SIDEBAR */}
                    <div className="tm__sidebar">
                        <div className="tm__big-quote" aria-hidden="true">"</div>

                        <p className="tm__sidebar-label">
                            What People
                            <br /><em>Are Saying</em>
                        </p>

                        {/* Controls: prev ── progress ── next */}
                        <div className="tm__controls">
                            <button className="tm__arrow" onClick={goPrev} aria-label="Previous">
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                                    <path d="M19 7H1M7 1L1 7l6 6"
                                        stroke="currentColor" strokeWidth="1.4"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <ProgressBar progress={progress} />

                            <button className="tm__arrow" onClick={goNext} aria-label="Next">
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                                    <path d="M1 7h18M13 1l6 6-6 6"
                                        stroke="currentColor" strokeWidth="1.4"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Pill dots */}
                        <div className="tm__dots" role="tablist">
                            {TESTIMONIALS.map((t, i) => (
                                <button
                                    key={t.id}
                                    role="tab"
                                    className={`tm__dot ${i === activeIndex ? 'tm__dot--active' : ''}`}
                                    aria-selected={i === activeIndex}
                                    aria-label={`Review by ${t.name}`}
                                    onClick={() => goTo(i, i > activeIndex ? 'next' : 'prev')}
                                />
                            ))}
                        </div>

                        {/* Counter */}
                        <p className="tm__counter" aria-live="polite">
                            <span className="tm__counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className="tm__counter-sep"> / </span>
                            <span className="tm__counter-total">{String(total).padStart(2, '0')}</span>
                        </p>
                    </div>

                    {/* RIGHT: main card + peek */}
                    <div className="tm__stage">

                        {/* ── MAIN CARD ────────────────────────────────────── */}
                        <div
                            className={`tm__card-wrap tm__card-wrap--${phase} tm__card-wrap--${direction}`}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <div className="tm__card">
                                {/* Top: rating + role tag */}
                                <div className="tm__card-top">
                                    <StarRating rating={card.rating} />
                                    <span className="tm__card-role">{card.role}</span>
                                </div>

                                {/* Quote */}
                                <div className="tm__card-body">
                                    <span className="tm__card-open-quote" aria-hidden="true">"</span>
                                    <p className="tm__card-text">{card.text}</p>
                                </div>

                                {/* Footer */}
                                <div className="tm__card-footer">
                                    <div className="tm__avatar">
                                        <Avatar avatar={card.avatar} initials={card.initials} name={card.name} />
                                    </div>
                                    <div className="tm__card-meta">
                                        <p className="tm__card-name">{card.name}</p>
                                        <p className="tm__card-since">{card.daysAgo} days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── PEEK CARD — ~25% of next card shows at right edge ── */}
                        <div
                            className="tm__peek"
                            aria-hidden="true"
                            onClick={goNext}
                        >
                            <div className="tm__peek-inner">
                                <div className="tm__peek-top">
                                    <StarRating rating={peek.rating} />
                                </div>
                                <p className="tm__peek-text">{peek.text}</p>
                                <div className="tm__peek-footer">
                                    <div className="tm__avatar tm__avatar--small">
                                        <Avatar avatar={peek.avatar} initials={peek.initials} name={peek.name} />
                                    </div>
                                    <span className="tm__peek-name">{peek.name}</span>
                                </div>
                            </div>
                            {/* Frosted fade gradient over peek — makes it feel "next" */}
                            <div className="tm__peek-fade" aria-hidden="true" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}