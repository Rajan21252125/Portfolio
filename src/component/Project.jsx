/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function Project() {
  const [projectsToShow, setProjectsToShow] = useState(2);
  const allProjects = [
    {
      title: "LeftOver Food Recommendation",
      url: "project1.mp4",
      image: "Project1.png",
      tools: ["React", "Node", "SCSS", "Python", "Flask", "Express", "Machine Learning"],
      description:
        "Food waste is a significant problem, and many people struggle with figuring out what to do with their leftover ingredients. A user Interface for this project link given below......",
      projectUrl: "https://leftover-strangers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/LeftOver",
    },

    {
      title: "AI Website Summarizers",
      url: "project2.mp4",
      image: "project2.png",
      tools: ["React Js", "Tailwind CSS", "API from Rapid API"],
      description:
        "Crafted an AI-driven website summarization tool using React and Tailwind CSS, enabling users to quickly extract key insights from web content.",
      projectUrl: "https://ai-summarizers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/AI_Summarizers/tree/main",
    },

    {
      title: "NewsApp",
      url: "project3.mp4",
      image: "project3.png",
      tools: ["React JS", "Bootstrap 5", "API from News API"],
      description:
        "Developed a NewsApp using React and Bootstrap 5, fetching real-time news using the News API for staying updated.",
      projectUrl: "",
      githubUrl: "https://github.com/Rajan21252125/NewsApp",
    },

    {
      title: "Youtube Clone",
      url: "project4.mp4",
      image: "project4.png",
      tools: ["React JS", "Tailwind CSS", "API from Rapid API"],
      description:
        "Built a Youtube Clone using React and Tailwind CSS, utilizing the Rapid API for dynamic content. Aiming to replicate the familiar features of Youtube.",
      projectUrl: "https://youtube-strangers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/Youtube",
    },

    {
      title: "iNoteBook",
      url: "project5.mp4",
      image: "project5.png",
      tools: ["React JS", "Node", "Bootstrap", "JWT", "Express"],
      description:
        "Developed iNoteBook, a full-stack web app with React JS frontend and Node backend. Utilized Bootstrap for styling, JWT for authentication, and Express for API.",
      projectUrl: "",
      githubUrl: "https://github.com/Rajan21252125/iNotes",
    },

    {
      title: "Text-Utils",
      url: "project6.mp4",
      image: "project6.png",
      tools: ["React JS", "Bootrap 5"],
      description:
        "Crafted Text-Utils, a React JS application with Bootstrap 5 for text manipulation tasks. Simplifies tasks like text conversion, case modification, and more.",
      projectUrl: "",
      githubUrl: "https://github.com/Rajan21252125/Text-Utils",
    },
    // ...
  ];

  const toggleProjects = () => {
    setProjectsToShow((prevCount) => prevCount + 2);
  };

  return (
    <div id="projects">
      <div className="heading flex flex-col justify-center items-center text-3xl font-semibold mt-10">
        <div className="underline-with-space">Projects</div>
      </div>
      <div className="mx-4 lg:mx-36 mt-8">
        {allProjects.slice(0, projectsToShow).map((project, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row shadow1 p-6 rounded-lg mb-6"
          >
            <div
              className={`lg:${index % 2 !== 0 ? "order-2" : ""} max-w-[500px]`}
            >
              <ReactPlayer
                url={`img/${project.url}`}
                controls
                width="100%"
                height="100%"
                pip
                playing={true}
                light={
                  <img
                    src={`img/${project.image}`}
                    alt={`Video Poster for ${project.title}`}
                    style={{ width: "600px", height: "250px" }}
                  />
                }
              />
            </div>
            <div className="flex flex-col items-start lg:mx-10 space-y-3">
              <h2 className="lg:text-2xl text-xl mt-3 lg:mt-0 font-semibold border-b-4 border-green-500">
                {project.title}
              </h2>
              <h4 className="lg:text-xl text-lg font-semibold">Tools Used</h4>
              <div className="tools flex flex-wrap space-x-2">
                {project.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-green-500 text-white my-1 md:my-0 px-2 py-1 rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="lg:text-base text-sm lg:font-normal">
                {project.description}
              </p>
              <div className="btn space-x-2">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-green-500 py-2 px-4 rounded-lg text-white inline-block ${!project.projectUrl ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
                  disabled={!project.projectUrl}
                >
                  View Project
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-green-600"
                >
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
        {projectsToShow < allProjects.length && (
          <div className="text-center mt-4">
            <button
              onClick={toggleProjects}
              className="bg-green-500 py-2 px-4 rounded-lg text-white"
            >
              Read More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
