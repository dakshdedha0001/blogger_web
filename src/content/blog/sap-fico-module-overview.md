---
title: "SAP FICO Module — Finance and Controlling Overview for Beginners"
description: "Complete SAP FICO module overview. Understand General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Cost Centers, Profit Centers, and key FICO transaction codes."
pubDate: "2026-08-04"
category: "SAP Functional"
author: "Daksh"
image: "/sap-fico-module-overview-thumbnail.png"
readingTime: "14 min read"
order: 69
keywords:
  - "sap fico module"
  - "sap fico overview"
  - "sap finance and controlling"
  - "sap fi module"
  - "sap co module"
  - "sap general ledger"
  - "sap fico for beginners"
  - "sap fico transaction codes"
  - "sap accounts payable receivable"
  - "what is sap fico"
---

![SAP FICO Module Overview](/sap-fico-module-overview-thumbnail.png)

Every SAP transaction eventually touches FICO.

When a warehouse operator posts a goods receipt in MM (transaction MIGO), an accounting entry automatically posts in FI. When a sales rep creates a billing document in SD, revenue entries flow into FI. When a production order consumes raw materials in PP, costs flow into CO.

FICO is the financial nervous system of SAP. Every material movement, every invoice, every payroll run, every asset depreciation — they all generate financial postings that land in FICO.

I learned this the hard way during my first ABAP project. I was building a custom report to track procurement spending. I queried the MM tables (EKKO, EKPO) for purchase order data. The numbers looked correct until the finance controller compared my report against his FI books. The totals didn't match. Why? Because my report captured order values, not actual posted accounting values. Currency conversions, tax adjustments, and credit memos all modified the final FI amounts differently than the raw MM document amounts.

From that day, I understood: if you want accurate financial numbers, you read from FI tables (BKPF, BSEG, ACDOCA), not from logistics tables.

This guide explains what the SAP FICO module covers, how FI and CO work together, and which transaction codes and tables matter most.

---

## FICO = FI + CO

SAP FICO is actually two separate modules bundled under one name:

### FI — Financial Accounting

FI handles **external financial reporting**. It records all financial transactions to produce legally required reports for shareholders, tax authorities, auditors, and regulatory bodies.

FI answers the question: "What is our financial position according to accounting standards (IFRS, GAAP, Indian AS)?"

### CO — Controlling

CO handles **internal management reporting**. It tracks costs and revenues across internal organizational units (cost centers, profit centers, projects) to help management make operational decisions.

CO answers the question: "Where are we spending money? Which department is profitable? Is this product line making or losing money?"

```
┌────────────────────────────────────────────────────────────────────┐
│                          SAP FICO                                  │
├────────────────────────────────┬───────────────────────────────────┤
│  FI (Financial Accounting)     │  CO (Controlling)                 │
│  External Reporting            │  Internal Reporting               │
│                                │                                   │
│  ├─ General Ledger (GL)        │  ├─ Cost Center Accounting        │
│  ├─ Accounts Payable (AP)      │  ├─ Profit Center Accounting      │
│  ├─ Accounts Receivable (AR)   │  ├─ Internal Orders               │
│  ├─ Asset Accounting (AA)      │  ├─ Product Costing               │
│  ├─ Bank Accounting            │  ├─ Profitability Analysis (CO-PA)│
│  └─ Tax Accounting             │  └─ Activity-Based Costing        │
└────────────────────────────────┴───────────────────────────────────┘
```

---

## FI Sub-Modules Explained

### 1. General Ledger (FI-GL)

The General Ledger is the central accounting record. Every financial posting in SAP ultimately reaches the General Ledger.

A GL Account is a numeric code representing an accounting category:
- Account 100000: Bank Account
- Account 200000: Accounts Receivable Control
- Account 300000: Raw Material Inventory
- Account 400000: Revenue from Sales
- Account 500000: Cost of Goods Sold

Every financial transaction creates a posting with at least two lines (debit and credit) following double-entry bookkeeping:

```text
Document Number: 5100001234
Posting Date:    2026-08-03
Reference:       Invoice INV-5001

Line │ GL Account │ Description        │ Debit (₹)  │ Credit (₹)
─────┼────────────┼────────────────────┼────────────┼────────────
1    │ 500000     │ Cost of Goods Sold │ 85,000     │
2    │ 300000     │ Raw Material Stock │            │ 85,000
```

