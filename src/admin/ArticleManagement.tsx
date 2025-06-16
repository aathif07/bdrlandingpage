
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

interface Article {
  id: string;
  title: string;
  content?: string;
  category: string;
  published: boolean;
  slug: string;
  author: string;
  createdAt?: any;
  updatedAt?: any;
}

const ArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const categories = [...new Set(articles
      .map(article => article.category)
      .filter(category => category && category.trim() !== '')
    )].sort();
    setAvailableCategories(categories);
  }, [articles]);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory, selectedStatus, dateFilter]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const articlesQuery = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(articlesQuery);
      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = [...articles];

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'uncategorized') {
        filtered = filtered.filter(article => !article.category || article.category.trim() === '');
      } else {
        filtered = filtered.filter(article => article.category === selectedCategory);
      }
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(article => 
        selectedStatus === 'published' ? article.published : !article.published
      );
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(article => {
            const articleDate = article.createdAt?.toDate();
            return articleDate && articleDate >= filterDate;
          });
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(article => {
            const articleDate = article.createdAt?.toDate();
            return articleDate && articleDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(article => {
            const articleDate = article.createdAt?.toDate();
            return articleDate && articleDate >= filterDate;
          });
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(article => {
            const articleDate = article.createdAt?.toDate();
            return articleDate && articleDate >= filterDate;
          });
          break;
      }
    }

    setFilteredArticles(filtered);
  };

  const handleCreateArticle = () => {
    navigate('/admin/articles/new');
  };

  const handleEditArticle = (id: string) => {
    navigate(`/admin/articles/${id}`);
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'articles', id));
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
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
      return articles.filter(article => !article.category || article.category.trim() === '').length;
    }
    return articles.filter(article => article.category === categoryName).length;
  };

  const formatDate = (date: any) => {
    if (!date?.toDate) return 'No date';
    return date.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Article Management</h1>
          <p className="text-muted-foreground">Create and manage your articles</p>
        </div>
        <Button onClick={handleCreateArticle} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Article
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
                placeholder="Search articles..."
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
                  All Categories ({articles.length})
                </SelectItem>
                {availableCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category} ({getCategoryCount(category)})
                  </SelectItem>
                ))}
                {articles.some(article => !article.category || article.category.trim() === '') && (
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
                <SelectItem value="all">All Status ({articles.length})</SelectItem>
                <SelectItem value="published">
                  Published ({articles.filter(a => a.published).length})
                </SelectItem>
                <SelectItem value="draft">
                  Draft ({articles.filter(a => !a.published).length})
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
          Showing {filteredArticles.length} of {articles.length} articles
          {getActiveFiltersCount() > 0 && <span className="ml-1">(filtered)</span>}
        </div>
        <div>Categories: {availableCategories.length}</div>
      </div>
      
      {/* Articles Display */}
      {loading && articles.length === 0 ? (
        <div className="text-center py-8">
          <p>Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                {articles.length === 0 ? 'No articles yet' : 'No articles found'}
              </div>
              <p className="text-muted-foreground">
                {articles.length === 0 
                  ? 'Create your first article to get started'
                  : 'Try adjusting your filters or search terms'
                }
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {articles.length === 0 ? (
                  <Button onClick={handleCreateArticle}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create First Article
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={clearFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                    <Button onClick={handleCreateArticle}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Article
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
                    {filteredArticles.map(article => (
                      <tr key={article.id} className="border-b hover:bg-muted/25 transition-colors">
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="font-medium">{article.title}</div>
                            {article.content && (
                              <div className="text-xs text-muted-foreground">
                                {getCleanTextPreview(article.content, 80)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="text-xs">
                            {article.category || 'Uncategorized'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant={article.published ? "default" : "outline"}
                            className={`text-xs ${
                              article.published 
                                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800'
                            }`}
                          >
                            {article.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">{article.author}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-muted-foreground">
                            {formatDate(article.createdAt)}
                          </div>
                          {article.updatedAt?.toDate && article.updatedAt.toDate().getTime() !== article.createdAt?.toDate().getTime() && (
                            <div className="text-xs text-muted-foreground">
                              Updated: {article.updatedAt.toDate().toLocaleDateString('en-US', {
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
                              onClick={() => handleEditArticle(article.id)}
                              className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                              title="Edit article"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteArticle(article.id, article.title)}
                              className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300 bg-white"
                              title="Delete article"
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
            {filteredArticles.map(article => (
              <Card key={article.id} className="p-4">
                <div className="space-y-3">
                  {/* Header with title and actions */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                    </div>
                    
                    {/* Mobile Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditArticle(article.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteArticle(article.id, article.title)}
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
                      {article.category || 'Uncategorized'}
                    </Badge>
                    
                    <Badge 
                      variant={article.published ? "default" : "outline"}
                      className={`text-xs ${
                        article.published 
                          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  {/* Author and date */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Statistics Cards */}
      {articles.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold">{filteredArticles.length}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  {getActiveFiltersCount() > 0 ? 'Filtered' : 'Total'} Articles
                </div>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xs">{filteredArticles.length}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-green-600">
                  {filteredArticles.filter(a => a.published).length}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">Published</div>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">
                  {filteredArticles.filter(a => a.published).length}
                </span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-yellow-600">
                  {filteredArticles.filter(a => !a.published).length}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">Drafts</div>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-xs">
                  {filteredArticles.filter(a => !a.published).length}
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
      {articles.length > 0 && availableCategories.length > 0 && (
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {availableCategories.map(category => {
              const count = getCategoryCount(category);
              const percentage = (count / articles.length) * 100;
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
            {articles.some(article => !article.category || article.category.trim() === '') && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <span className="text-sm font-medium text-muted-foreground truncate">Uncategorized</span>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="w-20 lg:w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-muted-foreground h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getCategoryCount('uncategorized') / articles.length) * 100}%` }}
                    />
                  </div>
                  <Badge variant="outline" className="text-xs min-w-[2.5rem] text-center">
                    {getCategoryCount('uncategorized')}
                  </Badge>
                  <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                    {((getCategoryCount('uncategorized') / articles.length) * 100).toFixed(1)}%
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

export default ArticleManagement;
