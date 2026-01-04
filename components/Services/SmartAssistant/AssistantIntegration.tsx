
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Link as LinkIcon, Share2 } from 'lucide-react';
import Button from '../../Button';

export const AssistantIntegration: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
       
       <div className="max-w-screen-xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-white mb-4">راه‌های اتصال</h2>
             <p className="text-gray-400">دستیار خود را در کمتر از ۵ دقیقه به کاربران معرفی کنید.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             
             {/* WordPress */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#111] p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-white/10 mb-6 relative z-10">
                   {/* WP Logo Simulation */}
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="font-serif font-bold text-[#111] text-lg">W</span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">پلاگین وردپرس</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                   افزونه رسمی لوما را دانلود و نصب کنید. تنها با وارد کردن "شناسه دستیار"، آیکون چت در سایت شما ظاهر می‌شود.
                </p>
                <Button externalHref="https://lumai.ir/dashboard" variant="secondary" className="w-full justify-center group-hover:border-white/30">
                   <Download size={16} />
                   دانلود پلاگین
                </Button>
             </motion.div>

             {/* Public Link */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#111] p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-luma-purple/10 blur-[50px] rounded-full group-hover:bg-luma-purple/20 transition-colors" />
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-white/10 mb-6 relative z-10">
                   <LinkIcon className="text-luma-purple" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">لینک اختصاصی</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                   وب‌سایت ندارید؟ مشکلی نیست. یک لینک مستقیم (مانند assistant.lumai.ir) دریافت کنید و در بیو اینستاگرام بگذارید.
                </p>
                <Button externalHref="https://lumai.ir/dashboard" variant="secondary" className="w-full justify-center group-hover:border-luma-purple/30">
                   <Share2 size={16} />
                   دریافت لینک
                </Button>
             </motion.div>

          </div>
       </div>
    </section>
  );
};
