import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function HeroNew() {
  const { themeConfig, theme } = useTheme();
  const { profileData } = usePortfolio();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll trigger animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-20"
      style={containerStyle}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 opacity-20 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full"
          style={{ border: `2px solid ${themeConfig.primary}` }}
        />
      </div>

      <div className="absolute bottom-10 left-10 w-64 h-64 opacity-15 pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full"
          style={{ border: `2px solid ${themeConfig.accent}` }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full z-10 text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6"
        >
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: themeConfig.accent,
              color: themeConfig.text
            }}
          >
            🌿 Portfolio Designer
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ color: themeConfig.primary }}
        >
          {profileData?.name || 'Welcome'}
        </motion.h1>

        {/* Subtitle with animated text */}
        <motion.p
          ref={subtitleRef}
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: themeConfig.textMuted }}
        >
          {profileData?.title || 'Crafting digital experiences with passion'}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg mb-12 max-w-3xl mx-auto"
          style={{ color: themeConfig.text }}
        >
          {profileData?.bio || 'A portfolio showcasing creative work and innovative projects'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all"
            style={{ backgroundColor: themeConfig.primary }}
          >
            Explore My Work
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={profileData?.resumeUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-semibold border-2 transition-all"
            style={{
              borderColor: themeConfig.primary,
              color: themeConfig.primary,
              backgroundColor: 'transparent'
            }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={themeConfig.primary}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
