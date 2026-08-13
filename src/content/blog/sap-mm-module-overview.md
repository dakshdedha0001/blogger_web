---
title: "SAP MM Module — Material Management Overview for Beginners"
description: "Complete SAP MM module overview. Understand procurement cycle, purchase requisitions, purchase orders, goods receipt, invoice verification, and key MM transaction codes."
pubDate: "2026-08-04"
category: "SAP Functional"
author: "Daksh"
image: "/sap-mm-module-overview-thumbnail.png"
readingTime: "14 min read"
order: 68
keywords:
  - "sap mm module"
  - "sap material management"
  - "sap mm overview"
  - "sap procurement cycle"
  - "sap mm transaction codes"
  - "sap purchase order"
  - "sap goods receipt"
  - "sap mm for beginners"
  - "sap mm interview"
  - "what is sap mm"
---

![SAP MM Module Overview](/sap-mm-module-overview-thumbnail.png)

Before I got into ABAP development, I spent my first three months on an SAP project sitting next to a Materials Manager named Suresh.

Suresh's entire day revolved around one question: "Do we have the right materials, in the right quantity, at the right time, at the right cost?"

He managed raw material procurement for a steel plant. Every morning he checked inventory levels across 4 warehouses. When stock dropped below safety limits, he raised purchase requisitions. He negotiated with vendors, released purchase orders, tracked deliveries, verified invoices, and reconciled payments.

Every single activity Suresh performed that day ran through one SAP module: **SAP MM (Material Management)**.

MM is the backbone of procurement and inventory management in SAP. If you're learning SAP — whether as a consultant, developer, or business user — understanding MM is non-negotiable because almost every other module depends on it.

This guide walks through the entire MM module: what it covers, how the procurement cycle works end-to-end, and which transaction codes matter most.

---

## What does SAP MM cover?

SAP MM handles two major business domains:

### 1. Procurement (Purchasing)

Everything related to buying materials and services from external vendors:
- Determining what to buy (purchase requisitions)
- Finding and evaluating vendors (source determination)
- Creating purchase orders
- Receiving materials (goods receipt)
- Verifying vendor invoices
- Processing payments (integration with SAP FI)

### 2. Inventory Management

Everything related to tracking materials inside your organization:
- Goods receipts (stock coming in)
- Goods issues (stock going out to production or customers)
- Stock transfers between plants and storage locations
- Physical inventory counting
- Stock valuation and material pricing

```
┌──────────────────────────────────────────────────────────┐
│                    SAP MM Module                         │
├────────────────────────────┬─────────────────────────────┤
│      Procurement           │    Inventory Management     │
│  ┌──────────────────┐      │  ┌───────────────────┐      │
│  │ Purchase Requisition│   │  │ Goods Receipt      │      │
│  │ Request for Quotation│  │  │ Goods Issue         │     │
│  │ Purchase Order     │    │  │ Stock Transfer      │     │
│  │ Goods Receipt      │    │  │ Physical Inventory  │     │
│  │ Invoice Verification│   │  │ Stock Valuation     │     │
│  └──────────────────┘      │  └───────────────────┘      │
└────────────────────────────┴─────────────────────────────┘
```

---

## The Procurement Cycle — Step by Step

The procurement cycle is the heart of SAP MM. Every manufacturing plant, retail chain, and service company follows this cycle (with slight variations) to buy materials from external suppliers.

Here's how it flows from start to finish:

```
Step 1          Step 2             Step 3          Step 4           Step 5           Step 6
Requirement ──► Source         ──► Purchase    ──► Goods        ──► Invoice      ──► Payment
Determination   Determination      Order           Receipt         Verification
(ME51N)         (ME41/Outline)    (ME21N)         (MIGO)          (MIRO)          (F110/FI)
```

---

### Step 1: Requirement Determination

The cycle begins when someone in the organization identifies that materials are needed.

This can happen two ways:

**Manual:** A warehouse supervisor checks stock levels and notices that raw material "Steel Rod 12mm" has fallen below the reorder point. He manually creates a **Purchase Requisition** in transaction **ME51N**.

**Automatic (MRP):** SAP's Material Requirements Planning (MRP) run automatically analyzes demand (from production orders, sales orders, forecast) against current stock levels. When stock falls below the reorder point, MRP auto-generates purchase requisitions. Transaction: **MD01** (MRP run) or **MD04** (stock/requirements list).

A Purchase Requisition is an internal document. It says: "We need 500 units of Steel Rod 12mm by August 15th." It doesn't go to any vendor yet.

| Transaction | Purpose |
| :--- | :--- |
| **ME51N** | Create Purchase Requisition |
| **ME52N** | Change Purchase Requisition |
| **ME53N** | Display Purchase Requisition |

---

### Step 2: Source Determination

Once a purchase requisition exists, the purchasing department determines which vendor should supply the material.

