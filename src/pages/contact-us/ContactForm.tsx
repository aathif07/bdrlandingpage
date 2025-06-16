
import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/button';

const ContactForm = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact Form | Big Data Rhino";
    
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
          <h1 className="text-4xl font-bold mb-8">Contact Form</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Get in touch with our team using the form below. We'll respond promptly to your inquiry.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name*</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter your name" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address*</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter your email" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter your phone number" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject*</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter subject" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message*</label>
                    <textarea 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      rows={6}
                      placeholder="Enter your message" 
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      className="mr-2" 
                    />
                    <label htmlFor="privacy" className="text-sm">
                      I agree to the privacy policy and terms of service
                    </label>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                      Submit Message
                    </Button>
                  </div>
                </form>
              </div>
              
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Email:</p>
                      <p>contact@bigdatarhino.com</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="font-medium">Headquarters:</p>
                      <p>123 Tech Boulevard<br />Silicon Valley, CA 94025</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 2:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
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

export default ContactForm;
