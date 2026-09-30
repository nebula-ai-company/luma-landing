import React, { useEffect, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { VtonHero } from '../components/Services/VirtualTryOn/VtonHero';
import { VtonSteps } from '../components/Services/VirtualTryOn/VtonSteps';
import { VtonFeatures } from '../components/Services/VirtualTryOn/VtonFeatures';
import { VtonUseCases } from '../components/Services/VirtualTryOn/VtonUseCases';
import { VtonModels } from '../components/Services/VirtualTryOn/VtonModels';
import { VtonGallery } from '../components/Services/VirtualTryOn/VtonGallery';
import { VtonFAQ } from '../components/Services/VirtualTryOn/VtonFAQ';
import CTA from '../components/CTA';
import {
  useCatalog,
  findServiceById,
  getValidMediaModels,
  getMediaServicePriceInfo,
} from '../lib/catalogApi.ts';

const VirtualTryOnPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Single page-level catalog fetch
  const { data, loading, error, refetch } = useCatalog();

  // Resolve virtual_try_on service
  const vtonService = useMemo(() => {
    return findServiceById(data, 'virtual_try_on');
  }, [data]);

  // Extract valid media models (preserving backend ordering)
  const validModels = useMemo(() => {
    return vtonService ? getValidMediaModels(vtonService) : [];
  }, [vtonService]);

  // Dynamic price calculation
  const priceInfo = useMemo(() => {
    return getMediaServicePriceInfo(validModels);
  }, [validModels]);

  const startingPrice = useMemo(() => {
    if (!priceInfo || priceInfo.hasMixedCurrencies) return null;
    return priceInfo.minimum;
  }, [priceInfo]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-luma-yellow selection:text-black overflow-x-hidden w-full max-w-full">
      <SEOHead title="لوما | پرو مجازی لباس با هوش مصنوعی - استودیوی عکاسی دیجیتال" />
      <VtonHero
        modelCount={validModels.length}
        startingPrice={startingPrice}
        priceInfo={priceInfo}
        loading={loading}
        isServiceAvailable={Boolean(vtonService)}
        models={validModels}
      />
      <VtonSteps />
      <VtonFeatures />
      <VtonUseCases />
      <VtonModels
        service={vtonService}
        models={validModels}
        loading={loading}
        refreshing={false}
        error={error ? error.message : null}
        onRetry={refetch}
      />
      <VtonGallery />
      <VtonFAQ
        models={validModels}
        priceInfo={priceInfo}
        startingPrice={startingPrice}
      />
      <CTA />
    </main>
  );
};

export default VirtualTryOnPage;
