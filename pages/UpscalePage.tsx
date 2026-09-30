import React, { useEffect, useMemo } from 'react';
import { UpscaleHero } from '../components/Services/Upscale/UpscaleHero';
import { UpscaleFeatures } from '../components/Services/Upscale/UpscaleFeatures';
import { UpscaleModels } from '../components/Services/Upscale/UpscaleModels';
import { UpscaleGallery } from '../components/Services/Upscale/UpscaleGallery';
import { UpscaleFAQ } from '../components/Services/Upscale/UpscaleFAQ';
import CTA from '../components/CTA';
import {
  useCatalog,
  findServiceById,
  getValidMediaModels,
  getRepresentativeMediaModels,
} from '../lib/catalogApi.ts';

const UpscalePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading, error, refetch } = useCatalog();

  const upscaleService = useMemo(() => findServiceById(data, 'upscale_image'), [data]);
  const validModels = useMemo(() => getValidMediaModels(upscaleService), [upscaleService]);
  const representativeModels = useMemo(
    () => getRepresentativeMediaModels(upscaleService, undefined, 4),
    [upscaleService]
  );
  const representativeNames = useMemo(
    () => representativeModels.map(m => m.name),
    [representativeModels]
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-yellow selection:text-black transition-colors duration-300">
      <UpscaleHero
        representativeModelNames={representativeNames}
        totalModelCount={validModels.length}
      />
      <UpscaleFeatures />
      <UpscaleModels
        service={upscaleService}
        models={validModels}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
      <UpscaleGallery />
      <UpscaleFAQ />
      <CTA />
    </main>
  );
};

export default UpscalePage;
