---
title: "Events in ABAP Reports – INITIALIZATION, START-OF-SELECTION Explained"
description: "Learn how ABAP report events work. Understand INITIALIZATION, AT SELECTION-SCREEN, START-OF-SELECTION, and END-OF-SELECTION with examples."
pubDate: "2026-07-24"
lastModified: "2026-08-04"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-events-thumbnail.png"
readingTime: "11 min read"
order: 49
keywords:
  - "sap abap"
  - "abap events"
  - "initialization abap"
  - "start of selection"
  - "end of selection"
  - "at selection screen"
  - "abap report events"
  - "abap event flow"
  - "selection screen validation"
  - "abap program flow"
---

![Events in ABAP Reports](/abap-events-thumbnail.png)

When you write a simple ABAP report, the code runs sequentially. That works fine for basic programs. But as your reports become more complex and involve selection screens, database fetching, input validation, dynamic screen modifications, and interactive output lists, you need a structured model to control when each block of code executes.

That is what **ABAP Report Events** are designed for. Events divide executable programs (`TYPE 1` reports) into logical processing blocks. SAP's ABAP C-kernel runtime environment triggers each block at specific points in the program's lifecycle.

For example, you set default dates before the selection screen loads, validate user input before triggering database queries, fetch records only after input validation succeeds, and calculate summary totals before displaying results. Understanding this event-driven architecture is essential for writing production-ready ABAP applications.

---

## The Complete Executable Report Lifecycle

Here is the exact sequential execution order of event blocks in an ABAP executable program:

```
+-----------------------------------------------------------+
| 1. INITIALIZATION                                         |
|    - Fires once before selection screen displays.          |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| 2. AT SELECTION-SCREEN OUTPUT                             |
|    - PBO (Process Before Output) of selection screen.     |
|    - Dynamically hide/disable fields using LOOP AT SCREEN. |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| [ Selection Screen Displayed to User ]                    |
+-----------------------------+-----------------------------+
                              | User clicks Execute (F8)
                              v
+-----------------------------------------------------------+
| 3. AT SELECTION-SCREEN / ON <field>                       |
|    - PAI (Process After Input) of selection screen.       |
|    - Validate input; raise MESSAGE '...' TYPE 'E' if bad.|
+-----------------------------+-----------------------------+
                              | Input Valid
                              v
+-----------------------------------------------------------+
| 4. START-OF-SELECTION                                     |
|    - Main data retrieval (SELECT queries) & processing.   |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| 5. END-OF-SELECTION                                       |
|    - Final summary calculations, formatting, ALV display. |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| 6. Interactive List Events (Optional)                      |
|    - TOP-OF-PAGE, END-OF-PAGE                             |
|    - AT LINE-SELECTION, AT USER-COMMAND                   |
+-----------------------------------------------------------+
```

---

## INITIALIZATION — Pre-Screen Default Configuration

The `INITIALIZATION` event fires exactly once per report execution, immediately before the selection screen is constructed and displayed to the user.

```abap
REPORT z_event_init_demo.

TABLES: vbak.

DATA: gv_default_title TYPE string.

PARAMETERS:     p_vkorg TYPE vkorg,
                p_datum TYPE dats.
SELECT-OPTIONS: s_vbeln FOR vbak-vbeln.

INITIALIZATION.
  " Pre-populate selection parameters
  p_datum = sy-datum.
  p_vkorg = '1000'.

  " Pre-populate Range / Select-Option default values
  s_vbeln-sign   = 'I'.
  s_vbeln-option = 'BT'.
  s_vbeln-low    = '0000001000'.
  s_vbeln-high   = '0000002000'.
  APPEND s_vbeln TO s_vbeln.

  gv_default_title = 'Sales Order Analysis Report'.
```

### Key Use Cases for INITIALIZATION:
- Pre-calculating dynamic date ranges (e.g., first day of current month to today).
- Fetching user parameters from SAP SPA/GPA memory (`GET PARAMETER ID`).
- Setting initial radio button selections or default checkboxes.

---

## AT SELECTION-SCREEN OUTPUT — Dynamic Screen Manipulation (PBO)

The `AT SELECTION-SCREEN OUTPUT` event is the **Process Before Output (PBO)** module of the selection screen. It executes every time the selection screen is about to be rendered or refreshed.

Developers use this event combined with `LOOP AT SCREEN` to dynamically hide, disable, or modify selection fields based on user input.

