
import React, { useEffect } from 'react';
import { GenHero } from '../components/Services/ImageGeneration/GenHero';
import { GenSteps } from '../components/Services/ImageGeneration/GenSteps';
import { GenFeatures } from '../components/Services/ImageGeneration/GenFeatures';
import CTA from '../components/CTA';

const ImageGenerationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
      <GenHero />
      <GenSteps />
      <GenFeatures />
      <CTA />
    </div>
  );
};

export default ImageGenerationPage;
