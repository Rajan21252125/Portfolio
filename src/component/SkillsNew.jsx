import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsNew() {
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();
  const containerRef = useRef(null);
  const skillsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !skillsRef.current.length) return;

    skillsRef.current.forEach((skill, index) => {
      gsap.fromTo(
        skill,
        { opacity: 0, y: 50, rotation: -5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [profileData]);

  const skills = profileData?.skills || [];
  const containerStyle = {
    background: `linear-gradient(180deg, ${themeConfig.surface} 0%, ${themeConfig.background} 100%)`,
    color: themeConfig.text
  };

  return (
    <section
      ref={containerRef}
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
            🌲 Skills & Expertise
          </h2>
          <div
            className="h-1 w-20 rounded-full"
            style={{ backgroundColor: themeConfig.accent }}
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              ref={(el) => (skillsRef.current[index] = el)}
              key={index}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: `0 20px 40px rgba(107, 68, 35, 0.15)`
              }}
              className="p-6 rounded-xl backdrop-blur-sm border-2 transition-all cursor-pointer group"
              style={{
                backgroundColor: themeConfig.surface,
                borderColor: themeConfig.border,
                color: themeConfig.text
              }}
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-4 inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {skill.icon || '⚙️'}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">{skill.name}</h3>

              {/* Description */}
              <p
                className="text-sm mb-4"
                style={{ color: themeConfig.textMuted }}
              >
                {skill.description || 'Proficient in this skill'}
              </p>

              {/* Progress Bar */}
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: themeConfig.border }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency || 85}%` }}
                  transition={{ duration: 1 }}
                  viewport={{ once: false }}
                  className="h-full"
                  style={{ backgroundColor: themeConfig.accent }}
                />
              </div>

              {/* Level */}
              <p className="text-xs mt-2" style={{ color: themeConfig.textMuted }}>
                {skill.proficiency || 85}% Proficient
              </p>

              {/* Hover Effect Background */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: themeConfig.primary, zIndex: -1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {skills.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: themeConfig.textMuted }}>
              Skills data will be loaded from your profile
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
