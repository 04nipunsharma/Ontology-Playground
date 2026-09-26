<!-- GENERATED FILE — do not edit by hand. Run `npm run komatsu:generate`. -->

# Komatsu Australia Enterprise Ontology — Data Dictionary

Version **0.1.0** · 71 entity types · 199 relationships · 11 modules

Bindings marked ⚠️ use table/column names that still need confirmation against the live
D365 / Annata 365 environment (see [open questions](open-questions.md)).

## Modules

| Module | Catalogue ID | Entities |
|---|---|---|
| Komatsu Australia Enterprise Ontology (full model) | `official/komatsu-au-enterprise` | 71 |
| 🚜 00 Equipment & Product Master | `official/komatsu-au-00-equipment-master` | MachineType, MachineModel, MachineOption, EquipmentUnit, Component, Part, PartInterchange, Factory, Supplier, Customer, CustomerSite, MeterReading, WarrantyCoverage |
| 🤝 01 Customer & Sales to Cash | `official/komatsu-au-01-customer-sales` | Customer, CustomerSite, Contact, SalesTerritory, Employee, Branch, PriceList, Opportunity, SalesQuote, SalesOrder, SalesOrderLine, TradeIn, FinanceAgreement, MachineHandover, CustomerInvoice, MachineModel, EquipmentUnit, Part, Warehouse |
| 🗓️ 02 Hensei & Machine Order-to-Delivery | `official/komatsu-au-02-hensei-order-to-delivery` | MachineDemandForecast, HenseiCycle, HenseiRequest, FactoryOrder, Factory, MachineModel, MachineOption, EquipmentUnit, Shipment, VesselVoyage, CustomsEntry, BiosecurityInspection, SalesOrder, PDIJob, MachineHandover, Supplier, Employee |
| 🔧 03 Pre-Delivery Inspection (PDI) | `official/komatsu-au-03-pdi` | PDIJob, EquipmentUnit, MachineOption, WorkshopBay, ResourceBooking, Technician, TimeEntry, InspectionResult, PartsRequirement, Part, SalesOrder, Branch, Employee, Shipment, BiosecurityInspection, MachineHandover |
| 🔩 04 Parts Supply Chain & Procurement | `official/komatsu-au-04-parts-supply-chain` | Part, PartInterchange, Supplier, PurchaseAgreement, PurchaseOrder, PurchaseOrderLine, GoodsReceipt, Warehouse, InventoryPosition, TransferOrder, Shipment, CustomsEntry, SalesOrder, SalesOrderLine, PartsRequirement, Branch, Customer |
| 📊 05 Demand & Supply Planning | `official/komatsu-au-05-planning` | PartsDemandForecast, StockingPolicy, PlanningRun, PlannedOrder, InventoryPosition, Part, Warehouse, Supplier, PurchaseOrder, TransferOrder, PartsRequirement, Employee, MachineDemandForecast, HenseiCycle, MachineModel |
| 🛠️ 06 Service & Technicians | `official/komatsu-au-06-service-technicians` | WorkOrder, WorkOrderJob, StandardJob, MaintenancePlan, Technician, Skill, ResourceBooking, TimeEntry, WorkshopBay, FailureMode, EquipmentUnit, Component, Customer, CustomerSite, Branch, PartsRequirement, Part, SalesQuote, CustomerInvoice, Employee |
| 📃 07 Contracts & Warranty | `official/komatsu-au-07-contracts-warranty` | ServiceContract, ContractEntitlement, WarrantyCoverage, WarrantyClaim, ServiceCampaign, RentalAgreement, FailureMode, EquipmentUnit, Component, Customer, CustomerSite, WorkOrder, MaintenancePlan, Factory, Supplier, Part, PriceList, Employee, CustomerInvoice, MachineModel |
| 🔄 08 Remanufacturing (REMAN) | `official/komatsu-au-08-reman` | Component, CoreReturn, RemanJob, Part, SalesOrder, Customer, CustomerInvoice, Warehouse, Branch, PartsRequirement, ResourceBooking, TimeEntry, FailureMode, WarrantyCoverage, EquipmentUnit, WorkOrderJob |
| 🎧 09 Customer Support & Portal | `official/komatsu-au-09-customer-support` | SupportCase, PortalUser, Contact, Customer, EquipmentUnit, SalesOrder, WorkOrder, ServiceContract, ContractEntitlement, MachineAlert, FaultCode, Employee |
| 📡 10 Telematics & Condition Monitoring | `official/komatsu-au-10-telematics-condition` | TelematicsReading, MeterReading, MachineAlert, FaultCode, OilSample, EquipmentUnit, Component, MachineModel, FailureMode, WorkOrder, SupportCase, MaintenancePlan |

## Entity overview

