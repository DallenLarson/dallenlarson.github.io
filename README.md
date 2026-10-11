# Dallen Larson — Portfolio

Static GitHub Pages portfolio with project case studies, a downloadable résumé, and social/search metadata.

## Local preview

Run `python -m http.server 8000` from the repository root and open http://localhost:8000.

## Content

- `index.html`: introduction, selected work, experience, writing, and contact.
- `work/*/index.html`: directly addressable engineering case studies and public release references.
- `assets/Dallen-Larson-Resume.pdf`: public résumé.
- `tools/build-resume.py`: editable résumé source (requires Python, ReportLab, pdfplumber, and Windows Arial fonts).
- `sitemap.xml`, `robots.txt`, canonical URLs, and JSON-LD: search discovery and identity metadata.

Before publishing, check internal links, keyboard navigation, narrow-screen layout, image loading, and PDF text extraction. Add new public content URLs to the sitemap. Keep dates, release claims, and profile links accurate; do not invent outcome metrics.

GitHub Pages deploys `main`. The custom domain is `dallenlarson.com` and HTTPS is enforced in repository settings. Search Console ownership and indexing requests are managed in the owner's Google account.
