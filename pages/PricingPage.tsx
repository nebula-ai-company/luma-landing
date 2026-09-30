import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import CTA from '../components/CTA';
import { CatalogMediaPricingSection } from '../components/Pricing/CatalogMediaPricingSection';
import { CatalogVideoPricingSection } from '../components/Pricing/CatalogVideoPricingSection';
import { CatalogChatPricingSection } from '../components/Pricing/CatalogChatPricingSection';
import { PRICING_CATEGORIES } from '../components/Pricing/pricingConfig';
import {
  useCatalog,
  findServiceById,
  countUniqueModels,
  formatPersianDigits,
} from '../lib/catalogApi';

const PricingPage: React.FC = () => {
  const { services, loading, error, refetch } = useCatalog();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>(PRICING_CATEGORIES[0].id);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Derive unique models count to prevent double-counting across overlapping services
  const uniqueModelCount = useMemo(() => {
    return countUniqueModels(services);
  }, [services]);

  // Keep active tab centered in horizontal nav when scrolled or clicked
  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector<HTMLElement>(`#tab-${activeTab}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  // Scroll Spy to update active tab based on scroll position across all 10 categories
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling) return; // Skip if user actively clicked a tab

      // Account for global top navbar (~80px) + sticky nav (~80px) + visual buffer
      const headerOffset = 220;
      const currentScroll = window.scrollY;

      let currentSection = PRICING_CATEGORIES[0].id;

      for (const cat of PRICING_CATEGORIES) {
        const el = document.getElementById(`pricing-${cat.id}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (currentScroll + headerOffset >= top) {
            currentSection = cat.id;
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
      const offset = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Re-enable scroll spy after animation completes
      setTimeout(() => setIsManualScrolling(false), 900);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-yellow selection:text-black pt-20 relative transition-colors duration-300">
      {/* Global Ambient Background for Seamless Blending */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={
            shouldReduceMotion
              ? false
              : {
                  x: [0, 50, -50, 0],
                  y: [0, -30, 30, 0],
                  scale: [1, 1.1, 0.9, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-luma-purple/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? false
              : {
                  x: [0, -30, 30, 0],
                  y: [0, 50, -50, 0],
                  scale: [1, 0.9, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[30%] right-[-20%] w-[1000px] h-[1000px] bg-luma-pink/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? false
              : {
                  x: [0, 40, -40, 0],
                  y: [0, 40, -40, 0],
                  scale: [0.9, 1.1, 1, 0.9],
                  opacity: [0.1, 0.2, 0.1],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-luma-yellow/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      {/* Hero Header */}
      <header className="relative py-32 px-4 overflow-hidden z-10">
        <div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/80 dark:via-[#0a0a0a]/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-screen-xl mx-auto text-center relative z-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 backdrop-blur-md shadow-lg"
          >
            <Zap size={16} className="text-luma-yellow" aria-hidden="true" />
            <span className="text-zinc-800 dark:text-gray-200 font-bold text-xs tracking-wide uppercase">
              سیستم اعتباری شفاف
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
            تعرفه‌های <span className="text-gradient-animated">هوشمند</span>
          </h1>
          <p className="text-zinc-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
            در لوما، شما برای زمان اشتراک هزینه نمی‌کنید. فقط به اندازه مصرفتان «لوم» (اعتبار) تهیه کنید و برای هر سرویس دقیقاً به اندازه پردازش آن هزینه بپردازید.
          </p>

          {/* Micro-Stats Highlight */}
          <motion.ul
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-right relative z-30 list-none p-0 m-0"
          >
            {/* Stat 1: Unique Models Count */}
            <li className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1 list-none">
              <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  مدل در دسترس
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple to-luma-pink">
                  {loading ? '—' : uniqueModelCount > 0 ? formatPersianDigits(uniqueModelCount) : '—'}
                </span>
              </div>
              <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                دسترسی به بزرگ‌ترین آرشیو هوش مصنوعی جهان؛ شامل آخرین مدل‌های گوگل، ادوبی، اوپن‌ای‌آی و فلکس.
              </div>
            </li>

            {/* Stat 2: Categories Count */}
            <li className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1 list-none">
              <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  دسته تخصصی
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-pink to-luma-yellow">
                  {formatPersianDigits(PRICING_CATEGORIES.length)}
                </span>
              </div>
              <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                ابزارهای تخصصی مجزا برای تولید محتوا، افزایش کیفیت تصویر، ادیت، گفتگوی متنی و پردازش صدا.
              </div>
            </li>

            {/* Stat 3: Cloud Infrastructure */}
            <li className="bg-[#FAF9F6]/80 dark:bg-[#121212]/40 border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg shadow-black/[0.01] dark:shadow-black/[0.1] transition-all hover:border-zinc-300 dark:hover:border-white/10 duration-300 group hover:-translate-y-1 list-none">
              <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-baseline gap-1.5 justify-end">
                <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  پردازش ابری
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-yellow to-luma-purple">
                  ۱۰۰٪
                </span>
              </div>
              <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                بدون نیاز به سیستم‌های سخت‌افزاری گران‌قیمت؛ تمامی پردازش‌ها در سرورهای ابری فوق‌سریع لوما رندر می‌شوند.
              </div>
            </li>
          </motion.ul>
        </div>
      </header>

      {/* Sticky Navigation (10 Categories with Horizontal Scroll) */}
      <nav
        aria-label="دسته‌بندی‌های تعرفه"
        className="sticky top-20 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-zinc-200 dark:border-white/5 shadow-2xl transition-all duration-300"
      >
        <div
          ref={navContainerRef}
          className="max-w-screen-2xl mx-auto px-4 overflow-x-auto custom-scrollbar"
        >
          <ul
            role="list"
            className="flex items-center lg:justify-center justify-start min-w-max gap-2 sm:gap-3 py-4 list-none m-0 p-0"
          >
            {PRICING_CATEGORIES.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <li key={tab.id} className="list-none m-0 p-0">
                  <button
                    type="button"
                    id={`tab-${tab.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => scrollToSection(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[42px] rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer whitespace-nowrap select-none
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]
                      ${
                        isActive
                          ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white scale-[1.02] shadow-md shadow-black/5 dark:shadow-white/5'
                          : 'bg-zinc-100/80 text-zinc-600 border-zinc-200/80 dark:bg-[#121212]/50 dark:text-gray-400 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Content Sections: Rendered strictly in authoritative order */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {PRICING_CATEGORIES.map((category) => {
          if (category.type === 'video') {
            return (
              <div id={`pricing-${category.id}`} key={category.id}>
                <CatalogVideoPricingSection
                  services={services}
                  color={category.color}
                  icon={category.icon}
                  loading={loading}
                  error={error}
                  onRetry={refetch}
                />
              </div>
            );
          }

          if (category.type === 'chat') {
            const chatService = findServiceById(services, 'chat');
            return (
              <div id={`pricing-${category.id}`} key={category.id}>
                <CatalogChatPricingSection
                  service={chatService}
                  loading={loading}
                  error={error}
                  onRetry={refetch}
                />
              </div>
            );
          }

          // Generic media categories (generate_image, edit_image, virtual_try_on, upscale_video, upscale_image, remove_background, text_to_speech, speech_to_text)
          const service = findServiceById(services, category.serviceId);
          return (
            <div id={`pricing-${category.id}`} key={category.id}>
              <CatalogMediaPricingSection
                service={service}
                title={category.title}
                description={category.description}
                color={category.color}
                icon={category.icon}
                loading={loading}
                error={error}
                onRetry={refetch}
              />
            </div>
          );
        })}
      </div>

      <CTA />
    </main>
  );
};

export default PricingPage;
