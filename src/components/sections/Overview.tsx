import React, { useRef, useEffect, useState } from 'react';

const Overview = () => {
  const focusRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [commitmentVisible, setCommitmentVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFocusVisible(true);
          focusObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const commitmentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCommitmentVisible(true);
          commitmentObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (focusRef.current) {
      focusObserver.observe(focusRef.current);
    }
    if (commitmentRef.current) {
      commitmentObserver.observe(commitmentRef.current);
    }

    return () => {
      if (focusRef.current) {
        focusObserver.unobserve(focusRef.current);
      }
      if (commitmentRef.current) {
        commitmentObserver.unobserve(commitmentRef.current);
      }
    };
  }, []);

  const baseCardClasses = "card p-6 border rounded-lg shadow-sm hover:shadow-md transition transition-all duration-700";
  const focusAnimationClasses = focusVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
  const commitmentAnimationClasses = commitmentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';

  return (
    <section id="overview" className="pt-20 pb-4">
      <div className="container mx-auto px-4">
        {/* Main Title and Description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Achieve Measurable Growth through AI-Driven Insights and Data-Backed Strategies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
            Gain powerful insights and accelerate innovation through our advanced AI, machine learning, and data analytics expertise.
          </p>
        </div>

        {/* Focus and Commitment Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Focus Section */}
          <div
            ref={focusRef}
            className={`${baseCardClasses} ${focusAnimationClasses}`}
          >
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
              Our Focus
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              We provide tailored solutions for key industries:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-none text-gray-600 dark:text-gray-300">
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  FinTech
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Healthcare & Life Sciences
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Retail & E-commerce
                </li>
              </ul>
              <ul className="list-none text-gray-600 dark:text-gray-300">
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Supply Chain & Logistics
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Government
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Energy & Sustainability
                </li>
              </ul>
            </div>
          </div>

          {/* Commitment Section */}
          <div
            ref={commitmentRef}
            className={`${baseCardClasses} ${commitmentAnimationClasses}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
              Our Commitment
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              We are driven by these core values:
            </p>
            <ul className="list-none text-gray-600 dark:text-gray-300">
              <li className="flex items-center mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                People First: Empathy and respect are central to our culture.
              </li>
              <li className="flex items-center mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Ownership Mindset: We encourage proactive problem-solving and accountability.
              </li>
              <li className="flex items-center mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Collaboration: Teamwork and open communication drive our success.
              </li>
              <li className="flex items-center mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Innovation: We pursue curiosity and challenge the status quo.
              </li>
              <li className="flex items-center mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Work-Life Harmony: We support balance, flexibility, and personal growth.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
