// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  
  // Use theme-aware logo
  const logoSrc = theme === 'dark' 
    ? '/BigDataRhinologo2.png' 
    : '/BigDataRhinologo.png';

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white shadow dark:bg-gray-900' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-10xl mx-auto px-11 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-9">
          <motion.img 
            src={logoSrc}
            className="h-24 w-18" 
            alt="Big Data Rhino Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>

        {/* Theme Toggle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;