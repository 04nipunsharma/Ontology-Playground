/**
 * Komatsu Australia — Enterprise Ontology (source of truth).
 *
 * End-to-end business model for an OEM equipment distributor: customers and
 * sites, machine sales to delivery, Hensei factory ordering, import and
 * biosecurity, PDI, parts supply chain and procurement, demand/supply
 * planning, workshop and field service, technicians, contracts and warranty,
 * REMAN, customer support and portal, and KOMTRAX telematics.
 *
 * Three layers per entity type:
 *   - industry alignment (ISO 6165 / 10261 / 14224 / 15143-3, schema.org, GS1,
 *     IOF, MIMOSA CCOM, W3C ORG, FIBO, Microsoft CDM, SCOR)
 *   - Komatsu business meaning (description, owner, domain)
 *   - system binding (D365 CE / F&O, Annata 365, KOMTRAX, portal → Fabric table)
 *
 * Do not edit generated catalogue files — edit this file and run
 * `npm run komatsu:generate`.
 */
import type { Property } from '../ontology';
import type {
  KomatsuEntityType,
  KomatsuModule,
  KomatsuRelationship,
  StandardAlignment,
  SystemBinding,
} from './types';

export const KOMATSU_ONTOLOGY_NAME = 'Komatsu Australia Enterprise Ontology';
export const KOMATSU_ONTOLOGY_VERSION = '0.1.0';
export const KOMATSU_ONTOLOGY_DESCRIPTION =
  'End-to-end ontology for Komatsu Australia: customers and sites, machine sales to delivery, Hensei factory ordering, import and PDI, parts supply chain and planning, service and technicians, contracts and warranty, REMAN, customer support and KOMTRAX — aligned to industry standards and bound to D365 CE, F&O and Annata 365.';
/** Namespace placeholder — confirm the organisation's preferred IRI (see docs/komatsu/open-questions.md). */
export const KOMATSU_BASE_URI = 'https://ontology.komatsu.com.au/';

// ─── Property helpers ───────────────────────────────────────────────────────

const key = (name: string, description: string): Property => ({ name, type: 'string', isIdentifier: true, description });
const str = (name: string, description: string): Property => ({ name, type: 'string', description });
const int = (name: string, description: string, unit?: string): Property => ({ name, type: 'integer', description, ...(unit ? { unit } : {}) });
const dec = (name: string, description: string, unit?: string): Property => ({ name, type: 'decimal', description, ...(unit ? { unit } : {}) });
const dbl = (name: string, description: string, unit?: string): Property => ({ name, type: 'double', description, ...(unit ? { unit } : {}) });
const date = (name: string, description: string): Property => ({ name, type: 'date', description });
const dt = (name: string, description: string): Property => ({ name, type: 'datetime', description });
const bool = (name: string, description: string): Property => ({ name, type: 'boolean', description });
const oneOf = (name: string, values: string[], description: string): Property => ({ name, type: 'enum', values, description });

const AUD = 'AUD';
const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
const SEGMENTS = ['Construction', 'Utilities', 'Mining', 'Quarry', 'Forestry', 'Industrial', 'Government', 'Rental', 'Waste'];

// ─── Alignment helpers ──────────────────────────────────────────────────────

type Kind = StandardAlignment['kind'];
const schema = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'schema.org', term, iri: `https://schema.org/${term}`, kind });
const gs1 = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'GS1 Web Vocabulary', term, iri: `https://gs1.org/voc/${term}`, kind });
const cbv = (term: string, kind: Kind = 'related'): StandardAlignment => ({ standard: 'GS1 CBV 2.0', term, iri: `https://ref.gs1.org/cbv/${term}`, kind });
const unece = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'UN/CEFACT Vocabulary', term, iri: `https://vocabulary.uncefact.org/${term}`, kind });
const sosa = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'W3C SOSA', term, iri: `http://www.w3.org/ns/sosa/${term}`, kind });
const org = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'W3C ORG', term, iri: `http://www.w3.org/ns/org#${term}`, kind });
/** IOF (Industrial Ontologies Foundry, BFO-based). Since 2025 all IOF classes share the flat `construct/` namespace. */
const IOF_NS = 'https://spec.industrialontologies.org/ontology/construct/';
const iof = (term: string, kind: Kind = 'broadMatch'): StandardAlignment => ({ standard: 'IOF', term, iri: `${IOF_NS}${term}`, kind });
const iofSc = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'IOF Supply Chain', term, iri: `${IOF_NS}${term}`, kind });
const fiboContract: StandardAlignment = { standard: 'FIBO', term: 'Contract', iri: 'https://spec.edmcouncil.org/fibo/ontology/FND/Agreements/Contracts/Contract', kind: 'broadMatch' };
const std = (standard: string, term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard, term, kind });
const cdm = (term: string, kind: Kind = 'closeMatch'): StandardAlignment => ({ standard: 'Microsoft CDM', term, kind });
const scor = (term: string): StandardAlignment => ({ standard: 'ASCM SCOR DS', term, kind: 'related' });
const apqc = (term: string): StandardAlignment => ({ standard: 'APQC PCF 8.0', term, kind: 'related' });

// ─── Binding helpers ────────────────────────────────────────────────────────

const LH_D365 = 'Lakehouse · lh_d365 (Link to Fabric: Dataverse + F&O)';
const fo = (table: string, columns: Record<string, string>, extra: Partial<SystemBinding> = {}): SystemBinding => ({
  system: 'D365 F&O', source: LH_D365, table: `lh_d365.dbo.${table}`, columns, ...extra,
});
const ce = (table: string, columns: Record<string, string>, extra: Partial<SystemBinding> = {}): SystemBinding => ({
  system: 'D365 CE', source: LH_D365, table: `lh_d365.dbo.${table}`, columns, ...extra,
});
const annata = (table: string, columns: Record<string, string>, extra: Partial<SystemBinding> = {}): SystemBinding => ({
  system: 'Annata 365 (F&O)', source: LH_D365, table: `lh_d365.dbo.${table}`, columns, toConfirm: true, ...extra,
});
const komtrax = (table: string, columns: Record<string, string>): SystemBinding => ({
  system: 'KOMTRAX', source: 'Eventhouse · eh_komtrax (ISO 15143-3 / KOMTRAX API feed)', table: `eh_komtrax.${table}`, columns, toConfirm: true,
});
const reference = (table: string, columns: Record<string, string>, system: SystemBinding['system'] = 'Reference data'): SystemBinding => ({
  system, source: 'Lakehouse · lh_reference (curated reference & external feeds)', table: `lh_reference.dbo.${table}`, columns, toConfirm: true,
});

// ─── Domain colours (entities in the same process domain share a hue) ──────

const C = {
  party: '#0078D4',
  product: '#5C2D91',
  sales: '#107C10',
  hensei: '#FFB900',
  logistics: '#00A9E0',
  pdi: '#FF8C00',
  parts: '#008272',
  planning: '#8764B8',
  service: '#D83B01',
  contracts: '#1A5276',
  reman: '#498205',
  support: '#C239B3',
  telematics: '#E81123',
};

// ═══════════════════════════════════════════════════════════════════════════
// ENTITY TYPES
// ═══════════════════════════════════════════════════════════════════════════

// ─── Customers, people & organisation ───────────────────────────────────────

const customer: KomatsuEntityType = {
  id: 'customer', name: 'Customer', icon: '🏢', color: C.party, domain: 'party',
  description: 'An organisation that buys, rents or has Komatsu equipment serviced — from owner-operators to tier-one miners and government.',
  owner: 'Customer Master Data Steward (Sales Operations)',
  synonyms: ['Account (Dataverse)', 'Customer account (F&O)', 'Key account'],
  properties: [
    key('customerAccount', 'D365 customer account number (dual-written CE ↔ F&O)'),
    str('name', 'Registered or trading name'),
    str('abn', 'Australian Business Number (11 digits; schema:taxID)'),
    oneOf('segment', SEGMENTS, 'Primary market segment served'),
    oneOf('customerTier', ['Strategic', 'Key Account', 'Fleet', 'Commercial', 'Owner-Operator', 'Cash'], 'Commercial tier driving coverage model and pricing'),
    oneOf('state', AU_STATES, 'Head-office state'),
    dec('creditLimit', 'Approved credit limit', AUD),
    str('paymentTerms', 'Payment terms code, e.g. 30 days EOM'),
    bool('isOnCreditHold', 'True when the account is blocked for new transactions'),
  ],
  alignments: [schema('Organization'), org('Organization'), iofSc('Customer'), std('OAGIS', 'CustomerPartyMaster', 'related'), cdm('Account')],
  binding: fo('custtable', {
    customerAccount: 'accountnum', name: 'dirpartytable.name', abn: 'vatnum', segment: 'segmentid',
    customerTier: 'custgroup', creditLimit: 'creditmax', paymentTerms: 'paymtermid', isOnCreditHold: 'blocked',
  }, { filter: 'dataareaid = \'kau\'', alternate: 'account (Dataverse, dual-write: accountnumber = accountnum)' }),
};

const customerSite: KomatsuEntityType = {
  id: 'customerSite', name: 'CustomerSite', icon: '📍', color: C.party, domain: 'party',
  description: 'A physical location where a customer operates equipment — a mine, quarry, construction project, depot or yard.',
  owner: 'Customer Master Data Steward (Sales Operations)',
  properties: [
    key('siteId', 'Functional location / delivery address identifier'),
    str('name', 'Site name, e.g. "Hunter Valley Operations — Pit 3"'),
    oneOf('siteType', ['Mine Site', 'Underground Mine', 'Quarry', 'Construction Project', 'Depot', 'Yard', 'Forestry Coupe', 'Council Works'], 'Kind of operating site'),
    oneOf('state', AU_STATES, 'State the site is located in'),
    dbl('latitude', 'WGS84 latitude', 'deg'),
    dbl('longitude', 'WGS84 longitude', 'deg'),
    bool('requiresSiteInduction', 'True when technicians must hold a site induction before attending'),
    bool('isRemote', 'True for fly-in/fly-out or remote-area sites affecting travel and parts logistics'),
  ],
  alignments: [schema('Place'), org('Site'), iof('GeospatialSite', 'related'), std('MIMOSA CCOM', 'Segment (functional location)', 'related'), std('ISO 14224', 'Installation / Plant (taxonomy levels 3–4)', 'related'), cdm('FunctionalLocation')],
  binding: ce('msdyn_functionallocation', {
    siteId: 'msdyn_functionallocationid', name: 'msdyn_name', latitude: 'msdyn_latitude', longitude: 'msdyn_longitude',
  }, { toConfirm: true }),
};

const contact: KomatsuEntityType = {
  id: 'contact', name: 'Contact', icon: '👤', color: C.party, domain: 'party',
  description: 'A person at a customer or supplier organisation that Komatsu deals with — fleet manager, buyer, operator or accounts payable.',
  owner: 'Sales Operations',
  properties: [
    key('contactId', 'Dataverse contact GUID'),
    str('fullName', 'Full name'),
    str('jobTitle', 'Job title'),
    oneOf('contactRole', ['Owner', 'Fleet Manager', 'Maintenance Planner', 'Procurement', 'Accounts Payable', 'Site Supervisor', 'Operator', 'Safety'], 'Role the contact plays in the buying or service relationship'),
    str('email', 'Primary email address'),
    str('phone', 'Primary phone number'),
    bool('marketingOptIn', 'Consent to receive marketing communications'),
  ],
  alignments: [schema('Person'), schema('ContactPoint', 'related'), cdm('Contact')],
  binding: ce('contact', {
    contactId: 'contactid', fullName: 'fullname', jobTitle: 'jobtitle', contactRole: 'accountrolecode',
    email: 'emailaddress1', phone: 'telephone1', marketingOptIn: 'donotbulkemail',
  }),
};

const branch: KomatsuEntityType = {
  id: 'branch', name: 'Branch', icon: '🏪', color: C.party, domain: 'party',
  description: 'A Komatsu Australia operating location — e.g. Fairfield East head office, Wacol DC and reman centre, Welshpool, Utility Central PDI, Truganina rental hub, or an on-site mine office.',
  owner: 'Operations Finance (organisation structure)',
  properties: [
    key('branchCode', 'Operating unit / site code used as a financial dimension'),
    str('name', 'Branch name, e.g. "Wacol" or "Welshpool"'),
    oneOf('branchType', ['Head Office', 'Full Service Branch', 'Parts Outlet', 'Workshop', 'Reman Centre', 'Distribution Centre', 'Mine Site Office', 'Rental and Remarketing Hub', 'Training Centre', 'Oil Analysis Lab'], 'Operating model of the location'),
    oneOf('state', AU_STATES, 'State'),
    str('region', 'Sales/service region the branch reports into'),
    bool('hasWorkshop', 'True when the branch has workshop bays for PDI or repair'),
  ],
  alignments: [org('OrganizationalUnit'), org('Site', 'related'), schema('LocalBusiness', 'broadMatch')],
  binding: fo('inventsite', { branchCode: 'siteid', name: 'name' }, { toConfirm: true }),
};

const salesTerritory: KomatsuEntityType = {
  id: 'salesTerritory', name: 'SalesTerritory', icon: '🗺️', color: C.party, domain: 'party',
  description: 'A geographic and segment-based sales coverage area assigned to a territory manager.',
  owner: 'Sales Operations',
  properties: [
    key('territoryId', 'Territory identifier'),
    str('name', 'Territory name, e.g. "NSW Hunter — Mining"'),
    oneOf('segment', SEGMENTS, 'Segment focus of the territory'),
    oneOf('state', AU_STATES, 'State'),
    dec('annualTarget', 'Annual sales target', AUD),
  ],
  alignments: [schema('AdministrativeArea', 'related'), cdm('Territory')],
  binding: ce('territory', { territoryId: 'territoryid', name: 'name' }),
};

const employee: KomatsuEntityType = {
  id: 'employee', name: 'Employee', icon: '🧑‍💼', color: C.party, domain: 'party',
  description: 'A Komatsu Australia worker acting in a business role — sales, planning, coordination, administration or support.',
  owner: 'People & Culture (HR master data)',
  properties: [
    key('personnelNumber', 'F&O worker personnel number'),
    str('fullName', 'Full name'),
    oneOf('businessRole', [
      'Sales Account Manager', 'Key Account Manager', 'National Business Manager', 'Product Support Rep', 'Customer Project Coordinator',
      'Parts Interpreter', 'Customer Support Rep', 'Inventory and Demand Planner', 'Parts Planner', 'Supply Planner', 'Supply Chain Coordinator',
      'Hensei Planner', 'PDI Planner', 'Service Coordinator', 'Maintenance Planner', 'Estimator', 'Regional Service Manager',
      'Contracts Administrator', 'Warranty Administrator', 'Reman Coordinator', 'Logistics Coordinator', 'Branch Manager',
    ], 'Primary business role (drives data ownership and security roles)'),
    str('email', 'Work email address'),
    bool('isActive', 'True while employed'),
  ],
  alignments: [schema('Person'), org('Membership', 'related'), org('Role', 'related'), cdm('Worker')],
  binding: fo('hcmworker', { personnelNumber: 'personnelnumber', fullName: 'name', email: 'primarycontactemail' }, { toConfirm: true }),
};

const supplier: KomatsuEntityType = {
  id: 'supplier', name: 'Supplier', icon: '🚚', color: C.party, domain: 'party',
  description: 'An organisation Komatsu Australia buys from — Komatsu factories and parts depots, local OEM and aftermarket vendors, carriers, forwarders and customs brokers.',
  owner: 'Procurement',
  properties: [
    key('vendorAccount', 'F&O vendor account number'),
    str('name', 'Supplier name'),
    oneOf('supplierType', ['Komatsu Factory', 'Komatsu Parts Depot', 'Intercompany', 'Local OEM', 'Aftermarket Vendor', 'Subcontractor', 'Transport Carrier', 'Freight Forwarder', 'Customs Broker'], 'Role the supplier plays in the supply chain'),
    str('abn', 'Australian Business Number (local suppliers)'),
    str('countryCode', 'ISO 3166 country of the supplying entity'),
    int('leadTimeDays', 'Standard replenishment lead time', 'days'),
    bool('isPreferred', 'Preferred supplier flag'),
    dec('onTimeInFullPct', 'Rolling on-time-in-full delivery performance', '%'),
  ],
  alignments: [schema('Organization'), iofSc('Supplier'), org('Organization'), std('OAGIS', 'SupplierPartyMaster', 'related'), cdm('Vendor')],
  binding: fo('vendtable', {
    vendorAccount: 'accountnum', name: 'dirpartytable.name', supplierType: 'vendgroup', abn: 'vatnum', countryCode: 'countryregionid',
  }, { alternate: 'msdyn_vendor (Dataverse, dual-write)' }),
};

// ─── Product & equipment master ─────────────────────────────────────────────

const machineType: KomatsuEntityType = {
  id: 'machineType', name: 'MachineType', icon: '🧭', color: C.product, domain: 'product',
  description: 'A basic type of machine as classified by ISO 6165 (e.g. hydraulic excavator, crawler dozer, rigid dumper, grader).',
  owner: 'Product Marketing',
  properties: [
    key('machineTypeCode', 'Internal machine type code'),
    str('name', 'Type name, e.g. "Hydraulic excavator"'),
    str('iso6165Term', 'Matching ISO 6165 basic type term'),
    str('unspscCode', 'UNSPSC commodity code, e.g. 22101526 (track excavators)'),
    oneOf('productLine', ['Construction', 'Utility', 'Surface Mining', 'Underground Mining', 'Forestry', 'Industrial'], 'Komatsu product line the type belongs to'),
  ],
  alignments: [std('ISO 6165', 'Earth-moving machinery — basic types', 'exactMatch'), std('UNSPSC', '2210 Heavy construction machinery and equipment', 'broadMatch'), schema('ProductGroup', 'related')],
  binding: reference('machine_type', { machineTypeCode: 'machine_type_code', name: 'name', iso6165Term: 'iso6165_term', unspscCode: 'unspsc_code', productLine: 'product_line' }),
};

