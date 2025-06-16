import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { FiArrowRight, FiCheck, FiDatabase, FiShield, FiClock, FiBarChart2, FiServer, FiGlobe } from 'react-icons/fi';
import phoneIcon from '../../public/phone icon.png';

const DataMigration = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [isCallbackActive, setIsCallbackActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: ''
  });

  // Image URLs
  const imageUrls = {
    dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    dataFlow: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    security: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  };

  useEffect(() => {
    document.title = "Data Migration Services | Big Data Rhino";
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
    
    // Simulate API call
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', datetime: '' });
      setShowPopup(false);
      setIsCallbackActive(false);
      setIsSubmitting(false);
      alert('Your request has been submitted successfully!');
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Data <span className="text-indigo-600">Migration</span> Services
              </h1>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our data migration services help organizations identify, analyze, and reduce data-related risks while ensuring compliance with regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </Link>
                <button 
                  onClick={handleOpenPopup}
                  className={`border-2 border-indigo-600 ${theme === 'dark' ? 'text-indigo-400 border-indigo-400 hover:bg-indigo-900/20' : 'text-indigo-600 hover:bg-indigo-50'} px-8 py-4 rounded-lg font-semibold flex items-center justify-center`}
                >
                  <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-2" />
                  Request Callback
                </button>
              </div>
            </div>
            <div className="relative">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} aspect-video`}>
                <img 
                  src={imageUrls.dashboard} 
                  alt="Data Migration Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              We implement robust data protection strategies tailored to your specific industry needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Comprehensive Assessment",
                description: "Thorough data risk assessment to identify potential vulnerabilities"
              },
              {
                title: "Custom Strategies",
                description: "Development of customized migration strategies for your needs"
              },
              {
                title: "Advanced Security",
                description: "Implementation of advanced security protocols throughout"
              },
              {
                title: "Continuous Monitoring",
                description: "Ongoing monitoring and improvement of data protection"
              }
            ].map((item, index) => (
              <div key={index} className={`p-8 rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200 backdrop-blur-sm'}`}>
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                  <FiCheck className="text-indigo-600 dark:text-indigo-300 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShield className="text-3xl text-indigo-600" />,
                title: "Reduced Vulnerability",
                description: "Identify and address potential data breach points before they become liabilities."
              },
              {
                icon: <FiCheck className="text-3xl text-indigo-600" />,
                title: "Regulatory Compliance",
                description: "Stay compliant with GDPR, CCPA, HIPAA, and other relevant data protection regulations."
              },
              {
                icon: <FiDatabase className="text-3xl text-indigo-600" />,
                title: "Enhanced Trust",
                description: "Build customer confidence through demonstrated commitment to data protection."
              }
            ].map((benefit, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} shadow-lg backdrop-blur-sm`}>
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600/90 text-white backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Data Migration Needs?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our experts are here to help. Provide your contact details, and we'll schedule a convenient time to discuss your specific requirements.
          </p>
          <button 
            onClick={handleOpenPopup}
            className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center mx-auto bg-white text-indigo-600 hover:bg-gray-100`}
          >
            <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-2 invert" />
            Set Up a Callback
          </button>
        </div>
      </section>

      <Footer />

      {/* Callback Form Popup */}
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
  );
};

export default DataMigration;