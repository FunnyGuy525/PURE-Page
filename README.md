# PURE — Project Page

Project page for **PURE: Refining Feed-forward 3D Reconstruction with Unlabeled Post-training** (ACM MM 2026).

🔗 **Live site:** https://funnyguy525.github.io/PURE-Page/

## Structure

```
.
├── index.html                 # the whole page (no build step, no framework)
├── .nojekyll                  # serve files as-is on GitHub Pages
└── static/
    ├── css/style.css
    ├── js/main.js             # nav, result tabs, image lightbox
    ├── images/                # teaser / motivation / pipeline / qualitative / scaling
    └── pdfs/PURE_MM26.pdf
```

## Local preview

```bash
python3 -m http.server 8321
# open http://localhost:8321
```

## Deploy

GitHub Pages: **Settings → Pages → Source: Deploy from a branch → Branch: `master` / folder: `/ (root)`**.

## TODO before wide release

- Replace the two disabled buttons (`Code`, `Video`) with real links — search for `btn-disabled` in `index.html`.
- Add the arXiv link once available.
- Add result videos under `static/videos/` and embed with
  `<video src="static/videos/xxx.mp4" autoplay loop muted playsinline></video>`.
- Add a BibTeX section once the official ACM DL citation is available.

## License

Content © 2026 the authors, released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
