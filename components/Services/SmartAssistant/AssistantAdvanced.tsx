
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PenTool, TrendingUp, Search } from 'lucide-react';

export const AssistantAdvanced: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505]">
       <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* Analytics Card */}
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 bg-[#111] rounded-[32px] border border-white/10 p-8 md:p-12 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <BarChart3 size={24} />
                   </div>
                   <h3 className="text-2xl font-bold text-white">گزارش‌گیری هوشمند</h3>
                </div>
                
                <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                   دستیار شما فقط پاسخ نمی‌دهد، بلکه گوش می‌دهد. ما مکالمات را تحلیل می‌کنیم تا بدانید مشتریان شما دقیقاً چه می‌خواهند.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {[
                      { title: "تحلیل موضوعی", val: "۳۰٪ قیمت", icon: Search },
                      { title: "شناسایی مشکلات", val: "نقاط ضعف", icon: TrendingUp },
                      { title: "نمودار مصرف", val: "پیام/روز", icon: BarChart3 },
                   ].map((item, i) => (
                      <div key={i} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                         <item.icon size={16} className="text-gray-500 mb-2" />
                         <div className="text-xs text-gray-400 mb-1">{item.title}</div>
                         <div className="text-lg font-bold text-white">{item.val}</div>
                      </div>
                   ))}
                </div>
             </motion.div>

             {/* Auto-Blog Card */}
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-5 bg-[#111] rounded-[32px] border border-white/10 p-8 md:p-12 relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-luma-pink/10 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-luma-pink/10 text-luma-pink">
                      <PenTool size={24} />
                   </div>
                   <h3 className="text-2xl font-bold text-white">بلاگ‌نویس خودکار</h3>
                </div>
                
                <p className="text-gray-400 mb-8 leading-relaxed">
                   فایل‌های دانشی که آپلود می‌کنید گنجینه هستند. سیستم ما می‌تواند به صورت خودکار از آن‌ها مقالات آموزشی سئو شده تولید کند.
                </p>

                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xl">✍️</span>
                   </div>
                   <div>
                      <div className="text-xs text-luma-pink mb-1 font-bold">آخرین مقاله تولید شده</div>
                      <div className="text-sm text-white truncate max-w-[200px]">راهنمای جامع گارانتی محصولات...</div>
                   </div>
                </div>
             </motion.div>

          </div>
       </div>
    </section>
  );
};
