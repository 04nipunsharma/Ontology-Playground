# Komatsu Australia — Glossary

Business, system and standards terms used in the
[Komatsu Australia Enterprise Ontology](README.md). The **Entity** column
names the ontology concept that represents the term, where there is one.
Terms marked *(to confirm)* come from public sources or industry practice and
need confirming by the business (see [open-questions.md](open-questions.md)).

## Komatsu business terms

| Term | Meaning | Entity |
|---|---|---|
| **Hensei / Hansei (販生)** | Komatsu's monthly **sales + production** planning (SIOP) cycle. Komatsu Australia submits machine demand and orders to the factories and receives production allocations. Komatsu Ltd runs it through its Global HANSEI Operation Center. *(Internal spelling and cut-offs to confirm.)* | HenseiCycle, HenseiRequest |
| **Hensei / Hansei Planner** | Runs the Australian side of the Hensei cycle and facilitates the monthly SIOP/Hansei meeting | Employee (businessRole) |
| **SIOP** | Sales, Inventory & Operations Planning — the S&OP process Hensei feeds | MachineDemandForecast |
| **Inventory Zero** | Komatsu programme to minimise distributor machine and parts stock by "making the right quantity of what sells" | MachineDemandForecast, StockingPolicy |
| **Factory order** | Confirmed order on a Komatsu factory for one machine, from an allocated Hensei request | FactoryOrder |
| **Change of destination** | Formal request to re-allocate a pipeline or stock machine to a different branch/customer *(to confirm)* | EquipmentUnit, SalesOrderLine |
| **PDI** | **Pre-delivery inspection**: base assembly, fitting customer-specified local options and compliance items to SWP installation guides, testing and sign-off before delivery | PDIJob, InspectionResult |
| **Utility Central** | The PDI area at Fairfield for compact/utility equipment | Branch, WorkshopBay |
| **SWP** | Safe Work Procedure (installation guides used in PDI and service) | StandardJob |
| **Mine spec / MDG 15** | NSW mining guideline for mobile plant (fire suppression, isolation, access…) that drives local fit-out for mine sites | MachineOption (complianceStandard) |
| **OE build** | Original-equipment build of mining machines (e.g. longwall at Rutherford, ultra-class truck assembly at Wacol/Welshpool) | PDIJob (pdiType) *(to confirm)* |
| **Handover / delivery** | Delivering a machine to the customer: operator familiarisation, warranty registration, KOMTRAX activation | MachineHandover |
| **Customer Project Coordinator** | Manages machine orders from enquiry to delivery | MachineHandover owner |
| **Komplimentary Maintenance** | Australian equivalent of global *Komatsu CARE*: free scheduled servicing for 3 years / 2,000 hours (500–2,000 h services) including KOWA; construction-class machines | ServiceContract, MaintenancePlan |
| **Maintenance Contract Agreement (MCA)** | Guaranteed **cost per operating hour** maintenance contract (12 months to machine life) | ServiceContract |
| **MARC** | Maintenance And Repair Contract (fixed fee plus parts per hour). Used by other Komatsu distributors; Australian use *to confirm* | ServiceContract |
| **Premium Warranty** | Extended machine warranty, 36 months / 6,000 hours | WarrantyCoverage |
| **Long Haul Support** | Extended powertrain warranty for selected large loaders and trucks (up to 10 years / 20,000 h; 15 y / 30,000 h with tiered rebuild) | WarrantyCoverage |
| **Parts Plus Warranty** | 24 months / 4,000 h on genuine parts fitted by Komatsu | WarrantyCoverage |
| **Premium Used / KVUES** | Certified used machines with 12 months / 2,000 h powertrain warranty; KVUES is the used-equipment appraisal system | TradeIn, WarrantyCoverage |
| **Tiered Rebuild (Gold / Silver / Bronze)** | Graded rebuild scopes for machines and components | RemanJob (rebuildType), ServiceContract |
| **PM Clinic** | Preventive-maintenance inspection with a condition report | StandardJob (jobCategory) |
| **OFR** | Optimal Fleet Recommendation (fleet sizing and replacement advice) | Opportunity *(future)* |
| **PIP** | **Product Improvement Program**: factory campaign or retrofit to be completed on affected serial numbers | ServiceCampaign |
| **REMAN / CEP** | Remanufacturing / **Component Exchange Program**: exchange a failed component for a remanufactured one | RemanJob, CoreReturn |
| **Core** | The failed component returned after an exchange sale | Component, CoreReturn |
| **Core deposit / core credit** | Surcharge paid on the exchange sale and refunded (fully or partly) after core inspection *(terms to confirm)* | CoreReturn |
| **PCR** | Planned Component Replacement: replacing major components at a target life | Component (lifeTargetHours) |
| **VOR / machine down** | Emergency parts order for a machine that cannot work *(internal code to confirm)* | SalesOrder (orderPriority), PurchaseOrder (poType) |
| **Supersession** | A part number replaced by a newer one (one-way, two-way, kit, reman alternate) | PartInterchange |
| **GET** | Ground Engaging Tools (teeth, adapters, cutting edges). Brands include Komatsu, Hensley, KVX | Part (partCategory, brand) |
| **Parts Interpreter** | Branch parts specialist: parts books, quotes, orders, transfers | Employee |
| **Consignment stock** | Komatsu-owned stock held at a customer mine site *(to confirm)* | Warehouse (Consignment Site) |
| **KOMTRAX / KOMTRAX Plus** | Komatsu telematics (Plus = mining). Provides hours, fuel, location, cautions/faults, via ISO 15143-3 | TelematicsReading, MachineAlert |
| **SMR / SMU** | Service meter reading / service meter units (hour meter) | MeterReading, EquipmentUnit.smrHours |
| **CMS** | Condition Monitoring Services | OilSample |
| **KOWA** | Komatsu Oil Wear Analysis (fluid sampling) | OilSample |
| **LIMC** | Lab data system for oil/fluid samples | OilSample binding |
| **myKomatsu** | Customer parts portal | PortalUser, SalesOrder (orderChannel) |
| **myFleet** | Customer fleet portal combining KOMTRAX, CMS and equipment-care data | PortalUser |
| **Smart Construction / iMC / KomVision / FrontRunner** | Digital jobsite suite / intelligent machine control / 360° cameras / autonomous haulage | MachineOption (Technology) |
| **Ultra-class** | Very large mining haul trucks (~290 t+ payload) | MachineModel |

