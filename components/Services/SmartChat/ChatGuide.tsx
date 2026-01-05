
import React from 'react';
import { ArrowLeft, MessageSquare, History, MousePointerClick } from 'lucide-react';

const STEPS = [
    { title: '۱. انتخاب مدل', desc: 'روی نام مدل کلیک کنید تا لیست باز شود. آیکون‌های کنار مدل‌ها (فایل، وب، ابزار) را بررسی کنید.', icon: MousePointerClick },
    { title: '۲. شروع گفتگو', desc: 'سوال بپرسید یا فایل آپلود کنید. می‌توانید فارسی محاوره صحبت کنید.', icon: MessageSquare },
    { title: '۳. مدیریت تاریخچه', desc: 'مکالمات شما ذخیره می‌شوند. برای دسترسی به آنها از نوار کناری استفاده کنید.', icon: History },
];

export const ChatGuide: React.FC = () => {
  return (
    <section className="py-20 bg-[#0c0c0e] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">چگونه شروع کنیم؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-l from-transparent via-white/10 to-transparent z-0" />
                
                {STEPS.map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 shadow-lg">
                            <step.icon size={28} className="text-luma-pink" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-[250px]">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
