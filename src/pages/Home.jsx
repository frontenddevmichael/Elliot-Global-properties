
import Hero from "../components/sections/Hero"
import StatsBand from "../components/layout/Stats"
import HomeAbout from "../components/sections/HomeAbout"
import FounderQuote from "../components/sections/Founderquote"
import ServicesSection from "../components/sections/Servicesection"
import Testimonials from "../components/layout/Testimonials"
import CTASection from "../components/sections/CTASection"
export default function Home () {
    return (
    <>
    <Hero />
    <StatsBand />
    <HomeAbout />
    <FounderQuote />
    <ServicesSection />
    <Testimonials />
    <CTASection />
    </>
    )
}