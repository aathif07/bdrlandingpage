import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const SeoContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Environmental Data Solutions | Big Data Rhino | Carlsbad, CA";
    
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
          <h1 className="text-4xl font-bold mb-8">Environmental Data Solutions for the San Diego Area</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Big Data Rhino, based in Carlsbad, provides cutting-edge environmental monitoring solutions serving the greater San Diego area. Our satellite data analytics and emission reduction technologies help organizations meet sustainability goals while maintaining operational efficiency.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Featured Environmental Solutions</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-medium">Advanced Emission Detection Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Our innovative emission detection solutions help Southern California businesses identify environmental impact areas with precision, supporting San Diego area industries in reducing their ecological footprint.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Comprehensive monitoring for industrial and commercial operations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Custom reporting for regulatory compliance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Data-driven insights to guide sustainability efforts</span>
                    </li>
                  </ul>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-medium">Satellite Data Analytics for Environmental Monitoring</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Serving Carlsbad and the entire San Diego region, our satellite data platform provides real-time environmental insights. From coastal erosion tracking to urban heat island analysis, we transform raw satellite data into actionable intelligence.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium">Sustainability Strategy Development</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    For businesses throughout the San Diego area, we develop comprehensive environmental strategies combining emission reduction with sustainability analytics. Our Carlsbad-based team specializes in translating complex environmental data into clear business value.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Why Choose Our Carlsbad-Based Solutions?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Local Expertise, Global Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    As a Carlsbad company serving the San Diego area, we combine local environmental knowledge with world-class data analytics technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Proven Results</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our solutions can help San Diego area businesses significantly improve their environmental performance and sustainability metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeoContent;