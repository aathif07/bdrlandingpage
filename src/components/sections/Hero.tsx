import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const companyOverviewRef = useRef<HTMLDivElement>(null);
  const ourApproachRef = useRef<HTMLDivElement>(null);
  const technologyInnovationRef = useRef<HTMLDivElement>(null);
  const ourTeamRef = useRef<HTMLDivElement>(null);
  const commitmentClientsRef = useRef<HTMLDivElement>(null);
  const visionFutureRef = useRef<HTMLDivElement>(null);

  const [companyOverviewVisible, setCompanyOverviewVisible] = useState(false);
  const [ourApproachVisible, setOurApproachVisible] = useState(false);
  const [technologyInnovationVisible, setTechnologyInnovationVisible] = useState(false);
  const [ourTeamVisible, setOurTeamVisible] = useState(false);
  const [commitmentClientsVisible, setCommitmentClientsVisible] = useState(false);
  const [visionFutureVisible, setVisionFutureVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Preload critical images
    const imageUrls = [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      ...Array.from({ length: 4 }, (_, i) => `https://randomuser.me/api/portraits/men/${i + 21}.jpg`)
    ];

    Promise.all(
      imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    
    const observers = [
      { ref: companyOverviewRef, setter: setCompanyOverviewVisible },
      { ref: ourApproachRef, setter: setOurApproachVisible },
      { ref: technologyInnovationRef, setter: setTechnologyInnovationVisible },
      { ref: ourTeamRef, setter: setOurTeamVisible },
      { ref: commitmentClientsRef, setter: setCommitmentClientsVisible },
      { ref: visionFutureRef, setter: setVisionFutureVisible }
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver((entries) => {
        setter(entries[0].isIntersecting);
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return { observer, ref };
    });

    return () => {
      observerInstances.forEach(({ observer, ref }) => {
        if (ref.current) observer.disconnect();
      });
    };
  }, []);

  const clients = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    imgUrl: `https://randomuser.me/api/portraits/men/${i + 21}.jpg`,
    alt: `Client ${i + 1}`
  }));

  const floatingStats = [
    {
      id: 1,
      position: 'bottom-left',
      delay: '1s',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Efficiency Increase',
      value: '+68%',
      bgColor: 'bg-green-500'
    },
    {
      id: 2,
      position: 'top-right',
      delay: '2s',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Analytics',
      bgColor: 'bg-rhino-blue'
    }
  ];

  const getAnimationClass = (delay: string) =>
    `transition-all duration-700 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  const getSectionAnimationClass = () =>
    `transition-all duration-700 transform opacity-0 translate-y-10 will-change-transform`;

  const getVisibleSectionClass = () => `opacity-100 translate-y-0`;

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative flex flex-col items-center pt-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? 'top-1/4 right-1/5 w-72 h-72' :
              i === 1 ? 'bottom-1/3 left-1/6 w-64 h-64' :
                'top-2/3 right-1/6 w-48 h-48'
              } rounded-full bg-rhino-blue/5 animate-float will-change-transform`}
            style={{ animationDelay: `${i}s` }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content*/}
        <div className="flex flex-col lg:flex-row lg:gap-16 items-center ">
          <div className="flex-1 space-y-6 mb-6 md:mb-0">
            <div className={getAnimationClass('0.2s')} style={{ transitionDelay: '0.2s' }}>
              <span className="inline-block mt-20 px-3 py-1 bg-rhino-blue/10 text-rhino-blue rounded-full text-sm font-medium mb-4 mt-10">
                Pioneering Data Solutions
              </span>
            </div>
            <h1 className={getAnimationClass('0.3s')} style={{ transitionDelay: '0.3s' }}>
              <span className="text-xl md:text-5xl lg:text-5xl font-bold leading-tight block mt-4">
                Achieve Measurable Growth through AI-Driven Insights and Data-Backed Strategies by <span style={{ color: '#0033A0' }}>Big Data Rhino</span>
              </span>
            </h1>
            <div className={`flex items-center gap-4 pt-6 ${getAnimationClass('0.6s')}`} style={{ transitionDelay: '0.6s' }}>
              {/* News Button */}
              <Link 
                to="/about/news" 
                className="inline-flex items-center px-6 py-3 bg-rhino-blue text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              >
                <span className="mr-2">Latest News</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          <div
            className={`flex-1 transition-all duration-1000 will-change-transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="glass-card rounded-2xl p-4 relative overflow-hidden">
              {imagesLoaded ? (
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Data Analytics Dashboard showing business metrics"
                  className="rounded-xl w-full shadow-lg"
                  loading="lazy"
                />
              ) : (
                <div className="rounded-xl w-full aspect-video bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
              )}
              {floatingStats.map(stat => (
                <div
                  key={stat.id}
                  className={`absolute ${stat.position === 'bottom-left' ? '-bottom-6 -left-6 rotate-6' : '-top-4 -right-4 -rotate-6'
                    } glass-card p-3 sm:p-4 rounded-lg shadow-lg animate-float will-change-transform`}
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div>
                      {stat.title === 'Analytics' ? (
                        <p className="text-sm font-medium text-rhino-dark dark:text-gray-300">{stat.title}</p>
                      ) : (
                        <>
                          <p className="text-xs text-rhino-gray">{stat.title}</p>
                          <p className="text-lg font-bold text-rhino-dark dark:text-gray-300">{stat.value}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Overview*/}
        <div ref={companyOverviewRef} className={`py-6 ${getSectionAnimationClass()} ${companyOverviewVisible ? getVisibleSectionClass() : ''}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-xl font-bold text-rhino-dark dark:text-gray-100 mb-4 ${companyOverviewVisible ? getAnimationClass('0.2s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>Discover Our Foundation</h2>
            <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${companyOverviewVisible ? getAnimationClass('0.3s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
              At the heart of Big Data Rhino is a commitment to transforming complex data challenges into clear, actionable solutions. Founded on the principles of innovation and expertise, we strive to be more than just a service provider – we aim to be your trusted partner in navigating the world of big data and artificial intelligence.
            </p>
            <p className={`text-lg text-gray-600 dark:text-gray-300 ${companyOverviewVisible ? getAnimationClass('0.4s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
              Our journey began with a simple yet powerful idea: to empower businesses of all sizes to harness the power of their data to drive growth, efficiency, and innovation.
            </p>
          </div>
        </div>

        {/* Our Approach*/}
        <div ref={ourApproachRef} className={`py-6 bg-gray-100 dark:bg-gray-800 ${getSectionAnimationClass()} ${ourApproachVisible ? getVisibleSectionClass() : ''}`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className={`text-3xl font-bold text-rhino-dark dark:text-gray-100 mb-4 ${ourApproachVisible ? getAnimationClass('0.2s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>Our Client-Focused Approach</h2>
              <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${ourApproachVisible ? getAnimationClass('0.3s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
                We believe in a collaborative and transparent approach to every project. Our process is designed to ensure that we not only meet your technical requirements but also align with your overarching business objectives.
              </p>
              <ul className={`list-disc list-inside text-lg text-gray-600 dark:text-gray-300 space-y-2 ${ourApproachVisible ? getAnimationClass('0.4s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
                <li>Listen First: We start by understanding your unique needs and challenges.</li>
                <li>Collaborative Strategy: We work closely with your team to develop a customized data strategy.</li>
                <li>Expert Execution: Our experienced team delivers high-quality solutions using the latest technologies.</li>
                <li>Continuous Support: We provide ongoing support to ensure your continued success.</li>
              </ul>
            </div>
            <div className="relative order-1 md:order-2">
              <div className={`aspect-w-16 aspect-h-9 bg-rhino-blue/10 rounded-lg shadow-md overflow-hidden ${ourApproachVisible ? getAnimationClass('0.5s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.5s' }}>
                <img src="/images/home-client.png" alt="Client Focus Illustration" className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Technology & Innovation*/}
        <div ref={technologyInnovationRef} className={`py-6 ${getSectionAnimationClass()} ${technologyInnovationVisible ? getVisibleSectionClass() : ''}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-3xl font-bold text-rhino-dark dark:text-gray-100 mb-4 ${technologyInnovationVisible ? getAnimationClass('0.2s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>The Power of Innovation</h2>
            <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${technologyInnovationVisible ? getAnimationClass('0.3s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
              In the rapidly evolving landscape of data science and artificial intelligence, staying ahead requires a relentless commitment to innovation. At Big Data Rhino, we foster a culture of continuous learning and experimentation.
            </p>
            <p className={`text-lg text-gray-600 dark:text-gray-300 ${technologyInnovationVisible ? getAnimationClass('0.4s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
              We are dedicated to exploring new technologies and methodologies to ensure that our clients benefit from the most advanced and effective solutions available.
            </p>
          </div>
        </div>

        {/* Commitment to Clients */}
        <div ref={commitmentClientsRef} className={`py-6 ${getSectionAnimationClass()} ${commitmentClientsVisible ? getVisibleSectionClass() : ''}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-3xl font-bold text-rhino-dark dark:text-gray-100 mb-4 ${commitmentClientsVisible ? getAnimationClass('0.2s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>Our Dedication to Your Success</h2>
            <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${commitmentClientsVisible ? getAnimationClass('0.3s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
              At Big Data Rhino, your success is our ultimate goal. We are dedicated to building long-lasting partnerships based on trust, transparency, and a shared commitment to achieving your objectives.
            </p>
            <p className={`text-lg text-gray-600 dark:text-gray-300 ${commitmentClientsVisible ? getAnimationClass('0.4s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
              We strive to provide exceptional service and support, ensuring that you have the resources and expertise you need to thrive in the data-driven era.
            </p>
          </div>
        </div>

        {/* Vision for the Future*/}
        <div ref={visionFutureRef} className={`py-6 ${getSectionAnimationClass()} ${visionFutureVisible ? getVisibleSectionClass() : ''}`}>
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 text-center">
            <h2 className={`text-3xl font-bold text-rhino-dark dark:text-gray-100 mb-4 ${visionFutureVisible ? getAnimationClass('0.2s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>Looking Towards Tomorrow</h2>
            <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${visionFutureVisible ? getAnimationClass('0.3s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
              We are excited about the transformative potential of data science and artificial intelligence and are committed to staying at the forefront of these advancements.
            </p>
            <p className={`text-xl font-semibold text-rhino-blue dark:text-rhino-blue-light ${visionFutureVisible ? getAnimationClass('0.4s') : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
              Join us as we continue to unlock the power of data together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
