import { useEffect, useRef, useState } from 'react'
import './ServicesPage.css'

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
            { threshold, rootMargin: '0px 0px -60px 0px' }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, visible]
}

// ─── useScrollProgress ────────────────────────────────────────────────────────
function useScrollProgress(containerRef) {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            const el = containerRef?.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const total = rect.height - window.innerHeight
            const scrolled = Math.max(0, -rect.top)
            setProgress(Math.min(scrolled / total, 1))
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [containerRef])
    return progress
}

// ─── SVG ILLUSTRATIONS ────────────────────────────────────────────────────────

// Real Estate — key + building outline
function RealEstateSVG({ drawn }) {
    return (
        <svg className={`sp-svg ${drawn ? 'sp-svg--drawn' : ''}`}
            viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Building main */}
            <polyline points="40,260 40,100 160,40 280,100 280,260"
                className="sp-svg__path" strokeWidth="1.2" stroke="currentColor" />
            {/* Floor lines */}
            {[180, 140, 100].map((y, i) => (
                <line key={i} x1="40" y1={y} x2="280" y2={y}
                    className="sp-svg__path" strokeWidth="0.5"
                    stroke="currentColor" opacity="0.3"
                    style={{ '--delay': `${0.3 + i * 0.1}s` }} />
            ))}
            {/* Windows left */}
            {[155, 195, 235].map((y, i) => (
                <rect key={`wl${i}`} x="70" y={y - 20} width="36" height="26"
                    className="sp-svg__path" strokeWidth="0.8" stroke="currentColor"
                    style={{ '--delay': `${0.5 + i * 0.08}s` }} />
            ))}
            {/* Windows right */}
            {[155, 195, 235].map((y, i) => (
                <rect key={`wr${i}`} x="216" y={y - 20} width="36" height="26"
                    className="sp-svg__path" strokeWidth="0.8" stroke="currentColor"
                    style={{ '--delay': `${0.6 + i * 0.08}s` }} />
            ))}
            {/* Door */}
            <rect x="132" y="208" width="56" height="52"
                className="sp-svg__path" strokeWidth="1" stroke="rgba(192,0,26,0.7)"
                style={{ '--delay': '0.8s' }} />
            {/* Roof triangle */}
            <polyline points="80,100 160,54 240,100"
                className="sp-svg__path" strokeWidth="0.6" stroke="currentColor" opacity="0.3"
                style={{ '--delay': '0.25s' }} />
            {/* Ground line */}
            <line x1="20" y1="260" x2="300" y2="260"
                className="sp-svg__path" strokeWidth="1.5" stroke="rgba(192,0,26,0.5)"
                style={{ '--delay': '0.1s' }} />
            {/* Key icon — bottom left */}
            <g style={{ '--delay': '1s' }}>
                <circle cx="60" cy="230" r="14" className="sp-svg__path"
                    strokeWidth="1" stroke="rgba(192,0,26,0.5)" />
                <circle cx="60" cy="230" r="5" className="sp-svg__path"
                    strokeWidth="1" stroke="rgba(192,0,26,0.5)" />
                <line x1="74" y1="230" x2="100" y2="230"
                    className="sp-svg__path" strokeWidth="1" stroke="rgba(192,0,26,0.5)" />
                <line x1="94" y1="230" x2="94" y2="240"
                    className="sp-svg__path" strokeWidth="1" stroke="rgba(192,0,26,0.5)" />
                <line x1="86" y1="230" x2="86" y2="238"
                    className="sp-svg__path" strokeWidth="1" stroke="rgba(192,0,26,0.5)" />
            </g>
            {/* Crosshair */}
            <line x1="160" y1="15" x2="160" y2="35" stroke="rgba(192,0,26,0.5)" strokeWidth="0.8" />
            <line x1="148" y1="25" x2="172" y2="25" stroke="rgba(192,0,26,0.5)" strokeWidth="0.8" />
            <circle cx="160" cy="25" r="3" stroke="rgba(192,0,26,0.5)" strokeWidth="0.8" />
            {/* Dimension lines */}
            <line x1="18" y1="100" x2="18" y2="260"
                strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" strokeDasharray="3 4" />
            <line x1="14" y1="100" x2="22" y2="100" strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" />
            <line x1="14" y1="260" x2="22" y2="260" strokeWidth="0.5" stroke="rgba(192,0,26,0.25)" />
            {/* Coordinate label */}
            <text x="26" y="186" fontFamily="DM Mono, monospace" fontSize="7"
                fill="rgba(192,0,26,0.4)" letterSpacing="0.08em"
                writingMode="vertical-rl">EG-RE · 001</text>
        </svg>
    )
}

