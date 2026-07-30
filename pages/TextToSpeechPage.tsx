import React, { useEffect } from 'react';
import { TTSHero } from '../components/Services/TextToSpeech/TTSHero';
import { TTSModels } from '../components/Services/TextToSpeech/TTSModels';
import { TTSHowItWorks } from '../components/Services/TextToSpeech/TTSHowItWorks';
import { TTSCapabilities } from '../components/Services/TextToSpeech/TTSCapabilities';
import { TTSUseCases } from '../components/Services/TextToSpeech/TTSUseCases';
import { TTSPricingLimitations } from '../components/Services/TextToSpeech/TTSPricingLimitations';
import { TTSFAQ } from '../components/Services/TextToSpeech/TTSFAQ';
import CTA from '../components/CTA';

const TextToSpeechPage: React.FC = () => {
  useEffect(() => {
    document.title = 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <TTSHero />
      <TTSModels />
      <TTSHowItWorks />
      <TTSCapabilities />
      <TTSUseCases />
      <TTSPricingLimitations />
      <TTSFAQ />
      <CTA />
    </main>
  );
};

export default TextToSpeechPage;
