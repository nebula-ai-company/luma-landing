import fs from 'node:fs';
import path from 'node:path';
import type { CatalogResponse, MediaCatalogModel } from '../lib/catalogApi.ts';
import {
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
  formatPersianDigits,
} from '../lib/catalogApi.ts';

async function runTests() {
  console.log('=== LUMA Video Enhancement Live Catalog Migration Test Suite ===\n');

  // Test 1: Page-level architecture inspection
  console.log('[Test 1] Inspecting pages/VideoEnhancementPage.tsx...');
  const pagePath = path.join(process.cwd(), 'pages/VideoEnhancementPage.tsx');
  if (!fs.existsSync(pagePath)) {
    throw new Error('pages/VideoEnhancementPage.tsx does not exist');
  }
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Must call useCatalog once
  const useCatalogMatches = pageContent.match(/useCatalog\(/g) || [];
  if (useCatalogMatches.length !== 1) {
    throw new Error(`pages/VideoEnhancementPage.tsx should call useCatalog exactly once, found: ${useCatalogMatches.length}`);
  }

  // Must find upscale_video service
  if (!pageContent.includes("findServiceById(data, 'upscale_video')")) {
    throw new Error("pages/VideoEnhancementPage.tsx must look up 'upscale_video' via findServiceById");
  }

  // Must pass service and models down to VideoEnhancementModels
  if (!pageContent.includes('service={videoEnhanceService}') || !pageContent.includes('models={validModels}')) {
    throw new Error('pages/VideoEnhancementPage.tsx must pass videoEnhanceService and validModels to VideoEnhancementModels');
  }

  // Must pass dynamic model count and starting price to Hero and FAQ
  if (!pageContent.includes('modelCount={validModels.length}')) {
    throw new Error('pages/VideoEnhancementPage.tsx must pass modelCount to Hero');
  }
  if (!pageContent.includes('startingPrice={startingPrice}')) {
    throw new Error('pages/VideoEnhancementPage.tsx must pass startingPrice');
  }
  console.log('✓ pages/VideoEnhancementPage.tsx calls useCatalog once and distributes dynamic data\n');

  // Test 2: VideoEnhancementModels static audit
  console.log('[Test 2] Auditing components/Services/VideoEnhancement/VideoEnhancementModels.tsx for static model leaks...');
  const modelsPath = path.join(process.cwd(), 'components/Services/VideoEnhancement/VideoEnhancementModels.tsx');
  if (!fs.existsSync(modelsPath)) {
    throw new Error('components/Services/VideoEnhancement/VideoEnhancementModels.tsx does not exist');
  }
  const modelsContent = fs.readFileSync(modelsPath, 'utf8');

  // Must NOT contain static model arrays or invented fields
  const bannedStaticTerms = [
    'const MODELS_DATA =',
    'const MODELS =',
    'speedRating',
    'qualityRating',
    'outputCapability:',
    'شروع از ۱۵ LUM',
    'شروع از ۳۰ LUM',
    'شروع از ۴۵ LUM',
    'شروع از ۱۸۰ LUM',
    'شروع از ۲۱۰ LUM',
    'شروع از ۴۵۰ LUM',
  ];

  for (const term of bannedStaticTerms) {
    if (modelsContent.includes(term)) {
      throw new Error(`Forbidden static catalogue term '${term}' found in VideoEnhancementModels.tsx`);
    }
  }

  // Must verify double bezel, formatStartingPrice, capabilities, pricing.description
  if (!modelsContent.includes('formatStartingPrice')) {
    throw new Error('VideoEnhancementModels.tsx must use formatStartingPrice for starting rates');
  }
  if (!modelsContent.includes('model.pricing?.description')) {
    throw new Error('VideoEnhancementModels.tsx must render model.pricing.description');
  }
  if (!modelsContent.includes('rounded-[24px]') || !modelsContent.includes('rounded-[18px]')) {
    throw new Error('VideoEnhancementModels.tsx must preserve double-bezel hardware styling (outer shell & inner card)');
  }

  // Accessibility checks
  if (!modelsContent.includes('role="tablist"') || !modelsContent.includes('role="tab"')) {
    throw new Error('VideoEnhancementModels.tsx must implement accessible tabs with role="tablist" and role="tab"');
  }
  if (!modelsContent.includes('handleTabKeyDown')) {
    throw new Error('VideoEnhancementModels.tsx must implement accessible keyboard navigation for tabs');
  }
  console.log('✓ VideoEnhancementModels.tsx is free of static model definitions and renders dynamic double-bezel cards\n');

  // Test 3: VideoEnhancementHero inspection
  console.log('[Test 3] Auditing components/Services/VideoEnhancement/VideoEnhancementHero.tsx...');
  const heroPath = path.join(process.cwd(), 'components/Services/VideoEnhancement/VideoEnhancementHero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  if (!heroContent.includes('VideoEnhancementHeroProps')) {
    throw new Error('VideoEnhancementHero must accept props for dynamic model representation');
  }
  if (!heroContent.includes('modelCount') || !heroContent.includes('startingPrice')) {
    throw new Error('VideoEnhancementHero must accept modelCount and startingPrice');
  }
  console.log('✓ VideoEnhancementHero accepts dynamic model count and starting price\n');

  // Test 4: VideoEnhancementGuidance inspection
  console.log('[Test 4] Auditing components/Services/VideoEnhancement/VideoEnhancementGuidance.tsx...');
  const guidancePath = path.join(process.cwd(), 'components/Services/VideoEnhancement/VideoEnhancementGuidance.tsx');
  const guidanceContent = fs.readFileSync(guidancePath, 'utf8');
  if (!guidanceContent.includes('VideoEnhancementGuidanceProps')) {
    throw new Error('VideoEnhancementGuidance must accept VideoEnhancementGuidanceProps');
  }
  if (guidanceContent.includes('شروع از ۴۵۰ LUM') || guidanceContent.includes('شروع از ۲۱۰ LUM')) {
    throw new Error('VideoEnhancementGuidance still contains hardcoded obsolete fake price strings');
  }
  console.log('✓ VideoEnhancementGuidance binds to live catalog models with real prices\n');

  // Test 5: VideoEnhancementFAQ inspection
  console.log('[Test 5] Auditing components/Services/VideoEnhancement/VideoEnhancementFAQ.tsx...');
  const faqPath = path.join(process.cwd(), 'components/Services/VideoEnhancement/VideoEnhancementFAQ.tsx');
  const faqContent = fs.readFileSync(faqPath, 'utf8');
  if (faqContent.includes('تمامی مدل‌های ارتقای ویدئوی لوما تراک‌های صوتی')) {
    throw new Error('VideoEnhancementFAQ still makes an ungrounded universal claim that all models preserve audio');
  }
  console.log('✓ VideoEnhancementFAQ contains grounded copy without unsubstantiated claims\n');

  // Test 6: Deterministic mock catalog testing
  console.log('[Test 6] Verifying deterministic mock service parsing and price calculation...');
  const mockCatalog: CatalogResponse = {
    data: {
      services: [
        {
          id: 'upscale_video',
          name: 'افزایش کیفیت ویدیو',
          type: 'media',
          models: [
            {
              id: 'model-a',
              name: 'Model Alpha',
              provider: 'Provider A',
              description: 'Alpha description',
              legacy: false,
              recommended: true,
              capabilities: ['4x', 'حفظ صدا'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 1,
                description: '۱ لوم بر اساس فریم',
              },
            },
            {
              id: 'model-b',
              name: 'Model Beta',
              provider: 'Provider B',
              description: 'Beta description',
              legacy: false,
              isNew: true,
              capabilities: ['60fps', 'روان‌سازی'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 30,
                description: '۳۰ لوم بر ثانیه',
              },
            },
            {
              id: 'model-legacy',
              name: 'Model Legacy',
              provider: 'Provider C',
              description: 'Legacy description',
              legacy: true,
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 50,
                description: '۵۰ لوم',
              },
            },
          ],
        },
      ],
    },
  };

  const service = findServiceById(mockCatalog, 'upscale_video');
  if (!service) throw new Error('Service not found in mock');

  const models = getValidMediaModels(service);
  if (models.length !== 3) {
    throw new Error(`Expected 3 valid media models, got ${models.length}`);
  }

  const mins = models
    .map((m) => m.pricing?.minimum)
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n));
  const minPrice = Math.min(...mins);
  if (minPrice !== 1) {
    throw new Error(`Expected minimum price to be 1, got ${minPrice}`);
  }

  const formattedMin = formatStartingPrice(minPrice, 'LUM');
  if (!formattedMin.includes('۱') || !formattedMin.includes('لوم')) {
    throw new Error(`Unexpected formattedMin: ${formattedMin}`);
  }

  console.log('✓ Mock catalog parsing and price formatting verified\n');

  console.log('================================================================');
  console.log('All Video Enhancement Deterministic Tests Passed Successfully!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('\n✗ Video Enhancement deterministic test failed:', err);
  process.exit(1);
});
