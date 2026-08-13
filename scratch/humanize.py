import os
import re

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

replacements = [
    # General repetitions
    (r"\bthe DATA statement\b", "DATA statement"),
    (r"\bthe PARAMETERS statement\b", "PARAMETERS statement"),
    (r"\bthe ABAP Dictionary\b", "ABAP Dictionary"),
    (r"\bthe Data Element\b", "Data Element"),
    (r"\bthe Data Elements\b", "Data Elements"),
    (r"\bthe Domain\b", "Domain"),
    (r"\bthe Domains\b", "Domains"),
    (r"\bthe Transparent Table\b", "Transparent Table"),
    (r"\bthe Database Table\b", "database table"),
    (r"\bthe Table Maintenance Generator\b", "Table Maintenance Generator"),
    (r"\bthe SE11 transaction code\b", "SE11 transaction code"),
    (r"\bthe selection screen\b", "selection screen"),
    (r"\bthe report program\b", "report program"),
    (r"\bthe internal table\b", "internal table"),
    (r"\bthe work area\b", "work area"),
    (r"\bthe system variable\b", "system variable"),
    (r"\bthe primary key\b", "primary key"),
    (r"\bthe foreign key\b", "foreign key"),
    (r"\bthe transaction code\b", "transaction code"),
    
    # Lowercase variations
    (r"\bthe data statement\b", "data statement"),
    (r"\bthe parameters statement\b", "parameters statement"),
    (r"\bthe abap dictionary\b", "ABAP Dictionary"),
    (r"\bthe data element\b", "data element"),
    (r"\bthe data elements\b", "data elements"),
    (r"\bthe domain\b", "domain"),
    (r"\bthe domains\b", "domains"),
    (r"\bthe transparent table\b", "transparent table"),
    (r"\bthe database table\b", "database table"),
    (r"\bthe table maintenance generator\b", "Table Maintenance Generator"),
    (r"\bthe se11 transaction code\b", "SE11 transaction code"),
    (r"\bthe selection screen\b", "selection screen"),
    (r"\bthe report program\b", "report program"),
    (r"\bthe internal table\b", "internal table"),
    (r"\bthe work area\b", "work area"),
    
    # Specific repetitive robotic sentences
    (r"If you are learning SAP ABAP", "When learning SAP ABAP"),
    (r"one of the important things you will learn is", "one of the first concepts you will encounter is"),
    (r"one of the things you will learn is", "one of the first concepts you will learn is"),
    (r"one of the widely used programming languages", "one of the most widely used languages"),
    (r"In terms", "In simple terms"),
    (r"In words", "In other words"),
    (r"Of putting values inside the program", "Instead of hardcoding values inside the program"),
    (r"Of directly displaying values", "Instead of directly writing values"),
    (r"Of creating separate reports", "Instead of creating separate reports"),
    (r"Sometimes developers use LIKE of TYPE.", "Sometimes developers use LIKE instead of TYPE."),
    (r"This reduces coding effort", "This reduces coding effort."),
    (r"The same variable can be used times.", "The same variable can be used multiple times."),
    (r"process and manipulate information", "process and manipulate data"),
    (r"solidify your understanding of the DATA statement", "solidify your understanding of variable declarations"),
    (r"solidify your understanding of the PARAMETERS statement", "solidify your understanding of parameter declarations")
]

def humanize_text(text):
    # Split text into code blocks and normal text to avoid breaking code
    parts = re.split(r"(```[\s\S]*?```|`[^`\n]+?`)", text)
    for i in range(len(parts)):
        # If the part is not a code block or inline code, apply replacements
        if not parts[i].startswith("`"):
            for pattern, replacement in replacements:
                parts[i] = re.sub(pattern, replacement, parts[i])
    return "".join(parts)

def process_file(filepath):
    print(f"Processing: {filepath}")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split frontmatter
    frontmatter_match = re.match(r"^---([\s\S]*?)---", content)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(0)
        body = content[len(frontmatter):]
        
        # Humanize only the body
        new_body = humanize_text(body)
        new_content = frontmatter + new_body
    else:
        new_content = humanize_text(content)
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

for filename in os.listdir(blog_dir):
    if filename.endswith(".md"):
        process_file(os.path.join(blog_dir, filename))

print("Humanization complete!")
