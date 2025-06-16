
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import OverviewSection from '../components/sections/Overview';
import ContactSection from '../components/sections/Contact';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';

const Index = () => {
  const { theme } = useTheme();

  // Update document title for SEO and apply theme classes
  useEffect(() => {
    document.title = "Big Data Rhino | Data Analytics & AI Solutions";

    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Big Data Rhino specializes in data analytics, AI, and machine learning solutions for enterprises. Transform your business with our cutting-edge technology solutions."
      );
    }

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
      <main>
        <Hero />
        <OverviewSection />
        <ContactSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