```abap
REPORT z_dynamic_screen_demo.

PARAMETERS: p_chk  AS CHECKBOX USER-COMMAND flag,
            p_text TYPE char30 MODIF ID mod.

AT SELECTION-SCREEN OUTPUT.
  " Loop through screen elements and toggle visibility
  LOOP AT SCREEN.
    IF screen-group1 = 'MOD'.
      IF p_chk = abap_true.
        screen-input     = 1. " Enable input
        screen-invisible = 0. " Make visible
      ELSE.
        screen-input     = 0. " Disable input
        screen-invisible = 1. " Hide field
      ENDIF.
      MODIFY SCREEN.
    ENDIF.
  ENDLOOP.
```

---

## AT SELECTION-SCREEN — Input Validation & Error Handling (PAI)

The `AT SELECTION-SCREEN` event acts as the **Process After Input (PAI)** gateway. It fires when the user clicks **Execute** (`F8`) or triggers a command on the selection screen.

If input validation fails inside this event and a message of type `'E'` (Error) is raised, execution halts immediately. The user remains on the selection screen with the invalid field highlighted.

### Variations of AT SELECTION-SCREEN:

| Event Syntax | Purpose / Behavior |
| :--- | :--- |
| **`AT SELECTION-SCREEN.`** | General validation block for all screen fields. |
| **`AT SELECTION-SCREEN ON <field>`** | Validates a single specific field. If error occurs, SAP locks only that field for user correction. |
| **`AT SELECTION-SCREEN ON BLOCK <blk>`** | Validates a group of fields defined inside `SELECTION-SCREEN BEGIN OF BLOCK`. |
| **`AT SELECTION-SCREEN ON VALUE-REQUEST FOR <field>`** | Triggers custom `F4` search help routine for a field. |
| **`AT SELECTION-SCREEN ON HELP-REQUEST FOR <field>`** | Triggers custom `F1` documentation popup for a field. |

```abap
REPORT z_validation_demo.

TABLES: kna1.

PARAMETERS:     p_kunnr TYPE kna1-kunnr.
SELECT-OPTIONS: s_bukrs FOR kna1-bukrs.

" Field-level validation for Customer Number
AT SELECTION-SCREEN ON p_kunnr.
  IF p_kunnr IS NOT INITIAL.
    SELECT SINGLE kunnr FROM kna1 INTO @DATA(lv_kunnr) WHERE kunnr = @p_kunnr.
    IF sy-subrc <> 0.
      MESSAGE 'Customer Number does not exist in master table KNA1!' TYPE 'E'.
    ENDIF.
  ENDIF.

" General validation block
AT SELECTION-SCREEN.
  IF s_bukrs IS INITIAL AND p_kunnr IS INITIAL.
    MESSAGE 'Please specify either a Customer Number or Company Code range!' TYPE 'E'.
  ENDIF.
```

---

## START-OF-SELECTION — Main Business Logic & Database Queries

`START-OF-SELECTION` is the primary processing event of an ABAP report. It executes after selection screen inputs have passed validation.

All Open SQL queries (`SELECT`), business calculations, internal table data transformations, and algorithm loops should reside under `START-OF-SELECTION`.

```abap
REPORT z_main_processing_demo.

TABLES: vbak.

TYPES: BEGIN OF ty_sales,
         vbeln TYPE vbeln_va,
         erdat TYPE erdat,
         netwr TYPE netwr_ak,
         vkorg TYPE vkorg,
       END OF ty_sales.

DATA: gt_sales TYPE TABLE OF ty_sales.

SELECT-OPTIONS: s_erdat FOR vbak-erdat OBLIGATORY.
PARAMETERS:     p_vkorg TYPE vbak-vkorg DEFAULT '1000'.

START-OF-SELECTION.
  WRITE: / 'Executing Database Query for Sales Orders...'.

  " Primary Database Query
  SELECT vbeln, erdat, netwr, vkorg
    FROM vbak
    INTO TABLE @gt_sales
    WHERE erdat IN @s_erdat
      AND vkorg  = @p_vkorg.

  IF sy-subrc <> 0.
    WRITE: / 'No matching sales order records found!'.
    STOP. " Aborts remaining event blocks and shows output list
  ENDIF.
```

---

## END-OF-SELECTION — Output Formatting & Summary Aggregation

The `END-OF-SELECTION` event executes after all processing in `START-OF-SELECTION` completes.

It is used to aggregate overall metrics (totals, averages, counts), trigger ALV Grid displays (`cl_salv_table=>factory`), or print summary footers.

