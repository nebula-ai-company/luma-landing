import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeOpen, ArrowUpRight, CheckCircle, ChatDots, User, Phone, Buildings } from '@phosphor-icons/react';
import Button from '../Button';

const MotionDiv = motion.div;

export const ConsultationCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('لطفا فیلدهای نام و شماره تماس را پر کنید.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', phone: '', company: '', message: '' });
    }, 1500);
  };

  return (
    <section id="consultation" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-300 relative border-t border-zinc-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Double-Bezel Card Frame */}
        <div className="max-w-4xl mx-auto bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-white/5 p-2 rounded-[2.5rem] shadow-xl">
          <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/40 dark:border-white/10 rounded-[2.2rem] p-8 md:p-12 relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-luma-pink/5 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-luma-purple/5 blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 text-right" dir="rtl">
              
              {/* Header Info Side */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <span className="text-[10px] text-luma-purple font-black uppercase tracking-[0.2em] mb-3 block">شروع تحول بیزنس شما</span>
                <h2 className="text-3xl font-black text-zinc-950 dark:text-white mb-6 leading-tight font-sans">
                  برای مشاورهٔ تخصصی و دریافت دمو آماده‌اید؟
                </h2>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-6">
                  تیم مهندسان ارشد و طراحان محصول لوما برای ارزیابی چالش‌های عملیاتی و ترسیم پایپ‌لاین‌های بهینه هوش مصنوعی در کنار شما هستند. فرم را پر کنید تا در کمتر از ۲۴ ساعت کاری با شما تماس بگیریم.
                </p>

                <div className="space-y-3.5">
                  {[
                    { label: 'بررسی زیرساخت فنی فعلی شما' },
                    { label: 'ارائه راهکار پایلوت و تست رایگان' },
                    { label: 'جلسه اختصاصی دمو با مدیران بخش' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" />
                      <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Side */}
              <div className="md:col-span-7">
                {success ? (
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]"
                  >
                    <CheckCircle size={64} className="text-emerald-500 mb-4" weight="duotone" />
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2 font-sans">درخواست شما با موفقیت ثبت شد</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">همکاران ما در دپارتمان سازمانی لوما به زودی جهت هماهنگی جلسه با شما تماس خواهند گرفت.</p>
                  </MotionDiv>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block pr-1">نام و نام خانوادگی</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثلا: رضا علوی"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-11 pr-10 pl-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 text-xs font-bold text-zinc-900 dark:text-white focus:border-luma-pink focus:ring-1 focus:ring-luma-pink outline-none transition-all"
                          />
                          <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block pr-1">شماره تماس</label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="مثلا: ۰۹۱۲۳۴۵۶۷۸۹"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-11 pr-10 pl-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 text-xs font-bold text-zinc-900 dark:text-white focus:border-luma-pink focus:ring-1 focus:ring-luma-pink outline-none transition-all"
                          />
                          <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>
                    </div>

                    {/* Company input */}
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block pr-1">نام شرکت / سازمان</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="مثلا: شرکت فناوران آریا"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full h-11 pr-10 pl-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 text-xs font-bold text-zinc-900 dark:text-white focus:border-luma-pink focus:ring-1 focus:ring-luma-pink outline-none transition-all"
                        />
                        <Buildings size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block pr-1">شرح خلاصه نیازهای سازمان</label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          placeholder="توضیح دهید که به چه صورت تمایل به ادغام هوش مصنوعی لوما با پلتفرم خود را دارید..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full p-4 pr-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 text-xs font-bold text-zinc-900 dark:text-white focus:border-luma-pink focus:ring-1 focus:ring-luma-pink outline-none transition-all resize-none"
                        />
                        <ChatDots size={16} className="absolute right-3.5 top-5 text-zinc-400" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      className="group relative w-full inline-flex items-center justify-between gap-6 px-5 py-3.5 text-sm font-black disabled:opacity-50"
                    >
                      <span>{loading ? 'در حال ارسال درخواست...' : 'ارسال درخواست مشاوره سازمانی'}</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
