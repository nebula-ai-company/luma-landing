
import React, { useEffect } from 'react';
import { SecurityHero } from '../components/Security/SecurityHero';
import { SecurityFeatures } from '../components/Security/SecurityFeatures';
import { Compliance } from '../components/Security/Compliance';

const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-indigo-600/20 dark:selection:bg-luma-purple/30 selection:text-indigo-900 dark:selection:text-white transition-colors duration-300">
      <SecurityHero />
      <SecurityFeatures />
      <Compliance />
    </div>
  );
};

export default SecurityPage;
