---
title: "ABAP CDS Views — Core Data Services Complete Guide for Beginners"
description: "Learn ABAP CDS Views from scratch. Understand how to create CDS views in Eclipse ADT, use annotations, associations, parameters, and build OData services with CDS."
pubDate: "2026-08-04"
category: "ABAP Programming"
author: "Daksh"
image: "/sap-abap-cds-views-thumbnail.png"
readingTime: "15 min read"
order: 67
keywords:
  - "abap cds views"
  - "sap cds view tutorial"
  - "core data services abap"
  - "cds view annotations"
  - "cds view associations"
  - "cds view odata"
  - "abap eclipse adt"
  - "sap hana cds"
  - "cds view select"
  - "sap abap programming"
---

![ABAP CDS Views Complete Guide](/sap-abap-cds-views-thumbnail.png)

Five years ago, when I needed to expose SAP data to a Fiori frontend, the workflow looked like this:

1. Write a custom ABAP program to read database tables using Open SQL.
2. Build an internal table with the exact structure the frontend needed.
3. Create an RFC function module wrapping that internal table.
4. Generate a Gateway OData service (transaction SEGW) on top of the function module.
5. Write Entity Type properties, navigation properties, and associations manually in SEGW.
6. Implement `GET_ENTITY` and `GET_ENTITYSET` methods in the DPC extension class.
7. Register the service, test it, debug it, and deploy it.

Seven steps. Hundreds of lines of boilerplate code. Three different transactions. Two days of work for a simple master data listing.

Then SAP introduced **CDS Views**.

With CDS Views, I replaced all seven steps with one 30-line SQL file created in Eclipse. I defined columns, filters, joins, annotations for OData exposure, and UI labels — all in a single artifact. The OData service generated automatically. The Fiori app consumed it directly.

CDS Views are the foundation of modern ABAP development on S/4HANA. If you're still building data models using SE11 views and SEGW services, this guide will show you the cleaner path.

---

## What are CDS Views?

CDS stands for **Core Data Services**. A CDS View is a SQL-based definition file that creates a virtual database view enriched with semantic metadata (annotations).

You write CDS Views in **Eclipse ADT** (ABAP Development Tools), not in SAP GUI.

A CDS View is more than a regular database view (SE11). A regular database view only defines column selections and joins. A CDS View adds:

- **Annotations** — metadata describing UI labels, OData exposure, search capabilities, authorization checks
- **Associations** — lazy-loaded relationships between entities (like foreign keys in relational databases)
- **Parameters** — input values passed at runtime to filter data dynamically
- **Calculated fields** — computed columns using CASE expressions, string operations, and arithmetic
- **Access Controls** — row-level security using DCL (Data Control Language) objects

```
Traditional SE11 View                    CDS View
──────────────────                       ────────
Column definitions                       Column definitions
Table joins                              Table joins
                                         + Annotations (@UI, @OData, @Search)
                                         + Associations (lazy relationships)
                                         + Input Parameters
                                         + Calculated Fields
                                         + Access Controls (DCL)
```

---

## Your First CDS View

Let's build a CDS View that exposes Sales Order Header data from table `VBAK`.

In Eclipse ADT:
1. Right-click your ABAP package → **New** → **Other ABAP Repository Object** → **Core Data Services** → **Data Definition**.
2. Name: `ZI_SalesOrderHeader`
3. Click Next, choose a template, click Finish.

```sql
@AbapCatalog.sqlViewName: 'ZSALESORDERHDR'
@AbapCatalog.compiler.compareFilter: true
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Sales Order Header'
@VDM.viewType: #BASIC

define view ZI_SalesOrderHeader
  as select from vbak
{
  key vbeln    as SalesOrder,
      erdat    as CreationDate,
      erzet    as CreationTime,
      ernam    as CreatedBy,
      auart    as SalesOrderType,
      vkorg    as SalesOrganization,
      vtweg    as DistributionChannel,
      spart    as Division,
      kunnr    as SoldToParty,
      netwr    as NetValue,
      waerk    as Currency
}
```

Activate it (Ctrl+F3). Done. You just created a reusable semantic data model on top of the raw `VBAK` table.

Let me break down every part.

---

## Anatomy of a CDS View

### The Header Annotations

```sql
@AbapCatalog.sqlViewName: 'ZSALESORDERHDR'
```
This generates an actual database view named `ZSALESORDERHDR` in the ABAP Dictionary. You can query this view name using Open SQL in traditional ABAP programs.

```sql
@AccessControl.authorizationCheck: #CHECK
```
This tells the runtime to check for a CDS Access Control (DCL) object. If a DCL exists, it filters rows automatically based on the user's authorization profile.

