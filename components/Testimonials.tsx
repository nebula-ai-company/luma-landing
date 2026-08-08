import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { Star, Quote, MessageCircleHeart } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

// Bypass type issues with framer-motion props
const Motion = motion as any;

const TESTIMONIALS = [
  {
    id: 1,
    name: "سارا جلالی",
    role: "مدیر هنری",
    content: "لوما جریان کاری من رو متحول کرد. کیفیت تصاویر خروجی با میدجورنی برابری می‌کنه اما سرعتش بسیار بالاتره. برای استوری‌بوردهای تبلیغاتی و پروژه‌های بزرگ عالیه.",
    avatarColor: "bg-luma-pink",
    rating: 5
  },
  {
    id: 2,
    name: "امیرحسین رضایی",
    role: "توسعه‌دهنده فرانت‌اند",
    content: "API لوما برای پروژه فروشگاه ما نجات‌بخش بود. قابلیت حذف پس‌زمینه و تولید مدل با لباس‌های ما، هزینه‌های عکاسی رو ۹۰ درصد کاهش داد و خروجی فوق‌العاده‌ای داشت.",
    avatarColor: "bg-luma-purple",
    rating: 5
  },
  {
    id: 3,
    name: "مونا کاظمی",
    role: "تولیدکننده محتوا",
    content: "به عنوان تولیدکننده محتوا، ابزار ویدیوی لوما بی‌نظیره. پرامپت فارسی رو خیلی خوب درک می‌کنه و خروجی‌ها واقعاً خلاقانه هستن. سرعت رندر هم نسبت به رقبا عالیه.",
    avatarColor: "bg-luma-yellow",
    rating: 4
  },
  {
    id: 4,
    name: "کامران نوری",
    role: "گرافیست فریلنسر",
    content: "قابلیت ادیت عکس با دستور متنی (Inpainting) دقیق‌ترین چیزیه که دیدم. دیگه نیازی نیست ساعت‌ها با فتوشاپ درگیر باشم، همه چیز با یک کلیک و به طبیعی‌ترین شکل انجام میشه.",
    avatarColor: "bg-blue-500",
    rating: 5
  },
  {
    id: 5,
    name: "پریسا احمدی",
    role: "مدیر مارکتینگ",
    content: "دستیار هوشمند لوما برای نوشتن سناریوهای تبلیغاتی و کپشن‌های اینستاگرام عالی عمل می‌کنه. لحن برند ما رو کاملاً یاد گرفته و مثل یک کپی‌رایتر حرفه‌ای متون رو می‌نویسه.",
    avatarColor: "bg-emerald-500",
    rating: 5
  },
  {
    id: 6,
    name: "ارشک مهدوی",
    role: "معمار",
    content: "برای رندرهای معماری از لوما استفاده می‌کنم. درک فضایی مدل ورژن ۴ فوق‌العاده‌ست. نورپردازی‌ها رو خیلی طبیعی در میاره و جزئیات متریال‌ها رو دقیقاً طبق دستور اجرا می‌کنه.",
    avatarColor: "bg-luma-pink",
    rating: 4
  }
];

// Split data for better visual variety between rows
const ROW1_DATA = [TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[4]];
const ROW2_DATA = [TESTIMONIALS[1], TESTIMONIALS[3], TESTIMONIALS[5]];

const MARQUEE_ROW1 = ROW1_DATA;
const MARQUEE_ROW2 = ROW2_DATA;

// Helper to map flat colors to rich gradients
const getAvatarGradient = (colorClass: string) => {
  if (colorClass.includes('pink')) return 'bg-gradient-to-br from-[#FF6482] to-[#FF92A5]';
  if (colorClass.includes('purple')) return 'bg-gradient-to-br from-[#DA8FFF] to-[#E9B8FF]';
  if (colorClass.includes('yellow')) return 'bg-gradient-to-br from-[#FFB340] to-[#FFD085]';
  if (colorClass.includes('blue')) return 'bg-gradient-to-br from-blue-600 to-blue-400';
  if (colorClass.includes('emerald')) return 'bg-gradient-to-br from-emerald-600 to-emerald-400';
  return 'bg-gradient-to-br from-gray-700 to-gray-500';
};

