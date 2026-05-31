import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme, DESIGN_MODES, THEMES } from '../contexts/ThemeContext';

export default function DesignToggle({ compact = false }) {
  const {
    designMode,
    changeDesignMode,
    theme,
    changeTheme,
    themeConfig,
    portfolioDesigns,
  } = useTheme();

  return (
    <div className={`portfolio-switcher ${compact ? 'compact' : ''}`}>
      <label className="sr-only" htmlFor="portfolio-design-select">Portfolio design</label>
      <div className="portfolio-select-wrap">
        <select
          id="portfolio-design-select"
          value={designMode}
          onChange={(event) => changeDesignMode(event.target.value)}
          title="Choose portfolio design"
          style={{
            backgroundColor: designMode === DESIGN_MODES.MACOS ? themeConfig.primary : '#E5E7EB',
            color: designMode === DESIGN_MODES.MACOS ? '#FFFFFF' : '#111827',
          }}
        >
          {portfolioDesigns.map((design) => (
            <option className='text-black' key={design.id} value={design.id}>
              {design.label}
            </option>
          ))}
        </select>
        <span className="portfolio-select-label">Change Theme</span>
        <ChevronDown size={16} aria-hidden="true" />
      </div>

      {/* {designMode !== DESIGN_MODES.MACOS && (
        <div className="theme-swatches" aria-label="Classic portfolio theme">
          {Object.entries(THEMES).map(([key, value]) => (
            <button
              key={value}
              type="button"
              onClick={() => changeTheme(value)}
              title={`${key} theme`}
              className={theme === value ? 'active' : ''}
              style={{
                backgroundColor:
                  value === THEMES.FOREST ? '#6B4423' :
                  value === THEMES.LIGHT ? '#FFFFFF' :
                  '#1F2937',
              }}
              aria-label={`${key} theme`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
