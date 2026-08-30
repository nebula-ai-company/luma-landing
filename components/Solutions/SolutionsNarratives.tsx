import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Megaphone, House, BookOpen, Cpu, 
  ArrowUpRight, Sparkle
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const MotionDiv = motion.div;

interface Narrative {
  id: string;
  name: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  problem: string;
  workflow: string[];
  tools: { name: string; path: string }[];
  benefit: string;
  integration: string;
  proofTitle: string;
  ctaText: string;
}

const NARRATIVES: Narrative[] = [
  {
    id: 'ecommerce',
    name: 'تجارت الکترونیک',
    icon: ShoppingBag,
    title: 'بهینه‌سازی تصاویر و ویدیوهای کاتالوگ فروشگاه در چند ثانیه',
    subtitle: 'کاهش هزینه‌های استودیویی و ارتقای چشمگیر تبدیل بازدیدکننده به خریدار',
    problem: 'هزینه بالای عکاسی، اجاره استودیوی تخصصی و زمان‌بر بودن آماده‌سازی تصاویر باکیفیت و ویدیوهای معرفی کالا.',
    workflow: [
      'آپلود مستقیم عکس ساده محصول یا لباس عکاسی‌شده با موبایل.',
      'حذف خودکار پس‌زمینه و جایگذاری در محیط‌های استودیویی و مدرن.',
      'پرو مجازی هوشمند بر روی اندام مدل‌های دیجیتالی متنوع بدون نیاز به عکاسی مجدد.',
      'ارتقای کیفیت و وضوح تصویر با استفاده از موتور بازسازی پیکسل.',
      'تولید ویدیوهای کوتاه محصول و ارتقای کیفیت ویدئو برای تبلیغات موثر.'
    ],
    tools: [
      { name: 'پرو مجازی هوشمند (Virtual Try-On)', path: '/service/try-on' },
      { name: 'حذف خودکار پس‌زمینه (Bg Remove)', path: '/service/bg-remove' },
      { name: 'ارتقای کیفیت تصویر (Image Upscale)', path: '/service/upscale' },
      { name: 'ساخت ویدیو محصول (Video Gen)', path: '/service/video' },
      { name: 'افزایش کیفیت ویدئو (Video Enhancement)', path: '/service/video-enhancement' }
    ],
    benefit: 'کاهش چشمگیر هزینه‌های عکاسی سنتی کاتالوگ، تسریع فرآیند معرفی محصول جدید به بازار و بهبود نرخ تعامل و تبدیل مشتریان.',
    integration: 'یکپارچه‌سازی از طریق REST API پیشرفته لوما یا وب‌هوک‌های اختصاصی جهت پردازش خودکار تصاویر و فایل‌های فروشگاه.',
    proofTitle: 'پیش‌نمایش عکاسی محصول هوشمند',
    ctaText: 'ارتقای کاتالوگ فروشگاه'
  },
  {
    id: 'advertising',
    name: 'تبلیغات و محتوا',
    icon: Megaphone,
    title: 'تولید محتوای بازاریابی و ویدیویی با مقیاس بی‌نهایت',
    subtitle: 'خلق تصاویر برند محور سفارشی و تیزرهای تبلیغاتی با بالاترین کیفیت',
    problem: 'وابستگی شدید به تصاویر کپی‌رایت‌شده خارجی که هویت بومی ندارند، هزینه‌های تکراری ساخت تیزر و ناتوانی در تست سریع ایده‌های تبلیغاتی جدید در کمپین‌ها.',
    workflow: [
      'ورود متن ایده تبلیغاتی یا آپلود لوگو و محصول به عنوان مرجع بصری.',
      'تولید اتودهای تصویری متنوع و هماهنگ با پالت رنگی و هویت بصری برند.',
      'اعمال ویرایش‌های دقیق (Inpainting) و افزایش کیفیت تصاویر برای چاپ یا انتشار دیجیتال.',
      'تبدیل پوستر ایستا به تیزر متحرک با هوش مصنوعی و افزایش کیفیت ویدئو به رزولوشن بالاتر.',
      'تولید نریشن صوتی تیزر با تبدیل متن به گفتار (TTS) و خودکارسازی فرآیند با بوم ورک‌فلو.'
    ],
    tools: [
      { name: 'تولید تصویر با هوش مصنوعی (Image Gen)', path: '/service/img-gen' },
      { name: 'ساخت ویدیو تبلیغاتی (Video Gen)', path: '/service/video' },
      { name: 'افزایش کیفیت ویدئو (Video Enhancement)', path: '/service/video-enhancement' },
      { name: 'تبدیل متن به گفتار (Text to Speech)', path: '/service/text-to-speech' },
      { name: 'ارتقای کیفیت تصویر (Image Upscale)', path: '/service/upscale' },
      { name: 'ورک‌فلوهای خودکار (Workflows)', path: '/service/workflow' }
    ],
    benefit: 'سرعت بخشیدن به فرآیند طوفان ذهنی و طراحی کمپین‌ها، حذف هزینه‌های اشتراک استاک خارجی و بهبود چشمگیر بازدهی کمپین‌ها.',
    integration: 'اتصال خودکار از طریق API تولید ویدیو، تصویر و وب‌هوک‌های پیشرفته به پلتفرم‌های مدیریت کمپین.',
    proofTitle: 'پیش‌نمایش استودیوی تبلیغات هوشمند',
    ctaText: 'فعال‌سازی آتلیه تبلیغات دیجیتال'
  },
  {
    id: 'realestate',
    name: 'املاک و معماری',
    icon: House,
    title: 'چیدمان مجازی و زنده برای املاک بدون مبلمان',
    subtitle: 'تسهیل تصمیم‌گیری خریداران و جلوه دادن به فضاهای خالی با چیدمان‌های مدرن',
    problem: 'خانه‌های خالی و بدون دیزاین زمان بیشتری در بازار برای فروش می‌مانند؛ مبلمان واقعی لوکس نیز هزینه‌های بسیار بالای لجستیک و چیدمان موقت دارد.',
    workflow: [
      'ثبت عکس باکیفیت از زاویه خالی سالن یا آپلود فایل اولیه.',
      'انتخاب سبک طراحی داخلی مد نظر (مدرن، مینی‌مال، اسکاندیناوی یا کلاسیک).',
      'تشخیص خودکار ساختار دیوارها، نور ورودی و زوایای فضا توسط مدل لوما.',
      'چیدمان واقع‌گرایانه انواع مبلمان، پرده و المان‌های دکوراتیو هماهنگ با ابعاد.',
      'ارتقای کیفیت تصویر رندرهای نهایی با موتور بازسازی پیکسل.'
    ],
    tools: [
      { name: 'چیدمان مجازی و ویرایش جادویی (Inpainting)', path: '/service/img-edit' },
      { name: 'ارتقای کیفیت تصاویر (Image Upscale)', path: '/service/upscale' },
      { name: 'بوم ورک‌فلوهای طراحی', path: '/service/workflow' }
    ],
    benefit: 'جذاب‌تر شدن تصاویر آگهی ملک، حذف هزینه‌های سنگین لجستیک مبلمان فیزیکی و ایجاد امکان پیش‌نمایش چیدمان برای مشتریان.',
    integration: 'ارائه API اختصاصی و سرویس‌های پردازش تصویر جهت بارگذاری سریع تصاویر در وب‌سایت‌های املاک.',
    proofTitle: 'پیش‌نمایش چیدمان مجازی هوشمند',
    ctaText: 'استفاده در پروژه‌های ساختمانی'
  },
  {
    id: 'education',
    name: 'آموزش و یادگیری',
    icon: BookOpen,
    title: 'توسعه محتوای آموزشی تعاملی و چندرسانه‌ای',
    subtitle: 'غنی‌سازی مفاهیم آموزشی با ویدیوهای پویا، صداگذاری هوشمند و اینفوگرافیک‌ها',
    problem: 'تولید محتوای چندرسانه‌ای برای یادگیری آنلاین زمان‌بر است و فایل‌های متنی صرف منجر به کاهش درک و تعامل فراگیران می‌شود.',
    workflow: [
      'ورود سرفصل‌ها، متن درس یا نکات آموزشی توسط مدرس.',
      'سازمان‌دهی مفاهیم و تدوین سناریو به کمک دستیار هوشمند و مدل‌های چت تخصصی.',
      'تولید تصاویر آموزشی، نمودارها و ارتقای شفافیت اسلایدهای تدریس.',
      'تولید ویدیوهای انیمیشنی برای تشریح بصری مفاهیم.',
      'تولید نریشن صوتی باکیفیت و طبیعی با استفاده از مدل‌های تبدیل متن به گفتار (TTS).',
      'زنجیره‌سازی خودکار مراحل تولید محتوا با بوم ورک‌فلوهای متوالی.'
    ],
    tools: [
      { name: 'دستیار هوشمند چت و محتوا (Assistant)', path: '/service/assistant' },
      { name: 'تبدیل متن به گفتار (Text to Speech)', path: '/service/text-to-speech' },
      { name: 'تولید ویدیوهای آموزشی (Video Gen)', path: '/service/video' },
      { name: 'ارتقای کیفیت اسناد و تصاویر (Upscale)', path: '/service/upscale' },
      { name: 'بوم ورک‌فلوهای آموزشی (Workflows)', path: '/service/workflow' }
    ],
    benefit: 'ارتقای کیفیت بصری و شنیداری دوره‌ها، صرفه‌جویی در زمان آماده‌سازی محتوا و امکان چندزبانه کردن آسان صداگذاری آموزشی.',
    integration: 'یکپارچه‌سازی استاندارد با سیستم‌های مدیریت یادگیری (LMS) از طریق API اختصاصی و وب‌هوک‌ها.',
    proofTitle: 'پیش‌نمایش یادگیری بصری هوشمند',
    ctaText: 'ارتقای محتوای آموزشی'
  },
  {
    id: 'workflows',
    name: 'فرآیندهای سازمانی',
    icon: Cpu,
    title: 'خودکارسازی هوشمند جریان‌های کاری و عملیاتی',
    subtitle: 'حذف کامل گلوگاه‌های تکراری و اداری به کمک بوم فرآیندهای زنجیره‌ای',
    problem: 'انباشت کارهای دستی تکراری نظیر ورود اطلاعات، تطبیق تصاویر اسناد با داده‌ها، زمان‌بر بودن تحلیل گزارش‌های تجاری و افت راندمان کارمندان.',
    workflow: [
      'طراحی گام‌به‌گام فرآیندها روی بوم بصری در قالب گره‌های متوالی.',
      'تعریف قوانین بیزنس و اتصال به منابع داده‌های سازمانی (مانند دیتابیس‌ها).',
      'پردازش اتوماتیک اسناد ورودی، تصاویر و استخراج اطلاعات کلیدی.',
      'اعتبارسنجی کیفیت و صدور هشدارهای خودکار در صورت بروز مغایرت.',
      'ارائه داشبورد تحلیلی و ثبت وقایع برای بازرسی‌های دوره‌ای.'
    ],
    tools: [
      { name: 'بوم بصری ورک‌فلوها (Workflows)', path: '/service/workflow' },
      { name: 'دستیار چت هوشمند سازمانی (Assistant)', path: '/service/assistant' },
      { name: 'چت تخصصی با مدل‌های پیشرفته', path: '/service/chat' }
    ],
    benefit: 'کاهش خطاهای ناشی از پردازش دستی اطلاعات، کاهش هزینه‌های پرسنلی تکراری و افزایش سرعت انجام فرآیندها.',
    integration: 'قابل ارائه در قالب وب‌سرویس‌های امن ابری جهت استقرار در زیرساخت‌های سازمانی.',
    proofTitle: 'بوم مدیریت فرآیندهای سازمانی',
    ctaText: 'طراحی فرآیند اختصاصی سازمان'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      when: "afterChildren"
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.75, // Longer than entry (0.75s vs spring/0.4s) for anticipation
      ease: [0.32, 0.72, 0, 1], // Big ease-out deceleration curve
    },
  },
};

