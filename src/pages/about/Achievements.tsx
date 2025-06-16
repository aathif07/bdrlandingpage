import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Achievements = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Our Achievements | Big Data Rhino";
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Our Achievements
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Celebrating our milestones and contributions to environmental technology
            </p>
          </div>

          {/* Carbon Mapper Achievement */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-center mt-4 text-gray-800 dark:text-white">Environmental Achievement</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mt-2">November 2023</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Carbon Mapper Partnership
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Awarded subcontractor role with Carbon Mapper to aid the California Air Resources Board's Satellite Data Program, supporting methane mitigation through satellite-based emissions detection.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-500 dark:bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                      1
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Contributing to cutting-edge satellite technology for environmental monitoring
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-500 dark:bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                      2
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Supporting California's ambitious methane reduction goals
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-500 dark:bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                      3
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Helping develop innovative solutions for global climate challenges
                    </p>
                  </div>
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

export default Achievements;