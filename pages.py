import json
import re

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


def main(
    api_site_id: "LibGuides site_id",  # type: ignore
    api_key: "LibGuides API key",  # type: ignore
    site_base_url: "Base URL of LibGuides website",  # type: ignore
    content_repository_name: "Repository name where scraped HTML files will be committed",  # type: ignore
):
    """Save and track changes in LibGuides content."""
    api_base_url = "https://lgapi-us.libapps.com"
    api_endpoint = "1.1/guides"
    api_params = {
        "site_id": api_site_id,
        "key": api_key,
        "expand": "pages",
        # retrieve published and private only
        "status": "1,2",
    }

    with sync_playwright() as playwright:
        api_request_context = playwright.request.new_context(base_url=api_base_url)
        guides_accessible = json.loads(
            api_request_context.get(api_endpoint, params=api_params).text()
        )
        with open(f"{content_repository_name}/pages.json", "w") as f:
            f.write(json.dumps(guides_accessible, indent=4, sort_keys=True))

        b = playwright.firefox.launch()
        p = b.new_page()

        for guide in guides_accessible:
            if guide["redirect_url"]:
                continue
            for page in guide["pages"]:
                # skip pages that are actually redirects to elsewhere
                if page["redirect_url"]:
                    continue
                # skip pages that are hidden
                if page["enable_display"] == "0":
                    continue
                # replace all non-word characters with hyphens
                # example:
                # “Scientific Researches!—New Discoveries in PNEUMATICKS!”
                # -Scientific-Researches--New-Discoveries-in-PNEUMATICKS--
                filename_name = re.sub("[^a-zA-Z0-9-]", "-", page["name"])
                # replace all consecutive hyphens with single hyphen
                # example:
                # -Scientific-Researches--New-Discoveries-in-PNEUMATICKS--
                # -Scientific-Researches-New-Discoveries-in-PNEUMATICKS-
                filename_name = re.sub("--+", "-", filename_name)
                # remove all start and end hyphens
                # example:
                # -Scientific-Researches-New-Discoveries-in-PNEUMATICKS-
                # Scientific-Researches-New-Discoveries-in-PNEUMATICKS
                filename_name = filename_name.strip("-")
                # replace all slash characters with underscores
                # example:
                # about/policies
                # about_policies
                if page["friendly_url"]:
                    filename_friendly_url = f'{re.sub("/", "_", page["friendly_url"].split(site_base_url)[-1])}--'
                else:
                    filename_friendly_url = ""
                # construct filename
                filename = f'{filename_name}--{filename_friendly_url}g{guide["id"]}-p{page["id"]}.html'
                # open the page in a browser
                p.goto(page["url"])
                soup = BeautifulSoup(p.content(), "html.parser")
                # select page main content only
                pagemain = soup.find(id="s-lg-guide-main")
                if pagemain.find(id="s-lg-page-prevnext"):
                    pagemain.find(id="s-lg-page-prevnext").decompose()
                # write html to file
                with open(f"{content_repository_name}/pages/{filename}", "w") as file:
                    file.write(pagemain.prettify())
        b.close()


if __name__ == "__main__":
    # fmt: off
    import plac; plac.call(main)
