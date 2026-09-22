# Repository Cleanup — 2026-09-22

## Purpose
Second-stage repository housekeeping after the migration to Cloudflare Pages. This cleanup preserves the public website design and functionality while removing confirmed-unused duplicates and aligning repository documentation with the current deployment workflow.

## Changed
- Moved the 2026 Summit hotel technology / Wi-Fi / power QR asset from the repository root to `assets/images/events/`.
- Updated `summit-exhibitor-resources-2026.html` to use the organized QR asset path.
- Rewrote `README.md` to identify GitHub as source control, Cloudflare Pages as the public host, and `develop → preview → main → production` as the standard workflow.
- Updated `GITHUB-UPDATE-GUIDE.md` for GitHub Desktop and Cloudflare Pages.
- Updated `AWARD-NOMINATION-SETUP-GUIDE.md` so publishing instructions use `develop` and Cloudflare preview testing before `main`.

## Confirmed unused and approved for deletion
- `assets/images/IAHSS CFC logo.png`
- `assets/images/IAHSS CFC logo2.jpg`
- `assets/images/iahsslogo1.jpg`
- `assets/images/brandon_reg_hosp.jpg`

The active chapter logo remains `assets/images/iahss-cfc-logo.png`, and the active Brandon hospital image remains `assets/images/hospitals/Brandon_Hosp.jpg`.

## Obsolete root documentation approved for deletion
- `README.txt`
- `UPLOAD-THIS-VERSION.txt`
- `UPLOAD_INSTRUCTIONS.md`
- `RELEASE_NOTES.md`
- `VERSION.txt`

These files described obsolete full-site upload, direct-to-main, GitHub Pages, or old version-package workflows. Current guidance is consolidated into `README.md` and `GITHUB-UPDATE-GUIDE.md`; historical website changes remain in `.github/WEBSITE-CHANGELOG.md` and Git history.

## Root asset approved for deletion after move
- `IAHSS_Summit_2026_Hotel_Technology_QR.png`

Replacement location:
- `assets/images/events/IAHSS_Summit_2026_Hotel_Technology_QR.png`

## Intentionally retained
- `CNAME`
- `.nojekyll`

These remain until bare-domain routing and obsolete GitHub Pages custom-domain configuration are separately verified and cleaned up.
