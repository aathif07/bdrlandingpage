import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Results = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Case Study Results | Big Data Rhino";
    
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
          <h1 className="text-4xl font-bold mb-8">Case Study Results</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Discover the measurable outcomes and benefits our clients achieved through our solutions.
            </p>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Financial Services: Transformation Outcomes</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>67% reduction in manual data processing time</li>
                  <li>98% improvement in data accuracy across systems</li>
                  <li>$4.2M annual cost savings through process optimization</li>
                  <li>28% increase in customer satisfaction scores</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Energy Sector: Environmental & Financial Impact</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>85% reduction in methane emissions within 12 months</li>
                  <li>73% faster leak detection and response time</li>
                  <li>$3.7M savings in lost product and regulatory penalties</li>
                  <li>42% improvement in ESG (Environmental, Social, Governance) ratings</li>
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

export default Results;