import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import CallbackButton from '../components/ui/CallbackButton';
import { submitCallbackRequest } from '../lib/callbackService';
import { FiArrowRight, FiCheck, FiBarChart2, FiCpu, FiDatabase, FiTrendingUp, FiTarget } from 'react-icons/fi';
import phoneIcon from '../../public/phone icon.png';
import { toast } from 'sonner';

const MethaneMitigation = () => {
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
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    analyticsDashboard: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    dataVisualization: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  };

  useEffect(() => {
    document.title = "AI-Driven Growth Solutions | Big Data Rhino";
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleOpenPopup = () => {
    setShowPopup(true);
    setIsCallbackActive(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const callbackData = {
        ...formData,
        source: 'AI Growth Solutions Page'
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
                Achieve <span className="text-indigo-600">Measurable Growth</span> through AI-Driven Insights
              </h1>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Leverage our data-backed strategies and cutting-edge AI analytics to drive sustainable business growth and outperform your competition.
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
                  src={imageUrls.heroImage} 
                  alt="AI Analytics Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/70 dark:bg-gray-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Business with Data</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Our AI-driven approach delivers actionable insights that drive real business outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Predictive Analytics",
                description: "Anticipate market trends and customer needs before they emerge",
                icon: <FiBarChart2 className="text-3xl text-indigo-600" />
              },
              {
                title: "AI Optimization",
                description: "Machine learning models that continuously improve your operations",
                icon: <FiCpu className="text-3xl text-indigo-600" />
              },
              {
                title: "Data Integration",
                description: "Unify all your data sources for comprehensive insights",
                icon: <FiDatabase className="text-3xl text-indigo-600" />
              },
              {
                title: "Growth Forecasting",
                description: "Accurate projections to guide your strategic decisions",
                icon: <FiTrendingUp className="text-3xl text-indigo-600" />
              },
              {
                title: "Customer Insights",
                description: "Deep understanding of customer behavior and preferences",
                icon: <FiTarget className="text-3xl text-indigo-600" />
              },
              {
                title: "Performance Tracking",
                description: "Real-time monitoring of key business metrics",
                icon: <FiCheck className="text-3xl text-indigo-600" />
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm hover:shadow-xl transition-shadow`}
              >
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Data-Backed Approach</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A proven methodology to unlock growth potential in your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Data Collection",
                description: "We gather and clean all relevant data from your business and market",
                step: "1"
              },
              {
                title: "AI Analysis",
                description: "Advanced algorithms identify patterns and opportunities",
                step: "2"
              },
              {
                title: "Strategy Development",
                description: "Custom growth plans tailored to your specific needs",
                step: "3"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}
              >
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <img 
                  src={imageUrls.analyticsDashboard} 
                  alt="Analytics Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Actionable Insights Dashboard</h3>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our proprietary dashboard surfaces the most important insights from your data, prioritized by potential impact on your business growth.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time performance metrics",
                  "Automated anomaly detection",
                  "Predictive trend analysis",
                  "Customizable reporting",
                  "Executive-level summaries"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-100/70 dark:bg-indigo-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Results</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              See how we've helped businesses like yours achieve measurable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Retailer",
                result: "32% increase in conversion rates",
                description: "Through personalized product recommendations powered by AI"
              },
              {
                title: "SaaS Platform",
                result: "45% reduction in churn",
                description: "By identifying at-risk customers and implementing retention strategies"
              },
              {
                title: "Manufacturing Firm",
                result: "28% cost savings",
                description: "Via predictive maintenance and supply chain optimization"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-4">{item.result}</p>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`p-12 rounded-2xl shadow-xl text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-600 text-white'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Growth?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our team of data scientists and growth strategists is ready to help you unlock the full potential of your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className={`px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-gray-100 text-indigo-600'}`}
              >
                Get Started <FiArrowRight className="ml-2" />
              </Link>
              <button 
                onClick={handleOpenPopup}
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center ${theme === 'dark' ? 'bg-white hover:bg-gray-100 text-indigo-600' : 'bg-indigo-700 hover:bg-indigo-800 text-white'}`}
              >
                <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-2" />
                Request Consultation
              </button>
            </div>
          </div>
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
              <h3 className="text-2xl font-semibold">Schedule Consultation</h3>
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
                {isSubmitting ? "Submitting..." : "Request Consultation"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethaneMitigation;