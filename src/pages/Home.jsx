
import Hero from "../components/sections/Hero"
import { useRef , useEffect } from "react"
import StatsBand from "../components/layout/Stats"
import HomeAbout from "../components/sections/HomeAbout"
import FounderQuote from "../components/sections/Founderquote"
import ServicesSection from "../components/sections/Servicesection"
import Testimonials from "../components/layout/Testimonials"
import JoinAsRealtor from "../components/sections/Joinasarealtor"
import CTASection from "../components/sections/CTASection"
export default function Home () {

    const sectionRef = useRef(null)

    useEffect(() => {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }, [])

    return (
    <>
        <div ref={sectionRef}></div>
    <Hero />
    <StatsBand />
    <HomeAbout />
    <FounderQuote />
    <ServicesSection />
    <Testimonials />
    <JoinAsRealtor />
    <CTASection />
    </>
    )
}