```abap
REPORT z_summary_output_demo.

" Continuing from main processing example:
DATA: gv_total_amount TYPE netwr_ak,
      gv_order_count  TYPE i.

END-OF-SELECTION.
  IF gt_sales IS NOT INITIAL.
    
    ULINE.
    WRITE: / 'Sales Order Summary Results:'.
    ULINE.

    LOOP AT gt_sales ASSIGNING FIELD-SYMBOL(<fs_order>).
      WRITE: / <fs_order>-vbeln, <fs_order>-erdat, <fs_order>-netwr CURRENCY 'INR'.
      gv_total_amount = gv_total_amount + <fs_order>-netwr.
      gv_order_count  = gv_order_count + 1.
    ENDLOOP.

    ULINE.
    WRITE: / 'Total Orders Processed:', gv_order_count,
           / 'Total Value           :', gv_total_amount CURRENCY 'INR'.
  ENDIF.
```

---

## Classical List & Interactive Events

When writing classical ABAP reports that output lists using `WRITE` statements, SAP provides dedicated events for page formatting and user interaction:

### 1. `TOP-OF-PAGE`
Fires automatically whenever output overflows to a new page, or when a new page is explicitly initiated via `NEW-PAGE`. Used to print report headers.

```abap
TOP-OF-PAGE.
  WRITE: / 'Company Confidential - Sales Order Detail Report', AT 70 'Page:', sy-pagno.
  ULINE.
```

### 2. `END-OF-PAGE`
Fires when the output reaches the maximum lines specified in `REPORT z_prog LINE-COUNT 65(3)`. Used for page footers.

### 3. `AT LINE-SELECTION` (Interactive Drill-Down)
Fires when a user double-clicks a row on a classical list output or hits `F2`. The system populates `SY-LISEL` with the selected row content.

```abap
START-OF-SELECTION.
  WRITE: / 'Click Order 0000001001 for details'.

AT LINE-SELECTION.
  IF sy-lisel CS '0000001001'.
    WRITE: / 'Drill-Down Details for Order 0000001001'.
  ENDIF.
```

---

## Logical Database (LDB) Events: `GET` and `GET LATE`

When using SAP Logical Databases (LDBs like `FDB` for Finance or `PDB` for HR), data fetching relies on `GET` events:

- **`GET node`:** Fires whenever the logical database framework reads a record for the specified database table node.
- **`GET node LATE`:** Fires after all subordinate child records under that table node have been processed.

---

## Modern ABAP OO Alternative: Replacing Classical Events with ALV Grid Handlers

In modern ABAP Cloud and S/4HANA applications, classical list events (`TOP-OF-PAGE`, `AT LINE-SELECTION`) are replaced by Object-Oriented ALV Grid event handlers (`cl_salv_table` or `cl_gui_alv_grid`):

```abap
* Modern OO Event Handler Class
CLASS lcl_event_handler DEFINITION.
  PUBLIC SECTION.
    METHODS: on_double_click FOR EVENT double_click OF cl_salv_events_table
               IMPORTING row column.
ENDCLASS.

CLASS lcl_event_handler IMPLEMENTATION.
  METHOD on_double_click.
    MESSAGE |Clicked row { row } column { column }| TYPE 'I'.
  ENDMETHOD.
ENDCLASS.
```

---

## Advanced Selection Screen Event: AT SELECTION-SCREEN ON VALUE-REQUEST

When built-in search helps are insufficient, developers implement custom `F4` dropdown lookups using the `AT SELECTION-SCREEN ON VALUE-REQUEST FOR <field>` event combined with standard function module **`F4IF_INT_TABLE_VALUE_REQUEST`**:

```abap
REPORT z_custom_f4_demo.

TYPES: BEGIN OF ty_plant,
         werks TYPE werks_d,
         name1 TYPE name1,
       END OF ty_plant.

DATA: gt_plants TYPE TABLE OF ty_plant.

PARAMETERS: p_plant TYPE werks_d.

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_plant.
  " Populate custom lookup data
  APPEND VALUE #( werks = '1000' name1 = 'Mumbai Manufacturing Plant' ) TO gt_plants.
  APPEND VALUE #( werks = '2000' name1 = 'Pune Assembly Center' ) TO gt_plants.
  APPEND VALUE #( werks = '3000' name1 = 'Bangalore Tech Hub' ) TO gt_plants.

  " Call standard SAP F4 popup function module
  CALL FUNCTION 'F4IF_INT_TABLE_VALUE_REQUEST'
    EXPORTING
      retfield        = 'WERKS'
      value_org       = 'S'
      dynpprog        = sy-repid
      dynpnr          = sy-dynnr
      dynprofield     = 'P_PLANT'
    TABLES
      value_tab       = gt_plants
    EXCEPTIONS
      parameter_error = 1
      no_values_found = 2
      OTHERS          = 3.
```