```sql
@EndUserText.label: 'Sales Order Header'
```
Human-readable description of the view.

```sql
@VDM.viewType: #BASIC
```
Virtual Data Model (VDM) classification. SAP defines three layers:
- `#BASIC` — Direct table reads, raw data (Interface Views, prefix `I_`)
- `#COMPOSITE` — Joins multiple basic views together
- `#CONSUMPTION` — Frontend-facing views with UI annotations (prefix `C_`)

### The SELECT Statement

```sql
define view ZI_SalesOrderHeader
  as select from vbak
{
  key vbeln as SalesOrder,
      ...
}
```

`define view` creates the CDS entity. `as select from vbak` specifies the source table. Inside the curly braces, you list columns with aliases. The `key` keyword marks the primary key field.

---

## Associations — Defining Relationships

Associations are the CDS replacement for traditional JOIN operations. But unlike JOINs, associations are **lazy**. The associated data is only loaded when explicitly requested.

```sql
define view ZI_SalesOrderHeader
  as select from vbak

  association [1..*] to ZI_SalesOrderItem as _Item
    on $projection.SalesOrder = _Item.SalesOrder

  association [0..1] to ZI_Customer as _Customer
    on $projection.SoldToParty = _Customer.Customer

{
  key vbeln    as SalesOrder,
      kunnr    as SoldToParty,
      netwr    as NetValue,

      // Expose associations
      _Item,
      _Customer
}
```

### Cardinality

The number in square brackets defines the cardinality:
- `[0..1]` — Zero or one related record (e.g., one customer per order)
- `[1..1]` — Exactly one related record
- `[1..*]` — One or more related records (e.g., multiple line items per order)
- `[0..*]` — Zero or more related records

### How associations work at runtime

When you query `ZI_SalesOrderHeader`, the system does NOT automatically join the Items table. It returns only header columns. Only when a consumer (like an OData service or another CDS view) explicitly accesses `_Item`, does the system execute the join.

This improves performance dramatically compared to eager JOINs that load everything upfront.

---

## Calculated Fields and CASE Expressions

CDS Views support inline calculations directly in the SELECT list.

```sql
define view ZI_SalesOrderHeader
  as select from vbak
{
  key vbeln    as SalesOrder,
      netwr    as NetValue,
      waerk    as Currency,

      // Calculated field: Tax at 18%
      cast( netwr * 18 / 100 as abap.dec(15,2) ) as TaxAmount,

      // CASE expression: Order priority label
      case auart
        when 'OR'  then 'Standard Order'
        when 'RE'  then 'Return Order'
        when 'CR'  then 'Credit Memo'
        else 'Other'
      end as OrderTypeText,

      // Date calculation: Days since creation
      dats_days_between( erdat, $session.system_date ) as DaysSinceCreation
}
```

CDS supports:
- `cast()` for type conversion
- `case ... when ... then ... end` for conditional values
- Built-in functions like `dats_days_between()`, `concat()`, `substring()`, `abs()`, `ceil()`, `floor()`
- Session variables like `$session.system_date`, `$session.user`, `$session.client`

---

## CDS Views with Input Parameters

