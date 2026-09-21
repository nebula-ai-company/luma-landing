import React, { useEffect } from 'react';
import { Home } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      id="not-found-main"
      className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-6 font-sans text-zinc-900 dark:text-white"
    >
      <div className="max-w-md w-full mx-auto text-center">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-xs font-mono shadow-sm">
          <span>خطای ۴۰۴</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
          صفحه مورد نظر یافت نشد
        </h1>

        {/* Explanatory text */}
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
          صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا نشانی اینترنتی آن تغییر یافته است.
        </p>

        {/* Clear link back to home */}
        <div className="flex justify-center">
          <Button href="/" variant="primary" className="inline-flex items-center gap-2">
            <Home size={18} aria-hidden="true" />
            <span>بازگشت به صفحه اصلی</span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
