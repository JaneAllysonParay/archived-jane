import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import ProjectGallery from './ProjectGallery';
import CorrespondenceForm from './CorrespondenceForm';
import { formspreeEndpoint, projectGalleryImages, projectLinks, qaStats, site } from './content';
import { tagGroups, workTags, works } from './portfolio';
import type { ArchiveWork, WorkChapter } from './portfolio';

const mainNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Works', to: '/works' },
  { label: 'Tags', to: '/tags' },
  { label: 'Profile', to: '/profile' },
  { label: 'Contact', to: '/contact' },
];

function ScrollAndTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const titleByPath: Record<string, string> = {
      '/': 'Jane’s Archive | Jane Allyson Paray',
      '/works': 'Works | Jane’s Archive',
      '/works/distync': 'DISTYNC | Jane’s Archive',
      '/works/lost-and-found': 'Campus Lost & Found | Jane’s Archive',
      '/profile': 'Profile | Jane’s Archive',
      '/tags': 'Tags | Jane’s Archive',
      '/contact': 'Contact | Jane’s Archive',
    };
    document.title = titleByPath[location.pathname] ?? 'Page not found | Jane’s Archive';

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function ResumeLink({ className = '' }: { className?: string }) {
  if (!site.resumePath) return null;
  return <a className={className} href={site.resumePath} target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>;
}

