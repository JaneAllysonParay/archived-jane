# Portfolio repository guidance for Codex

## Goal
Maintain a concise, polished, accessible internship portfolio for Jane Allyson Paray. Audience priority: Data Analytics, Business Analyst, QA. Preserve approved three-page scope and understated, warm editorial visual style.

## Content constraints
- Refer to `planning/PORTFOLIO_BRIEF.md`, `planning/SITE_COPY_DRAFT.md`, and `planning/DESIGN_DIRECTION.md` for approved baseline.
- DISTYNC is a team capstone. Distinguish Jane's contributions and AI assistance from the team's work.
- Do NOT invent achievements, contact details, demos, awards, test results, app screenshots, model accuracy, or production outcomes.
- Project metrics are from controlled capstone evaluation, not production guarantees.
- The forecasting results mockup is explicitly parked. Never add it without fresh permission.
- Keep the supporting operational workflow faithful to `planning/DISTYNC_HIGH_LEVEL_WORKFLOW.mmd`; do not imply the Mayor's Office inventory preparation occurs only after registration.
- Do not expose beneficiary PII, LGU credentials, tokens, or unapproved team materials.
- Missing asset paths in `src/content.ts` must render attractive neutral placeholders, not broken images.

## Engineering constraints
- React + TypeScript + Vite + React Router. No server/backend or database for the portfolio.
- Keep external URLs and configurable public details centralized in `src/content.ts`.
- Use semantic HTML, keyboard-friendly navigation, focus states, mobile layouts, and `prefers-reduced-motion`.
- Favor clean CSS and small components over new dependencies.
- Never deploy, push, or modify another project repository without explicit approval.

## Checkpoints
1. `npm install`
2. `npm run typecheck`
3. `npm run build`
4. Manual mobile + desktop review, keyboard navigation, outbound links, screenshots/consent, and factual audit.

Make small changes; explain and review them before large redesigns.
