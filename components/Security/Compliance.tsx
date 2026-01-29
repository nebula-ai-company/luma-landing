
import React from 'react';
import { CheckCircle2, Shield, FileText, Scale } from 'lucide-react';
import Button from '../Button';

export const Compliance: React.FC = () => {
  return (
      <section className="py-24 border-t border-white/5 bg-[#020202]">
         <div className="max-w-screen-xl mx-auto px-4">
            {/* Main Card - Darker Background to match premium theme */}
            <div className="bg-[#050505] border border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden">
                
                {/* Brand Color Ambient Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-luma-purple/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-luma-pink/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-white">شفافیت در پردازش داده‌ها</h2>
                        <div className="space-y-5">
                            {[
                                "داده‌های شما فقط برای ارائه سرویس به خود شما استفاده می‌شود.",
                                "هیچ شخص ثالثی بدون اجازه صریح شما به اطلاعات دسترسی ندارد.",
                                "سیستم‌های نظارت خودکار ۲۴/۷ برای جلوگیری از حملات سایبری فعال هستند.",
                                "پشتیبان‌گیری منظم و رمزنگاری شده در سرورهای آفلاین."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    {/* Checkmark in Brand Color (Pink) */}
                                    <CheckCircle2 className="text-luma-pink shrink-0 mt-1 group-hover:text-luma-purple transition-colors" size={20} />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Action Buttons - Updated */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Button href="/privacy" variant="primary" className="shadow-luma-purple/20">
                                <Scale size={18} />
                                حقوق و تعهدات کاربر
                            </Button>
                            {/* Replaced 'Contact' with 'Terms' as requested */}
                            <Button href="/terms" variant="secondary">
                                <FileText size={18} />
                                شرایط استفاده
                            </Button>
                        </div>
                    </div>
                    
                    {/* Code Block - LTR Enforced with inline style */}
                    <div className="relative">
                        <div 
                            className="bg-[#080808] border border-white/10 rounded-2xl p-6 font-mono text-xs text-gray-400 leading-relaxed overflow-hidden text-left shadow-2xl" 
                            dir="ltr"
                            style={{ direction: 'ltr' }}
                        >
                            
                            {/* Window Controls */}
                            <div className="flex gap-1.5 mb-6 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-luma-pink" />
                                <div className="w-2.5 h-2.5 rounded-full bg-luma-yellow" />
                                <div className="w-2.5 h-2.5 rounded-full bg-luma-purple" />
                            </div>

                            {/* Code Content - Strict Brand Colors */}
                            <div className="space-y-1">
                                <p><span className="text-luma-purple">const</span> <span className="text-luma-yellow">securityProtocol</span> = <span className="text-luma-purple">new</span> LumaGuard();</p>
                                <p className="mt-2"><span className="text-luma-pink">await</span> securityProtocol.<span className="text-luma-yellow">encrypt</span>({'{'}</p>
                                <p className="pl-4">mode: <span className="text-luma-pink">'AES-GCM'</span>,</p>
                                <p className="pl-4">keySize: <span className="text-luma-purple">256</span>,</p>
                                <p className="pl-4">data: <span className="text-luma-pink">'User_Sensitive_Content'</span></p>
                                <p>{'}'});</p>
                                <p className="mt-4 text-gray-500 italic">// Encryption Verified.</p>
                                <p className="text-gray-500 italic">// Secure Tunnel Established.</p>
                            </div>

                            {/* Status Indicator - Brand Yellow */}
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-luma-yellow font-bold tracking-wider">
                                <Shield size={14} className="fill-luma-yellow/20" />
                                <span>STATUS: SECURE</span>
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
