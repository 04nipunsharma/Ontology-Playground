# Komatsu Ontology Workbench

The home of the **Komatsu Australia Enterprise Ontology**: one shared business
vocabulary for how Komatsu Australia sells, delivers, supports and rebuilds
machines, bound to the systems that run the business (D365 CE, D365 F&O,
Annata 365, KOMTRAX) and deployable to **Microsoft Fabric IQ**.

| | |
|---|---|
| Entity types / relationships | **71 / 199**, in 13 process domains |
| Modules | Enterprise model + 11 focused modules (equipment master, sales, Hensei, PDI, parts, planning, service, contracts & warranty, REMAN, support & portal, telematics) |
| Standards | ISO 6165 / 10261 / 14224 / 15143-3, SAE J1939, IOF, MIMOSA CCOM, schema.org, GS1, UN/CEFACT, OAGIS, W3C, FIBO, Microsoft CDM, SCOR, APQC |
| Systems bound | D365 F&O, Annata 365, D365 CE / Dataverse, KOMTRAX, Power Pages portal, LIMC, KACF |
| Target platform | Microsoft Fabric IQ ontology on Komatsu's Fabric workspace; web app on Azure Static Web Apps in Komatsu's resource group |

## What's in the workbench

- **Interactive graph** of the enterprise ontology (opens by default), with an
  inspector, path finder, search and natural-language query playground.
- **Gallery** of the enterprise model and the 11 modules.
- **Data Sources** panel showing, for every entity, the system of record,
  table and column mapping.
- **Visual designer** to change the model, with Komatsu modules as starter
  templates, Fabric IQ validation, and RDF/OWL import and export.
- **Ontology School course** `/#/learn/komatsu-au-ontology`: 7 lessons with
  live graphs and quizzes, and a presentation mode for process-owner workshops.
- **Push to Microsoft Fabric** from the browser, plus the `npm run fabric:deploy` CLI and a GitHub Action.

## Documentation

| Guide | |
|---|---|
| [Ontology overview](docs/komatsu/README.md) | Design layers, value streams, modules, data ownership, conventions, roadmap |
| [Data dictionary](docs/komatsu/data-dictionary.md) | Generated: every entity, property, relationship, standard and binding |
| [System mapping](docs/komatsu/system-mapping.md) | D365 CE / F&O / Annata systems of record, work-order ownership decision, Fabric medallion pattern |
| [Azure & Fabric setup](docs/komatsu/azure-fabric-setup.md) | Connecting to Komatsu's resource group and Fabric workspace |
| [Standards alignment](docs/komatsu/standards-alignment.md) | Which standards, why, and the traps we avoided |
| [Glossary](docs/komatsu/glossary.md) | Komatsu, system and standards terms |
| [Open questions](docs/komatsu/open-questions.md) | What we still need from the business and IT |
| [Sources](docs/komatsu/sources.md) | Evidence behind the Komatsu facts |

## Getting started

```bash
npm ci
npm run dev          # http://localhost:5173
npm test             # unit + model tests
npm run build        # compiles catalogue + course, type-checks, bundles to build/
```

### Changing the ontology

```bash
# edit src/data/komatsu/model.ts (entities, relationships, bindings, modules)
npm run komatsu:generate    # regenerates catalogue/official/komatsu-au-* and the data dictionary
npm test                    # validation, RDF round-trip, Fabric conversion
```

`npm run komatsu:check` (also run by the tests) fails if the generated files
are out of date.

### Deploying

| Target | How | Guide |
|---|---|---|
| Azure resources (Static Web App, optional Fabric capacity) | `infra/main.bicep`, or the **Deploy Azure infrastructure** workflow | [Azure & Fabric setup](docs/komatsu/azure-fabric-setup.md) |
| Web app | **Deploy workbench to Azure Static Web Apps** workflow (opt-in: `AZURE_SWA_ENABLED`) | same |
| Ontology → Fabric IQ | `npm run fabric:deploy`, or the **Deploy ontology to Microsoft Fabric IQ** workflow (opt-in: `FABRIC_DEPLOY_ENABLED`) | same |

## Repository layout

```
src/                      React app (graph, designer, inspector, learn, Fabric export)
  data/komatsu/           ★ Source of truth: model.ts, types, validation, runtime entry
  test/fixtures/          Small upstream sample used only by unit tests
catalogue/official/       Generated Komatsu catalogue entries (RDF/OWL + metadata)
content/learn/            Komatsu Ontology School course
docs/komatsu/             Ontology, system, standards and platform documentation
scripts/                  Catalogue/learn compilers, Komatsu generator, Fabric deploy CLI
infra/                    Bicep for the Azure resource group
api/                      Azure Functions (GitHub OAuth proxy, optional AI builder)
.github/workflows/        CI, secret scan, Azure SWA / infra / Fabric deployments
reference/microsoft-upstream/   Upstream Microsoft samples, courses, docs and workflows — NOT used
```

## Configuration

Copy `.env.example` to `.env.local` for local overrides.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_CATALOGUE_REPO` | `04nipunsharma/Ontology-Playground` | Repo used by the "submit to catalogue" PR flow and contribute links |
| `VITE_FABRIC_WORKSPACE_ID` | *(empty)* | Pre-fills the Fabric workspace in *Push to Microsoft Fabric* |
| `VITE_GITHUB_CLIENT_ID` | *(empty)* | GitHub OAuth app for the PR flow |
| `VITE_ENABLE_AI_BUILDER` | `false` | Azure OpenAI ontology builder (needs `/api` configured) |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | JSON/YAML/CSV import and export |
| `FABRIC_WORKSPACE_ID`, `FABRIC_TOKEN` | *(empty)* | Used by `npm run fabric:deploy` (the token falls back to `az login`) |

## Origin and licence

The workbench is built on the open-source
[Microsoft Ontology Playground](https://github.com/microsoft/Ontology-Playground)
(MIT). The upstream copyright notice is kept in [`LICENSE`](LICENSE). All
upstream sample content, courses, docs and Microsoft-specific automation are
parked, unused, in [`reference/microsoft-upstream/`](reference/microsoft-upstream/README.md).
Microsoft, Fabric, Dynamics 365 and Azure are trademarks of Microsoft. Komatsu,
KOMTRAX and related names are trademarks of Komatsu Ltd.
