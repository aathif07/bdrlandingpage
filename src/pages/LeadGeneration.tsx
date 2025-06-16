
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';

const LeadGeneration = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Lead Generation | Big Data Rhino";
    
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
          <h1 className="text-4xl font-bold mb-8">Lead Generation</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Explore our range of resources and tools designed to help businesses generate high-quality leads and drive meaningful engagement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Whitepaper Downloads</h2>
                <p>Access our collection of industry insights and expert analysis through our professionally crafted whitepapers.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Free Consultation</h2>
                <p>Schedule a no-obligation consultation with our experts to discuss your business challenges and potential solutions.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">AI Chatbot</h2>
                <p>Engage with our intelligent chatbot for immediate responses to common questions and personalized recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeadGeneration;
