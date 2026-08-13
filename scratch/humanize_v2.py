import os
import re

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

# Detailed semantic replacements for each file to ensure natural, correct, non-robotic English grammar
file_replacements = {
    "sap-abap-data-statement.md": [
        ("what DATA statement is", "how to use DATA declarations"),
        ("the **DATA statement** is one of the very first things you will learn. The DATA statement is used", "**DATA declarations** are among the first things you will learn. This statement is used"),
        ("what the DATA statement is", "variable declarations"),
        ("the DATA statement is absolutely essential", "declaring variables is absolutely essential"),
        ("what DATA statement is, why we use it, how to write it", "how variable declarations work, why they are used, and how to write them"),
        ("using the DATA statement", "using variable declarations"),
        ("DATA statement tells the SAP system to allocate", "the DATA statement tells SAP to allocate"),
        ("We use the DATA statement because", "We declare variables because"),
        ("Using the DATA statement has benefits", "Declaring variables provides several benefits"),
        ("basic syntax of the DATA statement is", "basic syntax for variable declarations is"),
        ("DATA is the keyword that starts the statement", "DATA starts the declaration statement"),
        ("Your First DATA Statement Example", "First Variable Declaration Example"),
        ("we created a text variable", "we declare a text variable"),
        ("solidify your understanding of the DATA statement", "solidify your understanding of variable declarations"),
        ("the foundation of data manipulation", "the foundation of data handling"),
        (r"\bthe DATA statement\b", "DATA declarations"),
        (r"\bthe DATA statements\b", "DATA declarations")
    ],
    "sap-abap-parameters-statement.md": [
        ("one of the important things you will learn is the PARAMETERS statement. This statement is used", "one of the first concepts you will encounter is parameter declarations. Parameters are used"),
        ("the PARAMETERS statement is used to create", "PARAMETERS creates"),
        ("what the PARAMETERS statement is, why it is used, its syntax", "how parameters work, why they are used, and selection screen syntax"),
        ("the PARAMETERS statement is used to declare", "PARAMETERS declares"),
        ("the PARAMETERS statement makes", "PARAMETERS makes"),
        ("the PARAMETERS statement is the cornerstone", "PARAMETERS is the cornerstone"),
        ("the PARAMETERS statement helps", "PARAMETERS helps"),
        ("first PARAMETERS program", "first parameter-driven program"),
        ("First PARAMETERS Program", "First Parameter Program"),
        ("declaring variables using the PARAMETERS statement", "declaring variables using PARAMETERS"),
        ("the PARAMETERS statement to automatically generate", "PARAMETERS to automatically generate"),
        (r"\bthe PARAMETERS statement\b", "PARAMETERS"),
        (r"\bthe selection screen\b", "selection screen"),
        (r"\bthe selection screens\b", "selection screens")
    ],
    "first-abap-program-beginners-guide.md": [
        ("write and run your first ABAP program. Creating a simple", "write your first ABAP program. Creating a simple"),
        ("exactly what an ABAP program is", "what ABAP programs are"),
        ("understand the development workflow", "understand development workflow"),
        ("the basic syntax rules", "basic syntax rules"),
        ("the development workflow", "development workflow"),
        ("the central database layer", "central database layer"),
        ("the application server", "application server"),
        ("the SAP database repository", "SAP database repository"),
        ("the right one", "the appropriate tool")
    ],
    "abap-dictionary.md": [
        ("the central part of the SAP system", "the central repository in SAP"),
        ("all database objects, structures, and data types are defined and managed", "database objects, structures, and data types are defined and managed"),
        ("the ABAP Dictionary provides", "ABAP Dictionary provides"),
        ("the ABAP Dictionary acts as", "ABAP Dictionary acts as"),
        ("the main functions of the ABAP Dictionary", "main functions of ABAP Dictionary"),
        ("the data integrity", "data integrity"),
        ("the SAP database", "SAP database"),
        (r"\bthe ABAP Dictionary\b", "ABAP Dictionary"),
        (r"\bthe Data Dictionary\b", "Data Dictionary")
    ],
    "sap-abap-domain.md": [
        ("the technical properties of a field", "technical properties of a field"),
        ("the technical properties, data types, and values", "technical properties, data types, and value limits"),
        ("reusability of the domain", "reusability of domains"),
        ("create a domain in the ABAP Dictionary", "create a domain in ABAP Dictionary"),
        ("the domain defines", "domains define"),
        ("the domain is", "domains are"),
        ("the technical properties", "technical properties"),
        (r"\bthe domain\b", "domain"),
        (r"\bthe domains\b", "domains")
    ],
    "sap-abap-data-element.md": [
        ("describes the semantic meaning", "describes semantic meaning"),
        ("the semantic meaning of a field", "semantic meaning of a field"),
        ("the data element is", "data elements are"),
        ("create a data element in the ABAP Dictionary", "create a data element in ABAP Dictionary"),
        ("the technical properties", "technical properties"),
        ("the data element describes", "data elements describe"),
        (r"\bthe data element\b", "data element"),
        (r"\bthe data elements\b", "data elements")
    ],
    "sap-abap-structure.md": [
        ("the Structure", "structures"),
        ("what a Structure in SAP ABAP is", "what structures in SAP ABAP are"),
        ("create a Structure in SAP", "create structures in SAP"),
        ("A Structure in SAP ABAP is", "Structures in SAP ABAP are"),
        ("Think of a Structure in SAP ABAP as", "Think of structures in SAP ABAP as"),
        ("create a Structure in SAP ABAP and reuse", "create structures in SAP ABAP and reuse"),
        ("Structures are used to improve", "Structures improve"),
        ("Structure in SAP ABAP vs. Database Table", "Structures vs. Database Tables"),
        ("A Structure defines", "Structures define"),
        ("Steps to Create a Structure in SAP ABAP", "Steps to Create Structures in SAP ABAP"),
        ("the structure is now active", "structures are now active"),
        ("declare a Work Area", "declare work areas"),
        ("the structure's purpose", "the structure's design"),
        ("the structure won't be visible", "structures won't be visible"),
        (r"\bthe structure\b", "structure"),
        (r"\bthe structures\b", "structures")
    ],
    "sap-abap-tables.md": [
        ("the database", "database"),
        ("the Transparent Table", "transparent table"),
        ("the database tables", "database tables"),
        ("creating the database table", "creating database tables"),
        ("the database table", "database table"),
        ("create the database tables", "create database tables"),
        ("the table definition", "table definition"),
        ("the table creation", "table creation")
    ],
    "table-maintenance-generator.md": [
        ("the Table Maintenance Generator", "Table Maintenance Generator"),
        ("the database table", "database table"),
        ("the screens", "screens"),
        ("the generated UI", "generated UI"),
        ("create the Table Maintenance Generator", "create Table Maintenance Generator"),
        ("the maintenance screen", "maintenance screen"),
        ("the generated maintenance screens", "generated maintenance screens")
    ],
    "se11-transaction-code-sap-abap.md": [
        ("the gateway to the ABAP Dictionary", "the gateway to ABAP Dictionary"),
        ("the data structure of the SAP system", "data structures within SAP"),
        ("the central repository", "the central repository"),
        ("navigate the ABAP Dictionary", "navigate ABAP Dictionary"),
        ("the SE11 transaction code", "SE11 transaction code"),
        ("the ABAP Dictionary objects", "ABAP Dictionary objects")
    ]
}

