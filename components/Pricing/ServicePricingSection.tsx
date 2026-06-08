
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingCalculator } from './PricingCalculator';
import { ModelPricing } from './PricingData';
import { Check, Search, Sparkles } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

interface ServicePricingSectionProps {
  title: string;
  description: string;
  models: ModelPricing[];
  color: string;
  icon: React.ElementType;
}

const getStartingPrice = (model: ModelPricing): number | string => {
  if (model.pricing_strategy === 'fixed') {
    return model.price || 0;
  }
  
  if (!model.prices) return 0;

  // Helper to find first number deep in object
  const findFirstNumber = (obj: any): number => {
    if (typeof obj === 'number') return obj;
    if (typeof obj === 'object' && obj !== null) {
      const values = Object.values(obj);
      if (values.length > 0) {
        return findFirstNumber(values[0]);
      }
    }
    return 0;
  };

  return findFirstNumber(model.prices);
};

export const ServicePricingSection: React.FC<ServicePricingSectionProps> = ({ 
  title, description, models, color, icon: Icon 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  // Filter logic
  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.badge && m.badge.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Extract pure color class for bg/border usage (e.g. text-luma-pink -> luma-pink)
  const themeColor = color.replace('text-', '');

  return (
    <div className="py-16 border-b border-zinc-200 dark:border-white/5 last:border-0 relative">
       
       {/* Ambient Background Glow (Animated) */}
       <motion.div 
          animate={{ 
             opacity: [0.03, 0.06, 0.03], 
             scale: [1, 1.1, 1],
             x: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none bg-${themeColor}`} 
       />

       {/* HEADER ROW - Outside the grid to ensure boxes align perfectly below */}
       <div className="max-w-screen-2xl mx-auto mb-6 relative z-10">
          <div className="flex items-start gap-5">
             <div className={`w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center ${color} shadow-lg shrink-0 group`}>
                <Icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
             </div>
             <div>
                 <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                     {title}
                     <span className={`text-xs px-2 py-0.5 rounded-md bg-${themeColor}/10 border border-${themeColor}/20 ${color} hidden sm:inline-block font-bold`}>
                         {models.length} مدل
                     </span>
                 </h2>
                 <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                     {description}
                 </p>
             </div>
          </div>
       </div>

       {/* CONTENT GRID - Boxes Only */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left: Table Box (Wider: 7 cols) */}
          <div className="lg:col-span-7 h-[600px]">
             <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-xl dark:shadow-2xl transition-colors duration-300 relative lg:overflow-hidden">
                
                {/* Fixed Search Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#121212] transition-colors duration-300 relative z-20 shrink-0">
                    <div className="relative group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500 group-focus-within:text-zinc-700 dark:group-focus-within:text-white transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder={`جستجو در بین ${models.length} مدل...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pr-12 pl-4 text-sm text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus:border-zinc-300 dark:focus:border-white/20 focus:bg-zinc-100 dark:focus:bg-[#151515] outline-none transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Scrollable Table Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {/* Table Gradient Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${themeColor} to-transparent opacity-50 z-10`} />

                    <table className="w-full text-right border-collapse table-fixed">
                       <thead className="sticky top-0 bg-white dark:bg-[#121212] z-10 shadow-sm transition-colors duration-300">
                          <tr className="border-b border-zinc-200 dark:border-white/5">
                             <th className="py-4 px-4 sm:px-6 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider w-[35%]">مدل هوش مصنوعی</th>
                             <th className="py-4 px-4 sm:px-6 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider w-[40%]">مناسب برای</th>
                             <th className="py-4 px-4 sm:px-6 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider text-center w-[25%]">شروع قیمت</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-200/50 dark:divide-white/5">
                          <AnimatePresence>
                              {filteredModels.map((m, i) => (
                                 <motion.tr
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: i * 0.03, duration: 0.3 }}
                                    className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group"
                                 >
                                    <td className="py-4 px-4 sm:px-6 align-middle">
                                        <div className="flex flex-col">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-bold text-sm text-zinc-805 dark:text-gray-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{m.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="py-4 px-4 sm:px-6 align-middle">
                                       <p className="text-xs text-zinc-500 dark:text-gray-400 font-light leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2 md:line-clamp-none">
                                          {m.suitableFor}
                                       </p>
                                    </td>
                                    
                                    <td className="py-4 px-4 sm:px-6 text-center align-middle">
                                       <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
                                          <span className={`text-lg font-black dir-ltr ${color} drop-shadow-sm`}>
                                             {getStartingPrice(m).toLocaleString()}
                                          </span>
                                          <span className="text-xs text-gray-500 font-medium">لوم</span>
                                       </div>
                                    </td>
                                 </motion.tr>
                              ))}
                          </AnimatePresence>
                       </tbody>
                    </table>
                    
                    {filteredModels.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-3">
                                <Search size={24} className="text-gray-500" />
                            </div>
                            <span className="text-sm text-zinc-500 dark:text-gray-400 font-medium">مدلی با این نام یافت نشد</span>
                        </div>
                    )}
                </div>
                
                <div className="bg-zinc-50 dark:bg-[#0a0a0a] px-6 py-3 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center text-[10px] text-zinc-400 dark:text-gray-500 font-mono shrink-0 rounded-b-[28px] transition-colors">
                    <span>Total Models: {models.length}</span>
                    <span>Last Updated: Today</span>
                </div>
             </div>
          </div>

          {/* Right: Calculator Box (Narrower: 5 cols) - EXACT SAME HEIGHT */}
          <div className="lg:col-span-5 h-[600px]">
             <PricingCalculator models={models} />
          </div>

       </div>
    </div>
  );
};
