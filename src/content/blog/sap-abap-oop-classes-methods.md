---
title: "SAP ABAP Object-Oriented Programming — Classes, Methods, and Interfaces"
description: "Complete guide to SAP ABAP OOP. Learn how to create classes, methods, constructors, interfaces, and inheritance in modern ABAP with real code examples."
pubDate: "2026-08-03"
category: "ABAP Programming"
author: "Daksh"
image: "/sap-abap-oop-thumbnail.png"
readingTime: "15 min read"
order: 65
keywords:
  - "abap oop"
  - "abap classes and methods"
  - "sap abap object oriented"
  - "abap class definition"
  - "abap interface"
  - "abap inheritance"
  - "abap constructor"
  - "abap se24"
  - "abap method call"
  - "sap abap programming"
---

![SAP ABAP Object-Oriented Programming Guide](/sap-abap-oop-thumbnail.png)

The day I first learned ABAP Objects was the day I realized everything I'd written before was wrong.

Not technically wrong. My reports worked. My function modules did the job. But my code was a mess of global variables, nested subroutines, and copy-paste logic spread across 2,000-line programs. Every time I needed to change one business rule, I had to trace dependencies across a dozen FORM routines to make sure nothing broke.

Then a colleague showed me a class he'd built. 80 lines of clean code. Each method did one thing. Instance variables were encapsulated. The constructor validated inputs automatically. He could extend behavior by inheriting the class without touching the original code.

I rewrote my next project using ABAP Objects. The program was 30% shorter. Bug count dropped. Maintenance became simple.

If you're still writing procedural ABAP with FORM/PERFORM and global DATA statements, this guide will change how you think about code structure.

---

## Procedural ABAP vs ABAP Objects — the core difference

In procedural ABAP, your program is a sequence of instructions. Data sits in global variables. Logic lives in subroutines (FORMs) or function modules. Any part of the program can read or modify any variable at any time.

In ABAP Objects, you organize code into **Classes**. A class bundles related data (attributes) and logic (methods) into a single unit. Data inside a class is protected. Outside code can only interact with the class through its public methods.

```
Procedural ABAP                          ABAP Objects

┌──────────────────────┐          ┌──────────────────────────┐
│  REPORT z_proc_demo  │          │  CLASS zcl_order         │
│                      │          │  ├─ Attributes:          │
│  DATA: gv_total,     │          │  │   mv_total (private)  │
│        gv_tax,       │          │  │   mv_tax (private)    │
│        gt_items[].   │          │  │   mt_items (private)  │
│                      │          │  ├─ Methods:             │
│  FORM calc_total.    │          │  │   calculate_total()   │
│    ...               │          │  │   apply_discount()    │
│  ENDFORM.            │          │  │   get_total()         │
│                      │          │  └──────────────────────┘
│  FORM apply_disc.    │
│    ...               │
│  ENDFORM.            │
└──────────────────────┘
```

The class version is self-contained. Nobody outside the class can directly change `mv_total`. They must call `calculate_total()` or `get_total()`. This prevents accidental data corruption and makes the code predictable.

---

## Creating your first ABAP Class

There are two ways to create classes in ABAP: **local classes** (inside a report program) and **global classes** (in the Class Builder, transaction SE24). Let's start with a local class because you can test it immediately.

### Local class example

```abap
REPORT z_oop_demo.

*----------------------------------------------------------------------
* Class Definition
*----------------------------------------------------------------------
CLASS lcl_calculator DEFINITION.
  PUBLIC SECTION.
    METHODS:
      constructor
        IMPORTING iv_name TYPE string,
      add
        IMPORTING iv_a TYPE i
                  iv_b TYPE i
        RETURNING VALUE(rv_result) TYPE i,
      get_name
        RETURNING VALUE(rv_name) TYPE string.

  PRIVATE SECTION.
    DATA: mv_name TYPE string.
ENDCLASS.

*----------------------------------------------------------------------
* Class Implementation
*----------------------------------------------------------------------
CLASS lcl_calculator IMPLEMENTATION.
  METHOD constructor.
    mv_name = iv_name.
    WRITE: / 'Calculator created:', mv_name.
  ENDMETHOD.

  METHOD add.
    rv_result = iv_a + iv_b.
  ENDMETHOD.

  METHOD get_name.
    rv_name = mv_name.
  ENDMETHOD.
ENDCLASS.

*----------------------------------------------------------------------
* Main Program
*----------------------------------------------------------------------
START-OF-SELECTION.
  DATA(lo_calc) = NEW lcl_calculator( iv_name = 'MyCalc' ).
  DATA(lv_sum)  = lo_calc->add( iv_a = 10 iv_b = 25 ).
  WRITE: / 'Sum:', lv_sum.
  WRITE: / 'Name:', lo_calc->get_name( ).
```

