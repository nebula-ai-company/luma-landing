import { useEffect, useRef } from 'react';

/**
 * Reusable SEO Metadata Foundation for Luma AI
 * Pure client-side implementation with deterministic single-owner synchronization,
 * route fallback support, page override precedence, and safe tag lifecycle management.
 */

export interface PageMetadata {
  title?: string;
  description?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player' | string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  image?: string;
  canonical?: string;
}

export const SEO_TAG_ATTR = 'data-luma-seo';
export const SEO_TAG_VALUE = 'true';

// Fallback title strictly preserved from index.html
export const DEFAULT_TITLE = 'لوما - پیشگام هوش مصنوعی در ایران';

/**
 * Registry of routes that have verified, approved metadata in this task.
 * Routes not explicitly registered here fallback to DEFAULT_TITLE with no invented metadata.
 */
export const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    description:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogTitle: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    ogDescription:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    twitterDescription:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
  },
  '/services': {
    title: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    description:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogTitle: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    ogDescription:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    twitterDescription:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
  },
  '/service/img-gen': {
    title: 'لوما | ساخت تصویر با هوش مصنوعی',
    description:
      'با سرویس ساخت تصویر لوما، ایده‌های خود را از متن به تصویر تبدیل کنید و برای خلق آثار دیجیتال از مدل‌های گوناگون هوش مصنوعی استفاده کنید.',
    ogTitle: 'لوما | ساخت تصویر با هوش مصنوعی',
    ogDescription:
      'با سرویس ساخت تصویر لوما، ایده‌های خود را از متن به تصویر تبدیل کنید و برای خلق آثار دیجیتال از مدل‌های گوناگون هوش مصنوعی استفاده کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | ساخت تصویر با هوش مصنوعی',
    twitterDescription:
      'با سرویس ساخت تصویر لوما، ایده‌های خود را از متن به تصویر تبدیل کنید و برای خلق آثار دیجیتال از مدل‌های گوناگون هوش مصنوعی استفاده کنید.',
  },
  '/service/img-edit': {
    title: 'لوما | ویرایش تصویر با هوش مصنوعی',
    description:
      'با ویرایش تصویر لوما، اشیا را حذف یا جایگزین کنید، تصاویر را با متن تغییر دهید و نور، رنگ و ترکیب‌بندی را دقیق‌تر کنترل کنید.',
    ogTitle: 'لوما | ویرایش تصویر با هوش مصنوعی',
    ogDescription:
      'با ویرایش تصویر لوما، اشیا را حذف یا جایگزین کنید، تصاویر را با متن تغییر دهید و نور، رنگ و ترکیب‌بندی را دقیق‌تر کنترل کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | ویرایش تصویر با هوش مصنوعی',
    twitterDescription:
      'با ویرایش تصویر لوما، اشیا را حذف یا جایگزین کنید، تصاویر را با متن تغییر دهید و نور، رنگ و ترکیب‌بندی را دقیق‌تر کنترل کنید.',
  },
  '/service/bg-remove': {
    title: 'لوما | حذف پس‌زمینه عکس با هوش مصنوعی',
    description:
      'با ابزار حذف پس‌زمینه لوما، سوژه را با یک کلیک از تصویر جدا کنید و برای عکس‌های محصول، پرتره و تبلیغات خروجی شفاف بگیرید.',
    ogTitle: 'لوما | حذف پس‌زمینه عکس با هوش مصنوعی',
    ogDescription:
      'با ابزار حذف پس‌زمینه لوما، سوژه را با یک کلیک از تصویر جدا کنید و برای عکس‌های محصول، پرتره و تبلیغات خروجی شفاف بگیرید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | حذف پس‌زمینه عکس با هوش مصنوعی',
    twitterDescription:
      'با ابزار حذف پس‌زمینه لوما، سوژه را با یک کلیک از تصویر جدا کنید و برای عکس‌های محصول، پرتره و تبلیغات خروجی شفاف بگیرید.',
  },
  '/service/video': {
    title: 'لوما | ساخت ویدیو با هوش مصنوعی',
    description:
      'با سرویس ساخت ویدیو لوما، از متن و تصویر ویدیو بسازید یا با استفاده از ویدیوهای مرجع، محتوای متحرک خلق کنید.',
    ogTitle: 'لوما | ساخت ویدیو با هوش مصنوعی',
    ogDescription:
      'با سرویس ساخت ویدیو لوما، از متن و تصویر ویدیو بسازید یا با استفاده از ویدیوهای مرجع، محتوای متحرک خلق کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | ساخت ویدیو با هوش مصنوعی',
    twitterDescription:
      'با سرویس ساخت ویدیو لوما، از متن و تصویر ویدیو بسازید یا با استفاده از ویدیوهای مرجع، محتوای متحرک خلق کنید.',
  },
  '/service/upscale': {
    title: 'لوما | افزایش کیفیت تصویر با هوش مصنوعی',
    description:
      'با ابزار افزایش کیفیت تصویر لوما، وضوح و جزئیات تصاویر را بهبود دهید، نویز را حذف کنید و عکس‌های قدیمی را بازسازی کنید.',
    ogTitle: 'لوما | افزایش کیفیت تصویر با هوش مصنوعی',
    ogDescription:
      'با ابزار افزایش کیفیت تصویر لوما، وضوح و جزئیات تصاویر را بهبود دهید، نویز را حذف کنید و عکس‌های قدیمی را بازسازی کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | افزایش کیفیت تصویر با هوش مصنوعی',
    twitterDescription:
      'با ابزار افزایش کیفیت تصویر لوما، وضوح و جزئیات تصاویر را بهبود دهید، نویز را حذف کنید و عکس‌های قدیمی را بازسازی کنید.',
  },
  '/service/assistant': {
    title: 'لوما | ساخت دستیار هوشمند برای پشتیبانی مشتریان',
    description:
      'با ساخت دستیار هوشمند لوما، نماینده‌ای ۲۴ ساعته بسازید که با مطالعه مستندات و وب‌سایت شما به سؤال‌های مشتریان پاسخ می‌دهد.',
    ogTitle: 'لوما | ساخت دستیار هوشمند برای پشتیبانی مشتریان',
    ogDescription:
      'با ساخت دستیار هوشمند لوما، نماینده‌ای ۲۴ ساعته بسازید که با مطالعه مستندات و وب‌سایت شما به سؤال‌های مشتریان پاسخ می‌دهد.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | ساخت دستیار هوشمند برای پشتیبانی مشتریان',
    twitterDescription:
      'با ساخت دستیار هوشمند لوما، نماینده‌ای ۲۴ ساعته بسازید که با مطالعه مستندات و وب‌سایت شما به سؤال‌های مشتریان پاسخ می‌دهد.',
  },
  '/service/chat': {
    title: 'لوما | چت هوشمند با هوش مصنوعی',
    description:
      'با چت هوشمند لوما درباره موضوعات مختلف گفتگو کنید، پاسخ بگیرید و از ابزارهای متنی هوش مصنوعی در محیطی یکپارچه استفاده کنید.',
    ogTitle: 'لوما | چت هوشمند با هوش مصنوعی',
    ogDescription:
      'با چت هوشمند لوما درباره موضوعات مختلف گفتگو کنید، پاسخ بگیرید و از ابزارهای متنی هوش مصنوعی در محیطی یکپارچه استفاده کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | چت هوشمند با هوش مصنوعی',
    twitterDescription:
      'با چت هوشمند لوما درباره موضوعات مختلف گفتگو کنید، پاسخ بگیرید و از ابزارهای متنی هوش مصنوعی در محیطی یکپارچه استفاده کنید.',
  },
  '/service/try-on': {
    title: 'لوما | پوشاندن لباس با هوش مصنوعی',
    description:
      'با ابزار پوشاندن لباس لوما، لباس‌های مختلف را به‌صورت مجازی روی تصویر امتحان کنید و نتیجه را سریع‌تر بررسی کنید.',
    ogTitle: 'لوما | پوشاندن لباس با هوش مصنوعی',
    ogDescription:
      'با ابزار پوشاندن لباس لوما، لباس‌های مختلف را به‌صورت مجازی روی تصویر امتحان کنید و نتیجه را سریع‌تر بررسی کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | پوشاندن لباس با هوش مصنوعی',
    twitterDescription:
      'با ابزار پوشاندن لباس لوما، لباس‌های مختلف را به‌صورت مجازی روی تصویر امتحان کنید و نتیجه را سریع‌تر بررسی کنید.',
  },
  '/service/video-enhancement': {
    title: 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
    description:
      'با ابزار افزایش کیفیت ویدئو لوما، وضوح و فریم‌ریت ویدئوهای خود را بهبود دهید و خروجی روان‌تر و باکیفیت‌تری بسازید.',
    ogTitle: 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
    ogDescription:
      'با ابزار افزایش کیفیت ویدئو لوما، وضوح و فریم‌ریت ویدئوهای خود را بهبود دهید و خروجی روان‌تر و باکیفیت‌تری بسازید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
    twitterDescription:
      'با ابزار افزایش کیفیت ویدئو لوما، وضوح و فریم‌ریت ویدئوهای خود را بهبود دهید و خروجی روان‌تر و باکیفیت‌تری بسازید.',
  },
  '/service/text-to-speech': {
    title: 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
    description:
      'با ابزار تبدیل متن به گفتار لوما، متن‌های خود را به صدایی طبیعی و حرفه‌ای تبدیل کنید.',
    ogTitle: 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
    ogDescription:
      'با ابزار تبدیل متن به گفتار لوما، متن‌های خود را به صدایی طبیعی و حرفه‌ای تبدیل کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
    twitterDescription:
      'با ابزار تبدیل متن به گفتار لوما، متن‌های خود را به صدایی طبیعی و حرفه‌ای تبدیل کنید.',
  },
  '/service/workflow': {
    title: 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
    description:
      'با ورک‌فلوهای لوما، فرآیندهای چندمرحله‌ای تولید محتوا را در یک بوم بصری طراحی و اجرا کنید.',
    ogTitle: 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
    ogDescription:
      'با ورک‌فلوهای لوما، فرآیندهای چندمرحله‌ای تولید محتوا را در یک بوم بصری طراحی و اجرا کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
    twitterDescription:
      'با ورک‌فلوهای لوما، فرآیندهای چندمرحله‌ای تولید محتوا را در یک بوم بصری طراحی و اجرا کنید.',
  },
  '/solutions': {
    title: 'لوما | راهکارهای سازمانی هوش مصنوعی',
    description:
      'راهکارهای سازمانی لوما برای کمک به تیم‌ها و کسب‌وکارها در استفاده از ابزارهای هوش مصنوعی و مدیریت فرآیندهای کاری.',
    ogTitle: 'لوما | راهکارهای سازمانی هوش مصنوعی',
    ogDescription:
      'راهکارهای سازمانی لوما برای کمک به تیم‌ها و کسب‌وکارها در استفاده از ابزارهای هوش مصنوعی و مدیریت فرآیندهای کاری.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | راهکارهای سازمانی هوش مصنوعی',
    twitterDescription:
      'راهکارهای سازمانی لوما برای کمک به تیم‌ها و کسب‌وکارها در استفاده از ابزارهای هوش مصنوعی و مدیریت فرآیندهای کاری.',
  },
  '/pricing': {
    title: 'لوما | تعرفه‌ها و قیمت‌گذاری خدمات هوش مصنوعی',
    description:
      'تعرفه‌ها و هزینه استفاده از ابزارهای هوش مصنوعی لوما را ببینید و اعتبار مورد نیاز خود را انتخاب کنید.',
    ogTitle: 'لوما | تعرفه‌ها و قیمت‌گذاری خدمات هوش مصنوعی',
    ogDescription:
      'تعرفه‌ها و هزینه استفاده از ابزارهای هوش مصنوعی لوما را ببینید و اعتبار مورد نیاز خود را انتخاب کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | تعرفه‌ها و قیمت‌گذاری خدمات هوش مصنوعی',
    twitterDescription:
      'تعرفه‌ها و هزینه استفاده از ابزارهای هوش مصنوعی لوما را ببینید و اعتبار مورد نیاز خود را انتخاب کنید.',
  },
  '/subscription': {
    title: 'لوما | پلن‌های اشتراک',
    description:
      'پلن‌های اشتراک لوما را مقایسه کنید و با انتخاب پلن مناسب، به ابزارهای هوش مصنوعی و اعتبار مورد نیاز خود دسترسی داشته باشید.',
    ogTitle: 'لوما | پلن‌های اشتراک',
    ogDescription:
      'پلن‌های اشتراک لوما را مقایسه کنید و با انتخاب پلن مناسب، به ابزارهای هوش مصنوعی و اعتبار مورد نیاز خود دسترسی داشته باشید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | پلن‌های اشتراک',
    twitterDescription:
      'پلن‌های اشتراک لوما را مقایسه کنید و با انتخاب پلن مناسب، به ابزارهای هوش مصنوعی و اعتبار مورد نیاز خود دسترسی داشته باشید.',
  },
  '/security': {
    title: 'لوما | امنیت و حریم خصوصی',
    description:
      'با راهکارهای امنیتی لوما برای حفاظت از داده‌ها و استفاده سازمانی از خدمات هوش مصنوعی آشنا شوید.',
    ogTitle: 'لوما | امنیت و حریم خصوصی',
    ogDescription:
      'با راهکارهای امنیتی لوما برای حفاظت از داده‌ها و استفاده سازمانی از خدمات هوش مصنوعی آشنا شوید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | امنیت و حریم خصوصی',
    twitterDescription:
      'با راهکارهای امنیتی لوما برای حفاظت از داده‌ها و استفاده سازمانی از خدمات هوش مصنوعی آشنا شوید.',
  },
  '/about': {
    title: 'لوما | درباره ما',
    description:
      'با داستان شکل‌گیری لوما، ارزش‌ها و رویکرد ما برای ارائه ابزارهای هوش مصنوعی آشنا شوید.',
    ogTitle: 'لوما | درباره ما',
    ogDescription:
      'با داستان شکل‌گیری لوما، ارزش‌ها و رویکرد ما برای ارائه ابزارهای هوش مصنوعی آشنا شوید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | درباره ما',
    twitterDescription:
      'با داستان شکل‌گیری لوما، ارزش‌ها و رویکرد ما برای ارائه ابزارهای هوش مصنوعی آشنا شوید.',
  },
  '/gallery': {
    title: 'لوما | گالری نمونه‌کارهای هوش مصنوعی',
    description:
      'نمونه‌کارهای تولیدشده با ابزارهای هوش مصنوعی لوما را ببینید و با پرامپت‌های استفاده‌شده برای خلق آن‌ها آشنا شوید.',
    ogTitle: 'لوما | گالری نمونه‌کارهای هوش مصنوعی',
    ogDescription:
      'نمونه‌کارهای تولیدشده با ابزارهای هوش مصنوعی لوما را ببینید و با پرامپت‌های استفاده‌شده برای خلق آن‌ها آشنا شوید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | گالری نمونه‌کارهای هوش مصنوعی',
    twitterDescription:
      'نمونه‌کارهای تولیدشده با ابزارهای هوش مصنوعی لوما را ببینید و با پرامپت‌های استفاده‌شده برای خلق آن‌ها آشنا شوید.',
  },
  '/tutorials': {
    title: 'لوما | آموزش و راهنمای ابزارهای هوش مصنوعی',
    description:
      'با آموزش‌های و راهنماهای گام‌به‌گام لوما، نحوه استفاده از ابزارهای هوش مصنوعی و ساخت محتوای خلاقانه را یاد بگیرید.',
    ogTitle: 'لوما | آموزش و راهنمای ابزارهای هوش مصنوعی',
    ogDescription:
      'با آموزش‌های و راهنماهای گام‌به‌گام لوما، نحوه استفاده از ابزارهای هوش مصنوعی و ساخت محتوای خلاقانه را یاد بگیرید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | آموزش و راهنمای ابزارهای هوش مصنوعی',
    twitterDescription:
      'با آموزش‌های و راهنماهای گام‌به‌گام لوما، نحوه استفاده از ابزارهای هوش مصنوعی و ساخت محتوای خلاقانه را یاد بگیرید.',
  },
  '/docs': {
    title: 'لوما | مستندات فنی و API',
    description:
      'مستندات فنی لوما برای آشنایی با API، سرویس‌ها و نحوه استفاده از قابلیت‌های پلتفرم.',
    ogTitle: 'لوما | مستندات فنی و API',
    ogDescription:
      'مستندات فنی لوما برای آشنایی با API، سرویس‌ها و نحوه استفاده از قابلیت‌های پلتفرم.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | مستندات فنی و API',
    twitterDescription:
      'مستندات فنی لوما برای آشنایی با API، سرویس‌ها و نحوه استفاده از قابلیت‌های پلتفرم.',
  },
  '/contact': {
    title: 'لوما | تماس با ما',
    description:
      'برای دریافت راهنمایی، طرح پرسش یا مشاوره درباره خدمات لوما با ما در تماس باشید.',
    ogTitle: 'لوما | تماس با ما',
    ogDescription:
      'برای دریافت راهنمایی، طرح پرسش یا مشاوره درباره خدمات لوما با ما در تماس باشید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | تماس با ما',
    twitterDescription:
      'برای دریافت راهنمایی، طرح پرسش یا مشاوره درباره خدمات لوما با ما در تماس باشید.',
  },
  '/blog': {
    title: 'لوما | وبلاگ هوش مصنوعی',
    description:
      'مقالات و آموزش‌های لوما درباره ابزارهای هوش مصنوعی، تولید محتوا و استفاده کاربردی از مدل‌های هوشمند.',
    ogTitle: 'لوما | وبلاگ هوش مصنوعی',
    ogDescription:
      'مقالات و آموزش‌های لوما درباره ابزارهای هوش مصنوعی، تولید محتوا و استفاده کاربردی از مدل‌های هوشمند.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | وبلاگ هوش مصنوعی',
    twitterDescription:
      'مقالات و آموزش‌های لوما درباره ابزارهای هوش مصنوعی، تولید محتوا و استفاده کاربردی از مدل‌های هوشمند.',
  },
  '/privacy': {
    title: 'لوما | حریم خصوصی',
    description:
      'در این صفحه با سیاست حریم خصوصی لوما و نحوه مدیریت و استفاده از اطلاعات کاربران آشنا شوید.',
    ogTitle: 'لوما | حریم خصوصی',
    ogDescription:
      'در این صفحه با سیاست حریم خصوصی لوما و نحوه مدیریت و استفاده از اطلاعات کاربران آشنا شوید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | حریم خصوصی',
    twitterDescription:
      'در این صفحه با سیاست حریم خصوصی لوما و نحوه مدیریت و استفاده از اطلاعات کاربران آشنا شوید.',
  },
  '/terms': {
    title: 'لوما | شرایط استفاده',
    description:
      'در این صفحه شرایط و ضوابط استفاده از خدمات و پلتفرم لوما را مطالعه کنید.',
    ogTitle: 'لوما | شرایط استفاده',
    ogDescription:
      'در این صفحه شرایط و ضوابط استفاده از خدمات و پلتفرم لوما را مطالعه کنید.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | شرایط استفاده',
    twitterDescription:
      'در این صفحه شرایط و ضوابط استفاده از خدمات و پلتفرم لوما را مطالعه کنید.',
  },
};

