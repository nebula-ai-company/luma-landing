import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, PenTool, Factory } from 'lucide-react';

const USE_CASES = [
    {
        title: "فروشگاه‌های آنلاین",
        subtitle: "Online Shops",
        desc: "بدون نیاز به ارسال لباس برای مدل‌ها یا اجاره استودیو، تمام موجودی انبار خود را با عکس‌های حرفه‌ای روی مدل‌های متنوع نمایش دهید.",
        icon: ShoppingBag,
        color: "text-luma-yellow",
        bg: "bg-luma-yellow/10"
    },
    {
        title: "طراحان مد و لباس",
        subtitle: "Fashion Designers",
        desc: "ایده‌های خود را قبل از دوخت نهایی تست کنید. پارچه‌ها و طرح‌های مختلف را روی مانکن مجازی ببینید و کاتالوگ بسازید.",
        icon: PenTool,
        color: "text-luma-pink",
        bg: "bg-luma-pink/10"
    },
    {
        title: "تولیدکنندگان پوشاک",
        subtitle: "Manufacturers",
        desc: "کاتالوگ محصولات فصل جدید را در کمترین زمان ممکن و با کمترین هزینه آماده کنید. تنوع رنگی را به سادگی نمایش دهید.",
        icon: Factory,
        color: "text-luma-purple",
        bg: "bg-luma-purple/10"
    }
];

export const VtonUseCases: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#080808] border-y border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {USE_CASES.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/5 rounded-[32px] p-8 hover:border-black/10 dark:hover:border-white/10 shadow-sm transition-all duration-300 group"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon size={28} className={item.color} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                        <span className="text-xs font-mono text-zinc-500 dark:text-gray-500 mb-4 block uppercase tracking-wider">{item.subtitle}</span>
                        <p className="text-zinc-600 dark:text-gray-400 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
