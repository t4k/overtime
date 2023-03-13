# overtime

experiment in tracking website content changes

repository secrets requirements for GitHub Actions:

- `API_SITE_ID` the LibGuides site ID
- `API_KEY` the LibGuides API key
- `CONTENT_REPOSITORY_OWNER` the user or organization that owns the content repository
- `CONTENT_REPOSITORY_NAME` the repository name where scraped HTML files will be committed
- `SITE_BASE_URL` the base URL for the LibGuides site
- `TOKEN` a _personal access token_ for a user with commit permissions on the content repository

these secrets need to be set in _this_ repository
