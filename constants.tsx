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
  GraduationCap
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
  { id: '1', imageUrl: 'https://picsum.photos/id/10/400/600', prompt: 'منظره فضایی', category: 'Image' },
  { id: '2', imageUrl: 'https://picsum.photos/id/20/400/400', prompt: 'پرتره سایبرپانک', category: 'Image' },
  { id: '3', imageUrl: 'https://picsum.photos/id/30/600/400', prompt: 'معماری مدرن', category: 'Image' },
  { id: '4', imageUrl: 'https://picsum.photos/id/40/400/500', prompt: 'طبیعت بکر', category: 'Image' },
  { id: '5', imageUrl: 'https://picsum.photos/id/50/400/400', prompt: 'نقاشی روغنی', category: 'Image' },
  { id: '6', imageUrl: 'https://picsum.photos/id/60/400/600', prompt: 'کاراکتر بازی', category: 'Image' },
];