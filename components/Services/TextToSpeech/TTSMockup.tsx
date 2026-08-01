import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Play, Pause, Sparkles, AudioLines, Sliders, 
  Languages, FileAudio, RefreshCw, ChevronDown, Check
} from 'lucide-react';

interface OptionItem {
  id: string;
  label: string;
  sublabel?: string;
}

interface CustomSelectProps {
  options: OptionItem[];
  value: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';
  isHighlighted?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  isHighlighted = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.id === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-zinc-50 dark:bg-zinc-900/90 border ${
          isHighlighted 
            ? 'border-luma-yellow ring-2 ring-luma-yellow/50 bg-luma-yellow/10 dark:bg-luma-yellow/15 shadow-[0_0_15px_rgba(255,200,55,0.25)]' 
            : 'border-black/10 dark:border-white/10 hover:border-luma-yellow/40'
        } rounded-xl px-3.5 ${
          size === 'sm' ? 'py-2 text-[11px]' : 'py-2.5 text-xs'
        } font-medium text-zinc-900 dark:text-white flex items-center justify-between gap-3 transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-luma-yellow/40`}
      >
        <span className="truncate text-right flex-1">
          {selectedOption.label} {selectedOption.sublabel ? <span className="opacity-70 text-[10px] font-normal mr-1">({selectedOption.sublabel})</span> : null}
        </span>
        <ChevronDown
          size={size === 'sm' ? 13 : 15}
          className={`shrink-0 text-zinc-400 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-luma-yellow dark:text-luma-yellow' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-zinc-900/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-2xl rounded-xl p-1.5 space-y-0.5 max-h-56 overflow-y-auto font-sans text-right dir-rtl"
          >
            {options.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-right transition-colors cursor-pointer ${
                    size === 'sm' ? 'text-[11px]' : 'text-xs'
                  } ${
                    isSelected
                      ? 'bg-luma-yellow/15 text-zinc-950 dark:text-luma-yellow font-bold'
                      : 'text-zinc-700 dark:text-gray-200 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="truncate">
                    {option.label} {option.sublabel ? <span className="opacity-70 text-[10px] font-normal">({option.sublabel})</span> : null}
                  </span>
                  {isSelected && <Check size={14} className="text-luma-yellow shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

const SAMPLE_PHRASES = [
  '«ایده‌های بزرگ، زمانی واقعی می‌شوند که بتوانیم آن‌ها را به شکلی درست روایت کنیم.»',
  '«با هوش مصنوعی لوما، متن‌های خود را با طبیعی‌ترین گویندگان استودیویی به صدا تبدیل کنید.»',
  '«پشتیبانی کامل از اعراب‌گذاری، تنوع لحن و کیفیت استودیویی فوق‌العاده.»',
];

export const TTSMockup: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedEmotionIndex, setSelectedEmotionIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);

  const selectedModel = MODELS_CONFIG[selectedModelIndex];
  const selectedVoice = VOICES[selectedVoiceIndex];
  const selectedEmotion = EMOTIONS[selectedEmotionIndex];

  const [text, setText] = useState(SAMPLE_PHRASES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);

  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

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

  // Master Studio Loop Animation Sequence
  useEffect(() => {
    if (shouldReduceMotion) return;

    let currentPhrase = 0;
    let voiceIdx = 0;
    let emotionIdx = 0;
    let modelIdx = 0;

    const loopTimer = setInterval(() => {
      // Step 1: Switch phrase via Typewriter Effect
      currentPhrase = (currentPhrase + 1) % SAMPLE_PHRASES.length;
      const targetPhrase = SAMPLE_PHRASES[currentPhrase];
      
      setIsAutoTyping(true);
      setHighlightedField('text');
      
      let charIdx = 0;
      setText('');

      const typeInterval = setInterval(() => {
        if (charIdx <= targetPhrase.length) {
          setText(targetPhrase.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setIsAutoTyping(false);

          // Step 2: Highlight & Cycle Voice Selector
          setTimeout(() => {
            setHighlightedField('voice');
            voiceIdx = (voiceIdx + 1) % VOICES.length;
            setSelectedVoiceIndex(voiceIdx);
          }, 400);

          // Step 3: Highlight & Cycle Emotion Selector
          setTimeout(() => {
            setHighlightedField('emotion');
            emotionIdx = (emotionIdx + 1) % EMOTIONS.length;
            setSelectedEmotionIndex(emotionIdx);
          }, 1100);

          // Step 4: Highlight & Cycle Model Selector
          setTimeout(() => {
            setHighlightedField('model');
            modelIdx = (modelIdx + 1) % MODELS_CONFIG.length;
            setSelectedModelIndex(modelIdx);
          }, 1800);

          // Step 5: Highlight & Trigger Generate Audio Button
          setTimeout(() => {
            setHighlightedField('generate');
            setIsGenerating(true);
            setIsPlaying(false);
            setProgress(0);
          }, 2500);

          // Step 6: Complete Generation & Resume Audio Playback
          setTimeout(() => {
            setIsGenerating(false);
            setHasGenerated(true);
            setIsPlaying(true);
            setProgress(5);
            setHighlightedField(null);
          }, 3600);
        }
      }, 35);

    }, 13000);

    return () => clearInterval(loopTimer);
  }, [shouldReduceMotion]);

  // Handle Playback Simulation with continuous loop
  useEffect(() => {
    if (isPlaying && !shouldReduceMotion) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Smooth continuous loop
          }
          return prev + 1.2;
        });
      }, 100);
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
      setProgress(5);
    }, 1200);
  };

  // Rich waveform bar heights for high-end studio feel
  const barRatios = [
    0.3, 0.6, 0.9, 0.4, 0.75, 1.0, 0.55, 0.85, 0.4, 0.95, 
    0.65, 0.35, 0.8, 0.5, 0.9, 0.7, 0.45, 0.85, 0.6, 0.3
  ];

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-luma-yellow/15 text-zinc-900 dark:text-luma-yellow text-[11px] font-bold border border-luma-yellow/20">
            {/* Animated Micro Equalizer Bars */}
            <span className="flex items-end gap-[2px] h-3 w-3 shrink-0">
              <motion.span
                animate={shouldReduceMotion ? {} : { height: ['30%', '100%', '40%'] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[2px] bg-luma-yellow rounded-full"
              />
              <motion.span
                animate={shouldReduceMotion ? {} : { height: ['80%', '20%', '90%'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                className="w-[2px] bg-luma-pink rounded-full"
              />
              <motion.span
                animate={shouldReduceMotion ? {} : { height: ['40%', '90%', '30%'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="w-[2px] bg-luma-purple rounded-full"
              />
            </span>
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
            <CustomSelect
              options={MODELS_CONFIG.map((m) => ({
                id: m.id,
                label: m.name,
                sublabel: `تا ${m.maxChars.toLocaleString('fa-IR')} کاراکتر`,
              }))}
              value={selectedModel.id}
              onChange={(id) => {
                const idx = MODELS_CONFIG.findIndex((x) => x.id === id);
                if (idx !== -1) setSelectedModelIndex(idx);
              }}
              size="md"
              isHighlighted={highlightedField === 'model'}
            />
          </div>

          {/* Voice Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-gray-400">
              صدای گوینده
            </label>
            <CustomSelect
              options={VOICES.map((v) => ({
                id: v.id,
                label: `${v.name} - ${v.role}`,
              }))}
              value={selectedVoice.id}
              onChange={(id) => {
                const idx = VOICES.findIndex((x) => x.id === id);
                if (idx !== -1) setSelectedVoiceIndex(idx);
              }}
              size="md"
              isHighlighted={highlightedField === 'voice'}
            />
          </div>
        </div>

        {/* Text Input & Character Counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-gray-400">
            <span>متن ورودی</span>
            <span className="dir-ltr font-medium font-mono">
              {textLength.toLocaleString('en-US')} / {selectedModel.maxChars.toLocaleString('en-US')}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, selectedModel.maxChars))}
              rows={3}
              placeholder="متن خود را اینجا وارد کنید..."
              className={`w-full bg-zinc-50 dark:bg-zinc-900/80 border ${
                highlightedField === 'text'
                  ? 'border-luma-yellow ring-2 ring-luma-yellow/50 bg-luma-yellow/5 shadow-[0_0_20px_rgba(255,200,55,0.15)]'
                  : 'border-black/10 dark:border-white/10 focus:ring-2 focus:ring-luma-yellow/50'
              } rounded-2xl p-3.5 text-sm text-zinc-900 dark:text-white leading-relaxed resize-none focus:outline-hidden transition-all duration-300 font-light`}
            />
            {isAutoTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="absolute bottom-4 left-4 w-2 h-4 bg-luma-yellow rounded-xs pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Controls Grid: Language, Emotion, Format */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          
          {/* Language */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <Languages size={10} /> زبان
            </span>
            <CustomSelect
              options={LANGUAGES.map((l) => ({ id: l, label: l }))}
              value={selectedLanguage}
              onChange={(id) => setSelectedLanguage(id)}
              size="sm"
              isHighlighted={highlightedField === 'language'}
            />
          </div>

          {/* Emotion / Style */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <Sliders size={10} /> سبک بیان
            </span>
            <CustomSelect
              options={EMOTIONS.map((e) => ({ id: e, label: e }))}
              value={selectedEmotion}
              onChange={(id) => {
                const idx = EMOTIONS.indexOf(id);
                if (idx !== -1) setSelectedEmotionIndex(idx);
              }}
              size="sm"
              isHighlighted={highlightedField === 'emotion'}
            />
          </div>

          {/* Audio Format */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-gray-400 flex items-center gap-1">
              <FileAudio size={10} /> فرمت صوتی
            </span>
            <CustomSelect
              options={FORMATS.map((f) => ({ id: f, label: f }))}
              value={selectedFormat}
              onChange={(id) => setSelectedFormat(id)}
              size="sm"
              isHighlighted={highlightedField === 'format'}
            />
          </div>
        </div>

        {/* Action Row & Cost Estimate */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-black/5 dark:border-white/10">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-gray-400">هزینه برآوردی:</span>
            <motion.span 
              key={estimatedLum}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-luma-yellow/15 border border-luma-yellow/30 text-xs font-bold text-zinc-950 dark:text-luma-yellow shadow-xs"
            >
              <Sparkles size={12} className="text-luma-yellow" />
              <span>{estimatedLum} LUM</span>
            </motion.span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || textLength === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-luma-yellow text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-luma-yellow/90 font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer ${
              highlightedField === 'generate'
                ? 'ring-4 ring-luma-yellow/60 scale-105 shadow-[0_0_20px_rgba(255,200,55,0.4)]'
                : ''
            }`}
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
              className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 space-y-3 relative overflow-hidden"
            >
              {/* Subtle Animated Glow Accent when Playing */}
              {isPlaying && !shouldReduceMotion && (
                <motion.div
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-1 bg-gradient-to-r from-luma-yellow/10 via-luma-pink/10 to-luma-purple/10 rounded-2xl blur-lg pointer-events-none"
                />
              )}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* Looping Pulsing Ring around Play Button */}
                    {isPlaying && !shouldReduceMotion && (
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-luma-yellow"
                      />
                    )}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative z-10 w-10 h-10 rounded-full bg-luma-yellow text-zinc-950 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                      aria-label={isPlaying ? "توقف پخش" : "پخش پیش‌نمایش صوتی"}
                    >
                      {isPlaying ? <Pause size={16} className="fill-zinc-950" /> : <Play size={16} className="fill-zinc-950 translate-x-[0.5px]" />}
                    </button>
                  </div>

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

                <div className="text-[11px] font-semibold text-zinc-500 dark:text-gray-400 dir-ltr font-mono">
                  0:0{Math.min(8, Math.floor((progress / 100) * 8))} / 0:08
                </div>
              </div>

              {/* Waveform Display */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 h-10 px-3 bg-white/70 dark:bg-black/60 rounded-xl border border-black/5 dark:border-white/5">
                {barRatios.map((ratio, idx) => {
                  const isActive = (idx / barRatios.length) * 100 <= progress;
                  const barColor = LUMA_COLORS[idx % 3];

                  return (
                    <motion.div
                      key={idx}
                      animate={
                        shouldReduceMotion || !isPlaying
                          ? { scaleY: ratio * 0.6 }
                          : { 
                              scaleY: [
                                ratio * 0.2, 
                                ratio * 1.35, 
                                ratio * 0.4, 
                                ratio * 1.1, 
                                ratio * 0.3
                              ] 
                            }
                      }
                      transition={{
                        duration: 0.8 + (idx % 5) * 0.12,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        delay: (idx * 0.05) % 0.6,
                        ease: 'easeInOut'
                      }}
                      className="w-1.5 rounded-full origin-center transition-all duration-150"
                      style={{
                        height: '100%',
                        backgroundColor: isActive
                          ? barColor
                          : 'rgba(255,255,255,0.18)',
                        boxShadow: isActive && isPlaying
                          ? `0 0 8px ${barColor}80`
                          : 'none'
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
                className="relative z-10 w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-luma-yellow rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(255,200,55,0.5)]"
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
