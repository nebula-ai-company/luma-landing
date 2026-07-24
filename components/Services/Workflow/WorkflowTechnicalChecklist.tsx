import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Layers, Cpu, ArrowLeftRight, RotateCcw, GitFork, 
  Activity, Globe, Coins, ShieldCheck, HelpCircle, 
  ChevronDown, Sparkles
} from 'lucide-react';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';
import { WorkflowCard } from './WorkflowCard';

const Motion = motion as any;

interface ChecklistItem {
  id: string;
  title: string;
  icon: React.ElementType;
  accentColor: string;
  description: string;
  details: string[];
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'target-audience',
    title: 'مخاطبان هدف',
    icon: Users,
    accentColor: '#DA8FFF',
    description: 'طراحی‌شده برای تمامی افرادی که با تولید محتوا و پردازش متوالی سرکار دارند:',
    details: [
      'تولیدکنندگان محتوای متنی، تصویری و ویدیویی شبکه‌های اجتماعی',
      'تیم‌های دیجیتال مارکتینگ و آژانس‌های تبلیغاتی',
      'توسعه‌دهندگان نرم‌افزار جهت اتوماسیون فرآیندهای هوش مصنوعی',
      'کسب‌وکارهای آنلاین برای استانداردسازی خط تولید محتوا'
    ]
  },
  {
    id: 'templates',
    title: 'الگوها و نقاط شروع',
    icon: Layers,
    accentColor: '#FF6482',
    description: 'امکان شروع سریع بدون نیاز به ساخت بوم کاملاً خالی:',
    details: [
      'الگوی ساخت خودکار پست اینستاگرام (متن + تصویر + افزایش کیفیت)',
      'الگوی تولید مقاله و خلاصه‌سازی محتوای وبلاگ با تصویر هدر',
      'الگوی بازسازی و ارتقای تصویر محصول برای فروشگاه‌های آنلاین',
      'امکان ذخیره فرآیندهای شخصی به‌عنوان الگوی اختصاصی حساب'
    ]
  },
  {
    id: 'node-categories',
    title: 'دسته‌بندی بخش‌ها',
    icon: Cpu,
    accentColor: '#FFC964',
    description: 'کتابخانه‌ای جامع از انواع گام‌های عملیاتی متصل به موتور لوما:',
    details: [
      'گام ورودی: متن ساده، متغیرهای ورودی، فایل و تصویر',
      'گام مدل زبانی: پردازش متن، خلاصه‌سازی و ایده‌پردازی',
      'گام ساخت تصویر: تولید تصویر هوشمند بر اساس توضیحات متنی',
      'گام ابزارهای لوما: حذف پس‌زمینه، افزایش کیفیت و پرو لباس',
      'گام خروجی: ذخیره فایل، ارائه پاسخ متنی و ارسال داده'
    ]
  },
  {
    id: 'data-passing',
    title: 'انتقال داده‌ها بین مراحل',
    icon: ArrowLeftRight,
    accentColor: '#DA8FFF',
    description: 'مکانیسم هماهنگ انتقال داده‌ها بین بخش‌های متوالی روی بوم:',
    details: [
      'انتقال رشته‌های متنی و متغیرهای تعریف‌شده',
      'انتقال آدرس اینترنتی و خروجی تصویری بخش‌ها',
      'انتقال فایل‌های ورودی و خروجی بدون افت کیفیت',
      'انتقال ساختارهای متنی بین بخش‌های تحلیل متن و ابزارها'
    ]
  },
  {
    id: 'error-handling',
    title: 'مدیریت خطا و تلاش مجدد',
    icon: RotateCcw,
    accentColor: '#FF6482',
    description: 'سیاست‌های پیشنهادی مدیریت قطعی و خطاهای احتمالی بخش‌ها:',
    details: [
      'تلاش مجدد خودکار تا ۳ مرتبه در صورت قطعی ارتباط با مدل‌ها',
      'تعیین بخش جایگزین در صورت عدم پاسخگویی یک مدل',
      'توقف ایمن فرآیند و نمایش دقیق بخش خطادار به کاربر روی بوم بصری',
      'امکان ادامه اجرای ورک‌فلو از آخرین بخش موفق بدون نیاز به شروع مجدد'
    ]
  },
  {
    id: 'testing-versioning',
    title: 'تست و نسخه‌بندی',
    icon: GitFork,
    accentColor: '#FFC964',
    description: 'قابلیت‌های توسعه و بازبینی ورک‌فلوها:',
    details: [
      'حالت تست سریع برای بررسی نحوه عملکرد بخش‌ها بدون کسر اعتبار کامل',
      'تفکیک پیش‌نویس از نسخه نهایی منتشرشده',
      'ذخیره تاریخچه تغییرات و امکان بازگشت به نسخه‌های قبلی',
      'محیط ایزوله برای آزمایش ورودی‌های نمونه پیش از ثبت نهایی'
    ]
  },
  {
    id: 'monitoring-history',
    title: 'پایش و تاریخچه اجرا',
    icon: Activity,
    accentColor: '#DA8FFF',
    description: 'مشاهده گزارش اجراها و وضعیت مصرف منابع:',
    details: [
      'ثبت گزارش‌های کامل اجرای هر فرآیند به همراه زمان شروع و پایان',
      'نمایش نرخ موفقیت اجراها و متوسط زمان پردازش هر بخش',
      'داشبورد گزارش میزان مصرف اعتبار تفکیک‌شده به ازای هر اجرا',
      'مدت زمان نگهداری گزارش‌های اجرا در پایگاه داده'
    ]
  },
  {
    id: 'api-integration',
    title: 'یکپارچه‌سازی و اتصال نرم‌افزاری',
    icon: Globe,
    accentColor: '#FF6482',
    description: 'امکان اتصال به سامانه‌های بیرونی و اتوماسیون سازمانی:',
    details: [
      'ارائه نقطه اتصال اختصاصی به ازای هر ورک‌فلو ساخته‌شده',
      'احراز هویت امن با کلید دسترسی اختصاصی لوما',
      'امکان ارسال داده‌های ورودی سفارشی در بدنه درخواست‌ها',
      'پشتیبانی از فراخوانی بازگشتی جهت دریافت خروجی‌های زمان‌بر'
    ]
  },
  {
    id: 'credit-behavior',
    title: 'محاسبه اعتبار و هزینه‌ها',
    icon: Coins,
    accentColor: '#FFC964',
    description: 'شفافیت کامل در نحوه محاسبه هزینه اجرای هر ورک‌فلو:',
    details: [
      'هزینه کل اجرا برابر است با مجموع اعتبار مصرفی بخش‌های فعال',
      'عدم کسر اعتبار برای بخش‌های غیرفعال یا مسیرهای اجرا نشده',
      'نمایش برآورد دقیق هزینه پیش از شروع اجرای ورک‌فلو',
      'لینک مستقیم به بخش تعرفه‌ها و شارژ حساب در داشبورد لوما'
    ]
  },
  {
    id: 'security-privacy',
    title: 'امنیت و حریم داده‌ها',
    icon: ShieldCheck,
    accentColor: '#DA8FFF',
    description: 'استانداردهای حفاظتی اطلاعات کاربران در ورک‌فلوها:',
    details: [
      'ارتباط تماماً رمزنگاری‌شده بر پایه پروتکل‌های امنیتی روز',
      'ایزوله‌سازی کامل فضای اجرای ورک‌فلو هر کاربر از سایرین',
      'عدم استفاده از محتوا و متون کاربران برای آموزش مدل‌ها',
      'امکان حذف کامل داده‌های موقت و فایل‌های ورودی پس از اتمام پردازش'
    ]
  },
  {
    id: 'limitations',
    title: 'پارامترها و سقف‌های فنی',
    icon: Cpu,
    accentColor: '#FF6482',
    description: 'سقف‌ها و استانداردهای فنی بوم بصری:',
    details: [
      'پشتیبانی از پردازش چندگانه بخش‌های همزمان در یک بوم',
      'پشتیبانی از فایل‌های تصویری و ویدیویی با کیفیت بالا',
      'اجرای همزمان با کلیدهای دسترسی اختصاصی',
      'زمان پاسخگویی بهینه‌سازی‌شده در پردازش‌های سنگین'
    ]
  }
];

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'ورک‌فلو چیست و چه فرقی با ابزارهای معمولی لوما دارد؟',
    a: 'در ابزارهای معمولی لوما شما هر فرآیند (مثل ساخت متن یا تصویر) را به‌صورت جداگانه انجام می‌دهید. اما در ورک‌فلو می‌توانید چندین مدل و ابزار را روی یک بوم بصری به یکدیگر وصل کنید تا خروجی یک مرحله به‌طور خودکار به ورودی مرحله بعد تبدیل شود.'
  },
  {
    q: 'آیا برای ساخت ورک‌فلو نیازی به کدنویسی است؟',
    a: 'خیر، بوم بصری لوما کاملاً بدون نیاز به کدنویسی طراحی شده است. شما تنها با کشیدن و رها کردن بخش‌ها و اتصال آن‌ها به یکدیگر می‌توانید فرآیندهای پیچیده هوش مصنوعی بسازید.'
  },
  {
    q: 'هزینه اجرای یک ورک‌فلو چگونه محاسبه می‌شود؟',
    a: 'هزینه اجرا دقیقاً شفاف است؛ مجموع اعتبار مصرفی تمام بخش‌هایی که در آن اجرا فعال بوده‌اند محاسبه و از اعتبار حساب شما کسر می‌شود. پیش از اجرا می‌توانید تخمین اعتبار مصرفی را مشاهده کنید.'
  },
  {
    q: 'چگونه می‌توانم ورک‌فلو ساخته‌شده را در وب‌سایت یا برنامه خود استفاده کنم؟',
    a: 'هر ورک‌فلو پس از انتشار دارای یک آدرس اختصاصی و کلید دسترسی خواهد بود. شما می‌توانید از طریق کد نرم‌افزار خود داده‌ها را ارسال کرده و خروجی نهایی را دریافت کنید.'
  },
  {
    q: 'آیا می‌توانم ورک‌فلوهای خود را با اعضای تیم به اشتراک بگذارم؟',
    a: 'بله، امکان اشتراک‌گذاری خصوصی با اعضای تیم یا انتشار لینک عمومی جهت استفاده سایر کاربران در محیط لوما وجود دارد.'
  }
];

