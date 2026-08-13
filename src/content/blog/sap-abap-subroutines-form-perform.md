---
title: "Subroutines in ABAP – FORM and PERFORM Explained with Examples"
description: "Learn how to create reusable code blocks in SAP ABAP using FORM and PERFORM. Understand parameters, passing by value, and modularization."
pubDate: "2026-07-25"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-subroutines-thumbnail.png"
readingTime: "9 min read"
order: 45
keywords:
  - "sap abap"
  - "subroutines"
  - "form endform"
  - "perform abap"
  - "abap modularization"
  - "abap form"
  - "passing parameters abap"
  - "using changing abap"
  - "abap reusable code"
  - "abap procedures"
---

![Subroutines in ABAP](/abap-subroutines-thumbnail.png)

Up until now, all the programs we have written in this tutorial series have been straight-line code. You write everything from top to bottom, one statement after another. That works fine for small programs. But the moment your program grows beyond 100-200 lines, things start getting messy.

You find yourself copying and pasting the same block of code in three different places. You need to calculate tax in the beginning of the program, then again in the middle, and once more at the end. So you copy the same 10 lines of tax calculation code three times. Now imagine you find a bug in that calculation — you have to fix it in three places. Miss one and your program gives wrong results in some scenarios.

This is where subroutines come in. A subroutine is a named block of code that you write once and call from anywhere in your program. Instead of writing the tax calculation three times, you write it once as a subroutine and call it whenever you need it. Fix the bug once, and it is fixed everywhere.

In ABAP, subroutines are created using the `FORM` statement and called using the `PERFORM` statement. Let us learn how they work.

---

## What is a Subroutine?

A subroutine is simply a self-contained block of code with a name. You define it once at the bottom of your program, and you can call it as many times as you want from anywhere in the program.

Think of it like saving a recipe. Instead of remembering all the steps every time you want to make chai, you write the recipe once and just say "follow the chai recipe" whenever you want a cup. The recipe (subroutine) stays the same, but you can use it repeatedly.

### Benefits of Using Subroutines
- **Code Reusability**: Write once, use many times
- **Easier Maintenance**: Fix a bug in one place, it is fixed everywhere
- **Better Readability**: Your main program becomes shorter and cleaner
- **Logical Organization**: Related code is grouped together
- **Easier Testing**: You can test each subroutine independently

---

## Basic Syntax — FORM and PERFORM

### Defining a Subroutine (FORM ... ENDFORM)

```abap
FORM subroutine_name.
  " Your code goes here
ENDFORM.
```

### Calling a Subroutine (PERFORM)

```abap
PERFORM subroutine_name.
```

That is it. Define with FORM, call with PERFORM.

---

## Your First Subroutine

```abap
REPORT z_subroutine_basic.

* Main program starts here
WRITE: 'Program started.'.
NEW-LINE.

PERFORM print_separator.

WRITE: 'Processing data...'.
NEW-LINE.

PERFORM print_separator.

WRITE: 'Program finished.'.

*----------------------------------------------------------------------*
* Subroutine definitions go at the bottom
*----------------------------------------------------------------------*
FORM print_separator.
  WRITE: / '--------------------------------------------'.
ENDFORM.
```

### Output:
```text
Program started.
--------------------------------------------
Processing data...
--------------------------------------------
Program finished.
```

We defined `print_separator` once but called it twice using `PERFORM`. If we want to change the separator style (maybe use asterisks instead of dashes), we only need to change it in one place.

---

## Passing Parameters to Subroutines

Subroutines become really powerful when you can pass data to them. ABAP uses two keywords for this:

- **USING**: For passing input values (data goes IN to the subroutine)
- **CHANGING**: For passing values that the subroutine will modify (data goes IN and comes back OUT changed)

### Example: Subroutine with USING (Input Parameters)

```abap
REPORT z_sub_using.

DATA: lv_name TYPE string VALUE 'Daksh',
      lv_age  TYPE i VALUE 25.

PERFORM greet_user USING lv_name lv_age.

*----------------------------------------------------------------------*
FORM greet_user USING pv_name TYPE string
                      pv_age  TYPE i.
  WRITE: 'Hello', pv_name, '!'.
  NEW-LINE.
  WRITE: 'You are', pv_age, 'years old.'.
ENDFORM.
```

### Output:
```text
Hello Daksh !
You are 25 years old.
```

The main program passes `lv_name` and `lv_age` to the subroutine. Inside the subroutine, they are received as `pv_name` and `pv_age` (the `pv_` prefix is a naming convention meaning "parameter value").

### Example: Subroutine with CHANGING (Output Parameters)

