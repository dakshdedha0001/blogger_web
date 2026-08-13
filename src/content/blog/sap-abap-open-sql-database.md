---
title: "Open SQL in ABAP – How to Read Data from Database Tables"
description: "Learn how to use Open SQL in SAP ABAP to query database tables. Master SELECT, WHERE, JOIN, aggregate functions, and performance tips."
pubDate: "2026-07-24"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-open-sql-thumbnail.png"
readingTime: "10 min read"
order: 50
keywords:
  - "sap abap"
  - "open sql"
  - "select statement abap"
  - "abap database query"
  - "select single abap"
  - "inner join abap"
  - "where clause abap"
  - "aggregate functions abap"
  - "abap select into table"
  - "abap sql performance"
---

![Open SQL in ABAP](/abap-open-sql-thumbnail.png)

Up until now, all the data in our tutorial programs has been hardcoded — we manually create internal tables and append rows using sample values. But in real SAP systems, data lives in database tables. There are thousands of tables storing everything from customer master records to sales orders to financial postings.

To access this data from your ABAP programs, you use Open SQL. Open SQL is SAP's version of SQL that works across all database platforms. Whether the SAP system runs on HANA, Oracle, SQL Server, or DB2, your Open SQL code works the same way. SAP translates it into the native database SQL automatically.

Learning Open SQL is absolutely critical. Every single real ABAP program reads data from the database. Reports, interfaces, conversions, enhancements — they all start with a SELECT statement. If you cannot write efficient database queries, you cannot build real SAP applications.

---

## What is Open SQL?

Open SQL is a subset of standard SQL that is built into the ABAP language. It provides statements for reading (SELECT), inserting (INSERT), updating (UPDATE), modifying (MODIFY), and deleting (DELETE) data in SAP database tables.

The key advantage of Open SQL over native SQL is portability. Your code runs on any database platform without changes. SAP's database interface layer handles the translation.

---

## SELECT — Reading Data from a Table

The SELECT statement is by far the most used Open SQL statement. It reads data from one or more database tables.

### Basic Syntax

```abap
SELECT field1 field2 field3
  FROM database_table
  INTO TABLE lt_internal_table
  WHERE condition.
```

### Example 1: Select All Columns

```abap
REPORT z_select_all.

DATA: lt_customers TYPE TABLE OF kna1,
      ls_customer  TYPE kna1.

SELECT *
  FROM kna1
  INTO TABLE lt_customers
  UP TO 10 ROWS.

LOOP AT lt_customers INTO ls_customer.
  WRITE: / ls_customer-kunnr, ls_customer-name1, ls_customer-ort01.
ENDLOOP.
```

This reads the first 10 rows from the KNA1 table (Customer Master) and displays the customer number, name, and city.

### Example 2: Select Specific Columns

Instead of selecting all columns with `*`, you should always select only the columns you need. This is faster and uses less memory:

```abap
REPORT z_select_specific.

TYPES: BEGIN OF ty_customer,
         kunnr TYPE kna1-kunnr,
         name1 TYPE kna1-name1,
         ort01 TYPE kna1-ort01,
         land1 TYPE kna1-land1,
       END OF ty_customer.

DATA: lt_customers TYPE TABLE OF ty_customer,
      ls_customer  TYPE ty_customer.

SELECT kunnr name1 ort01 land1
  FROM kna1
  INTO TABLE lt_customers
  UP TO 20 ROWS.

LOOP AT lt_customers INTO ls_customer.
  WRITE: / ls_customer-kunnr, ls_customer-name1, ls_customer-ort01, ls_customer-land1.
ENDLOOP.
```

---

## WHERE Clause — Filtering Data

The WHERE clause lets you filter which rows are returned. Without it, you get all rows from the table (which could be millions).

### Example: Filter by Country

```abap
REPORT z_select_where.

TYPES: BEGIN OF ty_customer,
         kunnr TYPE kna1-kunnr,
         name1 TYPE kna1-name1,
         ort01 TYPE kna1-ort01,
       END OF ty_customer.

DATA: lt_customers TYPE TABLE OF ty_customer,
      ls_customer  TYPE ty_customer.

SELECT kunnr name1 ort01
  FROM kna1
  INTO TABLE lt_customers
  WHERE land1 = 'IN'.    " Only Indian customers

WRITE: 'Indian Customers:'.
ULINE.

LOOP AT lt_customers INTO ls_customer.
  WRITE: / ls_customer-kunnr, ls_customer-name1, ls_customer-ort01.
ENDLOOP.
```

### Multiple Conditions

You can combine conditions with AND and OR:

```abap
SELECT kunnr name1 ort01
  FROM kna1
  INTO TABLE lt_customers
  WHERE land1 = 'IN'
    AND ort01 = 'MUMBAI'.
```

### Using IN with Select-Options

This is how you connect selection screen parameters to your database query:

