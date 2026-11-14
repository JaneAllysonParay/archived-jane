# Jane Allyson Paray — Internship Portfolio Brief (Working v1)

**Status:** Strategy and design approved by Jane; MVP source implementation begun. Factual review and deployment pending.  
**Primary objective:** Publish a credible, recruiter-friendly internship portfolio as soon as practical without waiting for every asset.  
**Primary audience (priority order):** Data Analytics, Business Analyst, Quality Assurance recruiters and interviewers.  
**Secondary relevance:** Systems Development and general IT internships.  
**Supporting interests:** Automation, networking, systems administration, cloud/DevOps/infrastructure (learning and coursework exposure, not overstated expertise).

## Positioning

**Professional headline:** Aspiring IT Professional | Data Analytics, Business Analysis & Software Quality Assurance

**Core narrative:** I enjoy understanding problems, working with data, improving how systems operate, and validating that technology meets real user needs. My work spans requirements, architecture, development, analytics, testing, and stakeholder evaluation.

**Personality:** Professional, warm, conversational; curious, approachable, willing to learn, dependable. No forced corporate language or overclaims.

**Visual identity:** Minimal, humanized, creative, with a small circular/square-cropped professional portrait; primarily white/off-white, blue, purple/lavender, and blush pink. Subtle motion; accessible and fast. The portfolio theme must not recolor or fabricate original screenshots and product UI.

## Site map — MVP

1. `/` — Homepage: introduction + small portrait placeholder; featured projects; brief analytics spotlight linked into DISTYNC; capability groups; personal/leadership section; contact/CV links.
2. `/projects/distync` — Detailed capstone case study: problem, users, scope, my role, representative operational workflow, selected architecture, integrated analytics (including forecasting logic and heat map), QA/UAT evidence, limitations, reflection, links (permission-gated).
3. `/projects/lost-and-found` — Concise personal full-stack case study: problem, my role, user journeys, technical architecture, AI-assisted report review, QA/testing, deployment, reflection, links.
4. Catch-all/404 state and accessible links back home.

**Navigation:** Work, About, Contact; Resume link. The Work section links to both detailed case studies. Consider inline anchor links from DISTYNC to its Analytics / Business Analysis / Quality Assurance subsections. No additional filters or role-specific websites for MVP.

## Content hierarchy and recruiter journey

- First screen: name, role interests, evidence-focused one-paragraph introduction, clearly visible "View projects" and "Resume" actions; small photo.
- Next: DISTYNC followed by Campus Lost & Found, with clear summaries and role-relevant labels.
- Data Analytics signal: DISTYNC heat map + short summary of model evaluation, without needing a populated forecast screenshot.
- Supporting skills grouped by capability, not a wall of logos.
- About: humanizing details about leadership, collaboration, curiosity, and approach to learning.
- Contact: email, LinkedIn, GitHub; ensure all URLs and public information are user-approved.

## Verified project anchors from discovery and reviewed materials

### DISTYNC — team capstone

**Problem/context:** Existing paper-based and spreadsheet-heavy disaster-relief records within Malvar LGU led to fragmented household/evacuee, relief distribution, and inventory workflows.

**Solution:** Team-built role-based PWA connecting registration, stub/QR-supported relief distribution, inventory management, reporting, descriptive analytics/heat map, and inventory forecasting, with selected prepared offline workflows and synchronization.

**Roles:** MSWDO establishes disaster-event context and monitors consolidated records; Mayor's Office maintains stock and relief-pack templates and views forecasting; Barangay Officials register evacuees and validate relief claims; Donors/NGOs have read-only public donation information.

**Individual contributions as reported by Jane:** Participated in requirements, architecture/security/deployment planning, data dictionary and documentation; personally researched technology choices, set up the Supabase-hosted PostgreSQL database, initiated AI-assisted system building, built Mayor's Office forecasting analytics with AI assistance; helped with manual/automated tests, UAT, stakeholder demos, results interpretation, and presentation. In public copy, distinguish individual contribution vs team-wide work and explain review/verification of AI-assisted work.

**Evidence and technology:** React/Vite PWA, Node/Express REST API, PostgreSQL on Supabase, Python/FastAPI analytics service; existing diagrams, use cases, testing and manuscript; public GitHub project branch `release/testing-rc1`.

**Analytics:** MSWDO barangay operational heat map displays aggregated operational indicators (not hazard mapping or household geolocation); forecast engine implements Moving Average, Exponential Smoothing, Trend Projection and rolling-origin historical evaluation with MAE/RMSE; distinguish Recommended Model from fallback Operational Model Used and avoid claims of real-world forecasting accuracy.

**Capstone-reported evaluation under controlled scenarios:** 86/86 functional, 22/22 PWA, 23/23 security, 10/10 reliability, 72/72 UAT cases; 15 UAT participants; 1.29-second mean response time in study's defined conditions; TAM construct means 4.27/4.08/4.23; SUS mean 67.17 vs benchmark 68. These are test/study reports, not production guarantees. Never say "100% secure." Source: updated 281-page DISTYNC manuscript uploaded in the project; obtain team permission before publicizing shared artifacts/results.

