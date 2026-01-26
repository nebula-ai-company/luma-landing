
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Target, Rocket } from 'lucide-react';
import CTA from '../components/CTA';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
      
      {/* Hero */}
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto px-6 relative z-10 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
           >
              <Sparkles size={14} className="text-luma-purple" />
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">داستان ما</span>
           </motion.div>
           
           <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              خلق آینده‌ای <span className="text-gradient-animated">هوشمند</span>
           </h1>
           
           <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              ما در لوما معتقدیم که هوش مصنوعی نباید جایگزین خلاقیت انسان شود، بلکه باید ابزاری برای گسترش مرزهای تخیل باشد.
           </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
         <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { icon: Target, title: "ماموریت ما", desc: "دسترسی‌پذیر کردن قدرتمندترین ابزارهای هوش مصنوعی برای تمام فارسی‌زبانان، بدون محدودیت‌های تحریم و پرداخت." },
                  { icon: Users, title: "تیم ما", desc: "متشکل از مهندسان نرم‌افزار، محققان هوش مصنوعی و طراحان خلاق که عاشق تکنولوژی هستند." },
                  { icon: Rocket, title: "چشم‌انداز", desc: "تبدیل شدن به قطب اصلی نوآوری هوش مصنوعی در خاورمیانه و ارائه راهکارهای بومی‌سازی شده." }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="bg-[#121212] border border-white/5 p-8 rounded-[32px] hover:border-white/10 transition-colors"
                  >
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-luma-purple">
                        <item.icon size={28} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                     <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      <CTA />
    </div>
  );
};

export default AboutPage;