const machineModel: KomatsuEntityType = {
  id: 'machineModel', name: 'MachineModel', icon: '🚜', color: C.product, domain: 'product',
  description: 'A Komatsu machine model and series, e.g. PC210LC-11, D375A-8, WA500-8 or 930E-5, that units are built to.',
  owner: 'Product Marketing',
  synonyms: ['Device model (Annata)', 'Model code', 'Device class / model (CDM Automotive)'],
  properties: [
    key('modelCode', 'Model and series code, e.g. PC210LC-11'),
    str('series', 'Generation / dash number, e.g. -11'),
    oneOf('productLine', ['Construction', 'Utility', 'Surface Mining', 'Underground Mining', 'Forestry', 'Industrial'], 'Product line'),
    dec('operatingWeightKg', 'Nominal operating weight', 'kg'),
    dec('enginePowerKw', 'Rated engine power', 'kW'),
    oneOf('powertrain', ['Diesel', 'Hybrid', 'Diesel-Electric', 'Battery-Electric', 'Trolley-Assist', 'Electric (cable)'], 'Powertrain / energy source'),
    bool('isCurrentModel', 'True while the model is available to order'),
    dec('listPrice', 'Current recommended retail price (base spec)', AUD),
  ],
  alignments: [schema('ProductModel', 'exactMatch'), std('MIMOSA CCOM', 'Model / ModelVariant'), { standard: 'GoodRelations', term: 'ProductOrServiceModel', iri: 'http://purl.org/goodrelations/v1#ProductOrServiceModel', kind: 'closeMatch' }],
  binding: annata('amdevicemodel', { modelCode: 'modelid', series: 'modelcode', operatingWeightKg: 'operatingweight', enginePowerKw: 'enginepower' }, { alternate: 'msauto_devicemodel / msauto_devicemodelcode (Dataverse)' }),
};

const machineOption: KomatsuEntityType = {
  id: 'machineOption', name: 'MachineOption', icon: '🧩', color: C.product, domain: 'product',
  description: 'A factory option, locally fitted kit, attachment or Australian compliance item that configures a machine (e.g. fire suppression, mine-spec pack, tilt bucket).',
  owner: 'Product Marketing',
  synonyms: ['Configuration option (Annata)', 'Local option', 'Attachment', 'Fit-out kit'],
  properties: [
    key('optionCode', 'Option or kit code'),
    str('name', 'Option name'),
    oneOf('optionType', ['Factory Option', 'Local Fitment Kit', 'Attachment', 'Compliance Item', 'Technology (Smart Construction)'], 'How and where the option is supplied'),
    bool('isMandatoryForAU', 'Required for Australian compliance or site rules'),
    str('complianceStandard', 'Standard satisfied, e.g. MDG 15, AS 2958.1, ISO 3471 ROPS'),
    dec('fitmentHours', 'Standard fitment labour when fitted at PDI', 'hours'),
    dec('listPrice', 'Recommended retail price', AUD),
  ],
  alignments: [schema('Product', 'broadMatch'), schema('isAccessoryOrSparePartFor', 'related')],
  binding: annata('amdeviceconfigoption', { optionCode: 'optionid', name: 'name', optionType: 'optiontype' }, { alternate: 'msauto_configurationoption (Dataverse)' }),
};

const equipmentUnit: KomatsuEntityType = {
  id: 'equipmentUnit', name: 'EquipmentUnit', icon: '🏗️', color: C.product, domain: 'product',
  description: 'An individual serialised machine (Annata "device") tracked from factory order through stock, PDI, delivery, service life, trade-in and disposal.',
  owner: 'Equipment Administration (Annata device master)',
  synonyms: ['Device (Annata)', 'Unit', 'Machine', 'Customer asset (Field Service)', 'Stock unit'],
  properties: [
    key('serialNumber', 'Komatsu machine serial number'),
    str('pin', 'ISO 10261 17-character PIN (3 manufacturer code + 5 descriptor + 1 check + 8 serial)'),
    str('stockNumber', 'Internal stock / unit number while in Komatsu inventory'),
    oneOf('unitStatus', ['On Order', 'In Production', 'In Transit', 'In Stock', 'In PDI', 'Ready for Delivery', 'Delivered', 'In Service', 'Rental Fleet', 'Used Stock', 'Sold', 'Scrapped'], 'Lifecycle status of the unit'),
    oneOf('ownershipType', ['Komatsu Stock', 'Customer Owned', 'Rental Fleet', 'Demonstrator', 'Consignment', 'Leased'], 'Who owns the unit'),
    dec('smrHours', 'Latest service meter reading', 'hours'),
    int('yearOfManufacture', 'Year the unit was built'),
    date('deliveryDate', 'Date the unit was handed over to the first customer'),
    date('warrantyStartDate', 'Start of the factory warranty period'),
    bool('komtraxEnabled', 'True when KOMTRAX / KOMTRAX Plus telematics is active'),
  ],
  alignments: [schema('IndividualProduct', 'exactMatch'), iof('PieceOfEquipment', 'closeMatch'), std('ISO 10261', 'Product identification number (PIN)'), std('MIMOSA CCOM', 'Asset'), std('ISO 14224', 'Equipment unit (taxonomy level 6)'), std('GS1', 'GIAI (AI 8004) individual asset identifier', 'related'), cdm('CustomerAsset')],
  binding: annata('amdevicetable', {
    serialNumber: 'serialnumber', pin: 'vin', stockNumber: 'deviceid', unitStatus: 'devicestatus', ownershipType: 'ownership',
    smrHours: 'lastcountervalue', yearOfManufacture: 'modelyear', deliveryDate: 'deliverydate', warrantyStartDate: 'warrantystartdate',
  }, { alternate: 'msauto_device (Dataverse) / msdyn_customerasset (Field Service)' }),
};

const component: KomatsuEntityType = {
  id: 'component', name: 'Component', icon: '⚙️', color: C.product, domain: 'product',
  description: 'A serialised major component (engine, transmission, final drive, pump, wheel motor…) that is installed on a unit, removed as a core and remanufactured.',
  owner: 'Product Support / Component Management',
  synonyms: ['Major component', 'Child device (Annata device hierarchy)', 'Exchange component'],
  properties: [
    key('componentSerial', 'Component serial number'),
    oneOf('componentType', ['Engine', 'Transmission', 'Torque Converter', 'Final Drive', 'Differential', 'Hydraulic Pump', 'Swing Machinery', 'Travel Motor', 'Wheel Motor', 'Alternator', 'Cylinder', 'Radiator', 'Axle'], 'Kind of major component'),
    oneOf('componentStatus', ['Installed', 'Removed - Core', 'In Rebuild', 'Reman Stock', 'Scrapped'], 'Where the component is in its lifecycle'),
    date('installedDate', 'Date installed on the current unit'),
    dec('hoursAtInstall', 'Unit SMR when installed', 'hours'),
    dec('componentHours', 'Hours accumulated by this component', 'hours'),
    dec('lifeTargetHours', 'Planned component replacement (PCR) life target', 'hours'),
    int('rebuildCount', 'Number of times this component has been remanufactured'),
  ],
  alignments: [iof('MaintainableMaterialItem', 'closeMatch'), iof('MaterialComponent', 'broadMatch'), std('ISO 14224', 'Subunit / maintainable item (levels 7–8)'), std('MIMOSA CCOM', 'Asset + AssetSegmentEvent (install / remove)'), std('GS1', 'SGTIN / GIAI serialised identifier', 'related')],
  binding: annata('amdevicetable', { componentSerial: 'serialnumber', componentType: 'deviceclass', installedDate: 'installeddate' }, { filter: 'device class = major component (child of a machine device)', alternate: 'msauto_devicecomponent (Dataverse)' }),
};

const part: KomatsuEntityType = {
  id: 'part', name: 'Part', icon: '🔩', color: C.product, domain: 'product',
  description: 'A stocked or orderable part number — Komatsu Genuine, reman exchange, filters, oils, GET, undercarriage, kits and approved aftermarket items.',
  owner: 'Parts Product Management',
  synonyms: ['Item', 'Released product', 'Part number', 'SKU'],
  properties: [
    key('partNumber', 'Komatsu or supplier part number'),
    str('description', 'Part description'),
    str('brand', 'Brand, e.g. Komatsu Genuine, Hensley, KVX'),
    oneOf('partCategory', ['Genuine', 'Reman Exchange', 'Filter', 'Oil and Lubricant', 'Ground Engaging Tools', 'Undercarriage', 'Kit', 'Attachment', 'Aftermarket', 'Consumable'], 'Commercial category'),
    oneOf('lifecycleStatus', ['Active', 'Superseded', 'Obsolete', 'No Longer Available'], 'Engineering / supply lifecycle status'),
    oneOf('abcClass', ['A', 'B', 'C', 'D'], 'Value/velocity classification used by parts planning'),
    str('unitOfMeasure', 'Stocking unit of measure'),
    dec('listPrice', 'Parts list price', AUD),
    dec('weightKg', 'Net weight', 'kg'),
    str('hsCode', 'Harmonized System tariff code for import (e.g. 8431.49)'),
    bool('isSerialised', 'True when each unit is serial-tracked (reman components, attachments)'),
    bool('isDangerousGoods', 'True for batteries, pressurised or flammable items'),
  ],
  alignments: [schema('Product', 'exactMatch'), gs1('Product'), iof('MaterialProduct', 'closeMatch'), std('UNSPSC', '22101700 Heavy equipment components', 'broadMatch'), std('OAGIS', 'ItemMaster', 'related'), cdm('ReleasedProduct')],
  binding: fo('inventtable', {
    partNumber: 'itemid', description: 'namealias', abcClass: 'abcrevenue', unitOfMeasure: 'unitid', weightKg: 'netweight', hsCode: 'intracode',
  }),
};

const partInterchange: KomatsuEntityType = {
  id: 'partInterchange', name: 'PartInterchange', icon: '🔁', color: C.product, domain: 'product',
  description: 'A supersession, interchangeability or reman-alternate link from one part number to another.',
  owner: 'Parts Product Management',
  synonyms: ['Supersession', 'Alternate part', 'Multi-level supersession (Annata)'],
  properties: [
    key('interchangeId', 'Interchange record identifier'),
    oneOf('interchangeType', ['One-way Supersession', 'Two-way Interchangeable', 'Reman Alternate', 'Kit Replacement'], 'Nature of the substitution'),
    date('effectiveDate', 'Date the interchange takes effect'),
    dec('quantityRatio', 'New-part quantity per old-part quantity'),
    bool('useUpOldStock', 'True when existing stock of the old part should be consumed first'),
  ],
  alignments: [gs1('replacedByProduct', 'closeMatch'), schema('successorOf', 'related'), std('OAGIS', 'ItemMaster (supersession)', 'related')],
  binding: annata('amitemsupersession', { interchangeId: 'recid', interchangeType: 'supersessiontype', effectiveDate: 'fromdate' }),
};

// ─── Hensei & factory ordering ──────────────────────────────────────────────

const factory: KomatsuEntityType = {
  id: 'factory', name: 'Factory', icon: '🏭', color: C.hensei, domain: 'hensei',
  description: 'A Komatsu group manufacturing plant that builds machines or components for Australia (e.g. Awazu, Osaka, Ibaraki, Rayong, Jakarta, Peoria, Milwaukee).',
  owner: 'Hensei Planner (Machine Supply)',
  properties: [
    key('factoryCode', 'Factory code used on factory orders'),
    str('name', 'Plant name'),
    str('countryCode', 'ISO 3166 country code'),
    str('legalEntity', 'Komatsu group entity that invoices from this plant'),
    int('standardLeadTimeDays', 'Typical order-to-ship lead time', 'days'),
  ],
  alignments: [iof('Factory', 'closeMatch'), org('Site'), iof('Manufacturer', 'related')],
  binding: reference('factory', { factoryCode: 'factory_code', name: 'name', countryCode: 'country_code', legalEntity: 'legal_entity' }, 'Komatsu factory systems'),
};

const machineDemandForecast: KomatsuEntityType = {
  id: 'machineDemandForecast', name: 'MachineDemandForecast', icon: '📈', color: C.hensei, domain: 'hensei',
  description: 'A monthly machine demand forecast by model and segment (S&OP) that feeds the Hensei order cycle.',
  owner: 'Machine Supply Planning / S&OP',
  properties: [
    key('machineForecastId', 'Forecast record identifier'),
    date('forecastMonth', 'Month the demand is expected'),
    oneOf('segment', SEGMENTS, 'Segment the demand comes from'),
    int('forecastUnits', 'Forecast number of units', 'units'),
    oneOf('forecastType', ['Statistical', 'Sales Input', 'Consensus', 'Committed Backlog'], 'Forecast layer in the S&OP process'),
    str('forecastVersion', 'S&OP cycle / version label'),
  ],
  alignments: [iof('SupplyChainPlanSpecification', 'related'), scor('Plan: Plan supply chain (demand plan)'), apqc('4.0 Manage Supply Chain for Physical Products')],
  binding: fo('forecastsales', { machineForecastId: 'recid', forecastMonth: 'startdate', forecastUnits: 'salesqty', forecastVersion: 'modelid' }, { toConfirm: true }),
};

const henseiCycle: KomatsuEntityType = {
  id: 'henseiCycle', name: 'HenseiCycle', icon: '🗓️', color: C.hensei, domain: 'hensei',
  description: 'A monthly Hensei cycle — Komatsu\'s HANSEI (販生, "sales + production") SIOP process — in which Komatsu Australia submits machine demand and orders to the factories and receives production allocations.',
  synonyms: ['Hansei', 'HANSEI (販生)', 'SIOP cycle', 'Monthly factory order cycle'],
  owner: 'Hensei Planner (Machine Supply)',
  properties: [
    key('henseiCycleId', 'Cycle identifier, e.g. HEN-2026-10'),
    date('cycleMonth', 'Month the order submission belongs to'),
    date('productionMonth', 'Target factory production month'),
    date('submissionDeadline', 'Cut-off for submitting requests to the factory'),
    oneOf('status', ['Open', 'Submitted', 'Allocated', 'Confirmed', 'Closed'], 'Cycle status'),
  ],
  alignments: [scor('Plan / Order (O3 intra-company): Sales & operations planning'), apqc('4.0 Manage Supply Chain for Physical Products')],
  binding: reference('hensei_cycle', { henseiCycleId: 'hensei_cycle_id', cycleMonth: 'cycle_month', productionMonth: 'production_month', submissionDeadline: 'submission_deadline', status: 'status' }, 'Komatsu factory systems'),
};

const henseiRequest: KomatsuEntityType = {
  id: 'henseiRequest', name: 'HenseiRequest', icon: '📝', color: C.hensei, domain: 'hensei',
  description: 'A line in a Hensei submission requesting production slots for a model and specification — stock, customer-backed, rental fleet or demonstrator.',
  owner: 'Hensei Planner (Machine Supply)',
  properties: [
    key('henseiRequestId', 'Request line identifier'),
    str('specCode', 'Factory specification / option code set'),
    oneOf('requestType', ['Stock', 'Customer Backed', 'Rental Fleet', 'Demonstrator', 'Mining Fleet Contract'], 'Why the machine is being ordered'),
    int('requestedUnits', 'Units requested', 'units'),
    int('allocatedUnits', 'Units allocated by the factory', 'units'),
    oneOf('allocationStatus', ['Requested', 'Allocated', 'Partially Allocated', 'Deferred', 'Declined'], 'Factory allocation outcome'),
    date('requestedShipMonth', 'Month the machine is required ex-factory'),
  ],
  alignments: [schema('Order', 'broadMatch'), scor('Source: Schedule product deliveries')],
  binding: reference('hensei_request', { henseiRequestId: 'hensei_request_id', specCode: 'spec_code', requestType: 'request_type', requestedUnits: 'requested_qty', allocatedUnits: 'allocated_qty', allocationStatus: 'allocation_status' }, 'Komatsu factory systems'),
};

const factoryOrder: KomatsuEntityType = {
  id: 'factoryOrder', name: 'FactoryOrder', icon: '🧾', color: C.hensei, domain: 'hensei',
  description: 'A confirmed machine order placed on a Komatsu factory for one unit, carrying the build specification, production month and planned ship date.',
  owner: 'Hensei Planner (Machine Supply)',
  properties: [
    key('factoryOrderNumber', 'Factory order / intercompany purchase order number'),
    date('orderDate', 'Date the order was placed on the factory'),
    date('productionMonth', 'Allocated production month'),
    date('plannedShipDate', 'Planned ex-factory (ETD) date'),
    oneOf('status', ['Placed', 'Scheduled', 'In Production', 'Built', 'Shipped', 'Received', 'Cancelled'], 'Factory order status'),
    dec('fobCost', 'Free-on-board cost from the factory', AUD),
  ],
  alignments: [iofSc('PurchaseOrder', 'closeMatch'), schema('Order'), std('OAGIS', 'PurchaseOrder (intercompany)', 'related'), scor('Order (O3 intra-company) / Source')],
  binding: fo('purchtable', { factoryOrderNumber: 'purchid', orderDate: 'accountingdate', plannedShipDate: 'deliverydate', status: 'purchstatus' }, { filter: 'purchpoolid = \'MACHINE\'', toConfirm: true }),
};

// ─── Sales to cash ──────────────────────────────────────────────────────────

