import { useEffect, useRef, useState } from 'react'
import './JoinAsRealtor.css'

const WHATSAPP_URL = 'https://chat.whatsapp.com/FDrS1b5ioeN88mWVA2O6xI?mode=gi_t'

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

// ─── Animated member avatars (placeholder stack) ──────────────────────────────
function AvatarStack() {
    const initials = ['AO', 'KF', 'BE', 'TJ', 'NG', 'SD']
    return (
        <div className="jar__avatars" aria-hidden="true">
            {initials.map((init, i) => (
                <div
                    key={init}
                    className="jar__avatar"
                    style={{ zIndex: initials.length - i, transitionDelay: `${i * 60}ms` }}
                >
                    {init}
                </div>
            ))}
            <div className="jar__avatar jar__avatar--plus">+</div>
        </div>
    )
}

// ─── WhatsApp SVG icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 22 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.003 2C6.477 2 2 6.477 2 12.003c0 1.762.46 3.412 1.265 4.847L2.05 21.95l5.246-1.19A9.96 9.96 0 0 0 12.003 22C17.523 22 22 17.523 22 12.003 22 6.477 17.523 2 12.003 2zm0 18.131a8.103 8.103 0 0 1-4.17-1.152l-.298-.177-3.12.706.75-3.024-.195-.309A8.095 8.095 0 0 1 3.87 12.003c0-4.487 3.652-8.131 8.133-8.131 4.483 0 8.131 3.644 8.131 8.131 0 4.483-3.648 8.128-8.131 8.128z" />
        </svg>
    )
}

