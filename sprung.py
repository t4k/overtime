import os
import re
import sys

import cssbeautifier
import jsbeautifier
import requests

from bs4 import BeautifulSoup

asset_path = ""
def asset_in_href_or_src(tag):
    if tag.get("href").endswith(sys.argv[2]):
        asset_path = tag.get("href")
        return True
    elif tag.get("src").endswith(sys.argv[2]):
        asset_path = asset_tag.get("src")
        return True
    else:
        return False

site_url = f"https://{sys.argv[1]}"

html = requests.get(site_url).text

soup = BeautifulSoup(html, "html5lib")

asset_tag = soup.find(asset_in_href_or_src)
if not asset_tag:
    sys.exit(f"⚠️ NOT FOUND IN PAGE: {sys.argv[2]}")

if not asset_path:
    sys.exit(f"⚠️ UNEXPECTED TAG: {asset_tag}")

# the asset path is needed for the commit message later in the workflow
with open(os.getenv("GITHUB_ENV"), "a") as env_file:
    env_file.write(f"ASSET_PATH={asset_path}")

asset_min = requests.get(f"{site_url}{asset_path}").text

if asset_path.endswith(".css"):
    asset_beautified = cssbeautifier.beautify(asset_min)
elif asset_path.endswith(".js"):
    asset_beautified = jsbeautifier.beautify(asset_min)

with open(f"upstream/beautified.{sys.argv[2]}", "w") as file:
    file.write(asset_beautified)
