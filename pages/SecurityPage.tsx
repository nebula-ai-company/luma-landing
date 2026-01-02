
import React, { useEffect } from 'react';
import { SecurityHero } from '../components/Security/SecurityHero';
import { SecurityFeatures } from '../components/Security/SecurityFeatures';
import { Compliance } from '../components/Security/Compliance';

const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <SecurityHero />
      <SecurityFeatures />
      <Compliance />
    </div>
  );
};

export default SecurityPage;
