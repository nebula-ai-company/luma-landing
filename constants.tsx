import { 
  Image, 
  Edit, 
  Scissors, 
  Bot, 
  Video, 
  Maximize2, 
  Shirt, 
  MessageSquare,
  GitBranch,
  AudioLines
} from 'lucide-react';
import { Service } from './types';

export const SERVICES: Service[] = [
  { id: 'img-gen', title: 'ساخت تصویر', description: 'تبدیل متن به تصاویر هنری خیره‌کننده', icon: Image, path: '/service/img-gen' },
  { id: 'img-edit', title: 'ویرایش تصویر', description: 'ویرایش حرفه‌ای تصاویر با دستورات متنی', icon: Edit, path: '/service/img-edit' },
  { id: 'bg-remove', title: 'حذف پس‌زمینه', description: 'حذف هوشمند و دقیق پس‌زمینه تصاویر', icon: Scissors, path: '/service/bg-remove' },
  { id: 'assistant', title: 'دستیار هوشمند', description: 'دستیار همه فن حریف برای کارهای روزمره', icon: Bot, path: '/service/assistant' },
  { id: 'video', title: 'ساخت ویدیو', description: 'خلق ویدیوهای خلاقانه از متن', icon: Video, path: '/service/video' },
  { id: 'text-to-speech', title: 'تبدیل متن به گفتار', description: 'تبدیل متن فارسی و چندزبانه به صدای طبیعی و حرفه‌ای', icon: AudioLines, path: '/service/text-to-speech', badge: 'جدید' },
  { id: 'upscale', title: 'افزایش کیفیت', description: 'بهبود وضوح و جزئیات تصاویر قدیمی', icon: Maximize2, path: '/service/upscale' },
  { id: 'try-on', title: 'پوشاندن لباس', description: 'پرو مجازی لباس بر روی مدل‌های دلخواه', icon: Shirt, path: '/service/try-on' },
  { id: 'chat', title: 'چت هوشمند', description: 'گفتگو با پیشرفته‌ترین مدل‌های زبانی', icon: MessageSquare, path: '/service/chat' },
  { id: 'workflow', title: 'ورک‌فلوها', description: 'بوم بصری ساخت فرآیندهای چندمرحله‌ای هوش مصنوعی', icon: GitBranch, path: '/service/workflow' },
];
