
import React, { useEffect } from 'react';
import Button from '../components/Button';
import { Hero } from '../components/Services/AllServices/Hero';
import { ServiceGrid } from '../components/Services/AllServices/ServiceGrid';
import { Workflows } from '../components/Services/AllServices/Workflows';

const AllServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-pink selection:text-white">
      <Hero />
      <ServiceGrid />
      <Workflows />

      {/* --- CTA --- */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
         <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">آماده خلق کردن هستید؟</h2>
             <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                به جمع ۱۰,۰۰۰+ کاربری بپیوندید که با لوما مرزهای خلاقیت را جابجا کرده‌اند.
                بدون نیاز به کارت اعتباری.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button externalHref="https://lumai.ir/dashboard" variant="primary" className="w-full sm:w-auto px-12 py-4 text-lg shadow-[0_0_40px_rgba(255,100,130,0.4)] hover:shadow-[0_0_60px_rgba(255,100,130,0.6)]">
                   شروع رایگان
                </Button>
                <Button externalHref="/pricing" variant="secondary" className="w-full sm:w-auto px-12 py-4 text-lg">
                   مشاهده تعرفه‌ها
                </Button>
             </div>
         </div>
      </section>
    </div>
  );
};

export default AllServicesPage;
