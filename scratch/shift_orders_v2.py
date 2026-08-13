import os
import re

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

shifts = {
    "sap-abap-select-options.md": 7,
    "abap-dictionary.md": 8,
    "sap-abap-domain.md": 9,
    "sap-abap-data-element.md": 10,
    "sap-abap-structure.md": 11,
    "sap-abap-tables.md": 12,
    "table-maintenance-generator.md": 13,
    "se11-transaction-code-sap-abap.md": 14
}

for filename, new_order in shifts.items():
    path = os.path.join(blog_dir, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        updated = re.sub(r'order:\s*\d+', f'order: {new_order}', content)
        with open(path, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"Shifted {filename} -> order: {new_order}")
