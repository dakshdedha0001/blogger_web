import urllib.request
import json
import xml.etree.ElementTree as ET
import os

API_KEY = "b61baca4e70949f8b0b65e81f7013b34"
HOST = "learnsapfree.com"
KEY_LOCATION = f"https://{HOST}/{API_KEY}.txt"
SITEMAP_PATH = "/Users/dakshdedha/blogger_web/dist/sitemap-0.xml"

def get_urls_from_sitemap():
    urls = []
    if os.path.exists(SITEMAP_PATH):
        tree = ET.parse(SITEMAP_PATH)
        root = tree.getroot()
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        for url in root.findall('ns:url', namespace):
            loc = url.find('ns:loc', namespace)
            if loc is not None and loc.text:
                urls.append(loc.text.strip())
    return urls

def submit_to_indexnow():
    urls = get_urls_from_sitemap()
    if not urls:
        print("❌ No URLs found in sitemap.")
        return

    print(f"Found {len(urls)} URLs to submit to Bing IndexNow.")

    payload = {
        "host": HOST,
        "key": API_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        "https://www.bing.com/indexnow",
        data=data,
        headers={
            'Content-Type': 'application/json; charset=utf-8',
            'Host': 'www.bing.com'
        }
    )

    try:
        with urllib.request.urlopen(req) as response:
            status = response.getcode()
            print(f"✅ IndexNow API Response Code: {status}")
            if status in (200, 202):
                print(f"🎉 SUCCESS! All {len(urls)} URLs successfully submitted to Bing, Yahoo & DuckDuckGo!")
            else:
                print(f"Response: {response.read().decode('utf-8')}")
    except Exception as e:
        print(f"❌ Error submitting to IndexNow: {e}")

if __name__ == "__main__":
    submit_to_indexnow()
