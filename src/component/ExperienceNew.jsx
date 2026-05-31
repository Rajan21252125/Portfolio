import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceNew() {
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();
  const containerRef = useRef(null);
  const experienceRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !experienceRefs.current.length) return;

    experienceRefs.current.forEach((exp, index) => {
      gsap.fromTo(
        exp,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [profileData]);

  const experiences = profileData?.experience || [];
  const containerStyle = {
    background: `linear-gradient(135deg, ${themeConfig.background} 0%, ${themeConfig.surface} 100%)`,
    color: themeConfig.text
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={containerStyle}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-16 text-center"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: themeConfig.primary }}
          >
            📚 Experience & Journey
          </h2>
          <p style={{ color: themeConfig.textMuted }}>
            My professional journey and growth
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{ backgroundColor: themeConfig.accent }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (experienceRefs.current[index] = el)}
                className={`flex gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                    className="w-6 h-6 rounded-full border-4"
                    style={{
                      backgroundColor: themeConfig.accent,
                      borderColor: themeConfig.primary
                    }}
                  />
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1 p-6 rounded-xl border-2"
                  style={{
                    backgroundColor: themeConfig.surface,
                    borderColor: themeConfig.border
                  }}
                  whileHover={{
                    boxShadow: `0 10px 30px rgba(107, 68, 35, 0.2)`,
                    y: -5
                  }}
                >
                  {/* Date */}
                  <motion.p
                    className="text-sm font-semibold mb-2 inline-block px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: themeConfig.accent,
                      color: themeConfig.text
                    }}
                  >
                    {exp.startDate ? `${exp.startDate} - ${exp.endDate || 'Present'}` : 'Timeline'}
                  </motion.p>

                  {/* Company & Role */}
                  <h3 className="text-2xl font-bold mb-2">{exp.company || 'Company'}</h3>
                  <p
                    className="text-lg font-semibold mb-4"
                    style={{ color: themeConfig.primary }}
                  >
                    {exp.role || 'Position'}
                  </p>

                  {/* Description */}
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: themeConfig.textMuted }}
                  >
                    {exp.description || 'Experience description will appear here'}
                  </p>

                  {/* Skills Used */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full border"
                          style={{
                            borderColor: themeConfig.primary,
                            color: themeConfig.primary,
                            backgroundColor: `${themeConfig.primary}10`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {experiences.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: themeConfig.textMuted }}>
              Experience data will be loaded from your profile
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
