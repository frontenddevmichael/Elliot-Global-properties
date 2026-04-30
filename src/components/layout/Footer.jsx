import { useEffect, useRef, useState } from 'react'
import './Footer.css'

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact'  },
]

const SERVICES = [
  { label: 'Real Estate',       href: '/services#real-estate'  },
  { label: 'Building & Construction', href: '/services#construction' },
  { label: 'Estate Management', href: '/services#management'   },
  { label: 'Advisory',          href: '/services#advisory'     },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
]

// ─── Animated large text ticker ───────────────────────────────────────────────
function Marquee() {
  const text = 'ELLIOT GLOBAL · PROPERTY · ELEVATED · LAGOS · NIGERIA · EST 2012 · '
  return (
    <div className="footer__marquee" aria-hidden="true">
      <div className="footer__marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

// ─── Big animated wordmark ────────────────────────────────────────────────────
function Wordmark({ visible }) {
  const letters = 'ELLIOT'.split('')
  return (
    <div className="footer__wordmark" aria-label="Elliot Global">
      <div className="footer__wordmark-top">
        {letters.map((l, i) => (
          <span
            key={i}
            className={`footer__wordmark-letter ${visible ? 'footer__wordmark-letter--in' : ''}`}
            style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className={`footer__wordmark-sub ${visible ? 'footer__wordmark-sub--in' : ''}`}>
        GLOBAL PROPERTIES
      </div>
    </div>
  )
}

// ─── Animated survey cross decoration ─────────────────────────────────────────
function SurveyCross({ size = 48, delay = 0, visible }) {
  return (
    <svg
      className={`footer__cross ${visible ? 'footer__cross--in' : ''}`}
      style={{ transitionDelay: `${delay}ms`, width: size, height: size }}
      viewBox="0 0 48 48" fill="none"
      aria-hidden="true"
    >
      <line x1="24" y1="0"  x2="24" y2="20" stroke="rgba(192,0,26,0.4)" strokeWidth="1"/>
      <line x1="24" y1="28" x2="24" y2="48" stroke="rgba(192,0,26,0.4)" strokeWidth="1"/>
      <line x1="0"  y1="24" x2="20" y2="24" stroke="rgba(192,0,26,0.4)" strokeWidth="1"/>
      <line x1="28" y1="24" x2="48" y2="24" stroke="rgba(192,0,26,0.4)" strokeWidth="1"/>
      <circle cx="24" cy="24" r="3" stroke="rgba(192,0,26,0.6)" strokeWidth="1" fill="none"/>
      <circle cx="24" cy="24" r="1" fill="rgba(192,0,26,0.8)"/>
    </svg>
  )
}

// ─── CTA email signup / contact prompt ───────────────────────────────────────
function FooterCTA({ visible }) {
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <div className={`footer__cta ${visible ? 'footer__cta--in' : ''}`}>
      <p className="footer__cta-label">Start the conversation</p>
      <h3 className="footer__cta-heading">
        Your next property
        <br /><em>begins with a call.</em>
      </h3>

      {!sent ? (
        <form className="footer__form" onSubmit={handleSubmit}>
          <div className={`footer__input-wrap ${focused ? 'footer__input-wrap--focused' : ''}`}>
            <input
              type="email"
              className="footer__input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Email address"
            />
            <button type="submit" className="footer__input-btn" aria-label="Submit">
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M0 6h15M10 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="footer__form-note">Or call us: <a href="tel:+2341234567">+234 123 456 7890</a></p>
        </form>
      ) : (
        <div className="footer__form-success">
          <span className="footer__success-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="rgba(192,0,26,0.6)" strokeWidth="1"/>
              <path d="M5.5 10l3 3 6-6" stroke="#C0001A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <p>We'll be in touch shortly.</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const [ref, visible] = useInView(0.08)

  return (
    <footer className="footer" ref={ref} role="contentinfo">

      {/* ── Layer 0: Topographic SVG background ──────────────────── */}
      <div className="footer__topo" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1400 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg">
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={700} cy={700}
              rx={200 + i * 130} ry={80 + i * 55}
              fill="none"
              stroke={`rgba(192,0,26,${0.04 - i * 0.004})`}
              strokeWidth="0.8"
            />
          ))}
          {/* Survey grid lines */}
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`}
              x1="0" y1={120 * i + 40}
              x2="1400" y2={120 * i + 40}
              stroke="rgba(209,205,198,0.04)" strokeWidth="0.5"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`}
              x1={180 * i + 20} y1="0"
              x2={180 * i + 20} y2="700"
              stroke="rgba(209,205,198,0.03)" strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* ── Grain overlay ─────────────────────────────────────────── */}
      <div className="footer__grain" aria-hidden="true" />

      {/* ── Top marquee ticker ────────────────────────────────────── */}
      <div className="footer__ticker-wrap" aria-hidden="true">
        <Marquee />
      </div>

      {/* ── Main content grid ─────────────────────────────────────── */}
      <div className="footer__main">
        <div className="container footer__main-inner">

          {/* Col 1: Big wordmark + tagline */}
          <div className={`footer__brand ${visible ? 'footer__brand--in' : ''}`}>
            <Wordmark visible={visible} />

            <p className="footer__tagline">
              Placing people in the right properties
              since 2012 — with precision, integrity,
              and lasting purpose.
            </p>

            {/* Social links */}
            <div className="footer__socials">
              {SOCIALS.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transitionDelay: visible ? `${i * 60 + 300}ms` : '0ms' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Decorative crosses */}
            <div className="footer__crosses">
              <SurveyCross size={36} delay={400} visible={visible} />
              <SurveyCross size={24} delay={500} visible={visible} />
              <SurveyCross size={16} delay={600} visible={visible} />
            </div>
          </div>

          {/* Col 2: Quick links */}
          <nav
            className={`footer__nav-col ${visible ? 'footer__nav-col--in' : ''}`}
            aria-label="Quick links"
            style={{ transitionDelay: '0.15s' }}
          >
            <h4 className="footer__col-heading">Navigate</h4>
            <ul className="footer__link-list">
              {QUICK_LINKS.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__link"
                    style={{ transitionDelay: visible ? `${i * 55 + 180}ms` : '0ms' }}
                  >
                    <span className="footer__link-arrow" aria-hidden="true">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Services */}
          <nav
            className={`footer__nav-col ${visible ? 'footer__nav-col--in' : ''}`}
            aria-label="Our services"
            style={{ transitionDelay: '0.22s' }}
          >
            <h4 className="footer__col-heading">Services</h4>
            <ul className="footer__link-list">
              {SERVICES.map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="footer__link"
                    style={{ transitionDelay: visible ? `${i * 55 + 200}ms` : '0ms' }}
                  >
                    <span className="footer__link-arrow" aria-hidden="true">→</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Contact + CTA */}
          <div
            className={`footer__contact-col ${visible ? 'footer__contact-col--in' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <FooterCTA visible={visible} />

            {/* Office address */}
            <address className="footer__address">
              <span className="footer__address-coord">6.5244°N · 3.3792°E</span>
              <span className="footer__address-line">Victoria Island, Lagos</span>
              <span className="footer__address-line">Federal Republic of Nigeria</span>
              <a href="mailto:hello@elliotglobal.ng" className="footer__email">
                hello@elliotglobal.ng
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* ── Large background wordmark watermark ──────────────────── */}
      <div className="footer__bg-word" aria-hidden="true">ELLIOT</div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">

          {/* Left: copyright */}
          <p className="footer__copy">
            © {new Date().getFullYear()} Elliot Global Properties Ltd.
            <span className="footer__copy-sep" aria-hidden="true"> · </span>
            All rights reserved.
          </p>

          {/* Centre: coordinate */}
          <span className="footer__bottom-coord" aria-hidden="true">
            6.5244°N 3.3792°E · LAGOS
          </span>

          {/* Right: legal links */}
          <div className="footer__legal">
            <a href="/privacy" className="footer__legal-link">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="/terms"   className="footer__legal-link">Terms of Use</a>
          </div>

        </div>
      </div>

    </footer>
  )
}