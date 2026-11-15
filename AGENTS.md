# Portfolio repository guidance for Codex

## Goal

Maintain Jane’s Archive as a concise, accessible portfolio for Jane Allyson Paray. The priority internship interests are Data Analytics, Business Analysis, and Software Quality Assurance, with Systems Development and related IT work as supporting strengths.

The current approved design is a text-first, AO3-inspired personal archive with work listings, tags, and chapter-style case studies. The initial MVP direction in older planning notes is historical; do not restore its purple-gradient landing-page design unless Jane asks.

## Content and privacy

- Use planning documents and the existing source as factual references.
- DISTYNC is a team capstone. Clearly separate Jane’s contributions from team work and describe evaluation results only in their documented context.
- Do not invent achievements, employment, credentials, contacts, demos, test results, screenshots, model accuracy, dates, or production outcomes.
- The DISTYNC forecasting-results mockup is intentionally postponed.
- Keep the Mayor’s Office inventory and relief-pack workflow parallel to Barangay registration, as shown in planning/DISTYNC_HIGH_LEVEL_WORKFLOW.mmd.
- Do not expose beneficiary personal information, credentials, tokens, or unapproved team materials.
- Do not publish or link the DISTYNC team repository without documented permission.
- Hide unavailable optional assets and links gracefully. Never show broken images or placeholders that look like real evidence.

## Engineering

- Continue with React, TypeScript, Vite, and React Router. Do not add a server, database, CMS, or unnecessary dependencies.
- Keep public contacts, external destinations, and approved image paths centralized in src/content.ts.
- Preserve the approved portrait, heat-map screenshot, and diagrams; do not recolor or crop evidence assets into misleading representations.
- Use semantic HTML, keyboard-accessible interactions, visible focus, responsive layouts, and prefers-reduced-motion support.
- Treat missing resume and Campus Lost & Found screenshots as optional.

## External actions

Do not commit, push, create a pull request, or deploy without Jane’s explicit instruction.

## Validation

When requested or appropriate, run npm run typecheck and npm run build. Run npm run lint when the script exists. Do not claim checks passed unless they ran successfully.
