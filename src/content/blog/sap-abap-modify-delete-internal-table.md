---
title: "MODIFY and DELETE Statements for Internal Tables in ABAP"
description: "Learn how to update and remove rows from internal tables in SAP ABAP using MODIFY, DELETE, INSERT, and conditional operations."
pubDate: "2026-07-24"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-modify-delete-thumbnail.png"
readingTime: "9 min read"
order: 44
keywords:
  - "sap abap"
  - "modify internal table"
  - "delete internal table"
  - "insert abap"
  - "abap table operations"
  - "modify abap"
  - "delete where abap"
  - "abap itab modify"
  - "sort internal table"
  - "delete adjacent duplicates"
---

![MODIFY and DELETE in ABAP](/abap-modify-delete-thumbnail.png)

In the previous tutorial, we covered how to create internal tables and add rows to them using APPEND. But adding data is only half the story. In real projects, you constantly need to update existing rows, remove rows that are no longer needed, insert rows at specific positions, sort data, and remove duplicates.

Think about it — you fetch 1000 material records from the database, then your business logic says "update the price of material MAT001" or "delete all materials that are marked as inactive" or "sort the list by price from highest to lowest". You cannot do any of this without knowing MODIFY, DELETE, INSERT, and SORT.

These operations are the bread and butter of data processing in ABAP. Every report, every interface, every data migration program uses them. So let us go through each one properly with real examples.

---

## MODIFY — Updating Rows in an Internal Table

The MODIFY statement updates one or more existing rows in an internal table. There are several ways to use it.

### Method 1: MODIFY by Index

If you know the exact row number you want to update, you can modify it directly by index:

```abap
REPORT z_modify_index.

TYPES: BEGIN OF ty_product,
         prodid TYPE i,
         name   TYPE string,
         price  TYPE p DECIMALS 2,
       END OF ty_product.

DATA: lt_products TYPE TABLE OF ty_product,
      ls_product  TYPE ty_product.

* Add some products
ls_product-prodid = 1. ls_product-name = 'Keyboard'. ls_product-price = '1500.00'.
APPEND ls_product TO lt_products.
ls_product-prodid = 2. ls_product-name = 'Mouse'. ls_product-price = '800.00'.
APPEND ls_product TO lt_products.
ls_product-prodid = 3. ls_product-name = 'Monitor'. ls_product-price = '12000.00'.
APPEND ls_product TO lt_products.

* Update the price of row 2 (Mouse)
ls_product-prodid = 2. ls_product-name = 'Mouse'. ls_product-price = '950.00'.
MODIFY lt_products FROM ls_product INDEX 2.

* Display all products
LOOP AT lt_products INTO ls_product.
  WRITE: / ls_product-prodid, ls_product-name, ls_product-price.
ENDLOOP.
```

### Output:
```text
1 Keyboard 1500.00
2 Mouse 950.00
3 Monitor 12000.00
```

The Mouse price changed from 800 to 950. The other rows were not affected.

### Method 2: MODIFY with WHERE Condition

This is more practical. In real projects, you rarely know the index. Instead, you want to say "update all rows where a certain condition is true":

```abap
REPORT z_modify_where.

TYPES: BEGIN OF ty_employee,
         empid  TYPE i,
         name   TYPE string,
         dept   TYPE string,
         salary TYPE p DECIMALS 2,
       END OF ty_employee.

DATA: lt_employees TYPE TABLE OF ty_employee,
      ls_employee  TYPE ty_employee.

* Add employees
ls_employee-empid = 101. ls_employee-name = 'Daksh'. ls_employee-dept = 'Dev'. ls_employee-salary = '55000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 102. ls_employee-name = 'Priya'. ls_employee-dept = 'HR'. ls_employee-salary = '48000.00'.
APPEND ls_employee TO lt_employees.
ls_employee-empid = 103. ls_employee-name = 'Rahul'. ls_employee-dept = 'Dev'. ls_employee-salary = '52000.00'.
APPEND ls_employee TO lt_employees.

* Give 10% raise to all Dev department employees
LOOP AT lt_employees INTO ls_employee WHERE dept = 'Dev'.
  ls_employee-salary = ls_employee-salary * '1.10'.
  MODIFY lt_employees FROM ls_employee.
ENDLOOP.

* Display results
WRITE: 'After 10% raise for Dev department:'.
LOOP AT lt_employees INTO ls_employee.
  WRITE: / ls_employee-empid, ls_employee-name, ls_employee-dept, ls_employee-salary.
ENDLOOP.
```

