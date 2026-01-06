
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../../constants';
import { Service } from '../../../types';

interface ServiceNode {
  id: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  color: string;
  path: string;
}

// --- Service Configuration with Colors ---
const SERVICE_NODES: ServiceNode[] = SERVICES.map((s, i) => {
  const colors = [
    'text-luma-pink', 'text-luma-purple', 'text-luma-yellow', 'text-blue-400',
    'text-emerald-400', 'text-orange-400', 'text-indigo-400', 'text-rose-400'
  ];
  return {
    id: s.id,
    icon: s.icon,
    label: s.title,
    desc: s.description,
    color: colors[i % colors.length],
    path: s.path
  };
});

const getColorHex = (className: string) => {
  if (className.includes('pink')) return '#FF6482';
  if (className.includes('purple')) return '#DA8FFF';
  if (className.includes('yellow')) return '#FFB340';
  if (className.includes('blue')) return '#60A5FA';
  if (className.includes('emerald')) return '#34D399';
  if (className.includes('orange')) return '#FB923C';
  if (className.includes('indigo')) return '#818CF8';
  if (className.includes('rose')) return '#FB7185';
  return '#ffffff';
};

// --- Component: Star Field Animation ---
const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static initial stars
    const initialStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setStars(initialStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0"
          style={{ 
            top: `${star.top}%`, 
            left: `${star.left}%`, 
            width: star.size, 
            height: star.size 
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            x: [0, 50], // Drift right slightly
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- Component: Service Galaxy Animation ---
export const ServiceGalaxy = () => {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Split services into two orbits for visual layering
  const innerOrbit = SERVICE_NODES.slice(0, 4);
  const outerOrbit = SERVICE_NODES.slice(4, 8);

  const innerRadius = 210; 
  const outerRadius = 320; 

  // --- Interaction Handlers ---
  const handleNodeEnter = (node: ServiceNode) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setActiveNode(node);
  };

  const handleNodeLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveNode(null);
    }, 200); // 200ms delay to allow moving to center
  };

  const handleCenterEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
  };

  const handleCenterLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveNode(null);
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[800px] flex items-center justify-center perspective-1000 my-10 lg:my-0">
      
      {/* --- Background Details --- */}
      {/* Deep Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/10 via-transparent to-luma-blue/5 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      
      {/* Decorative Static Rings */}
      <div className="absolute inset-[5%] border border-white/5 rounded-full opacity-20 pointer-events-none" />
      <div className="absolute inset-[18%] border border-dashed border-white/5 rounded-full opacity-10 pointer-events-none" />
      <div className="absolute inset-[30%] border border-white/5 rounded-full opacity-5 pointer-events-none" />
      
      {/* Star Field */}
      <StarField />

      {/* Rotating Background Grid/Radar effect */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:120s] pointer-events-none opacity-10">
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-10 rounded-full" />
      </div>

      {/* --- Orbits Tracks --- */}
      {/* Outer Ring */}
      <div 
        className="absolute rounded-full border border-white/10 opacity-30 animate-spin-slow [animation-duration:80s] pointer-events-none" 
        style={{ width: outerRadius * 2, height: outerRadius * 2 }}
      />
      {/* Inner Ring */}
      <div 
        className="absolute rounded-full border border-white/10 opacity-40 animate-spin-slow [animation-duration:50s] direction-reverse pointer-events-none" 
        style={{ width: innerRadius * 2, height: innerRadius * 2 }}
      />

      {/* --- Central Core (Morphing) --- */}
      <motion.div 
        layout
        onMouseEnter={handleCenterEnter}
        onMouseLeave={handleCenterLeave}
        className={`
           relative z-30 flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl transition-all duration-500
           ${activeNode 
             ? 'bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
             : 'bg-black/20 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.05)]'
           }
        `}
        initial={{ width: 120, height: 120, borderRadius: 9999 }}
        animate={{
           width: activeNode ? 300 : 120, // Circular expanded state
           height: activeNode ? 300 : 120,
           borderRadius: 9999, // Always circular
        }}
        transition={{
           type: "spring",
           stiffness: 120,
           damping: 20
        }}
      >
        {/* Border with Overlay Blend Mode */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/40 mix-blend-overlay pointer-events-none z-40" />
        
        {/* Subtle Blend Overlay for Better Integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div 
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-30"
            >
               {/* Background Glow based on Active Color */}
               <div 
                  className="absolute inset-0 opacity-20 transition-colors duration-500 mix-blend-screen" 
                  style={{ background: `radial-gradient(circle, ${getColorHex(activeNode.color)}, transparent 70%)` }}
               />
               
               {/* Animated Icon */}
               <motion.div 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`p-3 rounded-2xl bg-white/5 border border-white/10 mb-3 ${activeNode.color}`}
               >
                  <activeNode.icon size={32} />
               </motion.div>

               {/* Text Info */}
               <motion.h3 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-white font-bold text-lg mb-2 tracking-tight whitespace-nowrap"
               >
                 {activeNode.label}
               </motion.h3>
               
               <motion.p 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3 w-full px-2"
               >
                 {activeNode.desc}
               </motion.p>

               {/* Action Hint */}
               <Link to={activeNode.path}>
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="mt-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2 text-[10px] text-white font-bold tracking-wide hover:bg-white/10 cursor-pointer transition-colors"
                 >
                    <span>مشاهده جزئیات</span>
                    <ChevronRight size={12} className="rotate-180" />
                 </motion.div>
               </Link>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center relative w-full h-full"
            >
               {/* Idle Animation: Logo (Static now) */}
               <div className="relative flex items-center justify-center w-full h-full">
                  <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full animate-pulse" />
                  <img 
                    src="https://lumai.ir/logo-en.svg" 
                    alt="Luma AI" 
                    className="w-16 h-auto brightness-0 invert opacity-90"
                  />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Orbiting Nodes Systems --- */}
      
      {/* 1. Inner Orbit System */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:50s] pointer-events-none z-50">
         {innerOrbit.map((node, i) => {
           const angle = (i / innerOrbit.length) * 360;
           const radius = innerRadius;
           const isActive = activeNode?.id === node.id;
           const activeColorHex = getColorHex(node.color);

           return (
             <div 
               key={node.id}
               className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto"
               style={{ transform: `rotate(${angle}deg)` }}
             >
                {/* Connection Beam */}
                <div 
                   className="absolute top-1/2 left-0 h-[1px] origin-left transition-all duration-300"
                   style={{ 
                      width: radius - 60, 
                      background: isActive 
                        ? `linear-gradient(to right, transparent, ${activeColorHex})` 
                        : 'transparent',
                      opacity: isActive ? 1 : 0
                   }}
                />

                {/* The Node Position */}
                <div 
                   className="absolute"
                   style={{ transform: `translateX(${radius}px) translate(-50%, -50%)` }}
                >
                    <div 
                       className="relative group cursor-pointer"
                       onMouseEnter={() => handleNodeEnter(node)}
                       onMouseLeave={handleNodeLeave}
                    >
                       {/* Counter-Rotate Icon */}
                       <div className="animate-spin-slow [animation-duration:50s] direction-reverse">
                           <div className={`
                              w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-500 relative z-20
                              ${isActive 
                                 ? 'bg-[#151515] border-white/40 scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                                 : 'bg-[#0a0a0a]/80 border border-white/10 hover:border-white/30 hover:scale-110 hover:bg-[#151515]'
                              }
                           `}>
                              <node.icon 
                                size={24} 
                                className={`transition-all duration-300 ${isActive ? node.color : 'text-gray-400 group-hover:text-white'}`} 
                              />
                           </div>
                           
                           {/* Label Tag (Visible on hover) */}
                           <div className={`
                              absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-bold text-white whitespace-nowrap pointer-events-none transition-all duration-300 z-30
                              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                           `}>
                              {node.label}
                           </div>
                       </div>
                    </div>
                </div>
             </div>
           );
         })}
      </div>

      {/* 2. Outer Orbit System (Reverse Rotation) */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:80s] direction-reverse pointer-events-none z-40">
         {outerOrbit.map((node, i) => {
           const angle = (i / outerOrbit.length) * 360;
           const radius = outerRadius; 
           const isActive = activeNode?.id === node.id;
           const activeColorHex = getColorHex(node.color);

           return (
             <div 
               key={node.id}
               className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto"
               style={{ transform: `rotate(${angle}deg)` }}
             >
                {/* Connection Beam */}
                <div 
                   className="absolute top-1/2 left-0 h-[1px] origin-left transition-all duration-300"
                   style={{ 
                      width: radius - 50, 
                      background: isActive 
                        ? `linear-gradient(to right, transparent, ${activeColorHex})` 
                        : 'transparent',
                      opacity: isActive ? 0.6 : 0
                   }}
                />

                <div 
                   className="absolute"
                   style={{ transform: `translateX(${radius}px) translate(-50%, -50%)` }}
                >
                    <div 
                       className="relative group cursor-pointer"
                       onMouseEnter={() => handleNodeEnter(node)}
                       onMouseLeave={handleNodeLeave}
                    >
                       <div className="animate-spin-slow [animation-duration:80s]">
                           <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 relative z-20
                              ${isActive 
                                 ? 'bg-[#151515] border border-white/40 scale-125' 
                                 : 'bg-[#0a0a0a]/90 border border-white/10 hover:border-white/30 hover:scale-110'
                              }
                           `}>
                              <node.icon 
                                size={18} 
                                className={`transition-all duration-300 ${isActive ? node.color : 'text-gray-500 group-hover:text-gray-300'}`} 
                              />
                           </div>
                       </div>
                    </div>
                </div>
             </div>
           );
         })}
      </div>

    </div>
  );
};
