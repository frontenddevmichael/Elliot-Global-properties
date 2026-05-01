import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
export default function App (){
  return(
    <BrowserRouter>
      <>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
      </>
      </BrowserRouter>
  )
}

