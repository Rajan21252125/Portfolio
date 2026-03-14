/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoNodejs,
} from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { FaPhp } from "react-icons/fa";

import { usePortfolio } from "../contexts/PortfolioContext";

// Icon Map
const iconMap = {
  BiLogoHtml5: <BiLogoHtml5 color="#ff6347" />,
  BiLogoCss3: <BiLogoCss3 color="#1e90ff" />,
  BiLogoJavascript: <BiLogoJavascript color="#f0db4f" />,
  BiLogoReact: <BiLogoReact color="#61DAFB" />,
  BiLogoTailwindCss: <BiLogoTailwindCss color="#38B2AC" />,
  BiLogoNodejs: <BiLogoNodejs />,
  SiExpress: <SiExpress />,
  FaPhp: <FaPhp />,
};

export default function Skills() {
  const { profileData } = usePortfolio();

  const skillsData = profileData?.skills_data || [];
  
  if (skillsData.length === 0) return null;

  const frontend = skillsData.find(s => s.category.includes("Frontend"));
  const backend = skillsData.find(s => s.category.includes("Backend"));
  const professional = skillsData.find(s => s.category.includes("Professional") || s.category.includes("Soft"));

  return (
    <div id="skills">
      <section className="skills-section">
        <h2 className="heading flex flex-col justify-center items-center text-3xl font-semibold mt-10">
          <span className="underline-with-space">
            My <span className="text-green-500">Skills</span>
          </span>
        </h2>

        <div className="skills-container flex p-10 space-y-3 h-full flex-col lg:flex-row justify-between lg:mx-24">
          {/* Frontend Skills */}
          {frontend && frontend.items.length > 0 && (
            <article
              className="frontend-skills shadow1 rounded-lg p-8 flex flex-col justify-center items-center lg:w-[48%]"
              aria-label="Frontend Skills"
            >
              <h3 className="text-md font-semibold text-green-500 lg:text-2xl mb-4">
                Frontend <span className="text-black">Skills</span>
              </h3>
              {frontend.items.map((skill, index) => (
                <SkillBar
                  key={index}
                  icon={skill.iconUrl ? <img className="w-9" src={skill.iconUrl} alt={skill.name} loading="lazy" /> : iconMap[skill.iconName] || null}
                  skill={skill.name}
                  proficiency={skill.proficiency}
                  proficiencyBarWidth={`w-[${skill.proficiency}]`}
                  color={skill.color}
                />
              ))}
            </article>
          )}

          {/* Backend Skills */}
          {backend && backend.items.length > 0 && (
            <article
              className="backend-skills shadow1 p-8 flex flex-col justify-center items-center lg:w-[48%] rounded-lg mt-8 lg:mt-0"
              aria-label="Backend Skills"
            >
              <h3 className="text-md font-semibold text-green-500 lg:text-2xl mb-4">
                Backend <span className="text-black">Skills</span>
              </h3>
              {backend.items.map((skill, index) => (
                <SkillBar
                  key={index}
                  icon={skill.iconUrl ? <img className="w-9" src={skill.iconUrl} alt={skill.name} loading="lazy" /> : iconMap[skill.iconName] || null}
                  skill={skill.name}
                  proficiency={skill.proficiency}
                  proficiencyBarWidth={`w-[${skill.proficiency}]`}
                  color={skill.color}
                />
              ))}
            </article>
          )}
        </div>

        {/* Soft Skills */}
        {professional && professional.items.length > 0 && (
          <section
            className="soft-skills mx-4 lg:space-x-16 p-8 space-y-14 px-10 shadow1 lg:p-10 lg:mx-36 rounded-lg my-10"
            aria-label="Soft Skills"
          >
            <h3 className="text-2xl text-green-500 text-center font-bold lg:w-[75vw]">
              Professional <span className="mx-2 text-black">Skills</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-14">
              {professional.items.map((skill, index) => (
                <SoftSkill key={index} skill={skill.name} proficiency={parseInt(skill.proficiency, 10) || 0} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

const SkillBar = ({ icon, skill, proficiency, color }) => (
  <div className="skill-name flex space-x-2 items-center py-2">
    <p className="text-[30px] group relative font-semibold lg:text-md">
      {icon}
    </p>
    <div
      className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg"
      aria-label={`${skill} skill proficiency`}
    >
      <div
        className={`progress w-[${proficiency}] h-[10px] ${color} rounded-lg`}
      >
        <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
          {proficiency}
        </span>
      </div>
    </div>
  </div>
);

const SoftSkill = ({ skill, proficiency }) => (
  <div className="flex flex-col items-center w-40 h-40 space-y-3">
    <CircularProgressbar
      value={proficiency}
      text={`${proficiency}%`}
      styles={{ path: { stroke: "#4CAF50" } }}
      className="w-32 h-32"
    />
    <h4 className="text-md font-semibold text-center">{skill}</h4>
  </div>
);
