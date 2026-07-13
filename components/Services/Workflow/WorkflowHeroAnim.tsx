import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Check, Loader2, Sparkles, 
  MessageSquare, Image as ImageIcon, Maximize2, FileText, Database
} from 'lucide-react';
import { useVisibleInterval } from './useVisibleLoop';
import { useTheme } from '../../../lib/ThemeContext';

const Motion = motion as any;

interface DesktopNodeProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  status: 'waiting' | 'processing' | 'completed';
  color: string;
  x: number;
  y: number;
}

const DesktopNode: React.FC<DesktopNodeProps> = ({ 
  title, subtitle, icon: Icon, status, color, x, y
}) => {
  const { theme } = useTheme();
  return (
    <foreignObject x={x} y={y} width="170" height="76" className="overflow-visible">
      <div 
        className={`p-[1px] h-full rounded-2xl transition-all duration-300 relative select-none ${
          status === 'processing' 
            ? 'bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow shadow-[0_0_15px_rgba(218,143,255,0.3)] scale-[1.03]'
            : status === 'completed'
            ? 'bg-emerald-500/20 border border-emerald-500/30'
            : 'bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-white/5'
        }`}
      >
        <div className="bg-white dark:bg-[#0d0d0d] h-full rounded-[14px] px-3.5 py-2.5 flex items-center gap-2.5 border border-zinc-200/40 dark:border-white/5" dir="rtl">
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
              <Loader2 size={14} className="animate-spin" strokeWidth={1.5} />
            ) : (
              <Icon size={14} strokeWidth={1.5} />
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
    </foreignObject>
  );
};

// Flow Connector Component with smooth bezier curves (Desktop)
const DesktopConnector: React.FC<{
  pathId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  color: string;
  theme: 'light' | 'dark';
}> = ({ pathId, x1, y1, x2, y2, active, color, theme }) => {
  const dx = (x2 - x1) * 0.5;
  const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  const pathColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(9, 9, 11, 0.04)';

  return (
    <>
      {/* Background connector path */}
      <path
        id={pathId}
        d={pathD}
        fill="none"
        stroke={pathColor}
        strokeWidth="2"
        strokeLinecap="round"
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
            className="opacity-40"
          />
          {/* Animated data packet dashes */}
          <Motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 16"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          {/* Moving packet circle */}
          <circle r="4.5" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }}>
            <animateMotion dur="1.5s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </>
      )}
    </>
  );
};

