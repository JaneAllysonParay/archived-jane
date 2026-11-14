# Design Direction — Playful Precision (Working v1)

## Creative objective

Make Jane's site feel like a thoughtful real person built it: clean, warm, personable, lightly creative, and easy for a nontechnical recruiter to navigate. Relevant evidence must remain easier to find than decorative details.

## Page structure

### Homepage desktop wireframe

```text
+---------------------------------------------------------------+
| JANE / logo            Work   About   Contact    Resume       |
+---------------------------------------------------------------+
| (small photo)          Hi, I'm Jane!                           |
|                        Curious about data.                     |
|                        Passionate about better systems.        |
|                        [Explore projects] [Resume]             |
+---------------------------------------------------------------+
| Selected work                                                  |
| +--------------------+  +-----------------------------------+  |
| | DISTYNC             |  | Campus Lost & Found               |  |
| | summary + tags      |  | summary + tags                    |  |
| +--------------------+  +-----------------------------------+  |
+---------------------------------------------------------------+
| Data spotlight: DISTYNC heat map + concise analytics story    |
+---------------------------------------------------------------+
| Capability groups (Data / Analysis / Quality / Exploring)     |
+---------------------------------------------------------------+
| A little about me, student leadership, curiosity, teamwork     |
+---------------------------------------------------------------+
| Email · GitHub · LinkedIn · Resume                             |
+---------------------------------------------------------------+
```

### Case study wireframe

```text
Back to work
Project title, summary, team/individual ownership and role chips
Preview image or neutral placeholder (not invented screenshot)
Problem / context
My role and contributions
Operational workflow or architecture visual
Relevant technical depth (analytics, process, QA for DISTYNC)
Evidence and testing results
Limitations / learnings
Next project / contact
```

### Mobile behavior

Single-column cards, compact header, portrait kept small, text not crowded, arrows and buttons comfortably tappable, long Mermaid workflow shown in responsive scroll region or exported accessible image with alt and nearby text summary.

## Palette (proposed; values can be tuned after visual review)

- Page: `#FCFCFF` (off-white)
- Surface: `#FFFFFF`
- Primary text: `#23253B` (deep ink)
- Muted text: `#535771`
- Action: `#4246B6` (deep blue-violet, good contrast on white)
- Bright secondary accent: `#7185E8`
- Soft blue: `#ECF2FF`
- Violet accent: `#8766CD`
- Soft lavender: `#F2ECFF`
- Pink accent: `#D86FAD` (decorative or appropriate contrast)
- Soft blush: `#FFF0F7`
- Light border: `#E3E5F0`

**Important:** These are for the personal website, not the DISTYNC application screenshots. Do not recolor real DISTYNC screenshot content. Keep embedded diagrams legible in light/dark viewing contexts; Mermaid neutral defaults are acceptable.

## Typography and tone

- Clean, modern sans-serif with distinctive but restrained headings; use freely hosted/system fonts.
- Clear H1/H2/H3 hierarchy; avoid text smaller than comfortably readable.
- Hero line human, not exaggerated. Moderate headline size, generous whitespace.
- No skill bars, progress percentages, inflated badges, buzzword clouds, or recruiter-confusing jargon.

## Motion and interaction

- Soft hover elevation on project cards, subtle color transitions, accessible focus rings.
- Respect `prefers-reduced-motion`.
- Do not use a custom cursor, large animation sequence, autoplay sound, or progress gates for MVP.
- Content is visible without hovering. All primary links keyboard-accessible.

## Image/asset behavior

- Portrait: 64–88 px circular or softly rounded crop on desktop and mobile; actual original file later. Temporary text monogram or neutral vector avatar placeholder. Do not generate a faux likeness.
- Project cards: use sanitized real screenshots when available, otherwise simple typography-based preview blocks labeled as placeholders. Never present invented UI as evidence.
- DISTYNC heat map: already available (pending approval/sanitization), ideally image within analytics section.
- Forecasting populated results screen: deferred. Do not reintroduce colorful illustrative dashboard without explicit request.
- Operational workflow: compact left-to-right Mermaid `flowchart LR` like the Lost & Found README; few boxes, clear branch for Mayor's Office stock/relief-pack preparation; readable annotation beneath the diagram for role-specific, offline and validation constraints.
- Avoid embedding manuscript PDF pages directly as tiny, unreadable screenshots.

## MVP components (conceptual; no code yet)

SiteHeader; Hero; ProjectCard; SectionHeading; SkillGroup; DataSpotlight; AboutPanel; ContactFooter; CaseStudyHeader; EvidenceStats; WorkflowEmbed; ScreenshotGallery (optional, only real assets); ExternalLink.

## Accessibility and performance

- Responsive from narrow mobile to laptop/desktop; logical keyboard navigation.
- Semantic landmarks; one H1 per page; headings in order; alt text for photos/screenshots.
- Links have meaningful text; no `click here`; focus indicators visible.
- Sufficient text/background contrast; color not sole signal for status.
- Lazy-load lower-page images; optimize assets before publication.
- Route loading, 404 page, and outbound links must work.

## Deferred from MVP

Role-selector filters, advanced dashboard visualization, 3D scenes, custom backend/CMS, personalized animations, dark-mode toggle, animated portfolio timelines, additional data science project, automated certifications scraper, complex project galleries.

## Codex planning prompt (use only after content review)

> Read `PORTFOLIO_BRIEF.md`, `SITE_COPY_DRAFT.md` and `DESIGN_DIRECTION.md`. **Do not modify files yet.** Propose a simple React/TypeScript/Vite implementation plan, route structure, reusable component hierarchy, accessible responsive layout strategy, how to keep copy separate from components, and a placeholder-assets system so missing photos or screenshots do not block the build. Include test/lint/build checks and risks. Do not fabricate project metrics, app screenshots, public contact details, or data. Prefer small, reviewable milestones and freely available libraries. Output the plan for human approval only.
