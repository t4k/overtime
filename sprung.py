import os
import re
import sys

import cssbeautifier
import jsbeautifier
import requests

from bs4 import BeautifulSoup

libguides_site_url = f"https://{sys.argv[1]}"

libguides_html = requests.get(libguides_site_url).text

soup_libguides = BeautifulSoup(libguides_html, "html5lib")

libguides_link = soup_libguides.find(href=re.compile(f"{sys.argv[2]}$"))

libguides_css_path = libguides_link.get("href")

with open(os.getenv("GITHUB_ENV"), "a") as env_file:
    env_file.write(f"LIBGUIDES_CSS_PATH={libguides_css_path}")

libguides_min_css = requests.get(f"{libguides_site_url}{libguides_css_path}").text

libguides_beautified_css = cssbeautifier.beautify(libguides_min_css)

with open("upstream/libguides.beautified.css", "w") as css_file:
    css_file.write(libguides_beautified_css)