**Option A: Existing Vendor with Outline Agreement**

Many companies negotiate long-term contracts with preferred vendors. These contracts are stored as **Outline Agreements** in SAP:
- **Contract (ME31K):** A long-term agreement specifying price and terms, without a fixed delivery schedule.
- **Scheduling Agreement (ME31L):** A long-term agreement with a fixed delivery schedule (common in automotive and manufacturing).

If an outline agreement exists, the system automatically suggests the contracted vendor and pre-negotiated price.

**Option B: Request for Quotation (RFQ)**

If no existing contract covers the material, the buyer sends a **Request for Quotation** to multiple vendors.

| Transaction | Purpose |
| :--- | :--- |
| **ME41** | Create RFQ |
| **ME47** | Maintain Quotation (enter vendor responses) |
| **ME49** | Price Comparison (compare quotations side by side) |

The buyer evaluates quotations on price, delivery time, payment terms, and quality ratings, then selects the winning vendor.

---

### Step 3: Purchase Order Creation

The buyer converts the purchase requisition into a **Purchase Order (PO)** — the official document sent to the vendor authorizing them to deliver materials.

Transaction: **ME21N** (Create Purchase Order)

A Purchase Order contains:
- **Header data:** Vendor name, purchasing organization, document date, payment terms
- **Line items:** Material number, quantity, unit price, delivery date, plant, storage location
- **Conditions:** Pricing conditions (discounts, freight charges, taxes)
- **Texts:** Special instructions for the vendor

```text
Purchase Order: 4500001234
─────────────────────────────────────────────────────
Vendor:        V10001 (Steel Suppliers Ltd.)
PO Date:       2026-08-03
Payment Terms: 30 days net

Item │ Material    │ Description       │ Qty  │ Price │ Delivery
─────┼─────────────┼───────────────────┼──────┼───────┼──────────
10   │ MAT-STL-12  │ Steel Rod 12mm    │ 500  │ ₹85   │ 2026-08-15
20   │ MAT-STL-08  │ Steel Rod 8mm     │ 300  │ ₹72   │ 2026-08-15
```

**Release Strategy:** For high-value purchase orders (e.g., above ₹5,00,000), companies configure approval workflows. A senior manager must "release" the PO before it becomes active. Transaction **ME29N** handles PO release.

| Transaction | Purpose |
| :--- | :--- |
| **ME21N** | Create Purchase Order |
| **ME22N** | Change Purchase Order |
| **ME23N** | Display Purchase Order |
| **ME29N** | Release Purchase Order |
| **ME2M** | PO list by Material |
| **ME2N** | PO list by PO Number |

---

### Step 4: Goods Receipt

When the vendor delivers materials to your warehouse, the stores team performs a **Goods Receipt** in SAP.

Transaction: **MIGO** (Goods Movement)

The goods receipt does three things simultaneously:
1. **Updates inventory:** Stock quantity increases in the designated storage location.
2. **Updates accounting:** An accounting document posts the material value to the stock account (debit) and GR/IR clearing account (credit).
3. **Updates procurement:** The PO line item shows partial or complete delivery.

```text
Goods Receipt for PO 4500001234
────────────────────────────────────
Material Document: 5000034567
Posting Date:      2026-08-14

Item │ Material    │ Ordered │ Received │ Status
─────┼─────────────┼─────────┼──────────┼─────────
10   │ MAT-STL-12  │ 500     │ 480      │ Partial
20   │ MAT-STL-08  │ 300     │ 300      │ Complete
```

Notice that 480 units were received instead of 500. SAP tracks this as a partial delivery. The remaining 20 units are still open on the PO.

---

### Step 5: Invoice Verification

When the vendor sends an invoice, the accounts payable team verifies it against the purchase order and goods receipt.

Transaction: **MIRO** (Invoice Verification)

SAP performs a **3-way match:**
1. Does the invoice match the **Purchase Order** (price, quantity)?
2. Does the invoice match the **Goods Receipt** (received quantity)?
3. Are there any price variances beyond tolerance limits?

If everything matches, the invoice posts successfully. The GR/IR clearing account is cleared, and a vendor payable is created.

If there's a price variance (vendor invoiced ₹90 per unit but PO says ₹85), SAP blocks the invoice for manual review. The buyer must either accept the variance or dispute it with the vendor.

| Transaction | Purpose |
| :--- | :--- |
| **MIRO** | Enter Incoming Invoice |
| **MIR4** | Display Invoice Document |
| **MRBR** | Release Blocked Invoices |

---

### Step 6: Payment Processing

Payment processing happens in the **SAP FI (Financial Accounting)** module. The accounts payable department runs an automatic payment program.

Transaction: **F110** (Automatic Payment Program)

F110 selects all verified vendor invoices due for payment within a date range, groups them by vendor, and creates payment documents (bank transfers, checks, etc.).

