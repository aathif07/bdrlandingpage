import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Mission = () => {
  const { theme } = useTheme();

  // Update document title for SEO
  useEffect(() => {
    document.title = "Our Mission | Big Data Rhino";
    
    // Apply dark class to document root for global dark mode
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
          <h1 className="text-4xl font-bold mb-8">Our Mission</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              At Big Data Rhino, our mission is to harness the power of data and analytics to solve complex business challenges. 
              We can identify hidden patterns and opportunities within your data that others might miss.
            </p>
            <p className="text-lg mb-6">
              We can transform raw, unstructured data into strategic assets through our advanced analytics capabilities. 
              Our solutions can help organizations of all sizes make smarter decisions, reduce costs, and uncover new revenue streams.
            </p>
            <p className="text-lg mb-6">
              We are committed to providing innovative solutions that transform raw data into actionable insights, 
              enabling organizations to optimize operations, enhance customer experiences, and drive sustainable growth.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Core Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Innovation - Pushing the boundaries of what's possible with data</li>
              <li>Integrity - Maintaining the highest ethical standards in all we do</li>
              <li>Excellence - Consistently delivering exceptional results for our clients</li>
              <li>Collaboration - Working together to achieve shared goals</li>
              <li>Sustainability - Creating solutions with long-term positive impacts</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mission;