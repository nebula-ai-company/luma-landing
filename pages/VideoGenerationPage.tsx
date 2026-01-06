
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
    <div className="min-h-screen bg-background text-white selection:bg-luma-purple selection:text-white">
      <VideoHero />
      <VideoModels />
      <VideoUseCases />
      <VideoFeatures />
      <CTA />
    </div>
  );
};

export default VideoGenerationPage;
