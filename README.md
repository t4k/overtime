# overtime

experiment in tracking website content changes

repository secrets requirements for GitHub Actions:

- `API_SITE_ID` the LibGuides site ID
- `API_KEY` the LibGuides API key
- `SITE_BASE_URL` the base URL for the LibGuides site

these secrets need to be set in _this_ repository

[content/pages.json](https://github.com/caltechlibrary/overtime/blob/main/content/pages.json) contains the JSON response from the API call with commits of changes scheduled daily

[content/pages/](https://github.com/caltechlibrary/overtime/tree/main/content/pages) contains the content of published pages with commits of changes scheduled daily

[content/posts/](https://github.com/caltechlibrary/overtime/tree/main/content/posts) contains the content of published blog posts with commits of changes scheduled daily

[upstream/](https://github.com/caltechlibrary/overtime/tree/main/upstream) contains the beautified contents of upstream css and js assets with commits of changes scheduled daily
