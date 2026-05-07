import "./styles/PropertyShowcase.css"
import { useState, useRef, useEffect } from 'react'


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

export const PROPERTIES = [
    {
        id: 'EG-0001',
        title: 'The Meridian Estate',
        location: 'Lekki Phase 1, Lagos',
        price: 45000000,
        priceLabel: '₦45M',
        size: '500 sqm',
        type: 'Land',
        status: 'FOR SALE',
        featured: true,
        image: '/images/properties/meridian-estate.jpg',
        description: 'Prime residential plots in the heart of Lekki Phase 1. C of O title. Fully surveyed. Immediate allocation.',
        features: ['C of O', 'Dry Land', 'Gated Community', 'Road Access'],
        tag: 'PRIME LEKKI',
        daysListed: 3,
    },
    {
        id: 'EG-0002',
        title: 'Greenfield Court',
        location: 'Ibeju-Lekki, Lagos',
        price: 8500000,
        priceLabel: '₦8.5M',
        size: '300 sqm',
        type: 'Land',
        status: 'FOR SALE',
        featured: false,
        image: '/images/properties/greenfield-court.jpg',
        description: 'Affordable plots in a fast-developing corridor near the Dangote Refinery axis. Excision in progress.',
        features: ['Excision', 'Flexible Payment', 'Free Inspection', 'High Appreciation'],
        tag: 'HIGH ROI',
        daysListed: 7,
    },
    {
        id: 'EG-0003',
        title: 'Vantage Heights',
        location: 'Sangotedo, Ajah',
        price: 22000000,
        priceLabel: '₦22M',
        size: '450 sqm',
        type: 'Residential',
        status: 'FEATURED',
        featured: true,
        image: '/images/properties/vantage-heights.jpg',
        description: 'Luxury residential plots in a fully serviced estate. Roads, drainage, and perimeter fencing in place.',
        features: ['Gazette', 'Serviced Estate', 'Drainage', 'Security'],
        tag: 'SERVICED',
        daysListed: 12,
    },
    {
        id: 'EG-0004',
        title: 'Lekki Gardens Phase 5',
        location: 'Epe, Lagos',
        price: 5000000,
        priceLabel: '₦5M',
        size: '250 sqm',
        type: 'Land',
        status: 'FOR SALE',
        featured: false,
        image: '/images/properties/lekki-gardens.jpg',
        description: 'Entry-level investment plots near the Epe expressway. Flexible installment payment plan available.',
        features: ['Registered Survey', 'Installment Plan', '0% Interest', 'Free Visit'],
        tag: 'FLEXIBLE PAYMENT',
        daysListed: 18,
    },
    {
        id: 'EG-0005',
        title: 'Horizon Business Park',
        location: 'Victoria Island, Lagos',
        price: 180000000,
        priceLabel: '₦180M',
        size: '1,200 sqm',
        type: 'Commercial',
        status: 'COMING SOON',
        featured: false,
        image: '/images/properties/horizon-park.jpg',
        description: 'Premium commercial development opportunity on Victoria Island. Ideal for corporate tenants and mixed-use development.',
        features: ['C of O', 'Prime Location', 'VI Address', 'Corporate Ready'],
        tag: 'COMMERCIAL',
        daysListed: 1,
    },
    {
        id: 'EG-0006',
        title: 'Palm Estate Ikorodu',
        location: 'Ikorodu, Lagos',
        price: 3500000,
        priceLabel: '₦3.5M',
        size: '200 sqm',
        type: 'Land',
        status: 'SOLD OUT',
        featured: false,
        image: '/images/properties/palm-estate.jpg',
        description: 'Fully allocated residential plots. All units sold. Join our waitlist for Phase 2.',
        features: ['Gazette', 'Fully Fenced', 'Borehole', 'Street Light'],
        tag: 'SOLD OUT',
        daysListed: 45,
    },
]

const FILTERS = ['All', 'Land', 'Residential', 'Commercial']
const STATUS_COLORS = {
    'FOR SALE': { bg: 'var(--signal)', text: '#fff' },
    'FEATURED': { bg: 'var(--ink)', text: '#fff' },
    'COMING SOON': { bg: 'rgba(13,13,13,0.7)', text: '#fff' },
    'SOLD OUT': { bg: 'rgba(13,13,13,0.25)', text: 'rgba(13,13,13,0.6)' },
}

