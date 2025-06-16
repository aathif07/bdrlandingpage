import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header'; // Import Header
import Footer from '../components/layout/Footer'; // Import Footer
import InteractiveBackground from '../components/effects/InteractiveBackground'; // Import InteractiveBackground
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'http://localhost:3001/api';

// Define the type for a blog post, matching the backend structure
interface BlogPost {
    id: number; // Backend ID is a number
    title: string;
    excerpt?: string | null; // Backend fields can be null
    fullDescription: string;
    category?: string | null;
    imageUrl?: string | null; // Added back based on BlogArticleProps, but still not in DB/CMS form
    author?: string | null;
    authorTitle?: string | null;
    publishDate: string; // Use string or convert to Date
    readTime?: string | null;
    tags?: string[]; // Parsed from JSON string on backend GET
    createdAt: string;
    updatedAt: string;
}

// Type for the form state (still excludes imageUrl as it's not in the CMS form)
type PostFormData = Omit<BlogPost, 'id' | 'publishDate' | 'createdAt' | 'updatedAt' | 'tags' | 'imageUrl'> & {
    tags: string; // Tags are handled as a comma-separated string in the form
};


const Dashboard = () => {
    const { theme } = useTheme();
    const { toast } = useToast();
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    // State for the form data (imageUrl excluded as it's not in the CMS form)
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        excerpt: '',
        fullDescription: '',
        category: '',
        author: '',
        authorTitle: '',
        readTime: '',
        tags: '', // Comma-separated string
    });

    // Function to fetch blog posts from the backend API
    const fetchBlogPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/blog`);
            if (!response.ok) {
                throw new Error(`Error fetching posts: ${response.statusText}`);
            }
            const data: BlogPost[] = await response.json();
             // Sort by publishDate, newest first
             data.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
            setBlogPosts(data);
            console.log("Blog posts fetched for dashboard:", data);
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
            toast({
                title: "Error",
                description: "Could not fetch blog posts.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchBlogPosts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle saving (Add or Update) a blog post
    const handleSavePost = async () => {
        if (!formData.title || !formData.fullDescription) {
            toast({ title: 'Input Required', description: 'Title and Full Description cannot be empty.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        const url = editingPostId ? `${API_BASE_URL}/blog/${editingPostId}` : `${API_BASE_URL}/blog`;
        const method = editingPostId ? 'PUT' : 'POST';

        // Prepare data for the backend (imageUrl is NOT in formData)
        const dataToSend = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
            // publishDate, readTime, author, authorTitle, category, excerpt handled by formData
        };

        // Remove undefined/empty strings for optional fields if backend expects null
        Object.keys(dataToSend).forEach(key => {
            if (dataToSend[key as keyof typeof dataToSend] === '') {
                 (dataToSend as any)[key] = null;
            }
        });


        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // TODO: Add Authentication header here later
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || `API Error: ${response.statusText}`);
            }

            const result = await response.json();

            toast({
                title: editingPostId ? 'Post Updated' : 'Post Added',
                description: result.message || `Post "${result.post?.title || formData.title}" saved successfully.`,
            });

            fetchBlogPosts(); // Refresh the list

            // Reset form and state
            setFormData({ title: '', excerpt: '', fullDescription: '', category: '', author: '', authorTitle: '', readTime: '', tags: '' });
            setIsAddingOrEditing(false);
            setEditingPostId(null);

        } catch (error) {
            console.error(`Failed to ${editingPostId ? 'update' : 'add'} blog post:`, error);
            toast({
                title: `Failed to ${editingPostId ? 'Update' : 'Add'} Post`,
                description: error instanceof Error ? error.message : 'An error occurred.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle starting the edit process
    const handleEditClick = (post: BlogPost) => {
        setEditingPostId(post.id);
        setFormData({
            title: post.title,
            excerpt: post.excerpt || '',
            fullDescription: post.fullDescription,
            category: post.category || '',
            // imageUrl is not in the form state, so we don't populate it
            author: post.author || '',
            authorTitle: post.authorTitle || '',
            readTime: post.readTime || '',
            tags: post.tags ? post.tags.join(', ') : '',
        });
        setIsAddingOrEditing(true);
    };

    // Handle deleting a blog post
    const handleDeletePost = async (postId: number) => {
        console.log('Attempting to delete post:', postId);
        if (!window.confirm('Are you sure you want to delete this post?')) {
             return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/blog/${postId}`, {
                method: 'DELETE',
                 // TODO: Add Authentication header here later
            });

            if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message || `API Error: ${response.statusText}`);
            }

            const result = await response.json();

            toast({ title: 'Post Deleted', description: result.message || 'Blog post deleted successfully.' });

            setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

        } catch (error) {
             console.error('Failed to delete blog post:', error);
             toast({
                 title: 'Failed to Delete Post',
                 description: error instanceof Error ? error.message : 'An error occurred.',
                 variant: 'destructive',
             });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        // Added the main container div with theme class
        <div className={`min-h-screen ${theme === 'dark' ? 'dark text-white' : 'text-gray-900'}`}>
            {/* Include the background */}
            <InteractiveBackground />
            {/* Include the Header */}
            <Header />

            {/* Wrap main content in <main> and add padding */}
            <main className="pt-24 pb-12"> {/* Added top and bottom padding */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding */}
                    <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
                    <p className="text-lg mb-4">Welcome to your Blog Management CMS.</p>

                    {/* Add/Edit Blog Section */}
                    <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="dark:text-white">
                                {editingPostId ? 'Edit Blog Post' : 'Add New Blog Post'}
                            </CardTitle>
                            {!isAddingOrEditing && (
                                <CardDescription className="dark:text-gray-300">
                                    Manage your existing blog posts or create a new one.
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            {!isAddingOrEditing ? (
                                <Button onClick={() => setIsAddingOrEditing(true)} disabled={isLoading}>
                                    Add New Blog Post
                                </Button>
                            ) : (
                                // Form for adding or editing a post
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <Label htmlFor="title" className="dark:text-white">Title</Label>
                                        <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="Post Title" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>
                                    {/* Excerpt */}
                                    <div>
                                        <Label htmlFor="excerpt" className="dark:text-white">Excerpt</Label>
                                        <Textarea id="excerpt" value={formData.excerpt || ''} onChange={handleInputChange} placeholder="Short summary..." className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>
                                    {/* Full Description (Content) */}
                                    <div>
                                        <Label htmlFor="fullDescription" className="dark:text-white">Full Description (Content)</Label>
                                        <Textarea id="fullDescription" value={formData.fullDescription} onChange={handleInputChange} placeholder="Write your blog content here..." rows={10} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>
                                    {/* Category */}
                                    <div>
                                        <Label htmlFor="category" className="dark:text-white">Category</Label>
                                        <Input id="category" value={formData.category || ''} onChange={handleInputChange} placeholder="e.g., Big Data, AI" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>
                                     {/* Tags (comma-separated input) */}
                                    <div>
                                        <Label htmlFor="tags" className="dark:text-white">Tags (comma-separated)</Label>
                                        <Input id="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g., Analytics, Trends" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>
                                    {/* Author and Author Title */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="author" className="dark:text-white">Author</Label>
                                            <Input id="author" value={formData.author || ''} onChange={handleInputChange} placeholder="Author Name" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                        </div>
                                         <div>
                                            <Label htmlFor="authorTitle" className="dark:text-white">Author Title</Label>
                                            <Input id="authorTitle" value={formData.authorTitle || ''} onChange={handleInputChange} placeholder="e.g., Chief Data Scientist" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                        </div>
                                    </div>
                                    {/* Read Time (assuming text input) */}
                                    <div>
                                        <Label htmlFor="readTime" className="dark:text-white">Read Time</Label>
                                        <Input id="readTime" value={formData.readTime || ''} onChange={handleInputChange} placeholder="e.g., 5 min read" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={isLoading} />
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex space-x-4">
                                         <Button onClick={handleSavePost} disabled={isLoading || !formData.title || !formData.fullDescription}>
                                             {isLoading ? (editingPostId ? 'Updating...' : 'Adding...') : (editingPostId ? 'Update Post' : 'Save Post')}
                                         </Button>
                                         <Button variant="outline" onClick={() => {
                                             setIsAddingOrEditing(false);
                                             setEditingPostId(null);
                                             setFormData({ title: '', excerpt: '', fullDescription: '', category: '', author: '', authorTitle: '', readTime: '', tags: '' });
                                         }} disabled={isLoading}>
                                             Cancel
                                         </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Blog Posts List Section */}
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                         <CardHeader>
                             <CardTitle className="dark:text-white">Existing Blog Posts ({blogPosts.length})</CardTitle>
                             <CardDescription className="dark:text-gray-300">List of all blog posts.</CardDescription>
                         </CardHeader>
                        <CardContent className="space-y-4">
                            {isLoading && blogPosts.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-400">Loading blog posts...</p>
                            ) : blogPosts.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-400">No blog posts found. Add a new one!</p>
                            ) : (
                                blogPosts.map(post => (
                                    <div key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0 dark:border-gray-700">
                                        {/* Image display removed */}
                                        <h3 className="text-xl font-semibold dark:text-white">{post.title}</h3>
                                        {(post.category || (post.tags && post.tags.length > 0)) && (
                                             <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                                 {post.category && <span>Category: {post.category}</span>}
                                                 {post.category && post.tags && post.tags.length > 0 && ' | '}
                                                 {post.tags && post.tags.length > 0 && <span>Tags: {post.tags.join(', ')}</span>}
                                             </p>
                                        )}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                            by {post.author || 'Unknown Author'} ({post.authorTitle || 'N/A'}) on {new Date(post.publishDate || post.createdAt).toLocaleDateString()} | {post.readTime || 'N/A'}
                                        </p>
                                         {post.excerpt && (
                                            <p className="text-gray-700 dark:text-gray-300 mb-2 italic">
                                                {post.excerpt}
                                            </p>
                                         )}
                                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                                            {post.fullDescription.substring(0, 200)}{post.fullDescription.length > 200 ? '...' : ''}
                                        </p>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEditClick(post)} disabled={isLoading}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)} disabled={isLoading}>Delete</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                             {isLoading && blogPosts.length > 0 && (
                                 <p className="text-gray-600 dark:text-gray-400 text-center">Refreshing list...</p>
                             )}
                        </CardContent>
                    </Card>

                </div>
            </main> {/* Closing main tag */}

            {/* Include the Footer */}
            <Footer />
        </div> // Closing main container div
    );
};

export default Dashboard;