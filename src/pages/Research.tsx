
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';
import CaseStudiesSection from '../components/sections/CaseStudies';

const Research = () => {
  const { theme } = useTheme();

  // Update document title for SEO
  useEffect(() => {
    document.title = "Research | Big Data Rhino";
    
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Research</h1>
          <div className="prose dark:prose-invert max-w-none mb-16">
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Explore our in-depth research and case studies showcasing innovative solutions 
              across various industries including AI security, data analytics, fintech, 
              environmental monitoring, and cybersecurity.
            </p>
            
            {/* Problem Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Problems We Solve</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Our research addresses complex challenges faced by organizations in today's data-driven world:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Legacy system integration with modern digital platforms</li>
                <li>Detection and mitigation of methane leaks in energy infrastructure</li>
                <li>Security vulnerabilities in AI-driven applications</li>
                <li>Real-time intelligence gaps in military operations</li>
                <li>Inefficient financial management in government sectors</li>
                <li>Accurate greenhouse gas emission tracking and analysis</li>
              </ul>
            </div>
            
            {/* Solutions Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Solutions</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We develop innovative approaches to solve these complex challenges:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Counter-AI strategies to mitigate security risks</li>
                <li>AI-powered analytics for battlefield and operational data</li>
                <li>FinTech solutions for streamlined financial workflows</li>
                <li>Big data monitoring and prediction for environmental metrics</li>
                <li>AI-driven optimization for energy industry operations</li>
                <li>Counter-AI and autonomous systems for defense</li>
              </ul>
            </div>
            
            {/* Results Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Results & Impact</h2>
              <p> Our solutions can deliver proven results </p>
              <br />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Financial Services</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>67% reduction in manual data processing time</li>
                    <li>98% improvement in data accuracy across systems</li>
                    <li>$4.2M annual cost savings through optimization</li>
                    <li>28% increase in customer satisfaction scores</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Energy Sector</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>85% reduction in methane emissions within 12 months</li>
                    <li>73% faster leak detection and response time</li>
                    <li>$3.7M savings in lost product and regulatory penalties</li>
                    <li>42% improvement in ESG ratings</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Industry Insights Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Industry Insights</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Our research provides valuable insights into industry trends and future developments:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Projected growth in AI security investments across sectors</li>
                <li>AI-driven analytics transforming defense strategies globally</li>
                <li>Rapid evolution of FinTech in public sector operations</li>
                <li>Environmental analytics as a key driver for climate action</li>
                <li>Growing AI investments reshaping the energy sector landscape</li>
                <li>Evolution of military technology to meet emerging AI challenges</li>
              </ul>
            </div>
          </div>
          
          {/* Case Studies Component */}
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Case Studies</h2>
          <CaseStudiesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
