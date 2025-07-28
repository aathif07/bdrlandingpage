// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  // Main website theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // Add this for ThemeToggle.tsx
  
  // Admin-specific theme
  adminTheme: Theme;
  setAdminTheme: (theme: Theme) => void;
  toggleAdminTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize main website theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Check for saved theme or system preference
    return savedTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Initialize admin theme from localStorage or default to 'light'
  const [adminTheme, setAdminTheme] = useState<Theme>(() => {
    const savedAdminTheme = localStorage.getItem('adminTheme') as Theme;
    // Check for saved theme or system preference
    return savedAdminTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Toggle functions
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleAdminTheme = () => {
    setAdminTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Update localStorage and apply main theme when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme to document (only if not in admin section)
    if (!window.location.pathname.startsWith('/admin')) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
    
    console.log('Main website theme set to:', theme);
  }, [theme]);

  // Update localStorage for admin theme when it changes
  useEffect(() => {
    localStorage.setItem('adminTheme', adminTheme);
    
    // Apply admin theme to document (only when in admin section)
    if (window.location.pathname.startsWith('/admin')) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(adminTheme);
    }
    
    console.log('Admin theme set to:', adminTheme);
  }, [adminTheme]);

  // Listen for route changes to apply the correct theme
  useEffect(() => {
    const handleRouteChange = () => {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(isAdminRoute ? adminTheme : theme);
    };

    // Set initial theme
    handleRouteChange();

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [theme, adminTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme,
      adminTheme, 
      setAdminTheme,
      toggleAdminTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Pick<ThemeContextType, 'theme' | 'setTheme' | 'toggleTheme'> => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { 
    theme: context.theme, 
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme
  };
};

// Convenience hook for admin components to only access admin theme
export const useAdminTheme = (): Pick<ThemeContextType, 'adminTheme' | 'setAdminTheme' | 'toggleAdminTheme'> => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAdminTheme must be used within a ThemeProvider');
  }
  return { 
    adminTheme: context.adminTheme, 
    setAdminTheme: context.setAdminTheme,
    toggleAdminTheme: context.toggleAdminTheme
  };
};
