import React, { useEffect, useMemo } from 'react';
import { useCatalog, findServiceById, getValidChatModels } from '../lib/catalogApi';
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

  const { data, loading, error, refetch } = useCatalog();

  const chatService = useMemo(() => {
    return findServiceById(data, 'chat');
  }, [data]);

  const validModels = useMemo(() => {
    return getValidChatModels(chatService);
  }, [chatService]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-luma-purple selection:text-white">
      <ChatHero
        service={chatService}
        models={validModels}
        modelCount={validModels.length}
        loading={loading}
      />
      <ChatFeatures
        models={validModels}
      />
      <ChatModels
        service={chatService}
        models={validModels}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
      <ChatGuide />
      <ChatFAQ
        models={validModels}
        modelCount={validModels.length}
        loading={loading}
      />
      <CTA />
    </main>
  );
};

export default SmartChatPage;
