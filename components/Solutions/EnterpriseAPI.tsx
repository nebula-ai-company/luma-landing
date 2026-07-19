import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Clipboard, Check, ArrowUpRight } from '@phosphor-icons/react';

const MotionDiv = motion.div;

export const EnterpriseAPI: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCode, setActiveCode] = useState<'javascript' | 'curl'>('javascript');

  const JS_CODE = `// نمونه اتصال به سرویس پرو مجازی هوشمند لوما
import { LumaClient } from '@luma/sdk';

const luma = new LumaClient({
  apiKey: 'luma_live_pr_48a97fec002'
});

// اجرای پایپ‌لاین مدلینگ پوشاک روی عکس مانکن
const result = await luma.apparel.createTryOn({
  clothingImage: 'https://cdn.brand.com/products/classic-shirt.png',
  modelId: 'male_athletic_04',
  resolution: '4k',
  backgroundColor: '#f5f5f7'
});

console.log(\`تصویر خروجی آماده شد: \${result.url}\`);`;

  const CURL_CODE = `# فراخوانی وب‌سرویس مستقیم از خط فرمان لینوکس
curl -X POST "https://api.lumai.ir/v1/tryon" \\
  -H "Authorization: Bearer luma_live_pr_48a97fec002" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clothing_url": "https://cdn.brand.com/products/classic-shirt.png",
    "model_id": "male_athletic_04",
    "resolution": "4k"
  }'`;

  const handleCopy = () => {
    const code = activeCode === 'javascript' ? JS_CODE : CURL_CODE;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-transparent transition-colors duration-300 relative">
      {/* Smoothly masked background */}
      <div className="absolute inset-0 bg-white dark:bg-[#050505] z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,white_120px,white_calc(100%-120px),transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side (Right in RTL layout) */}
          <div className="lg:col-span-5 text-right order-2 lg:order-1" dir="rtl">
            <span className="text-[10px] text-luma-pink font-black uppercase tracking-[0.2em] mb-3 block">یکپارچه‌سازی ابری</span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-white mb-6 font-sans">
              اتصال آسان در کسری از ثانیه با مستندات فنی غنی
            </h2>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-8">
              کسب‌وکار خود را بدون اتلاف وقت به جدیدترین مدل‌های هوش مصنوعی ما مجهز کنید. با مستندات کامل SDK در زبان‌های برنامه‌نویسی محبوب، توسعه‌دهندگان شما می‌توانند در کمتر از ۱۰ دقیقه سیستم را تست و به محصول اصلی وصل کنند.
            </p>

            <div className="space-y-4">
              {[
                { title: 'کاهش پیچیدگی زیرساخت', desc: 'بدون نیاز به خرید پردازنده‌های گرافیکی گران‌قیمت یا بهینه‌سازی مدل‌های حجیم محلی.' },
                { title: 'نرخ تاخیر حداقلی', desc: 'سرورهای پاسخگو و محلی لوما با پاسخ‌دهی فوق‌سریع در پردازش درخواست‌ها.' },
                { title: 'توسعه با امنیت بومی', desc: 'پشتیبانی کامل از احراز هویت دوعاملی سازمانی و سیاست‌های مدیریت کاربران.' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luma-pink mt-2 shrink-0 animate-pulse" />
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200">{benefit.title}</h4>
                    <p className="text-[11px] md:text-xs text-zinc-400 mt-1">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#/docs"
                className="group inline-flex items-center gap-2 text-sm font-black text-luma-pink hover:text-[#e5506e] transition-colors"
              >
                <span>مشاهده کامل مستندات فنی و API Reference</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Terminal / Code Editor Side (Left) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="h-12 bg-[#121215] border-b border-white/5 flex items-center justify-between px-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                
                {/* Code Tabs */}
                <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveCode('javascript')}
                    className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      activeCode === 'javascript' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    TypeScript
                  </button>
                  <button
                    onClick={() => setActiveCode('curl')}
                    className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      activeCode === 'curl' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    cURL
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded bg-zinc-800/40 text-zinc-400 hover:text-white transition-colors border border-white/5"
                  title="کپی کردن کد"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Clipboard size={14} />}
                </button>
              </div>

              {/* Code Editor view box */}
              <div className="p-6 font-mono text-xs text-left overflow-x-auto text-zinc-300 select-all" dir="ltr">
                <pre className="whitespace-pre">
                  {activeCode === 'javascript' ? (
                    <code>
                      {`// نمونه اتصال به سرویس پرو مجازی هوشمند لوما
import { LumaClient } from '@luma/sdk';

const luma = new LumaClient({
  apiKey: 'luma_live_pr_48a97fec002'
});

// اجرای پایپ‌لاین مدلینگ پوشاک روی عکس مانکن
const result = await luma.apparel.createTryOn({
  clothingImage: 'https://cdn.brand.com/products/classic-shirt.png',
  modelId: 'male_athletic_04',
  resolution: '4k',
  backgroundColor: '#f5f5f7'
});

console.log(\`تصویر خروجی آماده شد: \${result.url}\`);`}
                    </code>
                  ) : (
                    <code>
                      {`# فراخوانی وب‌سرویس مستقیم از خط فرمان لینوکس
curl -X POST "https://api.lumai.ir/v1/tryon" \\
  -H "Authorization: Bearer luma_live_pr_48a97fec002" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clothing_url": "https://cdn.brand.com/products/classic-shirt.png",
    "model_id": "male_athletic_04",
    "resolution": "4k"
  }'`}
                    </code>
                  )}
                </pre>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