export function getRouteMetadata(pathname: string): PageMetadata {
  return ROUTE_METADATA[pathname] || { title: DEFAULT_TITLE };
}

export interface TagConfig {
  key: string;
  type: 'meta' | 'link';
  keyAttr: 'name' | 'property' | 'rel';
  keyValue: string;
  contentAttr: 'content' | 'href';
  value: string;
}

export interface OverrideEntry {
  id: string;
  routePath: string;
  metadata: PageMetadata;
}

export interface BaselineEntry {
  el: Element;
  originalValue: string;
  contentAttr: 'content' | 'href';
}

function buildDescriptors(metadata: PageMetadata): TagConfig[] {
  const descriptors: TagConfig[] = [];

  if (metadata.description?.trim()) {
    descriptors.push({
      key: 'meta:name:description',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'description',
      contentAttr: 'content',
      value: metadata.description.trim(),
    });
  }

  if (metadata.robots?.trim()) {
    descriptors.push({
      key: 'meta:name:robots',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'robots',
      contentAttr: 'content',
      value: metadata.robots.trim(),
    });
  }

  if (metadata.ogTitle?.trim()) {
    descriptors.push({
      key: 'meta:property:og:title',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:title',
      contentAttr: 'content',
      value: metadata.ogTitle.trim(),
    });
  }

  if (metadata.ogDescription?.trim()) {
    descriptors.push({
      key: 'meta:property:og:description',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:description',
      contentAttr: 'content',
      value: metadata.ogDescription.trim(),
    });
  }

  if (metadata.ogType?.trim()) {
    descriptors.push({
      key: 'meta:property:og:type',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:type',
      contentAttr: 'content',
      value: metadata.ogType.trim(),
    });
  }

  const resolvedOgImage = (metadata.ogImage || metadata.image)?.trim();
  if (resolvedOgImage) {
    descriptors.push({
      key: 'meta:property:og:image',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:image',
      contentAttr: 'content',
      value: resolvedOgImage,
    });
  }

  if (metadata.twitterCard?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:card',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:card',
      contentAttr: 'content',
      value: metadata.twitterCard.trim(),
    });
  }

  if (metadata.twitterTitle?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:title',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:title',
      contentAttr: 'content',
      value: metadata.twitterTitle.trim(),
    });
  }

  if (metadata.twitterDescription?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:description',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:description',
      contentAttr: 'content',
      value: metadata.twitterDescription.trim(),
    });
  }

  const resolvedTwitterImage = (metadata.twitterImage || metadata.image)?.trim();
  if (resolvedTwitterImage) {
    descriptors.push({
      key: 'meta:name:twitter:image',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:image',
      contentAttr: 'content',
      value: resolvedTwitterImage,
    });
  }

  if (metadata.canonical?.trim()) {
    descriptors.push({
      key: 'link:rel:canonical',
      type: 'link',
      keyAttr: 'rel',
      keyValue: 'canonical',
      contentAttr: 'href',
      value: metadata.canonical.trim(),
    });
  }

  return descriptors;
}

