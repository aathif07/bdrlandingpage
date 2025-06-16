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

const CustomDev = () => {
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
    document.title = "Custom Development | Big Data Rhino";

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
        source: 'Custom Development Services Page'
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
          <h1 className="text-4xl font-bold mb-8">Custom Development Services</h1>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-lg">
              At Big Data Rhino, we specialize in creating bespoke software solutions that address your specific business challenges. Our custom development services combine technical expertise with deep industry knowledge to deliver applications that drive real business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Development Process</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-medium">Discovery & Requirements</span>
                  <p className="text-sm mt-1 ml-6">We work closely with your team to understand your business objectives and specific requirements.</p>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-medium">Solution Design</span>
                  <p className="text-sm mt-1 ml-6">Our architects design a technical solution that addresses your needs while ensuring scalability and security.</p>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-medium">Agile Development</span>
                  <p className="text-sm mt-1 ml-6">We use agile methodology to deliver rapid iterations and maintain flexibility throughout the development process.</p>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-medium">Testing & Quality Assurance</span>
                  <p className="text-sm mt-1 ml-6">Rigorous testing ensures your application meets the highest standards of performance and reliability.</p>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-medium">Deployment & Support</span>
                  <p className="text-sm mt-1 ml-6">We manage the deployment process and provide ongoing support and maintenance for your solution.</p>
                </li>
              </ol>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Technologies We Excel In</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Frontend</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>React & React Native</li>
                    <li>Angular</li>
                    <li>Vue.js</li>
                    <li>TypeScript</li>
                    <li>Progressive Web Apps</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Backend</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Java/Spring</li>
                    <li>.NET Core</li>
                    <li>GraphQL</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Data & AI</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>TensorFlow</li>
                    <li>PyTorch</li>
                    <li>Apache Spark</li>
                    <li>Kubernetes</li>
                    <li>Cloud-native solutions</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Cloud Platforms</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AWS</li>
                    <li>Google Cloud</li>
                    <li>Microsoft Azure</li>
                    <li>IBM Cloud</li>
                    <li>Oracle Cloud</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Set Up Callback Section */}
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Have a Custom Development Idea?</h2>
            <p className="mb-4">
              Discuss your project requirements with our expert development team. We're here to provide tailored solutions that meet your unique needs. Set up a convenient callback time.
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

export default CustomDev;
