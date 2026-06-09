
import React, { useEffect } from 'react';
import CTA from '../components/CTA';
import { AboutHero } from '../components/About/AboutHero';
import { AboutStats } from '../components/About/AboutStats';
import { AboutCoreValues } from '../components/About/AboutCoreValues';
import { AboutStory } from '../components/About/AboutStory';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-purple selection:text-white">
      <AboutHero />
      <AboutStats />
      <AboutCoreValues />
      <AboutStory />
      <CTA />
    </div>
  );
};

export default AboutPage;
