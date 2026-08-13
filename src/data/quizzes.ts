export interface Question {
  q: string;
  options: string[];
  correct: number;
  exp: string;
}

export const quizzes: Record<string, Question[]> = {
  "first-abap-program-beginners-guide": [
    {
      q: "Which transaction code is primarily used to write, compile, and manage ABAP programs?",
      options: ["SE11", "SE38", "SE80", "SPRO"],
      correct: 1,
      exp: "SE38 is the standard ABAP Editor transaction code, while SE80 is the full Object Navigator IDE."
    },
    {
      q: "Which character(s) must custom customer-defined ABAP programs start with?",
      options: ["A or B", "Z or Y", "X or W", "S or T"],
      correct: 1,
      exp: "Custom developments in SAP must start with Z or Y to prevent overriding standard SAP objects."
    },
    {
      q: "What is the mandatory first statement in a standard ABAP executable program?",
      options: ["PROGRAM", "DATA", "REPORT", "START-OF-SELECTION"],
      correct: 2,
      exp: "Every executable ABAP report program must start with the REPORT statement followed by the program name."
    },
    {
      q: "Which keyword is used to output text or variable values to the user screen list?",
      options: ["PRINT", "WRITE", "DISPLAY", "OUTPUT"],
      correct: 1,
      exp: "The WRITE statement displays outputs, variables, and text elements to the basic report list."
    },
    {
      q: "Which keyboard shortcut is used to activate a program in the ABAP Editor?",
      options: ["Ctrl + F1", "Ctrl + F2", "Ctrl + F3", "Ctrl + F8"],
      correct: 2,
      exp: "Ctrl + F3 is the shortcut for Activation, while Ctrl + F2 is Check (syntax) and Ctrl + F8 is Execute (run)."
    },
    {
      q: "What does the 'Check' function (Ctrl + F2) accomplish?",
      options: ["Saves the program to the database", "Executes the program directly", "Verifies program syntax without compiling or running", "Transports code to staging"],
      correct: 2,
      exp: "The Check tool performs syntax analysis on the code, flagging typos or errors without compiling."
    },
    {
      q: "How are ABAP program source files stored in the SAP system?",
      options: ["As .abap text files on the application server file system", "Directly in the SAP relational database tables", "In compiled binary packages on local desktops", "In XML configuration files"],
      correct: 1,
      exp: "ABAP program code is stored directly inside the SAP database. There are no external text files."
    },
    {
      q: "Which keyword is used to declare variables in ABAP?",
      options: ["VAR", "DECLARE", "DATA", "DEFINE"],
      correct: 2,
      exp: "Variables are defined using the DATA statement in ABAP."
    },
    {
      q: "What is the purpose of the 'Pretty Printer' tool in the ABAP Editor?",
      options: ["Prints the code to a physical paper page", "Formats code indentation and standardizes case layout", "Exposes the code to public web APIs", "Optimizes query performance"],
      correct: 1,
      exp: "Pretty Printer standardizes indentation, line breaks, and casing (e.g. keywords in uppercase)."
    },
    {
      q: "What happens if you run an ABAP program after editing without activating it first?",
      options: ["The program fails to run with a runtime error", "It runs the newly edited code automatically", "It executes the last activated version of the program", "The SAP GUI session freezes"],
      correct: 2,
      exp: "SAP executes the active version of the program. Changes are ignored until the new code is activated."
    }
  ],
  "sap-abap-data-statement": [
    {
      q: "Which keyword is used to allocate memory space for variables in ABAP?",
      options: ["DECLARE", "VAR", "DATA", "TYPES"],
      correct: 2,
      exp: "The DATA statement declares variables and allocates matching RAM spaces during runtime."
    },
    {
      q: "Which separator character connects the variable name and its type definition?",
      options: ["FOR", "AS", "TYPE", "LIKE"],
      correct: 2,
      exp: "The syntax connects variables and types with the TYPE keyword (e.g. DATA lv_var TYPE i)."
    },
    {
      q: "Which predefined ABAP data type is used to store whole integer numbers?",
      options: ["C", "D", "I", "N"],
      correct: 2,
      exp: "Type I stands for Integer, C for Character, D for Date, and N for Numeric Character."
    },
    {
      q: "What is the default length of the standard character type (C) if omitted?",
      options: ["1 character", "8 characters", "10 characters", "255 characters"],
      correct: 0,
      exp: "Character (C) type defaults to a length of 1 if you do not specify a LENGTH addition."
    },
    {
      q: "How do you declare multiple variables in a single statement block to avoid repeating the DATA keyword?",
      options: ["By separating them with the AND keyword", "Using a colon (chained statement) and separating variables with commas", "By wrapping variables in brackets", "It is impossible in ABAP"],
      correct: 1,
      exp: "Chaining using a colon (e.g., DATA: lv_a TYPE i, lv_b TYPE c.) groups declarations together."
    },
    {
      q: "Which addition is used to assign an initial starting value to a variable during declaration?",
      options: ["INITIAL", "START", "VALUE", "DEFAULT"],
      correct: 2,
      exp: "The VALUE keyword specifies the initial default value (e.g., DATA lv_num TYPE i VALUE 10.)."
    },
    {
      q: "What is the correct syntax to declare a character variable named 'lv_text' with a length of 15?",
      options: ["DATA lv_text TYPE c(15).", "DATA lv_text TYPE c LENGTH 15.", "DATA: lv_text TYPE c size 15.", "Both A and B are correct"],
      correct: 3,
      exp: "Both TYPE c(15) and TYPE c LENGTH 15 are valid syntax forms in ABAP."
    },
    {
      q: "Which ABAP data type is best suited for financial currency amounts or accurate decimal calculations?",
      options: ["F (Float)", "I (Integer)", "P (Packed Decimals)", "N (Numeric Character)"],
      correct: 2,
      exp: "Packed Decimals (P) avoid rounding issues, making it the standard type for prices and currency."
    },
    {
      q: "What is the fundamental difference between TYPE and LIKE additions?",
      options: ["TYPE refers directly to a data type; LIKE copies properties of an existing variable or field", "LIKE refers directly to a data type; TYPE copies variable structures", "There is no difference", "LIKE is only used for database queries"],
      correct: 0,
      exp: "TYPE links to data types (e.g. TYPE i). LIKE references an active variable (e.g. LIKE lv_var)."
    },
    {
      q: "What is the length and format of the Date data type (D) in ABAP?",
      options: ["10 characters (DD-MM-YYYY)", "8 characters (YYYYMMDD)", "6 characters (YYMMDD)", "Variable length text"],
      correct: 1,
      exp: "Type D is stored as an 8-character string in the format YYYYMMDD."
    }
  ],
  "sap-abap-parameters-statement": [
    {
      q: "What is the primary function of the PARAMETERS statement in ABAP?",
      options: ["Retrieves data from a database table", "Creates an input field on the selection screen", "Defines a local program variable", "Declares an internal table structure"],
      correct: 1,
      exp: "PARAMETERS creates an input field on the selection screen for users to enter runtime parameters."
    },
    {
      q: "What is the maximum allowed length for a PARAMETERS variable name?",
      options: ["8 characters", "16 characters", "30 characters", "No limit"],
      correct: 0,
      exp: "Parameter names are limited to a maximum of 8 characters due to selection screen restrictions."
    },
    {
      q: "Which addition is used to make an input parameter field mandatory (required)?",
      options: ["REQUIRED", "MANDATORY", "OBLIGATORY", "MUST-FILL"],
      correct: 2,
      exp: "The OBLIGATORY addition forces the user to fill the parameter field before running the program."
    },
    {
      q: "How do you mask input characters (replace with asterisks) for password entry parameters?",
      options: ["AS MASKED", "LOWER CASE", "AS PASSWORD", "AS PEN-BOX"],
      correct: 2,
      exp: "The AS PASSWORD addition hides user input on the selection screen."
    },
    {
      q: "Which addition defines a parameter as a single-character checkbox?",
      options: ["AS CHECKBOX", "TYPE checkbox", "AS RADIOBUTTON", "AS SWITCH"],
      correct: 0,
      exp: "AS CHECKBOX creates a checkbox that contains 'X' when checked, or space when unchecked."
    },
    {
      q: "What is the purpose of the RADIOBUTTON GROUP addition?",
      options: ["Displays values in a dropdown selection list", "Groups radio buttons so only one can be checked at a time", "Creates a checkbox grid", "Draws a visual box border around parameters"],
      correct: 1,
      exp: "Radio buttons in the same group are mutually exclusive; checking one unchecks the others."
    },
    {
      q: "How do you define a pre-filled default value for a parameter?",
      options: ["VALUE", "VALUE-START", "DEFAULT", "INITIAL"],
      correct: 2,
      exp: "The DEFAULT keyword defines initial parameter values (e.g. PARAMETERS p_num TYPE i DEFAULT 5.)."
    },
    {
      q: "By default, parameters convert text inputs to uppercase. How do you allow lowercase values?",
      options: ["LOWER CASE", "AS STRING", "NO UPPERCASE", "LOWERCASE ACTIVE"],
      correct: 0,
      exp: "The LOWER CASE addition prevents the system from automatically uppercase-converting inputs."
    },
    {
      q: "What data type does a parameter checkbox inherit if not explicitly typed?",
      options: ["Type I", "Type C with length 1", "Type String", "Type Boolean"],
      correct: 1,
      exp: "A checkbox parameter defaults to character type of length 1 (contain 'X' or ' ')."
    },
    {
      q: "How do you bind a specific search help dialog to an input parameter?",
      options: ["HELP OBJECT", "SEARCH-HELP", "MATCHCODE OBJECT", "HELP-ID"],
      correct: 2,
      exp: "The MATCHCODE OBJECT addition binds an existing F4 Search Help to the parameter input."
    }
  ],
  "sap-abap-if-else-statement": [
    {
      q: "Which keyword closes an IF statement condition block in ABAP?",
      options: ["END", "ENDIF", "FI", "END-IF"],
      correct: 1,
      exp: "Every IF control structure in ABAP must close with the ENDIF keyword."
    },
    {
      q: "What is the correct spelling of the 'else if' condition keyword in ABAP?",
      options: ["ELSIF", "ELSEIF", "ELSE IF", "ELSE-IF"],
      correct: 1,
      exp: "ABAP combines these into a single word: ELSEIF."
    },
    {
      q: "Which operator represents 'not equal to' in ABAP comparisons?",
      options: ["!=", "NE", "<>", "Both B and C are correct"],
      correct: 3,
      exp: "Both the text operator NE and the symbol operator <> represent 'Not Equal' in ABAP."
    },
    {
      q: "Which logical operator checks if a variable falls within a specified range?",
      options: ["IN RANGE", "BETWEEN", "WITHIN", "IN INTERVAL"],
      correct: 1,
      exp: "The BETWEEN operator checks ranges (e.g. IF lv_val BETWEEN 10 AND 20.)."
    },
    {
      q: "Which comparison operator checks if a string matches a wildcard pattern containing '*'?",
      options: ["LIKE", "MATCH", "CP", "CONTAINS"],
      correct: 2,
      exp: "CP stands for Contains Pattern and evaluates wildcard expressions (e.g. 'DA*')."
    },
    {
      q: "Are basic string comparisons in IF statements case-sensitive in ABAP?",
      options: ["No, they are always case-insensitive", "Yes, they are case-sensitive by default", "Only if database tables are buffered", "Only if comparing decimals"],
      correct: 1,
      exp: "String comparisons in ABAP are case-sensitive by default (e.g., 'abc' does not equal 'ABC')."
    },
    {
      q: "Which operator joins conditions requiring BOTH logical evaluations to be true?",
      options: ["AND", "OR", "&&", "ANDALSO"],
      correct: 0,
      exp: "The AND operator evaluates to true only if all connected expressions evaluate to true."
    },
    {
      q: "How do you check if a variable has no value or contains its type-specific initial default?",
      options: ["IS NULL", "IS EMPTY", "IS INITIAL", "IS ZERO"],
      correct: 2,
      exp: "IS INITIAL checks if a variable matches its type's initial default value (e.g., 0 for I, spaces for C)."
    },
    {
      q: "What happens in an IF-ELSEIF-ELSE chain once a matching condition evaluates to true?",
      options: ["The matching code runs, and the rest of the chain is skipped", "All subsequent blocks are still checked", "The program throws a compiler warning", "Execution restarts from the top"],
      correct: 0,
      exp: "ABAP executes the first matching block and jumps straight to ENDIF, ignoring remaining branches."
    },
    {
      q: "Which operator evaluates if a value exists within a comma-separated list of items?",
      options: ["IN", "EQ", "CONTAINS", "MATCHES"],
      correct: 0,
      exp: "The IN operator checks lists or ranges (e.g. IF lv_val IN (1, 2, 3))."
    }
  ],
  "sap-abap-case-statement": [
    {
      q: "Which keyword closes a CASE statement block in ABAP?",
      options: ["END", "ENDCASE", "END-CASE", "ENDSELECT"],
      correct: 1,
      exp: "Every CASE statement block must close with the ENDCASE keyword."
    },
    {
      q: "Which keyword introduces a value branch inside a CASE statement?",
      options: ["IF", "CASE", "WHEN", "BRANCH"],
      correct: 2,
      exp: "The WHEN keyword introduces matching target values (e.g., WHEN 1.)."
    },
    {
      q: "Which keyword defines the default fallback branch when no other WHEN conditions match?",
      options: ["WHEN ELSE", "ELSE", "WHEN OTHERS", "DEFAULT"],
      correct: 2,
      exp: "WHEN OTHERS serves as the default fallback branch inside a CASE structure."
    },
    {
      q: "How do you combine multiple matching conditions in a single WHEN branch?",
      options: ["Separated by commas", "Separated by OR operator", "Using brackets", "It is not possible"],
      correct: 1,
      exp: "You separate values with the OR operator (e.g., WHEN 'A' OR 'B' OR 'C'.)."
    },
    {
      q: "Can you perform relational range comparisons (like > or <) inside a WHEN statement?",
      options: ["Yes, using standard syntax", "No, WHEN only supports discrete value matches", "Only on character fields", "Only inside loop structures"],
      correct: 1,
      exp: "CASE is for discrete matching. Relational checks (e.g. >= 10) require IF-ELSEIF blocks."
    },
    {
      q: "What is a primary advantage of using CASE instead of multiple IF-ELSEIF checks?",
      options: ["It runs faster in the database", "Improves code readability when checking a single variable against fixed values", "Allows checking multiple variables together", "Automatically increments system indexes"],
      correct: 1,
      exp: "CASE structure is highly readable and clean when checking one variable against multiple constants."
    },
    {
      q: "What happens if no WHEN condition matches the control variable, and WHEN OTHERS is omitted?",
      options: ["The program terminates with a dump", "The system prompts the user for input", "The program skips the block and continues execution below ENDCASE", "An infinite loop occurs"],
      correct: 2,
      exp: "If no matches exist and no fallback is defined, the CASE block is skipped with no runtime error."
    },
    {
      q: "How many condition blocks are evaluated after a matching WHEN branch is found?",
      options: ["All remaining WHEN blocks", "Only the next WHEN block", "None, execution jumps directly to ENDCASE", "The WHEN OTHERS block"],
      correct: 2,
      exp: "As soon as a match is found, its code runs, and control exits the CASE structure immediately."
    },
    {
      q: "Can a CASE statement evaluate different variables in different WHEN branches?",
      options: ["Yes, by using dynamic variables", "No, it only compares a single control variable", "Only inside classes", "Only on S/4HANA systems"],
      correct: 1,
      exp: "CASE evaluates one control variable declared at the start (e.g. CASE lv_variable.)."
    },
    {
      q: "What is the correct syntax to start a CASE statement?",
      options: ["CASE variable:", "CASE variable.", "CASE: variable.", "CASE (variable)"],
      correct: 1,
      exp: "The syntax starts with CASE followed by the variable name and a period (CASE variable.)."
    }
  ],
  "sap-abap-do-loop": [
    {
      q: "Which keyword closes a DO loop block in ABAP?",
      options: ["END", "ENDDO", "END-DO", "ENDLOOP"],
      correct: 1,
      exp: "A DO loop block always closes with the ENDDO keyword. (ENDLOOP is for internal tables)."
    },
    {
      q: "Which system variable automatically tracks the current loop iteration count?",
      options: ["SY-LOOP", "SY-TABIX", "SY-INDEX", "SY-SUBRC"],
      correct: 2,
      exp: "SY-INDEX tracks DO and WHILE loop iterations. (SY-TABIX tracks internal table loops)."
    },
    {
      q: "What does the statement 'DO 5 TIMES.' accomplish?",
      options: ["Loops until variable equals 5", "Repeats the loop block exactly 5 times", "Executes the code every 5 seconds", "Creates 5 identical database tables"],
      correct: 1,
      exp: "DO n TIMES repeats the code block exactly n times, where n is an integer or variable."
    },
    {
      q: "What happens if you declare a 'DO.' statement without specifying the TIMES parameter?",
      options: ["The program fails to compile", "It loops exactly 1 time", "It creates an infinite loop", "It prompts the user for iterations count"],
      correct: 2,
      exp: "A DO statement without TIMES creates an unconditional infinite loop that runs until stopped manually."
    },
    {
      q: "Which statement terminates the entire loop execution immediately?",
      options: ["STOP", "EXIT", "CONTINUE", "CHECK"],
      correct: 1,
      exp: "The EXIT statement terminates loop execution instantly and jumps past the ENDDO."
    },
    {
      q: "Which statement skips the rest of the current iteration and starts the next pass?",
      options: ["EXIT", "SKIP", "CONTINUE", "CHECK"],
      correct: 2,
      exp: "CONTINUE terminates the current loop pass and jumps back to the top of the loop."
    },
    {
      q: "What is the initial value of SY-INDEX on the very first loop iteration?",
      options: ["0", "1", "-1", "Null"],
      correct: 1,
      exp: "SY-INDEX starts at 1 on the first pass and increments by 1 with each subsequent iteration."
    },
    {
      q: "How does the CHECK statement behave inside a loop block?",
      options: ["Exits the loop if the check condition is true", "Skips to the next iteration if the check condition is false", "Performs a database check", "Formats the output list"],
      correct: 1,
      exp: "CHECK evaluates a condition. If false, it acts like CONTINUE and skips the rest of the iteration."
    },
    {
      q: "In nested DO loops, what does SY-INDEX refer to inside the inner loop?",
      options: ["The outer loop index", "The inner loop index", "A combination of both indexes", "It becomes invalid"],
      correct: 1,
      exp: "SY-INDEX always holds the index of the loop currently being executed (the inner loop)."
    },
    {
      q: "Why should you avoid deep hierarchies of nested loops?",
      options: ["It causes database syntax errors", "It degrades program performance and reduces readability", "It disables Pretty Printer", "It locks the SAP GUI theme"],
      correct: 1,
      exp: "Deep nested loops consume system resources exponentially and make debugging difficult."
    }
  ],
  "sap-abap-while-loop": [
    {
      q: "Which keyword closes a WHILE loop block in ABAP?",
      options: ["END", "ENDWHILE", "END-WHILE", "ENDLOOP"],
      correct: 1,
      exp: "A WHILE loop block always terminates with the ENDWHILE keyword."
    },
    {
      q: "What is the primary difference between a DO loop and a WHILE loop?",
      options: ["DO loops cannot be nested; WHILE loops can", "DO loops run a fixed number of times; WHILE loops execute based on a condition", "WHILE loops update database indexes automatically", "DO loops are only for S/4HANA systems"],
      correct: 1,
      exp: "DO loop repeats a fixed number of times; WHILE loop runs dynamically as long as a condition is true."
    },
    {
      q: "What happens if the WHILE loop condition is false on the very first check?",
      options: ["The program throws a compile error", "The loop runs exactly once anyway", "The loop block is skipped entirely", "An infinite loop occurs"],
      correct: 2,
      exp: "Since the condition is checked at the top of the loop, a false initial check skips the block entirely."
    },
    {
      q: "Does the WHILE loop automatically maintain and increment the SY-INDEX system variable?",
      options: ["Yes, same as DO loops", "No, you must declare and increment your own counter variable", "Only if TIMES addition is used", "Only on master data tables"],
      correct: 1,
      exp: "Unlike DO loops, WHILE loops do not automatically update SY-INDEX. You must maintain custom counters."
    },
    {
      q: "What is the primary cause of an infinite loop in a WHILE structure?",
      options: ["Forgetting to close with ENDWHILE", "Forgetting to update the variable evaluated in the condition", "Using the wrong arithmetic operators", "Comparing character fields"],
      correct: 1,
      exp: "If the conditional variable is never updated inside the loop, the condition remains true forever."
    },
    {
      q: "Which statement terminates a WHILE loop early and exits the block?",
      options: ["CONTINUE", "CHECK", "EXIT", "STOP"],
      correct: 2,
      exp: "The EXIT statement exits the loop instantly, transferring control to the code below ENDWHILE."
    },
    {
      q: "What does the CHECK statement do inside a WHILE loop?",
      options: ["Flashes a message to the user", "Skips to the next iteration if the check condition is false", "Validates database tables", "Restarts the program"],
      correct: 1,
      exp: "CHECK evaluates a condition. If false, it skips the remaining statements in the current iteration."
    },
    {
      q: "Which operators can combine multiple checks in a WHILE condition?",
      options: ["AND and OR", "&& and ||", "JOIN and UNION", "PLUS and MINUS"],
      correct: 0,
      exp: "Logical operators AND/OR group multiple condition checks (e.g. WHILE a = 1 AND b = 2.)."
    },
    {
      q: "What is the correct syntax for declaring a WHILE loop?",
      options: ["WHILE condition:", "WHILE condition.", "WHILE: condition.", "WHILE (condition)"],
      correct: 1,
      exp: "A WHILE loop starts with the keyword WHILE, the logical expression, and a period."
    },
    {
      q: "In nested WHILE loops, what is the best practice for managing loop counters?",
      options: ["Use the same counter variable for both loops", "Use separate, uniquely named counter variables", "Rely on the automatic SY-INDEX variable", "Avoid counters entirely"],
      correct: 1,
      exp: "Using separate counter variables prevents loops from corrupting each other's iteration counts."
    }
  ],
  "sap-abap-loop-at-internal-table": [
    {
      q: "What is the primary function of the LOOP AT statement in SAP ABAP?",
      options: ["To loop a fixed number of times", "To iterate over the rows of an internal table sequentially", "To loop while a database connection is active", "To query rows from database tables directly"],
      correct: 1,
      exp: "LOOP AT is used to read and process records from an internal table one by one sequentially."
    },
    {
      q: "Which system variable stores the index (row number) of the current internal table row being processed inside a LOOP AT?",
      options: ["SY-INDEX", "SY-SUBRC", "SY-TABIX", "SY-LOOP"],
      correct: 2,
      exp: "SY-TABIX automatically stores the index of the row currently being processed inside a LOOP AT internal table loop. SY-INDEX is used in DO and WHILE loops."
    },
    {
      q: "What is a major performance benefit of using LOOP AT ASSIGNING FIELD-SYMBOL instead of LOOP AT INTO Work Area?",
      options: ["Field symbols bypass authority checks", "Field symbols avoid copying row data into a work area, pointing directly to table memory", "Field symbols automatically format date fields", "Field symbols do not update SY-TABIX"],
      correct: 1,
      exp: "By using ASSIGNING <field-symbol>, the system avoids copying the row contents to a work area structure, improving performance especially for large datasets."
    },
    {
      q: "If you modify field values of a Work Area inside a LOOP AT...INTO loop, how do you save these updates back to the internal table?",
      options: ["No statement is required, changes are automatic", "By using the UPDATE table statement", "By calling MODIFY table FROM work_area INDEX sy-tabix", "By calling APPEND work_area TO table"],
      correct: 2,
      exp: "When using INTO work_area, changes to the work area structure are local. You must call MODIFY table FROM work_area INDEX sy-tabix to update the internal table row."
    },
    {
      q: "If you use FIELD-SYMBOLS in a LOOP AT, how is the internal table updated when you change a field value of the field symbol?",
      options: ["You must run the MODIFY statement", "The internal table is updated instantly/automatically since the field symbol points directly to the row memory", "You must execute COMMIT WORK", "Changes are discarded unless you APPEND"],
      correct: 1,
      exp: "Since a field symbol acts as a direct pointer to the table memory space, any modifications to its components write directly to the table row without requiring a MODIFY statement."
    },
    {
      q: "How does the CHECK statement behave inside a LOOP AT statement?",
      options: ["It exits the entire loop immediately", "It prints a success message", "If its condition evaluates to false, it skips the remaining statements of the current iteration and jumps to the next row", "It validates table keys for duplicates"],
      correct: 2,
      exp: "CHECK evaluates a condition. If the condition is false, it terminates the current loop iteration immediately and proceeds to the next iteration (similar to CONTINUE)."
    },
    {
      q: "Which statement terminates the entire loop execution instantly and jumps to the code block below ENDLOOP?",
      options: ["EXIT", "CONTINUE", "STOP", "LEAVE"],
      correct: 0,
      exp: "The EXIT statement exits the entire loop instantly, transferring program control to the code directly following ENDLOOP."
    },
    {
      q: "What happens if the internal table is empty when the LOOP AT statement is executed?",
      options: ["The program crashes with a short dump", "The loop is skipped entirely and the program continues after ENDLOOP", "It runs exactly once with initial values", "It loops infinitely"],
      correct: 1,
      exp: "If the internal table contains no records, the loop block is skipped completely, and execution proceeds directly to the code below ENDLOOP without any error."
    },
    {
      q: "Why is it recommended to avoid nested LOOP AT statements over large internal tables?",
      options: ["It causes DB connection timeouts", "It has an O(N^2) complexity that degrades application performance exponentially", "It disables the debug utility", "Nested loops are deprecated in modern ABAP"],
      correct: 1,
      exp: "Nested loops cause quadratic execution times (O(N^2)) which consume significant CPU time on large datasets. Optimization techniques like parallel cursors or sorting with binary search should be used instead."
    },
    {
      q: "Which addition to the LOOP AT statement is used to restrict the processed rows based on conditions without reading the entire table?",
      options: ["HAVING condition", "FILTER condition", "WHERE condition", "CHECK condition"],
      correct: 2,
      exp: "The WHERE addition restricts loop iterations to only those rows that meet the logical criteria, improving program efficiency."
    }
  ],
  "sap-abap-read-table": [
    {
      q: "What is the primary purpose of the READ TABLE statement in SAP ABAP?",
      options: [
        "To iterate through all rows of an internal table",
        "To retrieve exactly one specific record from an internal table",
        "To write data from a structure into the database",
        "To delete duplicate records from an internal table"
      ],
      correct: 1,
      exp: "READ TABLE is designed to retrieve a single record from an internal table, unlike LOOP AT which iterates over all records."
    },
    {
      q: "Which system variable is updated to indicate the success or failure of a READ TABLE operation?",
      options: ["SY-INDEX", "SY-TABIX", "SY-SUBRC", "SY-DBCNT"],
      correct: 2,
      exp: "Following a READ TABLE statement, SY-SUBRC returns 0 if the record is found, or 4 if it is not found."
    },
    {
      q: "What does the system variable SY-TABIX store after a successful READ TABLE statement is executed on a standard or index table?",
      options: [
        "The total number of rows in the table",
        "The index (row number) of the retrieved record",
        "The status of the database connection",
        "The number of fields in the work area"
      ],
      correct: 1,
      exp: "On success (SY-SUBRC = 0), SY-TABIX stores the row index of the read record in standard and index tables."
    },
    {
      q: "What is the key prerequisite for performing a BINARY SEARCH with READ TABLE?",
      options: [
        "The internal table must be defined as a Hash table",
        "The internal table must be sorted by the search key fields beforehand",
        "The key must consist of only numeric fields",
        "The database table must be buffered in SAP memory"
      ],
      correct: 1,
      exp: "For BINARY SEARCH to work correctly, the internal table must be sorted by the fields specified in the WITH KEY clause."
    },
    {
      q: "What happens if you run a READ TABLE ... BINARY SEARCH on an internal table that is NOT sorted?",
      options: [
        "The program terminates with a runtime short dump",
        "The compiler flags it as a syntax error",
        "The system automatically sorts the table before reading",
        "The statement may return wrong results or fail to find records silently"
      ],
      correct: 3,
      exp: "If the table is not sorted, BINARY SEARCH will produce incorrect results or fail to find matching records silently. No dump or compile error is raised."
    },
    {
      q: "Why is using FIELD-SYMBOLS with READ TABLE more performant than using INTO work_area?",
      options: [
        "Field symbols bypass database authorization checks",
        "Field symbols avoid copying data by pointing directly to the table row in memory",
        "Field symbols automatically clear the table key",
        "Field symbols compress the internal table size"
      ],
      correct: 1,
      exp: "Using ASSIGNING <field-symbol> establishes a reference (pointer) to the row, avoiding the overhead of copying the row data into a work area structure."
    },
    {
      q: "If you read a table using a field symbol (READ TABLE ... ASSIGNING <fs_wa>), how do you write changes to a field back to the internal table?",
      options: [
        "By calling the MODIFY statement targeting the field symbol",
        "By executing COMMIT WORK",
        "Simply modifying the field values of the field symbol; the table is updated automatically",
        "By appending the field symbol back to the table"
      ],
      correct: 2,
      exp: "Because the field symbol points directly to the row's memory address, modifying its fields updates the internal table instantly without a MODIFY statement."
    },
    {
      q: "What is the purpose of the TRANSPORTING NO FIELDS addition in the READ TABLE statement?",
      options: [
        "To delete the contents of the internal table",
        "To check if a record exists matching the key without copying any data",
        "To prevent the table from being transported across packages",
        "To clear the system variables before the read"
      ],
      correct: 1,
      exp: "TRANSPORTING NO FIELDS checks for record existence and sets SY-SUBRC/SY-TABIX without copying any data, making it highly efficient."
    },
    {
      q: "Which addition can you use to copy only specific fields from the internal table row into the work area?",
      options: ["FIELDS ONLY", "SELECTING", "TRANSPORTING", "MOVE-CORRESPONDING"],
      correct: 2,
      exp: "The TRANSPORTING clause followed by field names copies only those specific fields to the work area, leaving other fields initial."
    },
    {
      q: "What is a common bug associated with not checking SY-SUBRC after a failed READ TABLE ... INTO work_area?",
      options: [
        "The program terminates with a short dump",
        "The work area retains leftover data from previous operations, leading to incorrect processing",
        "The internal table is cleared automatically",
        "The system locks the database table"
      ],
      correct: 1,
      exp: "If the read fails, the work area is not cleared or updated; it retains whatever data was previously in it, which can corrupt logic if unchecked."
    }
  ],
  "sap-abap-select-options": [
    {
      q: "Which keyword connects a SELECT-OPTIONS variable to a database table field?",
      options: ["FOR", "TO", "BIND", "TYPE"],
      correct: 0,
      exp: "The FOR keyword binds the SELECT-OPTIONS to a specific table or dictionary field (e.g., FOR mara-matnr)."
    },
    {
      q: "What is the standard naming prefix convention for SELECT-OPTIONS variables?",
      options: ["p_", "s_", "t_", "so_"],
      correct: 1,
      exp: "Standard practice is prefixing selection screen inputs with 's_' (e.g. s_matnr) and parameters with 'p_'."
    },
    {
      q: "Which SQL operator must be used in a WHERE clause to query a SELECT-OPTIONS table?",
      options: ["=", "LIKE", "IN", "BETWEEN"],
      correct: 2,
      exp: "The IN operator checks values against selection tables (e.g., WHERE matnr IN @s_matnr)."
    },
    {
      q: "How many header fields are automatically created in the Selection Table structure?",
      options: ["2 (LOW, HIGH)", "3 (SIGN, LOW, HIGH)", "4 (SIGN, OPTION, LOW, HIGH)", "5 (SIGN, OPTION, LOW, HIGH, TEXT)"],
      correct: 2,
      exp: "A Selection Table always has four columns: SIGN, OPTION, LOW, and HIGH."
    },
    {
      q: "What does a SIGN value of 'E' signify in a selection table row?",
      options: ["Error in input", "Exclude matching values", "Equal comparison", "Empty range"],
      correct: 1,
      exp: "'I' stands for Include (matching values kept) and 'E' stands for Exclude (matching values discarded)."
    },
    {
      q: "Which OPTION comparison code stands for 'Between' (range selection)?",
      options: ["EQ", "BT", "NE", "CP"],
      correct: 1,
      exp: "BT stands for Between, EQ for Equal, NE for Not Equal, and CP for Contains Pattern."
    },
    {
      q: "What is the purpose of the TABLES statement in relation to SELECT-OPTIONS?",
      options: ["Creates a database table dynamically", "Required to declare database table headers when referencing fields", "Caches query results", "Creates selection lists"],
      correct: 1,
      exp: "The TABLES statement must declare a table before its fields can be referenced in a FOR clause."
    },
    {
      q: "What does the HIGH field store in a selection table row?",
      options: ["The upper bound of a range selection", "The maximum allowed character length", "The priority of the query", "The error status code"],
      correct: 0,
      exp: "HIGH stores the upper limit of a range search (e.g. 2000 in a range from 1000 to 2000)."
    },
    {
      q: "What happens if a user leaves a SELECT-OPTIONS field completely empty on the selection screen?",
      options: ["The program fails with a runtime error", "The database query returns zero records", "The database query matches and returns all records", "The system prompts the user to enter data"],
      correct: 2,
      exp: "An empty selection table represents no restrictions, causing the database query to return all records."
    },
    {
      q: "How does SELECT-OPTIONS differ from the PARAMETERS statement?",
      options: ["SELECT-OPTIONS only works on HANA databases", "PARAMETERS restricts input to a single value; SELECT-OPTIONS handles ranges and lists", "SELECT-OPTIONS does not generate GUI inputs", "PARAMETERS cannot use Search Helps"],
      correct: 1,
      exp: "PARAMETERS accepts a single value; SELECT-OPTIONS creates an internal table accepting complex ranges."
    }
  ],
  "abap-dictionary": [
    {
      q: "What is the central transaction code used to access the ABAP Dictionary in SAP?",
      options: ["SE38", "SE80", "SE11", "SM30"],
      correct: 2,
      exp: "SE11 is the main entry point to the ABAP Dictionary."
    },
    {
      q: "What are the three main database table types supported in the ABAP Dictionary?",
      options: ["Flat, Nested, Relational", "Transparent, Pooled, Cluster", "Master, Transaction, Configuration", "Z-table, Y-table, Standard-table"],
      correct: 1,
      exp: "The ABAP Dictionary supports Transparent tables, Pooled tables, and Cluster tables."
    },
    {
      q: "What is a Transparent Table in SAP ABAP?",
      options: ["A table that does not store any data", "A table in SAP that matches 1-to-1 in name and structure with the database", "A temporary table used during compilation", "A table containing encrypted data only"],
      correct: 1,
      exp: "Transparent tables exist with the same name, fields, and structure in both SAP and the database."
    },
    {
      q: "What is the relationship between a Domain and a Data Element?",
      options: ["Data Element defines technical type; Domain adds semantic labels", "Domain defines technical type; Data Element adds semantic labels", "They are identical objects", "Domains are only for transparent tables"],
      correct: 1,
      exp: "A Domain defines the data type and length; a Data Element defines labels and documentation."
    },
    {
      q: "What is a Foreign Key relationship used for in the ABAP Dictionary?",
      options: ["Encrypting table columns", "Ensuring referential data integrity between tables", "Linking tables to external databases", "Generating random IDs"],
      correct: 1,
      exp: "Foreign keys validate relationships between tables (e.g. check if a customer ID exists in Customer Master)."
    },
    {
      q: "Which Dictionary object defines value list constraints or ranges for validation?",
      options: ["Data Element", "Domain", "Structure", "Database View"],
      correct: 1,
      exp: "Value ranges and lists of fixed values are defined at the Domain level."
    },
    {
      q: "What is the purpose of a Search Help (F4 Help)?",
      options: ["Provides code templates to developers", "Displays a list of valid input values for a user screen field", "Searches the internet for SAP manuals", "Debugs runtime errors"],
      correct: 1,
      exp: "Search Helps display lists of valid values when a user triggers the F4 key on an input field."
    },
    {
      q: "What does a Database View accomplish in the ABAP Dictionary?",
      options: ["Physically duplicates table fields to save space", "Combines fields from multiple tables virtually for viewing", "Locks tables during updates", "Generates report lists automatically"],
      correct: 1,
      exp: "Views combine columns from multiple database tables virtually without storing duplicate data."
    },
    {
      q: "How does SAP HANA handle Pooled and Cluster tables?",
      options: ["Duplicates them across database clusters", "Consolidates and converts them to transparent tables", "Deprecates them entirely with no support", "Restricts access to read-only"],
      correct: 1,
      exp: "In SAP HANA/S4HANA, pooled and cluster tables are standardly consolidated into transparent tables."
    },
    {
      q: "What is the function of Lock Objects in the ABAP Dictionary?",
      options: ["Prevents unauthorized users from logging in", "Synchronizes concurrent database access (prevents double editing)", "Enforces password security standards", "Blocks tables during transports"],
      correct: 1,
      exp: "Lock Objects serialize database modifications to prevent multiple users from editing the same record."
    }
  ],
  "sap-abap-domain": [
    {
      q: "What is the primary role of a Domain in the ABAP Dictionary?",
      options: ["Defines user screen labels", "Defines technical attributes of a data type (data type, length, decimals)", "Stores database records", "Creates program structures"],
      correct: 1,
      exp: "Domains define technical attributes like data type, length, decimals, and value constraints."
    },
    {
      q: "Where in a Domain do you define fixed values or value ranges for input validation?",
      options: ["Definition tab", "Value Range tab", "Further Characteristics tab", "Short Description field"],
      correct: 1,
      exp: "The Value Range tab is where you define fixed values, intervals, or validation tables."
    },
    {
      q: "Can a Domain directly define user screen text labels or headers?",
      options: ["Yes, under properties", "No, text labels are defined at the Data Element level", "Only on S/4HANA systems", "Only for character fields"],
      correct: 1,
      exp: "Domains only own technical properties. Semantic descriptions and labels belong to Data Elements."
    },
    {
      q: "What does checking the 'Lower Case' option in a Domain do?",
      options: ["Converts all inputs to lowercase", "Allows input fields to retain lowercase letters during entry", "Saves database storage space", "Restricts variable names to lowercase"],
      correct: 1,
      exp: "Checking 'Lower Case' prevents SAP from automatically uppercase-converting user inputs."
    },
    {
      q: "Can multiple distinct Data Elements reference the same Domain?",
      options: ["Yes, promoting reusability and consistency", "No, each data element must have its own domain", "Only if they are in the same package", "Only on master data tables"],
      correct: 0,
      exp: "Yes. Multiple semantic elements (e.g. Billing Date, Ship Date) can share a technical domain (e.g. Date)."
    },
    {
      q: "What does a 'Conversion Routine' defined in a Domain accomplish?",
      options: ["Converts ABAP code to Java code", "Translates internally stored values to user-friendly display formats", "Converts tables to structures", "Optimizes query speed"],
      correct: 1,
      exp: "Conversion routines format internal data (e.g. adding leading zeros to '100' to store '0000000100')."
    },
    {
      q: "What prefix naming rule applies to custom customer-created Domains?",
      options: ["Must start with S or T", "Must start with Z or Y", "Must start with A or B", "Must contain Z_DOMAIN"],
      correct: 1,
      exp: "All custom ABAP Dictionary elements must start with Z or Y to prevent overriding SAP standards."
    },
    {
      q: "What is the impact of changing a Domain's technical length?",
      options: ["It has no impact on other objects", "It automatically updates all referencing Data Elements and Table Fields", "It corrupts the database table indexes", "It requires program recreation"],
      correct: 1,
      exp: "Changing a Domain updates all objects referencing it, maintaining data consistency centrally."
    },
    {
      q: "Which SE11 tab specifies the data type, character length, and decimal places?",
      options: ["Definition tab", "Value Range tab", "Attributes tab", "Technical Settings"],
      correct: 0,
      exp: "Data Type, length, and decimal places are configured on the Definition tab."
    },
    {
      q: "What happens to inputs if a Domain has a fixed value list defined and the input doesn't match?",
      options: ["The database query fails", "The SAP system raises an automatic input validation error on screens", "The input is ignored", "The program dumps"],
      correct: 1,
      exp: "SAP GUI raises an automatic error message if the user enters a value not defined in the domain's value list."
    }
  ],
  "sap-abap-data-element": [
    {
      q: "What is the primary role of a Data Element in the ABAP Dictionary?",
      options: ["Defines technical type properties", "Provides semantic meaning, descriptions, and screen labels", "Stores data records", "Locks database rows"],
      correct: 1,
      exp: "Data Elements define the semantic attributes (what a field means) and user labels."
    },
    {
      q: "What are the four text labels defined in a Data Element?",
      options: ["Short, Medium, Long, Header", "Page, Column, Row, Cell", "Prefix, Name, Suffix, Tag", "Title, Note, Alert, Warning"],
      correct: 0,
      exp: "Data Elements define Short (10), Medium (20), Long (40), and Header (55) character labels."
    },
    {
      q: "How does a Data Element obtain its technical data type and length properties?",
      options: ["By referencing a Domain or defining a Predefined Type", "From the database connection settings", "Directly from the ABAP program", "From the transport request"],
      correct: 0,
      exp: "A Data Element can reference a Domain or be defined directly with predefined dictionary types."
    },
    {
      q: "Which SE11 tab defines the text labels displayed next to input fields on user screens?",
      options: ["Data Type tab", "Further Characteristics tab", "Field Label tab", "Properties tab"],
      correct: 2,
      exp: "The Field Label tab defines the labels used next to screen inputs and table headers."
    },
    {
      q: "Why is referencing a Domain in a Data Element preferred over predefined types?",
      options: ["It makes the database faster", "Promotes technical reusability and central maintenance", "Saves memory spaces", "Allows lowercase fields"],
      correct: 1,
      exp: "Referencing domains allows technical definitions to be updated centrally across multiple data elements."
    },
    {
      q: "What prefix naming convention applies to custom customer-created Data Elements?",
      options: ["Must start with S or T", "Must start with Z or Y", "Must start with D_ or DE_", "Must contain CUSTOM"],
      correct: 1,
      exp: "Like all custom objects, custom Data Elements must start with Z or Y."
    },
    {
      q: "What happens when a user presses the F1 key on a field in a SAP GUI screen?",
      options: ["The debugger opens", "The system displays the documentation defined in the field's Data Element", "The F4 Search Help triggers", "The transaction exits"],
      correct: 1,
      exp: "F1 displays documentation created inside the Data Element, explaining the field to users."
    },
    {
      q: "Can a Data Element define an F4 Search Help relationship directly?",
      options: ["Yes, on the Further Characteristics tab", "No, Search Help is only for tables", "Only on HANA databases", "Only on date fields"],
      correct: 0,
      exp: "Yes. Search Helps can be bound directly to Data Elements on the Further Characteristics tab."
    },
    {
      q: "What is the standard maximum character length of the Long Field Label in a Data Element?",
      options: ["10 characters", "20 characters", "40 characters", "55 characters"],
      correct: 2,
      exp: "Long Label supports up to 40 characters; Short is 10, Medium is 20, and Header is 55."
    },
    {
      q: "How does a database table field get its semantic labels?",
      options: ["By typing labels directly in the table", "By referencing a Data Element during field definition", "From the table description field", "From the database settings"],
      correct: 1,
      exp: "Table fields inherit screen labels and documentation by referencing a Data Element."
    }
  ],
  "sap-abap-structure": [
    {
      q: "What is a Structure in the SAP ABAP Dictionary?",
      options: ["A table that stores configuration data", "A collection of fields grouped together that does not store data in the database", "An internal code loop", "A class definition block"],
      correct: 1,
      exp: "Structures are data templates in memory. Unlike tables, they do not store data physically."
    },
    {
      q: "How does a Structure differ fundamentally from a Database Table?",
      options: ["Structures can only contain character fields", "Tables physically store data; structures only define structures in memory", "Structures do not have active states", "Tables cannot be transported"],
      correct: 1,
      exp: "Tables represent physical database storage; structures represent type definitions used in memory."
    },
    {
      q: "What is a Work Area in ABAP programming?",
      options: ["A shared team repository", "A structure in memory used to hold a single row of data during processing", "A background task runner", "A transaction screen"],
      correct: 1,
      exp: "A Work Area is a structure variable that holds a single data record for processing."
    },
    {
      q: "Can you perform SQL INSERT statements directly into a Structure?",
      options: ["Yes, standard SQL inserts work", "No, structures do not exist as physical database tables", "Only if the structure is activated", "Only on S/4HANA systems"],
      correct: 1,
      exp: "Since structures do not store data physically, you cannot write SQL statements targeting them."
    },
    {
      q: "How do you embed/nest an existing structure inside another structure in SE11?",
      options: ["Using the .INCLUDE statement", "By typing the structure name in the field list", "By drag-and-drop", "Using the APPEND structure button"],
      correct: 0,
      exp: "Typing '.INCLUDE' in the component name column nests an existing structure into another."
    },
    {
      q: "What is a Deep Structure in ABAP?",
      options: ["A structure with more than 50 fields", "A structure that contains an internal table or reference type field", "A structure used for financial calculations", "An encrypted structure"],
      correct: 1,
      exp: "A structure containing complex fields (like internal tables or object reference types) is a deep structure."
    },
    {
      q: "Which SE11 radio button is selected to create a structure in the ABAP Dictionary?",
      options: ["Database table", "View", "Data type -> Structure", "Search help"],
      correct: 2,
      exp: "To create a structure, choose the Data Type radio button, then select Structure on the next screen."
    },
    {
      q: "Can custom Structures be used to define parameter types in custom Function Modules?",
      options: ["Yes, they define the structure of importing/exporting variables", "No, only standard types are allowed", "Only for importing parameters", "Only on ECC systems"],
      correct: 0,
      exp: "Yes. Structures are widely used to define interfaces for function modules, BAPIs, and methods."
    },
    {
      q: "What naming convention applies to custom customer-created structures?",
      options: ["Must start with S_ or ST_", "Must start with Z or Y", "Must start with C_ or D_", "Must contain STRUCT"],
      correct: 1,
      exp: "Custom structures must follow the Z or Y namespace rule to prevent naming conflicts."
    },
    {
      q: "What is the function of structure activation?",
      options: ["Initializes table memory spaces", "Makes the structure type available for reference in programs and tables", "Clears the active cache", "Deploys code to production"],
      correct: 1,
      exp: "Activation makes the structure definition visible to ABAP compilers and other Dictionary objects."
    }
  ],
  "sap-abap-tables": [
    {
      q: "What is a Transparent Table in SAP ABAP?",
      options: ["A table that has no physical existence", "A database table in SAP that matches 1-to-1 in name and structure with the database", "A temporary table used for calculations", "A read-only view"],
      correct: 1,
      exp: "Transparent tables exist identically in the Dictionary and the underlying database engine."
    },
    {
      q: "Which Delivery Class must be selected for standard customer master data tables?",
      options: ["Class A", "Class C", "Class L", "Class G"],
      correct: 0,
      exp: "Class A is for master and transaction data. Class C is for customizing data."
    },
    {
      q: "What does the 'Data Class' setting in Technical Settings determine?",
      options: ["The variable types allowed in the table", "The physical database storage space (tablespace) for organization", "The authorization limits", "The caching type"],
      correct: 1,
      exp: "Data Class allocates physical database space (e.g. APPL0 for Master Data, APPL1 for Transaction Data)."
    },
    {
      q: "What is the purpose of the 'Size Category' table setting?",
      options: ["Defines the maximum field length allowed", "Estimates the expected record volume to allocate initial database space", "Sets the file download limits", "Determines buffer sizes"],
      correct: 1,
      exp: "Size Category estimates the expected number of records, allowing the database to allocate space efficiently."
    },
    {
      q: "What defines a Primary Key in a database table?",
      options: ["A field that is encrypted", "A field or set of fields that uniquely identifies each row in the table", "The first column of a table", "The description field"],
      correct: 1,
      exp: "Primary keys ensure uniqueness; no two rows can have the same primary key values."
    },
    {
      q: "What is the purpose of Table Buffering?",
      options: ["Encrypts table contents", "Caches table data in application server memory to reduce database hits", "Validates records", "Speeds up transport times"],
      correct: 1,
      exp: "Buffering stores read data in RAM, speeding up access times by avoiding database lookups."
    },
    {
      q: "Which transaction code executes TMG-generated maintenance dialog screens?",
      options: ["SE11", "SE16N", "SM30", "SM31"],
      correct: 2,
      exp: "SM30 is the standard transaction code for table data maintenance."
    },
    {
      q: "What is the function of the 'Initial Values' checkbox in table field definitions?",
      options: ["Initializes the table during activations", "Determines if the field can accept or store null values", "Sets field values to zero", "Creates search lists"],
      correct: 1,
      exp: "Checking Initial Values ensures fields are initialized with default values instead of null values."
    },
    {
      q: "What is the maximum allowed number of key fields in a single database table?",
      options: ["10 key fields", "40 key fields", "120 key fields", "No limit"],
      correct: 2,
      exp: "SAP tables are limited to a maximum of 120 primary key fields."
    },
    {
      q: "What does database table activation accomplish?",
      options: ["Loads records into application server cache", "Creates or updates the physical table in the database engine", "Transports tables to QA", "Generates Excel reports"],
      correct: 1,
      exp: "Activation generates the physical SQL schema and compiles the table structure in the database."
    }
  ],
  "table-maintenance-generator": [
    {
      q: "What is the primary function of the Table Maintenance Generator (TMG)?",
      options: ["Creates table indexes", "Generates screen interfaces to allow users to maintain table records directly", "Speeds up data updates", "Validates foreign keys"],
      correct: 1,
      exp: "TMG automatically generates code and screens so users can edit, add, or delete data records."
    },
    {
      q: "Which transaction code runs the generated TMG interface?",
      options: ["SE11", "SE38", "SM30", "SM30N"],
      correct: 2,
      exp: "SM30 is the transaction code used to maintain table data through TMG interfaces."
    },
    {
      q: "What are the two screen maintenance types supported by TMG?",
      options: ["Single-step and Two-step", "Horizontal and Vertical", "List-based and Form-based", "Read-only and Write-only"],
      correct: 0,
      exp: "Single-step displays all fields in a grid list. Two-step provides a grid list and a detail screen."
    },
    {
      q: "How does Single-step maintenance differ from Two-step maintenance?",
      options: ["Single-step is read-only", "Single-step displays all fields on one grid screen; Two-step uses separate list and detail screens", "Single-step works only on S/4HANA", "Two-step is automatically buffered"],
      correct: 1,
      exp: "Single-step processes data on one overview screen. Two-step opens a detailed screen for edit/creation."
    },
    {
      q: "Which Authorization Group code is used for custom tables with no special security restrictions?",
      options: ["&NC&", "ADMIN", "DEFAULT", "OPEN"],
      correct: 0,
      exp: "'&NC&' stands for 'Not Classified' and is the standard authorization group for general custom tables."
    },
    {
      q: "How are TMG configurations transported between SAP environments?",
      options: ["They cannot be transported", "By assigning a package and capturing generated objects in a Transport Request", "Through manual copy-paste", "By exporting to XML files"],
      correct: 1,
      exp: "TMG objects are tied to a package and tracked inside standard Transport Requests."
    },
    {
      q: "Where inside SE11 do you find the Table Maintenance Generator utility?",
      options: ["GoTo -> Technical Settings", "Utilities -> Table Maintenance Generator", "Extras -> Maintenance Screen", "Check -> Maintenance Dialog"],
      correct: 1,
      exp: "TMG is accessed under Utilities -> Table Maintenance Generator on the SE11 table screen."
    },
    {
      q: "What must you do to TMG if you add a new column to the database table?",
      options: ["Nothing, it updates automatically", "Rebuild or regenerate the maintenance dialog screens", "Recreate the database table", "Write custom ABAP code"],
      correct: 1,
      exp: "If table structure changes, TMG screens must be regenerated to reflect the new columns."
    },
    {
      q: "What does the 'Find Screen Numbers' button do in TMG?",
      options: ["Searches the internet for screen styles", "Automatically identifies and suggests unused screen numbers for the dialog", "Debugs screen problems", "Clears active screen variables"],
      correct: 1,
      exp: "This utility scan the system and automatically proposes available screen numbers."
    },
    {
      q: "What is a Maintenance Dialog?",
      options: ["A pop-up modal asking for help", "The generated screens and program code created by TMG to process data", "A database relationship views", "A lock manager tool"],
      correct: 1,
      exp: "The Maintenance Dialog is the actual generated program containing screens and PAI/PBO logic."
    }
  ],
  "se11-transaction-code-sap-abap": [
    {
      q: "What is the primary function of the SE11 transaction code?",
      options: ["Writing and compiling ABAP reports", "Accessing the ABAP Dictionary to manage data structures", "Monitoring system performance", "Executing database queries directly"],
      correct: 1,
      exp: "SE11 is the central transaction code used to access and maintain the ABAP Dictionary."
    },
    {
      q: "Which object type in SE11 combines fields from multiple tables virtually for reporting?",
      options: ["Structures", "Database Views", "Lock Objects", "Search Helps"],
      correct: 1,
      exp: "Views combine data columns from multiple tables virtually for easier querying and reporting."
    },
    {
      q: "What is the purpose of Lock Objects in SE11?",
      options: ["Blocks users from accessing transaction codes", "Serializes database modifications to prevent concurrent data edits", "Secures code from transport", "Encrypts database tables"],
      correct: 1,
      exp: "Lock Objects prevent data inconsistencies by serializing access to database records."
    },
    {
      q: "Which key triggers F4 Search Help on selection screens?",
      options: ["F1", "F3", "F4", "F8"],
      correct: 2,
      exp: "F4 triggers Search Help dropdowns; F1 opens field documentation."
    },
    {
      q: "Which transaction code is used to browse table records directly (read-only)?",
      options: ["SE11", "SE38", "SE16N", "SM30"],
      correct: 2,
      exp: "SE16N (or SE16) is the standard transaction code used to display table contents."
    },
    {
      q: "What is a Search Help exit?",
      options: ["A button to close search helps", "A function module that overrides standard Search Help selection logic", "A database view", "A locking parameter"],
      correct: 1,
      exp: "Search Help exits let developers write custom ABAP logic to filter F4 search values dynamically."
    },
    {
      q: "What prefix is used for standard lock objects in SAP?",
      options: ["L_", "Z_", "E_", "LOCK_"],
      correct: 2,
      exp: "All lock object names must start with E (e.g. EZ_CUSTOMER) or S."
    },
    {
      q: "What are the two main lock types created by Lock Objects?",
      options: ["Read and Write", "Shared and Exclusive", "Primary and Secondary", "Local and Global"],
      correct: 1,
      exp: "Shared locks allow concurrent reads. Exclusive locks block all other access for safe edits."
    },
    {
      q: "Can you create secondary indexes for tables inside SE11?",
      options: ["Yes, under the Indexes button on the table screen", "No, indexes are managed by DBA Cockpit only", "Only on date columns", "Only on HANA databases"],
      correct: 0,
      exp: "Yes. Secondary indexes can be defined under the Indexes button in the SE11 table designer."
    },
    {
      q: "How do you verify the technical status of a database object in SE11?",
      options: ["GoTo -> Database Status", "Utilities -> Database Object -> Display", "Extras -> Technical Status", "Utilities -> Active Check"],
      correct: 1,
      exp: "This command checks the database catalog to confirm if the table exists physically on the server."
    }
  ],
  "sap-abap-interview-questions": [
    {
      q: "Which transaction code is the standard entry point to the ABAP Dictionary?",
      options: ["SE38", "SE80", "SE11", "SE16N"],
      correct: 2,
      exp: "SE11 is the central transaction code used to access and maintain all ABAP Dictionary objects."
    },
    {
      q: "What is the database mapping relationship of a Transparent Table in SAP ABAP?",
      options: ["1-to-Many mapping with database tables", "Many-to-1 mapping with database tables", "Direct 1-to-1 mapping with the database", "No mapping (exists only in memory)"],
      correct: 2,
      exp: "A transparent table has a direct 1-to-1 relationship with the physical database, matching it in name and columns."
    },
    {
      q: "What is defined at the Domain level in the ABAP Dictionary?",
      options: ["Screen text labels and titles", "Technical attributes like data type and length", "Foreign key relationships", "Delivery classes"],
      correct: 1,
      exp: "Domains define technical characteristics (such as data type, size, and value ranges), whereas Data Elements define semantic meaning."
    },
    {
      q: "Which transaction code is used to view database table records in a read-only data browser?",
      options: ["SE11", "SE38", "SE16N", "SM30"],
      correct: 2,
      exp: "SE16N (or SE16) is the standard Data Browser transaction used to view table records."
    },
    {
      q: "Which type of internal table is optimized for constant access time using a hash algorithm?",
      options: ["Standard Table", "Sorted Table", "Hashed Table", "Index Table"],
      correct: 2,
      exp: "Hashed tables use a hash key algorithm, providing O(1) constant access time regardless of table size."
    },
    {
      q: "What does the system variable SY-SUBRC return upon successful execution of an ABAP statement?",
      options: ["4", "1", "0", "A space"],
      correct: 2,
      exp: "A SY-SUBRC value of 0 indicates the last statement (such as a database select or search) executed successfully."
    },
    {
      q: "What is a BAPI?",
      options: ["A database view type", "A standardized RFC-enabled function module that exposes business objects", "A program enhancement point", "A security authorization object"],
      correct: 1,
      exp: "BAPIs are standardized, RFC-enabled function modules used to interface with SAP business objects from external systems."
    },
    {
      q: "What is the difference between a Function Module and a Subroutine?",
      options: ["Subroutines can run globally; Function Modules are local only", "Function Modules are global objects managed in SE37; Subroutines are local to programs", "Subroutines have importing/exporting parameters; Function Modules do not", "There is no difference"],
      correct: 1,
      exp: "Function Modules are global repository objects created in SE37, while subroutines are local routines defined within specific programs."
    },
    {
      q: "How does MOVE-CORRESPONDING copy data between two structured work areas?",
      options: ["By copying columns in order of position", "By matching matching field names, ignoring positions", "By converting types automatically to string", "It duplicates the structures dynamically"],
      correct: 1,
      exp: "MOVE-CORRESPONDING copies values by matching field names, regardless of their position in the structure."
    },
    {
      q: "Which prefix namespaces are reserved for custom customer-created developments in SAP?",
      options: ["A and B", "S and T", "Z and Y", "X and W"],
      correct: 2,
      exp: "Custom programs, tables, and dictionary objects must start with Z or Y to prevent overriding SAP standard objects."
    }
  ],
  "sap-opportunities-freshers": [
    {
      q: "What are the two major career tracks in the SAP ecosystem?",
      options: ["Development and Database Tracks", "Functional and Technical Tracks", "Administrative and Sales Tracks", "Implementation and Testing Tracks"],
      correct: 1,
      exp: "SAP careers are broadly split into Functional (business process configurations) and Technical (programming/development) tracks."
    },
    {
      q: "Which background is most suitable for the SAP FICO module?",
      options: ["Mechanical Engineering", "Computer Science", "Finance, Accounting, or Commerce", "Human Resource Management"],
      correct: 2,
      exp: "SAP FICO handles Finance and Controlling, making it ideal for commerce, accounting, or finance backgrounds."
    },
    {
      q: "What is the primary focus of the SAP MM (Materials Management) module?",
      options: ["Customer order shipping and billing", "Financial general ledger reporting", "Procurement, purchasing, and inventory management", "Employee payroll and time tracking"],
      correct: 2,
      exp: "SAP MM is dedicated to the procurement cycle, inventory management, and vendor relationships."
    },
    {
      q: "Which module manages employee master data, payroll, time management, and recruitment in SAP?",
      options: ["SAP FICO", "SAP HCM", "SAP BASIS", "SAP SD"],
      correct: 1,
      exp: "SAP HCM (Human Capital Management) manages all human resource processes."
    },
    {
      q: "What is the primary role of a BASIS consultant in SAP?",
      options: ["Writing custom ABAP report code", "Configuring sales order pricing agreements", "System administration, database maintenance, user authorizations, and installations", "Testing application workflows"],
      correct: 2,
      exp: "Basis consultants manage the core system administration, installations, user management, and NetWeaver platform performance."
    },
    {
      q: "Which technology layer represents SAP's modern, web-based user interface (UX)?",
      options: ["SAP GUI", "SAP Fiori", "SAP NetWeaver", "ABAP Editor"],
      correct: 1,
      exp: "SAP Fiori is the modern HTML5/UI5 web-based user experience for SAP applications."
    },
    {
      q: "What type of entry-level SAP job focuses on troubleshooting ticket-based issues for active systems?",
      options: ["SAP Data Migration Analyst", "SAP Support Analyst", "SAP Project Manager", "SAP Basis Lead"],
      correct: 1,
      exp: "Support Analysts handle user tickets, troubleshooting and fixing issues in existing live SAP environments."
    },
    {
      q: "Why is it recommended to target SAP service providers (like TCS, Infosys, Capgemini) instead of end-users for entry-level roles?",
      options: ["Service providers pay higher initial salaries", "Service providers have large trainee programs and are structured to train freshers", "End-users do not use SAP", "Service providers do not require certifications"],
      correct: 1,
      exp: "SAP consulting and service firms have large teams, training academies, and resources to onboard and train entry-level freshers."
    },
    {
      q: "Which tool is commonly used to migrate legacy data into SAP tables?",
      options: ["SE38", "LSMW", "SE80", "SE16N"],
      correct: 1,
      exp: "LSMW (Legacy System Migration Workbench) and BAPIs are standard tools used for migrating external legacy data into SAP."
    },
    {
      q: "What is a common mistake that freshers make when learning SAP?",
      options: ["Focusing on only one module", "Practicing configurations in a sandbox system", "Attempting to learn multiple modules simultaneously without focusing", "Documenting transaction codes in a portfolio"],
      correct: 2,
      exp: "Focusing on a single module is crucial. Trying to learn FICO, MM, and ABAP all at once creates confusion and dilutes expertise."
    }
  ],
  "sap-abap-career-roadmap": [
    {
      q: "What is defined as the first stage of the SAP ABAP fresher roadmap?",
      options: ["Learning Dialog Programming", "Mastering SAP basics, architecture, and navigation", "Building complex ALV reports", "Writing OOP classes"],
      correct: 1,
      exp: "Stage 1 focuses on SAP basics, architecture, clients, and transaction navigation before writing any code."
    },
    {
      q: "Which transaction code is used to design screens and layout panels in Dialog Programming?",
      options: ["SE38", "SE11", "SE51", "SE93"],
      correct: 2,
      exp: "SE51 is the Screen Painter used for Dialog module screen layouts."
    },
    {
      q: "What are the two main execution blocks in Dialog Programming screen flow logic?",
      options: ["START-OF-SELECTION and END-OF-SELECTION", "PBO (Process Before Output) and PAI (Process After Input)", "LOAD-OF-PROGRAM and INITIALIZATION", "GET and SET parameters"],
      correct: 1,
      exp: "Dialog screen logic revolves around PBO (to prepare screens) and PAI (to handle user action requests)."
    },
    {
      q: "Which transaction code is used to create custom transaction codes (shortcuts) for ABAP programs?",
      options: ["SE38", "SE93", "SE11", "SM50"],
      correct: 1,
      exp: "SE93 is the transaction code builder used to create custom T-codes in SAP."
    },
    {
      q: "What is the standard transaction code for tracking database query performance and runtimes (SQL Trace)?",
      options: ["ST05", "SM50", "SE11", "WE02"],
      correct: 0,
      exp: "ST05 is the performance trace utility used to analyze SQL queries and RFC performance."
    },
    {
      q: "Which enhancement technique lets developers insert custom code directly before or after any line of a standard program?",
      options: ["User Exit", "Implicit Enhancement Spot", "Customer Exit", "Function BAPI"],
      correct: 1,
      exp: "Implicit enhancements are built-in hooks that allow developers to append custom code at the start or end of subroutines, methods, and functions."
    },
    {
      q: "What is the key benefit of modern ABAP Restful Application Programming (RAP)?",
      options: ["It eliminates the need for database tables", "It allows developers to build modern OData services and SAP Fiori apps on S/4HANA", "It is only for legacy systems", "It is run entirely on client browsers"],
      correct: 1,
      exp: "RAP provides the architecture to build cloud-ready OData services and UI5/Fiori applications on SAP S/4HANA."
    },
    {
      q: "Which system monitoring transaction is used to inspect active work processes on the application server?",
      options: ["SE38", "SM50", "ST05", "WE02"],
      correct: 1,
      exp: "SM50 displays all active work processes (dialog, batch, spool, update) running on the application server instance."
    },
    {
      q: "How should an ABAP fresher document self-study work on their resume?",
      options: ["By claiming years of corporate project experience they do not have", "By listing specific T-codes, dictionary setups, and custom programs they have configured", "By simply writing 'Good knowledge of SAP'", "By copy-pasting standard product brochures"],
      correct: 1,
      exp: "Detailing specific sandbox configurations (like SE11 table setups, ALV report coding, and debugger usage) proves hands-on capability."
    },
    {
      q: "According to the roadmap timeline, how long does it typically take to go from a beginner to job-ready?",
      options: ["1-2 weeks", "6-9 months", "3-4 years", "1 month"],
      correct: 1,
      exp: "A realistic timeline of consistent study and hands-on practice to land an entry-level ABAP developer role is 6 to 9 months."
    }
  ],
  "sap-abap-career-2026": [
    {
      q: "What is the major event driving massive demand for SAP ABAP developers in 2026?",
      options: [
        "The deprecation of Python",
        "The global migration of enterprise systems from legacy SAP ECC to S/4HANA",
        "The replacement of all databases with Oracle",
        "The transition to open-source ERP systems"
      ],
      correct: 1,
      exp: "The migration of hundreds of thousands of companies from SAP ECC to S/4HANA is the largest driver of developer demand."
    },
    {
      q: "What is the deadline year set by SAP for the end of mainstream support for legacy SAP ECC systems?",
      options: ["2024", "2027", "2032", "2040"],
      correct: 1,
      exp: "SAP officially announced the end of mainstream maintenance for ECC by 2027, with extended support running through 2030."
    },
    {
      q: "Which modern programming model is standard for building transactional applications in S/4HANA?",
      options: [
        "The Dialog Module Pool",
        "RAP (RESTful Application Programming Model)",
        "BTE (Business Transaction Events)",
        "The Web Dynpro framework"
      ],
      correct: 1,
      exp: "RAP (RESTful Application Programming Model) is the standard modern model for building web-based transactional apps in S/4HANA."
    },
    {
      q: "What is the primary IDE used for modern SAP ABAP Cloud development?",
      options: [
        "SAP GUI (SE38)",
        "Visual Studio Code",
        "Eclipse with ABAP Development Tools (ADT)",
        "Notepad++"
      ],
      correct: 2,
      exp: "Modern SAP development uses Eclipse with ABAP Development Tools (ADT) instead of standard SE38 in SAP GUI."
    },
    {
      q: "How does the 'Code Pushdown' concept in SAP ABAP on HANA improve performance?",
      options: [
        "By writing code that processes data on the database layer rather than transferring all data to the application server",
        "By compiling the code to client-side Javascript",
        "By running loops inside user screens",
        "By using larger RAM blocks on local desktops"
      ],
      correct: 0,
      exp: "Code Pushdown means moving intensive calculations and logic down into the database (HANA) layer to execute quickly, rather than pulling bulk rows to the application server."
    },
    {
      q: "What approximate salary range can a junior SAP ABAP developer with 1–3 years of experience expect in India in 2026?",
      options: ["₹1 LPA – ₹3 LPA", "₹6 LPA – ₹12 LPA", "₹25 LPA – ₹40 LPA", "₹50 LPA+"],
      correct: 1,
      exp: "Junior ABAP developers with 1–3 years of experience generally earn around ₹6.0 LPA to ₹12.0 LPA in India."
    },
    {
      q: "Which category of company runs SAP internally and hires in-house ABAP teams for support and maintenance?",
      options: [
        "IT Service Providers",
        "Big Consulting Firms",
        "End-User Companies (e.g. Pharma, Retail, Manufacturing)",
        "Cloud Hosting Providers"
      ],
      correct: 2,
      exp: "End-User companies run SAP to manage their own business operations and maintain in-house IT support teams."
    },
    {
      q: "Which concept is promoted in the modern 'Clean ABAP' style guide?",
      options: [
        "Using as many global variables as possible",
        "Writing modular, testable code with automated ABAP Unit tests",
        "Avoiding comments completely",
        "Using macros for all loops"
      ],
      correct: 1,
      exp: "Clean ABAP standards emphasize modularity, readability, and writing automated tests (ABAP Unit) to verify code correctness."
    },
    {
      q: "What is a key advantage of SAP ABAP skills in terms of global career mobility?",
      options: [
        "ABAP only works in the country where you learn it",
        "SAP installations are standardized worldwide, so ABAP skills are highly portable globally",
        "ABAP developers don't need work visas",
        "Every country has different programming syntax for ABAP"
      ],
      correct: 1,
      exp: "Because SAP is a standardized global ERP platform, ABAP developers can transition their skills internationally (Germany, Middle East, USA, etc.) easily."
    },
    {
      q: "What is a primary challenge for freshers trying to learn ABAP compared to general web development?",
      options: [
        "ABAP has no database connectivity",
        "ABAP syntax is written in German",
        "Getting access to a licensed SAP server environment is not free and easy",
        "ABAP is not used by large businesses"
      ],
      correct: 2,
      exp: "Accessing a licensed SAP system environment (sandbox) requires server subscriptions or corporate credentials, presenting a higher barrier to entry than free open-source stacks."
    }
  ],
  "sap-fiori-free-2026": [
    {
      q: "What is the fundamental difference between SAP Fiori and SAPUI5?",
      options: [
        "SAPUI5 is a database; SAP Fiori is a design tool",
        "SAP Fiori is the design system (guidelines/look); SAPUI5 is the actual development framework (code/JS)",
        "SAP Fiori is only for ECC; SAPUI5 is only for S/4HANA",
        "There is no difference; they are two names for the same compiler"
      ],
      correct: 1,
      exp: "SAP Fiori defines the user experience guidelines and design standards. SAPUI5 is the HTML5/Javascript framework developed by SAP to implement these designs."
    },
    {
      q: "Which structural pattern is standard for developing SAPUI5 applications?",
      options: [
        "Singleton Pattern",
        "Model-View-Controller (MVC) Architecture",
        "Microservices Layout",
        "Sequential Script Execution"
      ],
      correct: 1,
      exp: "SAPUI5 standardizes application design using the Model-View-Controller (MVC) architecture."
    },
    {
      q: "Which communication protocol acts as the API layer connecting SAP backend systems with SAP Fiori user interfaces?",
      options: [
        "OData (Open Data Protocol)",
        "FTP (File Transfer Protocol)",
        "SOAP (Simple Object Access Protocol) Web Services",
        "RFC (Remote Function Call)"
      ],
      correct: 0,
      exp: "OData is a REST-based standard protocol that serves as the data bridge between the SAP backend and front-end Fiori applications."
    },
    {
      q: "What is the primary role of the SAP Fiori Launchpad?",
      options: [
        "To compile backend ABAP programs",
        "To serve as the single, role-based entry point for users to launch multiple Fiori web applications",
        "To back up database tables to the cloud",
        "To design custom vector icons"
      ],
      correct: 1,
      exp: "Fiori Launchpad is the central, responsive portal homepage where users click tile shortcuts to open authorized applications."
    },
    {
      q: "Which technology stack is mandatory for beginners to learn before starting with the SAPUI5 framework?",
      options: [
        "C++ and Java",
        "Standard Web Stack (HTML5, CSS3, and JavaScript)",
        "ABAP OOP and SQL Scripts",
        "Python and Django"
      ],
      correct: 1,
      exp: "Because SAPUI5 runs in browser sandboxes, developers must understand HTML5, CSS3, and core JavaScript/ES6 before building apps."
    },
    {
      q: "In a SAPUI5 application, what defines the structure and layout of the user interface screen?",
      options: [
        "The Controller",
        "The View (commonly declared in XML)",
        "The Database Schema",
        "The Model"
      ],
      correct: 1,
      exp: "Views (mostly XML files) define the UI components (buttons, input boxes, tables) and layouts of SAPUI5 screens."
    },
    {
      q: "What does the 'Model' represent in the SAPUI5 MVC pattern?",
      options: [
        "The visual appearance of the screen",
        "The data repository holding variable values and table records",
        "The event handlers and logic functions",
        "The layout grid classes"
      ],
      correct: 1,
      exp: "The Model stores and manages the application's data (e.g. JSON model, OData model) which is bound to UI controls."
    },
    {
      q: "What are 'Fiori Elements' in the context of SAP Fiori development?",
      options: [
        "The database columns of a table",
        "Pre-built, design-compliant templates (such as List Reports or Object Pages) that reduce custom coding",
        "CSS styling sheets used to change background colors",
        "Visual debugging tools"
      ],
      correct: 1,
      exp: "Fiori Elements are standard templates provided by SAP to build standard-compliant applications quickly without writing custom views or controllers."
    },
    {
      q: "Which transaction code in the SAP backend is used to build and configure OData services?",
      options: [
        "SE38",
        "SEGW (Gateway Service Builder)",
        "SE11",
        "SM30"
      ],
      correct: 1,
      exp: "SEGW is the Service Gateway Builder used to create, define, and generate OData backend entities in SAP."
    },
    {
      q: "What does the 'Adaptive' design principle of SAP Fiori mean?",
      options: [
        "The app adapts its data based on the user's local timezone",
        "The app runs with the same layout regardless of the screen width",
        "The app layout responds fluidly to fit any screen size (mobile, tablet, or desktop)",
        "The app compiles itself automatically to run offline"
      ],
      correct: 2,
      exp: "Adaptive (or responsive) design means the layout shifts and adapts components smoothly to remain fully usable across different device screen sizes."
    }
  ],
  "sap-fiori-benefits": [
    {
      q: "What is the core design philosophy of SAP Fiori compared to legacy SAP systems?",
      options: [
        "It is module-centric, grouping all fields on a single screen",
        "It is role-centric, focusing on tasks and personalized workspaces rather than modules",
        "It is database-centric, executing RAW SQL statements directly in the browser",
        "It is hardware-centric, optimized only for curved desktop monitors"
      ],
      correct: 1,
      exp: "SAP Fiori apps are role-based and task-based. Users see only the fields and applications relevant to their daily business role via a personalized Launchpad."
    },
    {
      q: "Which problem of traditional SAP GUI did SAP Fiori solve by using a personalized Launchpad?",
      options: [
        "Slow internet connection speeds in offices",
        "The need for users to memorize complex 4-character transaction codes (like ME21N or VA01)",
        "The requirement to install separate graphic driver cards on desktops",
        "The lack of support for relational database storage"
      ],
      correct: 1,
      exp: "By using a personalized tile-based Launchpad, Fiori eliminates the need for end-users to memorize cryptic 4-character transaction codes."
    },
    {
      q: "How does SAP Fiori ensure mobile responsiveness across devices?",
      options: [
        "By forcing users to install a heavy desktop emulator on their smartphones",
        "By generating separate desktop and mobile URLs for each application",
        "Using responsive layout templates that scale and adapt components fluidly across viewports",
        "By disabling advanced controls and graphics on smaller screens"
      ],
      correct: 2,
      exp: "Fiori applications are responsive by design, using layout grids that automatically adapt to desktops, tablets, and smartphones."
    },
    {
      q: "What backend technology is used in SAP S/4HANA to power real-time Fiori analytics directly in database memory?",
      options: [
        "Core Data Services (CDS) Views",
        "Microsoft Excel Pivot tables",
        "Flat XML text files",
        "Classic ALV reports"
      ],
      correct: 0,
      exp: "CDS (Core Data Services) Views are used in S/4HANA to push logic down to the HANA in-memory database, fetching only what is needed for Fiori displays."
    },
    {
      q: "In the context of SAP Fiori, what is 'Key User Adaptation'?",
      options: [
        "A framework for changing database keys dynamically during table lookup",
        "A tool allowing business users to visually customize screens (add/hide fields) without writing code",
        "A set of guidelines for configuring network security permissions",
        "A developer training model for learning ABAP scripting"
      ],
      correct: 1,
      exp: "Key User Adaptation allows business experts to customize the UI layout (e.g. rearrange fields, change labels) visually, without modification of the core code."
    },
    {
      q: "How does the Fiori extensibility model compare to legacy SAP GUI screen customizations?",
      options: [
        "Fiori modifications are built directly into standard SAP code, making upgrades faster",
        "Fiori requires renaming standard tables in transaction SE11",
        "Fiori uses upgrade-safe key user tools and developer extensions that leave standard core code untouched",
        "Fiori does not support customizations at all"
      ],
      correct: 2,
      exp: "Fiori supports upgrade-safe extensibility without modifying standard core code, significantly reducing maintenance overhead during upgrades."
    },
    {
      q: "What is the primary benefit of embedding real-time analytics into operational workflows in SAP Fiori?",
      options: [
        "It requires purchasing separate analytics servers from third-party vendors",
        "Decision-makers have immediate contextual metrics on the screen where they take actions",
        "It disables transactional actions so users only look at graphs",
        "It allows downloading reports as large PDF files automatically"
      ],
      correct: 1,
      exp: "Embedded analytics allow operational users to see contextual metrics (like vendor performance or budget constraints) on the same screen where approvals or postings occur."
    },
    {
      q: "What happens when an approval workflow is triggered in a notification-driven Fiori Launchpad?",
      options: [
        "An email script automatically deletes the request after 10 minutes",
        "The user receives a real-time push notification and can review and approve the request in a single click",
        "The user must navigate back to legacy SAP GUI to execute SM30",
        "The system freezes the active database table until approval is completed"
      ],
      correct: 1,
      exp: "Notifications allow users to process approvals or workflows directly inside the Launchpad viewport with minimum navigation."
    },
    {
      q: "What is a key business factor that lowers the Total Cost of Ownership (TCO) when adopting SAP Fiori?",
      options: [
        "Reduced user training time, fewer helpdesk tickets, and faster process cycle times",
        "The removal of the underlying database server requirement",
        "Replacing all developers with low-code business analysts",
        "Running all company operations on free-tier sandbox servers"
      ],
      correct: 0,
      exp: "Lower training costs, fewer user errors, faster cycles, and upgrade-safe customizations combine to reduce the long-term TCO of running SAP systems."
    },
    {
      q: "Why is SAP Fiori considered the foundation for the 'Intelligent Enterprise' in modern SAP systems?",
      options: [
        "It requires artificial intelligence to run basic search commands",
        "It is the primary user interface where intelligent features like SAP Joule and predictive metrics are presented",
        "It is a server operating system that manages hardware queues",
        "It automatically writes ABAP code using standard machine learning modules"
      ],
      correct: 1,
      exp: "Modern AI copilots (like SAP Joule), anomaly detection, and predictive features are served to users directly through the Fiori user interface."
    }
  ],
  "sapui5-introduction-architecture": [
    {
      q: "What does SAPUI5 stand for?",
      options: [
        "SAP User Interface for HTML5",
        "SAP Universal Interface 5",
        "SAP Utility Integration v5",
        "SAP User Interaction Framework"
      ],
      correct: 0,
      exp: "SAPUI5 stands for SAP User Interface for HTML5."
    },
    {
      q: "What is the open-source version of SAPUI5 called?",
      options: [
        "FreeUI5",
        "OpenUI5",
        "CommunityUI5",
        "WebUI5"
      ],
      correct: 1,
      exp: "OpenUI5 is the open-source version of SAPUI5 released under the Apache 2.0 license."
    },
    {
      q: "Which of the following is NOT a feature of the Core Framework (Foundation Layer)?",
      options: [
        "Component lifecycle management",
        "Module loading system",
        "SmartTable control generation",
        "Localization and theming engine"
      ],
      correct: 2,
      exp: "SmartTable is part of the Control Library layer (specifically enterprise SAPUI5), not the Core Framework foundation layer."
    },
    {
      q: "Which view format is most commonly used and recommended by SAP for SAPUI5 applications?",
      options: [
        "JavaScript Views",
        "JSON Views",
        "HTML Views",
        "XML Views"
      ],
      correct: 3,
      exp: "XML Views are the SAP-recommended format, providing clean separation between UI layout and controller logic."
    },
    {
      q: "In the MVC pattern, which component binds elements to the data source and stores state?",
      options: [
        "Model",
        "View",
        "Controller",
        "Router"
      ],
      correct: 0,
      exp: "The Model holds the data and updates the View automatically via data binding."
    },
    {
      q: "Which protocol is natively integrated in SAPUI5 to connect to SAP ABAP backends?",
      options: [
        "GraphQL",
        "OData",
        "gRPC",
        "SOAP Web Services"
      ],
      correct: 1,
      exp: "OData (Open Data Protocol) is the standard REST-based protocol natively supported by SAPUI5 ODataModels."
    },
    {
      q: "What application descriptor file contains routing configurations and application metadata?",
      options: [
        "manifest.json",
        "package.json",
        "Component.js",
        "neo-app.json"
      ],
      correct: 0,
      exp: "The manifest.json is the application descriptor where routing patterns, targets, and models are configured."
    },
    {
      q: "What is the active state micro-interaction default for buttons in the design language?",
      options: [
        "Background color change",
        "transform: scale(0.95)",
        "Box shadow glow",
        "Border width increase"
      ],
      correct: 1,
      exp: "As per the Apple-design-analysis in DESIGN.md, the active press state is scale(0.95)."
    },
    {
      q: "Why did SAP build SAPUI5 instead of using React or Angular?",
      options: [
        "To charge developers license fees",
        "For native OData support, Fiori compliance, enterprise-grade controls, and built-in accessibility",
        "React and Angular didn't exist in 2026",
        "SAPUI5 does not use JavaScript"
      ],
      correct: 1,
      exp: "SAPUI5 was custom-built to support complex enterprise controls, accessibility, Fiori styling, and native SAP backend integration."
    },
    {
      q: "Where does the business logic of an SAPUI5 app live in MVC?",
      options: [
        "Model",
        "View",
        "Controller",
        "manifest.json"
      ],
      correct: 2,
      exp: "The Controller contains the application logic, event handlers, and data formatting functions."
    }
  ],
  "creating-first-sapui5-application": [
    {
      q: "Where does all your application code live in a standard SAPUI5 project structure?",
      options: [
        "Inside the root folder directly",
        "Inside the webapp folder",
        "Inside the dist folder",
        "Inside the node_modules folder"
      ],
      correct: 1,
      exp: "All source code (views, controllers, models, configuration) lives in the webapp folder."
    },
    {
      q: "Which file serves as the main configuration center and identity card for an SAPUI5 app?",
      options: [
        "Component.js",
        "manifest.json",
        "ui5.yaml",
        "package.json"
      ],
      correct: 1,
      exp: "manifest.json is the application descriptor that configures models, views, routing, and libraries."
    },
    {
      q: "What is the entry point file that Fiori Launchpad loads to launch the app?",
      options: [
        "index.html",
        "Component.js",
        "manifest.json",
        "App.view.xml"
      ],
      correct: 1,
      exp: "Component.js is the entry point of the app, initializing the router and settings."
    },
    {
      q: "What does i18n stand for in software development?",
      options: [
        "Internal Integration 18",
        "Internationalization",
        "Information 18 Networks",
        "Interface 18 Nodes"
      ],
      correct: 1,
      exp: "i18n stands for Internationalization (18 letters between 'I' and 'n')."
    },
    {
      q: "Which library defines the primary Fiori controls like Page, List, ObjectListItem, and SearchField?",
      options: [
        "sap.ui.core",
        "sap.m",
        "sap.ui.layout",
        "sap.f"
      ],
      correct: 1,
      exp: "The sap.m library (M for mobile/main) contains the core responsive controls used in Fiori applications."
    },
    {
      q: "What is the correct syntax for data binding to the i18n model in an XML View?",
      options: [
        "{productListTitle}",
        "{i18n/productListTitle}",
        "{i18n>productListTitle}",
        "{@i18n.productListTitle}"
      ],
      correct: 2,
      exp: "Binding syntax uses '{modelName>propertyName}'. For the i18n model, it is '{i18n>productListTitle}'."
    },
    {
      q: "What controller lifecycle method runs automatically when a view initializes for the first time?",
      options: [
        "onInit",
        "onBeforeRendering",
        "onAfterRendering",
        "onExit"
      ],
      correct: 0,
      exp: "onInit is the standard hook that fires when the view is created, ideal for setting up models and data."
    },
    {
      q: "Which class is used to filter list items in an SAPUI5 controller?",
      options: [
        "sap.ui.model.Filter",
        "sap.ui.model.Query",
        "sap.ui.model.Sorter",
        "sap.ui.model.Search"
      ],
      correct: 0,
      exp: "sap.ui.model.Filter is used to filter bindings in SAPUI5 controllers."
    },
    {
      q: "How is a view connected to its corresponding controller in SAPUI5?",
      options: [
        "Configured in manifest.json routing section",
        "Declared via the controllerName attribute in the View tag",
        "Registered in Component.js init method",
        "Linked by matching file names automatically"
      ],
      correct: 1,
      exp: "The controllerName attribute in the root <mvc:View> tag maps the view to its Javascript controller class."
    },
    {
      q: "What is the standard configuration file for running a UI5 application locally via UI5 CLI?",
      options: [
        "ui5.yaml",
        "manifest.json",
        "package.json",
        "webpack.config.js"
      ],
      correct: 0,
      exp: "ui5.yaml configures the UI5 dev server, dependencies, and libraries for local tooling."
    }
  ],
  "sap-btp-explained": [
    {
      q: "What does SAP BTP stand for?",
      options: [
        "SAP Business Technology Platform",
        "SAP Business Transition Portal",
        "SAP Binary Technical Protocol",
        "SAP Base Technology Platform"
      ],
      correct: 0,
      exp: "SAP BTP stands for SAP Business Technology Platform."
    },
    {
      q: "What is the core database service in the Database and Data Management pillar of BTP?",
      options: [
        "SAP HANA Cloud",
        "SAP MaxDB",
        "SAP ASE Sybase",
        "Oracle DB for SAP"
      ],
      correct: 0,
      exp: "SAP HANA Cloud is the primary in-memory database service on BTP."
    },
    {
      q: "Which tool in the Analytics pillar enables business planning, interactive dashboards, and machine learning forecasts?",
      options: [
        "SAP Analytics Cloud (SAC)",
        "SAP Crystal Reports",
        "SAP BusinessObjects",
        "SAP Lumira"
      ],
      correct: 0,
      exp: "SAP Analytics Cloud (SAC) is SAP's primary cloud BI and planning platform."
    },
    {
      q: "What is the low-code application development service on BTP called?",
      options: [
        "SAP Build Apps",
        "SAP Business Application Studio",
        "ABAP Cloud",
        "SAP Web IDE"
      ],
      correct: 0,
      exp: "SAP Build Apps allows drag-and-drop creation of mobile and web applications."
    },
    {
      q: "Which service under the Integration pillar is used to build visual mapping flows between SAP and non-SAP systems?",
      options: [
        "SAP Integration Suite (CPI)",
        "SAP API Management",
        "SAP Event Mesh",
        "SAP Process Orchestration"
      ],
      correct: 0,
      exp: "SAP Integration Suite (specifically Cloud Integration / CPI) is the primary service for mapping flows."
    },
    {
      q: "What is the hierarchy structure of accounts in SAP BTP?",
      options: [
        "Global Account → Subaccounts → Spaces",
        "Subaccounts → Global Account → Spaces",
        "Global Account → Spaces → Subaccounts",
        "Tenant → Account → Spaces"
      ],
      correct: 0,
      exp: "The BTP account structure is: Global Account (root level) → Subaccounts (landscapes) → Spaces (runtimes)."
    },
    {
      q: "Which hyperscalers run the BTP physical cloud infrastructure?",
      options: [
        "Only SAP's proprietary data centers",
        "AWS, Microsoft Azure, Google Cloud, and SAP",
        "Only AWS and Azure",
        "Oracle Cloud and IBM Cloud only"
      ],
      correct: 1,
      exp: "SAP BTP runs on all major hyperscalers (AWS, Azure, Google Cloud) as well as SAP's own infrastructure."
    },
    {
      q: "What is the difference between custom S/4HANA extensions on BTP versus traditional ABAP customizations?",
      options: [
        "BTP is on-premise only",
        "BTP allows side-by-side extensions without modifying the stable S/4HANA core system",
        "BTP does not support ABAP",
        "BTP directly edits standard SAP source code"
      ],
      correct: 1,
      exp: "BTP enables side-by-side extensions, keeping the core system clean and upgrade-safe."
    },
    {
      q: "What BTP environment is used for running containerized, Kubernetes-native microservices?",
      options: [
        "Cloud Foundry",
        "Kyma",
        "ABAP Environment",
        "Neo"
      ],
      correct: 1,
      exp: "Kyma is the Kubernetes-based environment on BTP, ideal for container-native workloads."
    },
    {
      q: "Is there a free tier version of SAP BTP available for learning?",
      options: [
        "No, BTP requires a paid enterprise license",
        "Yes, a free tier is available with limited usage of major services for learning",
        "Only for partner companies",
        "Only for 7 days"
      ],
      correct: 1,
      exp: "Yes, SAP BTP offers an ongoing free tier account for learning and prototyping with major services."
    }
  ],
  "sap-btp-integration-suite-explained": [
    {
      q: "What type of cloud service is SAP BTP Integration Suite?",
      options: [
        "Infrastructure as a Service (IaaS)",
        "Integration Platform as a Service (iPaaS)",
        "Software as a Service (SaaS)",
        "Database as a Service (DBaaS)"
      ],
      correct: 1,
      exp: "SAP Integration Suite is an iPaaS (Integration Platform as a Service) used for connecting SAP and non-SAP cloud and on-premise systems."
    },
    {
      q: "Which BTP Integration Suite capability is used to build visual integration flows (iFlows) to translate, map, and route data?",
      options: [
        "API Management",
        "Cloud Integration (CPI)",
        "Event Mesh",
        "Open Connectors"
      ],
      correct: 1,
      exp: "Cloud Integration (historically CPI) is the core engine where developers design, deploy, and monitor visual iFlow pipelines."
    },
    {
      q: "Which scripting language is natively and most commonly used for custom message transformations inside SAP Cloud Integration (CPI) iFlows?",
      options: [
        "ABAP",
        "Python",
        "Groovy",
        "C#"
      ],
      correct: 2,
      exp: "Groovy Script (and JavaScript) is natively supported by CPI for writing custom logic, header manipulations, and advanced data transformations."
    },
    {
      q: "What is the purpose of the API Proxy inside the API Management capability?",
      options: [
        "To run complex data translation scripts",
        "To act as a secure gateway sitting in front of actual backend endpoints",
        "To cache large database files locally",
        "To connect to government portals only"
      ],
      correct: 1,
      exp: "An API Proxy acts as a facade, decoupling frontend clients from backend services to handle authentication, rate limiting, and analytics securely."
    },
    {
      q: "In an event-driven architecture, what role does SAP Event Mesh play?",
      options: [
        "A database that stores transaction logs permanently",
        "A message broker that manages publishing, subscribing, and routing of events asynchronously",
        "A visual drag-and-drop code builder",
        "A tool for managing FTP connections"
      ],
      correct: 1,
      exp: "SAP Event Mesh is BTP's event broker. It handles high-throughput asynchronous events, enabling decoupled, real-time message routing."
    },
    {
      q: "What does the Open Connectors capability provide to integration developers?",
      options: [
        "Free trial licenses for SAP systems",
        "Over 170+ pre-built, standardized connectors for non-SAP SaaS systems (like Salesforce, Slack, SharePoint, Twilio)",
        "Open-source coding compilers for Java and ABAP",
        "Network cable adapters for physical data centers"
      ],
      correct: 1,
      exp: "Open Connectors standardizes integrations with non-SAP systems, providing ready-to-use REST APIs and authentication wrappers for 170+ applications."
    },
    {
      q: "How does the Integration Advisor capability accelerate B2B integrations like EDIFACT or X12?",
      options: [
        "By hosting live consultants on chat",
        "By utilizing machine learning to recommend semantic mapping rules between message standards",
        "By compiling code faster than regular runtimes",
        "By automatically executing test scripts"
      ],
      correct: 1,
      exp: "Integration Advisor uses machine learning based on metadata to automatically suggest mappings and generate schema guides for B2B transactions."
    },
    {
      q: "Where can you find and download official, SAP-pre-built integration packages and iFlows for common scenarios?",
      options: [
        "SAP Business Accelerator Hub (api.sap.com)",
        "GitHub public repositories",
        "SAP Community Forums",
        "Google Cloud Marketplace"
      ],
      correct: 0,
      exp: "The SAP Business Accelerator Hub (formerly API Business Hub) hosts hundreds of pre-packaged, ready-to-import integration flows built by SAP."
    },
    {
      q: "What happens if a message fails during processing in a deployed iFlow?",
      options: [
        "The CPI runtime crashes and must be restarted",
        "The message is routed to the Exception Sub-Process (if configured) for error handling and alerting",
        "The backend SAP database is automatically rolled back to yesterday's backup",
        "An email is automatically sent to SAP support"
      ],
      correct: 1,
      exp: "If a step in an iFlow errors, execution is caught by the Exception Sub-Process, allowing the developer to log error details or send custom alerts."
    },
    {
      q: "What older middleware products is SAP Integration Suite currently replacing as part of modernization projects?",
      options: [
        "SAP PI (Process Integration) and SAP PO (Process Orchestration)",
        "SAP ABAP Web Dynpro and BSP",
        "SAP Enterprise Portal and NetWeaver Mobile",
        "SAP BW/4HANA and Crystal Reports"
      ],
      correct: 0,
      exp: "SAP PI/PO are on-premise middleware platforms that are being retired, with customers migrating to cloud-native SAP BTP Integration Suite."
    }
  ],
  "sap-joule-ai-copilot": [
    {
      q: "What is SAP Joule?",
      options: [
        "SAP's cloud-native ERP package",
        "A generative AI copilot embedded in SAP applications",
        "A database administration tool for HANA",
        "An ABAP compiler interface"
      ],
      correct: 1,
      exp: "SAP Joule is SAP's generative AI copilot that allows users to interact with SAP applications using natural language."
    },
    {
      q: "In which year was SAP Joule officially announced by SAP?",
      options: [
        "2020",
        "2022",
        "2023",
        "2025"
      ],
      correct: 2,
      exp: "SAP announced Joule in September 2023, rolling it out progressively across SuccessFactors, S/4HANA, Ariba, and BTP."
    },
    {
      q: "Which technical concept does Joule use to retrieve real-time enterprise data safely and avoid AI hallucinations?",
      options: [
        "Retrieval-Augmented Generation (RAG)",
        "Direct SQL database queries",
        "XML data feeds",
        "Deep reinforcement learning"
      ],
      correct: 0,
      exp: "Joule uses RAG to fetch actual live transactional and master data from SAP before formatting the response, ensuring answers are grounded and accurate."
    },
    {
      q: "How does Joule handle data security and user access permissions?",
      options: [
        "It bypasses ERP permissions for speed",
        "It respects and enforces SAP's existing role-based authorization framework",
        "It uses a single admin login for all requests",
        "It prompts users to enter their SQL passwords"
      ],
      correct: 1,
      exp: "Joule enforces role-based access controls, ensuring users can only see or access data they are authorized to see via standard SAP roles."
    },
    {
      q: "What is the SAP Business Knowledge Graph?",
      options: [
        "A visual chart showing stock market performance",
        "A database table map for custom ABAP objects",
        "A structured representation of SAP product models, business semantics, and process relationships",
        "An org chart showing employee hierarchy"
      ],
      correct: 2,
      exp: "The Business Knowledge Graph maps semantic business contexts (like customer invoices, relationships, S/4HANA structures) to make queries contextually accurate."
    },
    {
      q: "For which programming language can Joule generate code snippets inside the BTP environment?",
      options: [
        "ABAP",
        "Java",
        "Python",
        "C++"
      ],
      correct: 0,
      exp: "Joule can assist developers in BTP by generating syntactically correct ABAP code snippets and CDS views."
    },
    {
      q: "Which HR task is directly supported by Joule in SAP SuccessFactors?",
      options: [
        "Filing tax documents with the government",
        "Calculating payroll taxes automatically",
        "Generating job descriptions and tracking leave balances",
        "Installing local server software"
      ],
      correct: 2,
      exp: "In SuccessFactors, Joule supports job description drafting, candidate screening assistance, employee leave balance queries, and policy search."
    },
    {
      q: "Can Joule execute high-impact business transactions (e.g., posting a payment run) autonomously?",
      options: [
        "Yes, it operates fully autonomously in all areas",
        "No, high-impact transactions still require human confirmation for accountability",
        "Only if configured in on-premise systems",
        "Only during night-shift hours"
      ],
      correct: 1,
      exp: "SAP Joule acts as a copilot; high-impact transactions always require human confirmation to maintain audit logs and accountability."
    },
    {
      q: "Which framework is used to build custom skills, plugins, and action handlers for Joule?",
      options: [
        "Joule Extension Framework on BTP",
        "HANA Web Workbench",
        "NetWeaver Gateway",
        "ABAP Workbench SE80"
      ],
      correct: 0,
      exp: "Developers can use the Joule Extension Framework on SAP BTP to build custom skills, action triggers, and API mappings for Joule."
    },
    {
      q: "What is the primary difference between SAP Joule and Microsoft 365 Copilot?",
      options: [
        "Joule only runs on Windows desktops",
        "Joule understands deep SAP business semantics and transactional data, whereas Microsoft Copilot focus is Office productivity",
        "Microsoft Copilot is free and Joule is paid",
        "Microsoft Copilot does not use LLMs"
      ],
      correct: 1,
      exp: "Joule is specialized for SAP business transactional context, whereas Microsoft 365 Copilot focuses on general documents, emails, and office productivity."
    }
  ],
  "sap-fiori-development-complete-guide": [
    {
      q: "What are the three core types of SAP Fiori applications?",
      options: [
        "Transactional, Analytical, and Fact Sheet",
        "Classic, Web Dynpro, and UI5",
        "Standard, Extended, and Custom",
        "Database, Application, and Presentation"
      ],
      correct: 0,
      exp: "SAP Fiori categorizes apps into Transactional (task actions), Analytical (dashboards/KPIs), and Fact Sheets (360-degree object summary)."
    },
    {
      q: "What is the primary benefit of using SAP Fiori Elements over building custom SAPUI5 applications from scratch?",
      options: [
        "It bypasses standard security models",
        "It automatically generates UI floorplans from backend annotations and metadata, saving massive frontend development time",
        "It replaces the database layer entirely",
        "It runs without requiring any OData services"
      ],
      correct: 1,
      exp: "Fiori Elements generates UI views and controllers automatically from annotations, drastically reducing manual coding for list reports, worklists, object pages, and dashboards."
    },
    {
      q: "Which communication protocol standard connects SAP Fiori frontend applications to the backend ERP database?",
      options: [
        "SOAP Web Services",
        "Open Data Protocol (OData)",
        "gRPC Runtimes",
        "Direct JDBC Connections"
      ],
      correct: 1,
      exp: "OData (RESTful protocol returning JSON/XML) is the standard connection layer between Fiori frontend and SAP backend gateways."
    },
    {
      q: "What modern backend development framework is used in S/4HANA to build OData V4 services for Fiori apps?",
      options: [
        "Business Object Processing Framework (BOPF)",
        "NetWeaver Gateway SE80 Service Builder (SEGW)",
        "RESTful ABAP Programming Model (RAP)",
        "Web Dynpro ABAP"
      ],
      correct: 2,
      exp: "ABAP RAP is the recommended programming model to build clean, modern cloud-native transactional APIs and OData V4 services."
    },
    {
      q: "Which prefix identifies UI configurations and layout instructions inside ABAP CDS views that Fiori Elements reads?",
      options: [
        "@UI",
        "@Fiori",
        "@OData",
        "@Layout"
      ],
      correct: 0,
      exp: "The `@UI` annotations (e.g. `@UI.lineItem`, `@UI.selectionField`) define where fields appear in lists and search selectors."
    },
    {
      q: "Where are Fiori application tiles, catalogs, groups, and semantic mappings configured for users?",
      options: [
        "SAP GUI Transaction SE38",
        "Fiori Launchpad Designer / Work Zone Settings",
        "SAP Business Application Studio",
        "HANA Database Studio"
      ],
      correct: 1,
      exp: "Fiori Launchpad settings (Catalogs, Groups, semantic navigation pairs) are managed centrally using Fiori Launchpad Designer or SAP Build Work Zone."
    },
    {
      q: "Which Fiori customization strategy is best when business users need to hide fields or rearrange fields at runtime without code changes?",
      options: [
        "Side-by-Side BTP Extension",
        "Key User Adaptation (No Code)",
        "ABAP RAP modification",
        "i18n property overrides"
      ],
      correct: 1,
      exp: "Key User Adaptation is a built-in no-code editor in the Fiori shell that allows authorized key users to adjust fields, groups, and labels dynamically."
    },
    {
      q: "Which browser hotkey shortcut displays the SAPUI5 Diagnostics panel for analyzing data bindings and control properties?",
      options: [
        "Ctrl + Alt + Shift + S",
        "F12 Developer Tools",
        "Ctrl + Alt + Del",
        "Ctrl + F5 Reload"
      ],
      correct: 0,
      exp: "Pressing `Ctrl + Alt + Shift + S` in any SAPUI5 / Fiori application opens the Diagnostics box showing binding structures and runtime trees."
    },
    {
      q: "What is the primary IDE used for modern frontend Fiori app development and BTP deployment?",
      options: [
        "Eclipse with ADT",
        "SAP Business Application Studio (BAS)",
        "Microsoft Visual Studio 2022",
        "SAP Web IDE Classic"
      ],
      correct: 1,
      exp: "SAP Business Application Studio (BAS) is the primary cloud-based environment for compiling, testing, extending, and deploying Fiori web apps."
    },
    {
      q: "Why should developers use i18n properties files instead of hardcoding text strings in UI views?",
      options: [
        "To enable translation and localize applications for multiple languages",
        "To improve database execution speed",
        "To bypass authorization checks",
        "To compile JavaScript code faster"
      ],
      correct: 0,
      exp: "Storing texts in `i18n.properties` files separates copy labels from layouts, enabling translation and multilingual support seamlessly."
    }
  ],
  "sap-fiori-elements-tutorial": [
    {
      q: "What is SAP Fiori Elements?",
      options: [
        "A database modeling interface",
        "A framework in SAPUI5 that automatically generates Fiori UI from metadata and annotations",
        "An analytical reporting dashboard tool",
        "A code debugger extension"
      ],
      correct: 1,
      exp: "SAP Fiori Elements uses metadata and annotations from OData/CDS view definitions to generate standard user screens dynamically."
    },
    {
      q: "Which Fiori Elements floorplan is the most commonly used for master-detail UI patterns?",
      options: [
        "List Report + Object Page",
        "Worklist",
        "Overview Page",
        "Analytical List Page"
      ],
      correct: 0,
      exp: "List Report (searchable table grid) coupled with Object Page (detail sections/tabs) is the standard master-detail pattern."
    },
    {
      q: "Which floorplan is best suited for queue-based task checklists without complex filter criteria?",
      options: [
        "Analytical List Page",
        "Worklist",
        "Overview Page",
        "Dashboard Page"
      ],
      correct: 1,
      exp: "A Worklist provides a simple task queue with search and sorting features, omitting the smart collapsible filter bar."
    },
    {
      q: "Which Fiori Elements floorplan utilizes list cards, KPI cards, and chart cards to build role-based cockpits?",
      options: [
        "Worklist",
        "Overview Page",
        "List Report",
        "Object Page"
      ],
      correct: 1,
      exp: "Overview Pages allow users to monitor different data streams concurrently on one dashboard screen via distinct card types."
    },
    {
      q: "Which floorplan combines a visual chart view at the top and a linked data table at the bottom on a single screen?",
      options: [
        "Analytical List Page",
        "Worklist",
        "List Report",
        "Overview Page"
      ],
      correct: 0,
      exp: "Analytical List Pages (ALPs) allow users to select data points inside visual charts, automatically filtering the detail table list below."
    },
    {
      q: "What are annotations in Fiori Elements?",
      options: [
        "Comments in Javascript code",
        "Database table field types",
        "Metadata instructions attached to CDS/OData objects that dictate how fields render in the UI",
        "Custom CSS style classes"
      ],
      correct: 2,
      exp: "Annotations describe semantic layout details (e.g. column order, filter visibility, criticality colors) read by the UI engine at runtime."
    },
    {
      q: "Which annotation binds a field to the collapsible search filter bar in a List Report?",
      options: [
        "@UI.lineItem",
        "@UI.selectionField",
        "@UI.facet",
        "@UI.fieldGroup"
      ],
      correct: 1,
      exp: "`@UI.selectionField` configures a field as a search filter input field at the top of a List Report."
    },
    {
      q: "Which annotation renders a field as a column inside the List Report data table?",
      options: [
        "@UI.lineItem",
        "@UI.selectionField",
        "@UI.facet",
        "@UI.identification"
      ],
      correct: 0,
      exp: "`@UI.lineItem` specifies that a field should be visible as a column in the table, defining its display position and custom label."
    },
    {
      q: "In which file is the routing mapping between List Report and Object Page templates configured?",
      options: [
        "index.html",
        "Component.js",
        "manifest.json",
        "ui5.yaml"
      ],
      correct: 2,
      exp: "`manifest.json` defines application routes, templates, routing targets, and backend OData model bindings."
    },
    {
      q: "Which extension pack in BAS/VS Code helps developers generate Fiori Elements apps and model annotations visually?",
      options: [
        "ABAP Development Tools (ADT)",
        "SAP Fiori Tools",
        "MTA Build Tools",
        "GitHub Copilot"
      ],
      correct: 1,
      exp: "SAP Fiori Tools provides generators, Guided Development guides, page maps, and annotation modeling UI extensions."
    }
  ],
  "sap-fiori-rap-backend-development": [
    {
      q: "What does RAP stand for in modern SAP development?",
      options: [
        "RESTful ABAP Programming Model",
        "Reactive ABAP Processors",
        "Registered Application Protocols",
        "Remote Access Programming"
      ],
      correct: 0,
      exp: "RAP stands for RESTful ABAP Programming Model, SAP's cloud-aligned framework for building transactional APIs and services."
    },
    {
      q: "Which are the three main layers of the RAP architecture?",
      options: [
        "Database, Application, and Presentation Layers",
        "Service Layer, Business Object Layer, and Database Layer",
        "OData layer, SEGW Gateway, and RFC functions",
        "CDS views, RAP definitions, and Fiori tools"
      ],
      correct: 1,
      exp: "RAP separates concerns into Service Layer (service definition and binding), Business Object Layer (CDS data models and BDEF behaviors), and Database Layer."
    },
    {
      q: "What is the purpose of @Semantics.systemDateTime annotations in the interface view?",
      options: [
        "To check the user's localized time zone",
        "To tell RAP which fields represent administrative timestamps for concurrent edit checks (locking)",
        "To schedule periodic background processes",
        "To compile ABAP CDS annotations faster"
      ],
      correct: 1,
      exp: "These semantic annotations flag timestamp fields used by RAP to track modifications and enforce optimistic locking control."
    },
    {
      q: "Which ABAP object contains the allowed transactional database operations, validations, and custom action declarations?",
      options: [
        "ABAP Class",
        "Behavior Definition (BDEF)",
        "Service Binding",
        "Database Table Configuration"
      ],
      correct: 1,
      exp: "The Behavior Definition (BDEF) defines the 'contract' specifying what actions (Create, Update, Delete, custom actions, validations) are permitted on the business object."
    },
    {
      q: "Which keyword in the Behavior Definition tells the RAP framework to execute standard database insert/update/delete operations automatically?",
      options: [
        "managed",
        "unmanaged",
        "strict",
        "persistent"
      ],
      correct: 0,
      exp: "The `managed` option delegats standard CRUD database operations directly to the RAP engine, eliminating the need to write custom SQL commands."
    },
    {
      q: "What parameter mode should be included in entity READ/MODIFY operations in validations to bypass authorization rules?",
      options: [
        "IN PRIVACY MODE",
        "IN LOCAL MODE",
        "WITHOUT RESTRICTIONS",
        "BYPASS SECURITY"
      ],
      correct: 1,
      exp: "`IN LOCAL MODE` processes internal CRUD operations in system context, bypassing administrative lock/authorization checks."
    },
    {
      q: "Which features are provided out-of-the-box by RAP draft handling?",
      options: [
        "Translating UI fields automatically",
        "Auto-saving edits, multi-device sync, and concurrent edit locks",
        "Compiling backend code directly into Javascript views",
        "Running automated selenium tests"
      ],
      correct: 1,
      exp: "By declaring `with draft` and linking a draft table, the framework manages temporary drafts, auto-saving, concurrent edit conflicts, and lock checks automatically."
    },
    {
      q: "What is the primary difference between Managed RAP and Unmanaged RAP?",
      options: [
        "Managed RAP runs on S/4HANA whereas Unmanaged runs on ECC",
        "Managed RAP handles database updates automatically; Unmanaged RAP requires developer-coded database updates",
        "Managed RAP uses OData V2; Unmanaged RAP uses OData V4",
        "Managed RAP does not require CDS views"
      ],
      correct: 1,
      exp: "Managed RAP automates database modifications. Unmanaged RAP requires the developer to code all backend database operations in behavior implementation classes."
    },
    {
      q: "Which RAP object defines what CDS views are exposed as part of the service?",
      options: [
        "Service Binding",
        "Service Definition",
        "Behavior Definition",
        "Manifest File"
      ],
      correct: 1,
      exp: "A Service Definition defines which projection/consumption views are exposed to the OData API layer."
    },
    {
      q: "Which RAP object actually binds the exposed entities to a specific protocol type (e.g. OData V4 - UI) and publishes the service endpoint?",
      options: [
        "Service Definition",
        "Service Binding",
        "Metadata Extension",
        "CDS View Entity"
      ],
      correct: 1,
      exp: "The Service Binding connects the exposed service definition to a protocol (like OData V4 - UI) and generates the active runtime endpoint."
    }
  ]
};