export const WorkflowTechnicalChecklist: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden transition-colors duration-300">
      <WorkflowSectionBackground variant="execution" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir="rtl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-4"
          >
            <Sparkles size={12} className="text-luma-purple" />
            <span>مستندات و بررسی فنی</span>
          </Motion.div>

          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white leading-tight tracking-tighter mb-4 font-sans break-keep"
          >
            شناسنامه فنی و سوالات متداول
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed"
          >
            بررسی جامع قابلیت‌ها، استانداردهای فنی و سوالات متداول ورک‌فلوها
          </Motion.p>
        </div>

        {/* 1. Technical Checklist Grid with WorkflowCard interactive hover glow */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <WorkflowCard
                key={item.id}
                accentColor={item.accentColor}
                index={idx}
                className="h-full"
                contentClassName="p-6 sm:p-7 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Item Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${item.accentColor}15`,
                        borderColor: `${item.accentColor}30`,
                        color: item.accentColor
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400 mb-4 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet list */}
                  <ul className="space-y-2">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-zinc-600 dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-luma-purple shrink-0 mt-1.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </WorkflowCard>
            );
          })}
        </div>

        {/* 2. FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 font-sans">
              سوالات متداول ورک‌فلوها
            </h3>
            <p className="text-sm text-zinc-500 dark:text-gray-400">
              پاسخ به رایج‌ترین ابهامات شما درباره ساخت و اجرای ورک‌فلوها
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl border border-zinc-200/60 dark:border-white/5 bg-white dark:bg-[#0d0d0d] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-luma-purple shrink-0" />
                      <span className="text-base font-bold text-zinc-900 dark:text-gray-100 font-sans">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-luma-purple' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed border-t border-zinc-100 dark:border-white/5">
                          {faq.a}
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </Motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

