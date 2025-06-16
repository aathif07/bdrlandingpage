import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import phoneIcon from '../../../public/phone icon.png';
import CallbackButton from '../../components/ui/CallbackButton';
import { submitCallbackRequest } from '../../lib/callbackService';
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

  useEffect(() => {
    document.title = "Methane Mitigation | Big Data Rhino";
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
        source: 'Methane Mitigation Services Page'
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
          <h1 className="text-4xl font-bold mb-8">Methane Mitigation Solutions</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Our methane mitigation services combine satellite technology, advanced analytics, and IoT sensors to help organizations detect, measure, and reduce methane emissions effectively.
            </p>

            {/* Why Methane Matters */}
            <div className="bg-blue-100/70 dark:bg-blue-900/40 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-blue-300/30 dark:border-blue-500/20 my-8">
              <h2 className="text-2xl font-semibold mb-4">Why Methane Matters</h2>
              <p>
                Methane (CH₄) is a potent greenhouse gas - more than 80 times more powerful than CO₂ over a 20-year period.
                Reducing methane emissions is one of the fastest and most effective ways to slow climate change in the near term.
              </p>
            </div>

            {/* Super-Emitters */}
            <div className="bg-indigo-100/70 dark:bg-indigo-900/40 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-indigo-300/30 dark:border-indigo-500/20 my-8">
              <h2 className="text-2xl font-semibold mb-4">Satellite-Based Monitoring of Super-Emitters</h2>
              <p className="mb-4">
                Our advanced satellite technologies enable large-scale, real-time tracking of methane "super-emitters" to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Pinpoint leak locations</strong> with unprecedented accuracy across wide geographic areas</li>
                <li><strong>Support enforcement</strong> by providing verifiable, time-stamped emission data to regulators</li>
                <li><strong>Prioritize mitigation efforts</strong> by identifying the highest-impact emission sources</li>
              </ul>
              <p>
                This technology is revolutionizing how we detect and address methane leaks, particularly in remote or hard-to-monitor locations.
              </p>
            </div>

            {/* Technology Stack */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-100/70 dark:bg-purple-900/40 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-purple-300/30 dark:border-purple-500/20">
                <h3 className="text-xl font-medium mb-3">Advanced Detection Systems</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Satellite-based methane detection (including super-emitter identification)</li>
                  <li>Ground-level sensor networks for localized monitoring</li>
                  <li>Aerial monitoring via drones for rapid response</li>
                  <li>AI-powered leak detection and classification algorithms</li>
                </ul>
              </div>
              <div className="bg-green-100/70 dark:bg-green-900/40 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-green-300/30 dark:border-green-500/20">


                <h3 className="text-xl font-medium mb-3">Data-Driven Solutions</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Real-time emissions monitoring and alerting</li>
                  <li>Predictive analytics for infrastructure maintenance</li>
                  <li>Automated regulatory reporting tools</li>
                  <li>Prioritization dashboards for mitigation efforts</li>
                </ul>
              </div>
            </div>

            {/* Industry Applications */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Industry Applications</h2>
            <div className="bg-yellow-100/70 dark:bg-yellow-900/40 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-yellow-300/30 dark:border-yellow-500/20 mb-6">
              <p className="mb-4">Our solutions are transforming methane mitigation across sectors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Oil and gas:</strong> Identifying and repairing leaks in production, transmission, and storage</li>
                <li><strong>Waste management:</strong> Monitoring landfill emissions and optimizing gas capture</li>
                <li><strong>Agriculture:</strong> Tracking emissions from livestock and manure management</li>
                <li><strong>Government:</strong> Supporting enforcement of methane regulations and policies</li>
              </ul>
            </div>

            {/* Impact Section */}
            <div className="bg-green-200/60 dark:bg-green-900/30 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-green-400/20 dark:border-green-700/30 my-8">
              <h2 className="text-2xl font-semibold mb-4">Impact of Our Work</h2>
              <p>
                Through our partnership with Carbon Mapper and the California Air Resources Board, we're helping to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Detect previously unknown methane super-emitters</li>
                <li>Provide data to support regulatory enforcement actions</li>
                <li>Prioritize mitigation efforts where they'll have the greatest impact</li>
                <li>Develop best practices for methane reduction across industries</li>
              </ul>
            </div>

            {/* Set Up Callback Section */}
            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ready to Take Action on Methane Emissions?</h2>
              <p className="mb-4">
                Connect with our methane mitigation experts to discuss your specific needs and explore how our technology can help you achieve your environmental goals.
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


export default MethaneMitigation;