Sometimes your view needs external input at runtime (e.g., filter by a specific company code that isn't hardcoded).

```sql
define view ZI_SalesOrderByOrg
  with parameters
    p_vkorg : vkorg
  as select from vbak
{
  key vbeln    as SalesOrder,
      vkorg    as SalesOrganization,
      netwr    as NetValue
}
where vbak.vkorg = $parameters.p_vkorg
```

Consuming this view in ABAP:

```abap
SELECT * FROM zi_salesorderbyorg( p_vkorg = '1000' )
  INTO TABLE @DATA(lt_orders).
```

The parameter `p_vkorg` must be supplied at query time. This is cleaner than filtering in ABAP code after selecting all rows.

---

## Exposing CDS Views as OData Services

This is where CDS Views become truly powerful for Fiori development.

By adding a single annotation, your CDS View automatically generates an OData V2 or V4 service:

```sql
@OData.publish: true

define view ZI_SalesOrderHeader
  as select from vbak
{
  ...
}
```

After activation, SAP automatically:
1. Creates a Gateway service in the backend.
2. Registers the service in transaction `/IWFND/MAINT_SERVICE`.
3. Generates Entity Types, Entity Sets, and Navigation Properties from your CDS associations.

You can then consume the OData endpoint directly in a SAPUI5/Fiori app:

```
https://<server>:<port>/sap/opu/odata/sap/ZI_SALESORDERHEADER_CDS/ZI_SalesOrderHeader
```

No SEGW project. No DPC extension class. No manual Entity Type mapping. One annotation did everything.

For OData V4 (used with SAP RAP), you use Service Definitions and Service Bindings instead of `@OData.publish`, but the principle is the same: the CDS View IS the data model.

---

## UI Annotations for Fiori Elements

CDS annotations can define how data appears in a Fiori Elements app without writing any frontend JavaScript:

```sql
@UI.headerInfo: {
  typeName: 'Sales Order',
  typeNamePlural: 'Sales Orders',
  title: { value: 'SalesOrder' },
  description: { value: 'SoldToPartyName' }
}

define view ZC_SalesOrderHeader
  as select from ZI_SalesOrderHeader
{
      @UI.lineItem: [{ position: 10, label: 'Sales Order' }]
      @UI.selectionField: [{ position: 10 }]
  key SalesOrder,

      @UI.lineItem: [{ position: 20, label: 'Customer' }]
      @UI.selectionField: [{ position: 20 }]
      SoldToParty,

      @UI.lineItem: [{ position: 30, label: 'Net Value' }]
      @Semantics.amount.currencyCode: 'Currency'
      NetValue,

      @UI.hidden: true
      Currency
}
```

When Fiori Elements renders this CDS View:
- `@UI.lineItem` defines which columns appear in the table and their order.
- `@UI.selectionField` defines which fields appear as filter bars on the list report page.
- `@UI.headerInfo` defines the object page header title and description.
- `@Semantics.amount.currencyCode` links the amount field to its currency for correct formatting.

The Fiori app's entire table layout, filter bar, and object page structure are driven by these annotations. Zero frontend coding required.

---

## CDS Access Controls (DCL)

Row-level security in CDS uses **Data Control Language** (DCL) objects.

```sql
@EndUserText.label: 'Access Control for Sales Orders'
@MappingRole: true

define role ZI_SalesOrderHeader {
  grant select on ZI_SalesOrderHeader
    where ( SalesOrganization ) =
      aspect pfcg_auth( V_VBAK_VKO, VKORG, ACTVT = '03' );
}
```

This DCL checks the user's PFCG authorization object `V_VBAK_VKO`. If a user has authorization for Sales Organization 1000 only, they'll only see orders from organization 1000 — even if the underlying table contains orders from all organizations.

The access control applies everywhere the CDS View is consumed: Open SQL, OData, Fiori, ALV reports. You define security once, and it applies universally.

---

## Quick checkpoint

**Question 1:** What is the main difference between a traditional SE11 database view and an ABAP CDS View?

> **Answer:** A traditional SE11 view only defines column selections and joins. A CDS View adds annotations (UI, OData, authorization), associations (lazy relationships), input parameters, calculated fields, and access controls — creating a rich semantic data model.

**Question 2:** What does `@OData.publish: true` do when added to a CDS View?

> **Answer:** It automatically generates and registers an OData service from the CDS View without needing a manual SEGW project or DPC extension class implementation.

**Question 3:** How do CDS associations differ from traditional SQL JOINs?

> **Answer:** Associations are lazy-loaded. The associated data is only fetched when explicitly requested by the consumer. Traditional JOINs eagerly load all related data upfront, even if the consumer never accesses it.

---

## Common mistakes

**Mistake 1: Skipping the VDM layering.** Don't create one massive CDS View that joins 15 tables, adds UI annotations, and exposes OData all at once. Follow the VDM pattern: BASIC views (raw table reads) → COMPOSITE views (joins) → CONSUMPTION views (UI annotations + OData). This layering makes views reusable and maintainable.

**Mistake 2: Using CDS Views without Access Controls.** If your CDS View annotation says `@AccessControl.authorizationCheck: #CHECK` but you never create a DCL object, every user sees all data regardless of their authorization profile. Either create the DCL or explicitly set `#NOT_REQUIRED` (only for truly public data).

**Mistake 3: Creating too many calculated fields without performance testing.** Complex CASE expressions and function calls in CDS Views execute at the database level (HANA). While HANA is fast, stacking 20 calculated fields with nested CASE logic on a table with 50 million rows will cause slow query execution. Test with realistic data volumes.

**Mistake 4: Not using Eclipse ADT.** CDS Views cannot be created in SAP GUI (SE11/SE38). You must use Eclipse with ABAP Development Tools. Many developers resist switching from SAP GUI, but Eclipse is now mandatory for modern ABAP development on S/4HANA.

---

*Related reads on this site:*
- [SAP ABAP SELECT Statement](/blog/sap-abap-select-statement) — traditional Open SQL that CDS Views replace
- [SE11 Transaction Code in SAP](/blog/se11-transaction-code-sap-abap) — classical data dictionary views
- [SAP Fiori RAP Backend Development](/blog/sap-fiori-rap-backend-development) — building full CRUD apps on top of CDS Views
