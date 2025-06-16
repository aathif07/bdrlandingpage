import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="bg-black text-white py-16 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Cookie Policy</h1>
        <div className="prose prose-lg max-w-none bg-gray-900 p-8 rounded-lg shadow-md text-gray-200">
          <p className="text-gray-400">Last updated: May 26, 2025</p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">1. What Are Cookies</h2>
          <p className="text-gray-300">
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is
            stored in your web browser and allows the website or a third-party to recognize you and make your
            next visit easier and the website more useful to you.
          </p>  
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-300">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 my-4">
            <li><strong className="text-blue-200">Essential cookies:</strong> These are cookies that are required for the operation of our website.</li>
            <li><strong className="text-blue-200">Analytical/performance cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
            <li><strong className="text-blue-200">Functionality cookies:</strong> These are used to recognize you when you return to our website.</li>
            <li><strong className="text-blue-200">Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">3. Third-Party Cookies</h2>
          <p className="text-gray-300">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics
            of the website, deliver advertisements on and through the website, and so on.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">4. What Are Your Choices Regarding Cookies</h2>
          <p className="text-gray-300">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit
            the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept
            them, you might not be able to use all of the features we offer, you may not be able to store your preferences,
            and some of our pages might not display properly.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">5. Where Can You Find More Information About Cookies</h2>
          <p className="text-gray-300">
            You can learn more about cookies at the following third-party websites:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 my-4">
            <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.allaboutcookies.org/</a></li>
            <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.networkadvertising.org/</a></li>
          </ul>
          
          <div className="mt-12 pt-6 border-t border-gray-700">
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;