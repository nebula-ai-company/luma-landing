
import React from 'react';
import { CheckCircle2, Shield, FileText, Scale, Mail } from 'lucide-react';
import Button from '../Button';

export const Compliance: React.FC = () => {
  return (
      <section className="py-24 border-t border-zinc-200/50 dark:border-white/5 bg-[#FAFAFA] dark:bg-[#020202] transition-colors duration-300">
         <div className="max-w-screen-xl mx-auto px-4">
            {/* Main Card - Darker Background to match premium theme */}
            <div className="bg-white dark:bg-[#050505] border border-zinc-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-zinc-150/40 dark:shadow-black/50 transition-colors duration-300">
                
                {/* Brand Color Ambient Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-luma-purple/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-luma-pink/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 font-sans">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white transition-colors duration-300">شفافیت و تعهدات امنیتی لوما</h2>
                        
                        <div className="space-y-4">
                            {[
                                "چرخه حیات داده (Data Lifecycle): داده‌ها تنها برای ارائه‌خدمات پردازش شده و پس از اتمام نیاز کاربر یا پاکسازی حساب، به‌صورت کامل حذف می‌شوند.",
                                "پردازنده‌های فرعی و زیرساخت (Subprocessors): بهره‌گیری از زیرساخت‌های ابری ایزوله با استاندارد ISO 27001 و ارزیابی مداوم ریسک زنجیره تأمین.",
                                "پاسخگویی به حوادث (Incident Response): پایش خودکار ۲۴/۷ ترافیک و سامانه ثبت لاگ برای شناسایی سریع و مهار تهدیدات احتمالی.",
                                "پشتیبان‌گیری رمزنگاری‌شده: ذخیره‌سازی و بکاپ‌های دوره‌ای تنها به‌صورت رمزنگاری‌شده با الگوریتم AES-256 (کلید متقارن ۲۵۶ بیتی)."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    <CheckCircle2 className="text-rose-600 dark:text-luma-pink shrink-0 mt-1 hover:text-indigo-600 dark:hover:text-luma-purple transition-colors duration-300" size={20} />
                                    <span className="text-xs sm:text-sm text-zinc-700 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Security Contacts Banner */}
                        <div className="mt-8 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-luma-purple/15 text-indigo-600 dark:text-luma-purple flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">ارتباط با تیم امنیت و افشای مسئولانه</h4>
                                    <p className="text-[11px] text-zinc-500 dark:text-gray-400 font-mono dir-ltr text-right">security@luma.ai</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                               پاسخگویی سریع
                            </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button href="/privacy" variant="primary" className="shadow-luma-purple/20">
                                <Scale size={18} />
                                سیاست حریم خصوصی
                            </Button>
                            <Button href="/terms" variant="secondary">
                                <FileText size={18} />
                                شرایط استفاده
                            </Button>
                        </div>
                    </div>
                    
                    {/* Code Block - LTR Enforced with inline style */}
                    <div className="relative">
                        <div 
                            className="bg-[#0c0c0e] border border-zinc-200/50 dark:border-white/10 rounded-2xl p-6 font-mono text-xs text-gray-400 leading-relaxed overflow-hidden text-left shadow-2xl shadow-zinc-250/50 dark:shadow-black transition-colors duration-300" 
                            dir="ltr"
                            style={{ direction: 'ltr' }}
                        >
                            
                            {/* Window Controls */}
                            <div className="flex gap-1.5 mb-6 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6482]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFB340]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#DA8FFF]" />
                            </div>

                            {/* Code Content - Strict Brand Colors */}
                            <div className="space-y-1">
                                <p><span className="text-[#DA8FFF]">const</span> <span className="text-[#FFB340]">securityProtocol</span> = <span className="text-[#DA8FFF]">new</span> LumaGuard();</p>
                                <p className="mt-2"><span className="text-[#FF6482]">await</span> securityProtocol.<span className="text-[#FFB340]">encrypt</span>({'{'}</p>
                                <p className="pl-4">transit: <span className="text-[#FF6482]">'TLS-1.3'</span>, <span className="text-gray-500">// Network Tunnel</span></p>
                                <p className="pl-4">storage: <span className="text-[#FF6482]">'AES-256-GCM'</span>, <span className="text-gray-500">// At-Rest Encryption</span></p>
                                <p className="pl-4">accessControl: <span className="text-[#FF6482]">'RBAC_Enforced'</span>, <span className="text-gray-500">// Least Privilege</span></p>
                                <p className="pl-4">privacy: <span className="text-[#FF6482]">'No_AI_Public_Training'</span></p>
                                <p>{'}'});</p>
                                <p className="mt-4 text-gray-500 italic">// Encryption & Compliance Verified.</p>
                                <p className="text-gray-500 italic">// Secure Pipeline Established.</p>
                            </div>

                            {/* Status Indicator - Brand Yellow */}
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[#FFB340] font-bold tracking-wider">
                                <div className="flex items-center gap-2">
                                    <Shield size={14} className="fill-[#FFB340]/20" />
                                    <span>STATUS: SECURE</span>
                                </div>
                                <span className="text-[10px] text-gray-500 font-sans">تیر ۱۴۰۳ / جولای ۲۰۲۶</span>
                            </div>
                        </div>
                        
                        {/* Glow Behind Code Block */}
                        <div className="absolute -inset-1 bg-luma-purple/20 blur-3xl -z-10 opacity-20" />
                    </div>
                </div>
            </div>
         </div>
      </section>
  );
};