**S/4HANA change:** In classic ECC, GL data lived in tables BKPF (header) and BSEG (line items). In S/4HANA, SAP introduced the **Universal Journal** — a single table called **ACDOCA** that merges GL, CO, Profitability Analysis, and Asset Accounting data into one unified record. This simplifies reporting enormously.

| Transaction | Purpose |
| :--- | :--- |
| **FB01** | Post Document (general posting) |
| **FB50** | GL Account Posting (simplified) |
| **FBL3N** | GL Account Line Item Display |
| **FS10N** | GL Account Balance Display |
| **F.01** | GL Financial Statement |

---

### 2. Accounts Payable (FI-AP)

Accounts Payable tracks money your company owes to vendors.

When the MM team verifies a vendor invoice (MIRO), an AP document is created automatically. The AP sub-ledger records:
- How much you owe each vendor
- Payment due dates
- Payment terms (net 30, net 60, cash discount within 10 days)
- Open items waiting for payment

The Automatic Payment Program (transaction **F110**) selects due invoices and generates payment files for bank transfers.

| Transaction | Purpose |
| :--- | :--- |
| **FK01** | Create Vendor Master (FI side) |
| **FK03** | Display Vendor Master |
| **FB60** | Enter Vendor Invoice (direct FI posting) |
| **FBL1N** | Vendor Line Item Display |
| **FK10N** | Vendor Account Balance |
| **F110** | Automatic Payment Program |

---

### 3. Accounts Receivable (FI-AR)

Accounts Receivable tracks money customers owe your company.

When the SD team creates a billing document, an AR posting is created automatically. The AR sub-ledger records:
- Customer outstanding invoices
- Due dates and aging (30 days, 60 days, 90 days overdue)
- Incoming payments and clearing

| Transaction | Purpose |
| :--- | :--- |
| **FD01** | Create Customer Master (FI side) |
| **FD03** | Display Customer Master |
| **FB70** | Enter Customer Invoice |
| **FBL5N** | Customer Line Item Display |
| **FD10N** | Customer Account Balance |
| **F-28** | Incoming Payment Posting |

---

### 4. Asset Accounting (FI-AA)

Asset Accounting manages your company's fixed assets — buildings, machinery, vehicles, computers, furniture.

It tracks:
- Asset acquisition (purchase price, capitalization date)
- Depreciation (automatic monthly/yearly depreciation calculations)
- Asset transfers (moving an asset from one cost center to another)
- Asset retirement (selling or scrapping an asset)

| Transaction | Purpose |
| :--- | :--- |
| **AS01** | Create Asset Master |
| **AS02** | Change Asset Master |
| **AS03** | Display Asset Master |
| **ABZON** | Asset Acquisition (posting) |
| **AFAB** | Depreciation Run |
| **AW01N** | Asset Explorer (view depreciation schedule) |

---

## CO Sub-Modules Explained

### 1. Cost Center Accounting (CO-CCA)

A Cost Center is an organizational unit that incurs costs but does not directly generate revenue. Think: HR Department, IT Department, Plant Maintenance Team, Security Division.

Cost Center Accounting tracks how much each internal department spends.

```text
Cost Center: CC1000 (IT Department — Mumbai)
──────────────────────────────────────────────
Month      │ Salaries    │ Software    │ Hardware   │ Total
───────────┼─────────────┼─────────────┼────────────┼───────────
January    │ 12,00,000   │ 3,50,000    │ 1,80,000   │ 17,30,000
February   │ 12,00,000   │ 2,80,000    │ 45,000     │ 15,25,000
March      │ 12,50,000   │ 4,10,000    │ 0          │ 16,60,000
```

| Transaction | Purpose |
| :--- | :--- |
| **KS01** | Create Cost Center |
| **KS03** | Display Cost Center |
| **KSB1** | Cost Center Line Item Report |
| **S_ALR_87013611** | Cost Center Actual vs Plan Report |

---

### 2. Profit Center Accounting (CO-PCA)

A Profit Center represents a business segment that both incurs costs AND generates revenue. Think: North Region Division, Product Line A, Business Unit "Consumer Electronics."

While Cost Centers only show expenses, Profit Centers show a complete profit and loss picture:

```text
Profit Center: PC2000 (North Region)
──────────────────────────────────────
Revenue:        ₹ 5,00,00,000
(-) COGS:       ₹ 3,20,00,000
(-) Expenses:   ₹ 85,00,000
────────────────────────────
Net Profit:     ₹ 95,00,000
```

| Transaction | Purpose |
| :--- | :--- |
| **KE51** | Create Profit Center |
| **KE53** | Display Profit Center |
| **KE5Z** | Profit Center Line Items |

