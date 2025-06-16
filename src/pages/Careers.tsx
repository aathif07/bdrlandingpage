import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { theme } = useTheme();
  const openPositionsRef = useRef<HTMLDivElement>(null);
  const ourCultureRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subHeaderRef = useRef<HTMLParagraphElement>(null);

  const [openPositionsVisible, setOpenPositionsVisible] = useState(false);
  const [ourCultureVisible, setOurCultureVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [subHeaderVisible, setSubHeaderVisible] = useState(false);

  // Set page title and theme
  useEffect(() => {
    document.title = "Careers | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Intersection Observers
  useEffect(() => {
    const observerOpenPositions = new IntersectionObserver((entries) => {
      setOpenPositionsVisible(entries[0].isIntersecting);
    }, { threshold: 0.2 });

    const observerOurCulture = new IntersectionObserver((entries) => {
      setOurCultureVisible(entries[0].isIntersecting);
    }, { threshold: 0.2 });

    const observerHeader = new IntersectionObserver((entries) => {
      setHeaderVisible(entries[0].isIntersecting);
    }, { threshold: 0.1 });

    const observerSubHeader = new IntersectionObserver((entries) => {
      setSubHeaderVisible(entries[0].isIntersecting);
    }, { threshold: 0.1 });

    if (openPositionsRef.current) observerOpenPositions.observe(openPositionsRef.current);
    if (ourCultureRef.current) observerOurCulture.observe(ourCultureRef.current);
    if (headerRef.current) observerHeader.observe(headerRef.current);
    if (subHeaderRef.current) observerSubHeader.observe(subHeaderRef.current);

    return () => {
      observerOpenPositions.disconnect();
      observerOurCulture.disconnect();
      observerHeader.disconnect();
      observerSubHeader.disconnect();
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1
            ref={headerRef}
            className={`text-4xl font-bold text-center mb-10 transition transform duration-300 ${
              headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
            } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Join Our Team
          </h1>
          <p
            ref={subHeaderRef}
            className={`text-xl text-center mb-16 transition transform duration-300 delay-100 ${
              subHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
            } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Explore opportunities to work with a team of passionate innovators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Open Positions */}
            <div
              ref={openPositionsRef}
              className={`p-8 rounded-xl transition ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                  : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Open Positions
              </h2>
              <ul className="space-y-4">
                {[
                  { title: "Data Scientist", level: "Senior Level" },
                  { title: "Data Analyst", level: "Junior Level" },
                  { title: "ML Scientist", level: "Senior Level" },
                  { title: "AI Scientist", level: "Junior Level" },
                  { title: "Sr Technical Sales", level: "Senior Level" },
                ].map((role, idx) => (
                  <li
                    key={idx}
                    className={`p-4 rounded-lg transition ${
                      theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <h3 className="font-medium">{role.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {role.level}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Culture */}
            <div
              ref={ourCultureRef}
              className={`p-8 rounded-xl transition delay-100 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                  : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Culture
              </h2>
              <div className="space-y-4">
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  At Big Data Rhino, we foster a culture of innovation, collaboration, and continuous learning. Our team members are encouraged to explore new ideas and push the boundaries of what's possible in technology.
                </p>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  We believe in work-life balance, professional development, and creating an inclusive environment where diverse perspectives are valued and celebrated.
                </p>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {[
                    'Flexible work arrangements',
                    'Professional development budget',
                    'Health and wellness programs',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
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

export default Careers;
