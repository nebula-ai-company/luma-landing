import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Globe, Sparkles, Zap, Sliders, 
  FileCheck, ShieldCheck, Mic
} from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';

const CAPABILITIES = [
  {
    id: 'persian-multilingual',
    title: 'پشتیبانی تخصصی از زبان فارسی و انگلیسی',
    description: 'تشخیص درست اعراب‌گذاری، تنوع واژگان فارسی و خوانش روان اصطلاحات انگلیسی مابین متن فارسی بدون تلفظ مصنوعی.',
    icon: Globe,
    accent: 'yellow' as const,
    span: 'col-span-1 lg:col-span-2',
  },
  {
    id: 'emotion-control',
    title: 'کنترل دقیق سبک بیان و احساسات',
    description: 'امکان انتخاب لحن رسمی، روایت داستانی، هیجانی یا آموزنده متناسب با مخاطب و نوع محتوا.',
    icon: Sliders,
    accent: 'purple' as const,
    span: 'col-span-1 lg:col-span-1',
  },
  {
    id: 'high-speed',
    title: 'پردازش فوق‌سریع و خروجی آنی',
    description: 'تولید فایل‌های صوتی چند دقیقه‌ای در کمتر از چند ثانیه با معماری پردازش ابری لوما.',
    icon: Zap,
    accent: 'pink' as const,
    span: 'col-span-1 lg:col-span-1',
  },
  {
    id: 'multiple-formats',
    title: 'خروجی متکثر استودیویی (MP3, WAV, AAC)',
    description: 'دانلود فایل‌های صوتی فشرده شده برای وب یا فرمت‌های بی‌کیفیت-افت برای تدوین حرفه‌ای.',
    icon: FileCheck,
    accent: 'yellow' as const,
    span: 'col-span-1 lg:col-span-2',
  },
  {
    id: 'voice-variety',
    title: 'تنوع بی‌نظیر صداهای زنانه و مردانه',
    description: 'دسترسی به ده‌ها صدای گوینده با گستره‌های صوتی متفاوت برای انواع کاربری‌ها.',
    icon: Mic,
    accent: 'purple' as const,
    span: 'col-span-1 lg:col-span-1',
  },
  {
    id: 'commercial-rights',
    title: 'حق مالکیت تجاری کامل خروجی‌ها',
    description: 'استفاده آزاد در تبلیغات، پادکست‌های تجاری، تیزرها و پلتفرم‌های یوتیوب و آپارات.',
    icon: ShieldCheck,
    accent: 'pink' as const,
    span: 'col-span-1 lg:col-span-2',
  },
];

export const TTSCapabilities: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="capabilities" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <Sparkles size={14} className="text-luma-yellow" />
            <span>قابلیت‌ها و امکانات کلیدی</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            چرا سرویس تبدیل متن به گفتار لوما؟
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            امکانات پیشرفته استودیویی برای ساخت طبیعی‌ترین فایل‌های صوتی فارسی و چندزبانه.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={cap.span}
              >
                <TTSHoverCard accentColor={cap.accent} className="h-full">
                  <div className="p-8 h-full flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <IconComp size={22} className={`text-luma-${cap.accent}`} />
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
                        {cap.title}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                        {cap.description}
                      </p>
                    </div>

                  </div>
                </TTSHoverCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
