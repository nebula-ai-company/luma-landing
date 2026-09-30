import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Authoritative endpoint for LUMA's model catalog and pricing.
 */
export const CATALOG_API_URL = 'https://dash.lumai.ir/api/catalog/models';

/**
 * Common properties shared by all catalog models.
 */
export interface CatalogModelBase {
  id: string;
  name: string;
  provider: string;
  description: string;
  legacy: boolean;
  [key: string]: unknown;
}

/**
 * Pricing structure for media models (images, video, audio, TTS, STT, upscale, bg-removal, etc.).
 */
export interface MediaPricing {
  currency: string;
  type: string;
  minimum: number;
  description: string;
  [key: string]: unknown;
}

/**
 * Media model representation.
 */
export interface MediaCatalogModel extends CatalogModelBase {
  featured?: boolean;
  isNew?: boolean;
  recommended?: boolean;
  tags?: string[];
  capabilities?: string[];
  pricing: MediaPricing;
}

/**
 * Capabilities for chat models.
 */
export interface ChatCapabilities {
  reasoning?: boolean;
  tools?: boolean;
  webSearch?: boolean;
  [key: string]: unknown;
}

/**
 * Tiered token pricing for chat models with larger context thresholds.
 */
export interface ChatPricingTier {
  minInputTokens: number;
  input: number;
  output: number;
  cacheRead?: number;
  cacheWrite?: number;
  [key: string]: unknown;
}

/**
 * Pricing structure for chat models (token-based).
 */
export interface ChatPricing {
  currency: string;
  type: string;
  perTokens: number;
  input: number;
  output: number;
  cacheRead?: number;
  cacheWrite?: number;
  tiers?: ChatPricingTier[];
  [key: string]: unknown;
}

/**
 * Chat model representation.
 */
export interface ChatCatalogModel extends CatalogModelBase {
  capabilities: ChatCapabilities;
  pricing: ChatPricing;
}

/**
 * Discriminated/unified CatalogModel type.
 */
export type CatalogModel = MediaCatalogModel | ChatCatalogModel;

/**
 * Service group containing categorized models.
 */
export interface CatalogService {
  id: string;
  name: string;
  type: 'media' | 'chat' | string;
  models: CatalogModel[];
  [key: string]: unknown;
}

/**
 * Full envelope returned by the Catalog API.
 */
