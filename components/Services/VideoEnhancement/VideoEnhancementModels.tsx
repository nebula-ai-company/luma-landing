import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, Sparkles, Check, ArrowLeft, Zap, Info, Shield, Layers, Gauge, Cpu, Eye, Activity } from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

interface VideoModel {
  id: string;
  name: string;
  provider: string;
  category: 'upscale' | 'fix' | 'pro';
  accent: 'purple' | 'pink' | 'yellow';
  startingLUM: string;
  tagline: string;
  description: string;
  bestFor: string;
  features: string[];
  isPopular?: boolean;
  speedRating: number; // 1-5
  qualityRating: number; // 1-5
  outputCapability: string;
}

const MODELS_DATA: VideoModel[] = [
  {
    id: 'flash-vsr',
    name: 'FlashVSR',
    provider: 'Tencent AI Lab',
    category: 'upscale',
    accent: 'purple',
    startingLUM: 'شروع از ۱ LUM',
    tagline: 'ارتقای فوق سریع و اقتصادی تا ۴ برابر',
    description: 'بهترین و اقتصادی‌ترین گزینه برای ارتقای عمومی ویدئوها تا ۴ برابر با حفظ کامل تراک صدای اصلی و سرعت پردازش استثنایی.',
    bestFor: 'ویدئوهای روزمره، استوری‌ها و محتوای شبکه‌های اجتماعی با کمترین هزینه',
    isPopular: true,
    speedRating: 5,
    qualityRating: 4,
    outputCapability: 'Up to 4K • 100% Audio Pass',
    features: [
      'بزرگ‌نمایی باکیفیت تا ۴ برابر (4x Upscale)',
      'حفظ ۱۰۰٪ صدای اصلی ویدئو بدون فشرده‌سازی مضاعف',
      'کمترین هزینه در بین تمام مدل‌های ارتقای ویدئو',
      'پردازش با سرعت فوق‌العاده بالا',
    ],
  },
  {
    id: 'seed-vr2',
    name: 'SeedVR2 Video Upscaler',
    provider: 'Seed AI Core',
    category: 'upscale',
    accent: 'pink',
    startingLUM: 'شروع از ۲ LUM',
    tagline: 'بازسازی عمیق جزئیات و بافت‌های ظریف',
    description: 'مدل تخصصی بازسازی که علاوه بر ارتقای ابعاد، خطوط چهره، لباس و بافت‌های محو را با هوش مصنوعی بازتولید می‌کند.',
    bestFor: 'ویدئوهای چهره‌محور، بلاگری، مصاحبه‌ها و انیمیشن‌های باکیفیت',
    speedRating: 4,
    qualityRating: 5,
    outputCapability: 'Face Detail Synthesis • 4K',
    features: [
      'بازسازی هوشمند بافت چهره و مو',
      'حذف ملایم آرتیفکت‌های فشرده‌سازی قبلی',
      'ارتقای تعادل رنگ و لبه‌های بصری',
      'نسبت فوق‌العاده قیمت به کیفیت خروجی',
    ],
  },
  {
    id: 'topaz-precision',
    name: 'Topaz Video Precision',
    provider: 'Topaz Labs',
    category: 'upscale',
    accent: 'yellow',
    startingLUM: 'شروع از ۱۵ LUM',
    tagline: 'بزرگ‌نمایی کاملاً وفادارانه بدون تغییر محتوا',
    description: 'مدل استاندارد صنعت تدوین برای بزرگ‌نمایی دقیق ویدئو بدون ایجاد تغییرات فانتزی یا بافت‌های غیرواقعی.',
    bestFor: 'فوتیج‌های مستند، ویدئوهای پزشکی، صنعتی و تصاویر نیازمند وفاداری ۱۰۰٪ به منبع',
    speedRating: 4,
    qualityRating: 5,
    outputCapability: 'Broadcast Standard 4K',
    features: [
      'حفظ دقیق هویت و تناسبات فریم بدون دستکاری',
      'ارتقای رزولوشن به ۲K و ۴K با شارپنس استودیویی',
      'کنترل اعوجاج در حاشیه‌های تصویر',
      'مناسب کارهای استانداردهای حرفه‌ای برودکست',
    ],
  },
  {
    id: 'topaz-deblur',
    name: 'Topaz Video Deblur',
    provider: 'Topaz Labs',
    category: 'fix',
    accent: 'purple',
    startingLUM: 'شروع از ۱۵ LUM',
    tagline: 'رفع تاری ناشی از حرکت سریع و لرزش دوربین',
    description: 'الگوریتم تخصصی حذف تاری حرکتی (Motion Blur) بدون تغییر در رزولوشن پایه ویدئو.',
    bestFor: 'ویدئوهای ورزشی، ضبط در حال حرکت، اکشن کمراها و فوتیج‌های دست‌گرفته',
    speedRating: 4,
    qualityRating: 5,
    outputCapability: 'Motion Vector Deblur',
    features: [
      'تفکیک هوشمند جهت حرکت دوربین و سوژه',
      'شارپ کردن لبه‌های تارشده با حفظ پیوستگی فریم‌ها',
      'عدم تغییر در ابعاد اصلی ویدئو برای ترکیب آسان در تایم‌لاین',
      'کاهش اثر ژله‌ای شاتر متحرک',
    ],
  },
  {
    id: 'topaz-denoise',
    name: 'Topaz Video Denoise',
    provider: 'Topaz Labs',
    category: 'fix',
    accent: 'pink',
    startingLUM: 'شروع از ۳۰ LUM',
    tagline: 'حذف کامل نویز و گرین دانه‌ای بدون تاری',
    description: 'پاکسازی نویز ایزوهای بالا و گرین‌های شدید بدون تار کردن بافت پوست و لباس.',
    bestFor: 'ویدئوهای ضبط‌شده در نور کم، محیط‌های شبانه و فیلم‌های قدیمی اسکن‌شده',
    speedRating: 4,
    qualityRating: 5,
    outputCapability: 'ISO Noise Clean • Flicker-Free',
    features: [
      'شناسایی و تفکیک نویز سنسور از بافت واقعی صحنه',
      'پاکسازی یکنواخت در تمام طول ویدئو بدون سوسو زدن (Flicker-Free)',
      'حفظ جزئیات سایه‌ها و نواحی تیره',
      'خروجی شفاف و آماده تصحیح رنگ نهایی',
    ],
  },
  {
    id: 'topaz-interpolate',
    name: 'Topaz Video Interpolate',
    provider: 'Topaz Labs',
    category: 'fix',
    accent: 'yellow',
    startingLUM: 'شروع از ۴۵ LUM',
    tagline: 'افزایش نرخ فریم و روان‌سازی حرکت تا ۶۰fps',
    description: 'تولید هوشمند فریم‌های میانی (Frame Interpolation) برای تبدیل ویدئوهای ۲۴ یا ۳۰ فریم به ۶۰ فریم فوق‌العاده نرم و اسلوموشن.',
    bestFor: 'انیمیشن‌های ۲۴ فریم، ویدئوهای گیمینگ، اسلوموشن‌های سینمایی و خروجی‌های مدرن',
    isPopular: true,
    speedRating: 4,
    qualityRating: 5,
    outputCapability: 'Optical Flow 60 FPS / Slow-Mo',
    features: [
      'تولید فریم‌های میانی با تخمین دقیق بردار حرکت',
      'تبدیل ویدئوهای ۲۴fps و ۳۰fps به ۶۰fps یکنواخت',
      'امکان ساخت اسلوموشن‌های روان بدون لگ',
      'جلوگیری از آرتیفکت‌های شبحی (Ghosting)',
    ],
  },
  {
    id: 'topaz-generative',
    name: 'Topaz Video Generative',
    provider: 'Topaz Labs AI',
    category: 'pro',
    accent: 'purple',
    startingLUM: 'شروع از ۱۸۰ LUM',
    tagline: 'بازیابی زایشی جزئیات برای ویدئوهای بسیار بی‌کیفیت',
    description: 'موتور هوش مصنوعی زایشی برای احیای ویدئوهایی که اطلاعات پیکسلی بسیار کمی دارند یا از منابع بسیار قدیمی و فشرده ضبط شده‌اند.',
    bestFor: 'ویدئوهای خانوادگی قدیمی، دوربین‌های مداربسته کم‌کیفیت و تصاویر آرشیوی تاریخی',
    speedRating: 3,
    qualityRating: 5,
    outputCapability: 'Generative Archival Recovery',
    features: [
      'بازتولید بافت‌های پیکسلی مفقود شده با مدلهای مولد پیشرفته',
      'احیای جزئیات چشم، مو، پس‌زمینه و لباس‌های بسیار تار',
      'بهترین نتیجه روی ویدئوهای زیر ۴۸۰p',
      'حفظ پایداری زمانی بین فریم‌های بازسازی شده',
    ],
  },
  {
    id: 'flux-video',
    name: 'FLUX Video Upscale',
    provider: 'Black Forest Labs',
    category: 'pro',
    accent: 'pink',
    startingLUM: 'شروع از ۲۱۰ LUM',
    tagline: 'ارتقای تخصصی با حالت‌های دقیق یا خلاقانه',
    description: 'بر پایه فناوری پیشتاز FLUX با دو حالت کاری Precision (دقیق) و Creative (خلاقانه) برای دست‌یابی به جذاب‌ترین بافت‌های بصری.',
    bestFor: 'تیزرهای تبلیغاتی، رندرهای انیمیشنی ۳D و ویدئوهای هنری با جزئیات لوکس',
    speedRating: 3,
    qualityRating: 5,
    outputCapability: 'Commercial 3D & Luxury 4K',
    features: [
      'امکان تنظیم سطح خلاقیت در بازسازی جزئیات',
      'سازگاری بالا با انواع سبک‌های رئال و انیمیشن',
      'ایجاد شفافیت و کنتراست سینمایی خیره‌کننده',
      'پشتیبانی از رزولوشن‌های سفارشی تا ۴K',
    ],
  },
  {
    id: 'topaz-creative',
    name: 'Topaz Video Creative',
    provider: 'Topaz Labs AI',
    category: 'pro',
    accent: 'yellow',
    startingLUM: 'شروع از ۴۵۰ LUM',
    tagline: 'بزرگ‌نمایی خلاقانه همراه با تولید بافت‌های ظریف',
    description: 'قدرتمندترین مدل لوما برای ارتقای ویدئو که جزئیات میکروسکوپی و بافت‌های نوری جدیدی را به فریم‌ها تزریق می‌کند.',
    bestFor: 'تولیدات سینمایی سطح بالا، موزیک ویدیوها و بازسازی شاهکارهای بصری',
    speedRating: 3,
    qualityRating: 5,
    outputCapability: 'Cinema 8K Micro-Texture',
    features: [
      'تزریق بافت‌های میکروسکوپی نوری و سینمایی',
      'بالاترین سطح وضوح و جذابیت بصری در بین مدل‌ها',
      'کاهش خطاهای پیکسلی در مقیاس‌های بسیار بزرگ',
      'مناسب نمایش روی تلویزیون‌ها و پرده‌های بزرگ',
    ],
  },
];

