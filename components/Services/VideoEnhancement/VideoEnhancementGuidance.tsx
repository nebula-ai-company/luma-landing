import React, { useState } from 'react';
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
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';

const Motion = motion as any;

interface ScenarioConfig {
  id: string;
  icon: any;
  category: 'upscale' | 'fix' | 'fps' | 'generative';
  shortTitle: string;
  userGoal: string;
  suggestedModel: string;
  provider: string;
  startingLUM: string;
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
  { id: 'all', label: 'همه سناریوها (۹)' },
  { id: 'upscale', label: 'افزایش وضوح و ابعاد' },
  { id: 'fix', label: 'اصلاح نویز و لرزش' },
  { id: 'fps', label: 'روان‌سازی فریم و اسلوموشن' },
  { id: 'generative', label: 'احیای فوتیج و ۳D' },
];

const SCENARIOS: ScenarioConfig[] = [
  {
    id: 's1',
    icon: Zap,
    category: 'upscale',
    shortTitle: 'ارتقای سریع و اقتصادی به ۴K',
    userGoal: 'ویدئوی باکیفیت معمولی دارم و می‌خواهم سریع و با کمترین هزینه به ۴K تبدیل شود',
    suggestedModel: 'FlashVSR',
    provider: 'Tencent AI Lab',
    startingLUM: 'شروع از ۱ LUM',
    accent: 'purple',
    categoryBadge: 'اقتصادی و فوق سریع',
    defectType: 'رزولوشن پایین، لبه‌های دندانه‌دار و ماتی استاندارد (SD / 1080p)',
    improvementMetric: '۴ برابر افزایش وضوح و تراکم پیکسلی',
    inputCondition: 'انواع فرمت‌های MP4، MOV با کیفیت 720p یا 1080p',
    outputCapability: 'کیفیت 4K UHD با شارپنس کریستالی و حفظ ۱۰۰٪ صدا',
    reason: 'بالاترین سرعت پردازش و ارزان‌ترین تعرفه میان تمام موتورها با امکان بزرگ‌نمایی ۴ برابری و حفظ کامل تراک صدا.',
    technicalHighlights: [
      'حفظ ۱۰۰٪ صدای اصلی ویدئو بدون فشرده‌سازی مضاعف',
      'کمترین هزینه در بین تمام مدل‌های ارتقای ویدئو',
      'سرعت رندر بسیار بالا مناسب پروژه‌های فوری و حجیم',
      'جلوگیری از تغییر غیرواقعی ساختار صحنه'
    ]
  },
  {
    id: 's2',
    icon: Eye,
    category: 'upscale',
    shortTitle: 'بازسازی چهره و بافت پوست',
    userGoal: 'ویدئوی چهره‌محور، بلاگری یا مصاحبه دارم و بازسازی بافت پوست و مو برایم مهم است',
    suggestedModel: 'SeedVR2 Video Upscaler',
    provider: 'Seed AI Core',
    startingLUM: 'شروع از ۲ LUM',
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
    icon: ShieldCheck,
    category: 'upscale',
    shortTitle: 'وفاداری ۱۰۰٪ به منبع (مستند)',
    userGoal: 'فوتیج مستند، اداری یا صنعتی دارم و نباید هیچ بافت غیرواقعی ایجاد شود',
    suggestedModel: 'Topaz Video Precision',
    provider: 'Topaz Labs',
    startingLUM: 'شروع از ۱۵ LUM',
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
    icon: Activity,
    category: 'fix',
    shortTitle: 'رفع تاری حرکتی و لرزش (Deblur)',
    userGoal: 'ویدئو با گوشی یا در حال حرکت ضبط شده و تاری حرکتی شدید (Motion Blur) دارد',
    suggestedModel: 'Topaz Video Deblur',
    provider: 'Topaz Labs',
    startingLUM: 'شروع از ۱۵ LUM',
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
    icon: Scan,
    category: 'fix',
    shortTitle: 'پاکسازی نویز و ایزوی شب (Denoise)',
    userGoal: 'ویدئو در شب، نور کم یا با ایزوی بالا ضبط شده و نویز و گرین دانه‌ای زیادی دارد',
    suggestedModel: 'Topaz Video Denoise',
    provider: 'Topaz Labs',
    startingLUM: 'شروع از ۳۰ LUM',
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
    icon: Film,
    category: 'fps',
    shortTitle: 'روان‌سازی ۶۰ فریم و اسلوموشن',
    userGoal: 'ویدئوی ۲۴ یا ۳۰ فریم دارم و می‌خواهم حرکات بسیار نرم و ۶۰fps شود یا اسلوموشن بسازم',
    suggestedModel: 'Topaz Video Interpolate',
    provider: 'Topaz Labs',
    startingLUM: 'شروع از ۴۵ LUM',
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
      'هماهنگی کامل فریم‌ریت خروجی با تراک صدا'
    ]
  },
  {
    id: 's7',
    icon: RotateCcw,
    category: 'generative',
    shortTitle: 'احیای فوتیج قدیمی و زیر ۴۸۰p',
    userGoal: 'ویدئوی بسیار قدیمی، کیفیت زیر ۴۸۰p یا فوتیج دوربین مداربسته کم‌کیفیت دارم',
    suggestedModel: 'Topaz Video Generative',
    provider: 'Topaz Labs AI',
    startingLUM: 'شروع از ۱۸۰ LUM',
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
    icon: Sparkles,
    category: 'generative',
    shortTitle: 'تیزر تجاری، انیمیشن و رندر ۳D',
    userGoal: 'تیزر تجاری، انیمیشن یا رندر ۳D دارم و تنظیم دلخواه سطح دقت/خلاقیت می‌خواهم',
    suggestedModel: 'FLUX Video Upscale',
    provider: 'Black Forest Labs',
    startingLUM: 'شروع از ۲۱۰ LUM',
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
    icon: Layers,
    category: 'generative',
    shortTitle: 'تولیدات سینمایی و جزئیات میکروسکوپی',
    userGoal: 'تولیدات سینمایی سطح بالا که نیاز به تزریق بافت‌های میکروسکوپی و حداکثر جزئیات دارند',
    suggestedModel: 'Topaz Video Creative',
    provider: 'Topaz Labs AI',
    startingLUM: 'شروع از ۴۵۰ LUM',
    accent: 'yellow',
    categoryBadge: 'نهایت جزئیات سینمایی',
    defectType: 'کمبود جزئیات میکروسکوپی برای پرده‌های عریض سینما و LED غول‌پیکر',
    improvementMetric: 'تزریق بافت‌های نوری و ماکروسکوپیک 8K',
    inputCondition: 'مستر اولیه ویدئوکلیپ‌ها، تیزرهای تلویزیونی، فوتیج‌های سینمایی',
    outputCapability: 'مسترینگ سینمایی 8K با بافت نوری زنده و بی‌نقص',
    reason: 'قوی‌ترین مدل بازسازی برای نمایش در پرده‌های بزرگ، تلویزیون‌های ۴K/8K با جزئیات نوری و تاروپودهای ماکروسکوپیک تازه.',
    technicalHighlights: [
      'تزریق بافت‌های میکروسکوپی نوری و پارچه‌ای به صحنه',
      'بزرگ‌نمایی بدون افت کیفیت تا رزولوشن 8K',
      'کاهش خطاهای پیکسلی در مقیاس‌های بسیار بزرگ نمایشگاهی',
      'مناسب پروداکشن‌های حرفه‌ای سینما و تلویزیون'
    ]
  },
];

