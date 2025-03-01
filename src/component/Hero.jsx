/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BsLinkedin,
  BsGithub,
  BsDownload,
  BsWhatsapp,
} from "react-icons/bs";
import { Typewriter } from "react-simple-typewriter";
import { FiMail } from "react-icons/fi";

export default function Hero() {
  const handleDownload = () => {
    const downloadLink = "img/Resume-Rajan Gupta.pdf";
    window.open(downloadLink, "_blank");
  };

  return (
    <section
      id="hero"
      className="flex flex-col md:items-center lg:justify-between lg:flex-row lg:mx-16 xl:mx:24 md:px-16"
    >
      {/* Image Section */}
      <div
        className="flex justify-center lg:order-2 items-center mb-10"
        aria-labelledby="hero-image"
      >
        <img
          className="h-96 lg:h-[660px]"
          src="img/bg.webp"
          alt="Background illustration"
          loading="lazy"
        />
        <img
          className="absolute translate-x-4 translate-y-9 lg:translate-y-12 h-64 lg:h-[600px] mb-12"
          src="img/face.webp"
          alt="Rajan Gupta"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div
        className="flex flex-col md:justify-center mx-6 w-[90%] lg:w-1/2"
        aria-labelledby="hero-content"
      >
        <p className="text-black/[0.5] text-xl leading-10">Hey there,</p>
        <h1 className="text-3xl md:text-4xl font-bold leading-10">
          I am{" "}
          <span className="text-green-500">
            <Typewriter
              words={[
                "Web Developer",
                "Python Developer",
                "MERN Stack Developer",
              ]}
              cursor
              loop={false}
              cursorStyle="|"
            />
          </span>
        </h1>
        <p className="text-sm md:text-base text-black my-4">
          Hi there! I'm Rajan Gupta, a passionate web developer with a flair for
          creating user-friendly and visually appealing websites. My expertise
          includes Python development, MERN stack projects, and innovative
          solutions. Let's collaborate and bring your ideas to life!
        </p>
        <div className="flex space-x-8">
          <a href="mailto:grajan408@gmail.com">
            <button
              className="bg-green-500 hover:bg-green-600 px-6 py-3 text-white rounded-lg font-bold text-sm"
              aria-label="Hire me via email"
            >
              Hire Me
            </button>
          </a>
          <button
            className="bg-white border border-green-500 px-6 rounded-lg font-bold flex items-center"
            onClick={handleDownload}
            aria-label="Download Resume"
          >
            <span className="mr-2">
              <BsDownload className="text-green-500 font-bold text-lg" />
            </span>
            Resume
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8" aria-label="Social Media Links">
          <a
            href="https://www.linkedin.com/in/rajan-gupta-141991215/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
          >
            <BsLinkedin className="h-auto w-5 text-blue-700 hover:scale-125" />
          </a>
          <a
            href="https://github.com/Rajan21252125"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
          >
            <BsGithub className="h-auto w-5 text-black hover:scale-125" />
          </a>
          <a
            href="https://wa.me/918104205417"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with me on WhatsApp"
          >
            <BsWhatsapp className="h-auto w-5 text-green-800 hover:scale-125" />
          </a>
          <a
            href="mailto:grajan408@gmail.com"
            aria-label="Send me an email"
          >
            <FiMail className="h-auto w-5 text-red-700 hover:scale-125" />
          </a>
        </div>
      </div>
    </section>
  );
}
