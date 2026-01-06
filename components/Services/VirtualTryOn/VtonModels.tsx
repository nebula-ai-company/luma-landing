
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Image as ImageIcon, Sparkles } from 'lucide-react';

const MODELS = [
    { 
        id: 'nano-pro',
        name: "NANO BANANA PRO", 
        badge: "پیشنهاد لوما ⭐", 
        desc: "تعادل عالی بین سرعت و امکانات. تنها مدلی که از تنظیمات پیشرفته حجاب، ژست و سن پشتیبانی می‌کند.",
        features: ["تنظیمات حجاب", "تغییر ژست", "کیفیت 4K"],
        color: "text-luma-yellow",
        borderColor: "border-luma-yellow",
        bg: "bg-[#1a1a1a]",
        icon: Crown
    },
    { 
        id: 'vton',
        name: "LUMA VTON", 
        badge: "استاندارد", 
        desc: "مدل پایه برای تست سریع لباس‌ها روی مانکن‌های پیش‌فرض.",
        features: ["سرعت بالا", "مانکن‌های آماده"],
        color: "text-luma-pink",
        borderColor: "border-white/10",
        bg: "bg-[#121212]",
        icon: Zap
    },
    { 
        id: 'flux',
        name: "FLUX 2 PRO", 
        badge: "خلاقانه", 
        desc: "قدرتمند در خلق تصاویر هنری و فشن ادیتوریال با نورپردازی‌های پیچیده.",
        features: ["نورپردازی سینمایی", "جزئیات بالا"],
        color: "text-luma-purple",
        borderColor: "border-white/10",
        bg: "bg-[#121212]",
        icon: Sparkles
    },
    { 
        id: 'gpt',
        name: "GPT IMAGE 1.5", 
        badge: "هوشمند", 
        desc: "فهم عمیق دستورات متنی برای ساخت صحنه‌های پیچیده.",
        features: ["پیروی دقیق از متن", "خلاقیت بالا"],
        color: "text-blue-400",
        borderColor: "border-white/10",
        bg: "bg-[#121212]",
        icon: ImageIcon
    }
];

export const VtonModels: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-screen-2xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">انتخاب موتور هوش مصنوعی</h2>
                <p className="text-gray-400">برای دسترسی به تنظیمات کامل (حجاب و ژست)، مدل Nano Banana Pro را پیشنهاد می‌کنیم.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MODELS.map((model, i) => (
                    <motion.div 
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative rounded-3xl border p-6 flex flex-col ${model.bg} ${model.borderColor} group hover:-translate-y-1 transition-transform duration-300`}
                    >
                        {model.id === 'nano-pro' && (
                            <div className="absolute inset-0 bg-luma-yellow/5 rounded-3xl pointer-events-none" />
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 ${model.color}`}>
                                <model.icon size={24} />
                            </div>
                            {model.badge && (
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border bg-white/5 ${model.color} ${model.borderColor === 'border-luma-yellow' ? 'border-luma-yellow/30' : 'border-white/10'}`}>
                                    {model.badge}
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                            {model.name}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                            {model.desc}
                        </p>

                        <div className="border-t border-white/5 pt-4 space-y-2">
                            {model.features.map((f, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-${model.color.replace('text-', '')}`} />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