// Mobile Flow Connector
const MobileConnector: React.FC<{
  pathId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  color: string;
  theme: 'light' | 'dark';
}> = ({ pathId, x1, y1, x2, y2, active, color, theme }) => {
  const dy = (y2 - y1) * 0.5;
  const pathD = `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
  const pathColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(9, 9, 11, 0.04)';

  return (
    <>
      <path
        id={pathId}
        d={pathD}
        fill="none"
        stroke={pathColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {active && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-40"
          />
          <Motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 16"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <circle r="4.5" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }}>
            <animateMotion dur="1.5s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </>
      )}
    </>
  );
};

export const WorkflowHeroAnim: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const instanceId = useId().replace(/:/g, '');

  // Check window size for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Run animation steps (0 to 11) using the visible loop
  useVisibleInterval(containerRef, () => {
    setStep((prev) => (prev + 1) % 12);
  }, 1600);

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

  // Desktop layout dimensions
  const nodeW = 170;
  const nodeH = 76;

  // Node Positions (Start x, y coordinate of cards)
  const pos = {
    n1: { x: 20, y: 222 },   // Start
    n2: { x: 260, y: 55 },   // Analysis
    n3: { x: 555, y: 55 },   // Content
    n4: { x: 260, y: 375 },  // Image
    n5: { x: 555, y: 375 },  // Quality / Upscale
    n6: { x: 810, y: 222 }   // Output
  };

  // Calculated Port Coordinates for perfect connection alignment
  const ports = {
    n1_out: { x: pos.n1.x + nodeW, y: pos.n1.y + nodeH / 2 },
    
    n2_in:  { x: pos.n2.x, y: pos.n2.y + nodeH / 2 },
    n2_out: { x: pos.n2.x + nodeW, y: pos.n2.y + nodeH / 2 },
    
    n3_in:  { x: pos.n3.x, y: pos.n3.y + nodeH / 2 },
    n3_out: { x: pos.n3.x + nodeW, y: pos.n3.y + nodeH / 2 },
    
    n4_in:  { x: pos.n4.x, y: pos.n4.y + nodeH / 2 },
    n4_out: { x: pos.n4.x + nodeW, y: pos.n4.y + nodeH / 2 },
    
    n5_in:  { x: pos.n5.x, y: pos.n5.y + nodeH / 2 },
    n5_out: { x: pos.n5.x + nodeW, y: pos.n5.y + nodeH / 2 },
    
    n6_in:  { x: pos.n6.x, y: pos.n6.y + nodeH / 2 }
  };

  // Mobile layout dimensions (360x700 viewport)
  const mNodeW = 180;
  const mNodeH = 76;
  const mPos = {
    n1: { x: 90, y: 40 },
    n2: { x: 90, y: 200 },
    n3: { x: 90, y: 360 },
    n4: { x: 90, y: 520 }
  };

  const mPorts = {
    n1_out: { x: mPos.n1.x + mNodeW / 2, y: mPos.n1.y + mNodeH },
    
    n2_in:  { x: mPos.n2.x + mNodeW / 2, y: mPos.n2.y },
    n2_out: { x: mPos.n2.x + mNodeW / 2, y: mPos.n2.y + mNodeH },
    
    n3_in:  { x: mPos.n3.x + mNodeW / 2, y: mPos.n3.y },
    n3_out: { x: mPos.n3.x + mNodeW / 2, y: mPos.n3.y + mNodeH },
    
    n4_in:  { x: mPos.n4.x + mNodeW / 2, y: mPos.n4.y }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[620px] lg:h-[500px] xl:h-[540px] bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-3xl p-1 relative overflow-hidden shadow-2xl transition-all duration-300"
    >
      {/* Outer shell (Doppelrand double bezel) styling */}
      <div className="absolute inset-0 p-1 bg-black/[0.02] dark:bg-white/[0.01] rounded-[23px] pointer-events-none z-30 border border-zinc-200/40 dark:border-white/5" />

      {/* Internal Window Frame */}
      <div className="h-full w-full rounded-[20px] overflow-hidden relative bg-zinc-50/20 dark:bg-black/50 p-4 md:p-5 flex flex-col justify-between">
        
        {/* Technical Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* 1. Interface Header */}
        <div className="relative z-30 flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-1" />
            <span className="text-[11px] font-sans text-zinc-400 dark:text-gray-500 tracking-wide">گردش کار محتوای هوشمند</span>
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
        <div className="relative flex-1 my-3 z-10 overflow-hidden rounded-xl border border-dashed border-zinc-200/50 dark:border-white/5 bg-zinc-50/40 dark:bg-black/20 flex items-center justify-center">
          
          {!isMobile ? (
            /* --- Desktop Layout: viewBox 1000x520 --- */
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 1000 520" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connector Paths (Layer 1 & 2) */}
              <DesktopConnector 
                pathId={`${instanceId}-conn-1`}
                x1={ports.n1_out.x} y1={ports.n1_out.y} 
                x2={ports.n2_in.x} y2={ports.n2_in.y} 
                active={step === 2} color="#DA8FFF" theme={theme}
              />
              <DesktopConnector 
                pathId={`${instanceId}-conn-2`}
                x1={ports.n1_out.x} y1={ports.n1_out.y} 
                x2={ports.n4_in.x} y2={ports.n4_in.y} 
                active={step === 2} color="#FF6482" theme={theme}
              />
              <DesktopConnector 
                pathId={`${instanceId}-conn-3`}
                x1={ports.n2_out.x} y1={ports.n2_out.y} 
                x2={ports.n3_in.x} y2={ports.n3_in.y} 
                active={step === 4} color="#DA8FFF" theme={theme}
              />
              <DesktopConnector 
                pathId={`${instanceId}-conn-4`}
                x1={ports.n4_out.x} y1={ports.n4_out.y} 
                x2={ports.n5_in.x} y2={ports.n5_in.y} 
                active={step === 4} color="#FF6482" theme={theme}
              />
              <DesktopConnector 
                pathId={`${instanceId}-conn-5`}
                x1={ports.n3_out.x} y1={ports.n3_out.y} 
                x2={ports.n6_in.x} y2={ports.n6_in.y} 
                active={step === 6} color="#FFC964" theme={theme}
              />
              <DesktopConnector 
                pathId={`${instanceId}-conn-6`}
                x1={ports.n5_out.x} y1={ports.n5_out.y} 
                x2={ports.n6_in.x} y2={ports.n6_in.y} 
                active={step === 6} color="#FFC964" theme={theme}
              />

              {/* Connector Port indicators directly inside SVG for stable positioning */}
              {/* Output Start */}
              <circle cx={ports.n1_out.x} cy={ports.n1_out.y} r="4.5" fill={getStatusDesktop(1) === 'completed' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              {/* Input & Output Analysis */}
              <circle cx={ports.n2_in.x} cy={ports.n2_in.y} r="4.5" fill={getStatusDesktop(2) !== 'waiting' ? '#DA8FFF' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={ports.n2_out.x} cy={ports.n2_out.y} r="4.5" fill={getStatusDesktop(2) === 'completed' ? '#DA8FFF' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              {/* Input & Output Content */}
              <circle cx={ports.n3_in.x} cy={ports.n3_in.y} r="4.5" fill={getStatusDesktop(3) !== 'waiting' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={ports.n3_out.x} cy={ports.n3_out.y} r="4.5" fill={getStatusDesktop(3) === 'completed' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              {/* Input & Output Image */}
              <circle cx={ports.n4_in.x} cy={ports.n4_in.y} r="4.5" fill={getStatusDesktop(4) !== 'waiting' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={ports.n4_out.x} cy={ports.n4_out.y} r="4.5" fill={getStatusDesktop(4) === 'completed' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              {/* Input & Output Upscale */}
              <circle cx={ports.n5_in.x} cy={ports.n5_in.y} r="4.5" fill={getStatusDesktop(5) !== 'waiting' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={ports.n5_out.x} cy={ports.n5_out.y} r="4.5" fill={getStatusDesktop(5) === 'completed' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              {/* Input Output */}
              <circle cx={ports.n6_in.x} cy={ports.n6_in.y} r="4.5" fill={getStatusDesktop(6) !== 'waiting' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />

              {/* Node Cards inside foreignObject */}
              <DesktopNode 
                title="شروع" subtitle="ورودی کاربر" icon={FileText} 
                status={getStatusDesktop(1)} color="#DA8FFF" x={pos.n1.x} y={pos.n1.y}
              />
              <DesktopNode 
                title="تحلیل درخواست" subtitle="مدل زبانی" icon={MessageSquare} 
                status={getStatusDesktop(2)} color="#DA8FFF" x={pos.n2.x} y={pos.n2.y}
              />
              <DesktopNode 
                title="تولید محتوا" subtitle="دستیار لوما" icon={Sparkles} 
                status={getStatusDesktop(3)} color="#FF6482" x={pos.n3.x} y={pos.n3.y}
              />
              <DesktopNode 
                title="ساخت تصویر" subtitle="مدل تصویر" icon={ImageIcon} 
                status={getStatusDesktop(4)} color="#FF6482" x={pos.n4.x} y={pos.n4.y}
              />
              <DesktopNode 
                title="افزایش کیفیت" subtitle="ابزار لوما" icon={Maximize2} 
                status={getStatusDesktop(5)} color="#FFC964" x={pos.n5.x} y={pos.n5.y}
              />
              <DesktopNode 
                title="خروجی نهایی" subtitle="آماده استفاده" icon={Database} 
                status={getStatusDesktop(6)} color="#FFC964" x={pos.n6.x} y={pos.n6.y}
              />
            </svg>
          ) : (
            /* --- Mobile Layout: viewBox 360x700 --- */
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 360 700" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Mobile Connectors */}
              <MobileConnector 
                pathId={`${instanceId}-mob-conn-1`}
                x1={mPorts.n1_out.x} y1={mPorts.n1_out.y} 
                x2={mPorts.n2_in.x} y2={mPorts.n2_in.y} 
                active={step === 2} color="#DA8FFF" theme={theme}
              />
              <MobileConnector 
                pathId={`${instanceId}-mob-conn-2`}
                x1={mPorts.n2_out.x} y1={mPorts.n2_out.y} 
                x2={mPorts.n3_in.x} y2={mPorts.n3_in.y} 
                active={step === 4} color="#FF6482" theme={theme}
              />
              <MobileConnector 
                pathId={`${instanceId}-mob-conn-3`}
                x1={mPorts.n3_out.x} y1={mPorts.n3_out.y} 
                x2={mPorts.n4_in.x} y2={mPorts.n4_in.y} 
                active={step === 6} color="#FFC964" theme={theme}
              />

              {/* Mobile Node Ports */}
              <circle cx={mPorts.n1_out.x} cy={mPorts.n1_out.y} r="4.5" fill={getStatusMobile(1) === 'completed' ? '#DA8FFF' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={mPorts.n2_in.x} cy={mPorts.n2_in.y} r="4.5" fill={getStatusMobile(2) !== 'waiting' ? '#DA8FFF' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={mPorts.n2_out.x} cy={mPorts.n2_out.y} r="4.5" fill={getStatusMobile(2) === 'completed' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={mPorts.n3_in.x} cy={mPorts.n3_in.y} r="4.5" fill={getStatusMobile(3) !== 'waiting' ? '#FF6482' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={mPorts.n3_out.x} cy={mPorts.n3_out.y} r="4.5" fill={getStatusMobile(3) === 'completed' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />
              <circle cx={mPorts.n4_in.x} cy={mPorts.n4_in.y} r="4.5" fill={getStatusMobile(4) !== 'waiting' ? '#FFC964' : '#e4e4e7'} stroke={theme === 'dark' ? '#0d0d0d' : '#fff'} strokeWidth="1.5" />

              {/* Mobile Nodes inside foreignObjects */}
              <DesktopNode 
                title="ورودی محتوا" subtitle="شرح کار اولیه" icon={FileText} 
                status={getStatusMobile(1)} color="#DA8FFF" x={mPos.n1.x} y={mPos.n1.y}
              />
              <DesktopNode 
                title="تولید هوشمند" subtitle="دستیار متنی" icon={MessageSquare} 
                status={getStatusMobile(2)} color="#DA8FFF" x={mPos.n2.x} y={mPos.n2.y}
              />
              <DesktopNode 
                title="ساخت تصویر" subtitle="مدل تصویر" icon={ImageIcon} 
                status={getStatusMobile(3)} color="#FF6482" x={mPos.n3.x} y={mPos.n3.y}
              />
              <DesktopNode 
                title="خروجی نهایی" subtitle="فایل کامل" icon={Database} 
                status={getStatusMobile(4)} color="#FFC964" x={mPos.n4.x} y={mPos.n4.y}
              />
            </svg>
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
