---
title: Hensei to Handover
slug: machine-order-to-delivery
description: Machine S&OP, the monthly Hensei cycle, factory orders, import and biosecurity, PDI and customer handover.
order: 3
embed: official/komatsu-au-02-hensei-order-to-delivery
reviewStatus: under-human-review
---

## The machine supply chain

A new machine's journey to a customer spans months and several systems:

1. **MachineDemandForecast** — S&OP demand by model and segment
2. **HenseiCycle / HenseiRequest** — the monthly Hensei (HANSEI, 販生 "sales + production") submission and factory allocation
3. **FactoryOrder** — confirmed order for one unit, with production month and ETD
4. **Shipment / VesselVoyage** — Ro-Ro, breakbulk or container to Port Kembla, Brisbane, Fremantle…
5. **CustomsEntry + BiosecurityInspection** — import declaration and DAFF inspection (BMSB season 1 Sep – 30 Apr)
6. **PDIJob** — assembly, local options, compliance fit-out, testing
7. **MachineHandover** — delivery, operator familiarisation, warranty registration, KOMTRAX activation

<ontology-embed id="official/komatsu-au-02-hensei-order-to-delivery" height="480px"></ontology-embed>

## Linking supply to a customer

A HenseiRequest can be **backed by a SalesOrder** (`backedBySalesOrder`) when a customer has already bought the machine; otherwise it is stock, rental fleet or demonstrator. The FactoryOrder `producesUnit` — a one-to-one link that gives the serial number its history from day one.

## PDI in detail

<ontology-embed id="official/komatsu-au-03-pdi" height="440px"></ontology-embed>

The PDI planner balances three constraints the ontology makes explicit:

| Constraint | Entities |
|---|---|
| When the machine arrives | Shipment `etaDate`, BiosecurityInspection `result` |
| Bay and technician capacity | WorkshopBay, ResourceBooking, Technician + Skill |
| Parts and options available | PartsRequirement (`isCritical`), MachineOption (`fitmentHours`) |

…against the customer's required date (`PDIJob.customerRequiredDate`).

```quiz
Q: A mining customer's truck is held at the port for re-cleaning. Which path shows the PDI planner the impact?
- EquipmentUnit → MeterReading → WorkOrder
- BiosecurityInspection → inspectsUnit → EquipmentUnit ← pdiForUnit ← PDIJob → preparesForOrder → SalesOrder [correct]
- Factory → producedAt → MachineModel
- PartsRequirement → requiresPart → Part
> The inspection points to the unit, the unit has a planned PDI job, and that job prepares the unit for a specific customer order — so the delay can be traced to the customer commitment.
```
