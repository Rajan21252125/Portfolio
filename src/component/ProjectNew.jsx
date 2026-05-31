import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectNew() {
  const { themeConfig } = useTheme();
  const { projectData } = usePortfolio();
  const containerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !projectRefs.current.length) return;

    projectRefs.current.forEach((project, index) => {
      gsap.fromTo(
        project,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [projectData]);

  const containerStyle = {
    background: `linear-gradient(180deg, ${themeConfig.surface} 0%, ${themeConfig.background} 100%)`,
    color: themeConfig.text
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: themeConfig.primary }}
          >
            🎨 Featured Projects
          </h2>
          <div
            className="h-1 w-20 rounded-full"
            style={{ backgroundColor: themeConfig.accent }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              ref={(el) => (projectRefs.current[index] = el)}
              key={project._id || index}
              className="group rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
              style={{
                borderColor: themeConfig.border,
                backgroundColor: themeConfig.surface
              }}
              whileHover={{
                y: -15,
                boxShadow: `0 20px 40px rgba(107, 68, 35, 0.2)`
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-300">
                {project.thumbnail ? (
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: themeConfig.accent }}
                  >
                    {project.icon || '🚀'}
                  </div>
                )}

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: `rgba(107, 68, 35, 0.9)` }}
                >
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      className="px-4 py-2 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: themeConfig.accent, color: themeConfig.text }}
                    >
                      Live
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      className="px-4 py-2 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: themeConfig.secondary, color: '#FFF' }}
                    >
                      Code
                    </motion.a>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                {/* Description */}
                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: themeConfig.textMuted }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded border"
                        style={{
                          borderColor: themeConfig.accent,
                          color: themeConfig.primary,
                          backgroundColor: `${themeConfig.accent}20`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded border"
                        style={{
                          borderColor: themeConfig.accent,
                          color: themeConfig.primary
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* View Details Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{ color: themeConfig.primary }}
                >
                  View Details
                  <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projectData.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: themeConfig.textMuted }}>
              Projects will be loaded from your profile
            </p>
          </div>
        )}

        {/* See More Button */}
        {projectData.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: false }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg"
              style={{ backgroundColor: themeConfig.primary }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