```abap
REPORT z_sub_changing.

DATA: lv_num1   TYPE i VALUE 10,
      lv_num2   TYPE i VALUE 20,
      lv_result TYPE i.

PERFORM add_numbers USING lv_num1 lv_num2 CHANGING lv_result.

WRITE: lv_num1, '+', lv_num2, '=', lv_result.

*----------------------------------------------------------------------*
FORM add_numbers USING    pv_a TYPE i
                          pv_b TYPE i
                 CHANGING pv_result TYPE i.
  pv_result = pv_a + pv_b.
ENDFORM.
```

### Output:
```text
10 + 20 = 30
```

Here is the important part — `lv_result` was 0 before the PERFORM. After the subroutine runs, it becomes 30. The CHANGING parameter allows the subroutine to send data back to the caller. This is how subroutines return results.

---

## Passing by Value vs Passing by Reference

By default, ABAP passes parameters **by reference**. This means the subroutine works directly with the original variable — any changes inside the subroutine affect the original variable immediately.

If you want to protect the original variable, you can pass **by value** using the `VALUE()` wrapper:

### Example: Pass by Value (Protected Original)

```abap
REPORT z_sub_byvalue.

DATA lv_counter TYPE i VALUE 100.

WRITE: 'Before PERFORM:', lv_counter.
NEW-LINE.

PERFORM modify_counter USING lv_counter.

WRITE: 'After PERFORM:', lv_counter.

*----------------------------------------------------------------------*
FORM modify_counter USING VALUE(pv_counter) TYPE i.
  pv_counter = pv_counter + 50.
  WRITE: / 'Inside subroutine:', pv_counter.
ENDFORM.
```

### Output:
```text
Before PERFORM: 100
Inside subroutine: 150
After PERFORM: 100
```

Even though the subroutine changed `pv_counter` to 150, the original `lv_counter` in the main program stayed at 100. The `VALUE()` wrapper created a local copy, so the original was protected.

### Without VALUE() (Pass by Reference — Original Changes)

```abap
FORM modify_counter USING pv_counter TYPE i.
  pv_counter = pv_counter + 50.
ENDFORM.
```

In this case, `lv_counter` in the main program would also change to 150 because the subroutine is working directly on the original variable.

---

## Real-World Example: Tax Calculator

Here is a practical example that shows why subroutines are so useful:

```abap
REPORT z_tax_calculator.

TYPES: BEGIN OF ty_employee,
         name   TYPE string,
         salary TYPE p DECIMALS 2,
         tax    TYPE p DECIMALS 2,
         net    TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.

* Add employees
ls_employee-name = 'Daksh'. ls_employee-salary = '85000.00'.
PERFORM calculate_tax USING ls_employee-salary CHANGING ls_employee-tax ls_employee-net.
APPEND ls_employee TO lt_employees.

ls_employee-name = 'Priya'. ls_employee-salary = '45000.00'.
PERFORM calculate_tax USING ls_employee-salary CHANGING ls_employee-tax ls_employee-net.
APPEND ls_employee TO lt_employees.

ls_employee-name = 'Rahul'. ls_employee-salary = '120000.00'.
PERFORM calculate_tax USING ls_employee-salary CHANGING ls_employee-tax ls_employee-net.
APPEND ls_employee TO lt_employees.

* Display results
WRITE: 'Name', 15 'Salary', 30 'Tax', 45 'Net Pay'.
ULINE.

LOOP AT lt_employees INTO ls_employee.
  WRITE: / ls_employee-name, 15 ls_employee-salary, 30 ls_employee-tax, 45 ls_employee-net.
ENDLOOP.

*----------------------------------------------------------------------*
* Tax calculation subroutine
* Below 50000: 10% tax
* 50000 to 100000: 20% tax
* Above 100000: 30% tax
*----------------------------------------------------------------------*
FORM calculate_tax USING    pv_salary TYPE p
                   CHANGING pv_tax    TYPE p
                            pv_net    TYPE p.

  IF pv_salary <= 50000.
    pv_tax = pv_salary * '0.10'.
  ELSEIF pv_salary <= 100000.
    pv_tax = pv_salary * '0.20'.
  ELSE.
    pv_tax = pv_salary * '0.30'.
  ENDIF.

  pv_net = pv_salary - pv_tax.

ENDFORM.
```

### Output:
```text
Name           Salary         Tax            Net Pay
---------------------------------------------------------------
Daksh          85000.00       17000.00       68000.00
Priya          45000.00       4500.00        40500.00
Rahul          120000.00      36000.00       84000.00
```

Look how clean that is. The tax logic is written once in the subroutine. We call it three times — once for each employee. If the tax rules change next year, we only need to update the subroutine. The main program does not need any changes at all.

---

## Organizing Subroutines in Your Program

Here is the standard layout that most ABAP developers follow:

```abap
REPORT z_program_name.

*----------------------------------------------------------------------*
* Global Data Declarations
*----------------------------------------------------------------------*
DATA: ...

*----------------------------------------------------------------------*
* Main Program (Selection Screen, Processing Logic)
*----------------------------------------------------------------------*
START-OF-SELECTION.
  PERFORM fetch_data.
  PERFORM process_data.
  PERFORM display_output.

*----------------------------------------------------------------------*
* Subroutine Definitions
*----------------------------------------------------------------------*
FORM fetch_data.
  " Database queries go here
ENDFORM.

FORM process_data.
  " Business logic goes here
ENDFORM.

FORM display_output.
  " Output formatting goes here
ENDFORM.
```

Notice how the main program becomes just three lines. All the complex logic is hidden inside subroutines. This makes the program incredibly easy to read. A new developer can look at the main section and immediately understand the flow: first fetch data, then process it, then display output.

---

## FORM vs Function Modules vs Methods — When to Use What

| Feature | Subroutine (FORM) | Function Module | Method (Class) |
| :--- | :--- | :--- | :--- |
| **Scope** | Within the same program | Across all programs (global) | Within the class or globally |
| **Reusability** | Low (same program only) | High (any program can call it) | Highest (OOP design) |
| **Parameters** | USING, CHANGING | IMPORTING, EXPORTING, TABLES | IMPORTING, EXPORTING, RETURNING |
| **Error Handling** | Basic (sy-subrc) | Exceptions supported | Exception classes supported |
| **Modern Usage** | Legacy (still widely used) | Common in interfaces | Recommended for new development |

Subroutines are considered legacy in modern ABAP, but they are still used in thousands of production programs. You will absolutely encounter them in existing code, so you need to understand them. For new development, SAP recommends using methods in ABAP Objects, but that is a topic for a future tutorial.

---

## Common Mistakes to Avoid

### 1. Forgetting ENDFORM
Every FORM must end with ENDFORM. Missing it will cause a syntax error.

### 2. Parameter Type Mismatch
If the subroutine expects a string parameter and you pass an integer, you might get unexpected results or runtime errors. Always match the types.

### 3. Accidentally Modifying USING Parameters
USING parameters passed by reference can be accidentally modified inside the subroutine. If you only want to read the value, wrap it with `VALUE()` to create a local copy.

### 4. Putting Subroutines in the Middle of the Program
Subroutine definitions should always go at the bottom of the program. If you put a FORM block in the middle of your main logic, the code inside it will still be skipped during normal execution (ABAP only runs FORM code when you PERFORM it), but it makes the program very hard to read.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What is the difference between USING and CHANGING in a subroutine?</summary>
<div class="details-content">
USING is for input parameters — data that goes into the subroutine for reading. CHANGING is for parameters that the subroutine will modify and send back to the caller. Think of USING as "read-only input" and CHANGING as "input that comes back modified". In practice, USING parameters passed by reference can also be modified, but the convention is to use CHANGING when you intend to modify the value.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> What does VALUE() do when wrapping a USING parameter?</summary>
<div class="details-content">
VALUE() creates a local copy of the parameter inside the subroutine. Without VALUE(), the subroutine works directly on the original variable (pass by reference), so any changes affect the original. With VALUE(), the subroutine gets its own copy, so changes inside the subroutine do not affect the original variable in the calling program. Use VALUE() when you want to protect the original data from accidental modification.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> Why are subroutines considered legacy in modern ABAP?</summary>
<div class="details-content">
SAP recommends using methods in ABAP Objects (classes) for new development because they offer better encapsulation, proper exception handling with exception classes, clearer parameter interfaces (IMPORTING, EXPORTING, RETURNING), and support for modern design patterns. Subroutines cannot be reused across programs without code duplication, and they rely on global variables which can lead to bugs. However, subroutines are still very common in existing production code, so every ABAP developer needs to understand them.
</div>
</details>

---

## Summary

Subroutines are your first step into modular programming in ABAP. Instead of writing everything in one long stretch of code, you break your program into small, manageable, reusable pieces. Each subroutine has a clear purpose, accepts specific inputs, and produces specific outputs.

The pattern is simple: define your subroutine with FORM at the bottom of the program, and call it with PERFORM wherever you need it. Use USING for input parameters and CHANGING for parameters that need to come back modified. Wrap parameters with VALUE() when you want to protect the originals.

Even though SAP now recommends ABAP Objects and methods for new development, subroutines are everywhere in existing production systems. Understanding FORM and PERFORM is not optional — it is essential for any ABAP developer who will maintain or extend legacy code.

In the next tutorials, we will move into function modules and eventually ABAP Objects, where modularization becomes even more powerful.
