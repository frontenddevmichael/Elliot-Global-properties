import { useState, useRef, useEffect } from 'react'
import './TeamsSection.css'
import founderImg from "../../assets/FounderPicture.jpeg"
import mdImg from "../../assets/MDimg.jpeg"
import Michael from "../../assets/Michael.jpeg"
import director from "../../assets/director.jpeg"

// ─────────────────────────────────────────────────────────────────────────────
// HOOK: useInView
// ─────────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.unobserve(el)
                }
            },
            { threshold, rootMargin }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold, rootMargin])

    return [ref, visible]
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export const BOARD = [
    {
        id: 'b1',
        name: 'Omoaka Chris',
        role: 'Chief Executive Officer',
        roleShort: 'CEO',
        avatar: founderImg,
        quote: 'We place people. Property is the medium.',
        bio: 'Founder and visionary behind Elliot Global Properties. Over a decade of experience in Lagos real estate, with particular expertise in the Lekki–Epe growth corridor.',
        linkedin: '#',
    },
    {
        id: 'b2',
        name: 'Prince Bassey',
        role: 'Managing Director',
        roleShort: 'MD',
        avatar: mdImg,
        quote: 'Excellence in real estate is earned one client at a time.',
        bio: 'Oversees operations, client relations, and strategic partnerships. Brings a disciplined approach to scaling the EGPL portfolio across multiple Nigerian cities.',
        linkedin: '#',
    },
    {
        id: 'b3',
        name: 'Chukwuemeka Obi',
        role: 'Director of Operations',
        roleShort: 'DIRECTOR',
        avatar: director,
        quote: 'A well-run operation is invisible. Our clients only see results.',
        bio: 'Responsible for project delivery, legal documentation, and estate development oversight. Ensures every promise made to clients is a promise kept.',
        linkedin: '#',
    },
]

// ─────────────────────────────────────────────────────────────────────────────
// ICONS & DECORATIVE SVGs
// ─────────────────────────────────────────────────────────────────────────────

function LinkedInIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}

function ArrowIcon() {
    return (
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
            <path d="M0 5h14M10 1l4 4-4 4"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    )
}

function CornerFrame() {
    return (
        <svg className="ts__board-frame" viewBox="0 0 100 100"
            fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 20 L0 0 L20 0" stroke="rgba(192,0,26,0.8)" strokeWidth="1.5" />
            <path d="M80 0 L100 0 L100 20" stroke="rgba(192,0,26,0.8)" strokeWidth="1.5" />
            <path d="M0 80 L0 100 L20 100" stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
            <path d="M100 80 L100 100 L80 100" stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
        </svg>
    )
}

/* Decorative circuit-trace SVG for Prime Axis card */
function CircuitTrace() {
    return (
        <svg className="pa__circuit" viewBox="0 0 420 180" fill="none" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal spine */}
            <line x1="0" y1="90" x2="420" y2="90" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            {/* Vertical branches */}
            <line x1="80" y1="90" x2="80" y2="20" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="180" y1="90" x2="180" y2="160" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="290" y1="90" x2="290" y2="30" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="360" y1="90" x2="360" y2="150" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            {/* Nodes */}
            <circle cx="80" cy="20" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="80" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="180" cy="160" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="180" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="290" cy="30" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="290" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="360" cy="150" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="360" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            {/* Diagonal accents */}
            <line x1="80" y1="20" x2="110" y2="20" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            <line x1="180" y1="160" x2="210" y2="160" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            <line x1="270" y1="30" x2="290" y2="30" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            {/* Animated scan line */}
            <line x1="0" y1="90" x2="420" y2="90" stroke="rgba(192,0,26,0.4)" strokeWidth="1"
                strokeDasharray="20 400">
                <animate attributeName="stroke-dashoffset" from="420" to="-420" dur="3s" repeatCount="indefinite" />
            </line>
        </svg>
    )
}

/* Grid lattice for section background */
function GridLattice() {
    return (
        <svg className="ts__bg-lattice" viewBox="0 0 800 600" fill="none" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id="tsgrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M60 0H0V60" fill="none" stroke="rgba(13,13,13,0.04)" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#tsgrid)" />
            {/* Accent diagonal */}
            <line x1="0" y1="600" x2="800" y2="0" stroke="rgba(192,0,26,0.04)" strokeWidth="1" />
        </svg>
    )
}

