import React from 'react';
import {
  Image as ImageIcon,
  Video,
  Wand2,
  Shirt,
  Film,
  Maximize2,
  Scissors,
  Volume2,
  Mic,
  MessageSquare,
} from 'lucide-react';

export type PricingCategoryType = 'media' | 'video' | 'chat';

export interface BasePricingCategoryConfig {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  type: PricingCategoryType;
}

export interface MediaPricingCategoryConfig extends BasePricingCategoryConfig {
  type: 'media';
  serviceId: string;
}

export interface VideoPricingCategoryConfig extends BasePricingCategoryConfig {
  type: 'video';
}

export interface ChatPricingCategoryConfig extends BasePricingCategoryConfig {
  type: 'chat';
  serviceId: 'chat';
}

export type PricingCategoryConfig =
  | MediaPricingCategoryConfig
  | VideoPricingCategoryConfig
  | ChatPricingCategoryConfig;

/**
 * Authoritative, user-facing ordering of top-level Pricing categories:
 * 1. ساخت تصویر (generate_image)
 * 2. ساخت ویدیو (grouped: text_to_video, image_to_video, reference_to_video)
 * 3. ویرایش تصویر (edit_image)
 * 4. پرو مجازی (virtual_try_on)
 * 5. ارتقای ویدیو (upscale_video)
 * 6. افزایش کیفیت تصویر (upscale_image)
 * 7. حذف پسزمینه (remove_background)
 * 8. متن به گفتار (text_to_speech)
 * 9. گفتار به متن (speech_to_text)
 * 10. گفتگو (chat)
 */
export const PRICING_CATEGORIES: PricingCategoryConfig[] = [
  {
    id: 'image',
    label: 'ساخت تصویر',
    serviceId: 'generate_image',
    title: 'ساخت تصویر',
    description: 'خلق تصاویر خلاقانه با برترین مدل‌های هوش مصنوعی دنیا بر اساس اعتبار لوم',
    icon: ImageIcon,
    color: 'text-luma-pink',
    type: 'media',
  },
  {
    id: 'video',
    label: 'ساخت ویدیو',
    title: 'ساخت ویدیو',
    description: 'خلق ویدیوهای سینمایی از متن، تصویر یا فایل‌های مرجع. هزینه بر اساس ثانیه، رزولوشن و کیفیت رندر محاسبه می‌شود.',
    icon: Video,
    color: 'text-luma-purple',
    type: 'video',
  },
  {
    id: 'edit',
    label: 'ویرایش تصویر',
    serviceId: 'edit_image',
    title: 'ویرایش تصویر',
    description: 'ویرایش، تغییر سوژه و اصلاح بخش‌های مختلف تصویر با دستورات متنی ساده',
    icon: Wand2,
    color: 'text-luma-purple',
    type: 'media',
  },
  {
    id: 'try-on',
    label: 'پرو مجازی',
    serviceId: 'virtual_try_on',
    title: 'پرو مجازی',
    description: 'پرو و شبیه‌سازی لباس روی تصویر با مدل‌های هوش مصنوعی و تعرفه‌های به‌روز.',
    icon: Shirt,
    color: 'text-luma-pink',
    type: 'media',
  },
  {
    id: 'video-enhancement',
    label: 'ارتقای ویدیو',
    serviceId: 'upscale_video',
    title: 'ارتقای کیفیت ویدیو',
    description: 'ارتقای رزولوشن و جزئیات ویدیو تا 4K با شفافیت بی‌نظیر',
    icon: Film,
    color: 'text-luma-purple',
    type: 'media',
  },
  {
    id: 'upscale',
    label: 'افزایش کیفیت تصویر',
    serviceId: 'upscale_image',
    title: 'افزایش کیفیت تصویر',
    description: 'ارتقای وضوح و جزئیات تصاویر تا کیفیت‌های فوق‌العاده با تکنولوژی Upscale',
    icon: Maximize2,
    color: 'text-luma-yellow',
    type: 'media',
  },
  {
    id: 'remove',
    label: 'حذف پسزمینه',
    serviceId: 'remove_background',
    title: 'حذف پس‌زمینه',
    description: 'جداسازی فوق‌العاده دقیق سوژه از پس‌زمینه در کسری از ثانیه',
    icon: Scissors,
    color: 'text-luma-pink',
    type: 'media',
  },
  {
    id: 'text-to-speech',
    label: 'متن به گفتار',
    serviceId: 'text_to_speech',
    title: 'متن به گفتار',
    description: 'تبدیل متن به صدای طبیعی با مدل‌های مختلف، زبان‌ها و سبک‌های گفتاری.',
    icon: Volume2,
    color: 'text-luma-yellow',
    type: 'media',
  },
  {
    id: 'speech-to-text',
    label: 'گفتار به متن',
    serviceId: 'speech_to_text',
    title: 'گفتار به متن',
    description: 'تبدیل فایل‌های صوتی به متن با تشخیص زبان، گوینده و زمان‌بندی.',
    icon: Mic,
    color: 'text-luma-purple',
    type: 'media',
  },
  {
    id: 'chat',
    label: 'گفتگو',
    serviceId: 'chat',
    title: 'گفتگو با هوش مصنوعی',
    description: 'دسترسی به قدرتمندترین چت‌بات‌های متنی جهان با تعرفه بر پایه توکن',
    icon: MessageSquare,
    color: 'text-luma-purple',
    type: 'chat',
  },
];
