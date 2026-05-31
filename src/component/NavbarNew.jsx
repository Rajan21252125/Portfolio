import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function NavbarNew() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const navbarStyle = {
    background: `linear-gradient(90deg, ${themeConfig.background}95 0%, ${themeConfig.surface}95 100%)`,
    backdropFilter: 'blur(10px)',
    color: themeConfig.text,
    borderBottom: `1px solid ${themeConfig.border}`
  };

  return (
    <motion.nav
      className="sticky top-0 z-40 shadow-lg"
      style={navbarStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: themeConfig.primary }}
            >
              {profileData?.name?.[0] || 'P'}
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              {profileData?.name?.split(' ')[0] || 'Portfolio'}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-semibold relative group transition-colors"
                style={{ color: themeConfig.text }}
                whileHover={{ color: themeConfig.primary }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: themeConfig.primary }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href={profileData?.contactUrl || '#contact'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-block px-6 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: themeConfig.primary }}
          >
            Get In Touch
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg"
            style={{ backgroundColor: themeConfig.surface }}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke={themeConfig.text}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden py-4 border-t-2"
              style={{ borderColor: themeConfig.border }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 rounded-lg font-semibold transition-all"
                    style={{
                      color: themeConfig.text,
                      backgroundColor: themeConfig.surface
                    }}
                    whileHover={{
                      backgroundColor: themeConfig.primary,
                      color: '#FFFFFF'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href={profileData?.contactUrl || '#contact'}
                  className="px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: themeConfig.primary }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsOpen(false)}
                >
                  Get In Touch
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