/**
 * Deterministic metadata manager that acts as the single synchronization owner
 * for document.head and document.title.
 */
export class SEOManager {
  private currentRoute: string = '/';
  private overrides: OverrideEntry[] = [];
  private directMetadata: PageMetadata | null = null;
  private baselines: Map<string, BaselineEntry> = new Map();

  constructor() {
    if (typeof window !== 'undefined' && window.location) {
      const hashPath = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
      this.currentRoute = hashPath || window.location.pathname || '/';
    }
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  public setRoute(pathname: string): void {
    this.currentRoute = pathname;
    this.sync();
  }

  /**
   * Sets direct/fallback metadata through the centralized SEOManager state.
   * Direct metadata is subordinate to active page overrides:
   * active page override > direct metadata > route fallback > default title
   */
  public setDirectMetadata(metadata?: PageMetadata | null): void {
    this.directMetadata = isEmptyMetadata(metadata) ? null : metadata!;
    this.sync();
  }

  public registerOverride(id: string, metadata?: PageMetadata | null, routePath?: string): void {
    if (isEmptyMetadata(metadata)) {
      this.unregisterOverride(id);
      return;
    }
    const route = routePath || this.currentRoute;
    const existingIndex = this.overrides.findIndex((o) => o.id === id);
    if (existingIndex >= 0) {
      this.overrides[existingIndex] = { id, routePath: route, metadata: metadata! };
    } else {
      this.overrides.push({ id, routePath: route, metadata: metadata! });
    }
    this.sync();
  }

  public updateOverride(id: string, metadata?: PageMetadata | null): void {
    if (isEmptyMetadata(metadata)) {
      this.unregisterOverride(id);
      return;
    }
    const existing = this.overrides.find((o) => o.id === id);
    if (existing) {
      existing.metadata = metadata!;
      this.sync();
    }
  }

  public unregisterOverride(id: string): void {
    const idx = this.overrides.findIndex((o) => o.id === id);
    if (idx >= 0) {
      this.overrides.splice(idx, 1);
      this.sync();
    }
  }

  public getEffectiveMetadata(): PageMetadata {
    const matchingOverrides = this.overrides.filter(
      (o) => !o.routePath || o.routePath === this.currentRoute
    );
    const activeOverride =
      matchingOverrides.length > 0
        ? matchingOverrides[matchingOverrides.length - 1].metadata
        : null;

    const routeMeta = ROUTE_METADATA[this.currentRoute] || {};
    const fallbackMeta = this.directMetadata || routeMeta;

    const title =
      activeOverride?.title?.trim() ||
      fallbackMeta.title?.trim() ||
      DEFAULT_TITLE;

    const description =
      activeOverride?.description?.trim() ||
      fallbackMeta.description?.trim();

    const robots =
      activeOverride?.robots?.trim() ||
      fallbackMeta.robots?.trim();

    const ogTitle =
      activeOverride?.ogTitle?.trim() ||
      fallbackMeta.ogTitle?.trim();

    const ogDescription =
      activeOverride?.ogDescription?.trim() ||
      fallbackMeta.ogDescription?.trim();

    const ogType =
      activeOverride?.ogType?.trim() ||
      fallbackMeta.ogType?.trim();

    const resolvedImage =
      activeOverride?.image?.trim() ||
      fallbackMeta.image?.trim();

    const ogImage =
      activeOverride?.ogImage?.trim() ||
      fallbackMeta.ogImage?.trim() ||
      resolvedImage;

    const twitterCard =
      activeOverride?.twitterCard?.trim() ||
      fallbackMeta.twitterCard?.trim();

    const twitterTitle =
      activeOverride?.twitterTitle?.trim() ||
      fallbackMeta.twitterTitle?.trim();

    const twitterDescription =
      activeOverride?.twitterDescription?.trim() ||
      fallbackMeta.twitterDescription?.trim();

    const twitterImage =
      activeOverride?.twitterImage?.trim() ||
      fallbackMeta.twitterImage?.trim() ||
      resolvedImage;

    const canonical =
      activeOverride?.canonical?.trim() ||
      fallbackMeta.canonical?.trim();

    return {
      title,
      description,
      robots,
      ogTitle,
      ogDescription,
      ogType,
      ogImage,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
      image: resolvedImage,
      canonical,
    };
  }

  public sync(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const meta = this.getEffectiveMetadata();
    this.commitDOM(meta);
  }

  /**
   * Private internal method: applies metadata to document.head safely and deterministically.
   * Cannot be called externally to bypass getEffectiveMetadata() precedence.
   */
  private commitDOM(metadata: PageMetadata): void {
    if (typeof document === 'undefined') {
      return;
    }

    // 1. Title handling
    const nextTitle = metadata.title?.trim() || DEFAULT_TITLE;
    if (document.title !== nextTitle) {
      document.title = nextTitle;
    }

    // 2. Build desired tag descriptors
    const descriptors = buildDescriptors(metadata);
    const activeManagedElements = new Set<Element>();
    const activeBaselineKeys = new Set<string>();

    for (const item of descriptors) {
      // Step A: Check if a managed tag already exists
      const managedSelector = `${item.type}[${item.keyAttr}="${item.keyValue}"][${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`;
      const managedTags = Array.from(document.head.querySelectorAll(managedSelector));

      if (managedTags.length > 0) {
        const primaryTag = managedTags[0];
        // Prune any duplicate managed tags for this same key
        for (let i = 1; i < managedTags.length; i++) {
          managedTags[i].remove();
        }
        if (primaryTag.getAttribute(item.contentAttr) !== item.value) {
          primaryTag.setAttribute(item.contentAttr, item.value);
        }
        activeManagedElements.add(primaryTag);
        continue;
      }

      // Step B: Check if an unmanaged pre-existing tag from index.html exists
      const existingSelector = `${item.type}[${item.keyAttr}="${item.keyValue}"]`;
      const preExistingEl = document.head.querySelector(existingSelector);

      if (preExistingEl && !preExistingEl.hasAttribute(SEO_TAG_ATTR)) {
        if (!this.baselines.has(item.key)) {
          this.baselines.set(item.key, {
            el: preExistingEl,
            originalValue: preExistingEl.getAttribute(item.contentAttr) || '',
            contentAttr: item.contentAttr,
          });
        }
        if (preExistingEl.getAttribute(item.contentAttr) !== item.value) {
          preExistingEl.setAttribute(item.contentAttr, item.value);
        }
        activeBaselineKeys.add(item.key);
        // Never add data-luma-seo to preExistingEl
        continue;
      }

      // Step C: Create a new managed tag
      const newEl = document.createElement(item.type);
      newEl.setAttribute(item.keyAttr, item.keyValue);
      newEl.setAttribute(item.contentAttr, item.value);
      newEl.setAttribute(SEO_TAG_ATTR, SEO_TAG_VALUE);
      document.head.appendChild(newEl);
      activeManagedElements.add(newEl);
    }

    // Step D: Remove stale managed tags
    const allManagedTags = Array.from(
      document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`)
    );
    for (const el of allManagedTags) {
      if (!activeManagedElements.has(el)) {
        el.remove();
      }
    }

    // Step E: Restore inactive pre-existing baselines
    for (const [key, baseline] of this.baselines.entries()) {
      if (!activeBaselineKeys.has(key)) {
        if (baseline.el.getAttribute(baseline.contentAttr) !== baseline.originalValue) {
          baseline.el.setAttribute(baseline.contentAttr, baseline.originalValue);
        }
      }
    }
  }

  public reset(): void {
    if (typeof document !== 'undefined') {
      document.title = DEFAULT_TITLE;
      const allManagedTags = Array.from(
        document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`)
      );
      allManagedTags.forEach((el) => el.remove());
      for (const [, baseline] of this.baselines.entries()) {
        baseline.el.setAttribute(baseline.contentAttr, baseline.originalValue);
      }
    }
    this.overrides = [];
    this.directMetadata = null;
    this.baselines.clear();
    this.currentRoute = '/';
  }
}

