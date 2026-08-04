
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Video, Wand2, Maximize2, Scissors, Zap, MessageSquare, Bot } from 'lucide-react';
import CTA from '../components/CTA';
import { ServicePricingSection } from '../components/Pricing/ServicePricingSection';
import { ChatPricingSection } from '../components/Pricing/ChatPricingSection';
import { AssistantPricingSection } from '../components/Pricing/AssistantPricingSection';
import { PRICING_DATA, TOTAL_MODEL_COUNT, formatPersianNumber } from '../components/Pricing/PricingData';

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const TABS = [
    { id: 'image', label: 'ساخت تصویر', icon: ImageIcon },
    { id: 'video', label: 'ساخت ویدیو', icon: Video },
    { id: 'edit', label: 'ویرایش تصویر', icon: Wand2 },
    { id: 'upscale', label: 'افزایش کیفیت', icon: Maximize2 },
    { id: 'remove', label: 'حذف پسزمینه', icon: Scissors },
    { id: 'chat', label: 'گفتگو', icon: MessageSquare },
    { id: 'assistant', label: 'دستیار هوشمند', icon: Bot },
  ];

  // Scroll Spy to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling) return; // Skip if clicked

      // The offset should account for the header (80px) + sticky nav (~80px) + some buffer
      const headerOffset = 220; 
      const currentScroll = window.scrollY;

      let currentSection = TABS[0].id;

      for (const tab of TABS) {
        const el = document.getElementById(`pricing-${tab.id}`);
        if (el) {
           // Calculate absolute top position of the section
           const top = el.getBoundingClientRect().top + window.scrollY;
           // If we have scrolled past the top of this section (minus offset)
           if (currentScroll + headerOffset >= top) {
             currentSection = tab.id;
           }
        }
      }
      
      if (currentSection !== activeTab) {
        setActiveTab(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isManualScrolling]);

  const scrollToSection = (id: string) => {
    setIsManualScrolling(true);
    setActiveTab(id);
    
    const element = document.getElementById(`pricing-${id}`);
    if (element) {
      // Precise offset calculation:
      // Navbar (80px) + Sticky Nav (~80px) + Padding (24px) = 184px. 
      // Using 200px to ensure it feels breathable and title is clearly visible below header.
      const offset = 200; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll spy after animation
      setTimeout(() => setIsManualScrolling(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-yellow selection:text-black pt-20 relative transition-colors duration-300">
      
      {/* --- Global Ambient Background for Seamless Blending (Animated) --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <motion.div 
            animate={{ 
               x: [0, 50, -50, 0],
               y: [0, -30, 30, 0],
               scale: [1, 1.1, 0.9, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-luma-purple/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
         />
         
         <motion.div 
            animate={{ 
               x: [0, -30, 30, 0],
               y: [0, 50, -50, 0],
               scale: [1, 0.9, 1.1, 1],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[30%] right-[-20%] w-[1000px] h-[1000px] bg-luma-pink/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
         />
         
         <motion.div 
            animate={{ 
               x: [0, 40, -40, 0],
               y: [0, 40, -40, 0],
               scale: [0.9, 1.1, 1, 0.9],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-luma-yellow/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
         />
         
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      {/* --- Hero Header --- */}
      <section className="relative py-32 px-4 overflow-hidden z-10">
         {/* Smooth Bottom Fade Mask to blend with Sticky Nav area */}
         <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/80 dark:via-[#0a0a0a]/80 to-transparent pointer-events-none" />
         
         <div className="max-w-screen-xl mx-auto text-center relative z-20">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 backdrop-blur-md shadow-lg"
            >
               <Zap size={16} className="text-luma-yellow" />
               <span className="text-zinc-800 dark:text-gray-200 font-bold text-xs tracking-wide uppercase">سیستم اعتباری شفاف</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
               تعرفه‌های <span className="text-gradient-animated">هوشمند</span>
            </h1>
            <p className="text-zinc-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
               در لوما، شما برای زمان اشتراک هزینه نمی‌کنید. فقط به اندازه مصرفتان "لوم" (اعتبار) تهیه کنید و برای هر سرویس دقیقا به اندازه پردازش آن هزینه بپردازید.
            </p>

            {/* Elegant Micro-Stats Highlight */}
            <motion.div
               initial={{ opacity: 0, y: 25 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-right relative z-30"
            >
               {/* Stat 1 */}
               <div className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                     <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">مدل در دسترس</span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple to-luma-pink">{formatPersianNumber(TOTAL_MODEL_COUNT)}</span>
                  </div>
                  <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                     دسترسی یکپارچه به پیشرفته‌ترین مدل‌های تولید تصویر، ویدیو، متن و پردازش رسانه در یک بستر واحد.
                  </div>
               </div>

               {/* Stat 2 */}
               <div className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                     <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">دسته تخصصی</span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-pink to-luma-yellow">{formatPersianNumber(TABS.length)}</span>
                  </div>
                  <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                     ابزارهای تخصصی مجزا برای تولید محتوا، افزایش کیفیت تصویر، ادیت، گفتگوی متنی و تحلیل خلاقانه داده‌ها.
                  </div>
               </div>

               {/* Stat 3 */}
               <div className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                     <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">پردازش ابری</span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-yellow to-luma-purple">۱۰۰٪</span>
                  </div>
                  <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                     بدون نیاز به سیستم‌های سخت‌افزاری گران‌قیمت؛ تمامی پردازش‌ها در سرورهای ابری فوق‌سریع لوما رندر می‌شوند.
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- Sticky Navigation --- */}
      <div className="sticky top-20 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-zinc-200 dark:border-white/5 shadow-2xl transition-all duration-300">
         <div className="max-w-screen-xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex justify-center min-w-max gap-3 py-4" role="tablist" aria-label="دسته‌بندی‌های تعرفه">
               {TABS.map((tab) => (
                  <button
                     type="button"
                     role="tab"
                     id={`tab-${tab.id}`}
                     aria-selected={activeTab === tab.id}
                     aria-controls={`pricing-${tab.id}`}
                     key={tab.id}
                     onClick={() => scrollToSection(tab.id)}
                     className={`
                        flex items-center gap-2 px-5 sm:px-6 py-3 min-h-[44px] rounded-2xl text-sm font-bold transition-all border cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]
                        ${activeTab === tab.id 
                           ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white scale-105 shadow-md shadow-black/5 dark:shadow-white/5' 
                           : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-[#121212]/50 dark:text-gray-400 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'
                        }
                     `}
                  >
                     <tab.icon size={18} aria-hidden="true" />
                     {tab.label}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* --- Content Sections --- */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-12 relative z-10">
         
         <div id="pricing-image">
            <ServicePricingSection 
               title="ساخت تصویر"
               description="دسترسی به قدرتمندترین موتورهای تولید تصویر جهان. هزینه بر اساس رزولوشن و کیفیت محاسبه می‌شود."
               models={PRICING_DATA.textToImage}
               color="text-luma-pink"
               icon={ImageIcon}
            />
         </div>

         <div id="pricing-video">
            <ServicePricingSection 
               title="ساخت ویدیو"
               description="خلق ویدیوهای سینمایی از متن یا تصویر. هزینه بر اساس ثانیه و کیفیت رندر محاسبه می‌شود."
               models={PRICING_DATA.videoGen}
               color="text-luma-purple"
               icon={Video}
            />
         </div>

         <div id="pricing-edit">
            <ServicePricingSection 
               title="ویرایش تصویر"
               description="ابزارهای هوشمند برای تغییر، حذف و بازسازی تصاویر. شامل Inpainting و تغییر استایل."
               models={PRICING_DATA.imageEditing}
               color="text-luma-yellow"
               icon={Wand2}
            />
         </div>

         <div id="pricing-upscale">
            <ServicePricingSection 
               title="افزایش کیفیت"
               description="افزایش وضوح و رزولوشن تصاویر با مدل‌های تخصصی و انتخاب ضریب بزرگ‌نمایی یا اندازه خروجی."
               sourceNote="تعرفه‌های این بخش بر اساس قیمت‌های فعلی سرویس نمایش داده می‌شوند."
               models={PRICING_DATA.upscaling}
               color="text-luma-yellow"
               icon={Maximize2}
            />
         </div>

         <div id="pricing-remove">
            <ServicePricingSection 
               title="حذف پسزمینه"
               description="حذف سریع و دقیق پسزمینه تصاویر با هزینه ثابت برای هر پردازش."
               models={PRICING_DATA.bgRemoval}
               color="text-luma-pink"
               icon={Scissors}
               unitLabel="هزینه هر تصویر"
            />
         </div>

         <div id="pricing-chat">
            <ChatPricingSection 
               models={PRICING_DATA.chat}
            />
         </div>

      </div>

      {/* Independent Full Width Section for Assistant to avoid container clipping */}
      <div id="pricing-assistant" className="relative z-10 w-full">
         <AssistantPricingSection />
      </div>

      <CTA />
    </div>
  );
};

export default PricingPage;
