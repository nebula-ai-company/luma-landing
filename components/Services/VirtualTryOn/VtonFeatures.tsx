
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sun, Accessibility, Gem, Check } from 'lucide-react';

const FEATURE_TABS = [
    {
        id: 'hijab',
        title: "نوع پوشش و حجاب",
        icon: Gem,
        desc: "ویژگی انحصاری برای بازار ایران. نوع پوشش سر مدل را دقیقاً مطابق نیاز برند خود تعیین کنید.",
        options: ["بدون حجاب", "شال / مینی اسکارف", "مقنعه (اداری)", "توربان", "حجاب کامل"],
        color: "text-luma-pink",
        hex: "#FF6482",
        previewImage: "https://images.unsplash.com/photo-1606132759902-1779ba072b22?q=80&w=800&auto=format&fit=crop" 
    },
    {
        id: 'body',
        title: "مشخصات فیزیکی",
        icon: Accessibility,
        desc: "مانکنی بسازید که شبیه مشتریان واقعی شما باشد. از سایزهای مختلف تا سنین متفاوت.",
        options: ["سایز: لاغر تا پلاس سایز", "سن: کودک تا میانسال", "ژست: ایستاده، نشسته، حرکتی", "حالت چهره: خندان، جدی"],
        color: "text-luma-yellow",
        hex: "#FFB340",
        previewImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
    },
    {
        id: 'light',
        title: "نورپردازی و محیط",
        icon: Sun,
        desc: "کارگردان صحنه باشید. لباس را در محیط استودیویی تمیز یا فضای باز طبیعی نمایش دهید.",
        options: ["نور نرم استودیویی", "ساعت طلایی (Golden Hour)", "فضای باز / خیابان", "مینیمال تک‌رنگ"],
        color: "text-luma-purple",
        hex: "#DA8FFF",
        previewImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
    }
];

export const VtonFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ActiveIcon = FEATURE_TABS[activeTab].icon;

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % FEATURE_TABS.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-yellow/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Left Column: Navigation */}
                <div className="lg:col-span-5 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-white mb-10"
                    >
                        شخصی‌سازی <span className="text-gradient-animated">بی‌نهایت</span>
                    </motion.h2>
                    
                    <div 
                        className="space-y-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {FEATURE_TABS.map((tab, idx) => {
                            const isActive = activeTab === idx;
                            
                            return (
                                <motion.div
                                    key={tab.id}
                                    layout
                                    onClick={() => setActiveTab(idx)}
                                    className={`
                                        cursor-pointer p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group
                                        ${isActive ? 'bg-black/40 border-white/10 shadow-2xl backdrop-blur-sm' : 'bg-transparent border-white/5 hover:bg-white/5'}
                                    `}
                                >
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? `bg-${tab.color.replace('text-', '')}/20 ${tab.color}` : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                            <tab.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {tab.title}
                                            </h3>
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                                            {tab.desc}
                                                        </p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {tab.options.map((opt, i) => (
                                                                <motion.div 
                                                                    key={i} 
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                                                    className="flex items-center gap-2 text-[11px] text-gray-300"
                                                                >
                                                                    <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: tab.hex }} />
                                                                    {opt}
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Dynamic Visual */}
                <div className="lg:col-span-7 h-[500px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: -20 }}
                            transition={{ duration: 0.6, ease: "anticipate" }}
                            className="w-full h-full rounded-[32px] overflow-hidden border border-white/10 bg-[#0c0c0e] relative shadow-2xl"
                        >
                            {/* Visual Content based on Tab */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.img 
                                    src={FEATURE_TABS[activeTab].previewImage} 
                                    alt={FEATURE_TABS[activeTab].title}
                                    className="w-full h-full object-cover opacity-60"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            
                            {/* Overlay UI Mockup */}
                            <motion.div 
                                className="absolute bottom-8 right-8 left-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center gap-3 mb-4 text-white font-bold border-b border-white/10 pb-3">
                                        <ActiveIcon size={18} style={{ color: FEATURE_TABS[activeTab].hex }} />
                                        <span>تنظیمات فعال: {FEATURE_TABS[activeTab].title}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {FEATURE_TABS[activeTab].options.slice(0, 3).map((opt, i) => (
                                            <motion.span 
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4 + (i * 0.1), type: "spring" }}
                                                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/5 text-xs text-gray-200 flex items-center gap-2"
                                            >
                                                <Check size={12} className="text-green-400" />
                                                {opt}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    </section>
  );
};
