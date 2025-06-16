
import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Problem = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Case Study Problems | Big Data Rhino";
    
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Case Study Problems</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Explore the complex challenges our clients faced before implementing our solutions.
            </p>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Financial Services: Legacy System Integration</h2>
                <p>A major financial institution struggled with integrating their legacy systems with modern digital platforms, causing data silos and inefficient processes.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Energy Sector: Methane Leak Detection</h2>
                <p>An energy company needed a more efficient way to detect and address methane leaks across their vast network of pipelines and facilities.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Problem;
