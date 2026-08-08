
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, FileKey, Fingerprint, Globe, ShieldCheck, Activity, Mail, CheckCircle2, Clock, LucideIcon } from 'lucide-react';

// --- Brand Colors ---
const COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  statusText: string;
  statusType: 'implemented' | 'infrastructure' | 'planned' | 'principles';
  color: string;
  hex: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Lock,
    title: "رمزنگاری شبکه و داده‌ها",
    statusText: "اجرا شده و قابل راستی‌آزمایی",
    statusType: "implemented",
    description: "داده‌های ذخیره‌شده با الگوریتم AES-256 (رمزنگاری کلید متقارن پیشرفته) و ترافیک شبکه با پروتکل TLS 1.3 (انتقال امن شبکه) رمزنگاری می‌شوند.",
    color: "text-indigo-600 dark:text-luma-purple",
    hex: COLORS.purple
  },
  {
    icon: Server,
    title: "زیرساخت ابری و پردازنده‌های فرعی",
    statusText: "منطبق بر زیرساخت دیتاسنتر",
    statusType: "infrastructure",
    description: "میزبانی در دیتاسنترهای ابری ایزوله دارای گواهی‌های فیزیکی و امنیتی ISO 27001 و SOC 2؛ همراه با ارزیابی ریسک پردازنده‌های فرعی.",
    color: "text-amber-600 dark:text-luma-yellow",
    hex: COLORS.yellow
  },
  {
    icon: Eye,
    title: "حریم خصوصی و عدم آموزش مدل",
    statusText: "اجرا شده و الزامی",
    statusType: "implemented",
    description: "عدم استفاده از پرامپت‌ها، تصاویر، ویدیوها یا داده‌های اختصاصی کاربران برای آموزش عمومی مدل‌های هوش مصنوعی بدون رضایت صریح.",
    color: "text-rose-600 dark:text-luma-pink",
    hex: COLORS.pink
  },
  {
    icon: FileKey,
    title: "چرخه حیات و پاکسازی داده‌ها",
    statusText: "اجرا شده",
    statusType: "implemented",
    description: "مدیریت شفاف داده در تمام مراحل چرخه حیات (Data Lifecycle)؛ امکان درخواست حذف فوری، کامل و غیرقابل بازگشت اطلاعات و حساب کاربری.",
    color: "text-indigo-600 dark:text-luma-purple",
    hex: COLORS.purple
  },
  {
    icon: ShieldCheck,
    title: "کنترل‌های دسترسی و RBAC",
    statusText: "اجرا شده",
    statusType: "implemented",
    description: "اعمال کنترل دسترسی مبتنی بر نقش (RBAC - Role-Based Access Control) و اصل حداقل دسترسی (Least Privilege) برای سیستم‌ها و کارکنان.",
    color: "text-amber-600 dark:text-luma-yellow",
    hex: COLORS.yellow
  },
  {
    icon: Fingerprint,
    title: "محافظت از حساب و احراز هویت",
    statusText: "پشتیبانی OAuth / توسعه 2FA",
    statusType: "planned",
    description: "احراز هویت امن از طریق پروتکل OAuth (ورود با گوگل)، مدیریت نشست‌های کاری و سیستم 2FA (احراز هویت دو مرحله‌ای) در برنامه توسعه.",
    color: "text-rose-600 dark:text-luma-pink",
    hex: COLORS.pink
  },
  {
    icon: Activity,
    title: "پاسخگویی به حوادث امنیتی",
    statusText: "اجرا شده",
    statusType: "implemented",
    description: "پایش مداوم ۲۴/۷، ثبت لاگ‌های امنیتی، تشخیص آنومالی‌ها و وجود پروتکل عملیاتی پایش و پاسخگویی به حوادث امنیتی (Incident Response).",
    color: "text-indigo-600 dark:text-luma-purple",
    hex: COLORS.purple
  },
  {
    icon: Globe,
    title: "انطباق با قوانین حریم خصوصی",
    statusText: "پیروی از اصول GDPR",
    statusType: "principles",
    description: "طراحی پلتفرم بر اساس اصول عمومی قوانین GDPR (مقررات عمومی حفاظت از داده‌های اروپا) شامل شفافیت، حق دسترسی و اصلاح اطلاعات.",
    color: "text-amber-600 dark:text-luma-yellow",
    hex: COLORS.yellow
  },
  {
    icon: Mail,
    title: "ارتباط امنیتی و گزارش آسیب‌پذیری",
    statusText: "کانال رسمی فعال",
    statusType: "implemented",
    description: "پشتیبانی از افشای مسئولانه (Responsible Disclosure) و امکان ارتباط مستقیم با تیم امنیت لوما از طریق ایمیل رسمی security@luma.ai.",
    color: "text-rose-600 dark:text-luma-pink",
    hex: COLORS.pink
  }
];

