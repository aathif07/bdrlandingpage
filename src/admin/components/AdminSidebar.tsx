import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  LogOut,
  Home,
  FileText,
  MessageSquare,
  Download,
  FileUp,
  Mail,
  Folder,
  Phone,
  Tag,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useAdminTheme } from '@/context/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar = ({ collapsed = false, onToggle }: AdminSidebarProps) => {
  const { adminTheme } = useAdminTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    content: true,
    management: true,
    forms: true,
    downloads: true,
    categories: true
  });

  // Debug current theme
  useEffect(() => {
    console.log("Current admin theme in AdminSidebar:", adminTheme);
  }, [adminTheme]);

  const toggleExpand = (key: string) => {
    if (collapsed) return; // Don't allow expanding when collapsed
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navGroups = [
    {
      title: 'Main',
      items: [
        {
          name: 'Home',
          path: '/',
          icon: Home,
          external: true
        }
      ]
    },
    {
      title: 'Content',
      key: 'content',
      items: [
        {
          name: 'Blogs',
          path: '/admin/blogs',
          icon: FileEdit,
          action: !collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/blogs/new"
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add new blog</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null
        },
        {
          name: 'Articles',
          path: '/admin/articles',
          icon: FileText,
          action: !collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/articles/new"
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add new article</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null
        },
        {
          name: 'Case Studies',
          path: '/admin/case-studies',
          icon: Folder,
          action: !collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/case-studies/new"
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add new case study</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null
        }
      ]
    },
    {
      title: 'Categories',
      key: 'categories',
      items: [
        {
          name: 'Blog Categories',
          path: '/admin/blog-categories',
          icon: Tag,
          action: !collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/blog-categories/new"
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add new category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null
        }
      ]
    },
    {
      title: 'Download Analytics',
      key: 'downloads',
      items: [
        {
          name: 'Whitepaper Downloads',
          path: '/admin/analytics/whitepaper-downloads',
          icon: Download,
          badge: { text: 'New', variant: 'secondary' as const }
        }
      ]
    },
    {
      title: 'Forms Management',
      key: 'forms',
      items: [
        {
          name: 'Contact Messages',
          path: '/admin/forms/contact-messages',
          icon: MessageSquare,
          badge: { text: 'New', variant: 'default' as const }
        },
        {
          name: 'Free Consultation',
          path: '/admin/forms/free-consultation',
          icon: Mail
        },
        {
          name: 'Career Applications',
          path: '/admin/forms/career-applications',
          icon: FileUp
        },
        {
          name: 'Callback Requests',
          path: '/admin/forms/callback-requests',
          icon: Phone,
          badge: { text: 'New', variant: 'default' as const }
        },
        {
          name: 'Newsletter Subscriptions',
          path: '/admin/forms/newsletter-subscriptions',
          icon: Mail
        }
      ]
    }
  ];

  return (
    <aside className={cn(
      "h-full bg-background border-r border-border",
      "flex flex-col",
      "transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64",
      // Responsive adjustments
      "max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:z-50",
      collapsed ? "max-lg:-translate-x-full" : "max-lg:translate-x-0"
    )}>
      

      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
        {/* User profile section */}
        <div className={cn(
          "flex items-center mb-6 p-2 rounded-lg hover:bg-accent/50 transition-colors",
          collapsed && "justify-center"
        )}>
          <Avatar className={cn(
            "border-2 border-primary",
            collapsed ? "h-8 w-8" : "h-10 w-10 mr-3"
          )}>
            <AvatarImage src="/avatar-placeholder.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-medium text-sm">Admin User</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          )}
        </div>

        {/* Navigation groups */}
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {group.key ? (
              <div
                className={cn(
                  "flex items-center justify-between p-2 cursor-pointer rounded-md hover:bg-accent/50 transition-colors",
                  collapsed && "justify-center"
                )}
                onClick={() => toggleExpand(group.key!)}
              >
                {!collapsed && (
                  <>
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      {group.title}
                    </span>
                    {expandedItems[group.key] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </>
                )}
                {collapsed && (
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                )}
              </div>
            ) : (
              !collapsed && (
                <div className="p-2">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {group.title}
                  </span>
                </div>
              )
            )}

            {(group.key ? (collapsed || expandedItems[group.key]) : true) && (
              <ul className="space-y-1 mt-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.path}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-lg group",
                              "transition-all duration-200",
                              collapsed && "justify-center",
                              location.pathname === item.path
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            <div className={cn(
                              "flex items-center",
                              collapsed && "justify-center"
                            )}>
                              <item.icon className={cn(
                                "w-5 h-5",
                                !collapsed && "mr-3"
                              )} />
                              {!collapsed && <span>{item.name}</span>}
                            </div>
                            {!collapsed && (
                              <div className="flex items-center">
                                {item.badge && (
                                  <Badge variant={item.badge.variant} className="ml-2">
                                    {item.badge.text}
                                  </Badge>
                                )}
                                {item.action && item.action}
                              </div>
                            )}
                          </Link>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className={cn(
        "p-4 border-t border-border mt-auto",
        collapsed && "p-2"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  collapsed ? "w-full justify-center p-2" : "w-full justify-start"
                )}
                onClick={handleLogout}
              >
                <LogOut className={cn(
                  "w-4 h-4",
                  !collapsed && "mr-2"
                )} />
                {!collapsed && "Logout"}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default AdminSidebar;