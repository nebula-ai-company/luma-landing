import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Check, Loader2, Sparkles, 
  Settings, MessageSquare, Image as ImageIcon, Maximize2, FileText, Database
} from 'lucide-react';
import { useVisibleInterval } from './useVisibleLoop';

const Motion = motion as any;

interface WorkflowNodeProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  status: 'waiting' | 'processing' | 'completed';
  color: string;
  x: number;
  y: number;
  hasInput?: boolean;
  hasOutput?: boolean;
}

const NodeComponent: React.FC<WorkflowNodeProps> = ({ 
  title, subtitle, icon: Icon, status, color, x, y, hasInput = true, hasOutput = true 
}) => {
  return (
    <div 
      className="absolute transition-all duration-500 select-none pointer-events-none z-20"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div className={`p-[5px] rounded-[18px] transition-all duration-300 relative ${
        status === 'processing' 
          ? 'bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow ring-2 ring-transparent shadow-[0_0_20px_rgba(218,143,255,0.4)] scale-105'
          : status === 'completed'
          ? 'bg-emerald-500/30 border border-emerald-500/40'
          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5'
      }`}>
        <div className="bg-white dark:bg-[#0d0d0d] rounded-[14px] px-3.5 py-2.5 min-w-[130px] md:min-w-[150px] shadow-sm border border-zinc-200/50 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            {/* Icon Container */}
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
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
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Icon size={14} />
              )}
            </div>

            {/* Label and Info */}
            <div className="flex-1 min-w-0 text-right">
              <h4 className="text-xs font-black text-zinc-900 dark:text-gray-100 truncate font-sans">{title}</h4>
              <p className="text-[9px] text-zinc-400 dark:text-gray-500 truncate">{subtitle}</p>
            </div>

            {/* Status Check badge */}
            {status === 'completed' && (
              <Motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0"
              >
                <Check size={10} strokeWidth={3} />
              </Motion.div>
            )}
          </div>
        </div>

        {/* Visual Connector Ports */}
        {hasInput && (
          <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border bg-white dark:bg-[#0d0d0d] transition-all duration-300 ${
            status === 'processing' || status === 'completed' ? 'border-luma-purple bg-luma-purple scale-110 shadow-[0_0_8px_#DA8FFF]' : 'border-zinc-300 dark:border-white/20'
          }`} />
        )}
        {hasOutput && (
          <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border bg-white dark:bg-[#0d0d0d] transition-all duration-300 ${
            status === 'completed' ? 'border-luma-pink bg-luma-pink scale-110 shadow-[0_0_8px_#FF6482]' : 'border-zinc-300 dark:border-white/20'
          }`} />
        )}
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
  isVertical?: boolean;
}> = ({ startX, startY, endX, endY, active, color, isVertical = false }) => {
  // Compute nice cubic bezier path based on direction
  let pathD = '';
  if (isVertical) {
    const controlPointY1 = startY + (endY - startY) * 0.5;
    const controlPointY2 = startY + (endY - startY) * 0.5;
    pathD = `M ${startX} ${startY} C ${startX} ${controlPointY1}, ${endX} ${controlPointY2}, ${endX} ${endY}`;
  } else {
    const controlPointX1 = startX + (endX - startX) * 0.5;
    const controlPointX2 = startX + (endX - startX) * 0.5;
    pathD = `M ${startX} ${startY} C ${controlPointX1} ${startY}, ${controlPointX2} ${endY}, ${endX} ${endY}`;
  }

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      dir="ltr"
    >
      {/* Background connector path */}
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-zinc-200 dark:text-zinc-800"
      />

      {/* Active animating path overlay */}
      {active && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            strokeLinecap="round"
            className="opacity-70"
          />
          {/* Animated data packet dots */}
          <Motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 10"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </>
      )}
    </svg>
  );
};

