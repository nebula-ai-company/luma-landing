import React, { useEffect } from 'react';
import { VideoEnhancementHero } from '../components/Services/VideoEnhancement/VideoEnhancementHero';
import { VideoEnhancementModels } from '../components/Services/VideoEnhancement/VideoEnhancementModels';
import { VideoEnhancementFeatures } from '../components/Services/VideoEnhancement/VideoEnhancementFeatures';
import { VideoEnhancementGuidance } from '../components/Services/VideoEnhancement/VideoEnhancementGuidance';
import { VideoEnhancementHowItWorks } from '../components/Services/VideoEnhancement/VideoEnhancementHowItWorks';
import { VideoEnhancementUseCases } from '../components/Services/VideoEnhancement/VideoEnhancementUseCases';
import { VideoEnhancementFAQ } from '../components/Services/VideoEnhancement/VideoEnhancementFAQ';
import CTA from '../components/CTA';

const VideoEnhancementPage: React.FC = () => {
  useEffect(() => {
    document.title = 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black text-zinc-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <VideoEnhancementHero />
      <VideoEnhancementModels />
      <VideoEnhancementFeatures />
      <VideoEnhancementGuidance />
      <VideoEnhancementHowItWorks />
      <VideoEnhancementUseCases />
      <VideoEnhancementFAQ />
      <CTA />
    </main>
  );
};

export default VideoEnhancementPage;