```abap
REPORT z_select_in.

TYPES: BEGIN OF ty_material,
         matnr TYPE mara-matnr,
         mtart TYPE mara-mtart,
         matkl TYPE mara-matkl,
       END OF ty_material.

DATA: lt_materials TYPE TABLE OF ty_material,
      ls_material  TYPE ty_material.

SELECT-OPTIONS: s_matnr FOR ls_material-matnr,
                s_mtart FOR ls_material-mtart.

START-OF-SELECTION.

  SELECT matnr mtart matkl
    FROM mara
    INTO TABLE lt_materials
    WHERE matnr IN s_matnr
      AND mtart IN s_mtart.

  WRITE: 'Materials found:', lines( lt_materials ).
  ULINE.

  LOOP AT lt_materials INTO ls_material.
    WRITE: / ls_material-matnr, ls_material-mtart, ls_material-matkl.
  ENDLOOP.
```

The `IN` keyword works perfectly with Select-Options. If the user enters a range of material numbers, the SELECT automatically filters based on that range.

---

## SELECT SINGLE — Reading One Row

When you know you only need one specific record, use SELECT SINGLE. It is faster than a regular SELECT because the database stops searching after finding the first match:

```abap
REPORT z_select_single.

DATA: ls_customer TYPE kna1.

SELECT SINGLE *
  FROM kna1
  INTO ls_customer
  WHERE kunnr = '0000001000'.

IF sy-subrc = 0.
  WRITE: 'Customer:', ls_customer-name1.
  NEW-LINE.
  WRITE: 'City:', ls_customer-ort01.
ELSE.
  WRITE: 'Customer not found.'.
ENDIF.
```

Always check `sy-subrc` after SELECT SINGLE. If it is 0, the record was found. If it is 4, no matching record exists.

---

## INNER JOIN — Combining Data from Multiple Tables

In real SAP systems, data is spread across multiple related tables. For example, material basic data is in MARA, and material descriptions are in MAKT. To get both in one query, you use INNER JOIN:

```abap
REPORT z_select_join.

TYPES: BEGIN OF ty_material_desc,
         matnr TYPE mara-matnr,
         mtart TYPE mara-mtart,
         maktx TYPE makt-maktx,
       END OF ty_material_desc.

DATA: lt_materials TYPE TABLE OF ty_material_desc,
      ls_material  TYPE ty_material_desc.

SELECT m~matnr m~mtart t~maktx
  FROM mara AS m
  INNER JOIN makt AS t ON m~matnr = t~matnr
  INTO TABLE lt_materials
  WHERE t~spras = sy-langu      " Current login language
  UP TO 20 ROWS.

LOOP AT lt_materials INTO ls_material.
  WRITE: / ls_material-matnr, ls_material-mtart, ls_material-maktx.
ENDLOOP.
```

### How JOIN Works:
- `mara AS m` — Assigns alias "m" to the MARA table
- `makt AS t` — Assigns alias "t" to the MAKT table
- `ON m~matnr = t~matnr` — Links rows where material number matches
- `m~matnr` — Means "matnr field from table m"

The result contains only materials that exist in both tables and have a description in the user's language.

---

## Aggregate Functions — Counting, Summing, Averaging

Open SQL supports aggregate functions for calculations directly on the database:

```abap
REPORT z_select_aggregate.

DATA: lv_count  TYPE i,
      lv_total  TYPE p DECIMALS 2,
      lv_max    TYPE p DECIMALS 2.

" Count total customers
SELECT COUNT(*)
  FROM kna1
  INTO lv_count.
WRITE: 'Total customers:', lv_count.

" Sum of all sales order values
SELECT SUM( netwr )
  FROM vbak
  INTO lv_total
  WHERE erdat = sy-datum.    " Today's orders only
WRITE: / 'Total order value today:', lv_total.
```

### Available Aggregate Functions:

| Function | Purpose | Example |
| :--- | :--- | :--- |
| **COUNT(*)** | Count number of rows | `SELECT COUNT(*) FROM kna1 INTO lv_count.` |
| **SUM( field )** | Sum of a numeric field | `SELECT SUM( netwr ) FROM vbak INTO lv_total.` |
| **AVG( field )** | Average of a numeric field | `SELECT AVG( netwr ) FROM vbak INTO lv_avg.` |
| **MAX( field )** | Maximum value | `SELECT MAX( netwr ) FROM vbak INTO lv_max.` |
| **MIN( field )** | Minimum value | `SELECT MIN( netwr ) FROM vbak INTO lv_min.` |

---

## FOR ALL ENTRIES — Efficient Linked Queries

When you cannot use JOIN (for example, when you need to read from a table using values from an internal table), use `FOR ALL ENTRIES IN`:

```abap
REPORT z_select_fae.

TYPES: BEGIN OF ty_order,
         vbeln TYPE vbak-vbeln,
         kunnr TYPE vbak-kunnr,
       END OF ty_order.

TYPES: BEGIN OF ty_item,
         vbeln TYPE vbap-vbeln,
         posnr TYPE vbap-posnr,
         matnr TYPE vbap-matnr,
         kwmeng TYPE vbap-kwmeng,
       END OF ty_item.

DATA: lt_orders TYPE TABLE OF ty_order,
      lt_items  TYPE TABLE OF ty_item,
      ls_order  TYPE ty_order,
      ls_item   TYPE ty_item.

* Step 1: Get orders
SELECT vbeln kunnr
  FROM vbak
  INTO TABLE lt_orders
  UP TO 10 ROWS.

* Step 2: Get items for those orders
IF lt_orders IS NOT INITIAL.
  SELECT vbeln posnr matnr kwmeng
    FROM vbap
    INTO TABLE lt_items
    FOR ALL ENTRIES IN lt_orders
    WHERE vbeln = lt_orders-vbeln.
ENDIF.

* Display items
LOOP AT lt_items INTO ls_item.
  WRITE: / ls_item-vbeln, ls_item-posnr, ls_item-matnr, ls_item-kwmeng.
ENDLOOP.
```

### Critical Rule: Always Check IF lt_table IS NOT INITIAL
If the internal table used in FOR ALL ENTRIES is empty, the SELECT will return ALL rows from the database table. This can pull millions of records and crash your program or the entire system. Always check `IS NOT INITIAL` before using FOR ALL ENTRIES.

---

## Performance Tips — Writing Efficient Queries

### 1. Never Use SELECT * in Production Code
Always specify only the columns you need. SELECT * reads all columns, including ones you do not use, which wastes database I/O and network bandwidth.

### 2. Always Use WHERE Clauses
Without a WHERE clause, the database returns all rows. On tables with millions of records, this will be extremely slow or cause memory overflow.

### 3. Use UP TO n ROWS for Testing
During development, add `UP TO 100 ROWS` to limit the result set. Remove it or increase it for production.

### 4. Prefer JOIN Over Nested SELECTs
Instead of doing a SELECT inside a LOOP (which causes one database call per row), use JOIN or FOR ALL ENTRIES to fetch all data in one or two database calls.

```abap
" BAD - One database call per row (N+1 problem)
LOOP AT lt_orders INTO ls_order.
  SELECT SINGLE name1 FROM kna1 INTO lv_name WHERE kunnr = ls_order-kunnr.
ENDLOOP.

" GOOD - One database call for all rows
SELECT kunnr name1
  FROM kna1
  INTO TABLE lt_customers
  FOR ALL ENTRIES IN lt_orders
  WHERE kunnr = lt_orders-kunnr.
```

The bad version makes 1000 database calls for 1000 orders. The good version makes just 1 call.

---

## Common Mistakes to Avoid

### 1. SELECT Inside a LOOP
This is the number one performance killer in ABAP. Every SELECT inside a LOOP creates a separate database call. For 10,000 loop iterations, that is 10,000 network round trips to the database. Always use FOR ALL ENTRIES or JOIN instead.

### 2. Forgetting to Check sy-subrc After SELECT SINGLE
If no matching row is found, the target variable contains garbage data from its previous value. Always check sy-subrc before using the result.

### 3. Using FOR ALL ENTRIES with Empty Table
This is extremely dangerous. An empty internal table in FOR ALL ENTRIES causes a full table scan, potentially reading millions of rows and crashing the system.

### 4. Not Using Proper Index Fields in WHERE
The WHERE clause should use fields that have database indexes. Using non-indexed fields forces a full table scan. Check table indexes using transaction SE11.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> Why should you avoid using SELECT * in production programs?</summary>
<div class="details-content">
SELECT * reads ALL columns from the database table, including columns your program does not need. This wastes database I/O bandwidth, increases memory usage in the application server, and slows down your program. In production SAP systems that handle millions of transactions daily, this inefficiency adds up significantly. Always specify only the exact columns you need in your SELECT statement.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> What happens if you use FOR ALL ENTRIES IN with an empty internal table?</summary>
<div class="details-content">
If the internal table used in FOR ALL ENTRIES is empty, the WHERE condition with the table reference is completely ignored. This means the SELECT returns ALL rows from the database table — potentially millions of records. This can cause memory overflow, crash your program, or even impact system performance for all users. Always add an IF lt_table IS NOT INITIAL check before any SELECT with FOR ALL ENTRIES.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What is the difference between SELECT SINGLE and a regular SELECT that returns one row?</summary>
<div class="details-content">
SELECT SINGLE tells the database to stop searching after finding the first matching row. A regular SELECT without UP TO 1 ROWS continues scanning even after finding a match, which is slower. SELECT SINGLE also returns the result directly into a work area (structure), not into an internal table. Use SELECT SINGLE when you are looking for one specific record by its primary key or unique key.
</div>
</details>

---

## Summary

Open SQL is the bridge between your ABAP programs and the SAP database. Every real application starts with reading data, and Open SQL is how you do it. The most important things to remember are: always specify only the columns you need, always use WHERE clauses, never put SELECT inside a LOOP, and always check IS NOT INITIAL before FOR ALL ENTRIES.

Start by mastering the basic SELECT with WHERE, then move on to JOINs for combining tables, and then learn FOR ALL ENTRIES for more complex scenarios. These three patterns cover about 95 percent of all database operations you will ever need in ABAP.
