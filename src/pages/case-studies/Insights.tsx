import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Insights = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Industry Insights | Big Data Rhino";
    
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
          <h1 className="text-4xl font-bold mb-8">Industry Insights</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Explore our analysis of industry trends and key learnings from our case studies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Financial Technology Trends</h2>
                <p>The financial services industry is rapidly evolving with digital transformation initiatives accelerating across all segments. Our case studies have revealed several key trends:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>API-driven integration is becoming the standard for connecting disparate systems</li>
                  <li>Real-time data processing is essential for modern financial operations</li>
                  <li>Embedded finance is creating new opportunities for non-financial companies</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Energy Sector Transformation</h2>
                <p>The energy industry is undergoing significant changes driven by sustainability goals and technological innovation. Key insights include:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Proactive maintenance is replacing reactive approaches</li>
                  <li>Data-driven decisions are critical for balancing environmental and economic goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
