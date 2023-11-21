import os
import sys

import cssbeautifier
import jsbeautifier
import requests

from bs4 import BeautifulSoup

asset_path = ""
asset_version = ""


def asset_in_href_or_src(tag):
    global asset_path, asset_version
    if tag.get("href"):
        if tag.get("href").endswith(sys.argv[2]):
            asset_path = tag.get("href")
            asset_version = tag.get("href").split("/css")[1].split("/")[0]
            return True
        return False
    elif tag.get("src"):
        if tag.get("src").endswith(sys.argv[2]):
            asset_path = tag.get("src")
            asset_version = tag.get("src").split("/js")[1].split("/")[0]
            return True
        return False
    return False


site_url = f"https://{sys.argv[1]}"

html = requests.get(site_url).text

soup = BeautifulSoup(html, "html5lib")

asset_tag = soup.find(asset_in_href_or_src)
if not asset_tag:
    sys.exit(f"⚠️  NOT FOUND IN PAGE: {sys.argv[2]}")

# libcal references assets with a full domain
if asset_path.startswith("http"):
    asset_min = requests.get(asset_path).text
elif asset_path.startswith("/"):
    asset_min = requests.get(f"{site_url}{asset_path}").text
else:
    sys.exit(f"⚠️  UNEXPECTED PATH: {asset_path}")

# use the asset version in the commit message later in the workflow
with open(os.getenv("GITHUB_ENV"), "a") as env_file:
    env_file.write(f"ASSET_VERSION={asset_version}")

if asset_path.endswith(".css"):
    asset_beautified = cssbeautifier.beautify(asset_min)
elif asset_path.endswith(".js"):
    asset_beautified = jsbeautifier.beautify(asset_min)

with open(f'upstream/{sys.argv[2].replace(".min", ".beautified")}', "w") as asset_file:
    asset_file.write(asset_beautified)
