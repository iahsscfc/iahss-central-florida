# IAHSS Central Florida Online Award Nomination - Setup Guide

This package adds a public online nomination page while preserving the existing downloadable Word form.

## What the finished system does

- Displays a chapter-branded nomination form on the GitHub website.
- Requires one award category and a narrative of at least 200 words.
- Saves every submission to a Google Sheet owned by `iahsscfc@gmail.com`.
- Generates a printable PDF and Microsoft Word copy in Google Drive.
- Emails the PDF and Word copy to:
  - bbeers@tgh.org
  - info@iahss.org
  - info@iahss-cfc.org
  - thomas.gooden@va.gov
  - jeccica.schelble@baycare.org
  - iahsscfc@gmail.com
- Emails a PDF confirmation to the sponsoring member.
- Keeps the original Word form available for people who prefer the traditional process.

## Part 1 - Add the Google Apps Script backend

1. Sign into the Google account `iahsscfc@gmail.com`.
2. Open `https://script.google.com/`.
3. Click **New project**.
4. Name the project:
   `IAHSS CFC Award Nomination Backend`
5. Delete the sample code in `Code.gs`.
6. Open `google-apps-script/Code.gs` from this package in Notepad.
7. Copy everything and paste it into the Apps Script `Code.gs` editor.
8. In Apps Script, click the gear icon (**Project Settings**).
9. Check **Show "appsscript.json" manifest file in editor**.
10. Return to the editor, open `appsscript.json`, and replace its contents with the package file `google-apps-script/appsscript.json`.
11. Click **Save project**.

## Part 2 - Deploy the web app

1. In Apps Script, click **Deploy** > **New deployment**.
2. Click the gear beside **Select type** and choose **Web app**.
3. Description:
   `IAHSS CFC 2026 Award Nomination`
4. **Execute as:** Me (`iahsscfc@gmail.com`).
5. **Who has access:** Anyone.
6. Click **Deploy**.
7. Google will ask for authorization. Click **Authorize access** and approve the requested permissions.
8. Copy the **Web app URL**. It ends in `/exec`.

## Part 3 - Connect the website form

1. Open `award-nomination-2026.html` in Notepad.
2. Find:
   `REPLACE_WITH_GOOGLE_APPS_SCRIPT_WEB_APP_URL`
3. Replace that entire text with the Web app URL copied above.
4. Save the file.

## Part 4 - Copy files into the GitHub repository

Copy these package files into the repository, preserving folders:

- `award-nomination-2026.html`
- `event-holiday-2026.html`
- `assets/css/award-nomination.css`
- `AWARD-NOMINATION-SETUP-GUIDE.md`
- `google-apps-script/Code.gs`
- `google-apps-script/appsscript.json`

The original file must remain here:

- `assets/forms/IAHSS_CFC_AWARD_NOMINATION_FORM.docx`

## Part 5 - Commit and publish

Suggested Git commit message:

`Add online award nomination form and automated routing`

Commit to `main`, then click **Push origin**. GitHub Pages will republish automatically.

## Part 6 - Test before announcing the form

1. Open the new page:
   `https://www.iahss-cfc.org/award-nomination-2026.html`
2. Submit a test nomination using an email address you can check.
3. Confirm all six review addresses receive the email.
4. Confirm the sponsoring email receives a confirmation.
5. Sign into Google Drive as `iahsscfc@gmail.com`.
6. Confirm a folder named `IAHSS CFC 2026 Award Nominations` exists.
7. Confirm the folder contains PDF and DOCX files.
8. Open the Google Sheet named `IAHSS CFC Award Nominations` and confirm the submission appears.
9. Open the PDF and DOCX files and confirm they are printable.
10. Delete or clearly mark the test submission.

## Viewing and downloading submissions

- **All response data:** Google Sheet `IAHSS CFC Award Nominations`.
- **Printable copies:** Google Drive folder `IAHSS CFC 2026 Award Nominations`.
- **Email copies:** Sent automatically to the six review addresses.
- **Traditional option:** Existing Word form remains downloadable from the website.

## Important operating notes

- Do not place the recipient addresses in the public HTML page. They remain in the private Apps Script project.
- If recipients change, edit `emailRecipients` near the top of `Code.gs`, save, and deploy a **new version** of the web app.
- Google Apps Script and Gmail have daily sending quotas. This form is designed for low-volume chapter nominations, not mass mailing.
- The optional supporting-document field accepts a share link rather than a direct file upload. This avoids placing potentially sensitive attachments on the public website.
- Check the Google Sheet and Drive folder periodically during the nomination period.
