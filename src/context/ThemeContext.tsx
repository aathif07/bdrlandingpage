// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
type ThemeScope = 'global' | 'admin';

interface ThemeContextType {
  // Main website theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Admin-specific theme
  adminTheme: Theme;
  setAdminTheme: (theme: Theme) => void;
  toggleAdminTheme: () => void;

  // Current active theme based on route
  activeTheme: Theme;
  // Helper to get theme for a specific scope
  getThemeForScope: (scope: ThemeScope) => Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get system preference
const getSystemThemePreference = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper function to get saved theme from localStorage with fallback
const getSavedTheme = (key: string, fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback;
  const saved = localStorage.getItem(key);
  return saved === 'light' || saved === 'dark' ? saved as Theme : fallback;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize themes from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => 
    getSavedTheme('theme', getSystemThemePreference())
  );

  const [adminTheme, setAdminTheme] = useState<Theme>(() =>
    getSavedTheme('adminTheme', getSystemThemePreference())
  );

  // Determine active theme based on current route
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    return isAdminRoute ? adminTheme : theme;
  });

  // Toggle functions with useCallback for memoization
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const toggleAdminTheme = useCallback(() => {
    setAdminTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Helper function to get theme for a specific scope
  const getThemeForScope = useCallback((scope: ThemeScope): Theme => {
    return scope === 'admin' ? adminTheme : theme;
  }, [adminTheme, theme]);

  // Apply theme to document
  const applyThemeToDocument = useCallback((newTheme: Theme) => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  // Update localStorage and apply main theme when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Only apply if we're not in admin route
    if (!window.location.pathname.startsWith('/admin')) {
      applyThemeToDocument(theme);
      setActiveTheme(theme);
    }
  }, [theme, applyThemeToDocument]);

  // Update localStorage and apply admin theme when it changes
  useEffect(() => {
    localStorage.setItem('adminTheme', adminTheme);
    
    // Only apply if we're in admin route
    if (window.location.pathname.startsWith('/admin')) {
      applyThemeToDocument(adminTheme);
      setActiveTheme(adminTheme);
    }
  }, [adminTheme, applyThemeToDocument]);

  // Listen for route changes to apply the correct theme
  useEffect(() => {
    const handleRouteChange = () => {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      const newActiveTheme = isAdminRoute ? adminTheme : theme;
      applyThemeToDocument(newActiveTheme);
      setActiveTheme(newActiveTheme);
    };

    // Modern navigation API (if available)
    if (window.navigation) {
      window.navigation.addEventListener('navigate', handleRouteChange);
    }
    
    // Traditional popstate
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      if (window.navigation) {
        window.navigation.removeEventListener('navigate', handleRouteChange);
      }
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [theme, adminTheme, applyThemeToDocument]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      console.log('System theme changed to:', newSystemTheme);
      // You might want to add logic here to respond to system theme changes
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme,
      adminTheme, 
      setAdminTheme,
      toggleAdminTheme,
      activeTheme,
      getThemeForScope
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main hook for non-admin components
export const useTheme = (): Pick<ThemeContextType, 
  'theme' | 'setTheme' | 'toggleTheme' | 'activeTheme' | 'getThemeForScope'
> => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { 
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme,
    activeTheme: context.activeTheme,
    getThemeForScope: context.getThemeForScope
  };
};

// Admin-specific hook
export const useAdminTheme = (): Pick<ThemeContextType, 
  'adminTheme' | 'setAdminTheme' | 'toggleAdminTheme' | 'activeTheme' | 'getThemeForScope'
> => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAdminTheme must be used within a ThemeProvider');
  }
  return { 
    adminTheme: context.adminTheme,
    setAdminTheme: context.setAdminTheme,
    toggleAdminTheme: context.toggleAdminTheme,
    activeTheme: context.activeTheme,
    getThemeForScope: context.getThemeForScope
  };
};

// Full context hook for components that need everything
export const useFullTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useFullTheme must be used within a ThemeProvider');
  }
  return context;
};