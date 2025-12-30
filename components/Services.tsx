import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowLeft } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-surface/50 relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            <span className="border-b-4 border-luma-pink/50 pb-2">خدمات لوما</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            مجموعه‌ای کامل از ابزارهای هوش مصنوعی برای نیازهای خلاقانه و تجاری شما
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.path} className="block h-full group">
                <div className="h-full bg-surfaceHighlight border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-luma-purple/30">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-luma-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-luma-pink">
                      <service.icon size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-luma-purple transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                      مشاهده جزئیات
                      <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;