/**
 * Lightweight in-memory cache and request-deduplicator for PocketBase GET requests.
 */

export const PB_BASE_URL = 'https://pb.lumai.ir';

// Standardized thumbnail sizes for PocketBase URL generation
export const HOMEPAGE_THUMB_LARGE = '1000x0';
export const HOMEPAGE_THUMB_MEDIUM = '700x0';

/**
 * Builds a PocketBase file URL, optionally with a thumbnail specification.
 */
export const getFileUrl = (
  collection: string,
  recordId: string,
  filename: string,
  thumb?: string
): string => {
  if (!filename) return '';
  const baseUrl = `${PB_BASE_URL}/api/files/${collection}/${recordId}/${filename}`;
  if (thumb) {
    return `${baseUrl}?thumb=${thumb}`;
  }
  return baseUrl;
};

const requestCache = new Map<string, Promise<any>>();
const responseCache = new Map<string, any>();

export const fetchCachedJson = async (url: string): Promise<any> => {
  if (responseCache.has(url)) {
    return responseCache.get(url);
  }
  if (requestCache.has(url)) {
    return requestCache.get(url);
  }

  const promise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      responseCache.set(url, data);
      return data;
    } catch (err) {
      // Do not leave failed requests in cache so retries can happen
      throw err;
    } finally {
      requestCache.delete(url);
    }
  })();

  requestCache.set(url, promise);
  return promise;
};

