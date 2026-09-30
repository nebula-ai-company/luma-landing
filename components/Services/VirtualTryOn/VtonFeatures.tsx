import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Accessibility, Gem, Sliders } from 'lucide-react';

const INITIAL_TABS = [
  {
    id: 'hijab',
    title: 'نوع پوشش و حجاب',
    icon: Gem,
    desc: 'پوشش منطبق بر بازار هدف. امکان انتخاب نوع پوشش سر متناسب با نیاز برند و مخاطبان.',
    options: ['بدون حجاب', 'شال / مینی اسکارف', 'مقنعه (اداری)', 'توربان', 'حجاب کامل'],
    color: 'text-luma-pink',
    hex: '#FF6482',
    previewImage: '',
  },
  {
    id: 'body',
    title: 'مشخصات فیزیکی',
    icon: Accessibility,
    desc: 'تنظیم ابعاد و مشخصات مانکن مجازی متناسب با مخاطبان واقعی از نظر سایزبندی و سن.',
    options: ['سایز: لاغر تا پلاس‌سایز', 'سن: کودک تا میانسال', 'ژست: ایستاده، نشسته، حرکتی', 'حالت چهره: خندان، جدی'],
    color: 'text-luma-yellow',
    hex: '#FFB340',
    previewImage: '',
  },
  {
    id: 'light',
    title: 'نورپردازی و محیط',
    icon: Sun,
    desc: 'نمایش لباس در محیط استودیویی استاندارد یا فضای باز با نورپردازی طبیعی و تمیز.',
    options: ['نور نرم استودیویی', 'ساعت طلایی (Golden Hour)', 'فضای باز / خیابان', 'مینیمال تک‌رنگ'],
    color: 'text-luma-purple',
    hex: '#DA8FFF',
    previewImage: '',
  },
];

export const VtonFeatures: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fetch Real Preview Data from PocketBase (kept independent of catalog API)
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('https://pb.lumai.ir/api/collections/virtual_tryon/records?page=1&perPage=20&sort=-created');
        if (response.ok) {
          const data = await response.json();
          const items = data.items || [];
          const validAssets = items.filter((a: any) => a.result);
          
          if (validAssets.length > 0 && isMounted) {
            setTabs((prevTabs) =>
              prevTabs.map((tab, index) => {
                const offset = 5;
                const assetIndex = (index + offset) % validAssets.length;
                const asset = validAssets[assetIndex];
                return {
                  ...tab,
                  previewImage: asset ? `https://pb.lumai.ir/api/files/virtual_tryon/${asset.id}/${asset.result}` : '',
                };
              })
            );
          }
        }
      } catch (error) {
        console.error('Failed to fetch VTON features data', error);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Auto-rotation (Disabled when user pauses or when reduced motion is preferred)
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, tabs.length]);

  // Keyboard navigation for tablist (RTL-aware)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      // In RTL, ArrowLeft or ArrowDown moves to next tab
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      // In RTL, ArrowRight or ArrowUp moves to previous tab
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    if (newIndex !== index) {
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Visual - Left Side (RTL) */}
          <figure className="lg:col-span-7 h-[550px] relative order-2 lg:order-1 m-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeTab}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, x: 20 }}
                transition={{ duration: 0.6, ease: 'anticipate' }}
                role="tabpanel"
                id={`vton-tabpanel-${tabs[activeTab].id}`}
                aria-labelledby={`vton-tab-${tabs[activeTab].id}`}
                tabIndex={0}
                className="w-full h-full rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0c0c0e] relative shadow-xl dark:shadow-2xl group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luma-yellow/50"
              >
                {/* Visual Content */}
                <div className="absolute inset-0 overflow-hidden">
                  {tabs[activeTab].previewImage ? (
                    <img 
                      src={tabs[activeTab].previewImage} 
                      alt={tabs[activeTab].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                {/* Floating Settings Badge */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 rounded-2xl p-5 shadow-xl dark:shadow-2xl transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4 text-zinc-800 dark:text-white font-bold border-b border-zinc-155 dark:border-white/10 pb-3 transition-colors">
                      <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/10">
                        <Sliders size={16} style={{ color: tabs[activeTab].hex }} aria-hidden="true" />
                      </div>
                      <span>تنظیمات فعال: {tabs[activeTab].title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tabs[activeTab].options.slice(0, 4).map((opt, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-zinc-100/80 dark:bg-white/10 border border-zinc-200 dark:border-white/5 text-xs text-zinc-700 dark:text-gray-200 flex items-center gap-2 transition-colors duration-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tabs[activeTab].hex }} aria-hidden="true" />
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            </AnimatePresence>
            <figcaption className="sr-only">نمایش بصری شخصی‌سازی مدل در پرو مجازی: {tabs[activeTab].title}</figcaption>
          </figure>

          {/* Navigation - Right Side (RTL) */}
          <div className="lg:col-span-5 space-y-4 order-1 lg:order-2 text-right">
            <header className="mb-10">
              <motion.h2 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight transition-colors duration-300"
              >
                شخصی‌سازی
                <br /> 
                <span className="text-luma-purple">بی‌</span>نهایت
              </motion.h2>
            </header>
            
            {/* Accessible Tablist */}
            <div 
              role="tablist"
              aria-label="امکانات شخصی‌سازی پرو مجازی"
              className="space-y-4"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    role="tab"
                    id={`vton-tab-${tab.id}`}
                    aria-controls={`vton-tabpanel-${tab.id}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className={`
                      w-full text-right cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group block
                      ${isActive ? 'bg-white dark:bg-[#151515] border-zinc-300 dark:border-white/20 shadow-lg dark:shadow-xl' : 'bg-transparent border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5'}
                      focus:outline-none focus:ring-2 focus:ring-luma-yellow/50
                    `}
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      <div 
                        className={`p-3 rounded-xl transition-all duration-300 shrink-0 ${!isActive ? 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 group-hover:bg-zinc-200 dark:group-hover:bg-white/10 group-hover:text-zinc-900 dark:group-hover:text-white' : ''}`}
                        style={isActive ? { backgroundColor: `${tab.hex}33`, color: tab.hex } : {}}
                      >
                        <tab.icon size={24} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className={`text-lg font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 group-hover:text-zinc-800 dark:group-hover:text-gray-200'}`}>
                          {tab.title}
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-zinc-650 dark:text-gray-400 leading-relaxed mb-4 font-light">
                                {tab.desc}
                              </p>
                              <ul className="space-y-2 list-none p-0 m-0">
                                {tab.options.map((opt, i) => (
                                  <li 
                                    key={i} 
                                    className="flex items-center gap-2 text-[11px] text-zinc-650 dark:text-gray-300"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tab.hex }} aria-hidden="true" />
                                    <span>{opt}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
    </section>
  );
};