---

### 3. Internal Orders

Internal Orders track costs for specific temporary activities — a marketing campaign, a building renovation project, a company event, an R&D experiment.

Unlike Cost Centers (which are permanent), Internal Orders are created for specific purposes and closed when the activity ends.

| Transaction | Purpose |
| :--- | :--- |
| **KO01** | Create Internal Order |
| **KO03** | Display Internal Order |
| **KOB1** | Internal Order Line Items |

---

## How FI and CO Integrate

When a financial posting happens in FI, SAP simultaneously creates corresponding CO postings.

**Example:** A raw material is issued from the warehouse to the production floor.

```text
FI Posting (Financial Books):
   Debit:  500000 (Cost of Goods Sold)     ₹ 85,000
   Credit: 300000 (Raw Material Inventory)  ₹ 85,000

CO Posting (Management Reporting):
   Cost Center: CC3000 (Production - Plant Mumbai)
   Cost Element: 500000
   Amount:       ₹ 85,000
```

The FI posting records the accounting entry for external reporting. The CO posting assigns the same cost to the Production cost center for internal management analysis.

In S/4HANA, both FI and CO entries write to the single Universal Journal table **ACDOCA**, eliminating the historical reconciliation problems between FI and CO.

---

## Key Tables for ABAP Developers

When building custom FICO reports in ABAP, you'll frequently read from these tables:

### FI Tables

| Table | Description |
| :--- | :--- |
| **BKPF** | Accounting Document Header |
| **BSEG** | Accounting Document Line Items |
| **BSID** | Customer Open Items |
| **BSAD** | Customer Cleared Items |
| **BSIK** | Vendor Open Items |
| **BSAK** | Vendor Cleared Items |
| **SKA1** | GL Account Master (chart of accounts level) |
| **SKAT** | GL Account Descriptions |
| **ACDOCA** | Universal Journal (S/4HANA — replaces BSEG for reporting) |

### CO Tables

| Table | Description |
| :--- | :--- |
| **CSKS** | Cost Center Master |
| **CEPC** | Profit Center Master |
| **COEP** | CO Line Items (actual postings) |
| **COSS** | CO Summarization (settled costs) |

---

## Quick checkpoint

**Question 1:** What is the fundamental difference between FI and CO?

> **Answer:** FI handles external financial reporting for shareholders, tax authorities, and auditors (legally required). CO handles internal management reporting for company decision-makers (tracking costs and profitability by department, product, or project).

**Question 2:** In S/4HANA, which single table replaces the traditional BKPF/BSEG structure for unified reporting?

> **Answer:** ACDOCA (Universal Journal). It merges GL, CO, Asset Accounting, and Profitability Analysis data into one record.

**Question 3:** What is the difference between a Cost Center and a Profit Center?

> **Answer:** A Cost Center tracks only expenses (e.g., IT Department — costs money but doesn't directly generate revenue). A Profit Center tracks both revenue and expenses to show a complete profit/loss view (e.g., North Region Division — earns revenue and incurs costs).

---

## Common mistakes

**Mistake 1: Querying BSEG directly for large reports.** BSEG is a cluster table in ECC with notoriously poor query performance. For line item reports, use secondary index tables (BSID, BSAD, BSIK, BSAK) or ACDOCA in S/4HANA.

**Mistake 2: Confusing document types.** SAP uses document types (SA, KR, DR, AB, etc.) to categorize postings. SA = GL posting, KR = Vendor Invoice, DR = Customer Invoice, AB = Clearing. Using the wrong document type in custom programs leads to incorrect financial reports.

**Mistake 3: Ignoring fiscal year variants.** Not all companies follow January-December fiscal years. Indian companies commonly use April-March. SAP fiscal year variants (V3, K4, etc.) control period assignment. Custom date-based reports must respect the fiscal year variant, not assume calendar months.

**Mistake 4: Not understanding debit/credit rules for different account types.** Asset accounts increase with debits. Liability accounts increase with credits. Revenue accounts increase with credits. Expense accounts increase with debits. Mixing these up in custom posting programs creates accounting imbalances.

---

*Related reads on this site:*
- [SAP MM Module Overview](/blog/sap-mm-module-overview) — procurement integration with FI (invoice verification, GR/IR)
- [SAP ABAP ALV Reports](/blog/sap-abap-alv-reports) — building financial reports with ALV grid
- [SAP ABAP SELECT Statement](/blog/sap-abap-select-statement) — querying BKPF, BSEG, ACDOCA tables
