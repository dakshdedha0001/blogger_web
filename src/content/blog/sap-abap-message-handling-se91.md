---
title: "Message Handling in SAP ABAP — Complete SE91 Message Classes Guide"
description: "Master SAP ABAP message handling. Learn how to create message classes in transaction SE91, use the MESSAGE statement, handle error types A E W I S X, and pass placeholders."
pubDate: "2026-08-03"
category: "ABAP Programming"
author: "Daksh"
image: "/sap-abap-messages-thumbnail.png"
readingTime: "13 min read"
order: 62
keywords:
  - "sap abap message handling"
  - "se91 tcode in sap"
  - "abap message statement"
  - "abap message types"
  - "abap se91 message class"
  - "abap sy-msgid sy-msgno"
  - "sap message error types"
  - "abap message with parameters"
  - "abap error handling"
---

![SAP ABAP Message Handling Guide](/sap-abap-messages-thumbnail.png)

When I wrote my first custom ABAP report for a real business user, I used `WRITE` statements to output error messages. If a vendor number didn't exist, my program printed: "Error: Vendor not found."

The senior developer reviewing my code stopped me immediately. "You can't use WRITE statements for validation errors in SAP," he explained. "What if a user runs this program in German? What if an external application calls your program via RFC? What if a batch job runs this overnight at 3 AM?"

A `WRITE` statement only works on an interactive screen for an English-speaking user. It fails completely in background jobs, APIs, multlingual environments, and automated error logs.

SAP solves this using **Message Classes** and the **MESSAGE statement**.

Message handling is how SAP communicates errors, warnings, information, and success notifications across all UI layers, APIs, and background processes.

This guide covers everything you need to know about creating message classes in transaction SE91, using different message types, passing dynamic placeholders, and handling messages in modern ABAP.

---

## What is a Message Class in SAP?

A Message Class is a central repository in the ABAP Dictionary that stores text messages, error notices, and system alerts.

Transaction code: **SE91**

Inside a message class, every message receives a unique 3-digit number (from `000` to `999`).

```text
Message Class: Z_MM_MESSAGES

Number │ Message Short Text
───────┼───────────────────────────────────────────────────
001    │ Vendor &1 does not exist in company code &2.
002    │ Purchase Order &1 saved successfully.
003    │ Quantity cannot be negative or zero.
004    │ Material &1 is blocked for procurement.
```

Notice the `&1` and `&2` in messages 001, 002, and 004. These are dynamic placeholders. At runtime, your ABAP code fills these placeholders with real data values (like actual vendor IDs or material numbers).

---

## Step-by-Step: Creating a Message Class in SE91

Here is how you create your own custom message class from scratch.

---

### Step 1: Open Transaction SE91

Enter `/nSE91` in the SAP GUI command field.

1. In the **Message Class** field, enter your custom name (must start with Z or Y, e.g., `Z_SALES_MSG`).
2. Click **Create**.

---

### Step 2: Add Short Text and Attributes

1. In the **Short Text** field, enter a description (e.g., "Message Class for SD Sales Processing").
2. Select a package (use `$TMP` for local testing or your project transport package).
3. Click Save.

---

### Step 3: Define Messages

Switch to the **Messages** tab.

Enter message numbers and their short text descriptions:

```text
000  Invalid Sales Document Type: &1.
001  Customer &1 is credit blocked.
002  Delivery date cannot be in the past.
003  Sales Order &1 created successfully with &2 items.
```

Click **Save**. Your message class is now active and ready for use in any ABAP program.

---

## The 6 Message Types in ABAP

When you issue a message using the `MESSAGE` statement, you assign it a 1-character **Message Type**.

The message type determines how SAP reacts. Does it stop the program? Does it display a popup? Does it abort the transaction?

```
                    ┌──────────────────────────────┐
                    │      ABAP Message Types      │
                    └──────────────┬───────────────┘
                                   │
      ┌───────────┬────────────┬───┴──────────┬────────────┬───────────┐
      ▼           ▼            ▼              ▼            ▼           ▼
  ┌───────┐   ┌───────┐    ┌───────┐      ┌───────┐    ┌───────┐   ┌───────┐
  │ E (Error) │ A (Abort) │ W (Warning) │ I (Info) │ S (Status)│ X (Exit) │
  └───────┘   └───────┘    └───────┘      └───────┘    └───────┘   └───────┘
```

Here is how each type behaves:

---

### 1. Error Message (Type 'E')

- **Behavior:** Interrupts processing. Displays the error message in red at the bottom status bar of the screen.
- **Screen Reaction:** In selection screens or classical screens, input fields are locked except for the fields where the error occurred. The user must correct the value and press Enter to re-try.
- **Background Jobs:** Causes the background job step to fail with an error log.

```abap
MESSAGE e001(z_sales_msg) WITH lv_kunnr.
```

---

### 2. Abort / Termination Message (Type 'A')

