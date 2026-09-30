import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
} from '../lib/catalogApi.ts';

async function runLiveTests() {
  console.log('=== LUMA Image Upscaling Live Production Smoke Test ===\n');

  console.log('[Live Smoke] Querying live catalog API for upscale_image service...');
  clearCatalogCache();
  const catalog = await fetchCatalog();
  const upscaleService = findServiceById(catalog, 'upscale_image');
  if (!upscaleService) {
    throw new Error("Service 'upscale_image' not found in live catalog response");
  }

  const validModels = getValidMediaModels(upscaleService);
  if (validModels.length === 0) {
    throw new Error("'upscale_image' has 0 valid models in live catalog");
  }

  console.log(`  Found ${validModels.length} models in live upscale_image service:`);
  for (const m of validModels) {
    if (!m.id || !m.name || !m.provider) {
      throw new Error(`Model missing id, name, or provider: ${JSON.stringify(m)}`);
    }
    const priceStr = formatStartingPrice(m.pricing?.minimum ?? 0, m.pricing?.currency ?? 'LUM');
    console.log(`    - [${m.id}] ${m.name} (${m.provider}) -> ${priceStr} | Legacy: ${m.legacy}`);
  }

  console.log('\n✓ Live upscale_image service models verified\n');

  console.log('================================================================');
  console.log('Image Upscaling Live Smoke Test Passed!');
  console.log('================================================================');
}

runLiveTests().catch((err) => {
  console.error('\n✗ Live smoke test failed:', err);
  process.exit(1);
});
