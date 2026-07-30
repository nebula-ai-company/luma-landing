import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Play, Pause, Sparkles, AudioLines, Sliders, 
  Languages, FileAudio, RefreshCw
} from 'lucide-react';

const MODELS_CONFIG = [
  { id: 'gemini-flash', name: 'Gemini 3.1 Flash TTS', maxChars: 50000, defaultFormat: 'MP3' },
  { id: 'eleven-v3', name: 'ElevenLabs Eleven v3', maxChars: 5000, defaultFormat: 'MP3' },
  { id: 'minimax-turbo', name: 'MiniMax Speech 2.8 Turbo', maxChars: 10000, defaultFormat: 'MP3' },
  { id: 'minimax-hd', name: 'MiniMax Speech 2.8 HD', maxChars: 10000, defaultFormat: 'WAV' },
];

const VOICES = [
  { id: 'arash', name: 'آرش', role: 'گوینده عمومی' },
  { id: 'maryam', name: 'مریم', role: 'روایت پادکست' },
  { id: 'sina', name: 'سینا', role: 'لحن تبلیغاتی' },
  { id: 'mina', name: 'مینا', role: 'لحن مستند' },
];

const EMOTIONS = ['طبیعی', 'روایی', 'هیجانی', 'رسمی'];
const LANGUAGES = ['فارسی (FA)', 'انگلیسی (EN)', 'عربی (AR)', 'فرانسوی (FR)'];
const FORMATS = ['MP3', 'WAV', 'AAC'];

const LUMA_COLORS = ['#FFB340', '#FF6482', '#DA8FFF'];

