import React from "react";
import { FaBriefcase, FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";

import { usePortfolio } from "../contexts/PortfolioContext";

export default function Experience() {
  const { profileData } = usePortfolio();

  const experiences = profileData?.experiences || [];

  if (experiences.length === 0) return null;

  return (
    <div id="experience" className="pt-20 pb-10">
      <section className="experience-section mx-4 lg:mx-36">
        <h2 className="heading flex flex-col justify-center items-center text-3xl lg:text-4xl font-bold mb-20 text-black">
          <span className="underline-with-space">
            Work <span className="text-green-500">Experience</span>
          </span>
        </h2>

        <div className="relative border-l-4 border-green-500 md:ml-10 space-y-16 pb-10 ml-5">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-16 group">
              {/* Timeline Dot with Icon */}
              <div className="absolute -left-[26px] md:-left-[26px] top-6 w-12 h-12 bg-gray-900 border-4 border-green-500 rounded-full flex items-center justify-center text-white text-xl z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                {exp.iconName === "FaLaptopCode" ? <FaLaptopCode /> : <FaBriefcase />}
              </div>

              {/* Experience Card - Stunning Dark Theme */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-[0_10px_40px_rgba(34,197,94,0.25)] transition-all duration-500 relative border border-gray-700 overflow-hidden transform group-hover:-translate-y-1">
                {/* Subtle Glow Effect */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500 -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-medium text-gray-300 mt-2">
                    {exp.company}
                  </h4>
                  <div className="mt-4 mb-6">
                    <span className="text-sm font-semibold text-green-400 bg-green-500/10 inline-block px-4 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)] backdrop-blur-sm">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                    {exp.description}
                  </p>

                  {exp.link && (
                    <div className="mt-8">
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-green-500 text-black hover:bg-green-400 px-6 py-3 rounded-lg transition-all duration-300 font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transform hover:-translate-y-0.5"
                      >
                        <span>View Live Project</span>
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
