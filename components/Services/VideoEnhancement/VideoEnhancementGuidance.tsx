import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Compass, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Eye, 
  Activity, 
  Film, 
  Scan, 
  RotateCcw,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Cpu,
  Layers,
  Volume2
} from 'lucide-react';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';
import type { MediaCatalogModel } from '../../../lib/catalogApi.ts';
import { formatPersianDigits, formatStartingPrice } from '../../../lib/catalogApi.ts';

interface ScenarioDefinition {
  id: string;
  modelId: string;
  icon: any;
  category: 'upscale' | 'fix' | 'fps' | 'generative';
  shortTitle: string;
  userGoal: string;
  defaultModelName: string;
  defaultProvider: string;
  defaultMinPrice: number;
  accent: 'purple' | 'pink' | 'yellow';
  categoryBadge: string;
  reason: string;
  defectType: string;
  improvementMetric: string;
  inputCondition: string;
  outputCapability: string;
  technicalHighlights: string[];
}

const CATEGORIES = [
  { id: 'all', label: 'همه سناریوها' },
  { id: 'upscale', label: 'افزایش وضوح و ابعاد' },
  { id: 'fix', label: 'اصلاح نویز و لرزش' },
  { id: 'fps', label: 'روان‌سازی فریم و اسلوموشن' },
  { id: 'generative', label: 'احیای فوتیج و ۳D' },
];

