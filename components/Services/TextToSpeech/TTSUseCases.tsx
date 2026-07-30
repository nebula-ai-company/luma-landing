import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video, Megaphone, Radio, GraduationCap, BookOpen, Share2, Volume2 } from 'lucide-react';

const USE_CASES = [
  {
    icon: Video,
    title: 'نریشن ویدئو',
    description: 'نریشن صوتی همگام و باکیفیت برای ویدیوهای یوتیوب، آپارات، تولیدات مستند و تیزرهای معرفی.',
    accent: '#FFC700',
    detail: 'صدای شفاف و هماهنگ با تایم‌کد',
  },
  {
    icon: Megaphone,
    title: 'تبلیغات و تیزر',
    description: 'لحن‌های پرانرژی و متقاعدکننده برای کمپین‌های تبلیغاتی، رادیویی و ویدیوهای برندینگ.',
    accent: '#EC4899',
    detail: 'لحن‌های پویا و تجاری',
  },
  {
    icon: Radio,
    title: 'پادکست',
    description: 'تولید بخش‌های روایی، مقدمه پادکست و بخش‌های خبری با صدای استودیویی بدون نیاز به میکروفون.',
    accent: '#A855F7',
    detail: 'کیفیت استودیویی ۲۴-بیت',
  },
  {
    icon: GraduationCap,
    title: 'آموزش آنلاین',
    description: 'خوانش شفاف و روان دوره‌های آموزشی، فایل‌های راهنما و محتوای دانشگاهی با بیان شمرده.',
    accent: '#10B981',
    detail: 'تلفظ شمرده و واضع',
  },
  {
    icon: BookOpen,
    title: 'کتاب و داستان صوتی',
    description: 'روایت جذاب داستان‌ها و کتاب‌ها با لحن‌های روایی و احساسی قابل تنظیم.',
    accent: '#3B82F6',
    detail: 'روایت طولانی و پیوسته',
  },
  {
    icon: Share2,
    title: 'محتوای شبکه‌های اجتماعی',
    description: 'تولید صدای روی ویدیو برای اینستاگرام، تیک‌تاک، ریلز و کانال‌های تلگرام در کوتاه‌ترین زمان.',
    accent: '#F59E0B',
    detail: 'تولید سریع برای انتشار',
  },
];

export const TTSUseCases: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] dark:bg-[#0a0a0d] text-zinc-900 dark:text-white border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <Volume2 size={14} />
            <span>کاربردها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            پاسخ به تمام نیازهای صوتی شما
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg font-light">
            از تولید محتوای شبکه‌های اجتماعی تا نریشن تیزرهای حرفه‌ای و دوره‌های آموزشی.
          </p>
        </div>

        {/* Use Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, idx) => (
            <motion.div
              key={uc.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-white dark:bg-[#12121c] border border-black/5 dark:border-white/10 p-7 flex flex-col justify-between hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-xs hover:shadow-lg"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${uc.accent}15`, color: uc.accent }}
                >
                  <uc.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">
                  {uc.title}
                </h3>

                <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light mb-6">
                  {uc.description}
                </p>
              </div>

              {/* Small audio detail footer */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: uc.accent }} />
                <span>{uc.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