- **Behavior:** Immediately terminates processing. Displays a popup dialog window with a stop icon.
- **Database Reaction:** Automatically triggers a database `ROLLBACK WORK`. All unsaved changes in the current transaction are discarded.
- **Use Case:** Fatal technical errors where continuing processing would corrupt data (e.g., database connection lost, critical configuration missing).

```abap
MESSAGE a002(z_sales_msg).
```

---

### 3. Warning Message (Type 'W')

- **Behavior:** Displays a warning message in yellow at the bottom status bar.
- **User Reaction:** The user can acknowledge the warning by pressing **Enter** to bypass it and continue processing.
- **Use Case:** Non-fatal conditions (e.g., "Stock is low, but order can still be saved").

```abap
MESSAGE w002(z_sales_msg).
```

---

### 4. Information Message (Type 'I')

- **Behavior:** Displays a modal popup window containing the message text with an OK button.
- **Processing:** Once the user clicks OK (or presses Enter), processing continues automatically from the exact line where it paused.

```abap
MESSAGE i003(z_sales_msg) WITH lv_vbeln lv_item_count.
```

---

### 5. Success / Status Message (Type 'S')

- **Behavior:** Displays a green success message at the bottom status bar on the *next* screen.
- **Processing:** Does NOT pause execution. Processing continues without interruption.

```abap
MESSAGE s003(z_sales_msg) WITH lv_vbeln lv_item_count.
```

---

### 6. Exit / Short Dump Message (Type 'X')

- **Behavior:** Forces an immediate ABAP runtime error (Short Dump `MESSAGE_TYPE_X`).
- **Use Case:** Internal assertion failures that should never happen in production code.

```abap
MESSAGE x000(z_sales_msg).
```

---

## Message Type Behavior Matrix

| Message Type | Status Bar Color | Pauses Program? | Triggers Rollback? | Can User Bypass? |
| :--- | :--- | :--- | :--- | :--- |
| **S** (Success) | Green | No | No | N/A |
| **I** (Information) | Popup Dialog | Pauses until OK | No | Yes (click OK) |
| **W** (Warning) | Yellow | Pauses input | No | Yes (press Enter) |
| **E** (Error) | Red | Stops screen flow | No | Must fix input |
| **A** (Abort) | Popup + Cancel | Terminates | **Yes (Rollback)** | No |
| **X** (Short Dump) | Crash Dump | Crashes program | **Yes (Rollback)** | No |

---

## How to Syntax and Issue Messages in Code

ABAP offers several ways to write the `MESSAGE` statement depending on your setup.

---

### Method 1: Specifying Message Class at REPORT Level

If you declare your message class at the very top of your program, you don't need to repeat the class name in every `MESSAGE` call.

```abap
REPORT z_sales_processing MESSAGE-ID z_sales_msg.

DATA: lv_kunnr TYPE kunnr VALUE '0000100045'.

" Uses message 001 from Z_SALES_MSG automatically
MESSAGE e001 WITH lv_kunnr.
```

---

### Method 2: Inline Message Class Declaration

You can specify the message type, number, and message class directly in a single string syntax:

```abap
DATA: lv_vbeln TYPE vbeln VALUE '0090000100',
      lv_count TYPE i VALUE 5.

" Syntax: MESSAGE <type><number>(<message_class>) WITH <var1> <var2> ...
MESSAGE s003(z_sales_msg) WITH lv_vbeln lv_count.
```

---

### Method 3: Dynamic Placeholders (WITH Addition)

You can pass up to 4 variables to fill placeholders `&1`, `&2`, `&3`, `&4` inside a message text using the `WITH` keyword.

Suppose message `001` in class `Z_MM` is defined as:

```text
Purchase Order &1 created for Vendor &2 in Plant &3.
```

In your ABAP program:

```abap
DATA: lv_ebeln TYPE ebeln VALUE '4500000123',
      lv_lifnr TYPE lifnr VALUE 'VEND_100',
      lv_werks TYPE werks_ext VALUE 'PL01'.

MESSAGE s001(z_mm) WITH lv_ebeln lv_lifnr lv_werks.
```

At runtime, SAP replaces `&1` with `4500000123`, `&2` with `VEND_100`, and `&3` with `PL01`.

---

## System Fields for Messages: SY-MSGID, SY-MSGNO, SY-MSGTY, SY-MSGV1

Whenever a `MESSAGE` statement executes, or whenever a BAPI/Function Module returns a message, SAP automatically populates four system variables in memory:

| System Field | What it contains | Example Value |
| :--- | :--- | :--- |
| `sy-msgid` | Message Class ID | `'Z_SALES_MSG'` |
| `sy-msgno` | 3-Digit Message Number | `'001'` |
| `sy-msgty` | Message Type ('E', 'S', 'W', etc.) | `'E'` |
| `sy-msgv1` | Content of 1st placeholder (&1) | `'0000100045'` |
| `sy-msgv2` | Content of 2nd placeholder (&2) | `'PL01'` |
| `sy-msgv3` | Content of 3rd placeholder (&3) | `''` |
| `sy-msgv4` | Content of 4th placeholder (&4) | `''` |

