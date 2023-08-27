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
  BiLogoPython,
} from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { FaPhp } from "react-icons/fa";

export default function Skills() {
  return (
    <div id="skills">
      <div className="heading flex flex-col justify-center items-center text-3xl font-semibold mt-10">
        <div className="underline-with-space">
          My <span className="text-green-500">Skills</span>
        </div>
      </div>
      <div className="skills flex p-10 space-y-3 h-full flex-col lg:flex-row justify-between lg:mx-24">
        <div className="Frontend shadow1 rounded-lg p-8 flex flex-col justify-center items-center lg:w-[48%]">
          <h1 className="text-md font-semibold text-green-500 lg:text-2xl">
            FrontEnd <span className="text-black">Skills</span>
          </h1>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-orange-600 lg:text-md">
              <BiLogoHtml5 />
              <span className="absolute text-sm left-9 lg:top-0 lg:-left-14 lg:text-xl lg:hidden group-hover:block">
                HTML
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[90%] h-[10px] bg-orange-600 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  90%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-blue-700 lg:text-md">
              <BiLogoCss3 />
              <span className="absolute text-sm left-10 lg:top-0 lg:-left-10 lg:text-xl lg:hidden group-hover:block">
                CSS
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[70%] h-[10px] bg-blue-700 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  70%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-yellow-500 lg:text-md">
              <BiLogoJavascript />
              <span className="absolute text-sm left-10 lg:top-0 lg:-left-6 lg:text-xl lg:hidden group-hover:block">
                JS
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[60%] h-[10px] bg-yellow-500 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  60%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-blue-400 lg:text-md">
              <BiLogoReact />
              <span className="absolute text-sm top-6 left-10 lg:top-0 lg:-left-14 lg:text-xl lg:hidden group-hover:block">
                React
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[70%] h-[10px] bg-blue-400 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  70%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-blue-800 lg:text-md">
              <BiLogoTailwindCss />
              <span className="absolute text-sm left-10 lg:top-0 lg:-left-16 lg:-ml-3 lg:text-xl lg:hidden group-hover:block">
                Tailwind
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[90%] h-[10px] bg-blue-800 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  90%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="Frontend shadow1 p-8 flex flex-col justify-center items-center lg:w-[48%] rounded-lg">
          <h1 className="text-md font-semibold text-green-500 lg:text-2xl">
            Backend <span className="text-black">Skills</span>
          </h1>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-green-700 lg:text-md">
              <BiLogoNodejs />
              <span
                className="absolute
            text-sm top-6 left-10 lg:top-0 lg:-left-14 lg:text-xl lg:hidden group-hover:block"
              >
                Node
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[60%] h-[10px] bg-green-700 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  60%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[25px] group relative font-semibold text-orange-600 lg:text-md">
              <SiExpress />
              <span className="absolute lg:-top-1 lg:-left-16 lg:-ml-2 lg:text-xl text-sm top-5 left-8 lg:hidden group-hover:block">
                Express
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[80%] h-[10px] bg-orange-600 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1">
                  80%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-blue-600 lg:text-md">
              <img className="w-9" src="img/python.png" alt="" />{" "}
              <span className="absolute lg:top-1 top-6 lg:-left-16 left-9 lg:text-xl text-sm lg:hidden group-hover:block">
                Pyt<span className="text-yellow-500">hon</span>
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[252px] lg:w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[50%] h-[10px] bg-blue-500 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1 mt-1">
                  50%
                </span>
              </div>
            </div>
          </div>
          <div className="skill-name flex space-x-2 items-center py-2">
            <p className="text-[30px] group relative font-semibold text-purple-800 rounded-full lg:text-md">
              <FaPhp />
              <span className="absolute text-sm left-10 lg:top-0 lg:-left-10 lg:text-lg lg:hidden group-hover:block">
                PHP
              </span>{" "}
            </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[30%] h-[10px] bg-purple-800 rounded-lg">
                <span className="lg:hidden group-hover:block absolute text-[12px] right-0 top-3 bg-gray-500 font-semibold text-white rounded-md p-1 mt-1">
                  30%
                </span>
              </div>
            </div>
          </div>
          {/* <div className="skill-name flex space-x-2 items-center py-2">
            <p className='text-[30px] group relative font-semibold text-orange-600 lg:text-md'><BiLogoHtml5/><span className='absolute top-0 -left-14 text-xl  hidden group-hover:block'>HTML</span> </p>
            <div className="skill-bar group relative border border-black w-[220px] h-[10px] rounded-lg">
              <div className="progress w-[50%] h-[10px] bg-green-500 rounded-lg">
                <span className='lg:hidden group-hover:block absolute text-[12px] right-0 top-3'>50%</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="SoftSkills mx-4 grid grid-cols-2 lg:grid-cols-3 justify-center lg:space-x-16 p-1 space-y-14 px-10 shadow1 lg:p-10 lg:mx-36 rounded-lg">
        <h1 className='text-2xl text-green-500 absolute flex justify-center items-center font-bold w-[75vw]'>Professional<span className='mx-2 text-black'> Skills</span></h1>
        <div className="flex flex-col justify-center items-center w-36 h-36">
          <CircularProgressbar value={80} text='80%' styles={{ path: { stroke: '#4CAF50' } }} />
          <h1 className='text-md font-semibold text-center'>Creativity</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-36 h-36">
          <CircularProgressbar value={70} text='70%' styles={{ path: { stroke: '#4CAF50' } }} />
          <h1 className='text-md font-semibold text-center'>Communication</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-36 h-36">
          <CircularProgressbar value={85} text='85%' styles={{ path: { stroke: '#4CAF50' } }} />
          <h1 className='text-md font-semibold text-center'>Team Work</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-36 h-36">
          <CircularProgressbar value={90} text='90%' styles={{ path: { stroke: '#4CAF50' } }} />
          <h1 className='text-md font-semibold text-center'>Project Management</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-36 h-36">
          <CircularProgressbar value={75} text='75%' styles={{ path: { stroke: '#4CAF50' } }} />
          <h1 className='text-md font-semibold text-center'>Problem Solving</h1>
        </div>
      </div>
    </div>
  );
}
