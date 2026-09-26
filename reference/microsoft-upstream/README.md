# Microsoft Ontology Playground — upstream reference (not used)

This folder holds everything that came from the upstream
[microsoft/Ontology-Playground](https://github.com/microsoft/Ontology-Playground)
repository and is **not used** by the Komatsu Ontology Workbench. It is kept
only as reference material. Nothing here is built, tested, linted, deployed or
loaded by the app:

- `tsconfig` only includes `src/`; Vitest and ESLint exclude `reference/**`
- the catalogue compiler only reads `catalogue/`; the learn compiler only
  reads `content/learn/`
- GitHub only runs workflows from `.github/workflows/` at the repo root

| Path | What it was |
|---|---|
| `catalogue/official`, `catalogue/community`, `catalogue/external` | Sample ontologies (Fourth Coffee, retail, healthcare, finance, FIBO, schema.org, community contributions…) |
| `content/learn/` | Ontology School courses (Ontology Fundamentals, domain paths, IQ labs) |
| `docs/` | Upstream guides (authoring, embedding, GitHub OAuth, demo scripts, learn-content guide, theme guide) — still accurate for the underlying tool |
| `.github/` | Microsoft CI/CD (Azure SWA for Microsoft's site, GitHub Pages, ontology previews, school review), Copilot skills, prompts and issue templates |
| `scripts/` | Upstream catalogue migration, IQ-lab generator and ontology-preview renderers |
| `src/data/` | Built-in sample ontologies and generic designer templates |
| `data/reference/` | Name fixture used by the upstream name-generator skill |
| `README-upstream.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `TODO.md`, `og-image.png` | Upstream project files |

The small **Fourth Coffee** sample survives in `src/test/fixtures/fourthCoffee.ts`,
used only as a unit-test fixture for the generic ontology tooling.

The upstream code is MIT-licensed (see the root `LICENSE`, which must be kept).
To pull future upstream improvements, add `microsoft/Ontology-Playground` as a
git remote and cherry-pick tool changes under `src/` — do not merge sample
content back into the active folders.
