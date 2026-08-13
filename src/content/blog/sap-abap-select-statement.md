---
title: "SELECT Statement in ABAP – How to Read Data from Database Tables"
description: "Learn how to use the SELECT statement in SAP ABAP to fetch data from database tables. Covers SELECT SINGLE, INTO TABLE, WHERE clause, and practical"
pubDate: "2026-07-19"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-select-statement-thumbnail.png"
readingTime: "8 min read"
order: 40
keywords:
  - "sap abap"
  - "select statement"
  - "database query"
  - "open sql"
  - "select single"
  - "where clause"
  - "internal table"
---

![SELECT Statement in ABAP](/abap-select-statement-thumbnail.png)

So far in our ABAP journey, we have learned how to declare variables, assign values, and display output. But here is the thing — in real SAP projects, you almost never hardcode data into your programs. The data lives in database tables, and your job as a developer is to pull it out, process it, and show it to the user.

That is exactly what the SELECT statement does. It reads data from database tables and brings it into your ABAP program so you can work with it.

If you ask any experienced ABAP developer what statement they write most often, the answer will almost always be SELECT. It is the backbone of every report, every interface, and every data processing program in SAP.

---

## What is the SELECT Statement?

The SELECT statement is part of Open SQL in ABAP. Open SQL is a simplified version of standard SQL that SAP provides for database access. You do not need to worry about whether the backend database is HANA, Oracle, or SQL Server — Open SQL handles the translation automatically.

When you write a SELECT statement, the SAP application server converts it into the right SQL dialect for whatever database the system is running on. This makes your code portable across different SAP installations.

---

## Why Do We Need SELECT?

Let us say you are building a report that shows all the materials stored in the warehouse. That material data already exists in a standard SAP table called `MARA`. You do not want to type every material number manually into your program — that would be insane.

Instead, you write a SELECT statement to fetch all the records from `MARA` and load them into your program's memory. From there, you can filter them, calculate totals, or display them in a report.

Common use cases for SELECT:

- Fetching customer master data for a sales report
- Reading material details for inventory management
- Pulling purchase order headers for procurement processing
- Checking if a record exists before creating a new one
- Loading configuration data from custom Z-tables

---

## Basic Syntax

The most basic SELECT statement looks like this:

```abap
SELECT * FROM table_name INTO TABLE lt_result.
```

Let us break it down:

- **`SELECT *`** — Read all columns from the table
- **`FROM table_name`** — The database table you want to read from
- **`INTO TABLE lt_result`** — Store the fetched records into an internal table

That is the simplest form. One line, and you have all the data from that table loaded into your program.

---

## Reading a Single Record with SELECT SINGLE

Sometimes you do not need all the records. You just want one specific row. For example, you want to find the details of material number `M-1001`. In that case, you use `SELECT SINGLE`:

```abap
REPORT z_select_single_demo.

DATA ls_material TYPE mara.

SELECT SINGLE * FROM mara
  INTO ls_material
  WHERE matnr = 'M-1001'.

IF sy-subrc = 0.
  WRITE: / 'Material found:', ls_material-matnr.
ELSE.
  WRITE: / 'Material not found'.
ENDIF.
```

### Important Points:

- `SELECT SINGLE` returns only one row, even if multiple rows match
- The result goes into a **structure** (single row), not an internal table
- Always check `SY-SUBRC` after a SELECT — it tells you if the query was successful
  - `SY-SUBRC = 0` means data was found
  - `SY-SUBRC = 4` means no data was found

---

## Understanding SY-SUBRC

This is something many beginners skip, and then they spend hours debugging. After every SELECT statement, the system sets a return code in `SY-SUBRC`:

| SY-SUBRC Value | Meaning |
| :--- | :--- |
| **0** | Data found successfully |
| **4** | No matching records found |
| **8** | Not all fields could be filled (rare) |

**Always check SY-SUBRC.** If you skip this check and the query returns nothing, your program will continue running with empty variables. This can cause wrong calculations, blank reports, or even data corruption in update programs.

```abap
SELECT SINGLE * FROM mara INTO ls_material WHERE matnr = 'DOES_NOT_EXIST'.

IF sy-subrc <> 0.
  WRITE: / 'No data found. Please check the material number.'.
  RETURN.
ENDIF.
```

---

## Reading Multiple Records into an Internal Table

Most of the time, you need more than one record. To fetch multiple rows, use `SELECT ... INTO TABLE`:

```abap
REPORT z_select_multiple.

DATA lt_materials TYPE TABLE OF mara.
DATA ls_material  TYPE mara.

SELECT * FROM mara
  INTO TABLE lt_materials
  UP TO 10 ROWS.

IF sy-subrc = 0.
  LOOP AT lt_materials INTO ls_material.
    WRITE: / ls_material-matnr, ls_material-mtart.
  ENDLOOP.
ELSE.
  WRITE: / 'No materials found'.
ENDIF.
```

