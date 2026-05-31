import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function FooterNew() {
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();

  const currentYear = new Date().getFullYear();

  const footerStyle = {
    background: `linear-gradient(135deg, ${themeConfig.primary}90 0%, ${themeConfig.secondary}90 100%)`,
    color: '#FFFFFF'
  };

  const socialLinks = [
    { icon: '🔗', label: 'LinkedIn', url: profileData?.linkedin },
    { icon: '🐙', label: 'GitHub', url: profileData?.github },
    { icon: '𝕏', label: 'Twitter', url: profileData?.twitter },
    { icon: '📧', label: 'Email', url: `mailto:${profileData?.email}` }
  ];

  return (
    <footer style={footerStyle} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-bold mb-4">{profileData?.name || 'Portfolio'}</h3>
            <p className="text-sm opacity-90">
              {profileData?.bio || 'Creating amazing digital experiences'}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#home" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="#projects" className="hover:opacity-100 transition">Projects</a></li>
              <li><a href="#skills" className="hover:opacity-100 transition">Skills</a></li>
              <li><a href="#contact" className="hover:opacity-100 transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                link.url && (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `rgba(255, 255, 255, 0.1)` }}
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: `rgba(255, 255, 255, 0.2)`
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={link.label}
                  >
                    {link.icon}
                  </motion.a>
                )
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white opacity-20 mb-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-sm opacity-90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <p>&copy; {currentYear} {profileData?.name || 'Portfolio'}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:opacity-100 transition">Privacy Policy</a>
            <a href="#terms" className="hover:opacity-100 transition">Terms of Service</a>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-0 right-0 pointer-events-none opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-96 h-96 border-2 border-white rounded-full"
        />
      </div>
    </footer>
  );
}
