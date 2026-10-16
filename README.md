# PURE — Project Page

Project page for **PURE: Refining Feed-forward 3D Reconstruction with Unlabeled Post-training** (ACM MM 2026).

Live site: https://funnyguy525.github.io/PURE-Page/

The homepage places authors and affiliations first, followed by a 2,000-frame Camera Head 128/1 long reconstruction, a 56-second method-and-results film and six short scenes across PURE (Pi3), PURE (DA3) and PURE (VGGT). Small RGB input windows follow video playback and seeking. The long film ends with a full-cloud overhead reveal; camera poses are not drawn.

The method film introduces unlabeled video post-training for more accurate dynamic-scene reconstruction, with depth ordering, local geometry and static correspondence objectives.

## Files

- `index.html`, `style.css`, `app.js`: current buildless showcase.
- `assets/`: compressed demo videos, synchronized RGB companions, figures and media provenance.
- `paper.html`: retained detailed research page, quantitative results and original figures.
- `static/`: original research figures, scripts, styles and PDF.

## Preview and deployment

Serve the repository root with any static server. Video chapter seeking requires HTTP byte-range support. GitHub Pages publishes `master` at `/`; `.nojekyll` serves the site without a build step.

All input attribution is in `assets/media-provenance.json`. Geometry is not changed by viewing-camera smoothing; some seams and dynamic ghosting remain.

## License

Research page content © 2026 the authors, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Input video rights remain with their respective creators.
