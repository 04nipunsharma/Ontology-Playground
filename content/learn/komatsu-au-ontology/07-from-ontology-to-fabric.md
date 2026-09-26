---
title: From Ontology to D365 and Fabric IQ
slug: ontology-to-fabric
description: How the model binds to D365 CE, F&O, Annata 365 and KOMTRAX, how to deploy it to Fabric IQ, and what we still need to confirm.
order: 7
embed: official/komatsu-au-01-customer-sales
reviewStatus: under-human-review
---

## Bindings: business concept → table

Open **Data Sources** (database icon in the header) with any Komatsu module loaded to see each entity's table and column mapping.

| Entity | System of record | Table | Alternate |
|---|---|---|---|
| Customer | D365 F&O | `custtable` | Dataverse `account` (dual-write) |
| Opportunity | D365 CE | `opportunity` | — |
| SalesOrder | D365 F&O | `salestable` | Dataverse `salesorder` |
| EquipmentUnit | Annata 365 | `AMDeviceTable` | `msauto_device`, `msdyn_customerasset` |
| WorkOrder | Annata 365 | Annata work order ⚠️ | `msdyn_workorder` |
| PlannedOrder | D365 F&O | `reqpo` | — |
| TelematicsReading | KOMTRAX | Eventhouse `eh_komtrax` | — |

⚠️ = physical name to be confirmed in the Komatsu tenant.

## Deploying to Fabric IQ

1. **Bronze** — Link to Fabric exposes Dataverse and selected F&O / Annata tables.
2. **Silver** — clean, decode enums, conform keys (`DataAreaId|Id`).
3. **Gold** — one managed Delta table per entity type and one link table per relationship; amounts cast to `double`.
4. **Ontology** — publish this model with `npm run fabric:deploy` (or the GitHub workflow) and bind each entity to its gold table.

The model already respects Fabric IQ rules: names ≤ 26 characters, one string key per entity, consistent property types, unique relationship names and no self-relationships.

## What we need from the business

The big decisions still open:

- **Hensei or Hansei** — naming and the exact monthly cycle
- **Who owns the work order** — Annata, Field Service or both (the Field Service ↔ F&O integration retires 28 Feb 2027)
- **REMAN commercials** — core deposit, credit and rebuild process
- **Annata table list** — to confirm 22 Annata bindings

See `docs/komatsu/open-questions.md` in the repository for the full list.

```quiz
Q: Why should the Fabric IQ ontology bind to a gold lakehouse rather than directly to the Link to Fabric tables?
- Link to Fabric does not include Dataverse tables
- Fabric IQ bindings need managed tables, one static binding per entity, and double-typed amounts — the gold layer provides exactly that [correct]
- Gold tables are faster to query in Power BI
- The ontology cannot read F&O data
> Link to Fabric produces read-only shortcuts; Fabric IQ binds one managed table per entity type, and decimals should be cast to double. A gold layer shaped like the ontology satisfies all three.
```
