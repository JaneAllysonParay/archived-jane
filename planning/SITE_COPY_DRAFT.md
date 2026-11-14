# Portfolio Site Copy — Draft v1

**This is a first-pass writing draft, not a final public biography.** Any placeholders in brackets require real data or can be omitted at launch. Tone: professional, warm, conversational, humanized. Avoid claiming unsupported outcomes.

## Homepage

### Hero

**Eyebrow:** Hi, I'm Jane! 👋

**Headline:** Curious about data. Passionate about better systems.

**Description:** I'm Jane Allyson Paray, an Information Technology student specializing in Systems Development. I enjoy exploring how data, people, and technology work together—whether that's understanding a workflow, building an application, or testing that a solution works the way it should.

**Short focus line:** Exploring Data Analytics · Business Analysis · Software Quality Assurance

**Actions:** Explore my work · View my resume

**Small portrait:** [PORTRAIT PLACEHOLDER]

### Featured work introduction

**Heading:** A few things I've worked on

**Intro:** From a multi-office disaster-relief capstone to a campus lost-and-found application, these projects reflect how I approach problems: understand the need, build thoughtfully, test carefully, and keep learning along the way.

### Featured project 1: DISTYNC

**Title:** DISTYNC — Disaster Relief Management System

**Subtitle:** Turning disconnected workflows into a more connected system for disaster-relief operations.

**Summary:** A team capstone project designed around the needs of selected local government offices in Malvar, Batangas. DISTYNC connects evacuee registration, relief distribution, inventory records, and operational analytics in a role-based web application. My contributions included technology research, database setup, forecasting feature development with AI assistance, documentation, and validation activities.

**Tags:** Data Analytics · Business Analysis · QA & Testing · React · PostgreSQL

**CTA:** Read the DISTYNC case study

### Featured project 2: Lost & Found

**Title:** Campus Lost & Found Tracker

**Subtitle:** Helping campus communities report items and manage ownership claims.

**Summary:** A full-stack application I built with React, TypeScript, Express, and MongoDB, with AI-assisted report review powered by Gemini. This project gave me hands-on experience connecting interfaces to APIs, managing application data, testing functionality, and deploying a working solution.

**Tags:** Full-Stack Development · API Integration · Software Testing · AI Integration

**CTA:** Explore Lost & Found

### Data spotlight (integrated; no invented forecast screen)

**Heading:** Making operational data more useful

**Text:** In DISTYNC, our team explored how information collected during relief operations could support clearer decisions. The project includes a barangay-level operational heat map and inventory-demand forecasting using statistical methods with historical error evaluation. I worked on the forecasting feature with AI assistance and helped validate the broader system through testing and user evaluation.

**CTA:** See the analytics work inside DISTYNC

**Image:** [EXISTING HEAT-MAP SCREENSHOT] — no fabricated model results.

### What I work with

**Heading:** How I like to solve problems

**Data & analysis:** SQL and relational data, descriptive analytics, forecasting concepts, reporting, interpreting results.

**Business & systems:** Requirements, workflows, functional/nonfunctional requirements, system documentation, stakeholder collaboration.

**Quality & development:** Test cases, functional testing, UAT, defect review, React/TypeScript, Node/Express, APIs, Git/GitHub.

**Exploring further:** Networking, automation, Linux/Windows Server, cloud and deployment fundamentals. [Clarify coursework vs project work.]

### About preview

**Heading:** More than code and dashboards

**Text:** I enjoy the collaborative side of technology just as much as the technical side—listening to different perspectives, asking questions, and turning ideas into something useful. Through student leadership and capstone work, I've learned the value of clear communication, reliability, and staying open to feedback.

**CTA:** Let's connect

### Contact

**Heading:** Let's talk about what we could build or improve.

**Text:** I'm looking for an internship where I can contribute, learn from experienced professionals, and keep growing in data analytics, business analysis, software quality, and systems-related work.

**Links:** [APPROVED EMAIL] · [LINKEDIN URL] · [GITHUB PROFILE] · [RESUME]

## DISTYNC Case Study (`/projects/distync`)

**Kicker:** Team capstone · Disaster relief management

**Heading:** DISTYNC: Connecting people, records, and relief operations

**Intro:** Disaster-response activities require multiple offices to work from reliable information. Our team developed DISTYNC to bring key records and workflows into a centralized, role-based system while preserving established local-government procedures.

### The challenge

The participating offices relied on paper forms, spreadsheets, and separate records for household and evacuee monitoring, relief distribution, and inventory management. This made consolidation, traceability, and timely planning difficult.

### Who the system supports

