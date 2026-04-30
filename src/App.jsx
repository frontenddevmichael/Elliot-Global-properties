import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import CTASection from "./components/sections/CTASection";
import Home from "./pages/Home";
export default function App (){
  return(
    <BrowserRouter>
      <>
      <Nav />
      <Home />
      <CTASection />
      <Footer />
      </>
      </BrowserRouter>
  )
}

