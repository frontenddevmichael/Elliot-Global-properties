import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CTASection.css'

function useInView(threshold = 0.2) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
            { threshold, rootMargin: '0px 0px -40px 0px' }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, visible]
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix, triggered }) {
    const [val, setVal] = useState(0)
    const raf = useRef(null)

    useEffect(() => {
        if (!triggered) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVal(target); return
        }
        let start = null
        const run = (ts) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / 1200, 1)
            const eased = 1 - Math.pow(2, -10 * p)
            setVal(Math.floor(eased * target))
            if (p < 1) raf.current = requestAnimationFrame(run)
        }
        raf.current = requestAnimationFrame(run)
        return () => cancelAnimationFrame(raf.current)
    }, [triggered, target])

    return <>{val}{suffix}</>
}

// ─── Main CTA Section ─────────────────────────────────────────────────────────
export default function CTASection() {
    const [ref, visible] = useInView(0.15)
    const navigate = useNavigate()

    return (
        <section className="cta-section" ref={ref} aria-label="Contact call to action">

            {/* ── Background: rich layered dark with red glow ───────────── */}
            <div className="cta-section__bg" aria-hidden="true">
                {/* Radial red glow — top right */}
                <div className="cta-section__glow cta-section__glow--tr" />
                {/* Radial red glow — bottom left */}
                <div className="cta-section__glow cta-section__glow--bl" />
                {/* Survey grid overlay */}
                <svg className="cta-section__grid" width="100%" height="100%"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                        <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none"
                                stroke="rgba(209,205,198,0.05)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-grid)" />
                </svg>
                {/* Grain */}
                <div className="cta-section__grain" />
            </div>

            <div className="container cta-section__inner">

                {/* ── Left: headline + supporting text ──────────────────────── */}
                <div className="cta-section__copy">

                    <div className={`cta-section__eyebrow ${visible ? 'cta-section__eyebrow--in' : ''}`}>
                        <span className="cta-section__eyebrow-rule" aria-hidden="true" />
                        <span>Let's Talk Property</span>
                    </div>

                    <h2 className={`cta-section__headline ${visible ? 'cta-section__headline--in' : ''}`}>
                        Your next move
                        <br />
                        <em>starts here.</em>
                    </h2>

                    <p className={`cta-section__body ${visible ? 'cta-section__body--in' : ''}`}>
                        Whether you're buying your first home, growing a portfolio,
                        or seeking expert advisory — our team is ready. No generic
                        listings. No pressure. Just the right property for the right person.
                    </p>

                    {/* ── Mini proof stats ─────────────────────────────────────── */}
                    <div className={`cta-section__proof ${visible ? 'cta-section__proof--in' : ''}`}>
                        <div className="cta-section__proof-item">
                            <span className="cta-section__proof-value">
                                <Counter target={500} suffix="+" triggered={visible} />
                            </span>
                            <span className="cta-section__proof-label">Happy Clients</span>
                        </div>
                        <div className="cta-section__proof-divider" aria-hidden="true" />
                        <div className="cta-section__proof-item">
                            <span className="cta-section__proof-value">
                                <Counter target={12} suffix="yr" triggered={visible} />
                            </span>
                            <span className="cta-section__proof-label">Market Experience</span>
                        </div>
                        <div className="cta-section__proof-divider" aria-hidden="true" />
                        <div className="cta-section__proof-item">
                            <span className="cta-section__proof-value">
                                <Counter target={4} suffix="" triggered={visible} />
                            </span>
                            <span className="cta-section__proof-label">Nigerian Cities</span>
                        </div>
                    </div>
                </div>

                {/* ── Right: CTA card ───────────────────────────────────────── */}
                <div className={`cta-section__card ${visible ? 'cta-section__card--in' : ''}`}>

                    {/* Card top accent */}
                    <div className="cta-section__card-accent" aria-hidden="true" />

                    <div className="cta-section__card-inner">
                        <p className="cta-section__card-label">Get In Touch</p>
                        <h3 className="cta-section__card-heading">
                            Speak with an
                            <br />Elliot advisor today.
                        </h3>

                        <p className="cta-section__card-sub">
                            We respond to every enquiry within 24 hours.
                            Your first consultation is always complimentary.
                        </p>

                        {/* Primary CTA — navigates to contact page */}
                        <button
                            className="cta-section__btn cta-section__btn--primary"
                            onClick={() => navigate('/contact')}
                        >
                            <span className="cta-section__btn-text">Start a Conversation</span>
                            <span className="cta-section__btn-fill" aria-hidden="true" />
                            <svg className="cta-section__btn-arrow" width="18" height="10"
                                viewBox="0 0 18 10" fill="none">
                                <path d="M0 5h15M11 1l4 4-4 4"
                                    stroke="currentColor" strokeWidth="1.3"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Secondary: direct call */}
                        <a href="tel:+2341234567890" className="cta-section__btn cta-section__btn--ghost">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                            </svg>
                            <span>Call Us Directly</span>
                        </a>

                        {/* Reassurance note */}
                        <div className="cta-section__card-note">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="5" stroke="rgba(192,0,26,0.5)" strokeWidth="1" />
                                <path d="M3.5 6l2 2 3-3" stroke="#C0001A" strokeWidth="1"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>No obligation · Strictly confidential</span>
                        </div>
                    </div>

                    {/* Decorative coordinate corner */}
                    <div className="cta-section__card-coord" aria-hidden="true">
                        6.5244°N · 3.3792°E
                    </div>
                </div>

            </div>

            {/* ── Bottom red line ─────────────────────────────────────────── */}
            <div className={`cta-section__bottom-rule ${visible ? 'cta-section__bottom-rule--in' : ''}`}
                aria-hidden="true" />

        </section>
    )
}