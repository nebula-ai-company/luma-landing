import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChartPieSlice, ShieldWarning } from '@phosphor-icons/react';

const MotionDiv = motion.div;

interface Scenario {
  icon: React.ComponentType<any>;
  badge: string;
  title: string;
  subject: string;
  context: string;
  action: string;
  metricPlaceholder: string;
  hex: string;
}

const SCENARIOS: Scenario[] = [
  {
    icon: ChartPieSlice,
    badge: 'بهینه‌سازی عملیاتی',
    title: 'اتوماسیون کاتالوگ در صنعت پوشاک و مد',
    subject: 'سناریوی شبیه‌سازی شده فرضی برای ارزیابی تجاری',
    context: 'بررسی یک مجموعهٔ خرده‌فروشی بزرگ مد و پوشاک با تنوع بالای محصولات فصلی که با چالش عکاسی بر روی مدل‌های فیزیکی و آماده‌سازی به موقع کاتالوگ‌ها روبرو بود.',
    action: 'اتصال خودکار تصاویر فلت محصولات به پایپ‌لاین پرو مجازی لوما و مدل‌سازی اختصاصی منطبق با جثه‌ها و نژادهای گوناگون مخاطبان.',
    metricPlaceholder: 'نتایج ثبت شده تجاری: [کاهش زمان فرآیند عکاسی تا حد فرضی] و [درصد افزایش فروش شبیه‌سازی شده بر اساس مستندات داخلی سازمان شما].',
    hex: '#FF6482', // Luma pink
  },
  {
    icon: ShieldWarning,
    badge: 'تضمین حریم خصوصی',
    title: 'استقرار ایزوله در شبکهٔ اختصاصی بانکی / سازمانی',
    subject: 'مطالعه فرضی نحوه مواجهه با چالش‌های امنیتی داده‌ها',
    context: 'بررسی نهادهای بزرگ مالی یا شرکت‌های با رگولاتوری سخت‌گیرانه که نیازمند خودکارسازی فرآیندهای تحلیل بصری مدارک کاربران بدون خروج اطلاعات از شبکه امن سازمان خود هستند.',
    action: 'راه‌اندازی مدل محلی لوما در بستر خصوصی کارفرما (On-Premise) از طریق کانتینرهای ایمن داکر همراه با سیستم کنترل احراز هویت متمرکز.',
    metricPlaceholder: 'انطباق قانونی: [حفظ صد درصدی محرمانگی داده‌ها] و [تاییدیه استانداردهای بومی امنیتی فناوری اطلاعات شما].',
    hex: '#DA8FFF', // Luma purple
  }
];

