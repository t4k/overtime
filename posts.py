import re
import time

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError


def main(
    site_base_url: "Base URL of LibGuides website",  # type: ignore
    content_repository_name: "Repository name where scraped HTML files will be committed",  # type: ignore
):
    """Scrape LibGuides blog posts to track changes."""
    with sync_playwright() as playwright:
        b = playwright.firefox.launch()
        p = b.new_page(base_url=site_base_url)

        p.goto(f"/blog")
        links = []
        while True:
            # NOTE easier to wait 1 second than solve the issues that arose
            # waiting for the elements with playwright methods
            time.sleep(1)
            blog = BeautifulSoup(p.content(), "html.parser")
            links.extend(blog.select(".s-lg-blog-header a"))
            if blog.find(class_="next"):
                if blog.find("a", text="Older Posts"):
                    p.click(".next a:text('Older Posts')")
                else:
                    break
            else:
                break

        for link in links:
            filename = f'{content_repository_name}/posts/{link["href"].split("/blog/")[-1].replace("/", "_")}.html'
            # catch any timeouts and continue the loop
            try:
                # open the page in a browser
                p.goto(link["href"])
                soup = BeautifulSoup(p.content(), "html.parser")
                # select blogpost content only
                blogpost = soup.find(id=re.compile("^comment-\d+$"))
            except PlaywrightTimeoutError as e:
                # write error to file
                with open(filename, "w") as file:
                    file.write(str(e))
                continue
            # write prettified html to file
            with open(filename, "w") as file:
                file.write(blogpost.prettify())

        b.close()


if __name__ == "__main__":
    # fmt: off
    import plac; plac.call(main)