---

## Interactive Drill-Down Using HIDE Statement and AT LINE-SELECTION

In classical reporting, passing data from a primary summary list to a secondary detailed list requires the **`HIDE`** statement.

When `HIDE <var>` executes inside a `LOOP` under `START-OF-SELECTION`, SAP stores the value of `<var>` in a hidden list memory area for that specific output row. When the user double-clicks that row, `AT LINE-SELECTION` retrieves the hidden variable value automatically!

```abap
REPORT z_interactive_hide_demo.

TABLES: vbak.

TYPES: BEGIN OF ty_order,
         vbeln TYPE vbeln_va,
         kunnr TYPE kunnr,
       END OF ty_order.

DATA: gt_orders TYPE TABLE OF ty_order,
      gs_order  TYPE ty_order,
      gv_selected_vbeln TYPE vbeln_va.

START-OF-SELECTION.
  SELECT vbeln, kunnr FROM vbak INTO TABLE @gt_orders UP TO 5 ROWS.

  WRITE: / 'Double-click any Sales Order line to view details:'.
  ULINE.

  LOOP AT gt_orders INTO gs_order.
    gv_selected_vbeln = gs_order-vbeln.
    WRITE: / 'Sales Order:', gs_order-vbeln, 'Customer:', gs_order-kunnr.
    " Store current order ID in hidden memory for this line
    HIDE gv_selected_vbeln.
  ENDLOOP.

AT LINE-SELECTION.
  " gv_selected_vbeln automatically holds the clicked row's order number!
  IF gv_selected_vbeln IS NOT INITIAL.
    WRITE: / '=== Drill-Down Detail Screen ==='.
    WRITE: / 'Displaying line items for Order:', gv_selected_vbeln.
    " Query VBAP table for item details...
  ENDIF.
```

---

## Event Flow Comparison Table

| Event Block | Execution Timing | Primary Responsibility | Error Handling Behavior |
| :--- | :--- | :--- | :--- |
| **`INITIALIZATION`** | Before screen display | Pre-fill parameter defaults | N/A |
| **`AT SELECTION-SCREEN OUTPUT`** | PBO of selection screen | Dynamic field masking/hiding | N/A |
| **`AT SELECTION-SCREEN`** | PAI after user clicks F8 | Validate inputs & mandatory checks | Raises `MESSAGE ... TYPE 'E'` to halt |
| **`START-OF-SELECTION`** | Post-validation | Main database SELECT queries | Uses `STOP` or `EXIT` to abort |
| **`END-OF-SELECTION`** | Post-processing | Summary totals & ALV rendering | N/A |
| **`TOP-OF-PAGE`** | Page list header render | Printing list titles & column headers | N/A |

---

## Frequently Asked Questions

### 1. What happens if I write code outside any event block in an ABAP report?
If no explicit event keyword is written, ABAP automatically wraps any executable code between data declarations and subroutines inside an implicit `START-OF-SELECTION` block.

### 2. How can I stop a report from running if a database query fails in START-OF-SELECTION?
Use the **`STOP`** statement inside `START-OF-SELECTION`. `STOP` aborts remaining logic in `START-OF-SELECTION` and jumps directly to `END-OF-SELECTION` to display whatever output has been generated.

### 3. What is the difference between `AT SELECTION-SCREEN` and `AT SELECTION-SCREEN OUTPUT`?
`AT SELECTION-SCREEN OUTPUT` is the **PBO** (Process Before Output) event used to set screen attributes before the screen appears. `AT SELECTION-SCREEN` is the **PAI** (Process After Input) event used to validate user input after the user interacts with the screen.

---

## Summary

ABAP Report Events provide a structured, predictable lifecycle for enterprise programs. By placing pre-fill defaults in `INITIALIZATION`, dynamic screen logic in `AT SELECTION-SCREEN OUTPUT`, validation in `AT SELECTION-SCREEN`, queries in `START-OF-SELECTION`, and summaries in `END-OF-SELECTION`, developers write clean, maintainable SAP applications.
