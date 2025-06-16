import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import phoneIcon from '../../../public/phone icon.png';
import CallbackButton from '../../components/ui/CallbackButton';
import { submitCallbackRequest } from '../../lib/callbackService';
import { toast } from 'sonner';

const Fintech = () => {
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

  useEffect(() => {
    document.title = "Fintech Solutions | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
        source: 'Fintech Solutions Page'
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
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Fintech Solutions</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <p className="text-lg mb-6">
                Big Data Rhino provides cutting-edge fintech solutions that help financial institutions leverage data analytics and AI to enhance their operations, improve customer experiences, and maximize profitability while maintaining security and compliance.
              </p>
              <p className="mb-6">
                Our team of financial technology experts combines deep industry knowledge with technical expertise to deliver solutions tailored to the unique challenges facing modern financial services providers.
              </p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Industry Stats</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-2xl font-bold">67%</span>
                  <span>of financial institutions cite data analytics as their top investment priority</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl font-bold">3.2x</span>
                  <span>higher customer retention for banks with advanced AI capabilities</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl font-bold">$4.8T</span>
                  <span>projected value of AI-powered banking transactions by 2026</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Our Fintech Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Fraud Detection</h3>
              <p>Advanced machine learning algorithms that identify suspicious patterns and prevent fraudulent transactions in real-time.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Risk Assessment</h3>
              <p>Sophisticated models that evaluate credit risk, market risk, and operational risk with greater accuracy than traditional methods.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Personalized Banking</h3>
              <p>AI-driven recommendation engines that provide tailored financial products and services to individual customers.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Regulatory Compliance</h3>
              <p>Automated systems for monitoring transactions and activities to ensure compliance with evolving financial regulations.</p>
            </div>
          </div>

          {/* Banking Compliance Tool Section */}
          <div className="mb-12 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white p-8 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">CFPB Rule 1071 Banking Compliance Tool</h2>
              <p className="text-xl mb-6">Navigate Rule 1071 with Ease and Avoid Penalties Up To $100,000 Per Month</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>CFPB Rule 1071 requires reporting credit application data for small businesses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Special emphasis on businesses owned by women and minorities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Non-compliance risks $100,000 monthly fines and reputational damage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Solution</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Simplifies the compliance process with precise reporting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Improves user experience and cross-department collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Converts regulatory challenges into business opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://meetings.hubspot.com/big-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 px-8 rounded-md font-medium transition duration-300"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>

                    {/* Set Up Callback Section */}
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Interested in Exploring Our Fintech Solutions?</h2>
            <p className="mb-4">
              Let's discuss how our data analytics and AI expertise can drive innovation and efficiency in your financial institution. Schedule a callback with our fintech specialists.
            </p>
            <CallbackButton 
              isCallbackActive={isCallbackActive}
              phoneIcon={phoneIcon}
              onClick={handleOpenPopup}
            />
          </div>
        </div>
      </main>
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

export default Fintech;

