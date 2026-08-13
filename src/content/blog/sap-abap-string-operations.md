---
title: "String Operations in ABAP – CONCATENATE, STRLEN, CONDENSE with Examples"
description: "Learn how to work with strings in SAP ABAP. Master CONCATENATE, STRLEN, CONDENSE, TRANSLATE, and more with practical code examples."
pubDate: "2026-07-21"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-string-operations-thumbnail.png"
readingTime: "9 min read"
order: 41
keywords:
  - "sap abap"
  - "string operations"
  - "concatenate abap"
  - "strlen abap"
  - "condense abap"
  - "abap string manipulation"
  - "translate abap"
  - "replace abap"
  - "split abap"
  - "abap text processing"
---

![String Operations in ABAP](/abap-string-operations-thumbnail.png)

If you have been following the earlier tutorials on this site, you already know how to declare variables and display output. But here is the thing — in real SAP projects, you spend a huge amount of time working with text data. Customer names, addresses, material descriptions, error messages, email bodies, file names — almost everything involves strings.

And just storing a string in a variable is not enough. You need to join strings together, clean up extra spaces, find out how long a string is, replace certain characters, split a string into parts, and sometimes convert text between uppercase and lowercase. These are everyday tasks in ABAP development.

That is exactly what this tutorial covers. We will go through every important string operation in ABAP, one by one, with code examples that you can type directly into SE38 and run. No theory overload — just practical stuff that you will actually use on the job.

---

## Why String Operations Matter in Real Projects

Let me give you some examples from actual SAP projects where string operations are used daily:

- **Building dynamic file names**: When you are generating a report and saving it as a file, you need to join the report name with today's date and a file extension. That requires CONCATENATE.
- **Cleaning user input**: Users sometimes type extra spaces in search fields. You need CONDENSE to strip those out before running a database query.
- **Validating data length**: Before inserting data into a database table, you need to check if the string fits the column width. STRLEN helps with that.
- **Formatting output**: Converting material numbers to uppercase, replacing special characters in file paths, splitting comma-separated values — all of these require string operations.

If you skip learning these, you will get stuck every time you need to manipulate text in your programs. Trust me, it happens more often than you think.

---

## CONCATENATE — Joining Strings Together

The `CONCATENATE` statement takes two or more strings and joins them into a single string. This is probably the string operation you will use the most.

### Basic Syntax

```abap
CONCATENATE string1 string2 INTO result_variable.
```

You can also add a separator between the strings:

```abap
CONCATENATE string1 string2 INTO result_variable SEPARATED BY space.
```

### Example 1: Simple String Joining

```abap
REPORT z_concat_demo.

DATA: lv_first  TYPE string,
      lv_last   TYPE string,
      lv_full   TYPE string.

lv_first = 'Daksh'.
lv_last  = 'Dedha'.

CONCATENATE lv_first lv_last INTO lv_full SEPARATED BY space.

WRITE lv_full.
```

### Output:
```text
Daksh Dedha
```

Pretty straightforward, right? We took two separate variables and combined them with a space in between.

### Example 2: Building a File Name Dynamically

This is something you will do all the time in real projects when generating report files:

```abap
REPORT z_filename_demo.

DATA: lv_report  TYPE string,
      lv_date    TYPE string,
      lv_ext     TYPE string,
      lv_file    TYPE string.

lv_report = 'SALES_REPORT'.
lv_date   = sy-datum.     " Today's date
lv_ext    = '.csv'.

CONCATENATE lv_report '_' lv_date lv_ext INTO lv_file.

WRITE lv_file.
```

### Output:
```text
SALES_REPORT_20260721.csv
```

See how useful that is? Instead of hardcoding a file name, you build it dynamically using today's date. This is standard practice in batch jobs and scheduled reports.

### Example 3: Joining Multiple Values

You are not limited to just two strings. You can concatenate as many as you want:

```abap
REPORT z_multi_concat.

DATA: lv_street  TYPE string VALUE 'MG Road',
      lv_city    TYPE string VALUE 'Jaipur',
      lv_state   TYPE string VALUE 'Rajasthan',
      lv_country TYPE string VALUE 'India',
      lv_address TYPE string.

CONCATENATE lv_street lv_city lv_state lv_country
  INTO lv_address SEPARATED BY ', '.

WRITE lv_address.
```

