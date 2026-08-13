---
title: "How to Create Tables in SAP ABAP: A Beginner's Step-by-Step Guide"
description: "Learn how to create custom database tables in SAP ABAP using transaction code SE11, maintain data with SE16N, and configure technical settings."
pubDate: "2026-06-09"
category: "Data Dictionary"
author: "Daksh"
readingTime: "6 min read"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitI82W5ugjgTQYpGHlk5L9iTb6-t9t0Yjf07ZUMhMlqXHiHaIS6ZByFIImQaXywvWhIwVDXFl6xYyYl0Y6UNpbPxxsZn2Y9Two0baGufCI-b0nvcgBdqkCj2dIUwdKZUZfuUONMdorJXCvauKNrIXN8_GFB5JFlbgcqwPm0tMHcpyZPEss1TWHUu7UiDTF/s1536/front%20onefor%20table.png"
order: 13
---

![How to Create Tables in SAP ABAP](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitI82W5ugjgTQYpGHlk5L9iTb6-t9t0Yjf07ZUMhMlqXHiHaIS6ZByFIImQaXywvWhIwVDXFl6xYyYl0Y6UNpbPxxsZn2Y9Two0baGufCI-b0nvcgBdqkCj2dIUwdKZUZfuUONMdorJXCvauKNrIXN8_GFB5JFlbgcqwPm0tMHcpyZPEss1TWHUu7UiDTF/s1536/front%20onefor%20table.png)

In SAP ABAP, database tables store and organize corporate records. Almost every SAP application relies on tables to manage information such as employee details, sales orders, and material master data.

---

## What is a Table in SAP ABAP?

A table in SAP ABAP is a database object used to store structured data. Each table consists of:
- **Fields** (Columns)
- **Records** (Rows)
- **Primary Keys** (Unique identifiers)
- **Data Types** (Data validation constraints)

| Student ID | Name | Course | Age |
| :--- | :--- | :--- | :--- |
| 101 | Rahul | Computer Science | 21 |
| 102 | Abhishek | Information Technology | 22 |

### Key Points:
- A table is a collection of rows and columns.
- Tables are containers which store data in the form of records.
- Tables must have a primary key which is used to identify a record uniquely.

> ℹ️ **Note:** Create and maintain database tables using transaction code **SE11**.

---

## Why Do We Create Custom Tables?

SAP provides thousands of standard tables. However, organizations often have unique business requirements that cannot be fulfilled using standard tables alone.

Custom tables allow developers to:
- Store company-specific information
- Maintain custom application data
- Create custom reports
- Support unique business processes
- Build industry-specific solutions

> ℹ️ **Note:** Custom table names must start with **Z** or **Y** (e.g., `ZEMPLOYEE_TABLE`).

---

## Important Components Required Before Creating a Table

There are three main components you should know before creating a table:

### 1. Domain
A Domain defines the technical characteristics of a field, such as its **Data Type**, **Length**, and **Value Range** (e.g. `CHAR(40)`).

### 2. Data Element
A Data Element provides semantic descriptions and **Field Labels** (e.g., `ZDE_EMPLOYEE_NAME`) used throughout the SAP system.

### 3. Primary Key
- A primary key uniquely identifies each record.
- Example: **Employee ID** is primary key.
- Primary keys prevent duplicate records.

---

## Step-by-Step Process to Create a Table in SAP ABAP

1. Log in to your SAP GUI using your username and password.
2. In the command field, enter Tcode **SE11** and press **Enter**.
3. Select the **Database Table** radio button.
4. Give a name for the table (e.g., `ZEMP_TABLE`).
5. Click the **Create** button.
6. Provide a **Short Description** for the table (e.g., *Employee Table*).
7. Under the **Delivery and Maintenance** tab, set:
 - **Delivery Class:** `'A'` (determines transport and upgrade behavior).
 - **Data Browser/Table View Maint.:** *Display/Maintenance Allowed*.
8. Under the **Fields** tab, define your columns as shown:

