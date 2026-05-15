import { useState, useRef, useEffect } from 'react'
import './TeamsSection.css'
import founderImg from "../../assets/FounderPicture.jpeg"
import mdImg from "../../assets/MDimg.jpeg"
import Michael from "../../assets/Michael.jpeg"
import director from "../../assets/director.jpeg"
import ose from "../../assets/Ose.jpeg"

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
        name: 'Joseph Ishola',
        role: 'Director of Operations',
        roleShort: 'DIRECTOR',
        avatar: director,
        quote: 'A well-run operation is invisible. Our clients only see results.',
        bio: 'Responsible for project delivery, legal documentation, and estate development oversight. Ensures every promise made to clients is a promise kept.',
        linkedin: '#',
    },
]

export const PRIME_AXIS = [
    {
        id: 'pa1',
        name: 'Omale Michael',
        role: 'Frontend Developer',
        roleShort: 'FRONTEND',
        avatar: Michael,
        quote: 'Every pixel is a decision. Make it count.',
        bio: 'Tech Lead at Prime Axis. Architects and builds every client-facing interface for Elliot Global Properties — from design systems to responsive layouts.',
        caps: ['UI/UX Design', 'React & Web Dev', 'Product Strategy'],
    },
    {
        id: 'pa2',
        name: 'Arekhanose Onosereme',
        role: 'Backend Developer',
        roleShort: 'BACKEND',
        avatar: ose, 
        quote: 'The best infrastructure is the kind no one notices.',
        bio: 'Co-lead at Prime Axis. Designs and maintains the server infrastructure, APIs, and data pipelines that power the entire EGPL digital ecosystem.',
        caps: ['Server Architecture', 'API & Database', 'Systems Engineering'],
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

function ExternalIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M8 1h4v4M12 1 7 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

/* Decorative circuit-trace SVG for Prime Axis cards */
function CircuitTrace() {
    return (
        <svg className="pa__circuit" viewBox="0 0 420 180" fill="none" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="90" x2="420" y2="90" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            <line x1="80" y1="90" x2="80" y2="20" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="180" y1="90" x2="180" y2="160" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="290" y1="90" x2="290" y2="30" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <line x1="360" y1="90" x2="360" y2="150" stroke="rgba(192,0,26,0.18)" strokeWidth="0.5" />
            <circle cx="80" cy="20" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="80" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="180" cy="160" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="180" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="290" cy="30" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="290" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <circle cx="360" cy="150" r="3" fill="rgba(192,0,26,0.35)" />
            <circle cx="360" cy="90" r="2" fill="rgba(192,0,26,0.25)" />
            <line x1="80" y1="20" x2="110" y2="20" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            <line x1="180" y1="160" x2="210" y2="160" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
            <line x1="270" y1="30" x2="290" y2="30" stroke="rgba(192,0,26,0.12)" strokeWidth="0.5" />
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
            <line x1="0" y1="600" x2="800" y2="0" stroke="rgba(192,0,26,0.04)" strokeWidth="1" />
        </svg>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// BOARD CARD
// ─────────────────────────────────────────────────────────────────────────────

function BoardCard({ member, index, visible }) {
    const [imgErr, setImgErr] = useState(false)

    return (
        <article
            className={`ts__board-card ${visible ? 'ts__board-card--in' : ''}`}
            style={{ transitionDelay: visible ? `${index * 110}ms` : '0ms' }}
            aria-label={`${member.name}, ${member.role}`}
        >
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
// PRIME AXIS INDIVIDUAL CARD
// ─────────────────────────────────────────────────────────────────────────────

function PrimeAxisMemberCard({ member, index, visible }) {
    const [imgErr, setImgErr] = useState(false)

    return (
        <div
            className={`pa__member-card ${visible ? 'pa__member-card--in' : ''}`}
            style={{ transitionDelay: visible ? `${index * 150}ms` : '0ms' }}
        >
            {/* Circuit decoration */}
            <CircuitTrace />

            {/* corner accents via pseudo-elements in CSS */}

            {/* ── Photo ─────────────────────────────────────────── */}
            <div className="pa__member-photo">
                {member.avatar && !imgErr
                    ? <img
                        src={member.avatar}
                        alt={member.name}
                        className="pa__member-photo-img"
                        onError={() => setImgErr(true)}
                    />
                    : <div className="pa__member-photo-placeholder" aria-hidden="true">
                        {member.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                    </div>
                }
                <div className="pa__member-badge">{member.roleShort}</div>
                <div className="pa__photo-corner pa__photo-corner--tl" aria-hidden="true" />
                <div className="pa__photo-corner pa__photo-corner--br" aria-hidden="true" />
            </div>

            {/* ── Content ───────────────────────────────────────── */}
            <div className="pa__member-content">
                <h3 className="pa__member-name">{member.name}</h3>
                <p className="pa__member-role">{member.role}</p>

                <div className="pa__divider" aria-hidden="true" />

                <blockquote className="pa__member-quote">"{member.quote}"</blockquote>

                <p className="pa__member-bio">{member.bio}</p>

                <ul className="pa__caps" aria-label={`${member.name} capabilities`}>
                    {member.caps.map(cap => (
                        <li key={cap} className="pa__cap">
                            <span className="pa__cap-dot" aria-hidden="true" />
                            {cap}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIME AXIS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function PrimeAxisSection({ visible }) {
    return (
        <div className={`pa__wrapper ${visible ? 'pa__wrapper--in' : ''}`}>

            {/* ── Header label ──────────────────────────────────── */}
            <div className="pa__eyebrow">
                <span className="pa__eyebrow-rule" aria-hidden="true" />
                <span className="pa__eyebrow-text">Technology Partner</span>
                <span className="pa__eyebrow-rule" aria-hidden="true" />
            </div>

            {/* ── Two cards side by side ─────────────────────────── */}
            <div className="pa__grid">
                {PRIME_AXIS.map((member, i) => (
                    <PrimeAxisMemberCard
                        key={member.id}
                        member={member}
                        index={i}
                        visible={visible}
                    />
                ))}
            </div>

            {/* ── Shared CTA ────────────────────────────────────── */}
            <div className="pa__cta-row">
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
                    <PrimeAxisSection visible={paVisible} />
                </div>
            </div>

        </section>
    )
}