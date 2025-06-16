import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  author?: string;
  date?: string;
  tags?: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  coverImage,
  author,
  date,
  tags
}) => {
  // Format date if provided
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={coverImage || '/images/placeholder.jpg'} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {excerpt || 'Read this article to learn more...'}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 text-sm text-muted-foreground">
        {author && <span className="mr-2">{author}</span>}
        {formattedDate && (
          <>
            <span className="mx-1">•</span>
            <span>{formattedDate}</span>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;