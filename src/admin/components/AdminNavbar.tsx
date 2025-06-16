import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAdminTheme } from '@/context/ThemeContext';
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  HelpCircle 
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { adminTheme, setAdminTheme } = useAdminTheme();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registered', read: false },
    { id: 2, title: 'System update completed', read: true },
  ]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = adminTheme === 'dark' ? 'light' : 'dark';
    setAdminTheme(newTheme);
    console.log("Admin theme toggled to:", newTheme);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-border">
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center justify-start w-full sm:w-auto">
            <Link to="/admin/dashboard" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                Admin Panel
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Theme toggle - Hidden on mobile, visible on small screens and up */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="hidden sm:flex" 
              aria-label={adminTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {adminTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;