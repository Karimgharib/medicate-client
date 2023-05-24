import React from "react";
import About from "../components/About";
import Doctors from "../components/Doctors";
import Landing from "../components/Landing";
import Service from "../components/Service";
import Contact from "./../components/Contact";

const Home = () => {
  return (
    <>
      <Landing />
      <About />
      <Service />
      <Doctors />
      <Contact />
    </>
  );
};

export default Home;
