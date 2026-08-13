---
title: "SAP ABAP Debugging — How to Find and Fix Bugs Like a Senior Developer"
description: "Complete guide to ABAP debugging. Learn how to use the ABAP Debugger, set breakpoints, watchpoints, inspect variables, debug background jobs, and fix real bugs step by step."
pubDate: "2026-07-27"
category: "ABAP Programming"
author: "Daksh"
image: "/abap-debugging-thumbnail.png"
readingTime: "14 min read"
order: 55
keywords:
  - "abap debugging"
  - "sap abap debugger"
  - "abap breakpoint"
  - "abap watchpoint"
  - "debug abap program"
  - "abap debugger new"
  - "debug background job sap"
  - "abap debugging techniques"
  - "se38 debugging"
  - "sap abap troubleshooting"
---

![SAP ABAP Debugging Guide](/abap-debugging-thumbnail.png)

I have a confession. For the first 3 months of my ABAP career, my debugging technique was adding WRITE statements everywhere.

Something not working? Add a WRITE statement. Wrong value in a variable? Add another WRITE statement. Loop behaving strangely? WRITE inside the loop with the loop counter. My programs looked like crime scenes — WRITE statements scattered across 200 lines of code, half of them commented out from the last debugging session, half still active and printing garbage on the output screen.

Then a senior developer sat next to me for 20 minutes and showed me the ABAP Debugger. Those 20 minutes probably saved me hundreds of hours over the following years. The debugger lets you pause your program at any line, look at every variable, step through the code line by line, and watch exactly what happens. No WRITE statements needed.

This post is those 20 minutes, written down.

---

## Opening the debugger — 3 ways

There are 3 ways to start debugging an ABAP program. Each one is useful in different situations.

### Way 1: /h in the command field

This is the quickest method. Type `/h` in the SAP GUI command field (the text box at the top of the screen) and press Enter. SAP will display a message: "Debugging switched on."

Now execute your program normally (run a report, execute a transaction, click a button). The debugger will automatically stop at the first executable ABAP statement.

This works in any SAP transaction. Want to debug what happens when you save a purchase order in ME21N? Type `/h`, press Enter, then click Save. The debugger pops up and you can step through the saving logic line by line.

### Way 2: BREAK-POINT statement in code

Add this line anywhere in your ABAP code:

```abap
BREAK-POINT.
```

When the program hits this line, it stops and opens the debugger. This is useful when you know exactly where you want to start debugging.

There's also a user-specific version:

```abap
BREAK your_username.
```

This only triggers the breakpoint for the specified user. Everyone else runs the program normally. Useful when you're debugging on a shared development system and don't want to interrupt other developers.

**Important:** Remove BREAK-POINT statements before transporting to production. SAP will actually warn you about this during transport checks, but I've seen forgotten BREAK-POINTs halt production batch jobs at 2 AM. Don't be that developer.

### Way 3: Set an external breakpoint in SE38/SE80

Open your program in SE38 or SE80. Navigate to the line where you want to stop. Click in the gray margin to the left of the line number (or position your cursor on the line and press the breakpoint button in the toolbar).

A small stop-sign icon appears next to the line. This is an external breakpoint — it's stored in the system and triggers whenever your user executes that line.

External breakpoints persist across sessions (for about 2 hours by default). You can manage them via menu: Utilities → Breakpoints → Display.

---

## The debugger screen — what you're looking at

When the debugger opens, you'll see something like this:

```
┌──────────────────────────────────────────────────┐
│  Source Code (top half of screen)                 │
│  ─────────────────────────────────────            │
│  10: DATA: lv_name TYPE string.                   │
│  11: DATA: lv_count TYPE i.                       │
│> 12: lv_name = 'SAP'.                             │  ← current line
│  13: lv_count = lv_count + 1.                     │
│  14: WRITE: / lv_name, lv_count.                  │
├──────────────────────────────────────────────────┤
│  Variable Display (bottom half)                   │
│  ─────────────────────────────────────            │
│  Variable    │ Value          │ Type              │
│  lv_name     │ (initial)      │ STRING            │
│  lv_count    │ 0              │ I                 │
│  sy-subrc    │ 0              │ I                 │
└──────────────────────────────────────────────────┘
```

The yellow arrow (`>`) shows the current line — the line that will execute NEXT when you step forward.

The bottom half shows variable values. You can double-click any variable name in the source code to add it to the variable display area. Double-click `lv_name` in line 12, and it appears in the bottom panel showing its current value.

---

## The 4 stepping buttons — your primary controls

These 4 buttons are at the top of the debugger screen. They control how you move through the code.