### Output:
```text
After 10% raise for Dev department:
101 Daksh Dev 60500.00
102 Priya HR 48000.00
103 Rahul Dev 57200.00
```

Only Daksh and Rahul (both in Dev) got the raise. Priya in HR was not touched.

### Method 3: MODIFY Using TRANSPORTING

Sometimes you only want to update specific fields, not the entire row. The TRANSPORTING addition lets you specify which fields to change:

```abap
REPORT z_modify_transporting.

TYPES: BEGIN OF ty_product,
         prodid TYPE i,
         name   TYPE string,
         price  TYPE p DECIMALS 2,
         stock  TYPE i,
       END OF ty_product.

DATA: lt_products TYPE TABLE OF ty_product,
      ls_product  TYPE ty_product.

ls_product-prodid = 1. ls_product-name = 'Keyboard'. ls_product-price = '1500.00'. ls_product-stock = 50.
APPEND ls_product TO lt_products.
ls_product-prodid = 2. ls_product-name = 'Mouse'. ls_product-price = '800.00'. ls_product-stock = 100.
APPEND ls_product TO lt_products.

* Only update the price of row 1, keep everything else unchanged
CLEAR ls_product.
ls_product-price = '1350.00'.
MODIFY lt_products FROM ls_product INDEX 1 TRANSPORTING price.

* Display
LOOP AT lt_products INTO ls_product.
  WRITE: / ls_product-prodid, ls_product-name, ls_product-price, ls_product-stock.
ENDLOOP.
```

### Output:
```text
1 Keyboard 1350.00 50
2 Mouse 800.00 100
```

Only the price field of row 1 was changed. The name and stock fields remained exactly as they were. This is useful when you want to avoid accidentally overwriting other fields.

---

## DELETE — Removing Rows from an Internal Table

### Method 1: DELETE by Index

```abap
DELETE lt_products INDEX 2.
```

This removes the second row from the table. All subsequent rows shift up by one position.

### Method 2: DELETE with WHERE Condition

This is the most common way. You specify a condition, and all matching rows are removed:

```abap
REPORT z_delete_where.

TYPES: BEGIN OF ty_student,
         rollno TYPE i,
         name   TYPE string,
         marks  TYPE i,
         status TYPE string,
       END OF ty_student.

DATA: lt_students TYPE TABLE OF ty_student,
      ls_student  TYPE ty_student.

ls_student-rollno = 1. ls_student-name = 'Arjun'. ls_student-marks = 85. ls_student-status = 'Pass'.
APPEND ls_student TO lt_students.
ls_student-rollno = 2. ls_student-name = 'Kavya'. ls_student-marks = 30. ls_student-status = 'Fail'.
APPEND ls_student TO lt_students.
ls_student-rollno = 3. ls_student-name = 'Rohan'. ls_student-marks = 72. ls_student-status = 'Pass'.
APPEND ls_student TO lt_students.
ls_student-rollno = 4. ls_student-name = 'Meera'. ls_student-marks = 25. ls_student-status = 'Fail'.
APPEND ls_student TO lt_students.
ls_student-rollno = 5. ls_student-name = 'Vikram'. ls_student-marks = 90. ls_student-status = 'Pass'.
APPEND ls_student TO lt_students.

WRITE: 'Before DELETE - Total students:', lines( lt_students ).

* Remove all failed students
DELETE lt_students WHERE status = 'Fail'.

NEW-LINE.
WRITE: 'After DELETE - Total students:', lines( lt_students ).
NEW-LINE.
NEW-LINE.

LOOP AT lt_students INTO ls_student.
  WRITE: / ls_student-rollno, ls_student-name, ls_student-marks, ls_student-status.
ENDLOOP.
```

### Output:
```text
Before DELETE - Total students: 5
After DELETE - Total students: 3

1 Arjun 85 Pass
3 Rohan 72 Pass
5 Vikram 90 Pass
```

Both failed students (Kavya and Meera) were removed in a single statement. Simple and clean.

---

## INSERT — Adding Rows at a Specific Position

