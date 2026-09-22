# GitHub Desktop + Cloudflare Update Guide

Repository: `iahsscfc/iahss-central-florida`

## Normal website update

1. Open GitHub Desktop.
2. Select `iahss-central-florida`.
3. Switch to `develop`.
4. Click **Fetch origin**.
5. Confirm there are no unexpected local changes.
6. Use **Repository → Show in Explorer**.
7. Copy only the new/changed website files into the repository, preserving folder paths.
8. Return to GitHub Desktop and review the changed files.
9. Commit to `develop` with a concise description.
10. Click **Push origin**.
11. In Cloudflare Pages, open the `develop` preview deployment and test the affected pages.
12. If testing passes, switch GitHub Desktop to `main` and click **Fetch origin**.
13. Use **Branch → Merge into current branch…** and select `develop`.
14. If there are no merge conflicts, push `main`.
15. Wait for the Cloudflare production deployment to complete.
16. Verify `https://www.iahss-cfc.org/` and hard-refresh (`Ctrl+F5`) if needed.

If GitHub Desktop reports a merge conflict, stop and resolve it before pushing production.

## Add a future event

1. Copy the closest existing `event-*.html` page and rename it appropriately.
2. Update the title, date, location, description and official links.
3. Add/update the event card in `events.html`.
4. Update the featured/next event on `index.html` when appropriate.
5. Add a matching `.ics` file under `assets/calendar/` when useful.
6. Put event artwork under `assets/images/events/`.
7. Commit all related files together on `develop`, then test the Cloudflare preview.

## Replace a picture or logo

1. Store images under the appropriate `assets/images/` subfolder.
2. If replacing an existing image, use the same filename when practical.
3. If the filename/path changes, update every HTML/CSS reference before committing.
4. Test the affected page in the Cloudflare preview before merging to `main`.

## Repository housekeeping

Before moving or deleting files:

1. Create an external ZIP backup.
2. Search HTML, CSS and JavaScript for references to each candidate file.
3. Move assets into the appropriate `assets/` folder and update references in the same commit.
4. Delete only confirmed-unused duplicates/obsolete files.
5. Test on `develop` before merging to `main`.

## Troubleshooting

- Old content after deployment: wait for Cloudflare deployment, then use `Ctrl+F5`.
- Broken layout: verify the page points to `assets/css/styles.css`.
- Menu not working: verify the page points to `assets/js/site.js`.
- Missing image: verify path, filename, extension and capitalization.
- Production did not update: confirm the latest `main` commit has a successful Cloudflare deployment.
