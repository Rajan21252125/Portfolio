import React from 'react';
import { useTheme, DESIGN_MODES, THEMES } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function DesignToggle() {
  const { designMode, toggleDesignMode, theme, changeTheme, themeConfig } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3 bg-white shadow-lg rounded-full p-2">
      {/* Design Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDesignMode}
        title={`Switch to ${designMode === DESIGN_MODES.CLASSIC ? 'New' : 'Classic'} Design`}
        className="p-3 rounded-full transition-all"
        style={{
          backgroundColor: designMode === DESIGN_MODES.NEW ? themeConfig.primary : '#E5E7EB',
          color: designMode === DESIGN_MODES.NEW ? '#FFFFFF' : '#111827'
        }}
      >
        <span className="text-sm font-semibold">
          {designMode === DESIGN_MODES.CLASSIC ? '✨ NEW' : '📎 CLASSIC'}
        </span>
      </motion.button>

      {/* Theme Selector */}
      <motion.div
        whileHover={{ opacity: 1 }}
        className="flex gap-2 px-2"
      >
        {Object.entries(THEMES).map(([key, value]) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.15 }}
            onClick={() => changeTheme(value)}
            title={`${key} Theme`}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              theme === value ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{
              backgroundColor: 
                value === THEMES.FOREST ? '#6B4423' :
                value === THEMES.LIGHT ? '#FFFFFF' :
                '#1F2937'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
