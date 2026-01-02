
import React from 'react';
import { Zap, Shield, ArrowLeft } from 'lucide-react';

export const ServiceFeatures: React.FC = () => {
  return (
      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <Zap className="w-10 h-10 text-luma-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2">سرعت بالا</h3>
                    <p className="text-gray-400">پردازش آنی درخواست‌ها با زیرساخت قدرتمند ابری.</p>
                </div>
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <Shield className="w-10 h-10 text-luma-pink mb-4" />
                    <h3 className="text-xl font-bold mb-2">امنیت کامل</h3>
                    <p className="text-gray-400">حفظ حریم خصوصی داده‌های شما اولویت ماست.</p>
                </div>
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <ArrowLeft className="w-10 h-10 text-luma-purple mb-4" />
                    <h3 className="text-xl font-bold mb-2">کاربری آسان</h3>
                    <p className="text-gray-400">رابط کاربری ساده بدون نیاز به دانش فنی.</p>
                </div>
            </div>
        </div>
      </section>
  );
};
