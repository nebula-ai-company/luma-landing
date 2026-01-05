
import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Wand2, History, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Printer,
    title: "چاپ در ابعاد بزرگ",
    desc: "عکس‌های موبایلی خود را بدون نگرانی از تار شدن، برای چاپ روی شاسی، بنر یا تابلوهای بزرگ آماده کنید.",
    color: "text-luma-purple",
    bg: "bg-luma-purple/10"
  },
  {
    icon: Wand2,
    title: "بازسازی عکس‌های قدیمی",
    desc: "خاطرات قدیمی و بی‌کیفیت خانوادگی را زنده کنید. حذف نویز و افزایش شفافیت چهره‌ها.",
    color: "text-luma-yellow",
    bg: "bg-luma-yellow/10"
  },
  {
    icon: Zap,
    title: "اصلاح خروجی هوش مصنوعی",
    desc: "اگر از میدجورنی یا دیگر ابزارها عکس گرفته‌اید و کیفیت آن پایین است، با Upscaler آن را به 4K برسانید.",
    color: "text-luma-pink",
    bg: "bg-luma-pink/10"
  },
  {
    icon: History,
    title: "بازیابی جزئیات",
    desc: "تکنولوژی Crystal ما پیکسل‌ها را فقط بزرگ نمی‌کند، بلکه بافت‌های از دست رفته (مثل بافت پوست یا پارچه) را بازسازی می‌کند.",
    color: "text-luma-purple",
    bg: "bg-luma-purple/10"
  }
];

export const UpscaleFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] border-t border-white/5">
       <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {FEATURES.map((item, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group"
                >
                   <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon size={24} className={item.color} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                   <p className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};