const TestimonialCard: React.FC<{ item: typeof TESTIMONIALS[0]; dir?: string }> = ({ item, dir = 'rtl' }) => (
  <div className="w-[350px] md:w-[400px] flex-shrink-0 mx-4" dir={dir}>
    <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/5 p-6 rounded-2xl relative group hover:border-black/15 hover:dark:border-white/10 transition-colors duration-300 h-full flex flex-col justify-between shadow-sm dark:shadow-none">
      
      {/* Quote Icon Background */}
      <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
         <Quote size={40} className="text-zinc-400 dark:text-white transform scale-x-[-1]" />
      </div>

      <div>
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with Gradient, Noise & Overlay */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
             {/* 1. Rich Gradient Background */}
             <div className={`absolute inset-0 ${getAvatarGradient(item.avatarColor)}`} />
             
             {/* 2. Noise Texture Overlay */}
             <div className="absolute inset-0 opacity-20 bg-noise" />
             
             {/* 3. Character with Overlay Blend */}
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg mix-blend-overlay pt-1 select-none">
                   {item.name.charAt(0)}
                </span>
             </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-zinc-950 dark:text-white font-bold text-base truncate">{item.name}</h4>
            <span className="text-xs text-zinc-500 dark:text-gray-500 font-medium uppercase tracking-wide block truncate">{item.role}</span>
          </div>
          <div className="flex gap-0.5 pt-1">
            {[...Array(5)].map((_, i) => (
               <Star 
                 key={i} 
                 size={14} 
                 className={`${i < item.rating ? 'text-luma-yellow fill-luma-yellow' : 'text-gray-700'}`} 
                />
            ))}
          </div>
        </div>

        <p className="text-zinc-700 dark:text-gray-300 text-sm leading-7 relative z-10 font-light text-justify">
          "{item.content}"
        </p>
      </div>

    </div>
  </div>
);

const MarqueeRow: React.FC<{ 
  children: React.ReactNode; 
  duration?: number; 
  direction?: 'left' | 'right';
}> = ({ children, duration = 30, direction = 'left' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isIntersecting = false;

    const updateVisibility = () => {
      setIsVisible(isIntersecting && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const shouldAnimate = isVisible && !prefersReducedMotion;
  const xValue = direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div 
      ref={containerRef}
      className="flex overflow-hidden relative w-full select-none" 
      dir="ltr"
    >
      <Motion.div 
        className="flex"
        style={{ width: "max-content" }}
        animate={shouldAnimate ? { x: xValue } : { x: direction === 'left' ? "0%" : "-50%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          }
        }}
        whileHover={shouldAnimate ? { 
          // Slow down considerably when user hovers (using scale factor of 4x duration)
          transition: { duration: duration * 4 }
        } : {}}
      >
        <div className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0">
          {children}
        </div>
      </Motion.div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { theme } = useTheme();
  return (
    <section id="testimonials" className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[800px] h-[200px] sm:h-[300px] bg-luma-purple/5 blur-[50px] sm:blur-[120px] rounded-full rotate-12" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 px-4">
          <Motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-md"
          >
             <MessageCircleHeart className="text-luma-yellow" size={14} />
             <span className="text-zinc-700 dark:text-gray-300 font-medium text-xs tracking-wide">نظرات کاربران</span>
          </Motion.div>
          
          <Motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-black mb-6"
          >
            <span className="text-gradient-animated">خانواده بزرگ لوما</span>
          </Motion.h2>
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-700 dark:text-gray-400 max-w-2xl mx-auto text-lg hover:text-opacity-100"
          >
            ببینید متخصصان، هنرمندان و کسب‌وکارهای ایرانی چگونه با ابزارهای لوما مرزهای خلاقیت را جابجا کرده‌اند.
          </Motion.p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full flex flex-col gap-10">
            
            {/* Gradient Masks for Fade Effect */}
            <div className="absolute top-0 bottom-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none transition-colors duration-300" />
            <div className="absolute top-0 bottom-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none transition-colors duration-300" />

            {/* Row 1: Right to Left */}
            <MarqueeRow duration={25} direction="left">
                {MARQUEE_ROW1.map((item, idx) => (
                    <TestimonialCard key={`row1-${idx}`} item={item} dir="rtl" />
                ))}
            </MarqueeRow>

            {/* Row 2: Left to Right */}
            <MarqueeRow duration={30} direction="right">
                {MARQUEE_ROW2.map((item, idx) => (
                    <TestimonialCard key={`row2-${idx}`} item={item} dir="rtl" />
                ))}
            </MarqueeRow>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;