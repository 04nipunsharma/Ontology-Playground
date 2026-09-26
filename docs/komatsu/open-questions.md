# Open Questions for the Business and IT

Version 0.1.0 of the ontology was built from public sources, industry
standards and the standard D365 / Annata data models. The questions below
turn it into Komatsu's model. Each has the **current assumption** in the
model and **what changes** once it's answered, so answers can go straight
into [`src/data/komatsu/model.ts`](../../src/data/komatsu/model.ts).

Priority: 🔴 changes structure · 🟠 changes bindings or enums · 🟢 wording and detail.

## 1. Hensei and machine supply

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 1.1 🔴 | Is the internal term **Hensei** or **Hansei (販生)**? Public Komatsu sources only use HANSEI (sales + production planning). | Named `HenseiCycle` / `HenseiRequest` (your spelling), with *Hansei* as a synonym | Rename entities if needed |
| 1.2 🔴 | What does one Hensei cycle look like: cut-off dates, horizon (N+3? N+6?), frozen/firm periods, allocation feedback from Komatsu Ltd? | Monthly cycle → request lines per model/spec → factory allocation → factory orders | May add `HenseiAllocation` or split forecast vs firm order lines |
| 1.3 🟠 | Which system holds Hensei data (Komatsu Ltd global system, spreadsheets, D365)? What is it called? | "Komatsu factory systems" feed into `lh_reference` | Real binding for HenseiCycle / HenseiRequest |
| 1.4 🟠 | How is a factory order represented in F&O: intercompany purchase order? What purchase pool? | `purchtable` filtered on `purchpoolid = 'MACHINE'` | Binding filter |
| 1.5 🟢 | How are stock vs customer-specific machine orders distinguished, and how does "change of destination" work? | `HenseiRequest.requestType`, a SalesOrderLine allocating a unit | Possibly a `UnitAllocation` / `DestinationChange` entity |
| 1.6 🟢 | Which models come from which factory (Japan plants, Bangkok, Indonesia, Peoria, Milwaukee…)? | `MachineModel producedAt Factory` with no reference data yet | Reference data load |

## 2. Import, logistics and PDI

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 2.1 🟠 | Are voyages, containers and landed cost managed in the F&O **landed cost** module? | `VesselVoyage` → `itmtable` ⚠️ | Binding |
| 2.2 🟠 | Where are customs entries and biosecurity (BMSB) inspections recorded: broker portal, F&O documents, spreadsheets? | External feed into `lh_reference` | Binding, maybe attachments only |
| 2.3 🔴 | Is **PDI** an Annata work order type, a separate process, or both (e.g. Utility Central vs mining OE builds)? | `PDIJob` = Annata work order where type = PDI | May split `PDIJob` vs `MachineBuild` (OE build) |
| 2.4 🟠 | What is on the standard PDI checklist, and which compliance items are fitted as standard (MDG 15, fire suppression, cameras, beacons)? | Generic `InspectionResult.checkArea` enum | Enum values; possibly a `ChecklistTemplate` entity |
| 2.5 🟢 | Is "PDI Planner" a formal role? Which tool is used to schedule PDI bays and technicians (Annata planning board, Field Service Schedule Board, Excel)? | `ResourceBooking` in Field Service (Universal Resource Scheduling) | Binding |
| 2.6 🟢 | What is the delivery/handover form called, and who registers warranty and activates KOMTRAX? | `MachineHandover` with flags | Wording |

## 3. Parts supply chain and planning

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 3.1 🟠 | What are the parts **order types / priorities** (stock, daily, emergency, VOR/machine down, air vs sea)? | `SalesOrder.orderType`, `orderPriority`; `PurchaseOrder.poType` | Enum values and binding (sales/purchase pool codes) |
| 3.2 🟠 | What does the DC network look like today (Wacol national DC? regional DCs at Fairfield / Welshpool / Rutherford?) and which warehouses are WMS-enabled? | Generic `Warehouse.warehouseType` | Reference data |
| 3.3 🟠 | Where is supersession managed: Annata multi-level supersession or F&O product lifecycle? | Annata `amitemsupersession` ⚠️ | Binding |
| 3.4 🟢 | Are forecasts produced in F&O Demand Planning, another tool, or outside D365? Is KOMTRAX usage used in parts forecasting? | `PartsDemandForecast` → `forecastsales` | Binding, forecast method enum |
| 3.5 🟢 | Is there consignment stock at mine sites, and how is it replenished? | Warehouse type "Consignment Site", transfer type "Consignment Top-up" | Confirm |
| 3.6 🟢 | Which overseas supply sources are used for parts (Japan depots, Singapore, Thailand…)? What is "KLTD"? | `Supplier.supplierType = Komatsu Parts Depot` | Reference data |
| 3.7 🟢 | Is the AS400 still used for any part of parts ordering? | Not modelled (assumed retired by D365) | Add a legacy binding if still live |

