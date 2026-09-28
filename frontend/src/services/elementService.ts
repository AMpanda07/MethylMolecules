import { ElementDetailData } from '../types';
import { normalizeElementDetail, resolveElementId } from '../utils/chemistry';

// In-Memory Runtime Request Cache
const elementDetailCache = new Map<number, ElementDetailData>();
const pendingRequests = new Map<number, Promise<ElementDetailData | null>>();

/**
 * Request-driven Element Detail Service
 * Asynchronously loads, normalizes, and caches element detail records on demand.
 */
export const getElementDetails = async (input: number | string): Promise<ElementDetailData | null> => {
  const resolvedId = resolveElementId(input);
  if (resolvedId === null) return null;

  // 1. Cache hit
  if (elementDetailCache.has(resolvedId)) {
    return elementDetailCache.get(resolvedId)!;
  }

  // 2. In-flight request deduplication
  if (pendingRequests.has(resolvedId)) {
    return pendingRequests.get(resolvedId)!;
  }

  // 3. Request-driven dynamic module load
  const requestPromise = (async () => {
    try {
      const module = await import('../data/elementsDetail.json');
      const detailMap = (module.default || module) as unknown as Record<number, any>;
      const raw = detailMap[resolvedId];

      if (!raw) return null;

      const normalized = normalizeElementDetail(raw);
      elementDetailCache.set(resolvedId, normalized);
      return normalized;
    } catch (err) {
      console.error(`[elementService] Failed to load element detail for ID ${resolvedId}:`, err);
      return null;
    } finally {
      pendingRequests.delete(resolvedId);
    }
  })();

  pendingRequests.set(resolvedId, requestPromise);
  return requestPromise;
};

/**
 * Gets synchronously from cache if already loaded
 */
export const getCachedElementDetails = (input: number | string): ElementDetailData | null => {
  const resolvedId = resolveElementId(input);
  if (resolvedId === null) return null;
  return elementDetailCache.get(resolvedId) || null;
};

/**
 * Intelligent background prefetch for adjacent lightweight/detail data
 */
export const prefetchElementDetails = (input: number | string): void => {
  const resolvedId = resolveElementId(input);
  if (resolvedId === null) return;

  const prevId = resolvedId > 1 ? resolvedId - 1 : null;
  const nextId = resolvedId < 118 ? resolvedId + 1 : null;

  if (prevId && !elementDetailCache.has(prevId) && !pendingRequests.has(prevId)) {
    requestIdleCallback?.(() => { getElementDetails(prevId); });
  }

  if (nextId && !elementDetailCache.has(nextId) && !pendingRequests.has(nextId)) {
    requestIdleCallback?.(() => { getElementDetails(nextId); });
  }
};