export const VideoEnhancementModels: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'upscale' | 'fix' | 'pro'>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredModels = activeCategory === 'all' 
    ? MODELS_DATA 
    : MODELS_DATA.filter((m) => m.category === activeCategory);

  return (
    <section id="models" className="relative py-20 lg:py-32 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="models" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Film size={14} className="text-luma-purple" />
            <span>موتورها و مدل‌های تخصصی ویدئو</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.2]">
            <span className="text-gradient-animated inline-block pb-1">۹ مدل تخصصی</span> برای هر نوع ویدئو و نیاز
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            از افزایش سریع و اقتصادی رزولوشن تا حذف نویز، رفع تاری و بازسازی زایشی فریم‌ها؛ مدل ایده‌آل پروژه‌تان را انتخاب کنید.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'همه ۹ مدل تخصصی' },
              { id: 'upscale', label: 'ارتقای رزولوشن و وضوح' },
              { id: 'fix', label: 'اصلاح نویز، تاری و فریم‌ریت' },
              { id: 'pro', label: 'مدل‌های حرفه‌ای و زایشی' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold shadow-md'
                      : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredModels.map((model, idx) => {
            const accentColor = 
              model.accent === 'purple' ? 'text-luma-purple' : model.accent === 'pink' ? 'text-luma-pink' : 'text-luma-yellow';

            return (
              <motion.div
                key={model.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="h-full flex flex-col"
              >
                <VideoEnhancementHoverCard
                  accentColor={model.accent}
                  className="h-full flex flex-col"
                  innerClassName="p-6 sm:p-8 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    
                    {/* Top Bar: Provider & Rate Badge */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{model.provider}</span>
                        {model.isPopular && (
                          <span className="px-2 py-0.5 rounded-md bg-luma-purple/20 border border-luma-purple/30 text-zinc-900 dark:text-luma-purple text-[10px] font-bold">
                            محبوب
                          </span>
                        )}
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold text-zinc-900 dark:text-white">
                        {model.startingLUM}
                      </div>
                    </div>

                    {/* Model Title & Tagline */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        {model.name}
                      </h3>
                      <p className={`text-xs font-medium ${accentColor}`}>
                        {model.tagline}
                      </p>
                    </div>

                    {/* DYNAMIC VISUAL: AI Compute Telemetry Radar / Metrics */}
                    <div className="p-3 rounded-2xl bg-zinc-950 border border-white/10 text-white space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-sans">
                        <span className="text-zinc-400">شاخص‌های عملکردی مدل</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          آماده پردازش
                        </span>
                      </div>
                      
                      {/* Quality Meter */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-sans">
                          <span className="text-zinc-400">دقت و کیفیت بازسازی</span>
                          <span className={`${accentColor} font-bold font-mono`}>{model.qualityRating} / 5</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 h-full rounded-full transition-all duration-500 ${
                                i < model.qualityRating 
                                  ? (model.accent === 'purple' ? 'bg-luma-purple shadow-[0_0_4px_#DA8FFF]' : model.accent === 'pink' ? 'bg-luma-pink shadow-[0_0_4px_#FF7AAB]' : 'bg-luma-yellow shadow-[0_0_4px_#FFE580]') 
                                  : 'bg-zinc-800'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Speed Meter */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-sans">
                          <span className="text-zinc-400">سرعت رندرینگ و پردازش</span>
                          <span className="text-zinc-300 font-bold font-mono">{model.speedRating} / 5</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 h-full rounded-full transition-all duration-500 ${
                                i < model.speedRating ? 'bg-white/80' : 'bg-zinc-800'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Output Capability Tag */}
                      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-sans">
                        <span className="text-zinc-400">حداکثر خروجی:</span>
                        <span className={`font-bold font-mono ${accentColor}`}>{model.outputCapability}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {model.description}
                    </p>

                    {/* Best For Box */}
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-1">
                      <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">مناسب برای:</span>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{model.bestFor}</p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                      <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-300 block">ویژگی‌های کلیدی:</span>
                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        {model.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check size={14} className={`${accentColor} shrink-0 mt-0.5`} />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/10">
                    <a
                      href="https://dash.lumai.ir/service/upscale-video"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all duration-200 group cursor-pointer"
                    >
                      <span>استفاده از {model.name} در ابزار</span>
                      <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    </a>
                  </div>
                </VideoEnhancementHoverCard>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing & Parameter Variation Disclaimer Card */}
        <div className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-zinc-100/80 dark:bg-[#121218] border border-black/5 dark:border-white/10 flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400">
          <Info size={18} className="text-luma-purple shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-zinc-900 dark:text-zinc-200">
              نکته مهم در خصوص محاسبه تعرفه:
            </p>
            <p className="leading-relaxed">
              هزینه نهایی میتواند با مدت ویدئو، رزولوشن، ضریب افزایش و تنظیمات مدل تغییر کند. پیش‌فاکتور دقیق مصرف لوم پیش از آغاز هر پردازش در داشبورد لوما نمایش داده می‌شود.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