function NavigationLinks({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Primary navigation" className={className}>
      {mainNavigation.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Jane’s Archive home">
          <span className="brand-name">Jane’s Archive</span>
          <span className="brand-caption">Projects, systems & notes</span>
        </Link>
        <NavigationLinks className="desktop-navigation" />
        <ResumeLink className="resume-link" />
        <details className="mobile-navigation">
          <summary>Browse archive</summary>
          <NavigationLinks className="mobile-navigation-links" />
          <ResumeLink className="mobile-resume-link" />
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-signoff">Thanks for stopping by. Keep asking good questions.</p>
        <nav aria-label="Footer contact links" className="footer-links">
          {site.email && <a href={'mailto:' + site.email}>Email</a>}
          {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {site.github && <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          <ResumeLink />
        </nav>
        <p className="affiliation-note">Independently designed with inspiration from AO3’s archive conventions. Not affiliated with the Organization for Transformative Works.</p>
      </div>
    </footer>
  );
}

type BreadcrumbItem = { label: string; to?: string };

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((item, index) => (
          <li key={item.label}>
            <span aria-hidden="true">/</span>
            {item.to && index < items.length - 1
              ? <Link to={item.to}>{item.label}</Link>
              : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TagList({ tags, label = 'Related tags' }: { tags: string[]; label?: string }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link to={'/works?tag=' + encodeURIComponent(tag)}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}

function ArchiveSection({ title, eyebrow, children, className = '' }: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={'archive-section ' + className}>
      <div className="section-heading">
        <div>
          {eyebrow && <p className="section-kicker">{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Portrait({ className = '' }: { className?: string }) {
  if (!site.portraitPath) return <div className={'portrait-placeholder ' + className} aria-hidden="true">JP</div>;
  return (
    <img
      className={'portrait ' + className}
      src={site.portraitPath}
      width="400"
      height="600"
      alt="Portrait of Jane Allyson Paray"
      decoding="async"
    />
  );
}

function ProfileSidebar() {
  return (
    <aside className="profile-sidebar" aria-label="Creator profile summary">
      <Portrait className="sidebar-portrait" />
      <div className="sidebar-profile-copy">
        <h2>{site.fullName}</h2>
        <p className="profile-role">Information Technology Student · Systems Development</p>
        <p>{site.headline}</p>
        <div className="sidebar-interests">
          <span className="small-label">INTERNSHIP INTERESTS</span>
          <ul>
            <li>Data Analytics</li>
            <li>Business Analysis</li>
            <li>Software Quality Assurance</li>
          </ul>
        </div>
        <nav aria-label="Profile shortcuts" className="profile-shortcuts">
          <Link to="/profile">Profile</Link>
          <Link to="/works">Browse works</Link>
          <ResumeLink />
          <Link to="/contact">Contact Jane</Link>
        </nav>
      </div>
    </aside>
  );
}

function WorkBlurb({ work }: { work: ArchiveWork }) {
  return (
    <article className="work-blurb">
      <header className="work-blurb-header">
        <p className="work-type">{work.projectType}</p>
        <h3><Link to={work.path}>{work.title}</Link></h3>
        <p className="work-attribution">{work.attribution}</p>
      </header>
      <dl className="blurb-metadata">
        <div><dt>Role</dt><dd>{work.role}</dd></div>
        <div><dt>Technologies</dt><dd>{work.technologies.join(' · ')}</dd></div>
      </dl>
      <p className="work-summary">{work.summary}</p>
      <div className="tag-section">
        <span className="small-label">SKILLS & METHODS</span>
        <TagList tags={[...work.areas, ...work.methods.slice(0, 4)]} label={work.title + ' skills and methods'} />
      </div>
      <div className="evidence-line">
        <span className="small-label">EVIDENCE</span>
        <span>{work.evidence.join(' · ')}</span>
      </div>
      <p className="read-work"><Link to={work.path}>Read the work <span aria-hidden="true">→</span></Link></p>
    </article>
  );
}

function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="home-page page-shell">
      <div className="dashboard-grid">
        <ProfileSidebar />
        <div className="dashboard-main">
          <header className="welcome-header">
            <p className="section-kicker">CREATOR DASHBOARD</p>
            <h1>Welcome</h1>
            <p>Hi, I’m Jane! Welcome to my little corner of the web—a growing archive of projects, ideas, and things I’ve learned while exploring technology.</p>
            <p>I’m an Information Technology student specializing in Systems Development. I’m interested in how data, workflows, and technology can help create better systems.</p>
          </header>

          <ArchiveSection title="Recent Works" eyebrow="FROM THE ARCHIVE">
            <div className="work-list">
              {works.map((work) => <WorkBlurb key={work.id} work={work} />)}
            </div>
          </ArchiveSection>

          <ArchiveSection title="Currently Exploring" eyebrow="AREAS OF INTEREST">
            <p className="section-copy">I’m looking for opportunities to learn and contribute in these areas, with systems development and related IT skills supporting that work.</p>
            <TagList tags={['Data Analytics', 'Business Analysis', 'Software Quality Assurance', 'Systems Development', 'Full-Stack Development', 'API Development']} label="Current areas of interest" />
          </ArchiveSection>

          <ArchiveSection title="About This Archive" eyebrow="A NOTE FOR VISITORS">
            <p className="section-copy">This site documents project decisions, workflows, technical approaches, testing practices, and lessons learned. DISTYNC is a team capstone; Campus Lost & Found is an individual academic project.</p>
          </ArchiveSection>

          <ArchiveSection title="Contact & Resume" eyebrow="NEXT STEPS">
            <p className="section-copy">I’m interested in internship opportunities in Data Analytics, Business Analysis, and Software Quality Assurance.</p>
            <p className="section-copy">Have a question or a thought about a project? <Link to="/contact#correspondence-corner">Leave a note in my Correspondence Corner.</Link></p>
            <div className="action-links">
              <Link to="/contact">Contact information</Link>
              {site.resumePath && <ResumeLink />}
              <Link to="/profile">Read my profile</Link>
            </div>
          </ArchiveSection>
        </div>
      </div>
    </main>
  );
}

function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTag = searchParams.get('tag') ?? '';
  const tagOptions = Array.from(new Set(works.flatMap(workTags))).sort((a, b) => a.localeCompare(b));
  const matchedTag = tagOptions.find((tag) => tag.toLocaleLowerCase() === requestedTag.toLocaleLowerCase());
  const activeTag = requestedTag ? matchedTag ?? requestedTag : '';
  const filterValue = activeTag && !matchedTag ? '__no_match__' : activeTag;
  const filteredWorks = activeTag
    ? works.filter((work) => workTags(work).some((tag) => tag.toLocaleLowerCase() === activeTag.toLocaleLowerCase()))
    : works;

  function updateFilter(value: string) {
    if (value) setSearchParams({ tag: value });
    else setSearchParams({});
  }

  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <Breadcrumbs items={[{ label: 'Works' }]} />
      <header className="page-heading">
        <p className="section-kicker">THE PROJECT ARCHIVE</p>
        <h1>Works</h1>
        <p>{filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'} in the archive.</p>
      </header>
      <form className="filter-panel" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="work-filter">Filter by area, technology, or method</label>
        <select id="work-filter" value={filterValue} onChange={(event) => updateFilter(event.target.value)}>
          <option value="">All works</option>
          {activeTag && !matchedTag && <option value="__no_match__">No matching tag: {activeTag}</option>}
          {tagOptions.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        {activeTag && <button className="text-button" type="button" onClick={() => updateFilter('')}>Clear filter</button>}
      </form>
      <p className="filter-result" aria-live="polite">{filteredWorks.length} matching {filteredWorks.length === 1 ? 'work' : 'works'}.</p>
      {filteredWorks.length > 0
        ? <div className="work-list work-list-page">{filteredWorks.map((work) => <WorkBlurb key={work.id} work={work} />)}</div>
        : <div className="empty-state" role="status"><h2>No works match “{activeTag}”.</h2><p>Choose another tag or view the complete archive.</p><button type="button" className="text-button" onClick={() => updateFilter('')}>Show all works</button></div>}
      <p className="archive-back-link"><Link to="/">Return to the dashboard</Link></p>
    </main>
  );
}

function ProfilePage() {
  const skillGroups = [
    { title: 'Analysis and Documentation', skills: ['Requirements and workflow analysis', 'Technical documentation', 'Architecture planning', 'Stakeholder discussions'] },
    { title: 'Data and Databases', skills: ['SQL and relational data', 'PostgreSQL', 'Supabase', 'Descriptive analytics', 'Statistical forecasting methods'] },
    { title: 'Development', skills: ['React', 'TypeScript', 'Vite', 'Node.js and Express', 'Python and FastAPI', 'REST APIs', 'MongoDB Atlas and Mongoose'] },
    { title: 'Testing and Quality Assurance', skills: ['Functional checks and test cases', 'User acceptance testing', 'Application and API validation', 'Vitest exposure'] },
    { title: 'Tools and Supporting Technologies', skills: ['Git and GitHub', 'Gemini API integration', 'Vercel', 'Cisco Packet Tracer', 'Power Apps', 'UiPath', 'Ubuntu and Ubuntu Server', 'Windows Server', 'Smartbooks ERP'] },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="page-shell profile-page">
      <Breadcrumbs items={[{ label: 'Profile' }]} />
      <header className="page-heading">
        <p className="section-kicker">CREATOR PROFILE</p>
        <h1>{site.fullName}</h1>
        <p>Information Technology student · Systems Development</p>
      </header>
      <div className="profile-page-intro">
        <Portrait className="profile-page-portrait" />
        <div>
          <h2>About Me</h2>
          <p>I’m studying for a Bachelor of Science in Information Technology, specializing in Systems Development, at De La Salle Lipa. My expected graduation is June 2027.</p>
          <p>I enjoy understanding a problem, looking for useful patterns in data, and checking that a system works for the people who rely on it.</p>
        </div>
      </div>

      <ArchiveSection title="Areas of Interest" eyebrow="WHAT I’M EXPLORING">
        <p className="section-copy">I’m especially interested in Data Analytics, Business Analysis, and Software Quality Assurance. Systems development, databases, and application work give me supporting experience I can keep building on.</p>
        <TagList tags={['Data Analytics', 'Business Analysis', 'Software Quality Assurance', 'Systems Development']} label="Career interests" />
      </ArchiveSection>

      <ArchiveSection title="Technical Skills" eyebrow="PROJECTS & ACADEMIC EXPERIENCE">
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </section>
          ))}
        </div>
        <p className="small-note">Coursework and lab tools are included as academic exposure, not as claims of professional mastery.</p>
      </ArchiveSection>

      <ArchiveSection title="Leadership and Activities" eyebrow="WORKING WITH PEOPLE">
        <p className="section-copy">I have served in JPCS leadership roles, including executive secretary and executive vice president. These roles and my project collaboration have helped me practice clear communication, reliability, and openness to feedback. I have also worked with teammates, advisers, and stakeholders in academic project settings.</p>
      </ArchiveSection>

      <ArchiveSection title="What I’m Looking For" eyebrow="NEXT CHAPTER">
        <p className="section-copy">I’m interested in internship opportunities where I can contribute to practical work, learn from experienced teams, and continue growing in analytics, business analysis, quality assurance, and systems-related work.</p>
        <p className="action-links"><Link to="/contact">Contact me about an opportunity</Link><Link to="/works">Browse project work</Link></p>
      </ArchiveSection>
    </main>
  );
}

function TagsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell tags-page">
      <Breadcrumbs items={[{ label: 'Tags' }]} />
      <header className="page-heading">
        <p className="section-kicker">SKILLS & TOPICS</p>
        <h1>Tags</h1>
        <p>Browse skills and methods represented in the project archive. Each tag leads to matching work.</p>
      </header>
      <div className="tag-index">
        {tagGroups.map((group) => (
          <ArchiveSection title={group.title} key={group.title}>
            <TagList tags={group.tags} label={group.title} />
          </ArchiveSection>
        ))}
      </div>
      <p className="small-note">Tags describe project experience or areas of interest; they aren’t popularity counts or proficiency rankings.</p>
    </main>
  );
}

function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell contact-page">
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <header className="page-heading">
        <p className="section-kicker">SAY HELLO</p>
        <h1>Contact</h1>
        <p>I’m open to internship conversations in Data Analytics, Business Analysis, and Software Quality Assurance.</p>
      </header>
      <section id="correspondence-corner" className="archive-section correspondence-section" aria-labelledby="leave-note-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">CORRESPONDENCE CORNER</p>
            <h2 id="leave-note-title">Leave a Note</h2>
          </div>
        </div>
        {formspreeEndpoint
          ? <CorrespondenceForm endpoint={formspreeEndpoint} />
          : <p className="form-not-configured">The note form is not set up yet. Please use one of the verified contact options below to get in touch.</p>}
      </section>
      <section className="contact-details" aria-labelledby="contact-details-title">
        <h2 id="contact-details-title">Professional links</h2>
        <dl>
          {site.email && <div><dt>Email</dt><dd><a href={'mailto:' + site.email}>{site.email}</a></dd></div>}
          {site.linkedin && <div><dt>LinkedIn</dt><dd><a href={site.linkedin} target="_blank" rel="noopener noreferrer">Jane Allyson Paray on LinkedIn <span aria-hidden="true">↗</span></a></dd></div>}
          {site.github && <div><dt>GitHub</dt><dd><a href={site.github} target="_blank" rel="noopener noreferrer">Jane Allyson Paray on GitHub <span aria-hidden="true">↗</span></a></dd></div>}
          {site.resumePath && <div><dt>Resume</dt><dd><ResumeLink className="inline-link" /></dd></div>}
        </dl>
      </section>
      <p className="contact-note">Email is shown in full so it can be copied even when a mail handler is unavailable.</p>
      <p className="archive-back-link"><Link to="/">Return to the dashboard</Link></p>
    </main>
  );
}

