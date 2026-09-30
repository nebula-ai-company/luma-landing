import fs from 'node:fs';
import path from 'node:path';
import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getModelsForService,
  countModels,
  countUniqueModels,
  isModelLegacy,
  filterLegacyModels,
  formatPersianDigits,
  formatLumValue,
  formatCurrencyLabel,
  formatPriceWithCurrency,
  formatPerTokens,
  isMediaModel,
  isChatModel,
  validateCatalogResponse,
  isCatalogCacheFresh,
  __setCacheFetchedAt,
  CATALOG_CACHE_TTL_MS,
  CATALOG_API_URL,
} from '../lib/catalogApi.ts';
import {
  PRICING_CATEGORIES,
  THEME_CLASSES,
  getThemeClasses,
  slugifyProvider,
} from '../components/Pricing/pricingConfig.ts';

async function runTests() {
  console.log('=== LUMA Model Catalog & Phase 6 Migration Test Suite ===\n');

  // Test 1: Constants
  console.log('[Test 1] Verifying endpoint & cache TTL constants...');
  if (CATALOG_API_URL !== 'https://dash.lumai.ir/api/catalog/models') {
    throw new Error(`Unexpected CATALOG_API_URL: ${CATALOG_API_URL}`);
  }
  if (CATALOG_CACHE_TTL_MS !== 5 * 60 * 1000) {
    throw new Error(`CATALOG_CACHE_TTL_MS must be 300,000 ms (5 minutes), got ${CATALOG_CACHE_TTL_MS}`);
  }
  console.log('✓ Endpoint constant and 5-minute cache TTL verified\n');

  // Test 2: Persian numeral helpers, Decimal support, and Token unit formatter
  console.log('[Test 2] Verifying Persian formatting helpers, decimal support & formatPerTokens...');
  const sampleInt = 1250;
  const sampleDec = 0.5;
  const sampleDec2 = 2.75;
  const persianInt = formatPersianDigits(sampleInt);
  const persianDec = formatPersianDigits(sampleDec);
  const persianDec2 = formatPersianDigits(sampleDec2);
  const lumFormatted = formatLumValue(sampleInt);
  const customCurrencyFormatted = formatPriceWithCurrency(sampleDec, 'USD');

  console.log(`  Int ${sampleInt} -> ${persianInt}`);
  console.log(`  Decimal ${sampleDec} -> ${persianDec}`);
  console.log(`  Decimal ${sampleDec2} -> ${persianDec2}`);
  console.log(`  LUM ${sampleInt} -> ${lumFormatted}`);
  console.log(`  USD ${sampleDec} -> ${customCurrencyFormatted}`);

  if (!lumFormatted.includes('لوم')) {
    throw new Error('formatLumValue must include currency suffix "لوم"');
  }
  if (!customCurrencyFormatted.includes('دلار')) {
    throw new Error('formatPriceWithCurrency must translate USD to "دلار"');
  }
  if (formatCurrencyLabel('LUM') !== 'لوم') {
    throw new Error('formatCurrencyLabel("LUM") must return "لوم"');
  }
  if (formatCurrencyLabel('EUR') !== 'EUR') {
    throw new Error('formatCurrencyLabel unknown currency should preserve code');
  }

  // Token formatting checks
  const formatted1M = formatPerTokens(1000000);
  const formatted1k = formatPerTokens(1000);
  const formattedCustom = formatPerTokens(500000);
  console.log(`  formatPerTokens(1000000) -> "${formatted1M}"`);
  console.log(`  formatPerTokens(1000) -> "${formatted1k}"`);
  console.log(`  formatPerTokens(500000) -> "${formattedCustom}"`);

  if (formatted1M !== '۱ میلیون توکن') {
    throw new Error(`Expected '۱ میلیون توکن', got '${formatted1M}'`);
  }
  if (formatted1k !== '۱ هزار توکن') {
    throw new Error(`Expected '۱ هزار توکن', got '${formatted1k}'`);
  }
  console.log('✓ Persian formatting & token helpers verified\n');

  // Test 3: countUniqueModels deduplication logic
  console.log('[Test 3] Verifying countUniqueModels helper with mock overlapping catalog...');
  const mockOverlappingServices = [
    {
      id: 'service-a',
      name: 'Service A',
      type: 'media' as const,
      models: [
        { id: 'model-1', name: 'Model 1', provider: 'P1', legacy: false },
        { id: 'model-2', name: 'Model 2', provider: 'P1', legacy: false },
        { id: 'model-legacy', name: 'Legacy Model', provider: 'P1', legacy: true },
      ] as any,
    },
    {
      id: 'service-b',
      name: 'Service B',
      type: 'media' as const,
      models: [
        { id: 'model-1', name: 'Model 1 (Same ID)', provider: 'P1', legacy: false },
        { id: 'model-3', name: 'Model 3', provider: 'P2', legacy: false },
      ] as any,
    },
  ];

  const rawCount = mockOverlappingServices.reduce((sum, s) => sum + s.models.length, 0);
  const uniqueCountAll = countUniqueModels(mockOverlappingServices);
  const uniqueCountActiveOnly = countUniqueModels(mockOverlappingServices, { excludeLegacy: true });

  console.log(`  Raw model sum across services: ${rawCount} (contains duplicates)`);
  console.log(`  countUniqueModels(all): ${uniqueCountAll}`);
  console.log(`  countUniqueModels(excludeLegacy): ${uniqueCountActiveOnly}`);

  if (rawCount !== 5) {
    throw new Error(`Expected raw count of 5, got ${rawCount}`);
  }
  if (uniqueCountAll !== 4) {
    throw new Error(`Expected 4 unique models (model-1, model-2, model-3, model-legacy), got ${uniqueCountAll}`);
  }
  if (uniqueCountActiveOnly !== 3) {
    throw new Error(`Expected 3 unique active models, got ${uniqueCountActiveOnly}`);
  }
  if (countUniqueModels(null) !== 0 || countUniqueModels([]) !== 0) {
    throw new Error('countUniqueModels on null/empty should return 0');
  }
  console.log('✓ countUniqueModels accurately deduplicates models across services\n');

  // Test 4: Validation logic
  console.log('[Test 4] Verifying response shape validator...');
  if (validateCatalogResponse(null) !== false) throw new Error('null should fail validation');
  if (validateCatalogResponse({}) !== false) throw new Error('empty object should fail validation');
  if (validateCatalogResponse({ data: {} }) !== false) throw new Error('missing services should fail validation');
  if (validateCatalogResponse({ data: { services: 'not-an-array' } }) !== false) {
    throw new Error('invalid services type should fail validation');
  }
  const validMock = {
    data: {
      services: [
        { id: 'mock', name: 'Mock', type: 'media', models: [] }
      ]
    }
  };
  if (validateCatalogResponse(validMock) !== true) throw new Error('validMock should pass validation');
  console.log('✓ Response validator accurately discriminates shapes\n');

  // Test 5: Live production fetch
  console.log('[Test 5] Fetching catalog from live production endpoint...');
  clearCatalogCache();
  const startTime = Date.now();
  const catalog = await fetchCatalog();
  const duration = Date.now() - startTime;
  console.log(`✓ Production fetch succeeded in ${duration}ms`);

  const services = catalog.data.services;
  console.log(`  Services received: ${services.length}`);
  if (services.length === 0) {
    throw new Error('Production endpoint returned 0 services');
  }

  const totalEntries = countModels(catalog);
  const liveUniqueModels = countUniqueModels(catalog);
  console.log(`  Total service model entries: ${totalEntries}`);
  console.log(`  Unique models across all services: ${liveUniqueModels}`);
  if (liveUniqueModels < 100) {
    throw new Error(`Expected at least 100 unique models, received ${liveUniqueModels}`);
  }
  if (liveUniqueModels >= totalEntries) {
    throw new Error(`Expected unique model count (${liveUniqueModels}) to be less than total model entries (${totalEntries}) due to overlap`);
  }
  console.log('✓ Unique model count verified on live data\n');

  // Test 6: Verify the 3 newly exposed catalog services
  console.log('[Test 6] Verifying the 3 newly exposed services (virtual_try_on, text_to_speech, speech_to_text)...');
  const newServiceIds = ['virtual_try_on', 'text_to_speech', 'speech_to_text'];
  for (const sId of newServiceIds) {
    const s = findServiceById(catalog, sId);
    if (!s) {
      console.warn(`  Warning: Service ${sId} not found in live catalog`);
      continue;
    }
    if (s.type !== 'media') {
      throw new Error(`Service ${sId} expected type 'media', got '${s.type}'`);
    }
    const mediaModels = s.models.filter(isMediaModel);
    console.log(`  Service: ${sId} ("${s.name}") -> ${mediaModels.length} models`);
    if (mediaModels.length === 0) {
      throw new Error(`Service ${sId} has 0 valid media models`);
    }

    for (const m of mediaModels) {
      if (typeof m.pricing?.minimum !== 'number' || !Number.isFinite(m.pricing.minimum)) {
        throw new Error(`Model ${m.id} in ${sId} has invalid pricing.minimum`);
      }
      if (typeof m.pricing?.description !== 'string' || !m.pricing.description.trim()) {
        throw new Error(`Model ${m.id} in ${sId} has invalid pricing.description`);
      }
    }
  }
  console.log('✓ Newly exposed catalog services verified\n');

  // Test 7: Verify centralized PRICING_CATEGORIES configuration
  console.log('[Test 7] Verifying centralized PRICING_CATEGORIES configuration...');
  console.log(`  Configured categories count: ${PRICING_CATEGORIES.length}`);
  if (PRICING_CATEGORIES.length !== 10) {
    throw new Error(`Expected exactly 10 categories in PRICING_CATEGORIES, got ${PRICING_CATEGORIES.length}`);
  }

  const expectedOrder = [
    'image',
    'video',
    'edit',
    'try-on',
    'video-enhancement',
    'upscale',
    'remove',
    'text-to-speech',
    'speech-to-text',
    'chat',
  ];

  for (let i = 0; i < expectedOrder.length; i++) {
    const expectedId = expectedOrder[i];
    const cat = PRICING_CATEGORIES[i];
    if (cat.id !== expectedId) {
      throw new Error(`Category at index ${i} expected id '${expectedId}', got '${cat.id}'`);
    }
    if (!cat.label || !cat.title || !cat.description || !cat.icon || !cat.color) {
      throw new Error(`Category '${cat.id}' is missing required display metadata`);
    }
  }
  console.log(`  Deliberate order verified: ${PRICING_CATEGORIES.map(c => c.label).join(' -> ')}`);
  console.log('✓ Centralized category configuration verified\n');

  // Test 8: Dead pricing architecture audit (Confirmation of deletion)
  console.log('[Test 8] Auditing dead pricing architecture (verifying obsolete files were deleted)...');
  const deletedFiles = [
    'components/Pricing/ServicePricingSection.tsx',
    'components/Pricing/PricingCalculator.tsx',
    'components/Pricing/ChatPricingSection.tsx',
    'components/Pricing/AssistantPricingSection.tsx',
    'components/Pricing/PricingData.ts',
  ];

  for (const relPath of deletedFiles) {
    const fullPath = path.join(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
      throw new Error(`Legacy file ${relPath} still exists! It should have been deleted.`);
    }
  }
  console.log('✓ All 5 obsolete legacy pricing files confirmed deleted\n');

  // Test 9: PricingPage verification (Zero legacy dependencies, uses PRICING_CATEGORIES & countUniqueModels)
  console.log('[Test 9] Verifying PricingPage.tsx has zero static model pricing and uses centralized config...');
  const pricingPageFile = fs.readFileSync(path.join(process.cwd(), 'pages/PricingPage.tsx'), 'utf8');

  // 1. Assert PricingData is NOT imported
  if (pricingPageFile.includes('PricingData')) {
    throw new Error('PricingPage.tsx still references PricingData!');
  }
  if (pricingPageFile.includes('TOTAL_MODEL_COUNT')) {
    throw new Error('PricingPage.tsx still references TOTAL_MODEL_COUNT!');
  }

  // 2. Assert countUniqueModels is used
  if (!pricingPageFile.includes('countUniqueModels')) {
    throw new Error('PricingPage.tsx missing countUniqueModels helper call');
  }

  // 3. Assert PRICING_CATEGORIES is used for nav and sections
  if (!pricingPageFile.includes('PRICING_CATEGORIES')) {
    throw new Error('PricingPage.tsx missing PRICING_CATEGORIES configuration import');
  }

  // 4. Assert Assistant is not present
  if (pricingPageFile.includes('AssistantPricingSection') || pricingPageFile.includes('pricing-assistant')) {
    throw new Error('PricingPage.tsx still contains assistant references!');
  }

  console.log('✓ PricingPage.tsx is fully catalog-backed with zero static pricing dependencies\n');

  // Test 10: In-flight concurrent fetch deduplication
  console.log('[Test 10] Verifying in-flight concurrent fetch deduplication (single network promise)...');
  clearCatalogCache();

  // Trigger concurrent calls: normal, forceRefresh, and multiple retries
  const p1 = fetchCatalog();
  const p2 = fetchCatalog();
  const p3 = fetchCatalog({ forceRefresh: true });
  const p4 = fetchCatalog({ forceRefresh: true });

  if (p1 !== p2) {
    throw new Error('Concurrent normal fetchCatalog calls must share the exact same active promise instance');
  }
  if (p1 !== p3 || p3 !== p4) {
    throw new Error('forceRefresh while a fetch is in flight must share the running request instead of spawning a new one');
  }

  const [res1, res2, res3, res4] = await Promise.all([p1, p2, p3, p4]);
  if (!res1 || !res2 || !res3 || !res4) {
    throw new Error('All concurrent calls must resolve to valid responses');
  }
  if (res1 !== res2 || res2 !== res3) {
    throw new Error('All concurrent calls must return identical response instances');
  }

  // After completion, verify that the promise has cleared and a new forceRefresh initiates a fresh request
  const freshFetchPromise = fetchCatalog({ forceRefresh: true });
  if (freshFetchPromise === p1) {
    throw new Error('Subsequent forceRefresh must not reuse completed old promise');
  }
  await freshFetchPromise;
  console.log('✓ In-flight request deduplication and lifecycle cleanup verified\n');

  // Test 11: Strict Chat model validation
  console.log('[Test 11] Verifying strict isChatModel type guard validation...');
  const validChatModel = {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Flagship multimodal intelligence',
    legacy: false,
    capabilities: { reasoning: true, tools: true, webSearch: true },
    pricing: {
      currency: 'LUM',
      type: 'token',
      perTokens: 1000000,
      input: 5.0,
      output: 15.0,
      cacheRead: 1.25,
      cacheWrite: 2.5,
      tiers: [
        {
          minInputTokens: 128000,
          input: 10.0,
          output: 30.0,
        },
      ],
    },
  };

  if (!isChatModel(validChatModel)) {
    throw new Error('validChatModel should pass isChatModel guard');
  }

  // Negative cases
  if (isChatModel(null)) throw new Error('null must fail isChatModel');
  if (isChatModel({})) throw new Error('empty object must fail isChatModel');
  if (isChatModel({ ...validChatModel, id: '' })) throw new Error('empty id must fail isChatModel');
  if (isChatModel({ ...validChatModel, capabilities: [] })) throw new Error('array capabilities must fail isChatModel');
  if (isChatModel({ ...validChatModel, capabilities: null })) throw new Error('null capabilities must fail isChatModel');
  if (isChatModel({ ...validChatModel, pricing: { ...validChatModel.pricing, perTokens: 0 } })) {
    throw new Error('perTokens <= 0 must fail isChatModel');
  }
  if (isChatModel({ ...validChatModel, pricing: { ...validChatModel.pricing, input: NaN } })) {
    throw new Error('NaN input must fail isChatModel');
  }
  if (isChatModel({ ...validChatModel, pricing: { ...validChatModel.pricing, output: Infinity } })) {
    throw new Error('Infinity output must fail isChatModel');
  }
  if (isChatModel({ ...validChatModel, pricing: { ...validChatModel.pricing, cacheRead: 'invalid' } })) {
    throw new Error('non-number cacheRead must fail isChatModel');
  }
  if (isChatModel({ ...validChatModel, pricing: { ...validChatModel.pricing, tiers: [{ minInputTokens: -1, input: 1, output: 1 }] } })) {
    throw new Error('negative tier minInputTokens must fail isChatModel');
  }
  console.log('✓ isChatModel strict validation verified\n');

  // Test 12: Strict Media model validation
  console.log('[Test 12] Verifying strict isMediaModel type guard validation...');
  const validMediaModel = {
    id: 'flux-pro',
    name: 'FLUX.1 Pro',
    provider: 'Black Forest Labs',
    description: 'Top-tier image generation model',
    legacy: false,
    pricing: {
      currency: 'LUM',
      type: 'per_generation',
      minimum: 2.5,
      description: 'تعرفه بر اساس هر تصویر با ابعاد استاندارد',
    },
    tags: ['photorealism', 'high-res'],
  };

  if (!isMediaModel(validMediaModel)) {
    throw new Error('validMediaModel should pass isMediaModel guard');
  }

  // Negative cases
  if (isMediaModel(null)) throw new Error('null must fail isMediaModel');
  if (isMediaModel({})) throw new Error('empty object must fail isMediaModel');
  if (isMediaModel({ ...validMediaModel, id: '   ' })) throw new Error('whitespace id must fail isMediaModel');
  if (isMediaModel({ ...validMediaModel, legacy: 'not-bool' })) throw new Error('non-boolean legacy must fail isMediaModel');
  if (isMediaModel({ ...validMediaModel, pricing: { ...validMediaModel.pricing, minimum: NaN } })) {
    throw new Error('NaN minimum must fail isMediaModel');
  }
  if (isMediaModel({ ...validMediaModel, pricing: { ...validMediaModel.pricing, description: 123 } })) {
    throw new Error('non-string description must fail isMediaModel');
  }
  console.log('✓ isMediaModel strict validation verified\n');

  // Test 13: Centralized static theme map verification
  console.log('[Test 13] Verifying centralized static THEME_CLASSES map...');
  const expectedThemeKeys = ['text-luma-pink', 'text-luma-purple', 'text-luma-yellow'];
  for (const k of expectedThemeKeys) {
    const t = THEME_CLASSES[k];
    if (!t) throw new Error(`Missing theme config for ${k}`);
    if (!t.text || !t.bg || !t.bgSoft || !t.borderSoft || !t.via || !t.glowBg) {
      throw new Error(`Incomplete theme config for ${k}: ${JSON.stringify(t)}`);
    }
  }

  for (const cat of PRICING_CATEGORIES) {
    const theme = getThemeClasses(cat.color);
    if (!theme || !theme.bg || !theme.borderSoft) {
      throw new Error(`Category '${cat.id}' color '${cat.color}' failed to resolve theme classes`);
    }
  }
  console.log('✓ Static theme map fully populated and resolves for all categories\n');

  // Test 14: Provider tab slugification and ID safety
  console.log('[Test 14] Verifying provider slugification and DOM ID safety...');
  const slug1 = slugifyProvider('OpenAI');
  const slug2 = slugifyProvider('Z.ai');
  const slug3 = slugifyProvider('Moonshot AI');
  const slug4 = slugifyProvider('all');
  const slug5 = slugifyProvider('   Special & Characters @ 123   ');

  if (slug1 !== 'openai') throw new Error(`Expected 'openai', got '${slug1}'`);
  if (slug2 !== 'z-ai') throw new Error(`Expected 'z-ai', got '${slug2}'`);
  if (slug3 !== 'moonshot-ai') throw new Error(`Expected 'moonshot-ai', got '${slug3}'`);
  if (slug4 !== 'all') throw new Error(`Expected 'all', got '${slug4}'`);
  if (slug5.includes(' ') || slug5.includes('&') || slug5.includes('@')) {
    throw new Error(`Slug must not contain special chars: '${slug5}'`);
  }
  console.log('✓ Provider slugification produces safe DOM IDs\n');

  // Test 15: In-page navigation semantics in PricingPage.tsx
  console.log('[Test 15] Verifying semantic in-page navigation in PricingPage.tsx...');
  const pricingPageSource = fs.readFileSync(path.join(process.cwd(), 'pages/PricingPage.tsx'), 'utf8');

  // The sticky nav in PricingPage must NOT use role="tablist" or role="tab"
  const navSectionMatch = pricingPageSource.match(/<nav[^>]*>([\s\S]*?)<\/nav>/);
  if (!navSectionMatch) {
    throw new Error('PricingPage.tsx missing <nav> element');
  }
  const navContent = navSectionMatch[1];
  if (navContent.includes('role="tablist"') || navContent.includes('role="tab"')) {
    throw new Error('Sticky in-page navigation in PricingPage.tsx must not use role="tablist" or role="tab"');
  }
  if (!navContent.includes('<ul') || !navContent.includes('<li')) {
    throw new Error('Sticky in-page navigation in PricingPage.tsx must use semantic <ul> and <li> list elements');
  }
  if (!navContent.includes('aria-current=')) {
    throw new Error('Sticky in-page navigation in PricingPage.tsx must use aria-current for the active item');
  }
  console.log('✓ PricingPage in-page navigation semantics verified\n');

  console.log('====================================================');
  console.log('All Catalog API and Phase 6 Migration tests passed!');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
