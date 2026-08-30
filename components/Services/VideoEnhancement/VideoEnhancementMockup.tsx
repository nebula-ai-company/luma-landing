import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, Sliders, Volume2, VolumeX, ShieldCheck, Film, Zap, 
  Layers, RefreshCw, Play, Pause, Loader2, ChevronRight, ChevronLeft, Eye
} from 'lucide-react';

const PB_BASE_URL = 'https://pb.lumai.ir';


interface EnhancementPreset {
  id: string;
  name: string;
  badge: string;
  model: string;
  beforeLabel: string;
  afterLabel: string;
  resolutionBefore: string;
  resolutionAfter: string;
  fpsBefore: string;
  fpsAfter: string;
  improvement: string;
  degradeFilter: string;
}

const PRESETS: EnhancementPreset[] = [
  {
    id: 'upscale-4k',
    name: 'افزایش وضوح 4K',
    badge: 'وضوح و جزئیات',
    model: 'FlashVSR / Topaz Precision',
    beforeLabel: 'کیفیت پایه (۱۰۸۰p)',
    afterLabel: 'کیفیت بازسازی‌شده (۴K Ultra)',
    resolutionBefore: '1920 × 1080',
    resolutionAfter: '3840 × 2160 (4x)',
    fpsBefore: '24 fps',
    fpsAfter: '60 fps',
    improvement: '+300% بازسازی بافت',
    degradeFilter: 'blur(4px) contrast(0.92) brightness(0.96)',
  },
  {
    id: 'deblur',
    name: 'رفع تاری حرکتی',
    badge: 'شارپنس فوتیج',
    model: 'Topaz Video Deblur',
    beforeLabel: 'تاری ناشی از لرزش دوربین',
    afterLabel: 'تثبیت و لبه‌های شارپ کریستالی',
    resolutionBefore: 'Original 1080p Blur',
    resolutionAfter: 'Sharpened 1080p Crystal',
    fpsBefore: '30 fps',
    fpsAfter: '30 fps',
    improvement: 'رفع ۱۰۰٪ موشن بلور',
    degradeFilter: 'blur(5.5px) contrast(0.88) brightness(0.94)',
  },
  {
    id: 'denoise',
    name: 'حذف نویز شبانه',
    badge: 'پاکسازی گرین',
    model: 'Topaz Video Denoise',
    beforeLabel: 'نویز شدید ایزو بالا',
    afterLabel: 'پوست و سطوح ابریشمی بدون نویز',
    resolutionBefore: '720p ISO 6400 Grain',
    resolutionAfter: 'Clean 720p Studio Master',
    fpsBefore: '25 fps',
    fpsAfter: '25 fps',
    improvement: '-95% نویز دانه‌ای',
    degradeFilter: 'blur(2.8px) contrast(1.1) brightness(0.88)',
  },
  {
    id: 'interpolate',
    name: 'روان‌سازی ۶۰fps',
    badge: 'تولید فریم میانی',
    model: 'Topaz Video Interpolate',
    beforeLabel: 'حرکت بریده‌بریده (۲۴fps)',
    afterLabel: 'حرکت فوق روان سینمایی (۶۰fps)',
    resolutionBefore: 'Original Res (24fps)',
    resolutionAfter: 'Original Res (60fps Smooth)',
    fpsBefore: '24 fps',
    fpsAfter: '60 fps Smooth',
    improvement: '۲.۵x فریم‌ریت نرم‌تر',
    degradeFilter: 'blur(2.2px) contrast(0.94)',
  },
];

// Fallback high-quality video scenarios if API is unreachable
const FALLBACK_VIDEOS = [
  {
    id: 'fallback-1',
    title: 'سینمایی سایبرپانک و قطرات باران',
    videoUrl: 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWa2K0xdtV7nKCWNQtX5A9MYsSFDeirbP10oRI',
    prompt: 'نمای سینمایی از شهر آینده‌نگر با جزئیات نورپردازی نئونی و انعکاس باران',
    model: 'FlashVSR Pro',
  },
  {
    id: 'fallback-2',
    title: 'پرواز هوایی بر فراز صخره‌های اقیانوس',
    videoUrl: 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWitKc830cJxTw0VOF6pMD4zCgrRudNkyf9Pet',
    prompt: 'فیلم‌برداری هوایی با پهپاد از امواج خروشان اقیانوس در ساعت طلایی غروب',
    model: 'Topaz Video 4K',
  },
];

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  prompt: string;
  model: string;
}

