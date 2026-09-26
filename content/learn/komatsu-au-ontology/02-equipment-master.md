---
title: The Equipment and Product Master
slug: equipment-master
description: Machine types, models, options, serialised units, components, parts and supersession — the backbone every process hangs off.
order: 2
embed: official/komatsu-au-00-equipment-master
reviewStatus: under-human-review
---

## Everything hangs off the machine

Almost every Komatsu process eventually points at a **serialised machine** — Annata calls it a *device*, Field Service a *customer asset*, the business a *unit*. The ontology calls it **EquipmentUnit**.

<ontology-embed id="official/komatsu-au-00-equipment-master" height="480px"></ontology-embed>

## From type to unit

| Entity | Example | Standard |
|---|---|---|
| **MachineType** | Hydraulic excavator | ISO 6165 basic type, UNSPSC 22101526 |
| **MachineModel** | PC210LC-11 | schema.org `ProductModel`, CCOM `Model` |
| **MachineOption** | Fire suppression, mine-spec pack, tilt bucket | schema.org `isAccessoryOrSparePartFor` |
| **EquipmentUnit** | Serial 500123 with its 17-character PIN | schema.org `IndividualProduct`, ISO 10261 PIN |
| **Component** | Engine serial 26512345 on that unit | ISO 14224 subunit / maintainable item |

`unitStatus` follows the unit through its life: *On Order → In Production → In Transit → In Stock → In PDI → Ready for Delivery → Delivered → In Service → Used Stock → Sold / Scrapped*.

## Parts and supersession

A **Part** is a part number — genuine, reman exchange, filter, GET, undercarriage, kit. Supersession is common, but Fabric IQ does not allow a relationship from an entity type to itself, so supersession is its own entity:

| From | Relationship | To |
|---|---|---|
| PartInterchange | `replacesPart` | Part (old number) |
| PartInterchange | `withPart` | Part (new or alternate number) |

`interchangeType` distinguishes one-way supersession, two-way interchangeable, **reman alternate** and kit replacement.

## Components are what REMAN rebuilds

A **Component** is serialised and *moves*: installed on a unit → removed as a core → rebuilt → reman stock → installed on another unit. Keeping it separate from Part (the number) and EquipmentUnit (the machine) is what makes component life, planned component replacement (PCR) and core tracking possible.

```quiz
Q: Why is part supersession modelled as a PartInterchange entity rather than a Part → Part relationship?
- Because supersession has no attributes
- Because Fabric IQ relationship types must connect two different entity types [correct]
- Because parts are mastered in Dataverse
- Because GS1 forbids it
> Fabric IQ requires the source and target entity types of a relationship to differ. An interchange entity also gives a natural home for interchange type, effective date and quantity ratio.
```