export const TTSMockup: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [selectedModel, setSelectedModel] = useState(MODELS_CONFIG[0]);
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(EMOTIONS[0]);
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);

  const [text, setText] = useState('«ایده‌های بزرگ، زمانی واقعی می‌شوند که بتوانیم آن‌ها را به شکلی درست روایت کنیم.»');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculated estimated cost
  const textLength = text.length;
  const estimatedLum = Math.max(1, Math.ceil(textLength / 4));

  // Switch format if model default changes
  useEffect(() => {
    if (selectedModel.id === 'minimax-hd') {
      setSelectedFormat('WAV');
    }
  }, [selectedModel]);

  // Handle Playback Simulation
  useEffect(() => {
    if (isPlaying && !shouldReduceMotion) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 200);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, shouldReduceMotion]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsPlaying(false);
    setProgress(0);

    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setIsPlaying(true);
      setProgress(15);
    }, 1200);
  };

  const barRatios = [0.4, 0.85, 0.35, 0.95, 0.6, 1.0, 0.5, 0.8, 0.45, 0.7, 0.9, 0.3, 0.75, 0.5];

  return (
    <div className="relative w-full rounded-3xl bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden text-zinc-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* Top Window Chrome with Luma Brand Dots */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/5 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-luma-pink/80" />
          <div className="w-3 h-3 rounded-full bg-luma-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-luma-purple/80" />
          <span className="text-xs text-zinc-500 dark:text-gray-400 mr-2">tts-studio.lumai.ir</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-luma-yellow/15 text-zinc-900 dark:text-luma-yellow text-[11px] font-bold">
            <AudioLines size={12} />
            <span>استودیو صوتی</span>
          </span>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="p-5 sm:p-6 space-y-5">
        
        {/* Model & Voice Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-gray-400">
              مدل گفتار
            </label>
            <div className="relative">
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const m = MODELS_CONFIG.find((x) => x.id === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-luma-yellow/50 transition-colors cursor-pointer"
              >
                {MODELS_CONFIG.map((m) => (
                  <option key={m.id} value={m.id} className="bg-white dark:bg-zinc-900">
                    {m.name} (تا {m.maxChars.toLocaleString('fa-IR')} کاراکتر)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Voice Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-gray-400">
              صدای گوینده
            </label>
            <div className="relative">
              <select
                value={selectedVoice.id}
                onChange={(e) => {
                  const v = VOICES.find((x) => x.id === e.target.value);
                  if (v) setSelectedVoice(v);
                }}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-luma-yellow/50 transition-colors cursor-pointer"
              >
                {VOICES.map((v) => (
                  <option key={v.id} value={v.id} className="bg-white dark:bg-zinc-900">
                    {v.name} - {v.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Text Input & Character Counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-gray-400">
            <span>متن ورودی</span>
            <span className="dir-ltr font-medium">
              {textLength.toLocaleString('en-US')} / {selectedModel.maxChars.toLocaleString('en-US')}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, selectedModel.maxChars))}
              rows={3}
              placeholder="متن خود را اینجا وارد کنید..."
              className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 rounded-2xl p-3.5 text-sm text-zinc-900 dark:text-white leading-relaxed resize-none focus:outline-hidden focus:ring-2 focus:ring-luma-yellow/50 transition-all font-light"
            />
          </div>
        </div>

        {/* Controls Grid: Language, Emotion, Format */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          
          {/* Language */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <Languages size={10} /> زبان
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-lg px-2 py-1.5 text-[11px] text-zinc-800 dark:text-gray-200 cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} className="bg-white dark:bg-zinc-900">{l}</option>
              ))}
            </select>
          </div>

          {/* Emotion / Style */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <Sliders size={10} /> سبک بیان
            </span>
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-lg px-2 py-1.5 text-[11px] text-zinc-800 dark:text-gray-200 cursor-pointer"
            >
              {EMOTIONS.map((e) => (
                <option key={e} value={e} className="bg-white dark:bg-zinc-900">{e}</option>
              ))}
            </select>
          </div>

          {/* Audio Format */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <FileAudio size={10} /> فرمت صوتی
            </span>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-lg px-2 py-1.5 text-[11px] text-zinc-800 dark:text-gray-200 cursor-pointer"
            >
              {FORMATS.map((f) => (
                <option key={f} value={f} className="bg-white dark:bg-zinc-900">{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Row & Cost Estimate */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-black/5 dark:border-white/10">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-gray-400">هزینه برآوردی:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-luma-yellow/15 border border-luma-yellow/30 text-xs font-bold text-zinc-950 dark:text-luma-yellow">
              <Sparkles size={12} className="text-luma-yellow" />
              <span>{estimatedLum} LUM</span>
            </span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || textLength === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-luma-yellow text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-luma-yellow/90 font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>در حال پردازش گفتار...</span>
              </>
            ) : (
              <>
                <AudioLines size={14} />
                <span>تولید فایل صوتی</span>
              </>
            )}
          </button>
        </div>

        {/* Audio Player Output Panel */}
        <AnimatePresence>
          {hasGenerated && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-luma-yellow text-zinc-950 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    aria-label={isPlaying ? "توقف پخش" : "پخش پیش‌نمایش صوتی"}
                  >
                    {isPlaying ? <Pause size={16} className="fill-zinc-950" /> : <Play size={16} className="fill-zinc-950 translate-x-[0.5px]" />}
                  </button>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span>{selectedVoice.name} ({selectedEmotion})</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-sm bg-black/10 dark:bg-white/10 text-zinc-600 dark:text-gray-300">
                        {selectedFormat}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-gray-400">
                      مدل: {selectedModel.name}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-zinc-500 dark:text-gray-400 dir-ltr">
                  0:0{Math.floor((progress / 100) * 8)} / 0:08
                </div>
              </div>

              {/* Waveform Display */}
              <div className="flex items-center justify-center gap-1 h-8 px-2 bg-white/60 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                {barRatios.map((ratio, idx) => {
                  const isActive = (idx / barRatios.length) * 100 <= progress;
                  const barColor = LUMA_COLORS[idx % 3];

                  return (
                    <motion.div
                      key={idx}
                      animate={
                        shouldReduceMotion || !isPlaying
                          ? { scaleY: ratio * 0.7 }
                          : { scaleY: [ratio * 0.3, ratio * 1.2, ratio * 0.4, ratio * 0.9] }
                      }
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: idx * 0.05,
                      }}
                      className="w-1.5 rounded-full origin-center transition-colors duration-200"
                      style={{
                        height: '100%',
                        backgroundColor: isActive
                          ? barColor
                          : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Interactive Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setProgress(newProgress);
                }}
                className="relative w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-luma-yellow rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
