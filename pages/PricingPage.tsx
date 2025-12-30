import React from 'react';
import Button from '../components/Button';

const PricingPage: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 max-w-lg w-full backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4 text-white">تعرفه‌ها</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">این صفحه در دست طراحی است. به زودی می‌توانید لیست کامل بسته‌ها و قیمت‌های خدمات هوش مصنوعی لوما را در اینجا مشاهده کنید.</p>
          <Button href="/" variant="secondary" className="w-full justify-center">بازگشت به خانه</Button>
      </div>
    </div>
  );
};

export default PricingPage;