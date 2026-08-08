
import React from 'react';
import Button from '../Button';
import { useTheme } from '../../lib/ThemeContext';

export const PricingPlaceholder: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luma-purple/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-lg w-full backdrop-blur-sm relative z-10 transition-colors">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">تعرفه‌ها</h1>
          <p className="text-zinc-500 dark:text-gray-400 mb-8 leading-relaxed">این صفحه در دست طراحی است. به زودی می‌توانید لیست کامل بسته‌ها و قیمت‌های خدمات هوش مصنوعی لوما را در اینجا مشاهده کنید.</p>
          <Button href="/" variant="secondary" className="w-full justify-center">بازگشت به خانه</Button>
      </div>
    </div>
  );
};