## Organisation and footprint

| Term | Meaning | Entity |
|---|---|---|
| **KAPL** | Komatsu Australia Pty Ltd | — (legal entity / `dataareaid`) |
| **KACF** | Komatsu Australia Corporate Finance (captive finance) | FinanceAgreement |
| **KMC** | Komatsu Mining Corp (ex-Joy Global: P&H, Joy) | Factory, Supplier |
| **KFA** | Komatsu Forklift Australia (out of scope for v0.1) | — |
| **Wacol** | QLD site: parts distribution centre, reman centre, mining division head office and truck assembly | Branch, Warehouse |
| **Welshpool** | WA site: reman centre, truck assembly, training | Branch |
| **Fairfield (East)** | NSW head office; Utility Central PDI | Branch |
| **Truganina** | VIC rental and remarketing hub | Branch (Rental and Remarketing Hub) |
| **Rutherford** | NSW mining site (rebuilds, longwall builds) | Branch |

## Systems

| Term | Meaning |
|---|---|
| **D365 CE / Dataverse** | Dynamics 365 Customer Engagement (Sales, Customer Service, Field Service) on Dataverse |
| **D365 F&O** | Dynamics 365 Finance and Supply Chain Management |
| **Annata 365 (A365, formerly IDMS)** | Equipment dealer management add-on: device master, equipment sales, work orders, warranty, rental, parts. F&O tables use the `AM*` prefix; the Dataverse side follows the CDM for Automotive (`msauto_*`) |
| **Device (Annata)** | A serialised unit. Its number is an F&O inventory dimension, so stock can be tracked per unit → `EquipmentUnit` |
| **Job list / operation code (Annata)** | Standard job template / flat-rate labour code → `StandardJob` / `WorkOrderJob.operationCode` |
| **Claim codes (Annata)** | Symptom / cause / resolution / failure codes on warranty claims → `FailureMode` |
| **Dual-write** | Near-real-time sync between F&O and Dataverse (customers, products, sales orders…) |
| **Link to Fabric** | Dataverse feature that exposes Dataverse (and selected F&O) tables in a Fabric lakehouse |
| **Power Pages** | Microsoft's portal platform on Dataverse (web roles `mspp_webrole`) |
| **AS400** | Legacy IBM platform historically used for parts ordering *(current status to confirm)* |

## Standards and acronyms

| Term | Meaning |
|---|---|
| **ISO 6165** | Earth-moving machinery — basic types (dozer, loader, excavator, dumper, grader…) |
| **ISO 10261 / PIN** | 17-character product identification number: 3 manufacturer code + 5 descriptor + 1 check + 8 serial |
| **ISO 15143-3 / AEMP 2.0** | Telematics API standard: equipment snapshot (hours, idle, fuel, DEF, location, loads, payload) and fault codes |
| **SAE J1939 SPN / FMI / OC** | Diagnostic trouble code parts: suspect parameter number, failure mode identifier, occurrence count |
| **ISO 14224** | Reliability and maintenance data: equipment taxonomy (level 6 unit, 7 subunit, 8 maintainable item) and failure-mode / mechanism / cause codes |
| **ISO 55000** | Asset management vocabulary and system |
| **IOF / BFO** | Industrial Ontologies Foundry reference ontologies built on the Basic Formal Ontology (ISO/IEC 21838-2) |
| **MIMOSA CCOM** | Common Conceptual Object Model for asset management (Asset, Segment, WorkOrder, SolutionPackage…) |
| **GS1 GTIN / GLN / SSCC / GIAI / GRAI** | Product, location, logistic-unit, individual-asset and returnable-asset identifiers |
| **EPCIS / CBV** | GS1 event standard and its Core Business Vocabulary (business steps, dispositions) |
| **SCOR DS** | ASCM supply-chain reference model: Orchestrate, Plan, Order, Source, Transform, Fulfill, Return |
| **APQC PCF** | Cross-industry process classification framework (4.0 Supply Chain, 5.0 Deliver Services, 6.0 Customer Service) |
| **UNSPSC** | Product classification (e.g. 22101526 track excavators, 22101700 heavy-equipment components) |
| **HS / tariff code** | Customs classification (8429 earth-moving machines, 8431 parts, 8704.10 dumpers) |
| **BMSB / NUFT** | Brown marmorated stink bug seasonal biosecurity measures (1 Sep–30 Apr) / new, unused, field-tested exemption |
| **HVNL / OSOM** | Heavy Vehicle National Law / oversize-overmass permits for moving large machines by road |
| **ROPS / FOPS** | Roll-over / falling-object protective structures (ISO 3471 / ISO 3449) |
| **Incoterms 2020** | Trade delivery terms (FOB, CIF, DAP…) |
