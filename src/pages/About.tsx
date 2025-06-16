
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AboutSection from '../components/sections/About';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  // Update document title for SEO
  useEffect(() => {
    document.title = "About | Big Data Rhino";
    
    // Apply dark class to document root for global dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <AboutSection />
      </main>
    </div>
  );
};

export default About;
