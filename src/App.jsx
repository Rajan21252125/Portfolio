/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
// import About from './component/About';
import Skills from "./component/Skills";
import Project from "./component/Project";
import Footer from "./component/Footer";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <div className="bg-green-100">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Rajan Gupta | Portfolio</title>
        <meta
          name="description"
          content="Welcome to Rajan Gupta's portfolio. Explore skills, projects, and achievements in web development and software engineering."
        />
        <meta name="keywords" content="Portfolio, Web Development, Rajan Gupta, Projects, Skills" />
        <meta name="author" content="Rajan Gupta" />
      </Helmet>

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
