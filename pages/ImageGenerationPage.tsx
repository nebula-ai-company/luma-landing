
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
    <div className="min-h-screen bg-background text-white selection:bg-luma-pink selection:text-white">
      <GenHero />
      <GenSteps />
      <GenFeatures />
      <CTA />
    </div>
  );
};

export default ImageGenerationPage;
