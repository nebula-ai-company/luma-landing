import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, Handshake, UserGear } from '@phosphor-icons/react';

const MotionDiv = motion.div;

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'امنیت داده‌ها و حریم خصوصی مستقل',
    desc: 'تمامی فایل‌ها، تصاویر و کلیدهای رمزنگاری شما به صورت ایزوله شده در دیتابیس‌های ابری ذخیره می‌شوند. داده‌های بیزنس شما هرگز صرف آموزش کلی مدل‌های عمومی نخواهد شد.',
    hex: '#DA8FFF',
  },
  {
    icon: CalendarCheck,
    title: 'تضمین پایداری و SLA اختصاصی',
    desc: 'برای اشتراک‌ها و پنل‌های سازمانی، تعهد سطح پایداری سرویس (SLA) تا ۹۹.۹٪ به صورت کتبی تضمین می‌شود تا جریان‌های کاری بصری شما هرگز دچار وقفه یا تاخیر نگردد.',
    hex: '#FF6482',
  },
  {
    icon: UserGear,
    title: 'توسعه و سفارشی‌سازی وایت‌لیبل',
    desc: 'قابلیت قرارگیری پلتفرم بر روی دامنه اختصاصی سازمان شما با لوگو و امضای بصری برند خودتان به منظور ایجاد تجربه یکپارچه و ارزشمند برای مشتریان نهایی.',
    hex: '#FFB340',
  },
  {
    icon: Handshake,
    title: 'پشتیبانی فنی اولویت‌دار و تیم فنی همکار',
    desc: 'ارائه کانال‌های ارتباطی مستقیم ۲۴ ساعته و دسترسی اختصاصی به مهندسان ارشد زیرساخت لوما به منظور عیب‌یابی و پیاده‌سازی سریع پروژه‌های ادغام کدهای API.',
    hex: '#3B82F6',
  }
];

const PillarCard: React.FC<{
  pillar: typeof PILLARS[number];
  index: number;
}> = ({ pillar, index }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const PillarIcon = pillar.icon;

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
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
            background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${pillar.hex}22, transparent 50%)`,
          }}
        />
        {/* قاب درونی کارت */}
        <div className="relative h-full bg-white dark:bg-[#0c0c0e]/95 rounded-[22px] overflow-hidden flex flex-col p-8 border border-zinc-100 dark:border-zinc-900/60 shadow-inner">
          {/* آیکن همراه با پس‌زمینه رنگی و ترنزیشن چرخشی در حالت هاور */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 mb-6"
            style={{ color: pillar.hex }}
          >
            <PillarIcon size={24} weight="duotone" />
          </div>
          <h3 className="text-lg font-black text-zinc-950 dark:text-white mb-3 font-sans transition-colors duration-300">
            {pillar.title}
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light transition-colors duration-300">
            {pillar.desc}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};

export const HowLumaFits: React.FC = () => {
  // موقعیت‌های استاتیک برای علامت‌های پلاس تله‌متری
  const crosses = [
    { x: '8%', y: '12%' },
    { x: '92%', y: '25%' },
    { x: '15%', y: '75%' },
    { x: '88%', y: '82%' },
  ];

  // ذرات معلق کیهانی پس‌زمینه
  const particles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    size: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
    x: (i * 7.1) % 94 + 3,
    y: (i * 5.9) % 94 + 3,
    duration: 15 + (i * 5) % 15,
    delay: -(i * 2) % 10,
  }));

  return (
    <section className="py-28 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 relative overflow-hidden">
      
      {/* ------------------ انیمیشن‌ها و نورهای پس‌زمینه (Ambient Atmosphere) ------------------ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,white_120px,white_calc(100%-120px),transparent_100%)]" aria-hidden="true">
        
        {/* اورب بنفش متحرک در بالا سمت راست */}
        <MotionDiv
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[120px] opacity-[0.07] dark:opacity-[0.16] bg-[#DA8FFF]"
        />

        {/* اورب صورتی متحرک در پایین سمت چپ */}
        <MotionDiv
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[120px] opacity-[0.06] dark:opacity-[0.14] bg-[#FF6482]"
        />

        {/* پترن نقطه‌ای ماتریسی تکنیکال هماهنگ با هویت بصری لوما */}
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
            key={`cross-${idx}`}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 5 + (idx % 2) * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 1.2,
            }}
            className="absolute text-zinc-950/10 dark:text-white/10 text-xs font-sans select-none"
            style={{ left: c.x, top: c.y }}
          >
            +
          </MotionDiv>
        ))}

        {/* ذرات معلق کیهانی و درخشان */}
        {particles.map((p) => (
          <MotionDiv
            key={`particle-${p.id}`}
            animate={{
              y: [`${p.y}%`, `${(p.y + 15) % 100}%`],
              opacity: [0, 0.25, 0.25, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gradient-to-br from-white to-purple-200/40 dark:from-white dark:to-[#DA8FFF]/40"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: p.size > 2 ? '0 0 6px rgba(218, 143, 255, 0.3)' : 'none',
            }}
          />
        ))}

      </div>

      {/* ------------------ محتوای اصلی بخش ------------------ */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* سربرگ بخش */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <MotionDiv
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm"
          >
            <span className="text-[10px] text-luma-purple font-black uppercase tracking-[0.2em] block">زیرساخت مقیاس‌پذیر</span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white mb-6 font-sans tracking-tight">
              چرا لوما شریک تجاری <span className="text-gradient-animated">ایده‌آل شماست؟</span>
            </h2>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              ما پلتفرم هوش مصنوعی را برای انطباق کامل با پیش‌نیازهای امنیتی، قانونی و عملیاتی شرکت‌های مدرن و استارتاپ‌های پیشرو آماده کرده‌ایم.
            </p>
          </MotionDiv>
        </div>

        {/* گرید ناهمگن کارت‌ها با تراز افقی از راست */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-right" dir="rtl">
          {PILLARS.map((pillar, idx) => (
            <PillarCard key={idx} pillar={pillar} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
