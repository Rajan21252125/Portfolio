/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
// import About from './component/About';
import Skills from "./component/Skills";
import Project from "./component/Project";
import Footer from "./component/Footer";

export default function App() {
  return (
    <div className="bg-green-100">
      {/* Navigation */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        {/* <About /> */}
        <Skills />
        <Project />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
