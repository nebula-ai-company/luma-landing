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
  console.log('=== LUMA Virtual Try-On Live Catalog Migration Test Suite ===\n');

  // Test 1: Page-level architecture inspection
  console.log('[Test 1] Inspecting pages/VirtualTryOnPage.tsx...');
  const pagePath = path.join(process.cwd(), 'pages/VirtualTryOnPage.tsx');
  if (!fs.existsSync(pagePath)) {
    throw new Error('pages/VirtualTryOnPage.tsx does not exist');
  }
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Must call useCatalog once
  const useCatalogMatches = pageContent.match(/useCatalog\(/g) || [];
  if (useCatalogMatches.length !== 1) {
    throw new Error(`pages/VirtualTryOnPage.tsx should call useCatalog exactly once, found: ${useCatalogMatches.length}`);
  }

  // Must find virtual_try_on service
  if (!pageContent.includes("findServiceById(data, 'virtual_try_on')")) {
    throw new Error("pages/VirtualTryOnPage.tsx must look up 'virtual_try_on' via findServiceById");
  }

  // Must pass service and models down to VtonModels
  if (!pageContent.includes('service={vtonService}') || !pageContent.includes('models={validModels}')) {
    throw new Error('pages/VirtualTryOnPage.tsx must pass vtonService and validModels to VtonModels');
  }

  // Must pass dynamic model count and starting price / priceInfo to Hero and FAQ
  if (!pageContent.includes('modelCount={validModels.length}')) {
    throw new Error('pages/VirtualTryOnPage.tsx must pass modelCount to Hero');
  }
  if (!pageContent.includes('startingPrice={startingPrice}')) {
    throw new Error('pages/VirtualTryOnPage.tsx must pass startingPrice');
  }
  if (!pageContent.includes('priceInfo={priceInfo}')) {
    throw new Error('pages/VirtualTryOnPage.tsx must pass priceInfo');
  }
  console.log('✓ pages/VirtualTryOnPage.tsx calls useCatalog once and distributes dynamic catalog data\n');

  // Test 2: VtonModels static audit
  console.log('[Test 2] Auditing components/Services/VirtualTryOn/VtonModels.tsx for static model leaks...');
  const modelsPath = path.join(process.cwd(), 'components/Services/VirtualTryOn/VtonModels.tsx');
  if (!fs.existsSync(modelsPath)) {
    throw new Error('components/Services/VirtualTryOn/VtonModels.tsx does not exist');
  }
  const modelsContent = fs.readFileSync(modelsPath, 'utf8');

  // Must NOT contain static model arrays or hardcoded model records
  const bannedStaticTerms = [
    'const MODELS =',
    'NANO BANANA PRO',
    'Nano Banana 2 Lite',
    'Seedream 5.0 Pro',
    'FLUX 2 PRO',
    'پیشنهاد لوما ⭐',
    'شروع از ۷۳ لوم',
    'شروع از ۱۱۲ لوم',
    '۷۳ لوم',
    '۱۱۲ لوم',
  ];

  for (const term of bannedStaticTerms) {
    if (modelsContent.includes(term)) {
      throw new Error(`Forbidden static catalogue term '${term}' found in VtonModels.tsx`);
    }
  }

  // Must verify formatStartingPrice and pricing description
  if (!modelsContent.includes('formatStartingPrice')) {
    throw new Error('VtonModels.tsx must use formatStartingPrice for starting rates');
  }
  if (!modelsContent.includes('model.pricing?.description')) {
    throw new Error('VtonModels.tsx must render model.pricing.description');
  }
  if (!modelsContent.includes('searchQuery') || !modelsContent.includes('aria-label=')) {
    throw new Error('VtonModels.tsx must support search with accessible label');
  }
  if (!modelsContent.includes('isExpanded') || !modelsContent.includes('aria-expanded=')) {
    throw new Error('VtonModels.tsx must support progressive reveal with accessible aria-expanded');
  }
  console.log('✓ VtonModels.tsx is free of static model definitions and supports search & progressive reveal\n');

  // Test 3: VtonFAQ audit
  console.log('[Test 3] Auditing components/Services/VirtualTryOn/VtonFAQ.tsx...');
  const faqPath = path.join(process.cwd(), 'components/Services/VirtualTryOn/VtonFAQ.tsx');
  if (!fs.existsSync(faqPath)) {
    throw new Error('components/Services/VirtualTryOn/VtonFAQ.tsx does not exist');
  }
  const faqContent = fs.readFileSync(faqPath, 'utf8');

  if (faqContent.includes('در موتور پیشرفته Nano Banana Pro')) {
    throw new Error('VtonFAQ still contains static Nano Banana Pro customization claim');
  }
  if (faqContent.includes('Ultra HD (4K)')) {
    throw new Error('VtonFAQ still contains universal 4K guarantee');
  }
  if (faqContent.includes('۷۳ لوم') || faqContent.includes('۱۱۲ لوم') || faqContent.includes('73') || faqContent.includes('112')) {
    throw new Error('VtonFAQ still contains hardcoded prices');
  }
  if (!faqContent.includes('VtonFAQProps')) {
    throw new Error('VtonFAQ must accept dynamic props');
  }
  console.log('✓ VtonFAQ copy is grounded and free of unsupported model-specific formulas\n');

  // Test 4: VtonHero & VtonHeroAnim audit
  console.log('[Test 4] Auditing components/Services/VirtualTryOn/VtonHero.tsx and VtonHeroAnim.tsx...');
  const heroPath = path.join(process.cwd(), 'components/Services/VirtualTryOn/VtonHero.tsx');
  const heroAnimPath = path.join(process.cwd(), 'components/Services/VirtualTryOn/VtonHeroAnim.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  const heroAnimContent = fs.readFileSync(heroAnimPath, 'utf8');

  if (heroContent.includes('۵ ثانیه') || heroContent.includes('5 ثانیه')) {
    throw new Error('VtonHero still contains unverified 5-second claim');
  }
  if (heroAnimContent.includes('Nano Banana Pro')) {
    throw new Error('VtonHeroAnim still contains hardcoded Nano Banana Pro');
  }
  if (heroAnimContent.includes('۱۰۰٪ تطابق')) {
    throw new Error('VtonHeroAnim still contains absolute 100% match claim');
  }
  if (!heroContent.includes('https://dash.lumai.ir/service/virtual-try-on')) {
    throw new Error('VtonHero CTA must point to https://dash.lumai.ir/service/virtual-try-on');
  }
  console.log('✓ VtonHero and VtonHeroAnim are grounded with dynamic metrics\n');

  // Test 5: VtonFeatures interaction semantics audit
  console.log('[Test 5] Auditing components/Services/VirtualTryOn/VtonFeatures.tsx...');
  const featuresPath = path.join(process.cwd(), 'components/Services/VirtualTryOn/VtonFeatures.tsx');
  const featuresContent = fs.readFileSync(featuresPath, 'utf8');

  if (!featuresContent.includes('role="tablist"')) {
    throw new Error('VtonFeatures must use role="tablist"');
  }
  if (!featuresContent.includes('role="tab"')) {
    throw new Error('VtonFeatures buttons must use role="tab"');
  }
  if (!featuresContent.includes('role="tabpanel"')) {
    throw new Error('VtonFeatures visual must use role="tabpanel"');
  }
  if (!featuresContent.includes('aria-selected=')) {
    throw new Error('VtonFeatures must indicate aria-selected on tabs');
  }
  if (!featuresContent.includes('aria-controls=')) {
    throw new Error('VtonFeatures must use aria-controls on tabs');
  }
  if (!featuresContent.includes('handleKeyDown')) {
    throw new Error('VtonFeatures must support keyboard navigation');
  }
  console.log('✓ VtonFeatures provides accessible tablist semantics and keyboard interaction\n');

  // Test 6: Deterministic mock catalog testing
  console.log('[Test 6] Verifying deterministic mock service parsing and price calculation...');
  const mockCatalog: CatalogResponse = {
    data: {
      services: [
        {
          id: 'virtual_try_on',
          name: 'پرو مجازی',
          type: 'media',
          models: [
            {
              id: 'vton-1',
              name: 'Model Prime',
              provider: 'Provider Alpha',
              description: 'High fidelity try-on simulation',
              legacy: false,
              recommended: true,
              capabilities: ['رزولوشن بالا', 'چندورودی'],
              tags: ['fashion'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 25.5,
                description: 'قیمت ثابت: ۲۵٫۵ لوم',
              },
            },
            {
              id: 'vton-2',
              name: 'Fast Try-On Engine',
              provider: 'Provider Beta',
              description: 'Fast garment transfer',
              legacy: false,
              featured: true,
              capabilities: ['سریع'],
              tags: ['fast'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 17,
                description: 'قیمت ثابت: ۱۷ لوم',
              },
            },
            {
              id: 'vton-legacy',
              name: 'Legacy VTON Model',
              provider: 'Provider Gamma',
              description: 'Older version',
              legacy: true,
              capabilities: [],
              tags: ['legacy'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 55,
                description: 'قیمت ثابت: ۵۵ لوم',
              },
            },
            // Malformed entry that must be filtered out
            {
              id: 'vton-invalid',
              name: 'Malformed Model',
              // missing provider / description
            } as any,
          ],
        },
      ],
    },
  };

  const service = findServiceById(mockCatalog, 'virtual_try_on');
  if (!service) throw new Error('Service virtual_try_on not found in mock catalog');

  const validModels = getValidMediaModels(service);
  if (validModels.length !== 3) {
    throw new Error(`Expected 3 valid media models (excluding malformed), got: ${validModels.length}`);
  }

  // Preserved backend ordering check
  if (validModels[0].id !== 'vton-1' || validModels[1].id !== 'vton-2' || validModels[2].id !== 'vton-legacy') {
    throw new Error('Backend ordering of models was not preserved');
  }

  // Legacy model retained
  const legacyModel = validModels.find((m) => m.legacy);
  if (!legacyModel) {
    throw new Error('Legacy model should be retained');
  }

  // Price calculation
  const priceInfo = getMediaServicePriceInfo(validModels);
  if (!priceInfo) {
    throw new Error('priceInfo should be computed for valid models');
  }
  if (priceInfo.minimum !== 17) {
    throw new Error(`Expected minimum price to be 17, got ${priceInfo.minimum}`);
  }
  if (priceInfo.hasMixedCurrencies) {
    throw new Error('Expected common currency LUM, but got mixed currencies');
  }

  // Decimal price formatting
  const formattedDecimal = formatStartingPrice(25.5, 'LUM');
  if (!formattedDecimal.includes('۲۵٫۵') || !formattedDecimal.includes('لوم')) {
    throw new Error(`Unexpected formattedDecimal: ${formattedDecimal}`);
  }

  // Search filtering logic test across all models
  const searchFilter = (query: string, modelsList: MediaCatalogModel[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return modelsList;
    return modelsList.filter((m) => {
      const nameMatch = m.name?.toLowerCase().includes(q);
      const providerMatch = m.provider?.toLowerCase().includes(q);
      const descMatch = m.description?.toLowerCase().includes(q);
      const tagsMatch = m.tags?.some((t) => t.toLowerCase().includes(q));
      const capMatch = m.capabilities?.some((c) => c.toLowerCase().includes(q));
      return nameMatch || providerMatch || descMatch || tagsMatch || capMatch;
    });
  };

  const alphaResults = searchFilter('alpha', validModels);
  if (alphaResults.length !== 1 || alphaResults[0].id !== 'vton-1') {
    throw new Error('Search by provider Alpha failed');
  }

  const fastResults = searchFilter('سریع', validModels);
  if (fastResults.length !== 1 || fastResults[0].id !== 'vton-2') {
    throw new Error('Search by capability سریع failed');
  }

  // Missing service test
  const emptyCatalog: CatalogResponse = { data: { services: [] } };
  const missingService = findServiceById(emptyCatalog, 'virtual_try_on');
  const missingModels = getValidMediaModels(missingService);
  if (missingModels.length !== 0) {
    throw new Error('Missing service should yield empty validModels array');
  }

  console.log('✓ Deterministic mock tests passed with decimal, ordering, mixed currency, search, and legacy coverage\n');

  console.log('================================================================');
  console.log('All Virtual Try-On Deterministic Tests Passed Successfully!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('\n✗ Virtual Try-On deterministic test failed:', err);
  process.exit(1);
});