### Output:
```text
MG Road, Jaipur, Rajasthan, India
```

---

## STRLEN — Finding the Length of a String

The `STRLEN` function returns the number of characters in a string. This is useful when you need to validate input before processing it, or when you need to format output to a specific width.

### Basic Syntax

```abap
DATA lv_length TYPE i.
lv_length = strlen( lv_string ).
```

### Example 1: Basic Length Check

```abap
REPORT z_strlen_demo.

DATA: lv_name   TYPE string VALUE 'SAP ABAP',
      lv_length TYPE i.

lv_length = strlen( lv_name ).

WRITE: 'Text:', lv_name.
NEW-LINE.
WRITE: 'Length:', lv_length.
```

### Output:
```text
Text: SAP ABAP
Length: 8
```

Notice that the space between "SAP" and "ABAP" is also counted as a character. Spaces are valid characters in a string.

### Example 2: Validating Input Before Database Insert

In real projects, you often need to check if a value will fit into a database column before inserting it. Here is how:

```abap
REPORT z_strlen_validate.

DATA: lv_material TYPE string VALUE 'MATERIAL_NUMBER_THAT_IS_TOO_LONG_FOR_COLUMN',
      lv_length   TYPE i.

lv_length = strlen( lv_material ).

IF lv_length > 18.
  WRITE: 'ERROR: Material number is too long!'.
  WRITE: / 'Current length:', lv_length.
  WRITE: / 'Maximum allowed: 18'.
ELSE.
  WRITE: 'Material number is valid:', lv_material.
ENDIF.
```

### Output:
```text
ERROR: Material number is too long!
Current length: 43
Maximum allowed: 18
```

This kind of validation prevents runtime errors when you try to insert oversized data into database tables. It is a small check that saves you from big headaches later.

---

## CONDENSE — Removing Extra Spaces

The `CONDENSE` statement removes leading spaces, trailing spaces, and replaces multiple consecutive spaces with a single space. If you add the `NO-GAPS` option, it removes all spaces entirely.

### Basic Syntax

```abap
CONDENSE lv_string.          " Removes leading, trailing, and compresses internal spaces
CONDENSE lv_string NO-GAPS.  " Removes ALL spaces
```

### Example 1: Cleaning Up User Input

```abap
REPORT z_condense_demo.

DATA lv_input TYPE string VALUE '   SAP    ABAP   Programming   '.

WRITE: 'Before CONDENSE:', lv_input, '|'.
NEW-LINE.

CONDENSE lv_input.

WRITE: 'After CONDENSE:', lv_input, '|'.
```

### Output:
```text
Before CONDENSE: SAP    ABAP   Programming    |
After CONDENSE: SAP ABAP Programming |
```

The extra spaces at the beginning, end, and between words are all cleaned up. Each word now has exactly one space between them.

### Example 2: Removing All Spaces with NO-GAPS

```abap
REPORT z_condense_nogaps.

DATA lv_phone TYPE string VALUE '91 98765 43210'.

WRITE: 'Before:', lv_phone.
NEW-LINE.

CONDENSE lv_phone NO-GAPS.

WRITE: 'After:', lv_phone.
```

### Output:
```text
Before: 91 98765 43210
After: 919876543210
```

This is really handy when you are processing phone numbers, account numbers, or any data where spaces need to be completely removed before saving to a database.

---

## TRANSLATE — Changing Character Case

The `TRANSLATE` statement converts a string to uppercase or lowercase. You can also use it to replace specific characters with other characters.

### Basic Syntax

```abap
TRANSLATE lv_string TO UPPER CASE.
TRANSLATE lv_string TO LOWER CASE.
```

### Example: Converting Text Case

```abap
REPORT z_translate_demo.

DATA lv_text TYPE string VALUE 'Hello World from SAP ABAP'.

WRITE: 'Original:', lv_text.
NEW-LINE.

TRANSLATE lv_text TO UPPER CASE.
WRITE: 'Uppercase:', lv_text.
NEW-LINE.

TRANSLATE lv_text TO LOWER CASE.
WRITE: 'Lowercase:', lv_text.
```

