import React from "react";
import "./landing.css";
import Navbar from "../Navbar/Navbar";
import Screen from "./Screen.jsx";
import FeaturesSection from "./Testimonial.jsx";
import TestimonialsSection from "./Testimonial.jsx";
import Action from "./action/Action.jsx";
import Footer from "./footer/Footer.jsx";
import Landing2 from "./Landing2.jsx";
import UseCases from "./usecases/UseCases.jsx";
import ValueProps from "./appvalue/ValueProp.jsx";
import MobilePreview from "./mobilesimulation/MobilePreview.jsx";
import CompanyLogosSection from "./companies/CompanyLogosSection.jsx";
import FeaturedSection from "./features/Features2.jsx";

const Landing = () => {
  return (
    <div className="landingPage">
    
 
      <div className="div-landing">
      <Landing2 />
      </div>
   <div className="landing-page">
  {/* <nav className="footer-nav">
    <a href="#features">Features</a>
    <a href="#testimonials">Testimonials</a>
    <a href="#how-it-works">How It Works</a>
    <a href="#contact">Contact</a>
  </nav> */}

  <div className="other-screens">
    <section id="features">
      <CompanyLogosSection />
      <FeaturedSection />
    </section>

    <section id="testimonials">
      <TestimonialsSection />
    </section>

    <section id="how-it-works">
      <ValueProps />
      <MobilePreview />
      <UseCases />
    </section>

    <section id="contact">
      <Action />
    </section>
          <Footer />

  </div>
</div>


    </div>
  );
};

export default Landing;
