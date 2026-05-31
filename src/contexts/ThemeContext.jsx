import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_DESIGN_MODE, DESIGN_MODES, PORTFOLIO_DESIGNS } from '../config/portfolioDesigns';

const ThemeContext = createContext();

export { DESIGN_MODES };

export const THEMES = {
  LIGHT: 'light',
  FOREST: 'forest',
  DARK: 'dark'
};

// Forest Theme Configuration with brown colors
export const THEME_CONFIG = {
  forest: {
    primary: '#6B4423', // Dark brown
    secondary: '#8B6F47', // Medium brown
    accent: '#D4A574', // Light brown/tan
    background: '#FAF6F1', // Off-white
    surface: '#F5EFE7', // Warm white
    text: '#3D2817', // Dark brown for text
    textMuted: '#8B7355', // Muted brown
    border: '#D4BFA8', // Border brown
    hover: '#8B5A3C', // Darker brown for hover
  },
  light: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F3F4F6',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    hover: '#2563EB',
  },
  dark: {
    primary: '#60A5FA',
    secondary: '#34D399',
    accent: '#FBBF24',
    background: '#111827',
    surface: '#1F2937',
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    border: '#374151',
    hover: '#3B82F6',
  }
};

export function ThemeProvider({ children }) {
  const [designMode, setDesignMode] = useState(() => {
    const saved = localStorage.getItem('designMode');
    const supportedModes = PORTFOLIO_DESIGNS.map((design) => design.id);
    return supportedModes.includes(saved) ? saved : DEFAULT_DESIGN_MODE;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || THEMES.FOREST;
  });

  useEffect(() => {
    localStorage.setItem('designMode', designMode);
  }, [designMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleDesignMode = () => {
    const modes = PORTFOLIO_DESIGNS.map((design) => design.id);
    const currentIndex = modes.indexOf(designMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setDesignMode(modes[nextIndex]);
  };

  const changeDesignMode = (newDesignMode) => {
    const supportedModes = PORTFOLIO_DESIGNS.map((design) => design.id);
    if (supportedModes.includes(newDesignMode)) {
      setDesignMode(newDesignMode);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const currentThemeConfig = THEME_CONFIG[theme];

  return (
    <ThemeContext.Provider 
      value={{ 
        designMode, 
        theme,
        portfolioDesigns: PORTFOLIO_DESIGNS,
        cycleDesignMode,
        changeDesignMode,
        changeTheme,
        themeConfig: currentThemeConfig,
        isMacOSDesign: designMode === DESIGN_MODES.MACOS,
        isClassicDesign: designMode === DESIGN_MODES.CLASSIC
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
