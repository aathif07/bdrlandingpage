
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import { Toaster } from '@/components/ui/toaster';
import { useAdminTheme } from '@/context/ThemeContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { Home, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const AdminDashboard = () => {
  const { adminTheme } = useAdminTheme();
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // Apply admin theme class to admin section
  useEffect(() => {
    // Apply theme to document when in admin section
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(adminTheme);
    
    console.log("Applied admin theme to document:", adminTheme);
    
    // Cleanup when component unmounts
    return () => {
      // This will ensure the main theme is restored when leaving admin
      const mainTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(mainTheme);
    };
  }, [adminTheme]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  // Handle scroll events for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setShowScrollTop(mainContentRef.current.scrollTop > 300);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Generate breadcrumbs from the current path and fetch document titles if needed
  useEffect(() => {
    const fetchDocumentTitle = async () => {
      const paths = location.pathname.split('/').filter(Boolean);
      
      // Check if we're on a document edit page (has an ID in the URL)
      if (paths.length >= 3) {
        const section = paths[1]; // blogs, articles, case-studies, etc.
        const lastSegment = paths[2]; // could be 'new' or a document ID
        
        // Skip if it's a 'new' page or not a document edit page
        if (lastSegment === 'new' || lastSegment === 'dashboard') {
          const formattedName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
          setPageTitle(formattedName);
          return;
        }
        
        // Determine collection based on section
        let collection = '';
        if (section === 'blogs') collection = 'blogs';
        else if (section === 'articles') collection = 'articles';
        else if (section === 'case-studies') collection = 'caseStudies';
        else if (section === 'blog-categories') collection = 'blogCategories';
        else if (section.startsWith('whitepaper')) collection = 'whitepapers';
        
        // If we have a valid collection, try to fetch the document
        if (collection) {
          try {
            const docRef = doc(db, collection, lastSegment);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists() && docSnap.data().title) {
              // Use the document title for the page title
              setPageTitle(`Editing: ${docSnap.data().title}`);
            } else if (docSnap.exists() && docSnap.data().name) {
              // For blog categories, use the name field
              setPageTitle(`Editing: ${docSnap.data().name}`);
            } else {
              // Fallback to formatted path
              const formattedName = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
              setPageTitle(formattedName);
            }
          } catch (error) {
            console.error("Error fetching document title:", error);
            // Fallback to formatted path
            const formattedName = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
            setPageTitle(formattedName);
          }
        } else {
          // For other sections, just format the last segment
          const formattedName = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
          setPageTitle(formattedName);
        }
      } else if (paths.length === 2) {
        // For section pages like /admin/blogs
        const section = paths[1];
        const formattedName = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
        setPageTitle(formattedName);
      } else {
        // Default to Dashboard
        setPageTitle('Dashboard');
      }
    };
    
    fetchDocumentTitle();
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Generate breadcrumbs from the current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        href: href,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <AdminNavbar />
      
      <div className="flex h-screen pt-16 overflow-hidden">
        {/* Fixed Sidebar - always visible */}
        <div className="fixed inset-y-0 left-0 pt-16 z-30 w-64 transition-all duration-300 ease-in-out">
          <AdminSidebar collapsed={false} />
        </div>
        
        {/* Main content area - with fixed margin for sidebar */}
        <main 
          ref={mainContentRef}
          className="flex-1 ml-64 transition-all duration-300 ease-in-out overflow-y-auto h-[calc(100vh-4rem)] bg-background/50"
        >
          <div className="container mx-auto p-4 md:p-6 max-w-4xl">
            
            {/* Page Title */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-muted-foreground mt-1">
                {location.pathname === '/admin/dashboard' 
                  ? 'Welcome to your admin dashboard' 
                  : `Manage your ${pageTitle.toLowerCase().replace('editing: ', '')}`}
              </p>
            </div>

            {/* Main Content Card - Centered */}
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden mx-auto">
              <div className="p-4 md:p-6">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : (
                  <Outlet />
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground py-4">
              <p>© {new Date().getFullYear()} BigData Website Sculptor. All rights reserved.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster />

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default AdminDashboard;
