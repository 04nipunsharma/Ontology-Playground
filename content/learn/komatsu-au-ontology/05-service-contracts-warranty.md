---
title: Service, Contracts and Warranty
slug: service-contracts-warranty
description: Work orders and jobs, technicians and skills, maintenance plans, Komplimentary Maintenance and contracts, warranty coverage and claims, PIP campaigns.
order: 5
embed: official/komatsu-au-06-service-technicians
reviewStatus: under-human-review
---

## The work order at the centre

Annata calls it a **work order**; so does the ontology. Every service interaction — scheduled service, breakdown, warranty repair, PIP campaign, component change-out — is a WorkOrder on an EquipmentUnit, split into **WorkOrderJobs** that record *complaint, cause and correction*.

<ontology-embed id="official/komatsu-au-06-service-technicians" height="480px"></ontology-embed>

| Need | Entities |
|---|---|
| What to do | StandardJob (Annata *job list*) with parts kit and required skills |
| Who can do it | Technician `holdsSkill` Skill (with expiry), `homeBranch` |
| When | ResourceBooking of technicians and WorkshopBays |
| With what | PartsRequirement |
| What happened | TimeEntry, FailureMode (ISO 14224), InspectionResult |

## Contracts and warranty

<ontology-embed id="official/komatsu-au-07-contracts-warranty" height="480px"></ontology-embed>

| Product | Entity | Notes |
|---|---|---|
| Komplimentary Maintenance | ServiceContract + MaintenancePlan | Free scheduled servicing (3 years / 2,000 h) |
| Maintenance Contract Agreement | ServiceContract (`billingModel = Per SMR Hour`) | Guaranteed cost per operating hour |
| MARC / resident site support | ServiceContract `contractForSite` CustomerSite | Mining — to confirm internal naming |
| Premium Warranty, Long Haul Support, Parts Plus, Premium Used | WarrantyCoverage | Coverage by time and hours |
| Factory / supplier recovery | WarrantyClaim `claimToFactory` / `recoveryFromSupplier` | With FailureMode and causal Part |
| PIP / recall | ServiceCampaign `affectsUnit` EquipmentUnit | Completion tracked per serial |
| Rental | RentalAgreement `rentsUnit` EquipmentUnit | Rental fleet units |

```quiz
Q: A warranty repair is completed. Which chain lets the Warranty Administrator claim the cost from the factory?
- WorkOrder → coveredByContract → ServiceContract
- WarrantyClaim → claimForWorkOrder → WorkOrder, and WarrantyClaim → claimUnderCoverage → WarrantyCoverage → warrantsUnit → EquipmentUnit [correct]
- SupportCase → caseOwner → Employee
- MaintenancePlan → schedulesStandardJob → StandardJob
> The claim recovers the cost of the work order, is made under the unit's warranty coverage and is submitted to the responsible factory (claimToFactory), carrying the failure mode and causal part.
```
