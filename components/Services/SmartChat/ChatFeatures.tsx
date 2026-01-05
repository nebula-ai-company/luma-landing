
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Code2, FileSpreadsheet, CloudSun } from 'lucide-react';

const FEATURES = [
  {
    id: 'switching',
    title: "جابجایی پویا (Dynamic Switching)",
    desc: "هرگز در بن‌بست نمانید. بحث را با مدل ارزان GPT-4o-mini شروع کنید و برای حل مسائل پیچیده، وسط مکالمه به سراغ غول‌هایی مثل GPT-5 یا Claude 3.7 بروید.",
    icon: RefreshCw,
    color: "text-luma-purple",
    visual: (
        <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-white/10">
            <div className="px-3 py-1 rounded bg-white/5 text-[10px] text-gray-400">GPT-4o Mini</div>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-600 to-luma-purple" />
            <div className="w-6 h-6 rounded-full bg-luma-purple/20 flex items-center justify-center border border-luma-purple/50">
                <RefreshCw size={12} className="text-luma-purple" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-luma-purple to-gray-600" />
            <div className="px-3 py-1 rounded bg-luma-purple/10 text-[10px] text-luma-purple border border-luma-purple/30">GPT-5</div>
        </div>
    )
  },
  {
    id: 'artifacts',
    title: "ابزارهای اختصاصی (Artifacts)",
    desc: "چت‌بات لوما فقط متن تولید نمی‌کند. کدها را به صورت زنده اجرا کنید، فایل‌های اکسل و ورد بسازید و ویجت‌های گرافیکی دریافت کنید.",
    icon: Code2,
    color: "text-luma-yellow",
    visual: (
        <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                <Code2 size={16} className="text-blue-400" />
                <span className="text-[8px] text-gray-400">Live Code</span>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                <FileSpreadsheet size={16} className="text-green-400" />
                <span className="text-[8px] text-gray-400">Excel Gen</span>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                <CloudSun size={16} className="text-orange-400" />
                <span className="text-[8px] text-gray-400">Widgets</span>
            </div>
        </div>
    )
  }
];

export const ChatFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] border-y border-white/5">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-black text-white text-center mb-16">
            فراتر از <span className="text-luma-purple">متن خالی</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feat, i) => (
                <motion.div 
                    key={feat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors group"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform ${feat.color}`}>
                            <feat.icon size={24} />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                    <p className="text-gray-400 text-sm leading-7 mb-8 h-20">{feat.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5">
                        {feat.visual}
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
