import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Maximize2, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Film, 
  Volume2, 
  Zap, 
  Sliders, 
  Check, 
  Cpu,
  Scan,
  TrendingUp,
  Layers,
  ZoomIn,
  Eye,
  Radio,
  Waveform,
  Play,
  RotateCcw
} from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

// Custom Interactive Visual Component for Card 1: 4K Super Resolution (Split Scan)
const SuperResolutionVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/10 via-transparent to-luma-pink/5" />
      
      {/* Split Comparison Demonstration */}
      <div className="relative w-[90%] h-28 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-inner flex">
        {/* Left Side: Standard Definition / Blurry Base */}
        <div className="relative w-1/2 h-full bg-zinc-900/90 flex flex-col items-center justify-center p-2 border-r border-white/10">
          <div className="w-12 h-12 rounded-lg bg-zinc-800/80 flex items-center justify-center blur-[1.5px] opacity-70">
            <div className="w-8 h-8 grid grid-cols-2 gap-1 bg-zinc-700/50 p-1 rounded" />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1.5 font-medium">1080p Base</span>
        </div>

        {/* Right Side: Ultra Crisp 4K Reconstructed */}
        <div className="relative w-1/2 h-full bg-gradient-to-br from-luma-purple/15 to-zinc-950 flex flex-col items-center justify-center p-2 overflow-hidden">
          <div className="w-12 h-12 rounded-lg bg-luma-purple/20 border border-luma-purple/50 flex items-center justify-center shadow-[0_0_15px_rgba(218,143,255,0.25)]">
            <div className="w-8 h-8 grid grid-cols-4 gap-0.5 bg-luma-purple/30 p-1 rounded">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-luma-purple rounded-[0.5px] shadow-[0_0_2px_#DA8FFF]" />
              ))}
            </div>
          </div>
          <span className="text-[10px] text-luma-purple font-mono mt-1.5 font-bold">4K Crystal</span>
        </div>

        {/* Center Animated Scanning Wipe Line */}
        <motion.div 
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff]"
          animate={{
            left: isHovered ? ['35%', '65%', '35%'] : ['48%', '52%', '48%'],
          }}
          transition={{
            duration: isHovered ? 2.5 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

// Custom Interactive Visual Component for Card 2: Face & Texture Synthesis (Biometric Mesh & Texture Matrix)
const TextureMeshVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-luma-pink/10 via-transparent to-luma-purple/5" />

      {/* High-Tech Biometric Scanner Frame */}
      <div className="relative w-[90%] h-28 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-inner flex items-center justify-between px-4 py-2 gap-3">
        {/* Left: Biometric Face Topology Viewport */}
        <div className="relative w-20 h-20 rounded-lg bg-zinc-950 border border-luma-pink/30 flex items-center justify-center overflow-hidden shrink-0">
          {/* Target Reticle Corners */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-luma-pink" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-luma-pink" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-luma-pink" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-luma-pink" />

          {/* Biometric Face Mesh SVG */}
          <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none">
            {/* Outer Head Contour */}
            <path
              d="M 30 8 C 19 8 13 18 13 31 C 13 44 20 53 30 53 C 40 53 47 44 47 31 C 47 18 41 8 30 8 Z"
              stroke="#FF7AAB"
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.6"
            />
            {/* Eyes & Landmarks */}
            <circle cx="23" cy="27" r="1.5" fill="#FF7AAB" />
            <circle cx="37" cy="27" r="1.5" fill="#FF7AAB" />
            <line x1="20" y1="23" x2="26" y2="23" stroke="#FF7AAB" strokeWidth="1" strokeOpacity="0.8" />
            <line x1="34" y1="23" x2="40" y2="23" stroke="#FF7AAB" strokeWidth="1" strokeOpacity="0.8" />
            {/* Nose & Mouth */}
            <path d="M 30 28 L 28 35 L 32 35" stroke="#DA8FFF" strokeWidth="1" strokeLinecap="round" />
            <path d="M 24 42 Q 30 46 36 42" stroke="#FF7AAB" strokeWidth="1.2" strokeLinecap="round" />
            {/* Cheek & Forehead Nodes */}
            <circle cx="18" cy="34" r="1" fill="#DA8FFF" />
            <circle cx="42" cy="34" r="1" fill="#DA8FFF" />
            <circle cx="30" cy="15" r="1" fill="#FF7AAB" />
          </svg>

          {/* Vertical Scanning Laser Line */}
          <motion.div
            className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-luma-pink to-transparent shadow-[0_0_8px_#FF7AAB]"
            animate={{
              left: ['10%', '90%', '10%'],
            }}
            transition={{
              duration: isHovered ? 1.8 : 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Right: Generative Texture Synthesis Readout */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
          <div className="flex items-center justify-between text-[10px] font-sans">
            <span className="text-zinc-400">بافت پوست و مو:</span>
            <span className="text-luma-pink font-bold font-mono">98% SYNTH</span>
          </div>

          {/* Micro-Texture Synthesis Grid */}
          <div className="p-1.5 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <Sparkles size={11} className="text-luma-pink shrink-0" />
              <span className="text-[9px] text-zinc-300 font-sans truncate">بازسازی طبیعی منافذ</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-3 rounded-[1px] bg-luma-pink shadow-[0_0_3px_#FF7AAB]"
                  style={{ opacity: 0.4 + i * 0.2 }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-zinc-500 font-sans">
            <span>انطباق هویت چهره:</span>
            <span className="text-emerald-400 font-bold font-mono">۹۹.۴٪ ثابت</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Interactive Visual Component for Card 3: Motion Deblur (Kinetic Vector Lock)
const MotionDeblurVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Soft Yellow Tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-luma-yellow/5 via-transparent to-luma-yellow/10" />

      {/* Streamlined Velocity Streaks Converging to Sharp Focus */}
      <div className="relative w-[85%] h-24 flex items-center justify-between px-4 bg-zinc-900/60 rounded-xl border border-white/5">
        {/* Left Side: Blurred Motion Ghosts */}
        <div className="flex items-center gap-1.5 opacity-40">
          <div className="w-8 h-8 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 blur-[2px] transform -translate-x-2" />
          <div className="w-8 h-8 rounded-full bg-luma-yellow/20 border border-luma-yellow/30 blur-[1px] transform -translate-x-1" />
        </div>

        {/* Dynamic Motion Stabilizer Arrow */}
        <motion.div 
          className="flex items-center gap-1 text-luma-yellow"
          animate={{ x: isHovered ? [0, 4, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-12 h-[1.5px] bg-gradient-to-r from-luma-yellow/20 via-luma-yellow to-luma-yellow rounded-full" />
        </motion.div>

        {/* Right Side: Pinned Crystal Target Reticle */}
        <div className="relative w-12 h-12 rounded-xl bg-luma-yellow/15 border border-luma-yellow/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,229,128,0.3)]">
          <div className="w-4 h-4 rounded-full bg-luma-yellow shadow-[0_0_8px_#FFE580]" />
          {/* Crosshair corners */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-luma-yellow" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-luma-yellow" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-luma-yellow" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-luma-yellow" />
        </div>
      </div>
    </div>
  );
};

// Custom Interactive Visual Component for Card 4: Denoise & Clean Pipeline (Velvet Spectrum)
const DenoiseWaveletVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-luma-purple/10 via-transparent to-transparent" />

      {/* Dual Wave Spectrum: Noisy Scatter vs Pure Smooth Curve */}
      <div className="relative w-[88%] h-24 flex flex-col justify-center gap-3 p-3 bg-zinc-900/70 rounded-xl border border-white/5">
        {/* Grainy Noise Bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-500 w-12 text-left">RAW</span>
          <div className="flex-1 h-3 flex items-center gap-0.5 overflow-hidden opacity-40">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-zinc-400 rounded-sm"
                style={{
                  height: `${25 + ((i * 29) % 70)}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Clean Pure Spectrum Bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-luma-purple font-bold w-12 text-left">CLEAN</span>
          <div className="flex-1 h-3.5 flex items-center gap-0.5 overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-luma-purple rounded-sm shadow-[0_0_4px_#DA8FFF]"
                animate={{
                  height: isHovered 
                    ? [`${35 + Math.sin(i * 0.35) * 45}%`, `${45 + Math.cos(i * 0.35) * 40}%`, `${35 + Math.sin(i * 0.35) * 45}%`] 
                    : `${40 + Math.sin(i * 0.3) * 35}%`,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Interactive Visual Component for Card 5: 60 FPS Interpolation (Fluid Velocity Arc)
const InterpolationTimelineVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-bl from-luma-pink/10 via-transparent to-transparent" />

      {/* Smooth Motion Track with 60fps Inter-frame Glow */}
      <div className="relative w-[88%] h-24 flex flex-col justify-center px-4 bg-zinc-900/60 rounded-xl border border-white/5">
        {/* Track Line */}
        <div className="relative w-full h-1.5 bg-zinc-800 rounded-full flex items-center justify-between">
          {/* Keyframe 1 */}
          <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 border-2 border-zinc-900 z-10" />

          {/* AI Interpolated Sub-Frames */}
          <div className="flex gap-1.5 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-luma-pink/60 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-luma-pink shadow-[0_0_8px_#FF7AAB]" />
            <div className="w-2.5 h-2.5 rounded-full bg-luma-pink/60 animate-pulse" />
          </div>

          {/* Keyframe 2 */}
          <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 border-2 border-zinc-900 z-10" />

          {/* Animated Gliding Fluid Orb */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-luma-pink shadow-[0_0_14px_#FF7AAB] border border-white"
            animate={{
              left: ['5%', '90%', '5%'],
            }}
            transition={{
              duration: isHovered ? 1.8 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Minimal Timeline Info */}
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-3 pt-2 border-t border-white/5">
          <span>24 FPS Native</span>
          <span className="text-luma-pink font-bold">60 FPS Fluid Motion</span>
        </div>
      </div>
    </div>
  );
};

// Custom Interactive Visual Component for Card 6: Lossless Audio Remux (Clean Studio Waveform)
const LosslessAudioVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  // Pre-calculated organic bell-curve audio spectrum amplitudes
  const barAmplitudes = [0.35, 0.5, 0.7, 0.85, 1.0, 0.8, 0.6, 0.95, 1.0, 0.85, 0.6, 0.75, 0.9, 0.7, 0.45, 0.3];

  return (
    <div className="relative w-full h-40 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center select-none group/vis">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-luma-yellow/10 via-transparent to-transparent opacity-50" />

      {/* Studio Waveform & Precision Audio Master Frame */}
      <div className="relative w-[90%] h-28 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-inner flex items-center justify-between px-4 py-2 gap-3">
        {/* Left: Stereo Multi-Band Dynamic Equalizer */}
        <div className="flex-1 h-14 flex items-center justify-center gap-1.5 px-2 bg-zinc-950/80 rounded-lg border border-white/5 overflow-hidden">
          {barAmplitudes.map((amp, i) => (
            <div key={i} className="h-10 w-1.5 flex items-center justify-center">
              <motion.div
                className="w-full h-full rounded-full bg-luma-yellow shadow-[0_0_5px_rgba(255,229,128,0.6)]"
                style={{ transformOrigin: 'center' }}
                animate={{
                  scaleY: isHovered
                    ? [amp * 0.35, amp * 1.15, amp * 0.5, amp]
                    : [amp * 0.75, amp, amp * 0.8],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.8 + (i % 4) * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </div>
          ))}
        </div>

        {/* Right: Lossless Quality Badge */}
        <div className="shrink-0 flex flex-col items-center justify-center px-3 py-2 rounded-lg bg-zinc-950 border border-luma-yellow/30 text-center">
          <div className="flex items-center gap-1 mb-1">
            <Volume2 size={13} className="text-luma-yellow" />
            <span className="text-[10px] text-luma-yellow font-bold font-mono leading-none">24-BIT</span>
          </div>
          <span className="text-[8px] text-zinc-400 font-mono">48kHz PCM</span>
          <span className="text-[8px] text-emerald-400 font-sans mt-0.5 font-medium">بدون فشرده‌سازی</span>
        </div>
      </div>
    </div>
  );
};

interface FeatureItem {
  id: string;
  icon: any;
  title: string;
  accent: 'purple' | 'pink' | 'yellow';
  badge: string;
  metric: string;
  metricLabel: string;
  description: string;
  details: string[];
  visualSpec: {
    resolution: string;
    engine: string;
    gain: string;
  };
  visualComponent: React.FC<{ isHovered: boolean }>;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'super-res',
    icon: Maximize2,
    title: 'افزایش وضوح و ابعاد تا ۴K',
    accent: 'purple',
    badge: 'ارتقای مقیاس ۴K',
    metric: '۴x',
    metricLabel: 'ضریب ارتقای رزولوشن',
    description: 'تبدیل فوتیج‌های قدیمی، SD یا ۱۰۸۰p به خروجی‌های کریستالی ۲K و ۴K با الگوریتم‌های فوق‌پیشرفته هوش مصنوعی.',
    details: [
      'ضریب ارتقای مقیاس تا ۴ برابر (4x Upscale)',
      'جلوگیری از ماتی و ایجاد لبه‌های دندانه‌دار',
      'مناسب نمایش در تلویزیون‌های Ultra HD و مانیتورهای مدرن',
    ],
    visualSpec: {
      resolution: 'Up to 3840×2160',
      engine: 'Deep Tensor Upscaling',
      gain: '+300% Pixel Density'
    },
    visualComponent: SuperResolutionVisual,
  },
  {
    id: 'texture',
    icon: Sparkles,
    title: 'بازسازی عمیق بافت و چهره',
    accent: 'pink',
    badge: 'سنتز هوشمند بافت',
    metric: '۹۸٪',
    metricLabel: 'نرخ بازتولید بافت مو و پوست',
    description: 'تزریق مجدد جزئیات مفقودشده به بافت پوست، مو، چشم‌ها، لباس و متون مبهم در فریم‌های تاریک یا فشرده.',
    details: [
      'تولید هوشمند جزئیات ریز بر پایه ساختار محتوا',
      'حفظ پایداری فرم صورت بین فریم‌های متوالی',
      'بازگرداندن شفافیت به ویدئوهای تار تاریخی و آرشیوی',
    ],
    visualSpec: {
      resolution: 'Face Landmark Mesh',
      engine: 'Diffusion Latent Refiner',
      gain: 'Natural Skin Micro-Pores'
    },
    visualComponent: TextureMeshVisual,
  },
  {
    id: 'deblur',
    icon: Activity,
    title: 'رفع تاری ناشی از حرکت (Deblur)',
    accent: 'yellow',
    badge: 'تثبیت و رفع تاری',
    metric: '۰.۱ms',
    metricLabel: 'دقت ردیابی بردارهای حرکت',
    description: 'تثبیت و شارپ کردن تصاویر حاصل از لرزش دست، تکان‌های ناگهانی دوربین یا سرعت بالای سوژه‌های متحرک.',
    details: [
      'تفکیک بردار حرکت سوژه از حرکت کلی دوربین',
      'شارپ کردن لبه‌ها بدون ایجاد آرتیفکت مصنوعی',
      'ایده‌آل برای فوتیج‌های ورزشی و ویدئوهای گوشی موبایل',
    ],
    visualSpec: {
      resolution: 'Zero Motion Jitter',
      engine: 'Optical Vector Deblur',
      gain: 'Instant Edge Freezing'
    },
    visualComponent: MotionDeblurVisual,
  },
  {
    id: 'denoise',
    icon: ShieldCheck,
    title: 'حذف کامل نویز و گرین (Denoise)',
    accent: 'purple',
    badge: 'پاکسازی نویز سنسور',
    metric: '۹۵٪-',
    metricLabel: 'کاهش نویز سنسور و ایزو',
    description: 'پاکسازی نویز ایزوهای بالا و برفک‌های شبانه بدون از دست رفتن شفافیت رنگ‌ها و بافت‌های لطیف.',
    details: [
      'پاکسازی هوشمند بدون تار شدن چهره یا لباس',
      'حفظ جزئیات نواحی سایه و تاریک بدون ایجاد فلیکر',
      'خروجی یکدست و آماده اعمال فیلترهای رنگی سینمایی',
    ],
    visualSpec: {
      resolution: 'Zero Noise Artifacts',
      engine: 'Neural Wavelet Filter',
      gain: 'Velvet Deep Blacks'
    },
    visualComponent: DenoiseWaveletVisual,
  },
  {
    id: 'interpolate',
    icon: Film,
    title: 'روان‌سازی حرکت تا ۶۰ فریم (Interpolation)',
    accent: 'pink',
    badge: 'روان‌سازی فریم‌ریت',
    metric: '۶۰fps',
    metricLabel: 'نرخ فریم خروجی ابریشمی',
    description: 'تولید فریم‌های میانی با تخمین دقیق حرکت برای تبدیل ویدئوهای ۲۴ یا ۳۰ فریم به حرکتی کاملاً روان.',
    details: [
      'تولید فریم‌های میانی بدون اثر شبحی (Ghosting)',
      'امکان ساخت اسلوموشن‌های بسیار نرم و بدون افت فریم',
      'روان‌سازی انیمیشن‌ها و رندرهای ۳D کم‌فریم',
    ],
    visualSpec: {
      resolution: '24fps → 60fps',
      engine: 'Bidirectional Flow Net',
      gain: 'Ultra Silky Playback'
    },
    visualComponent: InterpolationTimelineVisual,
  },
  {
    id: 'audio',
    icon: Volume2,
    title: 'حفظ کامل و بی‌نقص صدای اصلی',
    accent: 'yellow',
    badge: 'حفظ خلوص صدا',
    metric: '۱۰۰٪',
    metricLabel: 'حفظ سینک و تراک صوتی',
    description: 'حفظ ۱۰۰ درصدی تراک‌های صوتی، دیالوگ‌ها و موسیقی پس‌زمینه ویدئو بدون فشرده‌سازی مضاعف یا ناهماهنگی زمانی.',
    details: [
      'همگام‌سازی میلی‌ثانیه‌ای صدا با فریم‌های بازسازی شده',
      'عدم افت کیفیت فرمت‌های صوتی استریو و دالبی',
      'خروجی آماده دانلود و پخش مستقیم بدون نیاز به تدوین مجدد',
    ],
    visualSpec: {
      resolution: 'Lossless Audio Pass',
      engine: 'Frame-Accurate Remux',
      gain: '0ms Latency Offset'
    },
    visualComponent: LosslessAudioVisual,
  },
];

export const VideoEnhancementFeatures: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="relative py-20 lg:py-32 bg-white dark:bg-[#07070A] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="features" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-pink/30 bg-luma-pink/10 text-zinc-900 dark:text-luma-pink text-xs font-bold">
            <Sliders size={14} className="text-luma-pink" />
            <span>قابلیت‌های جامع پردازش</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            هر آنچه برای تبدیل ویدئو به <span className="text-gradient-animated inline-block pb-1">کیفیت سینمایی</span> نیاز دارید
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            مجموعه‌ای کامل از الگوریتم‌های تخصصی هوش مصنوعی برای ارتقای ابعاد، بازسازی چهره، رفع لرزش، حذف گرین و نرم‌سازی فریم‌ها.
          </p>
        </div>

        {/* 6 Grid Features with Interactive Dynamic Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {FEATURES_DATA.map((feat, idx) => {
            const isHovered = hoveredFeature === feat.id;
            const accentColor = 
              feat.accent === 'purple' 
                ? 'text-luma-purple' 
                : feat.accent === 'pink' 
                ? 'text-luma-pink' 
                : 'text-luma-yellow';

            const VisualComponent = feat.visualComponent;

            return (
              <motion.div
                key={feat.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredFeature(feat.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="h-full flex flex-col"
              >
                <VideoEnhancementHoverCard
                  accentColor={feat.accent}
                  className="h-full flex flex-col"
                  innerClassName="p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="space-y-5">
                    
                    {/* Top Bar: Icon, Badge & Key Metric */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-transform duration-200 group-hover:scale-105">
                          <feat.icon size={20} className={accentColor} />
                        </div>
                        <div>
                          <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">
                            {feat.badge}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <span className={`text-xl sm:text-2xl font-black block font-mono ${accentColor}`}>
                          {feat.metric}
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {feat.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* DYNAMIC VISUAL MODULE (Replacing plain card info with interactive visual graphics) */}
                    <div className="w-full">
                      <VisualComponent isHovered={isHovered} />
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {feat.description}
                      </p>
                    </div>

                    {/* Details List */}
                    <ul className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                      {feat.details.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                            feat.accent === 'purple' ? 'bg-luma-purple' : feat.accent === 'pink' ? 'bg-luma-pink' : 'bg-luma-yellow'
                          }`} />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </VideoEnhancementHoverCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

