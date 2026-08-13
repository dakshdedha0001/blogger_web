import os
import re

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"
keywords = [
    r"DATA statement", r"PARAMETERS statement", r"Domain", r"Data Element", r"Structure", r"Table", r"ABAP Dictionary", r"Data Dictionary"
]

patterns = [re.compile(r"\bthe\s+\**" + kw + r"\b", re.IGNORECASE) for kw in keywords]

for filename in os.listdir(blog_dir):
    if filename.endswith(".md"):
        path = os.path.join(blog_dir, filename)
        with open(path, "r", encoding="utf-8") as f:
            lines = f.readlines()
        
        matches = []
        for line_num, line in enumerate(lines, 1):
            for pattern in patterns:
                for match in pattern.finditer(line):
                    matches.append((line_num, match.group(0), line.strip()))
        
        if matches:
            print(f"\nFile: {filename}")
            for line_num, match_str, text in matches[:10]:
                print(f"  Line {line_num}: Found '{match_str}' in: {text}")
            if len(matches) > 10:
                print(f"  ... and {len(matches) - 10} more occurrences")