---

### Raising Messages into System Fields without Displaying (INTO Addition)

Sometimes you want to format a message and capture its text inside a string variable without showing it on screen (e.g., when building an API log or writing to an error file).

Use `MESSAGE ... INTO <variable>`:

```abap
DATA: lv_formatted_text TYPE string.

MESSAGE e001(z_sales_msg) WITH '00100045' INTO lv_formatted_text.

" Program does NOT stop. The formatted string is saved in lv_formatted_text.
" System fields sy-msgid, sy-msgno, sy-msgv1 are also populated!
WRITE: / 'Captured Error:', lv_formatted_text.
```

---

## Message Handling in Function Modules and Exceptions

When calling function modules (via `CALL FUNCTION`), function modules can raise exception messages using `RAISING` or `MESSAGE ... RAISING`.

```abap
CALL FUNCTION 'Z_CALCULATE_TAX'
  EXPORTING
    im_amount             = lv_amount
  EXCEPTIONS
    invalid_amount        = 1
    tax_code_missing      = 2
    OTHERS                = 3.

IF sy-subrc <> 0.
  " Function module raised a message and set system fields sy-msgid, sy-msgno!
  MESSAGE ID sy-msgid TYPE 'E' NUMBER sy-msgno
          WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4.
ENDIF.
```

This pattern catches the message emitted inside the function module and re-issues it cleanly in your main program.

---

## Quick Checkpoint — Test your understanding

**Question 1:** What is the difference between Message Type 'E' (Error) and Message Type 'A' (Abort)?

> **Answer:** Type 'E' stops screen processing and forces the user to correct input on the screen. Type 'A' immediately terminates the program with a popup dialog and triggers an automatic database `ROLLBACK WORK` to undo all uncommitted changes.

**Question 2:** Which system fields store the message class name and message number after a message executes?

> **Answer:** `sy-msgid` stores the Message Class name, and `sy-msgno` stores the 3-digit Message Number.

**Question 3:** How do you capture a message's formatted text into a local string variable without displaying any notification to the user?

> **Answer:** Use the `INTO` addition: `MESSAGE e001(z_class) WITH var1 INTO lv_text.`

---

## Common mistakes to avoid

**Mistake 1: Hardcoding text strings directly in the MESSAGE statement.** Writing `MESSAGE 'Vendor does not exist' TYPE 'E'.` is bad practice. Hardcoded text strings cannot be translated into other languages (German, French, Japanese) and lack central management. Always create a message class in SE91.

**Mistake 2: Using Message Type 'E' inside background batch jobs without checking.** In background jobs (SM37), an Error message ('E') terminates the current step. Make sure your background jobs handle errors gracefully using logs or custom return tables rather than crashing the job step unexpectedly.

**Mistake 3: Forgetting that SY-MSGV1 to SY-MSGV4 are overwritten.** Whenever ANY message executes in SAP, `sy-msgv1` through `sy-msgv4` get overwritten immediately. If you need those placeholder values later in your code, copy them to local variables immediately after the call.

```abap
" WRONG: Using sy-msgv1 several lines later after another function call
MESSAGE e001(z_msg) WITH '100'.
CALL FUNCTION 'SOMETHING_ELSE'. " <-- This overwrites sy-msgv1!
WRITE: sy-msgv1. " <-- Wrong value!

" RIGHT: Store immediately
MESSAGE e001(z_msg) WITH '100' INTO DATA(lv_dummy).
DATA(lv_saved_var1) = sy-msgv1.
```

**Mistake 4: Not providing all 4 placeholders when re-issuing `MESSAGE ID`.** When re-raising a captured message using `MESSAGE ID sy-msgid TYPE sy-msgty NUMBER sy-msgno WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4`, always include all four placeholder variables. If you omit `sy-msgv2`, placeholder `&2` will render as blank.

---

## Summary

Message handling is a core pillar of clean SAP development architecture.

By centralizing message texts in transaction **SE91**, using appropriate message types (**E**, **A**, **W**, **I**, **S**, **X**), and leveraging system fields (`sy-msgid`, `sy-msgno`, `sy-msgv1`), you build application programs that are multi-lingual, robust in background jobs, and easy to maintain across enterprise landscapes.

---

*Related reads on this site:*
- [SAP ABAP Debugging Guide](/blog/sap-abap-debugging-guide) — stepping through code and inspecting system fields
- [Function Modules in ABAP](/blog/sap-abap-function-modules) — handling exceptions and importing/exporting parameters
- [SAP ABAP IF-ELSE and CASE Statements](/blog/sap-abap-if-else-statement) — conditional evaluation before raising messages
