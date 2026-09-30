import fs from 'node:fs';
import path from 'node:path';
import type { CatalogResponse, MediaCatalogModel, CatalogService } from '../lib/catalogApi.ts';
import {
  findServiceById,
  getValidMediaModels,
  getMediaServicePriceInfo,
  formatStartingPrice,
  formatPersianDigits,
  isMediaModel,
} from '../lib/catalogApi.ts';

async function runTests() {
  console.log('=== LUMA Text-to-Speech Live Catalog Migration Test Suite ===\n');

  // Test 1: Page-level architecture inspection
  console.log('[Test 1] Inspecting pages/TextToSpeechPage.tsx...');
  const pagePath = path.join(process.cwd(), 'pages/TextToSpeechPage.tsx');
  if (!fs.existsSync(pagePath)) {
    throw new Error('pages/TextToSpeechPage.tsx does not exist');
  }
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Must call useCatalog once
  const useCatalogMatches = pageContent.match(/useCatalog\(/g) || [];
  if (useCatalogMatches.length !== 1) {
    throw new Error(`pages/TextToSpeechPage.tsx should call useCatalog exactly once, found: ${useCatalogMatches.length}`);
  }

  // Must find text_to_speech service
  if (!pageContent.includes("findServiceById(data, 'text_to_speech')")) {
    throw new Error("pages/TextToSpeechPage.tsx must look up 'text_to_speech' via findServiceById");
  }

  // Must pass service and models down to TTSModels
  if (!pageContent.includes('service={ttsService}') || !pageContent.includes('models={validModels}')) {
    throw new Error('pages/TextToSpeechPage.tsx must pass ttsService and validModels to TTSModels');
  }

  // Must pass dynamic model count and starting price / priceInfo to Hero and FAQ
  if (!pageContent.includes('modelCount={validModels.length}')) {
    throw new Error('pages/TextToSpeechPage.tsx must pass modelCount to Hero');
  }
  if (!pageContent.includes('startingPrice={startingPrice}')) {
    throw new Error('pages/TextToSpeechPage.tsx must pass startingPrice');
  }
  if (!pageContent.includes('priceInfo={priceInfo}')) {
    throw new Error('pages/TextToSpeechPage.tsx must pass priceInfo');
  }
  console.log('✓ pages/TextToSpeechPage.tsx calls useCatalog once and distributes dynamic catalog data\n');

  // Test 2: TTSModels static audit
  console.log('[Test 2] Auditing components/Services/TextToSpeech/TTSModels.tsx for static model leaks...');
  const modelsPath = path.join(process.cwd(), 'components/Services/TextToSpeech/TTSModels.tsx');
  if (!fs.existsSync(modelsPath)) {
    throw new Error('components/Services/TextToSpeech/TTSModels.tsx does not exist');
  }
  const modelsContent = fs.readFileSync(modelsPath, 'utf8');

  // Must NOT contain static model arrays or invented fields
  const bannedStaticTerms = [
    'const MODELS_DATA =',
    'const MODELS =',
    'maxChars:',
    'ratePer4Chars:',
    'supportedLangs:',
    'speedRating',
    'qualityRating',
    '۵۰,۰۰۰ کاراکتر',
    '۱۰,۰۰۰ کاراکتر',
    '۵,۰۰۰ کاراکتر',
    '۱ LUM به ازای ۴ کاراکتر',
    '۲ LUM به ازای ۴ کاراکتر',
    '۳ LUM به ازای ۴ کاراکتر',
    '۴ LUM به ازای ۴ کاراکتر',
  ];

  for (const term of bannedStaticTerms) {
    if (modelsContent.includes(term)) {
      throw new Error(`Forbidden static catalogue term '${term}' found in TTSModels.tsx`);
    }
  }

  // Must verify formatStartingPrice and pricing description
  if (!modelsContent.includes('formatStartingPrice')) {
    throw new Error('TTSModels.tsx must use formatStartingPrice for starting rates');
  }
  if (!modelsContent.includes('model.pricing?.description')) {
    throw new Error('TTSModels.tsx must render model.pricing.description');
  }
  console.log('✓ TTSModels.tsx is free of static model definitions and renders dynamic catalog cards\n');

  // Test 3: TTSPricingLimitations audit
  console.log('[Test 3] Auditing components/Services/TextToSpeech/TTSPricingLimitations.tsx...');
  const pricingPath = path.join(process.cwd(), 'components/Services/TextToSpeech/TTSPricingLimitations.tsx');
  if (!fs.existsSync(pricingPath)) {
    throw new Error('components/Services/TextToSpeech/TTSPricingLimitations.tsx does not exist');
  }
  const pricingContent = fs.readFileSync(pricingPath, 'utf8');

  // Universal / 4 LUM formula must NOT exist
  if (pricingContent.includes('مجموع کاراکترها ÷ ۴ = LUM مصرفی')) {
    throw new Error('TTSPricingLimitations still contains hardcoded universal characters ÷ 4 formula');
  }
  if (pricingContent.includes('Gemini 3.1 Flash TTS') && pricingContent.includes('۱ LUM به ازای ۴ کاراکتر')) {
    throw new Error('TTSPricingLimitations still contains static per-model pricing rows');
  }
  if (pricingContent.includes('بین ۵,۰۰۰ تا ۵۰,۰۰۰ کاراکتر')) {
    throw new Error('TTSPricingLimitations still contains hardcoded static character limits in policy column');
  }
  if (!pricingContent.includes('TTSPricingLimitationsProps')) {
    throw new Error('TTSPricingLimitations must accept dynamic props');
  }
  console.log('✓ TTSPricingLimitations has removed universal formulas and binds to live models\n');

  // Test 4: TTSHero audit
  console.log('[Test 4] Auditing components/Services/TextToSpeech/TTSHero.tsx...');
  const heroPath = path.join(process.cwd(), 'components/Services/TextToSpeech/TTSHero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');

  if (heroContent.includes('۴+')) {
    throw new Error('TTSHero still contains hardcoded 4+ model count');
  }
  if (heroContent.includes('به‌ازای ۴ کاراکتر') || heroContent.includes('به ازای ۴ کاراکتر')) {
    throw new Error('TTSHero still contains hardcoded per-4-character pricing metric');
  }
  if (!heroContent.includes('TTSHeroProps')) {
    throw new Error('TTSHero must export and accept TTSHeroProps');
  }
  console.log('✓ TTSHero dynamically renders model count and pricing without fake universal formulas\n');

  // Test 5: TTSFAQ audit
  console.log('[Test 5] Auditing components/Services/TextToSpeech/TTSFAQ.tsx...');
  const faqPath = path.join(process.cwd(), 'components/Services/TextToSpeech/TTSFAQ.tsx');
  const faqContent = fs.readFileSync(faqPath, 'utf8');

  if (faqContent.includes('بین ۱ تا ۴ LUM به ازای هر ۴ کاراکتر')) {
    throw new Error('TTSFAQ still contains obsolete per-4-character pricing answer');
  }
  if (faqContent.includes('مدل Gemini 3.1 Flash تا ۵۰,۰۰۰ کاراکتر')) {
    throw new Error('TTSFAQ still contains hardcoded per-model character limit answers');
  }
  console.log('✓ TTSFAQ copy is grounded and free of unsupported model-specific formulas\n');

  // Test 6: Deterministic mock catalog testing
  console.log('[Test 6] Verifying deterministic mock service parsing and price calculation...');
  const mockCatalog: CatalogResponse = {
    data: {
      services: [
        {
          id: 'text_to_speech',
          name: 'متن به گفتار',
          type: 'media',
          models: [
            {
              id: 'tts-1',
              name: 'Alpha TTS',
              provider: 'Provider Alpha',
              description: 'Fast speech synthesis',
              legacy: false,
              recommended: true,
              capabilities: ['چندزبانه', 'طبیعی'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 2.5,
                description: '۲۲۵ لوم به ازای هر ۱۰۰۰ کاراکتر',
              },
            },
            {
              id: 'tts-2',
              name: 'Beta Studio Voice',
              provider: 'Provider Beta',
              description: 'Studio quality emotional voice',
              legacy: false,
              featured: true,
              capabilities: ['کیفیت استودیو'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 1,
                description: '۱۵۰ لوم به ازای هر ۱۰۰۰ کاراکتر',
              },
            },
            {
              id: 'tts-legacy',
              name: 'Legacy Voice Engine',
              provider: 'Provider Gamma',
              description: 'Old TTS model',
              legacy: true,
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 5,
                description: '۹۰ لوم به ازای هر ۱۰۰۰ کاراکتر',
              },
            },
            // Malformed entry that must be filtered out
            {
              id: 'tts-invalid',
              name: 'Malformed Model',
              // missing provider/description
            } as any,
          ],
        },
      ],
    },
  };

  const service = findServiceById(mockCatalog, 'text_to_speech');
  if (!service) throw new Error('Service text_to_speech not found in mock catalog');

  const validModels = getValidMediaModels(service);
  if (validModels.length !== 3) {
    throw new Error(`Expected 3 valid media models (excluding malformed), got: ${validModels.length}`);
  }

  // Preserved backend ordering check
  if (validModels[0].id !== 'tts-1' || validModels[1].id !== 'tts-2' || validModels[2].id !== 'tts-legacy') {
    throw new Error('Backend ordering of models was not preserved');
  }

  // Legacy model retained
  const legacyModel = validModels.find(m => m.legacy);
  if (!legacyModel) {
    throw new Error('Legacy model should be retained');
  }

  // Price calculation
  const priceInfo = getMediaServicePriceInfo(validModels);
  if (!priceInfo) {
    throw new Error('priceInfo should be computed for valid models');
  }
  if (priceInfo.minimum !== 1) {
    throw new Error(`Expected minimum price to be 1, got ${priceInfo.minimum}`);
  }
  if (priceInfo.hasMixedCurrencies) {
    throw new Error('Expected common currency LUM, but got mixed currencies');
  }

  // Decimal price formatting
  const formattedDecimal = formatStartingPrice(2.5, 'LUM');
  if (!formattedDecimal.includes('۲٫۵') || !formattedDecimal.includes('لوم')) {
    throw new Error(`Unexpected formattedDecimal: ${formattedDecimal}`);
  }

  // Pricing description preserved exactly
  if (validModels[0].pricing?.description !== '۲۲۵ لوم به ازای هر ۱۰۰۰ کاراکتر') {
    throw new Error('pricing.description must be retained exactly');
  }

  // Mixed currencies test
  const mixedService: CatalogService = {
    id: 'text_to_speech',
    name: 'متن به گفتار',
    type: 'media',
    models: [
      {
        id: 'm1',
        name: 'Model 1',
        provider: 'P1',
        description: 'D1',
        legacy: false,
        pricing: { currency: 'LUM', type: 'starting_at', minimum: 1, description: '۱ لوم' },
      },
      {
        id: 'm2',
        name: 'Model 2',
        provider: 'P2',
        description: 'D2',
        legacy: false,
        pricing: { currency: 'USD', type: 'starting_at', minimum: 0.05, description: '$0.05' },
      },
    ],
  };
  const mixedModels = getValidMediaModels(mixedService);
  const mixedPriceInfo = getMediaServicePriceInfo(mixedModels);
  if (!mixedPriceInfo?.hasMixedCurrencies) {
    throw new Error('Expected hasMixedCurrencies to be true for mixed currencies');
  }

  // Missing service test
  const emptyCatalog: CatalogResponse = { data: { services: [] } };
  const missingService = findServiceById(emptyCatalog, 'text_to_speech');
  const missingModels = getValidMediaModels(missingService);
  if (missingModels.length !== 0) {
    throw new Error('Missing service should yield empty validModels array');
  }

  console.log('✓ Deterministic mock tests passed with decimal, ordering, mixed currency, and legacy coverage\n');

  console.log('================================================================');
  console.log('All Text-to-Speech Deterministic Tests Passed Successfully!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('\n✗ Text-to-Speech deterministic test failed:', err);
  process.exit(1);
});