| Entity | Domain | Data owner | System of record | Fabric table | Standard alignment |
|---|---|---|---|---|---|
| 🏢 **Customer** | Customers, People & Organisation | Customer Master Data Steward (Sales Operations) | D365 F&O | `lh_d365.dbo.custtable` | [schema.org: Organization](https://schema.org/Organization)<br>[W3C ORG: Organization](http://www.w3.org/ns/org#Organization)<br>[IOF Supply Chain: Customer](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Customer)<br>Microsoft CDM: Account |
| 📍 **CustomerSite** | Customers, People & Organisation | Customer Master Data Steward (Sales Operations) | D365 CE | `lh_d365.dbo.msdyn_functionallocation` ⚠️ | [schema.org: Place](https://schema.org/Place)<br>[W3C ORG: Site](http://www.w3.org/ns/org#Site)<br>ISO 14224: Installation / Plant (taxonomy levels 3–4)<br>Microsoft CDM: FunctionalLocation |
| 👤 **Contact** | Customers, People & Organisation | Sales Operations | D365 CE | `lh_d365.dbo.contact` | [schema.org: Person](https://schema.org/Person)<br>[schema.org: ContactPoint](https://schema.org/ContactPoint)<br>Microsoft CDM: Contact |
| 🏭 **Branch** | Customers, People & Organisation | Operations Finance (organisation structure) | D365 F&O | `lh_d365.dbo.inventsite` ⚠️ | [W3C ORG: OrganizationalUnit](http://www.w3.org/ns/org#OrganizationalUnit)<br>[W3C ORG: Site](http://www.w3.org/ns/org#Site)<br>[schema.org: LocalBusiness](https://schema.org/LocalBusiness) |
| 🗺️ **SalesTerritory** | Customers, People & Organisation | Sales Operations | D365 CE | `lh_d365.dbo.territory` | [schema.org: AdministrativeArea](https://schema.org/AdministrativeArea)<br>Microsoft CDM: Territory |
| 🧑‍💼 **Employee** | Customers, People & Organisation | People & Culture (HR master data) | D365 F&O | `lh_d365.dbo.hcmworker` ⚠️ | [schema.org: Person](https://schema.org/Person)<br>[W3C ORG: Membership](http://www.w3.org/ns/org#Membership)<br>[W3C ORG: Role](http://www.w3.org/ns/org#Role)<br>Microsoft CDM: Worker |
| 🏗️ **Supplier** | Customers, People & Organisation | Procurement | D365 F&O | `lh_d365.dbo.vendtable` | [schema.org: Organization](https://schema.org/Organization)<br>[IOF Supply Chain: Supplier](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Supplier)<br>[W3C ORG: Organization](http://www.w3.org/ns/org#Organization)<br>Microsoft CDM: Vendor |
| 🧭 **MachineType** | Product & Equipment Master | Product Marketing | Reference data | `lh_reference.dbo.machine_type` ⚠️ | ISO 6165: Earth-moving machinery — basic types<br>UNSPSC: 2210 Heavy construction machinery and equipment<br>[schema.org: ProductGroup](https://schema.org/ProductGroup) |
| 🚜 **MachineModel** | Product & Equipment Master | Product Marketing | Annata 365 (F&O) | `lh_d365.dbo.amdevicemodel` ⚠️ | [schema.org: ProductModel](https://schema.org/ProductModel)<br>MIMOSA CCOM: Model<br>[IOF Core: ProductSpecification](https://spec.industrialontologies.org/ontology/core/Core/ProductSpecification) |
| 🧩 **MachineOption** | Product & Equipment Master | Product Marketing | Annata 365 (F&O) | `lh_d365.dbo.amdeviceconfigoption` ⚠️ | [schema.org: Product](https://schema.org/Product)<br>[schema.org: isAccessoryOrSparePartFor](https://schema.org/isAccessoryOrSparePartFor) |
| 🏗️ **EquipmentUnit** | Product & Equipment Master | Equipment Administration (Annata device master) | Annata 365 (F&O) | `lh_d365.dbo.amdevicetable` ⚠️ | [schema.org: IndividualProduct](https://schema.org/IndividualProduct)<br>ISO 10261: Product identification number (PIN)<br>MIMOSA CCOM: Asset<br>ISO 14224: Equipment unit (taxonomy level 6)<br>[GS1 Web Vocabulary: IndividualAsset](https://gs1.org/voc/IndividualAsset)<br>Microsoft CDM: CustomerAsset |
| ⚙️ **Component** | Product & Equipment Master | Product Support / Component Management | Annata 365 (F&O) | `lh_d365.dbo.amdevicetable` ⚠️ | ISO 14224: Subunit / maintainable item (levels 7–8)<br>MIMOSA CCOM: Asset (installed on Segment)<br>[IOF Core: MaintainableMaterialItem](https://spec.industrialontologies.org/ontology/core/Core/MaintainableMaterialItem)<br>[GS1 Web Vocabulary: IndividualAsset](https://gs1.org/voc/IndividualAsset) |
| 🔩 **Part** | Product & Equipment Master | Parts Product Management | D365 F&O | `lh_d365.dbo.inventtable` | [schema.org: Product](https://schema.org/Product)<br>[GS1 Web Vocabulary: Product](https://gs1.org/voc/Product)<br>UNSPSC: 22101700 Heavy equipment components<br>[IOF Core: MaterialProduct](https://spec.industrialontologies.org/ontology/core/Core/MaterialProduct)<br>Microsoft CDM: ReleasedProduct |
| 🔁 **PartInterchange** | Product & Equipment Master | Parts Product Management | Annata 365 (F&O) | `lh_d365.dbo.amitemsupersession` ⚠️ | OAGIS: ItemMaster / Supersession<br>ECLASS: successor product |
| 🏭 **Factory** | Hensei & Factory Ordering | Hensei Planner (Machine Supply) | Komatsu factory systems | `lh_reference.dbo.factory` ⚠️ | [W3C ORG: Site](http://www.w3.org/ns/org#Site)<br>[schema.org: Organization](https://schema.org/Organization)<br>[IOF Supply Chain: Manufacturer](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Manufacturer) |
| 📈 **MachineDemandForecast** | Hensei & Factory Ordering | Machine Supply Planning / S&OP | D365 F&O | `lh_d365.dbo.forecastsales` ⚠️ | ASCM SCOR DS: Plan: Plan Supply Chain (demand plan)<br>APQC PCF: 4.1 Plan for and align supply chain resources |
| 🗓️ **HenseiCycle** | Hensei & Factory Ordering | Hensei Planner (Machine Supply) | Komatsu factory systems | `lh_reference.dbo.hensei_cycle` ⚠️ | ASCM SCOR DS: Source: Schedule product deliveries<br>APQC PCF: 4.2.2 Plan procurement / order management |
| 📝 **HenseiRequest** | Hensei & Factory Ordering | Hensei Planner (Machine Supply) | Komatsu factory systems | `lh_reference.dbo.hensei_request` ⚠️ | [schema.org: Order](https://schema.org/Order)<br>ASCM SCOR DS: Source: Schedule product deliveries |
| 🧾 **FactoryOrder** | Hensei & Factory Ordering | Hensei Planner (Machine Supply) | D365 F&O | `lh_d365.dbo.purchtable` ⚠️ | [schema.org: Order](https://schema.org/Order)<br>OAGIS: PurchaseOrder (intercompany)<br>ASCM SCOR DS: Source: Schedule product deliveries |
| 🎯 **Opportunity** | Sales to Cash | Sales Operations | D365 CE | `lh_d365.dbo.opportunity` | Microsoft CDM: Opportunity<br>[schema.org: Demand](https://schema.org/Demand) |
| 💬 **SalesQuote** | Sales to Cash | Sales Operations | D365 CE | `lh_d365.dbo.quote` | [schema.org: Offer](https://schema.org/Offer)<br>Microsoft CDM: Quote |
| 🛒 **SalesOrder** | Sales to Cash | Sales Administration / Parts Operations | D365 F&O | `lh_d365.dbo.salestable` | [schema.org: Order](https://schema.org/Order)<br>OAGIS: SalesOrder<br>Microsoft CDM: SalesOrder<br>ASCM SCOR DS: Order: Receive and validate order |
| 📄 **SalesOrderLine** | Sales to Cash | Sales Administration / Parts Operations | D365 F&O | `lh_d365.dbo.salesline` | [schema.org: OrderItem](https://schema.org/OrderItem)<br>Microsoft CDM: SalesOrderLine |
| ♻️ **TradeIn** | Sales to Cash | Used Equipment Manager | Annata 365 (F&O) | `lh_d365.dbo.amtradein` ⚠️ | [schema.org: Offer](https://schema.org/Offer)<br>[schema.org: OwnershipInfo](https://schema.org/OwnershipInfo) |
| 🏦 **FinanceAgreement** | Sales to Cash | Komatsu Finance | KACF finance system | `lh_reference.dbo.finance_agreement` ⚠️ | [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract)<br>[FIBO: LoanContract](https://spec.edmcouncil.org/fibo/ontology/LOAN/LoansGeneral/Loans/Loan) |
| 🏷️ **PriceList** | Sales to Cash | Pricing Manager | D365 F&O | `lh_d365.dbo.pricediscgroup` | [schema.org: PriceSpecification](https://schema.org/PriceSpecification)<br>Microsoft CDM: PriceList |
| 💵 **CustomerInvoice** | Sales to Cash | Accounts Receivable | D365 F&O | `lh_d365.dbo.custinvoicejour` | [schema.org: Invoice](https://schema.org/Invoice)<br>UN/CEFACT: Cross Industry Invoice<br>Microsoft CDM: Invoice |
| 🤝 **MachineHandover** | Sales to Cash | Customer Project Coordinator | Annata 365 (F&O) | `lh_d365.dbo.amdevicedelivery` ⚠️ | [schema.org: ParcelDelivery](https://schema.org/ParcelDelivery)<br>[GS1 Web Vocabulary: CBV bizStep: commissioning / accepting](https://gs1.org/voc/CBV bizStep: commissioning / accepting)<br>ASCM SCOR DS: Fulfill: Install product |
| 🚢 **Shipment** | Import & Logistics | Logistics Coordinator | D365 F&O | `lh_d365.dbo.whsshipmenttable` ⚠️ | [schema.org: ParcelDelivery](https://schema.org/ParcelDelivery)<br>[GS1 Web Vocabulary: SSCC (logistic unit)](https://gs1.org/voc/SSCC (logistic unit))<br>UN/CEFACT: Consignment<br>OAGIS: Shipment<br>ASCM SCOR DS: Fulfill: Transport product |
| ⚓ **VesselVoyage** | Import & Logistics | Logistics Coordinator | D365 F&O | `lh_d365.dbo.itmtable` ⚠️ | UN/CEFACT: Transport Movement<br>[schema.org: Trip](https://schema.org/Trip) |
| 🛃 **CustomsEntry** | Import & Logistics | Logistics Coordinator | Customs broker (ICS) | `lh_reference.dbo.customs_entry` ⚠️ | WCO Data Model: Goods Declaration<br>Harmonized System: 8429 / 8431 |
| 🐞 **BiosecurityInspection** | Import & Logistics | Logistics Coordinator | Reference data | `lh_reference.dbo.biosecurity_inspection` ⚠️ | DAFF BICON: Machinery and equipment import conditions<br>[GS1 Web Vocabulary: CBV bizStep: inspecting](https://gs1.org/voc/CBV bizStep: inspecting) |
| 🔧 **PDIJob** | Pre-Delivery Inspection | PDI Planner | Annata 365 (F&O) | `lh_d365.dbo.amworkordertable` ⚠️ | [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess)<br>ISO 14224: Maintenance activity: inspection / modification<br>ASCM SCOR DS: Fulfill: Prepare product for delivery |
| ✅ **InspectionResult** | Pre-Delivery Inspection | Workshop Supervisor | Annata 365 (F&O) | `lh_d365.dbo.aminspectionline` ⚠️ | [IOF Core: Measurement](https://spec.industrialontologies.org/ontology/core/Core/Measurement)<br>MIMOSA CCOM: Measurement / Event |
| 🏬 **Warehouse** | Parts Supply Chain & Procurement | Parts Operations Manager | D365 F&O | `lh_d365.dbo.inventlocation` | [schema.org: Place](https://schema.org/Place)<br>[GS1 Web Vocabulary: GLN (location)](https://gs1.org/voc/GLN (location))<br>[IOF Supply Chain: StorageFacility](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/StorageFacility)<br>Microsoft CDM: Warehouse |
| 📦 **InventoryPosition** | Parts Supply Chain & Procurement | Parts Planner | D365 F&O | `lh_d365.dbo.inventsum` | IOF Supply Chain: Inventory<br>ASCM SCOR DS: Plan: Inventory position<br>Microsoft CDM: InventoryOnHand |
| 📑 **PurchaseOrder** | Parts Supply Chain & Procurement | Supply Planner / Procurement | D365 F&O | `lh_d365.dbo.purchtable` | [schema.org: Order](https://schema.org/Order)<br>OAGIS: PurchaseOrder<br>[IOF Supply Chain: PurchaseOrder](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/PurchaseOrder)<br>Microsoft CDM: PurchaseOrder<br>ASCM SCOR DS: Source: Issue purchase order |
| 🧾 **PurchaseOrderLine** | Parts Supply Chain & Procurement | Supply Planner / Procurement | D365 F&O | `lh_d365.dbo.purchline` | [schema.org: OrderItem](https://schema.org/OrderItem)<br>OAGIS: PurchaseOrderLine<br>Microsoft CDM: PurchaseOrderLine |
| 📜 **PurchaseAgreement** | Parts Supply Chain & Procurement | Procurement | D365 F&O | `lh_d365.dbo.agreementheader` ⚠️ | [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract)<br>OAGIS: PurchaseAgreement<br>Microsoft CDM: PurchaseAgreement |
| 📥 **GoodsReceipt** | Parts Supply Chain & Procurement | Parts Operations Manager | D365 F&O | `lh_d365.dbo.vendpackingslipjour` | OAGIS: ReceiveDelivery<br>[GS1 Web Vocabulary: CBV bizStep: receiving](https://gs1.org/voc/CBV bizStep: receiving)<br>ASCM SCOR DS: Source: Receive product |
| 🔀 **TransferOrder** | Parts Supply Chain & Procurement | Supply Planner | D365 F&O | `lh_d365.dbo.inventtransfertable` | OAGIS: InventoryMovement<br>[GS1 Web Vocabulary: CBV bizStep: shipping / receiving](https://gs1.org/voc/CBV bizStep: shipping / receiving)<br>ASCM SCOR DS: Fulfill: Transfer product |
| 🧰 **PartsRequirement** | Parts Supply Chain & Procurement | Service Coordinator / Parts Interpreter | Annata 365 (F&O) | `lh_d365.dbo.amworkorderitem` ⚠️ | [IOF Core: MaterialRequirement](https://spec.industrialontologies.org/ontology/core/Core/MaterialRequirement)<br>ASCM SCOR DS: Plan: Demand requirement |
| 📊 **PartsDemandForecast** | Demand & Supply Planning | Parts Planner | D365 F&O | `lh_d365.dbo.forecastsales` ⚠️ | ASCM SCOR DS: Plan: Demand plan<br>APQC PCF: 4.1.1 Develop demand forecast |
| 📐 **StockingPolicy** | Demand & Supply Planning | Parts Planner | D365 F&O | `lh_d365.dbo.reqitemtable` | ASCM SCOR DS: Plan: Inventory policy<br>APQC PCF: 4.5.2 Manage inventory |
| 🧮 **PlanningRun** | Demand & Supply Planning | Supply Planning Manager | D365 F&O | `lh_d365.dbo.reqplanversion` ⚠️ | ASCM SCOR DS: Plan: Balance supply and demand |
| 🗒️ **PlannedOrder** | Demand & Supply Planning | Supply Planner | D365 F&O | `lh_d365.dbo.reqpo` | ASCM SCOR DS: Plan: Planned order<br>ISA-95: Material requirement |
| 🏚️ **WorkshopBay** | Service & Technicians | Workshop Manager | D365 CE | `lh_d365.dbo.bookableresource` ⚠️ | [IOF Core: Facility](https://spec.industrialontologies.org/ontology/core/Core/Facility)<br>ISA-95: Equipment (work unit)<br>Microsoft CDM: BookableResource (facility) |
| 🛠️ **WorkOrder** | Service & Technicians | Service Coordinator | Annata 365 (F&O) | `lh_d365.dbo.amworkordertable` ⚠️ | [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess)<br>MIMOSA CCOM: WorkOrder<br>ISO 14224: Maintenance record<br>Microsoft CDM: WorkOrder |
| 🔨 **WorkOrderJob** | Service & Technicians | Service Coordinator | Annata 365 (F&O) | `lh_d365.dbo.amworkorderjob` ⚠️ | [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess)<br>ISO 14224: Maintenance activity<br>Microsoft CDM: WorkOrderIncident |
| 📘 **StandardJob** | Service & Technicians | Service Engineering | Annata 365 (F&O) | `lh_d365.dbo.amjoblist` ⚠️ | [IOF Core: MaintenancePlanSpecification](https://spec.industrialontologies.org/ontology/core/Core/MaintenancePlanSpecification)<br>ISO 14224: Maintenance activity type<br>Microsoft CDM: IncidentType |
| 🗓️ **MaintenancePlan** | Service & Technicians | Service Planner | Annata 365 (F&O) | `lh_d365.dbo.ammaintenanceplan` ⚠️ | [IOF Core: MaintenancePlan](https://spec.industrialontologies.org/ontology/core/Core/MaintenancePlan)<br>ISO 55000: Asset management plan<br>Microsoft CDM: AgreementBookingSetup |
| 👷 **Technician** | Service & Technicians | Service Manager | D365 CE | `lh_d365.dbo.bookableresource` | [schema.org: Person](https://schema.org/Person)<br>[IOF Core: MaintenanceTechnicianRole](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceTechnicianRole)<br>Microsoft CDM: BookableResource |
| 🎓 **Skill** | Service & Technicians | Technical Training | D365 CE | `lh_d365.dbo.characteristic` | [schema.org: DefinedTerm](https://schema.org/DefinedTerm)<br>ESCO: Skill / competence<br>Microsoft CDM: Characteristic |
| 📅 **ResourceBooking** | Service & Technicians | Service Planner / PDI Planner | D365 CE | `lh_d365.dbo.bookableresourcebooking` | [schema.org: Reservation](https://schema.org/Reservation)<br>Microsoft CDM: BookableResourceBooking |
| ⏱️ **TimeEntry** | Service & Technicians | Service Coordinator | D365 F&O | `lh_d365.dbo.projempltrans` ⚠️ | [schema.org: Action](https://schema.org/Action)<br>Microsoft CDM: TimeEntry |
| 💥 **FailureMode** | Service & Technicians | Reliability Engineering | Annata 365 (F&O) | `lh_d365.dbo.amwarrantyclaimcode` ⚠️ | ISO 14224: Failure mode / failure mechanism / failure cause<br>MIMOSA CCOM: FailureMode |
| 📃 **ServiceContract** | Contracts & Warranty | Contracts Administrator | Annata 365 (F&O) | `lh_d365.dbo.amcontracttable` ⚠️ | [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract)<br>[schema.org: Service](https://schema.org/Service)<br>ISO 55000: Service level agreement<br>Microsoft CDM: Agreement |
| 🎟️ **ContractEntitlement** | Contracts & Warranty | Contracts Administrator | D365 CE | `lh_d365.dbo.entitlement` | [schema.org: Offer](https://schema.org/Offer)<br>Microsoft CDM: Entitlement |
| 🛡️ **WarrantyCoverage** | Contracts & Warranty | Warranty Administrator | Annata 365 (F&O) | `lh_d365.dbo.amdevicewarranty` ⚠️ | [schema.org: WarrantyPromise](https://schema.org/WarrantyPromise) |
| 📨 **WarrantyClaim** | Contracts & Warranty | Warranty Administrator | Annata 365 (F&O) | `lh_d365.dbo.amwarrantyclaimtable` ⚠️ | ISO 14224: Failure event record<br>[schema.org: WarrantyPromise](https://schema.org/WarrantyPromise) |
| 📢 **ServiceCampaign** | Contracts & Warranty | Warranty Administrator / Product Support | Annata 365 (F&O) | `lh_d365.dbo.amcampaigntable` ⚠️ | ACCC Product Safety: Recall<br>[schema.org: Action](https://schema.org/Action) |
| 🔑 **RentalAgreement** | Contracts & Warranty | Rental Manager | Annata 365 (F&O) | `lh_d365.dbo.amrentalordertable` ⚠️ | [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract)<br>[schema.org: RentAction](https://schema.org/RentAction) |
| 📦 **CoreReturn** | Remanufacturing (REMAN) | Reman Coordinator | D365 F&O | `lh_d365.dbo.salestable` ⚠️ | [GS1 Web Vocabulary: GRAI (returnable asset)](https://gs1.org/voc/GRAI (returnable asset))<br>OAGIS: ReturnMaterialAuthorization<br>ASCM SCOR DS: Return: Return product |
| 🔄 **RemanJob** | Remanufacturing (REMAN) | Reman Centre Manager | Annata 365 (F&O) | `lh_d365.dbo.amworkordertable` ⚠️ | [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess)<br>ISO 14224: Maintenance activity: overhaul<br>ASCM SCOR DS: Transform: Remanufacture<br>[GS1 Web Vocabulary: CBV bizStep: repairing](https://gs1.org/voc/CBV bizStep: repairing) |
| 🎧 **SupportCase** | Customer Support & Portal | Customer Support Manager | D365 CE | `lh_d365.dbo.incident` | Microsoft CDM: Case (incident)<br>[schema.org: Action](https://schema.org/Action) |
| 🌐 **PortalUser** | Customer Support & Portal | Digital Channels Manager | Power Pages portal | `lh_d365.dbo.contact` ⚠️ | [schema.org: Person](https://schema.org/Person)<br>W3C VCard / FOAF: OnlineAccount |
| 📡 **TelematicsReading** | Telematics & Condition Monitoring | Digital Solutions (KOMTRAX) | KOMTRAX | `eh_komtrax.machine_snapshots` ⚠️ | ISO 15143-3: Fleet snapshot (CumulativeOperatingHours, FuelUsed, Location)<br>MIMOSA CCOM: Measurement<br>[schema.org: Observation](https://schema.org/Observation) |
| 🔢 **MeterReading** | Telematics & Condition Monitoring | Equipment Administration | Annata 365 (F&O) | `lh_d365.dbo.amdevicemeterreading` ⚠️ | MIMOSA CCOM: Measurement<br>[schema.org: QuantitativeValue](https://schema.org/QuantitativeValue) |
| 🚨 **MachineAlert** | Telematics & Condition Monitoring | Digital Solutions (KOMTRAX) | D365 CE | `lh_d365.dbo.msdyn_iotalert` ⚠️ | ISO 15143-3: Fault codes / caution messages<br>MIMOSA CCOM: Event<br>Microsoft CDM: IoTAlert |
| ⚠️ **FaultCode** | Telematics & Condition Monitoring | Product Support Engineering | KOMTRAX | `lh_reference.dbo.fault_code` ⚠️ | SAE J1939-73: Diagnostic Trouble Code (SPN + FMI)<br>ISO 15143-3: FaultCode |
| 🧪 **OilSample** | Telematics & Condition Monitoring | Condition Monitoring | LIMC (oil analysis lab) | `lh_reference.dbo.kowa_oil_sample` ⚠️ | ISO 14224: Condition monitoring<br>MIMOSA CCOM: Measurement<br>[schema.org: MedicalTest](https://schema.org/MedicalTest) |

## Customers, People & Organisation

### 🏢 Customer

An organisation that buys, rents or has Komatsu equipment serviced — from owner-operators to tier-one miners and government.

**Also known as:** Account (Dataverse) · Customer account (F&O) · Key account

**Data owner:** Customer Master Data Steward (Sales Operations)

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.custtable` · **Filter:** dataareaid = 'kau'

**Alternate table:** account (Dataverse, dual-write: accountnumber = accountnum)

**Standards:** [schema.org: Organization](https://schema.org/Organization) (closeMatch) · [W3C ORG: Organization](http://www.w3.org/ns/org#Organization) (closeMatch) · [IOF Supply Chain: Customer](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Customer) (closeMatch) · Microsoft CDM: Account (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `customerAccount` | string | 🔑 |  | `accountnum` | D365 customer account number (dual-written CE ↔ F&O) |
| `name` | string |  |  | `dirpartytable.name` | Registered or trading name |
| `abn` | string |  |  | `vatnum` | Australian Business Number |
| `segment` | enum |  | Construction, Utilities, Mining, Quarry, Forestry, Industrial, Government, Rental, Waste | `segmentid` | Primary market segment served |
| `customerTier` | enum |  | Strategic, Key Account, Fleet, Commercial, Owner-Operator, Cash | `custgroup` | Commercial tier driving coverage model and pricing |
| `state` | enum |  | NSW, VIC, QLD, WA, SA, TAS, NT, ACT |  | Head-office state |
| `creditLimit` | decimal |  | AUD | `creditmax` | Approved credit limit |
| `paymentTerms` | string |  |  | `paymtermid` | Payment terms code, e.g. 30 days EOM |
| `isOnCreditHold` | boolean |  |  | `blocked` | True when the account is blocked for new transactions |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `operatesSite` | CustomerSite | one-to-many | A customer operates one or more job, mine or depot sites |
| `inTerritory` | SalesTerritory | many-to-one | A customer is covered by one sales territory |
| `hasAccountManager` | Employee | many-to-one | A customer has a territory or key account manager |
| `assignedPriceList` | PriceList | many-to-one | A customer buys on an assigned price group |

### 📍 CustomerSite

A physical location where a customer operates equipment — a mine, quarry, construction project, depot or yard.

**Data owner:** Customer Master Data Steward (Sales Operations)

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.msdyn_functionallocation` · ⚠️ to confirm

**Standards:** [schema.org: Place](https://schema.org/Place) (closeMatch) · [W3C ORG: Site](http://www.w3.org/ns/org#Site) (closeMatch) · ISO 14224: Installation / Plant (taxonomy levels 3–4) (related) · Microsoft CDM: FunctionalLocation (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `siteId` | string | 🔑 |  | `msdyn_functionallocationid` | Functional location / delivery address identifier |
| `name` | string |  |  | `msdyn_name` | Site name, e.g. "Hunter Valley Operations — Pit 3" |
| `siteType` | enum |  | Mine Site, Underground Mine, Quarry, Construction Project, Depot, Yard, Forestry Coupe, Council Works |  | Kind of operating site |
| `state` | enum |  | NSW, VIC, QLD, WA, SA, TAS, NT, ACT |  | State the site is located in |
| `latitude` | double |  | deg | `msdyn_latitude` | WGS84 latitude |
| `longitude` | double |  | deg | `msdyn_longitude` | WGS84 longitude |
| `requiresSiteInduction` | boolean |  |  |  | True when technicians must hold a site induction before attending |
| `isRemote` | boolean |  |  |  | True for fly-in/fly-out or remote-area sites affecting travel and parts logistics |

### 👤 Contact

A person at a customer or supplier organisation that Komatsu deals with — fleet manager, buyer, operator or accounts payable.

**Data owner:** Sales Operations

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.contact`

**Standards:** [schema.org: Person](https://schema.org/Person) (closeMatch) · [schema.org: ContactPoint](https://schema.org/ContactPoint) (related) · Microsoft CDM: Contact (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `contactId` | string | 🔑 |  | `contactid` | Dataverse contact GUID |
| `fullName` | string |  |  | `fullname` | Full name |
| `jobTitle` | string |  |  | `jobtitle` | Job title |
| `contactRole` | enum |  | Owner, Fleet Manager, Maintenance Planner, Procurement, Accounts Payable, Site Supervisor, Operator, Safety | `accountrolecode` | Role the contact plays in the buying or service relationship |
| `email` | string |  |  | `emailaddress1` | Primary email address |
| `phone` | string |  |  | `telephone1` | Primary phone number |
| `marketingOptIn` | boolean |  |  | `donotbulkemail` | Consent to receive marketing communications |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `worksFor` | Customer | many-to-one | A contact works for a customer organisation |

### 🏭 Branch

A Komatsu Australia operating location — e.g. Fairfield East head office, Wacol DC and reman centre, Welshpool, Utility Central PDI, Truganina rental hub, or an on-site mine office.

**Data owner:** Operations Finance (organisation structure)

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.inventsite` · ⚠️ to confirm

**Standards:** [W3C ORG: OrganizationalUnit](http://www.w3.org/ns/org#OrganizationalUnit) (closeMatch) · [W3C ORG: Site](http://www.w3.org/ns/org#Site) (related) · [schema.org: LocalBusiness](https://schema.org/LocalBusiness) (broadMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `branchCode` | string | 🔑 |  | `siteid` | Operating unit / site code used as a financial dimension |
| `name` | string |  |  | `name` | Branch name, e.g. "Wacol" or "Welshpool" |
| `branchType` | enum |  | Head Office, Full Service Branch, Parts Outlet, Workshop, Reman Centre, Distribution Centre, Mine Site Office, Rental and Remarketing Hub, Training Centre, Oil Analysis Lab |  | Operating model of the location |
| `state` | enum |  | NSW, VIC, QLD, WA, SA, TAS, NT, ACT |  | State |
| `region` | string |  |  |  | Sales/service region the branch reports into |
| `hasWorkshop` | boolean |  |  |  | True when the branch has workshop bays for PDI or repair |

### 🗺️ SalesTerritory

A geographic and segment-based sales coverage area assigned to a territory manager.

**Data owner:** Sales Operations

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.territory`

**Standards:** [schema.org: AdministrativeArea](https://schema.org/AdministrativeArea) (related) · Microsoft CDM: Territory (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `territoryId` | string | 🔑 |  | `territoryid` | Territory identifier |
| `name` | string |  |  | `name` | Territory name, e.g. "NSW Hunter — Mining" |
| `segment` | enum |  | Construction, Utilities, Mining, Quarry, Forestry, Industrial, Government, Rental, Waste |  | Segment focus of the territory |
| `state` | enum |  | NSW, VIC, QLD, WA, SA, TAS, NT, ACT |  | State |
| `annualTarget` | decimal |  | AUD |  | Annual sales target |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `servicedByBranch` | Branch | many-to-one | A territory is supported by a home branch |

### 🧑‍💼 Employee

A Komatsu Australia worker acting in a business role — sales, planning, coordination, administration or support.

**Data owner:** People & Culture (HR master data)

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.hcmworker` · ⚠️ to confirm

**Standards:** [schema.org: Person](https://schema.org/Person) (closeMatch) · [W3C ORG: Membership](http://www.w3.org/ns/org#Membership) (related) · [W3C ORG: Role](http://www.w3.org/ns/org#Role) (related) · Microsoft CDM: Worker (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `personnelNumber` | string | 🔑 |  | `personnelnumber` | F&O worker personnel number |
| `fullName` | string |  |  | `name` | Full name |
| `businessRole` | enum |  | Sales Account Manager, Key Account Manager, National Business Manager, Product Support Rep, Customer Project Coordinator, Parts Interpreter, Customer Support Rep, Inventory and Demand Planner, Parts Planner, Supply Planner, Supply Chain Coordinator, Hensei Planner, PDI Planner, Service Coordinator, Maintenance Planner, Estimator, Regional Service Manager, Contracts Administrator, Warranty Administrator, Reman Coordinator, Logistics Coordinator, Branch Manager |  | Primary business role (drives data ownership and security roles) |
| `email` | string |  |  | `primarycontactemail` | Work email address |
| `isActive` | boolean |  |  |  | True while employed |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `managesTerritory` | SalesTerritory | one-to-many | A territory manager manages one or more territories |
| `basedAtBranch` | Branch | many-to-one | An employee is based at a branch |

### 🏗️ Supplier

An organisation Komatsu Australia buys from — Komatsu factories and parts depots, local OEM and aftermarket vendors, carriers, forwarders and customs brokers.

**Data owner:** Procurement

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.vendtable`

**Alternate table:** msdyn_vendor (Dataverse, dual-write)

**Standards:** [schema.org: Organization](https://schema.org/Organization) (closeMatch) · [IOF Supply Chain: Supplier](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Supplier) (closeMatch) · [W3C ORG: Organization](http://www.w3.org/ns/org#Organization) (closeMatch) · Microsoft CDM: Vendor (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `vendorAccount` | string | 🔑 |  | `accountnum` | F&O vendor account number |
| `name` | string |  |  | `dirpartytable.name` | Supplier name |
| `supplierType` | enum |  | Komatsu Factory, Komatsu Parts Depot, Intercompany, Local OEM, Aftermarket Vendor, Subcontractor, Transport Carrier, Freight Forwarder, Customs Broker | `vendgroup` | Role the supplier plays in the supply chain |
| `abn` | string |  |  | `vatnum` | Australian Business Number (local suppliers) |
| `countryCode` | string |  |  | `countryregionid` | ISO 3166 country of the supplying entity |
| `leadTimeDays` | integer |  | days |  | Standard replenishment lead time |
| `isPreferred` | boolean |  |  |  | Preferred supplier flag |
| `onTimeInFullPct` | decimal |  | % |  | Rolling on-time-in-full delivery performance |

## Product & Equipment Master

### 🧭 MachineType

A basic type of machine as classified by ISO 6165 (e.g. hydraulic excavator, crawler dozer, rigid dumper, grader).

**Data owner:** Product Marketing

**System of record:** Reference data · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.machine_type` · ⚠️ to confirm

**Standards:** ISO 6165: Earth-moving machinery — basic types (exactMatch) · UNSPSC: 2210 Heavy construction machinery and equipment (broadMatch) · [schema.org: ProductGroup](https://schema.org/ProductGroup) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `machineTypeCode` | string | 🔑 |  | `machine_type_code` | Internal machine type code |
| `name` | string |  |  | `name` | Type name, e.g. "Hydraulic excavator" |
| `iso6165Term` | string |  |  | `iso6165_term` | Matching ISO 6165 basic type term |
| `unspscCode` | string |  |  | `unspsc_code` | UNSPSC commodity code, e.g. 22101526 (track excavators) |
| `productLine` | enum |  | Construction, Utility, Surface Mining, Underground Mining, Forestry, Industrial | `product_line` | Komatsu product line the type belongs to |

### 🚜 MachineModel

A Komatsu machine model and series, e.g. PC210LC-11, D375A-8, WA500-8 or 930E-5, that units are built to.

**Also known as:** Device model (Annata) · Model code · Device class / model (CDM Automotive)

**Data owner:** Product Marketing

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicemodel` · ⚠️ to confirm

**Alternate table:** msauto_devicemodel / msauto_devicemodelcode (Dataverse)

**Standards:** [schema.org: ProductModel](https://schema.org/ProductModel) (exactMatch) · MIMOSA CCOM: Model (closeMatch) · [IOF Core: ProductSpecification](https://spec.industrialontologies.org/ontology/core/Core/ProductSpecification) (broadMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `modelCode` | string | 🔑 |  | `modelid` | Model and series code, e.g. PC210LC-11 |
| `series` | string |  |  | `modelcode` | Generation / dash number, e.g. -11 |
| `productLine` | enum |  | Construction, Utility, Surface Mining, Underground Mining, Forestry, Industrial |  | Product line |
| `operatingWeightKg` | decimal |  | kg | `operatingweight` | Nominal operating weight |
| `enginePowerKw` | decimal |  | kW | `enginepower` | Rated engine power |
| `powertrain` | enum |  | Diesel, Hybrid, Diesel-Electric, Battery-Electric, Trolley-Assist, Electric (cable) |  | Powertrain / energy source |
| `isCurrentModel` | boolean |  |  |  | True while the model is available to order |
| `listPrice` | decimal |  | AUD |  | Current recommended retail price (base spec) |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `isOfType` | MachineType | many-to-one | A model is of one ISO 6165 machine type |
| `producedAt` | Factory | many-to-one | A model is built at a source factory for Australia |

### 🧩 MachineOption

A factory option, locally fitted kit, attachment or Australian compliance item that configures a machine (e.g. fire suppression, mine-spec pack, tilt bucket).

**Also known as:** Configuration option (Annata) · Local option · Attachment · Fit-out kit

**Data owner:** Product Marketing

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdeviceconfigoption` · ⚠️ to confirm

**Alternate table:** msauto_configurationoption (Dataverse)

**Standards:** [schema.org: Product](https://schema.org/Product) (broadMatch) · [schema.org: isAccessoryOrSparePartFor](https://schema.org/isAccessoryOrSparePartFor) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `optionCode` | string | 🔑 |  | `optionid` | Option or kit code |
| `name` | string |  |  | `name` | Option name |
| `optionType` | enum |  | Factory Option, Local Fitment Kit, Attachment, Compliance Item, Technology (Smart Construction) | `optiontype` | How and where the option is supplied |
| `isMandatoryForAU` | boolean |  |  |  | Required for Australian compliance or site rules |
| `complianceStandard` | string |  |  |  | Standard satisfied, e.g. MDG 15, AS 2958.1, ISO 3471 ROPS |
| `fitmentHours` | decimal |  | hours |  | Standard fitment labour when fitted at PDI |
| `listPrice` | decimal |  | AUD |  | Recommended retail price |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `optionForModel` | MachineModel | many-to-many | An option or kit is available for one or more models |

### 🏗️ EquipmentUnit

An individual serialised machine (Annata "device") tracked from factory order through stock, PDI, delivery, service life, trade-in and disposal.

**Also known as:** Device (Annata) · Unit · Machine · Customer asset (Field Service) · Stock unit

**Data owner:** Equipment Administration (Annata device master)

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicetable` · ⚠️ to confirm

**Alternate table:** msauto_device (Dataverse) / msdyn_customerasset (Field Service)

**Standards:** [schema.org: IndividualProduct](https://schema.org/IndividualProduct) (exactMatch) · ISO 10261: Product identification number (PIN) (closeMatch) · MIMOSA CCOM: Asset (closeMatch) · ISO 14224: Equipment unit (taxonomy level 6) (closeMatch) · [GS1 Web Vocabulary: IndividualAsset](https://gs1.org/voc/IndividualAsset) (related) · Microsoft CDM: CustomerAsset (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `serialNumber` | string | 🔑 |  | `serialnumber` | Komatsu machine serial number |
| `pin` | string |  |  | `vin` | ISO 10261 17-character product identification number |
| `stockNumber` | string |  |  | `deviceid` | Internal stock / unit number while in Komatsu inventory |
| `unitStatus` | enum |  | On Order, In Production, In Transit, In Stock, In PDI, Ready for Delivery, Delivered, In Service, Rental Fleet, Used Stock, Sold, Scrapped | `devicestatus` | Lifecycle status of the unit |
| `ownershipType` | enum |  | Komatsu Stock, Customer Owned, Rental Fleet, Demonstrator, Consignment, Leased | `ownership` | Who owns the unit |
| `smrHours` | decimal |  | hours | `lastcountervalue` | Latest service meter reading |
| `yearOfManufacture` | integer |  |  | `modelyear` | Year the unit was built |
| `deliveryDate` | date |  |  | `deliverydate` | Date the unit was handed over to the first customer |
| `warrantyStartDate` | date |  |  | `warrantystartdate` | Start of the factory warranty period |
| `komtraxEnabled` | boolean |  |  |  | True when KOMTRAX / KOMTRAX Plus telematics is active |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `unitOfModel` | MachineModel | many-to-one | A unit is built to a model |
| `ownedBy` | Customer | many-to-one | A unit is owned by a customer (current owner) |
| `operatesAt` | CustomerSite | many-to-one | A unit currently operates at a customer site |
| `fittedWithOption` | MachineOption | many-to-many | A unit is configured with factory options and local fitments |
| `movedOnShipment` | Shipment | many-to-many | A unit is moved on import, transfer and delivery shipments |

### ⚙️ Component

A serialised major component (engine, transmission, final drive, pump, wheel motor…) that is installed on a unit, removed as a core and remanufactured.

**Also known as:** Major component · Child device (Annata device hierarchy) · Exchange component

**Data owner:** Product Support / Component Management

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicetable` · **Filter:** device class = major component (child of a machine device) · ⚠️ to confirm

**Alternate table:** msauto_devicecomponent (Dataverse)

**Standards:** ISO 14224: Subunit / maintainable item (levels 7–8) (closeMatch) · MIMOSA CCOM: Asset (installed on Segment) (closeMatch) · [IOF Core: MaintainableMaterialItem](https://spec.industrialontologies.org/ontology/core/Core/MaintainableMaterialItem) (broadMatch) · [GS1 Web Vocabulary: IndividualAsset](https://gs1.org/voc/IndividualAsset) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `componentSerial` | string | 🔑 |  | `serialnumber` | Component serial number |
| `componentType` | enum |  | Engine, Transmission, Torque Converter, Final Drive, Differential, Hydraulic Pump, Swing Machinery, Travel Motor, Wheel Motor, Alternator, Cylinder, Radiator, Axle | `deviceclass` | Kind of major component |
| `componentStatus` | enum |  | Installed, Removed - Core, In Rebuild, Reman Stock, Scrapped |  | Where the component is in its lifecycle |
| `installedDate` | date |  |  | `installeddate` | Date installed on the current unit |
| `hoursAtInstall` | decimal |  | hours |  | Unit SMR when installed |
| `componentHours` | decimal |  | hours |  | Hours accumulated by this component |
| `lifeTargetHours` | decimal |  | hours |  | Planned component replacement (PCR) life target |
| `rebuildCount` | integer |  |  |  | Number of times this component has been remanufactured |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `installedOn` | EquipmentUnit | many-to-one | A major component is installed on a unit |
| `isPartNumber` | Part | many-to-one | A serialised component is an instance of a part number |

### 🔩 Part

A stocked or orderable part number — Komatsu Genuine, reman exchange, filters, oils, GET, undercarriage, kits and approved aftermarket items.

**Also known as:** Item · Released product · Part number · SKU

**Data owner:** Parts Product Management

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.inventtable`

**Standards:** [schema.org: Product](https://schema.org/Product) (exactMatch) · [GS1 Web Vocabulary: Product](https://gs1.org/voc/Product) (closeMatch) · UNSPSC: 22101700 Heavy equipment components (broadMatch) · [IOF Core: MaterialProduct](https://spec.industrialontologies.org/ontology/core/Core/MaterialProduct) (broadMatch) · Microsoft CDM: ReleasedProduct (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `partNumber` | string | 🔑 |  | `itemid` | Komatsu or supplier part number |
| `description` | string |  |  | `namealias` | Part description |
| `brand` | string |  |  |  | Brand, e.g. Komatsu Genuine, Hensley, KVX |
| `partCategory` | enum |  | Genuine, Reman Exchange, Filter, Oil and Lubricant, Ground Engaging Tools, Undercarriage, Kit, Attachment, Aftermarket, Consumable |  | Commercial category |
| `lifecycleStatus` | enum |  | Active, Superseded, Obsolete, No Longer Available |  | Engineering / supply lifecycle status |
| `abcClass` | enum |  | A, B, C, D | `abcrevenue` | Value/velocity classification used by parts planning |
| `unitOfMeasure` | string |  |  | `unitid` | Stocking unit of measure |
| `listPrice` | decimal |  | AUD |  | Parts list price |
| `weightKg` | decimal |  | kg | `netweight` | Net weight |
| `hsCode` | string |  |  | `intracode` | Harmonized System tariff code for import (e.g. 8431.49) |
| `isSerialised` | boolean |  |  |  | True when each unit is serial-tracked (reman components, attachments) |
| `isDangerousGoods` | boolean |  |  |  | True for batteries, pressurised or flammable items |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `fitsModel` | MachineModel | many-to-many | A part is applicable to machine models (by serial range) |
| `primarySupplier` | Supplier | many-to-one | A part has a primary (default) supplier |

### 🔁 PartInterchange

A supersession, interchangeability or reman-alternate link from one part number to another.

**Also known as:** Supersession · Alternate part · Multi-level supersession (Annata)

**Data owner:** Parts Product Management

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amitemsupersession` · ⚠️ to confirm

**Standards:** OAGIS: ItemMaster / Supersession (related) · ECLASS: successor product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `interchangeId` | string | 🔑 |  | `recid` | Interchange record identifier |
| `interchangeType` | enum |  | One-way Supersession, Two-way Interchangeable, Reman Alternate, Kit Replacement | `supersessiontype` | Nature of the substitution |
| `effectiveDate` | date |  |  | `fromdate` | Date the interchange takes effect |
| `quantityRatio` | decimal |  |  |  | New-part quantity per old-part quantity |
| `useUpOldStock` | boolean |  |  |  | True when existing stock of the old part should be consumed first |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `replacesPart` | Part | many-to-one | An interchange record replaces an old part number |
| `withPart` | Part | many-to-one | An interchange record points to the new or alternate part number |

## Hensei & Factory Ordering

### 🏭 Factory

A Komatsu group manufacturing plant that builds machines or components for Australia (e.g. Awazu, Osaka, Ibaraki, Rayong, Jakarta, Peoria, Milwaukee).

**Data owner:** Hensei Planner (Machine Supply)

**System of record:** Komatsu factory systems · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.factory` · ⚠️ to confirm

**Standards:** [W3C ORG: Site](http://www.w3.org/ns/org#Site) (closeMatch) · [schema.org: Organization](https://schema.org/Organization) (related) · [IOF Supply Chain: Manufacturer](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/Manufacturer) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `factoryCode` | string | 🔑 |  | `factory_code` | Factory code used on factory orders |
| `name` | string |  |  | `name` | Plant name |
| `countryCode` | string |  |  | `country_code` | ISO 3166 country code |
| `legalEntity` | string |  |  | `legal_entity` | Komatsu group entity that invoices from this plant |
| `standardLeadTimeDays` | integer |  | days |  | Typical order-to-ship lead time |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `tradesAsSupplier` | Supplier | many-to-one | A factory is bought from through a Komatsu group vendor account |

### 📈 MachineDemandForecast

A monthly machine demand forecast by model and segment (S&OP) that feeds the Hensei order cycle.

**Data owner:** Machine Supply Planning / S&OP

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.forecastsales` · ⚠️ to confirm

**Standards:** ASCM SCOR DS: Plan: Plan Supply Chain (demand plan) (related) · APQC PCF: 4.1 Plan for and align supply chain resources (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `machineForecastId` | string | 🔑 |  | `recid` | Forecast record identifier |
| `forecastMonth` | date |  |  | `startdate` | Month the demand is expected |
| `segment` | enum |  | Construction, Utilities, Mining, Quarry, Forestry, Industrial, Government, Rental, Waste |  | Segment the demand comes from |
| `forecastUnits` | integer |  | units | `salesqty` | Forecast number of units |
| `forecastType` | enum |  | Statistical, Sales Input, Consensus, Committed Backlog |  | Forecast layer in the S&OP process |
| `forecastVersion` | string |  |  | `modelid` | S&OP cycle / version label |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `forecastsModel` | MachineModel | many-to-one | A machine forecast is for a model |
| `informsCycle` | HenseiCycle | many-to-one | Machine forecasts inform a Hensei cycle |

### 🗓️ HenseiCycle

A monthly Hensei cycle — Komatsu's HANSEI (販生, "sales + production") SIOP process — in which Komatsu Australia submits machine demand and orders to the factories and receives production allocations.

**Also known as:** Hansei · HANSEI (販生) · SIOP cycle · Monthly factory order cycle

**Data owner:** Hensei Planner (Machine Supply)

**System of record:** Komatsu factory systems · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.hensei_cycle` · ⚠️ to confirm

**Standards:** ASCM SCOR DS: Source: Schedule product deliveries (related) · APQC PCF: 4.2.2 Plan procurement / order management (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `henseiCycleId` | string | 🔑 |  | `hensei_cycle_id` | Cycle identifier, e.g. HEN-2026-10 |
| `cycleMonth` | date |  |  | `cycle_month` | Month the order submission belongs to |
| `productionMonth` | date |  |  | `production_month` | Target factory production month |
| `submissionDeadline` | date |  |  | `submission_deadline` | Cut-off for submitting requests to the factory |
| `status` | enum |  | Open, Submitted, Allocated, Confirmed, Closed | `status` | Cycle status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `includesRequest` | HenseiRequest | one-to-many | A Hensei cycle includes request lines |
| `coordinatedBy` | Employee | many-to-one | A Hensei cycle is run by a Hensei (Hansei) planner |

### 📝 HenseiRequest

A line in a Hensei submission requesting production slots for a model and specification — stock, customer-backed, rental fleet or demonstrator.

**Data owner:** Hensei Planner (Machine Supply)

**System of record:** Komatsu factory systems · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.hensei_request` · ⚠️ to confirm

**Standards:** [schema.org: Order](https://schema.org/Order) (broadMatch) · ASCM SCOR DS: Source: Schedule product deliveries (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `henseiRequestId` | string | 🔑 |  | `hensei_request_id` | Request line identifier |
| `specCode` | string |  |  | `spec_code` | Factory specification / option code set |
| `requestType` | enum |  | Stock, Customer Backed, Rental Fleet, Demonstrator, Mining Fleet Contract | `request_type` | Why the machine is being ordered |
| `requestedUnits` | integer |  | units | `requested_qty` | Units requested |
| `allocatedUnits` | integer |  | units | `allocated_qty` | Units allocated by the factory |
| `allocationStatus` | enum |  | Requested, Allocated, Partially Allocated, Deferred, Declined | `allocation_status` | Factory allocation outcome |
| `requestedShipMonth` | date |  |  |  | Month the machine is required ex-factory |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `requestsModel` | MachineModel | many-to-one | A Hensei request is for a model |
| `requestedFromFactory` | Factory | many-to-one | A Hensei request is placed with a factory |
| `backedBySalesOrder` | SalesOrder | many-to-one | A customer-backed request supports a machine sales order |

### 🧾 FactoryOrder

A confirmed machine order placed on a Komatsu factory for one unit, carrying the build specification, production month and planned ship date.

**Data owner:** Hensei Planner (Machine Supply)

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.purchtable` · **Filter:** purchpoolid = 'MACHINE' · ⚠️ to confirm

**Standards:** [schema.org: Order](https://schema.org/Order) (closeMatch) · OAGIS: PurchaseOrder (intercompany) (related) · ASCM SCOR DS: Source: Schedule product deliveries (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `factoryOrderNumber` | string | 🔑 |  | `purchid` | Factory order / intercompany purchase order number |
| `orderDate` | date |  |  | `accountingdate` | Date the order was placed on the factory |
| `productionMonth` | date |  |  |  | Allocated production month |
| `plannedShipDate` | date |  |  | `deliverydate` | Planned ex-factory (ETD) date |
| `status` | enum |  | Placed, Scheduled, In Production, Built, Shipped, Received, Cancelled | `purchstatus` | Factory order status |
| `fobCost` | decimal |  | AUD |  | Free-on-board cost from the factory |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `fulfilsRequest` | HenseiRequest | many-to-one | A factory order fulfils an allocated Hensei request |
| `placedWithFactory` | Factory | many-to-one | A factory order is placed with a factory |
| `producesUnit` | EquipmentUnit | one-to-one | A factory order produces one serialised unit |
| `specifiesOption` | MachineOption | many-to-many | A factory order specifies factory options |

## Sales to Cash

### 🎯 Opportunity

A qualified sales pursuit for machines, parts, service, contracts or reman — tracked through the pipeline in D365 Sales.

**Also known as:** Deal (Annata / CDM Automotive) · Pipeline opportunity

**Data owner:** Sales Operations

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.opportunity`

**Standards:** Microsoft CDM: Opportunity (exactMatch) · [schema.org: Demand](https://schema.org/Demand) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `opportunityId` | string | 🔑 |  | `opportunityid` | Dataverse opportunity GUID |
| `topic` | string |  |  | `name` | Opportunity topic |
| `opportunityType` | enum |  | New Machine, Used Machine, Fleet Tender, Parts Supply, Service Contract, Repair Quote, Reman, Technology |  | What is being sold |
| `salesStage` | enum |  | Qualify, Develop, Propose, Negotiate, Won, Lost | `stepname` | Pipeline stage |
| `estimatedValue` | decimal |  | AUD | `estimatedvalue` | Estimated revenue |
| `winProbability` | integer |  | % | `closeprobability` | Win probability |
| `estimatedCloseDate` | date |  |  | `estimatedclosedate` | Expected decision date |
| `primaryCompetitor` | string |  |  |  | Main competing brand (e.g. Caterpillar, Hitachi, Volvo, Liebherr) |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `opportunityFor` | Customer | many-to-one | An opportunity is with a customer |
| `ownedBySalesRep` | Employee | many-to-one | An opportunity is owned by a sales representative |
| `interestedInModel` | MachineModel | many-to-many | An opportunity is for one or more machine models |

### 💬 SalesQuote

A priced offer to a customer — machine deal, parts quote, repair estimate, contract proposal or reman exchange quote.

**Data owner:** Sales Operations

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.quote`

**Alternate table:** salesquotationtable (F&O, dual-write)

**Standards:** [schema.org: Offer](https://schema.org/Offer) (exactMatch) · Microsoft CDM: Quote (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `quoteNumber` | string | 🔑 |  | `quotenumber` | Quote number |
| `quoteType` | enum |  | Machine, Parts, Repair Estimate, Service Contract, Reman Exchange |  | What is being quoted |
| `revision` | integer |  |  | `revisionnumber` | Quote revision number |
| `status` | enum |  | Draft, Active, Won, Lost, Expired, Revised | `statuscode` | Quote status |
| `totalAmount` | decimal |  | AUD | `totalamount` | Total quoted amount excluding GST |
| `validUntil` | date |  |  | `effectiveto` | Quote expiry date |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `quoteForOpportunity` | Opportunity | many-to-one | A quote is issued against an opportunity |
| `quotedTo` | Customer | many-to-one | A quote is addressed to a customer |
| `quotesUnit` | EquipmentUnit | many-to-many | A machine quote offers specific stock or on-order units |

### 🛒 SalesOrder

A confirmed customer order — machine sale, parts order (stock, counter, online or machine-down VOR), reman exchange or internal order.

**Data owner:** Sales Administration / Parts Operations

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.salestable`

**Alternate table:** salesorder (Dataverse, dual-write)

**Standards:** [schema.org: Order](https://schema.org/Order) (exactMatch) · OAGIS: SalesOrder (closeMatch) · Microsoft CDM: SalesOrder (closeMatch) · ASCM SCOR DS: Order: Receive and validate order (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `salesOrderNumber` | string | 🔑 |  | `salesid` | F&O sales order number |
| `orderType` | enum |  | Machine Sale, Used Machine Sale, Parts Stock Order, Parts Counter, Parts Online, Parts VOR, Reman Exchange, Service Parts, Internal | `salespoolid` | Order type (sales pool) |
| `orderPriority` | enum |  | Standard, Urgent, Machine Down (VOR), Scheduled |  | Fulfilment priority |
| `orderChannel` | enum |  | Sales Rep, Parts Counter, Phone, Customer Portal, EDI, Contract Auto-replenish |  | Channel the order arrived through |
| `status` | enum |  | Open, Backordered, Delivered, Invoiced, Cancelled | `salesstatus` | Order status |
| `orderDate` | date |  |  | `createddatetime` | Order creation date |
| `requestedDate` | date |  |  | `shippingdaterequested` | Customer requested delivery date |
| `customerPoNumber` | string |  |  | `purchorderformnum` | Customer purchase order reference |
| `totalAmount` | decimal |  | AUD |  | Order total excluding GST |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `convertedFromQuote` | SalesQuote | many-to-one | A sales order is created from an accepted quote |
| `orderedBy` | Customer | many-to-one | A sales order is placed by a customer |
| `deliverToSite` | CustomerSite | many-to-one | A sales order is delivered to a customer site |
| `soldByBranch` | Branch | many-to-one | A sales order is booked to a selling branch |
| `hasSalesLine` | SalesOrderLine | one-to-many | A sales order has lines |

### 📄 SalesOrderLine

A line on a sales order for a quantity of a part or for a specific equipment unit.

**Data owner:** Sales Administration / Parts Operations

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.salesline`

**Standards:** [schema.org: OrderItem](https://schema.org/OrderItem) (exactMatch) · Microsoft CDM: SalesOrderLine (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `salesLineId` | string | 🔑 |  | `inventtransid` | Inventory transaction id of the line |
| `lineNumber` | integer |  |  | `linenum` | Line number |
| `quantity` | decimal |  |  | `salesqty` | Ordered quantity |
| `unitPrice` | decimal |  | AUD | `salesprice` | Net unit price |
| `lineAmount` | decimal |  | AUD | `lineamount` | Line amount excluding GST |
| `confirmedShipDate` | date |  |  | `shippingdateconfirmed` | Confirmed ship date |
| `lineStatus` | enum |  | Open, Reserved, Backordered, Picked, Shipped, Invoiced, Cancelled | `salesstatus` | Fulfilment status |
| `isBackordered` | boolean |  |  |  | True when the line cannot be filled from available stock |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `ordersPart` | Part | many-to-one | A parts line orders a part number |
| `allocatesUnit` | EquipmentUnit | many-to-one | A machine line allocates a specific unit |
| `shipsFromWarehouse` | Warehouse | many-to-one | A line is fulfilled from a warehouse |

### ♻️ TradeIn

A used machine taken in part-exchange on a machine deal, appraised (KVUES) and later resold as used or Premium Used equipment.

**Data owner:** Used Equipment Manager

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amtradein` · ⚠️ to confirm

**Alternate table:** msauto_tradein (Dataverse)

**Standards:** [schema.org: Offer](https://schema.org/Offer) (related) · [schema.org: OwnershipInfo](https://schema.org/OwnershipInfo) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `tradeInId` | string | 🔑 |  | `tradeinid` | Trade-in appraisal identifier |
| `make` | string |  |  | `make` | Manufacturer (any brand) |
| `model` | string |  |  | `model` | Model description |
| `tradeInSerial` | string |  |  | `serialnumber` | Serial number of the traded machine |
| `smrHours` | decimal |  | hours |  | Hours at appraisal |
| `appraisedValue` | decimal |  | AUD | `appraisalvalue` | Wholesale appraisal |
| `allowanceValue` | decimal |  | AUD | `tradeinvalue` | Allowance given to the customer |
| `status` | enum |  | Appraised, Accepted, Received, Refurbishing, Resold, Auctioned |  | Trade-in status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `tradedInOn` | SalesOrder | many-to-one | A trade-in is taken on a machine sales order |
| `becomesUsedUnit` | EquipmentUnit | one-to-one | An accepted trade-in becomes a used-stock unit |

### 🏦 FinanceAgreement

An equipment finance arrangement (e.g. through Komatsu Australia Corporate Finance) that funds a machine purchase.

**Data owner:** Komatsu Finance

**System of record:** KACF finance system · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.finance_agreement` · ⚠️ to confirm

**Standards:** [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract) (broadMatch) · [FIBO: LoanContract](https://spec.edmcouncil.org/fibo/ontology/LOAN/LoansGeneral/Loans/Loan) (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `financeAgreementId` | string | 🔑 |  | `contract_number` | Finance contract number |
| `financeType` | enum |  | Chattel Mortgage, Finance Lease, Operating Lease, Hire Purchase, Rent to Own | `finance_type` | Finance product |
| `financier` | string |  |  | `financier` | Financier, e.g. Komatsu Australia Corporate Finance or third-party bank |
| `amountFinanced` | decimal |  | AUD | `amount_financed` | Principal amount financed |
| `termMonths` | integer |  | months | `term_months` | Term |
| `interestRatePct` | decimal |  | % |  | Interest rate |
| `startDate` | date |  |  |  | Commencement date |
| `status` | enum |  | Application, Approved, Settled, Active, Paid Out, Declined | `status` | Agreement status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `financesOrder` | SalesOrder | one-to-many | A finance agreement funds one or more machine orders |
| `financedCustomer` | Customer | many-to-one | A finance agreement is with a customer |

### 🏷️ PriceList

A price group or trade agreement that sets machine, parts or labour prices for a set of customers or a contract.

**Data owner:** Pricing Manager

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.pricediscgroup`

**Standards:** [schema.org: PriceSpecification](https://schema.org/PriceSpecification) (closeMatch) · Microsoft CDM: PriceList (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `priceGroupId` | string | 🔑 |  | `groupid` | F&O price / discount group |
| `name` | string |  |  | `name` | Price list name |
| `priceListType` | enum |  | Parts List, Machine List, Labour Rates, Contract Pricing, Mining Fleet Agreement, Government Panel |  | What the price list governs |
| `validFrom` | date |  |  |  | Effective from |
| `validTo` | date |  |  |  | Effective to |
| `currencyCode` | string |  |  |  | ISO 4217 currency |

### 💵 CustomerInvoice

A tax invoice or credit note issued to a customer for machines, parts, service, contracts or core credits.

**Data owner:** Accounts Receivable

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.custinvoicejour`

**Standards:** [schema.org: Invoice](https://schema.org/Invoice) (exactMatch) · UN/CEFACT: Cross Industry Invoice (related) · Microsoft CDM: Invoice (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `invoiceNumber` | string | 🔑 |  | `invoiceid` | Invoice number |
| `invoiceDate` | date |  |  | `invoicedate` | Invoice date |
| `invoiceType` | enum |  | Machine, Parts, Service, Contract, Reman, Core Credit, Rental |  | Revenue stream |
| `invoiceAmount` | decimal |  | AUD | `salesbalance` | Amount excluding GST |
| `gstAmount` | decimal |  | AUD | `sumtax` | GST amount |
| `dueDate` | date |  |  | `duedate` | Payment due date |
| `paymentStatus` | enum |  | Open, Part Paid, Paid, Disputed, Written Off |  | Payment status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `invoicesSalesOrder` | SalesOrder | many-to-one | An invoice bills a sales order |
| `billedTo` | Customer | many-to-one | An invoice is billed to a customer |
| `invoicesWorkOrder` | WorkOrder | many-to-one | An invoice bills a work order |
| `invoicesContract` | ServiceContract | many-to-one | An invoice bills a contract period |
| `invoicesRental` | RentalAgreement | many-to-one | An invoice bills a rental period |

### 🤝 MachineHandover

The delivery and handover of a unit to the customer — operator familiarisation, warranty registration and KOMTRAX activation.

**Also known as:** Delivery · Machine delivery · Commissioning

**Data owner:** Customer Project Coordinator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicedelivery` · ⚠️ to confirm

**Standards:** [schema.org: ParcelDelivery](https://schema.org/ParcelDelivery) (broadMatch) · [GS1 Web Vocabulary: CBV bizStep: commissioning / accepting](https://gs1.org/voc/CBV bizStep: commissioning / accepting) (related) · ASCM SCOR DS: Fulfill: Install product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `handoverId` | string | 🔑 |  | `deliveryid` | Handover / delivery record identifier |
| `scheduledDate` | date |  |  | `planneddeliverydate` | Planned delivery date |
| `handoverDate` | date |  |  | `deliverydate` | Actual handover date |
| `smrAtHandover` | decimal |  | hours |  | Service meter at handover |
| `operatorTrainingDone` | boolean |  |  |  | Operator familiarisation completed |
| `warrantyRegistered` | boolean |  |  |  | Warranty registered with the factory |
| `komtraxActivated` | boolean |  |  |  | KOMTRAX subscription activated for the customer |
| `deliveryDocketNumber` | string |  |  |  | Signed delivery docket reference |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `handsOverUnit` | EquipmentUnit | many-to-one | A handover delivers a unit to its customer |
| `completesSalesOrder` | SalesOrder | many-to-one | A handover completes a machine sales order |
| `acceptedBy` | Contact | many-to-one | A handover is signed off by a customer contact |

## Import & Logistics

### 🚢 Shipment

A physical movement of machines or parts — inbound from a factory or depot, between warehouses, or outbound to a customer site.

**Data owner:** Logistics Coordinator

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.whsshipmenttable` · ⚠️ to confirm

**Standards:** [schema.org: ParcelDelivery](https://schema.org/ParcelDelivery) (broadMatch) · [GS1 Web Vocabulary: SSCC (logistic unit)](https://gs1.org/voc/SSCC (logistic unit)) (related) · UN/CEFACT: Consignment (closeMatch) · OAGIS: Shipment (closeMatch) · ASCM SCOR DS: Fulfill: Transport product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `shipmentId` | string | 🔑 |  | `shipmentid` | Shipment / consignment identifier |
| `direction` | enum |  | Inbound Import, Inbound Domestic, Transfer, Outbound Delivery, Return |  | Direction of movement |
| `transportMode` | enum |  | Ro-Ro Vessel, Breakbulk Vessel, Container, Air Freight, Road, Road (Oversize), Rail, Courier | `modecode` | Transport mode |
| `billOfLading` | string |  |  | `billofladingid` | Bill of lading / air waybill / con-note number |
| `incoterm` | string |  |  |  | Incoterms 2020 rule, e.g. FOB, CIF, DAP |
| `dispatchDate` | date |  |  |  | Date dispatched |
| `etaDate` | date |  |  |  | Estimated arrival date |
| `arrivalDate` | date |  |  |  | Actual arrival date |
| `status` | enum |  | Booked, In Transit, At Port, Held, Cleared, Delivered, Exception | `shipmentstatus` | Shipment status |
| `requiresOversizePermit` | boolean |  |  |  | True when the road leg needs an oversize/overmass (OSOM) permit under HVNL |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `carriedOnVoyage` | VesselVoyage | many-to-one | An import shipment is carried on a vessel voyage |
| `carriedBy` | Supplier | many-to-one | A shipment is carried by a carrier or forwarder |
| `shipsPurchaseOrder` | PurchaseOrder | many-to-many | An inbound shipment carries purchase orders |
| `deliversSalesOrder` | SalesOrder | many-to-many | An outbound shipment delivers sales orders |
| `movesTransfer` | TransferOrder | many-to-many | A shipment moves transfer orders between warehouses |
| `destinedFor` | Warehouse | many-to-one | An inbound or transfer shipment is destined for a warehouse |

### ⚓ VesselVoyage

A ship voyage carrying imported machines or containers from an origin port to an Australian port of discharge.

**Data owner:** Logistics Coordinator

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.itmtable` · ⚠️ to confirm

**Standards:** UN/CEFACT: Transport Movement (closeMatch) · [schema.org: Trip](https://schema.org/Trip) (broadMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `voyageId` | string | 🔑 |  | `shipid` | Voyage reference (vessel + voyage number) |
| `vesselName` | string |  |  | `vesselname` | Vessel name |
| `shippingLine` | string |  |  |  | Shipping line / operator |
| `portOfLoading` | string |  |  |  | Origin port (UN/LOCODE) |
| `portOfDischarge` | string |  |  |  | Australian discharge port (UN/LOCODE), e.g. AUPKL, AUBNE, AUFRE |
| `etdDate` | date |  |  | `shipdate` | Estimated departure |
| `etaDate` | date |  |  | `shipconfirmdate` | Estimated arrival |
| `arrivalDate` | date |  |  |  | Actual arrival |

### 🛃 CustomsEntry

An Australian Border Force import declaration (full import declaration) lodged by a customs broker to clear a shipment.

**Data owner:** Logistics Coordinator

**System of record:** Customs broker (ICS) · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.customs_entry` · ⚠️ to confirm

**Standards:** WCO Data Model: Goods Declaration (closeMatch) · Harmonized System: 8429 / 8431 (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `entryNumber` | string | 🔑 |  | `entry_number` | Import declaration number |
| `lodgementDate` | date |  |  | `lodgement_date` | Date lodged in the Integrated Cargo System |
| `tariffCode` | string |  |  | `tariff_code` | Principal tariff classification, e.g. 8429.52 (excavators) |
| `customsValue` | decimal |  | AUD |  | Customs value |
| `dutyAmount` | decimal |  | AUD | `duty_amount` | Customs duty payable |
| `gstAmount` | decimal |  | AUD | `gst_amount` | Import GST payable |
| `status` | enum |  | Lodged, Held, Cleared, Amended | `status` | Clearance status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `declaresShipment` | Shipment | many-to-one | An import declaration clears a shipment |
| `lodgedByBroker` | Supplier | many-to-one | An import declaration is lodged by a customs broker |

### 🐞 BiosecurityInspection

A Department of Agriculture biosecurity inspection or treatment of imported machinery (cleanliness, BMSB seasonal measures) before release.

**Data owner:** Logistics Coordinator

**System of record:** Reference data · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.biosecurity_inspection` · ⚠️ to confirm

**Standards:** DAFF BICON: Machinery and equipment import conditions (related) · [GS1 Web Vocabulary: CBV bizStep: inspecting](https://gs1.org/voc/CBV bizStep: inspecting) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `inspectionId` | string | 🔑 |  | `inspection_id` | Inspection / direction record identifier |
| `inspectionDate` | date |  |  | `inspection_date` | Date of inspection |
| `isBmsbSeason` | boolean |  |  | `is_bmsb_season` | True when brown marmorated stink bug seasonal measures apply |
| `treatment` | enum |  | None, Heat Treatment, Sulfuryl Fluoride, Methyl Bromide, Re-clean | `treatment` | Treatment applied |
| `result` | enum |  | Released, Directed to Re-clean, Directed to Treat, Export or Destroy | `result` | Inspection outcome |
| `cleaningCost` | decimal |  | AUD |  | Cost of cleaning / treatment |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `inspectsUnit` | EquipmentUnit | many-to-one | A biosecurity inspection is of an imported unit |
| `inspectsShipment` | Shipment | many-to-one | A biosecurity inspection relates to an import shipment |

## Pre-Delivery Inspection

### 🔧 PDIJob

A pre-delivery inspection and fitment job that prepares a unit for the customer — base assembly, option and compliance fit-out to SWP guides, testing and sign-off.

**Also known as:** PDI · PDI work order · Pre-delivery inspection · Utility Central PDI

**Data owner:** PDI Planner

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amworkordertable` · **Filter:** work order type = PDI · ⚠️ to confirm

**Alternate table:** msdyn_workorder / msauto_deviceinspection (Dataverse)

**Standards:** [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess) (related) · ISO 14224: Maintenance activity: inspection / modification (related) · ASCM SCOR DS: Fulfill: Prepare product for delivery (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `pdiJobNumber` | string | 🔑 |  | `workorderid` | PDI work order number |
| `pdiType` | enum |  | Standard PDI, Mine Spec Fit-out, Rental Prep, Used Machine Refurb, Demo Prep |  | Scope of the PDI |
| `status` | enum |  | Awaiting Unit, Planned, Scheduled, In Progress, On Hold - Parts, Quality Check, Completed | `workorderstatus` | PDI status |
| `plannedStart` | datetime |  |  | `plannedstartdatetime` | Planned start |
| `plannedFinish` | datetime |  |  | `plannedenddatetime` | Planned finish |
| `actualFinish` | datetime |  |  |  | Actual completion |
| `standardHours` | decimal |  | hours |  | Standard PDI and fitment hours |
| `actualHours` | decimal |  | hours |  | Actual labour hours booked |
| `customerRequiredDate` | date |  |  |  | Date the customer needs the machine delivered |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `pdiForUnit` | EquipmentUnit | many-to-one | A PDI job prepares a unit |
| `preparesForOrder` | SalesOrder | many-to-one | A PDI job prepares a unit for a customer order |
| `fitsOption` | MachineOption | many-to-many | A PDI job fits local options and compliance items |
| `scheduledInBay` | WorkshopBay | many-to-one | A PDI job is scheduled into a PDI bay |
| `plannedBy` | Employee | many-to-one | A PDI job is planned by a PDI planner |
| `pdiAtBranch` | Branch | many-to-one | A PDI job is performed at a branch workshop |
| `hasPdiCheck` | InspectionResult | one-to-many | A PDI job records checklist results |

### ✅ InspectionResult

The recorded outcome of one checklist item during a PDI or service inspection.

**Data owner:** Workshop Supervisor

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.aminspectionline` · ⚠️ to confirm

**Alternate table:** msdyn_inspectioninstance (Field Service)

**Standards:** [IOF Core: Measurement](https://spec.industrialontologies.org/ontology/core/Core/Measurement) (related) · MIMOSA CCOM: Measurement / Event (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `inspectionResultId` | string | 🔑 |  | `recid` | Checklist result identifier |
| `checkArea` | enum |  | Engine, Hydraulics, Electrical, Undercarriage, Cab and ROPS, Safety Systems, Fire Suppression, Compliance Labels, Telematics, Road Test |  | Area inspected |
| `checkItem` | string |  |  | `description` | Checklist item text |
| `outcome` | enum |  | Pass, Fail, Rectified, Not Applicable | `result` | Result |
| `comment` | string |  |  |  | Technician comment / measurement |
| `recordedOn` | datetime |  |  |  | When the result was recorded |

## Parts Supply Chain & Procurement

### 🏬 Warehouse

A stock-holding location — distribution centre (e.g. Wacol), branch store, mine-site consignment store, reman store, machine yard, quarantine or transit.

**Data owner:** Parts Operations Manager

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.inventlocation`

**Standards:** [schema.org: Place](https://schema.org/Place) (broadMatch) · [GS1 Web Vocabulary: GLN (location)](https://gs1.org/voc/GLN (location)) (related) · [IOF Supply Chain: StorageFacility](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/StorageFacility) (related) · Microsoft CDM: Warehouse (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `warehouseId` | string | 🔑 |  | `inventlocationid` | F&O warehouse id |
| `name` | string |  |  | `name` | Warehouse name |
| `warehouseType` | enum |  | National DC, Regional DC, Branch Store, Consignment Site, Reman Store, Machine Yard, Quarantine, Transit | `inventlocationtype` | Role in the network |
| `isWmsEnabled` | boolean |  |  | `whsenabled` | True when advanced warehouse management is enabled |
| `state` | enum |  | NSW, VIC, QLD, WA, SA, TAS, NT, ACT |  | State |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `warehouseOfBranch` | Branch | many-to-one | A warehouse is operated by a branch or DC |

### 📦 InventoryPosition

The stock position of a part at a warehouse — on hand, reserved, available, on order and backordered.

**Data owner:** Parts Planner

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.inventsum`

**Standards:** IOF Supply Chain: Inventory (related) · ASCM SCOR DS: Plan: Inventory position (related) · Microsoft CDM: InventoryOnHand (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `inventoryPositionId` | string | 🔑 |  | `inventdimid` | Part + warehouse (inventory dimension) key |
| `onHandQty` | decimal |  |  | `physicalinvent` | Physical on-hand quantity |
| `reservedQty` | decimal |  |  | `reservphysical` | Quantity reserved for orders |
| `availableQty` | decimal |  |  | `availphysical` | Available physical quantity |
| `onOrderQty` | decimal |  |  | `ordered` | Quantity on open purchase and transfer orders |
| `backorderQty` | decimal |  |  | `onorder` | Quantity owed to customers |
| `stockValue` | decimal |  | AUD |  | Inventory value at cost |
| `snapshotDate` | date |  |  |  | Date of the position snapshot |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `stockOfPart` | Part | many-to-one | An inventory position is for a part |
| `heldAtWarehouse` | Warehouse | many-to-one | An inventory position is held at a warehouse |

### 📑 PurchaseOrder

An order placed on a supplier for parts, services or subcontract work — stock replenishment, emergency (VOR) or direct-delivery.

**Data owner:** Supply Planner / Procurement

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.purchtable`

**Standards:** [schema.org: Order](https://schema.org/Order) (closeMatch) · OAGIS: PurchaseOrder (exactMatch) · [IOF Supply Chain: PurchaseOrder](https://spec.industrialontologies.org/ontology/supplychain/SupplyChain/PurchaseOrder) (closeMatch) · Microsoft CDM: PurchaseOrder (closeMatch) · ASCM SCOR DS: Source: Issue purchase order (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `purchaseOrderNumber` | string | 🔑 |  | `purchid` | F&O purchase order number |
| `poType` | enum |  | Stock Replenishment, Emergency VOR, Direct Delivery, Special Order, Subcontract, Services, Intercompany Parts | `purchpoolid` | Purpose of the order |
| `orderDate` | date |  |  | `accountingdate` | Order date |
| `confirmedDeliveryDate` | date |  |  | `confirmeddlv` | Supplier-confirmed delivery date |
| `approvalStatus` | enum |  | Draft, In Review, Approved, Confirmed, Rejected | `documentstate` | Change-management approval state |
| `status` | enum |  | Open, Received, Invoiced, Cancelled | `purchstatus` | Order status |
| `incoterm` | string |  |  | `dlvterm` | Incoterms 2020 rule |
| `currencyCode` | string |  |  | `currencycode` | ISO 4217 currency |
| `totalAmount` | decimal |  | AUD |  | Order total |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `orderedFromSupplier` | Supplier | many-to-one | A purchase order is placed with a supplier |
| `hasPurchaseLine` | PurchaseOrderLine | one-to-many | A purchase order has lines |
| `receivesInto` | Warehouse | many-to-one | A purchase order is received into a warehouse |
| `releasedFromAgreement` | PurchaseAgreement | many-to-one | A purchase order is released against an agreement |

### 🧾 PurchaseOrderLine

A line on a purchase order for a quantity of a part with price and delivery dates.

**Data owner:** Supply Planner / Procurement

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.purchline`

**Standards:** [schema.org: OrderItem](https://schema.org/OrderItem) (closeMatch) · OAGIS: PurchaseOrderLine (exactMatch) · Microsoft CDM: PurchaseOrderLine (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `purchaseLineId` | string | 🔑 |  | `inventtransid` | Inventory transaction id of the line |
| `lineNumber` | integer |  |  | `linenumber` | Line number |
| `quantity` | decimal |  |  | `purchqty` | Ordered quantity |
| `unitCost` | decimal |  | AUD | `purchprice` | Purchase price per unit |
| `requestedDate` | date |  |  | `deliverydate` | Requested receipt date |
| `confirmedDate` | date |  |  | `confirmeddlv` | Confirmed receipt date |
| `receivedQty` | decimal |  |  |  | Quantity received to date |
| `lineStatus` | enum |  | Open, Confirmed, Partially Received, Received, Invoiced, Cancelled | `purchstatus` | Line status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `purchasesPart` | Part | many-to-one | A purchase line buys a part number |

### 📜 PurchaseAgreement

A supplier agreement fixing prices, volumes, lead times or consignment terms for parts or services.

**Data owner:** Procurement

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.agreementheader` · ⚠️ to confirm

**Standards:** [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract) (broadMatch) · OAGIS: PurchaseAgreement (closeMatch) · Microsoft CDM: PurchaseAgreement (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `agreementId` | string | 🔑 |  | `purchnumbersequence` | Purchase agreement id |
| `agreementType` | enum |  | Blanket Price, Volume Commitment, Consignment, Service Level, Subcontract |  | Agreement type |
| `startDate` | date |  |  | `defaultagreementlineeffectivedate` | Effective from |
| `endDate` | date |  |  | `defaultagreementlineexpirationdate` | Effective to |
| `commitmentValue` | decimal |  | AUD |  | Committed spend |
| `status` | enum |  | Draft, Active, Expired, Terminated |  | Agreement status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `agreementWithSupplier` | Supplier | many-to-one | A purchase agreement is with a supplier |

### 📥 GoodsReceipt

The receipt of goods against a purchase or factory order at a warehouse, including discrepancies.

**Data owner:** Parts Operations Manager

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.vendpackingslipjour`

**Standards:** OAGIS: ReceiveDelivery (closeMatch) · [GS1 Web Vocabulary: CBV bizStep: receiving](https://gs1.org/voc/CBV bizStep: receiving) (closeMatch) · ASCM SCOR DS: Source: Receive product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `productReceiptId` | string | 🔑 |  | `packingslipid` | Product receipt (packing slip) number |
| `receiptDate` | date |  |  | `deliverydate` | Date received |
| `quantity` | decimal |  |  | `qty` | Quantity received |
| `discrepancy` | enum |  | None, Short, Over, Damaged, Wrong Part |  | Receipt discrepancy |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `receiptForOrder` | PurchaseOrder | many-to-one | A goods receipt is against a purchase order |
| `receivedAt` | Warehouse | many-to-one | Goods are received at a warehouse |

### 🔀 TransferOrder

A movement of stock between Komatsu warehouses — DC-to-branch replenishment, emergency transfer or consignment top-up.

**Data owner:** Supply Planner

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.inventtransfertable`

**Standards:** OAGIS: InventoryMovement (related) · [GS1 Web Vocabulary: CBV bizStep: shipping / receiving](https://gs1.org/voc/CBV bizStep: shipping / receiving) (related) · ASCM SCOR DS: Fulfill: Transfer product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `transferOrderNumber` | string | 🔑 |  | `transferid` | Transfer order number |
| `transferType` | enum |  | Replenishment, Emergency, Consignment Top-up, Return to DC, Reman Core Movement |  | Purpose of the transfer |
| `shipDate` | date |  |  | `shipdate` | Planned ship date |
| `receiptDate` | date |  |  | `receivedate` | Planned receipt date |
| `status` | enum |  | Created, Shipped, Received | `transferstatus` | Transfer status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `transferFrom` | Warehouse | many-to-one | A transfer ships from a warehouse |
| `transferTo` | Warehouse | many-to-one | A transfer is received at a warehouse |
| `transfersPart` | Part | many-to-many | A transfer moves quantities of parts |

### 🧰 PartsRequirement

A demand for a part from a work order, PDI job or reman job — reserved from stock, transferred or bought in.

**Data owner:** Service Coordinator / Parts Interpreter

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amworkorderitem` · ⚠️ to confirm

**Alternate table:** msdyn_workorderproduct (Field Service)

**Standards:** [IOF Core: MaterialRequirement](https://spec.industrialontologies.org/ontology/core/Core/MaterialRequirement) (related) · ASCM SCOR DS: Plan: Demand requirement (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `requirementId` | string | 🔑 |  | `inventtransid` | Item requirement line identifier |
| `quantity` | decimal |  |  | `qty` | Required quantity |
| `requiredDate` | date |  |  | `requireddate` | Date the part is needed at the job |
| `supplyStatus` | enum |  | Required, Reserved, Ordered, Backordered, In Transit, Issued, Returned | `status` | Supply status |
| `isCritical` | boolean |  |  |  | True when the job cannot start without the part |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `requiresPart` | Part | many-to-one | A requirement is for a part number |
| `requiredForWorkOrder` | WorkOrder | many-to-one | A requirement is raised by a work order |
| `requiredForPdi` | PDIJob | many-to-one | A requirement is raised by a PDI job |
| `requiredForReman` | RemanJob | many-to-one | A requirement is raised by a reman job |
| `reservedFrom` | Warehouse | many-to-one | A requirement is reserved from a warehouse |
| `sourcedViaPurchaseLine` | PurchaseOrderLine | many-to-one | A requirement is bought in on a purchase line |

## Demand & Supply Planning

### 📊 PartsDemandForecast

A time-phased demand forecast for a part at a warehouse — statistical, collaborative, fleet-hours (KOMTRAX) or PCR-driven.

**Data owner:** Parts Planner

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.forecastsales` · ⚠️ to confirm

**Standards:** ASCM SCOR DS: Plan: Demand plan (related) · APQC PCF: 4.1.1 Develop demand forecast (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `partsForecastId` | string | 🔑 |  | `recid` | Forecast record identifier |
| `forecastMonth` | date |  |  | `startdate` | Period the demand is expected |
| `forecastQty` | decimal |  |  | `salesqty` | Forecast quantity |
| `forecastMethod` | enum |  | Statistical, Collaborative (Customer), Fleet Hours (KOMTRAX), Component Replacement Plan, Manual Override |  | How the forecast was produced |
| `forecastAccuracyPct` | decimal |  | % |  | Forecast accuracy (1 - MAPE) for the prior period |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `forecastsPart` | Part | many-to-one | A parts forecast is for a part |
| `forecastAtWarehouse` | Warehouse | many-to-one | A parts forecast is for a warehouse |
| `feedsPlanningRun` | PlanningRun | many-to-many | Forecasts are consumed by planning runs |

### 📐 StockingPolicy

The planning parameters for a part at a warehouse — coverage method, min/max, safety stock, lead time and service-level target.

**Data owner:** Parts Planner

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.reqitemtable`

**Standards:** ASCM SCOR DS: Plan: Inventory policy (related) · APQC PCF: 4.5.2 Manage inventory (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `stockingPolicyId` | string | 🔑 |  | `recid` | Item coverage record key |
| `coverageMethod` | enum |  | Min-Max, Period, Requirement (Lot-for-lot), Manual, Non-stocked | `reqgroupid` | Coverage / replenishment method |
| `stockingStrategy` | enum |  | Stocked, Critical Spare, Consignment, Non-stocked, Phase-out |  | Stocking decision |
| `minQty` | decimal |  |  | `mininventonhand` | Minimum / reorder point |
| `maxQty` | decimal |  |  | `maxinventonhand` | Maximum stock level |
| `safetyStockQty` | decimal |  |  |  | Safety stock |
| `leadTimeDays` | integer |  | days | `leadtimepurchase` | Planning lead time |
| `serviceLevelTargetPct` | decimal |  | % |  | Target line-fill service level |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `policyForPart` | Part | many-to-one | A stocking policy is for a part |
| `policyAtWarehouse` | Warehouse | many-to-one | A stocking policy applies at a warehouse |
| `ownedByPlanner` | Employee | many-to-one | A stocking policy is owned by a parts planner |

### 🧮 PlanningRun

An execution of master planning (MRP) that nets demand against supply and generates planned orders.

**Data owner:** Supply Planning Manager

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.reqplanversion` · ⚠️ to confirm

**Standards:** ASCM SCOR DS: Plan: Balance supply and demand (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `planRunId` | string | 🔑 |  | `recid` | Plan version identifier |
| `masterPlan` | string |  |  | `reqplanid` | Master plan name, e.g. STATIC or DYNAMIC |
| `runDateTime` | datetime |  |  |  | When the plan ran |
| `horizonDays` | integer |  | days |  | Coverage horizon |
| `plannedOrderCount` | integer |  |  |  | Planned orders generated |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `generatesPlannedOrder` | PlannedOrder | one-to-many | A planning run generates planned orders |
| `runBy` | Employee | many-to-one | A planning run is executed by a supply planner |

### 🗒️ PlannedOrder

A planning suggestion to buy or transfer a part, reviewed and firmed by a supply planner.

**Data owner:** Supply Planner

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.reqpo`

**Standards:** ASCM SCOR DS: Plan: Planned order (related) · ISA-95: Material requirement (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `plannedOrderNumber` | string | 🔑 |  | `refid` | Planned order number |
| `plannedOrderType` | enum |  | Planned Purchase, Planned Transfer, Planned Reman Rebuild |  | Kind of supply suggested |
| `quantity` | decimal |  |  | `qty` | Suggested quantity |
| `requirementDate` | date |  |  | `reqdate` | Date the supply is needed |
| `orderDate` | date |  |  | `reqdateorder` | Date the order should be placed |
| `status` | enum |  | Unprocessed, Approved, Firmed, Deleted | `reqpostatus` | Planner action status |
| `actionMessage` | string |  |  |  | Planning action message, e.g. advance, postpone, increase |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `plansPart` | Part | many-to-one | A planned order is for a part |
| `plannedForWarehouse` | Warehouse | many-to-one | A planned order replenishes a warehouse |
| `suggestedSupplier` | Supplier | many-to-one | A planned purchase suggests a supplier |
| `firmedAsPurchaseOrder` | PurchaseOrder | many-to-one | A planned purchase is firmed into a purchase order |
| `firmedAsTransfer` | TransferOrder | many-to-one | A planned transfer is firmed into a transfer order |

## Service & Technicians

### 🏚️ WorkshopBay

A schedulable workshop capacity resource — PDI bay, repair bay, wash bay, dyno or reman line.

**Data owner:** Workshop Manager

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.bookableresource` · **Filter:** resourcetype = Facility · ⚠️ to confirm

**Standards:** [IOF Core: Facility](https://spec.industrialontologies.org/ontology/core/Core/Facility) (related) · ISA-95: Equipment (work unit) (related) · Microsoft CDM: BookableResource (facility) (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `bayId` | string | 🔑 |  | `bookableresourceid` | Bay / facility resource identifier |
| `name` | string |  |  | `name` | Bay name |
| `bayType` | enum |  | PDI Bay, Repair Bay, Wash Bay, Paint Booth, Engine Dyno, Reman Line, Field Service Vehicle |  | Capability |
| `capacityHoursPerDay` | decimal |  | hours |  | Available hours per day |
| `maxOperatingWeightKg` | decimal |  | kg |  | Largest machine the bay can take |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `bayAtBranch` | Branch | many-to-one | A bay belongs to a branch |

### 🛠️ WorkOrder

A workshop or field work order on a unit — scheduled maintenance, breakdown, warranty, campaign, component change-out or inspection.

**Also known as:** Service order · Job card · Work order (Annata) · Work order (Field Service)

**Data owner:** Service Coordinator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amworkordertable` · ⚠️ to confirm

**Alternate table:** msdyn_workorder (Field Service) / msauto_serviceorder (CDM Automotive)

**Standards:** [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess) (broadMatch) · MIMOSA CCOM: WorkOrder (closeMatch) · ISO 14224: Maintenance record (closeMatch) · Microsoft CDM: WorkOrder (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `workOrderNumber` | string | 🔑 |  | `workorderid` | Annata work order number |
| `serviceType` | enum |  | Scheduled Maintenance, Breakdown Repair, Warranty Repair, Campaign (PIP), Component Change-out, Inspection, Condition Monitoring, Internal | `workordertype` | Type of service |
| `serviceLocation` | enum |  | Workshop, Field, Mine Site Resident |  | Where the work is done |
| `priority` | enum |  | P1 Machine Down, P2 Urgent, P3 Planned, P4 Opportunistic |  | Service priority |
| `billingType` | enum |  | Customer, Warranty, Contract, Goodwill, Internal |  | Who pays |
| `status` | enum |  | Open, Scheduled, In Progress, Awaiting Parts, Awaiting Approval, Completed, Invoiced, Closed | `workorderstatus` | Order status |
| `openedOn` | datetime |  |  | `createddatetime` | When the order was opened |
| `completedOn` | datetime |  |  |  | When technical work was completed |
| `smrAtService` | decimal |  | hours | `countervalue` | Service meter reading at the job |
| `estimatedAmount` | decimal |  | AUD |  | Estimated / quoted value |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `servicesUnit` | EquipmentUnit | many-to-one | A work order is for a unit |
| `serviceForCustomer` | Customer | many-to-one | A work order is for a customer |
| `managedByBranch` | Branch | many-to-one | A work order is managed by a branch |
| `performedAtSite` | CustomerSite | many-to-one | A field work order is performed at a customer site |
| `hasWorkOrderJob` | WorkOrderJob | one-to-many | A work order contains jobs |
| `hasWorkOrderCheck` | InspectionResult | one-to-many | A service inspection records checklist results |
| `coveredByContract` | ServiceContract | many-to-one | A work order is performed under a contract |
| `executesCampaign` | ServiceCampaign | many-to-one | A work order completes a campaign on a unit |
| `approvedFromQuote` | SalesQuote | many-to-one | A repair is approved from a repair estimate |
| `generatedByPlan` | MaintenancePlan | many-to-one | A scheduled service is generated by a maintenance plan |
| `raisedFromCase` | SupportCase | many-to-one | A work order is raised from a support case |
| `usesBay` | WorkshopBay | many-to-one | A workshop work order uses a bay |
| `coordinatedByAdvisor` | Employee | many-to-one | A work order is coordinated by a service coordinator |

### 🔨 WorkOrderJob

A job (operation) within a work order recording the complaint, cause and correction for one piece of work.

**Also known as:** Job · Operation · Work order line

**Data owner:** Service Coordinator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amworkorderjob` · ⚠️ to confirm

**Alternate table:** msdyn_workorderincident / msauto_serviceorderjob (Dataverse)

**Standards:** [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess) (broadMatch) · ISO 14224: Maintenance activity (closeMatch) · Microsoft CDM: WorkOrderIncident (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `workOrderJobId` | string | 🔑 |  | `jobid` | Work order job identifier |
| `operationCode` | string |  |  | `operationcode` | Annata operation (flat-rate) code |
| `complaint` | string |  |  | `complaint` | Customer complaint / symptom |
| `cause` | string |  |  | `cause` | Diagnosed cause |
| `correction` | string |  |  | `correction` | Corrective action performed |
| `standardHours` | decimal |  | hours |  | Standard or quoted hours |
| `actualHours` | decimal |  | hours |  | Actual hours booked |
| `jobStatus` | enum |  | Open, In Progress, On Hold, Completed, Cancelled | `jobstatus` | Job status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `basedOnStandardJob` | StandardJob | many-to-one | A job is based on a standard job |
| `diagnosedFailure` | FailureMode | many-to-one | A repair job records a failure mode |
| `worksOnComponent` | Component | many-to-one | A job works on a major component |

### 📘 StandardJob

A reusable service template (Annata job list) — e.g. PC210-11 500-hour service or D375A final-drive change-out — with standard hours, parts kit and skills.

**Also known as:** Job list (Annata) · Service template · Incident type (Field Service)

**Data owner:** Service Engineering

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amjoblist` · ⚠️ to confirm

**Alternate table:** msdyn_incidenttype (Field Service) / msauto_serviceorderjobtype

**Standards:** [IOF Core: MaintenancePlanSpecification](https://spec.industrialontologies.org/ontology/core/Core/MaintenancePlanSpecification) (related) · ISO 14224: Maintenance activity type (related) · Microsoft CDM: IncidentType (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `standardJobCode` | string | 🔑 |  | `joblistid` | Standard job code |
| `name` | string |  |  | `description` | Standard job name |
| `jobCategory` | enum |  | PM 250, PM 500, PM 1000, PM 2000, PM 4000, PM Clinic, Component Change-out, Inspection, PDI, Campaign |  | Job category |
| `standardHours` | decimal |  | hours | `estimatedhours` | Standard labour hours |
| `fixedPrice` | decimal |  | AUD |  | Fixed / menu price where offered |
| `intervalHours` | integer |  | hours |  | Service interval |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `standardJobForModel` | MachineModel | many-to-many | A standard job applies to machine models |
| `includesKitPart` | Part | many-to-many | A standard job includes a parts kit |
| `requiresSkill` | Skill | many-to-many | A standard job requires skills or certifications |

### 🗓️ MaintenancePlan

A preventive maintenance schedule for a unit or contract that generates work orders by hours or calendar interval (e.g. Komplimentary Maintenance services at 500–2,000 hours).

**Data owner:** Service Planner

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.ammaintenanceplan` · ⚠️ to confirm

**Alternate table:** msdyn_agreementbookingsetup (Field Service)

**Standards:** [IOF Core: MaintenancePlan](https://spec.industrialontologies.org/ontology/core/Core/MaintenancePlan) (related) · ISO 55000: Asset management plan (related) · Microsoft CDM: AgreementBookingSetup (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `maintenancePlanId` | string | 🔑 |  | `maintenanceplanid` | Plan identifier |
| `intervalBasis` | enum |  | Hours, Calendar, Hours or Calendar |  | Interval trigger |
| `intervalHours` | integer |  | hours |  | Interval in hours |
| `nextDueSmr` | decimal |  | hours | `nextcountervalue` | Meter reading at which the next service is due |
| `nextDueDate` | date |  |  | `nextdate` | Forecast date the next service is due |
| `status` | enum |  | Active, Suspended, Completed |  | Plan status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `plansUnit` | EquipmentUnit | many-to-one | A maintenance plan is for a unit |
| `schedulesStandardJob` | StandardJob | many-to-one | A maintenance plan schedules a standard job |
| `planUnderContract` | ServiceContract | many-to-one | A maintenance plan is delivered under a contract |

### 👷 Technician

A bookable field, workshop, resident mine-site or reman technician with skills, certifications and a home branch.

**Also known as:** Bookable resource · Field service technician · Workshop technician · Technician – PDI

**Data owner:** Service Manager

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.bookableresource` · **Filter:** resourcetype = User or Contact

**Alternate table:** hcmworker (F&O)

**Standards:** [schema.org: Person](https://schema.org/Person) (closeMatch) · [IOF Core: MaintenanceTechnicianRole](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceTechnicianRole) (related) · Microsoft CDM: BookableResource (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `resourceId` | string | 🔑 |  | `bookableresourceid` | Bookable resource identifier |
| `fullName` | string |  |  | `name` | Full name |
| `technicianType` | enum |  | Field Service, Workshop, Resident Mine Site, Reman, Apprentice, Contractor | `resourcetype` | Technician type |
| `tradeLevel` | enum |  | Apprentice Year 1-2, Apprentice Year 3-4, Technician, Senior Technician, Master Technician, Leading Hand |  | Trade level |
| `chargeOutRate` | decimal |  | AUD/hour |  | Standard labour charge-out rate |
| `isActive` | boolean |  |  |  | True while the technician can be scheduled |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `isWorker` | Employee | one-to-one | A technician is an employee (or contractor worker record) |
| `homeBranch` | Branch | many-to-one | A technician belongs to a home branch |
| `holdsSkill` | Skill | many-to-many | A technician holds skills and certifications |

### 🎓 Skill

A skill, model certification, licence or site induction that qualifies a technician for work.

**Data owner:** Technical Training

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.characteristic`

**Standards:** [schema.org: DefinedTerm](https://schema.org/DefinedTerm) (broadMatch) · ESCO: Skill / competence (related) · Microsoft CDM: Characteristic (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `skillId` | string | 🔑 |  | `characteristicid` | Characteristic identifier |
| `name` | string |  |  | `name` | Skill name, e.g. "930E electric drive certified" |
| `skillType` | enum |  | Model Certification, Trade Licence, High Risk Work Licence, Site Induction, Electrical Licence, Confined Space, Working at Heights, Komatsu Training Level | `characteristictype` | Kind of qualification |
| `expires` | boolean |  |  |  | True when the qualification must be renewed |

### 📅 ResourceBooking

A scheduled allocation of a technician or bay to a work order, PDI job or reman job.

**Data owner:** Service Planner / PDI Planner

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.bookableresourcebooking`

**Standards:** [schema.org: Reservation](https://schema.org/Reservation) (closeMatch) · Microsoft CDM: BookableResourceBooking (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `bookingId` | string | 🔑 |  | `bookableresourcebookingid` | Booking identifier |
| `startTime` | datetime |  |  | `starttime` | Booked start |
| `endTime` | datetime |  |  | `endtime` | Booked end |
| `bookingStatus` | enum |  | Scheduled, Travelling, In Progress, On Break, Completed, Cancelled | `bookingstatus` | Booking status |
| `travelHours` | decimal |  | hours |  | Estimated travel time |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `booksTechnician` | Technician | many-to-one | A booking allocates a technician |
| `booksWorkOrder` | WorkOrder | many-to-one | A booking is for a work order |
| `booksPdiJob` | PDIJob | many-to-one | A booking is for a PDI job |
| `booksRemanJob` | RemanJob | many-to-one | A booking is for a reman job |
| `booksBay` | WorkshopBay | many-to-one | A booking reserves a workshop bay |

### ⏱️ TimeEntry

Labour time recorded by a technician against a work order job, PDI job or reman job.

**Also known as:** Labour line · Hour journal · Timesheet

**Data owner:** Service Coordinator

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.projempltrans` · **Filter:** project linked to an Annata work order · ⚠️ to confirm

**Alternate table:** msdyn_timeentry (Field Service)

**Standards:** [schema.org: Action](https://schema.org/Action) (broadMatch) · Microsoft CDM: TimeEntry (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `timeEntryId` | string | 🔑 |  | `transid` | Time entry identifier |
| `workDate` | date |  |  | `transdate` | Date worked |
| `hours` | decimal |  | hours | `qty` | Hours recorded |
| `labourType` | enum |  | Normal, Overtime, Travel, Warranty, Internal, Rework | `categoryid` | Labour type |
| `isBillable` | boolean |  |  |  | True when chargeable to the customer |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `loggedBy` | Technician | many-to-one | Time is logged by a technician |
| `labourOnJob` | WorkOrderJob | many-to-one | Time is booked to a work order job |
| `labourOnPdi` | PDIJob | many-to-one | Time is booked to a PDI job |
| `labourOnReman` | RemanJob | many-to-one | Time is booked to a reman job |

### 💥 FailureMode

A coded failure mode, mechanism and cause used on repairs, warranty claims and reman teardowns (ISO 14224 style).

**Also known as:** Claim code (Annata: symptom, cause, resolution, failure) · Damage code

**Data owner:** Reliability Engineering

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amwarrantyclaimcode` · ⚠️ to confirm

**Standards:** ISO 14224: Failure mode / failure mechanism / failure cause (exactMatch) · MIMOSA CCOM: FailureMode (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `failureCode` | string | 🔑 |  | `claimcode` | Failure / damage code |
| `failureModeName` | string |  |  | `description` | Failure mode, e.g. "external leakage", "overheating" |
| `failureMechanism` | string |  |  |  | Failure mechanism, e.g. wear, fatigue, contamination |
| `failureCause` | enum |  | Design, Manufacturing, Operation / Misuse, Maintenance, Wear and Tear, Contamination, Unknown |  | Root-cause category |

## Contracts & Warranty

### 📃 ServiceContract

A customer support agreement — Komplimentary Maintenance, Maintenance Contract Agreement (cost per operating hour), MARC, planned maintenance, parts supply or resident site support.

**Also known as:** Maintenance Contract Agreement · Service agreement · Contract service package (Annata) · Komatsu CARE (global name)

**Data owner:** Contracts Administrator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amcontracttable` · ⚠️ to confirm

**Alternate table:** msdyn_agreement (Field Service) / msauto_servicecontract

**Standards:** [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract) (broadMatch) · [schema.org: Service](https://schema.org/Service) (related) · ISO 55000: Service level agreement (related) · Microsoft CDM: Agreement (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `contractNumber` | string | 🔑 |  | `contractid` | Service agreement number |
| `contractType` | enum |  | Komplimentary Maintenance, Maintenance Contract Agreement, Repair and Maintenance (MARC), Planned Maintenance, Parts Supply Agreement, Tiered Rebuild Program, Availability Guarantee, Resident Site Support | `contracttype` | Contract product |
| `billingModel` | enum |  | Included with Machine, Fixed Monthly, Per SMR Hour, Time and Materials, Milestone |  | How the contract is charged |
| `startDate` | date |  |  | `startdate` | Contract start |
| `endDate` | date |  |  | `enddate` | Contract end |
| `startSmr` | decimal |  | hours |  | Unit meter at contract start |
| `endSmr` | decimal |  | hours |  | Meter limit at which coverage ends |
| `contractValue` | decimal |  | AUD |  | Total contract value |
| `availabilityTargetPct` | decimal |  | % |  | Contracted mechanical availability target |
| `status` | enum |  | Draft, Active, Suspended, Expired, Terminated, Renewed | `contractstatus` | Contract status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `contractWithCustomer` | Customer | many-to-one | A contract is with a customer |
| `coversUnit` | EquipmentUnit | many-to-many | A contract covers one or more units |
| `contractForSite` | CustomerSite | many-to-one | A site-based contract (e.g. MARC) is for a customer site |
| `grantsEntitlement` | ContractEntitlement | one-to-many | A contract grants entitlements |
| `administeredBy` | Employee | many-to-one | A contract is administered by a contracts administrator |
| `contractPriceList` | PriceList | many-to-one | A contract prices parts and labour from a price list |

### 🎟️ ContractEntitlement

A specific benefit under a contract — free services, labour/parts coverage, response-time SLA or support hours — and its consumption.

**Data owner:** Contracts Administrator

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.entitlement`

**Standards:** [schema.org: Offer](https://schema.org/Offer) (related) · Microsoft CDM: Entitlement (exactMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `entitlementId` | string | 🔑 |  | `entitlementid` | Entitlement identifier |
| `entitlementType` | enum |  | Free Scheduled Service, Labour Coverage, Parts Coverage, Travel Coverage, Response Time SLA, Support Hours, Oil Analysis |  | Benefit type |
| `allowance` | decimal |  |  | `totalterms` | Total allowance (visits, hours or amount) |
| `consumed` | decimal |  |  | `remainingterms` | Allowance consumed to date |
| `responseTimeHours` | integer |  | hours |  | Committed response time |

### 🛡️ WarrantyCoverage

A warranty entitlement on a unit or component — standard machine, Premium Warranty, Long Haul Support, Parts Plus, Premium Used or reman component.

**Data owner:** Warranty Administrator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicewarranty` · ⚠️ to confirm

**Alternate table:** msauto_devicewarranty (Dataverse) / msdyn_warranty

**Standards:** [schema.org: WarrantyPromise](https://schema.org/WarrantyPromise) (exactMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `warrantyId` | string | 🔑 |  | `warrantyid` | Warranty registration identifier |
| `warrantyType` | enum |  | Standard Machine, Premium Warranty, Long Haul Support, Parts Plus Warranty, Premium Used, Reman Component, Service Workmanship | `warrantytype` | Coverage product |
| `startDate` | date |  |  | `startdate` | Coverage start |
| `endDate` | date |  |  | `enddate` | Coverage end |
| `hoursLimit` | decimal |  | hours |  | Meter limit of coverage |
| `status` | enum |  | Registered, Active, Expired, Void |  | Coverage status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `warrantsUnit` | EquipmentUnit | many-to-one | A warranty covers a unit |
| `warrantsComponent` | Component | many-to-one | A reman or component warranty covers a component |

### 📨 WarrantyClaim

A claim to the factory or a supplier to recover the cost of a warranty repair, campaign or policy/goodwill decision.

**Also known as:** OEM warranty claim · Dealer warranty claim · Supplier recovery

**Data owner:** Warranty Administrator

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amwarrantyclaimtable` · ⚠️ to confirm

**Standards:** ISO 14224: Failure event record (related) · [schema.org: WarrantyPromise](https://schema.org/WarrantyPromise) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `claimNumber` | string | 🔑 |  | `claimid` | Warranty claim number |
| `claimType` | enum |  | Machine Warranty, Parts Warranty, Reman Warranty, Campaign (PIP), Policy / Goodwill, Supplier Recovery | `claimtype` | Claim type |
| `failureDate` | date |  |  | `failuredate` | Date of failure |
| `smrAtFailure` | decimal |  | hours |  | Meter at failure |
| `claimedAmount` | decimal |  | AUD | `claimamount` | Amount claimed (parts + labour + sundries) |
| `approvedAmount` | decimal |  | AUD | `approvedamount` | Amount approved by the factory / supplier |
| `status` | enum |  | Draft, Submitted, Returned for Info, Approved, Partially Approved, Rejected, Paid, Appealed | `claimstatus` | Claim status |
| `submittedDate` | date |  |  |  | Date submitted |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `claimForWorkOrder` | WorkOrder | many-to-one | A claim recovers the cost of a work order |
| `claimOnUnit` | EquipmentUnit | many-to-one | A claim is for a failure on a unit |
| `claimUnderCoverage` | WarrantyCoverage | many-to-one | A claim is made under a warranty coverage |
| `claimToFactory` | Factory | many-to-one | A claim is submitted to the responsible factory |
| `recoveryFromSupplier` | Supplier | many-to-one | A supplier-recovery claim is made to a supplier |
| `claimFailureMode` | FailureMode | many-to-one | A claim records the failure mode |
| `causalPart` | Part | many-to-one | A claim identifies the causal part |
| `claimForCampaign` | ServiceCampaign | many-to-one | A campaign claim is for a service campaign |

### 📢 ServiceCampaign

A factory-issued Product Improvement Program (PIP), safety recall or retrofit that must be completed on affected units.

**Also known as:** PIP · Product Improvement Program · Field campaign · Recall

**Data owner:** Warranty Administrator / Product Support

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amcampaigntable` · ⚠️ to confirm

**Standards:** ACCC Product Safety: Recall (related) · [schema.org: Action](https://schema.org/Action) (broadMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `campaignNumber` | string | 🔑 |  | `campaignid` | PIP / campaign number |
| `campaignType` | enum |  | PIP, Safety Recall, Retrofit, Inspection, Software Update |  | Campaign type |
| `title` | string |  |  | `description` | Campaign title |
| `issueDate` | date |  |  | `fromdate` | Date issued by the factory |
| `completionDeadline` | date |  |  | `todate` | Date all affected units must be completed |
| `standardHours` | decimal |  | hours |  | Allowed labour hours per unit |
| `status` | enum |  | Open, In Progress, Closed |  | Campaign status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `affectsUnit` | EquipmentUnit | many-to-many | A campaign affects specific units |
| `issuedByFactory` | Factory | many-to-one | A campaign is issued by a factory |
| `campaignForModel` | MachineModel | many-to-many | A campaign applies to machine models |

### 🔑 RentalAgreement

A rental contract for one or more rental-fleet units (e.g. from the Truganina rental and remarketing hub), with rates, term and on/off-hire dates.

**Also known as:** Rental order (Annata) · Hire agreement

**Data owner:** Rental Manager

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amrentalordertable` · ⚠️ to confirm

**Standards:** [FIBO: Contract](https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract) (broadMatch) · [schema.org: RentAction](https://schema.org/RentAction) (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `rentalAgreementId` | string | 🔑 |  | `rentalorderid` | Rental order number |
| `rentalType` | enum |  | Short Term Hire, Long Term Rental, Rent to Own, Project Fleet, Demonstration Loan |  | Rental product |
| `onHireDate` | date |  |  | `onhiredate` | Date units went on hire |
| `offHireDate` | date |  |  | `offhiredate` | Date units came off hire |
| `rateBasis` | enum |  | Daily, Weekly, Monthly, Per SMR Hour |  | How the rate is charged |
| `rentalRate` | decimal |  | AUD |  | Rate per basis period |
| `status` | enum |  | Quoted, Confirmed, On Hire, Off Hire, Closed | `rentalstatus` | Rental status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `rentedBy` | Customer | many-to-one | A rental agreement is with a customer |
| `rentsUnit` | EquipmentUnit | many-to-many | A rental agreement puts rental-fleet units on hire |
| `rentalAtSite` | CustomerSite | many-to-one | Rented units are delivered to a customer site |

## Remanufacturing (REMAN)

### 📦 CoreReturn

The return of a failed component (core) after a Component Exchange Program sale, inspected to determine the core credit.

**Also known as:** Core · Core RMA · Core credit

**Data owner:** Reman Coordinator

**System of record:** D365 F&O · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.salestable` · **Filter:** salestype = ReturnItem (RMA) with core disposition code · ⚠️ to confirm

**Standards:** [GS1 Web Vocabulary: GRAI (returnable asset)](https://gs1.org/voc/GRAI (returnable asset)) (related) · OAGIS: ReturnMaterialAuthorization (closeMatch) · ASCM SCOR DS: Return: Return product (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `coreReturnId` | string | 🔑 |  | `returnitemnum` | Core return / RMA number |
| `returnDueDate` | date |  |  | `returndeadline` | Date the core must be returned by |
| `receivedDate` | date |  |  |  | Date the core was received |
| `coreCondition` | enum |  | Acceptable, Damaged - Partial Credit, Non-rebuildable, Wrong Core, Not Returned |  | Inspection outcome |
| `coreDeposit` | decimal |  | AUD |  | Core charge (surcharge) paid on the exchange sale |
| `coreCredit` | decimal |  | AUD |  | Credit issued after inspection |
| `status` | enum |  | Awaiting Return, Received, Inspected, Credited, Rejected, Overdue |  | Return status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `returnsCore` | Component | one-to-one | A core return brings back a failed component |
| `coreForExchangeOrder` | SalesOrder | many-to-one | A core is owed against a reman exchange order |
| `coreReturnedBy` | Customer | many-to-one | A core is returned by a customer |
| `creditedOnInvoice` | CustomerInvoice | many-to-one | A core credit is issued on a credit note |

### 🔄 RemanJob

A remanufacture (rebuild) job on a component at a reman centre (e.g. Wacol, Welshpool) — exchange-stock, customer-own, tiered or warranty rebuild — from teardown to test.

**Also known as:** Rebuild · Reman work order · Component Exchange Program rebuild

**Data owner:** Reman Centre Manager

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amworkordertable` · **Filter:** work order type = REMAN · ⚠️ to confirm

**Alternate table:** prodtable (F&O production order) if rebuilds run as production

**Standards:** [IOF Core: MaintenanceProcess](https://spec.industrialontologies.org/ontology/core/Core/MaintenanceProcess) (related) · ISO 14224: Maintenance activity: overhaul (closeMatch) · ASCM SCOR DS: Transform: Remanufacture (related) · [GS1 Web Vocabulary: CBV bizStep: repairing](https://gs1.org/voc/CBV bizStep: repairing) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `remanJobNumber` | string | 🔑 |  | `workorderid` | Rebuild order number |
| `rebuildType` | enum |  | Exchange Stock Rebuild, Customer Own Rebuild, Tiered Rebuild (Gold), Tiered Rebuild (Silver), Tiered Rebuild (Bronze), Warranty Rebuild, Repair Only |  | Commercial type of rebuild |
| `stage` | enum |  | Awaiting Core, Teardown, Inspection and Quote, Awaiting Parts, Machining, Assembly, Test / Dyno, Paint and Pack, Completed | `workorderstage` | Current production stage |
| `plannedCompletion` | date |  |  | `plannedenddatetime` | Planned completion date |
| `actualCompletion` | date |  |  |  | Actual completion date |
| `actualHours` | decimal |  | hours |  | Labour hours |
| `rebuildCost` | decimal |  | AUD |  | Total rebuild cost (labour + parts + machining) |
| `testResult` | enum |  | Pass, Fail - Rework, Not Tested |  | Final test outcome |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `rebuildsComponent` | Component | many-to-one | A reman job rebuilds a component |
| `rebuildsFromCore` | CoreReturn | one-to-one | An exchange rebuild starts from a returned core |
| `producesRemanPart` | Part | many-to-one | A reman job restocks a reman exchange part number |
| `restocksWarehouse` | Warehouse | many-to-one | A completed rebuild is receipted into a reman store |
| `remanAtCentre` | Branch | many-to-one | A rebuild is performed at a reman centre |
| `rebuildForCustomer` | Customer | many-to-one | A customer-own rebuild is for a customer |
| `teardownFinding` | FailureMode | many-to-one | A teardown records the failure mode of the core |

## Customer Support & Portal

### 🎧 SupportCase

A customer support case — technical support, parts or invoice enquiry, complaint, warranty query, KOMTRAX or portal support, or breakdown request.

**Also known as:** Case · Incident · Ticket

**Data owner:** Customer Support Manager

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.incident`

**Standards:** Microsoft CDM: Case (incident) (exactMatch) · [schema.org: Action](https://schema.org/Action) (broadMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `caseNumber` | string | 🔑 |  | `ticketnumber` | Case (ticket) number |
| `title` | string |  |  | `title` | Case title |
| `caseType` | enum |  | Breakdown Request, Technical Support, Parts Enquiry, Order Status, Invoice Query, Warranty Query, Complaint, KOMTRAX Support, Portal Support, Service Booking | `casetypecode` | Case category |
| `caseOrigin` | enum |  | Phone, Email, Customer Portal, KOMTRAX Alert, Field Technician, Web Form | `caseorigincode` | Channel the case came from |
| `priority` | enum |  | P1 Machine Down, P2 Urgent, P3 Planned, P4 Opportunistic | `prioritycode` | Priority |
| `status` | enum |  | New, In Progress, Waiting on Customer, Escalated, Resolved, Cancelled | `statuscode` | Case status |
| `createdOn` | datetime |  |  | `createdon` | When the case was created |
| `resolvedOn` | datetime |  |  |  | When the case was resolved |
| `slaBreached` | boolean |  |  |  | True when the response or resolution SLA was missed |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `caseForCustomer` | Customer | many-to-one | A case is for a customer |
| `raisedByContact` | Contact | many-to-one | A case is raised by a customer contact |
| `caseAboutUnit` | EquipmentUnit | many-to-one | A case concerns a unit |
| `caseAboutOrder` | SalesOrder | many-to-one | A case concerns a sales order |
| `caseOwner` | Employee | many-to-one | A case is owned by a customer support representative |
| `consumesEntitlement` | ContractEntitlement | many-to-one | A case consumes a contract entitlement and its SLA |

### 🌐 PortalUser

A customer contact registered on the D365 (Power Pages) customer portal — myKomatsu / myFleet — to view fleet, order parts, book service and raise cases.

**Also known as:** myKomatsu user · myFleet user · Portal contact

**Data owner:** Digital Channels Manager

**System of record:** Power Pages portal · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.contact` · **Filter:** contact with a portal identity · ⚠️ to confirm

**Alternate table:** Annata dealer portal user (if the Annata portal is used)

**Standards:** [schema.org: Person](https://schema.org/Person) (related) · W3C VCard / FOAF: OnlineAccount (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `portalUserId` | string | 🔑 |  | `contactid` | Portal identity (contact) identifier |
| `email` | string |  |  | `emailaddress1` | Login email |
| `webRole` | enum |  | Customer Administrator, Fleet Manager, Parts Buyer, Service Requester, Invoice Viewer, Read Only | `mspp_webrole` | Portal web role |
| `status` | enum |  | Invited, Active, Locked, Deactivated |  | Account status |
| `lastLoginOn` | datetime |  |  |  | Last sign-in |
| `mfaEnabled` | boolean |  |  |  | True when multi-factor authentication is enabled |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `portalIdentityOf` | Contact | one-to-one | A portal user is the online identity of a contact |
| `accessesCustomer` | Customer | many-to-many | A portal user can access one or more customer accounts |
| `submitsCase` | SupportCase | one-to-many | A portal user submits cases |
| `placesOnlineOrder` | SalesOrder | one-to-many | A portal user places online parts orders |

## Telematics & Condition Monitoring

### 📡 TelematicsReading

A KOMTRAX snapshot of a unit — hours, fuel, idle, location and utilisation — aligned to the ISO 15143-3 (AEMP 2.0) data elements.

**Data owner:** Digital Solutions (KOMTRAX)

**System of record:** KOMTRAX · **Fabric source:** Eventhouse · eh_komtrax (ISO 15143-3 / KOMTRAX API feed) · **Table:** `eh_komtrax.machine_snapshots` · ⚠️ to confirm

**Standards:** ISO 15143-3: Fleet snapshot (CumulativeOperatingHours, FuelUsed, Location) (exactMatch) · MIMOSA CCOM: Measurement (closeMatch) · [schema.org: Observation](https://schema.org/Observation) (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `readingId` | string | 🔑 |  | `snapshot_id` | Snapshot identifier |
| `readingTime` | datetime |  |  | `snapshot_time` | Timestamp of the snapshot |
| `smrHours` | decimal |  | hours | `cumulative_operating_hours` | Cumulative operating hours |
| `idleHours` | decimal |  | hours | `cumulative_idle_hours` | Cumulative idle hours |
| `fuelUsedLitres` | decimal |  | L | `fuel_used_l` | Cumulative fuel used |
| `fuelLevelPct` | decimal |  | % |  | Fuel remaining |
| `latitude` | double |  | deg | `latitude` | WGS84 latitude |
| `longitude` | double |  | deg | `longitude` | WGS84 longitude |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `reportedByUnit` | EquipmentUnit | many-to-one | A KOMTRAX snapshot is reported by a unit |

### 🔢 MeterReading

A service-meter (SMR) or odometer reading recorded against a unit in Annata — from KOMTRAX, a technician, the customer portal or a delivery.

**Also known as:** SMR · SMU · Counter reading (Annata) · Hour meter

**Data owner:** Equipment Administration

**System of record:** Annata 365 (F&O) · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.amdevicemeterreading` · ⚠️ to confirm

**Alternate table:** msauto_devicemeasurement (Dataverse) / msdyn_propertylog (Field Service)

**Standards:** MIMOSA CCOM: Measurement (closeMatch) · [schema.org: QuantitativeValue](https://schema.org/QuantitativeValue) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `meterReadingId` | string | 🔑 |  | `recid` | Counter reading identifier |
| `readingTime` | datetime |  |  | `readingdatetime` | When the reading was taken |
| `meterType` | enum |  | SMR Hours, Odometer, Payload Cycles, Engine Hours | `metertype` | Meter / counter type |
| `meterValue` | decimal |  |  | `metervalue` | Reading value |
| `readingSource` | enum |  | KOMTRAX, Technician, Customer Portal, Delivery, Estimated | `source` | Where the reading came from |
| `isValidated` | boolean |  |  |  | True when the reading passed plausibility checks |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `meterOfUnit` | EquipmentUnit | many-to-one | A meter reading is for a unit |

### 🚨 MachineAlert

A KOMTRAX caution or fault event, maintenance-due notice, geofence or curfew breach raised for a unit.

**Also known as:** KOMTRAX caution · IoT alert

**Data owner:** Digital Solutions (KOMTRAX)

**System of record:** D365 CE · **Fabric source:** Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O) · **Table:** `lh_d365.dbo.msdyn_iotalert` · ⚠️ to confirm

**Standards:** ISO 15143-3: Fault codes / caution messages (closeMatch) · MIMOSA CCOM: Event (closeMatch) · Microsoft CDM: IoTAlert (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `alertId` | string | 🔑 |  | `msdyn_iotalertid` | Alert identifier |
| `alertTime` | datetime |  |  | `msdyn_alerttime` | When the alert was raised |
| `alertType` | enum |  | Fault Code, Caution, Maintenance Due, Geofence, Curfew, Abnormal Operation, Low Fuel | `msdyn_alerttype` | Alert category |
| `severity` | enum |  | Info, Warning, Critical |  | Severity |
| `status` | enum |  | New, Acknowledged, Case Created, Service Ordered, Closed | `statuscode` | Handling status |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `alertOnUnit` | EquipmentUnit | many-to-one | An alert is raised on a unit |
| `alertFaultCode` | FaultCode | many-to-one | A fault alert carries a fault code |
| `escalatedToCase` | SupportCase | many-to-one | An alert is escalated to a support case |
| `alertActionedBy` | WorkOrder | many-to-one | An alert is actioned by a work order |

### ⚠️ FaultCode

A machine-generated diagnostic trouble code (Komatsu error code, mapped to SAE J1939 SPN/FMI where applicable).

**Data owner:** Product Support Engineering

**System of record:** KOMTRAX · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.fault_code` · ⚠️ to confirm

**Standards:** SAE J1939-73: Diagnostic Trouble Code (SPN + FMI) (exactMatch) · ISO 15143-3: FaultCode (closeMatch)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `faultCodeId` | string | 🔑 |  | `fault_code` | Komatsu error code, e.g. CA234 |
| `faultDescription` | string |  |  | `description` | Fault description |
| `spn` | integer |  |  | `spn` | SAE J1939 suspect parameter number |
| `fmi` | integer |  |  | `fmi` | SAE J1939 failure mode identifier |
| `system` | enum |  | Engine, Hydraulic, Electrical, Powertrain, Brakes, Aftertreatment, Controller | `system` | Machine system |
| `severity` | enum |  | Info, Warning, Critical |  | Default severity |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `faultForModel` | MachineModel | many-to-many | A fault code applies to machine models |
| `suggestsFailure` | FailureMode | many-to-many | A fault code suggests likely failure modes |

### 🧪 OilSample

An oil analysis sample (KOWA, Condition Monitoring Services) taken from a unit compartment, with a laboratory condition rating.

**Also known as:** KOWA sample · CMS sample · Fluid analysis

**Data owner:** Condition Monitoring

**System of record:** LIMC (oil analysis lab) · **Fabric source:** Lakehouse · lh_reference (curated reference & external feeds) · **Table:** `lh_reference.dbo.kowa_oil_sample` · ⚠️ to confirm

**Standards:** ISO 14224: Condition monitoring (related) · MIMOSA CCOM: Measurement (closeMatch) · [schema.org: MedicalTest](https://schema.org/MedicalTest) (related)

| Property | Type | Key | Unit / values | Source column | Description |
|---|---|---|---|---|---|
| `sampleNumber` | string | 🔑 |  | `sample_number` | Laboratory sample number |
| `sampleDate` | date |  |  | `sample_date` | Date sampled |
| `compartment` | enum |  | Engine, Transmission, Hydraulic, Final Drive, Differential, Swing Circle, Coolant | `compartment` | Compartment sampled |
| `oilHours` | decimal |  | hours | `oil_hours` | Hours on the oil |
| `conditionRating` | enum |  | Normal, Monitor, Action, Urgent | `rating` | Laboratory rating |
| `recommendation` | string |  |  |  | Laboratory recommendation |

| Relationship | Target | Cardinality | Description |
|---|---|---|---|
| `sampledFromUnit` | EquipmentUnit | many-to-one | An oil sample is taken from a unit |
| `sampledComponent` | Component | many-to-one | An oil sample is taken from a component compartment |
| `sampleActionedBy` | WorkOrder | many-to-one | An adverse oil result is actioned by a work order |
