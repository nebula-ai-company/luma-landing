import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PageMetadata,
  usePageMetadata,
  applyPageMetadata,
  getRouteMetadata,
} from '../lib/seo';

/**
 * Declarative component for setting page-specific SEO metadata.
 * Can be placed at the top of any page component.
 */
export const SEOHead: React.FC<PageMetadata> = (props) => {
  usePageMetadata(props);
  return null;
};

/**
 * Top-level route metadata manager connected to the router.
 * Automatically synchronizes the document title and meta tags with the active route
 * based on the centralized route metadata registry in lib/seo.ts.
 * Unconfigured routes safely fallback to DEFAULT_TITLE and stale tags are removed.
 */
export const AppSEOManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const routeMeta = getRouteMetadata(location.pathname);
    applyPageMetadata(routeMeta);
  }, [location.pathname]);

  return null;
};

export { usePageMetadata, applyPageMetadata, getRouteMetadata } from '../lib/seo';
export type { PageMetadata } from '../lib/seo';
