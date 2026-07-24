import React, { useEffect } from 'react';
import { VtonHero } from '../components/Services/VirtualTryOn/VtonHero';
import { VtonSteps } from '../components/Services/VirtualTryOn/VtonSteps';
import { VtonFeatures } from '../components/Services/VirtualTryOn/VtonFeatures';
import { VtonUseCases } from '../components/Services/VirtualTryOn/VtonUseCases';
import { VtonModels } from '../components/Services/VirtualTryOn/VtonModels';
import { VtonGallery } from '../components/Services/VirtualTryOn/VtonGallery';
import { VtonFAQ } from '../components/Services/VirtualTryOn/VtonFAQ';
import CTA from '../components/CTA';

const VirtualTryOnPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-luma-yellow selection:text-black">
      <VtonHero />
      <VtonSteps />
      <VtonFeatures />
      <VtonUseCases />
      <VtonModels />
      <VtonGallery />
      <VtonFAQ />
      <CTA />
    </div>
  );
};

export default VirtualTryOnPage;