const ScenarioCard: React.FC<{
  sc: Scenario;
  index: number;
}> = ({ sc, index }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const ScIcon = sc.icon;

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {/* قاب بیرونی با پترن دو قاب (Double-Bezel) */}
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative h-full rounded-[28px] p-1.5 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default
          bg-zinc-200/50 dark:bg-zinc-900/40 border border-zinc-300/30 dark:border-zinc-800/50 shadow-sm hover:shadow-[0_30px_50px_-20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]"
      >
        {/* گرادینت شعاعی هاور تعاملی پیگیر ماوس */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${sc.hex}18, transparent 50%)`,
          }}
        />

        {/* قاب درونی کارت */}
        <div className="relative h-full bg-white dark:bg-[#0c0c0e]/95 rounded-[22px] overflow-hidden flex flex-col justify-between p-8 border border-zinc-100 dark:border-zinc-900/60 shadow-inner">
          
          {/* برچسب شناسه پس‌زمینه */}
          <div className="absolute top-6 left-6 text-[10px] bg-zinc-100/80 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-md border border-zinc-200/40 dark:border-white/5 uppercase tracking-wider font-mono">
            {sc.badge}
          </div>

          <div className="pt-6">
            {/* آیکن متحرک */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 mb-6"
              style={{ color: sc.hex }}
            >
              <ScIcon size={24} weight="duotone" />
            </div>
            
            <span className="text-[11px] font-bold block mb-2" style={{ color: sc.hex }}>
              {sc.subject}
            </span>
            
            <h3 className="text-xl font-black text-zinc-950 dark:text-white mb-5 font-sans leading-tight">
              {sc.title}
            </h3>
            
            <div className="space-y-5 mb-6 text-right">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-1.5">صورت مسئله و زمینه:</h4>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {sc.context}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-1.5">راهکار پیاده‌سازی شده لوما:</h4>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {sc.action}
                </p>
              </div>
            </div>
          </div>

          {/* بخش متریک و ارزیابی تجاری با کارت متمایز */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl transition-colors duration-300 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-900/50">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mb-1.5 font-sans">متریک ارزیابی تجاری</span>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-300 leading-relaxed">
              {sc.metricPlaceholder}
            </p>
          </div>

        </div>
      </div>
    </MotionDiv>
  );
};

export const IllustrativeScenarios: React.FC = () => {
  // موقعیت‌های استاتیک برای علامت‌های پلاس تله‌متری
  const crosses = [
    { x: '6%', y: '18%' },
    { x: '94%', y: '12%' },
    { x: '12%', y: '82%' },
    { x: '90%', y: '78%' },
  ];

  // ذرات معلق درخشان پس‌زمینه
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: i % 3 === 0 ? 3 : 2,
    x: (i * 9.1) % 94 + 3,
    y: (i * 7.9) % 94 + 3,
    duration: 18 + (i * 4) % 12,
    delay: -(i * 3) % 8,
  }));

  return (
    <section className="py-28 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 relative overflow-hidden">
      
      {/* ------------------ افکت‌ها و انیمیشن‌های پس‌زمینه (Ambient Background) ------------------ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,white_120px,white_calc(100%-120px),transparent_100%)]" aria-hidden="true">
        
        {/* اورب رنگی متحرک صورتی بالا چپ */}
        <MotionDiv
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[120px] opacity-[0.06] dark:opacity-[0.14] bg-[#FF6482]"
        />

        {/* اورب بنفش متحرک پایین راست */}
        <MotionDiv
          animate={{
            x: [0, 45, -20, 0],
            y: [0, -45, 30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[120px] opacity-[0.07] dark:opacity-[0.15] bg-[#DA8FFF]"
        />

        {/* پترن ماتریس نقطه‌ای فضا */}
        <div 
          className="absolute inset-0 text-zinc-950 dark:text-purple-300 opacity-[0.02] dark:opacity-[0.08] pointer-events-none select-none"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
          }}
        />

        {/* پلاس‌های تله‌متری مهندسی سوئیسی */}
        {crosses.map((c, idx) => (
          <MotionDiv
            key={`cross-sc-${idx}`}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{
              duration: 6 + (idx % 2) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 1.5,
            }}
            className="absolute text-zinc-950/10 dark:text-white/10 text-xs font-sans select-none"
            style={{ left: c.x, top: c.y }}
          >
            +
          </MotionDiv>
        ))}

        {/* ذرات درخشان معلق در پس‌زمینه */}
        {particles.map((p) => (
          <MotionDiv
            key={`particle-sc-${p.id}`}
            animate={{
              y: [`${p.y}%`, `${(p.y + 12) % 100}%`],
              opacity: [0, 0.2, 0.2, 0],
              scale: [0.9, 1.3, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gradient-to-br from-white to-pink-200/40 dark:from-white dark:to-[#FF6482]/40"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: p.size > 2 ? '0 0 5px rgba(255, 100, 130, 0.3)' : 'none',
            }}
          />
        ))}

      </div>

      {/* ------------------ محتوای اصلی بخش سناریوها ------------------ */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* سربرگ بخش */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <MotionDiv
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm"
          >
            <span className="text-[10px] text-luma-pink font-black uppercase tracking-[0.2em] block">شبیه‌سازی و مطالعات موردی مرجع</span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white mb-6 font-sans tracking-tight">
              سناریوهای عملیاتی و <span className="text-gradient-animated">شبیه‌سازی شده تجاری</span>
            </h2>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              به منظور درک کامل چگونگی هماهنگی پلتفرم با فرآیندهای کسب‌وکار، نمونه سناریوهای کاربردی زیر را که بر اساس نیازهای واقعی کارفرمایان پیاده‌سازی شده‌اند، مطالعه نمایید.
            </p>
          </MotionDiv>
        </div>

        {/* گرید ناهمگن کارت‌های با تراز افقی از راست */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto text-right" dir="rtl">
          {SCENARIOS.map((sc, idx) => (
            <ScenarioCard key={idx} sc={sc} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
