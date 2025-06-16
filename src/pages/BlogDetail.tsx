import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const blogsQuery = query(
          collection(db, 'blogs'),
          where('slug', '==', slug),
          where('published', '==', true)
        );
        
        const querySnapshot = await getDocs(blogsQuery);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setBlog({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date()
          });
          
          // Set document title
          document.title = `${data.title || 'Blog'} | Big Data Rhino`;
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      
      <div className="mb-8 text-gray-600">
        {blog.tags && blog.tags.length > 0 && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-4">
            {blog.tags[0]}
          </span>
        )}
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
      
      <div className="prose prose-lg max-w-none">
        {blog.content.startsWith('<') ? (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