export const VideoEnhancementMockup: React.FC = () => {
  const [activePresetId, setActivePresetId] = useState('upscale-4k');
  const [splitPos, setSplitPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPromptBadge, setShowPromptBadge] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const enhancedVideoRef = useRef<HTMLVideoElement>(null);
  const degradedVideoRef = useRef<HTMLVideoElement>(null);

  const currentPreset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0];
  const activeVideo = videos[currentVideoIndex] || FALLBACK_VIDEOS[0];

  // Fetch real videos from PocketBase video_generation collection
  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        setLoadingVideos(true);
        const res = await fetch(
          `${PB_BASE_URL}/api/collections/video_generation/records?page=1&perPage=8&sort=-created`
        );
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();

        if (data && Array.isArray(data.items) && data.items.length > 0) {
          const items: VideoItem[] = data.items
            .filter((item: any) => item.video)
            .map((item: any, idx: number) => ({
              id: item.id,
              title: item.title || `نمونه ویدیوی ${idx + 1}`,
              videoUrl: `${PB_BASE_URL}/api/files/video_generation/${item.id}/${item.video}`,
              prompt: item.prompt || 'ویدیوی تولیدشده توسط هوش مصنوعی لوما با جزئیات بالا',
              model: item.model || 'FlashVSR / Topaz Precision',
            }));

          if (isMounted) {
            if (items.length > 0) {
              setVideos(items);
            } else {
              setVideos(FALLBACK_VIDEOS);
            }
            setLoadingVideos(false);
          }
        } else {
          if (isMounted) {
            setVideos(FALLBACK_VIDEOS);
            setLoadingVideos(false);
          }
        }
      } catch (err) {
        console.error('Failed to load video records for enhancement mockup:', err);
        if (isMounted) {
          setVideos(FALLBACK_VIDEOS);
          setLoadingVideos(false);
        }
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Synchronize both video elements (Master = Enhanced, Slave = Degraded)
  const syncPlayback = () => {
    if (enhancedVideoRef.current && degradedVideoRef.current) {
      const masterTime = enhancedVideoRef.current.currentTime;
      if (Math.abs(degradedVideoRef.current.currentTime - masterTime) > 0.08) {
        degradedVideoRef.current.currentTime = masterTime;
      }
    }
  };

  const togglePlay = () => {
    if (!enhancedVideoRef.current || !degradedVideoRef.current) return;
    if (isPlaying) {
      enhancedVideoRef.current.pause();
      degradedVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      enhancedVideoRef.current.play().catch(() => {});
      degradedVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (enhancedVideoRef.current) {
      enhancedVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideos = () => {
    if (enhancedVideoRef.current && degradedVideoRef.current) {
      enhancedVideoRef.current.currentTime = 0;
      degradedVideoRef.current.currentTime = 0;
      enhancedVideoRef.current.play().catch(() => {});
      degradedVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offsetX / rect.width) * 100));
    setSplitPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleClickStage = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSliderMove(e.clientX);
  };

  const nextVideo = () => {
    if (videos.length === 0) return;
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    if (videos.length === 0) return;
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] p-[1px] bg-gradient-to-b from-black/10 via-black/5 to-black/10 dark:from-white/15 dark:via-white/5 dark:to-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="relative rounded-[27px] bg-[#FFFFFF] dark:bg-[#0D0D12] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 text-zinc-900 dark:text-white transition-colors duration-300">
        
        {/* Top Control Bar: Mode Tabs & Video Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-luma-purple animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">
              پیش‌نمایش زنده شبیه‌ساز ارتقای کیفیت (قبل و بعد ویدیو)
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-[11px] sm:text-xs overflow-x-auto max-w-full scrollbar-none">
            {PRESETS.map((preset) => {
              const isActive = preset.id === activePresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePresetId(preset.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Interactive Split Screen Video Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onClick={handleClickStage}
          className="relative w-full h-[320px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-zinc-950 border border-black/10 dark:border-white/10 shadow-2xl group"
        >
          {loadingVideos ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 gap-3 z-30">
              <Loader2 className="w-8 h-8 text-luma-purple animate-spin" />
              <span className="text-xs font-medium">در حال دریافت فوتیج باکیفیت هوش مصنوعی...</span>
            </div>
          ) : (
            <>
              {/* LAYER 1: ENHANCED VIDEO (Crystal 4K Ultra Quality - Base Full Layer) */}
              <div className="absolute inset-0 w-full h-full bg-black">
                <video
                  ref={enhancedVideoRef}
                  key={`enhanced-${activeVideo.videoUrl}`}
                  src={activeVideo.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onTimeUpdate={syncPlayback}
                  style={{
                    filter: 'contrast(1.04) saturate(1.05) brightness(1.02)',
                  }}
                />
                
                {/* Subtle cinematic vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                {/* Enhanced Side Badge (After Label) */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-1 pointer-events-none max-w-[46%]">
                  <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-luma-purple/50 text-luma-purple text-[10px] sm:text-xs font-bold shadow-lg max-w-full">
                    <Sparkles size={11} className="animate-pulse shrink-0 hidden sm:block" />
                    <span className="truncate">{currentPreset.afterLabel}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-300 font-mono bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                    <span className="text-luma-yellow font-bold">{currentPreset.resolutionAfter}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-emerald-400 font-bold">{currentPreset.fpsAfter}</span>
                  </div>
                </div>
              </div>

              {/* LAYER 2: DEGRADED VIDEO (Simulating Original/Low Quality - Clipped by splitPos) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-black border-r-2 border-luma-purple z-10 shadow-[5px_0_20px_rgba(0,0,0,0.8)]"
                style={{ width: `${splitPos}%` }}
              >
                {/* Fixed full-width container matching parent so video aligns 1:1 with base */}
                <div className="relative w-full h-full min-w-[500px] sm:min-w-[800px] lg:min-w-[1000px]">
                  <video
                    ref={degradedVideoRef}
                    key={`degraded-${activeVideo.videoUrl}`}
                    src={activeVideo.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                      filter: currentPreset.degradeFilter,
                    }}
                  />

                  {/* Subtle clean vignette on before side */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Degraded Side Badge (Before Label) */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex flex-col items-start gap-1 pointer-events-none max-w-[46%]">
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/80 text-zinc-300 text-[10px] sm:text-xs shadow-lg max-w-full">
                    <Film size={11} className="text-zinc-400 shrink-0 hidden sm:block" />
                    <span className="truncate">{currentPreset.beforeLabel}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                    <span>{currentPreset.resolutionBefore}</span>
                    <span className="text-zinc-600">•</span>
                    <span>{currentPreset.fpsBefore}</span>
                  </div>
                </div>
              </div>

              {/* DIVIDER HANDLE BAR & DRAGGER */}
              <div
                className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
                style={{ left: `calc(${splitPos}% - 16px)` }}
              >
                <div className="relative group/handle">
                  {/* Vertical Neon Line */}
                  <div className="absolute -top-[500px] -bottom-[500px] left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-luma-pink via-luma-purple to-luma-yellow shadow-[0_0_12px_rgba(218,143,255,0.9)]" />

                  {/* Center Tactile Orb */}
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-950 border-2 border-luma-purple shadow-[0_0_20px_rgba(218,143,255,0.9)] flex items-center justify-center text-white text-xs font-bold transition-transform group-hover/handle:scale-110 active:scale-95">
                    <span className="text-[10px] sm:text-[11px] tracking-tighter">↔</span>
                  </div>

                  {/* Floating Metric Bubble On Drag Handle */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300 pointer-events-none">
                    {Math.round(splitPos)}%
                  </div>
                </div>
              </div>

              {/* FLOATING ACTION OVERLAY CONTROLS (Bottom Right & Left) */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-30 flex items-center justify-between gap-2 pointer-events-auto">
                {/* Left Controls: Play/Pause, Mute, Replay */}
                <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-xl">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                    title={isPlaying ? 'توقف پخش' : 'ادامه پخش'}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                    title={isMuted ? 'فعال‌سازی صدا' : 'بی‌صدا'}
                  >
                    {isMuted ? <VolumeX size={13} className="text-zinc-400" /> : <Volume2 size={13} className="text-luma-yellow" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      restartVideos();
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="پخش مجدد از ابتدا"
                  >
                    <RefreshCw size={12} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSplitPos(50);
                    }}
                    className="px-2.5 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer hidden sm:flex items-center"
                    title="تنظیم اسلایدر روی ۵۰٪"
                  >
                    ۵۰% وسط
                  </button>
                </div>

                {/* Right Controls: Video Selector & Metadata */}
                <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-xl text-xs text-zinc-200">
                  {videos.length > 1 && (
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevVideo();
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                        title="ویدیوی قبلی"
                      >
                        <ChevronRight size={13} />
                      </button>
                      <span className="px-1 text-[10px] sm:text-[11px] font-mono text-zinc-300">
                        {currentVideoIndex + 1} / {videos.length}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextVideo();
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                        title="ویدیوی بعدی"
                      >
                        <ChevronLeft size={13} />
                      </button>
                    </div>
                  )}

                  <div className="h-4 w-[1px] bg-white/15 mx-1 hidden sm:block" />

                  <div className="px-2 py-1 text-[11px] text-zinc-300 hidden sm:flex items-center gap-1.5 font-light max-w-[220px] truncate">
                    <Zap size={12} className="text-luma-pink shrink-0" />
                    <span className="truncate">{activeVideo.title}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Video Thumbnail Strip & Quick Selection */}
        {videos.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 shrink-0 font-medium ml-1 whitespace-nowrap">
              انتخاب فوتیج نمونه:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              {videos.map((vid, idx) => {
                const isSelected = idx === currentVideoIndex;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setCurrentVideoIndex(idx)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Film size={11} className={isSelected ? 'text-luma-purple' : 'text-zinc-400'} />
                    <span className="whitespace-nowrap">فوتیج {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Hardware & Processing Metadata Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
          <div className="p-2.5 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 block font-medium">ضریب افزایش مقیاس</span>
            <span className="text-xs sm:text-sm font-black text-zinc-950 dark:text-white">تا ۴ برابر (4x UHD)</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 block font-medium">نرخ فریم خروجی</span>
            <span className="text-xs sm:text-sm font-black text-luma-purple">Smooth 60 FPS</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 block font-medium">تراک صوتی ویدئو</span>
            <span className="text-xs sm:text-sm font-black text-luma-yellow">حفظ کامل بدون افت</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 block font-medium">نوع پردازش ابری</span>
            <span className="text-xs sm:text-sm font-black text-zinc-950 dark:text-white">GPU Cloud Cluster</span>
          </div>
        </div>

      </div>
    </div>
  );
};