// Building & Construction — blueprint floorplan
function ConstructionSVG({ drawn }) {
    return (
        <svg className={`sp-svg ${drawn ? 'sp-svg--drawn' : ''}`}
            viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer wall */}
            <rect x="30" y="30" width="260" height="220"
                className="sp-svg__path" strokeWidth="2" stroke="currentColor"
                style={{ '--delay': '0.1s' }} />
            {/* Room dividers */}
            <line x1="160" y1="30" x2="160" y2="170"
                className="sp-svg__path" strokeWidth="1.2" stroke="currentColor"
                style={{ '--delay': '0.3s' }} />
            <line x1="30" y1="170" x2="290" y2="170"
                className="sp-svg__path" strokeWidth="1.2" stroke="currentColor"
                style={{ '--delay': '0.4s' }} />
            <line x1="200" y1="170" x2="200" y2="250"
                className="sp-svg__path" strokeWidth="1.2" stroke="currentColor"
                style={{ '--delay': '0.5s' }} />
            {/* Doors as arcs */}
            <path d="M 160 80 A 30 30 0 0 0 190 110" className="sp-svg__path"
                strokeWidth="0.8" stroke="rgba(192,0,26,0.5)"
                style={{ '--delay': '0.65s' }} />
            <line x1="160" y1="80" x2="160" y2="110"
                strokeWidth="0.5" stroke="rgba(192,0,26,0.3)" strokeDasharray="2 3" />
            <path d="M 200 200 A 28 28 0 0 1 172 228" className="sp-svg__path"
                strokeWidth="0.8" stroke="rgba(192,0,26,0.5)"
                style={{ '--delay': '0.75s' }} />
            {/* Windows */}
            {[[55, 30], [120, 30], [220, 30], [55, 250], [120, 250]].map(([x, y], i) => (
                <line key={i} x1={x} y1={y} x2={x + 40} y2={y}
                    className="sp-svg__path" strokeWidth="2.5" stroke="rgba(192,0,26,0.4)"
                    style={{ '--delay': `${0.6 + i * 0.07}s` }} />
            ))}
            {/* Room labels */}
            {[
                { x: 85, y: 105, label: 'LIVING' },
                { x: 205, y: 95, label: 'BED' },
                { x: 85, y: 215, label: 'BED 2' },
                { x: 230, y: 215, label: 'BATH' },
            ].map((r) => (
                <text key={r.label} x={r.x} y={r.y}
                    fontFamily="DM Mono, monospace" fontSize="9"
                    fill="rgba(13,13,13,0.25)" letterSpacing="0.12em"
                    textAnchor="middle">{r.label}</text>
            ))}
            {/* Compass rose */}
            <g transform="translate(280, 50)">
                <line x1="0" y1="-14" x2="0" y2="14" stroke="rgba(192,0,26,0.5)" strokeWidth="0.8" />
                <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(192,0,26,0.5)" strokeWidth="0.8" />
                <text x="0" y="-17" fontFamily="DM Mono, monospace" fontSize="8"
                    fill="rgba(192,0,26,0.6)" textAnchor="middle">N</text>
                <circle cx="0" cy="0" r="3" fill="rgba(192,0,26,0.6)" />
            </g>
            {/* Scale bar */}
            <line x1="50" y1="270" x2="150" y2="270" stroke="rgba(13,13,13,0.25)" strokeWidth="0.8" />
            <line x1="50" y1="265" x2="50" y2="275" stroke="rgba(13,13,13,0.25)" strokeWidth="0.8" />
            <line x1="150" y1="265" x2="150" y2="275" stroke="rgba(13,13,13,0.25)" strokeWidth="0.8" />
            <text x="100" y="268" fontFamily="DM Mono, monospace" fontSize="7"
                fill="rgba(13,13,13,0.25)" textAnchor="middle" letterSpacing="0.1em">10M</text>
        </svg>
    )
}