const SCENARIO_DEFS: ScenarioDefinition[] = [
  {
    id: 's1',
    modelId: 'flashvsr-video-upscaler',
    icon: Zap,
    category: 'upscale',
    shortTitle: 'ارتقای سریع و اقتصادی به ۴K',
    userGoal: 'ویدئوی باکیفیت معمولی دارم و می‌خواهم سریع و با کمترین هزینه به ۴K تبدیل شود',
    defaultModelName: 'FlashVSR',
    defaultProvider: 'FlashVSR',
    defaultMinPrice: 1,
    accent: 'purple',
    categoryBadge: 'اقتصادی و فوق سریع',
    defectType: 'رزولوشن پایین، لبه‌های دندانه‌دار و ماتی استاندارد (SD / 1080p)',
    improvementMetric: '۴ برابر افزایش وضوح و تراکم پیکسلی',
    inputCondition: 'انواع فرمت‌های MP4، MOV با کیفیت 720p یا 1080p',
    outputCapability: 'کیفیت بازسازی‌شده و ارتقای وضوح با شارپنس کریستالی',
    reason: 'سرعت پردازش بسیار بالا و تعرفه اقتصادی میان موتورها با امکان بزرگ‌نمایی و حفظ کیفیت منبع.',
    technicalHighlights: [
      'حفظ صدای اصلی ویدئو بدون فشرده‌سازی مضاعف در مدل‌های سازگار',
      'تعرفه اقتصادی مناسب پروژه‌های با حجم بالا',
      'سرعت رندر بسیار بالا مناسب پروژه‌های فوری و حجیم',
      'جلوگیری از تغییر غیرواقعی ساختار صحنه'
    ]
  },
  {
    id: 's2',
    modelId: 'seedvr-2-video-upscaler',
    icon: Eye,
    category: 'upscale',
    shortTitle: 'بازسازی چهره و بافت پوست',
    userGoal: 'ویدئوی چهره‌محور، بلاگری یا مصاحبه دارم و بازسازی بافت پوست و مو برایم مهم است',
    defaultModelName: 'SeedVR2 Video Upscaler',
    defaultProvider: 'ByteDance',
    defaultMinPrice: 1,
    accent: 'pink',
    categoryBadge: 'بازسازی چهره و پرتره',
    defectType: 'ماتی پوست، بافت‌های محو صورت و نویز فشرده‌سازی دوربین موبایل',
    improvementMetric: '+۲۸۰٪ بازسازی دقیق بافت پوست و مو',
    inputCondition: 'ویدئوهای وب‌کم، استوری اینستاگرام، مصاحبه و پرتره',
    outputCapability: 'خروجی پرتره استودیویی 4K با خطوط شارپ چهره',
    reason: 'بازسازی عمیق خطوط چهره، مژه‌ها، مو و منافذ طبیعی پوست بدون ایجاد ظاهر پلاستیکی یا غیرواقعی.',
    technicalHighlights: [
      'تشخیص هوشمند مش‌بندی صورت (Facial Landmark Mesh)',
      'پایداری زمانی فرم چهره بین فریم‌های متوالی بدون لرزش',
      'احیای مویرگی بافت مو و چشم‌ها با حفظ حالت طبیعی',
      'تعرفه بسیار مناسب برای تولیدکنندگان محتوا و بلاگرها'
    ]
  },
  {
    id: 's3',
    modelId: 'topaz-precision-video-upscaler',
    icon: ShieldCheck,
    category: 'upscale',
    shortTitle: 'وفاداری ۱۰۰٪ به منبع (مستند)',
    userGoal: 'فوتیج مستند، اداری یا صنعتی دارم و نباید هیچ بافت غیرواقعی ایجاد شود',
    defaultModelName: 'Topaz Video Precision',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 10,
    accent: 'yellow',
    categoryBadge: 'وفاداری ۱۰۰٪ به منبع',
    defectType: 'محدودیت رزولوشن سنسور دوربین بدون حق دخالت زایشی هوش مصنوعی',
    improvementMetric: '۰٪ تغییر غیرواقعی (وفاداری مطلق)',
    inputCondition: 'فوتیج‌های دوربین حرفه‌ای، اسناد رسمی، آرشیوهای مستند',
    outputCapability: 'خروجی استاندارد پخش تلویزیونی (Broadcast 4K)',
    reason: 'بزرگ‌نمایی با استانداردهای پخش تلویزیونی (Broadcast) بدون دخالت زایشی هوش مصنوعی در ساختار واقعی صحنه.',
    technicalHighlights: [
      'ارتقای پیکسل‌به‌پیکسل بدون ساخت بافت تخیلی',
      'مورد تایید آرشیوهای ملی و شبکه‌های پخش تلویزیونی',
      'حفظ دقیق گرین طبیعی سنسور دوربین فیلم‌برداری',
      'شارپنس هندسی خالص و افزایش کنتراست خطوط'
    ]
  },
  {
    id: 's4',
    modelId: 'topaz-deblur-video',
    icon: Activity,
    category: 'fix',
    shortTitle: 'رفع تاری حرکتی و لرزش (Deblur)',
    userGoal: 'ویدئو با گوشی یا در حال حرکت ضبط شده و تاری حرکتی شدید (Motion Blur) دارد',
    defaultModelName: 'Topaz Video Deblur',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 10,
    accent: 'purple',
    categoryBadge: 'رفع تاری و لرزش',
    defectType: 'تاری ناشی از شاتر کند دوربین، لرزش دست و سرعت بالای سوژه',
    improvementMetric: 'انجماد کامل لبه‌ها و حذف موشن بلور',
    inputCondition: 'ویدئوهای ورزشی، اکشن، رانندگی و ضبط شده با موبایل',
    outputCapability: 'فریم‌های شارپ و تفکیک‌شده بدون تغییر در ابعاد منبع',
    reason: 'تفکیک بردار حرکت سوژه از لرزش دست و شارپ کردن لبه‌های تار بدون دستکاری ابعاد پایه ویدئو.',
    technicalHighlights: [
      'محاسبه جریان اپتیکال بردار حرکت سوژه',
      'تثبیت لرزش‌های ریز بدون برش و کراپ کادر تصویر',
      'شارپ‌سازی لبه‌های متحرک بدون ایجاد هاله مصنوعی',
      'مناسب برای ویدئوهای ورزشی و مسابقات پرسرعت'
    ]
  },
  {
    id: 's5',
    modelId: 'topaz-denoise-video',
    icon: Scan,
    category: 'fix',
    shortTitle: 'پاکسازی نویز و ایزوی شب (Denoise)',
    userGoal: 'ویدئو در شب، نور کم یا با ایزوی بالا ضبط شده و نویز و گرین دانه‌ای زیادی دارد',
    defaultModelName: 'Topaz Video Denoise',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 20,
    accent: 'pink',
    categoryBadge: 'پاکسازی نویز و گرین',
    defectType: 'برفک، نویز کروماتیک سنسور در تاریکی و گرین شدید ایزو',
    improvementMetric: '-۹۵٪ کاهش برفک و نویز دانه‌ای',
    inputCondition: 'ویدئوهای مهمانی، مراسم شبانه، نور ضعیف استودیویی',
    outputCapability: 'تصویر تمیز، مشکی عمیق یکدست و رنگ‌های شفاف',
    reason: 'تفکیک هوشمند نویز سنسور از بافت واقعی صحنه و حذف دانه‌ها بدون ایجاد ماتی در پوست و پس‌زمینه.',
    technicalHighlights: [
      'تفکیک نویز حرارتی سنسور از بافت پارچه و پوست',
      'حذف پرش و سوسو زدن نویز در فریم‌های متوالی (Flicker-Free)',
      'بازیابی شفافیت و درخشندگی طبیعی رنگ‌ها',
      'جلوگیری از حالت مات و پلاستیکی شدن سطوح'
    ]
  },
  {
    id: 's6',
    modelId: 'topaz-interpolate-video',
    icon: Film,
    category: 'fps',
    shortTitle: 'روان‌سازی ۶۰ فریم و اسلوموشن',
    userGoal: 'ویدئوی ۲۴ یا ۳۰ فریم دارم و می‌خواهم حرکات بسیار نرم و ۶۰fps شود یا اسلوموشن بسازم',
    defaultModelName: 'Topaz Video Interpolate',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 30,
    accent: 'yellow',
    categoryBadge: 'روان‌سازی ۶۰ فریم',
    defectType: 'حرکت بریده‌بریده و مقطع در پن‌های دوربین و صحنه‌های پرتحرک',
    improvementMetric: '۲.۵ برابر روانی حرکت (تبدیل به 60 FPS)',
    inputCondition: 'فوتیج‌های ۲۴، ۲۵ یا ۳۰ فریم استاندارد',
    outputCapability: 'خروجی ۶۰ فریم فوق روان یا اسلوموشن ۲x تا ۴x',
    reason: 'محاسبه دقیق بردارهای جریان اپتیکال و تولید فریم‌های میانی بین فریم‌های اصلی بدون ایجاد خطای شبحی (Ghosting).',
    technicalHighlights: [
      'تولید فریم‌های میانی با مدل‌های دیفیوژن برداری',
      'حذف خطای سایه‌اندازی و دوتایی شدن سوژه‌ها (Anti-Ghosting)',
      'ایجاد اسلوموشن‌های ابریشمی با کیفیت سینمایی',
      'هماهنگی کامل فریم‌ریت خروجی'
    ]
  },
  {
    id: 's7',
    modelId: 'topaz-generative-video-upscaler',
    icon: RotateCcw,
    category: 'generative',
    shortTitle: 'احیای فوتیج قدیمی و زیر ۴۸۰p',
    userGoal: 'ویدئوی بسیار قدیمی، کیفیت زیر ۴۸۰p یا فوتیج دوربین مداربسته کم‌کیفیت دارم',
    defaultModelName: 'Topaz Video Generative',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 120,
    accent: 'purple',
    categoryBadge: 'احیای زایشی هوشمند',
    defectType: 'شطرنجی بودن شدید، کمبود شدید پیکسل و تخریب نوار کاست یا دوربین مداربسته',
    improvementMetric: 'بازتولید زایشی اطلاعات پیکسلی مفقود',
    inputCondition: 'ویدئوهای VHS، فیلم‌های خانوادگی قدیمی، دوربین مداربسته',
    outputCapability: 'خروجی 1080p HD شفاف و بازسازی شده',
    reason: 'موتور هوش مصنوعی مولد پیشرفته برای بازتولید بافت‌های پیکسلی مفقود شده در فوتیج‌های دهه‌های گذشته و دوربین‌های امنیتی.',
    technicalHighlights: [
      'بازتولید خطوط مفقود چهره و جزئیات لباس با شبکه عصبی',
      'حذف خطوط نوار و لرزش‌های متداول فرمت‌های آنالوگ',
      'بهترین کارایی روی ویدئوهای بسیار فشرده و تاریک',
      'پایداری ساختار فریم‌ها در طول زمان'
    ]
  },
  {
    id: 's8',
    modelId: 'flux-video-upscaler',
    icon: Sparkles,
    category: 'generative',
    shortTitle: 'تیزر تجاری، انیمیشن و رندر ۳D',
    userGoal: 'تیزر تجاری، انیمیشن یا رندر ۳D دارم و تنظیم دلخواه سطح دقت/خلاقیت می‌خواهم',
    defaultModelName: 'FLUX Video Upscale',
    defaultProvider: 'Black Forest Labs',
    defaultMinPrice: 140,
    accent: 'pink',
    categoryBadge: 'پروژه‌های مدرن و ۳D',
    defectType: 'رندرهای ۳D با متریال‌های ساده یا نویز رندرینگ طولانی',
    improvementMetric: 'کاهش ۹۰٪ زمان رندر ۳D با کیفیت تجاری',
    inputCondition: 'خروجی‌های بلندر، مایا، موشن‌گرافیک و تیزرهای تبلیغاتی',
    outputCapability: 'خروجی ۴K تجاری با نورپردازی و انعکاس‌های نوری غنی',
    reason: 'تلفیق قدرت موتور FLUX با دو مد Precision و Creative برای ارتقای رندرهای ۳D و ساخت تیزرهای تبلیغاتی با بافت‌های چشم‌نواز.',
    technicalHighlights: [
      'قابلیت تنظیم درصد خلاقیت و دخالت هوش مصنوعی',
      'ایجاد بازتاب‌های نوری طبیعی و کنتراست سینمایی',
      'سازگاری فوق‌العاده با سبک‌های انیمیشن و رندر سه‌بعدی',
      'پشتیبانی از رزولوشن‌های سفارشی تا ۴K'
    ]
  },
  {
    id: 's9',
    modelId: 'topaz-creative-video-upscaler',
    icon: Layers,
    category: 'generative',
    shortTitle: 'تولیدات سینمایی و جزئیات میکروسکوپی',
    userGoal: 'تولیدات سینمایی سطح بالا که نیاز به تزریق بافت‌های میکروسکوپی و حداکثر جزئیات دارند',
    defaultModelName: 'Topaz Video Creative',
    defaultProvider: 'Topaz Labs',
    defaultMinPrice: 300,
    accent: 'yellow',
    categoryBadge: 'نهایت جزئیات سینمایی',
    defectType: 'کمبود جزئیات میکروسکوپی برای پرده‌های عریض سینما و LED غول‌پیکر',
    improvementMetric: 'تزریق بافت‌های نوری و ماکروسکوپیک 8K',
    inputCondition: 'مستر اولیه ویدئوکلیپ‌ها، تیزرهای تلویزیونی، فوتیج‌های سینمایی',
    outputCapability: 'مسترینگ سینمایی با بافت نوری زنده و بی‌نقص',
    reason: 'مدل تخصصی بازسازی برای نمایش در ابعاد بزرگ با جزئیات نوری و تاروپودهای ماکروسکوپیک تازه.',
    technicalHighlights: [
      'تزریق بافت‌های میکروسکوپی نوری و پارچه‌ای به صحنه',
      'بزرگ‌نمایی با حفظ وضوح و بافت طبیعی تصویر',
      'کاهش خطاهای پیکسلی در مقیاس‌های بسیار بزرگ نمایشگاهی',
      'مناسب پروداکشن‌های حرفه‌ای سینما و تلویزیون'
    ]
  },
];

