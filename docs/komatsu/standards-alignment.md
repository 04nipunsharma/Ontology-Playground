# Standards Alignment

How the Komatsu Australia Enterprise Ontology relates to published industry
standards and vocabularies, and why. The per-entity mappings are in the
generated [data dictionary](data-dictionary.md). They are also emitted into
the RDF as `skos:exactMatch` / `closeMatch` / `broadMatch` / `relatedMatch`
(for standards with public IRIs) and as `kau:alignsTo` annotations (for all).

## Approach: align, don't import

The model is **Komatsu-first**. Entity names are the business's words, and
the standards are linked rather than imported:

- **Readability.** Importing BFO/IOF upper classes would put
  `MaterialArtifact` and `ProcessBoundary` in front of planners and
  coordinators. Linking keeps the graph business-readable and still records
  the formal meaning.
- **Tool fit.** Fabric IQ ontologies are flat (no subclassing), so an imported
  class hierarchy would be lost on export anyway.
- **Licensing.** ISO, SAE, SCOR, APQC and ECLASS are paid or restricted. We
  reference their codes and term names, not their definitions.

| Alignment kind | Meaning in this model |
|---|---|
| `exactMatch` | Same concept; data can be exchanged 1:1 (e.g. `EquipmentUnit` ↔ `schema:IndividualProduct`) |
| `closeMatch` | Same intent with minor scope differences (e.g. `WorkOrder` ↔ `iof:MaintenanceWorkOrderRecord`) |
| `broadMatch` | The standard term is broader (e.g. `Component` ↔ `iof:MaterialComponent`) |
| `related` | Useful cross-reference, not an equivalence (e.g. SCOR / APQC process areas) |

## Standards used

| Standard | Version / publisher | Access | Namespace | Used for |
|---|---|---|---|---|
| **ISO 6165** | 2022, ISO/TC 127 | Paid | — (codes as SKOS, future) | `MachineType` basic machine types |
| **ISO 10261** | 2021 (PIN 3+5+1+8) | Paid | — | `EquipmentUnit.pin` |
| **ISO 15143-3 (AEMP 2.0)** | 2020 | Paid (API spec widely published) | — | `TelematicsReading` fields, `MachineAlert`, `FaultCode` |
| **SAE J1939-73** | SAE | Paid | — | `FaultCode.spn / fmi`, `MachineAlert.occurrenceCount` |
| **ISO 14224** | 2016 | Paid | — | Equipment taxonomy levels 6–8, `FailureMode` (mode / mechanism / cause), maintenance activities |
| **ISO 55000 / 55001** | 2024 | Paid | — | Asset-management framing (`MaintenancePlan`) |
| **IOF** (on BFO, ISO/IEC 21838-2) | 2026-03 release, MIT licence | Open | `https://spec.industrialontologies.org/ontology/construct/` | Customer, Supplier, Factory, PieceOfEquipment, MaintainableMaterialItem, MaterialProduct, MaintenanceWorkOrderRecord, MaintenanceActivity, QualifiedMaintenancePerson, CommercialServiceAgreement, IndustrialInventory, Shipment, PurchaseOrder, ReceivingProcess, FailureModeCode… (28 terms, all checked against the published files) |
| **MIMOSA CCOM** | 4.1 | Open XSD, no RDF IRIs | — | Asset, Model, Segment, WorkOrder, WorkStep, SolutionPackage, Measurement, WorkRequest |
| **schema.org** | v30.1 | Open | `https://schema.org/` | Organization, Place, Person, ProductModel, IndividualProduct, Product, Offer, Order, OrderItem, Invoice, WarrantyPromise, Reservation, ReturnAction, RentAction… (27 terms, all checked) |
| **GoodRelations** | v1 | Open | `http://purl.org/goodrelations/v1#` | ProductOrServiceModel |
| **GS1 Web Vocabulary** | 1.16 | Open | `https://gs1.org/voc/` | Product, WarrantyPromise, `replacedByProduct` (supersession) |
| **GS1 CBV 2.0 (EPCIS)** | 2.0 | Open | `https://ref.gs1.org/cbv/` | Business steps: receiving, shipping, inspecting, accepting, repairing; dispositions: returned, conformant |
| **UN/CEFACT Vocabulary** | current | Open | `https://vocabulary.uncefact.org/` | Consignment, TransportMovement, ExchangedDeclaration, InspectionEvent |
| **OAGIS / connectSpec** | 10.x | Open | — | PurchaseOrder, SalesOrder, ItemMaster, InventoryBalance, ReceiveDelivery, MaintenanceOrder, WarrantyClaim |
| **W3C ORG / SOSA / PROV-O / SKOS / FOAF** | W3C Recs | Open | `http://www.w3.org/ns/…` | Organisation units and sites; observations (telematics, meter, oil); agents; code lists |
| **FIBO** | 2026 | Open (MIT) | `https://spec.edmcouncil.org/fibo/ontology/` | Contract (service, purchase, rental agreements), Loan (finance) |
| **Microsoft CDM** | current | Open | — | Account, Contact, Opportunity, Quote, Case, Entitlement, WorkOrder, CustomerAsset… |
| **ASCM SCOR DS** | current | Restricted | — | Process areas (Plan, Order, Source, Transform, Fulfill, Return) |
| **APQC PCF** | 8.0 | Free with registration | — | 4.0 Supply Chain, 5.0 Deliver Services, 6.0 Customer Service |
| **UNSPSC / HS** | UNSPSC v26 / WCO HS | Open / open | — | `MachineType.unspscCode`, `Part.hsCode`, `CustomsEntry.tariffCode` |