Here, `INTO TABLE` loads the result into an internal table. We then use a `LOOP AT` to go through each record and display it.

The `UP TO 10 ROWS` clause limits the result to 10 records. This is very helpful during development and testing — you do not want to accidentally load a million records while debugging.

---

## Using the WHERE Clause

The WHERE clause filters which records are returned. Without it, SELECT reads every single row in the table, which can be extremely slow on large tables.

```abap
SELECT * FROM mara
  INTO TABLE lt_materials
  WHERE mtart = 'FERT'.
```

This fetches only finished products (material type `FERT`) from the materials table.

### Multiple Conditions

You can combine multiple conditions using `AND` and `OR`:

```abap
SELECT * FROM mara
  INTO TABLE lt_materials
  WHERE mtart = 'FERT'
    AND mbrsh = 'M'.
```

This reads only finished products that belong to industry sector `M` (Mechanical Engineering).

### Using IN for Multiple Values

If you want to match against a list of values, use the `IN` operator:

```abap
DATA lt_types TYPE RANGE OF mara-mtart.

* Add allowed types to the range
APPEND VALUE #( sign = 'I' option = 'EQ' low = 'FERT' ) TO lt_types.
APPEND VALUE #( sign = 'I' option = 'EQ' low = 'HALB' ) TO lt_types.

SELECT * FROM mara
  INTO TABLE lt_materials
  WHERE mtart IN lt_types.
```

This fetches materials where the type is either `FERT` (Finished Product) or `HALB` (Semi-Finished Product).

---

## Selecting Specific Columns

Reading all columns with `SELECT *` is easy but not always a good idea. If a table has 200 columns and you only need 3 of them, you are wasting memory and network bandwidth.

To read specific columns:

```abap
TYPES: BEGIN OF ty_material,
         matnr TYPE mara-matnr,
         mtart TYPE mara-mtart,
         mbrsh TYPE mara-mbrsh,
       END OF ty_material.

DATA lt_materials TYPE TABLE OF ty_material.

SELECT matnr mtart mbrsh FROM mara
  INTO TABLE lt_materials
  UP TO 20 ROWS.
```

Here, we first define a custom type with only the three fields we need. Then we SELECT only those three columns. This is much faster and uses less memory.

> In real SAP projects, senior developers and code reviewers will always ask you to avoid `SELECT *` and read only the columns you actually need. It is considered a basic performance best practice.

---

## Sorting Your Results

You can sort the results directly in the SELECT statement using `ORDER BY`:

```abap
SELECT matnr mtart FROM mara
  INTO TABLE lt_materials
  ORDER BY matnr ASCENDING.
```

This fetches materials sorted by material number in ascending order. You can also use `DESCENDING` to reverse the order.

---

## Counting Records

Sometimes you just want to know how many records exist, not the actual data. Use `SELECT COUNT(*)`:

```abap
DATA lv_count TYPE i.

SELECT COUNT(*) FROM mara
  INTO lv_count
  WHERE mtart = 'FERT'.

WRITE: / 'Total finished products:', lv_count.
```

This is fast because the database only returns a number, not the actual rows.

---

## Checking If a Record Exists

A very common pattern is checking whether a record exists before doing something. You do not need to read all the fields — just check if `SY-SUBRC` is 0:

```abap
SELECT SINGLE matnr FROM mara
  INTO @DATA(lv_matnr)
  WHERE matnr = 'M-1001'.

IF sy-subrc = 0.
  WRITE: / 'Material exists'.
ELSE.
  WRITE: / 'Material does not exist'.
ENDIF.
```

Notice the `@DATA(lv_matnr)` syntax — this is called an inline declaration. It creates the variable right inside the SELECT statement. You do not need to declare it separately with a DATA statement. This is a newer ABAP syntax that works in SAP S/4HANA and recent ECC systems.

---

## Practical Example — Simple Material Report

Let us put everything together and build a real report:

