import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactNew() {
  const { themeConfig } = useTheme();
  const { profileData } = usePortfolio();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const containerStyle = {
    background: `linear-gradient(135deg, ${themeConfig.background} 0%, ${themeConfig.surface} 100%)`,
    color: themeConfig.text
  };

  const inputStyle = {
    backgroundColor: themeConfig.surface,
    borderColor: themeConfig.border,
    color: themeConfig.text,
    caretColor: themeConfig.primary
  };

  const focusStyle = {
    borderColor: themeConfig.primary,
    boxShadow: `0 0 0 3px ${themeConfig.primary}20`
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={containerStyle}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: themeConfig.primary }}
          >
            💌 Get In Touch
          </h2>
          <p style={{ color: themeConfig.textMuted }}>
            Have a project in mind? Let's discuss how I can help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-bold">Contact Information</h3>

            {/* Email */}
            <motion.a
              href={`mailto:${profileData?.email}`}
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-4 rounded-lg border-2"
              style={{
                borderColor: themeConfig.border,
                backgroundColor: themeConfig.surface
              }}
            >
              <span className="text-3xl">📧</span>
              <div>
                <p className="font-semibold">Email</p>
                <p style={{ color: themeConfig.primary }}>{profileData?.email || 'your.email@example.com'}</p>
              </div>
            </motion.a>

            {/* Phone */}
            {profileData?.phone && (
              <motion.a
                href={`tel:${profileData.phone}`}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 rounded-lg border-2"
                style={{
                  borderColor: themeConfig.border,
                  backgroundColor: themeConfig.surface
                }}
              >
                <span className="text-3xl">📞</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p style={{ color: themeConfig.primary }}>{profileData.phone}</p>
                </div>
              </motion.a>
            )}

            {/* Location */}
            {profileData?.location && (
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 rounded-lg border-2"
                style={{
                  borderColor: themeConfig.border,
                  backgroundColor: themeConfig.surface
                }}
              >
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-semibold">Location</p>
                  <p style={{ color: themeConfig.primary }}>{profileData.location}</p>
                </div>
              </motion.div>
            )}

            {/* Social Links */}
            <div>
              <p className="font-semibold mb-4">Follow Me</p>
              <div className="flex gap-4">
                {profileData?.linkedin && (
                  <motion.a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: themeConfig.primary,
                      color: themeConfig.primary
                    }}
                  >
                    in
                  </motion.a>
                )}
                {profileData?.github && (
                  <motion.a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: themeConfig.primary,
                      color: themeConfig.primary
                    }}
                  >
                    gh
                  </motion.a>
                )}
                {profileData?.twitter && (
                  <motion.a
                    href={profileData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: themeConfig.primary,
                      color: themeConfig.primary
                    }}
                  >
                    𝕏
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.cssText = `${Object.entries(inputStyle).map(([k, v]) => `${k}:${v}`).join(';')};${Object.entries(focusStyle).map(([k, v]) => `${k}:${v}`).join(';')}`}
                  placeholder="Your name"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all"
                  style={inputStyle}
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Subject */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all"
                  style={inputStyle}
                  placeholder="Project inquiry"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all resize-none"
                  style={inputStyle}
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg font-bold text-white transition-all"
                style={{ backgroundColor: themeConfig.primary }}
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
