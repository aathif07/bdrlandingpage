import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

interface Article {
  id: string;
  title: string;
  content: string;   
  category: string;
  coverImage?: string | null;
  author?: string | null;
  slug: string;
  published: boolean;
  createdAt: any;
}

const Articles = () => {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Articles | Big Data Rhino";
  
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching documents from 'articles' collection...");
        
        // ✅ Simple query first - no where or orderBy
        const articlesQuery = collection(db, 'articles');
        const querySnapshot = await getDocs(articlesQuery);
        
        console.log("Total documents found:", querySnapshot.size);
        
        const articleData: Article[] = [];
        querySnapshot.forEach((doc) => {
          console.log("Document ID:", doc.id, "Data:", doc.data());
          const data = doc.data();
          
          // ✅ Filter published articles in JavaScript instead
          if (data.published === true) {
            articleData.push({
              id: doc.id,
              title: data.title || '',
              content: data.content || '',
              category: data.category || 'Uncategorized',
              coverImage: data.coverImage || null,
              author: data.author || 'Admin',
              slug: data.slug || '',
              published: data.published !== undefined ? data.published : true,
              createdAt: data.createdAt
            });
          }
        });
        
        // ✅ Sort in JavaScript
        articleData.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log("Published articles found:", articleData.length);
        setArticles(articleData);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(`Failed to fetch articles: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
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
            Articles
          </h1>
          <p className={`text-xl text-center mb-16 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            In-depth articles on big data technologies, AI innovations, and industry insights.
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article.id} to={`/blog/articles/${article.slug}`}>
                  <div className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  } border p-4 flex flex-col h-full`}>
                    {article.coverImage && (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="aspect-video w-full object-cover mb-4 rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    )}
                    <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {article.title}
                    </h2>
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {article.category}
                      </span>
                    </div>
                    <div className={`mt-auto pt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{article.author}</span> | <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No articles available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
