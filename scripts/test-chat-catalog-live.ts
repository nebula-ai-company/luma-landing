import { fetchCatalog, findServiceById, getValidChatModels } from '../lib/catalogApi.ts';

async function runLiveTest() {
  console.log('=== LUMA Smart Chat Live Catalog Production Test ===\n');

  console.log('Fetching live catalog from https://dash.lumai.ir/api/catalog/models...');
  const res = await fetchCatalog({ forceRefresh: true });
  if (!res || !res.data || !Array.isArray(res.data.services)) {
    throw new Error('Failed to retrieve catalog response from live API');
  }

  const chatService = findServiceById(res, 'chat');
  if (!chatService) {
    throw new Error("Live catalog did not contain 'chat' service");
  }

  console.log(`Found chat service: "${chatService.name}"`);

  const validModels = getValidChatModels(chatService);
  console.log(`Live valid chat models count: ${validModels.length}`);

  if (validModels.length === 0) {
    throw new Error('Expected at least 1 valid chat model in production catalog');
  }

  const providers = Array.from(new Set(validModels.map(m => m.provider)));
  console.log(`Unique live providers (${providers.length}): ${providers.join(', ')}`);

  // Verify first model structure
  const first = validModels[0];
  console.log('\nSample live model:');
  console.log(`- ID: ${first.id}`);
  console.log(`- Name: ${first.name}`);
  console.log(`- Provider: ${first.provider}`);
  console.log(`- Legacy: ${first.legacy}`);
  console.log(`- Capabilities: reasoning=${first.capabilities.reasoning}, tools=${first.capabilities.tools}, webSearch=${first.capabilities.webSearch}`);
  console.log(`- Pricing: input=${first.pricing.input}, output=${first.pricing.output} per ${first.pricing.perTokens} ${first.pricing.currency}`);

  console.log('\n✓ Live production chat catalog verified successfully!');
}

runLiveTest().catch((err) => {
  console.error('\n❌ Live catalog test failed:', err);
  process.exit(1);
});
