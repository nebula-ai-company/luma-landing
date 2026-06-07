import React, { useEffect } from 'react';
import { EditingHero } from '../components/Services/ImageEditing/EditingHero';
import { EditingFeatures } from '../components/Services/ImageEditing/EditingFeatures';
// Fixed import: CTA is a default export
import CTA from '../components/CTA';

const ImageEditingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-gray-200 selection:bg-luma-purple selection:text-white transition-colors duration-300">
      <EditingHero />
      <EditingFeatures />
      <CTA />
    </div>
  );
};

export default ImageEditingPage;