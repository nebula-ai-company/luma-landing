
import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';
import Button from '../Button';

export const Compliance: React.FC = () => {
  return (
      <section className="py-24 border-t border-white/5">
         <div className="max-w-screen-xl mx-auto px-4">
            <div className="bg-surfaceHighlight border border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">شفافیت در پردازش داده‌ها</h2>
                        <div className="space-y-4">
                            {[
                                "داده‌های شما فقط برای ارائه سرویس به خود شما استفاده می‌شود.",
                                "هیچ شخص ثالثی بدون اجازه صریح شما به اطلاعات دسترسی ندارد.",
                                "سیستم‌های نظارت خودکار ۲۴/۷ برای جلوگیری از حملات سایبری فعال هستند.",
                                "پشتیبان‌گیری منظم و رمزنگاری شده در سرورهای آفلاین."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                            <Button externalHref="mailto:security@luma.ir" variant="secondary" className="border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/5">
                                تماس با تیم امنیت
                            </Button>
                            <Button href="/terms" variant="secondary">
                                مطالعه قوانین و مقررات
                            </Button>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-xs text-gray-400 leading-relaxed overflow-hidden">
                            <div className="flex gap-1.5 mb-4 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            </div>
                            <p><span className="text-purple-400">const</span> <span className="text-emerald-400">securityProtocol</span> = <span className="text-purple-400">new</span> LumaGuard();</p>
                            <p className="mt-2"><span className="text-blue-400">await</span> securityProtocol.<span className="text-yellow-400">encrypt</span>({'{'}</p>
                            <p className="pl-4">mode: <span className="text-orange-400">'AES-GCM'</span>,</p>
                            <p className="pl-4">keySize: <span className="text-blue-300">256</span>,</p>
                            <p className="pl-4">data: <span className="text-orange-400">'User_Sensitive_Content'</span></p>
                            <p>{'}'});</p>
                            <p className="mt-2 text-gray-500">// Encryption Verified.</p>
                            <p className="text-gray-500">// Secure Tunnel Established.</p>
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold">
                                <Shield size={14} />
                                <span>STATUS: SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
  );
};
