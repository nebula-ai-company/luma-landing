import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  structuredDataManager,
  usePageStructuredData as useLibPageStructuredData,
  getRouteStructuredData,
  buildBlogPostStructuredData,
  buildBlogCollectionStructuredData,
  clearManagedStructuredData,
} from '../lib/structuredData';

export interface StructuredDataProps {
  schema?: Record<string, any> | null;
}

/**
 * Declarative component for setting page-specific structured data (JSON-LD).
 * Registers an override with the single deterministic StructuredDataManager,
 * and automatically cleans it up on unmount.
 */
export const StructuredDataHead: React.FC<StructuredDataProps> = ({ schema }) => {
  const location = useLocation();
  useLibPageStructuredData(schema, location.pathname);
  return null;
};

/**
 * Top-level route structured data manager connected to the router.
 * Automatically notifies the single deterministic StructuredDataManager of route transitions.
 * Stale generated scripts are pruned and approved route fallback schemas are committed.
 */
export const AppStructuredDataManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    structuredDataManager.setRoute(location.pathname);
  }, [location.pathname]);

  return null;
};

/**
 * Hook for setting page-level structured data overrides.
 */
export function usePageStructuredData(schema?: Record<string, any> | null): void {
  const location = useLocation();
  useLibPageStructuredData(schema, location.pathname);
}

export default usePageStructuredData;

export {
  structuredDataManager,
  getRouteStructuredData,
  buildBlogPostStructuredData,
  buildBlogCollectionStructuredData,
  clearManagedStructuredData,
};