export interface CatalogResponse {
  data: {
    services: CatalogService[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Type guard for MediaCatalogModel.
 * Strictly validates common fields and required media pricing attributes.
 */
export function isMediaModel(model: unknown): model is MediaCatalogModel {
  if (typeof model !== 'object' || model === null) return false;
  const m = model as Record<string, unknown>;

  // Common model fields
  if (typeof m.id !== 'string' || !m.id.trim()) return false;
  if (typeof m.name !== 'string') return false;
  if (typeof m.provider !== 'string') return false;
  if (typeof m.description !== 'string') return false;
  if (typeof m.legacy !== 'boolean') return false;

  // Pricing: non-null, non-array object
  if (typeof m.pricing !== 'object' || m.pricing === null || Array.isArray(m.pricing)) {
    return false;
  }
  const p = m.pricing as Record<string, unknown>;

  if (typeof p.currency !== 'string') return false;
  if (typeof p.type !== 'string') return false;
  if (typeof p.minimum !== 'number' || !Number.isFinite(p.minimum)) return false;
  if (typeof p.description !== 'string') return false;

  // Optional tags/capabilities validation if present
  if ('tags' in m && m.tags !== undefined) {
    if (!Array.isArray(m.tags) || !m.tags.every(t => typeof t === 'string')) return false;
  }
  if ('capabilities' in m && m.capabilities !== undefined) {
    if (!Array.isArray(m.capabilities) || !m.capabilities.every(c => typeof c === 'string')) return false;
  }

  return true;
}

/**
 * Type guard for ChatCatalogModel.
 * Strictly validates common fields, capability object, token pricing, and optional tiers.
 */
export function isChatModel(model: unknown): model is ChatCatalogModel {
  if (typeof model !== 'object' || model === null) return false;
  const m = model as Record<string, unknown>;

  // Common model fields
  if (typeof m.id !== 'string' || !m.id.trim()) return false;
  if (typeof m.name !== 'string') return false;
  if (typeof m.provider !== 'string') return false;
  if (typeof m.description !== 'string') return false;
  if (typeof m.legacy !== 'boolean') return false;

  // Capabilities: non-null, non-array object
  if (typeof m.capabilities !== 'object' || m.capabilities === null || Array.isArray(m.capabilities)) {
    return false;
  }

  // Pricing: non-null, non-array object
  if (typeof m.pricing !== 'object' || m.pricing === null || Array.isArray(m.pricing)) {
    return false;
  }
  const p = m.pricing as Record<string, unknown>;

  if (typeof p.currency !== 'string') return false;
  if (typeof p.type !== 'string') return false;
  if (typeof p.perTokens !== 'number' || !Number.isFinite(p.perTokens) || p.perTokens <= 0) {
    return false;
  }
  if (typeof p.input !== 'number' || !Number.isFinite(p.input)) return false;
  if (typeof p.output !== 'number' || !Number.isFinite(p.output)) return false;

  // Optional cacheRead & cacheWrite
  if ('cacheRead' in p && p.cacheRead !== undefined) {
    if (typeof p.cacheRead !== 'number' || !Number.isFinite(p.cacheRead)) return false;
  }
  if ('cacheWrite' in p && p.cacheWrite !== undefined) {
    if (typeof p.cacheWrite !== 'number' || !Number.isFinite(p.cacheWrite)) return false;
  }

  // Optional tiers
  if ('tiers' in p && p.tiers !== undefined) {
    if (!Array.isArray(p.tiers)) return false;
    for (const t of p.tiers) {
      if (typeof t !== 'object' || t === null || Array.isArray(t)) return false;
      const tier = t as Record<string, unknown>;
      if (typeof tier.minInputTokens !== 'number' || !Number.isFinite(tier.minInputTokens) || tier.minInputTokens < 0) {
        return false;
      }
      if (typeof tier.input !== 'number' || !Number.isFinite(tier.input)) return false;
      if (typeof tier.output !== 'number' || !Number.isFinite(tier.output)) return false;
      if ('cacheRead' in tier && tier.cacheRead !== undefined) {
        if (typeof tier.cacheRead !== 'number' || !Number.isFinite(tier.cacheRead)) return false;
      }
      if ('cacheWrite' in tier && tier.cacheWrite !== undefined) {
        if (typeof tier.cacheWrite !== 'number' || !Number.isFinite(tier.cacheWrite)) return false;
      }
    }
  }

  return true;
}

/**
 * Validate that an unknown payload matches the required CatalogResponse structure.
 */
export function validateCatalogResponse(payload: unknown): payload is CatalogResponse {
  if (typeof payload !== 'object' || payload === null) return false;
  const candidate = payload as Record<string, unknown>;
  if (typeof candidate.data !== 'object' || candidate.data === null) return false;
  const innerData = candidate.data as Record<string, unknown>;
  if (!Array.isArray(innerData.services)) return false;

  for (const s of innerData.services) {
    if (typeof s !== 'object' || s === null) return false;
    const sObj = s as Record<string, unknown>;
    if (
      typeof sObj.id !== 'string' ||
      !sObj.id.trim() ||
      typeof sObj.name !== 'string' ||
      typeof sObj.type !== 'string' ||
      !Array.isArray(sObj.models)
    ) {
      return false;
    }
  }

  return true;
}

export interface FetchCatalogOptions {
  forceRefresh?: boolean;
  signal?: AbortSignal;
}

// In-memory cache & deduplication state
export const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes in ms (aligned with API max-age=300)
let cachedCatalogResponse: CatalogResponse | null = null;
let cacheFetchedAt: number | null = null;
let activeFetchPromise: Promise<CatalogResponse> | null = null;

// React subscription manager for hook synchronization
type CatalogListener = () => void;
const listeners = new Set<CatalogListener>();

const hookState = {
  data: cachedCatalogResponse,
  loading: false,
  error: null as Error | null,
};

function notifyListeners(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch (err) {
      console.error('Catalog listener callback failed:', err);
    }
  }
}

/**
 * Checks whether the current in-memory cache is present and within the 5-minute freshness TTL.
 */
export function isCatalogCacheFresh(): boolean {
  if (!cachedCatalogResponse || !cacheFetchedAt) return false;
  return Date.now() - cacheFetchedAt < CATALOG_CACHE_TTL_MS;
}

/**
 * Authoritative fetcher for LUMA catalog data.
 * - Single endpoint
 * - In-memory cache + 5-minute freshness period
 * - In-flight request deduplication:
 *   - At most one network request in flight at any time
 *   - Multiple concurrent calls share the same running promise
 *   - forceRefresh bypasses cached data but does NOT bypass an already-running request
 *   - Only the owning promise clears activeFetchPromise upon completion
 * - Strict schema validation
 * - Detailed error handling (failsafe: does not overwrite existing fresh cache on failure)
 */
export function fetchCatalog(options: FetchCatalogOptions = {}): Promise<CatalogResponse> {
  const { forceRefresh = false, signal } = options;

  // 1. In-flight request deduplication: if a request is already running, join it directly
  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  // 2. If forceRefresh is false, return cached data if fresh
  if (!forceRefresh && isCatalogCacheFresh() && cachedCatalogResponse) {
    return Promise.resolve(cachedCatalogResponse);
  }

  // 3. Initiate single network request and register activeFetchPromise
  hookState.loading = true;
  notifyListeners();

  let promise: Promise<CatalogResponse>;
  promise = (async () => {
    try {
      const response = await fetch(CATALOG_API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`Catalog API request failed with HTTP ${response.status} (${response.statusText || 'Error'})`);
      }

      let json: unknown;
      try {
        json = await response.json();
      } catch (jsonErr) {
        throw new Error(
          `Failed to parse Catalog API JSON response: ${jsonErr instanceof Error ? jsonErr.message : String(jsonErr)}`
        );
      }

      if (!validateCatalogResponse(json)) {
        throw new Error('Invalid Catalog API response structure: missing or corrupted data.services collection');
      }

      cachedCatalogResponse = json;
      cacheFetchedAt = Date.now();
      hookState.data = json;
      hookState.error = null;
      hookState.loading = false;
      notifyListeners();
      return json;
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error(String(err));
      hookState.error = normalizedError;
      hookState.loading = false;
      notifyListeners();
      throw normalizedError;
    } finally {
      // Only the owning promise that registered activeFetchPromise clears it
      if (activeFetchPromise === promise) {
        activeFetchPromise = null;
      }
    }
  })();

  activeFetchPromise = promise;
  return promise;
}

/**
 * Resets the in-memory cache and state. Useful for test isolation or manual reset.
 */
export function clearCatalogCache(): void {
  cachedCatalogResponse = null;
  cacheFetchedAt = null;
  activeFetchPromise = null;
  hookState.data = null;
  hookState.error = null;
  hookState.loading = false;
  notifyListeners();
}

/**
 * Testing helper: sets the cache timestamp to simulate expiration or mock age.
 */
export function __setCacheFetchedAt(timestamp: number | null): void {
  cacheFetchedAt = timestamp;
}

export interface UseCatalogOptions {
  autoFetch?: boolean;
}

export interface UseCatalogResult {
  data: CatalogResponse | null;
  services: CatalogService[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<CatalogResponse | null>;
}

/**
 * Reusable React hook for accessing the model catalog.
 * Shares in-memory state and prevents redundant network requests across multiple components.
 * Automatically triggers background refresh if the cached data is expired when window gains visibility.
 */
export function useCatalog(options: UseCatalogOptions = {}): UseCatalogResult {
  const { autoFetch = true } = options;
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTick(t => t + 1);
    };
    listeners.add(handleUpdate);

