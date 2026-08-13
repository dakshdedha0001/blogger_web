---
title: "Internal Tables in ABAP – Complete Beginner Guide with Examples"
description: "Learn what internal tables are in SAP ABAP, how to declare them, add rows, loop through data, and use them in real programs with examples."
pubDate: "2026-07-23"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-internal-tables-thumbnail.png"
readingTime: "10 min read"
order: 43
keywords:
  - "sap abap"
  - "internal tables"
  - "abap internal table"
  - "standard table"
  - "sorted table"
  - "hashed table"
  - "append abap"
  - "loop at abap"
  - "abap itab"
  - "work area abap"
---

![Internal Tables in ABAP](/abap-internal-tables-thumbnail.png)

If you have been following the tutorials on this site, you have learned how to declare single variables, assign values, and display output. But here is the reality — in actual SAP projects, you almost never work with just one piece of data at a time. You are dealing with hundreds or thousands of records. Employee lists, sales orders, material masters, vendor invoices — all of these come as collections of records, not single values.

That is where internal tables come in. An internal table is basically an array or a list that lives in your program's memory. It can hold multiple rows of data, just like a spreadsheet or a database table. The difference is that a database table is stored permanently on disk, while an internal table exists only while your program is running. Once the program finishes, the internal table is gone.

Understanding internal tables is probably the most important skill in ABAP programming. I am not exaggerating. Almost every report, every interface, every data migration, every BAPI — they all use internal tables. If you do not understand them well, you will struggle with everything else.

So let us go through this properly. We will start from the very basics and build up to real practical examples.

---

## What Exactly is an Internal Table?

Think of an internal table as a temporary container that holds multiple rows of data in your program's memory.

Imagine you run a SELECT query on the database to fetch all employees in department HR. The database might return 500 rows. Where do those 500 rows go? They go into an internal table. Now your program can loop through those 500 rows, process each one, calculate totals, filter specific records, or display them on the screen.

The key points are:
- Internal tables exist only in memory (RAM), not on disk
- They are created when you declare them in your program
- They are destroyed automatically when the program ends
- They can hold zero rows, one row, or millions of rows
- Each row follows a fixed structure (like columns in a spreadsheet)

---

## Components You Need to Understand

Before writing any code, you need to know three things that always go together when working with internal tables:

### 1. Structure Type (Line Type)
This defines what each row of the table looks like. What fields does each row have? What are their data types? This is like defining the columns of a spreadsheet.

### 2. Internal Table
This is the actual table variable that holds multiple rows. It is declared using `TYPE TABLE OF`.

### 3. Work Area (Header Line)
This is a single-row variable that has the same structure as one row of the internal table. You use the work area to build a row before adding it to the table, or to hold a single row when reading from the table.

---

## Declaring an Internal Table — Step by Step

### Step 1: Define the Structure

```abap
TYPES: BEGIN OF ty_employee,
         empid   TYPE i,
         name    TYPE string,
         dept    TYPE string,
         salary  TYPE p DECIMALS 2,
       END OF ty_employee.
```

This creates a custom type called `ty_employee` with four fields.

### Step 2: Declare the Internal Table and Work Area

```abap
DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.
```

- `lt_employees` is the internal table (notice the `lt_` prefix — it stands for "local table")
- `ls_employee` is the work area (notice the `ls_` prefix — it stands for "local structure")

---

## Adding Rows to an Internal Table

### Using APPEND

The simplest way to add a row is to fill the work area and then append it to the table:

```abap
REPORT z_itab_append.

TYPES: BEGIN OF ty_employee,
         empid   TYPE i,
         name    TYPE string,
         dept    TYPE string,
         salary  TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.

* Fill the work area with first employee data
ls_employee-empid  = 101.
ls_employee-name   = 'Daksh'.
ls_employee-dept   = 'Development'.
ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.

* Fill the work area with second employee data
ls_employee-empid  = 102.
ls_employee-name   = 'Priya'.
ls_employee-dept   = 'HR'.
ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.

* Fill the work area with third employee data
ls_employee-empid  = 103.
ls_employee-name   = 'Rahul'.
ls_employee-dept   = 'Finance'.
ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

* Display the count of rows
DATA lv_count TYPE i.
lv_count = lines( lt_employees ).
WRITE: 'Total employees:', lv_count.
```

### Output:
```text
Total employees: 3
```

Each time you call `APPEND`, a new row is added at the bottom of the internal table. The `lines()` function returns the total number of rows currently in the table.

---

## Reading Data from an Internal Table

### Using LOOP AT

The most common way to read all rows from an internal table is to use `LOOP AT`. This goes through each row one by one:

```abap
REPORT z_itab_loop.

TYPES: BEGIN OF ty_employee,
         empid   TYPE i,
         name    TYPE string,
         dept    TYPE string,
         salary  TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.

* Add some data
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Dev'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Finance'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

* Loop through and display each row
LOOP AT lt_employees INTO ls_employee.
  WRITE: / ls_employee-empid, ls_employee-name, ls_employee-dept, ls_employee-salary.
ENDLOOP.
```

### Output:
```text
101 Daksh Dev 55000.00
102 Priya HR 48000.00
103 Rahul Finance 52000.00
```

Inside the LOOP, the current row is copied into the work area `ls_employee`. You can then access individual fields using the `-` operator (like `ls_employee-name`).

### Using LOOP AT with WHERE

You can filter rows while looping. For example, if you only want employees from the HR department:

```abap
LOOP AT lt_employees INTO ls_employee WHERE dept = 'HR'.
  WRITE: / ls_employee-empid, ls_employee-name, ls_employee-salary.
ENDLOOP.
```

### Output:
```text
102 Priya 48000.00
```

This is much more efficient than looping through all rows and checking each one with an IF statement.

---

## Types of Internal Tables

ABAP provides three types of internal tables, each with different performance characteristics:

### 1. Standard Table
- Default table type. Rows are not sorted.
- You access rows by index (row number) or by looping.
- Best for small to medium datasets where you mostly append and loop.

```abap
DATA lt_data TYPE TABLE OF ty_employee.
```

### 2. Sorted Table
- Rows are automatically kept in sorted order based on a key field.
- Faster searches than standard tables because ABAP can use binary search internally.
- Best when you frequently search by a specific field.

```abap
DATA lt_sorted TYPE SORTED TABLE OF ty_employee WITH UNIQUE KEY empid.
```

### 3. Hashed Table
- Uses a hash algorithm for lookups. Extremely fast for key-based access.
- No specific row order. Cannot access by index.
- Best for very large datasets where you always search by key.

```abap
DATA lt_hashed TYPE HASHED TABLE OF ty_employee WITH UNIQUE KEY empid.
```

### When to Use Which?

| Table Type | Best For | Access Speed | Duplicate Keys |
| :--- | :--- | :--- | :--- |
| **Standard** | Small datasets, sequential processing | Slow for search, fast for append | Allowed |
| **Sorted** | Medium datasets, frequent key searches | Fast (binary search) | Configurable |
| **Hashed** | Large datasets, key-based lookups | Fastest (constant time) | Not allowed |

For beginners, just use Standard Tables for everything. As your data volumes grow and performance becomes important, you can switch to Sorted or Hashed tables.

---

## CLEAR, REFRESH, and FREE — Cleaning Up Internal Tables

These three statements are used to remove data from internal tables, but they work differently:

### CLEAR
Clears the content of a work area or resets a single variable. For internal tables, CLEAR removes all rows but keeps the memory allocated.

```abap
CLEAR ls_employee.     " Clears the work area
CLEAR lt_employees.    " Removes all rows from the internal table
```

### REFRESH
Specifically designed for internal tables. Removes all rows but keeps memory allocated for reuse.

```abap
REFRESH lt_employees.
```

### FREE
Removes all rows AND releases the memory back to the system. Use this when you are completely done with the internal table.

```abap
FREE lt_employees.
```

### Which One Should You Use?

- Use `CLEAR` on work areas before filling them with new data (prevents leftover data from previous iterations)
- Use `FREE` on internal tables when you are done processing and want to save memory
- `REFRESH` and `CLEAR` on internal tables are practically the same in modern ABAP

---

## Practical Example: Employee Salary Report

Here is a complete, realistic example that puts everything together:

```abap
REPORT z_salary_report.

* Step 1: Define the structure
TYPES: BEGIN OF ty_employee,
         empid   TYPE i,
         name    TYPE string,
         dept    TYPE string,
         salary  TYPE p DECIMALS 2,
       END OF ty_employee.

* Step 2: Declare internal table and work area
DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee,
      lv_total     TYPE p DECIMALS 2,
      lv_count     TYPE i,
      lv_average   TYPE p DECIMALS 2.

* Step 3: Add employee records
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Dev'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Finance'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 104. ls_employee-name = 'Neha'. ls_employee-dept = 'Dev'. ls_employee-salary = '60000.00'.
APPEND ls_employee TO lt_employees.

ls_employee-empid = 105. ls_employee-name = 'Amit'. ls_employee-dept = 'HR'. ls_employee-salary = '45000.00'.
APPEND ls_employee TO lt_employees.

* Step 4: Display header
WRITE: 'ID', 10 'Name', 30 'Department', 50 'Salary'.
ULINE.

* Step 5: Loop through and display each employee
LOOP AT lt_employees INTO ls_employee.
  WRITE: / ls_employee-empid, 10 ls_employee-name, 30 ls_employee-dept, 50 ls_employee-salary.
  lv_total = lv_total + ls_employee-salary.
ENDLOOP.

* Step 6: Calculate and display summary
lv_count = lines( lt_employees ).
lv_average = lv_total / lv_count.

ULINE.
WRITE: / 'Total Employees:', lv_count.
WRITE: / 'Total Salary:', lv_total.
WRITE: / 'Average Salary:', lv_average.
```

### Output:
```text
ID       Name                Department          Salary
---------------------------------------------------------------
101      Daksh               Dev                 55000.00
102      Priya               HR                  48000.00
103      Rahul               Finance             52000.00
104      Neha                Dev                 60000.00
105      Amit                HR                  45000.00
---------------------------------------------------------------
Total Employees: 5
Total Salary: 260000.00
Average Salary: 52000.00
```

This is exactly the kind of program you would write in real SAP projects. The data usually comes from a database SELECT instead of manual APPEND, but the structure and logic is the same.

---

## Common Mistakes to Avoid

### 1. Forgetting to CLEAR the Work Area Before Reusing It
If you do not clear the work area before filling it with new data, old field values from the previous iteration might leak into the new row. Always clear your work area inside loops or between append operations.

### 2. Using READ TABLE Without Checking sy-subrc
When you read a single row from an internal table, always check `sy-subrc`. If the row is not found, `sy-subrc` will be 4 and the work area will contain garbage data.

### 3. Modifying the Internal Table Inside a LOOP
If you need to delete or insert rows while looping, be very careful. Modifying the table you are looping through can cause unexpected behavior or even infinite loops. It is safer to collect changes and apply them after the loop.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What is the difference between an internal table and a database table?</summary>
<div class="details-content">
A database table is stored permanently on the SAP server's hard disk and survives program restarts. An internal table exists only in the program's memory (RAM) while the program is running. Once the program ends, the internal table and all its data are automatically destroyed. Internal tables are used as temporary working containers to process data that was read from database tables.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> When should you use a Hashed table instead of a Standard table?</summary>
<div class="details-content">
Use a Hashed table when you have a very large number of records (thousands or more) and you need to search for specific records by their key field very frequently. Hashed tables provide constant-time key lookups regardless of table size, making them much faster than Standard tables for key-based searches. However, hashed tables do not support duplicate keys and you cannot access rows by index position.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What is the purpose of the work area (ls_ variable) when working with internal tables?</summary>
<div class="details-content">
The work area is a single-row variable that acts as a buffer between your code and the internal table. When adding data, you first fill the work area fields and then APPEND it to the table. When reading data in a LOOP, each row is copied into the work area so you can access individual fields. Think of it as a clipboard — you write data on the clipboard first, then paste it into the table.
</div>
</details>

---

## Summary

Internal tables are the backbone of ABAP programming. Every real SAP program uses them to store, process, and manipulate collections of data. You declare them using `TYPE TABLE OF`, fill them using `APPEND`, read them using `LOOP AT`, and clean them up using `CLEAR` or `FREE`.

Start with Standard tables for everything. As you gain experience and start working with large datasets, explore Sorted and Hashed tables for better performance. The most important habit to develop is always clearing your work area before reusing it and always checking `sy-subrc` after READ operations.

Once you are comfortable creating and manipulating internal tables, you are ready to move on to MODIFY, DELETE, and INSERT operations — which we will cover in the next tutorial.
