
import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ label, value, delay }: { label: string, value: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center justify-center p-6 border-r border-white/5 last:border-0"
  >
    <span className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{value}</span>
    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">{label}</span>
  </motion.div>
);

export const AboutStats: React.FC = () => {
  return (
    <section className="border-b border-white/5 bg-[#0c0c0e] relative z-20">
       <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-white/5">
             <StatItem label="کاربر فعال" value="+۱۵۰,۰۰۰" delay={0} />
             <StatItem label="پروژه موفق" value="+۲ میلیون" delay={0.1} />
             <StatItem label="ابزار هوشمند" value="۱۸" delay={0.2} />
             <StatItem label="رضایت کاربران" value="۹۸٪" delay={0.3} />
          </div>
       </div>
    </section>
  );
};
