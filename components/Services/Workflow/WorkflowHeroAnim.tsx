import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Check, Loader2, ArrowRight, Sparkles, 
  Settings, MessageSquare, Image as ImageIcon, Maximize2, FileText, Database
} from 'lucide-react';

const Motion = motion as any;

// Define Node Types
interface WorkflowNodeProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  status: 'waiting' | 'processing' | 'completed';
  color: string;
  x: number;
  y: number;
}

const NodeComponent: React.FC<WorkflowNodeProps> = ({ title, subtitle, icon: Icon, status, color, x, y }) => {
  return (
    <div 
      className="absolute transition-all duration-500 select-none pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Double Bezel Pattern */}
      <div className={`p-[5px] rounded-[18px] transition-all duration-300 ${
        status === 'processing' 
          ? 'bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow ring-2 ring-transparent shadow-[0_0_20px_rgba(218,143,255,0.4)]'
          : status === 'completed'
          ? 'bg-emerald-500/30 border border-emerald-500/40'
          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5'
      }`}>
        <div className="bg-white dark:bg-[#0d0d0d] rounded-[14px] px-4 py-3 min-w-[150px] shadow-sm border border-zinc-200/50 dark:border-white/5">
          <div className="flex items-center gap-3">
            {/* Icon Container */}
            <div 
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                status === 'processing'
                  ? 'bg-gradient-to-tr text-white border-transparent'
                  : 'bg-zinc-50 dark:bg-white/5 border-zinc-200/50 dark:border-white/5 text-zinc-500 dark:text-gray-400'
              }`}
              style={{ 
                background: status === 'processing' ? `linear-gradient(135deg, ${color}, ${color}dd)` : undefined,
                color: status === 'processing' ? '#fff' : undefined
              }}
            >
              {status === 'processing' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Icon size={16} />
              )}
            </div>

            {/* Label and Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-black text-zinc-900 dark:text-gray-100 truncate font-sans">{title}</h4>
              <p className="text-[10px] text-zinc-400 dark:text-gray-500 truncate">{subtitle}</p>
            </div>

            {/* Status Check badge */}
            {status === 'completed' && (
              <Motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white"
              >
                <Check size={10} strokeWidth={3} />
              </Motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Flow Connector Component with smooth bezier curves
const Connector: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  active: boolean;
  color: string;
}> = ({ startX, startY, endX, endY, active, color }) => {
  // Compute nice cubic bezier path
  const controlPointX1 = startX + (endX - startX) * 0.5;
  const controlPointY1 = startY;
  const controlPointX2 = startX + (endX - startX) * 0.5;
  const controlPointY2 = endY;

  const pathD = `M ${startX} ${startY} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${endX} ${endY}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" dir="ltr">
      {/* Background connector path */}
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-zinc-200/60 dark:text-white/5"
      />

      {/* Active animating path overlay */}
      {active && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-80"
          />
          {/* Animated data packet dots */}
          <Motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 40"
            animate={{ strokeDashoffset: [0, -88] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="shadow-[0_0_10px_rgba(218,143,255,0.8)]"
          />
        </>
      )}
    </svg>
  );
};

