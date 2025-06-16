
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, ArrowLeft, Eye, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBlogCategories, BlogCategory } from '@/lib/services/blogCategoryService';

interface Blog {
  title: string;
  content: string;
  category: string;
  published: boolean;
  slug: string;
  author: string;
  excerpt?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
}

const BlogEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== 'new' && !!id;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  const [blog, setBlog] = useState<Blog>({
    title: '',
    content: '',
    category: '',
    published: false,
    slug: '',
    author: auth.currentUser?.displayName || 'Admin',
    excerpt: '',
    tags: []
  });

  // Convert line breaks to HTML
  const convertLineBreaksToHtml = (content: string): string => {
    return content
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim()) {
          const formattedParagraph = paragraph.replace(/\n/g, '<br />');
          return `<p>${formattedParagraph}</p>`;
        }
        return '';
      })
      .filter(p => p)
      .join('\n');
  };

  // Convert HTML back to plain text
  const convertHtmlToPlainText = (html: string): string => {
    if (!html) return '';
    
    return html
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const categoriesData = await getBlogCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive"
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [toast]);

  // Load blog data if in edit mode
  useEffect(() => {
    const loadBlog = async () => {
      if (isEditMode && id) {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'blogs', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBlog({
              title: data.title || '',
              content: convertHtmlToPlainText(data.content || ''),
              category: data.category || '',
              published: data.published || false,
              slug: data.slug || generateSlug(data.title),
              author: data.author || auth.currentUser?.displayName || 'Admin',
              excerpt: data.excerpt || '',
              tags: Array.isArray(data.tags) ? data.tags : [],
              createdAt: data.createdAt,
              updatedAt: data.updatedAt
            });
          } else {
            toast({
              title: "Error",
              description: "Blog not found",
              variant: "destructive"
            });
            navigate('/admin/blogs');
          }
        } catch (error) {
          console.error("Error loading blog:", error);
          toast({
            title: "Error",
            description: "Failed to load blog data",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadBlog();
  }, [id, isEditMode, navigate, toast]);

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title' && !isEditMode) {
      setBlog(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setBlog(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setBlog(prev => ({
      ...prev,
      category: value
    }));
  };

  // Handle tags input
  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    setBlog(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  // Handle published status toggle
  const handlePublishedChange = (checked: boolean) => {
    setBlog(prev => ({
      ...prev,
      published: checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!blog.title) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!blog.content) {
        toast({
          title: "Error",
          description: "Content is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!blog.category) {
        toast({
          title: "Error",
          description: "Category is required",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      if (!blog.slug) {
        const generatedSlug = generateSlug(blog.title);
        setBlog(prev => ({
          ...prev,
          slug: generatedSlug
        }));
      }
      
      const tags = Array.isArray(blog.tags) ? blog.tags : [];
      
      const blogData = {
        title: blog.title,
        content: convertLineBreaksToHtml(blog.content),
        category: blog.category,
        published: blog.published,
        slug: blog.slug,
        author: blog.author,
        excerpt: blog.excerpt || '',
        tags: tags,
        updatedAt: serverTimestamp(),
        createdAt: isEditMode ? blog.createdAt : serverTimestamp()
      };

      console.log("Saving blog with data:", JSON.stringify(blogData, null, 2));

      if (isEditMode && id) {
        const docRef = doc(db, 'blogs', id);
        await updateDoc(docRef, blogData);
        toast({
          title: "Success",
          description: "Blog updated successfully"
        });
      } else {
        const docRef = await addDoc(collection(db, 'blogs'), blogData);
        console.log("Document written with ID: ", docRef.id);
        toast({
          title: "Success",
          description: "Blog created successfully"
        });
      }
      
      navigate('/admin/blogs');
    } catch (error) {
      console.error("Error saving blog:", error);
      toast({
        title: "Error",
        description: `Failed to save blog: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading blog data...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/blogs')}
              className="flex items-center w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={blog.published}
                onCheckedChange={handlePublishedChange}
                id="published"
              />
              <Label htmlFor="published">
                {blog.published ? 'Published' : 'Draft'}
              </Label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={blog.title}
                    onChange={handleInputChange}
                    placeholder="Blog title"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={blog.slug}
                    onChange={handleInputChange}
                    placeholder="url-friendly-slug"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  {loadingCategories ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Loading categories...</span>
                    </div>
                  ) : (
                    <Select value={blog.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={blog.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the blog post"
                    rows={3}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={Array.isArray(blog.tags) ? blog.tags.join(', ') : ''}
                    onChange={handleTagsChange}
                    placeholder="tag1, tag2, tag3"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Content</Label>
                <div className="text-sm text-muted-foreground mb-2 p-3 bg-muted/50 rounded-md">
                  <p className="font-medium mb-2">Formatting Tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Leave a <strong>blank line</strong> between paragraphs</li>
                    <li>• Single line breaks will become line breaks in your blog</li>
                    <li>• Double line breaks will create new paragraphs</li>
                  </ul>
                </div>
                
                <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 w-full sm:w-auto">
                    <TabsTrigger value="edit" className="flex items-center flex-1 sm:flex-none">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center flex-1 sm:flex-none">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="edit">
                    <Textarea
                      id="content"
                      name="content"
                      value={blog.content}
                      onChange={handleInputChange}
                      placeholder="Write your blog content here...

Leave a blank line between paragraphs for proper formatting.

This will create separate paragraphs when displayed on your website."
                      rows={15}
                      required
                      className="w-full min-h-[400px]"
                    />
                  </TabsContent>
                  
                  <TabsContent value="preview">
                    <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none border rounded-md p-4 min-h-[400px] overflow-auto">
                      {blog.content ? (
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: convertLineBreaksToHtml(blog.content) 
                          }} 
                        />
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview yet...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving || !blog.title || !blog.content || !blog.category}
                className="flex items-center w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditMode ? 'Update Blog' : 'Create Blog'}
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

export default BlogEditorPage;
