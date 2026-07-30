import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Headphones, Video, BookOpen, Layers, 
  Bot, Megaphone
} from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';

const USE_CASES = [
  {
    title: 'تولید پادکست و برنامه‌های صوتی',
    description: 'تولید سریع اپیزودهای پادکست با گویندگان متنوع زنانه و مردانه و لحن‌های روایی بی‌پیرایه.',
    icon: Headphones,
    accent: 'purple' as const,
  },
  {
    title: 'نریشن ویدئو و محتوای شبکه اجتماعی',
    description: 'صداگذاری روی ویدئوهای یوتیوب، آپارات، اینستاگرام و تیزرهای معرفی محصول بدون نیاز به میکروفون.',
    icon: Video,
    accent: 'yellow' as const,
  },
  {
    title: 'کتاب‌های صوتی و مقالات عمومی',
    description: 'تبدیل کتب الکترونیک، مقالات خبری و متون طولانی به نسخه‌های شنیداری خوش‌صدا با مدل Flash.',
    icon: BookOpen,
    accent: 'pink' as const,
  },
  {
    title: 'دوره‌های آموزشی و سیستم‌های LMS',
    description: 'تولید محتوای صوتی استاندارد برای اسلایدهای آموزشی، پروژه‌های دانشگاهی و آکادمی‌های آنلاین.',
    icon: Layers,
    accent: 'yellow' as const,
  },
  {
    title: 'سیستم‌های پاسخگویی IVR و دستیار صوتی',
    description: 'تولید پیام‌های صوتی تلفن گویا، تلفن‌های سازمانی و پاسخ‌های روبات‌های هوشمند با صدای طبیعی.',
    icon: Bot,
    accent: 'purple' as const,
  },
  {
    title: 'تیزرهای تبلیغاتی و کمپین‌های مارکتینگ',
    description: 'خلق صداهای پرانرژی و متقاعدکننده برای آگهی‌های صوتی و تصویری باشکوه.',
    icon: Megaphone,
    accent: 'pink' as const,
  },
];

export const TTSUseCases: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="useCases" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <span>کاربردهای متنوع گفتار هوشمند</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            کاربردهای تبدیل متن به گفتار
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            از ساخت پادکست و نریشن ویدئو تا سیستم‌های تلفن گویا و محتوای آموزشی.
          </p>
        </div>

        {/* Use Cases Grid with TTSHoverCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, idx) => {
            const IconComp = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="h-full"
              >
                <TTSHoverCard accentColor={uc.accent} className="h-full">
                  <div className="p-7 h-full flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <IconComp size={22} className={`text-luma-${uc.accent}`} />
                      </div>

                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                        {uc.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                        {uc.description}
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
