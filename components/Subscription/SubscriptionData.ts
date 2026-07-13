export interface StudioPlan {
  id: string;
  name: string;
  priceMonthly: number; // in Tomans
  originalPriceMonthly: number; // pre-discount price in Tomans
  lumIncluded: number; // LUM/month
  extraLumDiscount: string; // e.g., "0%", "5%"
  storage: string;
  concurrent: number;
  earlyAccess: string;
  presets: string;
  support: string;
  recommended?: boolean;
  isEnterprise?: boolean;
}

export interface CreditFacts {
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
    originalPriceMonthly: 199000,
    lumIncluded: 600,
    extraLumDiscount: 'بدون تخفیف',
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
    originalPriceMonthly: 525000,
    lumIncluded: 1600,
    extraLumDiscount: '۵٪',
    storage: '۲۰ گیگابایت',
    concurrent: 4,
    earlyAccess: '۷ روز زودتر',
    presets: '۱۰',
    support: 'استاندارد',
  },
  {
    id: 'pro',
    name: 'پرو',
    priceMonthly: 1490000,
    originalPriceMonthly: 1750000,
    lumIncluded: 5200,
    extraLumDiscount: '۱۵٪',
    storage: '۵۰ گیگابایت',
    concurrent: 10,
    earlyAccess: '۷ روز زودتر',
    presets: '۳۰',
    support: 'الویت‌دار',
    recommended: true,
  },
  {
    id: 'max',
    name: 'مکس',
    priceMonthly: 3990000,
    originalPriceMonthly: 5320000,
    lumIncluded: 15600,
    extraLumDiscount: '۲۵٪',
    storage: '۲00 گیگابایت',
    concurrent: 25,
    earlyAccess: '۱۴ روز زودتر',
    presets: 'نامحدود',
    support: 'اختصاصی',
  },
  {
    id: 'enterprise',
    name: 'سازمانی',
    priceMonthly: 0,
    originalPriceMonthly: 0,
    lumIncluded: 0, // customized / call us
    extraLumDiscount: 'سفارشی',
    storage: 'سفارشی',
    concurrent: 0, // customized
    earlyAccess: 'دسترسی آنی و اختصاصی',
    presets: 'نامحدود',
    support: 'اختصاصی ۲۴/۷ + SLA',
    isEnterprise: true,
  }
];

export const CREDIT_FACTS: CreditFacts = {
  vat: '۱۰٪ مالیات بر ارزش افزوده',
  signupGift: '۵۰۰ لوم هدیهٔ ثبت‌نام (انقضای ۳۰ روزه)',
  referral: '۲۵۰ لوم پاداش پس از اولین خرید دوست + ۵٪ تخفیف برای دوست شما',
  gateway: 'زرین‌پال',
};