### Output:
```
Calculator created: MyCalc
Sum:         35
Name: MyCalc
```

Let me walk through every piece.

---

## Understanding the class structure

### CLASS DEFINITION

The definition block declares what the class looks like from the outside. It lists:
- Which methods exist and what parameters they accept
- Which attributes (data variables) the class holds
- Which sections are PUBLIC, PROTECTED, or PRIVATE

```abap
CLASS lcl_calculator DEFINITION.
  PUBLIC SECTION.
    " Things visible to everyone
  PROTECTED SECTION.
    " Things visible to this class and its subclasses
  PRIVATE SECTION.
    " Things visible only inside this class
ENDCLASS.
```

### CLASS IMPLEMENTATION

The implementation block contains the actual ABAP code for each method.

```abap
CLASS lcl_calculator IMPLEMENTATION.
  METHOD add.
    rv_result = iv_a + iv_b.
  ENDMETHOD.
ENDCLASS.
```

### The Constructor Method

The `constructor` is a special method that runs automatically when you create an object using `NEW`. Use it to initialize attributes, validate inputs, or set default values.

```abap
METHOD constructor.
  IF iv_name IS INITIAL.
    RAISE EXCEPTION TYPE cx_sy_ref_is_initial.
  ENDIF.
  mv_name = iv_name.
ENDMETHOD.
```

Every class can have at most one constructor. It runs exactly once per object instance.

---

## Visibility Sections — PUBLIC, PROTECTED, PRIVATE

These three sections control who can access what.

| Section | Who can access | When to use |
| :--- | :--- | :--- |
| **PUBLIC** | Any code, anywhere | Methods that external code needs to call. The class's "API." |
| **PROTECTED** | This class + child classes (subclasses) | Attributes and methods that subclasses need to inherit but external callers should not touch. |
| **PRIVATE** | Only this class itself | Internal helper methods, data storage, implementation details that nobody else should depend on. |

The general rule: **make everything PRIVATE by default.** Only move things to PUBLIC if external code genuinely needs access. This is called encapsulation, and it's the single most important principle of OOP.

---

## Instance Methods vs Static Methods

### Instance Methods

Instance methods belong to a specific object. You create an object first, then call methods on it.

```abap
DATA(lo_calc) = NEW lcl_calculator( iv_name = 'Calc1' ).
DATA(lv_sum)  = lo_calc->add( iv_a = 5 iv_b = 3 ).
```

The arrow `->` means "call this method on this specific object instance."

### Static Methods (CLASS-METHODS)

Static methods belong to the class itself, not to any specific object. You call them using `=>` without creating an object first.

```abap
CLASS lcl_utility DEFINITION.
  PUBLIC SECTION.
    CLASS-METHODS:
      format_date
        IMPORTING iv_date TYPE sy-datum
        RETURNING VALUE(rv_text) TYPE string.
ENDCLASS.

CLASS lcl_utility IMPLEMENTATION.
  METHOD format_date.
    rv_text = |{ iv_date DATE = USER }|.
  ENDMETHOD.
ENDCLASS.

" Call without creating an object:
DATA(lv_formatted) = lcl_utility=>format_date( iv_date = sy-datum ).
```

Use static methods for utility functions that don't need object state (e.g., date formatting, string parsing, mathematical conversions).

---

## Global Classes — Transaction SE24

Local classes exist only inside one program. If you want to reuse a class across multiple programs, create a **Global Class** in the Class Builder.

