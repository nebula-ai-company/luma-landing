
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Zap, Globe, FileText, Wrench } from 'lucide-react';

const MODELS = [
    { name: 'GPT-5', tag: 'Flagship', desc: 'هوشمندترین مدل جهان', icon: Brain, color: 'text-luma-purple' },
    { name: 'Claude 3.7 Sonnet', tag: 'Coding', desc: 'استاد کدنویسی و منطق', icon: Cpu, color: 'text-orange-400' },
    { name: 'Gemini 3 Pro', tag: 'Analysis', desc: 'پنجره متنی ۲ میلیون کلمه‌ای', icon: Globe, color: 'text-blue-400' },
    { name: 'GPT-4o Mini', tag: 'Daily', desc: 'سریع و بسیار ارزان', icon: Zap, color: 'text-green-400' },
    { name: 'o3-mini', tag: 'Reasoning', desc: 'متفکر و استدلالی', icon: Brain, color: 'text-pink-400' },
];

const TOOLS = [
    { icon: FileText, label: "تحلیل فایل", desc: "PDF, Word, Excel" },
    { icon: Wrench, label: "ابزار لوما", desc: "Widgets & Artifacts" },
    { icon: Globe, label: "اینترنت", desc: "سرچ آنلاین زنده" },
];

export const ChatModels: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
                
                {/* Left: Models Grid */}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <Cpu className="text-luma-purple" />
                        شورای مشورتی شما
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MODELS.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#151515] border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:border-white/20 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${m.color}`}>
                                    <m.icon size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-bold text-sm">{m.name}</h4>
                                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">{m.tag}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Tools & Guide */}
                <div className="flex-1 lg:pl-12">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <Wrench className="text-luma-yellow" />
                        جعبه‌ابزار هوشمند
                    </h3>
                    <div className="space-y-6">
                        <p className="text-gray-400 leading-relaxed">
                            در کنار مدل‌ها، ابزارهای کمکی آیکون‌دار به شما قدرت فوق‌العاده‌ای می‌دهند. با کلیک روی نام مدل، این ابزارها را مشاهده خواهید کرد:
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            {TOOLS.map((t, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-luma-yellow/10 flex items-center justify-center text-luma-yellow">
                                        <t.icon size={16} />
                                    </div>
                                    <div>
                                        <span className="text-white font-bold text-sm block">{t.label}</span>
                                        <span className="text-gray-500 text-xs">{t.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};
