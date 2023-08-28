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
    <div
      id="hero"
      className="flex flex-col md:items-center lg:justify-between lg:flex-row lg:mx-16 xl:mx:24 md:px-16"
    >
      <div className="flex justify-center lg:order-2 items-center mb-10">
        <img className="h-96 lg:h-[660px] " src="img/bg.png" alt="" />
        <img
          className="absolute translate-x-4 translate-y-9 lg:translate-y-12 h-64 lg:h-[600px] mb-12"
          src="img/face.png"
          alt=""
        />
      </div>
      <div className="flex flex-col md:justify-center mx-6 w-[90%] lg:w-1/2">
        <p className="text-black/[0.5] text-xl leading-10">Hey_</p>
        <p className="text-3xl md:text-4xl font-bold leading-10">
          I am{" "}
          <span className="text-green-500">
            <Typewriter
              words={[
                "Web Developer",
                "Python Developer",
                "Mern Stack Developer",
              ]}
              cursor
              loop={false}
              cursorStyle="|"
            />
          </span>
        </p>
        <p className="text-sm md:text-base text-black my-4">
          Hi there! I'm a passionate web developer with a flair for creating
          user-friendly and visually appealing websites. My journey in the world
          of programming began with a fascination for crafting innovative
          solutions. From Python development to MERN stack projects, I've been
          on a mission to bring ideas to life. Let's collaborate on your next
          project and turn your vision into reality together!
        </p>
        <div className="flex space-x-8">
          <a href="mailto:grajan408@gmail.com">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 text-white rounded-lg font-bold text-sm">
              Hire Me
            </button>
          </a>
          <button
            className="bg-white border border-green-500 px-6 rounded-lg font-bold flex items-center"
            onClick={handleDownload}
          >
            <span className="mr-2">
              <BsDownload className="text-green-500 font-bold text-lg" />
            </span>
            Resume
          </button>
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8">
          <a
            href="https://www.linkedin.com/in/rajan-gupta-141991215/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="h-auto w-5 text-blue-700 transo hover:scale-125" />
          </a>
          <a
            href="https://github.com/Rajan21252125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="h-auto w-5 text-black transo hover:scale-125" />
          </a>
          <a
            href="https://wa.me/918104205417"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp className="h-auto w-5 text-green-800 transo hover:scale-125" />
          </a>
          <a href="mailto:grajan408@gmail.com">
            <FiMail className="h-auto w-5 text-red-700 hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
}
