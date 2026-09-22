# IAHSS Central Florida Chapter Website

Public website: https://www.iahss-cfc.org/

This repository is the source of truth for the IAHSS Central Florida Chapter website.

## Hosting and deployment

- Repository: `iahsscfc/iahss-central-florida`
- Development/testing branch: `develop`
- Production branch: `main`
- Public host: Cloudflare Pages
- DNS provider: GoDaddy
- Squarespace is legacy and should not be used for new website changes.

Normal workflow:

1. Make changes on `develop`.
2. Commit and push `develop`.
3. Test the Cloudflare preview deployment.
4. Merge `develop` into `main`.
5. Push `main`.
6. Verify the Cloudflare production deployment and `https://www.iahss-cfc.org/`.

Do not edit production files directly in Cloudflare.

## Repository structure

```text
/
├── index.html
├── events.html
├── event-*.html
├── sponsors.html
├── summit-sponsorship-2026.html
├── summit-exhibitor-resources-2026.html
├── assets/
│   ├── calendar/       # downloadable .ics files
│   ├── css/            # shared styles
│   ├── documents/      # public PDFs/resources
│   ├── forms/          # public downloadable forms
│   ├── images/
│   │   ├── events/     # event artwork, photos and QR codes
│   │   ├── hospitals/  # member-hospital images
│   │   └── sponsors/   # sponsor logo assets
│   └── js/             # shared JavaScript
├── google-apps-script/ # award nomination backend source
└── .github/            # internal website changelogs/documentation
```

## Editing rules

1. Preserve filenames and capitalization referenced by HTML.
2. Keep new assets in the appropriate `assets/` subfolder rather than the repository root.
3. Prefer replacing an existing asset with the same filename when updating it.
4. Before deleting or moving a file, confirm it is not referenced by HTML, CSS or JavaScript.
5. Website change packages should contain only new or changed files.
6. Maintain non-public change records under `.github/`.
7. Back up the repository before structural cleanup or bulk changes.

## Important current assets

- Chapter logo: `assets/images/iahss-cfc-logo.png`
- Chapter coin artwork: `assets/images/chapter-coin-design-2026.png`
- Shared stylesheet: `assets/css/styles.css`
- Shared JavaScript: `assets/js/site.js`
- Award nomination Word form: `assets/forms/IAHSS_CFC_AWARD_NOMINATION_FORM.docx`
- Summit agenda PDF: `assets/documents/IAHSS_Florida_Summit_2026_Agenda.pdf`

## Legacy hosting files

`CNAME` and `.nojekyll` are intentionally retained until the remaining GitHub Pages/custom-domain cleanup is verified. Do not remove them solely as part of routine repository housekeeping.
