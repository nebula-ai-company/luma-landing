import React, { useEffect } from 'react';
import { UpscaleHero } from '../components/Services/Upscale/UpscaleHero';
import { UpscaleFeatures } from '../components/Services/Upscale/UpscaleFeatures';
import { UpscaleModels } from '../components/Services/Upscale/UpscaleModels';
import { UpscaleGallery } from '../components/Services/Upscale/UpscaleGallery';
import { UpscaleFAQ } from '../components/Services/Upscale/UpscaleFAQ';
import CTA from '../components/CTA';

const UpscalePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-yellow selection:text-black transition-colors duration-300">
      <UpscaleHero />
      <UpscaleFeatures />
      <UpscaleModels />
      <UpscaleGallery />
      <UpscaleFAQ />
      <CTA />
    </div>
  );
};

export default UpscalePage;
