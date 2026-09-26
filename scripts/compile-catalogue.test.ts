import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { serializeToRDF } from '../src/lib/rdf/serializer';
import { parseRDF } from '../src/lib/rdf/parser';

const ROOT = join(import.meta.dirname, '..');
const CATALOGUE_JSON = join(ROOT, 'public', 'catalogue.json');

interface CatalogueTestEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  source: 'official' | 'community' | 'external';
  ontology: {
    entityTypes: { name: string; properties: { isIdentifier?: boolean }[] }[];
    relationships: unknown[];
  };
  bindings: unknown[];
}

interface CatalogueTestOutput {
  count: number;
  generatedAt: string;
  entries: CatalogueTestEntry[];
}

function readCatalogue(): CatalogueTestOutput {
  return JSON.parse(readFileSync(CATALOGUE_JSON, 'utf-8')) as CatalogueTestOutput;
}

function findEntry(id: string): CatalogueTestEntry {
  const entry = readCatalogue().entries.find((candidate) => candidate.id === id);
  expect(entry).toBeTruthy();
  return entry as CatalogueTestEntry;
}

describe('catalogue compilation (end-to-end)', () => {
  it('npm run catalogue:build succeeds with the real catalogue', () => {
    const result = execSync('npx tsx scripts/compile-catalogue.ts', {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 30000,
    });
    expect(result).toContain('official/komatsu-au-enterprise');
    expect(result).toContain('official/komatsu-au-03-pdi');

    const output = readCatalogue();
    expect(output.count).toBe(output.entries.length);
    expect(output.entries.length).toBeGreaterThan(0);
    expect(output.generatedAt).toBeTruthy();
  }, 30000);

  it('catalogue.json entries have required fields', () => {
    const output = readCatalogue();
    for (const entry of output.entries) {
      expect(entry.id).toBeTruthy();
      expect(entry.name).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(['official', 'community', 'external']).toContain(entry.source);
      expect(entry.ontology).toBeTruthy();
      expect(entry.ontology.entityTypes.length).toBeGreaterThan(0);
      expect(Array.isArray(entry.bindings)).toBe(true);
      expect(Array.isArray(entry.tags)).toBe(true);
    }
  });

  it('komatsu enterprise entry preserves data bindings', () => {
    const komatsu = findEntry('official/komatsu-au-enterprise');
    expect(komatsu.bindings.length).toBe(komatsu.ontology.entityTypes.length);
  });

  it('all ontologies round-trip through RDF serialization', () => {
    for (const entry of readCatalogue().entries) {
      const rdf = serializeToRDF(entry.ontology, entry.bindings);
      const reparsed = parseRDF(rdf);
      expect(reparsed.ontology.entityTypes.length).toBe(entry.ontology.entityTypes.length);
      expect(reparsed.ontology.relationships.length).toBe(entry.ontology.relationships.length);
    }
  });
});

describe('catalogue metadata validation', () => {
  it('all entries reference valid categories', () => {
    const validCats = ['komatsu', 'retail', 'healthcare', 'finance', 'manufacturing', 'education', 'general', 'food', 'media', 'events', 'technology', 'iq-lab', 'school', 'fibo'];
    for (const entry of readCatalogue().entries) {
      expect(validCats).toContain(entry.category);
    }
  });

  it('all entries have path-based ids', () => {
    for (const entry of readCatalogue().entries) {
      expect(entry.id).toMatch(/^(official|community|external)\//);
      expect(entry.id).not.toContain('\\');
    }
  });

  it('community entries use username and slug path ids', () => {
    for (const entry of readCatalogue().entries.filter((candidate) => candidate.source === 'community')) {
      const parts = entry.id.split('/');
      expect(parts).toHaveLength(3);
      expect(parts[1]).toBeTruthy();
      expect(parts[2]).toBeTruthy();
    }
  });

});
