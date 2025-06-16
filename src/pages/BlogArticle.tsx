  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '@/lib/firebase';
  import ReactMarkdown from 'react-markdown';
  import Header from '../components/layout/Header';
  import Footer from '../components/layout/Footer';
  import InteractiveBackground from '../components/effects/InteractiveBackground';
  import { useTheme } from '../context/ThemeContext';

  const BlogArticle = () => {
    const { theme } = useTheme();
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      document.title = "Article | Big Data Rhino";
    
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [theme]);

    useEffect(() => {
      const fetchBlog = async () => {
        if (!id) return;
      
        setLoading(true);
        try {
          // First try to fetch by slug
          const blogsQuery = query(
            collection(db, 'blogs'),
            where('slug', '==', id),
            where('published', '==', true)
          );
        
          let querySnapshot = await getDocs(blogsQuery);
        
          if (querySnapshot.empty) {
            // If not found by slug, try by ID
            const blogsQuery = query(
              collection(db, 'blogs'),
              where('__name__', '==', id),
              where('published', '==', true)
            );
            querySnapshot = await getDocs(blogsQuery);
          }
        
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            setBlog({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate?.() || new Date()
            });
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found</p>;

    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <InteractiveBackground />
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          
            <div className="mb-8 text-muted-foreground">
              {blog.author && <span>By {blog.author}</span>}
              {blog.createdAt && (
                <span className="ml-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-auto max-h-96 object-cover mb-8 rounded-lg"
              />
            )}
          
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  export default BlogArticle;
