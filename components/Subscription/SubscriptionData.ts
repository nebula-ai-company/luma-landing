export interface StudioPlan {
  id: string;
  name: string;
  priceMonthly: number; // in Tomans
  originalPriceMonthly: number; // pre-discount price in Tomans
  firstPurchasePriceMonthly?: number; // first-purchase discounted price in Tomans
  discountBadge?: string; // explicit discount badge e.g. "۵٪"
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
    name: 'بیسیک',
    priceMonthly: 249000,
    originalPriceMonthly: 249000,
    firstPurchasePriceMonthly: 186750,
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
    priceMonthly: 599000,
    originalPriceMonthly: 641000,
    firstPurchasePriceMonthly: 449250,
    discountBadge: '۵٪',
    extraLumDiscount: '۵٪',
    storage: '۲۰ گیگابایت',
    concurrent: 4,
    earlyAccess: '۷ روز زودتر',
    presets: '۱۰',
    support: 'استاندارد',
  },
  {
    id: 'pro',
    name: 'حرفه‌ای',
    priceMonthly: 1790000,
    originalPriceMonthly: 2110000,
    firstPurchasePriceMonthly: 1342500,
    discountBadge: '۱۵٪',
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
    priceMonthly: 4740000,
    originalPriceMonthly: 6320000,
    firstPurchasePriceMonthly: 3555000,
    discountBadge: '۲۵٪',
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
    earlyAccess: 'دسترسی سازمانی',
    presets: 'سفارشی',
    support: 'شرایط سازمانی براساس نیاز و قرارداد تعیین می‌شود',
    isEnterprise: true,
  }
];

export const CREDIT_FACTS: CreditFacts = {
  vat: '۱۰٪ مالیات بر ارزش افزوده قانونی',
  signupGift: '۵۰۰ لوم هدیهٔ ثبت‌نام (انقضای ۳۰ روزه)',
  referral: '۲۵۰ لوم پاداش پس از اولین خرید دوست + ۵٪ تخفیف برای دوست شما',
  gateway: 'زرین‌پال و شبکه شاپرک',
};
