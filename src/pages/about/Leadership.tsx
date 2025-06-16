import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Leadership = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Leadership Team | Big Data Rhino";
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const leaders = [
    {
      name: "Patrick Parks",
      title: "Chief Executive Officer",
      image: "/images/LeadershipTeam-Patrick.jpg",
      description:
        "Patrick Parks, a seasoned Recon Marine and accomplished founder, is CEO of Big Data Rhino. He brings a unique blend of military precision and strategic vision to data innovation, bridging tactical resilience with cutting-edge analytics in the tech world.",
    },
    {
      name: "Eshwari Manogaran Satish",
      title: "Head of Operations",
      image: "/images/LeadershipTeam-Eshwari.jpg",
      description:
        "Eshwari is a dynamic Product and Data leader with a proven track record across FinTech, Blockchain, and AI startups. A graduate of SUNY in Information Science and Applied Mathematics, she's passionate about building impactful products and driving innovation.",
    },
    {
      name: "Ashesh Parikh",
      title: "Head of Technology",
      image: "/images/LeadershipTeam-Ashesh.jpg",
      description:
        "Ashesh is an R&D leader with extensive contributions in developing digital transformation methods. His recent focus includes Architectures & Gen AI solutions using LLMs. Holds a PhD from Georgia Tech and has been awarded 16 US Patents.",
    },
    {
      name: "Gbemisola Adewuya",
      title: "Head of Strategy",
      image: "/images/LeadershipTeam-gbemi.jpg",
      description:
        "Gbemisola is an Analytics leader specializing in scaling data-driven platforms and deploying AI solutions for emerging industries. With an MSc in Data Analytics and Statistics, her focus is on building cloud-native architectures that drive business growth.",
    },
  ];

  return (
    <div ref={sectionRef} className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-white leading-tight">
            Meet Our <span className="text-blue-600 dark:text-blue-400">Leadership</span> Team
          </h1>

          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-stretch gap-0 mb-20 rounded-[30px] shadow-xl overflow-hidden
                transform transition-transform duration-500 hover:scale-[1.01] hover:shadow-2xl
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
              `}
            >
              {/* Image Section */}
              <div className={`flex-shrink-0 w-full
                ${index % 2 === 0 ? 'md:w-2/5 lg:w-2/5 xl:w-1/3' : 'md:w-2/5 lg:w-2/5 xl:w-1/3'}
                ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center p-4 md:p-0`}>
                {/* Increased min-height for larger visual space */}
                <div className="relative w-full min-h-80 sm:min-h-96 md:min-h-[400px] lg:min-h-[480px]"> {/* Increased min-height significantly */}
                   <img
                    src={leader.image}
                    alt={leader.name}
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-[20px] md:rounded-none"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className={`flex-grow p-8 sm:p-10 lg:p-12
                ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                flex flex-col justify-center text-center md:text-left`}>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {leader.name}
                </h2>
                {leader.title && (
                  <p className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 sm:mb-6">
                    {leader.title}
                  </p>
                )}
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leadership;