This step bridges MM into FI, demonstrating how tightly integrated SAP modules are.

---

## Material Master — The Core Data Object

Every material in SAP is defined in the **Material Master** record. The Material Master is arguably the most important master data object in the entire SAP system.

Transaction: **MM01** (Create), **MM02** (Change), **MM03** (Display)

A single material master contains data spread across multiple **views**, each managed by different departments:

| View | Department | Key Data |
| :--- | :--- | :--- |
| **Basic Data** | Cross-plant | Material description, unit of measure, material group |
| **Purchasing** | Procurement | Purchasing group, order unit, planned delivery time |
| **MRP** | Planning | Reorder point, safety stock, MRP type, lot size |
| **Storage** | Warehouse | Storage bin, shelf life, temperature conditions |
| **Accounting** | Finance | Valuation class, price control (standard vs moving average), standard price |
| **Sales** | Sales & Distribution | Sales organization, item category group, tax classification |

When an ABAP developer creates custom MM reports or enhancements, they frequently read from tables:
- **MARA** — General material data (cross-client)
- **MARC** — Plant-level material data
- **MARD** — Storage location-level material data
- **MAKT** — Material descriptions (language-dependent)

---

## Key MM Transaction Codes Reference

Here's a consolidated reference of the most-used MM transaction codes:

### Material Master
| TCode | Description |
| :--- | :--- |
| MM01 | Create Material |
| MM02 | Change Material |
| MM03 | Display Material |
| MM60 | Material Master List |

### Purchasing
| TCode | Description |
| :--- | :--- |
| ME51N | Create Purchase Requisition |
| ME21N | Create Purchase Order |
| ME22N | Change Purchase Order |
| ME23N | Display Purchase Order |
| ME29N | Release Purchase Order |
| ME41 | Create Request for Quotation |
| ME31K | Create Contract |
| ME31L | Create Scheduling Agreement |

### Inventory Management
| TCode | Description |
| :--- | :--- |
| MIGO | Goods Movement (Receipt, Issue, Transfer) |
| MB52 | Warehouse Stock by Plant/Storage Location |
| MMBE | Stock Overview for Material |
| MI01 | Create Physical Inventory Document |
| MI04 | Enter Physical Inventory Count |
| MI07 | Post Inventory Differences |

### Invoice Verification
| TCode | Description |
| :--- | :--- |
| MIRO | Enter Incoming Invoice |
| MIR4 | Display Invoice |
| MRBR | Release Blocked Invoices |

---

## Quick checkpoint

**Question 1:** What is the difference between a Purchase Requisition and a Purchase Order?

> **Answer:** A Purchase Requisition is an internal document requesting that materials be purchased. A Purchase Order is the official external document sent to the vendor authorizing delivery and specifying price, quantity, and delivery date.

**Question 2:** What three things happen simultaneously when a Goods Receipt is posted in MIGO?

> **Answer:** Inventory stock quantity increases, an accounting document posts (stock account debit, GR/IR clearing account credit), and the purchase order delivery status updates (partial or complete).

**Question 3:** What is the 3-way match performed during invoice verification in MIRO?

> **Answer:** The system matches the vendor invoice against the Purchase Order (price, quantity) and the Goods Receipt (received quantity) to detect pricing or quantity discrepancies.

---

## Common mistakes

**Mistake 1: Creating materials without all required views.** If you create a material with only Basic Data but skip the Purchasing view, users cannot create purchase orders for that material. Always extend materials with views required by every department that needs them.

**Mistake 2: Ignoring tolerance limits in invoice verification.** SAP allows configurable tolerance limits (e.g., accept up to 5% price variance automatically). If these tolerances are set too tight, every minor rounding difference blocks invoices. If set too loose, significant overcharges slip through undetected.

**Mistake 3: Not understanding the GR/IR clearing account.** When goods are received (MIGO), SAP debits stock and credits GR/IR clearing. When the invoice is posted (MIRO), SAP debits GR/IR clearing and credits vendor payable. If goods receipt happens but the invoice never arrives, the GR/IR clearing account shows open items forever. Regular GR/IR clearing reconciliation (transaction MR11) is essential.

**Mistake 4: Confusing Movement Types.** SAP uses numeric movement types to distinguish different goods movements. 101 = Goods Receipt against PO. 201 = Goods Issue to cost center. 301 = Stock Transfer between plants. Using the wrong movement type posts wrong accounting entries and corrupts inventory reports.

---

*Related reads on this site:*
- [SAP ABAP Internal Tables Guide](/blog/sap-abap-internal-tables-guide) — working with MM data in ABAP programs
- [SAP ABAP SELECT Statement](/blog/sap-abap-select-statement) — querying MARA, MARC, EKKO tables
- [SAP ABAP ALV Reports](/blog/sap-abap-alv-reports) — building purchase order and stock reports
