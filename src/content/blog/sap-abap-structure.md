---
title: "How to Create a Structure in SAP ABAP (SE11) – Step-by-Step Guide"
description: "Learn what a structure is in SAP ABAP, how it differs from a database table, and the step-by-step process to create and use structures in ABAP programs."
pubDate: "2026-06-09"
category: "Data Dictionary"
author: "Daksh"
readingTime: "6 min read"
image: "/abap-structure-thumbnail.jpg"
order: 12
---

# How to Create a Structure in SAP ABAP (SE11) – Step-by-Step Guide

When learning SAP ABAP, you will encounter terms like Domain, Data Element, Table, and Structure. Once you understand domains and data elements, the next critical concept to master is the **Structure**.

Structures in SAP ABAP are widely used because they help developers group related fields together without writing data to the physical database.

In this guide, we will explore what structures are, why they are used, how they differ from database tables, and how to create them in SAP using transaction code **SE11**.

---

## What is a Structure in SAP ABAP?

A **Structure** is a collection of fields grouped under a single definition. It organizes related data fields but does not store any records physically in the database. Think of a structure as a reusable data template or blueprint.

For example, to represent employee information, you might need:
* Employee ID
* Employee Name
* Department
* Salary

Instead of defining these fields manually in every program, you can define a single structure in the ABAP Dictionary and reference it wherever needed.

---

## Why Do We Use Structures in SAP ABAP?

Structures improve development efficiency and maintain consistency across SAP applications. They help developers:

* **Reuse** field definitions across multiple programs.
* **Group** related fields together logically.
* **Reduce coding effort** and duplicate definitions.
* **Improve readability** of programs.
* **Maintain consistency** across different reports and forms.

Structures in SAP ABAP are heavily used in:
* ABAP Reports
* Internal Tables
* Work Areas
* Function Modules (parameters)
* Smart Forms & Adobe Forms
* BAPIs & Interfaces

---

## Real-Life Example

Imagine a company wants to store employee-related information. Instead of defining fields individually every time, a Structure can be created with:
* `EMP_ID`
* `EMP_NAME`
* `DEPARTMENT`
* `SALARY`

Now, this Structure can be referenced in multiple programs and reports. This saves development time and ensures all programs follow the same format.

---

## Structures vs. Database Tables

Many beginners confuse Structures in SAP ABAP with Tables. Although both contain fields, they serve completely different purposes:

| Feature | Structure in SAP ABAP | Database Table |
| :--- | :--- | :--- |
| **Data Storage** | Does not store data. | Stores data physically in the database. |
| **Records** | Cannot contain database records. | Contains rows of database records. |
| **Physical Table** | No physical database table exists. | A physical database table is created. |
| **Usage** | Used for local screen templates, programs, and reports. | Used for permanent, persistent data storage. |

In other words:
* A **Structure** defines how data should look in memory.
* A **Table** actually stores the data.

---

## Prerequisites