const opportunity: KomatsuEntityType = {
  id: 'opportunity', name: 'Opportunity', icon: '🎯', color: C.sales, domain: 'sales',
  description: 'A qualified sales pursuit for machines, parts, service, contracts or reman — tracked through the pipeline in D365 Sales.',
  owner: 'Sales Operations',
  synonyms: ['Deal (Annata / CDM Automotive)', 'Pipeline opportunity'],
  properties: [
    key('opportunityId', 'Dataverse opportunity GUID'),
    str('topic', 'Opportunity topic'),
    oneOf('opportunityType', ['New Machine', 'Used Machine', 'Fleet Tender', 'Parts Supply', 'Service Contract', 'Repair Quote', 'Reman', 'Technology'], 'What is being sold'),
    oneOf('salesStage', ['Qualify', 'Develop', 'Propose', 'Negotiate', 'Won', 'Lost'], 'Pipeline stage'),
    dec('estimatedValue', 'Estimated revenue', AUD),
    int('winProbability', 'Win probability', '%'),
    date('estimatedCloseDate', 'Expected decision date'),
    str('primaryCompetitor', 'Main competing brand (e.g. Caterpillar, Hitachi, Volvo, Liebherr)'),
  ],
  alignments: [cdm('Opportunity', 'exactMatch'), schema('Demand', 'related')],
  binding: ce('opportunity', {
    opportunityId: 'opportunityid', topic: 'name', salesStage: 'stepname', estimatedValue: 'estimatedvalue',
    winProbability: 'closeprobability', estimatedCloseDate: 'estimatedclosedate',
  }),
};

const salesQuote: KomatsuEntityType = {
  id: 'salesQuote', name: 'SalesQuote', icon: '💬', color: C.sales, domain: 'sales',
  description: 'A priced offer to a customer — machine deal, parts quote, repair estimate, contract proposal or reman exchange quote.',
  owner: 'Sales Operations',
  properties: [
    key('quoteNumber', 'Quote number'),
    oneOf('quoteType', ['Machine', 'Parts', 'Repair Estimate', 'Service Contract', 'Reman Exchange'], 'What is being quoted'),
    int('revision', 'Quote revision number'),
    oneOf('status', ['Draft', 'Active', 'Won', 'Lost', 'Expired', 'Revised'], 'Quote status'),
    dec('totalAmount', 'Total quoted amount excluding GST', AUD),
    date('validUntil', 'Quote expiry date'),
  ],
  alignments: [schema('Offer', 'exactMatch'), cdm('Quote')],
  binding: ce('quote', { quoteNumber: 'quotenumber', revision: 'revisionnumber', status: 'statuscode', totalAmount: 'totalamount', validUntil: 'effectiveto' }, { alternate: 'salesquotationtable (F&O, dual-write)' }),
};

const salesOrder: KomatsuEntityType = {
  id: 'salesOrder', name: 'SalesOrder', icon: '🛒', color: C.sales, domain: 'sales',
  description: 'A confirmed customer order — machine sale, parts order (stock, counter, online or machine-down VOR), reman exchange or internal order.',
  owner: 'Sales Administration / Parts Operations',
  properties: [
    key('salesOrderNumber', 'F&O sales order number'),
    oneOf('orderType', ['Machine Sale', 'Used Machine Sale', 'Parts Stock Order', 'Parts Counter', 'Parts Online', 'Parts VOR', 'Reman Exchange', 'Service Parts', 'Internal'], 'Order type (sales pool)'),
    oneOf('orderPriority', ['Standard', 'Urgent', 'Machine Down (VOR)', 'Scheduled'], 'Fulfilment priority'),
    oneOf('orderChannel', ['Sales Rep', 'Parts Counter', 'Phone', 'Customer Portal', 'EDI', 'Contract Auto-replenish'], 'Channel the order arrived through'),
    oneOf('status', ['Open', 'Backordered', 'Delivered', 'Invoiced', 'Cancelled'], 'Order status'),
    date('orderDate', 'Order creation date'),
    date('requestedDate', 'Customer requested delivery date'),
    str('customerPoNumber', 'Customer purchase order reference'),
    dec('totalAmount', 'Order total excluding GST', AUD),
  ],
  alignments: [schema('Order', 'exactMatch'), std('OAGIS', 'SalesOrder'), cdm('SalesOrder'), scor('Order: Receive and validate order')],
  binding: fo('salestable', {
    salesOrderNumber: 'salesid', orderType: 'salespoolid', status: 'salesstatus', orderDate: 'createddatetime',
    requestedDate: 'shippingdaterequested', customerPoNumber: 'purchorderformnum',
  }, { alternate: 'salesorder (Dataverse, dual-write)' }),
};

const salesOrderLine: KomatsuEntityType = {
  id: 'salesOrderLine', name: 'SalesOrderLine', icon: '📄', color: C.sales, domain: 'sales',
  description: 'A line on a sales order for a quantity of a part or for a specific equipment unit.',
  owner: 'Sales Administration / Parts Operations',
  properties: [
    key('salesLineId', 'Inventory transaction id of the line'),
    int('lineNumber', 'Line number'),
    dec('quantity', 'Ordered quantity'),
    dec('unitPrice', 'Net unit price', AUD),
    dec('lineAmount', 'Line amount excluding GST', AUD),
    date('confirmedShipDate', 'Confirmed ship date'),
    oneOf('lineStatus', ['Open', 'Reserved', 'Backordered', 'Picked', 'Shipped', 'Invoiced', 'Cancelled'], 'Fulfilment status'),
    bool('isBackordered', 'True when the line cannot be filled from available stock'),
  ],
  alignments: [schema('OrderItem', 'exactMatch'), cdm('SalesOrderLine')],
  binding: fo('salesline', {
    salesLineId: 'inventtransid', lineNumber: 'linenum', quantity: 'salesqty', unitPrice: 'salesprice',
    lineAmount: 'lineamount', confirmedShipDate: 'shippingdateconfirmed', lineStatus: 'salesstatus',
  }),
};

const tradeIn: KomatsuEntityType = {
  id: 'tradeIn', name: 'TradeIn', icon: '♻️', color: C.sales, domain: 'sales',
  description: 'A used machine taken in part-exchange on a machine deal, appraised (KVUES) and later resold as used or Premium Used equipment.',
  owner: 'Used Equipment Manager',
  properties: [
    key('tradeInId', 'Trade-in appraisal identifier'),
    str('make', 'Manufacturer (any brand)'),
    str('model', 'Model description'),
    str('tradeInSerial', 'Serial number of the traded machine'),
    dec('smrHours', 'Hours at appraisal', 'hours'),
    dec('appraisedValue', 'Wholesale appraisal', AUD),
    dec('allowanceValue', 'Allowance given to the customer', AUD),
    oneOf('status', ['Appraised', 'Accepted', 'Received', 'Refurbishing', 'Resold', 'Auctioned'], 'Trade-in status'),
  ],
  alignments: [schema('Offer', 'related'), schema('OwnershipInfo', 'related')],
  binding: annata('amtradein', { tradeInId: 'tradeinid', make: 'make', model: 'model', tradeInSerial: 'serialnumber', appraisedValue: 'appraisalvalue', allowanceValue: 'tradeinvalue' }, { alternate: 'msauto_tradein (Dataverse)' }),
};

const financeAgreement: KomatsuEntityType = {
  id: 'financeAgreement', name: 'FinanceAgreement', icon: '🏦', color: C.sales, domain: 'sales',
  description: 'An equipment finance arrangement (e.g. through Komatsu Australia Corporate Finance) that funds a machine purchase.',
  owner: 'Komatsu Finance',
  properties: [
    key('financeAgreementId', 'Finance contract number'),
    oneOf('financeType', ['Chattel Mortgage', 'Finance Lease', 'Operating Lease', 'Hire Purchase', 'Rent to Own'], 'Finance product'),
    str('financier', 'Financier, e.g. Komatsu Australia Corporate Finance or third-party bank'),
    dec('amountFinanced', 'Principal amount financed', AUD),
    int('termMonths', 'Term', 'months'),
    dec('interestRatePct', 'Interest rate', '%'),
    date('startDate', 'Commencement date'),
    oneOf('status', ['Application', 'Approved', 'Settled', 'Active', 'Paid Out', 'Declined'], 'Agreement status'),
  ],
  alignments: [fiboContract, { standard: 'FIBO', term: 'Loan', iri: 'https://spec.edmcouncil.org/fibo/ontology/LOAN/LoansGeneral/Loans/Loan', kind: 'closeMatch' }],
  binding: reference('finance_agreement', { financeAgreementId: 'contract_number', financeType: 'finance_type', financier: 'financier', amountFinanced: 'amount_financed', termMonths: 'term_months', status: 'status' }, 'KACF finance system'),
};

const priceList: KomatsuEntityType = {
  id: 'priceList', name: 'PriceList', icon: '🏷️', color: C.sales, domain: 'sales',
  description: 'A price group or trade agreement that sets machine, parts or labour prices for a set of customers or a contract.',
  owner: 'Pricing Manager',
  properties: [
    key('priceGroupId', 'F&O price / discount group'),
    str('name', 'Price list name'),
    oneOf('priceListType', ['Parts List', 'Machine List', 'Labour Rates', 'Contract Pricing', 'Mining Fleet Agreement', 'Government Panel'], 'What the price list governs'),
    date('validFrom', 'Effective from'),
    date('validTo', 'Effective to'),
    str('currencyCode', 'ISO 4217 currency'),
  ],
  alignments: [schema('PriceSpecification', 'closeMatch'), cdm('PriceList')],
  binding: fo('pricediscgroup', { priceGroupId: 'groupid', name: 'name' }),
};

const customerInvoice: KomatsuEntityType = {
  id: 'customerInvoice', name: 'CustomerInvoice', icon: '💵', color: C.sales, domain: 'sales',
  description: 'A tax invoice or credit note issued to a customer for machines, parts, service, contracts or core credits.',
  owner: 'Accounts Receivable',
  properties: [
    key('invoiceNumber', 'Invoice number'),
    date('invoiceDate', 'Invoice date'),
    oneOf('invoiceType', ['Machine', 'Parts', 'Service', 'Contract', 'Reman', 'Core Credit', 'Rental'], 'Revenue stream'),
    dec('invoiceAmount', 'Amount excluding GST', AUD),
    dec('gstAmount', 'GST amount', AUD),
    date('dueDate', 'Payment due date'),
    oneOf('paymentStatus', ['Open', 'Part Paid', 'Paid', 'Disputed', 'Written Off'], 'Payment status'),
  ],
  alignments: [schema('Invoice', 'exactMatch'), std('UN/CEFACT', 'Cross Industry Invoice', 'related'), cdm('Invoice')],
  binding: fo('custinvoicejour', { invoiceNumber: 'invoiceid', invoiceDate: 'invoicedate', invoiceAmount: 'salesbalance', gstAmount: 'sumtax', dueDate: 'duedate' }),
};

const machineHandover: KomatsuEntityType = {
  id: 'machineHandover', name: 'MachineHandover', icon: '🤝', color: C.sales, domain: 'sales',
  description: 'The delivery and handover of a unit to the customer — operator familiarisation, warranty registration and KOMTRAX activation.',
  owner: 'Customer Project Coordinator',
  synonyms: ['Delivery', 'Machine delivery', 'Commissioning'],
  properties: [
    key('handoverId', 'Handover / delivery record identifier'),
    date('scheduledDate', 'Planned delivery date'),
    date('handoverDate', 'Actual handover date'),
    dec('smrAtHandover', 'Service meter at handover', 'hours'),
    bool('operatorTrainingDone', 'Operator familiarisation completed'),
    bool('warrantyRegistered', 'Warranty registered with the factory'),
    bool('komtraxActivated', 'KOMTRAX subscription activated for the customer'),
    str('deliveryDocketNumber', 'Signed delivery docket reference'),
  ],
  alignments: [cbv('BizStep-accepting', 'closeMatch'), std('MIMOSA CCOM', 'AssetOwnerEvent', 'related'), schema('OwnershipInfo', 'related'), scor('Fulfill: Install product')],
  binding: annata('amdevicedelivery', { handoverId: 'deliveryid', scheduledDate: 'planneddeliverydate', handoverDate: 'deliverydate' }),
};

// ─── Import & logistics ─────────────────────────────────────────────────────

const shipment: KomatsuEntityType = {
  id: 'shipment', name: 'Shipment', icon: '🚢', color: C.logistics, domain: 'logistics',
  description: 'A physical movement of machines or parts — inbound from a factory or depot, between warehouses, or outbound to a customer site.',
  owner: 'Logistics Coordinator',
  properties: [
    key('shipmentId', 'Shipment / consignment identifier'),
    oneOf('direction', ['Inbound Import', 'Inbound Domestic', 'Transfer', 'Outbound Delivery', 'Return'], 'Direction of movement'),
    oneOf('transportMode', ['Ro-Ro Vessel', 'Breakbulk Vessel', 'Container', 'Air Freight', 'Road', 'Road (Oversize)', 'Rail', 'Courier'], 'Transport mode'),
    str('billOfLading', 'Bill of lading / air waybill / con-note number'),
    str('incoterm', 'Incoterms 2020 rule, e.g. FOB, CIF, DAP'),
    date('dispatchDate', 'Date dispatched'),
    date('etaDate', 'Estimated arrival date'),
    date('arrivalDate', 'Actual arrival date'),
    oneOf('status', ['Booked', 'In Transit', 'At Port', 'Held', 'Cleared', 'Delivered', 'Exception'], 'Shipment status'),
    bool('requiresOversizePermit', 'True when the road leg needs an oversize/overmass (OSOM) permit under HVNL'),
  ],
  alignments: [iofSc('Shipment', 'closeMatch'), unece('Consignment'), std('GS1', 'SSCC logistic unit', 'related'), std('OAGIS', 'Shipment'), scor('Fulfill: Transport product')],
  binding: fo('whsshipmenttable', { shipmentId: 'shipmentid', transportMode: 'modecode', billOfLading: 'billofladingid', status: 'shipmentstatus' }, { toConfirm: true }),
};

const vesselVoyage: KomatsuEntityType = {
  id: 'vesselVoyage', name: 'VesselVoyage', icon: '⚓', color: C.logistics, domain: 'logistics',
  description: 'A ship voyage carrying imported machines or containers from an origin port to an Australian port of discharge.',
  owner: 'Logistics Coordinator',
  properties: [
    key('voyageId', 'Voyage reference (vessel + voyage number)'),
    str('vesselName', 'Vessel name'),
    str('shippingLine', 'Shipping line / operator'),
    str('portOfLoading', 'Origin port (UN/LOCODE)'),
    str('portOfDischarge', 'Australian discharge port (UN/LOCODE), e.g. AUPKL, AUBNE, AUFRE'),
    date('etdDate', 'Estimated departure'),
    date('etaDate', 'Estimated arrival'),
    date('arrivalDate', 'Actual arrival'),
  ],
  alignments: [unece('TransportMovement'), schema('Trip', 'broadMatch')],
  binding: fo('itmtable', { voyageId: 'shipid', vesselName: 'vesselname', etdDate: 'shipdate', etaDate: 'shipconfirmdate' }, { toConfirm: true }),
};

const customsEntry: KomatsuEntityType = {
  id: 'customsEntry', name: 'CustomsEntry', icon: '🛃', color: C.logistics, domain: 'logistics',
  description: 'An Australian Border Force import declaration (full import declaration) lodged by a customs broker to clear a shipment.',
  owner: 'Logistics Coordinator',
  properties: [
    key('entryNumber', 'Import declaration number'),
    date('lodgementDate', 'Date lodged in the Integrated Cargo System'),
    str('tariffCode', 'Principal tariff classification, e.g. 8429.52 excavators, 8431.49 parts, 8704.10 dumpers'),
    dec('customsValue', 'Customs value', AUD),
    dec('dutyAmount', 'Customs duty payable', AUD),
    dec('gstAmount', 'Import GST payable', AUD),
    oneOf('status', ['Lodged', 'Held', 'Cleared', 'Amended'], 'Clearance status'),
  ],
  alignments: [unece('ExchangedDeclaration'), std('WCO Data Model', 'Goods Declaration', 'closeMatch'), std('Harmonized System', '8429 / 8431 / 8704.10', 'related')],
  binding: reference('customs_entry', { entryNumber: 'entry_number', lodgementDate: 'lodgement_date', tariffCode: 'tariff_code', dutyAmount: 'duty_amount', gstAmount: 'gst_amount', status: 'status' }, 'Customs broker (ICS)'),
};

const biosecurityInspection: KomatsuEntityType = {
  id: 'biosecurityInspection', name: 'BiosecurityInspection', icon: '🐞', color: C.logistics, domain: 'logistics',
  description: 'A Department of Agriculture biosecurity inspection or treatment of imported machinery (cleanliness, BMSB seasonal measures) before release.',
  owner: 'Logistics Coordinator',
  properties: [
    key('inspectionId', 'Inspection / direction record identifier'),
    date('inspectionDate', 'Date of inspection'),
    bool('isBmsbSeason', 'True when brown marmorated stink bug seasonal measures apply'),
    oneOf('treatment', ['None', 'Heat Treatment', 'Sulfuryl Fluoride', 'Methyl Bromide', 'Re-clean'], 'Treatment applied'),
    oneOf('result', ['Released', 'Directed to Re-clean', 'Directed to Treat', 'Export or Destroy'], 'Inspection outcome'),
    dec('cleaningCost', 'Cost of cleaning / treatment', AUD),
  ],
  alignments: [unece('InspectionEvent'), cbv('BizStep-inspecting'), std('DAFF BICON', 'Machinery and equipment import conditions', 'related')],
  binding: reference('biosecurity_inspection', { inspectionId: 'inspection_id', inspectionDate: 'inspection_date', isBmsbSeason: 'is_bmsb_season', treatment: 'treatment', result: 'result' }),
};

// ─── Pre-delivery inspection ────────────────────────────────────────────────

