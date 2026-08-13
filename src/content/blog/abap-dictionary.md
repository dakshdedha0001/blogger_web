---
title: "Introduction to SAP ABAP Dictionary (SE11)"
description: "Master the fundamentals of the ABAP Dictionary (Data Dictionary), database tables (Transparent, Pooled, Cluster), domains, data elements, and relationships."
pubDate: "2026-06-09"
category: "Data Dictionary"
author: "Daksh"
readingTime: "6 min read"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbdXBsKgNSyHCktr7cHr2Jp-3jZqaeALsPsz9RiOZ3oE2jZ8GumFqkS0PbFbohlXKeQV3pzaXPihpbljejKzMiqM7ENH-nC5E40_NNFAk5Xn15kKyt5wfQaxiuIFXnG7HN_hpy0NQVvfAXPfSXfgo-t9Rg_XA_5jUGqrmK_9iIkOcRVTVqPXZrA9iC3b3m/s932/1%20-%20Copy.png"
order: 9
---

![Introduction to SAP ABAP Dictionary (SE11)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbdXBsKgNSyHCktr7cHr2Jp-3jZqaeALsPsz9RiOZ3oE2jZ8GumFqkS0PbFbohlXKeQV3pzaXPihpbljejKzMiqM7ENH-nC5E40_NNFAk5Xn15kKyt5wfQaxiuIFXnG7HN_hpy0NQVvfAXPfSXfgo-t9Rg_XA_5jUGqrmK_9iIkOcRVTVqPXZrA9iC3b3m/s932/1%20-%20Copy.png)

The ABAP Dictionary (often called the Data Dictionary) is the central repository in SAP for defining and managing database objects, structures, and data types. 

In a large enterprise handling thousands of employee records, sales orders, and material prices, you need a system to decide how data is structured, where it is stored, and what validation rules apply. This is exactly what the ABAP Dictionary manages.

Every table, field name, and data type that exists anywhere in the SAP system is defined here.

> ℹ️ **Note:** Access and maintain ABAP Dictionary objects using transaction code **SE11**.

---

## How to Open SE11

1. Login to your SAP GUI account with your username and password.
2. Find the command field in the top-left corner of the SAP screen.
3. Type `SE11` and press **Enter**.
4. The initial ABAP Dictionary screen will display several options:
 - Database Table
 - View
 - Data Type
 - Type Group
 - Domain
 - Search Help
 - Lock Object

![SE11 Command Field Input](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgn9GNn4pshB5Z0Aq4GXwQyaPXF7TngwNbi5QwpyVJErOQLaAfM_Tns6aHKe-CRAk8yve1gRF8iDYHPT2m4_HhdN3baOj-tSwP-d8idxi0hOapyWFc0K3EuGUuHzC3Ii6y0ABtCvsOnIVyB-HYlZXSRnlEAiiM-N7fB-dr8AAvlU99NYG9T5V9IyzU2GmfV/s702/2%20(1).png)

![ABAP Dictionary Initial Screen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbdXBsKgNSyHCktr7cHr2Jp-3jZqaeALsPsz9RiOZ3oE2jZ8GumFqkS0PbFbohlXKeQV3pzaXPihpbljejKzMiqM7ENH-nC5E40_NNFAk5Xn15kKyt5wfQaxiuIFXnG7HN_hpy0NQVvfAXPfSXfgo-t9Rg_XA_5jUGqrmK_9iIkOcRVTVqPXZrA9iC3b3m/s932/1%20-%20Copy.png)

---

## Database Tables

A database table stores data in the form of rows (records) and columns (fields). When an organization stores employee information or records a sales order, the data is ultimately stored in database tables.

### Types of Tables in SAP

There are three primary types of database tables:

1. **Transparent Table:**
 - There is a **1:1 relationship** between the table definition in the ABAP Dictionary and the physical table structure in the database.
 - It stores user/application data.

2. **Pooled Table:**
 - There is a **Many-to-One (N:1) relationship** between the ABAP Dictionary and the physical database tables.
 - Multiple pooled tables are consolidated into a single table pool in the database.
 - A primary-foreign key relationship is not required for pooled tables.

3. **Cluster Table:**
 - There is a **Many-to-One (N:1) relationship** between the ABAP Dictionary and the database table cluster.
 - It is designed to store continuous streams of data (e.g., system logs or financial document segments).
 - Primary-foreign key relationships are required.

