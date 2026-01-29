
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[100] group outline-none"
          aria-label="Scroll to top"
        >
          {/* Button Container */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/60 group-hover:border-luma-purple/30 group-hover:shadow-[0_0_20px_-5px_rgba(218,143,255,0.3)]">
            
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-luma-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon */}
            <ArrowUp 
              size={20} 
              className="text-white/80 group-hover:text-white relative z-10 transition-transform duration-300 group-hover:-translate-y-1" 
              strokeWidth={2.5}
            />
            
            {/* Ripple Effect Ring */}
            <div className="absolute inset-0 rounded-full border border-white/5 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
