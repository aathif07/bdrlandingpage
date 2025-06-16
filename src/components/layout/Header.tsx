import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronDown, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle';
import { Button } from '../ui/button';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/context/ThemeContext'; // Import useTheme hook

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [userInitials, setUserInitials] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme(); // Use the theme from context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        const names = currentUser.displayName.split(' ');
        setUserInitials(
          names.length >= 2
            ? `${names[0][0]}${names[1][0]}`.toUpperCase()
            : `${names[0][0]}${names[0][1] || ''}`.toUpperCase()
        );
      } else if (currentUser?.email) {
        setUserInitials(currentUser.email.split('@')[0].substring(0, 2).toUpperCase());
      } else {
        setUserInitials('U');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully' });
      navigate('/');
    } catch {
      toast({
        title: 'Logout failed',
        description: 'An error occurred while logging out',
        variant: 'destructive',
      });
    }
  };

  const handleDashboardClick = () => {
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
    setIsMobileMenuOpen(false);
    navigate('/admin/dashboard');
  };

  const handleSubItemClick = (path: string) => {
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
    setIsMobileMenuOpen(false);
    if (path.includes('#')) {
      const [pagePath, anchor] = path.split('#');
      if (location.pathname === pagePath || pagePath === '') {
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(path);
  };

  const navigationItems = useMemo(
    () => [
      {
        title: 'Home',
        path: '/',
        subItems: [
          { name: 'Overview', path: '/overview' },
          { name: 'Contact', path: '/contact' },
        ],
      },
      {
        title: 'About',
        path: '/about',
        subItems: [
          { name: 'Mission', path: '/about/mission' },
          { name: 'Achievements', path: '/about/achievements' },
          { name: 'Leadership', path: '/about/leadership' },
          { name: 'News', path: '/about/news' },
        ],
      },
      {
        title: 'Services',
        path: '/services',
        subItems: [
          { name: 'Data Migration', path: '/services/data-migration' },
          { name: 'Methane Mitigation', path: '/services/methane-mitigation' },
          { name: 'Fintech Solutions', path: '/services/fintech' },
          { name: 'Custom Development', path: '/services/custom-dev' },
          { name: 'Government Solutions', path: '/services/government-solutions' },
        ],
      },
      {
        title: 'Solutions',
        path: '/solutions',
        subItems: [
          { name: 'AI & ML', path: '/solutions/ai-ml' },
          { name: 'Cybersecurity', path: '/solutions/cybersecurity' },
          { name: 'Cloud', path: '/solutions/cloud' },
        ],
      },
      {
        title: 'Research',
        path: '/research',
        subItems: [
          { name: 'Whitepapers', path: '/lead-generation/whitepaper-downloads' },
          { name: 'Consultation', path: '/lead-generation/free-consultation' },
        ],
      },
      {
        title: 'Blogs',
        path: '/blog',
        subItems: [
          { name: 'Articles', path: '/blog/articles' },
          { name: 'Categories', path: '/blog/categories' },
          { name: 'Newsletter', path: '/blog/newsletter' },
        ],
      },
      {
        title: 'Careers',
        path: '/careers',
        subItems: [
          { name: 'Jobs', path: '/careers/jobs' },
          { name: 'Apply', path: '/careers/apply' },
          { name: 'Culture', path: '/careers/culture' },
        ],
      },
    ],
    []
  );

  // Determine which logo to use based on the current theme
  const logoSrc = theme === 'dark' ? '/BigDataRhinologo2.png' : '/BigDataRhinologo.png';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white shadow dark:bg-gray-900' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSrc} className="h-24 w-18" alt="Big Data Rhino Logo" />
          {/* Removed the text span for "Big Data Rhino" */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleSubItemClick(item.path)}
                className="text-sm text-black dark:text-white hover:text-blue-500 flex items-center gap-1"
              >
                {item.title}
                {item.subItems.length > 0 && <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {activeDropdown === item.title && item.subItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-lg z-50"
                  >
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleSubItemClick(subItem.path)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDashboardClick}>
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline">
                <LogIn size={16} className="mr-2" /> Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 space-y-2"
          >
            {navigationItems.map((item) => (
              <div key={item.title}>
                <div className="flex justify-between items-center">
                  <button
                    className="text-left text-black dark:text-white py-2"
                    onClick={() => handleSubItemClick(item.path)}
                  >
                    {item.title}
                  </button>
                  {item.subItems.length > 0 && (
                    <button
                      onClick={() =>
                        setActiveMobileDropdown(
                          activeMobileDropdown === item.title ? null : item.title
                        )
                      }
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeMobileDropdown === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {activeMobileDropdown === item.title && item.subItems.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 overflow-hidden"
                    >
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleSubItemClick(subItem.path)}
                          className="block w-full text-left text-sm py-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {user ? (
                <>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-black dark:text-white"
                        onClick={handleDashboardClick}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-black dark:text-white"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;