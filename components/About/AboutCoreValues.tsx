
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Rocket } from 'lucide-react';

const CoreCard = ({ 
  icon: Icon, 
  title, 
  desc, 
  index, 
  number 
}: { 
  icon: any, 
  title: string, 
  desc: string, 
  index: number,
  number: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2, duration: 0.7, ease: "easeOut" }}
      className="group relative p-1 rounded-[32px] overflow-hidden"
    >
      {/* Hover Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
      
      <div className="relative h-full bg-[#121212] border border-white/5 rounded-[30px] p-8 md:p-10 flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-luma-purple/5">
         
         {/* Background Number Decoration */}
         <span className="absolute -right-4 -top-8 text-[120px] font-black text-white/[0.02] select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:text-white/[0.04] font-mono">
            {number}
         </span>

         {/* Icon Container */}
         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 text-white relative z-10 group-hover:bg-luma-purple/10 group-hover:text-luma-purple group-hover:border-luma-purple/20 transition-all duration-300 shadow-lg">
            <Icon size={32} />
         </div>

         <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-luma-purple transition-colors duration-300">
            {title}
         </h3>
         
         <p className="text-gray-400 leading-relaxed font-light relative z-10 text-base">
            {desc}
         </p>

         {/* Bottom Accent Line */}
         <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-luma-purple to-luma-pink transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.div>
  );
};

export const AboutCoreValues: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-luma-purple/5 to-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

         <div className="max-w-screen-xl mx-auto px-6 relative z-10">
            
            <div className="mb-20">
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-black text-white mb-6"
               >
                  استراتژی <span className="text-luma-purple">محوری</span>
               </motion.h2>
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="h-1 w-24 bg-gradient-to-r from-luma-purple to-transparent rounded-full"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <CoreCard 
                  index={0}
                  number="01"
                  icon={Target} 
                  title="ماموریت ما" 
                  desc="دسترسی‌پذیر کردن قدرتمندترین ابزارهای هوش مصنوعی برای تمام فارسی‌زبانان، حذف موانع تحریم و ارائه زیرساختی امن، پایدار و ارزان برای خلاقان."
               />
               <CoreCard 
                  index={1}
                  number="02"
                  icon={Users} 
                  title="تیم متخصص" 
                  desc="متشکل از نخبگان مهندسی نرم‌افزار، محققان هوش مصنوعی و طراحان محصول که با اشتیاق برای حل چالش‌های تکنولوژیک گرد هم آمده‌اند."
               />
               <CoreCard 
                  index={2}
                  number="03"
                  icon={Rocket} 
                  title="چشم‌انداز" 
                  desc="تبدیل شدن به قطب اصلی نوآوری هوش مصنوعی در خاورمیانه و ارائه اکوسیستمی جامع که در آن هر ایده به واقعیت تبدیل می‌شود."
               />
            </div>
         </div>
    </section>
  );
};
