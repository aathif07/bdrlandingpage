import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Tags = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Content Tags | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Define a mapping from tag name to its corresponding route
  const tagRoutes: { [key: string]: string } = {
    "AI": "/solutions/ai-ml",
    "Machine Learning": "/solutions/ai-ml", // Assuming ML also goes to AI/ML page
    "Data Migration": "/services/data-migration", // Assuming this maps to Data Mitigation
    "Cybersecurity": "/solutions/cybersecurity",
    "Cloud Computing": "/solutions/cloud",
    "Big Data": "/solutions/ai-ml", // Assuming Big Data is covered under AI/ML or a general solutions page
    "FinTech": "/services/fintech",
    "Digital Transformation": "/solutions", // General solutions or a more specific page if available
    "Government": "/services/government-solutions",
    "Energy": "/services/methane-mitigation", // Assuming energy could relate to methane mitigation or a broader energy solution
    // Add more mappings as needed for other tags
  };

  const popularTags = [
    { name: "AI" },
    { name: "Machine Learning" },
    { name: "Data Migration" },
    { name: "Cybersecurity" },
    { name: "Cloud Computing" },
    { name: "Big Data" },
    { name: "FinTech" },
    { name: "Digital Transformation" },
    { name: "Government" },
    { name: "Energy" },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Content Tags</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Browse our content by tags to find exactly what you're looking for. Our tag system helps you discover related articles and insights across different categories.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-3">
                {popularTags.map(tag => {
                  const tagPath = tagRoutes[tag.name]; // Get the path for the current tag
                  return (
                    // Use Link component for navigation
                    <Link
                      key={tag.name}
                      to={tagPath || "#"} // If no path is defined, link to '#' or a default page
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Explore by Tag</h2>
            <p>
              Click on any tag to see all related content. Our tags are regularly updated to ensure you can find the most relevant information for your interests and needs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tags;