    // Initial fetch if cache is empty or expired
    if (autoFetch && (!isCatalogCacheFresh() || !hookState.data) && !activeFetchPromise && !hookState.loading) {
      fetchCatalog().catch(() => {
        // Error is captured in hookState.error and broadcast to subscribers
      });
    }

    // Refresh when tab/window becomes visible again if cache has expired
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && autoFetch && !isCatalogCacheFresh() && !activeFetchPromise) {
        fetchCatalog().catch(() => {
          // Handled gracefully in state
        });
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      listeners.delete(handleUpdate);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [autoFetch]);

  const refetch = useCallback(async (): Promise<CatalogResponse | null> => {
    try {
      return await fetchCatalog({ forceRefresh: true });
    } catch {
      return null;
    }
  }, []);

  const services = hookState.data?.data?.services ?? [];

  return {
    data: hookState.data,
    services,
    loading: hookState.loading,
    error: hookState.error,
    refetch,
  };
}

/**
 * Find a service by its ID.
 */
export function findServiceById(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  serviceId: string
): CatalogService | undefined {
  if (!catalogOrServices) return undefined;
  const services = Array.isArray(catalogOrServices)
    ? catalogOrServices
    : catalogOrServices.data?.services;
  if (!Array.isArray(services)) return undefined;
  return services.find(s => s.id === serviceId);
}

