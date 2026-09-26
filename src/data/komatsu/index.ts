/**
 * Runtime entry point for the Komatsu Australia enterprise ontology — the
 * default ontology the app opens with. Built directly from the source-of-truth
 * model so no catalogue fetch is needed.
 */
import type { DataBinding, EntityType, Ontology } from '../ontology';
import {
  KOMATSU_ONTOLOGY_DESCRIPTION,
  KOMATSU_ONTOLOGY_NAME,
  komatsuEntities,
  komatsuModules,
  komatsuRelationships,
} from './model';
import type { KomatsuEntityType, KomatsuModule } from './types';

/** Strip model-only layers (alignments, owner, binding…) to the Playground shape. */
function toEntityType({ id, name, description, icon, color, properties }: KomatsuEntityType): EntityType {
  return { id, name, description, icon, color, properties };
}

export const komatsuEnterpriseOntology: Ontology = {
  name: KOMATSU_ONTOLOGY_NAME,
  description: KOMATSU_ONTOLOGY_DESCRIPTION,
  entityTypes: komatsuEntities.map(toEntityType),
  relationships: komatsuRelationships,
};

export const komatsuEnterpriseBindings: DataBinding[] = komatsuEntities
  .filter((e) => e.binding)
  .map((e) => ({
    entityTypeId: e.id,
    source: e.binding!.source,
    table: e.binding!.table,
    columnMappings: e.binding!.columns,
  }));

/** A module as a standalone Playground ontology (its entities plus the relationships between them). */
export function komatsuModuleOntology(m: KomatsuModule): Ontology {
  const ids = new Set(m.entityIds);
  return {
    name: `Komatsu AU · ${m.title}`,
    description: m.description,
    entityTypes: komatsuEntities.filter((e) => ids.has(e.id)).map(toEntityType),
    relationships: komatsuRelationships.filter((r) => ids.has(r.from) && ids.has(r.to)),
  };
}

export { komatsuModules };