/* Slash mark — prime axis divider */
function SlashMark() {
    return (
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" aria-hidden="true">
            <line x1="18" y1="2" x2="6" y2="38" stroke="rgba(192,0,26,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

/* External link icon */
function ExternalIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M8 1h4v4M12 1 7 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// BOARD CARD — untouched logic, same markup
// ─────────────────────────────────────────────────────────────────────────────

function BoardCard({ member, index, visible }) {
    const [imgErr, setImgErr] = useState(false)

    return (
        <article
            className={`ts__board-card ${visible ? 'ts__board-card--in' : ''}`}
            style={{ transitionDelay: visible ? `${index * 110}ms` : '0ms' }}
            aria-label={`${member.name}, ${member.role}`}
        >
            {/* ── Photo area ──────────────────────────────────────── */}
            <div className="ts__board-photo">
                {member.avatar && !imgErr
                    ? <img
                        src={member.avatar}
                        alt={member.name}
                        className="ts__board-photo-img"
                        onError={() => setImgErr(true)}
                    />
                    : <div className="ts__board-photo-placeholder" aria-hidden="true">
                        {member.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                    </div>
                }

                <CornerFrame />
                <div className="ts__board-badge">{member.roleShort}</div>

                <div className="ts__board-overlay" aria-hidden="true">
                    <p className="ts__board-overlay-bio">{member.bio}</p>
                    {member.linkedin && member.linkedin !== '#' && (
                        <a
                            href={member.linkedin}
                            className="ts__board-overlay-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                        >
                            <LinkedInIcon />
                            <span>LinkedIn</span>
                        </a>
                    )}
                </div>
            </div>

            <div className="ts__board-info">
                <div className="ts__board-accent-line" aria-hidden="true" />
                <h3 className="ts__board-name">{member.name}</h3>
                <p className="ts__board-role">{member.role}</p>
                <blockquote className="ts__board-quote">"{member.quote}"</blockquote>
            </div>
        </article>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIME AXIS CARD — dual-founder, shared photo, tech CTA
// ─────────────────────────────────────────────────────────────────────────────

function PrimeAxisCard({ visible }) {
    return (
        <div className={`pa__wrapper ${visible ? 'pa__wrapper--in' : ''}`}>

            {/* ── Header label ──────────────────────────────────── */}
            <div className="pa__eyebrow">
                <span className="pa__eyebrow-rule" aria-hidden="true" />
                <span className="pa__eyebrow-text">Technology Partner</span>
                <span className="pa__eyebrow-rule" aria-hidden="true" />
            </div>

            {/* ── Card ──────────────────────────────────────────── */}
            <div className="pa__card">

                {/* Background circuit decoration */}
                <CircuitTrace />

                {/* ── Left: photo block ─────────────────────────── */}
                <div className="pa__photo-block">
                    <div className="pa__photo-duo">
                        {/* Shared team photo */}
                        <div className="pa__photo-frame pa__photo-frame--main">
                            <img src={Michael} alt="Omale Michael & Arekhanose Onosereme — Prime Axis"
                                className="pa__photo-img" />
                            <div className="pa__photo-corner pa__photo-corner--tl" aria-hidden="true" />
                            <div className="pa__photo-corner pa__photo-corner--br" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Floating tech badge */}
                    <div className="pa__tech-badge">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                            <circle cx="6" cy="6" r="2" fill="currentColor" />
                        </svg>
                        <span>Prime Axis</span>
                    </div>
                </div>

                {/* ── Right: content ────────────────────────────── */}
                <div className="pa__content">

                    {/* Name pair */}
                    <div className="pa__names">
                        <div className="pa__name-item">
                            <span className="pa__name">Omale Michael</span>
                            <SlashMark />
                            <span className="pa__title-tag">Frontend Dev · Tech Lead</span>
                        </div>
                        <div className="pa__name-item">
                            <span className="pa__name">Arekhanose Onosereme</span>
                            <SlashMark />
                            <span className="pa__title-tag">Backend Dev · Co-lead</span>
                        </div>
                    </div>

                    <div className="pa__divider" aria-hidden="true" />

                    {/* Statement */}
                    <p className="pa__statement">
                        The full digital infrastructure of Elliot Global Properties — from this website
                        to every client-facing interface — is engineered and maintained by Prime Axis.
                    </p>

                    {/* Capabilities */}
                    <ul className="pa__caps" aria-label="Prime Axis capabilities">
                        <li className="pa__cap">
                            <span className="pa__cap-dot" aria-hidden="true" />
                            Web Design & Development
                        </li>
                        <li className="pa__cap">
                            <span className="pa__cap-dot" aria-hidden="true" />
                            Full-Stack Engineering
                        </li>
                        <li className="pa__cap">
                            <span className="pa__cap-dot" aria-hidden="true" />
                            Product Strategy & UI/UX
                        </li>
                    </ul>

                    {/* CTA */}
                    <a
                        href="https://primeaxis.pxxl.click/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pa__cta"
                        aria-label="Visit Prime Axis website"
                    >
                        <span className="pa__cta-fill" aria-hidden="true" />
                        <span className="pa__cta-label">Visit Prime Axis</span>
                        <ExternalIcon />
                    </a>
                </div>

            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamSection() {
    const [boardRef, boardVisible] = useInView(0.1)
    const [paRef, paVisible] = useInView(0.15)

    return (
        <section className="ts" aria-label="Our team at Elliot Global Properties">

            {/* Background lattice */}
            <GridLattice />

            {/* ══ BOARD OF DIRECTORS ══════════════════════════════════ */}
            <div className="ts__board-section" ref={boardRef}>
                <div className="container">

                    <header className={`ts__header ${boardVisible ? 'ts--in' : ''}`}>
                        <div className="ts__header-left">
                            <div className="ts__eyebrow">
                                <span className="ts__eyebrow-rule" aria-hidden="true" />
                                <span className="ts__eyebrow-text">Leadership</span>
                            </div>
                            <h2 className="ts__title">
                                The board behind
                                <br /><em>every decision.</em>
                            </h2>
                        </div>
                        <p
                            className={`ts__header-sub ${boardVisible ? 'ts--in' : ''}`}
                            style={{ transitionDelay: boardVisible ? '0.15s' : '0s' }}
                        >
                            Three leaders. One shared commitment to integrity, excellence,
                            and transforming the Nigerian real estate experience.
                        </p>
                    </header>

                    <div className="ts__board-grid">
                        {BOARD.map((member, i) => (
                            <BoardCard
                                key={member.id}
                                member={member}
                                index={i}
                                visible={boardVisible}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {/* ══ PRIME AXIS TECH PARTNERSHIP ═════════════════════════ */}
            <div className="ts__tech-section" ref={paRef}>
                <div className="container">
                    <PrimeAxisCard visible={paVisible} />
                </div>
            </div>

        </section>
    )
}