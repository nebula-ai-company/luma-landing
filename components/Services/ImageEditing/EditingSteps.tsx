import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Paintbrush, Cpu, Download, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "آپلود یا انتخاب تصویر",
    desc: "تصویر اصلی خود را بارگذاری کنید یا با وارد کردن دستور متنی یک تصویر جدید از صفر بپراکنید.",
    color: "text-luma-purple",
    bgColor: "bg-luma-purple/10",
    borderColor: "border-luma-purple/20",
    glowColor: "#DA8FFF"
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "انتخاب ناحیه و دستور متنی",
    desc: "با قلم‌مو ناحیه مورد نظر برای تغییر را مشخص کرده و تغییرات دلخواه خود را به فارسی یا انگلیسی بنویسید.",
    color: "text-luma-pink",
    bgColor: "bg-luma-pink/10",
    borderColor: "border-luma-pink/20",
    glowColor: "#FF6482"
  },
  {
    number: "03",
    icon: Cpu,
    title: "انتخاب مدل و کیفیت",
    desc: "از میان مدل‌های هوش مصنوعی متنوع مانند Flux 2، Qwen Edit و Nano Banana مناسب‌ترین را برای هدف خود برگزینید.",
    color: "text-luma-yellow",
    bgColor: "bg-luma-yellow/10",
    borderColor: "border-luma-yellow/20",
    glowColor: "#FFB340"
  },
  {
    number: "04",
    icon: Download,
    title: "دریافت خروجی باکیفیت",
    desc: "تصویر ویرایش‌شده را با وضوح بالا و در نسبت‌های ابعادی مختلف مشاهده و ذخیره کنید.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    glowColor: "#10B981"
  }
];

export const EditingSteps: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 font-sans" dir="rtl">
      
      {/* Top & Bottom Seamless Transition Fades */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to bottom, #FAFAFA 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to top, #FAFAFA 0%, transparent 100%)'
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-luma-purple/5 blur-[140px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md mb-6 shadow-sm"
          >
            <Sparkles size={14} className="text-luma-purple animate-pulse" />
            <span className="text-zinc-600 dark:text-gray-300 text-xs font-bold tracking-wider">
              مسیر ساده خلق اثر
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
          >
            ویرایش تصاویر در <span className="text-gradient-animated">۴ گام ساده</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            از ایده اولیه تا خروجی نهایی، همه چیز با رابط کاربری هوشمند و روان انجام می‌شود.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative group rounded-[28px] p-px overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}
              >
                {/* Inner Card Container */}
                <div className="relative h-full bg-white dark:bg-[#0c0c0e] border border-black/5 dark:border-white/5 rounded-[27px] p-7 flex flex-col justify-between transition-colors duration-300 shadow-xl shadow-black/[0.02]">
                  
                  {/* Background Hover Tint */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-[27px]"
                    style={{
                      background: `radial-gradient(400px circle at center, ${step.glowColor}, transparent 70%)`
                    }}
                  />

                  <div>
                    {/* Top Header: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-12 h-12 rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                        <IconComponent size={22} />
                      </div>
                      <span className="text-3xl font-black font-mono text-zinc-300 dark:text-zinc-800 group-hover:text-zinc-400 group-hover:dark:text-zinc-700 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title & Desc */}
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-luma-purple transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow Arrow for desktop */}
                  {idx < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-[#151518] border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-400 dark:text-gray-500 shadow-md">
                        <ArrowLeft size={12} className="rotate-0 dir-rtl:rotate-0" />
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