Before creating a Structure, ensure that:
1. SAP GUI is installed and configured.
2. You can log in to your SAP development system.
3. The required Domains and Data Elements already exist (or you can use SAP's standard built-in Data Elements).

---

## Steps to Create a Structure in SAP ABAP

### Step 1: Open Transaction SE38/SE11
Log in to SAP, enter transaction code **`SE11`** in the command field, and press **Enter**. The ABAP Dictionary initial screen will appear.

---

### Step 2: Select Data Type Option
On the SE11 screen, click the radio button next to **Data type**. This option is used for creating Structures, Data Elements, and Table Types in SAP.

---

### Step 3: Enter Structure Name
Enter a custom Structure name. 

> ⚠️ **Naming Rules:** Custom developer objects must always start with **`Z`** or **`Y`**. This distinguishes custom developments from standard SAP objects.
>
> **Example Name:** `ZSTR_EMPLOYEE_1`

![ABAP Dictionary: Initial Screen](/se11-create-structure-initial.png)
_Select the Data type option and type your custom structure name in transaction SE11._

---

### Step 4: Click Create
Click the **Create** button. SAP will display a popup asking for the type of Data Type you wish to create. Select **Structure** and click the green checkmark (Continue).

---

### Step 5: Enter Short Description
Provide a description for your structure in the **Short Description** field (e.g., `Employee Structure in SAP ABAP`). This helps identify the object's purpose later.

---

### Step 6: Add Fields
Add the required fields in the table grid. Define components and their data elements:

* **Component**: `EMP_ID` $\rightarrow$ **Component Type**: `ZEMPID_DE`
* **Component**: `EMP_NAME` $\rightarrow$ **Component Type**: `ZEMPNAME_DE`
* **Component**: `DEPARTMENT` $\rightarrow$ **Component Type**: `ZEMPDEP_DE`
* **Component**: `SALARY` $\rightarrow$ **Component Type**: `ZEMPSALARY_DE`

---

### Step 7: Save the Structure
Click the **Save** icon or press `Ctrl + S`. When SAP prompts you for a package, choose **Local Object** (or `$TMP`) for local practice.

---

### Step 8: Check Syntax
Click the **Check** icon or press `Ctrl + F2` to run a syntax check. SAP validates the structure's definition.

---

### Step 9: Activate the Structure
Click the **Activate** icon or press `Ctrl + F3` and confirm. Your structure is now active and ready to be used in programs.

---

## Video Tutorial

If you prefer to watch the step-by-step configuration, check out our comprehensive video guide below:

<div class="video-container my-8 rounded-lg overflow-hidden border border-hairline shadow-product">
 <iframe 
 class="w-full aspect-video" 
 src="https://www.youtube.com/embed/t9FmyzWfxsI" 
 title="How to Create Structure in SAP ABAP (SE11) Video Tutorial" 
 frameborder="0" 
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
 allowfullscreen
 ></iframe>
</div>

---

## How Structures Are Used in ABAP Programs

Structures are frequently used to declare a **Work Area** in programs. A Work Area is a single row of memory that holds data temporarily.

```abap
REPORT z_use_structure_demo.

* Declare a work area based on our structure
DATA: ls_employee TYPE zemployee_str.

* Assign values to individual fields
ls_employee-emp_id  = '10001'.
ls_employee-emp_name = 'Daksh'.
ls_employee-department = 'ABAP DEV'.
ls_employee-salary  = 95000.

* Output the fields
WRITE: 'Employee ID:', ls_employee-emp_id,
  / 'Employee Name:', ls_employee-emp_name,
  / 'Department:', ls_employee-department,
  / 'Salary:', ls_employee-salary.
```

---

## Structures in Internal Tables

Structures are also used to define the layout of **Internal Tables** (in-memory arrays of multiple rows):

```abap
REPORT z_use_structure_demo_2.

* Declare an internal table based on our structure
DATA: lt_employee TYPE TABLE OF zemployee_str.
```

Every row of `lt_employee` will follow the exact field layout defined in the structure.

---

## Interactive Checkpoints

Review these self-assessment cards to solidify your understanding:

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> Can you store data records inside an ABAP structure?</summary>
<div class="details-content">
No. Structures do not occupy physical database storage and cannot contain database records. They act purely as schemas or variables templates inside memory.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> What is the difference between a Work Area and a Structure?</summary>
<div class="details-content">
A **Structure** is a design-time schema defined in the ABAP Dictionary (SE11). A **Work Area** is a runtime variable in your program, typed after the structure, to hold a single row of data in memory.
</div>
</details>

---

## Advantages of Using Structures

1. **Reusability**: Define once in SE11 and reference in hundreds of programs.
2. **Better Organization**: Grouping related variables keeps program declarations clean.
3. **Faster Development**: Avoids recreating common data blocks in code.
4. **Easy Maintenance**: Modifying a structure propagates changes automatically to all dependent programs.
5. **Consistency**: Ensures different applications process the same business entities identically.

---

## Best Practices

* **Prefix custom structures** with `Z` or `Y` (e.g., `ZSTR_EMPLOYEE`). Adding a suffix like `_STR` or `_S` helps identify the object type immediately.
* **Write clear descriptions** so other developers understand the structure's purpose.
* **Reuse existing data elements** for components to keep semantic labels consistent.
* **Activate the object** (`Ctrl + F3`) after creation; otherwise, you cannot reference it in the ABAP Editor.