function WorkMetadata({ work }: { work: ArchiveWork }) {
  const entries = [
    { label: 'Project Type', value: work.projectType },
    { label: 'Creator / Contributors', value: work.attribution },
    { label: 'My Role', value: work.role },
    { label: 'Technologies', value: work.technologies.join(' · ') },
    { label: 'Skills Demonstrated', value: work.areas.join(' · ') },
    { label: 'Academic Context', value: work.academicContext },
    { label: 'Evidence Available', value: work.evidence.join(' · ') },
  ];

  return (
    <dl className="work-metadata">
      {entries.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}
    </dl>
  );
}

function ChapterIndex({ chapters }: { chapters: WorkChapter[] }) {
  return (
    <nav className="chapter-index" aria-label="Chapters in this work">
      <h2>In this work</h2>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}><a href={'#' + chapter.id}><span>Chapter {String(index + 1).padStart(2, '0')}</span>{chapter.title}</a></li>
        ))}
      </ol>
    </nav>
  );
}

function Chapter({ id, number, title, children }: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="chapter" id={id} aria-labelledby={id + '-title'}>
      <p className="section-kicker">CHAPTER {String(number).padStart(2, '0')}</p>
      <h2 id={id + '-title'}>{title}</h2>
      {children}
    </section>
  );
}

