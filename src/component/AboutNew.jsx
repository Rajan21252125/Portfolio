import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function AboutNew() {
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const containerStyle = {
    background: `linear-gradient(135deg, ${themeConfig.background} 0%, ${themeConfig.surface} 100%)`,
    color: themeConfig.text
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={containerStyle}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative"
          >
            <div
              className="w-full aspect-square rounded-2xl border-4 overflow-hidden shadow-2xl"
              style={{ borderColor: themeConfig.primary }}
            >
              {profileData?.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: themeConfig.accent }}
                >
                  👤
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-dashed rounded-xl"
              style={{ borderColor: themeConfig.accent }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full border-2"
              style={{ borderColor: themeConfig.primary }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentRef}
            className="space-y-6"
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: themeConfig.primary }}
            >
              About Me
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: false }}
              className="text-lg leading-relaxed"
              style={{ color: themeConfig.text }}
            >
              {profileData?.bio || 'I am a passionate developer and designer with a love for creating beautiful, functional digital experiences. With a strong foundation in modern web technologies, I constantly strive to improve my craft and deliver exceptional results.'}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 py-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <div>
                <p className="text-3xl font-bold" style={{ color: themeConfig.primary }}>
                  {profileData?.yearsOfExperience || '5+'}
                </p>
                <p style={{ color: themeConfig.textMuted }}>Years of Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: themeConfig.primary }}>
                  {profileData?.projectsCompleted || '50+'}
                </p>
                <p style={{ color: themeConfig.textMuted }}>Projects Completed</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <motion.a
                href={profileData?.resumeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold text-white"
                style={{ backgroundColor: themeConfig.primary }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold border-2"
                style={{
                  borderColor: themeConfig.primary,
                  color: themeConfig.primary,
                  backgroundColor: 'transparent'
                }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