| Button | Shortcut | What it does |
| :--- | :--- | :--- |
| **Single Step (F5)** | F5 | Execute the current line and move to the next one. If the current line calls a subroutine or function module, you go INSIDE that subroutine. |
| **Execute (F6)** | F6 | Execute the current line and move to the next one. If the current line calls a subroutine, the entire subroutine runs and you land on the line AFTER the call. You don't go inside. |
| **Return (F7)** | F7 | Run all remaining lines in the current subroutine/function and return to the calling program. Useful when you accidentally stepped into a function module you don't care about. |
| **Continue (F8)** | F8 | Run the program until the next breakpoint. If there are no more breakpoints, the program runs to completion. |

**When to use which:**

- **F5 (Single Step)** when you want to see every single line that executes, including inside function calls. Use this when you're hunting a specific bug and need maximum visibility.
- **F6 (Execute)** when you want to step through your main program but skip the internals of function modules and methods. This is your default stepping mode for most debugging.
- **F7 (Return)** when you pressed F5 by accident and ended up 15 levels deep inside SAP standard code. F7 gets you back out.
- **F8 (Continue)** when you've set breakpoints at the important spots and want to jump between them without stepping through every line.

A typical debugging flow: F8 to jump to your first breakpoint, F6 to step through your logic, F5 when you hit a suspicious function call and want to go inside, F7 to come back out, F6 to continue.

---

## Inspecting variables

The bottom panel of the debugger shows variable values. But you can do much more than just look.

### Double-click to inspect

Double-click any variable name in the source code. It appears in the variable display. Works for simple variables, structures, and internal tables.

### Internal table display

When you double-click an internal table variable, the debugger shows the table contents in a grid. You can see every row and column. This is one of the most useful features — you can check exactly what data your SELECT loaded, what the LOOP is iterating over, and what the APPEND just added.

Click the "Table" tab (or press the internal table icon) to switch to the table view. The display shows:

```
Row │ MATNR           │ MAKTX              │ MEINS
────┼─────────────────┼────────────────────┼──────
  1 │ 000000001000    │ Raw Material A     │ KG
  2 │ 000000001001    │ Finished Product B │ EA
  3 │ 000000001002    │ Semifinished C     │ KG
```

You can scroll through thousands of rows. You can also filter and search within the table display.

### Changing variable values on the fly

This is powerful. In the variable display, you can overwrite a variable's value while the program is paused.

Click on the value field, type a new value, press Enter. The variable now has your new value. When you continue execution, the program uses your modified value.

Why is this useful? Say your program fails when processing material number `000000005555` but works fine for all other materials. Instead of re-running the program with that specific material as input, you can pause at the right spot, change the variable to `000000005555`, and continue. Saves time.