const pdiJob: KomatsuEntityType = {
  id: 'pdiJob', name: 'PDIJob', icon: '🔧', color: C.pdi, domain: 'pdi',
  description: 'A pre-delivery inspection and fitment job that prepares a unit for the customer — base assembly, option and compliance fit-out to SWP guides, testing and sign-off.',
  synonyms: ['PDI', 'PDI work order', 'Pre-delivery inspection', 'Utility Central PDI'],
  owner: 'PDI Planner',
  properties: [
    key('pdiJobNumber', 'PDI work order number'),
    oneOf('pdiType', ['Standard PDI', 'Mine Spec Fit-out', 'Rental Prep', 'Used Machine Refurb', 'Demo Prep'], 'Scope of the PDI'),
    oneOf('status', ['Awaiting Unit', 'Planned', 'Scheduled', 'In Progress', 'On Hold - Parts', 'Quality Check', 'Completed'], 'PDI status'),
    dt('plannedStart', 'Planned start'),
    dt('plannedFinish', 'Planned finish'),
    dt('actualFinish', 'Actual completion'),
    dec('standardHours', 'Standard PDI and fitment hours', 'hours'),
    dec('actualHours', 'Actual labour hours booked', 'hours'),
    date('customerRequiredDate', 'Date the customer needs the machine delivered'),
  ],
  alignments: [iof('PlannedProcess', 'broadMatch'), cbv('BizStep-inspecting'), std('ISO 14224', 'Maintenance activity: inspection / modification', 'related'), scor('Fulfill: Prepare product for delivery')],
  binding: annata('amworkordertable', { pdiJobNumber: 'workorderid', status: 'workorderstatus', plannedStart: 'plannedstartdatetime', plannedFinish: 'plannedenddatetime' }, { filter: 'work order type = PDI', alternate: 'msdyn_workorder / msauto_deviceinspection (Dataverse)' }),
};

const inspectionResult: KomatsuEntityType = {
  id: 'inspectionResult', name: 'InspectionResult', icon: '✅', color: C.pdi, domain: 'pdi',
  description: 'The recorded outcome of one checklist item during a PDI or service inspection.',
  owner: 'Workshop Supervisor',
  properties: [
    key('inspectionResultId', 'Checklist result identifier'),
    oneOf('checkArea', ['Engine', 'Hydraulics', 'Electrical', 'Undercarriage', 'Cab and ROPS', 'Safety Systems', 'Fire Suppression', 'Compliance Labels', 'Telematics', 'Road Test'], 'Area inspected'),
    str('checkItem', 'Checklist item text'),
    oneOf('outcome', ['Pass', 'Fail', 'Rectified', 'Not Applicable'], 'Result'),
    str('comment', 'Technician comment / measurement'),
    dt('recordedOn', 'When the result was recorded'),
  ],
  alignments: [iof('MeasurementProcess', 'related'), cbv('Disp-conformant'), std('MIMOSA CCOM', 'Measurement', 'related')],
  binding: annata('aminspectionline', { inspectionResultId: 'recid', checkItem: 'description', outcome: 'result' }, { alternate: 'msdyn_inspectioninstance (Field Service)' }),
};

// ─── Parts supply chain & procurement ───────────────────────────────────────

const warehouse: KomatsuEntityType = {
  id: 'warehouse', name: 'Warehouse', icon: '🏬', color: C.parts, domain: 'parts',
  description: 'A stock-holding location — distribution centre (e.g. Wacol), branch store, mine-site consignment store, reman store, machine yard, quarantine or transit.',
  owner: 'Parts Operations Manager',
  properties: [
    key('warehouseId', 'F&O warehouse id'),
    str('name', 'Warehouse name'),
    oneOf('warehouseType', ['National DC', 'Regional DC', 'Branch Store', 'Consignment Site', 'Reman Store', 'Machine Yard', 'Quarantine', 'Transit'], 'Role in the network'),
    bool('isWmsEnabled', 'True when advanced warehouse management is enabled'),
    oneOf('state', AU_STATES, 'State'),
  ],
  alignments: [iof('DistributionCenter', 'related'), iof('StorageFacility', 'broadMatch'), std('GS1', 'GLN (Global Location Number)', 'related'), cdm('Warehouse')],
  binding: fo('inventlocation', { warehouseId: 'inventlocationid', name: 'name', warehouseType: 'inventlocationtype', isWmsEnabled: 'whsenabled' }),
};

const inventoryPosition: KomatsuEntityType = {
  id: 'inventoryPosition', name: 'InventoryPosition', icon: '📦', color: C.parts, domain: 'parts',
  description: 'The stock position of a part at a warehouse — on hand, reserved, available, on order and backordered.',
  owner: 'Parts Planner',
  properties: [
    key('inventoryPositionId', 'Part + warehouse (inventory dimension) key'),
    dec('onHandQty', 'Physical on-hand quantity'),
    dec('reservedQty', 'Quantity reserved for orders'),
    dec('availableQty', 'Available physical quantity'),
    dec('onOrderQty', 'Quantity on open purchase and transfer orders'),
    dec('backorderQty', 'Quantity owed to customers'),
    dec('stockValue', 'Inventory value at cost', AUD),
    date('snapshotDate', 'Date of the position snapshot'),
  ],
  alignments: [iof('IndustrialInventory', 'closeMatch'), std('OAGIS', 'InventoryBalance', 'closeMatch'), scor('Plan: Inventory position'), cdm('InventoryOnHand')],
  binding: fo('inventsum', { inventoryPositionId: 'inventdimid', onHandQty: 'physicalinvent', reservedQty: 'reservphysical', availableQty: 'availphysical', onOrderQty: 'ordered', backorderQty: 'onorder' }),
};

const purchaseOrder: KomatsuEntityType = {
  id: 'purchaseOrder', name: 'PurchaseOrder', icon: '📑', color: C.parts, domain: 'parts',
  description: 'An order placed on a supplier for parts, services or subcontract work — stock replenishment, emergency (VOR) or direct-delivery.',
  owner: 'Supply Planner / Procurement',
  properties: [
    key('purchaseOrderNumber', 'F&O purchase order number'),
    oneOf('poType', ['Stock Replenishment', 'Emergency VOR', 'Direct Delivery', 'Special Order', 'Subcontract', 'Services', 'Intercompany Parts'], 'Purpose of the order'),
    date('orderDate', 'Order date'),
    date('confirmedDeliveryDate', 'Supplier-confirmed delivery date'),
    oneOf('approvalStatus', ['Draft', 'In Review', 'Approved', 'Confirmed', 'Rejected'], 'Change-management approval state'),
    oneOf('status', ['Open', 'Received', 'Invoiced', 'Cancelled'], 'Order status'),
    str('incoterm', 'Incoterms 2020 rule'),
    str('currencyCode', 'ISO 4217 currency'),
    dec('totalAmount', 'Order total', AUD),
  ],
  alignments: [schema('Order'), std('OAGIS', 'PurchaseOrder', 'exactMatch'), iofSc('PurchaseOrder'), cdm('PurchaseOrder'), scor('Source: Issue purchase order')],
  binding: fo('purchtable', {
    purchaseOrderNumber: 'purchid', poType: 'purchpoolid', orderDate: 'accountingdate', confirmedDeliveryDate: 'confirmeddlv',
    approvalStatus: 'documentstate', status: 'purchstatus', incoterm: 'dlvterm', currencyCode: 'currencycode',
  }),
};

const purchaseOrderLine: KomatsuEntityType = {
  id: 'purchaseOrderLine', name: 'PurchaseOrderLine', icon: '📎', color: C.parts, domain: 'parts',
  description: 'A line on a purchase order for a quantity of a part with price and delivery dates.',
  owner: 'Supply Planner / Procurement',
  properties: [
    key('purchaseLineId', 'Inventory transaction id of the line'),
    int('lineNumber', 'Line number'),
    dec('quantity', 'Ordered quantity'),
    dec('unitCost', 'Purchase price per unit', AUD),
    date('requestedDate', 'Requested receipt date'),
    date('confirmedDate', 'Confirmed receipt date'),
    dec('receivedQty', 'Quantity received to date'),
    oneOf('lineStatus', ['Open', 'Confirmed', 'Partially Received', 'Received', 'Invoiced', 'Cancelled'], 'Line status'),
  ],
  alignments: [schema('OrderItem'), std('OAGIS', 'PurchaseOrderLine', 'exactMatch'), cdm('PurchaseOrderLine')],
  binding: fo('purchline', {
    purchaseLineId: 'inventtransid', lineNumber: 'linenumber', quantity: 'purchqty', unitCost: 'purchprice',
    requestedDate: 'deliverydate', confirmedDate: 'confirmeddlv', lineStatus: 'purchstatus',
  }),
};

const purchaseAgreement: KomatsuEntityType = {
  id: 'purchaseAgreement', name: 'PurchaseAgreement', icon: '📜', color: C.parts, domain: 'parts',
  description: 'A supplier agreement fixing prices, volumes, lead times or consignment terms for parts or services.',
  owner: 'Procurement',
  properties: [
    key('agreementId', 'Purchase agreement id'),
    oneOf('agreementType', ['Blanket Price', 'Volume Commitment', 'Consignment', 'Service Level', 'Subcontract'], 'Agreement type'),
    date('startDate', 'Effective from'),
    date('endDate', 'Effective to'),
    dec('commitmentValue', 'Committed spend', AUD),
    oneOf('status', ['Draft', 'Active', 'Expired', 'Terminated'], 'Agreement status'),
  ],
  alignments: [fiboContract, std('OAGIS', 'PurchaseAgreement'), cdm('PurchaseAgreement')],
  binding: fo('agreementheader', { agreementId: 'purchnumbersequence', startDate: 'defaultagreementlineeffectivedate', endDate: 'defaultagreementlineexpirationdate' }, { toConfirm: true }),
};

const goodsReceipt: KomatsuEntityType = {
  id: 'goodsReceipt', name: 'GoodsReceipt', icon: '📥', color: C.parts, domain: 'parts',
  description: 'The receipt of goods against a purchase or factory order at a warehouse, including discrepancies.',
  owner: 'Parts Operations Manager',
  properties: [
    key('productReceiptId', 'Product receipt (packing slip) number'),
    date('receiptDate', 'Date received'),
    dec('quantity', 'Quantity received'),
    oneOf('discrepancy', ['None', 'Short', 'Over', 'Damaged', 'Wrong Part'], 'Receipt discrepancy'),
  ],
  alignments: [iof('ReceivingProcess', 'closeMatch'), cbv('BizStep-receiving', 'closeMatch'), std('OAGIS', 'ReceiveDelivery', 'closeMatch'), scor('Source: Receive product')],
  binding: fo('vendpackingslipjour', { productReceiptId: 'packingslipid', receiptDate: 'deliverydate', quantity: 'qty' }),
};

const transferOrder: KomatsuEntityType = {
  id: 'transferOrder', name: 'TransferOrder', icon: '🔀', color: C.parts, domain: 'parts',
  description: 'A movement of stock between Komatsu warehouses — DC-to-branch replenishment, emergency transfer or consignment top-up.',
  owner: 'Supply Planner',
  properties: [
    key('transferOrderNumber', 'Transfer order number'),
    oneOf('transferType', ['Replenishment', 'Emergency', 'Consignment Top-up', 'Return to DC', 'Reman Core Movement'], 'Purpose of the transfer'),
    date('shipDate', 'Planned ship date'),
    date('receiptDate', 'Planned receipt date'),
    oneOf('status', ['Created', 'Shipped', 'Received'], 'Transfer status'),
  ],
  alignments: [cbv('BizStep-shipping'), std('OAGIS', 'InventoryMovement', 'related'), scor('Fulfill: Transfer product')],
  binding: fo('inventtransfertable', { transferOrderNumber: 'transferid', shipDate: 'shipdate', receiptDate: 'receivedate', status: 'transferstatus' }),
};

const partsRequirement: KomatsuEntityType = {
  id: 'partsRequirement', name: 'PartsRequirement', icon: '🧰', color: C.parts, domain: 'parts',
  description: 'A demand for a part from a work order, PDI job or reman job — reserved from stock, transferred or bought in.',
  owner: 'Service Coordinator / Parts Interpreter',
  properties: [
    key('requirementId', 'Item requirement line identifier'),
    dec('quantity', 'Required quantity'),
    date('requiredDate', 'Date the part is needed at the job'),
    oneOf('supplyStatus', ['Required', 'Reserved', 'Ordered', 'Backordered', 'In Transit', 'Issued', 'Returned'], 'Supply status'),
    bool('isCritical', 'True when the job cannot start without the part'),
  ],
  alignments: [std('ISA-95', 'Material requirement', 'related'), scor('Plan: Demand requirement'), cdm('WorkOrderProduct')],
  binding: annata('amworkorderitem', { requirementId: 'inventtransid', quantity: 'qty', requiredDate: 'requireddate', supplyStatus: 'status' }, { alternate: 'msdyn_workorderproduct (Field Service)' }),
};

// ─── Demand & supply planning ───────────────────────────────────────────────

const partsDemandForecast: KomatsuEntityType = {
  id: 'partsDemandForecast', name: 'PartsDemandForecast', icon: '📊', color: C.planning, domain: 'planning',
  description: 'A time-phased demand forecast for a part at a warehouse — statistical, collaborative, fleet-hours (KOMTRAX) or PCR-driven.',
  owner: 'Parts Planner',
  properties: [
    key('partsForecastId', 'Forecast record identifier'),
    date('forecastMonth', 'Period the demand is expected'),
    dec('forecastQty', 'Forecast quantity'),
    oneOf('forecastMethod', ['Statistical', 'Collaborative (Customer)', 'Fleet Hours (KOMTRAX)', 'Component Replacement Plan', 'Manual Override'], 'How the forecast was produced'),
    dec('forecastAccuracyPct', 'Forecast accuracy (1 - MAPE) for the prior period', '%'),
  ],
  alignments: [iof('SupplyChainPlanSpecification', 'related'), scor('Plan: Demand plan'), apqc('4.0 Manage Supply Chain for Physical Products')],
  binding: fo('forecastsales', { partsForecastId: 'recid', forecastMonth: 'startdate', forecastQty: 'salesqty' }, { toConfirm: true }),
};

const stockingPolicy: KomatsuEntityType = {
  id: 'stockingPolicy', name: 'StockingPolicy', icon: '📐', color: C.planning, domain: 'planning',
  description: 'The planning parameters for a part at a warehouse — coverage method, min/max, safety stock, lead time and service-level target.',
  owner: 'Parts Planner',
  properties: [
    key('stockingPolicyId', 'Item coverage record key'),
    oneOf('coverageMethod', ['Min-Max', 'Period', 'Requirement (Lot-for-lot)', 'Manual', 'Non-stocked'], 'Coverage / replenishment method'),
    oneOf('stockingStrategy', ['Stocked', 'Critical Spare', 'Consignment', 'Non-stocked', 'Phase-out'], 'Stocking decision'),
    dec('minQty', 'Minimum / reorder point'),
    dec('maxQty', 'Maximum stock level'),
    dec('safetyStockQty', 'Safety stock'),
    int('leadTimeDays', 'Planning lead time', 'days'),
    dec('serviceLevelTargetPct', 'Target line-fill service level', '%'),
  ],
  alignments: [scor('Plan: Inventory policy'), apqc('4.0 Manage Supply Chain for Physical Products')],
  binding: fo('reqitemtable', { stockingPolicyId: 'recid', coverageMethod: 'reqgroupid', minQty: 'mininventonhand', maxQty: 'maxinventonhand', leadTimeDays: 'leadtimepurchase' }),
};

const planningRun: KomatsuEntityType = {
  id: 'planningRun', name: 'PlanningRun', icon: '🧮', color: C.planning, domain: 'planning',
  description: 'An execution of master planning (MRP) that nets demand against supply and generates planned orders.',
  owner: 'Supply Planning Manager',
  properties: [
    key('planRunId', 'Plan version identifier'),
    str('masterPlan', 'Master plan name, e.g. STATIC or DYNAMIC'),
    dt('runDateTime', 'When the plan ran'),
    int('horizonDays', 'Coverage horizon', 'days'),
    int('plannedOrderCount', 'Planned orders generated'),
  ],
  alignments: [iof('SupplyChainPlanSpecification', 'related'), scor('Plan: Balance supply and demand')],
  binding: fo('reqplanversion', { planRunId: 'recid', masterPlan: 'reqplanid' }, { toConfirm: true }),
};

const plannedOrder: KomatsuEntityType = {
  id: 'plannedOrder', name: 'PlannedOrder', icon: '🗒️', color: C.planning, domain: 'planning',
  description: 'A planning suggestion to buy or transfer a part, reviewed and firmed by a supply planner.',
  owner: 'Supply Planner',
  properties: [
    key('plannedOrderNumber', 'Planned order number'),
    oneOf('plannedOrderType', ['Planned Purchase', 'Planned Transfer', 'Planned Reman Rebuild'], 'Kind of supply suggested'),
    dec('quantity', 'Suggested quantity'),
    date('requirementDate', 'Date the supply is needed'),
    date('orderDate', 'Date the order should be placed'),
    oneOf('status', ['Unprocessed', 'Approved', 'Firmed', 'Deleted'], 'Planner action status'),
    str('actionMessage', 'Planning action message, e.g. advance, postpone, increase'),
  ],
  alignments: [scor('Plan: Planned order'), std('ISA-95', 'Material requirement', 'related')],
  binding: fo('reqpo', { plannedOrderNumber: 'refid', quantity: 'qty', requirementDate: 'reqdate', orderDate: 'reqdateorder', status: 'reqpostatus' }),
};

// ─── Service & technicians ──────────────────────────────────────────────────

const workshopBay: KomatsuEntityType = {
  id: 'workshopBay', name: 'WorkshopBay', icon: '🏚️', color: C.service, domain: 'service',
  description: 'A schedulable workshop capacity resource — PDI bay, repair bay, wash bay, dyno or reman line.',
  owner: 'Workshop Manager',
  properties: [
    key('bayId', 'Bay / facility resource identifier'),
    str('name', 'Bay name'),
    oneOf('bayType', ['PDI Bay', 'Repair Bay', 'Wash Bay', 'Paint Booth', 'Engine Dyno', 'Reman Line', 'Field Service Vehicle'], 'Capability'),
    dec('capacityHoursPerDay', 'Available hours per day', 'hours'),
    dec('maxOperatingWeightKg', 'Largest machine the bay can take', 'kg'),
  ],
  alignments: [iof('Facility', 'related'), cdm('BookableResource (facility)')],
  binding: ce('bookableresource', { bayId: 'bookableresourceid', name: 'name' }, { filter: 'resourcetype = Facility', toConfirm: true }),
};

