  import React, { useEffect, useState } from 'react';
  import Header from '../../components/layout/Header';
  import Footer from '../../components/layout/Footer';
  import InteractiveBackground from '../../components/effects/InteractiveBackground';
  import { useTheme } from '../../context/ThemeContext';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { db } from '../../lib/firebase';

  const Newsletter = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
      document.title = "Newsletter | Big Data Rhino";
    
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [theme]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!email || !email.includes('@')) {
        setMessage('Please enter a valid email address');
        return;
      }

      setIsSubmitting(true);
      setMessage('');

      try {
        // Save to Firebase - same as Footer.tsx
        await addDoc(collection(db, 'newsletterSubscriptions'), {
          email: email.trim().toLowerCase(),
          subscribedAt: serverTimestamp(),
          status: 'active',
          source: 'newsletter_page' // Different source to distinguish from footer
        });

        setSubscribed(true);
        setEmail('');
        setMessage('Successfully subscribed to our newsletter!');
      
        // Reset success state after 5 seconds
        setTimeout(() => {
          setSubscribed(false);
          setMessage('');
        }, 5000);
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        setMessage('Failed to subscribe. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <InteractiveBackground />
        <Header />
        <main className="pt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Subscribe to Our Newsletter</h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <p className="text-lg mb-6 text-center dark:text-gray-300">
                Stay updated with the latest insights, trends, and news in data science, AI, and analytics.
              </p>
            
              {subscribed ? (
                <div className="text-center py-8">
                  <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl font-medium mb-2 dark:text-white">Thank You for Subscribing!</h3>
                  <p className="dark:text-gray-300">You'll receive our next newsletter in your inbox.</p>
                  {message && (
                    <p className="text-green-600 dark:text-green-400 mt-2 text-sm">{message}</p>
                  )}
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-300">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                
                  {/* Show error message if any */}
                  {message && !subscribed && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                      <p className="text-red-600 dark:text-red-400 text-sm">{message}</p>
                    </div>
                  )}
                </>
              )}
            
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-4 dark:text-white">What You'll Receive:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="dark:text-gray-300">Monthly industry insights and analysis</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="dark:text-gray-300">New case studies and success stories</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="dark:text-gray-300">Product updates and company news</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="dark:text-gray-300">Exclusive content and resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  export default Newsletter;
