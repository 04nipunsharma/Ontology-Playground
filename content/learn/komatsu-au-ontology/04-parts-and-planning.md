---
title: Parts Supply Chain and Planning
slug: parts-and-planning
description: Suppliers, purchase and transfer orders, warehouses and stock, parts orders and VOR, and how parts and supply planners balance demand and supply.
order: 4
embed: official/komatsu-au-04-parts-supply-chain
reviewStatus: under-human-review
---

## Procure, store, move, sell

<ontology-embed id="official/komatsu-au-04-parts-supply-chain" height="480px"></ontology-embed>

| Flow | Entities |
|---|---|
| Procure-to-pay | Supplier → PurchaseAgreement → PurchaseOrder → PurchaseOrderLine → Shipment → GoodsReceipt |
| Store | Warehouse (DC, branch store, consignment, reman store) → InventoryPosition |
| Move | TransferOrder (`transferFrom` / `transferTo`) |
| Sell | SalesOrder (stock, counter, online, **VOR**) → SalesOrderLine → Shipment → CustomerInvoice |
| Consume internally | PartsRequirement for work orders, PDI and reman jobs |

## Planning: who does what

<ontology-embed id="official/komatsu-au-05-planning" height="460px"></ontology-embed>

| Role | Owns | Typical question |
|---|---|---|
| **Parts / Inventory & Demand Planner** | PartsDemandForecast, StockingPolicy, InventoryPosition | *"Is the min/max for this filter at Wacol right for next quarter?"* |
| **Supply Planner** | PlannedOrder, TransferOrder, PurchaseOrder | *"Which planned orders should I firm today and from which supplier?"* |
| **Supply Planning Manager** | PlanningRun | *"Did last night's master plan run cover all warehouses?"* |

A **PlanningRun** consumes forecasts (`feedsPlanningRun`) and `generatesPlannedOrder`; the planner firms each planned order into a PurchaseOrder (`firmedAsPurchaseOrder`) or TransferOrder (`firmedAsTransfer`).

## Demand the planner often cannot see

PartsRequirement links *internal* demand — work orders, PDI jobs and reman rebuilds — to parts. Combined with KOMTRAX hours and component life targets, that is the basis for **fleet-driven forecasting** (`forecastMethod = Fleet Hours (KOMTRAX)` or `Component Replacement Plan`).

```quiz
Q: A supply planner wants to know which open work orders are waiting on a backordered part. Which entity connects them?
- StockingPolicy
- PartsRequirement [correct]
- PlanningRun
- PriceList
> PartsRequirement links a work order (requiredForWorkOrder), PDI job or reman job to the Part it needs, with a supply status such as Backordered and the purchase line that will fill it.
```
