import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

// --- Color Palette Mapping ---
const BRAND_COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

// Helper to assign colors to services for variety
const getServiceColor = (id: string) => {
  switch (id) {
    case 'img-gen':
    case 'bg-remove':
    case 'try-on':
      return BRAND_COLORS.pink;
    case 'video':
    case 'img-edit':
    case 'chat':
      return BRAND_COLORS.purple;
    case 'assistant':
    case 'upscale':
      return BRAND_COLORS.yellow;
    default:
      return BRAND_COLORS.purple;
  }
};

// --- Sophisticated Animation Components ---

const ToolAnimation = ({ id, color, isHovered }: { id: string; color: string; isHovered: boolean }) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 pointer-events-none z-0"
        >
          {/* ID-Specific Animations */}
          {id === 'img-gen' && (
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] shadow-[0_0_15px_2px_currentColor]"
                style={{ backgroundColor: color, color: color }}
              />
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 0.2, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent"
                 style={{ backgroundImage: `linear-gradient(to bottom, ${color}10 1px, transparent 1px)`, backgroundSize: '100% 4px' }}
              />
            </div>
          )}

          {id === 'img-edit' && (
             <div className="absolute inset-0">
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                   animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2], x: [0, (i-1)*15], y: [0, -20] }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                   className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full"
                   style={{ backgroundColor: color }}
                 />
               ))}
             </div>
          )}

          {id === 'video' && (
            <div className="absolute inset-0 border-2 rounded-xl opacity-50 flex items-start justify-end p-2" style={{ borderColor: color }}>
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 1, repeat: Infinity }}
                 className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"
               />
               <motion.div
                 initial={{ height: '0%' }}
                 animate={{ height: '100%' }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"
               />
            </div>
          )}

          {id === 'assistant' && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ width: '40%', height: '40%', opacity: 0.8, border: `1px solid ${color}` }}
                  animate={{ width: '120%', height: '120%', opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
                  className="absolute rounded-full"
                />
              ))}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-12 h-12 rounded-full opacity-20 blur-md"
                style={{ backgroundColor: color }}
              />
            </div>
          )}

          {id === 'bg-remove' && (
            <div className="absolute inset-0 p-1">
               <svg className="w-full h-full">
                 <motion.rect
                   width="100%" height="100%" rx="12" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4"
                   initial={{ strokeDashoffset: 0 }}
                   animate={{ strokeDashoffset: -20 }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="opacity-60"
                 />
               </svg>
            </div>
          )}

          {id === 'upscale' && (
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ width: 10, height: 10, opacity: 1 }}
                  animate={{ width: 40, height: 40, opacity: 0, borderWidth: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="border border-current absolute rounded-md"
                  style={{ borderColor: color }}
                />
                <motion.div
                  initial={{ width: 40, height: 40, opacity: 0 }}
                  animate={{ width: 10, height: 10, opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-current absolute rounded-sm opacity-20 blur-sm"
                  style={{ backgroundColor: color }}
                />
             </div>
          )}

          {id === 'try-on' && (
             <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-start justify-center pt-1"
             >
                <div className="w-1 h-3 rounded-full" style={{ backgroundColor: color }} />
             </motion.div>
          )}

          {id === 'chat' && (
             <div className="absolute -top-1 -right-1 bg-surfaceHighlight border border-white/10 rounded-lg px-2 py-1 shadow-xl">
                <div className="flex gap-1">
                   {[0, 1, 2].map(i => (
                     <motion.div
                       key={i}
                       animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                       transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                       className="w-1.5 h-1.5 rounded-full"
                       style={{ backgroundColor: color }}
                     />
                   ))}
                </div>
             </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Card Component ---

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const color = useMemo(() => getServiceColor(service.id), [service.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link to={service.path} className="block h-full relative group outline-none">
        {/* Outer container for Border Effect */}
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // FIX: Use inline style for borderRadius to match inner radius perfectly (24px vs 23px)
            className="h-full relative p-px overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '24px' 
            }}
        >
            {/* Dynamic Border Gradient - Only visible on hover/movement */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                style={{
                    background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`
                }}
            />

            {/* Inner Content Container */}
            <div 
              className="relative h-full bg-[#0a0a0a] overflow-hidden"
              // FIX: Explicitly set inner radius to Outer (24px) - Padding (1px) = 23px
              style={{ borderRadius: '23px' }}
            >
                
                {/* Subtle Inner Glow following cursor */}
                <div 
                   className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                   style={{
                       background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color}, transparent 50%)`
                   }}
                />
                
                {/* Content Padding */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                    
                    {/* Header: Icon & Title */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300 overflow-visible">
                            <motion.div
                               animate={isHovered ? { scale: 0.9, opacity: 0.5 } : { scale: 1, opacity: 1 }}
                               transition={{ duration: 0.3 }}
                               className="relative z-10"
                            >
                                <service.icon 
                                    size={28} 
                                    className="text-gray-300 group-hover:text-white transition-colors" 
                                />
                            </motion.div>

                            {/* Animation Overlay inside icon box */}
                            <ToolAnimation id={service.id} color={color} isHovered={isHovered} />
                            
                            {/* Static subtle colored glow behind icon */}
                            <div 
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"
                              style={{ backgroundColor: color }}
                            />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                            {service.description}
                        </p>
                    </div>

                    {/* Footer / CTA Hint */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span 
                               className="text-sm font-bold transition-all duration-300"
                               style={{ color: isHovered ? color : '#6b7280' }}
                             >
                               مشاهده جزئیات
                             </span>
                         </div>
                         <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isHovered ? 'border-transparent text-black scale-110' : 'border-white/10 text-gray-600'}`}
                            style={{ backgroundColor: isHovered ? color : 'transparent' }}
                         >
                            <ArrowLeft size={16} className={`transition-transform duration-300 ${isHovered ? '-translate-x-0.5' : ''}`} />
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Main Services Section ---

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-5"
                >
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-pink opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-luma-pink"></span>
                    </span>
                    <span className="text-luma-pink text-base font-bold tracking-wide">سرویس‌های هوشمند</span>
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-white leading-tight mb-4"
                >
                    جعبه‌ابزار <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow">خلاقیت</span> شما
                </motion.h2>
                
                <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="text-gray-400 text-lg font-light leading-relaxed max-w-lg"
                >
                   دسترسی به قدرتمندترین مدل‌های هوش مصنوعی برای تولید، ویرایش و بهبود محتوا در یک پلتفرم یکپارچه.
                </motion.p>
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
            >
               <Button href="/gallery" variant="secondary" className="hidden md:flex px-6 py-2 text-sm">
                  مشاهده نمونه‌کارها <ArrowLeft size={16} />
               </Button>
            </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;