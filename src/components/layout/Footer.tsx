import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'newsletterSubscriptions'), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'footer'
      });

      setMessage('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-rhino-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span style={{ color: '#0033A0' }}>Big Data</span> Rhino
            </h3>
            <p className="text-gray-300 max-w-xs">
              Empowering businesses with cutting-edge data analytics, AI, and machine learning solutions.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://x.com/bigdatarhino" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rhino-blue transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/big-data-rhino/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rhino-blue transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/big_data_rhino/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rhino-blue transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-rhino-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-rhino-blue transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-rhino-blue transition-colors">Services</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-rhino-blue transition-colors">Research</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-rhino-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/solutions/ai-ml" className="text-gray-300 hover:text-rhino-blue transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/services/data-migration" className="text-gray-300 hover:text-rhino-blue transition-colors">Data Migration</Link></li>
              <li><Link to="/services/fintech" className="text-gray-300 hover:text-rhino-blue transition-colors">FinTech Solutions</Link></li>
              <li><Link to="/services/custom-dev" className="text-gray-300 hover:text-rhino-blue transition-colors">Custom Development</Link></li>
              <li><Link to="/services/government-solutions" className="text-gray-300 hover:text-rhino-blue transition-colors">Government Solutions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-rhino-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-300 hover:text-rhino-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-300 hover:text-rhino-blue transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact & Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#0033A0"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">1902 Wright Place, Suite 200-3425 Carlsbad, CA 92008</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#0033A0"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">info@bigdatarhino.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex flex-col justify-between">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <p className="text-gray-300 mb-2">Subscribe to our newsletter for the latest updates</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-rhino-blue text-gray-900 w-full"
                      required
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-rhino-blue hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  {message && (
                    <p className={`text-sm ${message.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>
                      {message}
                    </p>
                  )}
                </form>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400">© {new Date().getFullYear()} Big Data Rhino. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;