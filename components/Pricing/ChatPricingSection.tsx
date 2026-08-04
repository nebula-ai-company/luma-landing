
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Zap, Globe, Cpu, Wind, Box, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { ModelPricing, PRICING_METADATA, formatPersianNumber } from './PricingData';
import { useTheme } from '../../lib/ThemeContext';

interface ChatPricingSectionProps {
  models: ModelPricing[];
}

// Icons for Providers
const PROVIDER_ICONS: Record<string, any> = {
  "OpenAI": Zap,
  "Google": Globe,
  "xAI": Terminal,
  "Anthropic": Box,
  "Minimax": Sparkles,
  "DeepSeek": Search,
  "Alibaba": Cpu,
  "Mistral": Wind,
  "Zai": Brain,
  "Moonshot AI": Sparkles,
  "Meta": Box
};

export const ChatPricingSection: React.FC<ChatPricingSectionProps> = ({ models }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProvider, setActiveProvider] = useState<string>('all');

  // Extract unique providers
  const providers = useMemo(() => {
    const unique = new Set(models.map(m => m.provider || 'Other'));
    return ['all', ...Array.from(unique)];
  }, [models]);

  // Filter Logic
  const filteredModels = models.filter(m => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(cleanSearch);
    const matchesProvider = activeProvider === 'all' || m.provider === activeProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="py-16 border-b border-zinc-200 dark:border-white/5 last:border-0 relative">
       
       {/* Ambient Background Glow */}
       <motion.div 
          animate={{ opacity: [0.03, 0.05, 0.03], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] blur-[120px] rounded-full pointer-events-none bg-luma-purple/10" 
       />

       <div className="max-w-screen-2xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
             <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-luma-purple shadow-lg shrink-0">
                   <MessageSquare size={28} />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                        گفتگو با هوش مصنوعی
                    </h2>
                    <p className="text-zinc-500 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                        تعرفه‌ها بر اساس هر <span className="text-zinc-900 dark:text-white font-bold">۱ میلیون توکن</span> محاسبه می‌شود.
                    </p>
                </div>
             </div>

             {/* Search */}
             <div className="relative group w-full md:w-72">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-luma-purple transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="جستجو در مدل‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pr-12 pl-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus:border-luma-purple/50 outline-none transition-all shadow-inner shadow-zinc-100/10 dark:shadow-inner"
                />
             </div>
          </div>

          {/* Provider Tabs */}
          <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
             <div className="flex gap-2 min-w-max">
                {providers.map(p => (
                   <button
                      key={p}
                      onClick={() => setActiveProvider(p)}
                      className={`
                         px-4 py-2 rounded-xl text-xs font-bold transition-all border
                         ${activeProvider === p 
                            ? 'bg-luma-purple/10 text-luma-purple border-luma-purple/30' 
                            : 'bg-zinc-50 dark:bg-[#121212] text-zinc-500 dark:text-gray-400 border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
                         }
                      `}
                   >
                      {p === 'all' ? 'همه سازندگان' : p}
                   </button>
                ))}
             </div>
          </div>

          {/* Table Container */}
          <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-lg dark:shadow-2xl overflow-hidden">
             <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-right border-collapse">
                   <thead className="bg-zinc-50 dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5 text-xs text-zinc-500 dark:text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                         <th className="py-5 px-6 w-[40%]">مدل</th>
                         <th className="py-5 px-6 w-[20%] text-center hidden sm:table-cell">سازنده</th>
                         <th className="py-5 px-6 w-[20%] text-center">ورودی (۱M Token)</th>
                         <th className="py-5 px-6 w-[20%] text-center">خروجی (۱M Token)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                      <AnimatePresence mode="popLayout">
                         {filteredModels.map((m, i) => {
                            const Icon = PROVIDER_ICONS[m.provider || 'OpenAI'] || Zap;
                            return (
                               <motion.tr
                                  key={m.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: i * 0.02, duration: 0.2 }}
                                  className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors group"
                               >
                                  <td className="py-4 px-6">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                           <Icon size={16} />
                                        </div>
                                        <div>
                                           <div className="font-bold text-sm text-zinc-800 dark:text-gray-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{m.name}</div>
                                           <div className="text-[10px] text-gray-500 sm:hidden mt-0.5">{m.provider}</div>
                                        </div>
                                     </div>
                                  </td>
                                  
                                  <td className="py-4 px-6 text-center hidden sm:table-cell">
                                     <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-md">{m.provider}</span>
                                  </td>
                                  
                                  <td className="py-4 px-6 text-center">
                                     <div className="flex items-center justify-center gap-1.5">
                                        <span className="text-base font-bold text-zinc-900 dark:text-white dir-ltr">{m.prices?.input?.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-500">لوم</span>
                                     </div>
                                  </td>
                                  
                                  <td className="py-4 px-6 text-center">
                                     <div className="flex items-center justify-center gap-1.5">
                                        <span className="text-base font-bold text-luma-purple dir-ltr">{m.prices?.output?.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-500">لوم</span>
                                     </div>
                                  </td>
                               </motion.tr>
                            );
                         })}
                      </AnimatePresence>
                   </tbody>
                </table>
             </div>
             
             {filteredModels.length === 0 && (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Search size={32} className="text-gray-600" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-300">مدلی یافت نشد</h3>
                   <p className="text-gray-500 text-sm mt-2">لطفاً جستجوی خود را تغییر دهید.</p>
                </div>
             )}

             <div className="bg-zinc-50 dark:bg-[#0a0a0a] px-6 py-3 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center text-xs text-zinc-400 dark:text-gray-500 font-mono">
                <span>
                   {searchTerm.trim() !== '' || activeProvider !== 'all'
                      ? `نتایج: ${formatPersianNumber(filteredModels.length)} از ${formatPersianNumber(models.length)}`
                      : `تعداد مدل‌ها: ${formatPersianNumber(models.length)}`
                   }
                </span>
                <span>آخرین بروزرسانی: {PRICING_METADATA.displayDateFa}</span>
             </div>
          </div>

       </div>
    </div>
  );
};