export interface VideoEnhancementGuidanceProps {
  models?: MediaCatalogModel[];
}

export const VideoEnhancementGuidance: React.FC<VideoEnhancementGuidanceProps> = ({ models = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState<string>('s1');

  // Build model map from authoritative catalog
  const catalogMap = useMemo(() => {
    const map = new Map<string, MediaCatalogModel>();
    for (const m of models) {
      map.set(m.id, m);
    }
    return map;
  }, [models]);

  // Merge scenario definitions with live catalog facts
  const scenarios = useMemo(() => {
    return SCENARIO_DEFS.map((def) => {
      const live = catalogMap.get(def.modelId);
      const suggestedModel = live?.name ?? def.defaultModelName;
      const provider = live?.provider ?? def.defaultProvider;
      const startingLUM = live && live.pricing
        ? formatStartingPrice(live.pricing.minimum, live.pricing.currency)
        : 'تعرفه متناسب با مدل و تنظیمات';
      const pricingDesc = live?.pricing?.description;

      return {
        ...def,
        suggestedModel,
        provider,
        startingLUM,
        pricingDesc,
      };
    });
  }, [catalogMap]);

  const filteredScenarios = useMemo(() => {
    return selectedCategory === 'all' 
      ? scenarios 
      : scenarios.filter(s => s.category === selectedCategory);
  }, [scenarios, selectedCategory]);

  const current = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const accentColorClass = 
    current.accent === 'purple' 
      ? 'text-luma-purple border-luma-purple/30 bg-luma-purple/10' 
      : current.accent === 'pink' 
      ? 'text-luma-pink border-luma-pink/30 bg-luma-pink/10' 
      : 'text-luma-yellow border-luma-yellow/30 bg-luma-yellow/10';

  const accentTextClass = 
    current.accent === 'purple' 
      ? 'text-luma-purple' 
      : current.accent === 'pink' 
      ? 'text-luma-pink' 
      : 'text-luma-yellow';

  return (
    <section className="relative py-20 lg:py-32 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="guidance" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-950 dark:text-luma-yellow text-xs font-bold shadow-sm">
            <Compass size={14} className="text-luma-yellow" aria-hidden="true" />
            <span>راهنمای انتخاب هوشمند مدل</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            کدام مدل برای ویدئوی شما <span className="text-gradient-animated inline-block pb-1">مناسب‌تر است؟</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            نوع ایراد یا هدف ویدئوی خود را از سناریوهای زیر انتخاب کنید تا بهترین مدل، تعرفه و مشخصات بازسازی را مشاهده نمایید.
          </p>
        </header>

        {/* Filter Tabs by Use Case */}
        <nav aria-label="دسته‌بندی سناریوهای انتخاب مدل" className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md'
                    : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Scenario Selector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredScenarios.map((sc) => {
            const isSelected = sc.id === selectedScenario;
            const IconComponent = sc.icon;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`relative p-5 rounded-[22px] border text-right transition-all duration-200 cursor-pointer flex items-start gap-4 text-zinc-900 dark:text-white overflow-hidden group ${
                  isSelected
                    ? 'bg-white dark:bg-[#12121B] border-luma-purple/60 dark:border-luma-purple/60 shadow-lg ring-1 ring-luma-purple/30'
                    : 'bg-white dark:bg-zinc-900/60 border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-luma-purple/20 text-luma-purple'
                    : 'bg-black/5 dark:bg-white/5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white'
                }`}>
                  <IconComponent size={20} />
                </div>

                <div className="space-y-1.5 w-full min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-bold block leading-snug ${
                      isSelected ? 'text-zinc-950 dark:text-white' : 'text-zinc-800 dark:text-zinc-200'
                    }`}>
                      {sc.shortTitle}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 shrink-0">
                      {sc.startingLUM}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>مدل: <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{sc.suggestedModel}</strong></span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">
                      {sc.categoryBadge}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Diagnostic & Solution Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Card 1: Input Footage Diagnostic */}
          <article aria-label="تشخیص وضعیت ویدئوی ورودی" className="lg:col-span-5 flex flex-col justify-between rounded-[24px] p-6 sm:p-8 bg-white dark:bg-[#0D0D14] border border-black/5 dark:border-white/10 shadow-xl transition-all">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <AlertCircle size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                      تشخیص وضعیت ویدئوی ورودی
                    </h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      بررسی نیاز و چالش‌های فنی سناریو
                    </span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${accentColorClass}`}>
                  {current.categoryBadge}
                </span>
              </div>

              {/* User Goal */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-1.5">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block">
                  هدف شما در این سناریو:
                </span>
                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 leading-relaxed">
                  {current.userGoal}
                </p>
              </div>

              {/* Defect Description */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  نوع ایراد و چالش تصویر:
                </span>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {current.defectType}
                </div>
              </div>

              {/* Input Condition Specs */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  شرایط ویدئوی اولیه:
                </span>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {current.inputCondition}
                </div>
              </div>
            </div>

            {/* Processing Notes */}
            <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-luma-yellow" aria-hidden="true" />
                <span>پشتیبانی از صدای ویدئو</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-luma-pink" aria-hidden="true" />
                <span>پردازش ابری بدون افت</span>
              </span>
            </div>
          </article>

          {/* Card 2: AI Solution & Recommended Model */}
          <article aria-label="راه‌حل هوش مصنوعی و مدل پیشنهادی" className="lg:col-span-7 flex flex-col justify-between rounded-[24px] p-6 sm:p-8 bg-white dark:bg-[#0E0E16] border border-luma-purple/30 shadow-xl transition-all">
            <div className="space-y-6">
              {/* Header: Model & Provider & Starting Price */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-luma-purple/15 text-luma-purple text-xs font-bold border border-luma-purple/30">
                      مدل منتخب کاتالوگ
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      توسعه‌دهنده: <strong className="text-zinc-800 dark:text-zinc-200">{current.provider}</strong>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                    {current.suggestedModel}
                  </h3>
                </div>

                <div className="text-left bg-zinc-100 dark:bg-black/50 px-4 py-2 rounded-2xl border border-black/5 dark:border-white/10">
                  <span className="text-sm font-black text-zinc-950 dark:text-white block">
                    {current.startingLUM}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                    تعرفه رسمی کاتالوگ
                  </span>
                </div>
              </div>

              {/* Why this model is ideal */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/5 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-950 dark:text-white">
                  <Sparkles size={15} className="text-luma-purple" />
                  <span>چرا این مدل برای شما بهترین انتخاب است؟</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                  {current.reason}
                </p>
                {current.pricingDesc && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-black/5 dark:border-white/5">
                    فرمول تعرفه: {current.pricingDesc}
                  </p>
                )}
              </div>

              {/* Metrics & Capability Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-1">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block">شاخص ارتقای کیفیت:</span>
                  <span className={`text-sm font-bold ${accentTextClass} block`}>
                    {current.improvementMetric}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-1">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block">خروجی قابل انتظار:</span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white block truncate">
                    {current.outputCapability}
                  </span>
                </div>
              </div>

              {/* Technical Highlights Checklist */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                  مزایای فنی پردازش با {current.suggestedModel}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                  {current.technicalHighlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <Check size={14} className={`${accentTextClass} shrink-0 mt-0.5`} />
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action CTA */}
            <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <span>امکان تست پیش از اجرای کامل در داشبورد فعال است.</span>
              </div>

              <a
                href="https://dash.lumai.ir/service/upscale-video"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-all duration-200 shadow-md group cursor-pointer"
              >
                <span>اجرای فوری این سناریو با {current.suggestedModel}</span>
                <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        {/* Scenario Overview Quick-Reference Table & Mobile Cards */}
        <div className="rounded-[24px] p-4 sm:p-8 bg-white dark:bg-[#0D0D14] border border-black/5 dark:border-white/10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                جدول مقایسه سریع سناریوها و مدل‌های پیشنهادی
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                در یک نگاه مدل متناسب با هر نوع ویدئو را پیدا کنید
              </p>
            </div>
            <span className="text-xs font-bold text-luma-purple">
              {formatPersianDigits(scenarios.length)} سناریوی تخصصی
            </span>
          </div>

          {/* Mobile View: High-Legibility Card List */}
          <div className="block md:hidden space-y-3">
            {scenarios.map((s) => {
              const isSelected = s.id === selectedScenario;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-luma-purple/10 border-luma-purple/40 shadow-sm'
                      : 'bg-zinc-50 dark:bg-black/30 border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-luma-purple text-zinc-950' : 'bg-black/5 dark:bg-white/10 text-luma-purple'
                      }`}>
                        <s.icon size={16} />
                      </div>
                      <span className="text-xs font-bold text-zinc-950 dark:text-white truncate">
                        {s.shortTitle}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedScenario(s.id);
                      }}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-luma-purple text-zinc-950'
                          : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {isSelected ? 'انتخاب شده' : 'بررسی'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-black/5 dark:border-white/5">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">مدل پیشنهادی:</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{s.suggestedModel}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">تعرفه پایه:</span>
                      <span className="font-bold text-zinc-900 dark:text-white font-mono">{s.startingLUM}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 text-zinc-400">
                  <th className="pb-3 pr-2">عنوان سناریو</th>
                  <th className="pb-3">مدل پیشنهادی</th>
                  <th className="pb-3">توسعه‌دهنده</th>
                  <th className="pb-3">تعرفه پایه</th>
                  <th className="pb-3">دسته فنی</th>
                  <th className="pb-3 pl-2 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {scenarios.map((s) => {
                  const isSelected = s.id === selectedScenario;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedScenario(s.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-luma-purple/10 dark:bg-luma-purple/15 font-bold'
                          : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <td className="py-3.5 pr-2 font-medium text-zinc-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <s.icon size={15} className="text-luma-purple shrink-0" />
                          <span>{s.shortTitle}</span>
                        </div>
                      </td>
                      <td className="py-3.5 font-bold text-zinc-900 dark:text-white">
                        {s.suggestedModel}
                      </td>
                      <td className="py-3.5 text-zinc-500 dark:text-zinc-400">
                        {s.provider}
                      </td>
                      <td className="py-3.5 font-mono text-zinc-900 dark:text-white">
                        {s.startingLUM}
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[11px] text-zinc-600 dark:text-zinc-400">
                          {s.categoryBadge}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedScenario(s.id);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-luma-purple text-zinc-950'
                              : 'bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? 'انتخاب شده' : 'بررسی'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
