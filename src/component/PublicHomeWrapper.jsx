import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import Loading from '../admin/components/Loading';

// Classic components
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Experience from './Experience';
import Project from './Project';
import Footer from './Footer';

// MacOS component
import MacOSHome from './MacOSHome';

export default function PublicHomeWrapper() {
  const { loading } = usePortfolio();
  const { isMacOSDesign } = useTheme();

  if (loading) {
    return <Loading text="Loading portfolio..." />;
  }

  // Render based on design mode
  if (isMacOSDesign) {
    return <MacOSHome />;
  }

  // Classic design (default and only other option for now)
  return (
    <>
      <div className="bg-green-100">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Project />
        </main>
        <Footer />
      </div>
    </>
  );
}
