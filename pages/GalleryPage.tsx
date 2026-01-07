
import React, { useEffect } from 'react';
import { GalleryHero } from '../components/Gallery/GalleryHero';
import { GalleryGrid } from '../components/Gallery/GalleryGrid';
import CTA from '../components/CTA';

const GalleryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-purple selection:text-white">
      <GalleryHero />
      <GalleryGrid />
      <CTA />
    </div>
  );
};

export default GalleryPage;
