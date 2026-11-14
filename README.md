# Jane Allyson Paray — Internship Portfolio (MVP)

Three-page portfolio focused on **Data Analytics**, **Business Analysis**, and **Software Quality Assurance**, with DISTYNC as the primary capstone case study and Campus Lost & Found as an individual full-stack project.

## Status

**Working source implementation, pending dependency installation and live QA.** Assets and public contact links are intentionally unfinished; there are no invented screenshots or data results. The `preview/` folder is a dependency-free design preview and is not a substitute for the final Vite build.

## Quick start (Windows + VS Code)

1. Extract this ZIP, then open the `jane-portfolio-mvp` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run `npm install` (requires internet on your computer).
4. Run `npm run dev`.
5. Open the localhost URL printed in the terminal, generally `http://localhost:5173`.
6. Check `http://localhost:5173/projects/distync` and `http://localhost:5173/projects/lost-and-found`.
7. To validate before deploying, run `npm run typecheck` and `npm run build`.

For the no-install design preview, open `preview/index.html` in a browser (static design reference only).

## Structure

- `src/App.tsx`: routes, sections and reusable pieces
- `src/styles.css`: complete responsive design and motion rules
- `src/content.ts`: approved links, asset paths and data used in the site
- `public/diagrams/`: source-grounded static workflow and architecture diagrams
- `planning/`: approved design/content brief and original operational workflow (Mermaid)
- `AGENTS.md`: Codex instructions and content-safety boundaries
- `preview/`: lightweight static offline preview

## Assets and public links

Edit `src/content.ts` when ready:

- `portraitPath`: e.g., `/assets/jane-portrait.jpg` after placing a sanitized image into `public/assets/`
- `distyncHeatmapPath`: e.g., `/assets/distync-heatmap.png` after group approval and screenshot review
- `lostFoundImagePath`: optional
- `resumePath`: `/assets/Jane_CV.pdf` after choosing final public CV
- `email`, `linkedin`: use only addresses/links you want public
- `distyncRepo`: add the team repository only after permission and privacy review
- `lostDemo`: add only after testing the deployed application

Place approved photos/screenshots in `public/assets`. Blank asset paths are handled gracefully and never create broken images.

## Accurate project framing

DISTYNC is a **team capstone**, evaluated using controlled disaster-response scenarios. The public page qualifies test counts, model recommendations, offline synchronization, and operational limitations. It does not claim deployment for actual disaster operations. Forecasting-results mockups and sample figures were deliberately excluded after Jane rejected the inaccurate visualization.

## Suggested Codex prompt to continue

> Inspect this repository and read `AGENTS.md` and all files in `planning/`. Perform a read-only code review first: identify accessibility, responsive, code-quality, factual-accuracy, and build risks. Do not modify files yet. List the smallest fixes in priority order. After I approve the fixes, make them in small patches and run typecheck/build. Do not introduce fictional screenshots, unsupported metrics, unverified contact links, or new libraries without a clear need.

## Local validation notes

This artifact was authored in an environment without network access to npm. The source was checked for TypeScript/TSX syntax, and the static design preview was inspected separately. **The React/Vite dependency build must still be run on a machine with installed packages.**
