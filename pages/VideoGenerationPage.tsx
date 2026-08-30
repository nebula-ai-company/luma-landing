import React, { useEffect } from 'react';
import { VideoHero } from '../components/Services/VideoGeneration/VideoHero';
import { VideoModels } from '../components/Services/VideoGeneration/VideoModels';
import { VideoReference } from '../components/Services/VideoGeneration/VideoReference';
import { VideoUseCases } from '../components/Services/VideoGeneration/VideoUseCases';
import { VideoFeatures } from '../components/Services/VideoGeneration/VideoFeatures';
import { VideoFAQ } from '../components/Services/VideoGeneration/VideoFAQ';
import CTA from '../components/CTA';

const VideoGenerationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white selection:bg-luma-purple selection:text-black transition-colors duration-300">
      <VideoHero />
      <VideoModels />
      <VideoReference />
      <VideoUseCases />
      <VideoFeatures />
      <VideoFAQ />
      <CTA />
    </div>
  );
};

export default VideoGenerationPage;
