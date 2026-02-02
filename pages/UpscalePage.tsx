
import React, { useEffect } from 'react';
import { UpscaleHero } from '../components/Services/Upscale/UpscaleHero';
import { UpscaleFeatures } from '../components/Services/Upscale/UpscaleFeatures';
import { UpscaleModels } from '../components/Services/Upscale/UpscaleModels';
import { UpscaleGallery } from '../components/Services/Upscale/UpscaleGallery';
import CTA from '../components/CTA';

const UpscalePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-yellow selection:text-black">
      <UpscaleHero />
      <UpscaleFeatures />
      <UpscaleModels />
      <UpscaleGallery />
      <CTA />
    </div>
  );
};

export default UpscalePage;
