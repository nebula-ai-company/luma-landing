
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Sequence duration
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center justify-center w-full max-w-md p-8">
            
            {/* Logo Container - Fixed dimensions are crucial for the mask wipe effect */}
            <div className="relative w-64 h-24 md:w-80 md:h-32">
               
               {/* 1. Base Layer (The Empty Track) */}
               {/* Static faint logo background */}
               <img 
                  src="https://lumai.ir/logo-en.svg" 
                  alt="Luma"
                  className="absolute inset-0 w-full h-full object-contain brightness-0 invert opacity-20"
               />

               {/* 2. Fill Layer (The Animation) */}
               {/* We animate the width of this container to 'reveal' the gradient logo inside */}
               <motion.div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                      duration: 3.5, 
                      ease: "easeInOut",
                  }}
               >
                  {/* Inner Container: Matches parent size to keep the gradient/mask static relative to the logo */}
                  <div className="w-64 h-24 md:w-80 md:h-32 relative">
                      {/* The Gradient that gets masked by the logo shape */}
                      <div 
                         className="absolute inset-0 w-full h-full"
                         style={{
                            background: 'linear-gradient(90deg, #DA8FFF 0%, #FF6482 50%, #FFB340 100%)',
                            maskImage: `url('https://lumai.ir/logo-en.svg')`,
                            WebkitMaskImage: `url('https://lumai.ir/logo-en.svg')`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                         }}
                      />
                  </div>
               </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