```abap
REPORT z_material_report.

* Define the output structure
TYPES: BEGIN OF ty_material,
         matnr TYPE mara-matnr,
         mtart TYPE mara-mtart,
         mbrsh TYPE mara-mbrsh,
         meins TYPE mara-meins,
       END OF ty_material.

DATA: lt_materials TYPE TABLE OF ty_material,
      ls_material  TYPE ty_material,
      lv_count     TYPE i.

* Fetch data from database
SELECT matnr mtart mbrsh meins FROM mara
  INTO TABLE lt_materials
  UP TO 50 ROWS
  ORDER BY matnr.

IF sy-subrc <> 0.
  WRITE: / 'No materials found in the system.' COLOR 6.
  RETURN.
ENDIF.

* Get record count
DESCRIBE TABLE lt_materials LINES lv_count.

* Report Header
WRITE: / 'Material Master Report' COLOR 1.
WRITE: / 'Total Records:', lv_count.
ULINE.
WRITE: / 'Material No.', 20 'Type', 30 'Industry', 45 'Unit'.
ULINE.

* Display each record
LOOP AT lt_materials INTO ls_material.
  WRITE: / ls_material-matnr,
         20 ls_material-mtart,
         30 ls_material-mbrsh,
         45 ls_material-meins.
ENDLOOP.

ULINE.
WRITE: / 'End of Report' COLOR 5.
```

This program reads material data, formats it into columns, and displays it as a clean report with headers and separators. This is the kind of program you will write in your first few weeks of any SAP ABAP job.

---

## SELECT SINGLE vs SELECT — When to Use Which

| Feature | SELECT SINGLE | SELECT |
| :--- | :--- | :--- |
| **Records Returned** | Exactly one row | Multiple rows |
| **Result Goes Into** | A structure (work area) | An internal table |
| **Use When** | You know the exact primary key | You need a list of records |
| **Performance** | Very fast | Depends on data volume and WHERE clause |
| **Example** | Looking up one customer by ID | Fetching all orders for a date range |

---

## Performance Tips for Beginners

These are things your senior developer will tell you on day one of the job:

1. **Never use SELECT * in production code.** Always list the specific columns you need.
2. **Always use a WHERE clause.** A SELECT without WHERE reads the entire table — on large tables this can take minutes or even cause a timeout.
3. **Use UP TO n ROWS during development.** When testing, limit results so your program runs fast.
4. **Check SY-SUBRC after every SELECT.** Never assume the query found data.
5. **Avoid SELECT inside a LOOP.** If you are running a SELECT inside a LOOP AT statement, you are probably doing it wrong. Fetch all the data in one SELECT and then process it in the loop. This is one of the biggest performance mistakes beginners make.

---

## Common Mistakes to Watch Out For

### 1. Missing WHERE Clause on Large Tables
Reading millions of rows because you forgot to add a filter will make your program extremely slow and can even crash the system.

### 2. Using SELECT SINGLE Without the Full Primary Key
If you use SELECT SINGLE but do not provide all the primary key fields in the WHERE clause, the system returns a random matching record. This can give you inconsistent results.

### 3. Not Checking SY-SUBRC
If the SELECT finds nothing and you do not check SY-SUBRC, your program continues with empty data. This leads to wrong output or blank reports.

### 4. SELECT Inside a LOOP
This is the number one performance killer in ABAP. If you loop 1000 times and run a SELECT inside each loop iteration, that is 1000 database calls. Instead, fetch all data once before the loop.

* **Wrong approach:**
```abap
LOOP AT lt_orders INTO ls_order.
  SELECT SINGLE * FROM kna1 INTO ls_customer
    WHERE kunnr = ls_order-kunnr.
ENDLOOP.
```

* **Right approach:**
```abap
SELECT * FROM kna1 INTO TABLE lt_customers
  FOR ALL ENTRIES IN lt_orders
  WHERE kunnr = lt_orders-kunnr.
```

The second approach sends one query to the database instead of a thousand. It is dramatically faster.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What does SY-SUBRC = 4 mean after a SELECT statement?</summary>
<div class="details-content">
It means the SELECT query did not find any matching records in the database table. The internal table or structure will remain empty. You should always handle this case in your code — either by showing a message to the user or by stopping the program.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> Why should you avoid SELECT * in production programs?</summary>
<div class="details-content">
Because <code>SELECT *</code> reads every column from the table, even the ones your program does not need. This wastes memory, increases network traffic between the application server and database, and makes the program slower. Instead, list only the specific columns you actually use.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What is the problem with writing a SELECT inside a LOOP?</summary>
<div class="details-content">
Each iteration of the loop sends a separate database request. If the loop runs 500 times, that is 500 individual database calls. This is extremely slow and puts heavy load on the database server. The correct approach is to use <code>FOR ALL ENTRIES IN</code> or a JOIN to fetch all data in a single database call before the loop.
</div>
</details>

---

## Summary

The SELECT statement is the most important statement you will learn in ABAP. It connects your program to the database and lets you read the business data that SAP stores. Start with SELECT SINGLE for looking up individual records, then move to SELECT INTO TABLE for fetching lists. Always use a WHERE clause, always check SY-SUBRC, and never put a SELECT inside a loop. Follow these basics and you will write clean, fast ABAP programs from the very beginning of your career.