You can also use this to skip error conditions. Your program checks `IF lv_status = 'BLOCKED'.` and stops. Change `lv_status` to `'ACTIVE'` in the debugger and continue. The program skips the block and you can see what happens next. (Don't do this in production. Obviously.)

---

## Breakpoints — stopping where you want

You've already seen basic breakpoints. But there are several types.

### Session breakpoints

Set by clicking in the margin of the debugger. These last for your current SAP session. When you log off, they're gone.

### External breakpoints

Set in SE38/SE80 before running the program. These persist for about 2 hours and work across sessions. Useful when you need to debug a program triggered by another user or process.

### Breakpoint at statement

In the debugger, go to Breakpoints → Breakpoint At → Statement. Enter a keyword like `SELECT`, `LOOP`, `CALL FUNCTION`, or `MESSAGE`.

The debugger will stop at EVERY occurrence of that statement in the program. Incredibly useful when you know the program is doing a SELECT that returns wrong data, but you don't know which SELECT (and there are 15 of them).

### Breakpoint at event

Breakpoints → Breakpoint At → Event. You can set breakpoints on ABAP events like `AT SELECTION-SCREEN`, `START-OF-SELECTION`, `END-OF-SELECTION`.

---

## Watchpoints — the underrated feature

Watchpoints are probably the most underused debugging feature, and they're one of the most useful.

A watchpoint monitors a variable. The debugger runs normally, and stops only when that variable's value changes (or reaches a specific value you define).

### Setting a watchpoint

In the debugger: Watchpoints → Create. Enter the variable name.

You can set two types:
1. **Stop when value changes:** The debugger pauses whenever the variable gets a new value. Useful when you know `lv_total` ends up wrong but you don't know which line corrupts it.
2. **Stop when value equals X:** The debugger pauses only when the variable hits a specific value. Example: stop when `sy-subrc = 4` (meaning a table read failed).

### Practical example

Your report calculates a total price. The final total shows 15,000 but should be 12,000. Somewhere in the code, an extra 3,000 is being added.

Set a watchpoint on `lv_total_price` with condition "stop when value changes." Press F8. The debugger will stop at the exact line where `lv_total_price` gets modified. Step through each modification and you'll find the one adding the wrong amount.

Without watchpoints, you'd have to manually step through potentially hundreds of lines looking for the moment the value goes wrong. With watchpoints, the debugger takes you directly there.

---

## Debugging different program types

### Reports (SE38)

Straightforward. Open the report, set a breakpoint or type /h, run it. The debugger opens.

### Transactions (like VA01, ME21N)

Type `/h` in the command field, press Enter, then perform the action you want to debug (click Save, press Enter on a screen, etc.). The debugger catches the next ABAP processing.

If you want to debug a specific user exit or BADI that fires during the transaction, set an external breakpoint in the relevant include program first. Then use the transaction normally — the debugger will stop at your breakpoint.

### Function modules (SE37)

Open the function module in SE37. Click Test/Execute (F8). Before pressing Execute on the test screen, type `/h` in the command field. Now click Execute. The debugger opens at the first line of the function module.

### Background jobs (SM37)

This one's tricky. You can't type `/h` in a background job. Instead:

1. Open transaction **SM37** and find your background job.
2. Check which program the job executes.
3. Open that program in SE38 and set an **external breakpoint** on the line you want to debug.
4. Go to the job in SM37. If the job hasn't started yet, wait for it to start. Or for testing, rerun the job.
5. When the background job hits your breakpoint, the debugger opens in your SAP GUI session.

For this to work, your external breakpoint must be set with the same user ID that the background job runs under. If the job runs as user `BATCH_USER`, you need to set the breakpoint for that user. In the debugger settings (Utilities → Settings → Debugging), you can specify which user's breakpoints to activate.

Alternative: Change the job to run in dialog mode temporarily (for testing only). In SM36, when scheduling, there's an option to run as a dialog process. This lets you debug normally.

### OData services / HTTP calls

When debugging OData services called from Fiori apps:

1. Open the OData service class or the relevant CDS view implementation in SE24/SE80.
2. Set an external breakpoint.
3. Trigger the OData call from the Fiori app in your browser.
4. The debugger opens in your SAP GUI session.

For this to work, the HTTP request must come from a user whose breakpoints are set. If the Fiori app runs with a different service user, you'll need to adjust.

---

## The New Debugger vs Classic Debugger

SAP has two debugger interfaces:

**Classic Debugger:** The older interface. Runs within the same SAP GUI session as your program. This means if your program does a COMMIT WORK, the debugger session is also affected.

**New Debugger:** The modern interface (available since NetWeaver 7.0). Runs in a separate external session. Your program runs in one session, the debugger runs in another. This is the default on most modern systems.

The New Debugger is better in almost every way:
- Cleaner UI with tabbed panels for variables, call stack, breakpoints.
- Can debug programs that use COMMIT WORK or ROLLBACK WORK without issues.
- Better internal table display with filtering and sorting.
- Object-oriented debugging support (class methods, inheritance).

To switch between them: Settings → Switch Debugger (or in your user settings under Utilities → Settings → ABAP Editor → Debugging).

I'd recommend always using the New Debugger unless you're on a very old system that doesn't support it.

---

## The Call Stack — knowing where you are

The Call Stack panel shows the chain of calls that led to the current line. Example:

```
1. Z_MY_REPORT           → Line 45 (PERFORM calculate_total)
2. FORM calculate_total   → Line 12 (CALL FUNCTION 'Z_GET_PRICE')
3. Z_GET_PRICE            → Line 8  (SELECT SINGLE price FROM mara...)
```

Reading from bottom to top: the program `Z_MY_REPORT` called subroutine `calculate_total`, which called function module `Z_GET_PRICE`, which is currently executing a SELECT at line 8.

The call stack is essential when you land in the middle of SAP standard code and think "how did I get here?" Click any level in the call stack to jump to that calling point.

---

## Quick checkpoint

**Question 1:** You're debugging a report and accidentally pressed F5 into a SAP standard function module that has 500 lines. You don't care about this function. How do you get back to your program quickly?

> **Answer:** Press F7 (Return). It runs the rest of the function module and brings you back to the line after the CALL FUNCTION in your program.

**Question 2:** A background job creates wrong financial postings, but only for company code 2000. How would you debug it?

> **Answer:** Open the job's program in SE38. Set an external breakpoint at the posting logic. Set a watchpoint on the company code variable with condition "value equals 2000." Rerun the background job. The debugger opens when the program processes company code 2000.

**Question 3:** Your program has 12 SELECT statements. One of them returns wrong data, but you don't know which one. What's the fastest debugging approach?

> **Answer:** Set a breakpoint at statement "SELECT" (Breakpoints → Breakpoint At → Statement → SELECT). Press F8 to jump between each SELECT. At each stop, check the variables in the WHERE clause and the result.

---

## Common mistakes

**Mistake 1: Leaving BREAK-POINT statements in production code.** This halts the program for any user who triggers it. In background jobs, it causes the job to go into "active" status and never complete. Always remove BREAK-POINT before transporting. Use external breakpoints or `/h` instead.

**Mistake 2: Stepping through SAP standard code for hours.** SAP standard programs are massive. A single BAPI can have 10,000 lines of code across dozens of includes. Don't step through all of it with F5. Use F6 to execute standard function calls, and only F5 into the specific call you're investigating.

**Mistake 3: Not using watchpoints.** I see developers stepping through 500-line loops looking for the iteration where a value goes wrong. Set a watchpoint. Let the debugger find it for you in 2 seconds.

**Mistake 4: Debugging on a production system.** It's possible (with the right authorizations), but dangerous. If you pause a program in the debugger and walk away for lunch, that program holds database locks the entire time. Other users get locked out. Debug in development or quality systems whenever possible.

**Mistake 5: Not checking SY-SUBRC after operations.** In the debugger, always look at `sy-subrc` after SELECT, READ TABLE, CALL FUNCTION, and similar operations. A value of 0 means success. Anything else means something failed. This single variable tells you more about what went wrong than 10 minutes of stepping through code.

---

## Advanced tips

**Tip 1: Conditional breakpoints.** In the New Debugger, you can add a condition to a breakpoint. Right-click the breakpoint → Edit Condition. Enter something like `lv_matnr = '000000001000'`. The debugger only stops when the condition is true. This is a lifesaver when debugging loops that run 10,000 times but you only care about one specific record.

**Tip 2: Script-based debugging.** The New Debugger supports ABAP Debugger Scripting. You can write small ABAP scripts that run at each debugger step, automatically logging variable values, counting iterations, or even modifying data. This is advanced, but incredibly powerful for complex debugging scenarios.

**Tip 3: Memory analysis.** The debugger has a memory analysis tool (Go To → Memory Analysis in the New Debugger). It shows how much memory your program is using, which internal tables are the biggest, and where memory leaks might be hiding. Useful for programs that crash with STORAGE_PARAMETERS_WRONG_SET or TSV_TNEW_PAGE_ALLOC_FAILED errors.

**Tip 4: SQL Trace (ST05) as a complement to debugging.** When debugging performance issues, the ABAP Debugger shows you the logic, but transaction ST05 (SQL Trace) shows you every database operation with execution times. Run the SQL trace alongside your debugging session to identify slow queries.

---

## My debugging checklist

When I'm debugging an unfamiliar program (especially someone else's code), I follow this sequence:

