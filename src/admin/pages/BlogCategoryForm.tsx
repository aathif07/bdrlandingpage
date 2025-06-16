import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { 
  createBlogCategory, 
  getBlogCategory, 
  updateBlogCategory,
  BlogCategory 
} from '@/lib/services/blogCategoryService';

interface BlogCategoryData {
  name: string;
  description: string;
  slug: string;
}

const BlogCategoryForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id && id !== 'new';

  const [formData, setFormData] = useState<BlogCategoryData>({
    name: '',
    description: '',
    slug: '',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  console.log('BlogCategoryForm mounted, isEditing:', isEditing, 'id:', id);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Fetch category data if editing
  useEffect(() => {
    const fetchCategory = async () => {
      if (!isEditing || !id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        console.log('Fetching category with id:', id);
        const category = await getBlogCategory(id);
        console.log('Category fetched:', category);

        if (category) {
          setFormData({
            name: category.name || '',
            description: category.description || '',
            slug: category.slug || '',
          });
        } else {
          toast({
            title: 'Error',
            description: 'Category not found',
            variant: 'destructive',
          });
          navigate('/admin/blog-categories');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch category data',
          variant: 'destructive',
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCategory();
  }, [id, isEditing, navigate, toast]);

  const handleInputChange = (field: keyof BlogCategoryData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when name changes
      ...(field === 'name' ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Category name is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Slug is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Submitting form data:', formData);

      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        slug: formData.slug.trim(),
      };

      if (isEditing && id) {
        // Update existing category
        console.log('Updating category:', id);
        await updateBlogCategory(id, categoryData);
        
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        // Create new category
        console.log('Creating new category');
        const newId = await createBlogCategory(categoryData);
        console.log('Category created with ID:', newId);
        
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }

      navigate('/admin/blog-categories');
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} category`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="animate-pulse bg-muted h-10 rounded"></div>
              <div className="animate-pulse bg-muted h-10 rounded"></div>
              <div className="animate-pulse bg-muted h-20 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/blog-categories')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Edit Category' : 'Create New Category'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter category name"
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="category-slug"
                disabled={loading}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                URL-friendly version of the name. Auto-generated from name.
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter category description (optional)"
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading 
                  ? (isEditing ? 'Updating...' : 'Creating...') 
                  : (isEditing ? 'Update Category' : 'Create Category')
                }
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/blog-categories')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCategoryForm;

