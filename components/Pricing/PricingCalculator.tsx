
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Settings2, Info, MonitorPlay, Image as ImageIcon, Volume2 } from 'lucide-react';
import { ModelPricing } from './PricingData';

interface PricingCalculatorProps {
  models: ModelPricing[];
  defaultModelId?: string;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ models, defaultModelId }) => {
  const [selectedModel, setSelectedModel] = useState<ModelPricing>(models[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  // State for various parameters
  const [resolution, setResolution] = useState<string>('');
  const [quality, setQuality] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [upscaleFactor, setUpscaleFactor] = useState<string>('');
  const [webSearch, setWebSearch] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  useEffect(() => {
    if (defaultModelId) {
      const found = models.find(m => m.id === defaultModelId);
      if (found) setSelectedModel(found);
    }
  }, [defaultModelId, models]);

  // Reset/Initialize defaults when model changes
  useEffect(() => {
    const strategy = selectedModel.pricing_strategy;
    const prices = selectedModel.prices;

    if (strategy === 'resolution' || strategy === 'target_resolution') {
      const keys = Object.keys(prices);
      if (!keys.includes(resolution)) setResolution(keys[0]);
    } else if (strategy === 'quality') {
      const keys = Object.keys(prices);
      if (!keys.includes(quality)) setQuality('normal'); // Default to normal
    } else if (strategy === 'upscale_factor') {
      const keys = Object.keys(prices);
      if (!keys.includes(upscaleFactor)) setUpscaleFactor(keys[0]);
    } else if (strategy === 'duration_based') {
      const keys = Object.keys(prices);
      if (!keys.includes(duration)) setDuration(keys[0]);
    } else if (strategy === 'duration_quality_based') {
      const durKeys = Object.keys(prices);
      if (!durKeys.includes(duration)) setDuration(durKeys[0]);
    } else if (strategy === 'complex_audio') {
      const durKeys = Object.keys(prices);
      if (!durKeys.includes(duration)) setDuration(durKeys[0]);
    }
  }, [selectedModel]);

  // Calculate Price Logic
  useEffect(() => {
    let price = 0;
    const s = selectedModel.pricing_strategy;
    const p = selectedModel.prices;

    try {
        switch (s) {
        case 'fixed':
            price = selectedModel.price || 0;
            break;
        case 'resolution':
        case 'target_resolution':
            price = p[resolution] || 0;
            break;
        case 'quality':
            price = p[quality] || 0;
            break;
        case 'upscale_factor':
            price = p[upscaleFactor] || 0;
            break;
        case 'complex':
            const key = `${resolution}${webSearch ? '_web_search' : ''}`;
            price = p[key] || p[resolution] || 0;
            break;
        case 'duration_based':
            price = p[duration] || 0;
            break;
        case 'duration_quality_based':
            if (duration && p[duration]) {
                const resOptions = Object.keys(p[duration]);
                const currentRes = resOptions.includes(resolution) ? resolution : resOptions[0];
                if(currentRes !== resolution) setResolution(currentRes);
                price = p[duration][currentRes] || 0;
            }
            break;
        case 'complex_audio':
            if (duration && p[duration]) {
                const resOptions = Object.keys(p[duration]);
                const currentRes = resOptions.includes(resolution) ? resolution : resOptions[0];
                if(currentRes !== resolution) setResolution(currentRes);
                
                const audioKey = audio ? 'with_sound' : 'without_sound';
                price = p[duration][currentRes]?.[audioKey] || 0;
            }
            break;
        case 'duration_sound_based':
             if (duration && p[duration]) {
                const audioKey = audio ? 'with_sound' : 'without_sound';
                price = p[duration][audioKey] || 0;
             }
             break;
        case 'token_based':
             // For chat models, just show input price as base for now or 0 if calc is complex
             price = p.input || 0; 
             break;
        default:
            price = 0;
        }
    } catch (e) {
        price = 0;
    }

    setCalculatedPrice(price);
  }, [selectedModel, resolution, quality, duration, upscaleFactor, webSearch, audio]);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-[28px] shadow-2xl relative overflow-hidden group w-full h-full flex flex-col">
      
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-luma-purple/10 to-transparent blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* Header - Compact */}
      <div className="flex justify-between items-center p-4 pb-2 relative z-10 shrink-0">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings2 size={16} className="text-luma-yellow" />
            محاسبه‌گر هزینه
        </h3>
        <AnimatePresence>
            {selectedModel.badge && (
                <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-2 py-0.5 rounded-full bg-luma-yellow/10 text-luma-yellow text-[9px] font-bold border border-luma-yellow/20 shadow-lg shadow-luma-yellow/5"
                >
                    {selectedModel.badge}
                </motion.span>
            )}
        </AnimatePresence>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
          
          {/* Model Selector */}
          <div className="mb-4 relative z-20">
            <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">مدل هوش مصنوعی</label>
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full h-10 bg-[#1a1a1a] border rounded-lg flex items-center justify-between px-3 text-xs font-medium text-white transition-all duration-300
                        ${isOpen ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-white/10 hover:border-white/20'}
                    `}
                >
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luma-purple" />
                        {selectedModel.name}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-luma-purple' : 'text-gray-500'}`} />
                </button>
                
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 max-h-[220px] overflow-y-auto custom-scrollbar ring-1 ring-white/5"
                        >
                            {models.map(m => (
                                <div 
                                    key={m.id}
                                    onClick={() => { setSelectedModel(m); setIsOpen(false); }}
                                    className={`
                                        px-3 py-2 text-[11px] cursor-pointer flex justify-between items-center transition-colors
                                        ${selectedModel.id === m.id ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                    `}
                                >
                                    <span>{m.name}</span>
                                    {m.badge && <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-mono">{m.badge}</span>}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>

          {/* Dynamic Controls based on Strategy */}
          <div className="space-y-4 relative z-10">
             
             {/* Resolution Selector */}
             {(selectedModel.pricing_strategy === 'resolution' || selectedModel.pricing_strategy === 'complex' || selectedModel.pricing_strategy === 'target_resolution') && (
                 <div>
                     <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">رزولوشن خروجی</label>
                     <div className="flex gap-1.5 p-1 bg-[#1a1a1a] rounded-lg border border-white/5">
                         {Object.keys(selectedModel.prices).filter(k => !k.includes('_web')).map(key => (
                             <button
                                key={key}
                                onClick={() => setResolution(key)}
                                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all relative ${resolution === key ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                             >
                                 {resolution === key && (
                                    <motion.div 
                                        layoutId="res-pill"
                                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-md shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                 )}
                                 <span className="relative z-10">{key.toUpperCase()}</span>
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {/* Quality Selector */}
             {selectedModel.pricing_strategy === 'quality' && (
                 <div>
                     <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">کیفیت</label>
                     <div className="grid grid-cols-3 gap-1.5">
                         {Object.keys(selectedModel.prices).map(key => (
                             <button
                                key={key}
                                onClick={() => setQuality(key)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${quality === key ? 'bg-luma-pink/10 text-white border-luma-pink shadow-[0_0_10px_rgba(255,100,130,0.2)]' : 'bg-[#1a1a1a] text-gray-400 border-white/5 hover:bg-white/5'}`}
                             >
                                 {key === 'normal' ? 'نرمال' : key === 'good' ? 'خوب' : 'عالی'}
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {/* Duration Selector */}
             {(selectedModel.pricing_strategy.includes('duration')) && (
                 <div>
                     <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">مدت زمان ویدیو</label>
                     <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                         {Object.keys(selectedModel.prices).map(key => (
                             <button
                                key={key}
                                onClick={() => setDuration(key)}
                                className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all whitespace-nowrap
                                    ${duration === key 
                                        ? 'bg-luma-purple text-black border-luma-purple shadow-[0_0_15px_rgba(218,143,255,0.2)]' 
                                        : 'bg-[#1a1a1a] text-gray-400 border-white/5 hover:bg-white/5'}
                                `}
                             >
                                 <MonitorPlay size={10} />
                                 {key}
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {/* Secondary Resolution Selector (For Video) */}
             {(selectedModel.pricing_strategy === 'duration_quality_based' || selectedModel.pricing_strategy === 'complex_audio') && duration && selectedModel.prices[duration] && (
                 <div>
                     <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">کیفیت ویدیو</label>
                     <div className="flex gap-1.5 p-1 bg-[#1a1a1a] rounded-lg border border-white/5">
                         {Object.keys(selectedModel.prices[duration]).map(key => (
                             <button
                                key={key}
                                onClick={() => setResolution(key)}
                                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all relative ${resolution === key ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                             >
                                 {resolution === key && (
                                    <motion.div 
                                        layoutId="video-res-pill"
                                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-md shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                 )}
                                 <span className="relative z-10">{key.toUpperCase()}</span>
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {/* Upscale Factor */}
             {selectedModel.pricing_strategy === 'upscale_factor' && (
                 <div>
                     <label className="text-[9px] text-gray-500 font-bold uppercase mb-1.5 block tracking-wider">ضریب بزرگ‌نمایی</label>
                     <div className="grid grid-cols-5 gap-1.5">
                         {Object.keys(selectedModel.prices).map(key => (
                             <button
                                key={key}
                                onClick={() => setUpscaleFactor(key)}
                                className={`py-1 rounded-md text-[10px] font-bold border transition-all ${upscaleFactor === key ? 'bg-luma-yellow/20 text-luma-yellow border-luma-yellow shadow-[0_0_15px_rgba(255,179,64,0.2)]' : 'bg-[#1a1a1a] text-gray-400 border-white/5 hover:bg-white/5'}`}
                             >
                                 {key}
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {/* Web Search Toggle */}
             {selectedModel.pricing_strategy === 'complex' && (
                 <div 
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 ${webSearch ? 'bg-luma-purple/10 border-luma-purple/30' : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'}`}
                    onClick={() => setWebSearch(!webSearch)}
                 >
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${webSearch ? 'bg-luma-purple text-black' : 'bg-white/5 text-gray-500'}`}>
                            <Zap size={14} />
                        </div>
                        <div>
                            <span className={`text-[11px] font-bold block ${webSearch ? 'text-white' : 'text-gray-400'}`}>افزایش دقت</span>
                            <span className="text-[9px] text-gray-500">جستجو در وب</span>
                        </div>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${webSearch ? 'bg-luma-purple' : 'bg-white/10'}`}>
                        <motion.div 
                            className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-md"
                            animate={{ left: webSearch ? "18px" : "2px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                     </div>
                 </div>
             )}

             {/* Audio Toggle */}
             {(selectedModel.pricing_strategy === 'complex_audio' || selectedModel.pricing_strategy === 'duration_sound_based') && (
                 <div 
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 ${audio ? 'bg-luma-yellow/10 border-luma-yellow/30' : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'}`}
                    onClick={() => setAudio(!audio)}
                 >
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${audio ? 'bg-luma-yellow text-black' : 'bg-white/5 text-gray-500'}`}>
                            <Volume2 size={14} />
                        </div>
                        <div>
                            <span className={`text-[11px] font-bold block ${audio ? 'text-white' : 'text-gray-400'}`}>افزودن صدا</span>
                            <span className="text-[9px] text-gray-500">تولید افکت صوتی</span>
                        </div>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${audio ? 'bg-luma-yellow' : 'bg-white/10'}`}>
                        <motion.div 
                            className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-md"
                            animate={{ left: audio ? "18px" : "2px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                     </div>
                 </div>
             )}

             {selectedModel.pricing_strategy === 'fixed' && (
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center flex flex-col items-center gap-1.5">
                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Info size={12} className="text-gray-400" />
                     </div>
                     <span className="text-gray-300 text-[9px] font-medium">قیمت این مدل ثابت است.</span>
                 </div>
             )}

             {selectedModel.pricing_strategy === 'token_based' && (
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center flex flex-col items-center gap-1.5">
                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Info size={12} className="text-gray-400" />
                     </div>
                     <span className="text-gray-300 text-[9px] font-medium">قیمت بر اساس هر ۱ میلیون توکن محاسبه می‌شود.</span>
                 </div>
             )}

          </div>
      </div>

      {/* Footer: Price Display */}
      <div className="bg-[#050505] border-t border-white/10 px-6 py-4 flex justify-between items-center shrink-0">
         {/* Right Side (First Child in RTL): Label */}
         <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">هزینه نهایی</span>
         </div>

         {/* Left Side (Second Child in RTL): Price */}
         <div className="flex items-end gap-1.5">
            <span className="text-3xl font-black text-white tracking-tighter leading-none">
                {calculatedPrice.toLocaleString()}
            </span>
            <span className="text-luma-yellow text-sm font-bold mb-1">لوم</span>
         </div>
      </div>

    </div>
  );
};
