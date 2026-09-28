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
 */
export function isMediaModel(model: CatalogModel): model is MediaCatalogModel {
  return (
    typeof model === 'object' &&
    model !== null &&
    'pricing' in model &&
    typeof (model as MediaCatalogModel).pricing?.minimum === 'number'
  );
}

/**
 * Type guard for ChatCatalogModel.
 */
export function isChatModel(model: CatalogModel): model is ChatCatalogModel {
  return (
    typeof model === 'object' &&
    model !== null &&
    'capabilities' in model &&
    typeof (model as ChatCatalogModel).capabilities === 'object' &&
    !Array.isArray((model as ChatCatalogModel).capabilities)
  );
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
 * - In-flight request deduplication
 * - Strict schema validation
 * - Detailed error handling (failsafe: does not overwrite existing fresh cache on failure)
 */
export async function fetchCatalog(options: FetchCatalogOptions = {}): Promise<CatalogResponse> {
  const { forceRefresh = false, signal } = options;

  if (!forceRefresh && isCatalogCacheFresh() && cachedCatalogResponse) {
    return cachedCatalogResponse;
  }

  if (activeFetchPromise && !forceRefresh) {
    return activeFetchPromise;
  }

  // Set loading state only if we don't already have an active fetch
  hookState.loading = true;
  notifyListeners();

  const promise = (async () => {
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
      activeFetchPromise = null;
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
  if (options?.excludeLegacy) {
    return service.models.filter(m => !m.legacy);
  }
  return service.models;
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
      return total + s.models.filter(m => !m.legacy).length;
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
export function formatPersianDigits(value: number | string): string {
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
      if (options.excludeLegacy && m.legacy) continue;
      if (m.id) {
        uniqueIds.add(m.id);
      }
    }
  }
  return uniqueIds.size;
}
