import json
import re

from bs4 import BeautifulSoup
from playwright.sync_api import (
    sync_playwright,
    TimeoutError as PlaywrightTimeoutError,
    Error as PlaywrightError,
)


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
        # retrieve published guides only
        "status": "1",
    }

    with sync_playwright() as playwright:
        api_request_context = playwright.request.new_context(base_url=api_base_url)
        guides_retrieved = json.loads(
            api_request_context.get(api_endpoint, params=api_params).text()
        )
        for guide in guides_retrieved:
            # count_hit increases overwhelm the diff
            guide.pop("count_hit", None)
            # cache busting parameters bust the diff
            if "thumbnail_url" in guide:
                guide["thumbnail_url"] = guide["thumbnail_url"].rsplit("&cb=")[0]
        with open(f"{content_repository_name}/pages.json", "w") as f:
            f.write(json.dumps(guides_retrieved, indent=4, sort_keys=True))

        b = playwright.firefox.launch()
        p = b.new_page()

        for guide in guides_retrieved:
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
                filename = f'{filename_name}--{filename_friendly_url}g-{guide["id"]}-p-{page["id"]}.html'
                # catch any timeouts and continue the loop
                try:
                    # open the page in a browser
                    p.goto(page["url"])
                    p.wait_for_load_state("networkidle")
                except PlaywrightTimeoutError as e:
                    # write error to file
                    with open(
                        f"{content_repository_name}/pages/{filename}", "w"
                    ) as file:
                        file.write(str(e))
                    continue
                except PlaywrightError as error:
                    # NS_ERROR_ABORT seems like a browser issue of some kind
                    if error.message == "NS_ERROR_ABORT":
                        # write error to file
                        with open(
                            f"{content_repository_name}/pages/{filename}", "w"
                        ) as file:
                            file.write(str(error))
                        continue
                    else:
                        raise error
                soup = BeautifulSoup(p.content(), "html.parser")
                # select page main content only
                pagemain = soup.find(id="s-lg-guide-main")
                # remove dynamic content
                if pagemain.find(id="s-lg-page-prevnext"):
                    print(f'🐞 s-lg-page-prevnext: ?g={guide["id"]}&p={page["id"]}')
                    pagemain.find(id="s-lg-page-prevnext").decompose()
                if pagemain.find(class_="s-lc-whw"):
                    pagemain.find(class_="s-lc-whw").clear()
                if pagemain.find_all(id=re.compile("^libchat_")):
                    for libchat in pagemain.find_all(id=re.compile("^libchat_")):
                        libchat.decompose()
                if pagemain.select(".s-la-content-faqlist"):
                    for faqlist in pagemain.select(".s-la-content-faqlist"):
                        faqlist.clear()
                if pagemain.select(".s-lg-system-list .s-lg-guide-info-updated"):
                    for updated in pagemain.select(
                        ".s-lg-system-list .s-lg-guide-info-updated"
                    ):
                        updated.clear()
                if pagemain.select(".s-lg-system-list .s-lg-guide-info-views"):
                    for views in pagemain.select(
                        ".s-lg-system-list .s-lg-guide-info-views"
                    ):
                        views.clear()
                if pagemain.select(".ep_view_timestamp strong"):
                    for timestamp in pagemain.select(".ep_view_timestamp strong"):
                        timestamp.clear()
                if pagemain.select(".s-lg-rss .s-lg-rss-list"):
                    for rss in pagemain.select(".s-lg-rss .s-lg-rss-list"):
                        rss.clear()
                if pagemain.select(".hours-today .hours-col-time"):
                    for time in pagemain.select(".hours-today .hours-col-time"):
                        time.clear()
                if pagemain.select(".resize-sensor"):
                    for expand in pagemain.select(".resize-sensor"):
                        expand.decompose()
                # write html to file
                with open(f"{content_repository_name}/pages/{filename}", "w") as file:
                    file.write(pagemain.prettify())
        b.close()


if __name__ == "__main__":
    # fmt: off
    import plac; plac.call(main)
