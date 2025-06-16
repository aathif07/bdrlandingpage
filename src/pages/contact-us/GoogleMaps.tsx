
import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const GoogleMaps = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Google Maps | Big Data Rhino";
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Find Our Locations</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Use the interactive maps below to find our offices and get directions for your visit.
            </p>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Headquarters - Silicon Valley</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="aspect-w-16 aspect-h-9">
                  {/* Placeholder for Google Maps embed */}
                  <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <figure>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1161302425003!2d80.01318837483325!3d13.028276013633683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b827687f127%3A0xca9d2e9fba575931!2sSaveetha%20University!5e0!3m2!1sen!2sin!4v1738172769285!5m2!1sen!2sin" 
                      width="1180" height="380" loading="lazy">
                      </iframe>
                  </figure>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Address</h3>
                  <p>123 Tech Boulevard<br />Silicon Valley, CA 94025<br />United States</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Contact</h3>
                  <p>Phone: +1 (555) 123-4567<br />Email: sv@bigdatarhino.com</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">New York Office</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="aspect-w-16 aspect-h-9">
                  {/* Placeholder for Google Maps embed */}
                  <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <figure>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1161302425003!2d80.01318837483325!3d13.028276013633683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b827687f127%3A0xca9d2e9fba575931!2sSaveetha%20University!5e0!3m2!1sen!2sin!4v1738172769285!5m2!1sen!2sin" 
                      width="1180" height="380" loading="lazy">
                      </iframe>
                  </figure>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Address</h3>
                  <p>456 Data Avenue<br />New York, NY 10001<br />United States</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Contact</h3>
                  <p>Phone: +1 (555) 987-6543<br />Email: ny@bigdatarhino.com</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleMaps;
