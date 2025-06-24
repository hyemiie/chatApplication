import React from "react";
import "./landing.css";
import Navbar from "../Navbar/Navbar";
import Screen from "./Screen.jsx";
import FeaturesSection from "./Features.jsx";
import TestimonialsSection from "./Features.jsx";
import Action from "./action/Action.jsx";
import Footer from "./footer/Footer.jsx";
import Landing2 from "./Landing2.jsx";
import UseCases from "./usecases/UseCases.jsx";
import ValueProps from "./appvalue/ValueProp.jsx";
import MobilePreview from "./mobilesimulation/MobilePreview.jsx";

const Landing = () => {
  return (
    <div className="landingPage">
    
 
      <div className="div-landing">
      <Landing2 />
      </div>
      <div className="other-screens">
        <ValueProps />
        <TestimonialsSection />
        <MobilePreview />

        <UseCases />
        <Action />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
