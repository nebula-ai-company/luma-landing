import fs from 'node:fs';
import path from 'node:path';
import type { CatalogResponse, MediaCatalogModel } from '../lib/catalogApi.ts';
import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
  formatPersianDigits,
} from '../lib/catalogApi.ts';

async function runTests() {
  console.log('=== LUMA Image Upscaling Live Catalog Migration Test Suite ===\n');

  // Test 1: Page-level architecture inspection
  console.log('[Test 1] Inspecting pages/UpscalePage.tsx...');
  const upscalePagePath = path.join(process.cwd(), 'pages/UpscalePage.tsx');
  if (!fs.existsSync(upscalePagePath)) {
    throw new Error('pages/UpscalePage.tsx does not exist');
  }
  const upscalePageContent = fs.readFileSync(upscalePagePath, 'utf8');

  // Must call useCatalog once
  const useCatalogMatches = upscalePageContent.match(/useCatalog\(/g) || [];
  if (useCatalogMatches.length !== 1) {
    throw new Error(`pages/UpscalePage.tsx should call useCatalog exactly once, found: ${useCatalogMatches.length}`);
  }

  // Must find upscale_image service
  if (!upscalePageContent.includes("findServiceById(data, 'upscale_image')")) {
    throw new Error("pages/UpscalePage.tsx must look up 'upscale_image' via findServiceById");
  }

  // Must pass service and models down to UpscaleModels
  if (!upscalePageContent.includes('service={upscaleService}') || !upscalePageContent.includes('models={validModels}')) {
    throw new Error('pages/UpscalePage.tsx must pass upscaleService and validModels to UpscaleModels');
  }
  console.log('✓ pages/UpscalePage.tsx calls useCatalog once and passes down resolved service and valid models\n');

  // Test 2: UpscaleModels static audit
  console.log('[Test 2] Auditing components/Services/Upscale/UpscaleModels.tsx for static model leaks...');
  const upscaleModelsPath = path.join(process.cwd(), 'components/Services/Upscale/UpscaleModels.tsx');
  if (!fs.existsSync(upscaleModelsPath)) {
    throw new Error('components/Services/Upscale/UpscaleModels.tsx does not exist');
  }
  const upscaleModelsContent = fs.readFileSync(upscaleModelsPath, 'utf8');

  // Must NOT contain static model arrays
  const bannedStaticTerms = [
    'const MODELS =',
    'const SPECIALIZED_ENGINES =',
    'Topaz Precision',
    'ClarityAI Crystal',
    'Topaz Restore',
    'Topaz Generative',
    'SeedVR2 Upscaler',
    'Nano Banana Pro',
    'Topaz Denoise',
    'Topaz Sharpen',
    'Topaz Creative',
    'Topaz Transparent',
    'Ideogram Upscaler',
    'Recraft Crisp Upscaler',
  ];

  for (const term of bannedStaticTerms) {
    if (upscaleModelsContent.includes(term)) {
      throw new Error(`Forbidden static catalogue term '${term}' found in UpscaleModels.tsx`);
    }
  }

  // Must verify double bezel, formatStartingPrice, capabilities, pricing.description
  if (!upscaleModelsContent.includes('formatStartingPrice')) {
    throw new Error('UpscaleModels.tsx must use formatStartingPrice for starting rates');
  }
  if (!upscaleModelsContent.includes('model.pricing?.description')) {
    throw new Error('UpscaleModels.tsx must render model.pricing.description');
  }
  if (!upscaleModelsContent.includes('rounded-[24px]') || !upscaleModelsContent.includes('rounded-[18px]')) {
    throw new Error('UpscaleModels.tsx must preserve double-bezel hardware styling (outer shell & inner card)');
  }
  console.log('✓ UpscaleModels.tsx is free of static model definitions and renders dynamic double-bezel cards\n');

  // Test 3: UpscaleHero inspection
  console.log('[Test 3] Auditing components/Services/Upscale/UpscaleHero.tsx...');
  const upscaleHeroPath = path.join(process.cwd(), 'components/Services/Upscale/UpscaleHero.tsx');
  const upscaleHeroContent = fs.readFileSync(upscaleHeroPath, 'utf8');
  if (!upscaleHeroContent.includes('UpscaleHeroProps')) {
    throw new Error('UpscaleHero must accept props for dynamic model representation');
  }
  if (!upscaleHeroContent.includes('totalModelCount')) {
    throw new Error('UpscaleHero must accept totalModelCount');
  }
  console.log('✓ UpscaleHero accepts dynamic model count and representative names\n');

  console.log('================================================================');
  console.log('All Image Upscaling Deterministic Tests Passed Successfully!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('\n✗ Test failed:', err);
  process.exit(1);
});
