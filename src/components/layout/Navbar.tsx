// Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();
  const lastScrollY = useRef(0);
  
  // Always use the light mode logo
  const logoSrc = '/BigDataRhinologo.png';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled enough to trigger changes
      setIsScrolled(currentScrollY > 10);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
<<<<<<< Updated upstream
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'py-7 bg-white shadow' : 'py-12 bg-transparent'
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
          </div>
        </motion.header>
      )}
    </AnimatePresence>
=======
    <header
      className={`fixed top-5 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white shadow dark:bg-gray-900' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-10xl mx-auto px-11 flex justify-between items-center relative">
        {/* Logo - Centered and Larger */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.img 
            src={logoSrc}
            className="h-32 w-auto" // Increased height and auto width to maintain aspect ratio
            alt="Big Data Rhino Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>

        {/* Theme Toggle - Pushed to right */}
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
>>>>>>> Stashed changes
  );
};

export default Navbar;