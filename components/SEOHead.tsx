import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PageMetadata,
  seoManager,
  usePageMetadata as useLibPageMetadata,
  getRouteMetadata,
  clearManagedMetadata,
} from '../lib/seo';

/**
 * Declarative component for setting page-specific SEO metadata.
 * Can be placed at the top of any page component.
 * Registers an override with the single deterministic SEO manager,
 * and automatically removes it on unmount, restoring the route fallback.
 */
export const SEOHead: React.FC<PageMetadata> = (props) => {
  const location = useLocation();
  useLibPageMetadata(props, location.pathname);
  return null;
};

/**
 * Top-level route metadata manager connected to the router.
 * Automatically notifies the single deterministic SEO manager of route transitions.
 * Stale tags are cleaned up and fallback metadata is applied deterministically.
 */
export const AppSEOManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    seoManager.setRoute(location.pathname);
  }, [location.pathname]);

  return null;
};

/**
 * Hook for setting page-level metadata overrides.
 */
export function usePageMetadata(metadata?: PageMetadata): void {
  const location = useLocation();
  useLibPageMetadata(metadata, location.pathname);
}

export {
  seoManager,
  useLibPageMetadata,
  getRouteMetadata,
  clearManagedMetadata,
};
export type { PageMetadata } from '../lib/seo';