Transaction: **SE24**

1. Enter a class name (e.g., `ZCL_INVOICE_PROCESSOR`).
2. Click **Create**.
3. Choose **Class** and click OK.
4. SE24 opens a form-based editor where you define methods, attributes, and parameters using input fields.

Alternatively (and this is my recommendation), use **Eclipse ADT** with ABAP Development Tools. Eclipse provides a text-based class editor where you write the `CLASS ... DEFINITION` and `CLASS ... IMPLEMENTATION` blocks directly, just like local classes. Much faster than clicking through SE24 forms.

---

## Inheritance — Extending Classes

Inheritance lets you create a new class (subclass) that inherits all attributes and methods from an existing class (superclass). The subclass can add new methods or override existing ones.

```abap
*----------------------------------------------------------------------
* Superclass
*----------------------------------------------------------------------
CLASS lcl_shape DEFINITION.
  PUBLIC SECTION.
    METHODS:
      get_area RETURNING VALUE(rv_area) TYPE f.
  PROTECTED SECTION.
    DATA: mv_color TYPE string VALUE 'Red'.
ENDCLASS.

CLASS lcl_shape IMPLEMENTATION.
  METHOD get_area.
    rv_area = 0. " Default - subclasses override this
  ENDMETHOD.
ENDCLASS.

*----------------------------------------------------------------------
* Subclass: Circle
*----------------------------------------------------------------------
CLASS lcl_circle DEFINITION INHERITING FROM lcl_shape.
  PUBLIC SECTION.
    METHODS:
      constructor IMPORTING iv_radius TYPE f,
      get_area REDEFINITION.  " Override parent method
  PRIVATE SECTION.
    DATA: mv_radius TYPE f.
ENDCLASS.

CLASS lcl_circle IMPLEMENTATION.
  METHOD constructor.
    super->constructor( ).  " Call parent constructor first
    mv_radius = iv_radius.
  ENDMETHOD.

  METHOD get_area.
    rv_area = '3.14159' * mv_radius * mv_radius.
  ENDMETHOD.
ENDCLASS.

*----------------------------------------------------------------------
* Usage
*----------------------------------------------------------------------
START-OF-SELECTION.
  DATA(lo_circle) = NEW lcl_circle( iv_radius = '5.0' ).
  WRITE: / 'Area:', lo_circle->get_area( ).  " Output: 78.53975
```