### Output:
```text
Original: Hello World from SAP ABAP
Uppercase: HELLO WORLD FROM SAP ABAP
Lowercase: hello world from sap abap
```

You will use this a lot when comparing strings. SAP database fields are usually stored in uppercase, so you need to convert user input to uppercase before running SELECT queries. Otherwise your WHERE clause will not match anything.

---

## REPLACE — Replacing Parts of a String

The `REPLACE` statement finds a specific part of a string and replaces it with something else.

### Basic Syntax

```abap
REPLACE 'old_text' IN lv_string WITH 'new_text'.
REPLACE ALL OCCURRENCES OF 'old_text' IN lv_string WITH 'new_text'.
```

### Example 1: Replacing a Single Occurrence

```abap
REPORT z_replace_demo.

DATA lv_path TYPE string VALUE '/usr/sap/data/old_report.txt'.

WRITE: 'Before:', lv_path.
NEW-LINE.

REPLACE 'old_report' IN lv_path WITH 'new_report'.

WRITE: 'After:', lv_path.
```

### Output:
```text
Before: /usr/sap/data/old_report.txt
After: /usr/sap/data/new_report.txt
```

### Example 2: Replacing All Occurrences

```abap
REPORT z_replace_all.

DATA lv_csv TYPE string VALUE 'Name,Age,City,Country'.

WRITE: 'CSV:', lv_csv.
NEW-LINE.

REPLACE ALL OCCURRENCES OF ',' IN lv_csv WITH ' | '.

WRITE: 'Formatted:', lv_csv.
```

### Output:
```text
CSV: Name,Age,City,Country
Formatted: Name | Age | City | Country
```

The first version replaces only the first match it finds. When you add `ALL OCCURRENCES OF`, it replaces every single match in the string. Use whichever fits your situation.

---

## SPLIT — Breaking a String into Parts

The `SPLIT` statement takes a single string and breaks it into multiple pieces based on a separator character. This is the opposite of CONCATENATE.

### Basic Syntax

```abap
SPLIT lv_string AT separator INTO lv_part1 lv_part2 lv_part3.
```

You can also split into an internal table if you do not know how many parts there will be:

```abap
SPLIT lv_string AT separator INTO TABLE lt_parts.
```

### Example 1: Splitting a Full Name

```abap
REPORT z_split_demo.

DATA: lv_fullname  TYPE string VALUE 'Daksh Dedha',
      lv_firstname TYPE string,
      lv_lastname  TYPE string.

SPLIT lv_fullname AT space INTO lv_firstname lv_lastname.

WRITE: 'First Name:', lv_firstname.
NEW-LINE.
WRITE: 'Last Name:', lv_lastname.
```

### Output:
```text
First Name: Daksh
Last Name: Dedha
```

### Example 2: Splitting CSV Data into an Internal Table

This is extremely useful when processing comma-separated files:

```abap
REPORT z_split_csv.

DATA: lv_csv   TYPE string VALUE 'Mumbai,Delhi,Jaipur,Bangalore,Chennai',
      lt_cities TYPE TABLE OF string,
      lv_city   TYPE string.

SPLIT lv_csv AT ',' INTO TABLE lt_cities.

LOOP AT lt_cities INTO lv_city.
  WRITE: / lv_city.
ENDLOOP.
```

### Output:
```text
Mumbai
Delhi
Jaipur
Bangalore
Chennai
```

When you are reading data from external files (like CSV uploads from business users), SPLIT is your best friend. You read each line as a single string, then split it at the comma to get individual field values.

---

## FIND — Searching Inside a String

The `FIND` statement searches for a pattern inside a string and tells you where it is located.

### Basic Syntax

```abap
FIND 'search_text' IN lv_string.
IF sy-subrc = 0.
  " Found!
ENDIF.
```

### Example: Checking if a String Contains a Keyword

```abap
REPORT z_find_demo.

DATA lv_email TYPE string VALUE 'support@learnsapfree.com'.

FIND '@' IN lv_email.

IF sy-subrc = 0.
  WRITE: 'Valid email format: @ symbol found'.
ELSE.
  WRITE: 'Invalid email: missing @ symbol'.
ENDIF.
```

