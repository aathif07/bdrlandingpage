import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';
import phoneIcon from '../../public/phone icon.png';
import CallbackButton from '../components/ui/CallbackButton';
import { submitCallbackRequest } from '../lib/callbackService';
import { toast } from 'sonner';

const Solutions = () => {
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
    document.title = "Solutions | Big Data Rhino";

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
        source: 'Solutions Page'
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
          <h1 className="text-4xl font-bold mb-8">Our Solutions</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Discover our comprehensive suite of technology solutions designed to transform your business operations and drive innovation.
            </p>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">AI & Machine Learning</h3>
                <p className="mb-4">Harness the power of artificial intelligence to automate processes, gain insights, and make data-driven decisions.</p>
                <Link 
                  to="/solutions/ai-ml" 
                  className="text-blue-500 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Cybersecurity</h3>
                <p className="mb-4">Protect your digital assets with our comprehensive cybersecurity solutions and threat detection systems.</p>
                <Link 
                  to="/solutions/cybersecurity" 
                  className="text-blue-500 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Cloud Solutions</h3>
                <p className="mb-4">Modernize your infrastructure with scalable, secure, and cost-effective cloud computing solutions.</p>
                <Link 
                  to="/solutions/cloud" 
                  className="text-blue-500 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Why Choose Our Solutions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Our Solutions?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Proven Expertise</h3>
                  <p>Our team brings years of experience across multiple industries and technologies.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Scalable Architecture</h3>
                  <p>Solutions designed to grow with your business and adapt to changing needs.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
                  <p>Round-the-clock technical support to ensure your systems run smoothly.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Cost-Effective</h3>
                  <p>Maximize ROI with solutions that deliver measurable business value.</p>
                </div>
              </div>
            </div>

            {/* Industry Applications */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Industry Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <h4 className="font-medium mb-2">Healthcare</h4>
                  <p className="text-sm">Patient data analytics and medical imaging solutions</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <h4 className="font-medium mb-2">Finance</h4>
                  <p className="text-sm">Risk assessment and fraud detection systems</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <h4 className="font-medium mb-2">Manufacturing</h4>
                  <p className="text-sm">Predictive maintenance and quality control</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <h4 className="font-medium mb-2">Retail</h4>
                  <p className="text-sm">Customer analytics and inventory optimization</p>
                </div>
              </div>
            </div>

            {/* Implementation Process */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Implementation Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">1</div>
                  <h4 className="font-medium mb-1">Assessment</h4>
                  <p className="text-sm">Analyze your current infrastructure and requirements</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">2</div>
                  <h4 className="font-medium mb-1">Design</h4>
                  <p className="text-sm">Create a customized solution architecture</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">3</div>
                  <h4 className="font-medium mb-1">Implementation</h4>
                  <p className="text-sm">Deploy and integrate the solution</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">4</div>
                  <h4 className="font-medium mb-1">Support</h4>
                  <p className="text-sm">Ongoing maintenance and optimization</p>
                </div>
              </div>
            </div>

            {/* Set Up Callback Section */}
            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ready to Innovate with Custom Solutions?</h2>
              <p className="mb-4">
                Let's discuss how our solutions can transform your business. Schedule a consultation with our experts to explore the possibilities.
              </p>
              <CallbackButton
                isCallbackActive={isCallbackActive}
                phoneIcon={phoneIcon}
                onClick={handleOpenPopup}
              />
            </div>
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

export default Solutions;
