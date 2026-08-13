---
title: "DATA Statement in ABAP – Complete Beginner Guide with Examples"
description: "Learn how to declare variables in SAP ABAP using the DATA statement, follow standard naming conventions, and practice with practical code examples."
pubDate: 2026-06-13
category: "ABAP Programming"
author: "Daksh"
image: "/abap-data-statement-thumbnail.jpg"
readingTime: "6 min read"
order: 2
---

If you are starting out in SAP ABAP, learning how to declare variables is one of your first milestones. The `DATA` statement is used in almost every ABAP program to define variables that hold data in memory while code is executing.

Whether you are writing simple reports, processing internal tables, or building enterprise APIs, managing variables is essential. Without the `DATA` statement, you cannot store, process, or manipulate data inside your programs.

In this guide, we will cover how the `DATA` statement works, why it is used, how to write declarations, and key naming conventions to follow.

---

## What is the DATA Statement in ABAP?

The `DATA` statement allocates a named storage location in memory to hold values during program execution. For example, if you need to hold an employee's ID, salary, or department while running a calculation, you must declare a variable for it.

Simply put, declaring a variable tells the SAP NetWeaver application server to reserve space in memory for a specific type of data.

---

## Why Do We Use the DATA Statement?

We use DATA statement because enterprise applications are constantly working with business data. For example:
- Employee names
- Employee salaries
- Material numbers
- Customer IDs
- Purchase order numbers

Instead of hardcoding these values directly into a program, developers store them in variables. This allows the program to process data dynamically.

### Key Benefits:
* **Easy Data Storage**: Temporarily stores input data, query results, and calculation outputs.
* **Better Readability**: Clean variable declarations make code easier to understand and maintain.
* **Code Reusability**: You can reference the same variable multiple times throughout your program.
* **Memory Efficiency**: SAP allocates and deallocates memory automatically based on variable declarations.
* **Dynamic Data Handling**: Variables can change their values as the program runs.

---

## Basic Syntax of the DATA Statement

The basic syntax of DATA statement is simple:

```abap
DATA variable_name TYPE data_type.
```

Let's look at an example:

```abap
DATA lv_name TYPE string.
```

### Breakdown of the Code:
* **`DATA`**: The keyword that initiates the declaration.
* **`lv_name`**: The name of the variable (follows standard naming conventions where `lv_` stands for Local Variable).
* **`TYPE`**: The keyword indicating that a data type definition follows.
* **`string`**: The data type of the variable (used for variable-length text).

This statement creates a variable named `lv_name` that is ready to store text.

---

## First Variable Declaration Example

Here is a complete, working example showing how to declare a variable, assign a value to it, and display it on the screen:

```abap
REPORT z_data_example.

* Declare the variable
DATA lv_name TYPE string.

* Assign a value to the variable
lv_name = 'Daksh'.

* Display the value
WRITE lv_name.
```

### Output:
```text
Daksh
```

In this example, we declare a text variable, assign the value `'Daksh'` to it, and output the result using the `WRITE` statement.

---

## Understanding Naming Conventions

SAP developers follow strict naming conventions to keep code standardized. For variables, the prefix **`lv_`** stands for **Local Variable** (used inside a single program or procedure).

### Examples:
```abap
DATA lv_name TYPE string.   " Stores text strings
DATA lv_age TYPE i.    " Stores integers
DATA lv_salary TYPE p DECIMALS 2.  " Stores packed decimal numbers (e.g., currency)
```

Adhering to these naming conventions makes your programs immediately understandable to other ABAP developers.

---

## Common Data Types Used in ABAP

ABAP provides several predefined data types. Here are the most common ones you will use with DATA statement:

| Data Type | Description | Example Declaration |
| :--- | :--- | :--- |
| **`STRING`** | Variable-length text string | `DATA lv_city TYPE string.` |
| **`C`** | Fixed-length character | `DATA lv_code TYPE c LENGTH 10.` |
| **`I`** | Integer (whole numbers) | `DATA lv_age TYPE i.` |
| **`P`** | Packed decimal (currency, decimals) | `DATA lv_salary TYPE p DECIMALS 2.` |
| **`D`** | Date (YYYYMMDD format) | `DATA lv_date TYPE d.` |
| **`T`** | Time (HHMMSS format) | `DATA lv_time TYPE t.` |

---

## Declaring Multiple Variables at Once

If you need to declare several variables, you can chain them together using the **colon (`:`)** operator to avoid writing the `DATA` keyword repeatedly. This is called a chained statement:

```abap
DATA: lv_firstname TYPE string,
  lv_lastname TYPE string,
  lv_age  TYPE i.
```

This keeps your code clean, readable, and well-organized.

---

## Assigning Values to Variables

You assign values to variables using the **equals sign (`=`)** operator:

```abap
REPORT z_assign_demo.

DATA lv_name TYPE string.

* Assign the text value
lv_name = 'SAP ABAP'.

WRITE lv_name.
```

### Output:
```text
SAP ABAP
```

---

## Practical Examples

### 1. Working with Numbers and Calculations
Here is how variables are used to store numbers and perform arithmetic calculations:

