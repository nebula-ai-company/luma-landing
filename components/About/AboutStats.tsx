
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Globe, Sparkles } from 'lucide-react';

// Data based on actual platform capabilities (Models listed in Chat/Video sections, Services defined in constants)
const STATS = [
  { 
    id: 1, 
    label: "مدل هوش مصنوعی", 
    value: "+۲۰", 
    icon: Cpu, 
    color: "from-blue-400 to-indigo-400",
    desc: "دسترسی به برترین‌ها"
  },
  { 
    id: 2, 
    label: "سرویس تخصصی", 
    value: "۸", 
    icon: Layers, 
    color: "from-luma-purple to-luma-pink",
    desc: "پلتفرم یکپارچه"
  },
  { 
    id: 3, 
    label: "سازگار با فارسی", 
    value: "۱۰۰٪", 
    icon: Globe, 
    color: "from-luma-yellow to-orange-400",
    desc: "درک عمیق زبان"
  },
  { 
    id: 4, 
    label: "کیفیت خروجی", 
    value: "4K", 
    icon: Sparkles, 
    color: "from-emerald-400 to-teal-400",
    desc: "استاندارد سینمایی"
  }
];

const StatCard: React.FC<{ item: typeof STATS[0], index: number }> = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="relative group p-8 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Faint Background Icon for Depth */}
      <div className="absolute opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 transform scale-150 group-hover:scale-125 pointer-events-none text-zinc-400 dark:text-white">
         <item.icon size={120} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
         
         {/* Value with Gradient Text */}
         <div className="mb-2 relative">
            <h3 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br ${item.color} drop-shadow-sm`}>
               {item.value}
            </h3>
            {/* Subtle glow behind text on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
         </div>

         {/* Label */}
         <span className="text-sm md:text-base font-bold text-zinc-800 dark:text-white mb-3 tracking-wide">
            {item.label}
         </span>

         {/* Small Description Pill */}
         <span className="text-[10px] text-zinc-550 dark:text-gray-400 font-medium px-3 py-1 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02]">
            {item.desc}
         </span>
      </div>

      {/* Animated Bottom Accent Line on Hover */}
      <motion.div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 rounded-full`}
        whileHover={{ width: "40%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const AboutStats: React.FC = () => {
  return (
    <section className="border-y border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] relative z-20 overflow-hidden transition-colors duration-300">
       {/* Ambient Noise Texture */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
       
       <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 relative">
             
             {/* Elegant Vertical Dividers (Desktop) */}
             <div className="absolute inset-y-8 left-1/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent hidden md:block" />
             <div className="absolute inset-y-8 left-2/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent hidden md:block" />
             <div className="absolute inset-y-8 left-3/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent hidden md:block" />
             
             {/* Dividers for Mobile Grid */}
             <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent md:hidden" />
             <div className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent md:hidden" />

             {STATS.map((item, index) => (
                <StatCard key={item.id} item={item} index={index} />
             ))}
          </div>
       </div>
    </section>
  );
};
