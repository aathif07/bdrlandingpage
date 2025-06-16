import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  getDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, ArrowLeft, Eye, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';

interface Article {
  title: string;
  content: string;
  category: string;
  published: boolean;
  slug: string;
  author: string;
  createdAt?: any;
  updatedAt?: any;
}

const ArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== 'new' && !!id;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('edit');

  const [article, setArticle] = useState<Article>({
    title: '',
    content: '',
    category: '',
    published: false,
    slug: '',
    author: auth.currentUser?.displayName || 'Admin'
  });

  // ADD THIS FUNCTION - Convert line breaks to HTML
  const convertLineBreaksToHtml = (content: string): string => {
    return content
      // First, convert double line breaks to paragraph tags
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim()) {
          // Convert single line breaks within paragraphs to <br> tags
          const formattedParagraph = paragraph.replace(/\n/g, '<br />');
          return `<p>${formattedParagraph}</p>`;
        }
        return '';
      })
      .filter(p => p) // Remove empty paragraphs
      .join('\n');
  };

  // Add this function after the existing convertLineBreaksToHtml function
  const convertHtmlToPlainText = (html: string): string => {
    if (!html) return '';
    
    return html
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
      .trim();
  };

  // Load article data if in edit mode
  useEffect(() => {
    const loadArticle = async () => {
      if (isEditMode && id) {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'articles', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setArticle({
              title: data.title || '',
              content: convertHtmlToPlainText(data.content || ''), // Convert HTML back to plain text
              category: data.category || '',
              published: data.published || false,
              slug: data.slug || generateSlug(data.title),
              author: data.author || auth.currentUser?.displayName || 'Admin',
              createdAt: data.createdAt,
              updatedAt: data.updatedAt
            });
          } else {
            toast({
              title: "Error",
              description: "Article not found",
              variant: "destructive"
            });
            navigate('/admin/articles');
          }
        } catch (error) {
          console.error("Error loading article:", error);
          toast({
            title: "Error",
            description: "Failed to load article data",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadArticle();
  }, [id, isEditMode, navigate, toast]);

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title changes
    if (name === 'title' && !isEditMode) {
      setArticle(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setArticle(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle published status toggle
  const handlePublishedChange = (checked: boolean) => {
    setArticle(prev => ({
      ...prev,
      published: checked
    }));
  };

  // MODIFY THIS FUNCTION - Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Make sure we have the required fields
      if (!article.title) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!article.content) {
        toast({
          title: "Error",
          description: "Content is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!article.category) {
        toast({
          title: "Error",
          description: "Category is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!article.slug) {
        // Auto-generate slug if empty
        const generatedSlug = generateSlug(article.title);
        
        setArticle(prev => ({
          ...prev,
          slug: generatedSlug
        }));
      }
      
      // CHANGE THIS PART - Prepare data for Firestore with HTML formatting
      const articleData = {
        title: article.title,
        content: convertLineBreaksToHtml(article.content), // Convert line breaks to HTML
        category: article.category,
        published: article.published,
        slug: article.slug,
        author: article.author,
        updatedAt: serverTimestamp(),
        createdAt: isEditMode ? article.createdAt : serverTimestamp()
      };

      console.log("Saving article with data:", JSON.stringify(articleData, null, 2));

      if (isEditMode && id) {
        // Update existing article
        const docRef = doc(db, 'articles', id);
        await updateDoc(docRef, articleData);
        toast({
          title: "Success",
          description: "Article updated successfully"
        });
      } else {
        // Create new article
        const docRef = await addDoc(collection(db, 'articles'), articleData);
        console.log("Document written with ID: ", docRef.id);
        toast({
          title: "Success",
          description: "Article created successfully"
        });
      }
      
      // Navigate back to article list
      navigate('/admin/articles');
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: `Failed to save article: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading article data...</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/articles')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={article.published}
                onCheckedChange={handlePublishedChange}
                id="published"
              />
              <Label htmlFor="published">
                {article.published ? 'Published' : 'Draft'}
              </Label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={article.title}
                  onChange={handleInputChange}
                  placeholder="Article title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={article.slug}
                  onChange={handleInputChange}
                  placeholder="url-friendly-slug"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={article.category}
                  onChange={handleInputChange}
                  placeholder="Article category"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Content</Label>
              {/* ADD THIS HELPER TEXT */}
              <div className="text-sm text-muted-foreground mb-2 p-3 bg-muted/50 rounded-md">
                <p className="font-medium mb-2">Formatting Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Leave a <strong>blank line</strong> between paragraphs</li>
                  <li>• Single line breaks will become line breaks in your article</li>
                  <li>• Double line breaks will create new paragraphs</li>
                </ul>
              </div>
              
              <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="edit" className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit">
                  <Textarea
                    id="content"
                    name="content"
                    value={article.content}
                    onChange={handleInputChange}
                    placeholder="Write your article content here...

Leave a blank line between paragraphs for proper formatting.

This will create separate paragraphs when displayed on your website."
                    rows={15}
                    required
                  />
                </TabsContent>
                
                {/* MODIFY THIS PART - Update preview to show HTML output */}
                <TabsContent value="preview">
                  <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none border rounded-md p-4 min-h-[300px]">
                    {article.content ? (
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: convertLineBreaksToHtml(article.content) 
                        }} 
                      />
                    ) : (
                      <p className="text-muted-foreground">Nothing to preview yet...</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving || !article.title || !article.content || !article.category}
                className="flex items-center"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditMode ? 'Update Article' : 'Create Article'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ArticleEditorPage;