Unlike APPEND which always adds at the bottom, INSERT lets you add a row at any position:

```abap
REPORT z_insert_demo.

TYPES: BEGIN OF ty_task,
         taskid   TYPE i,
         taskname TYPE string,
         priority TYPE string,
       END OF ty_task.

DATA: lt_tasks TYPE TABLE OF ty_task,
      ls_task  TYPE ty_task.

ls_task-taskid = 1. ls_task-taskname = 'Design Phase'. ls_task-priority = 'High'.
APPEND ls_task TO lt_tasks.
ls_task-taskid = 3. ls_task-taskname = 'Testing Phase'. ls_task-priority = 'Medium'.
APPEND ls_task TO lt_tasks.

* Insert a new task at position 2 (between Design and Testing)
ls_task-taskid = 2. ls_task-taskname = 'Development Phase'. ls_task-priority = 'High'.
INSERT ls_task INTO lt_tasks INDEX 2.

LOOP AT lt_tasks INTO ls_task.
  WRITE: / ls_task-taskid, ls_task-taskname, ls_task-priority.
ENDLOOP.
```

### Output:
```text
1 Design Phase High
2 Development Phase High
3 Testing Phase Medium
```

The Development Phase was inserted between Design and Testing, exactly where it should be.

---

## SORT — Ordering Your Data

The SORT statement arranges rows in ascending or descending order based on one or more fields:

```abap
REPORT z_sort_demo.

TYPES: BEGIN OF ty_product,
         name  TYPE string,
         price TYPE p DECIMALS 2,
       END OF ty_product.

DATA: lt_products TYPE TABLE OF ty_product,
      ls_product  TYPE ty_product.

ls_product-name = 'Keyboard'. ls_product-price = '1500.00'. APPEND ls_product TO lt_products.
ls_product-name = 'Monitor'. ls_product-price = '12000.00'. APPEND ls_product TO lt_products.
ls_product-name = 'Mouse'. ls_product-price = '800.00'. APPEND ls_product TO lt_products.
ls_product-name = 'Webcam'. ls_product-price = '3500.00'. APPEND ls_product TO lt_products.

* Sort by price descending (most expensive first)
SORT lt_products BY price DESCENDING.

WRITE: 'Products sorted by price (high to low):'.
LOOP AT lt_products INTO ls_product.
  WRITE: / ls_product-name, ls_product-price.
ENDLOOP.
```

### Output:
```text
Products sorted by price (high to low):
Monitor 12000.00
Webcam 3500.00
Keyboard 1500.00
Mouse 800.00
```

You can sort by multiple fields too:

```abap
SORT lt_employees BY dept ASCENDING salary DESCENDING.
```

This sorts first by department (A-Z), and within each department, by salary from highest to lowest.

---

## DELETE ADJACENT DUPLICATES — Removing Duplicate Rows

After sorting, you often need to remove duplicate rows. The `DELETE ADJACENT DUPLICATES` statement removes consecutive duplicate rows:

```abap
REPORT z_delete_dupes.

TYPES: BEGIN OF ty_city,
         name    TYPE string,
         country TYPE string,
       END OF ty_city.

DATA: lt_cities TYPE TABLE OF ty_city,
      ls_city   TYPE ty_city.

ls_city-name = 'Mumbai'. ls_city-country = 'India'. APPEND ls_city TO lt_cities.
ls_city-name = 'Delhi'. ls_city-country = 'India'. APPEND ls_city TO lt_cities.
ls_city-name = 'Mumbai'. ls_city-country = 'India'. APPEND ls_city TO lt_cities.
ls_city-name = 'London'. ls_city-country = 'UK'. APPEND ls_city TO lt_cities.
ls_city-name = 'Delhi'. ls_city-country = 'India'. APPEND ls_city TO lt_cities.

WRITE: 'Before cleanup:', lines( lt_cities ), 'cities'.

* Important: Sort first, then delete adjacent duplicates
SORT lt_cities BY name.
DELETE ADJACENT DUPLICATES FROM lt_cities COMPARING name.

NEW-LINE.
WRITE: 'After cleanup:', lines( lt_cities ), 'cities'.
NEW-LINE.

LOOP AT lt_cities INTO ls_city.
  WRITE: / ls_city-name, ls_city-country.
ENDLOOP.
```

