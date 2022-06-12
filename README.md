# overtime
experiment in tracking website content changes

repository secrets requirements for GitHub Actions:

- `CONTENT_REPOSITORY_OWNER` the user or organization that owns the following repository
- `CONTENT_REPOSITORY_NAME` the repository name where scraped HTML files will be committed
- `TOKEN` a _personal access token_ for a user with commit permissions on the preceding repository

these secrets need to be set in _this_ repository
