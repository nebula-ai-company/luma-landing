import React, { useEffect, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { VideoEnhancementHero } from '../components/Services/VideoEnhancement/VideoEnhancementHero';
import { VideoEnhancementModels } from '../components/Services/VideoEnhancement/VideoEnhancementModels';
import { VideoEnhancementFeatures } from '../components/Services/VideoEnhancement/VideoEnhancementFeatures';
import { VideoEnhancementGuidance } from '../components/Services/VideoEnhancement/VideoEnhancementGuidance';
import { VideoEnhancementHowItWorks } from '../components/Services/VideoEnhancement/VideoEnhancementHowItWorks';
import { VideoEnhancementUseCases } from '../components/Services/VideoEnhancement/VideoEnhancementUseCases';
import { VideoEnhancementFAQ } from '../components/Services/VideoEnhancement/VideoEnhancementFAQ';
import CTA from '../components/CTA';
import {
  useCatalog,
  findServiceById,
  getValidMediaModels,
  getMediaServicePriceInfo,
} from '../lib/catalogApi';

const VideoEnhancementPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Page-level single catalog fetch
  const { data, loading, error, refetch } = useCatalog();

  // Resolve upscale_video service
  const videoEnhanceService = useMemo(() => {
    return findServiceById(data, 'upscale_video');
  }, [data]);

  // Valid media models
  const validModels = useMemo(() => {
    return videoEnhanceService ? getValidMediaModels(videoEnhanceService) : [];
  }, [videoEnhanceService]);

  // Calculate dynamic starting price info (lowest finite minimum & currency consistency)
  const priceInfo = useMemo(() => {
    return getMediaServicePriceInfo(validModels);
  }, [validModels]);

  const startingPrice = useMemo(() => {
    if (!priceInfo || priceInfo.hasMixedCurrencies) return null;
    return priceInfo.minimum;
  }, [priceInfo]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black text-zinc-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <SEOHead title="لوما | افزایش کیفیت ویدئو با هوش مصنوعی" />
      <VideoEnhancementHero
        modelCount={validModels.length}
        startingPrice={startingPrice}
        priceInfo={priceInfo}
        loading={loading}
        isServiceAvailable={Boolean(videoEnhanceService)}
      />
      <VideoEnhancementModels
        service={videoEnhanceService}
        models={validModels}
        loading={loading}
        refreshing={false}
        error={error ? error.message : null}
        onRetry={refetch}
      />
      <VideoEnhancementFeatures />
      <VideoEnhancementGuidance models={validModels} />
      <VideoEnhancementHowItWorks modelCount={validModels.length} />
      <VideoEnhancementUseCases />
      <VideoEnhancementFAQ startingPrice={startingPrice} priceInfo={priceInfo} />
      <CTA />
    </main>
  );
};

export default VideoEnhancementPage;
