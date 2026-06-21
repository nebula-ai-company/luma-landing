# DESIGN.md — راهنمای طراحی و سبک پروژهٔ Luma Landing

> این سند، «منبع حقیقتِ طراحی» برای پروژهٔ لندینگ لوما است. هر صفحه/کامپوننت جدیدی که تولید
> می‌شود **باید** از این الگوها پیروی کند تا با بقیهٔ سایت کاملاً هماهنگ باشد. وقتی پرامپتی برای
> ساخت صفحه/بخش جدید می‌دهید، این فایل را به‌عنوان مرجع به مدل بدهید.

---

## ۱. استک فنی

- **React 19 + TypeScript + Vite**
- **react-router-dom v6** با `HashRouter` (مسیرها در `App.tsx`)
- **Tailwind CSS** از طریق CDN — کانفیگ داخل `index.html` تعریف شده (نه فایل tailwind.config مجزا)
- **framer-motion v11** برای همهٔ انیمیشن‌ها
- **lucide-react** برای آیکن‌ها (تنها کتابخانهٔ آیکن مجاز)
- فونت: **IRANYekanX** (وزن متغیر ۱۰۰–۹۰۰)
- زبان/جهت: **فارسی، RTL** (`<html lang="fa" dir="rtl">`)
- تم: **روشن/تاریک** با کلاس `dark` روی `<html>` (از طریق `lib/ThemeContext.tsx` و هوک `useTheme`)

> هنگام افزودن وابستگی جدید خودداری کنید؛ فقط از بسته‌های موجود در `package.json` استفاده شود.

---

## ۲. توکن‌های رنگ (تعریف‌شده در `index.html`)

| نقش | کلاس/کد | مقدار |
| :-- | :-- | :-- |
| پس‌زمینهٔ تیره | `bg-background` | `#0a0a0a` |
| سطح تیره | `bg-surface` | `#121212` |
| سطح برجسته | `bg-surfaceHighlight` | `#1E1E1E` |
| بنفش برند | `text-luma-purple` / `bg-luma-purple` | `#DA8FFF` |
| صورتی برند | `luma-pink` | `#FF6482` |
| زرد/کهربایی برند | `luma-yellow` | `#FFB340` |

**پس‌زمینهٔ روشن صفحات:** بسته به صفحه یکی از این‌ها: `#FAFAFA`, `#FBF9F6`, `#F9F7F4`
(در حالت تاریک همیشه `#0a0a0a`). الگوی استاندارد wrapper صفحه:

```tsx
<div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white
  selection:bg-indigo-600 selection:text-white transition-colors duration-300">
```

**خاکستری‌ها:** برای متن/حاشیه از مقیاس `zinc-*` استفاده کنید (نه `gray-*` مگر در موارد موجود).
متن ثانویه: `text-zinc-500 dark:text-zinc-400`. حاشیه: `border-zinc-200 dark:border-white/10`.

### کلاس‌های گرادینت آماده (در `index.html`)
- `.text-gradient` — گرادینت ثابت روی متن (روشن: indigo→rose→amber / تاریک: purple→pink→yellow)
- `.text-gradient-animated` — همان، ولی متحرک (برای کلمات کلیدی در تیترها)
- `.bg-gradient-luma` — گرادینت برند `135deg purple→pink→yellow`
- `.glass-panel` — شیشه‌ای: `bg-white/3 + backdrop-blur-10px + border-white/5`
- `.bg-grid-white` — الگوی شبکهٔ ظریف برای پس‌زمینه

---

## ۳. تایپوگرافی

- تیتر بزرگ Hero: `text-5xl lg:text-7xl font-black`
- تیتر بخش: `text-3xl md:text-5xl font-black`
- تیتر کارت: `text-lg font-bold`
- متن بدنه: `text-sm` یا `text-xs`, `leading-relaxed`/`leading-7`, اغلب `font-light` برای توضیحات
- در تیترها، کلمهٔ کلیدی را داخل `<span className="text-gradient-animated">…</span>` بگذارید.
- اعداد فارسی: از `(number).toLocaleString('fa-IR')` یا ارقام فارسی دستی استفاده کنید. واحد پول
  همیشه **«لوم»** و واحد تومانی **«تومان»**.