// Estate Management — gears + property grid
function ManagementSVG({ drawn }) {
    return (
        <svg className={`sp-svg ${drawn ? 'sp-svg--drawn' : ''}`}
            viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Property grid — 2×3 mini buildings */}
            {[[30, 40], [120, 40], [210, 40], [30, 140], [120, 140], [210, 140]].map(([x, y], i) => (
                <g key={i} style={{ '--delay': `${0.2 + i * 0.1}s` }}>
                    <rect x={x} y={y + 20} width="70" height="60" className="sp-svg__path"
                        strokeWidth="1" stroke="currentColor" />
                    <polyline points={`${x},${y + 20} ${x + 35},${y} ${x + 70},${y + 20}`}
                        className="sp-svg__path" strokeWidth="1" stroke="currentColor" />
                    <rect x={x + 22} y={y + 50} width="26" height="30"
                        className="sp-svg__path" strokeWidth="0.7" stroke="rgba(192,0,26,0.5)" />
                </g>
            ))}
            {/* Connection lines between buildings */}
            <line x1="100" y1="100" x2="120" y2="100" strokeWidth="0.5"
                stroke="rgba(192,0,26,0.3)" strokeDasharray="3 3" />
            <line x1="190" y1="100" x2="210" y2="100" strokeWidth="0.5"
                stroke="rgba(192,0,26,0.3)" strokeDasharray="3 3" />
            <line x1="65" y1="200" x2="65" y2="220" strokeWidth="0.5"
                stroke="rgba(192,0,26,0.3)" strokeDasharray="3 3" />
            {/* Central gear */}
            <circle cx="165" cy="230" r="28" className="sp-svg__path"
                strokeWidth="1.2" stroke="rgba(192,0,26,0.6)"
                style={{ '--delay': '0.8s' }} />
            <circle cx="165" cy="230" r="10" className="sp-svg__path"
                strokeWidth="1" stroke="rgba(192,0,26,0.5)"
                style={{ '--delay': '0.85s' }} />
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = angle * Math.PI / 180
                const x1 = 165 + Math.cos(rad) * 28
                const y1 = 230 + Math.sin(rad) * 28
                const x2 = 165 + Math.cos(rad) * 38
                const y2 = 230 + Math.sin(rad) * 38
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="rgba(192,0,26,0.5)" strokeWidth="3" strokeLinecap="round"
                        className="sp-svg__path"
                        style={{ '--delay': `${0.9 + i * 0.04}s` }} />
                )
            })}
            {/* Uptime/status dots */}
            {[[30, 240], [60, 240], [90, 240], [120, 240]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4"
                    fill={i < 3 ? 'rgba(192,0,26,0.5)' : 'transparent'}
                    stroke="rgba(192,0,26,0.3)" strokeWidth="0.8"
                    className="sp-svg__path"
                    style={{ '--delay': `${1 + i * 0.06}s` }} />
            ))}
            <text x="30" y="258" fontFamily="DM Mono, monospace" fontSize="8"
                fill="rgba(13,13,13,0.25)" letterSpacing="0.1em">STATUS · ACTIVE</text>
        </svg>
    )
}

