# Jane’s Archive

Jane’s Archive is a text-first, AO3-inspired portfolio for Jane Allyson Paray. It presents project work as browsable archive entries and chapter-style case studies while keeping her internship interests in Data Analytics, Business Analysis, and Software Quality Assurance clear to recruiters.

The site is an independent design inspired by archive conventions. It is not affiliated with Archive of Our Own or the Organization for Transformative Works.

## Development

This project uses React, TypeScript, Vite, and React Router.

1. Install dependencies with npm install.
2. Start the local development server with npm run dev.
3. Run npm run typecheck, npm run lint, and npm run build before reviewing a change.

## CI and release flow

The GitHub Actions workflow at `.github/workflows/ci.yml` runs on pull requests targeting `master` and on pushes to `master`. It uses Node.js 24.x and the existing lockfile with `npm ci`, then runs lint, typecheck, and build. There is no test script in `package.json`, so CI does not run tests.

Feature branch → pull request → CI checks (`CI / quality`) → review → merge → Vercel production deployment.

To require CI before merging, open the repository’s **Settings → Branches** and add a branch protection rule for `master` (or create a ruleset targeting `master`). Require pull requests and, if desired, approving reviews. Under required status checks, select `CI / quality` after its first run. Without that GitHub rule, the workflow reports failures but does not block merging.

To check the Vercel release settings, open the project’s **Settings → Environments → Production → Branch Tracking** and confirm the production branch is `master`. Then check **Settings → Build and Deployment → Deployment Checks** for a required check that holds production promotion until it passes. GitHub required checks gate pull request merges; Vercel Deployment Checks separately gate promotion after a production build. Without a required Vercel Deployment Check, a push or merge to the production branch can deploy automatically. The CI workflow itself does not change either platform’s settings.

CI uses Node.js 24.x, which is compatible with the locked Vite version and Vercel’s current default. If the Vercel project has a Node.js version override, align the workflow’s `node-version` with that setting.

## Routes

- / — archive dashboard
- /works — filterable project archive
- /works/distync — DISTYNC team capstone
- /works/lost-and-found — individual Campus Lost & Found project
- /profile — creator profile and skills
- /tags — linked skill and technology index
- /contact — Correspondence Corner form when configured, plus verified contact links
- /projects/distync and /projects/lost-and-found — legacy routes that redirect to the new work pages

Vercel rewrites application routes to the SPA entry point for direct navigation and refresh.

## Source and assets

- src/App.tsx — shared archive layout, routes, pages, and case-study content
- src/portfolio.ts — project metadata, chapter index, and tag data
- src/content.ts — public contact details, outbound links, and approved project-image configuration
- src/CorrespondenceForm.tsx — accessible Formspree contact form, shown only when configured
- src/ProjectGallery.tsx — optional, accessible project image gallery
- src/styles.css — responsive archive design system and accessibility styling
- public/assets/profile/jane-portrait.webp — approved portrait
- public/assets/distync/03-analytics-heatmap.png — DISTYNC operational heat map
- public/diagrams/ — source-derived workflow and application architecture diagrams
- planning/ — factual project and design references

The portrait, heat map, and diagrams are reused without modification. Campus Lost & Found screenshots and a finalized resume are not configured, so the page omits those optional items. The approved public DISTYNC team repository is linked from its case study; the Lost & Found live-demo link is not shown.

## Project framing

DISTYNC is an academic team capstone evaluated in controlled scenarios. The case study distinguishes Jane’s contributions from the team’s work and does not claim a live government deployment. Campus Lost & Found is presented as Jane’s individual academic project, with Codex assistance disclosed.

The release-candidate changes are committed locally; no push or deployment has been made.

See [FORMSPREE_SETUP.md](FORMSPREE_SETUP.md) for the Formspree endpoint, email notification, and spam-protection setup steps.
