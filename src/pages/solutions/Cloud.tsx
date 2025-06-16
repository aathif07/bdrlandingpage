import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext'; 
import phoneIcon from '../../../public/phone icon.png';
import CallbackButton from '../../components/ui/CallbackButton';
import { submitCallbackRequest } from '../../lib/callbackService';
import { toast } from 'sonner';

const Cloud = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  // Changed: Initialize isCallbackActive to true to make the icon jiggle immediately
  const [isCallbackActive, setIsCallbackActive] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: ''
  });

  useEffect(() => {
    document.title = "Cloud Solutions | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleOpenPopup = () => {
    setShowPopup(true);
    // This line can remain, but it's redundant since isCallbackActive is already true.
    // Keeping it does no harm.
    setIsCallbackActive(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Changed: Removed setIsCallbackActive(false) here to allow the icon to keep jiggling
    // after the popup is closed.
    // setIsCallbackActive(false); 
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
        source: 'Cloud Solutions Page'
      };
    
      await submitCallbackRequest(callbackData);
    
      setFormData({ name: '', email: '', phone: '', datetime: '' });
      setShowPopup(false);
      // You can decide if you want the jiggling to stop after a successful submission.
      // If you want it to stop, keep this line:
      setIsCallbackActive(false); 
      // If you want it to continue jiggling even after submission, comment out or remove the above line.
    
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
          <h1 className="text-4xl font-bold mb-8">Cloud Solutions</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Our cloud solutions help businesses leverage the flexibility, scalability, and cost-efficiency of cloud computing platforms to modernize their IT infrastructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Cloud Migration</h3>
                <p>Seamlessly transition your applications and data to the cloud.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Cloud-Native Development</h3>
                <p>Build applications optimized for cloud environments from the ground up.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Serverless Architecture</h3>
                <p>Eliminate infrastructure management with function-as-a-service solutions.</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ready to Unlock the Power of the Cloud?</h2>
              <p className="mb-4">
                Connect with our cloud experts to discuss a tailored strategy for your business.
              </p>
              <CallbackButton
                isCallbackActive={isCallbackActive} // This prop now ensures continuous jiggle
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

export default Cloud;