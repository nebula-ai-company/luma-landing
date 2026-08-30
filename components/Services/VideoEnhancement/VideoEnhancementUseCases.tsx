import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Video, Clapperboard, History, ShoppingBag, Sparkles, Check, ArrowLeft, TrendingUp, Award, Layers } from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

interface UseCase {
  id: string;
  title: string;
  category: string;
  icon: any;
  accent: 'purple' | 'pink' | 'yellow';
  description: string;
  points: string[];
  recommendedModel: string;
  statBadge: string;
  statLabel: string;
  tagline: string;
}

const USE_CASES: UseCase[] = [
  {
    id: 'creators',
    title: 'تولیدکنندگان محتوا و یوتیوبرها',
    category: 'شبکه‌های اجتماعی و یوتیوب',
    icon: Video,
    accent: 'purple',
    tagline: 'تبدیل محتوای خانگی به استاندارد کانال‌های میلیونی',
    description: 'تبدیل ویدئوهای ضبط‌شده با دوربین‌های معمولی، گوشی یا وب‌کم به خروجی‌های کریستالی ۴K با رنگ‌های زنده و صدای شفاف.',
    points: [
      'ارتقای فوتیج به ۴K برای جذب واچ‌تایم و الگوریتم‌های پیشنهاد ویدئو در یوتیوب',
      'حذف نویز محیط‌های کم‌نور استودیوهای خانگی بدون نیاز به نورپردازی گران‌قیمت',
      'افزایش روانی حرکات به ۶۰ فریم در گیم‌پلی‌ها، ولاگ‌ها و آنباکسینگ‌ها',
    ],
    recommendedModel: 'FlashVSR / Topaz Interpolate',
    statBadge: '+40% واچ‌تایم',
    statLabel: 'افزایش ماندگاری مخاطب با کیفیت ۴K',
  },
  {
    id: 'cinema',
    title: 'تدوین‌گران، فیلم‌سازان و آژانس‌های تبلیغاتی',
    category: 'سینما و تبلیغات تجاری',
    icon: Clapperboard,
    accent: 'pink',
    tagline: 'آماده‌سازی برای برودکست تلویزیونی و پرده‌های بزرگ',
    description: 'آماده‌سازی استوک فوتیج‌های قدیمی، رندرهای سه‌بعدی و تیزرهای تبلیغاتی برای استانداردهای پخش تلویزیونی و بیلبوردهای شهری.',
    points: [
      'بزرگ‌نمایی دقیق بدون هیچ‌گونه دستکاری فانتزی در فرم و ساختار محتوا',
      'رفع تاری ناشی از تکان‌های دست، هلی‌شات و اکشن کمراهای متحرک',
      'خروجی مناسب با استانداردهای پخش بین‌المللی با حفظ تراک صوتی مستر',
    ],
    recommendedModel: 'Topaz Precision / FLUX Video',
    statBadge: 'وفاداری ۱۰۰٪',
    statLabel: 'مطابق استانداردهای برودکست جهانی',
  },
  {
    id: 'heritage',
    title: 'مرمت و احیای فیلم‌های قدیمی و خاطره‌انگیز',
    category: 'آرشیو تاریخی و خانوادگی',
    icon: History,
    accent: 'yellow',
    tagline: 'زنده کردن خاطرات دهه‌های گذشته با وضوح شگفت‌انگیز',
    description: 'احیای خاطرات ارزشمند، نوارهای VHS و ویدئوهای اسکن‌شده با رزولوشن پایین و تبدیل آن‌ها به ویدئوهای شفاف مدرن.',
    points: [
      'بازسازی زایشی بافت چهره، نگاه و جزئیات پیکسلی مفقود شده',
      'پاکسازی برفک، خطوط عمودی و نویز فیلم‌های آنالوگ قدیمی',
      'حفظ پایداری فرم صورت و هویت اشخاص در طول سکانس‌ها',
    ],
    recommendedModel: 'Topaz Generative / Topaz Denoise',
    statBadge: 'احیای زایشی',
    statLabel: 'بازگرداندن پیکسل‌های مفقود ازدست‌رفته',
  },
  {
    id: 'ecommerce',
    title: 'کسب‌وکارها و فروشگاه‌های اینترنتی',
    category: 'دیجیتال مارکتینگ و محصول',
    icon: ShoppingBag,
    accent: 'purple',
    tagline: 'افزایش فروش آنلاین با نمایش میکروسکوپی جزئیات محصول',
    description: 'تبدیل ویدئوهای ساده محصول به تیزرهای باکیفیت و لوکس برای لندینگ پیج‌ها، کمپین‌های ویدیویی و استوری‌های فروش.',
    points: [
      'شارپ کردن جزئیات بافت پارچه، جواهرات، محصولات فیزیکی و لوگوی برند',
      'روان‌سازی چرخش ۳۶۰ درجه محصول با نرخ فریم ۶۰fps سینمایی',
      'افزایش نرخ تبدیل با نمایش محصولات در نهایت شفافیت بصری',
    ],
    recommendedModel: 'SeedVR2 / FLUX Video',
    statBadge: '+2.8x نرخ تبدیل',
    statLabel: 'اعتماد بیشتر مشتری با نمایش بافت دقیق کالا',
  },
];

