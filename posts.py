# Scrape LibGuides blog posts to track changes.

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
        # remove content of dynamic elements
        soup = BeautifulSoup(p.content(), "html.parser")
        soup.find(id="s-ui-cc-container").decompose()  # cookie acknowledgement
        soup.find(class_="s-lg-blog-recent-posts").clear()
        soup.find(class_="s-lg-blog-archive-list").clear()
        if soup.find(id="s-lc-w-today-cont-0"):
            soup.find(id="s-lc-w-today-cont-0").decompose()  # widget: LibCal Hours
        filename = (
            f'{repository}/posts/{link.split("/blog/")[-1].replace("/", "_")}.html'
        )
        # write prettified html to file
        with open(filename, "w") as file:
            file.write(soup.prettify(formatter="minimal"))
        # NOTE blog code contains incrementing timestamps to be zeroed-out
        lines = []
        with open(filename, "r") as file:
            for line in file:
                if "time:" in line:
                    start = line.split("time:", 1)[0]
                    end = line.split("time:", 1)[-1].split(",", 1)[-1]
                    lines.append(f"{start}time: 0,{end}")
                else:
                    lines.append(line)
        # write modified html to file
        with open(filename, "w") as file:
            file.writelines(lines)
    b.close()
