/**
 * Featured-catalogue configuration for forks that focus the Playground on
 * their own ontology (e.g. Komatsu Australia) while keeping the upstream
 * sample ontologies available "to the side".
 *
 *   VITE_FEATURED_CATEGORY      category shown first in the gallery; entries
 *                               from other categories are labelled as samples
 *   VITE_DEFAULT_CATALOGUE_ID   catalogue entry opened on the home route
 *                               instead of the built-in Fourth Coffee sample
 *
 * Both are optional — when unset the gallery and home page behave exactly as
 * upstream.
 */
import type { CatalogueEntry } from '../types/catalogue';

export const FEATURED_CATEGORY: string = import.meta.env.VITE_FEATURED_CATEGORY ?? '';
export const DEFAULT_CATALOGUE_ID: string = import.meta.env.VITE_DEFAULT_CATALOGUE_ID ?? '';

/** True when the featured category is configured and present in the given entries. */
export function hasFeaturedEntries(entries: CatalogueEntry[], featured: string): boolean {
  return featured !== '' && entries.some((e) => e.category === featured);
}

/** True when an entry should be presented as an upstream sample rather than featured content. */
export function isSampleEntry(entry: CatalogueEntry, featured: string, featuredPresent: boolean): boolean {
  return featuredPresent && entry.category !== featured;
}

/**
 * Stable sort that moves featured-category entries to the front. Within the
 * featured group the pinned entry (usually the default catalogue id) comes
 * first; everything else keeps its original order.
 */
export function sortFeaturedFirst(entries: CatalogueEntry[], featured: string, pinnedId = ''): CatalogueEntry[] {
  if (!featured) return entries;
  const rank = (e: CatalogueEntry): number => {
    if (e.category !== featured) return 2;
    return e.id === pinnedId ? 0 : 1;
  };
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => rank(a.entry) - rank(b.entry) || a.index - b.index)
    .map(({ entry }) => entry);
}

/** Category list with the featured category first and the rest alphabetical. */
export function orderCategories(categories: string[], featured: string): string[] {
  const sorted = [...categories].sort();
  if (!featured || !sorted.includes(featured)) return sorted;
  return [featured, ...sorted.filter((c) => c !== featured)];
}
