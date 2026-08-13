import os

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

programming_files = [
    "first-abap-program-beginners-guide.md",
    "sap-abap-data-statement.md",
    "sap-abap-parameters-statement.md",
    "sap-abap-if-else-statement.md"
]

dictionary_files = [
    "abap-dictionary.md",
    "sap-abap-domain.md",
    "sap-abap-data-element.md",
    "sap-abap-structure.md",
    "sap-abap-tables.md",
    "table-maintenance-generator.md",
    "se11-transaction-code-sap-abap.md"
]

def update_category(filepath, new_category):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We replace category: "ABAP" or category: 'ABAP'
    updated = content.replace('category: "ABAP"', f'category: "{new_category}"')
    updated = updated.replace("category: 'ABAP'", f'category: "{new_category}"')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(updated)
    print(f"Updated category for {os.path.basename(filepath)} -> {new_category}")

for filename in os.listdir(blog_dir):
    if filename.endswith(".md"):
        path = os.path.join(blog_dir, filename)
        if filename in programming_files:
            update_category(path, "ABAP Programming")
        elif filename in dictionary_files:
            update_category(path, "Data Dictionary")
        else:
            print(f"Warning: File {filename} not categorized.")
