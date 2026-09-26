/**
 * Helpers shared by the Komatsu catalogue generator and its tests:
 * module slicing, class naming and model-level validation rules that go
 * beyond the Playground's `validateOntology` (Fabric IQ constraints such as
 * "no self-relationships" and binding integrity).
 */
import type { Ontology } from '../ontology';
import { validateOntology, isValidFabricIQName } from '../../store/designerStore';
import {
  KOMATSU_ONTOLOGY_DESCRIPTION,
  KOMATSU_ONTOLOGY_NAME,
  komatsuEntities,
  komatsuModules,
  komatsuRelationships,
} from './model';
import type { KomatsuDomain, KomatsuEntityType, KomatsuModule, KomatsuRelationship } from './types';

export const DOMAIN_LABELS: Record<KomatsuDomain, string> = {
  party: 'Customers, People & Organisation',
  product: 'Product & Equipment Master',
  sales: 'Sales to Cash',
  hensei: 'Hensei & Factory Ordering',
  logistics: 'Import & Logistics',
  pdi: 'Pre-Delivery Inspection',
  parts: 'Parts Supply Chain & Procurement',
  planning: 'Demand & Supply Planning',
  service: 'Service & Technicians',
  contracts: 'Contracts & Warranty',
  reman: 'Remanufacturing (REMAN)',
  support: 'Customer Support & Portal',
  telematics: 'Telematics & Condition Monitoring',
};

/** OWL class local name for an entity (`pdiJob` → `PdiJob`). */
export function entityClassName(e: { id: string }): string {
  return e.id.charAt(0).toUpperCase() + e.id.slice(1);
}

/** Playground-shaped ontology for the full enterprise model. */
export function enterpriseOntology(): Ontology {
  return {
    name: KOMATSU_ONTOLOGY_NAME,
    description: KOMATSU_ONTOLOGY_DESCRIPTION,
    entityTypes: komatsuEntities,
    relationships: komatsuRelationships,
  };
}

/** A module keeps its listed entities plus every relationship between them. */
export function buildModuleOntology(m: KomatsuModule): { entities: KomatsuEntityType[]; relationships: KomatsuRelationship[] } {
  const ids = new Set(m.entityIds);
  return {
    entities: komatsuEntities.filter((e) => ids.has(e.id)),
    relationships: komatsuRelationships.filter((r) => ids.has(r.from) && ids.has(r.to)),
  };
}

export interface ModelProblems {
  errors: string[];
  warnings: string[];
}

const ENTITY_ID_RE = /^[a-z][A-Za-z0-9]*$/;

export function validateKomatsuModel(): ModelProblems {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Playground / Fabric IQ rules (names ≤26 chars, identifiers, shared property types)
  for (const e of validateOntology(enterpriseOntology())) errors.push(e.message);

  const entityIds = new Set<string>();
  for (const e of komatsuEntities) {
    if (!ENTITY_ID_RE.test(e.id)) errors.push(`Entity id "${e.id}" must be lowerCamelCase alphanumeric`);
    entityIds.add(e.id);
    if (e.alignments.length === 0) warnings.push(`${e.name} has no industry-standard alignment`);
    for (const p of e.properties) {
      if (p.type === 'enum' && (!p.values || p.values.length === 0)) errors.push(`${e.name}.${p.name} is an enum with no values`);
      for (const v of p.values ?? []) {
        if (v.includes(',')) errors.push(`${e.name}.${p.name} enum value "${v}" contains a comma`);
      }
    }
    // Binding integrity
    if (e.binding) {
      const propNames = new Set(e.properties.map((p) => p.name));
      for (const prop of Object.keys(e.binding.columns)) {
        if (!propNames.has(prop)) errors.push(`${e.name} binding maps unknown property "${prop}"`);
      }
      const key = e.properties.find((p) => p.isIdentifier);
      if (key && !e.binding.columns[key.name]) errors.push(`${e.name} binding does not map its identifier "${key.name}"`);
    } else {
      warnings.push(`${e.name} has no system binding`);
    }
  }

  // 2. Relationship rules
  const relIds = new Set<string>();
  const relNames = new Set<string>();
  const connected = new Set<string>();
  for (const r of komatsuRelationships) {
    if (r.from === r.to) errors.push(`Relationship "${r.id}" is a self-relationship (${r.from}); Fabric IQ requires source ≠ target`);
    if (entityIds.has(r.id)) errors.push(`Relationship id "${r.id}" collides with an entity id`);
    if (relNames.has(r.name)) errors.push(`Relationship name "${r.name}" is used more than once`);
    relNames.add(r.name);
    relIds.add(r.id);
    if (!isValidFabricIQName(r.name)) errors.push(`Relationship name "${r.name}" is not a valid Fabric IQ name (1–26 chars, alphanumeric, - or _)`);
    connected.add(r.from);
    connected.add(r.to);
  }
  for (const e of komatsuEntities) {
    if (!connected.has(e.id)) errors.push(`${e.name} has no relationships`);
  }

  // 3. Modules
  const moduleSlugs = new Set<string>();
  const inAnyModule = new Set<string>();
  for (const m of komatsuModules) {
    if (moduleSlugs.has(m.slug)) errors.push(`Duplicate module slug "${m.slug}"`);
    moduleSlugs.add(m.slug);
    for (const id of m.entityIds) {
      if (!entityIds.has(id)) errors.push(`Module "${m.slug}" references unknown entity "${id}"`);
      inAnyModule.add(id);
    }
    const slice = buildModuleOntology(m);
    const touched = new Set(slice.relationships.flatMap((r) => [r.from, r.to]));
    for (const e of slice.entities) {
      if (!touched.has(e.id)) warnings.push(`Module "${m.slug}": ${e.name} is disconnected within the module`);
    }
  }
  for (const e of komatsuEntities) {
    if (!inAnyModule.has(e.id)) warnings.push(`${e.name} is not part of any module`);
  }

  return { errors, warnings };
}
