
import React, { useEffect } from 'react';
import { VideoHero } from '../components/Services/VideoGeneration/VideoHero';
import { VideoModels } from '../components/Services/VideoGeneration/VideoModels';
import { VideoUseCases } from '../components/Services/VideoGeneration/VideoUseCases';
import { VideoFeatures } from '../components/Services/VideoGeneration/VideoFeatures';
import CTA from '../components/CTA';

const VideoGenerationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white selection:bg-indigo-600 selection:text-white transition-colors duration-300">
      <VideoHero />
      <VideoModels />
      <VideoUseCases />
      <VideoFeatures />
      <CTA />
    </div>
  );
};

export default VideoGenerationPage;
