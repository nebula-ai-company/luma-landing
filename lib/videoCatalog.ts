import type {
  CatalogResponse,
  CatalogService,
  MediaCatalogModel,
} from './catalogApi.ts';
import {
  isMediaModel,
  formatPersianDigits,
  formatLumValue,
  formatPriceWithCurrency,
  findServiceById,
} from './catalogApi.ts';

/**
 * The authoritative service IDs corresponding to Video Generation workflows in LUMA catalog.
 */
export const VIDEO_SERVICE_IDS = [
  'text_to_video',
  'image_to_video',
  'reference_to_video',
] as const;

export type VideoServiceId = (typeof VIDEO_SERVICE_IDS)[number];

export type VideoWorkflowTab =
  | 'all'
  | 'text-to-video'
  | 'image-to-video'
  | 'reference-to-video';

/**
 * Workflow display metadata for badges and UI presentation.
 */
export interface WorkflowMetadata {
  id: VideoServiceId;
  tabKey: VideoWorkflowTab;
  persianTitle: string;
  englishTitle: string;
  badgeLabel: string;
  colorName: 'purple' | 'pink' | 'yellow';
}

export const VIDEO_WORKFLOW_MAP: Record<VideoServiceId, WorkflowMetadata> = {
  text_to_video: {
    id: 'text_to_video',
    tabKey: 'text-to-video',
    persianTitle: 'متن به ویدیو',
    englishTitle: 'Text-to-Video',
    badgeLabel: 'متن به ویدیو',
    colorName: 'purple',
  },
  image_to_video: {
    id: 'image_to_video',
    tabKey: 'image-to-video',
    persianTitle: 'تصویر به ویدیو',
    englishTitle: 'Image-to-Video',
    badgeLabel: 'تصویر به ویدیو',
    colorName: 'pink',
  },
  reference_to_video: {
    id: 'reference_to_video',
    tabKey: 'reference-to-video',
    persianTitle: 'ویدیو با فایل مرجع',
    englishTitle: 'Reference-to-Video',
    badgeLabel: 'مرجع به ویدیو',
    colorName: 'yellow',
  },
};

/**
 * Check if a service ID belongs to the video generation suite.
 */
export function isVideoServiceId(id: string): id is VideoServiceId {
  return (VIDEO_SERVICE_IDS as readonly string[]).includes(id);
}

/**
 * Map a UI tab key to its underlying authoritative catalog service ID.
 */
export function workflowTabToServiceId(tab: VideoWorkflowTab): VideoServiceId | null {
  switch (tab) {
    case 'text-to-video':
      return 'text_to_video';
    case 'image-to-video':
      return 'image_to_video';
    case 'reference-to-video':
      return 'reference_to_video';
    case 'all':
    default:
      return null;
  }
}

/**
 * Map a catalog service ID to its UI tab key.
 */
export function serviceIdToWorkflowTab(serviceId: VideoServiceId): VideoWorkflowTab {
  return VIDEO_WORKFLOW_MAP[serviceId]?.tabKey ?? 'all';
}

/**
 * Extract the 3 video catalog services from a full catalog response or service array.
 */
export function getVideoCatalogServices(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined
): CatalogService[] {
  if (!catalogOrServices) return [];
  const services = Array.isArray(catalogOrServices)
    ? catalogOrServices
    : catalogOrServices.data?.services;

  if (!Array.isArray(services)) return [];

  return services.filter(s => isVideoServiceId(s.id));
}

/**
 * Preservation of authoritative service context:
 * The same model ID across different video services may have different pricing,
 * descriptions, or capabilities. This interface captures that exact context.
 */
export interface VideoModelServiceContext {
  serviceId: VideoServiceId;
  serviceName: string;
  model: MediaCatalogModel;
}

/**
 * Unified display card model used in VideoModels showcase and related components.
 */
export interface VideoDisplayModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  legacy: boolean;
  isNew: boolean;
  featured: boolean;
  recommended: boolean;
  tags: string[];
  capabilities: string[];
  badge?: string;
  badgeWorkflow: string;
  supportedWorkflows: VideoServiceId[];
  startingPrice: number;
  currency: string;
  startingPriceLabel: string;
  startingPriceNote?: string;
  contexts: VideoModelServiceContext[];
  authoritativeModel: MediaCatalogModel;
  serviceId?: VideoServiceId;
}

/**
 * Format a human-readable Persian starting price label.
 */
export function formatVideoStartingPrice(
  minimum: number,
  currency = 'LUM'
): string {
  if (!Number.isFinite(minimum) || minimum <= 0) {
    return 'رایگان';
  }
  if (currency === 'LUM') {
    return `شروع از ${formatLumValue(minimum)}`;
  }
  return `شروع از ${formatPriceWithCurrency(minimum, currency)}`;
}

