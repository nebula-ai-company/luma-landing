import { 
  Image, 
  Edit, 
  Scissors, 
  Bot, 
  Video, 
  Maximize2, 
  Shirt, 
  MessageSquare,
  ShoppingBag,
  Megaphone,
  PenTool,
  GraduationCap,
  GitBranch
} from 'lucide-react';
import { Service, PricingTier, Solution, GalleryItem } from './types';

export const SERVICES: Service[] = [
  { id: 'img-gen', title: 'ساخت تصویر', description: 'تبدیل متن به تصاویر هنری خیره‌کننده', icon: Image, path: '/service/img-gen' },
  { id: 'img-edit', title: 'ویرایش تصویر', description: 'ویرایش حرفه‌ای تصاویر با دستورات متنی', icon: Edit, path: '/service/img-edit' },
  { id: 'bg-remove', title: 'حذف پس‌زمینه', description: 'حذف هوشمند و دقیق پس‌زمینه تصاویر', icon: Scissors, path: '/service/bg-remove' },
  { id: 'assistant', title: 'دستیار هوشمند', description: 'دستیار همه فن حریف برای کارهای روزمره', icon: Bot, path: '/service/assistant' },
  { id: 'video', title: 'ساخت ویدیو', description: 'خلق ویدیوهای خلاقانه از متن', icon: Video, path: '/service/video' },
  { id: 'upscale', title: 'افزایش کیفیت', description: 'بهبود وضوح و جزئیات تصاویر قدیمی', icon: Maximize2, path: '/service/upscale' },
  { id: 'try-on', title: 'پوشاندن لباس', description: 'پرو مجازی لباس بر روی مدل‌های دلخواه', icon: Shirt, path: '/service/try-on' },
  { id: 'chat', title: 'چت هوشمند', description: 'گفتگو با پیشرفته‌ترین مدل‌های زبانی', icon: MessageSquare, path: '/service/chat' },
  { id: 'workflow', title: 'Workflow', description: 'بوم بصری ساخت فرآیندهای چندمرحله‌ای هوش مصنوعی', icon: GitBranch, path: '/service/workflow', badge: 'جدید' },
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'store',
    title: 'فروشگاه آنلاین',
    description: 'کاهش ۹۰٪ هزینه‌های عکاسی محصول با استودیوی مجازی لوما.',
    points: ['ساخت تصویر محصول در محیط‌های مختلف', 'حذف پس‌زمینه انبوه', 'مدل‌های هوش مصنوعی برای لباس'],
    imageBefore: 'https://picsum.photos/600/400?grayscale',
    imageAfter: 'https://picsum.photos/600/400'
  },
  {
    id: 'ads',
    title: 'آژانس تبلیغاتی',
    description: 'تولید کمپین‌های بصری در کسری از ثانیه.',
    points: ['ایده‌پردازی و استوری‌بورد', 'تولید محتوای ویدیویی', 'تغییر ابعاد هوشمند برای پلتفرم‌ها'],
    imageBefore: 'https://picsum.photos/600/401?grayscale',
    imageAfter: 'https://picsum.photos/600/401'
  },
  {
    id: 'content',
    title: 'تولید محتوا',
    description: 'پایان بلاک خلاقیت با ابزارهای تولید محتوا.',
    points: ['تولید کاور پست وبلاگ', 'نوشتن کپشن و سناریو', 'دوبله و زیرنویس خودکار'],
    imageBefore: 'https://picsum.photos/600/402?grayscale',
    imageAfter: 'https://picsum.photos/600/402'
  },
  {
    id: 'edu',
    title: 'آموزش',
    description: 'شخصی‌سازی تجربه یادگیری برای دانش‌آموزان.',
    points: ['تولید تصاویر آموزشی', 'خلاصه‌سازی متون درسی', 'معلم خصوصی هوشمند'],
    imageBefore: 'https://picsum.photos/600/403?grayscale',
    imageAfter: 'https://picsum.photos/600/403'
  }
];