// Advisory — compass + data lines
function AdvisorySVG({ drawn }) {
    return (
        <svg className={`sp-svg ${drawn ? 'sp-svg--drawn' : ''}`}
            viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main compass circle */}
            <circle cx="160" cy="140" r="100" className="sp-svg__path"
                strokeWidth="1" stroke="currentColor"
                style={{ '--delay': '0.1s' }} />
            <circle cx="160" cy="140" r="80" className="sp-svg__path"
                strokeWidth="0.5" stroke="currentColor" opacity="0.3"
                style={{ '--delay': '0.2s' }} />
            <circle cx="160" cy="140" r="55" className="sp-svg__path"
                strokeWidth="0.5" stroke="currentColor" opacity="0.2"
                style={{ '--delay': '0.25s' }} />
            {/* Cardinal lines */}
            {[0, 45, 90, 135].map((angle, i) => {
                const rad = angle * Math.PI / 180
                return (
                    <line key={i}
                        x1={160 + Math.cos(rad) * 100} y1={140 + Math.sin(rad) * 100}
                        x2={160 - Math.cos(rad) * 100} y2={140 - Math.sin(rad) * 100}
                        className="sp-svg__path"
                        strokeWidth={angle === 0 || angle === 90 ? "0.8" : "0.4"}
                        stroke="currentColor" opacity="0.25"
                        style={{ '--delay': `${0.3 + i * 0.08}s` }} />
                )
            })}
            {/* Compass needle — north red */}
            <line x1="160" y1="140" x2="160" y2="52"
                className="sp-svg__path" strokeWidth="2" stroke="rgba(192,0,26,0.7)"
                style={{ '--delay': '0.6s' }} />
            {/* Compass needle — south */}
            <line x1="160" y1="140" x2="160" y2="228"
                className="sp-svg__path" strokeWidth="1" stroke="currentColor" opacity="0.35"
                style={{ '--delay': '0.65s' }} />
            {/* Needle arrowhead */}
            <polygon points="160,48 154,70 166,70"
                fill="rgba(192,0,26,0.7)"
                className="sp-svg__path"
                style={{ '--delay': '0.7s' }} />
            {/* Centre pivot */}
            <circle cx="160" cy="140" r="6" className="sp-svg__path"
                strokeWidth="1" stroke="rgba(192,0,26,0.5)"
                style={{ '--delay': '0.75s' }} />
            <circle cx="160" cy="140" r="2" fill="rgba(192,0,26,0.8)" />
            {/* Cardinal labels */}
            {[
                { label: 'N', x: 160, y: 34 },
                { label: 'E', x: 272, y: 144 },
                { label: 'S', x: 160, y: 252 },
                { label: 'W', x: 50, y: 144 },
            ].map(c => (
                <text key={c.label} x={c.x} y={c.y}
                    fontFamily="DM Mono, monospace" fontSize="10"
                    fill={c.label === 'N' ? 'rgba(192,0,26,0.7)' : 'rgba(13,13,13,0.3)'}
                    textAnchor="middle" letterSpacing="0.1em">{c.label}</text>
            ))}
            {/* Data tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
                const angle = i * 10 * Math.PI / 180
                const r1 = i % 9 === 0 ? 85 : i % 3 === 0 ? 90 : 93
                return (
                    <line key={i}
                        x1={160 + Math.cos(angle) * r1}
                        y1={140 + Math.sin(angle) * r1}
                        x2={160 + Math.cos(angle) * 100}
                        y2={140 + Math.sin(angle) * 100}
                        stroke="rgba(13,13,13,0.15)" strokeWidth="0.6" />
                )
            })}
            {/* Coordinate tag */}
            <text x="160" y="276" fontFamily="DM Mono, monospace" fontSize="8"
                fill="rgba(192,0,26,0.4)" textAnchor="middle" letterSpacing="0.14em">
                EG · ADVISORY · 6.5244°N
            </text>
        </svg>
    )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 'real-estate',
        number: '01',
        title: 'Real Estate',
        tagline: 'The right property. In the right location. At the right time.',
        description: 'We connect buyers, sellers, and renters with premium residential and commercial properties across Nigeria\'s most strategically positioned markets. Our approach goes beyond listings — we understand every property we present, every neighbourhood we recommend, and the full trajectory of every asset.',
        features: [
            { label: 'Buyer & Seller Representation', note: 'Personal mandate, full attention' },
            { label: 'Off-Market Access', note: 'Properties before they list publicly' },
            { label: 'Due Diligence & Verification', note: 'C of O, Excision, Gazette, Survey' },
            { label: 'Post-Sale Support', note: 'We don\'t disappear after signing' },
        ],
        cta: 'Explore Properties',
        href: '/contact',
        theme: 'light',        // light section bg
        ImageComponent: RealEstateSVG,
        imageRight: false,     // SVG on left
        stat: { value: '500+', label: 'Properties transacted' },
    },
    {
        id: 'construction',
        number: '02',
        title: 'Building & Construction',
        tagline: 'From blueprint to building — we deliver with precision.',
        description: 'We provide professional building and construction services, transforming your ideas into quality, lasting spaces. From planning and design to completion, we focus on structural integrity, premium finishes, and on-time delivery — for both residential and commercial projects across Lagos and beyond.',
        features: [
            { label: 'Architectural Design & Planning', note: 'Concept to detailed drawings' },
            { label: 'Structural & Civil Works', note: 'Foundation to rooftop' },
            { label: 'Interior & Exterior Finishing', note: 'Premium materials, precision craft' },
            { label: 'Project Management', note: 'Timeline accountability, zero surprises' },
        ],
        cta: 'Discuss Your Project',
        href: '/contact',
        theme: 'dark',         // dark section bg
        ImageComponent: ConstructionSVG,
        imageRight: true,      // SVG on right
        stat: { value: '100%', label: 'On-time delivery commitment' },
    },
    {
        id: 'management',
        number: '03',
        title: 'Estate Management',
        tagline: 'Your asset, protected and performing.',
        description: 'Full-service property management for residential and commercial portfolios. We handle tenant acquisition and screening, maintenance coordination, security oversight, rental yield optimisation, and transparent monthly financial reporting — so you own without the overhead.',
        features: [
            { label: 'Tenant Acquisition & Screening', note: 'Background checks, lease agreements' },
            { label: 'Maintenance Coordination', note: '24hr response protocol' },
            { label: 'Security & Facility Oversight', note: 'Estate operations, round the clock' },
            { label: 'Financial Reporting', note: 'Monthly statements, full transparency' },
        ],
        cta: 'Manage My Property',
        href: '/contact',
        theme: 'light',
        ImageComponent: ManagementSVG,
        imageRight: false,
        stat: { value: '₦0', label: 'Hidden charges, ever' },
    },
    {
        id: 'advisory',
        number: '04',
        title: 'Investment Advisory',
        tagline: 'Capital placed with precision and purpose.',
        description: 'Strategic property advisory for high-net-worth individuals, cooperatives, and institutional investors entering or expanding within the Nigerian real estate market. From market entry analysis to portfolio structuring, we bring the data and the relationships that move capital confidently.',
        features: [
            { label: 'Market Entry Analysis', note: 'Lekki-Epe corridor expertise' },
            { label: 'Portfolio Structuring', note: 'Risk-adjusted growth strategy' },
            { label: 'Valuation & Risk Assessment', note: 'Independent, evidence-based' },
            { label: 'Diaspora Investment Support', note: 'Remote acquisition, full guidance' },
        ],
        cta: 'Book a Consultation',
        href: '/contact',
        theme: 'dark',
        ImageComponent: AdvisorySVG,
        imageRight: true,
        stat: { value: 'Lekki-Epe', label: 'Primary focus corridor' },
    },
]