// ─── Pulse dot — live indicator ───────────────────────────────────────────────
function PulseDot() {
    return (
        <span className="jar__pulse-wrap" aria-hidden="true">
            <span className="jar__pulse-ring" />
            <span className="jar__pulse-dot" />
        </span>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function JoinAsRealtor() {
    const [ref, visible] = useInView(0.18)
    const [clicked, setClicked] = useState(false)

    const handleJoin = () => {
        setClicked(true)
        // Brief moment so user sees the feedback, then open the link
        setTimeout(() => {
            window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')
            // Reset after a few seconds so the button is reusable
            setTimeout(() => setClicked(false), 4000)
        }, 160)
    }

    return (
        <section
            className="jar"
            ref={ref}
            aria-label="Join Elliot Global as a realtor partner"
        >
            {/* ── Background layers ─────────────────────────────────── */}
            <div className="jar__bg" aria-hidden="true">
                {/* Topographic rings */}
                <svg className="jar__topo" viewBox="0 0 900 500"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMaxYMax slice">
                    {[...Array(7)].map((_, i) => (
                        <ellipse key={i}
                            cx={900} cy={500}
                            rx={120 + i * 100} ry={60 + i * 52}
                            stroke={`rgba(255,255,255,${0.055 - i * 0.006})`}
                            strokeWidth="0.8" />
                    ))}
                    {/* Survey grid */}
                    {[150, 300, 450, 600, 750].map(x => (
                        <line key={x} x1={x} y1="0" x2={x} y2="500"
                            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    ))}
                    {[100, 200, 300, 400].map(y => (
                        <line key={y} x1="0" y1={y} x2="900" y2={y}
                            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    ))}
                </svg>

                {/* Grain overlay */}
                <div className="jar__grain" />

                {/* Giant watermark text */}
                <div className="jar__watermark" aria-hidden="true">REALTOR</div>
            </div>

            <div className="container jar__inner">

                {/* ── Left: copy ────────────────────────────────────────── */}
                <div className="jar__copy">

                    {/* Live badge */}
                    <div className={`jar__live-badge ${visible ? 'jar--in' : ''}`}>
                        <PulseDot />
                        <span>Community open now</span>
                    </div>

                    <h2 className={`jar__headline ${visible ? 'jar--in' : ''}`}
                        style={{ transitionDelay: '0.1s' }}>
                        Grow your real estate
                        <br />career with <em>Elliot Global.</em>
                    </h2>

                    <p className={`jar__body ${visible ? 'jar--in' : ''}`}
                        style={{ transitionDelay: '0.22s' }}>
                        Join our exclusive realtor community and get access to verified listings,
                        marketing support, sales training, and a commission structure that rewards
                        your hustle. Whether you're full-time or part-time — there's a place for you.
                    </p>

                    {/* Benefits */}
                    <ul className={`jar__benefits ${visible ? 'jar--in' : ''}`}
                        style={{ transitionDelay: '0.34s' }}>
                        {[
                            'Competitive commission on every deal',
                            'Verified, ready-to-sell property listings',
                            'Sales training & marketing materials',
                            'Dedicated support from our team',
                            'Flexible — work at your own pace',
                        ].map((b, i) => (
                            <li key={i} className="jar__benefit">
                                <span className="jar__benefit-dot" aria-hidden="true" />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Right: CTA card ───────────────────────────────────── */}
                <div className={`jar__card ${visible ? 'jar--in' : ''}`}
                    style={{ transitionDelay: '0.2s' }}>

                    {/* Red top accent */}
                    <div className="jar__card-accent" aria-hidden="true" />

                    <div className="jar__card-inner">

                        {/* Member social proof */}
                        <div className="jar__social-proof">
                            <AvatarStack />
                            <div className="jar__proof-text">
                                <span className="jar__proof-count">100+ realtors</span>
                                <span className="jar__proof-sub">already in our community</span>
                            </div>
                        </div>

                        {/* Card headline */}
                        <div className="jar__card-copy">
                            <p className="jar__card-eyebrow">Realtor Partner Programme</p>
                            <h3 className="jar__card-title">
                                Join the WhatsApp community
                                — it takes 10 seconds.
                            </h3>
                            <p className="jar__card-sub">
                                Click below to be added to our realtor group instantly.
                                No forms, no waiting. Just real listings and real people.
                            </p>
                        </div>

                        {/* WhatsApp CTA button */}
                        <button
                            className={`jar__cta-btn ${clicked ? 'jar__cta-btn--clicked' : ''}`}
                            onClick={handleJoin}
                            aria-label="Join Elliot Global realtor WhatsApp group"
                        >
                            <span className="jar__cta-icon">
                                <WhatsAppIcon size={22} />
                            </span>
                            <span className="jar__cta-text">
                                {clicked ? 'Opening WhatsApp…' : 'Join Our Realtor Community'}
                            </span>
                            {!clicked && (
                                <svg className="jar__cta-arrow" width="16" height="10"
                                    viewBox="0 0 16 10" fill="none" aria-hidden="true">
                                    <path d="M0 5h13M9 1l4 4-4 4"
                                        stroke="currentColor" strokeWidth="1.4"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            <span className="jar__cta-fill" aria-hidden="true" />
                        </button>

                        {/* Reassurance note */}
                        <div className="jar__note">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                aria-hidden="true">
                                <circle cx="6" cy="6" r="5"
                                    stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                <path d="M3.5 6l2 2L8.5 4"
                                    stroke="rgba(255,255,255,0.5)" strokeWidth="1"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Free to join · No commitment required · Exit anytime</span>
                        </div>

                    </div>

                    {/* Coordinate corner tag */}
                    <div className="jar__card-coord" aria-hidden="true">
                        EG · REALTOR NETWORK · LAGOS
                    </div>
                </div>

            </div>

            {/* ── Bottom strip — secondary contact ─────────────────────── */}
            <div className={`jar__footer-strip ${visible ? 'jar--in' : ''}`}
                style={{ transitionDelay: '0.5s' }}>
                <div className="container jar__footer-inner">
                    <p className="jar__footer-text">
                        Prefer to speak with someone first?
                    </p>
                    <div className="jar__footer-links">
                        <a href="tel:+2349061712509" className="jar__footer-link">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                            </svg>
                            Call us
                        </a>
                        <span className="jar__footer-sep" aria-hidden="true">·</span>

                    </div>
                </div>
            </div>
        </section>
    )
}