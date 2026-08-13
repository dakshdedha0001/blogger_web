---
title: "SELECT-OPTIONS in ABAP: Complete Beginner Guide with Examples"
description: "Master SELECT-OPTIONS in SAP ABAP. Learn how to design flexible selection screens, process low/high range limits, include/exclude values, and implement database queries."
pubDate: "2026-06-13"
category: "ABAP Programming"
author: "Daksh"
readingTime: "7 min read"
image: "/abap-select-options-thumbnail.jpg"
order: 8
---

![SELECT-OPTIONS in ABAP](/abap-select-options-thumbnail.jpg)

When starting your SAP development journey, you typically begin with variables, `PARAMETERS` statements, and basic reporting. Once you feel comfortable with those fundamentals, the logical next step is learning how to process multiple inputs or ranges of values on a selection screen. This is where **SELECT-OPTIONS** becomes essential.

In a real-world business system, users rarely search for just a single item. A finance analyst might need records for three different company codes, a purchasing coordinator might want inventory details for multiple material ranges, or an HR administrator could require data for a specific group of employee IDs. Entering these values one by one or running the same program repeatedly is highly inefficient. 

ABAP provides `SELECT-OPTIONS` to resolve this challenge, letting developers create highly flexible selection fields directly inside their report programs.

---

## What is SELECT-OPTIONS?

`SELECT-OPTIONS` generates a selection screen field that allows users to input multiple distinct values, intervals, exclusions, and wildcards. 

Unlike the `PARAMETERS` statement, which restricts user input to a single value, `SELECT-OPTIONS` creates a complex input control that can store multiple search conditions.

This flexibility makes reports far more adaptable. Instead of requiring users to rerun a program multiple times for different input criteria, a single execution can process all conditions simultaneously.

---

## Why Is It Needed?

Consider a purchasing manager who needs material data for the following specific IDs:
* `1000`
* `2000`
* `3000`
* `4000`

If the program only used `PARAMETERS`, the manager would have to run the report four separate times. By implementing a range-based selection field, they can input all four numbers together and run it once. This significantly improves efficiency and delivers a cleaner user experience.

---

## Basic Syntax

To declare a selection option, use the following syntax:

```abap
SELECT-OPTIONS: s_matnr FOR mara-matnr.
```

Let's break down the components:
* **`SELECT-OPTIONS`**: The keyword declaring the input control.
* **`s_matnr`**: The name of the selection option variable (standard practice is to prefix with `s_`).
* **`FOR`**: The binding keyword connecting the input variable to a database table field.
* **`mara-matnr`**: The database table and field used to determine the data type and search help metadata.

> ℹ️ **Note:** To reference database fields like `mara-matnr` in your declaration, you must first declare the database table using the `TABLES` statement at the top of your program:
> ```abap
> TABLES mara.
> ```

---

## Simple Example

Here is a simple report demonstrating how to declare and execute a selection option program:

```abap
REPORT z_select_options_demo.

TABLES sscrfields. " System table for selection screen attributes

DATA: gv_num TYPE i.
SELECT-OPTIONS: s_num FOR gv_num.

START-OF-SELECTION.
  WRITE: / 'Program executed successfully.'.
```

When you execute this program, SAP GUI automatically generates a selection screen containing low and high value inputs, as well as a "Multiple Selection" button on the right to configure advanced filtering.

---

## Difference Between PARAMETERS and SELECT-OPTIONS

Understanding the differences between these two input controls is a common interview topic for junior developers.

| Feature | `PARAMETERS` | `SELECT-OPTIONS` |
|---|---|---|
| **Input Mode** | Accepts only one value | Accepts single values, ranges, exclusions, and lists |
| **Internal Type** | Standard flat variable | Automatically created internal table (Selection Table) |
| **SQL Operator** | Queried using `=` or `LIKE` | Queried using the `IN` operator |
| **Typical Use** | Toggle options, radio buttons, single keys | Primary filter criteria (Material, Date range) |

---

## Structure Behind SELECT-OPTIONS

When you declare a `SELECT-OPTIONS` field, ABAP automatically creates a special **Selection Table** with the same name. This selection table contains four key header fields:

