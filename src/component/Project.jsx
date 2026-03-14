/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { usePortfolio } from "../contexts/PortfolioContext";

export default function Project() {
  const [projectsToShow, setProjectsToShow] = useState(2);
  const { projectData } = usePortfolio();

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
        {(projectData || []).slice(0, projectsToShow).map((project, index) => (
          <article
            key={project.id || index}
            className="flex flex-col lg:flex-row shadow1 p-6 rounded-lg mb-6"
          >
            {/* Project Media */}
            <div
              className={`lg:${
                index % 2 !== 0 ? "order-2" : ""
              } max-w-[500px]`}
            >
              <ReactPlayer
                url={project.video_url || project.url ? `img/${project.url}` : undefined}
                controls
                width="100%"
                height="100%"
                pip
                playing={false}
                light={
                  <img
                    src={project.image_url || `img/${project.image}`}
                    alt={`Video poster for ${project.name || project.title}`}
                    loading="lazy"
                    style={{ width: "600px", height: "250px" }}
                  />
                }
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col items-start lg:mx-10 space-y-3">
              <h2 className="lg:text-2xl text-xl mt-3 lg:mt-0 font-semibold border-b-4 border-green-500">
                {project.name || project.title}
              </h2>
              <h3 className="lg:text-xl text-lg font-semibold">Tools Used</h3>
              <ul className="tools flex flex-wrap space-x-2">
                {(project.tools || []).map((tool, index) => (
                  <li
                    key={index}
                    className="bg-green-500 text-white my-1 md:my-0 px-2 py-1 rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="lg:text-base text-sm lg:font-normal whitespace-pre-wrap">
                {project.description}
              </p>
              <div className="btn space-x-2">
                {project.live_link || project.projectUrl ? (
                  <a
                    href={project.live_link || project.projectUrl}
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
                {project.github_url || project.githubUrl ? (
                  <a
                    href={project.github_url || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-green-600"
                  >
                    View Code
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        {/* Load More Button */}
        {projectData && projectsToShow < projectData.length && (
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