def humanize_text(filename, text):
    parts = re.split(r"(```[\s\S]*?```|`[^`\n]+?`)", text)
    repls = file_replacements.get(filename, [])
    for i in range(len(parts)):
        if not parts[i].startswith("`"):
            # Apply file-specific replacements
            for pattern, replacement in repls:
                if "\\" in pattern or r"\b" in pattern:
                    parts[i] = re.sub(pattern, replacement, parts[i])
                else:
                    parts[i] = parts[i].replace(pattern, replacement)
            # Apply general cleanups for AI-sounding patterns
            parts[i] = re.sub(r"\bone of the most commonly used\b", "a widely used", parts[i])
            parts[i] = re.sub(r"\bone of the commonly used\b", "a common", parts[i])
            parts[i] = re.sub(r"\bplay an important role\b", "are essential", parts[i])
            parts[i] = re.sub(r"\bplays an important role\b", "is essential", parts[i])
            parts[i] = re.sub(r"\bplays a role\b", "is essential", parts[i])
            parts[i] = re.sub(r"\bplay a role\b", "are essential", parts[i])
            parts[i] = re.sub(r"\bhighly recommended\b", "recommended", parts[i])
            parts[i] = re.sub(r"\bfirst step toward\b", "first step to", parts[i])
    return "".join(parts)

def process_file(filepath):
    filename = os.path.basename(filepath)
    print(f"Humanizing Tone (V2) for: {filename}")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split frontmatter
    frontmatter_match = re.match(r"^---([\s\S]*?)---", content)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(0)
        body = content[len(frontmatter):]
        new_body = humanize_text(filename, body)
        new_content = frontmatter + new_body
    else:
        new_content = humanize_text(filename, content)
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

for filename in os.listdir(blog_dir):
    if filename.endswith(".md") and filename in file_replacements:
        process_file(os.path.join(blog_dir, filename))

print("AdSense optimization humanization complete!")
