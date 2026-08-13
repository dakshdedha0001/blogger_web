with open("/Users/dakshdedha/blogger_web/public/ads.txt", "rb") as f:
    content = f.read()
    print(f"Content bytes: {content}")
    print(f"Content length: {len(content)}")
