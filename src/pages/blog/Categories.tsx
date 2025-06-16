
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { getBlogCategories, BlogCategory } from '../../lib/services/blogCategoryService';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button } from '../../components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryWithCount extends BlogCategory {
  blogCount: number;
}

const Categories = () => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog Categories | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchCategoriesWithCounts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories
        const categoriesData = await getBlogCategories();
        
        // For each category, count published blogs
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            const blogsQuery = query(
              collection(db, 'blogs'),
              where('category', '==', category.name),
              where('published', '==', true)
            );
            const blogsSnapshot = await getDocs(blogsQuery);
            
            return {
              ...category,
              blogCount: blogsSnapshot.size
            };
          })
        );
        
        setCategories(categoriesWithCounts);
      } catch (err) {
        console.error('Error fetching categories with counts:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCounts();
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Blog Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our blog posts organized by categories
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No categories available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                        {category.description}
                      </p>
                    )}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {category.blogCount} {category.blogCount === 1 ? 'Blog' : 'Blogs'}
                      </span>
                    </div>
                  </div>
                  
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
