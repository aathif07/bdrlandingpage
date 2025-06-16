import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="bg-black text-white py-16 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Terms and Conditions</h1>
        <div className="prose prose-lg max-w-none bg-gray-900 p-8 rounded-lg shadow-md text-gray-200">
          <p className="text-gray-400">Last updated: May 26, 2025</p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-300">
            These terms and conditions outline the rules and regulations for the use of Big Data Rhino Website.
            By accessing this website, you accept these terms and conditions in full. Do not continue to use
            our website if you do not agree to all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">2. License</h2>
          <p className="text-gray-300">
            Unless otherwise stated, BigData Website and/or its licensors own the intellectual property rights for
            all material on this website. All intellectual property rights are reserved. You may view and/or print
            pages from the website for your own personal use, subject to restrictions set in these terms and conditions.
          </p>
          <p className="text-gray-300 font-medium my-4">You must not:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 my-4">
            <li>Republish material from this website</li>
            <li>Sell, rent, or sub-license material from this website</li>
            <li>Reproduce, duplicate, or copy material from this website</li>
            <li>Redistribute content from this website</li>
            <li>Use this website in any way that causes damage to the website or impairs accessibility</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">3. User Content</h2>
          <p className="text-gray-300">
            In these terms and conditions, "User Content" refers to any audio, video, text, images, or other material
            you choose to display on this website. By displaying your User Content, you grant BigData Website a non-exclusive,
            worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate, and
            distribute it in any and all media.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-300">
            In no event shall BigData Website, nor any of its officers, directors, and employees, be liable to you for
            anything arising out of or in any way connected with your use of this website, whether such liability
            is under contract, tort, or otherwise. BigData Website shall not be liable for any indirect, consequential,
            or special liability arising out of or in any way related to your use of this website.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">5. Governing Law</h2>
          <p className="text-gray-300">
            These terms and conditions are governed by and construed in accordance with the laws of India,
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default TermsOfService;