const workOrder: KomatsuEntityType = {
  id: 'workOrder', name: 'WorkOrder', icon: '🛠️', color: C.service, domain: 'service',
  description: 'A workshop or field work order on a unit — scheduled maintenance, breakdown, warranty, campaign, component change-out or inspection.',
  owner: 'Service Coordinator',
  synonyms: ['Service order', 'Job card', 'Work order (Annata)', 'Work order (Field Service)'],
  properties: [
    key('workOrderNumber', 'Annata work order number'),
    oneOf('serviceType', ['Scheduled Maintenance', 'Breakdown Repair', 'Warranty Repair', 'Campaign (PIP)', 'Component Change-out', 'Inspection', 'Condition Monitoring', 'Internal'], 'Type of service'),
    oneOf('serviceLocation', ['Workshop', 'Field', 'Mine Site Resident'], 'Where the work is done'),
    oneOf('priority', ['P1 Machine Down', 'P2 Urgent', 'P3 Planned', 'P4 Opportunistic'], 'Service priority'),
    oneOf('billingType', ['Customer', 'Warranty', 'Contract', 'Goodwill', 'Internal'], 'Who pays'),
    oneOf('status', ['Open', 'Scheduled', 'In Progress', 'Awaiting Parts', 'Awaiting Approval', 'Completed', 'Invoiced', 'Closed'], 'Order status'),
    dt('openedOn', 'When the order was opened'),
    dt('completedOn', 'When technical work was completed'),
    dec('smrAtService', 'Service meter reading at the job', 'hours'),
    dec('estimatedAmount', 'Estimated / quoted value', AUD),
  ],
  alignments: [iof('MaintenanceWorkOrderRecord', 'closeMatch'), iof('MaintenanceProcess'), std('MIMOSA CCOM', 'WorkOrder', 'closeMatch'), std('OAGIS', 'MaintenanceOrder', 'closeMatch'), std('ISO 14224', 'Maintenance record', 'closeMatch'), apqc('5.0 Deliver Services'), cdm('WorkOrder')],
  binding: annata('amworkordertable', {
    workOrderNumber: 'workorderid', serviceType: 'workordertype', status: 'workorderstatus',
    openedOn: 'createddatetime', smrAtService: 'countervalue',
  }, { alternate: 'msdyn_workorder (Field Service) / msauto_serviceorder (CDM Automotive)' }),
};

const workOrderJob: KomatsuEntityType = {
  id: 'workOrderJob', name: 'WorkOrderJob', icon: '🔨', color: C.service, domain: 'service',
  description: 'A job (operation) within a work order recording the complaint, cause and correction for one piece of work.',
  synonyms: ['Job', 'Operation', 'Work order line'],
  owner: 'Service Coordinator',
  properties: [
    key('workOrderJobId', 'Work order job identifier'),
    str('operationCode', 'Annata operation (flat-rate) code'),
    str('complaint', 'Customer complaint / symptom'),
    str('cause', 'Diagnosed cause'),
    str('correction', 'Corrective action performed'),
    dec('standardHours', 'Standard or quoted hours', 'hours'),
    dec('actualHours', 'Actual hours booked', 'hours'),
    oneOf('jobStatus', ['Open', 'In Progress', 'On Hold', 'Completed', 'Cancelled'], 'Job status'),
  ],
  alignments: [iof('MaintenanceActivity', 'closeMatch'), std('MIMOSA CCOM', 'WorkStep', 'closeMatch'), std('ISO 14224', 'Maintenance activity', 'closeMatch'), cdm('WorkOrderIncident')],
  binding: annata('amworkorderjob', { workOrderJobId: 'jobid', operationCode: 'operationcode', complaint: 'complaint', cause: 'cause', correction: 'correction', jobStatus: 'jobstatus' }, { alternate: 'msdyn_workorderincident / msauto_serviceorderjob (Dataverse)' }),
};

const standardJob: KomatsuEntityType = {
  id: 'standardJob', name: 'StandardJob', icon: '📘', color: C.service, domain: 'service',
  description: 'A reusable service template (Annata job list) — e.g. PC210-11 500-hour service or D375A final-drive change-out — with standard hours, parts kit and skills.',
  synonyms: ['Job list (Annata)', 'Service template', 'Incident type (Field Service)'],
  owner: 'Service Engineering',
  properties: [
    key('standardJobCode', 'Standard job code'),
    str('name', 'Standard job name'),
    oneOf('jobCategory', ['PM 250', 'PM 500', 'PM 1000', 'PM 2000', 'PM 4000', 'PM Clinic', 'Component Change-out', 'Inspection', 'PDI', 'Campaign'], 'Job category'),
    dec('standardHours', 'Standard labour hours', 'hours'),
    dec('fixedPrice', 'Fixed / menu price where offered', AUD),
    int('intervalHours', 'Service interval', 'hours'),
  ],
  alignments: [std('MIMOSA CCOM', 'SolutionPackage', 'closeMatch'), iof('MaintenanceStrategy', 'related'), std('ISO 14224', 'Maintenance activity type', 'related'), cdm('IncidentType')],
  binding: annata('amjoblist', { standardJobCode: 'joblistid', name: 'description', standardHours: 'estimatedhours' }, { alternate: 'msdyn_incidenttype (Field Service) / msauto_serviceorderjobtype' }),
};

const maintenancePlan: KomatsuEntityType = {
  id: 'maintenancePlan', name: 'MaintenancePlan', icon: '⏰', color: C.service, domain: 'service',
  description: 'A preventive maintenance schedule for a unit or contract that generates work orders by hours or calendar interval (e.g. Komplimentary Maintenance services at 500–2,000 hours).',
  owner: 'Service Planner',
  properties: [
    key('maintenancePlanId', 'Plan identifier'),
    oneOf('intervalBasis', ['Hours', 'Calendar', 'Hours or Calendar'], 'Interval trigger'),
    int('intervalHours', 'Interval in hours', 'hours'),
    dec('nextDueSmr', 'Meter reading at which the next service is due', 'hours'),
    date('nextDueDate', 'Forecast date the next service is due'),
    oneOf('status', ['Active', 'Suspended', 'Completed'], 'Plan status'),
  ],
  alignments: [iof('MaintenanceStrategy', 'related'), std('ISO 55000:2024', 'Asset management plan', 'related'), cdm('AgreementBookingSetup')],
  binding: annata('ammaintenanceplan', { maintenancePlanId: 'maintenanceplanid', nextDueSmr: 'nextcountervalue', nextDueDate: 'nextdate' }, { alternate: 'msdyn_agreementbookingsetup (Field Service)' }),
};

const technician: KomatsuEntityType = {
  id: 'technician', name: 'Technician', icon: '👷', color: C.service, domain: 'service',
  description: 'A bookable field, workshop, resident mine-site or reman technician with skills, certifications and a home branch.',
  owner: 'Service Manager',
  synonyms: ['Bookable resource', 'Field service technician', 'Workshop technician', 'Technician – PDI'],
  properties: [
    key('resourceId', 'Bookable resource identifier'),
    str('fullName', 'Full name'),
    oneOf('technicianType', ['Field Service', 'Workshop', 'Resident Mine Site', 'Reman', 'Apprentice', 'Contractor'], 'Technician type'),
    oneOf('tradeLevel', ['Apprentice Year 1-2', 'Apprentice Year 3-4', 'Technician', 'Senior Technician', 'Master Technician', 'Leading Hand'], 'Trade level'),
    dec('chargeOutRate', 'Standard labour charge-out rate', `${AUD}/hour`),
    bool('isActive', 'True while the technician can be scheduled'),
  ],
  alignments: [iof('QualifiedMaintenancePerson', 'closeMatch'), schema('Person', 'broadMatch'), cdm('BookableResource')],
  binding: ce('bookableresource', { resourceId: 'bookableresourceid', fullName: 'name', technicianType: 'resourcetype' }, { filter: 'resourcetype = User or Contact', alternate: 'hcmworker (F&O)' }),
};

const skill: KomatsuEntityType = {
  id: 'skill', name: 'Skill', icon: '🎓', color: C.service, domain: 'service',
  description: 'A skill, model certification, licence or site induction that qualifies a technician for work.',
  owner: 'Technical Training',
  properties: [
    key('skillId', 'Characteristic identifier'),
    str('name', 'Skill name, e.g. "930E electric drive certified"'),
    oneOf('skillType', ['Model Certification', 'Trade Licence', 'High Risk Work Licence', 'Site Induction', 'Electrical Licence', 'Confined Space', 'Working at Heights', 'Komatsu Training Level'], 'Kind of qualification'),
    bool('expires', 'True when the qualification must be renewed'),
  ],
  alignments: [iof('QualificationSpecification', 'related'), schema('EducationalOccupationalCredential', 'related'), std('ESCO', 'Skill / competence', 'related'), cdm('Characteristic')],
  binding: ce('characteristic', { skillId: 'characteristicid', name: 'name', skillType: 'characteristictype' }),
};

const resourceBooking: KomatsuEntityType = {
  id: 'resourceBooking', name: 'ResourceBooking', icon: '📅', color: C.service, domain: 'service',
  description: 'A scheduled allocation of a technician or bay to a work order, PDI job or reman job.',
  owner: 'Service Planner / PDI Planner',
  properties: [
    key('bookingId', 'Booking identifier'),
    dt('startTime', 'Booked start'),
    dt('endTime', 'Booked end'),
    oneOf('bookingStatus', ['Scheduled', 'Travelling', 'In Progress', 'On Break', 'Completed', 'Cancelled'], 'Booking status'),
    dec('travelHours', 'Estimated travel time', 'hours'),
  ],
  alignments: [schema('Reservation', 'closeMatch'), cdm('BookableResourceBooking')],
  binding: ce('bookableresourcebooking', { bookingId: 'bookableresourcebookingid', startTime: 'starttime', endTime: 'endtime', bookingStatus: 'bookingstatus' }),
};

const timeEntry: KomatsuEntityType = {
  id: 'timeEntry', name: 'TimeEntry', icon: '⏱️', color: C.service, domain: 'service',
  description: 'Labour time recorded by a technician against a work order job, PDI job or reman job.',
  synonyms: ['Labour line', 'Hour journal', 'Timesheet'],
  owner: 'Service Coordinator',
  properties: [
    key('timeEntryId', 'Time entry identifier'),
    date('workDate', 'Date worked'),
    dec('hours', 'Hours recorded', 'hours'),
    oneOf('labourType', ['Normal', 'Overtime', 'Travel', 'Warranty', 'Internal', 'Rework'], 'Labour type'),
    bool('isBillable', 'True when chargeable to the customer'),
  ],
  alignments: [schema('Action', 'broadMatch'), cdm('TimeEntry')],
  binding: fo('projempltrans', { timeEntryId: 'transid', workDate: 'transdate', hours: 'qty', labourType: 'categoryid' }, { filter: 'project linked to an Annata work order', alternate: 'msdyn_timeentry (Field Service)', toConfirm: true }),
};

const failureMode: KomatsuEntityType = {
  id: 'failureMode', name: 'FailureMode', icon: '💥', color: C.service, domain: 'service',
  description: 'A coded failure mode, mechanism and cause used on repairs, warranty claims and reman teardowns (ISO 14224 style).',
  synonyms: ['Claim code (Annata: symptom, cause, resolution, failure)', 'Damage code'],
  owner: 'Reliability Engineering',
  properties: [
    key('failureCode', 'Failure / damage code'),
    str('failureModeName', 'Failure mode, e.g. "external leakage", "overheating"'),
    str('failureMechanism', 'Failure mechanism, e.g. wear, fatigue, contamination'),
    oneOf('failureCause', ['Design', 'Manufacturing', 'Operation / Misuse', 'Maintenance', 'Wear and Tear', 'Contamination', 'Unknown'], 'Root-cause category'),
  ],
  alignments: [std('ISO 14224', 'Failure mode / failure mechanism / failure cause (Annex B)', 'exactMatch'), iof('FailureModeCode', 'closeMatch'), std('MIMOSA CCOM', 'HypotheticalEvent (FMECA)', 'related')],
  binding: annata('amwarrantyclaimcode', { failureCode: 'claimcode', failureModeName: 'description' }),
};

// ─── Contracts & warranty ───────────────────────────────────────────────────

const serviceContract: KomatsuEntityType = {
  id: 'serviceContract', name: 'ServiceContract', icon: '📃', color: C.contracts, domain: 'contracts',
  description: 'A customer support agreement — Komplimentary Maintenance, Maintenance Contract Agreement (cost per operating hour), MARC, planned maintenance, parts supply or resident site support.',
  synonyms: ['Maintenance Contract Agreement', 'Service agreement', 'Contract service package (Annata)', 'Komatsu CARE (global name)'],
  owner: 'Contracts Administrator',
  properties: [
    key('contractNumber', 'Service agreement number'),
    oneOf('contractType', ['Komplimentary Maintenance', 'Maintenance Contract Agreement', 'Repair and Maintenance (MARC)', 'Planned Maintenance', 'Parts Supply Agreement', 'Tiered Rebuild Program', 'Availability Guarantee', 'Resident Site Support'], 'Contract product'),
    oneOf('billingModel', ['Included with Machine', 'Fixed Monthly', 'Per SMR Hour', 'Time and Materials', 'Milestone'], 'How the contract is charged'),
    date('startDate', 'Contract start'),
    date('endDate', 'Contract end'),
    dec('startSmr', 'Unit meter at contract start', 'hours'),
    dec('endSmr', 'Meter limit at which coverage ends', 'hours'),
    dec('contractValue', 'Total contract value', AUD),
    dec('availabilityTargetPct', 'Contracted mechanical availability target', '%'),
    oneOf('status', ['Draft', 'Active', 'Suspended', 'Expired', 'Terminated', 'Renewed'], 'Contract status'),
  ],
  alignments: [iof('CommercialServiceAgreement', 'closeMatch'), fiboContract, schema('Service', 'related'), cdm('Agreement')],
  binding: annata('amcontracttable', {
    contractNumber: 'contractid', contractType: 'contracttype', startDate: 'startdate', endDate: 'enddate', status: 'contractstatus',
  }, { alternate: 'msdyn_agreement (Field Service) / msauto_servicecontract' }),
};

const contractEntitlement: KomatsuEntityType = {
  id: 'contractEntitlement', name: 'ContractEntitlement', icon: '🎟️', color: C.contracts, domain: 'contracts',
  description: 'A specific benefit under a contract — free services, labour/parts coverage, response-time SLA or support hours — and its consumption.',
  owner: 'Contracts Administrator',
  properties: [
    key('entitlementId', 'Entitlement identifier'),
    oneOf('entitlementType', ['Free Scheduled Service', 'Labour Coverage', 'Parts Coverage', 'Travel Coverage', 'Response Time SLA', 'Support Hours', 'Oil Analysis'], 'Benefit type'),
    dec('allowance', 'Total allowance (visits, hours or amount)'),
    dec('consumed', 'Allowance consumed to date'),
    int('responseTimeHours', 'Committed response time', 'hours'),
  ],
  alignments: [schema('Offer', 'related'), cdm('Entitlement', 'exactMatch')],
  binding: ce('entitlement', { entitlementId: 'entitlementid', allowance: 'totalterms', consumed: 'remainingterms' }),
};

const warrantyCoverage: KomatsuEntityType = {
  id: 'warrantyCoverage', name: 'WarrantyCoverage', icon: '🛡️', color: C.contracts, domain: 'contracts',
  description: 'A warranty entitlement on a unit or component — standard machine, Premium Warranty, Long Haul Support, Parts Plus, Premium Used or reman component.',
  owner: 'Warranty Administrator',
  properties: [
    key('warrantyId', 'Warranty registration identifier'),
    oneOf('warrantyType', ['Standard Machine', 'Premium Warranty', 'Long Haul Support', 'Parts Plus Warranty', 'Premium Used', 'Reman Component', 'Service Workmanship'], 'Coverage product'),
    date('startDate', 'Coverage start'),
    date('endDate', 'Coverage end'),
    dec('hoursLimit', 'Meter limit of coverage', 'hours'),
    oneOf('status', ['Registered', 'Active', 'Expired', 'Void'], 'Coverage status'),
  ],
  alignments: [schema('WarrantyPromise', 'exactMatch'), gs1('WarrantyPromise', 'closeMatch'), std('Australian Consumer Law', 'Consumer guarantees / warranty against defects (reg 90)', 'related')],
  binding: annata('amdevicewarranty', { warrantyId: 'warrantyid', warrantyType: 'warrantytype', startDate: 'startdate', endDate: 'enddate' }, { alternate: 'msauto_devicewarranty (Dataverse) / msdyn_warranty' }),
};

const warrantyClaim: KomatsuEntityType = {
  id: 'warrantyClaim', name: 'WarrantyClaim', icon: '📨', color: C.contracts, domain: 'contracts',
  description: 'A claim to the factory or a supplier to recover the cost of a warranty repair, campaign or policy/goodwill decision.',
  synonyms: ['OEM warranty claim', 'Dealer warranty claim', 'Supplier recovery'],
  owner: 'Warranty Administrator',
  properties: [
    key('claimNumber', 'Warranty claim number'),
    oneOf('claimType', ['Machine Warranty', 'Parts Warranty', 'Reman Warranty', 'Campaign (PIP)', 'Policy / Goodwill', 'Supplier Recovery'], 'Claim type'),
    date('failureDate', 'Date of failure'),
    dec('smrAtFailure', 'Meter at failure', 'hours'),
    dec('claimedAmount', 'Amount claimed (parts + labour + sundries)', AUD),
    dec('approvedAmount', 'Amount approved by the factory / supplier', AUD),
    oneOf('status', ['Draft', 'Submitted', 'Returned for Info', 'Approved', 'Partially Approved', 'Rejected', 'Paid', 'Appealed'], 'Claim status'),
    date('submittedDate', 'Date submitted'),
  ],
  alignments: [std('OAGIS', 'WarrantyClaim', 'closeMatch'), iof('FailureEvent', 'related'), std('ISO 14224', 'Failure event record', 'related')],
  binding: annata('amwarrantyclaimtable', { claimNumber: 'claimid', claimType: 'claimtype', failureDate: 'failuredate', claimedAmount: 'claimamount', approvedAmount: 'approvedamount', status: 'claimstatus' }),
};