Key points:
- `INHERITING FROM lcl_shape` creates the parent-child relationship.
- `REDEFINITION` overrides the parent's `get_area` method with circle-specific logic.
- `super->constructor( )` calls the parent class constructor before running child-specific initialization.
- The subclass `lcl_circle` can access `mv_color` from the parent (because it's PROTECTED), but external code cannot.

---

## Interfaces — Defining Contracts

An interface defines a set of method signatures without any implementation code. Classes that "implement" the interface must provide the actual code for every method listed.

Why use interfaces? Because they let you write code that works with any class implementing the interface, without knowing the specific class type.

```abap
*----------------------------------------------------------------------
* Interface Definition
*----------------------------------------------------------------------
INTERFACE lif_exportable.
  METHODS:
    export_to_json RETURNING VALUE(rv_json) TYPE string,
    export_to_xml  RETURNING VALUE(rv_xml)  TYPE string.
ENDINTERFACE.

*----------------------------------------------------------------------
* Class implementing the interface
*----------------------------------------------------------------------
CLASS lcl_customer DEFINITION.
  PUBLIC SECTION.
    INTERFACES: lif_exportable.
    METHODS: constructor IMPORTING iv_id TYPE i iv_name TYPE string.
  PRIVATE SECTION.
    DATA: mv_id   TYPE i,
          mv_name TYPE string.
ENDCLASS.

CLASS lcl_customer IMPLEMENTATION.
  METHOD constructor.
    mv_id   = iv_id.
    mv_name = iv_name.
  ENDMETHOD.

  METHOD lif_exportable~export_to_json.
    rv_json = |{{ "id": { mv_id }, "name": "{ mv_name }" }}|.
  ENDMETHOD.

  METHOD lif_exportable~export_to_xml.
    rv_xml = |<customer><id>{ mv_id }</id><name>{ mv_name }</name></customer>|.
  ENDMETHOD.
ENDCLASS.

*----------------------------------------------------------------------
* Usage with interface typing
*----------------------------------------------------------------------
START-OF-SELECTION.
  DATA: lo_exportable TYPE REF TO lif_exportable.
  lo_exportable = NEW lcl_customer( iv_id = 1 iv_name = 'Daksh' ).
  WRITE: / lo_exportable->export_to_json( ).
```

The variable `lo_exportable` is typed as `REF TO lif_exportable`. It doesn't know or care that the object is actually `lcl_customer`. It only knows the object can `export_to_json` and `export_to_xml`. Tomorrow you could swap in `lcl_vendor` or `lcl_product` — as long as they implement `lif_exportable`, the code works unchanged.

---

## Exception Handling with TRY-CATCH

Modern ABAP uses class-based exceptions instead of old-style `SY-SUBRC` checks.

```abap
CLASS lcl_divider DEFINITION.
  PUBLIC SECTION.
    METHODS divide
      IMPORTING iv_a TYPE i iv_b TYPE i
      RETURNING VALUE(rv_result) TYPE f
      RAISING cx_sy_zerodivide.
ENDCLASS.

CLASS lcl_divider IMPLEMENTATION.
  METHOD divide.
    IF iv_b = 0.
      RAISE EXCEPTION TYPE cx_sy_zerodivide.
    ENDIF.
    rv_result = iv_a / iv_b.
  ENDMETHOD.
ENDCLASS.

START-OF-SELECTION.
  DATA(lo_div) = NEW lcl_divider( ).

  TRY.
      DATA(lv_result) = lo_div->divide( iv_a = 10 iv_b = 0 ).
      WRITE: / 'Result:', lv_result.
    CATCH cx_sy_zerodivide INTO DATA(lx_error).
      WRITE: / 'Error caught:', lx_error->get_text( ).
  ENDTRY.
```

The `RAISING` clause in the method signature declares which exceptions the method might throw. The calling code wraps the call in `TRY ... CATCH` to handle failures gracefully.

---

## Quick checkpoint

**Question 1:** What is the difference between `->` and `=>` when calling methods in ABAP Objects?

> **Answer:** `->` calls an instance method on a specific object (e.g., `lo_obj->method( )`). `=>` calls a static class method without needing an object instance (e.g., `lcl_class=>method( )`).

**Question 2:** You want a method that only subclasses can call, but external code cannot. Which visibility section do you use?

> **Answer:** PROTECTED SECTION.

**Question 3:** What keyword do you use in a subclass to override a method from the parent class?

> **Answer:** `REDEFINITION` in the method declaration inside the subclass definition.

---

## Common mistakes

**Mistake 1: Making everything PUBLIC.** If every attribute and method is PUBLIC, you have no encapsulation. Any code anywhere can directly modify your object's internal data, creating unpredictable side effects. Default to PRIVATE. Move to PUBLIC only when genuinely needed.

**Mistake 2: Forgetting `super->constructor( )` in subclass constructors.** If the parent class has a constructor with mandatory IMPORTING parameters, you must call `super->constructor( )` with those parameters in your subclass constructor. Forgetting this causes a syntax error.

**Mistake 3: Creating massive god classes.** A class with 50 methods and 30 attributes is not object-oriented. It's a procedural program wrapped in class syntax. Each class should represent one clear concept. If your class is doing too many things, split it into smaller, focused classes.

**Mistake 4: Using global DATA statements alongside classes.** If you define global variables in your report AND use local classes, you're mixing paradigms. Your class methods will secretly depend on global state, defeating the purpose of encapsulation. Pass data through method parameters instead.

---

*Related reads on this site:*
- [ABAP Subroutines (FORM/PERFORM)](/blog/sap-abap-subroutines-form-perform) — the procedural approach that OOP replaces
- [Function Modules in ABAP](/blog/sap-abap-function-modules) — modular code before classes existed
- [SAP ABAP Debugging Guide](/blog/sap-abap-debugging-guide) — stepping through class methods in the debugger
