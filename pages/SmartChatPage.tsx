import React, { useEffect } from 'react';
import { ChatHero } from '../components/Services/SmartChat/ChatHero';
import { ChatFeatures } from '../components/Services/SmartChat/ChatFeatures';
import { ChatModels } from '../components/Services/SmartChat/ChatModels';
import { ChatGuide } from '../components/Services/SmartChat/ChatGuide';
import { ChatFAQ } from '../components/Services/SmartChat/ChatFAQ';
import CTA from '../components/CTA';

const SmartChatPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-luma-purple selection:text-white">
      <ChatHero />
      <ChatFeatures />
      <ChatModels />
      <ChatGuide />
      <ChatFAQ />
      <CTA />
    </div>
  );
};

export default SmartChatPage;