---

## What's Inside a Table? — Fields Tab Explained

When you open any database table in `SE11` and click the **Fields** tab, you see a list of columns. Here is what each setting means:

| Column | What It Means |
| :--- | :--- |
| `Field Name` | The actual technical name of the field. |
| `Key` | Checked if this field is part of primary key (unique identifier for each row). |
| `Data Element` | The reusable definition that describes this field's business type and labels. |
| `Data Type` | The technical data type — `CHAR` (text), `NUMC` (numbers), `DATS` (date), etc. |
| `Length` | Maximum number of characters/bytes allowed in this field. |
| `Short Description` | A plain English label explaining the field's purpose. |

![Table Fields Overview Screen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgq6SxOt514GtnUWv2oG4ptrSCBYA2TgXtNFhWAc4PvEi0upYPv2sEse7qddxhqQyap69QvVNlyMwbsPvLofkQs2-qtoZzXuDqc0voHvpMwFQclBDX5vkuZmU4JfGgExZxfCiIdRIvPz5rODkRNhEKb2mf9pPqxtKe7TngC-hYpIx2HUQZ6_H8ebXjKLjs2/s871/Screenshot%202026-06-02%20103616%20(1).png)

---

## What is a Domain?

A **Domain** describes the technical attributes of a field, such as its data type and length.
- Examples: `NUMC(10)`, `CHAR(40)`.
- Domains are not linked directly to table fields; instead, they are assigned to Data Elements, which are then used in the table fields.

![Domain Technical Screen in SAP](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDAMyWLf0O1egYPvmwLPztmWuZwlelt8dzIp1GkszC0b7XtdgdIz_qpT3OIN69F4i24ydWvwzjMyY3maVz1VlRcGK21HpLnEIaN_N4vlvLihvNn-TlzC5G-KqIHtStvxf88hyoR5-PrWk59p5cFgBqF6o1-snnfWFvMNMsLLG84TNkGY5YlDp84t3hFfNI/s822/4%20(1).png)

---

## What is a Data Element?

A **Data Element** describes the semantic properties or appearance of a field to the end user. It provides a meaningful description (field labels) to a technical field, making it readable on front-end screens and report column headings.

![Data Element Semantic Definition](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfaAXX77WLmMPzsCg-p9F6onXEO8k2rHbWJ9lGbeb6OAfu3S52bAzMmiXJ2eUlmcuPPcFO0QkqDYDbZFu7ZISw5KgETl98kIEULXxOxOK0Fi4rPKXAgrEYH58gYxDohDZx6iWeo-BRRd6JuDugmLyQUJqOXYMw2_PX1Sx7GB2guzniMy0H1Y7nS5xo1OTl/s853/5%20(1).png)

---

## Primary Key / Foreign Key Relationship

A **Foreign Key** links tables together by establishing a parent-child relationship.
- The **Primary Key** of a parent table acts as a **Foreign Key** in the child table.
- For the relationship to exist, both tables must share at least one common attribute (column).
- **Cardinality** defines the number of corresponding records between the tables for a particular entry (e.g., 1:1, 1:N).

![Primary/Foreign Key Relationship Scenario 1](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBSbY4PN0rGM9VkguMmmFIiKqXBCdC24o-UPg1D73AJbe-ZNvvAWehKuAAkLcG7bbS3dACHx7FR7zbiKZVB8SF9xPppqXFkgUejodLPkf1BkbJ9i_3WknNsVUbdT-zP7V398u24LYqJkeyfR4qD3j11fZI9AvlfPGnKNso8TZmgrp6KNezyWgOkByJKxq8/s734/Screenshot%202026-06-02%20at%2010.28.23%E2%80%AFAM.png)

![Primary/Foreign Key Relationship Scenario 2](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIrMZmb7sgNv3tYrgNuAFHI4srAwx7EIArSTGypABeSF_0zEp8qp8WagOUNAwIKSm9zTekMeGZrRfbfWmsiHSbooC380THDgwWRY0_x5p9AbC0AdTTGG2tDGrL7TnRntdmCEZhtOutLvjc4vUC2edrrkMZ0rYYOZJOAvhyphenhyphen2ZlfPgcCYrayLICYX6JybEpr/s744/Screenshot%202026-06-02%20at%2010.28.34%E2%80%AFAM.png)
