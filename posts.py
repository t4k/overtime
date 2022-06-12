# Scrape LibGuides blog posts to track changes.

import sys

import urllib3

from bs4 import BeautifulSoup
from requests_html import HTMLSession

# InsecureRequestWarning: Unverified HTTPS request is being made to host. Adding
# certificate verification is strongly advised. See:
# https://urllib3.readthedocs.io/en/1.26.x/advanced-usage.html#ssl-warnings
urllib3.disable_warnings()

if len(sys.argv) > 1:
    # expected format: owner/repository
    owner = sys.argv[1].split("/")[0]
    repository = sys.argv[1].split("/")[-1]
else:
    sys.exit("owner/repository argument is required")

session = HTMLSession()
if len(sys.argv) > 2:
    # argument should be a URL with post links
    posts = session.get(sys.argv[2])
else:
    # default; posts.html contains a blog widget that returns a list of posts
    posts = session.get(f"https://{owner}.github.io/{repository}/posts.html")

# render() allows the blog widget code to run and return a list of posts
posts.html.render()

for link in posts.html.links:
    s = HTMLSession(verify=False)
    blogpost = s.get(link, verify=False)
    # render blogpost with javascript
    blogpost.html.render()
    # remove content of dynamic elements
    soup = BeautifulSoup(blogpost.html.html, "html.parser")
    soup.find(class_="s-lg-blog-recent-posts").clear()
    soup.find(class_="s-lg-blog-archive-list").clear()
    # write prettified html to file
    with open(f'{repository}/posts/{link.split("/")[-1]}.html', "w") as file:
        file.write(soup.prettify(formatter="minimal"))
    # NOTE blog code contains incrementing timestamps to be zeroed-out
    lines = []
    with open(f'{repository}/posts/{link.split("/")[-1]}.html', "r") as file:
        for line in file:
            if "time:" in line:
                start = line.split("time:", 1)[0]
                end = line.split("time:", 1)[-1].split(",", 1)[-1]
                lines.append(f"{start}time: 0{end}")
            else:
                lines.append(line)
    # write modified html to file
    with open(f'{repository}/posts/{link.split("/")[-1]}.html', "w") as file:
        file.writelines(lines)