export const PRICING: PricingTier[] = [
  {
    name: 'پایه',
    price: 1000,
    features: ['دسترسی به تمام سرویس‌ها', 'سرعت استاندارد', 'کیفیت HD', 'پشتیبانی ایمیلی'],
    cta: 'شروع کنید'
  },
  {
    name: 'حرفه‌ای',
    price: 5000,
    isPopular: true,
    features: ['اولویت بالا در پردازش', 'کیفیت 4K', 'API اختصاصی', 'پشتیبانی آنلاین ۲۴/۷', 'ذخیره‌سازی ابری نامحدود'],
    cta: 'خرید اشتراک'
  },
  {
    name: 'سازمانی',
    price: 0, // Custom
    features: ['قرارداد SLA', 'آموزش اختصاصی تیم', 'سرورهای اختصاصی', 'مدل‌های شخصی‌سازی شده'],
    cta: 'تماس بگیرید'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { 
    id: '1', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop', 
    title: 'نئون سایبرپانک',
    prompt: 'خیابان‌های یک شهر سایبرپانک در شب، انعکاس نورهای نئون روی سنگ‌فرش‌های خیس، آسمان‌خراش‌های سر به فلک کشیده با تبلیغات هولوگرافیک، نورپردازی سینمایی، رزولوشن 8k، فوتوگرافیک.', 
    category: 'سه بعدی',
    model: 'Luma Dream v2.5',
    date: '۱۵ فروردین ۱۴۰۳',
    aspectRatio: 'landscape',
    dimensions: '1920x1080'
  },
  { 
    id: '2', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop', 
    title: 'پرتره انتزاعی',
    prompt: 'نقاشی رنگ روغن انتزاعی از چهره انسان که در اشکال هندسی حل می‌شود، رنگ‌های زنده، قلم‌موهای اکسپرسیو، سبک سورئالیسم.', 
    category: 'هنر دیجیتال',
    model: 'Luma Art XL',
    date: '۲ اردیبهشت ۱۴۰۳',
    aspectRatio: 'portrait',
    dimensions: '1024x1792'
  },
  { 
    id: '3', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1440557653017-d39f46ee36f6?q=80&w=2076&auto=format&fit=crop', 
    title: 'جنگل مه آلود',
    prompt: 'نمای هوایی از جنگل کاج انبوه پوشیده در مه صبحگاهی، اتمسفر غمگین، درجه‌بندی رنگ سینمایی، سبک نشنال جئوگرافیک.', 
    category: 'عکاسی',
    model: 'Luma Real 4.0',
    date: '۱۰ اردیبهشت ۱۴۰۳',
    aspectRatio: 'landscape',
    dimensions: '3840x2160'
  },
  { 
    id: '4', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop', 
    title: 'فضانورد گمشده',
    prompt: 'فضانوردی که تنها در یک سیاره کویری سرخ ایستاده و به سیاره‌ای غول‌پیکر حلقه‌دار در آسمان نگاه می‌کند، کانسپت آرت علمی-تخیلی، با جزئیات دقیق.', 
    category: 'کانسپت',
    model: 'Luma Dream v2.5',
    date: '۱۲ اردیبهشت ۱۴۰۳',
    aspectRatio: 'square',
    dimensions: '1024x1024'
  },
  { 
    id: '5', 
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop', 
    title: 'شبیه‌سازی مایعات',
    prompt: 'شات ماکرو اسلوموشن از قطره جوهر رنگی که در آب می‌چکد، چرخش و ترکیب رنگ‌ها، تولید ویدیو 4k، نرخ فریم بالا.', 
    category: 'موشن',
    model: 'Luma Video Pro',
    date: '۱۸ اردیبهشت ۱۴۰۳',
    aspectRatio: 'portrait',
    dimensions: '1080x1920'
  },
  { 
    id: '6', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop', 
    title: 'معماری نئوکلاسیک',
    prompt: 'فضای داخلی یک کتابخانه بزرگ نئوکلاسیک با سقف‌های بلند، قفسه‌های پر از کتاب‌های درخشان، ذرات گرد و غبار معلق در پرتوهای نور.', 
    category: 'معماری',
    model: 'Luma Real 4.0',
    date: '۲۰ اردیبهشت ۱۴۰۳',
    aspectRatio: 'landscape',
    dimensions: '2560x1440'
  },
  { 
    id: '7', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1887&auto=format&fit=crop', 
    title: 'پرتره استودیویی',
    prompt: 'پرتره استودیویی حرفه‌ای از یک زن با آرایش آوانگارد، نورپردازی دراماتیک، نورپردازی رامبراند، لنز ۸۵ میلی‌متری.', 
    category: 'عکاسی',
    model: 'Luma Real 4.0',
    date: '۲۵ اردیبهشت ۱۴۰۳',
    aspectRatio: 'portrait',
    dimensions: '1080x1350'
  },
  { 
    id: '8', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop', 
    title: 'شهر مینیاتوری',
    prompt: 'نمای ایزومتریک از یک شهر مینیاتوری بامزه ساخته شده از خمیر، افکت تیلت-شیفت، رنگ‌های پاستلی ملایم، سبک رندر سه بعدی.', 
    category: 'سه بعدی',
    model: 'Luma Art XL',
    date: '۲۸ اردیبهشت ۱۴۰۳',
    aspectRatio: 'square',
    dimensions: '1024x1024'
  },
   { 
    id: '9', 
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1614730341194-75c6074065db?q=80&w=1974&auto=format&fit=crop', 
    title: 'گربه سامورایی',
    prompt: 'یک گربه پشمالو که زره سامورایی پرجزییاتی پوشیده، ایستاده در جنگل شکوفه‌های گیلاس، نورپردازی حماسی، بسیار دقیق، 8k.', 
    category: 'کاراکتر',
    model: 'Luma Dream v2.5',
    date: '۱ خرداد ۱۴۰۳',
    aspectRatio: 'portrait',
    dimensions: '1024x1792'
  },
];