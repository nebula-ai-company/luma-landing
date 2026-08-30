import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Cpu, Eye, Clock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import Button from '../Button';

export const CurrentPaymentModel: React.FC = () => {
  const steps = [
    {
      icon: Coins,
      badge: 'مرحله ۱',
      title: 'خرید اعتبار LUM',
      description: 'کاربران بر اساس حجم کار و نیاز پروژه‌های خود، بسته‌های اعتباری لوم را از طریق درگاه پرداخت امن شتاب شارژ می‌نمایند.',
      colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: Cpu,
      badge: 'مرحله ۲',
      title: 'مصرف اعتبار بر اساس مدل و عملیات',
      description: 'هر عملیات (تولید تصویر، ویدیو، پردازش صدا یا چت هوشمند) متناسب با نوع مدل، کیفیت و مدت‌زمان، میزان مشخصی لوم مصرف می‌کند.',
      colorClass: 'text-luma-purple bg-luma-purple/10 border-luma-purple/20'
    },
    {
      icon: Eye,
      badge: 'شفافیت کامل',
      title: 'هزینه قطعی پیش از اجرا در داشبورد',
      description: 'هزینه نهایی هر درخواست همان عددی است که پیش از اجرای عملیات در داشبورد به شما نمایش داده می‌شود و ملاک کسر اعتبار است.',
      colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Clock,
      badge: 'قوانین دوره',
      title: 'دوره اعتبار و انقضای بسته‌ها',
      description: 'بسته‌های اعتباری، هدایا و طرح‌های تشویقی ممکن است دارای دوره زمانی و قوانین انقضای مشخص باشند که در پنل کاربری درج می‌شود.',
      colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-transparent relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/30 backdrop-blur-md shadow-xs"
          >
            <Coins size={14} className="text-amber-500" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">وضعیت فعال استودیو خلاقیت</span>
            <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">مدل اعتباری لوم</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-5"
          >
            پرداخت فعلی استودیو <span className="text-gradient-animated">خلاقیت</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-zinc-600 dark:text-zinc-300 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            در حال حاضر، دسترسی به سرویس‌های استودیو خلاقیت لوما بدون نیاز به اشتراک ماهانه و صرفاً بر اساس شارژ و مصرف اعتبار لوم (LUM) انجام می‌شود.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group relative p-7 rounded-[28px] bg-white dark:bg-[#121212] border border-zinc-200/70 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                {/* Double-Bezel Highlight */}
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-black/[0.03] dark:ring-white/[0.04] pointer-events-none" />

                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.colorClass} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                      {step.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Bottom subtle status line */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                  <span>پایش لحظه‌ای در داشبورد</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Guidance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative p-6 md:p-8 rounded-[28px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 dark:from-purple-950/30 dark:via-zinc-900/50 dark:to-amber-950/20 border border-purple-500/20 dark:border-white/10 backdrop-blur-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start md:items-center gap-4 text-right">
            <div className="w-10 h-10 rounded-2xl bg-luma-purple/15 text-luma-purple flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white mb-1">
                تعرفه نهایی هر درخواست، همان رقم نمایش‌داده‌شده در داشبورد است
              </h4>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light">
                پلن‌های اشتراکی در بخش پایین، ساختار پیشنهادی و برنامه‌ریزی‌شده هستند. جهت مشاهده موجودی و مصرف اعتبار زنده وارد داشبورد شوید.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              externalHref="https://dash.lumai.ir/"
              className="w-full md:w-auto text-xs py-3 px-6 justify-center"
            >
              ورود به داشبورد و شارژ لوم
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