/**
 * Retrieve models for a given service ID, optionally filtering out legacy models.
 */
export function getModelsForService(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  serviceId: string,
  options?: { excludeLegacy?: boolean }
): CatalogModel[] {
  const service = findServiceById(catalogOrServices, serviceId);
  if (!service || !Array.isArray(service.models)) return [];
  const validModels = service.models.filter(m => isMediaModel(m) || isChatModel(m));
  if (options?.excludeLegacy) {
    return validModels.filter(m => !m.legacy);
  }
  return validModels;
}

/**
 * Count all models across all services, with optional legacy exclusion.
 */
export function countModels(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  options?: { excludeLegacy?: boolean }
): number {
  if (!catalogOrServices) return 0;
  const services = Array.isArray(catalogOrServices)
    ? catalogOrServices
    : catalogOrServices.data?.services;
  if (!Array.isArray(services)) return 0;

  return services.reduce((total, s) => {
    if (!Array.isArray(s.models)) return total;
    if (options?.excludeLegacy) {
      return total + s.models.filter(m => m && !m.legacy).length;
    }
    return total + s.models.length;
  }, 0);
}

/**
 * Determine whether a given model is marked as legacy.
 */
export function isModelLegacy(model: CatalogModel): boolean {
  return Boolean(model.legacy);
}

/**
 * Filter an array of models, optionally removing legacy models.
 */
export function filterLegacyModels<T extends CatalogModel>(
  models: T[],
  excludeLegacy = true
): T[] {
  if (!excludeLegacy) return models;
  return models.filter(m => !m.legacy);
}

/**
 * Format any number into Persian numerals, preserving decimals up to 6 fraction digits.
 */
export function formatPersianDigits(value?: number | string | null): string {
  if (value === undefined || value === null) return '';
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return String(value).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
  }
  return new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 6,
  }).format(num);
}

/**
 * Format currency label based on currency code.
 * Defaults to 'لوم' for 'LUM'.
 */
export function formatCurrencyLabel(currency?: string): string {
  if (!currency || currency.toUpperCase() === 'LUM') {
    return 'لوم';
  }
  if (currency.toUpperCase() === 'IRR') return 'ریال';
  if (currency.toUpperCase() === 'IRT') return 'تومان';
  if (currency.toUpperCase() === 'USD') return 'دلار';
  return currency;
}

