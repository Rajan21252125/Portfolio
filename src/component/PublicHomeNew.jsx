import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import NavbarNew from './NavbarNew';
import HeroNew from './HeroNew';
import AboutNew from './AboutNew';
import SkillsNew from './SkillsNew';
import ExperienceNew from './ExperienceNew';
import ProjectNew from './ProjectNew';
import ContactNew from './ContactNew';
import FooterNew from './FooterNew';
import DesignToggle from './DesignToggle';
import Loading from '../admin/components/Loading';

export default function PublicHomeNew() {
  const { loading } = usePortfolio();
  const { themeConfig } = useTheme();

  if (loading) {
    return <Loading text="Loading portfolio..." />;
  }

  const mainStyle = {
    backgroundColor: themeConfig.background,
    color: themeConfig.text
  };

  return (
    <div style={mainStyle}>
      <NavbarNew />
      <main>
        <HeroNew />
        <AboutNew />
        <SkillsNew />
        <ExperienceNew />
        <ProjectNew />
        <ContactNew />
      </main>
      <FooterNew />
      <DesignToggle />
    </div>
  );
}