export const seoManager = new SEOManager();

/**
 * Checks whether metadata is undefined, null, or contains only empty/whitespace values.
 */
export function isEmptyMetadata(metadata?: PageMetadata | null): boolean {
  if (!metadata) {
    return true;
  }
  const keys: (keyof PageMetadata)[] = [
    'title',
    'description',
    'robots',
    'ogTitle',
    'ogDescription',
    'ogType',
    'ogImage',
    'twitterCard',
    'twitterTitle',
    'twitterDescription',
    'twitterImage',
    'image',
    'canonical',
  ];
  return keys.every((k) => !metadata[k] || metadata[k]!.trim() === '');
}

let overrideCounter = 0;

/**
 * Reusable hook to register page-level metadata overrides.
 * Guarantees that:
 * - When metadata is valid, it registers/updates the override.
 * - If metadata later becomes undefined or empty while mounted, it immediately unregisters the override.
 * - Stale tags are removed and route fallback is restored.
 * - Restores route-level fallback cleanly on unmount.
 */
export function usePageMetadata(metadata?: PageMetadata, routePath?: string): void {
  const idRef = useRef<string>('');
  if (!idRef.current) {
    idRef.current = `seo-override-${++overrideCounter}`;
  }

  // Register, update, or clear override when props or routePath change
  useEffect(() => {
    if (isEmptyMetadata(metadata)) {
      seoManager.unregisterOverride(idRef.current);
    } else {
      seoManager.registerOverride(idRef.current, metadata!, routePath);
    }
  }, [
    routePath,
    metadata?.title,
    metadata?.description,
    metadata?.robots,
    metadata?.ogTitle,
    metadata?.ogDescription,
    metadata?.ogType,
    metadata?.ogImage,
    metadata?.twitterCard,
    metadata?.twitterTitle,
    metadata?.twitterDescription,
    metadata?.twitterImage,
    metadata?.image,
    metadata?.canonical,
  ]);

  // Clean up override strictly on component unmount
  useEffect(() => {
    const id = idRef.current;
    return () => {
      seoManager.unregisterOverride(id);
    };
  }, []);
}

/**
 * Internal helper to apply direct metadata while strictly respecting metadata precedence.
 * An active page override CANNOT be overwritten by this helper.
 */
export function applyPageMetadata(metadata?: PageMetadata): void {
  seoManager.setDirectMetadata(metadata);
}

export function clearManagedMetadata(): void {
  seoManager.reset();
}