const serviceCampaign: KomatsuEntityType = {
  id: 'serviceCampaign', name: 'ServiceCampaign', icon: '📢', color: C.contracts, domain: 'contracts',
  description: 'A factory-issued Product Improvement Program (PIP), safety recall or retrofit that must be completed on affected units.',
  synonyms: ['PIP', 'Product Improvement Program', 'Field campaign', 'Recall'],
  owner: 'Warranty Administrator / Product Support',
  properties: [
    key('campaignNumber', 'PIP / campaign number'),
    oneOf('campaignType', ['PIP', 'Safety Recall', 'Retrofit', 'Inspection', 'Software Update'], 'Campaign type'),
    str('title', 'Campaign title'),
    date('issueDate', 'Date issued by the factory'),
    date('completionDeadline', 'Date all affected units must be completed'),
    dec('standardHours', 'Allowed labour hours per unit', 'hours'),
    oneOf('status', ['Open', 'In Progress', 'Closed'], 'Campaign status'),
  ],
  alignments: [std('ACCC Product Safety', 'Recall', 'related'), schema('Action', 'broadMatch')],
  binding: annata('amcampaigntable', { campaignNumber: 'campaignid', title: 'description', issueDate: 'fromdate', completionDeadline: 'todate' }),
};

const rentalAgreement: KomatsuEntityType = {
  id: 'rentalAgreement', name: 'RentalAgreement', icon: '🔑', color: C.contracts, domain: 'contracts',
  description: 'A rental contract for one or more rental-fleet units (e.g. from the Truganina rental and remarketing hub), with rates, term and on/off-hire dates.',
  owner: 'Rental Manager',
  synonyms: ['Rental order (Annata)', 'Hire agreement'],
  properties: [
    key('rentalAgreementId', 'Rental order number'),
    oneOf('rentalType', ['Short Term Hire', 'Long Term Rental', 'Rent to Own', 'Project Fleet', 'Demonstration Loan'], 'Rental product'),
    date('onHireDate', 'Date units went on hire'),
    date('offHireDate', 'Date units came off hire'),
    oneOf('rateBasis', ['Daily', 'Weekly', 'Monthly', 'Per SMR Hour'], 'How the rate is charged'),
    dec('rentalRate', 'Rate per basis period', AUD),
    oneOf('status', ['Quoted', 'Confirmed', 'On Hire', 'Off Hire', 'Closed'], 'Rental status'),
  ],
  alignments: [fiboContract, schema('RentAction', 'closeMatch')],
  binding: annata('amrentalordertable', { rentalAgreementId: 'rentalorderid', onHireDate: 'onhiredate', offHireDate: 'offhiredate', status: 'rentalstatus' }),
};

// ─── REMAN ──────────────────────────────────────────────────────────────────

const coreReturn: KomatsuEntityType = {
  id: 'coreReturn', name: 'CoreReturn', icon: '↩️', color: C.reman, domain: 'reman',
  description: 'The return of a failed component (core) after a Component Exchange Program sale, inspected to determine the core credit.',
  synonyms: ['Core', 'Core RMA', 'Core credit'],
  owner: 'Reman Coordinator',
  properties: [
    key('coreReturnId', 'Core return / RMA number'),
    date('returnDueDate', 'Date the core must be returned by'),
    date('receivedDate', 'Date the core was received'),
    oneOf('coreCondition', ['Acceptable', 'Damaged - Partial Credit', 'Non-rebuildable', 'Wrong Core', 'Not Returned'], 'Inspection outcome'),
    dec('coreDeposit', 'Core charge (surcharge) paid on the exchange sale', AUD),
    dec('coreCredit', 'Credit issued after inspection', AUD),
    oneOf('status', ['Awaiting Return', 'Received', 'Inspected', 'Credited', 'Rejected', 'Overdue'], 'Return status'),
  ],
  alignments: [cbv('Disp-returned', 'closeMatch'), cbv('BTT-rma'), schema('ReturnAction', 'related'), scor('Return: Return product')],
  binding: fo('salestable', { coreReturnId: 'returnitemnum', returnDueDate: 'returndeadline' }, { filter: 'salestype = ReturnItem (RMA) with core disposition code', toConfirm: true }),
};

const remanJob: KomatsuEntityType = {
  id: 'remanJob', name: 'RemanJob', icon: '🔄', color: C.reman, domain: 'reman',
  description: 'A remanufacture (rebuild) job on a component at a reman centre (e.g. Wacol, Welshpool) — exchange-stock, customer-own, tiered or warranty rebuild — from teardown to test.',
  synonyms: ['Rebuild', 'Reman work order', 'Component Exchange Program rebuild'],
  owner: 'Reman Centre Manager',
  properties: [
    key('remanJobNumber', 'Rebuild order number'),
    oneOf('rebuildType', ['Exchange Stock Rebuild', 'Customer Own Rebuild', 'Tiered Rebuild (Gold)', 'Tiered Rebuild (Silver)', 'Tiered Rebuild (Bronze)', 'Warranty Rebuild', 'Repair Only'], 'Commercial type of rebuild'),
    oneOf('stage', ['Awaiting Core', 'Teardown', 'Inspection and Quote', 'Awaiting Parts', 'Machining', 'Assembly', 'Test / Dyno', 'Paint and Pack', 'Completed'], 'Current production stage'),
    date('plannedCompletion', 'Planned completion date'),
    date('actualCompletion', 'Actual completion date'),
    dec('actualHours', 'Labour hours', 'hours'),
    dec('rebuildCost', 'Total rebuild cost (labour + parts + machining)', AUD),
    oneOf('testResult', ['Pass', 'Fail - Rework', 'Not Tested'], 'Final test outcome'),
  ],
  alignments: [iof('MaintenanceProcess', 'related'), cbv('BizStep-repairing'), std('ISO 14224', 'Maintenance activity: overhaul', 'closeMatch'), scor('Transform: Remanufacture')],
  binding: annata('amworkordertable', { remanJobNumber: 'workorderid', stage: 'workorderstage', plannedCompletion: 'plannedenddatetime' }, { filter: 'work order type = REMAN', alternate: 'prodtable (F&O production order) if rebuilds run as production' }),
};

// ─── Customer support & portal ──────────────────────────────────────────────

const supportCase: KomatsuEntityType = {
  id: 'supportCase', name: 'SupportCase', icon: '🎧', color: C.support, domain: 'support',
  description: 'A customer support case — technical support, parts or invoice enquiry, complaint, warranty query, KOMTRAX or portal support, or breakdown request.',
  owner: 'Customer Support Manager',
  synonyms: ['Case', 'Incident', 'Ticket'],
  properties: [
    key('caseNumber', 'Case (ticket) number'),
    str('title', 'Case title'),
    oneOf('caseType', ['Breakdown Request', 'Technical Support', 'Parts Enquiry', 'Order Status', 'Invoice Query', 'Warranty Query', 'Complaint', 'KOMTRAX Support', 'Portal Support', 'Service Booking'], 'Case category'),
    oneOf('caseOrigin', ['Phone', 'Email', 'Customer Portal', 'KOMTRAX Alert', 'Field Technician', 'Web Form'], 'Channel the case came from'),
    oneOf('priority', ['P1 Machine Down', 'P2 Urgent', 'P3 Planned', 'P4 Opportunistic'], 'Priority'),
    oneOf('status', ['New', 'In Progress', 'Waiting on Customer', 'Escalated', 'Resolved', 'Cancelled'], 'Case status'),
    dt('createdOn', 'When the case was created'),
    dt('resolvedOn', 'When the case was resolved'),
    bool('slaBreached', 'True when the response or resolution SLA was missed'),
  ],
  alignments: [cdm('Case (incident)', 'exactMatch'), std('MIMOSA CCOM', 'WorkRequest', 'related'), apqc('6.0 Manage Customer Service')],
  binding: ce('incident', {
    caseNumber: 'ticketnumber', title: 'title', caseType: 'casetypecode', caseOrigin: 'caseorigincode', priority: 'prioritycode',
    status: 'statuscode', createdOn: 'createdon',
  }),
};

const portalUser: KomatsuEntityType = {
  id: 'portalUser', name: 'PortalUser', icon: '🌐', color: C.support, domain: 'support',
  description: 'A customer contact registered on the D365 (Power Pages) customer portal — myKomatsu / myFleet — to view fleet, order parts, book service and raise cases.',
  synonyms: ['myKomatsu user', 'myFleet user', 'Portal contact'],
  owner: 'Digital Channels Manager',
  properties: [
    key('portalUserId', 'Portal identity (contact) identifier'),
    str('email', 'Login email'),
    oneOf('webRole', ['Customer Administrator', 'Fleet Manager', 'Parts Buyer', 'Service Requester', 'Invoice Viewer', 'Read Only'], 'Portal web role'),
    oneOf('status', ['Invited', 'Active', 'Locked', 'Deactivated'], 'Account status'),
    dt('lastLoginOn', 'Last sign-in'),
    bool('mfaEnabled', 'True when multi-factor authentication is enabled'),
  ],
  alignments: [{ standard: 'FOAF', term: 'OnlineAccount', iri: 'http://xmlns.com/foaf/0.1/OnlineAccount', kind: 'closeMatch' }, { standard: 'W3C PROV-O', term: 'Agent', iri: 'http://www.w3.org/ns/prov#Agent', kind: 'broadMatch' }],
  binding: ce('contact', { portalUserId: 'contactid', email: 'emailaddress1', webRole: 'mspp_webrole' }, { system: 'Power Pages portal', filter: 'contact with a portal identity', alternate: 'Annata dealer portal user (if the Annata portal is used)', toConfirm: true }),
};

// ─── Telematics & condition monitoring ──────────────────────────────────────

const telematicsReading: KomatsuEntityType = {
  id: 'telematicsReading', name: 'TelematicsReading', icon: '📡', color: C.telematics, domain: 'telematics',
  description: 'A KOMTRAX snapshot of a unit — hours, fuel, idle, location and utilisation — aligned to the ISO 15143-3 (AEMP 2.0) data elements.',
  owner: 'Digital Solutions (KOMTRAX)',
  properties: [
    key('readingId', 'Snapshot identifier'),
    dt('readingTime', 'Timestamp of the snapshot'),
    dec('smrHours', 'Cumulative operating hours', 'hours'),
    dec('idleHours', 'Cumulative idle hours', 'hours'),
    dec('fuelUsedLitres', 'Cumulative fuel used', 'L'),
    dec('fuelLevelPct', 'Fuel remaining', '%'),
    dec('defRemainingPct', 'Diesel exhaust fluid remaining', '%'),
    int('cumulativeLoadCount', 'Cumulative load (pass / cycle) count'),
    dec('cumulativePayloadTonnes', 'Cumulative payload hauled (trucks)', 't'),
    dbl('latitude', 'WGS84 latitude', 'deg'),
    dbl('longitude', 'WGS84 longitude', 'deg'),
  ],
  alignments: [std('ISO 15143-3 (AEMP 2.0)', 'Equipment snapshot (CumulativeOperatingHours, CumulativeIdleHours, FuelUsed, FuelRemaining, DEFRemaining, Location)', 'exactMatch'), sosa('Observation'), std('MIMOSA CCOM', 'Measurement')],
  binding: komtrax('machine_snapshots', { readingId: 'snapshot_id', readingTime: 'snapshot_time', smrHours: 'cumulative_operating_hours', idleHours: 'cumulative_idle_hours', fuelUsedLitres: 'fuel_used_l', latitude: 'latitude', longitude: 'longitude' }),
};

const meterReading: KomatsuEntityType = {
  id: 'meterReading', name: 'MeterReading', icon: '🔢', color: C.telematics, domain: 'telematics',
  description: 'A service-meter (SMR) or odometer reading recorded against a unit in Annata — from KOMTRAX, a technician, the customer portal or a delivery.',
  synonyms: ['SMR', 'SMU', 'Counter reading (Annata)', 'Hour meter'],
  owner: 'Equipment Administration',
  properties: [
    key('meterReadingId', 'Counter reading identifier'),
    dt('readingTime', 'When the reading was taken'),
    oneOf('meterType', ['SMR Hours', 'Odometer', 'Payload Cycles', 'Engine Hours'], 'Meter / counter type'),
    dec('meterValue', 'Reading value'),
    oneOf('readingSource', ['KOMTRAX', 'Technician', 'Customer Portal', 'Delivery', 'Estimated'], 'Where the reading came from'),
    bool('isValidated', 'True when the reading passed plausibility checks'),
  ],
  alignments: [sosa('Observation'), std('ISO 15143-3 (AEMP 2.0)', 'CumulativeOperatingHours', 'related'), std('MIMOSA CCOM', 'Measurement', 'closeMatch')],
  binding: annata('amdevicemeterreading', { meterReadingId: 'recid', readingTime: 'readingdatetime', meterType: 'metertype', meterValue: 'metervalue', readingSource: 'source' }, { alternate: 'msauto_devicemeasurement (Dataverse) / msdyn_propertylog (Field Service)' }),
};

const machineAlert: KomatsuEntityType = {
  id: 'machineAlert', name: 'MachineAlert', icon: '🚨', color: C.telematics, domain: 'telematics',
  description: 'A KOMTRAX caution or fault event, maintenance-due notice, geofence or curfew breach raised for a unit.',
  synonyms: ['KOMTRAX caution', 'IoT alert'],
  owner: 'Digital Solutions (KOMTRAX)',
  properties: [
    key('alertId', 'Alert identifier'),
    dt('alertTime', 'When the alert was raised'),
    oneOf('alertType', ['Fault Code', 'Caution', 'Maintenance Due', 'Geofence', 'Curfew', 'Abnormal Operation', 'Low Fuel'], 'Alert category'),
    oneOf('severity', ['Info', 'Warning', 'Critical'], 'Severity'),
    int('occurrenceCount', 'J1939 occurrence count reported with the fault'),
    oneOf('status', ['New', 'Acknowledged', 'Case Created', 'Service Ordered', 'Closed'], 'Handling status'),
  ],
  alignments: [sosa('Observation', 'broadMatch'), std('ISO 15143-3 (AEMP 2.0)', 'Fault code time series', 'closeMatch'), std('SAE J1939-73', 'DM1 active / DM2 previously active DTC', 'related'), std('MIMOSA CCOM', 'ActualEvent'), cdm('IoTAlert')],
  binding: ce('msdyn_iotalert', { alertId: 'msdyn_iotalertid', alertTime: 'msdyn_alerttime', alertType: 'msdyn_alerttype', status: 'statuscode' }, { toConfirm: true }),
};

const faultCode: KomatsuEntityType = {
  id: 'faultCode', name: 'FaultCode', icon: '⚠️', color: C.telematics, domain: 'telematics',
  description: 'A machine-generated diagnostic trouble code (Komatsu error code, mapped to SAE J1939 SPN/FMI where applicable).',
  owner: 'Product Support Engineering',
  properties: [
    key('faultCodeId', 'Komatsu error code, e.g. CA234'),
    str('faultDescription', 'Fault description'),
    int('spn', 'SAE J1939 suspect parameter number'),
    int('fmi', 'SAE J1939 failure mode identifier'),
    oneOf('system', ['Engine', 'Hydraulic', 'Electrical', 'Powertrain', 'Brakes', 'Aftertreatment', 'Controller'], 'Machine system'),
    oneOf('severity', ['Info', 'Warning', 'Critical'], 'Default severity'),
  ],
  alignments: [std('SAE J1939-73', 'Diagnostic Trouble Code (SPN 19 bits + FMI 5 bits)', 'closeMatch'), std('ISO 15143-3 (AEMP 2.0)', 'FaultCode', 'closeMatch'), { standard: 'W3C SKOS', term: 'Concept (Komatsu error-code scheme)', iri: 'http://www.w3.org/2004/02/skos/core#Concept', kind: 'broadMatch' }],
  binding: reference('fault_code', { faultCodeId: 'fault_code', faultDescription: 'description', spn: 'spn', fmi: 'fmi', system: 'system' }, 'KOMTRAX'),
};

const oilSample: KomatsuEntityType = {
  id: 'oilSample', name: 'OilSample', icon: '🧪', color: C.telematics, domain: 'telematics',
  description: 'An oil analysis sample (KOWA, Condition Monitoring Services) taken from a unit compartment, with a laboratory condition rating.',
  synonyms: ['KOWA sample', 'CMS sample', 'Fluid analysis'],
  owner: 'Condition Monitoring',
  properties: [
    key('sampleNumber', 'Laboratory sample number'),
    date('sampleDate', 'Date sampled'),
    oneOf('compartment', ['Engine', 'Transmission', 'Hydraulic', 'Final Drive', 'Differential', 'Swing Circle', 'Coolant'], 'Compartment sampled'),
    dec('oilHours', 'Hours on the oil', 'hours'),
    oneOf('conditionRating', ['Normal', 'Monitor', 'Action', 'Urgent'], 'Laboratory rating'),
    str('recommendation', 'Laboratory recommendation'),
  ],
  alignments: [sosa('Observation'), std('ISO 14224', 'Detection method: condition monitoring', 'related'), std('MIMOSA CCOM', 'Measurement')],
  binding: reference('kowa_oil_sample', { sampleNumber: 'sample_number', sampleDate: 'sample_date', compartment: 'compartment', oilHours: 'oil_hours', conditionRating: 'rating' }, 'LIMC (oil analysis lab)'),
};

