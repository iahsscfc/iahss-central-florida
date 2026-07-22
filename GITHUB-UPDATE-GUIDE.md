# Manual GitHub Update Guide

Repository: `https://github.com/iahsscfc/iahss-central-florida`

## Replace the entire website safely

1. Download and extract the master ZIP.
2. Open the extracted `IAHSS_CFC_Website_Master` folder.
3. In GitHub, open the repository and confirm the branch is `main`.
4. Select **Add file → Upload files**.
5. Drag the files and folders from inside the master folder into the upload area.
6. Allow GitHub to replace files with the same names.
7. Use a commit message such as `Update website from master package`.
8. Select **Commit directly to the main branch** and commit.
9. Open the repository's **Actions** tab and wait for the Pages deployment to show a green checkmark.
10. Open the live website and press `Ctrl+F5` to bypass cached files.

## Update only one page

Upload the replacement HTML file to the repository root. For example, upload `sponsors.html` directly beside `index.html`.

## Replace a picture or logo

1. Open `assets/images` in GitHub.
2. Select **Add file → Upload files**.
3. Upload the replacement using the exact same filename and capitalization.
4. Commit the change.

## Add a future event

1. Copy the closest existing `event-*.html` page and rename it.
2. Update the title, date, location, description, registration link, and calendar link.
3. Add a matching event card to `events.html`.
4. Add or update the featured event on `index.html` when appropriate.
5. Add an `.ics` calendar file under `assets/calendar`.
6. Upload and commit all related files together.

## Troubleshooting

- Wrong or old image: wait for the GitHub Pages deployment, then press `Ctrl+F5`.
- Broken layout: verify each page points to `assets/css/styles.css`.
- Menu not working: verify each page points to `assets/js/site.js`.
- Missing image: verify the filename, extension, and capitalization exactly match the HTML.