### Output:
```text
Valid email format: @ symbol found
```

The system variable `sy-subrc` is set to 0 if the search text was found, and 4 if it was not found. This is the standard way to check results of many ABAP operations.

---

## Quick Reference Table

Here is a summary of all the string operations we covered, in one place:

| Operation | Purpose | Example |
| :--- | :--- | :--- |
| **CONCATENATE** | Join strings together | `CONCATENATE a b INTO c SEPARATED BY space.` |
| **STRLEN** | Get string length | `lv_len = strlen( lv_text ).` |
| **CONDENSE** | Remove extra spaces | `CONDENSE lv_text NO-GAPS.` |
| **TRANSLATE** | Change case | `TRANSLATE lv_text TO UPPER CASE.` |
| **REPLACE** | Replace text in a string | `REPLACE ALL OCCURRENCES OF ',' IN lv_csv WITH ';'.` |
| **SPLIT** | Break string into parts | `SPLIT lv_csv AT ',' INTO TABLE lt_parts.` |
| **FIND** | Search inside a string | `FIND '@' IN lv_email.` |

Keep this table handy. You will refer back to it often when writing ABAP programs.

---

## Common Mistakes to Avoid

### 1. Forgetting the INTO Clause in CONCATENATE
The result has to go somewhere. You must always specify `INTO`.
* **Wrong**: `CONCATENATE lv_a lv_b.`
* **Right**: `CONCATENATE lv_a lv_b INTO lv_c.`

### 2. Using CONDENSE on a Fixed-Length Variable Without Understanding the Effect
If you have a `TYPE c LENGTH 20` variable and you condense it, the trailing spaces are removed visually but the variable still occupies 20 characters in memory. For flexible behavior, use `TYPE string` instead.

### 3. Not Checking sy-subrc After FIND
`FIND` does not throw an error if the text is not found. It silently sets `sy-subrc` to 4. Always check `sy-subrc` after using FIND, otherwise your program might continue with wrong assumptions.

### 4. Forgetting SEPARATED BY in CONCATENATE
If you just write `CONCATENATE lv_first lv_last INTO lv_full`, the result will be `DakshDedha` with no space. Always add `SEPARATED BY space` when you want words separated.

---

## Interactive Checkpoints

Review these self-assessment cards to test your understanding of string operations:

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> What is the difference between CONDENSE and CONDENSE NO-GAPS?</summary>
<div class="details-content">
Without NO-GAPS, CONDENSE removes leading and trailing spaces and compresses multiple internal spaces into single spaces. With NO-GAPS, it removes absolutely ALL spaces from the string, including the ones between words. Use CONDENSE without NO-GAPS for cleaning up user input (you still want words separated). Use NO-GAPS for phone numbers, account numbers, or IDs where no spaces should exist.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> How do you replace ALL commas in a string, not just the first one?</summary>
<div class="details-content">
You need to use the ALL OCCURRENCES OF addition. The basic REPLACE statement only replaces the first match. To replace every occurrence, write: REPLACE ALL OCCURRENCES OF ',' IN lv_string WITH ';'. Without the ALL OCCURRENCES OF part, only the very first comma would be replaced and the rest would remain unchanged.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> After using the FIND statement, how do you check whether the search text was actually found?</summary>
<div class="details-content">
You check the system variable sy-subrc immediately after the FIND statement. If sy-subrc equals 0, the text was found. If sy-subrc equals 4, the text was not found. This is the standard pattern in ABAP for checking the result of operations like FIND, READ TABLE, SELECT, and many others.
</div>
</details>

---

## Summary

String operations are one of those things that seem simple when you read about them, but you will use them constantly in your daily work. Whether you are building file names, cleaning up user input, validating data lengths, parsing CSV files, or formatting output reports — these operations are everywhere in real SAP projects.

The most important ones to memorize are CONCATENATE for joining, STRLEN for length checks, CONDENSE for space cleanup, and SPLIT for breaking strings apart. Once you are comfortable with these four, the rest will come naturally as you encounter specific needs in your projects.

Practice each example in SE38, modify them, break them on purpose, and fix them again. That is how you actually learn ABAP — not by reading, but by typing code and seeing what happens.