export const VideoEnhancementUseCases: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('creators');
  const shouldReduceMotion = useReducedMotion();

  const activeUseCase = USE_CASES.find((u) => u.id === activeTabId) || USE_CASES[0];

  return (
    <section className="relative py-20 lg:py-32 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="useCases" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-pink/30 bg-luma-pink/10 text-zinc-900 dark:text-luma-pink text-xs font-bold shadow-sm">
            <Sparkles size={14} className="text-luma-pink" />
            <span>کاربردهای عملی در دنیای واقعی</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            طراحی‌شده برای <span className="text-gradient-animated inline-block pb-1">حرفه‌ای‌ها</span> و سازندگان محتوا
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            از ساخت تیزرهای لوکس بازاریابی تا مرمت ویدئوهای تاریخی؛ لوما کیفیت خروجی هر صنعتی را متحول می‌کند.
          </p>
        </div>

        {/* Category Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {USE_CASES.map((item) => {
            const isSelected = item.id === activeTabId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-lg scale-[1.02]'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <item.icon size={15} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Use Case Interactive Feature Spotlight */}
        <div className="mb-14 rounded-3xl p-6 sm:p-8 lg:p-10 bg-white dark:bg-[#0E0E15] border border-black/5 dark:border-white/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-luma-purple/10 border border-luma-purple/30 text-luma-purple text-xs font-bold">
                  {activeUseCase.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={13} />
                  <span>{activeUseCase.statBadge}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                  {activeUseCase.title}
                </h3>
                <p className="text-sm font-medium text-luma-purple">
                  {activeUseCase.tagline}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light pt-2">
                  {activeUseCase.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/10">
                {activeUseCase.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <Check size={16} className="text-luma-purple shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Model CTA Footer */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 dark:border-white/10">
                <div className="text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400 block">مدل‌های هوش مصنوعی پیشنهادی:</span>
                  <strong className="text-zinc-900 dark:text-white font-bold">{activeUseCase.recommendedModel}</strong>
                </div>

                <a
                  href="https://dash.lumai.ir/service/upscale-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>اجرا در ابزار ارتقای ویدئو</span>
                  <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right 5 cols: Visual Pipeline & Metric Simulator */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 sm:p-7 bg-zinc-950 text-white border border-white/10 shadow-2xl space-y-5">
                
                {/* Visual Pipeline Flow */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-2">
                    <span className="text-zinc-400">PIPELINE FLOW GRAPH</span>
                    <span className="text-emerald-400 font-bold">● ACTIVE</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    {/* Step 1: Input */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-zinc-500" />
                        <span className="text-zinc-400">ورودی خام (Raw Footage)</span>
                      </div>
                      <span className="text-zinc-400 font-bold">720p / 1080p</span>
                    </div>

                    {/* Step 2: Processing AI Core */}
                    <div className="p-2.5 rounded-xl bg-luma-purple/15 border border-luma-purple/40 flex items-center justify-between shadow-[0_0_15px_rgba(218,143,255,0.15)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-luma-purple animate-ping" />
                        <span className="text-white font-bold">{activeUseCase.recommendedModel}</span>
                      </div>
                      <span className="text-luma-purple font-bold">ارتقای ۴ برابر + حذف نویز</span>
                    </div>

                    {/* Step 3: Master Output */}
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-emerald-300 font-bold">خروجی مستر ۴K</span>
                      </div>
                      <span className="text-emerald-400 font-bold font-mono">3840×2160 @ 60fps</span>
                    </div>
                  </div>
                </div>

                {/* Key Stat Box */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                    {activeUseCase.statBadge}
                  </span>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    {activeUseCase.statLabel}
                  </p>
                </div>

                {/* Technical Specs Grid */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 space-y-2 text-right">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">تراک صدا:</span>
                    <span className="text-luma-yellow font-bold">۱۰۰٪ بدون افت کیفیت</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">حداکثر رزولوشن:</span>
                    <span className="text-luma-purple font-bold">کیفیت اولترا اچ‌دی (4K)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">فریم‌ریت خروجی:</span>
                    <span className="text-emerald-400 font-bold">روان و یکدست (۶۰ فریم)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {USE_CASES.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full flex flex-col cursor-pointer"
              onClick={() => setActiveTabId(useCase.id)}
            >
              <VideoEnhancementHoverCard
                accentColor={useCase.accent}
                className="h-full flex flex-col"
                innerClassName="p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                      <useCase.icon size={22} className={useCase.accent === 'purple' ? 'text-luma-purple' : useCase.accent === 'pink' ? 'text-luma-pink' : 'text-luma-yellow'} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {useCase.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      {useCase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {useCase.description}
                    </p>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                    {useCase.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Check size={14} className="text-luma-purple shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Model Pill */}
                <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">مدل پیشنهادی:</span>
                  <span className="font-bold text-luma-purple">{useCase.recommendedModel}</span>
                </div>
              </VideoEnhancementHoverCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
