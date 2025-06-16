import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const articlesQuery = query(
          collection(db, 'articles'),
          where('slug', '==', slug),
          where('published', '==', true)
        );
        
        const querySnapshot = await getDocs(articlesQuery);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setArticle({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date()
          });
          
          // Set document title
          document.title = `${data.title || 'Article'} | Big Data Rhino`;
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const goBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center" 
        onClick={goBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8">
        {article.category && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-4">
            {article.category}
          </span>
        )}
        {article.author && <span>By {article.author}</span>}
        {article.createdAt && (
          <span className="ml-4">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-auto max-h-96 object-cover mb-8 rounded-lg"
        />
      )}
      
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default ArticleDetail;