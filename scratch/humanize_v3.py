import os

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

replacements = {
    "abap-dictionary.md": [
        (
            "The ABAP Dictionary (also called Data Dictionary) is the central repository in SAP where database objects, structures, and data types are defined and managed. \n\nThink of a big enterprise with thousands of employees, transactions, and forms that contain names, order details, material prices, and currency codes. Someone has to decide what each form looks like, where the data gets stored, and what data validation rules apply. That is exactly what ABAP Dictionary does.",
            "The ABAP Dictionary (often called the Data Dictionary) is the central repository in SAP for defining and managing database objects, structures, and data types. \n\nIn a large enterprise handling thousands of employee records, sales orders, and material prices, you need a system to decide how data is structured, where it is stored, and what validation rules apply. This is exactly what the ABAP Dictionary manages."
        ),
        (
            "> ℹ️ **Note:** The transaction code for opening and maintaining objects in ABAP Dictionary is **SE11**.",
            "> ℹ️ **Note:** Access and maintain ABAP Dictionary objects using transaction code **SE11**."
        ),
        (
            "4. The ABAP Dictionary initial screen will open. You will see several options:",
            "4. The initial ABAP Dictionary screen will display several options:"
        ),
        (
            "between the table definition in ABAP Dictionary and the physical table structure in the database.",
            "between the table definition in the ABAP Dictionary and the physical table structure in the database."
        ),
        (
            "between ABAP Dictionary and the physical database tables.",
            "between the ABAP Dictionary and the physical database tables."
        ),
        (
            "between ABAP Dictionary and database table cluster.",
            "between the ABAP Dictionary and the database table cluster."
        )
    ],
    "sap-abap-domain.md": [
        (
            'description: "Understand the concept of Domains in SAP ABAP, why we use them, their reusability, and the step-by-step process to create a domain in the ABAP Dictionary."',
            'description: "Understand domains in SAP ABAP, their reusability, and the step-by-step process to create a domain in the ABAP Dictionary."'
        ),
        (
            "A **Domain** in SAP is a fundamental object in ABAP Dictionary. It is used to define technical properties of a field, such as its data type, field length, and value range. \n\nUnlike Data Elements which describe how a field appears to end users, a Domain describes how the data is technically stored.",
            "A **Domain** in SAP is a fundamental ABAP Dictionary object. It defines the technical properties of a database field, such as its data type, length, and value range. \n\nWhile data elements determine how fields appear to end users, domains describe how the data is physically stored in the database."
        ),
        (
            "In the SAP system, Domain controls:\n- **Data Type** (e.g. `CHAR`, `NUMC`, `CURR`, `DEC`)\n- **Field Length** (number of characters)\n- **Number Format** (e.g. decimal places)\n- **Value Range** (value lists or interval limits)\n- **Allowed Values**",
            "In SAP, a domain controls:\n- **Data Type** (e.g., `CHAR`, `NUMC`, `CURR`, `DEC`)\n- **Field Length** (number of characters)\n- **Number Format** (decimal places)\n- **Value Range** (value lists or interval limits)\n- **Allowed Values**"
        ),
        (
            "## Why Do We Use Domains in SAP?\n\n1. **Reusability:** A single domain can be reused in multiple fields.\n2. **Consistency:** All fields using the same domain will follow the exact same format and specifications.\n3. **Easy Maintenance:** If technical changes (like length expansion) are needed, they can be made in one place (Domain) and will automatically propagate to all referencing Data Elements and tables.\n4. **Data Validation:** Domains can enforce rules on what data is allowed, keeping the database consistent.",
            "## Benefits of Domains in SAP ABAP\n\n1. **Reusability:** A single domain can support multiple fields across different tables.\n2. **Consistency:** Fields sharing a domain automatically follow identical formatting rules.\n3. **Simple Maintenance:** If you need to expand a field's length, updating the domain propagates the change to all referencing data elements and tables.\n4. **Data Validation:** Domains enforce rules on allowed inputs, protecting database integrity."
        ),
        (
            '## Steps to Create a Domain in SAP (SE11)\n\n1. Open SAP GUI and enter transaction code `SE11` in the command field.\n2. Select the **Domain** radio button on the opening screen.\n3. Enter a custom name starting with \'Z\' or \'Y\' (e.g., `ZEMPNAME`).\n4. Click the **Create** button.\n5. Enter a Short Description (e.g., `"Employee Salary"`).\n6. Fill in the technical characteristics on the **Definition** tab:\n   - Choose a Data Type (e.g., `CHAR`, `NUMC`, `CURR`) from the F4 dropdown list.\n   - Enter the Field Length (e.g. `40` for name characters).\n   - Specify decimal places if using numeric type.\n7. Enter a value range on the **Value Range** tab if you wish to restrict the allowed values.\n8. Save Domain (`CTRL+S`).\n9. Activate Domain (`CTRL+F3`).',
            '## Steps to Create a Domain in SAP (SE11)\n\n1. Open SAP GUI, type `SE11` in the command field, and press **Enter**.\n2. Select the **Domain** radio button.\n3. Enter a custom name starting with \'Z\' or \'Y\' (e.g., `ZEMPNAME`).\n4. Click **Create**.\n5. Enter a Short Description (e.g., `"Employee Salary"`).\n6. Configure the technical properties on the **Definition** tab:\n   - Choose a Data Type (e.g., `CHAR`, `NUMC`, `CURR`) from the F4 list.\n   - Enter the Field Length (e.g., `40` for characters).\n   - Specify decimal places for numeric types.\n7. Set constraints on the **Value Range** tab if you want to restrict allowed inputs.\n8. Save your domain (`CTRL+S`).\n9. Activate the domain (`CTRL+F3`).'
        ),
        (
            '## Conclusion\n\nCreating a Domain in SAP is a simple but critical step in working with ABAP Dictionary. It keeps database field definition consistent and reusable. Once you master Domain definitions, working with Data Elements and database tables becomes straightforward.',
            '## Conclusion\n\nCreating a domain is a fundamental step in building database schemas in the ABAP Dictionary. It ensures field definitions remain consistent and reusable across your applications. Once you understand domain setup, working with data elements and tables becomes natural.'
        )
    ],
    "sap-abap-data-element.md": [
        (
            "A **Data Element** in the SAP ABAP Dictionary describes semantic meaning or appearance of a database field/column to the end user. \n\nWhile a Domain describes technical properties of a field (such as its data type and length), a Data Element defines what the field actually represents inside the business environment.",
            "A **Data Element** in the SAP ABAP Dictionary describes the semantic meaning or appearance of a database field or column to the end user. \n\nWhile domains define the technical properties of a field (such as data type and length), data elements specify what the field actually represents in a business context."
        ),
        (
            "## Why Do We Use Data Elements?\n\nA common question is: *Why not assign Domains directly to table fields?*\n\nIn SAP, database objects are built to support code reusability and scalability. Key advantages of using Data Elements include:\n- **Better Readability:** The field inherits labels and descriptions meaningful to business users.\n- **Reusability:** You can use the same Data Element across multiple database tables.\n- **Consistency:** All screens, column headers, and PDF forms inherit the same field label globally.\n- **Easy Maintenance:** Changing the field description in Data Element updates all referencing database views and tables immediately.",
            "## Why Use Data Elements?\n\nBeginners often ask: *Why not assign domains directly to database table fields?*\n\nSAP database design prioritizes reusability and scaling. Key benefits of data elements include:\n- **Readable Labels:** Fields inherit descriptions that make sense to business users.\n- **Reusability:** The same data element can represent similar fields across multiple tables.\n- **Global Consistency:** Screen inputs, report headers, and PDF forms display the same label.\n- **Simple Maintenance:** Updating the description in a data element instantly modifies all referencing tables and views."
        ),
        (
            "### 1. Short Description\nA brief description of Data Element (e.g., *Data Element for Employee Name*).",
            "### 1. Short Description\nA brief description of the Data Element (e.g., *Data Element for Employee Name*)."
        ),
        (
            "10. Save Data Element (`CTRL+S`).\n11. Activate Data Element (`CTRL+F3`).",
            "10. Save the Data Element (`CTRL+S`).\n11. Activate the Data Element (`CTRL+F3`)."
        ),
        (
            'Reference Data Element `ZEMPNAME_DE` in your database table. The SAP system will automatically handle technical storage rules (40 characters) and display the correct front-end field labels ("Employee Name").',
            'Reference the data element `ZEMPNAME_DE` in your database table. The SAP system automatically handles the physical storage limits (40 characters) and displays the correct labels ("Employee Name") on screens.'
        ),
        (
            "## Conclusion\nA Data Element bridges the technical storage settings of a Domain with the readable field labels required by business users. Understanding this relationship helps developers build structured, maintainable databases inside the SAP environment.",
            "## Conclusion\nA data element bridges a domain's technical specifications with the readable labels required by business users. Mastering this relationship helps you build highly structured, maintainable databases in SAP."
        )
    ],
    "sap-abap-structure.md": [
        (
            'title: "How to Create Structure in SAP ABAP (SE11) – Step-by-Step Beginner Guide"',
            'title: "How to Create a Structure in SAP ABAP (SE11) – Step-by-Step Guide"'
        ),
        (
            "# How to Create Structure in SAP ABAP (SE11) – Step-by-Step Beginner Guide\n\nWhen learning SAP ABAP, you will often come across terms like Domain, Data Element, Table, and Structure. After you understand what Domains and Data Elements are, the next important concept to learn is the **Structure**.\n\nStructures in SAP ABAP are a widely used objects because it helps developers organize related fields together without storing any data in the database.\n\nIn this blog, we will learn what structures in SAP ABAP are, why it is used, how it differs from a table, and how to create structures in SAP using transaction code **SE11**.",
            "# How to Create a Structure in SAP ABAP (SE11) – Step-by-Step Guide\n\nWhen learning SAP ABAP, you will encounter terms like Domain, Data Element, Table, and Structure. Once you understand domains and data elements, the next critical concept to master is the **Structure**.\n\nStructures in SAP ABAP are widely used because they help developers group related fields together without writing data to the physical database.\n\nIn this guide, we will explore what structures are, why they are used, how they differ from database tables, and how to create them in SAP using transaction code **SE11**."
        ),
        (
            "## What is a Structure in SAP ABAP?\n\nA **Structure** in SAP ABAP is a collection of fields grouped together under a single object. It is used to organize related data fields but does not store any data physically in the database. Think of structures in SAP ABAP as a template or blueprint that defines how data should look.\n\nFor example, if you want to represent *Employee information*, you may need the following fields:\n*   Employee ID\n*   Employee Name\n*   Department\n*   Salary\n\nInstead of defining these fields repeatedly in multiple programs, you can create structures in SAP ABAP and reuse it wherever needed.",
            "## What is a Structure in SAP ABAP?\n\nA **Structure** is a collection of fields grouped under a single definition. It organizes related data fields but does not store any records physically in the database. Think of a structure as a reusable data template or blueprint.\n\nFor example, to represent employee information, you might need:\n*   Employee ID\n*   Employee Name\n*   Department\n*   Salary\n\nInstead of defining these fields manually in every program, you can define a single structure in the ABAP Dictionary and reference it wherever needed."
        ),
        (
            "## Steps to Create Structures in SAP ABAP",
            "## Steps to Create a Structure in SAP ABAP"
        ),
        (
            "### Step 7: Save structures\nClick the **Save** icon or press `Ctrl + S`. SAP will ask for a package. For practice purposes, select **Local Object** (or assign it to the **`$TMP`** package).\n\n---\n\n### Step 8: Check Syntax\nClick the Check icon or press `Ctrl + F2`. SAP validates structures definition. If correct, no error messages will appear.\n\n---\n\n### Step 9: Activate structures\nClick the **Activate** icon or press `Ctrl + F3`. Confirm the activation on the dialog box. Your structure is now active and ready to be referenced in ABAP programs.",
            "### Step 7: Save the Structure\nClick the **Save** icon or press `Ctrl + S`. When SAP prompts you for a package, choose **Local Object** (or `$TMP`) for local practice.\n\n---\n\n### Step 8: Check Syntax\nClick the **Check** icon or press `Ctrl + F2` to run a syntax check. SAP validates the structure's definition.\n\n---\n\n### Step 9: Activate the Structure\nClick the **Activate** icon or press `Ctrl + F3` and confirm. Your structure is now active and ready to be used in programs."
        ),
        (
            "Every row of `lt_employee` will now follow the exact field layout defined in structure.",
            "Every row of `lt_employee` will follow the exact field layout defined in the structure."
        ),
        (
            "A **Structure** is a design-time definition inside ABAP Dictionary (SE11). A **Work Area** is a runtime variable created inside a program using the `TYPE` of structures to store one row of data in memory.",
            "A **Structure** is a design-time schema defined in the ABAP Dictionary (SE11). A **Work Area** is a runtime variable in your program, typed after the structure, to hold a single row of data in memory."
        ),
        (
            "1.  **Reusability**: Define once in SE11 and reuse in hundreds of programs.\n2.  **Better Organization**: Grouping related variables prevents messy declarations.\n3.  **Faster Development**: Speeds up coding through pre-existing layouts.\n4.  **Easy Maintenance**: Modifying structure automatically propagates changes to all using programs.\n5.  **Consistency**: Ensures all applications handle same business elements identically.\n\n---\n\n## Best Practices\n\n*   **Prefix custom structures** with `Z` or `Y` (e.g., `ZSTR_EMPLOYEE`). Adding a suffix like `_STR` or `_S` is recommended to immediately indicate that the object is a structure.\n*   **Always write descriptions** so other developers can understand structure's design.\n*   **Reuse existing Data Elements** for components to maintain semantic data types.\n*   **Remember to Activate** (`Ctrl + F3`) after editing, otherwise, structures won't be visible in the ABAP Editor.",
            "1.  **Reusability**: Define once in SE11 and reference in hundreds of programs.\n2.  **Better Organization**: Grouping related variables keeps program declarations clean.\n3.  **Faster Development**: Avoids recreating common data blocks in code.\n4.  **Easy Maintenance**: Modifying a structure propagates changes automatically to all dependent programs.\n5.  **Consistency**: Ensures different applications process the same business entities identically.\n\n---\n\n## Best Practices\n\n*   **Prefix custom structures** with `Z` or `Y` (e.g., `ZSTR_EMPLOYEE`). Adding a suffix like `_STR` or `_S` helps identify the object type immediately.\n*   **Write clear descriptions** so other developers understand the structure's purpose.\n*   **Reuse existing data elements** for components to keep semantic labels consistent.\n*   **Activate the object** (`Ctrl + F3`) after creation; otherwise, you cannot reference it in the ABAP Editor."
        )
    ],
    "sap-abap-data-statement.md": [
        (
            'description: "Learn what the DATA statement is in SAP ABAP, how to declare variables, understand standard naming conventions, and practice with real code examples."',
            'description: "Learn how to declare variables in SAP ABAP using the DATA statement, follow standard naming conventions, and practice with practical code examples."'
        ),
        (
            "If you are new to SAP ABAP, **DATA declarations** are among the first things you will learn. This statement is used in every ABAP program because you need it to declare variables that store information in memory while the program is running.\n\nNo matter what you are doing in SAP development—whether you are generating reports, working with internal tables, or building advanced enterprise applications—DATA statement is absolutely essential. Without it, you cannot store, process, or manipulate data inside an ABAP program.\n\nIn this tutorial, we will cover how to use DATA declarations, why they are used, and how to write them with practical examples. We will also cover standard naming conventions and best practices for beginners.",
            "If you are starting out in SAP ABAP, learning how to declare variables is one of your first milestones. The `DATA` statement is used in almost every ABAP program to define variables that hold data in memory while code is executing.\n\nWhether you are writing simple reports, processing internal tables, or building enterprise APIs, managing variables is essential. Without the `DATA` statement, you cannot store, process, or manipulate data inside your programs.\n\nIn this guide, we will cover how the `DATA` statement works, why it is used, how to write declarations, and key naming conventions to follow."
        ),
        (
            "The **DATA statement** is used to declare variables in ABAP. A variable is a named storage location in memory that holds a value during program execution. For example, if you want to store an employee's name, salary, or age, you must create a variable to hold that information using DATA statement.\n\nSimply put, DATA declarations tells SAP to allocate a specific amount of space in memory to store a value of a particular type.",
            "The `DATA` statement allocates a named storage location in memory to hold values during program execution. For example, if you need to hold an employee's ID, salary, or department while running a calculation, you must declare a variable for it.\n\nSimply put, declaring a variable tells the SAP NetWeaver application server to reserve space in memory for a specific type of data."
        ),
        (
            "## Why Do We Use the DATA Statement?\n\nWe declare variables because programs need to process dynamic data. If you write a program that only uses hardcoded values, the program will always output the same result.\n\nBy using variables, we can:",
            "## Why Declare Variables in ABAP?\n\nPrograms must handle dynamic data. If you only write hardcoded values, your program will always produce identical output, which is not useful for business users.\n\nDeclaring variables allows you to:"
        ),
        (
            "## Basic Syntax of the DATA Statement\n\nThe basic syntax of the DATA statement is:",
            "## Basic Syntax of the DATA Statement\n\nThe basic syntax for declaring a variable is:"
        ),
        (
            "In this example, we declare a text variable, assigned the value `'Daksh'` to it, and printed the value to the screen using the `WRITE` statement.",
            "In this example, we declare a text variable, assign the value `'Daksh'` to it, and output the result using the `WRITE` statement."
        ),
        (
            "The `DATA` statement is the foundation of data handling in SAP ABAP. By declaring variables with correct data types, adhering to naming conventions (like `lv_`), and understanding when to use `TYPE` vs `LIKE`, you can write robust, high-performance programs. Master these fundamentals, and you will be fully prepared to handle complex data operations, structures, and internal tables in your SAP career.",
            "Declaring variables with the `DATA` statement is the foundation of data handling in SAP ABAP. By typing variables correctly, using standard naming prefixes (like `lv_`), and understanding the difference between `TYPE` and `LIKE`, you can write clean, high-performance code. Master these fundamentals, and you will be fully prepared to work with structures and internal tables in your SAP career."
        )
    ],
    "sap-abap-parameters-statement.md": [
        (
            "When learning SAP ABAP, one of the most important concepts you will come across is the **PARAMETERS statement**. This statement is used heavily in executable reports to accept inputs directly from users before running a program.\n\nIn real-world SAP applications, users rarely run reports blindly. They typically need to filter results by specifying an Employee ID, Material Number, Customer ID, Date Range, or Company Code. Instead of hardcoding these values inside the source code, developers use PARAMETERS statement to automatically generate input fields on the SAP selection screen.\n\nIn this tutorial, we will learn what PARAMETERS statement is, why it is used, its syntax, practical examples, and best practices for beginners.",
            "When writing reports in SAP ABAP, parameter declarations are one of the first concepts you will encounter. You will use the `PARAMETERS` statement to accept inputs directly from users before executing a program.\n\nReal-world users need to filter report data by entering an Employee ID, Material Number, or Date Range. Instead of hardcoding these values, developers use the `PARAMETERS` statement to automatically generate input fields on the SAP selection screen.\n\nIn this guide, we will explore how parameters work, why they are used, selection screen syntax, practical examples, and best practices for beginners."
        ),
        (
            "The **PARAMETERS statement** is used to declare variables that double as input fields on the SAP selection screen. It allows users to enter values before execution.\n\nIn other words, PARAMETERS makes ABAP reports dynamic and interactive because users can supply their own filter criteria rather than relying on static, predefined values.",
            "The `PARAMETERS` statement declares variables that also function as selection screen input fields. It allows users to supply their own filter criteria before running the program.\n\nThis makes ABAP reports dynamic and interactive, rather than forcing users to run reports on static, hardcoded datasets."
        ),
        (
            "By declaring an input field using the `PARAMETERS` statement, we allow users to input any Employee ID they want. This single change makes the program flexible, reusable, and fit for production.",
            "Declaring an input field using the `PARAMETERS` statement lets users query any Employee ID. This simple change makes your program flexible, reusable, and ready for production."
        ),
        (
            "Instead of developers writing separate programs for each employee, they create a single report with a PARAMETERS field. The manager can enter `1001`, `1002`, or `1003` into the input field, and the report dynamically fetches and displays the corresponding details.",
            "Instead of writing separate programs for each employee, developers create a single report with a parameter input field. The manager enters `1001`, `1002`, or `1003`, and the report dynamically fetches the corresponding details."
        ),
        (
            "The basic syntax of a parameter declaration is:",
            "The basic syntax for parameter declarations is:"
        ),
        (
            "* **`PARAMETERS`**: The keyword that initiates selection screen input field.",
            "* **`PARAMETERS`**: The keyword that initiates the selection screen input field."
        ),
        (
            "The PARAMETERS statement supports several additions that modify its behavior and appearance on selection screen:",
            "The `PARAMETERS` statement supports additions that modify how input fields behave on the selection screen:"
        ),
        (
            "Automatically renders a date-picker widget on selection screen:",
            "Automatically renders a date-picker widget on the selection screen:"
        ),
        (
            "It is common for beginners to confuse `DATA` and `PARAMETERS` statements since both declare variables in ABAP. However, they serve completely different purposes:",
            "Beginners often confuse `DATA` and `PARAMETERS` because both declare variables. However, they serve distinct purposes:"
        )
    ],
    "sap-abap-tables.md": [
        (
            "In SAP ABAP, tables are used to store and organize data inside the SAP database. Almost every SAP application relies on tables to manage information such as employee records, customer details, sales orders, and product data.",
            "In SAP ABAP, database tables store and organize corporate records. Almost every SAP application relies on tables to manage information such as employee details, sales orders, and material master data."
        ),
        (
            "Tables are containers which store data in the form of records.\nTables must have a primary key which is used to identify a record uniquely.",
            "Tables store data in the form of structured records.\nTables require a primary key to identify each record uniquely."
        ),
        (
            "> ℹ️ **Note:** The transaction code for creating and maintaining tables is **SE11**.",
            "> ℹ️ **Note:** Create and maintain database tables using transaction code **SE11**."
        ),
        (
            "The system displays selection screen. To view existing records, press `F8`.",
            "The system displays the selection screen. Press `F8` to view existing records."
        ),
        (
            "## Conclusion\nCreating a table in SAP ABAP is one of the most fundamental skills for any beginner. By learning how to define custom fields, configure technical settings, and manage data entries using `SE16N`, you build a strong foundation for working with advanced SAP programming.",
            "## Conclusion\nCreating custom tables is a core skill in SAP development. Learning how to define fields, configure technical settings, and manage data entries using `SE16N` builds a strong foundation for advanced SAP programming."
        )
    ],
    "table-maintenance-generator.md": [
        (
            "A **Table Maintenance Generator (TMG)** is an essential tool in SAP ABAP that automatically generates user interfaces (screens) to let end users add, edit, or delete records in custom database tables—without requiring developers to write a single line of additional ABAP code.\n\nIn every SAP project, developers create custom tables to store company-specific information. However, simply making a table is not enough. Business users need a way to maintain this data, and TMG provides the perfect, out-of-the-box solution.",
            "A **Table Maintenance Generator (TMG)** is a standard tool in SAP ABAP that automatically generates a maintenance interface (screens) for a custom table. This allows users to add, edit, or delete database records without requiring developers to write custom CRUD screens.\n\nWhile developers create custom tables to store company-specific data, business users need a way to keep this data up-to-date. TMG provides an out-of-the-box maintenance interface for this purpose."
        ),
        (
            "A Table Maintenance Generator is a built-in SAP framework that automatically generates database maintenance screens for a specific table. These screens let users:",
            "The generator automatically builds database maintenance screens for a specific table, enabling users to:"
        ),
        (
            "Without TMG, developers would have to build custom programs, structures, and screen layouts to handle basic data entry. This tool automates the entire process, saving valuable development time.",
            "Without TMG, you would have to write custom screen layouts, logic, and transaction codes just to support basic data entry. TMG automates this entirely, saving valuable development hours."
        ),
        (
            "Consider a custom table called `ZEMPLOYEE` that stores employee IDs, names, departments, and salaries. Instead of creating a custom transactional program just for HR personnel to add new hires, you can generate a TMG for the table. SAP will automatically build the user interface, enabling users to maintain the records independently.",
            "For example, instead of coding a custom transactional program for HR personnel to enter new hires into `ZEMPLOYEE`, you can generate a TMG. SAP automatically builds the screen interface, letting users maintain employee records independently."
        ),
        (
            "- **Saves Time:** SAP handles the screen and program generation automatically.\n- **Easy Data Maintenance:** Users can maintain records without needing technical training.\n- **No Code Required:** Most of the backend actions are processed automatically by the standard SAP system.\n- **Simple Interface:** Data is maintained through clean tabular grids or single-row views.\n- **Rapid Configuration:** TMG is highly effective for maintaining system configuration tables.",
            "- **Saves Time:** SAP generates the maintenance screen and program automatically.\n- **Simple Maintenance:** Non-technical users can update records independently.\n- **Zero Coding:** Standard SAP frameworks process database commits, updates, and validations.\n- **Clean Grid Layouts:** Data is displayed in tabular grids or single-row form layouts.\n- **Configuration-Friendly:** TMG is the preferred way to maintain custom configuration tables."
        ),
        (
            "Go to the SAP command field, type `SE11`, and press **Enter** to open ABAP Dictionary screen.",
            "Go to the SAP command field, type `SE11`, and press **Enter** to open the ABAP Dictionary screen."
        ),
        (
            "The Table Maintenance Generator is a powerful, time-saving tool in SAP ABAP. It eliminates the need for developers to write boilerplate CRUD (Create, Read, Update, Delete) interfaces. By understanding how to generate a TMG and test it via `SM30`, you build highly valuable tools for configuration managers and functional consultants.",
            "The Table Maintenance Generator is a powerful time-saver in SAP ABAP. It eliminates boilerplate CRUD programming. Learning to generate a TMG and maintain records via `SM30` lets you provide valuable tools for functional consultants and configuration managers."
        )
    ],
    "se11-transaction-code-sap-abap.md": [
        (
            "A **Transaction Code (T-Code) SE11** is the gateway to ABAP Dictionary (Data Dictionary) in SAP. It is one of the very first transaction codes that any developer or consultant learns because it is where the entire data structure of the SAP system is defined, maintained, and managed.\n\nWhether you are creating database tables, setting up data types, configuring search helps (F4 help), or defining locks to prevent data conflicts, everything starts in transaction code **SE11**.",
            "Transaction code **SE11** is the gateway to the ABAP Dictionary in SAP. It is one of the first transaction codes an SAP developer learns because it serves as the central hub where database schemas and data types are defined, maintained, and managed.\n\nWhether you are creating custom database tables, setting up data elements, configuring search helps, or defining lock objects, everything starts in `SE11`."
        ),
        (
            "In SAP, **SE11** is the standard transaction code used to access the **ABAP Dictionary**. Think of ABAP Dictionary as the metadata repository of the SAP system. It stores the definitions of database tables, views, structures, search helps, domains, and data elements.",
            "In SAP, **SE11** accesses the **ABAP Dictionary**, which acts as the metadata repository of the SAP system. It stores database tables, views, structures, search helps, domains, and data elements."
        ),
        (
            "The system will display ABAP Dictionary initial screen showing options for different database objects.",
            "The system displays the initial ABAP Dictionary screen, listing options for different database objects."
        ),
        (
            "Transaction code **SE11** is the foundation of SAP ABAP database modeling. Understanding the roles of tables, domains, data elements, views, and lock objects allows you to build normalized, secure, and highly optimized database applications. With consistent naming conventions and activation practices, you are ready to configure standard and custom schemas in any SAP environment!",
            "Transaction code **SE11** is the foundation of data modeling in SAP ABAP. Understanding how tables, domains, data elements, views, and lock objects work together allows you to build secure, optimized database applications. Following consistent naming conventions and activation practices ensures your schemas fit cleanly into any SAP landscape."
        )
    ],
    "first-abap-program-beginners-guide.md": [
        (
            'If you are starting your **SAP ABAP** journey, one of the most exciting milestones is learning how to write your first ABAP program. Creating a simple "Hello World" report helps you understand development workflow, learn basic syntax rules, and build the confidence to tackle advanced ABAP dictionary and database operations.\n\nIn this step-by-step tutorial, you will learn what ABAP programs are, why it is important, how to create one using transaction **SE38**, and how to execute it successfully in the SAP GUI.',
            'Writing your first ABAP program is an exciting milestone in your SAP development journey. Creating a simple "Hello World" report helps you understand the developer workflow, learn basic syntax rules, and build the confidence to tackle database tables and dictionary objects.\n\nIn this step-by-step tutorial, we will cover what ABAP programs are, why they are used, and how to create and execute one using transaction **SE38**.'
        ),
        (
            "An ABAP program is a collection of logical statements stored inside SAP database repository that perform a specific task. Unlike standard desktop programs, ABAP runs entirely on application server and interacts directly with central database layer.",
            "An ABAP program is a collection of logical statements stored inside the SAP database repository. Unlike standard desktop applications, ABAP programs run entirely on the SAP application server and interact directly with the central database layer."
        ),
        (
            "To write ABAP programs, developers use two primary transaction codes. Here is a quick breakdown to help you choose the appropriate tool:",
            "To write ABAP programs, developers use two primary transaction codes:"
        ),
        (
            "> 💡 **Tip:** As a beginner, always start with **SE38**. It provides a clean, focused environment for writing single-source code reports without the overhead of package navigation.",
            "> 💡 **Tip:** For beginners, starting with **SE38** is recommended. It provides a focused environment for writing standalone reports without package navigation overhead."
        )
    ]
}

def humanize_file(filepath):
    filename = os.path.basename(filepath)
    if filename not in replacements:
        return
    
    print(f"Applying precise humanization to: {filename}")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    for original, replacement in replacements[filename]:
        content = content.replace(original, replacement)
        
    # Standard cleanup of any double spacing or small typos if any
    content = content.replace("  ", " ")
    content = content.replace("  ", " ")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

for filename in os.listdir(blog_dir):
    if filename.endswith(".md"):
        humanize_file(os.path.join(blog_dir, filename))

print("Humanization complete!")
