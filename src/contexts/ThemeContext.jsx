import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const DESIGN_MODES = {
  CLASSIC: 'classic',
  NEW: 'new'
};

export const THEMES = {
  LIGHT: 'light',
  FOREST: 'forest',
  DARK: 'dark'
};

// Forest Theme Configuration with brown colors
export const THEME_CONFIG = {
  [THEMES.FOREST]: {
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
  [THEMES.LIGHT]: {
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
  [THEMES.DARK]: {
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
    return saved || DESIGN_MODES.CLASSIC;
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

  const toggleDesignMode = () => {
    setDesignMode(prev => 
      prev === DESIGN_MODES.CLASSIC ? DESIGN_MODES.NEW : DESIGN_MODES.CLASSIC
    );
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
        toggleDesignMode,
        changeTheme,
        themeConfig: currentThemeConfig,
        isNewDesign: designMode === DESIGN_MODES.NEW
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
