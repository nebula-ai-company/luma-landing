import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING } from '../constants';
import { Check } from 'lucide-react';
import Button from './Button';

// Bypass type issues with framer-motion props
const Motion = motion as any;

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">قیمت‌گذاری شفاف</h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>ماهانه</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-surfaceHighlight rounded-full p-1 relative border border-white/10 transition-colors"
            >
              <div className={`w-5 h-5 bg-luma-pink rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? '-translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>سالانه <span className="text-luma-green text-green-400 text-xs">(۲۰٪ تخفیف)</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((tier, idx) => (
            <Motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 border ${tier.isPopular ? 'bg-surfaceHighlight border-luma-purple/50 shadow-2xl shadow-luma-purple/10' : 'bg-surface border-white/5'}`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-luma px-4 py-1 rounded-full text-xs font-bold text-black shadow-lg">
                  محبوب‌ترین
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-300 mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {tier.price === 0 ? 'تماس بگیرید' : (tier.price * (isYearly ? 10 : 1)).toLocaleString()}
                </span>
                {tier.price !== 0 && <span className="text-gray-500 text-sm mr-2">لوم / {isYearly ? 'سال' : 'ماه'}</span>}
              </div>

              <Button
                externalHref="https://lumai.ir/dashboard"
                variant={tier.isPopular ? 'primary' : 'secondary'}
                className="w-full mb-8"
              >
                {tier.cta}
              </Button>

              <ul className="space-y-4">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check className="w-5 h-5 text-luma-purple flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;