export const WorkflowHeroAnim: React.FC = () => {
  // Loop states: 
  // 'idle' (0) -> 'start' (1) -> 'pulse1' (2) -> 'mid1' (3) -> 'pulse2' (4) -> 'mid2' (5) -> 'pulse3' (6) -> 'success' (7) -> 'hold' (8)
  const [step, setStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 10);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Update a visual progress bar
  useEffect(() => {
    if (step === 0) setProgressPercent(0);
    else if (step === 1) setProgressPercent(15);
    else if (step === 2) setProgressPercent(30);
    else if (step === 3) setProgressPercent(45);
    else if (step === 4) setProgressPercent(60);
    else if (step === 5) setProgressPercent(75);
    else if (step === 6) setProgressPercent(90);
    else if (step === 7 || step === 8 || step === 9) setProgressPercent(100);
  }, [step]);

  // Determine statuses of nodes based on timeline step
  const getStatus = (nodeId: number): 'waiting' | 'processing' | 'completed' => {
    switch (nodeId) {
      case 1: // Start Node
        if (step === 0) return 'waiting';
        if (step === 1) return 'processing';
        return 'completed';

      case 2: // Analysis Node (Top mid-1)
        if (step < 3) return 'waiting';
        if (step === 3) return 'processing';
        return 'completed';

      case 3: // Content Node (Top mid-2)
        if (step < 5) return 'waiting';
        if (step === 5) return 'processing';
        return 'completed';

      case 4: // Image Node (Bottom mid-1)
        if (step < 3) return 'waiting';
        if (step === 3) return 'processing';
        return 'completed';

      case 5: // Upscale Node (Bottom mid-2)
        if (step < 5) return 'waiting';
        if (step === 5) return 'processing';
        return 'completed';

      case 6: // Output Node
        if (step < 7) return 'waiting';
        if (step === 7) return 'processing';
        return 'completed';

      default:
        return 'waiting';
    }
  };

  // Node Positions (X%, Y%)
  const pos = {
    n1: { x: 12, y: 50 }, // Start
    n2: { x: 38, y: 25 }, // Analysis
    n3: { x: 62, y: 25 }, // Content
    n4: { x: 38, y: 75 }, // Image
    n5: { x: 62, y: 75 }, // Upscale
    n6: { x: 88, y: 50 }  // Output
  };

  return (
    <div className="w-full h-[360px] md:h-[480px] bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-3xl p-1 relative overflow-hidden shadow-2xl transition-all duration-300">
      
      {/* Outer shell (Doppelrand double bezel) styling */}
      <div className="absolute inset-0 p-1 bg-black/[0.02] dark:bg-white/[0.01] rounded-[23px] pointer-events-none z-10 border border-zinc-200/40 dark:border-white/5" />

      {/* Internal Window Frame */}
      <div className="h-full w-full rounded-[20px] overflow-hidden relative bg-zinc-50/20 dark:bg-black/50 p-6 flex flex-col justify-between">
        
        {/* Fine Technical Dot Grid Background */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating background ambient lights */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-luma-purple/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-luma-pink/5 rounded-full blur-[80px] pointer-events-none" />

        {/* 1. Interface Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-1" />
            <span className="text-xs font-mono text-zinc-400 dark:text-gray-500 tracking-wider">PROJECT: WORKFLOW_01</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className={`w-2 h-2 rounded-full ${step > 0 && step < 8 ? 'bg-amber-500 animate-pulse' : step >= 8 ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              <span className="text-[10px] font-mono text-zinc-500 dark:text-gray-400 uppercase">
                {step === 0 && 'آماده'}
                {step > 0 && step < 8 && 'در حال اجرا...'}
                {step >= 8 && 'پایان موفق'}
              </span>
            </div>
            
            <button className="h-8 px-3 rounded-lg bg-luma-purple text-black font-sans font-bold text-xs flex items-center gap-1.5 shadow-md shadow-luma-purple/20">
              <Play size={12} fill="currentColor" />
              <span>اجرا</span>
            </button>
          </div>
        </div>

        {/* 2. Visual Canvas Area */}
        <div className="relative flex-1 my-4 z-10 overflow-hidden rounded-xl border border-dashed border-zinc-200/50 dark:border-white/5 bg-zinc-50/40 dark:bg-black/20">
          
          {/* Connector Paths (Renders in LTR process background) */}
          <div className="absolute inset-0" dir="ltr">
            {/* Start -> Analysis */}
            <Connector 
              startX={pos.n1.x} startY={pos.n1.y} 
              endX={pos.n2.x} endY={pos.n2.y} 
              active={step === 2} color="#DA8FFF" 
            />
            {/* Start -> Image */}
            <Connector 
              startX={pos.n1.x} startY={pos.n1.y} 
              endX={pos.n4.x} endY={pos.n4.y} 
              active={step === 2} color="#FF6482" 
            />

            {/* Analysis -> Content */}
            <Connector 
              startX={pos.n2.x} startY={pos.n2.y} 
              endX={pos.n3.x} endY={pos.n3.y} 
              active={step === 4} color="#DA8FFF" 
            />

            {/* Image -> Upscale */}
            <Connector 
              startX={pos.n4.x} startY={pos.n4.y} 
              endX={pos.n5.x} endY={pos.n5.y} 
              active={step === 4} color="#FF6482" 
            />

            {/* Content -> Output */}
            <Connector 
              startX={pos.n3.x} startY={pos.n3.y} 
              endX={pos.n6.x} endY={pos.n6.y} 
              active={step === 6} color="#FFB340" 
            />

            {/* Upscale -> Output */}
            <Connector 
              startX={pos.n5.x} startY={pos.n5.y} 
              endX={pos.n6.x} endY={pos.n6.y} 
              active={step === 6} color="#FFB340" 
            />
          </div>

          {/* Render Flow Nodes (Persian text, beautifully styled) */}
          <NodeComponent 
            title="شروع" subtitle="ورودی کاربر" icon={FileText} 
            status={getStatus(1)} color="#DA8FFF" x={pos.n1.x} y={pos.n1.y} 
          />

          <NodeComponent 
            title="تحلیل درخواست" subtitle="مدل زبانی" icon={MessageSquare} 
            status={getStatus(2)} color="#DA8FFF" x={pos.n2.x} y={pos.n2.y} 
          />

          <NodeComponent 
            title="تولید محتوا" subtitle="دستیار لوما" icon={Sparkles} 
            status={getStatus(3)} color="#FF6482" x={pos.n3.x} y={pos.n3.y} 
          />

          <NodeComponent 
            title="ساخت تصویر" subtitle="مدل تصویر" icon={ImageIcon} 
            status={getStatus(4)} color="#FF6482" x={pos.n4.x} y={pos.n4.y} 
          />

          <NodeComponent 
            title="افزایش کیفیت" subtitle="ابزار لوما" icon={Maximize2} 
            status={getStatus(5)} color="#FFB340" x={pos.n5.x} y={pos.n5.y} 
          />

          <NodeComponent 
            title="خروجی نهایی" subtitle="آماده استفاده" icon={Database} 
            status={getStatus(6)} color="#FFB340" x={pos.n6.x} y={pos.n6.y} 
          />

          {/* Live Executed Banner on Success */}
          <AnimatePresence>
            {step >= 8 && (
              <Motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-2 z-20 border border-emerald-400/30"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Workflow با موفقیت اجرا شد</span>
              </Motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* 3. Interface Status Footer */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 dark:text-gray-500 border-t border-black/5 dark:border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <span>پیشرفت فرآیند:</span>
            <div className="w-24 h-1.5 rounded-full bg-zinc-200 dark:bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono">{progressPercent}%</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">نرخ فریم: ۶۰fps</span>
            <span>بزرگنمایی: ۱۰۰٪</span>
          </div>
        </div>

      </div>
    </div>
  );
};
