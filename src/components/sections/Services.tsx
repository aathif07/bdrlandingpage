import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import phoneIcon from '/phone icon.png'; // Assuming it's in your public directory root
import CallbackButton from '../ui/CallbackButton';
import { submitCallbackRequest } from '../../lib/callbackService';
import { toast } from 'sonner';

const Services = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isCallbackActive, setIsCallbackActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
    setIsCallbackActive(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const callbackData = {
        ...formData,
        source: 'Services Section'
      };

      await submitCallbackRequest(callbackData);

      setFormData({ name: '', email: '', phone: '', datetime: '' });
      setShowPopup(false);
      setIsCallbackActive(false);

      if (typeof toast !== 'undefined') {
        toast.success('Your call has been scheduled successfully!');
      } else {
        alert('Your call has been scheduled successfully!');
      }
    } catch (error) {
      console.error('Error submitting callback request:', error);

      if (typeof toast !== 'undefined') {
        toast.error('There was an error submitting your request. Please try again.');
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "AI & Machine Learning",
      description: "Leverage the power of artificial intelligence and machine learning to automate processes, gain predictive insights, and create intelligent applications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Predictive Analytics", "Neural Networks", "Natural Language Processing", "Computer Vision", "Recommendation Systems"]
    },
    {
      title: "Data Analytics",
      description: "Transform raw data into actionable insights through advanced analytics, visualization tools, and comprehensive reporting systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Business Intelligence", "Data Visualization", "Statistical Analysis", "Real-time Analytics", "Reporting Dashboards"]
    },
    {
      title: "FinTech Solutions",
      description: "Develop cutting-edge financial technology solutions that enhance efficiency, improve decision-making, and deliver superior customer experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["Fraud Detection", "Risk Management", "Algorithmic Trading", "Payment Processing", "Regulatory Compliance"]
    },
    {
      title: "Cloud Solutions",
      description: "Implement scalable and secure cloud infrastructure to optimize performance, reduce costs, and enhance business agility.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      features: ["Cloud Migration", "Serverless Architecture", "Containerization", "DevOps Automation", "Hybrid Cloud"]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed 'mx-auto text-center' from this div to left-align the entire top content block */}
        <div className="max-w-3xl mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-white">Our Services</h2>
          </div>
          <h2 className={`text-xl md:text-4xl font-bold mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ transitionDelay: '0.1s' }}>
            Comprehensive Data Migration & Technology Solutions
          </h2>
          <p className={`text-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} style={{ transitionDelay: '0.2s' }}>
            We offer a wide range of services to help businesses leverage the power of data, artificial intelligence, and cutting-edge technology to achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 transition-all duration-500 group cursor-pointer transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-indigo-900/20 text-indigo-400 group-hover:bg-indigo-900/30' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
                } transition-all duration-300`}>
                {service.icon}
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Removed 'text-center' from this div to left-align the call to action and button */}
        <div
          className={`mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Need a custom solution for your business?</p>
          <CallbackButton
            isCallbackActive={isCallbackActive}
            phoneIcon={phoneIcon}
            onClick={handleOpenPopup}
          />
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
            <div className={`relative w-full max-w-lg p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} max-h-[90vh] overflow-y-auto`}>
              <button
                onClick={handleClosePopup}
                className="absolute top-3 right-4 text-xl font-bold hover:opacity-70"
                type="button"
              >
                &times;
              </button>
              <div className="flex items-center mb-6">
                <img src={phoneIcon} alt="Phone" className="w-10 h-10 mr-3" />
                <h3 className="text-2xl font-semibold">Set Up Callback</h3>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none"
                  required
                />
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;