**Limitations:** Evaluated in controlled scenarios rather than actual disaster use; offline only for prepared/eligible workflows; offline work is not centrally accepted until successful synchronization while app is active; need stronger local data protection and tested backup/recovery before broader adoption. Acknowledge usability refinement need.

**Visuals currently available:** Login/access screenshot (obscure visible Google account); Barangay Operational Heat Map screenshot (prefer selected barangay with summary); empty Forecasting Management screen (parked: do NOT publish as functioning output); source-derived Mermaid high-level operational flow concept. Architecture visual may be derived from manuscript after review.

**Public links:** `https://github.com/dlslfinalproject/distync` — permission/repository visibility review; avoid adding official demo until access/privacy is cleared.

### Campus Lost & Found — individual project

**Problem/context:** Campus users need to report lost/found items, browse records, and submit ownership claims.

**Work:** Jane reports full personal ownership of the project, with Codex assistance during development; integrated Gemini AI for report-review assistance.

**Architecture:** React/TypeScript/Vite frontend deployed on Vercel; Express/TypeScript API; MongoDB Atlas through Mongoose; Gemini API; JWT-bearing authenticated requests. Repo READMEs include an architecture Mermaid diagram. Frontend tests and CI exist, and backend is separate.

**Evidence:** `https://github.com/JaneAllysonParay/itelect4-project` and `https://github.com/JaneAllysonParay/itelect4-backend`. A deployed frontend is referenced in repo, but final portfolio link should be clicked and independently tested prior to launch.

**Case-study message:** Shows ability to implement a complete user journey, connect APIs/data services, test behavior, integrate AI responsibly, and deploy.

## Additional credibility signals

- BS Information Technology (Systems Development), De La Salle Lipa; expected June 2027 (from provided resume).
- JPCS leadership roles, executive secretary and executive vice president, currently fourth-year representative (confirm which dates/details Jane wants publicly included).
- Coursework/labs: Cisco Packet Tracer, Power Apps, UiPath, Ubuntu/Ubuntu Server, Windows Server, Smartbooks ERP; label as academic exposure unless stronger artifacts are provided.
- Certificates named by Jane: Cisco Networking Basics, Introduction to SQL (DataCamp), Accenture Skills to Succeed, Bridging Ethical Hacking and Data Analytics (verify exact public names and evidence before linking).
- Capstone IT Colloquium recognition (verify exact award wording before headline inclusion).

## Asset policy: no blockers

Use neutral **clearly marked placeholders** during implementation. Never generate fake application screenshots or fictional performance evidence. Asset collection continues separately.

- `profile/jane-portrait.jpg` — pending; small photo placeholder is fine.
- DISTYNC `analytics-heatmap.png` — user-provided image, sanitize as appropriate.
- DISTYNC `operational-workflow` — Mermaid source; review against manuscript and embed as diagram or static export.
- DISTYNC `architecture` — pending, optional at MVP launch if text + code links suffice.
- DISTYNC forecasting populated screen — explicitly deferred; no fake results.
- Lost & Found screenshots — pending; use text-based project card or a tasteful neutral placeholder instead.
- Public CV, LinkedIn, email — confirm final versions/links before launch; do not invent.

## Claims / risk guardrails

- No synthetic analytical results portrayed as real; no fabricated screenshots.
- No beneficiary PII, login identities, keys, secret URLs, or real LGU records in public assets.
- Obtain project/team permission for shared manuscript graphics, names, and institutional context as needed.
- Use "team capstone" and "my contributions" rather than single-handed authorship for DISTYNC.
- Describe AI-assisted work openly, including personally verified decisions and behavior.
- Do not describe DISTYNC as fully deployed for real disaster operations.
- Model evaluation under available history is not proof of deployment forecasting accuracy.
- Never conflate GitHub source architecture with actual operational workflow, or imply Mayor's Office stock prep must occur only after registration.

## MVP launch acceptance criteria

- Homepage explains identity, target roles, and two projects without reading CV.
- Mobile-responsive, readable, keyboard-accessible, reduced-motion-friendly; semantic headings and meaningful links.
- Functional navigation to both case studies; not a blank or broken link.
- No secret, private records, or unapproved screenshot.
- Every numeric result attributed to the capstone's controlled evaluation conditions.
- Real outbound links tested and working; unsupported/unfinished links hidden rather than dead.
- CI/build and basic interactive navigation tests pass; portfolio can launch with some images pending.

## Decision log

- Round 1: broad interest across systems/data/development/IT; primarily free tools; Windows + VS Code + GitHub + Git + Node + Codex; React/TS comfortable; limited build time.
- Round 2: priority roles Data Analytics > Business Analyst > QA; personal photo desired; quick viable launch matters more than exhaustive polish.
- Final preference: small photo, balanced warm writing, DISTYNC-integrated analytics rather than separate analytics project.
- Forecasting results UI mockup was explicitly parked due to visual inaccuracy; do not recreate unless Jane later asks.
- Operational workflow should be compact GitHub-style Mermaid left-to-right, source-accurate to updated manuscript.

## Phase gate

**Current stage:** MVP implementation. Jane explicitly approved the plans and preferred reviewing the working version. Review local MVP, correct inaccuracies, then replace approved assets and launch.