---

## ۴. الگوی استاندارد یک «بخش» (Section)

هر بخش صفحه این ساختار را دارد:

```tsx
<section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
  {/* محوکنندهٔ گرادینتی بالا/پایین برای پیوستگی بین بخش‌ها */}
  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

  {/* بلاب‌های گرادینتی متحرک پس‌زمینه (اتمسفر) */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{ x: [0, 80, -40, 0], y: [0, -40, 40, 0], scale: [1, 1.15, 0.95, 1], opacity: [0.3, 0.45, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/30 dark:bg-indigo-950/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
    />
  </div>

  <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
    {/* سرتیتر بخش */}
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm"
      >
        <SomeIcon size={14} /> <span className="text-xs font-bold">برچسب بخش</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
      >
        عنوان بخش با <span className="text-gradient-animated">کلمهٔ کلیدی</span>
      </motion.h2>
      <p className="text-zinc-600 dark:text-zinc-400">توضیح کوتاه بخش.</p>
    </div>

    {/* محتوا: گرید کارت‌ها یا چیدمان دو ستونه */}
  </div>
</section>
```

- عرض ظرف اصلی همیشه `max-w-screen-2xl mx-auto px-4`.
- فاصلهٔ عمودی بخش: `py-24` (بزرگ‌تر `py-32`).
- پس‌زمینهٔ بخش‌ها بین `#FBF9F6` و `#F9F7F4` متناوب می‌شود تا ریتم دیده شود.

---

## ۵. الگوی استاندارد «کارت» (Double-Bezel)

کارت‌های مدل/ویژگی از طرح «دو قاب» با گرادینت شعاعیِ دنبال‌کنندهٔ ماوس استفاده می‌کنند:

```tsx
const Card: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="h-full font-sans"
    >
      {/* قاب بیرونی */}
      <div ref={ref} onMouseMove={onMove}
        className="group relative h-full rounded-[24px] p-2 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-default
          bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]">
        {/* گرادینت شعاعی هاور */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${item.hex}35, transparent 40%)` }} />
        {/* قاب درونی */}
        <div className="relative h-full bg-white dark:bg-zinc-950 rounded-[18px] overflow-hidden flex flex-col p-8 border border-zinc-100 dark:border-zinc-900 shadow-sm">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 group-hover:scale-105 group-hover:rotate-3 transition-all">
            <item.icon size={22} className={item.colorClass} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-6 mb-3">{item.title}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-7 font-light">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};
```

- قاب بیرونی: `rounded-[24px] p-2`؛ قاب درونی: `rounded-[18px]`.
- گریدها: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` (مدل‌ها گاهی `xl:grid-cols-4`).
- هاور: `hover:-translate-y-2` + سایهٔ نرم + گرادینت شعاعی رنگِ کارت.
- هر کارت `hex` رنگ خود را دارد (مثلاً `#6366F1`, `#F43F5E`, `#FFB340`, `#10B981`, یا رنگ‌های برند).

---

## ۶. قواعد انیمیشن (framer-motion)

- **ورود بخش/کارت:** `initial={{ opacity:0, y:20|30 }}` → `whileInView={{ opacity:1, y:0 }}` با
  `viewport={{ once:true }}` و `transition={{ delay: index*0.05..0.1 }}` برای **ورود ترتیبی (stagger)**.
- **بلاب‌های پس‌زمینه:** `animate` حلقه‌ای روی `x/y/scale/opacity` با `duration: 8..15, repeat: Infinity, ease: "easeInOut"`.
- **محتوای بازشونده / مودال / دراپ‌داون:** `AnimatePresence` + `initial/animate/exit` روی `opacity`+`y`(+`scale`).
- **پیلِ تب/توگل فعال:** از `layoutId` مشترک برای انیمیشن جابه‌جایی نرم استفاده کنید
  (`transition={{ type:"spring", bounce:0.2 }}`).