### Output:
```text
Before cleanup: 5 cities
After cleanup: 3 cities

Delhi India
London UK
Mumbai India
```

The duplicate entries for Mumbai and Delhi were removed. Remember — you must SORT before using DELETE ADJACENT DUPLICATES, otherwise it will only catch duplicates that happen to be next to each other.

---

## Quick Reference Table

| Operation | Purpose | Example |
| :--- | :--- | :--- |
| **MODIFY ... INDEX** | Update a specific row by position | `MODIFY lt_tab FROM ls_wa INDEX 3.` |
| **MODIFY ... FROM** | Update current row inside LOOP | `MODIFY lt_tab FROM ls_wa.` |
| **MODIFY ... TRANSPORTING** | Update only specific fields | `MODIFY lt_tab FROM ls_wa INDEX 1 TRANSPORTING price.` |
| **DELETE ... INDEX** | Remove a specific row by position | `DELETE lt_tab INDEX 2.` |
| **DELETE ... WHERE** | Remove all rows matching a condition | `DELETE lt_tab WHERE status = 'Fail'.` |
| **INSERT ... INDEX** | Add a row at a specific position | `INSERT ls_wa INTO lt_tab INDEX 3.` |
| **SORT** | Order rows by field values | `SORT lt_tab BY price DESCENDING.` |
| **DELETE ADJACENT DUPLICATES** | Remove consecutive duplicate rows | `DELETE ADJACENT DUPLICATES FROM lt_tab COMPARING name.` |

---

## Common Mistakes to Avoid

### 1. Forgetting to SORT Before DELETE ADJACENT DUPLICATES
This is the number one mistake. DELETE ADJACENT DUPLICATES only removes duplicates that are next to each other. If duplicates are scattered throughout the table, they will not be caught. Always sort by the comparison field first.

### 2. Modifying a Table Inside LOOP Without Using the Work Area Correctly
When you modify a row inside a LOOP, you must use `MODIFY lt_table FROM ls_workarea`. If you forget the FROM clause, the modification will not be saved back to the table.

### 3. Deleting Rows by Index Inside a Loop
If you delete row 3, then what was row 4 becomes row 3. Your loop counter gets confused and you might skip rows. Use `DELETE ... WHERE` instead, or loop backwards if you must delete by index.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What does the TRANSPORTING addition do in a MODIFY statement?</summary>
<div class="details-content">
The TRANSPORTING addition lets you specify exactly which fields should be updated in the internal table row. Without TRANSPORTING, the entire row is overwritten with all the values from the work area. With TRANSPORTING, only the listed fields are changed, and all other fields in the row keep their original values. This is useful when you want to update just one or two fields without accidentally clearing other fields.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> Why must you SORT before using DELETE ADJACENT DUPLICATES?</summary>
<div class="details-content">
DELETE ADJACENT DUPLICATES only compares each row with the row directly above it. It removes a row only if it is identical (in the compared fields) to its immediate neighbor. If duplicate rows are scattered at different positions in the table, they will not be next to each other and therefore will not be detected. Sorting first brings all identical rows together, ensuring that all duplicates become adjacent and can be properly removed.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> What is the difference between APPEND and INSERT in ABAP internal tables?</summary>
<div class="details-content">
APPEND always adds the new row at the very end (bottom) of the internal table. INSERT lets you specify an exact position using the INDEX addition, so you can add a row at the beginning, middle, or any specific location in the table. If you do not care about position and just need to add data, use APPEND. If the order matters and you need the new row at a specific spot, use INSERT with INDEX.
</div>
</details>

---

## Summary

Now you have the complete toolkit for working with internal tables in ABAP. You know how to add rows (APPEND, INSERT), read rows (LOOP AT, READ TABLE), update rows (MODIFY), remove rows (DELETE), sort data (SORT), and clean up duplicates (DELETE ADJACENT DUPLICATES).

These six operations cover about 90 percent of what you will do with internal tables in real SAP projects. The remaining 10 percent involves more advanced operations like COLLECT, AT NEW, AT END OF, and field symbols — which we will cover in future tutorials.

The key takeaway is this: always clear your work area before reusing it, always sort before removing duplicates, and always check sy-subrc after READ operations. Follow these three habits and you will avoid the most common bugs in ABAP programs.
