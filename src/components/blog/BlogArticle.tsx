import React from 'react';
import { Link } from 'react-router-dom';

// The interface remains the same as our last update, reflecting data passed from Blog.tsx
interface BlogArticleProps {
  id: number; // ID from backend
  title: string;
  excerpt: string | null;
  fullDescription: string; // Full content
  category?: string | null;
  author?: string | null;
  authorTitle?: string | null;
  date: string; // Formatted date string
  readTime?: string | null;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const BlogArticle = ({
  id,
  title,
  excerpt,
  category,
  // imageUrl, // imageUrl is not used in the JSX below
  author,
  authorTitle,
  date,
  readTime,
  tags,
  // fullDescription // fullDescription is not displayed in the list view JSX
}: BlogArticleProps) => {

  return (
    // The entire card is wrapped in a Link using the article's ID
    // This assumes you have a route like /blog/:id set up
    <Link to={`/blog/${id}`} className="block h-full">
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col h-full">

        {/* --- Image Display Removed from List Item --- */}
        {/* The image rendering block that used imageUrl is removed here */}
        {/*
        {imageUrl && (
          <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
         {!imageUrl && (
             <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                 No Image
             </div>
         )}
        */}
        {/* --- End Image Display Removed --- */}


        <div className="flex-1 flex flex-col">
          <div className="mb-2">
            {/* Display Category and Tags */}
            <span className="inline-block text-xs font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {category || 'Uncategorized'}
            </span>
             {tags && tags.length > 0 && (
                 <span className="ml-2 inline-block text-xs font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                     {tags.join(', ')}
                 </span>
             )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {/* Display Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{excerpt || 'No excerpt available.'}</p>

          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              {/* Display Author and Date */}
              <span>{author || 'Unknown Author'} {authorTitle && `(${authorTitle})`}</span>
              <span>{date}</span>
            </div>
            {/* The "Read more" text is inside the Link wrapping the whole card */}
            <span className="text-rhino-blue hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogArticle;