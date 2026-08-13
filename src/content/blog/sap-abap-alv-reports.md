---
title: "ALV Reports in ABAP – How to Display Data in Professional Grid Format"
description: "Learn how to create ALV reports in SAP ABAP using REUSE_ALV_GRID_DISPLAY. Build sortable, filterable, exportable data grids."
pubDate: "2026-07-24"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-alv-reports-thumbnail.png"
readingTime: "10 min read"
order: 48
keywords:
  - "sap abap"
  - "alv report"
  - "reuse alv grid display"
  - "abap alv grid"
  - "abap list viewer"
  - "alv field catalog"
  - "alv layout"
  - "abap report output"
  - "slis abap"
  - "professional abap report"
---

![ALV Reports in ABAP](/abap-alv-reports-thumbnail.png)

If you have been following the earlier tutorials, you know how to use the WRITE statement to display output on the screen. It works fine for simple outputs, but let us be honest — the output looks plain and basic. No column headers, no sorting, no filtering, and no option to export to Excel.

In real SAP projects, business users expect professional-looking reports. They want to see data in a clean grid with proper column headers, the ability to sort any column, filter specific rows, calculate totals, and download the data to Excel with one click. This is exactly what ALV reports provide.

ALV stands for **ABAP List Viewer**. It is a standard SAP framework that gives you a fully featured data grid out of the box. You just pass your internal table to the ALV function module, and it handles all the display, sorting, filtering, and export functionality automatically.

In this tutorial, we will learn how to create ALV reports step by step, starting from the simplest version and building up to customized layouts.

---

## What is ALV?

ALV (ABAP List Viewer) is a set of standard function modules provided by SAP that display data in a professional grid format. When you use ALV, your output automatically gets:

- **Column headers** with proper labels
- **Sort** functionality on any column (click the column header)
- **Filter** functionality to show only specific rows
- **Subtotals** and total calculations
- **Export to Excel** with one click
- **Print** support
- **Column reordering** by dragging and dropping
- **Search** within the displayed data

All of this comes for free — you do not need to code any of it. You just pass your data and ALV handles the rest.

---

## Types of ALV Display

SAP provides two main ways to display ALV:

### 1. ALV Grid Display (Most Common)
Uses the function module `REUSE_ALV_GRID_DISPLAY`. This is the most commonly used ALV type. It displays data in a modern grid format with full sorting, filtering, and export capabilities.

### 2. ALV List Display
Uses the function module `REUSE_ALV_LIST_DISPLAY`. This displays data in a classic list format (like a printed report). It has fewer interactive features compared to the grid display.

For this tutorial, we will focus on the Grid Display because that is what you will use 90 percent of the time.

---

## Your First ALV Report — Simplest Version

Let us start with the absolute simplest way to display an ALV report:

```abap
REPORT z_alv_simple.

TYPE-POOLS: slis.  " Required for ALV types

TYPES: BEGIN OF ty_employee,
         empid  TYPE i,
         name   TYPE c LENGTH 30,
         dept   TYPE c LENGTH 20,
         salary TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.

* Add sample data
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Development'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Finance'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 104. ls_employee-name = 'Neha'. ls_employee-dept = 'Development'. ls_employee-salary = '60000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 105. ls_employee-name = 'Amit'. ls_employee-dept = 'HR'. ls_employee-salary = '45000.00'.
APPEND ls_employee TO lt_employees.

* Display using ALV Grid
CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
  EXPORTING
    i_structure_name = 'TY_EMPLOYEE'
  TABLES
    t_outtab         = lt_employees
  EXCEPTIONS
    program_error    = 1
    OTHERS           = 2.
```

That is it. Just call the function module, pass your internal table, and ALV takes care of everything else. The output will be a professional grid with columns for EMPID, NAME, DEPT, and SALARY. Users can immediately sort, filter, and export the data.

---

## Understanding the Field Catalog

The Field Catalog is the heart of ALV customization. It is an internal table that tells ALV everything about each column — the column name, header text, width, alignment, visibility, and more.

If you do not provide a Field Catalog, ALV generates one automatically based on your structure definition. But in real projects, you almost always build a custom Field Catalog to control column headers and formatting.

### Building a Custom Field Catalog

```abap
REPORT z_alv_fieldcat.

TYPE-POOLS: slis.

TYPES: BEGIN OF ty_employee,
         empid  TYPE i,
         name   TYPE c LENGTH 30,
         dept   TYPE c LENGTH 20,
         salary TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee,
      lt_fieldcat  TYPE slis_t_fieldcat_alv,
      ls_fieldcat  TYPE slis_fieldcat_alv.

* Add sample data
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Development'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Finance'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

* Build Field Catalog
CLEAR ls_fieldcat.
ls_fieldcat-fieldname = 'EMPID'.
ls_fieldcat-seltext_m = 'Employee ID'.
ls_fieldcat-col_pos   = 1.
ls_fieldcat-outputlen = 12.
APPEND ls_fieldcat TO lt_fieldcat.

CLEAR ls_fieldcat.
ls_fieldcat-fieldname = 'NAME'.
ls_fieldcat-seltext_m = 'Employee Name'.
ls_fieldcat-col_pos   = 2.
ls_fieldcat-outputlen = 25.
APPEND ls_fieldcat TO lt_fieldcat.

CLEAR ls_fieldcat.
ls_fieldcat-fieldname = 'DEPT'.
ls_fieldcat-seltext_m = 'Department'.
ls_fieldcat-col_pos   = 3.
ls_fieldcat-outputlen = 20.
APPEND ls_fieldcat TO lt_fieldcat.

CLEAR ls_fieldcat.
ls_fieldcat-fieldname = 'SALARY'.
ls_fieldcat-seltext_m = 'Monthly Salary'.
ls_fieldcat-col_pos   = 4.
ls_fieldcat-outputlen = 15.
ls_fieldcat-do_sum    = 'X'.  " Enable automatic total for this column
APPEND ls_fieldcat TO lt_fieldcat.

* Display ALV with custom Field Catalog
CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
  EXPORTING
    it_fieldcat   = lt_fieldcat
  TABLES
    t_outtab      = lt_employees
  EXCEPTIONS
    program_error = 1
    OTHERS        = 2.
```

Now the columns will show "Employee ID", "Employee Name", "Department", and "Monthly Salary" as headers instead of the technical field names. The salary column will also show a total at the bottom.

### Key Field Catalog Properties

| Property | Purpose | Example |
| :--- | :--- | :--- |
| **fieldname** | Technical field name (must match structure) | `'EMPID'` |
| **seltext_m** | Column header text (medium length) | `'Employee Name'` |
| **col_pos** | Column position (left to right) | `1, 2, 3...` |
| **outputlen** | Column width in characters | `15` |
| **do_sum** | Show total for numeric columns | `'X'` |
| **no_out** | Hide the column | `'X'` |
| **hotspot** | Make the column clickable (like a link) | `'X'` |
| **emphasize** | Highlight the column with a color | `'C110'` |

---

## Adding a Layout — Title and Zebra Stripes

The Layout structure lets you control the overall appearance of the ALV grid:

```abap
REPORT z_alv_layout.

TYPE-POOLS: slis.

TYPES: BEGIN OF ty_employee,
         empid  TYPE i,
         name   TYPE c LENGTH 30,
         dept   TYPE c LENGTH 20,
         salary TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee,
      ls_layout    TYPE slis_layout_alv.

* Add data
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Dev'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Finance'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

* Set up Layout
ls_layout-zebra             = 'X'.    " Alternating row colors (easier to read)
ls_layout-colwidth_optimize = 'X'.    " Auto-adjust column widths
ls_layout-window_titlebar   = 'Employee Salary Report'.  " Title bar text

* Display
CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
  EXPORTING
    i_structure_name = 'TY_EMPLOYEE'
    is_layout        = ls_layout
  TABLES
    t_outtab         = lt_employees
  EXCEPTIONS
    program_error    = 1
    OTHERS           = 2.
```

The zebra stripes make the rows alternate between white and light gray, which makes large datasets much easier to read. The column widths automatically adjust to fit the content.

---

## ALV with Selection Screen — Real-World Example

In real projects, users first enter selection criteria on a selection screen, then the program fetches data from the database and displays it in an ALV grid. Here is a complete example:

```abap
REPORT z_alv_real_world.

TYPE-POOLS: slis.

* Structure definition
TYPES: BEGIN OF ty_material,
         matnr TYPE c LENGTH 18,
         maktx TYPE c LENGTH 40,
         mtart TYPE c LENGTH 4,
         meins TYPE c LENGTH 3,
         ersda TYPE d,
       END OF ty_material.

* Data declarations
DATA: lt_materials TYPE TABLE OF ty_material,
      ls_material  TYPE ty_material,
      lt_fieldcat  TYPE slis_t_fieldcat_alv,
      ls_fieldcat  TYPE slis_fieldcat_alv,
      ls_layout    TYPE slis_layout_alv.

* Selection Screen
SELECTION-SCREEN BEGIN OF BLOCK b1 WITH FRAME TITLE TEXT-001.
  SELECT-OPTIONS: s_matnr FOR ls_material-matnr,
                  s_mtart FOR ls_material-mtart.
SELECTION-SCREEN END OF BLOCK b1.

* Main Processing
START-OF-SELECTION.

  " In a real system, you would fetch from database:
  " SELECT matnr maktx mtart meins ersda
  "   FROM mara
  "   INTO TABLE lt_materials
  "   WHERE matnr IN s_matnr
  "     AND mtart IN s_mtart.

  " For demo, we use sample data
  ls_material-matnr = 'MAT-001'. ls_material-maktx = 'Steel Plate 10mm'. ls_material-mtart = 'ROH'. ls_material-meins = 'KG'. ls_material-ersda = '20260115'.
  APPEND ls_material TO lt_materials.
  ls_material-matnr = 'MAT-002'. ls_material-maktx = 'Copper Wire 2mm'. ls_material-mtart = 'ROH'. ls_material-meins = 'M'. ls_material-ersda = '20260220'.
  APPEND ls_material TO lt_materials.
  ls_material-matnr = 'FIN-001'. ls_material-maktx = 'Circuit Board Assembly'. ls_material-mtart = 'FERT'. ls_material-meins = 'EA'. ls_material-ersda = '20260305'.
  APPEND ls_material TO lt_materials.
  ls_material-matnr = 'FIN-002'. ls_material-maktx = 'Power Supply Unit'. ls_material-mtart = 'FERT'. ls_material-meins = 'EA'. ls_material-ersda = '20260410'.
  APPEND ls_material TO lt_materials.

  IF lt_materials IS INITIAL.
    MESSAGE 'No materials found for given selection criteria.' TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  " Build Field Catalog
  CLEAR ls_fieldcat.
  ls_fieldcat-fieldname = 'MATNR'. ls_fieldcat-seltext_m = 'Material Number'. ls_fieldcat-col_pos = 1.
  APPEND ls_fieldcat TO lt_fieldcat.

  CLEAR ls_fieldcat.
  ls_fieldcat-fieldname = 'MAKTX'. ls_fieldcat-seltext_m = 'Description'. ls_fieldcat-col_pos = 2. ls_fieldcat-outputlen = 35.
  APPEND ls_fieldcat TO lt_fieldcat.

  CLEAR ls_fieldcat.
  ls_fieldcat-fieldname = 'MTART'. ls_fieldcat-seltext_m = 'Material Type'. ls_fieldcat-col_pos = 3.
  APPEND ls_fieldcat TO lt_fieldcat.

  CLEAR ls_fieldcat.
  ls_fieldcat-fieldname = 'MEINS'. ls_fieldcat-seltext_m = 'Unit'. ls_fieldcat-col_pos = 4.
  APPEND ls_fieldcat TO lt_fieldcat.

  CLEAR ls_fieldcat.
  ls_fieldcat-fieldname = 'ERSDA'. ls_fieldcat-seltext_m = 'Created On'. ls_fieldcat-col_pos = 5.
  APPEND ls_fieldcat TO lt_fieldcat.

  " Set Layout
  ls_layout-zebra             = 'X'.
  ls_layout-colwidth_optimize = 'X'.
  ls_layout-window_titlebar   = 'Material Master Report'.

  " Display ALV
  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
    EXPORTING
      it_fieldcat   = lt_fieldcat
      is_layout     = ls_layout
    TABLES
      t_outtab      = lt_materials
    EXCEPTIONS
      program_error = 1
      OTHERS        = 2.
```

This is the standard pattern you will follow in almost every real SAP report:
1. Define the selection screen for user input
2. Fetch data from the database
3. Build the field catalog
4. Set the layout
5. Call the ALV function module

---

## Sorting ALV Output Programmatically

You can pre-sort the ALV data before displaying it:

```abap
DATA: lt_sort TYPE slis_t_sortinfo_alv,
      ls_sort TYPE slis_sortinfo_alv.

ls_sort-fieldname = 'DEPT'.
ls_sort-up        = 'X'.     " Sort ascending
ls_sort-subtot    = 'X'.     " Show subtotals when department changes
APPEND ls_sort TO lt_sort.

CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
  EXPORTING
    it_fieldcat   = lt_fieldcat
    is_layout     = ls_layout
    it_sort       = lt_sort
  TABLES
    t_outtab      = lt_employees
  EXCEPTIONS
    program_error = 1
    OTHERS        = 2.
```

This sorts the output by department and shows subtotals whenever the department changes. Very useful for financial and management reports.

---

## REUSE_ALV_GRID_DISPLAY — Important Parameters

| Parameter | Purpose |
| :--- | :--- |
| **i_structure_name** | Auto-generate field catalog from this structure |
| **it_fieldcat** | Custom field catalog (overrides i_structure_name) |
| **is_layout** | Layout settings (zebra, title, column optimization) |
| **it_sort** | Pre-sort configuration |
| **i_callback_program** | Program name for event callbacks |
| **i_callback_top_of_page** | Subroutine name for page header |
| **i_callback_user_command** | Subroutine name for handling user actions |
| **t_outtab** | The internal table containing data to display |

---

## Common Mistakes to Avoid

### 1. Forgetting TYPE-POOLS: slis
The ALV types are defined in the SLIS type pool. If you forget to include it, you will get syntax errors when declaring ALV-related variables.

### 2. Field Name Mismatch in Field Catalog
The `fieldname` in your field catalog must exactly match the field name in your internal table structure. Even a single character difference will cause that column to show blank.

### 3. Not Clearing the Work Area Before Building Field Catalog
If you forget `CLEAR ls_fieldcat` before filling each entry, values from the previous field will leak into the next one and cause unexpected column behavior.

### 4. Using Wrong Data Types for ALV
ALV works best with fixed-length character types (TYPE C) and packed numbers (TYPE P). Using TYPE STRING for ALV columns sometimes causes formatting issues. Stick to TYPE C LENGTH for text fields.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What is the purpose of the Field Catalog in ALV?</summary>
<div class="details-content">
The Field Catalog is an internal table that defines the properties of each column in the ALV grid. It controls the column header text, position, width, visibility, whether totals should be calculated, color highlighting, and more. Without a field catalog, ALV auto-generates one from the structure definition, but the column headers will show technical field names instead of user-friendly labels.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> What does the zebra property in the ALV layout do?</summary>
<div class="details-content">
Setting zebra = 'X' in the layout structure makes the ALV grid display alternating row colors (white and light gray). This visual pattern makes it much easier for users to read large datasets because their eyes can follow a single row across the grid without accidentally jumping to the row above or below. It is a standard best practice that most developers enable in every ALV report.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What is the difference between REUSE_ALV_GRID_DISPLAY and REUSE_ALV_LIST_DISPLAY?</summary>
<div class="details-content">
REUSE_ALV_GRID_DISPLAY shows data in an interactive grid format where users can sort, filter, resize columns, and export to Excel interactively. REUSE_ALV_LIST_DISPLAY shows data in a classic list format that looks more like a printed report with less interactivity. Grid display is preferred for most use cases because of its superior user experience.
</div>
</details>

---

## Summary

ALV reports are the standard way to display data in SAP ABAP. Every professional report you build will use ALV instead of plain WRITE statements. The key components to remember are the field catalog (controls columns), the layout (controls appearance), and the REUSE_ALV_GRID_DISPLAY function module (does the actual display).

Start with the simplest version, get comfortable with it, then gradually add field catalog customizations, layouts, sorting, and event handling. Once you master ALV, you will be able to build the kind of professional reports that business users actually want to use.