export const VideoEnhancementGuidance: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState<string>('s1');
  const shouldReduceMotion = useReducedMotion();

  const filteredScenarios = selectedCategory === 'all' 
    ? SCENARIOS 
    : SCENARIOS.filter(s => s.category === selectedCategory);

  const current = SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];

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

  const accentBgClass = 
    current.accent === 'purple' 
      ? 'bg-luma-purple/20 text-luma-purple' 
      : current.accent === 'pink' 
      ? 'bg-luma-pink/20 text-luma-pink' 
      : 'bg-luma-yellow/20 text-luma-yellow';

  return (
    <section className="relative py-20 lg:py-32 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="guidance" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-950 dark:text-luma-yellow text-xs font-bold shadow-sm">
            <Compass size={14} className="text-luma-yellow" />
            <span>راهنمای انتخاب هوشمند مدل</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            کدام مدل برای ویدئوی شما <span className="text-gradient-animated inline-block pb-1">مناسب‌تر است؟</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            نوع ایراد یا هدف ویدئوی خود را از سناریوهای زیر انتخاب کنید تا بهترین مدل، تعرفه و مشخصات بازسازی را مشاهده نمایید.
          </p>
        </div>

        {/* Filter Tabs by Use Case */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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
        </div>

        {/* Scenario Selector Cards Grid - Standardized to Match Website Cards (NO top lines!) */}
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

        {/* Selected Scenario Diagnostic & Solution Matrix (Clean 2-Column Responsive Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Card 1: Input Footage Diagnostic (5 Cols on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[24px] p-6 sm:p-8 bg-white dark:bg-[#0D0D14] border border-black/5 dark:border-white/10 shadow-xl transition-all">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <AlertCircle size={17} />
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

            {/* Audio & Frame Guarantee Note */}
            <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-luma-yellow" />
                <span>حفظ ۱۰۰٪ صدای اصلی</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-luma-pink" />
                <span>عدم تغییر کادر و ابعاد</span>
              </span>
            </div>
          </div>

          {/* Card 2: AI Solution & Recommended Model (7 Cols on LG) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[24px] p-6 sm:p-8 bg-white dark:bg-[#0E0E16] border border-luma-purple/30 shadow-xl transition-all">
            <div className="space-y-6">
              
              {/* Header: Model & Provider & Starting Price */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-luma-purple/15 text-luma-purple text-xs font-bold border border-luma-purple/30">
                      مدل منتخب لوما
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
                    محاسبه بر اساس فریم
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
                <span>تست رایگان چند ثانیه اول ویدئو در ابزار فعال است.</span>
              </div>

              <a
                href="https://dash.lumai.ir/service/upscale-video"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-all duration-200 shadow-md group cursor-pointer"
              >
                <span>اجرای فوری این سناریو با {current.suggestedModel}</span>
                <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1" />
              </a>
            </div>
          </div>

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
              مجموع ۹ مدل تخصصی
            </span>
          </div>

          {/* Mobile View: High-Legibility Card List */}
          <div className="block md:hidden space-y-3">
            {SCENARIOS.map((s) => {
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
                  {/* Card Header: Icon + Title + Action Pill */}
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
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-luma-purple text-zinc-950 shadow-sm'
                          : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {isSelected ? 'انتخاب شده' : 'مشاهده'}
                    </button>
                  </div>

                  {/* Card Meta Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/60 dark:bg-zinc-950/60 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">مدل منتخب:</span>
                      <span className="font-bold text-zinc-900 dark:text-white truncate block">
                        {s.suggestedModel}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">توسعه‌دهنده:</span>
                      <span className="text-zinc-600 dark:text-zinc-300 truncate block">
                        {s.provider}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">شاخص ارتقا:</span>
                      <span className="text-zinc-600 dark:text-zinc-300 truncate block">
                        {s.improvementMetric}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">تعرفه شروع:</span>
                      <span className="font-bold text-luma-yellow truncate block">
                        {s.startingLUM}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop / Tablet View: Full Data Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 font-bold">
                  <th className="py-3 px-4">سناریو و هدف کاربر</th>
                  <th className="py-3 px-4">مدل منتخب</th>
                  <th className="py-3 px-4">توسعه‌دهنده</th>
                  <th className="py-3 px-4">شاخص ارتقا</th>
                  <th className="py-3 px-4">تعرفه شروع</th>
                  <th className="py-3 px-4 text-center">انتخاب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {SCENARIOS.map((s) => {
                  const isSelected = s.id === selectedScenario;
                  return (
                    <tr 
                      key={s.id}
                      onClick={() => setSelectedScenario(s.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-luma-purple/10 dark:bg-luma-purple/15 text-zinc-950 dark:text-white font-bold' 
                          : 'hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold">
                        <div className="flex items-center gap-2">
                          <s.icon size={15} className="text-luma-purple shrink-0" />
                          <span>{s.shortTitle}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-zinc-950 dark:text-white">
                        {s.suggestedModel}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400">
                        {s.provider}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-300">
                        {s.improvementMetric}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-white">
                        {s.startingLUM}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedScenario(s.id);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-luma-purple text-zinc-950 shadow-sm'
                              : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/10'
                          }`}
                        >
                          {isSelected ? 'فعال' : 'مشاهده'}
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
