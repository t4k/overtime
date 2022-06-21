# Scrape LibGuides blog posts to track changes.

import re
import sys

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

if len(sys.argv) > 1:
    # expected format: owner/repository
    owner = sys.argv[1].split("/")[0]
    repository = sys.argv[1].split("/")[-1]
else:
    sys.exit("owner/repository argument is required")

with sync_playwright() as playwright:
    b = playwright.firefox.launch()
    p = b.new_page()

    if len(sys.argv) > 2:
        # argument should be a URL with blogpost links
        p.goto(sys.argv[2])
    else:
        # default; posts.html contains a blog widget that returns a list of posts
        p.goto(f"https://{owner}.github.io/{repository}/posts.html")

    links = p.eval_on_selector_all(
        "a", "elements => elements.map(element => element.href)"
    )

    for link in links:
        p.goto(link)
        soup = BeautifulSoup(p.content(), "html.parser")
        # select blogpost content only
        blogpost = soup.find(id=re.compile("^comment-\d+$"))
        filename = (
            f'{repository}/posts/{link.split("/blog/")[-1].replace("/", "_")}.html'
        )
        # write prettified html to file
        with open(filename, "w") as file:
            file.write(blogpost.prettify())

    b.close()