function WorkDetailLayout({ work, children }: { work: ArchiveWork; children: ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell work-detail-page">
      <Breadcrumbs items={[{ label: 'Works', to: '/works' }, { label: work.title }]} />
      <header className="work-detail-heading">
        <p className="section-kicker">{work.projectType.toUpperCase()}</p>
        <h1>{work.title}</h1>
        <p className="work-attribution">{work.attribution}</p>
        <p className="work-summary">{work.summary}</p>
        <TagList tags={work.areas} label={work.title + ' focus areas'} />
      </header>
      <WorkMetadata work={work} />
      <section className="creator-notes" aria-labelledby="creator-notes-title">
        <p className="section-kicker">A PERSONAL NOTE</p>
        <h2 id="creator-notes-title">Creator’s Notes</h2>
        <p>{work.creatorNotes}</p>
      </section>
      <ChapterIndex chapters={work.chapters} />
      <article className="reading-column">{children}</article>
      <nav className="work-end-navigation" aria-label="Continue browsing">
        <Link to="/works">← Back to all works</Link>
        <Link to="/profile">About the creator</Link>
      </nav>
    </main>
  );
}

function DiagramViewer({ title, src, alt, hintId, minWidth = 900 }: {
  title: string;
  src: string;
  alt: string;
  hintId: string;
  minWidth?: number;
}) {
  return (
    <figure className="diagram-card">
      <figcaption className="diagram-card-heading">
        <strong>{title}</strong>
        <a href={src} target="_blank" rel="noopener noreferrer">Open full-size diagram <span aria-hidden="true">↗</span></a>
      </figcaption>
      <p className="diagram-scroll-hint" id={hintId}>On a narrow screen, scroll horizontally to read the full diagram.</p>
      <div className="diagram-viewport" role="region" aria-label={'Scrollable ' + title.toLowerCase()} aria-describedby={hintId} tabIndex={0}>
        <img src={src} alt={alt} loading="lazy" decoding="async" style={{ minWidth }} />
      </div>
    </figure>
  );
}

