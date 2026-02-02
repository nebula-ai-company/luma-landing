
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Accessibility, Gem, Sliders } from 'lucide-react';

const INITIAL_TABS = [
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
  const [tabs, setTabs] = useState(INITIAL_TABS);

  // Fetch Real Data
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://luma-upload-center.pages.dev/api/public/assets?serviceType=virtual-try-on');
            if (response.ok) {
                const data = await response.json();
                const assets = data.assets || [];
                
                // Filter valid assets with images
                const validAssets = assets.filter((a: any) => a.thumbnailUrl);
                
                if (validAssets.length > 0) {
                    setTabs(prevTabs => prevTabs.map((tab, index) => {
                        // Skip the first 5 assets (used in Hero) to avoid duplication
                        // Use modulo to safely wrap around if total assets are fewer than offset
                        const offset = 5;
                        const assetIndex = (index + offset) % validAssets.length;
                        const asset = validAssets[assetIndex];
                        
                        return {
                            ...tab,
                            previewImage: asset ? asset.thumbnailUrl : tab.previewImage
                        };
                    }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch VTON features data", error);
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 6000); 

    return () => clearInterval(interval);
  }, [isPaused, tabs.length]);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Visual - Left Side (RTL) */}
                <div className="lg:col-span-7 h-[550px] relative order-2 lg:order-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: 20 }}
                            transition={{ duration: 0.6, ease: "anticipate" }}
                            className="w-full h-full rounded-[32px] overflow-hidden border border-white/10 bg-[#0c0c0e] relative shadow-2xl group"
                        >
                            {/* Visual Content */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.img 
                                    src={tabs[activeTab].previewImage} 
                                    alt={tabs[activeTab].title}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                            
                            {/* Floating Settings Badge */}
                            <motion.div 
                                className="absolute bottom-8 left-8 right-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-4 text-white font-bold border-b border-white/10 pb-3">
                                        <div className="p-1.5 rounded-lg bg-white/10">
                                            <Sliders size={16} style={{ color: tabs[activeTab].hex }} />
                                        </div>
                                        <span>تنظیمات فعال: {tabs[activeTab].title}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tabs[activeTab].options.slice(0, 4).map((opt, i) => (
                                            <motion.span 
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4 + (i * 0.1), type: "spring" }}
                                                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/5 text-xs text-gray-200 flex items-center gap-2"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tabs[activeTab].hex }} />
                                                {opt}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation - Right Side (RTL) */}
                <div className="lg:col-span-5 space-y-4 order-1 lg:order-2 text-right">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight"
                    >
                        شخصی‌سازی
                        <br /> 
                        <span className="text-luma-purple">بی‌</span>نهایت
                    </motion.h2>
                    
                    <div 
                        className="space-y-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {tabs.map((tab, idx) => {
                            const isActive = activeTab === idx;
                            
                            return (
                                <motion.div
                                    key={tab.id}
                                    layout
                                    onClick={() => setActiveTab(idx)}
                                    className={`
                                        cursor-pointer p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group
                                        ${isActive ? 'bg-[#151515] border-white/20 shadow-xl' : 'bg-transparent border-white/5 hover:bg-white/5'}
                                    `}
                                >
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div 
                                            className={`p-3 rounded-xl transition-colors duration-300 ${!isActive ? 'bg-white/5 text-gray-400 group-hover:text-white' : ''}`}
                                            style={isActive ? { backgroundColor: `${tab.hex}33`, color: tab.hex } : {}}
                                        >
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
                                                        <ul className="space-y-2">
                                                            {tab.options.map((opt, i) => (
                                                                <motion.li 
                                                                    key={i} 
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                                                    className="flex items-center gap-2 text-[11px] text-gray-300"
                                                                >
                                                                    <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: tab.hex }} />
                                                                    {opt}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
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

            </div>
        </div>

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
