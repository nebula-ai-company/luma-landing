import React, { useEffect, useMemo } from 'react';
import { VideoHero } from '../components/Services/VideoGeneration/VideoHero';
import { VideoModels } from '../components/Services/VideoGeneration/VideoModels';
import { VideoReference } from '../components/Services/VideoGeneration/VideoReference';
import { VideoUseCases } from '../components/Services/VideoGeneration/VideoUseCases';
import { VideoFeatures } from '../components/Services/VideoGeneration/VideoFeatures';
import { VideoFAQ } from '../components/Services/VideoGeneration/VideoFAQ';
import CTA from '../components/CTA';
import { useCatalog } from '../lib/catalogApi.ts';
import {
  getVideoCatalogServices,
  getActiveReferenceModels,
  getFeaturedVideoModelNames,
  countUniqueVideoModels,
} from '../lib/videoCatalog.ts';

const VideoGenerationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading, error, refetch } = useCatalog();

  const videoServices = useMemo(() => getVideoCatalogServices(data), [data]);
  const referenceModels = useMemo(() => getActiveReferenceModels(data), [data]);
  const featuredNames = useMemo(() => getFeaturedVideoModelNames(data, 5), [data]);
  const uniqueCount = useMemo(() => countUniqueVideoModels(data), [data]);

  return (
    <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white selection:bg-luma-purple selection:text-black transition-colors duration-300">
      <VideoHero featuredModelNames={featuredNames} totalModelCount={uniqueCount} />
      <VideoModels
        catalog={data}
        services={videoServices}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
      <VideoReference referenceModels={referenceModels} />
      <VideoUseCases />
      <VideoFeatures />
      <VideoFAQ />
      <CTA />
    </main>
  );
};

export default VideoGenerationPage;
