import React, { useEffect } from 'react';
import { EditingHero } from '../components/Services/ImageEditing/EditingHero';
import { EditingSteps } from '../components/Services/ImageEditing/EditingSteps';
import { EditingFeatures } from '../components/Services/ImageEditing/EditingFeatures';
import { EditingFAQ } from '../components/Services/ImageEditing/EditingFAQ';
import CTA from '../components/CTA';

const ImageEditingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-gray-200 selection:bg-luma-purple selection:text-white transition-colors duration-300">
      <EditingHero />
      <EditingSteps />
      <EditingFeatures />
      <EditingFAQ />
      <CTA />
    </div>
  );
};

export default ImageEditingPage;
