import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Solution = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Case Study Solutions | Big Data Rhino";

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
      <main className="pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          {/* Page Title - Responsive text size */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Case Study Solutions</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            {/* Introduction - Responsive padding and text size */}
            <p className="text-base sm:text-lg mb-4 sm:mb-6 text-center px-2 sm:px-4 md:px-8 lg:px-16">
              Learn about the innovative solutions we implemented to address our clients' challenges.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {/* Financial Services Case Study */}
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">Financial Services: API-First Integration Platform</h2>
                <p className="mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  A top-tier financial institution faced friction integrating decades-old systems with their new digital infrastructure.
                  We built a robust, API-first integration platform that acted as a central hub for data exchange and process orchestration.
                </p>

                {/* Responsive grid - single column on mobile, two columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center">Key Metrics</h3>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium">System Integration:</span>
                        <span className="sm:text-right">12 legacy systems connected</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium">Transaction Speed:</span>
                        <span className="sm:text-right">3.2M transactions/hour</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium">Data Accuracy:</span>
                        <span className="sm:text-right">99.98% accuracy rate</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium">Implementation Time:</span>
                        <span className="sm:text-right">6 months (30% under budget)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center">Solution Features</h3>
                    <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>Real-time data synchronization across departments</li>
                      <li>Automated reconciliation engine for compliance reports</li>
                      <li>Role-based access controls for data integrity</li>
                      <li>Flexible APIs for future scalability</li>
                      <li>24/7 monitoring dashboard with alert automation</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center">Business Results</h3>
                  <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <li>67% reduction in manual processing</li>
                    <li>$4.2M annual operational cost savings</li>
                    <li>28% improvement in customer onboarding time</li>
                    <li>Zero downtime during platform migration</li>
                    <li>Cross-functional reporting improved by 60%</li>
                  </ul>
                </div>
              </div>
              
              {/* You can add more case studies here */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solution;
