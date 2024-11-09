import React from "react";
import Hero from "../components/Hero/Hero";
import Blogs from "../components/Blog/blogs";
import ContactForm from "../components/Contact Form/Form";
import GetStarted from "../components/GetStarted/GetStarted";
import Value from "../components/Value/Value";
import LatestTrends from "../components/latestTrends/LatestTrends";
import Gallery from "../components/Gallery/Gallery";

function LandingPage() {
  return (
    <div>
      {/* <Companies/> */}
      <Hero />

      <LatestTrends id="latest-trends" />
      <Value id="value" />
      <Gallery />
      {/* <Contact id="contact-us" /> */}
      <Blogs />
      <ContactForm />
      <GetStarted id="get-started" />
    </div>
  );
}

export default LandingPage;