/**
 * Synthesize a workflow badge for a grouped model based on its supported services.
 */
export function getWorkflowsBadgeLabel(workflows: VideoServiceId[]): string {
  const hasText = workflows.includes('text_to_video');
  const hasImg = workflows.includes('image_to_video');
  const hasRef = workflows.includes('reference_to_video');

  if (hasText && hasImg && hasRef) {
    return 'متن، تصویر و مرجع';
  }
  if (hasText && hasImg) {
    return 'متن و تصویر';
  }
  if (hasText && hasRef) {
    return 'متن و مرجع';
  }
  if (hasImg && hasRef) {
    return 'تصویر و مرجع';
  }
  if (hasRef) {
    return 'مرجع به ویدیو';
  }
  if (hasImg) {
    return 'تصویر به ویدیو';
  }
  if (hasText) {
    return 'متن به ویدیو';
  }
  return 'ویدیو';
}

/**
 * Extract all service contexts for a specific model ID across video services.
 */
export function getVideoModelContexts(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  modelId: string
): VideoModelServiceContext[] {
  const videoServices = getVideoCatalogServices(catalogOrServices);
  const contexts: VideoModelServiceContext[] = [];

  for (const s of videoServices) {
    if (!isVideoServiceId(s.id) || !Array.isArray(s.models)) continue;
    const model = s.models.find(m => m.id === modelId);
    if (model && isMediaModel(model)) {
      contexts.push({
        serviceId: s.id,
        serviceName: s.name,
        model,
      });
    }
  }

  return contexts;
}

export interface GetVideoModelsOptions {
  excludeLegacy?: boolean;
}

/**
 * Group video models across services into unified cards for "همه مدل‌ها".
 * - Deduplicates by model ID
 * - Preserves all underlying service contexts
 * - Lowest finite pricing.minimum is used as starting price (with subtle explanation if prices differ)
 * - Retains genuine catalog facts (tags, capabilities, provider)
 */
export function groupVideoModelsById(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  options: GetVideoModelsOptions = {}
): VideoDisplayModel[] {
  const videoServices = getVideoCatalogServices(catalogOrServices);
  const modelMap = new Map<string, VideoModelServiceContext[]>();

  for (const s of videoServices) {
    if (!isVideoServiceId(s.id) || !Array.isArray(s.models)) continue;
    for (const rawModel of s.models) {
      if (!isMediaModel(rawModel)) continue;
      if (options.excludeLegacy && rawModel.legacy) continue;

      const existing = modelMap.get(rawModel.id) || [];
      existing.push({
        serviceId: s.id,
        serviceName: s.name,
        model: rawModel,
      });
      modelMap.set(rawModel.id, existing);
    }
  }

  const result: VideoDisplayModel[] = [];

  for (const [id, contexts] of modelMap.entries()) {
    if (contexts.length === 0) continue;

    // Pick lowest finite starting price across available contexts
    let minPrice = Infinity;
    let currency = 'LUM';
    let primaryModel = contexts[0].model;
    const prices = new Set<number>();

    for (const ctx of contexts) {
      const price = ctx.model.pricing?.minimum;
      if (typeof price === 'number' && Number.isFinite(price) && price >= 0) {
        prices.add(price);
        if (price < minPrice) {
          minPrice = price;
          currency = ctx.model.pricing.currency || 'LUM';
          primaryModel = ctx.model;
        }
      }
    }

    if (!Number.isFinite(minPrice)) {
      minPrice = 0;
    }

    const supportedWorkflows = contexts.map(c => c.serviceId);
    const badgeWorkflow = getWorkflowsBadgeLabel(supportedWorkflows);

    // Combine capabilities and tags uniquely
    const allCaps = new Set<string>();
    const allTags = new Set<string>();
    let isNew = false;
    let featured = false;
    let recommended = false;
    let legacy = true;

    for (const ctx of contexts) {
      (ctx.model.capabilities || []).forEach(c => allCaps.add(c));
      (ctx.model.tags || []).forEach(t => allTags.add(t));
      if (ctx.model.isNew) isNew = true;
      if (ctx.model.featured) featured = true;
      if (ctx.model.recommended) recommended = true;
      if (!ctx.model.legacy) legacy = false;
    }

    // Determine badge priority: Recommended > New > Featured > first capability
    let badge: string | undefined;
    if (recommended && !legacy) badge = 'پیشنهادی';
    else if (isNew && !legacy) badge = 'جدید';
    else if (featured && !legacy) badge = 'ویژه';
    else if (legacy) badge = 'نسخه قدیمی';

    const startingPriceNote =
      prices.size > 1 ? 'کمترین تعرفه بین حالت‌های موجود' : undefined;

    result.push({
      id,
      name: primaryModel.name,
      provider: primaryModel.provider,
      description: primaryModel.description,
      legacy,
      isNew,
      featured,
      recommended,
      tags: Array.from(allTags),
      capabilities: Array.from(allCaps),
      badge,
      badgeWorkflow,
      supportedWorkflows,
      startingPrice: minPrice,
      currency,
      startingPriceLabel: formatVideoStartingPrice(minPrice, currency),
      startingPriceNote,
      contexts,
      authoritativeModel: primaryModel,
    });
  }

  return result;
}

