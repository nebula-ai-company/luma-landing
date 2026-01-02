
import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
      <section className="py-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">چگونه کار می‌کند؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Line connector (hidden on mobile) */}
             <div className="hidden md:block absolute top-12 right-0 left-0 h-0.5 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
             
             {[1, 2, 3].map((step) => (
               <div key={step} className="relative z-10 text-center">
                 <div className="w-24 h-24 mx-auto bg-background border border-white/10 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl">
                   {step}
                 </div>
                 <h3 className="text-xl font-bold mb-2">مرحله {step}</h3>
                 <p className="text-gray-400 text-sm">توضیحات مربوط به مرحله {step} برای استفاده از سرویس.</p>
               </div>
             ))}
          </div>
        </div>
      </section>
  );
};
