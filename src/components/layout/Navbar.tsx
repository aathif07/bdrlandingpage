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
      className={`fixed top 5 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-7 bg-white shadow dark:bg-gray-800' : 'py-12 bg-transparent'
      }`}
    >
      <div className="max-w-10xl mx-auto px-11 flex justify-between items-center relative">
        {/* Logo - Centered absolutely on desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.img 
            src={logoSrc}
            className="h-24 w-18" 
            alt="Big Data Rhino Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>

        {/* Theme Toggle - Right aligned */}
        <div className="ml-auto">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;