// ═══════════════════════════════════════════════════════════════════════════

export const komatsuEntities: KomatsuEntityType[] = [
  // Party
  customer, customerSite, contact, branch, salesTerritory, employee, supplier,
  // Product
  machineType, machineModel, machineOption, equipmentUnit, component, part, partInterchange,
  // Hensei
  factory, machineDemandForecast, henseiCycle, henseiRequest, factoryOrder,
  // Sales
  opportunity, salesQuote, salesOrder, salesOrderLine, tradeIn, financeAgreement, priceList, customerInvoice, machineHandover,
  // Logistics
  shipment, vesselVoyage, customsEntry, biosecurityInspection,
  // PDI
  pdiJob, inspectionResult,
  // Parts
  warehouse, inventoryPosition, purchaseOrder, purchaseOrderLine, purchaseAgreement, goodsReceipt, transferOrder, partsRequirement,
  // Planning
  partsDemandForecast, stockingPolicy, planningRun, plannedOrder,
  // Service
  workshopBay, workOrder, workOrderJob, standardJob, maintenancePlan, technician, skill, resourceBooking, timeEntry, failureMode,
  // Contracts & warranty
  serviceContract, contractEntitlement, warrantyCoverage, warrantyClaim, serviceCampaign, rentalAgreement,
  // Reman
  coreReturn, remanJob,
  // Support
  supportCase, portalUser,
  // Telematics
  telematicsReading, meterReading, machineAlert, faultCode, oilSample,
];

// ═══════════════════════════════════════════════════════════════════════════
// RELATIONSHIPS
// ═══════════════════════════════════════════════════════════════════════════

const rel = (
  from: string,
  name: string,
  to: string,
  cardinality: KomatsuRelationship['cardinality'],
  description: string,
  attributes?: KomatsuRelationship['attributes'],
): KomatsuRelationship => ({ id: name, name, from, to, cardinality, description, ...(attributes ? { attributes } : {}) });

export const komatsuRelationships: KomatsuRelationship[] = [
  // ── Party
  rel('customer', 'operatesSite', 'customerSite', 'one-to-many', 'A customer operates one or more job, mine or depot sites'),
  rel('contact', 'worksFor', 'customer', 'many-to-one', 'A contact works for a customer organisation'),
  rel('customer', 'inTerritory', 'salesTerritory', 'many-to-one', 'A customer is covered by one sales territory'),
  rel('customer', 'hasAccountManager', 'employee', 'many-to-one', 'A customer has a territory or key account manager'),
  rel('customer', 'assignedPriceList', 'priceList', 'many-to-one', 'A customer buys on an assigned price group'),
  rel('salesTerritory', 'servicedByBranch', 'branch', 'many-to-one', 'A territory is supported by a home branch'),
  rel('employee', 'managesTerritory', 'salesTerritory', 'one-to-many', 'A territory manager manages one or more territories'),
  rel('employee', 'basedAtBranch', 'branch', 'many-to-one', 'An employee is based at a branch'),

  // ── Product
  rel('machineModel', 'isOfType', 'machineType', 'many-to-one', 'A model is of one ISO 6165 machine type'),
  rel('machineModel', 'producedAt', 'factory', 'many-to-one', 'A model is built at a source factory for Australia'),
  rel('machineOption', 'optionForModel', 'machineModel', 'many-to-many', 'An option or kit is available for one or more models'),
  rel('equipmentUnit', 'unitOfModel', 'machineModel', 'many-to-one', 'A unit is built to a model'),
  rel('equipmentUnit', 'ownedBy', 'customer', 'many-to-one', 'A unit is owned by a customer (current owner)'),
  rel('equipmentUnit', 'operatesAt', 'customerSite', 'many-to-one', 'A unit currently operates at a customer site'),
  rel('equipmentUnit', 'fittedWithOption', 'machineOption', 'many-to-many', 'A unit is configured with factory options and local fitments'),
  rel('component', 'installedOn', 'equipmentUnit', 'many-to-one', 'A major component is installed on a unit'),
  rel('component', 'isPartNumber', 'part', 'many-to-one', 'A serialised component is an instance of a part number'),
  rel('part', 'fitsModel', 'machineModel', 'many-to-many', 'A part is applicable to machine models (by serial range)', [
    { name: 'serialFrom', type: 'string' },
    { name: 'serialTo', type: 'string' },
    { name: 'qtyPerMachine', type: 'decimal' },
  ]),
  rel('partInterchange', 'replacesPart', 'part', 'many-to-one', 'An interchange record replaces an old part number'),
  rel('partInterchange', 'withPart', 'part', 'many-to-one', 'An interchange record points to the new or alternate part number'),
  rel('part', 'primarySupplier', 'supplier', 'many-to-one', 'A part has a primary (default) supplier'),

  // ── Hensei & factory ordering
  rel('factory', 'tradesAsSupplier', 'supplier', 'many-to-one', 'A factory is bought from through a Komatsu group vendor account'),
  rel('machineDemandForecast', 'forecastsModel', 'machineModel', 'many-to-one', 'A machine forecast is for a model'),
  rel('machineDemandForecast', 'informsCycle', 'henseiCycle', 'many-to-one', 'Machine forecasts inform a Hensei cycle'),
  rel('henseiCycle', 'includesRequest', 'henseiRequest', 'one-to-many', 'A Hensei cycle includes request lines'),
  rel('henseiCycle', 'coordinatedBy', 'employee', 'many-to-one', 'A Hensei cycle is run by a Hensei (Hansei) planner'),
  rel('henseiRequest', 'requestsModel', 'machineModel', 'many-to-one', 'A Hensei request is for a model'),
  rel('henseiRequest', 'requestedFromFactory', 'factory', 'many-to-one', 'A Hensei request is placed with a factory'),
  rel('henseiRequest', 'backedBySalesOrder', 'salesOrder', 'many-to-one', 'A customer-backed request supports a machine sales order'),
  rel('factoryOrder', 'fulfilsRequest', 'henseiRequest', 'many-to-one', 'A factory order fulfils an allocated Hensei request'),
  rel('factoryOrder', 'placedWithFactory', 'factory', 'many-to-one', 'A factory order is placed with a factory'),
  rel('factoryOrder', 'producesUnit', 'equipmentUnit', 'one-to-one', 'A factory order produces one serialised unit'),
  rel('factoryOrder', 'specifiesOption', 'machineOption', 'many-to-many', 'A factory order specifies factory options'),

  // ── Sales to cash
  rel('opportunity', 'opportunityFor', 'customer', 'many-to-one', 'An opportunity is with a customer'),
  rel('opportunity', 'ownedBySalesRep', 'employee', 'many-to-one', 'An opportunity is owned by a sales representative'),
  rel('opportunity', 'interestedInModel', 'machineModel', 'many-to-many', 'An opportunity is for one or more machine models'),
  rel('salesQuote', 'quoteForOpportunity', 'opportunity', 'many-to-one', 'A quote is issued against an opportunity'),
  rel('salesQuote', 'quotedTo', 'customer', 'many-to-one', 'A quote is addressed to a customer'),
  rel('salesQuote', 'quotesUnit', 'equipmentUnit', 'many-to-many', 'A machine quote offers specific stock or on-order units'),
  rel('salesOrder', 'convertedFromQuote', 'salesQuote', 'many-to-one', 'A sales order is created from an accepted quote'),
  rel('salesOrder', 'orderedBy', 'customer', 'many-to-one', 'A sales order is placed by a customer'),
  rel('salesOrder', 'deliverToSite', 'customerSite', 'many-to-one', 'A sales order is delivered to a customer site'),
  rel('salesOrder', 'soldByBranch', 'branch', 'many-to-one', 'A sales order is booked to a selling branch'),
  rel('salesOrder', 'hasSalesLine', 'salesOrderLine', 'one-to-many', 'A sales order has lines'),
  rel('salesOrderLine', 'ordersPart', 'part', 'many-to-one', 'A parts line orders a part number'),
  rel('salesOrderLine', 'allocatesUnit', 'equipmentUnit', 'many-to-one', 'A machine line allocates a specific unit'),
  rel('salesOrderLine', 'shipsFromWarehouse', 'warehouse', 'many-to-one', 'A line is fulfilled from a warehouse'),
  rel('tradeIn', 'tradedInOn', 'salesOrder', 'many-to-one', 'A trade-in is taken on a machine sales order'),
  rel('tradeIn', 'becomesUsedUnit', 'equipmentUnit', 'one-to-one', 'An accepted trade-in becomes a used-stock unit'),
  rel('financeAgreement', 'financesOrder', 'salesOrder', 'one-to-many', 'A finance agreement funds one or more machine orders'),
  rel('financeAgreement', 'financedCustomer', 'customer', 'many-to-one', 'A finance agreement is with a customer'),
  rel('customerInvoice', 'invoicesSalesOrder', 'salesOrder', 'many-to-one', 'An invoice bills a sales order'),
  rel('customerInvoice', 'billedTo', 'customer', 'many-to-one', 'An invoice is billed to a customer'),
  rel('customerInvoice', 'invoicesWorkOrder', 'workOrder', 'many-to-one', 'An invoice bills a work order'),
  rel('customerInvoice', 'invoicesContract', 'serviceContract', 'many-to-one', 'An invoice bills a contract period'),
  rel('machineHandover', 'handsOverUnit', 'equipmentUnit', 'many-to-one', 'A handover delivers a unit to its customer'),
  rel('machineHandover', 'completesSalesOrder', 'salesOrder', 'many-to-one', 'A handover completes a machine sales order'),
  rel('machineHandover', 'acceptedBy', 'contact', 'many-to-one', 'A handover is signed off by a customer contact'),

  // ── Import & logistics
  rel('equipmentUnit', 'movedOnShipment', 'shipment', 'many-to-many', 'A unit is moved on import, transfer and delivery shipments'),
  rel('shipment', 'carriedOnVoyage', 'vesselVoyage', 'many-to-one', 'An import shipment is carried on a vessel voyage'),
  rel('shipment', 'carriedBy', 'supplier', 'many-to-one', 'A shipment is carried by a carrier or forwarder'),
  rel('shipment', 'shipsPurchaseOrder', 'purchaseOrder', 'many-to-many', 'An inbound shipment carries purchase orders'),
  rel('shipment', 'deliversSalesOrder', 'salesOrder', 'many-to-many', 'An outbound shipment delivers sales orders'),
  rel('shipment', 'movesTransfer', 'transferOrder', 'many-to-many', 'A shipment moves transfer orders between warehouses'),
  rel('shipment', 'destinedFor', 'warehouse', 'many-to-one', 'An inbound or transfer shipment is destined for a warehouse'),
  rel('customsEntry', 'declaresShipment', 'shipment', 'many-to-one', 'An import declaration clears a shipment'),
  rel('customsEntry', 'lodgedByBroker', 'supplier', 'many-to-one', 'An import declaration is lodged by a customs broker'),
  rel('biosecurityInspection', 'inspectsUnit', 'equipmentUnit', 'many-to-one', 'A biosecurity inspection is of an imported unit'),
  rel('biosecurityInspection', 'inspectsShipment', 'shipment', 'many-to-one', 'A biosecurity inspection relates to an import shipment'),

  // ── PDI
  rel('pdiJob', 'pdiForUnit', 'equipmentUnit', 'many-to-one', 'A PDI job prepares a unit'),
  rel('pdiJob', 'preparesForOrder', 'salesOrder', 'many-to-one', 'A PDI job prepares a unit for a customer order'),
  rel('pdiJob', 'fitsOption', 'machineOption', 'many-to-many', 'A PDI job fits local options and compliance items'),
  rel('pdiJob', 'scheduledInBay', 'workshopBay', 'many-to-one', 'A PDI job is scheduled into a PDI bay'),
  rel('pdiJob', 'plannedBy', 'employee', 'many-to-one', 'A PDI job is planned by a PDI planner'),
  rel('pdiJob', 'pdiAtBranch', 'branch', 'many-to-one', 'A PDI job is performed at a branch workshop'),
  rel('pdiJob', 'hasPdiCheck', 'inspectionResult', 'one-to-many', 'A PDI job records checklist results'),
  rel('workshopBay', 'bayAtBranch', 'branch', 'many-to-one', 'A bay belongs to a branch'),

  // ── Parts supply chain & procurement
  rel('warehouse', 'warehouseOfBranch', 'branch', 'many-to-one', 'A warehouse is operated by a branch or DC'),
  rel('inventoryPosition', 'stockOfPart', 'part', 'many-to-one', 'An inventory position is for a part'),
  rel('inventoryPosition', 'heldAtWarehouse', 'warehouse', 'many-to-one', 'An inventory position is held at a warehouse'),
  rel('purchaseOrder', 'orderedFromSupplier', 'supplier', 'many-to-one', 'A purchase order is placed with a supplier'),
  rel('purchaseOrder', 'hasPurchaseLine', 'purchaseOrderLine', 'one-to-many', 'A purchase order has lines'),
  rel('purchaseOrder', 'receivesInto', 'warehouse', 'many-to-one', 'A purchase order is received into a warehouse'),
  rel('purchaseOrder', 'releasedFromAgreement', 'purchaseAgreement', 'many-to-one', 'A purchase order is released against an agreement'),
  rel('purchaseOrderLine', 'purchasesPart', 'part', 'many-to-one', 'A purchase line buys a part number'),
  rel('purchaseAgreement', 'agreementWithSupplier', 'supplier', 'many-to-one', 'A purchase agreement is with a supplier'),
  rel('goodsReceipt', 'receiptForOrder', 'purchaseOrder', 'many-to-one', 'A goods receipt is against a purchase order'),
  rel('goodsReceipt', 'receivedAt', 'warehouse', 'many-to-one', 'Goods are received at a warehouse'),
  rel('transferOrder', 'transferFrom', 'warehouse', 'many-to-one', 'A transfer ships from a warehouse'),
  rel('transferOrder', 'transferTo', 'warehouse', 'many-to-one', 'A transfer is received at a warehouse'),
  rel('transferOrder', 'transfersPart', 'part', 'many-to-many', 'A transfer moves quantities of parts', [{ name: 'transferQty', type: 'decimal' }]),
  rel('partsRequirement', 'requiresPart', 'part', 'many-to-one', 'A requirement is for a part number'),
  rel('partsRequirement', 'requiredForWorkOrder', 'workOrder', 'many-to-one', 'A requirement is raised by a work order'),
  rel('partsRequirement', 'requiredForPdi', 'pdiJob', 'many-to-one', 'A requirement is raised by a PDI job'),
  rel('partsRequirement', 'requiredForReman', 'remanJob', 'many-to-one', 'A requirement is raised by a reman job'),
  rel('partsRequirement', 'reservedFrom', 'warehouse', 'many-to-one', 'A requirement is reserved from a warehouse'),
  rel('partsRequirement', 'sourcedViaPurchaseLine', 'purchaseOrderLine', 'many-to-one', 'A requirement is bought in on a purchase line'),

  // ── Demand & supply planning
  rel('partsDemandForecast', 'forecastsPart', 'part', 'many-to-one', 'A parts forecast is for a part'),
  rel('partsDemandForecast', 'forecastAtWarehouse', 'warehouse', 'many-to-one', 'A parts forecast is for a warehouse'),
  rel('partsDemandForecast', 'feedsPlanningRun', 'planningRun', 'many-to-many', 'Forecasts are consumed by planning runs'),
  rel('stockingPolicy', 'policyForPart', 'part', 'many-to-one', 'A stocking policy is for a part'),
  rel('stockingPolicy', 'policyAtWarehouse', 'warehouse', 'many-to-one', 'A stocking policy applies at a warehouse'),
  rel('stockingPolicy', 'ownedByPlanner', 'employee', 'many-to-one', 'A stocking policy is owned by a parts planner'),
  rel('planningRun', 'generatesPlannedOrder', 'plannedOrder', 'one-to-many', 'A planning run generates planned orders'),
  rel('planningRun', 'runBy', 'employee', 'many-to-one', 'A planning run is executed by a supply planner'),
  rel('plannedOrder', 'plansPart', 'part', 'many-to-one', 'A planned order is for a part'),
  rel('plannedOrder', 'plannedForWarehouse', 'warehouse', 'many-to-one', 'A planned order replenishes a warehouse'),
  rel('plannedOrder', 'suggestedSupplier', 'supplier', 'many-to-one', 'A planned purchase suggests a supplier'),
  rel('plannedOrder', 'firmedAsPurchaseOrder', 'purchaseOrder', 'many-to-one', 'A planned purchase is firmed into a purchase order'),
  rel('plannedOrder', 'firmedAsTransfer', 'transferOrder', 'many-to-one', 'A planned transfer is firmed into a transfer order'),

  // ── Service & technicians
  rel('workOrder', 'servicesUnit', 'equipmentUnit', 'many-to-one', 'A work order is for a unit'),
  rel('workOrder', 'serviceForCustomer', 'customer', 'many-to-one', 'A work order is for a customer'),
  rel('workOrder', 'managedByBranch', 'branch', 'many-to-one', 'A work order is managed by a branch'),
  rel('workOrder', 'performedAtSite', 'customerSite', 'many-to-one', 'A field work order is performed at a customer site'),
  rel('workOrder', 'hasWorkOrderJob', 'workOrderJob', 'one-to-many', 'A work order contains jobs'),
  rel('workOrder', 'hasWorkOrderCheck', 'inspectionResult', 'one-to-many', 'A service inspection records checklist results'),
  rel('workOrder', 'coveredByContract', 'serviceContract', 'many-to-one', 'A work order is performed under a contract'),
  rel('workOrder', 'executesCampaign', 'serviceCampaign', 'many-to-one', 'A work order completes a campaign on a unit'),
  rel('workOrder', 'approvedFromQuote', 'salesQuote', 'many-to-one', 'A repair is approved from a repair estimate'),
  rel('workOrder', 'generatedByPlan', 'maintenancePlan', 'many-to-one', 'A scheduled service is generated by a maintenance plan'),
  rel('workOrder', 'raisedFromCase', 'supportCase', 'many-to-one', 'A work order is raised from a support case'),
  rel('workOrder', 'usesBay', 'workshopBay', 'many-to-one', 'A workshop work order uses a bay'),
  rel('workOrder', 'coordinatedByAdvisor', 'employee', 'many-to-one', 'A work order is coordinated by a service coordinator'),
  rel('workOrderJob', 'basedOnStandardJob', 'standardJob', 'many-to-one', 'A job is based on a standard job'),
  rel('workOrderJob', 'diagnosedFailure', 'failureMode', 'many-to-one', 'A repair job records a failure mode'),
  rel('workOrderJob', 'worksOnComponent', 'component', 'many-to-one', 'A job works on a major component'),
  rel('standardJob', 'standardJobForModel', 'machineModel', 'many-to-many', 'A standard job applies to machine models'),
  rel('standardJob', 'includesKitPart', 'part', 'many-to-many', 'A standard job includes a parts kit', [{ name: 'kitQty', type: 'decimal' }]),
  rel('standardJob', 'requiresSkill', 'skill', 'many-to-many', 'A standard job requires skills or certifications'),
  rel('maintenancePlan', 'plansUnit', 'equipmentUnit', 'many-to-one', 'A maintenance plan is for a unit'),
  rel('maintenancePlan', 'schedulesStandardJob', 'standardJob', 'many-to-one', 'A maintenance plan schedules a standard job'),
  rel('maintenancePlan', 'planUnderContract', 'serviceContract', 'many-to-one', 'A maintenance plan is delivered under a contract'),
  rel('technician', 'isWorker', 'employee', 'one-to-one', 'A technician is an employee (or contractor worker record)'),
  rel('technician', 'homeBranch', 'branch', 'many-to-one', 'A technician belongs to a home branch'),
  rel('technician', 'holdsSkill', 'skill', 'many-to-many', 'A technician holds skills and certifications', [
    { name: 'proficiency', type: 'string' },
    { name: 'expiryDate', type: 'date' },
  ]),
  rel('resourceBooking', 'booksTechnician', 'technician', 'many-to-one', 'A booking allocates a technician'),
  rel('resourceBooking', 'booksWorkOrder', 'workOrder', 'many-to-one', 'A booking is for a work order'),
  rel('resourceBooking', 'booksPdiJob', 'pdiJob', 'many-to-one', 'A booking is for a PDI job'),
  rel('resourceBooking', 'booksRemanJob', 'remanJob', 'many-to-one', 'A booking is for a reman job'),
  rel('resourceBooking', 'booksBay', 'workshopBay', 'many-to-one', 'A booking reserves a workshop bay'),
  rel('timeEntry', 'loggedBy', 'technician', 'many-to-one', 'Time is logged by a technician'),
  rel('timeEntry', 'labourOnJob', 'workOrderJob', 'many-to-one', 'Time is booked to a work order job'),
  rel('timeEntry', 'labourOnPdi', 'pdiJob', 'many-to-one', 'Time is booked to a PDI job'),
  rel('timeEntry', 'labourOnReman', 'remanJob', 'many-to-one', 'Time is booked to a reman job'),

  // ── Contracts & warranty
  rel('serviceContract', 'contractWithCustomer', 'customer', 'many-to-one', 'A contract is with a customer'),
  rel('serviceContract', 'coversUnit', 'equipmentUnit', 'many-to-many', 'A contract covers one or more units'),
  rel('serviceContract', 'contractForSite', 'customerSite', 'many-to-one', 'A site-based contract (e.g. MARC) is for a customer site'),
  rel('serviceContract', 'grantsEntitlement', 'contractEntitlement', 'one-to-many', 'A contract grants entitlements'),
  rel('serviceContract', 'administeredBy', 'employee', 'many-to-one', 'A contract is administered by a contracts administrator'),
  rel('serviceContract', 'contractPriceList', 'priceList', 'many-to-one', 'A contract prices parts and labour from a price list'),
  rel('warrantyCoverage', 'warrantsUnit', 'equipmentUnit', 'many-to-one', 'A warranty covers a unit'),
  rel('warrantyCoverage', 'warrantsComponent', 'component', 'many-to-one', 'A reman or component warranty covers a component'),
  rel('warrantyClaim', 'claimForWorkOrder', 'workOrder', 'many-to-one', 'A claim recovers the cost of a work order'),
  rel('warrantyClaim', 'claimOnUnit', 'equipmentUnit', 'many-to-one', 'A claim is for a failure on a unit'),
  rel('warrantyClaim', 'claimUnderCoverage', 'warrantyCoverage', 'many-to-one', 'A claim is made under a warranty coverage'),
  rel('warrantyClaim', 'claimToFactory', 'factory', 'many-to-one', 'A claim is submitted to the responsible factory'),
  rel('warrantyClaim', 'recoveryFromSupplier', 'supplier', 'many-to-one', 'A supplier-recovery claim is made to a supplier'),
  rel('warrantyClaim', 'claimFailureMode', 'failureMode', 'many-to-one', 'A claim records the failure mode'),
  rel('warrantyClaim', 'causalPart', 'part', 'many-to-one', 'A claim identifies the causal part'),
  rel('warrantyClaim', 'claimForCampaign', 'serviceCampaign', 'many-to-one', 'A campaign claim is for a service campaign'),
  rel('serviceCampaign', 'affectsUnit', 'equipmentUnit', 'many-to-many', 'A campaign affects specific units', [
    { name: 'completionStatus', type: 'string' },
    { name: 'completedDate', type: 'date' },
  ]),
  rel('serviceCampaign', 'issuedByFactory', 'factory', 'many-to-one', 'A campaign is issued by a factory'),
  rel('serviceCampaign', 'campaignForModel', 'machineModel', 'many-to-many', 'A campaign applies to machine models'),
  rel('rentalAgreement', 'rentedBy', 'customer', 'many-to-one', 'A rental agreement is with a customer'),
  rel('rentalAgreement', 'rentsUnit', 'equipmentUnit', 'many-to-many', 'A rental agreement puts rental-fleet units on hire'),
  rel('rentalAgreement', 'rentalAtSite', 'customerSite', 'many-to-one', 'Rented units are delivered to a customer site'),
  rel('customerInvoice', 'invoicesRental', 'rentalAgreement', 'many-to-one', 'An invoice bills a rental period'),

  // ── REMAN
  rel('coreReturn', 'returnsCore', 'component', 'one-to-one', 'A core return brings back a failed component'),
  rel('coreReturn', 'coreForExchangeOrder', 'salesOrder', 'many-to-one', 'A core is owed against a reman exchange order'),
  rel('coreReturn', 'coreReturnedBy', 'customer', 'many-to-one', 'A core is returned by a customer'),
  rel('coreReturn', 'creditedOnInvoice', 'customerInvoice', 'many-to-one', 'A core credit is issued on a credit note'),
  rel('remanJob', 'rebuildsComponent', 'component', 'many-to-one', 'A reman job rebuilds a component'),
  rel('remanJob', 'rebuildsFromCore', 'coreReturn', 'one-to-one', 'An exchange rebuild starts from a returned core'),
  rel('remanJob', 'producesRemanPart', 'part', 'many-to-one', 'A reman job restocks a reman exchange part number'),
  rel('remanJob', 'restocksWarehouse', 'warehouse', 'many-to-one', 'A completed rebuild is receipted into a reman store'),
  rel('remanJob', 'remanAtCentre', 'branch', 'many-to-one', 'A rebuild is performed at a reman centre'),
  rel('remanJob', 'rebuildForCustomer', 'customer', 'many-to-one', 'A customer-own rebuild is for a customer'),
  rel('remanJob', 'teardownFinding', 'failureMode', 'many-to-one', 'A teardown records the failure mode of the core'),

  // ── Customer support & portal
  rel('supportCase', 'caseForCustomer', 'customer', 'many-to-one', 'A case is for a customer'),
  rel('supportCase', 'raisedByContact', 'contact', 'many-to-one', 'A case is raised by a customer contact'),
  rel('supportCase', 'caseAboutUnit', 'equipmentUnit', 'many-to-one', 'A case concerns a unit'),
  rel('supportCase', 'caseAboutOrder', 'salesOrder', 'many-to-one', 'A case concerns a sales order'),
  rel('supportCase', 'caseOwner', 'employee', 'many-to-one', 'A case is owned by a customer support representative'),
  rel('supportCase', 'consumesEntitlement', 'contractEntitlement', 'many-to-one', 'A case consumes a contract entitlement and its SLA'),
  rel('portalUser', 'portalIdentityOf', 'contact', 'one-to-one', 'A portal user is the online identity of a contact'),
  rel('portalUser', 'accessesCustomer', 'customer', 'many-to-many', 'A portal user can access one or more customer accounts'),
  rel('portalUser', 'submitsCase', 'supportCase', 'one-to-many', 'A portal user submits cases'),
  rel('portalUser', 'placesOnlineOrder', 'salesOrder', 'one-to-many', 'A portal user places online parts orders'),

  // ── Telematics & condition monitoring
  rel('telematicsReading', 'reportedByUnit', 'equipmentUnit', 'many-to-one', 'A KOMTRAX snapshot is reported by a unit'),
  rel('meterReading', 'meterOfUnit', 'equipmentUnit', 'many-to-one', 'A meter reading is for a unit'),
  rel('machineAlert', 'alertOnUnit', 'equipmentUnit', 'many-to-one', 'An alert is raised on a unit'),
  rel('machineAlert', 'alertFaultCode', 'faultCode', 'many-to-one', 'A fault alert carries a fault code'),
  rel('machineAlert', 'escalatedToCase', 'supportCase', 'many-to-one', 'An alert is escalated to a support case'),
  rel('machineAlert', 'alertActionedBy', 'workOrder', 'many-to-one', 'An alert is actioned by a work order'),
  rel('faultCode', 'faultForModel', 'machineModel', 'many-to-many', 'A fault code applies to machine models'),
  rel('faultCode', 'suggestsFailure', 'failureMode', 'many-to-many', 'A fault code suggests likely failure modes'),
  rel('oilSample', 'sampledFromUnit', 'equipmentUnit', 'many-to-one', 'An oil sample is taken from a unit'),
  rel('oilSample', 'sampledComponent', 'component', 'many-to-one', 'An oil sample is taken from a component compartment'),
  rel('oilSample', 'sampleActionedBy', 'workOrder', 'many-to-one', 'An adverse oil result is actioned by a work order'),
];

