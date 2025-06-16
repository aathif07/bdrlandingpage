import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { useTheme } from '../context/ThemeContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  author?: string | null;
  tags?: string[];
  slug: string;
  published: boolean;
  createdAt: any;
  updatedAt: any;
}

const Blog = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog & Insights | Big Data Rhino";

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching documents from 'blogs' collection...");
        
        // ✅ Simple query first - no where or orderBy
        const blogsQuery = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsQuery);
        
        console.log("Total documents found:", querySnapshot.size);
        
        const blogData: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          console.log("Document ID:", doc.id, "Data:", doc.data());
          const data = doc.data();
          
          // ✅ Filter published blogs in JavaScript instead
          if (data.published === true) {
            blogData.push({
              id: doc.id,
              title: data.title || '',
              excerpt: data.excerpt || null,
              content: data.content || '',
              coverImage: data.coverImage || null,
              author: data.author || 'Admin',
              tags: data.tags || [],
              slug: data.slug || '',
              published: data.published !== undefined ? data.published : true,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt
            });
          }
        });
        
        // ✅ Sort in JavaScript
        blogData.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log("Published blogs found:", blogData.length);
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(`Failed to fetch blogs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No date';
    try {
      return timestamp.toDate ? 
        timestamp.toDate().toLocaleDateString() : 
        new Date(timestamp).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid date';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className={`text-4xl font-bold text-center mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Blog & Insights
          </h1>
          <p className={`text-xl text-center mb-16 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Latest news, insights and trends in big data, AI and technology.
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.slug}`}>
                  <div className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  } border p-4 flex flex-col h-full`}>
                    {blog.coverImage && (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="aspect-video w-full object-cover mb-4 rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    )}
                    <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {blog.title}
                    </h2>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {blog.excerpt}
                    </p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className={`inline-block px-2 py-1 text-xs rounded-full ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    <div className={`mt-auto pt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{blog.author}</span> | <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No blog posts available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