/**
 * Format a price value using Persian numerals and authoritative currency label.
 */
export function formatPriceWithCurrency(amount: number, currency = 'LUM'): string {
  return `${formatPersianDigits(amount)} ${formatCurrencyLabel(currency)}`;
}

/**
 * Format a LUM currency value using Persian numerals and standard currency suffix.
 */
export function formatLumValue(amount: number): string {
  return formatPriceWithCurrency(amount, 'LUM');
}

/**
 * Format perTokens count cleanly in Persian.
 * Examples:
 * 1000000 -> '۱ میلیون توکن'
 * 1000 -> '۱ هزار توکن'
 */
export function formatPerTokens(tokens?: number): string {
  if (!tokens || !Number.isFinite(tokens) || tokens <= 0) {
    return 'توکن';
  }
  if (tokens === 1000000) {
    return '۱ میلیون توکن';
  }
  if (tokens % 1000000 === 0) {
    return `${formatPersianDigits(tokens / 1000000)} میلیون توکن`;
  }
  if (tokens === 1000) {
    return '۱ هزار توکن';
  }
  if (tokens % 1000 === 0 && tokens < 1000000) {
    return `${formatPersianDigits(tokens / 1000)} هزار توکن`;
  }
  return `${formatPersianDigits(tokens)} توکن`;
}

/**
 * Format starting price label cleanly in Persian.
 * Example: 2, 'LUM' -> 'شروع از ۲ لوم'
 */
export function formatStartingPrice(minimum: number, currency = 'LUM'): string {
  if (!Number.isFinite(minimum) || minimum <= 0) {
    return 'رایگان';
  }
  if (currency === 'LUM') {
    return `شروع از ${formatLumValue(minimum)}`;
  }
  return `شروع از ${formatPriceWithCurrency(minimum, currency)}`;
}

/**
 * Retrieve all strictly valid media models for a service, preserving backend catalog ordering.
 */
export function getValidMediaModels(
  serviceOrCatalog: CatalogService | CatalogResponse | CatalogService[] | null | undefined,
  serviceId?: string,
  options: { excludeLegacy?: boolean } = {}
): MediaCatalogModel[] {
  if (!serviceOrCatalog) return [];

  let service: CatalogService | undefined;
  if ('models' in serviceOrCatalog && Array.isArray((serviceOrCatalog as CatalogService).models)) {
    service = serviceOrCatalog as CatalogService;
  } else if (serviceId) {
    service = findServiceById(serviceOrCatalog as CatalogResponse | CatalogService[], serviceId);
  }

  if (!service || !Array.isArray(service.models)) return [];

  const valid = service.models.filter(isMediaModel);
  if (options.excludeLegacy) {
    return valid.filter(m => !m.legacy);
  }
  return valid;
}

/**
 * Retrieve all strictly valid chat models for the chat service, preserving backend catalog ordering.
 */
export function getValidChatModels(
  serviceOrCatalog: CatalogService | CatalogResponse | CatalogService[] | null | undefined,
  options: { excludeLegacy?: boolean } = {}
): ChatCatalogModel[] {
  if (!serviceOrCatalog) return [];

  let service: CatalogService | undefined;
  if ('models' in serviceOrCatalog && Array.isArray((serviceOrCatalog as CatalogService).models)) {
    service = serviceOrCatalog as CatalogService;
  } else {
    service = findServiceById(serviceOrCatalog as CatalogResponse | CatalogService[], 'chat');
  }

  if (!service || !Array.isArray(service.models)) return [];

  const valid = service.models.filter(isChatModel);
  if (options.excludeLegacy) {
    return valid.filter(m => !m.legacy);
  }
  return valid;
}

/**
 * Deterministically select representative models for hero/showcase copy without hardcoded names:
 * 1. recommended non-legacy
 * 2. featured non-legacy
 * 3. other non-legacy in backend order
 */
