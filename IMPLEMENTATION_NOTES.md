# Implementation notes — Jane’s Archive

## Current state

The React, TypeScript, and Vite portfolio has been redesigned as Jane’s Archive: an independent, AO3-inspired archive interface with text-first project entries and chapter-style case studies.

The active redesign branch is redesign/ao3-archive. The baseline branch was clean before the branch was created.

## Implemented

- Archive header, footer, breadcrumbs, mobile navigation, and skip link
- Creator dashboard homepage with portrait sidebar and recent works
- Filterable Works archive with URL-backed tag selection
- DISTYNC and Campus Lost & Found case-study pages
- Profile, Tags, Contact, and accessible not-found pages
- Legacy redirects from the prior project routes
- Vercel SPA rewrite for direct route loads
- Page titles, description, color theme, and burgundy favicon
- Responsive layout, visible focus, reduced-motion styling, and keyboard-scrollable diagrams

## Content and assets

- DISTYNC remains explicitly framed as a team capstone; personal contributions are separated from team work.
- The workflow diagram and operational heat map are reused from public assets. The heat-map screenshot is not recolored.
- The Lost & Found architecture diagram and verified GitHub links are retained.
- The approved public DISTYNC team repository is linked from its case study.
- The live-demo link, resume action, and empty Lost & Found image gallery are omitted because they are not approved or configured for public display.
- Configured email, LinkedIn, and GitHub profile links remain available.

## Validation

- npm run typecheck — passed
- npm run build — passed
- npm run lint — passed
- No test script is configured.
- Browser review observed the homepage, Works archive, a working tag filter, and the DISTYNC case study in the existing local browser tab.
- The browser review was stopped with Escape before the full route and viewport matrix could be completed. Manual review is still needed at 1440px, 1024px, 768px, 375px, and 320px, plus direct refresh checks for all routes.

## Release candidate review — 2026-11-15

- The approved public DISTYNC team repository is linked from the case study; team attribution and controlled-evaluation framing are unchanged.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed. `git diff --check` and `git diff --cached --check` passed.
- The locally configured Formspree ID is included in the production bundle. Formspree inbox delivery has not been tested.
- The removed `public/assets/distync/01-overview.png` is absent from the source tree and production build. The approved portrait, heat map, and project diagrams remain unchanged.
- `.env.local` and `tsconfig.tsbuildinfo` are ignored and untracked. Personal review assets are outside the repository, and no backup or review assets are tracked.
- Source routes, navigation targets, and asset references were reviewed. The full browser viewport and direct-refresh matrix noted above remains pending.

The release-candidate changes are committed locally; no push or deployment has been made.
