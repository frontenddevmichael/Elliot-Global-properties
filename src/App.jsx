import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import AboutPage from "./pages/About.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
export default function App (){
  return(
    <BrowserRouter>
      <>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/services" element={<ServicesPage />}></Route>
      </Routes>
      <Footer />
      </>
      </BrowserRouter>
  )
}

