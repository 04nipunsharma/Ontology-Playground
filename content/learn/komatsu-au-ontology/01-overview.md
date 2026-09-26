---
title: Why an Enterprise Ontology for Komatsu Australia
slug: overview
description: What the ontology is for, how it is layered (standards → business → systems) and how to navigate the 11 modules.
order: 1
embed: official/komatsu-au-enterprise
reviewStatus: under-human-review
---

## One model of the business

Komatsu Australia sells, delivers, supports and rebuilds machines across construction, utilities, quarrying, forestry and mining. The data for a single machine's life is spread across **D365 CE**, **D365 F&O**, **Annata 365**, **KOMTRAX**, the customer portal, the oil lab and factory systems.

The enterprise ontology is a **shared business vocabulary** for that life:

- **71 entity types** — Customer, EquipmentUnit, HenseiCycle, PDIJob, WorkOrder, CoreReturn, SupportCase…
- **199 relationships** — how they connect (`servicesUnit`, `firmedAsPurchaseOrder`, `returnsCore`…)
- **Data owners** — the role accountable for each concept
- **System bindings** — the table and columns where each concept lives today

## Three layers

| Layer | Question it answers | Example for *EquipmentUnit* |
|---|---|---|
| **Industry standards** | Is this a recognised concept? | schema.org `IndividualProduct`, IOF `PieceOfEquipment`, ISO 10261 PIN, ISO 14224 level 6 |
| **Komatsu business** | What do *we* mean? | "An individual serialised machine tracked from factory order to disposal" — owner: Equipment Administration |
| **Systems of record** | Where is the data? | Annata `AMDeviceTable` (alternate: Dataverse `msauto_device`) |

## The full model

<ontology-embed id="official/komatsu-au-enterprise" height="560px"></ontology-embed>

Colours group entities by process domain: blue = customers and organisation, purple = product master, yellow = Hensei, cyan = logistics, orange = PDI, teal = parts, lavender = planning, red-orange = service, navy = contracts, green = REMAN, magenta = support, red = telematics.

## Eleven modules

The full graph is dense on purpose — it is the *enterprise* view. Day-to-day conversations use a module:

| Module | For |
|---|---|
| 00 Equipment & Product Master | Product marketing, equipment administration, parts product |
| 01 Customer & Sales to Cash | Sales, sales administration, AR |
| 02 Hensei & Machine Order-to-Delivery | Hensei planner, logistics, customer project coordinators |
| 03 Pre-Delivery Inspection | PDI planners, workshops |
| 04 Parts Supply Chain & Procurement | Parts operations, procurement |
| 05 Demand & Supply Planning | Parts, inventory and supply planners |
| 06 Service & Technicians | Service coordinators and planners |
| 07 Contracts & Warranty | Contracts and warranty administrators |
| 08 REMAN | Reman coordinators and centres |
| 09 Customer Support & Portal | Customer support, digital channels |
| 10 Telematics & Condition Monitoring | KOMTRAX and condition monitoring |

```quiz
Q: Where does the ontology record that an EquipmentUnit is mastered in Annata's AMDeviceTable?
- In the entity description
- In the system binding (table + column mapping) [correct]
- In the relationship cardinality
- It is not recorded — the ontology is system-independent
> Each entity type carries one system binding: the system of record, the Fabric table and a property-to-column map. That is what makes the business model deployable to Fabric IQ.
```
