import { describe, it, expect } from 'vitest';
import { hasFeaturedEntries, isSampleEntry, orderCategories, sortFeaturedFirst } from './featuredCatalogue';
import type { CatalogueEntry } from '../types/catalogue';

const entry = (id: string, category: string): CatalogueEntry => ({
  id,
  name: id,
  description: '',
  category,
  tags: [],
  author: 'test',
  source: 'official',
  ontology: { name: id, description: '', entityTypes: [], relationships: [] },
  bindings: [],
});

const entries = [
  entry('official/cosmic-coffee', 'retail'),
  entry('official/komatsu-au-01-customer-sales', 'komatsu'),
  entry('official/finance', 'finance'),
  entry('official/komatsu-au-enterprise', 'komatsu'),
];

describe('featuredCatalogue', () => {
  it('leaves order untouched when no featured category is configured', () => {
    expect(sortFeaturedFirst(entries, '')).toBe(entries);
  });

  it('moves featured entries first, pinned entry at the top, others stable', () => {
    const ids = sortFeaturedFirst(entries, 'komatsu', 'official/komatsu-au-enterprise').map((e) => e.id);
    expect(ids).toEqual([
      'official/komatsu-au-enterprise',
      'official/komatsu-au-01-customer-sales',
      'official/cosmic-coffee',
      'official/finance',
    ]);
  });

  it('detects whether featured entries are present', () => {
    expect(hasFeaturedEntries(entries, 'komatsu')).toBe(true);
    expect(hasFeaturedEntries(entries, 'aviation')).toBe(false);
    expect(hasFeaturedEntries(entries, '')).toBe(false);
  });

  it('labels non-featured entries as samples only when featured content exists', () => {
    expect(isSampleEntry(entries[0], 'komatsu', true)).toBe(true);
    expect(isSampleEntry(entries[1], 'komatsu', true)).toBe(false);
    expect(isSampleEntry(entries[0], 'komatsu', false)).toBe(false);
  });

  it('orders categories with the featured one first', () => {
    expect(orderCategories(['retail', 'komatsu', 'finance'], 'komatsu')).toEqual(['komatsu', 'finance', 'retail']);
    expect(orderCategories(['retail', 'finance'], 'komatsu')).toEqual(['finance', 'retail']);
  });
});
