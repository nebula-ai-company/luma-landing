import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
} from '../lib/catalogApi.ts';

async function runLiveTests() {
  console.log('=== LUMA Virtual Try-On Live Production Smoke Test ===\n');

  console.log('[Live Smoke] Querying live catalog API for virtual_try_on service...');
  clearCatalogCache();
  const catalog = await fetchCatalog();
  const vtonService = findServiceById(catalog, 'virtual_try_on');
  if (!vtonService) {
    throw new Error("Service 'virtual_try_on' not found in live catalog response");
  }

  const validModels = getValidMediaModels(vtonService);
  if (validModels.length === 0) {
    throw new Error("'virtual_try_on' has 0 valid models in live catalog");
  }

  console.log(`  Found ${validModels.length} models in live virtual_try_on service:`);
  for (const m of validModels.slice(0, 8)) {
    if (!m.id || !m.name || !m.provider) {
      throw new Error(`Model missing id, name, or provider: ${JSON.stringify(m)}`);
    }
    const priceStr = formatStartingPrice(m.pricing?.minimum ?? 0, m.pricing?.currency ?? 'LUM');
    console.log(`    - [${m.id}] ${m.name} (${m.provider}) -> ${priceStr} | Legacy: ${m.legacy} | Rate: ${m.pricing?.description}`);
  }
  if (validModels.length > 8) {
    console.log(`    ... and ${validModels.length - 8} more models.`);
  }

  console.log('\n✓ Live virtual_try_on service models verified\n');

  console.log('================================================================');
  console.log('Virtual Try-On Live Smoke Test Passed!');
  console.log('================================================================');
}

runLiveTests().catch((err) => {
  console.error('\n✗ Virtual Try-On live smoke test failed:', err);
  process.exit(1);
});