1. **Read the program first.** Spend 5 minutes understanding the flow before touching the debugger. Know what the program is supposed to do.
2. **Reproduce the bug.** Run the program with the same inputs that cause the problem. Confirm the bug happens consistently.
3. **Set strategic breakpoints.** Not at line 1. Set them at the critical business logic — the calculation that's wrong, the database update that's writing bad data, the function call that's returning an error.
4. **Check variables before and after.** At each breakpoint, note the variable values. Is the input to the calculation correct? Is the output wrong? That tells you the bug is inside that calculation.
5. **Narrow the scope.** Once I know which section has the bug, I set more breakpoints inside that section and remove the others. Repeat until I'm looking at the exact line.
6. **Fix, test, confirm.** Make the fix, re-run with the same inputs, verify the output is correct. Then test with 2-3 other input combinations to make sure the fix doesn't break anything else.

Usually takes 15-30 minutes for straightforward bugs. Complex ones (especially in SAP standard exits or multi-step processes) can take longer, but the approach stays the same. Narrow it down. Don't guess.

---

*Related reads on this site:*
- [First ABAP Program](/blog/first-abap-program-beginners-guide) — writing your first ABAP report
- [ABAP Subroutines (FORM/PERFORM)](/blog/sap-abap-subroutines-form-perform) — modularizing code that you'll need to debug
- [Function Modules in ABAP](/blog/sap-abap-function-modules) — understanding the functions you'll step into with F5
