import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "News Highlights | Big Data Rhino";
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">News Highlights</h1>


          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              <span className="text-blue-600 dark:text-blue-400">Big Data Rhino</span> Selected for California Satellite Data Purchase Program
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>March 21, 2025</strong> – We're excited to share that  Big Data Rhino  has been selected as a Disabled Veteran Business Enterprise subcontractor for Carbon Mapper to support the California Air Resources Board Satellite Data Purchase Program!
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The partnership will use Tanager satellites with NASA-developed technology to detect methane emissions at high precision—supporting California's goal to reduce emissions by 40% by 2030.
            </p>
            <a
              href="https://www.prnewswire.com/news-releases/carbon-mapper-selected-for-california-satellite-data-purchase-program-302408116.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Read Full Article
            </a>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center border-2 border-blue-500 dark:border-blue-400">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              COMING SOON
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Stay tuned! We're actively bidding on other projects at the moment as well.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-3 rounded-full text-lg font-medium transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
