import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Search, Filter, X, Calendar, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Blog {
  id: string;
  title: string;
  category?: string;
  published: boolean;
  slug?: string;
  author?: string;
  excerpt?: string;
  content?: string;
  createdAt?: any;
  updatedAt?: any;
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  const navigate = useNavigate();

  // ADD THIS FUNCTION - Convert HTML back to clean text for display
  const getCleanTextPreview = (htmlContent: string, maxLength: number = 100): string => {
    if (!htmlContent) return '';
    
    // Remove HTML tags and get clean text
    const cleanText = htmlContent
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, ' ')
      .replace(/<br\s*\/?>/g, ' ')
      .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    return cleanText.length > maxLength 
      ? cleanText.substring(0, maxLength) + '...' 
      : cleanText;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const categories = [...new Set(blogs
      .map(blog => blog.category)
      .filter(category => category && category.trim() !== '')
    )].sort();
    setAvailableCategories(categories);
  }, [blogs]);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedCategory, selectedStatus, dateFilter]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(blogsQuery);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'uncategorized') {
        filtered = filtered.filter(blog => !blog.category || blog.category.trim() === '');
      } else {
        filtered = filtered.filter(blog => blog.category === selectedCategory);
      }
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(blog => 
        selectedStatus === 'published' ? blog.published : !blog.published
      );
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(blog => {
            const blogDate = blog.createdAt?.toDate();
            return blogDate && blogDate >= filterDate;
          });
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(blog => {
            const blogDate = blog.createdAt?.toDate();
            return blogDate && blogDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(blog => {
            const blogDate = blog.createdAt?.toDate();
            return blogDate && blogDate >= filterDate;
          });
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(blog => {
            const blogDate = blog.createdAt?.toDate();
            return blogDate && blogDate >= filterDate;
          });
          break;
      }
    }

    setFilteredBlogs(filtered);
  };

  const handleCreateBlog = () => {
    navigate('/admin/blogs/new');
  };

  const handleEditBlog = (id: string) => {
    navigate(`/admin/blogs/${id}`);
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'blogs', id));
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setDateFilter('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    if (dateFilter !== 'all') count++;
    return count;
  };

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'uncategorized') {
      return blogs.filter(blog => !blog.category || blog.category.trim() === '').length;
    }
    return blogs.filter(blog => blog.category === categoryName).length;
  };

  const formatDate = (date: any) => {
    if (!date?.toDate) return 'No date';
    return date.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Button onClick={handleCreateBlog} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Blog
        </Button>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories ({blogs.length})
                </SelectItem>
                {availableCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category} ({getCategoryCount(category)})
                  </SelectItem>
                ))}
                {blogs.some(blog => !blog.category || blog.category.trim() === '') && (
                  <SelectItem value="uncategorized">
                    Uncategorized ({getCategoryCount('uncategorized')})
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({blogs.length})</SelectItem>
                <SelectItem value="published">
                  Published ({blogs.filter(b => b.published).length})
                </SelectItem>
                <SelectItem value="draft">
                  Draft ({blogs.filter(b => !b.published).length})
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All time" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {searchTerm && (
                <Badge variant="outline" className="text-xs">
                  Search: "{searchTerm}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  Category: {selectedCategory}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setSelectedCategory('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  Status: {selectedStatus}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setSelectedStatus('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {dateFilter !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  Date: {dateFilter === 'today' ? 'Today' : 
                         dateFilter === 'week' ? 'Last 7 Days' :
                         dateFilter === 'month' ? 'Last 30 Days' :
                         dateFilter === 'year' ? 'Last Year' : dateFilter}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setDateFilter('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground">
        <div>
          Showing {filteredBlogs.length} of {blogs.length} blogs
          {getActiveFiltersCount() > 0 && <span className="ml-1">(filtered)</span>}
        </div>
        <div>Categories: {availableCategories.length}</div>
      </div>
      
      {/* Blogs Display */}
      {loading && blogs.length === 0 ? (
        <div className="text-center py-8">
          <p>Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                {blogs.length === 0 ? 'No blogs yet' : 'No blogs found'}
              </div>
              <p className="text-muted-foreground">
                {blogs.length === 0 
                  ? 'Create your first blog post to get started'
                  : 'Try adjusting your filters or search terms'
                }
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {blogs.length === 0 ? (
                  <Button onClick={handleCreateBlog}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create First Blog
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={clearFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                    <Button onClick={handleCreateBlog}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Blog
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Title</th>
                      <th className="px-4 py-3 text-left font-medium">Category</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Author</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-center font-medium w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map(blog => (
                      <tr key={blog.id} className="border-b hover:bg-muted/25 transition-colors">
                        {/* UPDATED TITLE CELL - Show clean text preview */}
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="font-medium">{blog.title}</div>
                            {blog.content && (
                              <div className="text-xs text-muted-foreground">
                                {getCleanTextPreview(blog.content, 80)}
                              </div>
                            )}
                            {blog.excerpt && (
                              <div className="text-xs text-blue-600 dark:text-blue-400">
                                Excerpt: {blog.excerpt.substring(0, 60)}...
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="text-xs">
                            {blog.category || 'Uncategorized'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant={blog.published ? "default" : "outline"}
                            className={`text-xs ${
                              blog.published 
                                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800'
                            }`}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">{blog.author || 'Unknown'}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-muted-foreground">
                            {formatDate(blog.createdAt)}
                          </div>
                          {blog.updatedAt?.toDate && blog.updatedAt.toDate().getTime() !== blog.createdAt?.toDate().getTime() && (
                            <div className="text-xs text-muted-foreground">
                              Updated: {blog.updatedAt.toDate().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditBlog(blog.id)}
                              className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                              title="Edit blog"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteBlog(blog.id, blog.title)}
                              className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300 bg-white"
                              title="Delete blog"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredBlogs.map(blog => (
              <Card key={blog.id} className="p-4">
                <div className="space-y-3">
                  {/* Header with title and actions */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight">{blog.title}</h3>
                      {/* ADDED CONTENT PREVIEW FOR MOBILE */}
                      {blog.content && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {getCleanTextPreview(blog.content, 100)}
                        </p>
                      )}
                    </div>
                    
                    {/* Mobile Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBlog(blog.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteBlog(blog.id, blog.title)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Meta information */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary" className="text-xs">
                      {blog.category || 'Uncategorized'}
                    </Badge>
                    
                    <Badge 
                      variant={blog.published ? "default" : "outline"}
                      className={`text-xs ${
                        blog.published 
                          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  {/* Author and date */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>By {blog.author || 'Unknown'}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Statistics Cards */}
      {blogs.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold">{filteredBlogs.length}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  {getActiveFiltersCount() > 0 ? 'Filtered' : 'Total'} Blogs
                </div>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xs">{filteredBlogs.length}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-green-600">
                  {filteredBlogs.filter(b => b.published).length}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">Published</div>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">
                  {filteredBlogs.filter(b => b.published).length}
                </span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-yellow-600">
                  {filteredBlogs.filter(b => !b.published).length}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">Drafts</div>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-xs">
                  {filteredBlogs.filter(b => !b.published).length}
                </span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-blue-600">
                  {availableCategories.length}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">{availableCategories.length}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Category Distribution */}
      {blogs.length > 0 && availableCategories.length > 0 && (
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {availableCategories.map(category => {
              const count = getCategoryCount(category);
              const percentage = (count / blogs.length) * 100;
              return (
                <div key={category} className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <span className="text-sm font-medium truncate">{category}</span>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="w-20 lg:w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <Badge variant="outline" className="text-xs min-w-[2.5rem] text-center">
                      {count}
                    </Badge>
                    <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* Show uncategorized if exists */}
            {blogs.some(blog => !blog.category || blog.category.trim() === '') && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <span className="text-sm font-medium text-muted-foreground truncate">Uncategorized</span>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="w-20 lg:w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-muted-foreground h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getCategoryCount('uncategorized') / blogs.length) * 100}%` }}
                    />
                  </div>
                  <Badge variant="outline" className="text-xs min-w-[2.5rem] text-center">
                    {getCategoryCount('uncategorized')}
                  </Badge>
                  <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                    {((getCategoryCount('uncategorized') / blogs.length) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default BlogManagement;