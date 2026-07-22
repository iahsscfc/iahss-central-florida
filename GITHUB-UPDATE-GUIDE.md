
# Updating the IAHSS Central Florida website manually

## Fastest method: upload files in your browser
1. Sign in to GitHub and open `iahsscfc/iahss-central-florida`.
2. Click **Add file** → **Upload files**.
3. Drag the **contents** of this website folder into the upload area. Do not upload the outer folder itself.
4. Wait for every file to finish uploading.
5. In **Commit changes**, enter a short note such as `Add event calendar and event pages`.
6. Select **Commit directly to the main branch** and click **Commit changes**.
7. Wait about 1–3 minutes, then refresh the live site with Ctrl+F5.

## Safest method for changing one file
1. Open the file in the GitHub repository, such as `index.html`.
2. Click the pencil icon (**Edit this file**).
3. Make or paste the change.
4. Click **Commit changes**.
5. Add a clear commit message and commit to `main`.

## Updating an image or logo
1. Keep the same filename whenever possible.
2. Open `assets/images` in GitHub.
3. Click **Add file** → **Upload files**.
4. Upload the replacement image and confirm **Replace** when prompted.
5. Commit the change. No HTML edit is needed when the filename stays the same.

## Adding a new event
1. Duplicate the most similar `event-*.html` file.
2. Rename the copy using lowercase words separated by hyphens, for example `event-march-2027.html`.
3. Edit the title, date, time, location, description, highlights, registration link and calendar link.
4. Add a matching event card to `events.html`.
5. Add the event to the homepage only when it should appear in the homepage event list.
6. Create an `.ics` file in the `calendar` folder by copying an existing one and changing its dates and text.
7. Commit all related files together.

## Avoiding broken links
- File and folder names are case-sensitive on GitHub Pages.
- Use relative links such as `events.html` and `assets/images/logo.png`.
- Do not use Windows paths such as `C:\Users\...`.
- Keep all site files on the `main` branch unless Pages is configured differently.

## Recommended routine before uploading
- Open `index.html`, `events.html`, `sponsors.html` and each new event page locally.
- Click every important button.
- Check the site at both desktop and phone widths.
- Compress large JPG/PNG files before upload. Large photos are the main cause of slow uploads and unnecessary bandwidth.