// ═══════════════════════════════════════════════════════════════════════════
// MODULES (focused catalogue views of the enterprise model)
// ═══════════════════════════════════════════════════════════════════════════

export const komatsuModules: KomatsuModule[] = [
  {
    slug: '00-equipment-master',
    title: '00 Equipment & Product Master',
    description: 'The master-data backbone: ISO 6165 machine types, models, options, serialised units and components, part numbers and supersession, factories and suppliers.',
    icon: '🚜',
    tags: ['master-data', 'equipment', 'annata-device', 'iso-6165', 'parts'],
    entityIds: ['machineType', 'machineModel', 'machineOption', 'equipmentUnit', 'component', 'part', 'partInterchange', 'factory', 'supplier', 'customer', 'customerSite', 'meterReading', 'warrantyCoverage'],
  },
  {
    slug: '01-customer-sales',
    title: '01 Customer & Sales to Cash',
    description: 'Customers, sites, contacts and territories through opportunity, quote, order, trade-in, finance, handover and invoice.',
    icon: '🤝',
    tags: ['sales', 'crm', 'd365-ce', 'order-to-cash'],
    entityIds: ['customer', 'customerSite', 'contact', 'salesTerritory', 'employee', 'branch', 'priceList', 'opportunity', 'salesQuote', 'salesOrder', 'salesOrderLine', 'tradeIn', 'financeAgreement', 'machineHandover', 'customerInvoice', 'machineModel', 'equipmentUnit', 'part', 'warehouse'],
  },
  {
    slug: '02-hensei-order-to-delivery',
    title: '02 Hensei & Machine Order-to-Delivery',
    description: 'Machine S&OP forecast, monthly Hensei cycle, factory allocation and orders, import, biosecurity and customs through to customer handover.',
    icon: '🗓️',
    tags: ['hensei', 'factory-order', 'import', 'biosecurity', 'machine-supply'],
    entityIds: ['machineDemandForecast', 'henseiCycle', 'henseiRequest', 'factoryOrder', 'factory', 'machineModel', 'machineOption', 'equipmentUnit', 'shipment', 'vesselVoyage', 'customsEntry', 'biosecurityInspection', 'salesOrder', 'pdiJob', 'machineHandover', 'supplier', 'employee'],
  },
  {
    slug: '03-pdi',
    title: '03 Pre-Delivery Inspection (PDI)',
    description: 'PDI planning and execution: unit arrival, bay and technician scheduling, option and compliance fit-out, parts, checklists and handover.',
    icon: '🔧',
    tags: ['pdi', 'workshop', 'fitment', 'scheduling'],
    entityIds: ['pdiJob', 'equipmentUnit', 'machineOption', 'workshopBay', 'resourceBooking', 'technician', 'timeEntry', 'inspectionResult', 'partsRequirement', 'part', 'salesOrder', 'branch', 'employee', 'shipment', 'biosecurityInspection', 'machineHandover'],
  },
  {
    slug: '04-parts-supply-chain',
    title: '04 Parts Supply Chain & Procurement',
    description: 'Part master and supersession, suppliers and agreements, purchase orders and receipts, warehouses, stock, transfers, shipments and parts orders.',
    icon: '🔩',
    tags: ['parts', 'procurement', 'warehouse', 'inventory', 'd365-fo'],
    entityIds: ['part', 'partInterchange', 'supplier', 'purchaseAgreement', 'purchaseOrder', 'purchaseOrderLine', 'goodsReceipt', 'warehouse', 'inventoryPosition', 'transferOrder', 'shipment', 'customsEntry', 'salesOrder', 'salesOrderLine', 'partsRequirement', 'branch', 'customer'],
  },
  {
    slug: '05-planning',
    title: '05 Demand & Supply Planning',
    description: 'Parts forecasting, stocking policies, master planning runs and planned orders for supply planners, alongside machine forecasts and PDI capacity.',
    icon: '📊',
    tags: ['planning', 'mrp', 'forecast', 's-and-op', 'supply-planner', 'parts-planner'],
    entityIds: ['partsDemandForecast', 'stockingPolicy', 'planningRun', 'plannedOrder', 'inventoryPosition', 'part', 'warehouse', 'supplier', 'purchaseOrder', 'transferOrder', 'partsRequirement', 'employee', 'machineDemandForecast', 'henseiCycle', 'machineModel'],
  },
  {
    slug: '06-service-technicians',
    title: '06 Service & Technicians',
    description: 'Work orders and jobs, standard jobs, maintenance plans, technicians, skills, bookings, labour, parts and failure coding.',
    icon: '🛠️',
    tags: ['service', 'field-service', 'workshop', 'technicians', 'annata'],
    entityIds: ['workOrder', 'workOrderJob', 'standardJob', 'maintenancePlan', 'technician', 'skill', 'resourceBooking', 'timeEntry', 'workshopBay', 'failureMode', 'equipmentUnit', 'component', 'customer', 'customerSite', 'branch', 'partsRequirement', 'part', 'salesQuote', 'customerInvoice', 'employee'],
  },
  {
    slug: '07-contracts-warranty',
    title: '07 Contracts & Warranty',
    description: 'Komplimentary Maintenance, Maintenance Contract Agreements (cost per hour), MARC and rental contracts, entitlements, warranty coverage and claims, and factory PIP campaigns.',
    icon: '📃',
    tags: ['contracts', 'warranty', 'komplimentary-maintenance', 'marc', 'rental', 'pip'],
    entityIds: ['serviceContract', 'contractEntitlement', 'warrantyCoverage', 'warrantyClaim', 'serviceCampaign', 'rentalAgreement', 'failureMode', 'equipmentUnit', 'component', 'customer', 'customerSite', 'workOrder', 'maintenancePlan', 'factory', 'supplier', 'part', 'priceList', 'employee', 'customerInvoice', 'machineModel'],
  },
  {
    slug: '08-reman',
    title: '08 Remanufacturing (REMAN)',
    description: 'Component exchange and core returns, core credits, rebuild jobs, reman stock and reman warranty.',
    icon: '🔄',
    tags: ['reman', 'core-return', 'component', 'circular-economy'],
    entityIds: ['component', 'coreReturn', 'remanJob', 'part', 'salesOrder', 'customer', 'customerInvoice', 'warehouse', 'branch', 'partsRequirement', 'resourceBooking', 'timeEntry', 'failureMode', 'warrantyCoverage', 'equipmentUnit', 'workOrderJob'],
  },
  {
    slug: '09-customer-support',
    title: '09 Customer Support & Portal',
    description: 'Support cases, entitlements and SLAs, customer portal users, KOMTRAX alerts and the work orders they trigger.',
    icon: '🎧',
    tags: ['customer-support', 'portal', 'power-pages', 'cases'],
    entityIds: ['supportCase', 'portalUser', 'contact', 'customer', 'equipmentUnit', 'salesOrder', 'workOrder', 'serviceContract', 'contractEntitlement', 'machineAlert', 'faultCode', 'employee'],
  },
  {
    slug: '10-telematics-condition',
    title: '10 Telematics & Condition Monitoring',
    description: 'KOMTRAX snapshots, meter readings, alerts and fault codes, and oil analysis linked to units, components and service.',
    icon: '📡',
    tags: ['komtrax', 'telematics', 'iso-15143-3', 'condition-monitoring', 'kowa'],
    entityIds: ['telematicsReading', 'meterReading', 'machineAlert', 'faultCode', 'oilSample', 'equipmentUnit', 'component', 'machineModel', 'failureMode', 'workOrder', 'supportCase', 'maintenancePlan'],
  },
];