- Barangay officials: register households and evacuees, track attendance, validate relief claims.
- MSWDO: manage disaster-event context, consolidate operational records, review dashboards/heat map, generate reports.
- Office of the Mayor: maintain inventory and relief-pack templates, track movements, review demand forecasts.
- Donors and NGOs: read-only public access to relevant donation information.

### My contribution

I participated in requirements refinement, architecture and deployment discussions, data dictionary work, testing, UAT, and presenting the project. I researched and recommended development technologies, established the Supabase-hosted PostgreSQL database, and helped initiate the system's AI-assisted implementation. I also developed the Mayor's Office forecasting analytics with AI assistance and worked with the team to review, test, and refine the application.

### How the operational workflow connects

A disaster event created by MSWDO provides context for registration and distribution. Barangay officials register households and issue stubs, then verify eligible claims through stub-number or QR-supported steps. The system records accepted distribution and updates related inventory and history. Separately, the Mayor's Office maintains stock and relief-pack templates, and MSWDO uses recorded information for consolidated monitoring and reporting.

**Visual:** [APPROVED COMPACT MERMAID WORKFLOW]. The Mayor's Office inventory/pack preparation is a parallel supporting activity, not strictly sequential after registration.

**Critical detail:** Online/centrally accepted transaction flows are distinct from offline-queued work. Not all functions are available offline. The first valid centrally accepted claim remains authoritative in duplicate-claim situations.

### Analytics inside DISTYNC

**Descriptive analysis:** A barangay-level operational heat map summarizes recorded operational indicators across Malvar's barangays. It is not a disaster-hazard map and does not show individual home locations.

**Forecasting:** The implemented Python analytics service includes Moving Average, Exponential Smoothing and Trend Projection. Eligible historical records can be backtested using MAE and RMSE to support model recommendations when the comparison is conclusive. Its output is decision support, not a guarantee of demand accuracy under real disaster conditions.

**Visuals:** [APPROVED HEAT-MAP SCREENSHOT]. [NO POPULATED FORECAST MOCKUP]. Optionally link a source-code excerpt or explain one method and evaluation rule.

### Testing and evaluation

The manuscript reports 86/86 functional, 22/22 PWA, 23/23 security and 10/10 reliability test cases passing under the project's test conditions. All 72 UAT cases were accepted by 15 participants. The reported SUS mean was 67.17, just below the benchmark of 68, indicating usability improvements and user familiarization remained important. These are project-study observations from controlled scenarios, not production-service guarantees.

### What I'd improve next

Continue user-centered usability refinement, evaluate the system under real field conditions, strengthen offline sensitive-data protection, and establish tested backup/recovery procedures before wider operational adoption.

### Reflection

DISTYNC helped me see why good systems begin with an understanding of people and processes. I learned to connect technology decisions with actual requirements—and to treat testing, feedback, and limitations as part of development rather than afterthoughts.

**Links (after permission/access checks):** [TEAM REPOSITORY] · [APPROVED NON-SENSITIVE DOCUMENTATION]

## Campus Lost & Found Case Study (`/projects/lost-and-found`)

**Kicker:** Individual full-stack project · Campus application

**Heading:** Campus Lost & Found: From item reports to verified claims

**Intro:** I built a web application for a campus community to report lost or found items, browse listings, and submit claims. It helped me work across a complete user journey, from the frontend to the API and database.

### The problem

Lost items are difficult to reconnect with owners when reports are informal, scattered, or missing key identifying details.

### What I built

A React/TypeScript frontend and an Express/TypeScript backend using MongoDB, with authentication, protected claim workflows, input validation, and an AI-assisted report-review feature powered by Gemini.

### How the application works

A user registers/signs in, browses or reports items, and can submit claims with relevant ownership information. Protected routes and API validations support the workflow. The Gemini-assisted review feature helps refine item-report descriptions.

### Testing, tools and learning

The frontend repository documents Vitest checks, linting, production builds, and GitHub Actions CI. I used Codex as a development assistant and reviewed the project's architecture, behavior, and implementation as the builder and maintainer.

### Architecture

[EXISTING README MERMAID ARCHITECTURE DIAGRAM]

### Reflection

This project strengthened my confidence in turning a personal idea into a deployed application and reinforced the importance of error handling, test coverage, and clear documentation.

**Links:** [FRONTEND REPO] · [BACKEND REPO] · [VERIFIED LIVE DEMO]

## Claims requiring confirmation before public launch

- Exact public contact details and up-to-date CV.
- Team approval for DISTYNC visuals and research excerpts.
- Whether any project awards or leadership metrics will appear verbatim.
- A final click-test of live app and repository links.
- Any role ownership detail stronger than the first-person descriptions above.
