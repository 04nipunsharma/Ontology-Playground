import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { parseRDF } from '../src/lib/rdf/parser';
import { convertToFabricParts } from '../src/lib/fabric';
import { validateOntology } from '../src/store/designerStore';
import { komatsuEntities, komatsuModules, komatsuRelationships } from '../src/data/komatsu/model';
import { buildModuleOntology, enterpriseOntology, validateKomatsuModel } from '../src/data/komatsu/modelUtils';

const ROOT = join(import.meta.dirname, '..');
const CATALOGUE = join(ROOT, 'catalogue', 'official');

function readEntry(slug: string) {
  return parseRDF(readFileSync(join(CATALOGUE, slug, `${slug}.rdf`), 'utf-8'));
}

describe('Komatsu Australia enterprise ontology', () => {
  it('passes model-level validation with no errors', () => {
    const { errors } = validateKomatsuModel();
    expect(errors).toEqual([]);
  });

  it('passes the Playground / Fabric IQ validator', () => {
    expect(validateOntology(enterpriseOntology())).toEqual([]);
  });

  it('generated catalogue files are in sync with the model', () => {
    const out = execSync('npx tsx scripts/generate-komatsu-catalogue.ts --check', {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 60000,
    });
    expect(out).toContain('up to date');
  }, 60000);

  it('round-trips the enterprise RDF back to the source model', () => {
    const { ontology, bindings } = readEntry('komatsu-au-enterprise');

    expect(ontology.entityTypes).toHaveLength(komatsuEntities.length);
    for (const source of komatsuEntities) {
      const parsed = ontology.entityTypes.find((e) => e.id === source.id);
      expect(parsed, source.id).toBeTruthy();
      expect(parsed!.name).toBe(source.name);
      expect(parsed!.description).toBe(source.description);
      expect(parsed!.icon).toBe(source.icon);
      expect(parsed!.color).toBe(source.color);
      expect(parsed!.properties).toEqual(source.properties);
    }

    expect(ontology.relationships).toHaveLength(komatsuRelationships.length);
    for (const source of komatsuRelationships) {
      const parsed = ontology.relationships.find((r) => r.id === source.id);
      expect(parsed, source.id).toEqual(source);
    }

    const bound = komatsuEntities.filter((e) => e.binding);
    expect(bindings).toHaveLength(bound.length);
    for (const e of bound) {
      const b = bindings.find((x) => x.entityTypeId === e.id);
      expect(b, e.id).toBeTruthy();
      expect(b!.table).toBe(e.binding!.table);
      expect(b!.columnMappings).toEqual(e.binding!.columns);
    }
  });

  it('has no self-relationships (Fabric IQ requires source ≠ target)', () => {
    expect(komatsuRelationships.filter((r) => r.from === r.to)).toEqual([]);
  });

  it('converts to a complete Fabric IQ definition', () => {
    const { definition } = convertToFabricParts(enterpriseOntology());
    const entityParts = definition.parts.filter((p) => p.path.startsWith('EntityTypes/'));
    const relParts = definition.parts.filter((p) => p.path.startsWith('RelationshipTypes/'));
    expect(entityParts).toHaveLength(komatsuEntities.length);
    expect(relParts).toHaveLength(komatsuRelationships.length);
  });

  describe.each(komatsuModules.map((m) => [m.slug, m] as const))('module %s', (slug, module) => {
    it('parses and matches its slice of the enterprise model', () => {
      const { ontology } = readEntry(`komatsu-au-${slug}`);
      const slice = buildModuleOntology(module);
      expect(ontology.entityTypes.map((e) => e.id).sort()).toEqual(slice.entities.map((e) => e.id).sort());
      expect(ontology.relationships.map((r) => r.id).sort()).toEqual(slice.relationships.map((r) => r.id).sort());
      expect(validateOntology(ontology)).toEqual([]);
    });
  });
});