```abap
REPORT z_math_demo.

DATA: lv_num1 TYPE i,
  lv_num2 TYPE i,
  lv_total TYPE i.

* Assign values
lv_num1 = 10.
lv_num2 = 20.

* Perform calculation
lv_total = lv_num1 + lv_num2.

* Display the output
WRITE lv_total.
```

### Output:
```text
30
```

---

### 2. Working with Text Strings
You can display multiple text variables on separate lines using the slash (`/`) character inside the `WRITE` statement:

```abap
REPORT z_text_demo.

DATA: lv_firstname TYPE string,
  lv_lastname TYPE string.

lv_firstname = 'Daksh'.
lv_lastname = 'Dedha'.

WRITE: / lv_firstname,
  / lv_lastname.
```

### Output:
```text
Daksh
Dedha
```

---

### 3. Working with Date and Time
SAP systems provide system variables that automatically retrieve the current date and time. These are stored in `sy-datum` and `sy-uzeit` respectively:

```abap
REPORT z_system_vars_demo.

DATA: lv_date TYPE d,
  lv_time TYPE t.

* Fetch current system date and time
lv_date = sy-datum.
lv_time = sy-uzeit.

WRITE: / 'Current Date:', lv_date,
  / 'Current Time:', lv_time.
```

---

## The LIKE Keyword vs. The TYPE Keyword

In addition to `TYPE`, you can declare variables using the **`LIKE`** keyword. While `TYPE` references a static data type, `LIKE` references an existing variable or database table field.

```abap
DATA lv_matnr LIKE mara-matnr.
```

In this example, the variable `lv_matnr` is created with the exact same data type and length as the standard SAP database field `MATNR` (Material Number) in table `MARA`.

### Comparison Table:

| Feature | TYPE Keyword | LIKE Keyword |
| :--- | :--- | :--- |
| **Reference Target** | Standard data types or dictionary types (e.g., `string`, `i`, `ZEMPID_DE`) | Existing variables, structures, or database fields (e.g., `lv_age`, `mara-matnr`) |
| **Best Used For** | Declaring variables with standard primitive types. | Declaring variables that must match database columns exactly. |
| **Maintenance** | Changes manually if data type requirements change. | Updates automatically if the referenced database field or variable definition changes. |

---

## DATA Statement with Structures and Internal Tables

In professional ABAP development, you will rarely work with single variables alone. You will often declare structures (work areas) and internal tables.

### 1. Declaring a Structure (Work Area)
A structure stores a single row of data containing multiple related fields:

```abap
* Declare a structure based on a Dictionary Structure object ZEMPLOYEE_STR
DATA ls_employee TYPE zemployee_str.

* Access individual fields using the hyphen (-) symbol
ls_employee-emp_id  = '10001'.
ls_employee-emp_name = 'Daksh Dedha'.
ls_employee-department = 'ABAP DEV'.
ls_employee-salary  = 95000.
```

### 2. Declaring an Internal Table
An internal table is a temporary array of records stored in memory:

```abap
* Declare an internal table based on the structure ZEMPLOYEE_STR
DATA lt_employee TYPE TABLE OF zemployee_str.
```

---

## Common Mistakes Beginners Make

Avoid these common pitfalls when using DATA statement:

### 1. Forgetting to Define a Data Type
You must always declare a data type for your variable.
* **Incorrect**: `DATA lv_name.` (Will cause a syntax error)
* **Correct**: `DATA lv_name TYPE string.`

### 2. Using Poor Variable Names
Use clear, meaningful names rather than single letters.
* **Incorrect**: `DATA a TYPE i.`
* **Correct**: `DATA lv_age TYPE i.`

### 3. Forgetting the Ending Period
Every statement in ABAP must end with a period (`.`).
* **Incorrect**: `DATA lv_name TYPE string`
* **Correct**: `DATA lv_name TYPE string.`

---

## Interactive Checkpoints

Review these self-assessment cards to test your understanding of DATA statement:

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What is the difference between local variables (lv_) and global variables (gv_)?</summary>
<div class="details-content">
Local variables (declared with `lv_`) are defined inside a specific block (like a method, subroutine, or function module) and are only accessible within that block. Global variables (declared with `gv_`) are accessible across the entire program. Best practice is to use local variables whenever possible to prevent memory leaks and variable clashes.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> When should you use the LIKE keyword instead of TYPE?</summary>
<div class="details-content">
You should use `LIKE` when your variable needs to hold data that directly matches an existing database table column (e.g., `mara-matnr`). This ensures that if SAP updates the database column's length or type in a future release, your program's variables will update automatically without causing runtime errors.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What happens if you assign a value that exceeds a variable's defined character length?</summary>
<div class="details-content">
If you assign a value longer than a fixed-length variable's capacity (for example, assigning 12 characters to a `c LENGTH 10` variable), the value will be truncated. Only the first 10 characters will be stored, and the remaining characters will be discarded.
</div>
</details>

---

## Summary

Declaring variables with the `DATA` statement is the foundation of data handling in SAP ABAP. By typing variables correctly, using standard naming prefixes (like `lv_`), and understanding the difference between `TYPE` and `LIKE`, you can write clean, high-performance code. Master these fundamentals, and you will be fully prepared to work with structures and internal tables in your SAP career.