```text
SIGN   |   OPTION   |   LOW   |   HIGH
```

Each row in the selection table represents a filter condition configured by the user.

### 1. SIGN
Determines whether the matching values should be included or excluded from the query results:
* **`I` (Include)**: Matches should be selected.
* **`E` (Exclude)**: Matches should be ignored.

### 2. OPTION
Defines the comparison operator for the check:
* **`EQ` (Equal)**: Matches the exact low value.
* **`BT` (Between)**: Matches any value in the interval from `LOW` to `HIGH`.
* **`GT` (Greater Than)**: Values greater than `LOW`.
* **`LT` (Less Than)**: Values less than `LOW`.
* **`NE` (Not Equal)**: Excludes the exact low value.
* **`CP` (Contains Pattern)**: Matches using wildcards (e.g. `10*`).

### 3. LOW
Stores the single value or the lower boundary of an interval.

### 4. HIGH
Stores the upper boundary of an interval (used when `OPTION` is `BT`).

---

## Common Input Scenarios

### Single Value Selection
The user enters a single value in the left-hand field:
* **Selection Table Row**: `SIGN = 'I'`, `OPTION = 'EQ'`, `LOW = '1001'`, `HIGH = INITIAL`.

### Range Selection
The user enters values in both the low and high fields (e.g., `1000` to `2000`):
* **Selection Table Row**: `SIGN = 'I'`, `OPTION = 'BT'`, `LOW = '1000'`, `HIGH = '2000'`.

### Excluding Values
The user opens the multiple selections window and adds an exclusion for ID `1005`:
* **Selection Table Row**: `SIGN = 'E'`, `OPTION = 'EQ'`, `LOW = '1005'`, `HIGH = INITIAL`.

---

## Practical Database Query Example

To filter database queries using selection options, use the **`IN`** operator in your `WHERE` clause:

```abap
REPORT z_select_database_demo.

TABLES mara.

SELECT-OPTIONS: s_matnr FOR mara-matnr.

START-OF-SELECTION.
  SELECT matnr, mtart, matkl
    FROM mara
    INTO TABLE @DATA(lt_materials)
    WHERE matnr IN @s_matnr.

  IF sy-subrc = 0.
    LOOP AT lt_materials ASSIGNING FIELD-SYMBOL(<fs_material>).
      WRITE: / 'Material:', <fs_material>-matnr, 
             'Type:', <fs_material>-mtart.
    ENDLOOP.
  ELSE.
    WRITE / 'No materials found matching criteria.'.
  ENDIF.
```

> ⚠️ **Common Mistake:** Beginners often use the `=` operator (e.g., `WHERE matnr = s_matnr`). This will cause a syntax error or runtime failure. You must always use the `IN` operator to evaluate a selection option table.

---

## Self-Assessment Checkpoint

<details>
<summary>💡 **What fields are automatically created in the internal structure of a SELECT-OPTIONS table?**</summary>

A selection option automatically generates an internal table with four fields:
1. **`SIGN`** (values `I` or `E` for Include/Exclude)
2. **`OPTION`** (operators like `EQ`, `BT`, `NE`, `CP`)
3. **`LOW`** (lower bound or single value)
4. **`HIGH`** (upper bound of an interval)
</details>

<details>
<summary>💡 **What database query operator must be used with SELECT-OPTIONS in the WHERE clause?**</summary>

You must use the **`IN`** operator (e.g., `WHERE field IN @s_field`). Using the `=` operator will fail because `s_field` is an internal table, not a single variable.
</details>

---

## Summary of Advantages

* **Flexible Filtering**: Handles combinations of ranges, patterns, and exclusions without manual code logic.
* **UX Standardization**: Leverages the native, familiar SAP GUI selection screen controls.
* **Automatic Validation**: Inherits standard domain values and search help definitions from the database fields.
* **Code Simplicity**: The database engine automatically parses the selection table fields when queried with `IN`.

Mastering the use of selection screens is a vital step toward developing production-ready reports, building custom ALV tables, and designing performant data queries.