/**
 * Retrieve models for a specific video workflow using its authoritative service entry.
 */
export function getVideoWorkflowModels(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  serviceId: VideoServiceId,
  options: GetVideoModelsOptions = {}
): VideoDisplayModel[] {
  const service = findServiceById(catalogOrServices, serviceId);
  if (!service || !Array.isArray(service.models)) return [];

  const meta = VIDEO_WORKFLOW_MAP[serviceId];
  const result: VideoDisplayModel[] = [];

  for (const rawModel of service.models) {
    if (!isMediaModel(rawModel)) continue;
    if (options.excludeLegacy && rawModel.legacy) continue;

    const minPrice = rawModel.pricing?.minimum ?? 0;
    const currency = rawModel.pricing?.currency ?? 'LUM';

    let badge: string | undefined;
    if (rawModel.recommended && !rawModel.legacy) badge = 'پیشنهادی';
    else if (rawModel.isNew && !rawModel.legacy) badge = 'جدید';
    else if (rawModel.featured && !rawModel.legacy) badge = 'ویژه';
    else if (rawModel.legacy) badge = 'نسخه قدیمی';

    result.push({
      id: rawModel.id,
      name: rawModel.name,
      provider: rawModel.provider,
      description: rawModel.description,
      legacy: Boolean(rawModel.legacy),
      isNew: Boolean(rawModel.isNew),
      featured: Boolean(rawModel.featured),
      recommended: Boolean(rawModel.recommended),
      tags: rawModel.tags ?? [],
      capabilities: rawModel.capabilities ?? [],
      badge,
      badgeWorkflow: meta.badgeLabel,
      supportedWorkflows: [serviceId],
      startingPrice: minPrice,
      currency,
      startingPriceLabel: formatVideoStartingPrice(minPrice, currency),
      startingPriceNote: undefined,
      contexts: [
        {
          serviceId,
          serviceName: service.name,
          model: rawModel,
        },
      ],
      authoritativeModel: rawModel,
      serviceId,
    });
  }

  return result;
}

/**
 * Unified fetcher/resolver for VideoModels showcase cards depending on active tab.
 */
export function getVideoDisplayModels(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  activeTab: VideoWorkflowTab,
  options: GetVideoModelsOptions = {}
): VideoDisplayModel[] {
  if (activeTab === 'all') {
    return groupVideoModelsById(catalogOrServices, options);
  }

  const serviceId = workflowTabToServiceId(activeTab);
  if (!serviceId) {
    return groupVideoModelsById(catalogOrServices, options);
  }

  return getVideoWorkflowModels(catalogOrServices, serviceId, options);
}

/**
 * Count total unique model IDs across all 3 video services.
 */
export function countUniqueVideoModels(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  options: GetVideoModelsOptions = {}
): number {
  const grouped = groupVideoModelsById(catalogOrServices, options);
  return grouped.length;
}

/**
 * Extract active Reference-to-Video models.
 */
export function getActiveReferenceModels(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  options: GetVideoModelsOptions = { excludeLegacy: true }
): MediaCatalogModel[] {
  const service = findServiceById(catalogOrServices, 'reference_to_video');
  if (!service || !Array.isArray(service.models)) return [];

  const models = service.models.filter(isMediaModel);
  if (options.excludeLegacy) {
    return models.filter(m => !m.legacy);
  }
  return models;
}

/**
 * Extract featured/top video models for showcase mentions.
 */
export function getFeaturedVideoModelNames(
  catalogOrServices: CatalogResponse | CatalogService[] | null | undefined,
  limit = 5
): string[] {
  const grouped = groupVideoModelsById(catalogOrServices, { excludeLegacy: true });
  // Prioritize featured, then new, then non-legacy
  const sorted = [...grouped].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return a.name.localeCompare(b.name);
  });

  return sorted.slice(0, limit).map(m => m.name);
}
