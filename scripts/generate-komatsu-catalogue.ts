/**
 * Generate the Komatsu Australia catalogue entries from the single
 * source-of-truth model in `src/data/komatsu/model.ts`.
 *
 * Outputs (all deterministic — safe to re-run and diff):
 *   catalogue/official/komatsu-au-enterprise/        full end-to-end ontology
 *   catalogue/official/komatsu-au-<module>/          one focused slice per process domain
 *   docs/komatsu/data-dictionary.md                  generated entity / property / binding reference
 *
 * The RDF is a superset of what `serializeToRDF` writes: on top of the
 * Playground annotations (icon, color, cardinality, identifiers, enums, data
 * bindings) it carries industry alignments (SKOS mappings), process domain,
 * data owner and system of record, so the files are useful outside the
 * Playground (Fabric IQ, Purview, Protégé).
 *
 * Usage: npx tsx scripts/generate-komatsu-catalogue.ts [--check]
 *   --check  exit 1 if any generated file differs from what is on disk
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  KOMATSU_BASE_URI,
  KOMATSU_ONTOLOGY_DESCRIPTION,
  KOMATSU_ONTOLOGY_NAME,
  KOMATSU_ONTOLOGY_VERSION,
  komatsuEntities,
  komatsuModules,
  komatsuRelationships,
} from '../src/data/komatsu/model.js';
import type {
  KomatsuEntityType,
  KomatsuModule,
  KomatsuRelationship,
} from '../src/data/komatsu/types.js';
import { buildModuleOntology, DOMAIN_LABELS, entityClassName, validateKomatsuModel } from '../src/data/komatsu/modelUtils.js';

const ROOT = join(import.meta.dirname, '..');
const CATALOGUE_DIR = join(ROOT, 'catalogue', 'official');
const DOCS_DIR = join(ROOT, 'docs', 'komatsu');
const AUTHOR = 'komatsu-australia';

const checkOnly = process.argv.includes('--check');
const drift: string[] = [];

function emit(path: string, content: string): void {
  if (checkOnly) {
    const current = existsSync(path) ? readFileSync(path, 'utf-8') : null;
    if (current !== content) drift.push(path);
    return;
  }
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content, 'utf-8');
}

// ─── RDF writer ─────────────────────────────────────────────────────────────

function xml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const XSD: Record<string, string> = {
  string: 'string',
  integer: 'integer',
  decimal: 'decimal',
  double: 'double',
  date: 'date',
  datetime: 'dateTime',
  boolean: 'boolean',
  enum: 'string',
};

const SKOS_PREDICATE: Record<string, string> = {
  exactMatch: 'skos:exactMatch',
  closeMatch: 'skos:closeMatch',
  broadMatch: 'skos:broadMatch',
  related: 'skos:relatedMatch',
};

interface RdfInput {
  slug: string;
  name: string;
  description: string;
  entities: KomatsuEntityType[];
  relationships: KomatsuRelationship[];
}

function toRdf({ slug, name, description, entities, relationships }: RdfInput): string {
  const base = `${KOMATSU_BASE_URI}${slug}/`;
  const out: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push('<!-- GENERATED FILE — do not edit by hand.');
  out.push('     Source: src/data/komatsu/model.ts · Generator: scripts/generate-komatsu-catalogue.ts -->');
  out.push('<rdf:RDF');
  out.push(`    xml:base="${base}"`);
  out.push('    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"');
  out.push('    xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"');
  out.push('    xmlns:owl="http://www.w3.org/2002/07/owl#"');
  out.push('    xmlns:xsd="http://www.w3.org/2001/XMLSchema#"');
  out.push('    xmlns:skos="http://www.w3.org/2004/02/skos/core#"');
  out.push('    xmlns:dcterms="http://purl.org/dc/terms/"');
  out.push(`    xmlns:kau="${KOMATSU_BASE_URI}terms#">`);
  out.push('');
  out.push(`    <owl:Ontology rdf:about="${base}">`);
  out.push(`        <rdfs:label>${xml(name)}</rdfs:label>`);
  out.push(`        <rdfs:comment>${xml(description)}</rdfs:comment>`);
  out.push(`        <owl:versionInfo>${xml(KOMATSU_ONTOLOGY_VERSION)}</owl:versionInfo>`);
  out.push(`        <dcterms:creator>${xml(AUTHOR)}</dcterms:creator>`);
  out.push('        <dcterms:license rdf:resource="https://opensource.org/licenses/MIT"/>');
  out.push('    </owl:Ontology>');
  out.push('');

  // Annotation properties used below (declared so OWL tools treat them correctly)
  out.push('    <!-- Annotation vocabulary -->');
  for (const ap of ['icon', 'color', 'processDomain', 'dataOwner', 'systemOfRecord', 'alignsTo', 'isIdentifier', 'unit', 'enumValues', 'propertyType', 'cardinality', 'fromEntityId', 'toEntityId']) {
    out.push(`    <owl:AnnotationProperty rdf:about="${KOMATSU_BASE_URI}terms#${ap}"/>`);
  }
  out.push('');

  out.push('    <!-- ===================== -->');
  out.push('    <!-- Entity Types (Classes) -->');
  out.push('    <!-- ===================== -->');
  out.push('');
  for (const e of entities) {
    out.push(`    <owl:Class rdf:about="${base}${entityClassName(e)}">`);
    out.push(`        <rdfs:label>${xml(e.name)}</rdfs:label>`);
    out.push(`        <rdfs:comment>${xml(e.description)}</rdfs:comment>`);
    for (const syn of e.synonyms ?? []) out.push(`        <skos:altLabel>${xml(syn)}</skos:altLabel>`);
    out.push(`        <kau:icon>${xml(e.icon)}</kau:icon>`);
    out.push(`        <kau:color>${xml(e.color)}</kau:color>`);
    out.push(`        <kau:processDomain>${xml(DOMAIN_LABELS[e.domain])}</kau:processDomain>`);
    out.push(`        <kau:dataOwner>${xml(e.owner)}</kau:dataOwner>`);
    if (e.binding) out.push(`        <kau:systemOfRecord>${xml(e.binding.system)}</kau:systemOfRecord>`);
    for (const a of e.alignments) {
      out.push(`        <kau:alignsTo>${xml(`${a.standard}: ${a.term} (${a.kind})`)}</kau:alignsTo>`);
      if (a.iri) out.push(`        <${SKOS_PREDICATE[a.kind]} rdf:resource="${xml(a.iri)}"/>`);
    }
    out.push('    </owl:Class>');
    out.push('');
  }

  out.push('    <!-- ================ -->');
  out.push('    <!-- Data Properties -->');
  out.push('    <!-- ================ -->');
  out.push('');
  for (const e of entities) {
    for (const p of e.properties) {
      out.push(`    <owl:DatatypeProperty rdf:about="${base}${e.id}_${p.name}">`);
      out.push(`        <rdfs:label>${xml(p.name)}</rdfs:label>`);
      out.push(`        <rdfs:domain rdf:resource="${base}${entityClassName(e)}"/>`);
      out.push(`        <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#${XSD[p.type]}"/>`);
      if (p.description) out.push(`        <rdfs:comment>${xml(p.description)}</rdfs:comment>`);
      if (p.isIdentifier) {
        out.push('        <kau:isIdentifier rdf:datatype="http://www.w3.org/2001/XMLSchema#boolean">true</kau:isIdentifier>');
      }
      if (p.unit) out.push(`        <kau:unit>${xml(p.unit)}</kau:unit>`);
      if (p.values && p.values.length > 0) out.push(`        <kau:enumValues>${xml(p.values.join(','))}</kau:enumValues>`);
      out.push(`        <kau:propertyType>${xml(p.type)}</kau:propertyType>`);
      out.push('    </owl:DatatypeProperty>');
      out.push('');
    }
  }

  out.push('    <!-- ================== -->');
  out.push('    <!-- Object Properties -->');
  out.push('    <!-- ================== -->');
  out.push('');
  const byId = new Map(entities.map((e) => [e.id, e]));
  for (const r of relationships) {
    const from = byId.get(r.from)!;
    const to = byId.get(r.to)!;
    out.push(`    <owl:ObjectProperty rdf:about="${base}${r.id}">`);
    out.push(`        <rdfs:label>${xml(r.name)}</rdfs:label>`);
    out.push(`        <rdfs:domain rdf:resource="${base}${entityClassName(from)}"/>`);
    out.push(`        <rdfs:range rdf:resource="${base}${entityClassName(to)}"/>`);
    if (r.description) out.push(`        <rdfs:comment>${xml(r.description)}</rdfs:comment>`);
    out.push(`        <kau:cardinality>${xml(r.cardinality)}</kau:cardinality>`);
    out.push(`        <kau:fromEntityId>${xml(r.from)}</kau:fromEntityId>`);
    out.push(`        <kau:toEntityId>${xml(r.to)}</kau:toEntityId>`);
    out.push('    </owl:ObjectProperty>');
    out.push('');
    for (const attr of r.attributes ?? []) {
      out.push(`    <owl:DatatypeProperty rdf:about="${base}${r.id}_${attr.name}">`);
      out.push(`        <rdfs:label>${xml(attr.name)}</rdfs:label>`);
      out.push(`        <rdfs:comment>Relationship attribute for ${xml(r.name)}</rdfs:comment>`);
      out.push(`        <kau:relationshipAttributeOf>${xml(r.id)}</kau:relationshipAttributeOf>`);
      out.push(`        <kau:attributeType>${xml(attr.type)}</kau:attributeType>`);
      out.push('    </owl:DatatypeProperty>');
      out.push('');
    }
  }

  const bound = entities.filter((e) => e.binding);
  if (bound.length > 0) {
    out.push('    <!-- ============================================== -->');
    out.push('    <!-- Data Bindings (system of record → Fabric table) -->');
    out.push('    <!-- ============================================== -->');
    out.push('');
    for (const e of bound) {
      const b = e.binding!;
      out.push(`    <kau:DataBinding rdf:about="${base}binding_${e.id}">`);
      out.push(`        <kau:boundClass rdf:resource="${base}${entityClassName(e)}"/>`);
      out.push(`        <kau:boundEntityId>${xml(e.id)}</kau:boundEntityId>`);
      out.push(`        <kau:systemOfRecord>${xml(b.system)}</kau:systemOfRecord>`);
      out.push(`        <kau:source>${xml(b.source)}</kau:source>`);
      out.push(`        <kau:table>${xml(b.table)}</kau:table>`);
      if (b.filter) out.push(`        <kau:rowFilter>${xml(b.filter)}</kau:rowFilter>`);
      if (b.alternate) out.push(`        <kau:alternateTable>${xml(b.alternate)}</kau:alternateTable>`);
      if (b.toConfirm) out.push('        <kau:toConfirm rdf:datatype="http://www.w3.org/2001/XMLSchema#boolean">true</kau:toConfirm>');
      for (const [prop, col] of Object.entries(b.columns)) {
        out.push(`        <kau:columnMapping>${xml(prop)}=${xml(col)}</kau:columnMapping>`);
      }
      out.push('    </kau:DataBinding>');
      out.push('');
    }
  }

  out.push('</rdf:RDF>');
  return out.join('\n') + '\n';
}

// ─── Catalogue entries ──────────────────────────────────────────────────────

function metadataJson(name: string, description: string, icon: string, tags: string[]): string {
  return JSON.stringify(
    { name, description, icon, category: 'komatsu', tags, author: AUTHOR },
    null,
    2,
  ) + '\n';
}

function writeEntry(slug: string, name: string, description: string, icon: string, tags: string[], entities: KomatsuEntityType[], relationships: KomatsuRelationship[]): void {
  const dir = join(CATALOGUE_DIR, slug);
  emit(join(dir, `${slug}.rdf`), toRdf({ slug, name, description, entities, relationships }));
  emit(join(dir, 'metadata.json'), metadataJson(name, description, icon, tags));
}

// ─── Data dictionary ────────────────────────────────────────────────────────

function mdCell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function dataDictionary(modules: KomatsuModule[]): string {
  const lines: string[] = [];
  const entityById = new Map(komatsuEntities.map((e) => [e.id, e]));
  lines.push('<!-- GENERATED FILE — do not edit by hand. Run `npm run komatsu:generate`. -->');
  lines.push('');
  lines.push(`# ${KOMATSU_ONTOLOGY_NAME} — Data Dictionary`);
  lines.push('');
  lines.push(`Version **${KOMATSU_ONTOLOGY_VERSION}** · ${komatsuEntities.length} entity types · ${komatsuRelationships.length} relationships · ${modules.length} modules`);
  lines.push('');
  lines.push('Bindings marked ⚠️ use table/column names that still need confirmation against the live');
  lines.push('D365 / Annata 365 environment (see [open questions](open-questions.md)).');
  lines.push('');
  lines.push('## Modules');
  lines.push('');
  lines.push('| Module | Catalogue ID | Entities |');
  lines.push('|---|---|---|');
  lines.push(`| ${KOMATSU_ONTOLOGY_NAME} (full model) | \`official/komatsu-au-enterprise\` | ${komatsuEntities.length} |`);
  for (const m of modules) {
    lines.push(`| ${m.icon} ${m.title} | \`official/komatsu-au-${m.slug}\` | ${m.entityIds.map((id) => entityById.get(id)!.name).join(', ')} |`);
  }
  lines.push('');

  lines.push('## Entity overview');
  lines.push('');
  lines.push('| Entity | Domain | Data owner | System of record | Fabric table | Standard alignment |');
  lines.push('|---|---|---|---|---|---|');
  for (const e of komatsuEntities) {
    const b = e.binding;
    const table = b ? `\`${b.table}\`${b.toConfirm ? ' ⚠️' : ''}` : '—';
    const align = e.alignments.map((a) => (a.iri ? `[${a.standard}: ${a.term}](${a.iri})` : `${a.standard}: ${a.term}`)).join('<br>');
    lines.push(`| ${e.icon} **${e.name}** | ${DOMAIN_LABELS[e.domain]} | ${mdCell(e.owner)} | ${b ? b.system : '—'} | ${table} | ${align} |`);
  }
  lines.push('');

  const domains = Array.from(new Set(komatsuEntities.map((e) => e.domain)));
  for (const d of domains) {
    lines.push(`## ${DOMAIN_LABELS[d]}`);
    lines.push('');
    for (const e of komatsuEntities.filter((x) => x.domain === d)) {
      lines.push(`### ${e.icon} ${e.name}`);
      lines.push('');
      lines.push(e.description);
      lines.push('');
      if (e.synonyms && e.synonyms.length > 0) {
        lines.push(`**Also known as:** ${e.synonyms.join(' · ')}`);
        lines.push('');
      }
      lines.push(`**Data owner:** ${e.owner}`);
      lines.push('');
      if (e.binding) {
        const b = e.binding;
        lines.push(`**System of record:** ${b.system} · **Fabric source:** ${b.source} · **Table:** \`${b.table}\`${b.filter ? ` · **Filter:** ${b.filter}` : ''}${b.toConfirm ? ' · ⚠️ to confirm' : ''}`);
        lines.push('');
        if (b.alternate) {
          lines.push(`**Alternate table:** ${b.alternate}`);
          lines.push('');
        }
      }
      if (e.alignments.length > 0) {
        lines.push(`**Standards:** ${e.alignments.map((a) => `${a.iri ? `[${a.standard}: ${a.term}](${a.iri})` : `${a.standard}: ${a.term}`} (${a.kind})`).join(' · ')}`);
        lines.push('');
      }
      lines.push('| Property | Type | Key | Unit / values | Source column | Description |');
      lines.push('|---|---|---|---|---|---|');
      for (const p of e.properties) {
        const extra = p.values ? p.values.join(', ') : (p.unit ?? '');
        const col = e.binding?.columns[p.name];
        lines.push(`| \`${p.name}\` | ${p.type} | ${p.isIdentifier ? '🔑' : ''} | ${mdCell(extra)} | ${col ? `\`${col}\`` : ''} | ${mdCell(p.description ?? '')} |`);
      }
      lines.push('');
      const outgoing = komatsuRelationships.filter((r) => r.from === e.id);
      if (outgoing.length > 0) {
        lines.push('| Relationship | Target | Cardinality | Description |');
        lines.push('|---|---|---|---|');
        for (const r of outgoing) {
          lines.push(`| \`${r.name}\` | ${entityById.get(r.to)!.name} | ${r.cardinality} | ${mdCell(r.description ?? '')} |`);
        }
        lines.push('');
      }
    }
  }
  return lines.join('\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

const problems = validateKomatsuModel();
if (problems.errors.length > 0) {
  for (const e of problems.errors) console.error(`✘ ${e}`);
  console.error(`\n✘ Komatsu model has ${problems.errors.length} error(s)`);
  process.exit(1);
}
for (const w of problems.warnings) console.warn(`⚠ ${w}`);

writeEntry(
  'komatsu-au-enterprise',
  KOMATSU_ONTOLOGY_NAME,
  KOMATSU_ONTOLOGY_DESCRIPTION,
  '🚜',
  ['komatsu', 'enterprise', 'd365', 'annata', 'end-to-end'],
  komatsuEntities,
  komatsuRelationships,
);
console.log(`✔ komatsu-au-enterprise (${komatsuEntities.length} entities, ${komatsuRelationships.length} relationships)`);

for (const m of komatsuModules) {
  const slice = buildModuleOntology(m);
  writeEntry(`komatsu-au-${m.slug}`, `Komatsu AU · ${m.title}`, m.description, m.icon, ['komatsu', ...m.tags], slice.entities, slice.relationships);
  console.log(`✔ komatsu-au-${m.slug} (${slice.entities.length} entities, ${slice.relationships.length} relationships)`);
}

emit(join(DOCS_DIR, 'data-dictionary.md'), dataDictionary(komatsuModules));
console.log('✔ docs/komatsu/data-dictionary.md');

if (checkOnly) {
  if (drift.length > 0) {
    for (const p of drift) console.error(`✘ out of date: ${p}`);
    console.error('\nRun `npm run komatsu:generate` and commit the result.');
    process.exit(1);
  }
  console.log('\n✔ Generated Komatsu files are up to date');
}
