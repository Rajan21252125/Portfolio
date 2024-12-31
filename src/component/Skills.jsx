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

export default function Skills() {
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
          <article
            className="frontend-skills shadow1 rounded-lg p-8 flex flex-col justify-center items-center lg:w-[48%]"
            aria-label="Frontend Skills"
          >
            <h3 className="text-md font-semibold text-green-500 lg:text-2xl">
              Frontend <span className="text-black">Skills</span>
            </h3>
            <SkillBar
              icon={<BiLogoHtml5 color="#ff6347" />}
              skill="HTML"
              proficiency={90}
              color="bg-orange-600"
            />
            <SkillBar
              icon={<BiLogoCss3 color="#1e90ff" />}
              skill="CSS"
              proficiency={70}
              color="bg-blue-700"
            />
            <SkillBar
              icon={<BiLogoJavascript color="#f0db4f" />}
              skill="JavaScript"
              proficiency={60}
              color="bg-yellow-500"
            />
            <SkillBar
              icon={<BiLogoReact color="#61DAFB" />}
              skill="React"
              proficiency={70}
              color="bg-blue-400"
            />
            <SkillBar
              icon={<BiLogoTailwindCss color="#38B2AC" />}
              skill="Tailwind CSS"
              proficiency={90}
              color="bg-blue-800"
            />
          </article>

          {/* Backend Skills */}
          <article
            className="backend-skills shadow1 p-8 flex flex-col justify-center items-center lg:w-[48%] rounded-lg"
            aria-label="Backend Skills"
          >
            <h3 className="text-md font-semibold text-green-500 lg:text-2xl">
              Backend <span className="text-black">Skills</span>
            </h3>
            <SkillBar
              icon={<BiLogoNodejs />}
              skill="Node.js"
              proficiency={60}
              color="bg-green-700"
            />
            <SkillBar
              icon={<SiExpress />}
              skill="Express.js"
              proficiency={80}
              color="bg-orange-600"
            />
            <SkillBar
              icon={
                <img className="w-9" src="img/python.png" alt="Python Icon" />
              }
              skill="Python"
              proficiency={50}
              color="bg-blue-500"
            />
            <SkillBar
              icon={<FaPhp />}
              skill="PHP"
              proficiency={30}
              color="bg-purple-800"
            />
          </article>
        </div>

        {/* Soft Skills */}
        <section
          className="soft-skills mx-4 lg:space-x-16 p-8 space-y-14 px-10 shadow1 lg:p-10 lg:mx-36 rounded-lg"
          aria-label="Soft Skills"
        >
          <h3 className="text-2xl text-green-500 text-center font-bold w-[75vw]">
            Professional <span className="mx-2 text-black">Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-14">
            <SoftSkill skill="Creativity" proficiency={80} />
            <SoftSkill skill="Communication" proficiency={70} />
            <SoftSkill skill="Team Work" proficiency={85} />
            <SoftSkill skill="Project Management" proficiency={90} />
            <SoftSkill skill="Problem Solving" proficiency={75} />
          </div>
        </section>
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
        className={`progress w-[${proficiency}%] h-[10px] ${color} rounded-lg`}
      >
        <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
          {proficiency}%
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