// ─── SCROLL PROGRESS LINE ─────────────────────────────────────────────────────
function ScrollProgressLine({ containerRef }) {
    const progress = useScrollProgress(containerRef)
    return (
        <div className="sp-progress" aria-hidden="true">
            <div className="sp-progress__track">
                <div className="sp-progress__fill" style={{ height: `${progress * 100}%` }} />
            </div>
            {/* Dot markers per service */}
            {SERVICES.map((_, i) => (
                <div key={i} className="sp-progress__marker"
                    style={{ top: `${(i / (SERVICES.length - 1)) * 100}%` }}>
                    <span className={`sp-progress__dot ${progress >= i / (SERVICES.length - 1) - 0.05 ? 'sp-progress__dot--active' : ''}`} />
                </div>
            ))}
        </div>
    )
}

// ─── SERVICE SECTION ──────────────────────────────────────────────────────────
function ServiceSection({ service, index }) {
    const [ref, visible] = useInView(0.12)
    const [svgRef, svgVisible] = useInView(0.2)
    const { ImageComponent } = service
    const isRight = service.imageRight



    return (
        <section
            ref={ref}
            id={service.id}
            className={`sp-service sp-service--${service.theme}`}
            aria-label={service.title}
        >
            <div className="container sp-service__inner">

                {/* Image / SVG side */}
                <div
                    ref={svgRef}
                    className={`sp-service__visual ${isRight ? 'sp-service__visual--right' : ''} ${svgVisible ? 'sp-service__visual--in' : ''}`}
                >
                    <div className="sp-service__svg-wrap">
                        <ImageComponent drawn={svgVisible} />
                    </div>
                    {/* Stat badge */}
                    <div className="sp-service__stat">
                        <span className="sp-service__stat-value">{service.stat.value}</span>
                        <span className="sp-service__stat-label">{service.stat.label}</span>
                    </div>
                </div>

                {/* Text side */}
                <div className={`sp-service__copy ${!isRight ? 'sp-service__copy--right' : ''} ${visible ? 'sp-service__copy--in' : ''}`}>

                    <div className="sp-service__meta">
                        <span className="sp-service__number">{service.number}</span>
                        <span className="sp-service__divider" aria-hidden="true" />
                        <span className="sp-service__tag">SERVICE</span>
                    </div>

                    <h2 className="sp-service__title">{service.title}</h2>
                    <p className="sp-service__tagline">{service.tagline}</p>
                    <p className="sp-service__desc">{service.description}</p>

                    {/* Feature list */}
                    <ul className="sp-service__features">
                        {service.features.map((f, i) => (
                            <li key={i}
                                className={`sp-service__feature ${visible ? 'sp-service__feature--in' : ''}`}
                                style={{ transitionDelay: visible ? `${i * 80 + 200}ms` : '0ms' }}>
                                <span className="sp-service__feature-dot" aria-hidden="true" />
                                <div>
                                    <span className="sp-service__feature-label">{f.label}</span>
                                    <span className="sp-service__feature-note">{f.note}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <a href={service.href} className={`sp-service__cta sp-service__cta--${service.theme}`}>
                        <span>{service.cta}</span>
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
                            <path d="M0 5.5h15M10 1l5 4.5-5 4.5"
                                stroke="currentColor" strokeWidth="1.3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="sp-cta__fill" aria-hidden="true" />
                    </a>

                </div>
            </div>
        </section>
    )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function ServicesHero() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

    return (
        <section className="sp-hero" aria-label="Our services">

            {/* Grid background */}
            <div className="sp-hero__bg" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="sp-grid" width="72" height="72" patternUnits="userSpaceOnUse">
                            <path d="M 72 0 L 0 0 0 72" fill="none"
                                stroke="rgba(209,205,198,0.06)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#sp-grid)" />
                </svg>
                <div className="sp-hero__glow" />
            </div>

            {/* Service index nav — top right */}
            <nav className="sp-hero__index" aria-label="Jump to service">
                {SERVICES.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="sp-hero__index-link">
                        <span className="sp-hero__index-num">{s.number}</span>
                        <span className="sp-hero__index-name">{s.title}</span>
                    </a>
                ))}
            </nav>

            <div className="container sp-hero__inner">
                <div className="sp-hero__copy">

                    <div className={`sp-hero__eyebrow ${mounted ? 'sp--in' : ''}`}>
                        <span className="sp-hero__eyebrow-rule" aria-hidden="true" />
                        <span>What We Offer</span>
                    </div>

                    <h1 className={`sp-hero__h1 ${mounted ? 'sp--in' : ''}`}
                        style={{ transitionDelay: '0.12s' }}>
                        Services built
                        <br />for <em>every stage.</em>
                    </h1>

                    <p className={`sp-hero__lead ${mounted ? 'sp--in' : ''}`}
                        style={{ transitionDelay: '0.26s' }}>
                        From acquiring your first plot of land to managing a full estate portfolio —
                        Elliot Global Properties is with you at every stage of the property journey.
                        Four services. One standard of excellence.
                    </p>

                    {/* Service quick links */}
                    <div className={`sp-hero__links ${mounted ? 'sp--in' : ''}`}
                        style={{ transitionDelay: '0.4s' }}>
                        {SERVICES.map((s) => (
                            <a key={s.id} href={`#${s.id}`} className="sp-hero__svc-link">
                                <span className="sp-hero__svc-num">{s.number}</span>
                                <span className="sp-hero__svc-name">{s.title}</span>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                    <path d="M0 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            {/* Scroll cue */}
            <div className="sp-hero__scroll" aria-hidden="true">
                <div className="sp-hero__scroll-line" />
                <span className="sp-hero__scroll-label">Scroll</span>
            </div>
        </section>
    )
}

// ─── CLOSING CTA ──────────────────────────────────────────────────────────────
function ClosingCTA() {
    const [ref, visible] = useInView(0.25)

    return (
        <section className="sp-closing" ref={ref} aria-label="Start working with us">

            {/* Topographic background */}
            <div className="sp-closing__bg" aria-hidden="true">
                <svg viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                    {[...Array(8)].map((_, i) => (
                        <circle key={i} cx="600" cy="500" r={80 + i * 80}
                            stroke={`rgba(255,255,255,${0.05 - i * 0.005})`} strokeWidth="1" />
                    ))}
                </svg>
                <div className="sp-closing__grain" />
            </div>

            <div className={`container sp-closing__inner ${visible ? 'sp--in' : ''}`}>

                <span className="sp-closing__eyebrow">Start Today</span>

                <h2 className="sp-closing__title">
                    Ready to make your
                    <br /><em>next property move?</em>
                </h2>

                <p className="sp-closing__body">
                    Whether you're a first-time buyer, a seasoned investor, or a business
                    seeking the right space — our team is ready to listen, advise, and deliver.
                    No pressure. No hidden charges. Just expertise you can trust.
                </p>

                <div className="sp-closing__actions">
                    <a href="/contact" className="sp-closing__btn sp-closing__btn--primary">
                        <span>Start a Conversation</span>
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
                            <path d="M0 5.5h15M10 1l5 4.5-5 4.5"
                                stroke="currentColor" strokeWidth="2.4"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="sp-closing__btn-fill" aria-hidden="true" />
                    </a>
                    <a href="tel:+2348086949157" className="sp-closing__btn sp-closing__btn--ghost">
                        Call Us Directly
                    </a>
                </div>

                <p className="sp-closing__note">
                    Response within 24 hours · Complimentary first consultation · 100% confidential
                </p>
            </div>
        </section>
    )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
    const servicesRef = useRef(null)

         const sectionRef = useRef(null)

         useEffect(() =>{
            sectionRef.current?.scrollIntoView(
                {
                    behaviour : "smooth",
                    block : "start"
                }
            )
         })

    return (
        <main className="services-page page-content" ref={sectionRef}>
            <ServicesHero />

            {/* All four service sections */}
            <div ref={servicesRef}>
                {SERVICES.map((service, i) => (
                    <ServiceSection key={service.id} service={service} index={i} />
                ))}
            </div>

            <ClosingCTA />
        </main>
    )
}