
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Rocket, Sparkles } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

const VALUES = [
  {
    id: '01',
    title: "ماموریت ما",
    desc: "دسترسی‌پذیر کردن قدرتمندترین ابزارهای هوش مصنوعی برای تمام فارسی‌زبانان، حذف موانع تحریم و ارائه زیرساختی امن، پایدار و ارزان برای خلاقان.",
    icon: Target,
    color: "#DA8FFF", // Purple
    gradient: "from-luma-purple/20 to-transparent"
  },
  {
    id: '02',
    title: "تیم متخصص",
    desc: "متشکل از نخبگان مهندسی نرم‌افزار، محققان هوش مصنوعی و طراحان محصول که با اشتیاق برای حل چالش‌های تکنولوژیک گرد هم آمده‌اند.",
    icon: Users,
    color: "#FF6482", // Pink
    gradient: "from-luma-pink/20 to-transparent"
  },
  {
    id: '03',
    title: "چشم‌انداز",
    desc: "تبدیل شدن به قطب اصلی نوآوری هوش مصنوعی در خاورمیانه و ارائه اکوسیستمی جامع که در آن هر ایده به واقعیت تبدیل می‌شود.",
    icon: Rocket,
    color: "#FFB340", // Yellow
    gradient: "from-luma-yellow/20 to-transparent"
  }
];

interface ValueCardProps {
  item: typeof VALUES[0];
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ item, index }) => {
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
      transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
      className="h-full"
    >
      <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          className="group relative h-full rounded-[32px] p-px overflow-hidden transition-transform duration-500 hover:-translate-y-2"
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
          }}
      >
          {/* Dynamic Spotlight Border */}
          <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                  background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${item.color}50, transparent 40%)`
              }}
          />

          {/* Inner Content Container */}
          <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-0">
              
              {/* Top Gradient Tint */}
              <div 
                 className={`absolute top-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-b ${item.gradient}`}
              />

              {/* Cursor Glow (Inner) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${item.color}, transparent 40%)`
                }}
              />
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Header: Icon & Number */}
                <div className="flex justify-between items-start mb-8">
                   <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center 
                      bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-inner
                      group-hover:scale-110 transition-transform duration-500
                      group-hover:bg-zinc-100 group-hover:dark:bg-white/10 group-hover:border-zinc-300 group-hover:dark:border-white/10
                   `}>
                      <item.icon size={32} style={{ color: item.color }} className="drop-shadow-md" />
                   </div>
                   
                   <span className="text-6xl font-black text-zinc-950/5 dark:text-white/5 select-none font-mono group-hover:text-zinc-950/10 group-hover:dark:text-white/10 transition-colors duration-500">
                      {item.id}
                   </span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-zinc-950 group-hover:dark:text-gray-100 transition-colors">
                   {item.title}
                </h3>
                
                <p className="text-base text-zinc-600 dark:text-gray-400 leading-8 font-light flex-1 group-hover:text-zinc-800 group-hover:dark:text-gray-300 transition-colors">
                   {item.desc}
                </p>

                {/* Bottom Line Accent */}
                <div className="mt-8 h-1 w-12 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
                   <div 
                      className="h-full w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                      style={{ backgroundColor: item.color }} 
                   />
                </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

export const AboutCoreValues: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
         
         {/* Background Ambience */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-luma-purple/5 to-luma-pink/5 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
         </div>

         <div className="max-w-screen-xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-sm dark:shadow-lg"
               >
                  <Sparkles size={14} className="text-luma-purple" />
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-widest">DNA لوما</span>
               </motion.div>

               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
               >
                  استراتژی <span className="text-gradient-animated">محوری</span>
               </motion.h2>
               
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-zinc-600 dark:text-gray-400 text-lg font-light leading-relaxed"
               >
                  اصولی که ما را در مسیر ساخت آینده‌ای هوشمند هدایت می‌کنند.
               </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {VALUES.map((item, index) => (
                  <ValueCard key={item.id} item={item} index={index} />
               ))}
            </div>
         </div>
    </section>
  );
};