export function getRepresentativeMediaModels(
  serviceOrCatalog: CatalogService | CatalogResponse | CatalogService[] | null | undefined,
  serviceId?: string,
  limit = 3
): MediaCatalogModel[] {
  const models = getValidMediaModels(serviceOrCatalog, serviceId, { excludeLegacy: true });
  if (models.length === 0) return [];

  const recommended: MediaCatalogModel[] = [];
  const featured: MediaCatalogModel[] = [];
  const regular: MediaCatalogModel[] = [];

  for (const m of models) {
    if (m.recommended) {
      recommended.push(m);
    } else if (m.featured) {
      featured.push(m);
    } else {
      regular.push(m);
    }
  }

  const selected = [...recommended, ...featured, ...regular];
  return selected.slice(0, limit);
}

export interface MediaServicePriceInfo {
  minimum: number;
  currency: string;
  hasMixedCurrencies: boolean;
}

/**
 * Retrieve the lowest starting price and check currency consistency across valid media models.
 */
export function getMediaServicePriceInfo(
  models: MediaCatalogModel[]
): MediaServicePriceInfo | null {
  if (!models || models.length === 0) return null;
  const priced = models.filter(
    m => typeof m.pricing?.minimum === 'number' && Number.isFinite(m.pricing.minimum) && m.pricing.minimum >= 0
  );
  if (priced.length === 0) return null;

  const currencies = new Set(priced.map(m => (m.pricing?.currency || 'LUM').toUpperCase()));
  const hasMixedCurrencies = currencies.size > 1;

  let min = Infinity;
  let currency = 'LUM';
  for (const m of priced) {
    if (m.pricing!.minimum < min) {
      min = m.pricing!.minimum;
      currency = m.pricing!.currency || 'LUM';
    }
  }

  if (!Number.isFinite(min)) return null;
  return { minimum: min, currency, hasMixedCurrencies };
}

/**
 * Retrieve the lowest starting price among all valid models for a service.
 */
export function getLowestStartingPrice(
  serviceOrCatalog: CatalogService | CatalogResponse | CatalogService[] | null | undefined,
  serviceId?: string
): { minimum: number; currency: string } | null {
  const models = getValidMediaModels(serviceOrCatalog, serviceId);
  if (models.length === 0) return null;

  let min = Infinity;
  let currency = 'LUM';

  for (const m of models) {
    const p = m.pricing?.minimum;
    if (typeof p === 'number' && Number.isFinite(p) && p >= 0 && p < min) {
      min = p;
      currency = m.pricing.currency || 'LUM';
    }
  }

  if (!Number.isFinite(min)) return null;
  return { minimum: min, currency };
}

/**
 * Count active valid media models for a service.
 */
export function getActiveModelCount(
  serviceOrCatalog: CatalogService | CatalogResponse | CatalogService[] | null | undefined,
  serviceId?: string,
  options: { excludeLegacy?: boolean } = {}
): number {
  return getValidMediaModels(serviceOrCatalog, serviceId, options).length;
}

/**
 * Count unique model IDs across all services to prevent double-counting
 * models that are available under multiple services (e.g. video & image).
 */
export function countUniqueModels(
  servicesOrCatalog: CatalogService[] | CatalogResponse | undefined | null,
  options: { excludeLegacy?: boolean } = {}
): number {
  if (!servicesOrCatalog) return 0;
  const services: CatalogService[] = Array.isArray(servicesOrCatalog)
    ? servicesOrCatalog
    : (servicesOrCatalog?.data?.services || []);

  const uniqueIds = new Set<string>();
  for (const s of services) {
    if (!Array.isArray(s.models)) continue;
    for (const m of s.models) {
      if (!m || typeof m !== 'object') continue;
      if (options.excludeLegacy && m.legacy) continue;
      if (typeof m.id === 'string' && m.id.trim()) {
        uniqueIds.add(m.id.trim());
      }
    }
  }
  return uniqueIds.size;
}