// ─── Property card ────────────────────────────────────────────────────────────
function PropertyCard({ property, index, visible }) {
    const [hovered, setHovered] = useState(false)
    const isSold = property.status === 'SOLD OUT'
    const statusColor = STATUS_COLORS[property.status] || STATUS_COLORS['FOR SALE']

    return (
        <article
            className={`psc__card ${isSold ? 'psc__card--sold' : ''} ${visible ? 'psc__card--in' : ''}`}
            style={{ transitionDelay: visible ? `${index * 75}ms` : '0ms' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={property.title}
        >
            {/* ── Image area ─────────────────────────────────────────── */}
            <div className="psc__card-img">
                {/* Real image: replace div with <img src={property.image} alt="" /> */}
                <div
                    className="psc__card-img-fill"
                    style={{
                        background: `linear-gradient(
              ${145 + index * 20}deg,
              hsl(${20 + index * 15}, ${isSold ? 5 : 14}%, ${isSold ? 30 : 20}%) 0%,
              hsl(${10 + index * 10}, ${isSold ? 4 : 10}%, ${isSold ? 22 : 14}%) 100%
            )`,
                    }}
                />

                {/* Status badge */}
                <span
                    className="psc__card-status"
                    style={{ background: statusColor.bg, color: statusColor.text }}
                >
                    {property.status}
                </span>

                {/* Property code */}
                <span className="psc__card-code">{property.id}</span>

                {/* Hover overlay: quick details */}
                <div className={`psc__card-overlay ${hovered && !isSold ? 'psc__card-overlay--visible' : ''}`}>
                    <p className="psc__card-desc">{property.description}</p>
                    <div className="psc__card-features">
                        {property.features.map(f => (
                            <span key={f} className="psc__feature-chip">{f}</span>
                        ))}
                    </div>
                </div>

                {/* SVG corner frame */}
                <svg className="psc__card-frame" viewBox="0 0 100 100"
                    fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0 20 L0 0 L20 0" stroke="rgba(192,0,26,0.5)" strokeWidth="1.5" />
                    <path d="M80 0 L100 0 L100 20" stroke="rgba(192,0,26,0.5)" strokeWidth="1.5" />
                    <path d="M0 80 L0 100 L20 100" stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
                    <path d="M100 80 L100 100 L80 100" stroke="rgba(192,0,26,0.3)" strokeWidth="1" />
                </svg>
            </div>

            {/* ── Card body ──────────────────────────────────────────── */}
            <div className="psc__card-body">
                <div className="psc__card-top">
                    <span className="psc__card-tag">{property.tag}</span>
                    <span className="psc__card-size">{property.size}</span>
                </div>

                <h3 className="psc__card-title">{property.title}</h3>

                <div className="psc__card-location">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                        <path d="M6 0C3.24 0 1 2.19 1 4.9 1 8.57 6 14 6 14s5-5.43 5-9.1C11 2.19 8.76 0 6 0z"
                            fill="rgba(192,0,26,0.5)" />
                        <circle cx="6" cy="5" r="1.8" fill="rgba(248,247,245,0.6)" />
                    </svg>
                    <span>{property.location}</span>
                </div>

                <div className="psc__card-footer">
                    <div>
                        <span className="psc__card-price-label">From</span>
                        <span className="psc__card-price">{property.priceLabel}</span>
                    </div>
                    {!isSold ? (
                        <a href="/contact" className="psc__card-btn">
                            Enquire
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                                <path d="M0 4.5h11M7.5 1l3 3.5-3 3.5"
                                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <span className="psc__card-btn-fill" aria-hidden="true" />
                        </a>
                    ) : (
                        <a href="/contact" className="psc__card-btn psc__card-btn--waitlist">
                            Waitlist
                        </a>
                    )}
                </div>
            </div>
        </article>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PropertyShowcase({ preview = false }) {
    const [activeFilter, setActiveFilter] = useState('All')
    const [headerRef, headerVisible] = useInView(0.3)
    const [gridRef, gridVisible] = useInView(0.08)

    const filtered = PROPERTIES.filter(p =>
        activeFilter === 'All' || p.type === activeFilter
    )

    const displayed = preview ? filtered.slice(0, 3) : filtered

    return (
        <section className="psc" aria-label="Property listings">

            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="container" ref={headerRef}>
                <div className={`psc__header ${headerVisible ? 'psc--in' : ''}`}>
                    <div className="psc__header-left">
                        <span className="psc__eyebrow">
                            <span className="psc__eyebrow-rule" aria-hidden="true" />
                            Our Properties
                        </span>
                        <h2 className="psc__title">
                            Every plot. Every promise.
                            <br /><em>Every one verified.</em>
                        </h2>
                    </div>
                    <div className="psc__header-right">
                        <p className="psc__subtitle">
                            All Elliot Global properties come with genuine title documents —
                            C of O, Excision, Gazette, or Registered Survey. No surprises.
                        </p>
                        {!preview && (
                            <div className="psc__stat-row">
                                <div className="psc__stat">
                                    <span className="psc__stat-val">{PROPERTIES.filter(p => p.status !== 'SOLD OUT').length}</span>
                                    <span className="psc__stat-key">Available</span>
                                </div>
                                <div className="psc__stat">
                                    <span className="psc__stat-val">{PROPERTIES.filter(p => p.status === 'SOLD OUT').length}</span>
                                    <span className="psc__stat-key">Sold Out</span>
                                </div>
                                <div className="psc__stat">
                                    <span className="psc__stat-val">100%</span>
                                    <span className="psc__stat-key">Title Verified</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Filter tabs ───────────────────────────────────────── */}
                {!preview && (
                    <div className={`psc__filters ${headerVisible ? 'psc--in' : ''}`}
                        style={{ transitionDelay: '0.15s' }}
                        role="tablist" aria-label="Filter properties by type">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={activeFilter === f}
                                className={`psc__filter ${activeFilter === f ? 'psc__filter--active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                                <span className="psc__filter-count">
                                    {f === 'All' ? PROPERTIES.length : PROPERTIES.filter(p => p.type === f).length}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Property grid ───────────────────────────────────────── */}
            <div className="container" ref={gridRef}>
                <div className={`psc__grid psc__grid--${preview ? 'preview' : 'full'}`}>
                    {displayed.map((property, i) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            index={i}
                            visible={gridVisible}
                        />
                    ))}
                </div>

                {/* ── Preview CTA ───────────────────────────────────────── */}
                {preview && (
                    <div className={`psc__preview-cta ${gridVisible ? 'psc--in' : ''}`}
                        style={{ transitionDelay: '0.4s' }}>
                        <p className="psc__preview-note">
                            Showing {displayed.length} of {PROPERTIES.length} available properties
                        </p>
                        <a href="/properties" className="psc__view-all">
                            <span>View All Properties</span>
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                                <path d="M0 6h17M12 1l5 5-5 5"
                                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* ── Empty state ───────────────────────────────────────── */}
                {!preview && displayed.length === 0 && (
                    <div className="psc__empty">
                        <p className="psc__empty-text">No properties in this category yet.</p>
                        <a href="/contact" className="psc__empty-link">Get notified when we list →</a>
                    </div>
                )}
            </div>

            {/* ── Bottom note ─────────────────────────────────────────── */}
            {!preview && (
                <div className="container psc__bottom">
                    <div className="psc__disclaimer">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <circle cx="7" cy="7" r="6" stroke="rgba(192,0,26,0.4)" strokeWidth="1" />
                            <path d="M5 7l1.5 1.5L9 5" stroke="rgba(192,0,26,0.6)" strokeWidth="1"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>
                            All properties are physically inspectable. Call us to schedule a free site visit — no pressure, no obligation.
                        </span>
                    </div>
                    <a href="/contact" className="psc__cta-btn">
                        <span>Schedule a Free Inspection</span>
                        <span className="psc__cta-fill" aria-hidden="true" />
                    </a>
                </div>
            )}
        </section>
    )
}