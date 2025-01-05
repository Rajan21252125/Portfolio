/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function Project() {
  const [projectsToShow, setProjectsToShow] = useState(2);

  const allProjects = [
    {
      title: "FoodBox",
      url: "project.mkv",
      image: "project.webp",
      tools: ["React", "SCSS", "Redux"],
      description:
        "FoodBox is a feature-rich food delivery application built with React.js, Tailwind CSS, and Redux Toolkit. Offering seamless navigation, precise geolocation services, and a diverse selection of cuisines sourced from the Swiggy API, FoodBox ensures a delightful culinary experience for users.",
      projectUrl: "https://foodbox-rajan.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/FoodBox.git",
    },
    {
      title: "LeftOver Food Recommendation",
      url: "project1.mp4",
      image: "Project1.webp",
      tools: ["React", "Node", "SCSS", "Python", "Flask", "Express", "Machine Learning"],
      description:
        "Food waste is a significant problem, and many people struggle with figuring out what to do with their leftover ingredients. A user Interface for this project link given below......",
      projectUrl: "https://leftover-strangers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/LeftOver",
    },

    {
      title: "AI Website Summarizers",
      url: "project2.mp4",
      image: "project2.webp",
      tools: ["React Js", "Tailwind CSS", "API from Rapid API"],
      description:
        "Crafted an AI-driven website summarization tool using React and Tailwind CSS, enabling users to quickly extract key insights from web content.",
      projectUrl: "https://ai-summarizers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/AI_Summarizers/tree/main",
    },
    {
      title: "AquaSleri",
      url: "",
      image: "",
      tools: ["React", "SCSS", "Redux"],
      description:
        "You can see the project video by clicking on the project link below. This is a project that I have done for my client. This is a project of a water purifier company. In this project, I have used React, SCSS, and Redux.",
      projectUrl: "https://aquasleri.stranger2125.me/",
      githubUrl: "https://github.com/Rajan21252125/FoodBox.git",
    },
    {
      title: "NewsApp",
      url: "project3.mp4",
      image: "project3.webp",
      tools: ["React JS", "Bootstrap 5", "API from News API"],
      description:
        "Developed a NewsApp using React and Bootstrap 5, fetching real-time news using the News API for staying updated.",
      projectUrl: "",
      githubUrl: "https://github.com/Rajan21252125/NewsApp",
    },

    {
      title: "Youtube Clone",
      url: "project4.mp4",
      image: "project4.webp",
      tools: ["React JS", "Tailwind CSS", "API from Rapid API"],
      description:
        "Built a Youtube Clone using React and Tailwind CSS, utilizing the Rapid API for dynamic content. Aiming to replicate the familiar features of Youtube.",
      projectUrl: "https://youtube-strangers.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/Youtube",
    },

    {
      title: "iNoteBook",
      url: "project5.mp4",
      image: "project5.webp",
      tools: ["React JS", "Node", "Bootstrap", "JWT", "Express"],
      description:
        "Developed iNoteBook, a full-stack web app with React JS frontend and Node backend. Utilized Bootstrap for styling, JWT for authentication, and Express for API.",
      projectUrl: "https://i-notes-rajan.netlify.app/",
      githubUrl: "https://github.com/Rajan21252125/iNotes",
    },

    {
      title: "Text-Utils",
      url: "project6.mp4",
      image: "project6.webp",
      tools: ["React JS", "Bootrap 5"],
      description:
        "Crafted Text-Utils, a React JS application with Bootstrap 5 for text manipulation tasks. Simplifies tasks like text conversion, case modification, and more.",
      projectUrl: "",
      githubUrl: "https://github.com/Rajan21252125/Text-Utils",
    },
  ];

  const toggleProjects = () => {
    setProjectsToShow((prevCount) => prevCount + 2);
  };

  return (
    <div id="projects">
      {/* Heading */}
      <header className="heading flex flex-col justify-center items-center text-3xl font-semibold mt-10">
        <h1 className="underline-with-space">
          <span>Projects</span>
        </h1>
      </header>

      {/* Projects Section */}
      <section className="projects mx-4 lg:mx-36 mt-8">
        {allProjects.slice(0, projectsToShow).map((project, index) => (
          <article
            key={index}
            className="flex flex-col lg:flex-row shadow1 p-6 rounded-lg mb-6"
          >
            {/* Project Media */}
            <div
              className={`lg:${
                index % 2 !== 0 ? "order-2" : ""
              } max-w-[500px]`}
            >
              <ReactPlayer
                url={`img/${project?.url}`}
                controls
                width="100%"
                height="100%"
                pip
                playing={true}
                light={
                  <img
                    src={`img/${project?.image}`}
                    alt={`Video poster for ${project.title}`}
                    style={{ width: "600px", height: "250px" }}
                  />
                }
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col items-start lg:mx-10 space-y-3">
              <h2 className="lg:text-2xl text-xl mt-3 lg:mt-0 font-semibold border-b-4 border-green-500">
                {project.title}
              </h2>
              <h3 className="lg:text-xl text-lg font-semibold">Tools Used</h3>
              <ul className="tools flex flex-wrap space-x-2">
                {project.tools.map((tool, index) => (
                  <li
                    key={index}
                    className="bg-green-500 text-white my-1 md:my-0 px-2 py-1 rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="lg:text-base text-sm lg:font-normal">
                {project.description}
              </p>
              <div className="btn space-x-2">
                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 py-2 px-4 rounded-lg text-white hover:bg-green-600"
                  >
                    View Project
                  </a>
                ) : (
                  <span className="bg-gray-400 py-2 px-4 rounded-lg text-white cursor-not-allowed">
                    Project Link Unavailable
                  </span>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-green-600"
                >
                  View Code
                </a>
              </div>
            </div>
          </article>
        ))}

        {/* Load More Button */}
        {projectsToShow < allProjects.length && (
          <div className="text-center mt-4">
            <button
              onClick={toggleProjects}
              className="bg-green-500 py-2 px-4 rounded-lg text-white hover:bg-green-600"
            >
              Load More Projects
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
