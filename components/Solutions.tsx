import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOLUTIONS } from '../constants';
import { CheckCircle2, ArrowRightLeft } from 'lucide-react';

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);
  const activeSolution = SOLUTIONS.find(s => s.id === activeTab) || SOLUTIONS[0];
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <section id="solutions" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">راهکارها برای هر صنعت</h2>
          <p className="text-gray-400">چگونه لوما کسب‌وکار شما را متحول می‌کند؟</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {SOLUTIONS.map((solution) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(solution.id)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                activeTab === solution.id 
                  ? 'bg-white text-black border-white shadow-lg shadow-white/20 scale-105' 
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10 backdrop-blur-sm'
              }`}
            >
              {solution.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            key={`content-${activeTab}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">{activeSolution.title}</h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {activeSolution.description}
            </p>
            
            <div className="space-y-4 mb-8">
              {activeSolution.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-luma-green text-green-400 w-6 h-6 flex-shrink-0" />
                  <span className="text-gray-200">{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-surfaceHighlight p-6 rounded-2xl border border-white/5">
              <h4 className="text-sm font-bold text-gray-400 mb-4">ماشین حساب بازگشت سرمایه (ماهانه)</h4>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-gray-300 text-sm">هزینه فعلی شما</span>
                 <span className="text-2xl font-bold text-white">{(sliderValue * 100000).toLocaleString()} <span className="text-xs text-gray-500">تومان</span></span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-luma-pink mb-6"
              />
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                 <span className="text-sm text-gray-400">صرفه‌جویی با لوما:</span>
                 <span className="text-xl font-bold text-luma-green text-green-400">{(sliderValue * 100000 * 0.9).toLocaleString()} تومان</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`visual-${activeTab}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
          >
             {/* Simple Before/After Effect simulated with CSS since we lack a library */}
             <div className="absolute inset-0 w-full h-full">
               <img src={activeSolution.imageAfter} alt="After" className="absolute inset-0 w-full h-full object-cover" />
               <div 
                 className="absolute inset-0 w-1/2 h-full overflow-hidden border-r-2 border-white transition-all duration-300 group-hover:w-[20%] ease-in-out" 
                 style={{ width: '50%' }}
               >
                 <img src={activeSolution.imageBefore} alt="Before" className="absolute inset-0 w-[200%] max-w-none h-full object-cover" />
               </div>
               
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20">
                    <ArrowRightLeft className="w-6 h-6 text-white" />
                  </div>
               </div>
               
               <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-xs">بعد</div>
               <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-xs">قبل</div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;