function DistyncPage() {
  const work = works.find((item) => item.id === 'distync')!;
  const heatmapImages = projectGalleryImages.distync.length > 0
    ? projectGalleryImages.distync
    : site.distyncHeatmapPath
      ? [{
          src: site.distyncHeatmapPath,
          alt: 'DISTYNC barangay operational heat map showing aggregated operational indicators.',
          caption: 'Operational heat map. The view summarizes barangay-level records; it is not a hazard map and does not show individual household locations.',
        }]
      : [];

  return (
    <WorkDetailLayout work={work}>
      <Chapter id="context" number={1} title="The Context">
        <p>Disaster-relief coordination involves municipal offices and barangays working from shared information. In the project context, paper forms, spreadsheets, and separate records made household and evacuee monitoring, relief distribution, and inventory records harder to consolidate.</p>
        <p>DISTYNC was designed and developed by our academic capstone team for selected local-government workflows. It is a role-based Progressive Web App intended to connect registration, relief distribution, inventory, monitoring, reporting, and analytics. It was evaluated in controlled scenarios; it was not an individually built production platform or a live government deployment.</p>
        <h3>People and offices in the workflow</h3>
        <ul>
          <li><strong>MSWDO:</strong> creates disaster-event context and monitors consolidated records and reports.</li>
          <li><strong>Barangay users:</strong> register households and evacuees, then verify relief claims.</li>
          <li><strong>Mayor’s Office:</strong> maintains inventory and relief-pack information in a parallel workflow.</li>
          <li><strong>Donors and NGOs:</strong> can view relevant public donation information as read-only users.</li>
        </ul>
      </Chapter>

      <Chapter id="contributions" number={2} title="My Contributions">
        <p>DISTYNC was a team capstone. These are the areas I contributed to, distinct from the work completed by the whole team.</p>
        <ul className="contribution-list">
          <li><strong>Requirements and workflow analysis:</strong> participated in requirements refinement, data-dictionary work, architecture planning, technical documentation, and stakeholder discussions.</li>
          <li><strong>Technology research and setup:</strong> researched technology choices and established the Supabase-hosted PostgreSQL database.</li>
          <li><strong>AI-assisted development:</strong> helped initiate AI-assisted system development and reviewed implementation with the team.</li>
          <li><strong>Forecasting analytics:</strong> developed the Mayor’s Office forecasting analytics with AI assistance.</li>
          <li><strong>Testing and communication:</strong> helped with manual and automated testing, user acceptance testing, stakeholder demonstrations, results interpretation, and presentations.</li>
        </ul>
      </Chapter>

      <Chapter id="workflow" number={3} title="How the System Works">
        <p>The operational flow begins when MSWDO creates a disaster event. Barangay users register households and evacuees; the system supports stub and QR information for relief claims. Barangay staff verify the claim and record accepted distribution. MSWDO uses the consolidated records for monitoring and reporting.</p>
        <p>The Mayor’s Office maintains stock and relief-pack information in a separate, parallel workflow. This work supports distribution; it does not occur only after household registration.</p>
        <p>Selected transactions can be prepared offline. An offline transaction is queued and is not centrally accepted until it synchronizes while the app is active and passes server-side validation.</p>
        <DiagramViewer
          title="DISTYNC operational workflow"
          src="/diagrams/distync-flow.svg"
          alt="MSWDO creates a disaster event, followed by Barangay household registration, stub and QR assignment, claim verification, and distribution recording. MSWDO monitors consolidated records. The Mayor’s Office maintains stock and relief packs in a parallel workflow that supports claims."
          hintId="workflow-diagram-hint"
          minWidth={980}
        />
      </Chapter>

      <Chapter id="analytics" number={4} title="Turning Data Into Insight">
        <p>The operational heat map summarizes barangay-level indicators from recorded operations. It is descriptive, not a hazard map, and does not display household locations.</p>
        {heatmapImages.length > 0
          ? <ProjectGallery label="DISTYNC operational heat-map evidence" images={heatmapImages} />
          : null}
        <h3>Inventory-demand forecasting</h3>
        <p>The analytics service implements Moving Average, Exponential Smoothing, and Trend Projection. Where the available history is sufficient, rolling-origin historical evaluation compares forecast errors with MAE and RMSE. A recommended model is surfaced only when the evaluation supports a meaningful choice; insufficient history or inconclusive comparisons limit what can be recommended.</p>
        <p>These methods provide decision support for planning. Historical evaluation does not guarantee accuracy in a real disaster, where demand and operating conditions can change.</p>
      </Chapter>

      <Chapter id="testing" number={5} title="Testing and Evaluation">
        <p>The capstone reports these results from controlled testing and evaluation scenarios. They describe the project’s study conditions and do not establish production security, reliability, or readiness for real disaster response.</p>
        <dl className="evaluation-grid">
          {qaStats.map((stat) => (
            <div className="evaluation-item" key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
          ))}
        </dl>
        <p>The study records <strong>72 of 72 accepted UAT cases</strong> across <strong>15 participants</strong>. Its mean System Usability Scale (SUS) score was <strong>67.17</strong>, slightly below the commonly used benchmark of <strong>68</strong>. The result points to room for usability refinement and user familiarization.</p>
        <h3>What the evaluation does—and doesn’t—say</h3>
        <ul>
          <li>Functional checks, security-related cases, and reliability checks were conducted in defined scenarios.</li>
          <li>User acceptance results reflect the study’s participants and evaluation setup.</li>
          <li>Passing the documented test cases does not guarantee security or production readiness.</li>
          <li>Offline support applies to prepared workflows; queued work needs successful synchronization and server validation.</li>
          <li>Before broader use, the project would need stronger protection for sensitive offline data and tested backup and recovery procedures.</li>
        </ul>
      </Chapter>

      <Chapter id="reflection" number={6} title="Creator’s Notes">
        <p>Working on DISTYNC helped me connect requirements, system design, data, testing, and team collaboration. I learned to ask how each workflow supports the people involved, and to treat validation and feedback as part of building—not a final checkbox.</p>
      </Chapter>
    </WorkDetailLayout>
  );
}