## Traps we avoided

These came out of the standards research. They're common modelling mistakes.

| Temptation | Why it's wrong | What we used |
|---|---|---|
| `schema:Quotation` for a sales quote | It means a *literary* quotation | `schema:Offer` |
| `schema:Claim` for a warranty claim | It is a fact-check claim | OAGIS `WarrantyClaim` + local class |
| `schema:vehicleIdentificationNumber` for the machine PIN | VIN ≠ ISO 10261 PIN | Local `pin` property referencing ISO 10261 |
| FIBO `Warranty` for product warranty | FIBO's is a contractual representation of fact | `schema:WarrantyPromise` |
| GS1 GRAI for reman cores | GRAI identifies *returnable containers* | Serialised GTIN / GIAI on `Component`; CBV `Disp-returned` on `CoreReturn` |
| CBV "commissioning" for machine handover | In CBV it means assigning an identifier | CBV `BizStep-accepting` |
| Old IOF per-module IRIs (`…/core/Core/…`) | Deprecated since 2025 | Flat `…/ontology/construct/` IRIs |

## Australian regulatory context

These rules shaped properties and entities. Specifics need checking
against the primary sources and with the business.

| Rule / body | Where it shows up |
|---|---|
| ABN / ACN, GST 10% | `Customer.abn`, `Supplier.abn`, `CustomerInvoice.gstAmount` |
| Australian Border Force import declaration, HS 8429 / 8431 / 8704.10 | `CustomsEntry` |
| DAFF biosecurity (BICON), BMSB season 1 Sep–30 Apr, NUFT exemption, Ro-Ro vessel inspection | `BiosecurityInspection` (isBmsbSeason, treatment, result) |
| NSW MDG 15 (mobile plant in mines), ROPS ISO 3471, FOPS ISO 3449 | `MachineOption.complianceStandard`, PDI checklist areas |
| Heavy Vehicle National Law — chain of responsibility, NHVR OSOM permits | `Shipment.requiresOversizePermit` |
| Australian Consumer Law — consumer guarantees, warranty against defects (reg 90) | `WarrantyCoverage` alignment |

## Next steps for the standards layer

1. Publish **SKOS concept schemes** for the controlled lists: ISO 6165
   machine types, ISO 14224 failure mechanism/cause, Komatsu error codes
   (linked to J1939 SPN+FMI), order types, contract and warranty products.
   Then link the enum properties to them.
2. Add **QUDT units** (`unit:HR`, `unit:L`, `unit:KiloGM`, `unit:TONNE`) to
   the numeric properties in RDF.
3. Record **provenance** with PROV-O (`prov:wasDerivedFrom` from each
   gold-layer table to its D365 source) once the Fabric pipeline exists.