interface SecurityCardProps {
  item: FeatureItem;
  index: number;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ item, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const getStatusBadgeStyle = () => {
    switch (item.statusType) {
      case 'implemented':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'infrastructure':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-luma-purple border-indigo-500/20';
      case 'planned':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'principles':
        return 'bg-rose-500/10 text-rose-600 dark:text-luma-pink border-rose-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="h-full"
    >
      <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          className="group relative h-full rounded-[32px] p-px overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-zinc-200/50 dark:bg-white/5"
      >
          {/* Dynamic Border Gradient */}
          <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                  background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${item.hex}50, transparent 40%)`
              }}
          />

          {/* Inner Content Container */}
          <div className="relative h-full bg-white dark:bg-[#0c0c0e] border border-zinc-200/60 dark:border-white/5 rounded-[31px] overflow-hidden flex flex-col p-8 transition-colors duration-300">
              
              {/* Subtle Inner Glow following cursor */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] dark:group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${item.hex}, transparent 40%)`
                }}
              />
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Header: Icon & Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/55 dark:border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-350 shadow-inner group-hover:bg-zinc-200/70 dark:group-hover:bg-white/10 ${item.color}`}>
                      <item.icon size={24} />
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${getStatusBadgeStyle()}`}>
                    {item.statusType === 'planned' ? <Clock size={11} /> : <CheckCircle2 size={11} />}
                    <span>{item.statusText}</span>
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-gray-100 transition-colors">
                   {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light flex-1 group-hover:text-zinc-900 dark:group-hover:text-gray-300 transition-colors">
                   {item.description}
                </p>

                {/* Bottom Line Accent */}
                <div className="mt-6 h-0.5 w-full bg-zinc-150 dark:bg-white/5 rounded-full overflow-hidden">
                   <div 
                      className="h-full w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                      style={{ backgroundColor: item.hex }} 
                   />
                </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

export const SecurityFeatures: React.FC = () => {
  return (
      <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
         <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
         
         <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
             {/* Section Heading */}
             <div className="text-center max-w-3xl mx-auto mb-16">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5 }}
                 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 dark:border-luma-purple/20 bg-indigo-500/5 dark:bg-luma-purple/5 backdrop-blur-md mb-4"
               >
                 <Shield className="text-indigo-600 dark:text-luma-purple" size={16} />
                 <span className="text-xs font-bold text-indigo-700 dark:text-luma-purple tracking-wide uppercase">ارزیابی کنترل‌های امنیتی و حریم خصوصی</span>
               </motion.div>

               <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mb-4 leading-tight"
               >
                 حفاظت همه‌جانبه از داده‌ها و زیرساخت‌ها
               </motion.h2>

               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed"
               >
                 بررسی تفکیک‌شده لایه‌های امنیتی شامل رمزنگاری، کنترل دسترسی، زیرساخت ابری، حریم خصوصی و پروتکل‌های پاسخگویی
               </motion.p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                 {FEATURES.map((feature, idx) => (
                     <SecurityCard key={idx} item={feature} index={idx} />
                 ))}
             </div>
         </div>
      </section>
  );
};
