/**
 * Source-of-truth types for the Komatsu Australia enterprise ontology.
 *
 * The model in `model.ts` extends the Playground's `EntityType` /
 * `Relationship` shapes with three extra layers that the Playground UI does
 * not render but that are emitted into the RDF for downstream use (Fabric IQ,
 * data catalogues, governance):
 *
 *   1. Industry alignment  – which published standard term each concept maps to
 *   2. Business ownership  – the process domain and accountable business role
 *   3. System binding      – the system of record (D365 CE / F&O / Annata 365 /
 *                            KOMTRAX / portal) and the physical table + columns
 *
 * `scripts/generate-komatsu-catalogue.ts` turns this model into catalogue
 * entries (RDF + metadata.json) and the generated data dictionary.
 */
import type { EntityType, Relationship } from '../ontology';

/** End-to-end process domains used to group entities into catalogue modules. */
export type KomatsuDomain =
  | 'party'
  | 'product'
  | 'sales'
  | 'hensei'
  | 'logistics'
  | 'pdi'
  | 'parts'
  | 'planning'
  | 'service'
  | 'contracts'
  | 'reman'
  | 'support'
  | 'telematics';

/** How a concept relates to a published standard / vocabulary term. */
export type AlignmentKind = 'exactMatch' | 'closeMatch' | 'broadMatch' | 'related';

export interface StandardAlignment {
  /** Short standard name, e.g. "ISO 6165", "schema.org", "IOF Core". */
  standard: string;
  /** The term within that standard, e.g. "IndividualProduct". */
  term: string;
  /** Resolvable IRI when the standard publishes one. */
  iri?: string;
  kind: AlignmentKind;
}

/** Where the data for an entity type physically lives. */
export type SystemOfRecord =
  | 'D365 CE'
  | 'D365 F&O'
  | 'Annata 365 (F&O)'
  | 'Annata 365 (CE)'
  | 'KOMTRAX'
  | 'Power Pages portal'
  | 'Komatsu factory systems'
  | 'LIMC (oil analysis lab)'
  | 'KACF finance system'
  | 'Customs broker (ICS)'
  | 'Reference data';

export interface SystemBinding {
  system: SystemOfRecord;
  /** Fabric source that holds the table (Lakehouse / Eventhouse name). */
  source: string;
  /** Physical table as it lands in Fabric, e.g. `lh_d365.dbo.custtable`. */
  table: string;
  /** Alternative table holding the same concept in the other platform (e.g. the Dataverse copy of an F&O table). */
  alternate?: string;
  /** Optional row filter when several concepts share a table. */
  filter?: string;
  /** Ontology property name → source column. */
  columns: Record<string, string>;
  /** True when the table/column names still need confirmation with the platform team. */
  toConfirm?: boolean;
}

export interface KomatsuEntityType extends EntityType {
  domain: KomatsuDomain;
  /** Other names the business or systems use for this concept (emitted as skos:altLabel). */
  synonyms?: string[];
  /** Business role accountable for the data (data owner / steward). */
  owner: string;
  alignments: StandardAlignment[];
  binding?: SystemBinding;
}

export type KomatsuRelationship = Relationship;

/** A catalogue module: a focused, connected slice of the enterprise model. */
export interface KomatsuModule {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  entityIds: string[];
}
