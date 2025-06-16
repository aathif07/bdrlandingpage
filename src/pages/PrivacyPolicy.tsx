import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white py-16 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none bg-gray-900 p-8 rounded-lg shadow-md text-gray-200">
          <p className="text-gray-400">Last updated: May 26, 2025 </p>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 my-4">
            <li><strong className="text-blue-200">Information you provide:</strong> Name, email, phone number, company name, job title, and any other details provided through forms or emails.</li>
            <li><strong className="text-blue-200">Automatically collected data:</strong> IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages, via tools such as Google Analytics.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-300">
            We use your information to provide and improve our services, respond to inquiries, communicate with you, and for marketing and analytics purposes.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-300">
            We use cookies and similar technologies for website functionality and analytics. Please refer to our <Link to="/cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</Link> for more details.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">4. Sharing of Data</h2>
          <p className="text-gray-300">
            We do not sell your personal data. We may share it with trusted service providers who assist us in operating our website and delivering our services, or with legal authorities if required by law.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">5. Data Retention</h2>
          <p className="text-gray-300">
            We retain personal data for as long as necessary to fulfill the purposes for which we collected it, including for satisfying any legal, accounting, or reporting requirements.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">6. Your Rights</h2>
          <p className="text-gray-300">
            Depending on your geographic location and applicable data protection laws, you may have specific rights regarding your personal data. These rights may include the right to access, correct, delete your data, or object to its processing. To exercise any of these rights, please contact us.
          </p>
          <p className="text-gray-300">
            Email: info@bigdatarhino.com<br/>
          </p>

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

export default PrivacyPolicy;