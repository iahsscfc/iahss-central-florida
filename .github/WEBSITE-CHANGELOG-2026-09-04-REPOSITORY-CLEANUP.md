# Website Changelog - 2026-09-04 Repository Cleanup

Branch: `develop`

## Website changes
- Added ASSA ABLOY to the Platinum sponsor tier on `sponsors.html`.
- Standardized the Summit sponsorship page on `assets/css/styles.css` and `assets/js/site.js`.
- Updated the Fall Summit page to use the canonical agenda files under `assets/documents/` and `assets/images/events/`.
- Standardized hospital image references on the canonical files under `assets/images/hospitals/`.

## Confirmed duplicate cleanup
The following exact duplicate files/directories can be removed after the changed HTML files are installed:
- `calendar/` (duplicate of `assets/calendar/`)
- `IAHSS_Florida_Summit_2026_Agenda.pdf` (duplicate of `assets/documents/IAHSS_Florida_Summit_2026_Agenda.pdf`)
- `florida-summit-2026-agenda.png` (duplicate of `assets/images/events/florida-summit-2026-agenda.png`)
- `assets/styles.css` (legacy path; Summit sponsorship page now uses `assets/css/styles.css`)
- `assets/site.js` (legacy path; Summit sponsorship page now uses `assets/js/site.js`)
- `assets/images/Adventhealth Dade City.jpg`
- `assets/images/Adventhealth Meadow Point ER.jpg`
- `assets/images/Adventhealth Zephryhills.JPG`
- `assets/images/Brandon_Hosp.jpg`
- `assets/images/hospital-dade-city.jpg`
- `assets/images/hospital-meadow-pointe.jpg`
- `assets/images/hospital-zephyrhills.jpg`

The hospital-image files above are byte-for-byte duplicates of the retained copies under `assets/images/hospitals/`.

## Deferred infrastructure cleanup
- Retained `CNAME` and `.nojekyll` pending separate verification of Cloudflare custom-domain routing and any remaining GitHub Pages configuration.
- Bare-domain routing (`iahss-cfc.org` to `www.iahss-cfc.org`) should be verified in Cloudflare/GoDaddy before changing DNS-related repository files.
