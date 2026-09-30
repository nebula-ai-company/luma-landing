import React, { useEffect, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { TTSHero } from '../components/Services/TextToSpeech/TTSHero';
import { TTSModels } from '../components/Services/TextToSpeech/TTSModels';
import { TTSHowItWorks } from '../components/Services/TextToSpeech/TTSHowItWorks';
import { TTSCapabilities } from '../components/Services/TextToSpeech/TTSCapabilities';
import { TTSUseCases } from '../components/Services/TextToSpeech/TTSUseCases';
import { TTSPricingLimitations } from '../components/Services/TextToSpeech/TTSPricingLimitations';
import { TTSFAQ } from '../components/Services/TextToSpeech/TTSFAQ';
import CTA from '../components/CTA';
import {
  useCatalog,
  findServiceById,
  getValidMediaModels,
  getMediaServicePriceInfo,
} from '../lib/catalogApi.ts';

const TextToSpeechPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Page-level single catalog fetch
  const { data, loading, refreshing, error, retry } = useCatalog();

  // Resolve text_to_speech service
  const ttsService = useMemo(() => {
    return findServiceById(data, 'text_to_speech');
  }, [data]);

  // Valid media models (preserving backend ordering)
  const validModels = useMemo(() => {
    return ttsService ? getValidMediaModels(ttsService) : [];
  }, [ttsService]);

  // Dynamic price info
  const priceInfo = useMemo(() => {
    return getMediaServicePriceInfo(validModels);
  }, [validModels]);

  const startingPrice = useMemo(() => {
    if (!priceInfo || priceInfo.hasMixedCurrencies) return null;
    return priceInfo.minimum;
  }, [priceInfo]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black text-zinc-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <SEOHead title="لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای" />
      <TTSHero
        modelCount={validModels.length}
        startingPrice={startingPrice}
        priceInfo={priceInfo}
        loading={loading}
        isServiceAvailable={Boolean(ttsService)}
        models={validModels}
      />
      <TTSModels
        service={ttsService}
        models={validModels}
        loading={loading}
        refreshing={refreshing}
        error={error}
        onRetry={retry}
      />
      <TTSHowItWorks />
      <TTSCapabilities />
      <TTSUseCases />
      <TTSPricingLimitations
        models={validModels}
        priceInfo={priceInfo}
        loading={loading}
        error={error}
      />
      <TTSFAQ
        priceInfo={priceInfo}
        startingPrice={startingPrice}
      />
      <CTA />
    </main>
  );
};

export default TextToSpeechPage;
