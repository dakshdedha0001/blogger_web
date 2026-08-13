import os
import re

blog_dir = "/Users/dakshdedha/blogger_web/src/content/blog"

files = [f for f in os.listdir(blog_dir) if f.endswith(".md")]

for filename in files:
    filepath = os.path.join(blog_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter
    parts = content.split("---", 2)
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = parts[2]
        
        # 1. Update pubDate: 2026-06-13 to 2026-06-14
        # We handle both quoted and unquoted versions
        new_frontmatter = re.sub(
            r'pubDate:\s*"2026-06-13"',
            'pubDate: "2026-06-14"',
            frontmatter
        )
        new_frontmatter = re.sub(
            r'pubDate:\s*2026-06-13',
            'pubDate: 2026-06-14',
            new_frontmatter
        )
        
        # 2. Update order if order >= 8
        order_match = re.search(r'order:\s*(\d+)', new_frontmatter)
        if order_match:
            order_val = int(order_match.group(1))
            if order_val >= 8:
                new_order_val = order_val + 1
                new_frontmatter = re.sub(
                    rf'order:\s*{order_val}',
                    f'order: {new_order_val}',
                    new_frontmatter
                )
                print(f"Shifted {filename}: order {order_val} -> {new_order_val}")
        
        if new_frontmatter != frontmatter:
            print(f"Updated metadata in {filename}")
            # Reconstruct and write back
            new_content = f"---{new_frontmatter}---{body}"
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
    else:
        print(f"Skipping {filename} (no frontmatter)")
