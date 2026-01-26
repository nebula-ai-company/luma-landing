
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Button from '../../Button';
import { Service } from '../../../types';

export const ServiceHero: React.FC<{ service: Service }> = ({ service }) => {
  return (
      <section className="py-12 md:py-24 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-surfaceHighlight border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-luma-pink">
              <service.icon size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {service.description}. با استفاده از جدیدترین مدل‌های هوش مصنوعی لوما، خلاقیت خود را بدون محدودیت گسترش دهید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                externalHref="https://dash.lumai.ir/" 
                variant="primary"
                className="px-8 py-4"
              >
                همین حالا امتحان کنید
              </Button>
              <div className="flex items-center justify-center gap-2 px-6 text-gray-400">
                <Clock size={20} />
                <span>پردازش زیر ۵ ثانیه</span>
              </div>
            </div>
          </div>
          <div className="bg-surfaceHighlight rounded-3xl aspect-video border border-white/10 overflow-hidden relative group">
             {/* Simulated App Interface */}
             <div className="absolute top-0 w-full h-12 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <div className="w-full h-full flex items-center justify-center pt-12">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 border-4 border-luma-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-luma-purple font-mono">Processing...</p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>
  );
};