function LostAndFoundPage() {
  const work = works.find((item) => item.id === 'lostAndFound')!;

  return (
    <WorkDetailLayout work={work}>
      <Chapter id="idea" number={1} title="The Idea">
        <p>Campus lost-and-found information can be spread across informal reports or incomplete records. I built this project around a straightforward goal: give people a place to report an item, browse existing listings, and submit an ownership claim.</p>
      </Chapter>

      <Chapter id="building" number={2} title="Building the Application">
        <p>This is an individual academic project. I built the frontend and backend, connected the routes and REST API to MongoDB, and worked on authentication, claim workflows, form validation, and Gemini-assisted report review.</p>
        <p>I used Codex as a development assistant and remained responsible for reviewing and understanding the implementation.</p>
      </Chapter>

      <Chapter id="journey" number={3} title="How It Works">
        <ol className="journey-list">
          <li><strong>Report:</strong> submit details about a lost or found item through a validated form.</li>
          <li><strong>Browse:</strong> review existing lost-and-found reports.</li>
          <li><strong>Claim:</strong> submit information to support an ownership request.</li>
        </ol>
        <p>Authentication and protected API requests support the parts of the application that require an account.</p>
      </Chapter>

      <Chapter id="architecture" number={4} title="Behind the Scenes">
        <p>The frontend uses React, TypeScript, and Vite. It communicates with an Express and TypeScript REST API using authenticated JWT-bearing requests. The API works with MongoDB Atlas through Mongoose and integrates the Gemini API for report-review assistance.</p>
        <p>The project diagram shows the frontend and Express API deployed on Vercel, with MongoDB Atlas and Gemini as external services.</p>
        <DiagramViewer
          title="Campus Lost & Found application architecture"
          src="/diagrams/lost-found-architecture.svg"
          alt="The browser uses a React and Vite frontend hosted on Vercel. The frontend sends authenticated requests to an Express API hosted on Vercel. The API connects to MongoDB Atlas through Mongoose and to the Gemini API."
          hintId="architecture-diagram-hint"
          minWidth={660}
        />
      </Chapter>

      <Chapter id="iteration" number={5} title="Testing and Iteration">
        <p>The frontend repository documents Vitest tests, linting, a TypeScript production build, and a GitHub Actions continuous-integration workflow. Those artifacts describe the frontend checks; I’m not presenting a test-coverage percentage or results that the project materials don’t support.</p>
        <p>Building and reviewing the application also gave me practice checking forms, route behavior, API communication, and the report-to-claim user flow.</p>
      </Chapter>

      <Chapter id="reflection" number={6} title="Creator’s Notes">
        <p>Building a full-stack project made the connections between the interface, API contracts, data modeling, and user experience much clearer to me. It also reinforced the value of testing the complete journey and documenting how the parts fit together.</p>
      </Chapter>

      <ArchiveSection title="Project source" eyebrow="VERIFIED LINKS">
        <ul className="source-links">
          <li><a href={projectLinks.lostFrontend} target="_blank" rel="noopener noreferrer">Frontend repository <span aria-hidden="true">↗</span></a></li>
          <li><a href={projectLinks.lostBackend} target="_blank" rel="noopener noreferrer">Backend repository <span aria-hidden="true">↗</span></a></li>
        </ul>
      </ArchiveSection>
    </WorkDetailLayout>
  );
}

function NotFoundPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell not-found-page">
      <Breadcrumbs items={[{ label: 'Not found' }]} />
      <p className="section-kicker">404 · PAGE NOT FOUND</p>
      <h1>This page isn’t in the archive.</h1>
      <p>The address may have changed, but the project archive is still here.</p>
      <p className="action-links"><Link to="/">Return home</Link><Link to="/works">Browse works</Link></p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollAndTitleManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/distync" element={<DistyncPage />} />
        <Route path="/works/lost-and-found" element={<LostAndFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects/distync" element={<Navigate to="/works/distync" replace />} />
        <Route path="/projects/lost-and-found" element={<Navigate to="/works/lost-and-found" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
