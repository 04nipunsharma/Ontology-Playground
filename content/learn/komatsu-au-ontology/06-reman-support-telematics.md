---
title: REMAN, Customer Support and KOMTRAX
slug: reman-support-telematics
description: Component Exchange and core returns, rebuild jobs, support cases and the portal, KOMTRAX telematics, meter readings and KOWA oil analysis.
order: 6
embed: official/komatsu-au-08-reman
reviewStatus: under-human-review
---

## REMAN: the component loop

<ontology-embed id="official/komatsu-au-08-reman" height="460px"></ontology-embed>

1. A customer buys a **reman exchange** part (SalesOrder of type *Reman Exchange*) and pays a core deposit.
2. The failed component comes back as a **CoreReturn** (`returnsCore` Component), is inspected and credited (`creditedOnInvoice`).
3. A **RemanJob** at Wacol or Welshpool `rebuildsFromCore`, records the teardown FailureMode, consumes PartsRequirements and labour.
4. The rebuilt component `restocksWarehouse` as the reman part number (`producesRemanPart`), with a reman WarrantyCoverage.

## Customer support and the portal

<ontology-embed id="official/komatsu-au-09-customer-support" height="440px"></ontology-embed>

A **SupportCase** is raised by a Contact — by phone, email, the **customer portal** (PortalUser, Power Pages) or automatically from a **MachineAlert**. It can consume a **ContractEntitlement** (SLA) and escalate into a WorkOrder (`raisedFromCase`).

## Telematics and condition monitoring

<ontology-embed id="official/komatsu-au-10-telematics-condition" height="440px"></ontology-embed>

| Signal | Entity | Standard |
|---|---|---|
| Hours, idle, fuel, DEF, location, loads | TelematicsReading | ISO 15143-3 (AEMP 2.0), W3C SOSA Observation |
| Service meter used for PM planning | MeterReading | CCOM Measurement |
| Cautions and fault codes | MachineAlert + FaultCode | SAE J1939 SPN / FMI |
| Oil analysis | OilSample (KOWA / CMS, LIMC) | ISO 14224 condition monitoring |

```quiz
Q: Which relationship lets a reman centre prove that a rebuilt engine came from a specific customer's returned core?
- remanJob → restocksWarehouse → warehouse
- remanJob → rebuildsFromCore → coreReturn → coreReturnedBy → customer [correct]
- coreReturn → creditedOnInvoice → customerInvoice
- component → isPartNumber → part
> The rebuild is linked one-to-one to the core return, which records who returned the core and against which exchange order — full traceability for the component loop.
```
