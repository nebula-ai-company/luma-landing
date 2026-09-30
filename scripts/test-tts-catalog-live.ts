import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
} from '../lib/catalogApi.ts';

async function runLiveTests() {
  console.log('=== LUMA Text-to-Speech Live Production Smoke Test ===\n');

  console.log('[Live Smoke] Querying live catalog API for text_to_speech service...');
  clearCatalogCache();
  const catalog = await fetchCatalog();
  const ttsService = findServiceById(catalog, 'text_to_speech');
  if (!ttsService) {
    throw new Error("Service 'text_to_speech' not found in live catalog response");
  }

  const validModels = getValidMediaModels(ttsService);
  if (validModels.length === 0) {
    throw new Error("'text_to_speech' has 0 valid models in live catalog");
  }

  console.log(`  Found ${validModels.length} models in live text_to_speech service:`);
  for (const m of validModels) {
    if (!m.id || !m.name || !m.provider) {
      throw new Error(`Model missing id, name, or provider: ${JSON.stringify(m)}`);
    }
    const priceStr = formatStartingPrice(m.pricing?.minimum ?? 0, m.pricing?.currency ?? 'LUM');
    console.log(`    - [${m.id}] ${m.name} (${m.provider}) -> ${priceStr} | Legacy: ${m.legacy} | Rate: ${m.pricing?.description}`);
  }

  console.log('\n✓ Live text_to_speech service models verified\n');

  console.log('================================================================');
  console.log('Text-to-Speech Live Smoke Test Passed!');
  console.log('================================================================');
}

runLiveTests().catch((err) => {
  console.error('\n✗ Text-to-Speech live smoke test failed:', err);
  process.exit(1);
});