| Field Name | Key | Initial Value | Data Element |
| :--- | :--- | :--- | :--- |
| `EMP_ID` | Checked (Key) | Checked | `ZDE_EMP_ID` |
| `EMP_NAME` | | | `ZDE_EMP_NAME` |
| `DEPARTMENT` | | | `ZDE_DEPARTMENT` |
| `DESIGNATION` | | | `ZDE_DESIGNATION` |
| `SALARY` | | | `ZDE_SALARY` |

![Define Fields in SE11 Screen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4CffRux7I81HyEkRVL08CeqeXptGteNyuMUoATSj0GXYEEh4cips9d69ka1mHF7w4YmJmBRwTXX_gWnaNpgDBSWv3pZIg_G4zslAGlPgTbpoQ6B1dbgPnutdDCtLCAbPSCkc9oploISlIgLh-go2oFP9kQOgm2L7gUleGazzDlEL0qe6KCqMEanLd_DLP/s2940/Screenshot%202026-06-05%20at%208.33.11%E2%80%AFPM.png)

9. Click the **Technical Settings** button on the toolbar and configure:
 - **Data Class:** `APPL0`
 - **Size Category:** `0`
 - Save the technical settings.

![Technical Settings Dialog](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6vWfnwMaG_UB_BN9pwqHhMblyb44wxP59DlbitgaoaiUBq28Fmhni_mPLeJIeyiDnnRvwq-my6vtRp9BMxNkqbEAIJ8PLikwfCWAgt-jY_sy2lz-SWjVX140Fttq8GsBEmfsy-OsGWKdheyHnrEu394LOVkoe_zhXImZfw68nLKUhImFDYwJkTRHjPcIJ/s2764/Screenshot%202026-06-05%20at%208.35.47%E2%80%AFPM.png)

10. Save the table using `CTRL+S`.
11. Activate the table by pressing `CTRL+F3`.

<div class="video-container">
 <iframe width="100%" height="400" src="https://www.youtube.com/embed/gRgMwWt1kuw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Understanding Technical Settings

Here is a clear explanation of what technical settings represent:

### Data Class
Determines the physical area where database tables will be stored:

| Data Class | Purpose |
| :--- | :--- |
| `APPL0` | Master Data |
| `APPL1` | Transaction Data |
| `APPL2` | Organizational Data |

### Size Category
Indicates the expected number of records for the table. For small tables, set this to `0`.

---

## How to Enter Data in a SAP Table Using SE16N

### Step 1: Open Transaction SE16N
Go to the SAP command field, type **SE16N**, and press **Enter**.

![SE16N Initial Screen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiymhJ31bcki_OiFuSPyRui9jOOc1z5DeOzztQt_Qo-pSjmIrytPdehEzqdRFreVJ7RwpxKwmJvAMXEUMhSnHYAilOQiTH90plUorQzjJ3fSnbjpqZsUxN7mfnk9W-8_t1zFeG7W3zKHHI0RrqLG5zXSl0UD2JfqpIfyZHL3Tdq3dXw1BUzobjj43w9dLKi/s2418/Screenshot%202026-06-05%20at%208.36.55%E2%80%AFPM.png)

### Step 2: Enter the Table Name
In the **Table** field, enter your custom table name (e.g. `ZEMPLOYEE_TABLE`).

### Step 3: Access Table Data
The system displays the selection screen. Press `F8` to view existing records.

### Step 4: Create a New Entry
1. Click the **Create Entry** button on the toolbar.
2. Enter values for each of the fields in the row grid.
3. Fill in all required entries.

### Step 5: Save the Record
1. Click the **Save** button.
2. SAP validates the data.
3. A success message appears confirming that the records have been saved.

### Step 6: Verify the Data
To confirm the record has been inserted successfully:
1. Return to the `SE16N` selection screen.
2. Click **Execute (F8)**.

---

## Conclusion
Creating custom tables is a core skill in SAP development. Learning how to define fields, configure technical settings, and manage data entries using `SE16N` builds a strong foundation for advanced SAP programming.
