/**
 * Push the Komatsu ontology (enterprise model or one module) to a Microsoft
 * Fabric workspace as a Fabric IQ ontology item — create it the first time,
 * update its definition afterwards (matched by display name).
 *
 * Auth: FABRIC_TOKEN if set, otherwise an Azure CLI token for the Fabric API
 * (`az login` locally, or azure/login with OIDC in GitHub Actions). The identity
 * needs Contributor (or higher) on the workspace, and service principals must
 * be allowed to use Fabric APIs in the Fabric admin portal.
 *
 * Usage:
 *   FABRIC_WORKSPACE_ID=<guid> npx tsx scripts/deploy-fabric-ontology.ts [--module 03-pdi] [--dry-run]
 */
import { execSync } from 'node:child_process';
import type { Ontology } from '../src/data/ontology.js';
import { komatsuEnterpriseOntology, komatsuModuleOntology, komatsuModules } from '../src/data/komatsu/index.js';
import {
  convertToFabricParts,
  createOntology,
  listOntologies,
  sanitizeName,
  updateOntologyDefinition,
} from '../src/lib/fabric.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const moduleArg = args.includes('--module') ? args[args.indexOf('--module') + 1] : undefined;

/** Stable, short Fabric item names: KAU-enterprise, KAU-03-pdi, … */
function selectOntology(): Ontology {
  if (!moduleArg) return { ...komatsuEnterpriseOntology, name: 'KAU-enterprise' };
  const m = komatsuModules.find((x) => x.slug === moduleArg || x.slug.endsWith(moduleArg));
  if (!m) {
    throw new Error(`Unknown module "${moduleArg}". Options: ${komatsuModules.map((x) => x.slug).join(', ')}`);
  }
  return { ...komatsuModuleOntology(m), name: `KAU-${m.slug}` };
}

function fabricToken(): string {
  if (process.env.FABRIC_TOKEN) return process.env.FABRIC_TOKEN;
  return execSync(
    'az account get-access-token --resource https://api.fabric.microsoft.com --query accessToken -o tsv',
    { encoding: 'utf-8' },
  ).trim();
}

async function main(): Promise<void> {
  const ontology = selectOntology();
  const displayName = sanitizeName(ontology.name);
  const { definition } = convertToFabricParts(ontology);
  const entityParts = definition.parts.filter((p) => p.path.startsWith('EntityTypes/')).length;
  const relParts = definition.parts.filter((p) => p.path.startsWith('RelationshipTypes/')).length;
  console.log(`Ontology "${displayName}": ${entityParts} entity types, ${relParts} relationship types`);

  if (dryRun) {
    console.log('✔ Dry run — definition built, nothing sent to Fabric');
    return;
  }

  const workspaceId = process.env.FABRIC_WORKSPACE_ID;
  if (!workspaceId) throw new Error('FABRIC_WORKSPACE_ID is required');
  const token = fabricToken();

  const existing = (await listOntologies(workspaceId, token)).find((o) => o.displayName === displayName);
  if (existing) {
    await updateOntologyDefinition(workspaceId, existing.id, token, ontology);
    console.log(`✔ Updated ontology ${existing.id} in workspace ${workspaceId}`);
  } else {
    const created = await createOntology(workspaceId, token, ontology);
    console.log(`✔ Created ontology ${created.id} in workspace ${workspaceId}`);
  }
}

main().catch((e: unknown) => {
  console.error(`✘ ${(e as Error).message}`);
  process.exit(1);
});
