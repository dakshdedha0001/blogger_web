import os
from PIL import Image, ImageDraw, ImageFont

public_dir = "/Users/dakshdedha/blogger_web/public"

# Thumbnail dimensions (Standard OpenGraph 1200x630)
WIDTH, HEIGHT = 1200, 630

# Colors matching site theme
DARK_BG = (15, 23, 42)       # Slate 900 #0F172A
ACCENT_BLUE = (0, 102, 204)   # Primary Blue #0066CC
ACCENT_CYAN = (6, 182, 212)   # Cyan 500
CARD_BG = (30, 41, 59)        # Slate 800
TEXT_WHITE = (248, 250, 252) # Slate 50
TEXT_MUTED = (148, 163, 184)# Slate 400
TEXT_BLUE = (56, 189, 248)   # Light blue #38BDF8

def get_font(size, bold=False):
    # Try system fonts on Mac
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNS.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf"
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                index = 1 if bold and path.endswith(".ttc") else 0
                return ImageFont.truetype(path, size, index=index)
            except Exception:
                continue
    return ImageFont.load_default()

font_brand = get_font(28, bold=True)
font_category = get_font(22, bold=True)
font_title = get_font(52, bold=True)
font_subtitle = get_font(28, bold=False)

items = [
    {
        "filename": "sap-free-learning-thumbnail.png",
        "category": "CAREER & LEARNING",
        "title": "How to Learn SAP for Free",
        "subtitle": "Complete Roadmap & Free Resources (2026)"
    },
    {
        "filename": "sap-btp-event-mesh-thumbnail.png",
        "category": "SAP BTP",
        "title": "SAP BTP Event Mesh",
        "subtitle": "Asynchronous Integration & Enterprise Events"
    },
    {
        "filename": "sap-abap-messages-thumbnail.png",
        "category": "ABAP PROGRAMMING",
        "title": "Message Handling in SE91",
        "subtitle": "Message Classes, Error Types & SY-MSGID"
    },
    {
        "filename": "sap-abap-search-help-thumbnail.png",
        "category": "DATA DICTIONARY",
        "title": "Search Helps in SE11",
        "subtitle": "Elementary, Collective & F4 Help Guide"
    },
    {
        "filename": "sap-build-process-automation-thumbnail.png",
        "category": "SAP BTP",
        "title": "SAP Build Process Automation",
        "subtitle": "Workflows, RPA & Business Rules on BTP"
    },
    {
        "filename": "sap-abap-oop-thumbnail.png",
        "category": "ABAP PROGRAMMING",
        "title": "ABAP Object-Oriented Programming",
        "subtitle": "Classes, Methods, Interfaces & Inheritance"
    },
    {
        "filename": "sap-abap-enhancements-thumbnail.png",
        "category": "ABAP PROGRAMMING",
        "title": "ABAP Enhancement Framework",
        "subtitle": "User Exits, BADIs & Enhancement Points"
    },
    {
        "filename": "sap-abap-cds-views-thumbnail.png",
        "category": "ABAP & HANA",
        "title": "ABAP CDS Views Guide",
        "subtitle": "Core Data Services, Annotations & OData"
    },
    {
        "filename": "sap-mm-module-overview-thumbnail.png",
        "category": "SAP FUNCTIONAL",
        "title": "SAP MM Module Overview",
        "subtitle": "Procurement Cycle, Materials & T-Codes"
    },
    {
        "filename": "sap-fico-module-overview-thumbnail.png",
        "category": "SAP FUNCTIONAL",
        "title": "SAP FICO Module Overview",
        "subtitle": "Finance & Controlling, GL, AP, AR & Cost Centers"
    }
]

for item in items:
    img = Image.new("RGB", (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)

    # Draw subtle background grid/accents
    # Top accent bar
    draw.rectangle([0, 0, WIDTH, 10], fill=ACCENT_BLUE)
    
    # Outer card outline
    draw.rectangle([40, 40, WIDTH - 40, HEIGHT - 40], outline=(51, 65, 85), width=2)

    # Left decorative accent line
    draw.rectangle([70, 70, 78, HEIGHT - 70], fill=ACCENT_BLUE)

    # Category Badge
    badge_x, badge_y = 110, 85
    draw.text((badge_x, badge_y), item["category"], fill=TEXT_BLUE, font=font_category)

    # Title
    title_y = 150
    # Word wrap title if long
    title_text = item["title"]
    draw.text((110, title_y), title_text, fill=TEXT_WHITE, font=font_title)

    # Subtitle
    sub_y = title_y + 110
    draw.text((110, sub_y), item["subtitle"], fill=TEXT_MUTED, font=font_subtitle)

    # Footer Brand Bar
    draw.line([(110, HEIGHT - 130), (WIDTH - 110, HEIGHT - 130)], fill=(51, 65, 85), width=1)
    
    draw.text((110, HEIGHT - 100), "LEARN SAP FREE", fill=ACCENT_BLUE, font=font_brand)
    draw.text((WIDTH - 320, HEIGHT - 98), "learnsapfree.com", fill=TEXT_MUTED, font=font_subtitle)

    output_path = os.path.join(public_dir, item["filename"])
    img.save(output_path, "PNG")
    print(f"Saved: {output_path}")

# Generate Author Avatar Image (200x200)
avatar_img = Image.new("RGB", (200, 200), (15, 23, 42))
avatar_draw = ImageDraw.Draw(avatar_img)
# Draw circular background
avatar_draw.ellipse([4, 4, 196, 196], fill=(0, 102, 204), outline=(56, 189, 248), width=4)
# Draw initials text "DD" or "D"
font_avatar = get_font(80, bold=True)
avatar_draw.text((68, 48), "D", fill=(255, 255, 255), font=font_avatar)

avatar_path = os.path.join(public_dir, "author-avatar.png")
avatar_img.save(avatar_path, "PNG")
print(f"Saved Author Avatar: {avatar_path}")