export const SolutionsNarratives: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ecommerce');
  const [isUserInteracted, setIsUserInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (isUserInteracted) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = NARRATIVES.findIndex(n => n.id === prev);
        const nextIndex = (currentIndex + 1) % NARRATIVES.length;
        return NARRATIVES[nextIndex].id;
      });
    }, 5000); // Auto rotate every 5 seconds

    return () => clearInterval(interval);
  }, [isUserInteracted]);

  const activeNarrative = NARRATIVES.find(n => n.id === activeTab) || NARRATIVES[0];

  return (
    <section className="py-24 bg-transparent transition-colors duration-300 relative">
      {/* Smoothly masked background */}
      <div className="absolute inset-0 bg-white dark:bg-[#050505] z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,white_120px,white_calc(100%-120px),transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Industry selector tabs */}
        <div className="text-center mb-16">
          <span className="text-[10px] text-luma-pink font-black uppercase tracking-[0.2em] mb-3 block">راهکارهای بهینه‌سازی</span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-white mb-8 font-sans">
            انتخاب صنعت و سناریوی بیزنس شما
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 p-1.5 bg-zinc-100 dark:bg-zinc-900/60 rounded-2xl max-w-5xl mx-auto border border-zinc-200/50 dark:border-white/5 backdrop-blur-md">
            {NARRATIVES.map((tab, idx) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsUserInteracted(true);
                  }}
                  className={`flex items-center justify-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-3 rounded-xl text-xs lg:text-sm font-black transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${
                    isActive 
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md scale-102' 
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-white/5'
                  } ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  <TabIcon size={16} weight={isActive ? 'bold' : 'regular'} className="shrink-0" />
                  <span className="truncate">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Narrative layout */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
          >
            {/* Left Content (Info) */}
            <MotionDiv 
              variants={itemVariants}
              className="lg:col-span-7 flex flex-col justify-between text-right" 
              dir="rtl"
            >
              <div>
                {/* Visual Label */}
                <MotionDiv variants={itemVariants}>
                  <span className="text-[10px] text-luma-purple font-black uppercase tracking-[0.15em] mb-2 block">
                    {activeNarrative.subtitle}
                  </span>
                </MotionDiv>
                
                <MotionDiv variants={itemVariants}>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white mb-6 font-sans">
                    {activeNarrative.title}
                  </h3>
                </MotionDiv>

                {/* Problem Section */}
                <MotionDiv variants={itemVariants} className="mb-6 p-5 bg-red-500/5 dark:bg-red-500/10 border-r-4 border-red-500/40 rounded-xl">
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">چالش اساسی کسب‌وکار</h4>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {activeNarrative.problem}
                  </p>
                </MotionDiv>

                {/* Luma Workflow Steps */}
                <MotionDiv variants={itemVariants} className="mb-8">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                    <Sparkle size={16} className="text-luma-yellow" />
                    <span>جریان کار هوشمند لوما</span>
                  </h4>
                  <ol className="space-y-3.5">
                    {activeNarrative.workflow.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-luma-purple/10 text-luma-purple text-[10px] font-black shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </MotionDiv>

                {/* Involved tools with routing */}
                <MotionDiv variants={itemVariants} className="mb-8 border-t border-zinc-100 dark:border-white/5 pt-6">
                  <h4 className="text-xs font-bold text-zinc-400 mb-3">ابزارها و مدل‌های مرتبط</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeNarrative.tools.map((tool, idx) => (
                      <Link
                        key={idx}
                        to={tool.path}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 text-zinc-700 dark:text-zinc-300 hover:border-luma-pink transition-colors group"
                      >
                        <span>{tool.name}</span>
                        <ArrowUpRight size={11} className="text-zinc-400 group-hover:text-luma-pink transition-colors" />
                      </Link>
                    ))}
                  </div>
                </MotionDiv>

                {/* Integration & Benefits */}
                <MotionDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-100 dark:border-white/5 pt-6 mb-8">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-400 mb-1.5">دستاورد عملیاتی (KPI)</h5>
                    <p className="text-xs md:text-sm text-zinc-800 dark:text-zinc-300 font-medium leading-relaxed">
                      {activeNarrative.benefit}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-400 mb-1.5">روش یکپارچه‌سازی</h5>
                    <p className="text-xs md:text-sm text-zinc-800 dark:text-zinc-300 font-medium leading-relaxed">
                      {activeNarrative.integration}
                    </p>
                  </div>
                </MotionDiv>
              </div>

              {/* Consultation CTA targeting */}
              <MotionDiv variants={itemVariants} className="mt-4 pt-4 border-t border-zinc-100 dark:border-white/5">
                <Button
                  href="/contact?type=consultation"
                  variant="primary"
                  className="group relative inline-flex items-center justify-between gap-6 px-5 py-3 text-xs md:text-sm font-black w-full sm:w-auto"
                >
                  <span>{activeNarrative.ctaText}</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </MotionDiv>
            </MotionDiv>

            {/* Right Content (Visual Proof / Simulation) */}
            <MotionDiv variants={itemVariants} className="lg:col-span-5 flex items-center justify-center">
              {/* Double-Bezel Hard-nesting card */}
              <div className="w-full bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-white/5 p-2 rounded-[2.2rem] shadow-xl">
                <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/40 dark:border-white/10 rounded-[1.8rem] overflow-hidden p-6 relative">
                  
                  {/* Top Mock Window Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400 font-mono tracking-wide">LUMA ENGINE PRO</span>
                  </div>

                  {/* Interactive Proof View */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-white/5 flex flex-col justify-between p-4 shadow-inner mb-6">
                    {activeTab === 'ecommerce' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-luma-pink/10 flex items-center justify-center text-luma-pink mb-4 animate-bounce">
                          <ShoppingBag size={40} weight="duotone" />
                        </div>
                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 mb-1">سیستم آماده بارگذاری کاتالوگ لباس</span>
                        <p className="text-[10px] text-zinc-400 max-w-xs">تصاویر پوشاک خود را آپلود کرده و کاتالوگ نهایی مدلینگ را فوراً تحویل بگیرید.</p>
                      </div>
                    )}
                    {activeTab === 'advertising' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-luma-purple/10 flex items-center justify-center text-luma-purple mb-4 animate-pulse">
                          <Megaphone size={40} weight="duotone" />
                        </div>
                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 mb-1">سیستم اتود خلاق کمپین‌های ویدیویی</span>
                        <p className="text-[10px] text-zinc-400 max-w-xs">تولید خودکار ده‌ها واریانت تبلیغاتی منطبق بر لوگو و رنگ‌بندی سازمانی.</p>
                      </div>
                    )}
                    {activeTab === 'realestate' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-luma-yellow/10 flex items-center justify-center text-luma-yellow mb-4 animate-pulse">
                          <House size={40} weight="duotone" />
                        </div>
                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 mb-1">موتور چیدمان مجازی سه‌بعدی</span>
                        <p className="text-[10px] text-zinc-400 max-w-xs">مبلمان و دکوراسیون فرضی را متناسب با زوایای پلان با دقت پیکسل بچینید.</p>
                      </div>
                    )}
                    {activeTab === 'education' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                          <BookOpen size={40} weight="duotone" />
                        </div>
                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 mb-1">مترجم اسناد درسی به انیمیشن</span>
                        <p className="text-[10px] text-zinc-400 max-w-xs">جزوات و سرفصل‌های پیچیده علمی خود را به ویدیوها و مفاهیم تعاملی ارتقا دهید.</p>
                      </div>
                    )}
                    {activeTab === 'workflows' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 animate-spin-slow">
                          <Cpu size={40} weight="duotone" />
                        </div>
                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 mb-1">بوم رصد لحظه‌ای ورک‌فلوهای سازمانی</span>
                        <p className="text-[10px] text-zinc-400 max-w-xs">پیاده‌سازی بی‌دردسر منطق چندمرحله‌ای برای خودکارسازی فرآیندهای کسب‌وکار.</p>
                      </div>
                    )}
                  </div>

                  {/* Operational status feedback loop */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-white/5 flex items-center justify-between text-right" dir="rtl">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">وضعیت استقرار سیستم</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">آماده اتصال API</span>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </AnimatePresence>

      </div>
    </section>
  );
};