export const WorkflowHeroAnim: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check window size for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Run animation steps (0 to 11) using the visible loop
  useVisibleInterval(containerRef, () => {
    setStep((prev) => (prev + 1) % 12);
  }, 1400);

  // Synchronized Progress Bar
  useEffect(() => {
    if (step === 0) setProgressPercent(0);
    else if (step === 1) setProgressPercent(10);
    else if (step === 2) setProgressPercent(20);
    else if (step === 3) setProgressPercent(40);
    else if (step === 4) setProgressPercent(50);
    else if (step === 5) setProgressPercent(65);
    else if (step === 6) setProgressPercent(75);
    else if (step === 7) setProgressPercent(90);
    else if (step >= 8) setProgressPercent(100);
  }, [step]);

  // Determine statuses of nodes based on timeline step (Desktop)
  const getStatusDesktop = (nodeId: number): 'waiting' | 'processing' | 'completed' => {
    switch (nodeId) {
      case 1: // Start Node
        if (step === 0) return 'waiting';
        if (step === 1) return 'processing';
        return 'completed';

      case 2: // Analysis Node
        if (step < 3) return 'waiting';
        if (step === 3) return 'processing';
        return 'completed';

      case 3: // Content Node
        if (step < 5) return 'waiting';
        if (step === 5) return 'processing';
        return 'completed';

      case 4: // Image Node
        if (step < 3) return 'waiting';
        if (step === 3) return 'processing';
        return 'completed';

      case 5: // Upscale Node
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

  // Determine statuses of nodes based on timeline step (Mobile)
  const getStatusMobile = (nodeId: number): 'waiting' | 'processing' | 'completed' => {
    switch (nodeId) {
      case 1: // Start
        if (step === 0) return 'waiting';
        if (step === 1 || step === 2) return 'processing';
        return 'completed';

      case 2: // Analysis
        if (step < 3) return 'waiting';
        if (step === 3 || step === 4) return 'processing';
        return 'completed';

      case 3: // Content
        if (step < 5) return 'waiting';
        if (step === 5 || step === 6) return 'processing';
        return 'completed';

      case 4: // Output
        if (step < 7) return 'waiting';
        if (step === 7) return 'processing';
        return 'completed';

      default:
        return 'waiting';
    }
  };

  // Node Positions (X%, Y%) for Desktop layout
  // Nodes are mathematically offset so connectors dock precisely at ports
  const pos = {
    n1: { x: 13, y: 50 }, // Start
    n2: { x: 38, y: 25 }, // Analysis
    n3: { x: 62, y: 25 }, // Content
    n4: { x: 38, y: 75 }, // Image
    n5: { x: 62, y: 75 }, // Upscale
    n6: { x: 87, y: 50 }  // Output
  };

  // Node Port offsets for perfect docking
  const portOffset = 10; // width offset in percent (half card width approx 10%)

  // Node positions for Mobile layout (Vertical flow)
  const mPos = {
    n1: { x: 50, y: 15 },
    n2: { x: 50, y: 40 },
    n3: { x: 50, y: 65 },
    n4: { x: 50, y: 90 },
  };
  const mPortYOffset = 6; // height offset in percent (half card height approx 6%)

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] md:h-[480px] bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-3xl p-1 relative overflow-hidden shadow-2xl transition-all duration-300"
    >
      {/* Outer shell (Doppelrand double bezel) styling */}
      <div className="absolute inset-0 p-1 bg-black/[0.02] dark:bg-white/[0.01] rounded-[23px] pointer-events-none z-10 border border-zinc-200/40 dark:border-white/5" />

      {/* Internal Window Frame */}
      <div className="h-full w-full rounded-[20px] overflow-hidden relative bg-zinc-50/20 dark:bg-black/50 p-5 md:p-6 flex flex-col justify-between">
        
        {/* Technical Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* 1. Interface Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-1" />
            <span className="text-xs font-sans text-zinc-400 dark:text-gray-500 tracking-wide">گردش کار محتوای هوشمند</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className={`w-2 h-2 rounded-full ${step > 0 && step < 8 ? 'bg-amber-500 animate-pulse' : step >= 8 ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              <span className="text-[10px] font-sans text-zinc-500 dark:text-gray-400">
                {step === 0 && 'آماده'}
                {step > 0 && step < 8 && 'در حال پردازش...'}
                {step >= 8 && 'تکمیل شد'}
              </span>
            </div>
            
            <button className="h-8 px-3 rounded-lg bg-luma-purple text-black font-sans font-black text-xs flex items-center gap-1.5 shadow-md shadow-luma-purple/20">
              <Play size={10} fill="currentColor" />
              <span>اجرا</span>
            </button>
          </div>
        </div>

        {/* 2. Visual Canvas Area */}
        <div className="relative flex-1 my-3 z-10 overflow-hidden rounded-xl border border-dashed border-zinc-200/50 dark:border-white/5 bg-zinc-50/40 dark:bg-black/20">
          
          {!isMobile ? (
            /* --- Desktop Layout --- */
            <>
              {/* Connector Paths connecting precisely to edges */}
              <Connector 
                startX={pos.n1.x + portOffset} startY={pos.n1.y} 
                endX={pos.n2.x - portOffset} endY={pos.n2.y} 
                active={step === 2} color="#DA8FFF" 
              />
              <Connector 
                startX={pos.n1.x + portOffset} startY={pos.n1.y} 
                endX={pos.n4.x - portOffset} endY={pos.n4.y} 
                active={step === 2} color="#FF6482" 
              />
              <Connector 
                startX={pos.n2.x + portOffset} startY={pos.n2.y} 
                endX={pos.n3.x - portOffset} endY={pos.n3.y} 
                active={step === 4} color="#DA8FFF" 
              />
              <Connector 
                startX={pos.n4.x + portOffset} startY={pos.n4.y} 
                endX={pos.n5.x - portOffset} endY={pos.n5.y} 
                active={step === 4} color="#FF6482" 
              />
              <Connector 
                startX={pos.n3.x + portOffset} startY={pos.n3.y} 
                endX={pos.n6.x - portOffset} endY={pos.n6.y} 
                active={step === 6} color="#FFC964" 
              />
              <Connector 
                startX={pos.n5.x + portOffset} startY={pos.n5.y} 
                endX={pos.n6.x - portOffset} endY={pos.n6.y} 
                active={step === 6} color="#FFC964" 
              />

              {/* Node Components */}
              <NodeComponent 
                title="شروع" subtitle="ورودی کاربر" icon={FileText} 
                status={getStatusDesktop(1)} color="#DA8FFF" x={pos.n1.x} y={pos.n1.y}
                hasInput={false} hasOutput={true}
              />
              <NodeComponent 
                title="تحلیل درخواست" subtitle="مدل زبانی" icon={MessageSquare} 
                status={getStatusDesktop(2)} color="#DA8FFF" x={pos.n2.x} y={pos.n2.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="تولید محتوا" subtitle="دستیار لوما" icon={Sparkles} 
                status={getStatusDesktop(3)} color="#FF6482" x={pos.n3.x} y={pos.n3.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="ساخت تصویر" subtitle="مدل تصویر" icon={ImageIcon} 
                status={getStatusDesktop(4)} color="#FF6482" x={pos.n4.x} y={pos.n4.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="افزایش کیفیت" subtitle="ابزار لوما" icon={Maximize2} 
                status={getStatusDesktop(5)} color="#FFC964" x={pos.n5.x} y={pos.n5.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="خروجی نهایی" subtitle="آماده استفاده" icon={Database} 
                status={getStatusDesktop(6)} color="#FFC964" x={pos.n6.x} y={pos.n6.y}
                hasInput={true} hasOutput={false}
              />
            </>
          ) : (
            /* --- Mobile Layout (Simplified Compact Flow) --- */
            <>
              {/* Vertical Connectors */}
              <Connector 
                startX={mPos.n1.x} startY={mPos.n1.y + mPortYOffset} 
                endX={mPos.n2.x} endY={mPos.n2.y - mPortYOffset} 
                active={step === 2} color="#DA8FFF" isVertical={true}
              />
              <Connector 
                startX={mPos.n2.x} startY={mPos.n2.y + mPortYOffset} 
                endX={mPos.n3.x} endY={mPos.n3.y - mPortYOffset} 
                active={step === 4} color="#FF6482" isVertical={true}
              />
              <Connector 
                startX={mPos.n3.x} startY={mPos.n3.y + mPortYOffset} 
                endX={mPos.n4.x} endY={mPos.n4.y - mPortYOffset} 
                active={step === 6} color="#FFC964" isVertical={true}
              />

              <NodeComponent 
                title="ورودی محتوا" subtitle="شرح کار" icon={FileText} 
                status={getStatusMobile(1)} color="#DA8FFF" x={mPos.n1.x} y={mPos.n1.y}
                hasInput={false} hasOutput={true}
              />
              <NodeComponent 
                title="تولید هوشمند" subtitle="دستیار متنی" icon={MessageSquare} 
                status={getStatusMobile(2)} color="#DA8FFF" x={mPos.n2.x} y={mPos.n2.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="ساخت تصویر" subtitle="مدل تصویر" icon={ImageIcon} 
                status={getStatusMobile(3)} color="#FF6482" x={mPos.n3.x} y={mPos.n3.y}
                hasInput={true} hasOutput={true}
              />
              <NodeComponent 
                title="خروجی نهایی" subtitle="فایل کامل" icon={Database} 
                status={getStatusMobile(4)} color="#FFC964" x={mPos.n4.x} y={mPos.n4.y}
                hasInput={true} hasOutput={false}
              />
            </>
          )}

          {/* Banner on Success */}
          <AnimatePresence>
            {step >= 8 && (
              <Motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-sans text-xs font-black px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-2 z-30 border border-emerald-400/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Workflow با موفقیت اجرا شد</span>
              </Motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* 3. Interface Status Footer */}
        <div className="relative z-20 flex items-center justify-between text-[11px] text-zinc-400 dark:text-gray-500 border-t border-black/5 dark:border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <span>پیشرفت فرآیند:</span>
            <div className="w-20 md:w-24 h-1.5 rounded-full bg-zinc-200 dark:bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>%{progressPercent}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>بزرگنمایی: %۱۰۰</span>
          </div>
        </div>

      </div>
    </div>
  );
};
