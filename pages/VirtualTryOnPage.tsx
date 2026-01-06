
import React, { useEffect } from 'react';
import { VtonHero } from '../components/Services/VirtualTryOn/VtonHero';
import { VtonSteps } from '../components/Services/VirtualTryOn/VtonSteps';
import { VtonFeatures } from '../components/Services/VirtualTryOn/VtonFeatures';
import { VtonGallery } from '../components/Services/VirtualTryOn/VtonGallery';
import CTA from '../components/CTA';

const VirtualTryOnPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-yellow selection:text-black">
      <VtonHero />
      <VtonSteps />
      <VtonFeatures />
      <VtonGallery />
      <CTA />
    </div>
  );
};

export default VirtualTryOnPage;
