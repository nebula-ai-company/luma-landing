
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Zap, Sliders, Layers, Sparkles, ArrowLeft } from 'lucide-react';
import Button from '../../Button';
import { EditingHeroAnim } from './EditingHeroAnim';

// Reusable FeatureCard component adapted from Features.tsx to maintain consistency
interface FeatureCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  children, 
  className = "",
  glowColor = "#ffffff",
  delay = 0
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative group rounded-[32px] p-px overflow-hidden transition-transform duration-500 hover:-translate-y-1 ${className}`}
      style={{ 
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      {/* Dynamic Border Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${glowColor}50, transparent 40%)`
        }}
      />

      {/* Inner Content Background */}
      <div className="relative h-full bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8">
        
        {/* Unified Background Gradient */}
        <div 
           className="absolute bottom-0 left-0 right-0 h-3/4 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
           style={{
             background: `linear-gradient(to top, ${glowColor}, transparent)`
           }}
        />

        {/* Subtle Inner Glow following cursor */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
          }}
        />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
            {children}
        </div>
      </div>
    </motion.div>
  );
};

export const EditingHero: React.FC = () => {
  // Dot pattern style for background
  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1.5' fill='rgb(255 255 255 / 0.1)'/%3e%3c/svg%3e")`
  };

  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-[#0a0a0a] min-h-screen flex flex-col justify-center">
       
       {/* --- Professional Animated Background --- */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          
          {/* 1. Dot Pattern Overlay */}
          <div className="absolute inset-0 opacity-30" style={dotStyle} />
          
          {/* 2. Gradient Masks for Seamless Blending (Top/Bottom Fades) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a_100%)] z-10 opacity-70" />

          {/* 3. Moving Gradient Blobs */}
          {/* Purple Orb */}
          <motion.div 
             animate={{ 
               x: [0, 100, -50, 0],
               y: [0, -50, 50, 0],
               scale: [1, 1.2, 0.9, 1],
               opacity: [0.2, 0.4, 0.2]
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-luma-purple/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          
          {/* Pink Orb */}
          <motion.div 
             animate={{ 
               x: [0, -80, 40, 0],
               y: [0, 60, -40, 0],
               scale: [0.9, 1.1, 1, 0.9],
               opacity: [0.15, 0.3, 0.15]
             }}
             transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-luma-pink/15 rounded-full blur-[120px] mix-blend-screen" 
          />

          {/* Yellow/Warm Orb (Central) */}
          <motion.div 
             animate={{ 
               x: [0, 50, -50, 0],
               y: [0, 40, -40, 0],
               scale: [1, 0.8, 1.1, 1],
               opacity: [0.1, 0.25, 0.1]
             }}
             transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luma-yellow/10 rounded-full blur-[150px] mix-blend-screen" 
          />
          
          {/* 4. Noise Texture for "Grainy" Professional Look */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay z-0" />
       </div>

       {/* --- Seamless Bottom Fade Mask --- */}
       {/* Increased height and opacity to ensure perfect blend with next section */}
       <div 
         className="absolute bottom-0 left-0 right-0 h-80 z-10 pointer-events-none"
         style={{
           background: 'linear-gradient(to top, #0a0a0a 0%, #0a0a0a 20%, rgba(10,10,10,0.8) 50%, transparent 100%)'
         }} 
       />
       
       <div className="max-w-screen-2xl mx-auto px-4 relative z-20 w-full">
          
          {/* --- TOP: Text Content --- */}
          <div className="text-center max-w-5xl mx-auto mb-20">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
             >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 group hover:border-luma-purple/40 transition-all cursor-default shadow-lg shadow-black/20">
                   <Sparkles size={12} className="text-luma-purple animate-pulse" />
                   <span className="text-gray-300 text-[11px] font-bold tracking-wider group-hover:text-white transition-colors">
                      استودیو خلاقیت هوشمند
                   </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                   خلق و ویرایش
                   <br />
                   <span className="text-gradient-animated py-2 inline-block">
                      فراتر از تصور
                   </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl font-light">
                   با قدرت هوش مصنوعی، ایده‌های خود را به واقعیت تبدیل کنید. تنها با نوشتن یک متن ساده، می‌توانید تصاویر جدید خلق کنید و یا عکس‌های خود را با دقت پیکسل ویرایش نمایید.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                   <Button 
                      variant="primary" 
                      className="shadow-[0_0_50px_-15px_rgba(218,143,255,0.4)] border-0 ring-1 ring-white/50 px-10 py-4 text-base"
                   >
                      <Zap size={20} className="fill-black" />
                      ورود به استودیو
                   </Button>
                </div>
             </motion.div>
          </div>

          {/* --- MIDDLE: Interactive Dashboard --- */}
          <motion.div 
             initial={{ opacity: 0, y: 100, scale: 0.95 }}
             whileInView={{ opacity: 1, y: 0, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="w-full max-w-7xl mx-auto relative z-20"
          >
             {/* Main Glow behind the dashboard */}
             <div className="absolute -inset-1 bg-gradient-to-b from-luma-purple/20 via-transparent to-transparent blur-3xl opacity-50 -z-10 rounded-[40px] pointer-events-none" />
             
             {/* The Dashboard Component Frame */}
             <div className="relative w-full rounded-[32px] overflow-hidden shadow-2xl shadow-black border border-white/10 bg-[#050505]/80 backdrop-blur-xl">
                {/* Top highlight line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30" />
                <EditingHeroAnim />
             </div>
          </motion.div>

          {/* --- BOTTOM: Features Grid (Enhanced with FeatureCard) --- */}
          <div className="mt-24 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-12">
             {[
                { 
                   icon: Wand2, 
                   title: "تولید تصویر (Text-to-Image)", 
                   desc: "تبدیل متن فارسی به تصاویر با کیفیت 8K و جزئیات دقیق.",
                   hexColor: "#FF6482", // luma-pink
                   iconColor: "text-luma-pink",
                   delay: 0
                },
                { 
                   icon: Layers, 
                   title: "ویرایش هوشمند (Inpainting)", 
                   desc: "حذف یا جایگزینی اشیاء در تصویر با انتخاب ناحیه و نوشتن متن.",
                   hexColor: "#DA8FFF", // luma-purple
                   iconColor: "text-luma-purple",
                   delay: 0.1
                },
                { 
                   icon: Sliders, 
                   title: "تنظیمات حرفه‌ای", 
                   desc: "کنترل کامل بر نور، رنگ و ترکیب‌بندی با ابزارهای پیشرفته.",
                   hexColor: "#FFB340", // luma-yellow
                   iconColor: "text-luma-yellow",
                   delay: 0.2
                },
             ].map((item, i) => (
                <FeatureCard 
                   key={i} 
                   glowColor={item.hexColor} 
                   delay={item.delay}
                   className="min-h-[220px]"
                >
                   {/* Icon */}
                   <div className="relative z-10 mb-6 flex justify-between items-start">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner ${item.iconColor}`}>
                         <item.icon size={28} />
                      </div>
                   </div>

                   {/* Text */}
                   <div className="relative z-10 space-y-3 mt-auto">
                      <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
                         {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                         {item.desc}
                      </p>
                   </div>
                </FeatureCard>
             ))}
          </div>

       </div>
    </section>
  );
};