## 4. Service, technicians and contracts

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 4.1 🔴 | **Who owns the work order**: Annata (F&O), Field Service (Dataverse), or a hybrid? The Field Service ↔ F&O integration retires 28 Feb 2027. | Annata work order is the master; Field Service used for scheduling | Bindings for 8 service entities (see [system-mapping.md](system-mapping.md)) |
| 4.2 🟠 | Is Field Service licensed (bookable resources, bookings, skills, mobile app)? | Yes, for Technician, Skill, ResourceBooking, WorkshopBay | Bindings |
| 4.3 🟠 | Which contract products exist? Is "MARC" used internally? How do Komplimentary Maintenance, Maintenance Contract Agreements and mining full-maintenance contracts differ in the system? | `ServiceContract.contractType` with 8 values | Enum; maybe separate `ContractLine` (unit-level coverage and rates) |
| 4.4 🟢 | How are SLAs and entitlements tracked: CE entitlements, Annata contract service packages, or both? | CE `entitlement` | Binding |
| 4.5 🟢 | What are the technician certifications and site inductions that scheduling must respect? | `Skill.skillType` enum | Reference data |
| 4.6 🟢 | Is labour posted through F&O project hour journals from Annata work orders? | `TimeEntry` → `projempltrans` ⚠️ | Binding |

## 5. Warranty and REMAN

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 5.1 🟠 | Which factory warranty system do claims go to, and how are claims split between factory and supplier recovery? | `WarrantyClaim` with claimToFactory / recoveryFromSupplier | Binding; integration entity |
| 5.2 🟠 | How are Premium Warranty and Long Haul Support enrolled and stored against the unit? | `WarrantyCoverage.warrantyType` | Binding |
| 5.3 🔴 | REMAN commercials: core deposit/credit rules, core inspection grades, reman warranty period. Do rebuilds run as Annata work orders or F&O production orders? | `CoreReturn` on the F&O return order; `RemanJob` = Annata work order where type = REMAN | May switch RemanJob to `prodtable`; add `CoreGrade` enum |
| 5.4 🟢 | Is the exchange pool national or per branch, and which components are in the Component Exchange Program? | Reman stock in a `Warehouse` of type Reman Store | Reference data |
| 5.5 🟢 | What are PIPs / campaigns called internally, and how is completion tracked by serial number? | `ServiceCampaign affectsUnit EquipmentUnit` with completionStatus | Wording |

## 6. Customer, support and portal

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 6.1 🟠 | Is the customer portal **Power Pages** (D365) or the Annata dealer portal? Is it the new home of myKomatsu / myFleet? | Power Pages with `contact` + `mspp_webrole` | Binding |
| 6.2 🟠 | Is Salesforce still used for any CRM processes, or is it fully D365 CE? | D365 CE only | Possibly a second binding for Opportunity |
| 6.3 🟢 | Is the customer master the F&O customer (dual-written to CE) or the CE account? | F&O `custtable` master, CE `account` alternate | Binding |
| 6.4 🟢 | How are customer sites modelled: F&O delivery addresses, Field Service functional locations, Annata locations? | Field Service `msdyn_functionallocation` ⚠️ | Binding |
| 6.5 🟢 | Which customer tiers and segments are used for coverage and pricing? | `Customer.customerTier`, `segment` enums | Enum values |

## 7. Telematics and condition monitoring

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 7.1 🟠 | How is KOMTRAX data accessed (ISO 15143-3 API, Komatsu data feed, myFleet export), and which unit identifier does it use (serial or PIN)? | ISO 15143-3 feed into Eventhouse `eh_komtrax` | Binding and join key |
| 7.2 🟢 | Are KOMTRAX cautions turned into CE IoT alerts or Annata work orders automatically? | `MachineAlert` → `msdyn_iotalert` ⚠️ | Binding |
| 7.3 🟢 | Can KOWA / LIMC results be exported (API or file), and at what grain (sample, compartment, element)? | `OilSample` per sample and compartment | May add `OilAnalysisResult` (per element) |

## 8. Platform and governance

| # | Question | Current assumption | What changes |
|---|---|---|---|
| 8.1 🔴 | Please share the **Annata `AM*` table/entity list** and the Dataverse `msauto_*` table list from the Komatsu tenant. | 22 Annata bindings are best-guess names ⚠️ | Binding confirmation |
| 8.2 🟠 | Which legal entities (`dataareaid`) are in scope: KAPL only, or also NZ, New Caledonia, PNG, KACF, Komatsu Forest? | KAPL only (`dataareaid = 'kau'`) | Filters; maybe a `LegalEntity` entity |
| 8.3 🟠 | Is **Link to Fabric** (or Synapse Link) already enabled, and to which workspace? | Bronze lakehouse `lh_d365` | Deployment plan |
| 8.4 🟢 | Preferred ontology **namespace IRI**? | Placeholder `https://ontology.komatsu.com.au/` | One constant in `model.ts` |
| 8.5 🟢 | Who signs off each module (data owners in the [data dictionary](data-dictionary.md))? | Role-based owners | Governance RACI |
| 8.6 🟢 | Should forklifts (Komatsu Forklift Australia), forestry and rental be in scope for v1? | Rental included; forklifts and forestry only as segments | Scope |

## How to answer

Answer inline in a copy of this file, as issues or PR comments, or in a
workshop. The fastest route is a 45-minute walkthrough per module in the
Playground's presentation mode:
[`/#/learn/komatsu-au-ontology`](../../content/learn/komatsu-au-ontology/).
