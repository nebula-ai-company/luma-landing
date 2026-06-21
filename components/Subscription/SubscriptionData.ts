export interface StudioPlan {
  id: string;
  name: string;
  priceMonthly: number; // in Tomans
  lumIncluded: number; // LUM/month
  extraLumDiscount: string; // e.g., "0%", "5%"
  storage: string;
  concurrent: number;
  earlyAccess: string;
  presets: string;
  support: string;
  recommended?: boolean;
}

export interface AssistantPlan {
  id: string;
  name: string;
  price: string;
  unit: string;
  messages: string;
  files: string;
  models: string;
  recommended?: boolean;
}

export interface CreditFacts {
  lumRate: string;
  vat: string;
  signupGift: string;
  referral: string;
  gateway: string;
}

export const STUDIO_PLANS: StudioPlan[] = [
  {
    id: 'basic',
    name: 'پایه',
    priceMonthly: 199000,
    lumIncluded: 600,
    extraLumDiscount: '۰٪',
    storage: '۵ گیگابایت',
    concurrent: 2,
    earlyAccess: '—',
    presets: '۳',
    support: 'استاندارد',
  },
  {
    id: 'plus',
    name: 'پلاس',
    priceMonthly: 499000,
    lumIncluded: 1600,
    extraLumDiscount: '۵٪',
    storage: '۲۰ گیگابایت',
    concurrent: 4,
    earlyAccess: '۷ روز',
    presets: '۱۰',
    support: 'استاندارد',
  },
  {
    id: 'pro',
    name: 'پرو',
    priceMonthly: 1490000,
    lumIncluded: 5200,
    extraLumDiscount: '۱۵٪',
    storage: '۵۰ گیگابایت',
    concurrent: 10,
    earlyAccess: '۷ روز',
    presets: '۳۰',
    support: 'اولویت‌دار',
    recommended: true,
  },
  {
    id: 'max',
    name: 'مکس',
    priceMonthly: 3990000,
    lumIncluded: 15600,
    extraLumDiscount: '۲۵٪',
    storage: '۲۰۰ گیگابایت',
    concurrent: 25,
    earlyAccess: '۱۴ روز',
    presets: 'نامحدود',
    support: 'اختصاصی',
  }
];

export const ASSISTANT_PLANS: AssistantPlan[] = [
  {
    id: 'free',
    name: 'رایگان',
    price: '۰',
    unit: 'رایگان',
    messages: '۵۰ پیام/ماه',
    files: '۳ فایل (۶ مگابایت)',
    models: '۳ مدل',
  },
  {
    id: 'plus',
    name: 'پلاس',
    price: '۵٬۰۰۰',
    unit: 'لوم/ماه',
    messages: '۲٬۰۰۰ پیام/ماه',
    files: '۱۰ فایل (۳۰ مگابایت)',
    models: '۵ مدل',
    recommended: true,
  },
  {
    id: 'pro',
    name: 'حرفه‌ای',
    price: '۲۵٬۰۰۰',
    unit: 'لوم/ماه',
    messages: '۱۰٬۰۰۰ پیام/ماه',
    files: '۵۰ فایل (۵۰۰ مگابایت)',
    models: '۹ مدل',
  },
  {
    id: 'enterprise',
    name: 'سازمانی',
    price: 'توافقی',
    unit: 'تماس بگیرید',
    messages: 'نامحدود',
    files: 'نامحدود',
    models: 'نامحدود',
  }
];

export const CREDIT_FACTS: CreditFacts = {
  lumRate: '۱ لوم = ۳۴۰ تومان',
  vat: '۱۰٪ مالیات بر ارزش افزوده',
  signupGift: '۵۰۰ لوم هدیهٔ ثبت‌نام (انقضای ۳۰ روزه)',
  referral: '۲۵۰ لوم پاداش پس از اولین خرید دوست + ۵٪ تخفیف برای دوست شما',
  gateway: 'زرین‌پال',
};
