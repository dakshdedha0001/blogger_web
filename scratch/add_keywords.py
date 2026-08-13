import os

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

keywords_map = {
    "first-abap-program-beginners-guide.md": [
        "sap abap", "abap program", "se38", "sap gui", "abap editor", "sap developer"
    ],
    "abap-dictionary.md": [
        "sap abap", "abap dictionary", "se11", "sap tables", "transparent tables", "sap database"
    ],
    "sap-abap-domain.md": [
        "sap abap", "abap domain", "se11", "value range", "data attributes"
    ],
    "sap-abap-data-element.md": [
        "sap abap", "data element", "se11", "semantic meaning", "field labels"
    ],
    "sap-abap-structure.md": [
        "sap abap", "abap structure", "se11", "work area", "in-memory structures"
    ],
    "sap-abap-tables.md": [
        "sap abap", "transparent tables", "primary key", "table buffering", "delivery class", "technical settings"
    ],
    "table-maintenance-generator.md": [
        "sap abap", "table maintenance generator", "tmg", "sm30", "se11", "maintenance screen"
    ],
    "se11-transaction-code-sap-abap.md": [
        "sap abap", "se11", "abap dictionary", "lock objects", "database views", "search help"
    ],
    "sap-abap-data-statement.md": [
        "sap abap", "data statement", "variables", "variable declarations", "abap types", "data types"
    ],
    "sap-abap-parameters-statement.md": [
        "sap abap", "parameters statement", "selection screen", "checkboxes", "radio buttons", "user inputs"
    ],
    "sap-abap-if-else-statement.md": [
        "sap abap", "if else statement", "conditional logic", "abap comparisons", "operators"
    ],
    "sap-abap-case-statement.md": [
        "sap abap", "case statement", "when others", "conditional branching", "abap code control"
    ],
    "sap-abap-do-loop.md": [
        "sap abap", "do loop", "loops", "sy-index", "loop controls", "exit statement"
    ],
    "sap-abap-while-loop.md": [
        "sap abap", "while loop", "conditional loop", "loop exit", "loop continue", "loop check"
    ],
    "sap-abap-loop-at-internal-table.md": [
        "sap abap", "loop at", "internal tables", "sy-tabix", "field-symbols", "assigning field-symbol", "modify statement"
    ],
    "sap-abap-select-options.md": [
        "sap abap", "select-options", "selection tables", "sign option low high", "ranges", "in operator"
    ],
    "sap-abap-interview-questions.md": [
        "sap abap", "abap interview questions", "sap interview preparation", "abap for freshers", "technical questions", "se11 se16n se37 se38"
    ],
    "sap-opportunities-freshers.md": [
        "sap careers", "sap freshers", "sap modules", "sap salary", "sap roadmap", "sap certification"
    ]
}

for filename, keywords in keywords_map.items():
    filepath = os.path.join(blog_dir, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename} (file does not exist)")
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter
    parts = content.split("---", 2)
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = parts[2]

        # Check if keywords are already present
        if "keywords:" in frontmatter:
            # Remove existing keywords block
            import re
            # Match keywords: followed by list of - "value" lines
            frontmatter = re.sub(r'keywords:\s*(\n\s*-\s*".*")*', '', frontmatter)

        # Build keywords YAML block
        keywords_block = "\nkeywords:\n"
        for kw in keywords:
            keywords_block += f'  - "{kw}"\n'

        # Append keywords before final newlines in frontmatter
        new_frontmatter = frontmatter.rstrip() + keywords_block
        new_content = f"---{new_frontmatter}---{body}"

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Added keywords to {filename}")
    else:
        print(f"Error: No frontmatter in {filename}")