- فقط `opacity`/`transform` انیمیت شوند (۶۰fps). از انیمیت‌کردن width/height/top مگر با `AnimatePresence` بپرهیزید.
- اگر با خطای تایپ framer-motion مواجه شدید، الگوی موجود `const Motion = motion as any;` را به‌کار ببرید.

---

## ۷. قواعد RTL/فارسی

- متن‌ها راست‌چین‌اند؛ تیتر Hero: `text-center lg:text-right`.
- نام‌های لاتین (مدل‌ها، اعداد فنی، توکن) را داخل `dir-ltr`/`dir="ltr"` بگذارید.
- در چیدمان دو ستونه، با کلاس‌های `order-1 lg:order-2` ترتیب بصری را برای RTL تنظیم کنید.
- ارقام را فارسی نمایش دهید؛ واحدها: «لوم»، «تومان»، «ماه».

---

## ۸. کامپوننت‌ها و قراردادهای مشترک

- **دکمه:** `import Button from '../components/Button'` — پراپ‌ها: `variant: 'primary'|'secondary'`,
  `href` (مسیر داخلی، `Link`)، `externalHref` (لینک خارجی مثل `https://dash.lumai.ir/`).
  Primary = مشکی در روشن/سفید در تاریک؛ Secondary = شیشه‌ای.
- **CTA انتهای صفحه:** `import CTA from '../components/CTA'` در انتهای هر صفحهٔ سرویس استفاده می‌شود.
- **آیکن‌ها:** فقط از `lucide-react`.
- **اسکرول به بالا در ورود صفحه:** هر صفحه در `useEffect(() => window.scrollTo(0,0), [])`.

### ساختار فایل‌ها
- صفحات در `pages/XxxPage.tsx` (export پیش‌فرض). هر صفحه فقط بخش‌ها را کنار هم می‌چیند.
- بخش‌ها در `components/<Group>/<Name>.tsx` (export **نام‌دار**: `export const Xxx`).
- سرویس‌ها زیر `components/Services/<Service>/...` با اجزای `Hero`, `Models`, `UseCases`, `Features`,
  و گاهی `HeroAnim`, `Steps`.
- داده‌ها داخل خود کامپوننت (آرایهٔ ثابت بالای فایل) یا یک فایل `*Data.ts` کنار آن.

### افزودن مسیر و آیتم منو
- مسیر جدید را در `App.tsx` داخل `<Routes>` اضافه کنید.
- آیتم ناوبری را در `components/Navbar.tsx` آرایهٔ `MENU_STRUCTURE` اضافه کنید (با `icon` از lucide،
  `color` و `shadowColor` از پالت برند `luma-*`). سرویس‌ها از `SERVICES` در `constants.tsx` می‌آیند.

---

## ۹. چک‌لیست «هماهنگ بودن» قبل از تحویل هر صفحه/بخش

- [ ] wrapper با `bg-[#…] dark:bg-[#0a0a0a]` و `transition-colors duration-300`
- [ ] `max-w-screen-2xl mx-auto px-4` برای ظرف
- [ ] تیتر با `font-black` + کلمهٔ کلیدی `text-gradient-animated`
- [ ] ورود ترتیبی با `whileInView`+`viewport={{once:true}}`+`delay: i*0.05`
- [ ] کارت‌ها با طرح double-bezel و گرادینت شعاعی هاور
- [ ] بلاب‌های پس‌زمینه + محوکنندهٔ گرادینتی بالا/پایین
- [ ] RTL کامل، اعداد فارسی، نام‌های لاتین `dir-ltr`
- [ ] `Button` و `CTA` مشترک به‌کار رفته‌اند
- [ ] حالت تاریک/روشن هر دو بررسی شده
- [ ] فقط آیکن `lucide-react`، فقط انیمیشن `framer-motion`
