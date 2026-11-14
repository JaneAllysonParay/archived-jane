import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { projectGalleryImages, projectLinks, qaStats, site } from './content';
import ProjectGallery from './ProjectGallery';

type IconName = 'arrow' | 'upRight' | 'spark' | 'grid' | 'check' | 'layers' | 'database' | 'chart' | 'code' | 'heart' | 'github' | 'external' | 'shield' | 'mail' | 'menu' | 'back';
const icons: Record<IconName, ReactNode> = {
  arrow: <><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
  upRight: <><path d="M7 17 17 7M7 7h10v10"/></>,
  spark: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></>,
  chart: <><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-8"/></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></>,
  github: <><path d="M9 19c-4 1-4-2-6-2m12 4v-3.1a3.1 3.1 0 0 0-.8-2.4c2.7-.3 5.5-1.3 5.5-6A4.8 4.8 0 0 0 18.4 6 4.4 4.4 0 0 0 18.3 3S17 2.7 15 4.4a11 11 0 0 0-6 0C7 2.7 5.7 3 5.7 3a4.4 4.4 0 0 0-.1 3A4.8 4.8 0 0 0 4.3 9.5c0 4.7 2.8 5.7 5.5 6A3.1 3.1 0 0 0 9 18v3"/></>,
  external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v6H4V4h6"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  back: <><path d="m12 19-7-7 7-7M5 12h15"/></>,
};
function Icon({ name, size = 20, className = '' }: {name: IconName; size?: number; className?: string}) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}
function ScrollManager() {
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash) {
      const id = decodeURIComponent(loc.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
    } else {window.scrollTo({top:0,behavior:'auto'});}
    document.title = loc.pathname === '/' ? 'Jane Allyson Paray · Portfolio' : loc.pathname.includes('distync') ? 'DISTYNC · Jane Allyson Paray' : loc.pathname.includes('lost-and-found') ? 'Campus Lost & Found · Jane Allyson Paray' : 'Page not found · Jane Allyson Paray';
  }, [loc.pathname, loc.hash]);
  return null;
}
function Header() {
  return <header className="site-header"><div className="container nav-wrap">
    <Link className="brand" to="/" aria-label="Jane Allyson Paray, homepage"><span className="brand-mark">j<span className="brand-star">✳</span></span><span>jane<span className="brand-dot">.</span></span></Link>
    <nav aria-label="Primary navigation" className="top-nav"><NavLink to="/#work">Work</NavLink><NavLink to="/#about">About</NavLink><NavLink to="/#contact">Contact</NavLink></nav>
    <div className="nav-actions">{site.resumePath ? <a className="btn btn-quiet nav-resume" href={site.resumePath} target="_blank" rel="noopener noreferrer">Resume <Icon name="upRight" size={15}/></a> : <Link className="btn btn-quiet nav-resume" to="/#work">Explore work <Icon name="upRight" size={15}/></Link>}</div>
  </div></header>;
}
function Footer() {return <footer className="site-footer"><div className="container footer-inner"><span>Made thoughtfully, one iteration at a time <span aria-hidden="true">✳</span></span><span>© {new Date().getFullYear()} Jane Allyson Paray</span><a href="#top">Back to top ↑</a></div></footer>}
function Pill({children, tone='plain'}: {children: ReactNode; tone?: string}) {return <span className={`pill pill-${tone}`}>{children}</span>}
function ButtonLink({to, children, secondary=false, external=false}: {to:string;children:ReactNode;secondary?:boolean;external?:boolean}) {
  const cls=`btn ${secondary?'btn-outline':'btn-primary'}`;
  return external ? <a className={cls} href={to} target="_blank" rel="noopener noreferrer">{children}<Icon name="upRight" size={17}/></a> : <Link className={cls} to={to}>{children}<Icon name="arrow" size={17}/></Link>;
}
function Kicker({children}: {children: ReactNode}) {return <span className="eyebrow"><span className="eyebrow-dash"/>{children}</span>}
function SectionTitle({number, eyebrow, title, intro}: {number:string; eyebrow:string;title:string;intro?:string}) {return <div className="section-top"><div><Kicker>{number} / {eyebrow}</Kicker><h2>{title}</h2>{intro&&<p className="section-intro">{intro}</p>}</div></div>}
function Avatar(){return site.portraitPath ? <img className="avatar-img" src={site.portraitPath} alt="Portrait of Jane Allyson Paray"/> : <div className="avatar-placeholder" role="img" aria-label="Portrait coming soon"><span>j.</span><i>✦</i></div>}
function ProjectPreview({which}: {which:'distync'|'lost'}){
 if(which==='distync') return <div className="preview preview-distync" role="img" aria-label="Conceptual diagram of how DISTYNC brings together registration, relief distribution, inventory and analytics; not an application screenshot"><div className="preview-grain"/><div className="preview-label">DISTYNC / SYSTEM OVERVIEW</div><div className="preview-flow"><span>Registration</span><b>→</b><span>Distribution</span><b>→</b><span>Monitoring</span></div><div className="preview-graphic"><div className="mini-orbit orbit-a"/><div className="mini-orbit orbit-b"/><div className="preview-core"><Icon name="layers" size={29}/></div></div><div className="preview-note">Connecting relief operations across offices</div></div>;
 return <div className="preview preview-lost" role="img" aria-label="Conceptual illustration of the lost-and-found report, browse, and claim journey; not a screenshot"><div className="preview-label">CAMPUS LOST & FOUND / USER JOURNEY</div><div className="lf-panel"><div className="lf-panel-icon"><Icon name="grid" size={21}/></div><span>Report an item</span><span className="lf-trailing">01</span></div><div className="lf-panel"><div className="lf-panel-icon"><Icon name="chart" size={21}/></div><span>Browse listings</span><span className="lf-trailing">02</span></div><div className="lf-panel"><div className="lf-panel-icon"><Icon name="check" size={21}/></div><span>Submit a claim</span><span className="lf-trailing">03</span></div><div className="preview-note">A thoughtful flow to reunite people and belongings</div></div>;
}
function ProjectCard({which}: {which:'distync'|'lost'}){const isD=which==='distync';return <article className={`project-card ${isD?'project-primary':''}`}><Link className="project-card-link" to={isD?'/projects/distync':'/projects/lost-and-found'} aria-label={`Read ${isD?'DISTYNC':'Campus Lost & Found'} case study`}><ProjectPreview which={which}/><div className="project-body"><div className="project-meta"><span>{isD?'01 / TEAM CAPSTONE':'02 / INDIVIDUAL PROJECT'}</span><Icon name="upRight" size={19}/></div><h3>{isD?'DISTYNC':'Campus Lost & Found'}</h3><p>{isD?'Bringing disaster-relief records, distribution workflows, inventory, and analytics into one connected system.':'A full-stack application helping campus communities report, find, and claim belongings—with AI-assisted report review.'}</p><div className="tag-row">{(isD?['Analytics','Business Analysis','Software QA']:['Full-stack','API Integration','Testing']).map(tag=><span className="tag" key={tag}>{tag}</span>)}</div></div></Link></article>}
function DataSpotlight(){return <section className="spotlight-section" id="analytics"><div className="container spotlight-grid"><div className="spotlight-copy"><Kicker>03 / A CLOSER LOOK</Kicker><h2>Making operational data <em>more useful.</em></h2><p>In DISTYNC, our team explored how everyday records could support better relief planning. The work brings together barangay-level descriptive analytics and inventory forecasting with historical model evaluation.</p><div className="spotlight-bullets"><span><Icon name="check" size={16}/>Barangay-level operational heat map</span><span><Icon name="check" size={16}/>Moving Average, Exponential Smoothing & Trend Projection</span><span><Icon name="check" size={16}/>Model evaluation using MAE and RMSE</span></div><Link className="text-link" to="/projects/distync#analytics">Explore the analytics work <Icon name="arrow" size={16}/></Link></div><div className="data-panel"><div className="data-panel-top"><span className="data-panel-chip">DATA → DECISIONS</span><Icon name="chart" size={22}/></div>{site.distyncHeatmapPath?<img src={site.distyncHeatmapPath} alt="DISTYNC barangay operational heat map, displaying aggregated household metrics" loading="lazy"/>:<div className="data-placeholder"><div className="data-sequence"><span><Icon name="database" size={20}/> Records</span><Icon name="arrow" size={16}/><span><Icon name="grid" size={20}/> Aggregation</span><Icon name="arrow" size={16}/><span><Icon name="chart" size={20}/> Insight</span></div><div className="data-place-note">Real heat-map screenshot to be added after final asset review</div></div>}<p className="data-footnote">Data visualization is a tool for understanding operations—not a substitute for field validation.</p></div></div></section>}
const capabilities=[
 {title:'Data & insight',kind:'data',icon:'chart' as IconName,body:'SQL, relational databases, descriptive analytics, forecasting concepts, reporting and interpretation.'},
 {title:'Business & systems',kind:'systems',icon:'layers' as IconName,body:'Requirements gathering, workflow analysis, functional requirements, documentation and stakeholder collaboration.'},
 {title:'Quality & development',kind:'quality',icon:'shield' as IconName,body:'Functional tests, UAT, defect review, React, TypeScript, Express and API integration.'},
 {title:'Always exploring',kind:'explore',icon:'spark' as IconName,body:'Coursework and hands-on exploration in networking, UiPath, Power Apps, Linux, Windows Server and cloud.'}
];
function Home(){return <>
  <main id="top" tabIndex={-1}><section className="hero container"><div className="hero-copy"><Kicker>HELLO, I'M JANE <span aria-hidden="true">✦</span></Kicker><h1>Curious about <span className="highlight-blue">data.</span><br/>Passionate about <span className="highlight-purple">better systems.</span></h1><p>I'm Jane Allyson Paray, an Information Technology student specializing in Systems Development. I love exploring how data, people, and technology connect—from understanding a workflow to building and testing solutions that make sense.</p><div className="hero-actions"><ButtonLink to="/#work">Explore my work</ButtonLink><ButtonLink to="/projects/distync" secondary>Featured case study</ButtonLink></div><div className="hero-id"><Avatar/><div><span className="hero-id-title">Jane Allyson Paray</span><span className="hero-id-sub">Aspiring IT professional</span></div><span className="id-spark" aria-hidden="true">✳</span></div></div><div className="hero-aside" role="group" aria-label="Jane's approach"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-orbit orbit-three"/><div className="aside-content"><span className="aside-overline">A LITTLE BIT ABOUT MY APPROACH</span><span className="aside-big">Observe.<br/><i>Understand.</i><br/>Improve.</span><div className="aside-rule"/><div className="aside-bottom"><span>Curiosity meets<br/>thoughtful execution.</span><div className="aside-icon"><Icon name="spark" size={28}/></div></div></div></div></section>
  <section className="section container work-section" id="work"><SectionTitle number="01" eyebrow="SELECTED WORK" title="A few things I've worked on." intro="Two projects, different challenges—and lots of learning along the way."/><div className="project-grid"><ProjectCard which="distync"/><ProjectCard which="lost"/></div></section>
  <DataSpotlight/>
  <section className="section container skills-section"><SectionTitle number="04" eyebrow="WHAT I BRING" title="How I like to solve problems." intro="A mix of analysis, building, testing, and curiosity about how things work behind the scenes."/><div className="capabilities-grid">{capabilities.map(c=><div className={`capability cap-${c.kind}`} key={c.title}><div className="cap-icon"><Icon name={c.icon} size={23}/></div><h3>{c.title}</h3><p>{c.body}</p></div>)}</div></section>
  <section className="section container about-section" id="about"><div className="about-panel"><div><Kicker>05 / BEYOND THE SCREEN</Kicker><h2>A little more<br/><em>about me.</em></h2></div><div className="about-content"><p>I'm studying BS Information Technology, specializing in Systems Development, at De La Salle Lipa (expected June 2027). I'm especially interested in opportunities where I can work with data, understand user needs, and help deliver dependable software.</p><p>Working with project teammates, advisers, and stakeholders has taught me that listening, clear communication, and being open to feedback matter just as much as technical skills.</p><div className="about-cards"><span><strong>Beyond coursework</strong>JPCS student leadership & collaboration</span><span><strong>What motivates me</strong>Learning, thoughtful problem-solving & useful technology</span></div></div></div></section>
  <Contact/>
</main></>}
function Contact(){return <section className="contact-section" id="contact"><div className="container contact-panel"><div><Kicker>LET'S CONNECT <span aria-hidden="true">✳</span></Kicker><h2>Have a project, problem,<br/>or opportunity in mind?</h2><p>I'm seeking internship opportunities in Data Analytics, Business Analysis, and Software QA, where I can contribute, learn from experienced teams, and grow through practical work.</p></div><div className="contact-actions"><a className="btn btn-light" href={site.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18}/> Find me on GitHub <Icon name="upRight" size={15}/></a>{site.email&&<a className="btn btn-ghost-light" href={`mailto:${site.email}`}><Icon name="mail" size={17}/> Email me</a>}{site.linkedin&&<a className="btn btn-ghost-light" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="upRight" size={15}/></a>}</div><span className="contact-deco" aria-hidden="true">✳</span></div></section>}
function Breadcrumb({project}: {project:string}) {return <div className="breadcrumb"><Link to="/#work"><Icon name="back" size={15}/> Back to work</Link><span>/</span><span>{project}</span></div>}
function StudyHeader({kicker,title,intro,tags,theme}: {kicker:string;title:string;intro:string;tags:string[];theme:string}) {return <div className={`study-hero study-${theme}`}><Kicker>{kicker}</Kicker><h1>{title}</h1><p>{intro}</p><div className="tag-row">{tags.map(t=><span className="tag" key={t}>{t}</span>)}</div></div>}
function StudySection({id,kicker,title,children}: {id?:string;kicker:string;title:string;children:ReactNode}) {return <section className="study-section" id={id}><Kicker>{kicker}</Kicker><h2>{title}</h2>{children}</section>}
type StudyAnchor = { id: string; label: string };

function StudySidebar({ sections, children }: { sections: StudyAnchor[]; children: ReactNode }) {
  return <aside className="study-sidebar">
    <nav className="sidebar-card sidebar-toc" aria-label="On this page">
      <span className="small-label">ON THIS PAGE</span>
      <ul>{sections.map(section => <li key={section.id}><a href={'#' + section.id}>{section.label}</a></li>)}</ul>
    </nav>
    <details className="sidebar-card sidebar-details">
      <summary>Project details</summary>
      <div className="sidebar-details-content">{children}</div>
    </details>
  </aside>;
}

function Distync() {
  const distyncImages = projectGalleryImages.distync.length > 0
    ? projectGalleryImages.distync
    : site.distyncHeatmapPath
      ? [{ src: site.distyncHeatmapPath, alt: 'DISTYNC operational heat map' }]
      : [];
  const anchors: StudyAnchor[] = [
    { id: 'challenge', label: 'The challenge' },
    { id: 'contribution', label: 'My contribution' },
    { id: 'workflow', label: 'Operational workflow' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'testing', label: 'Testing & evaluation' },
    { id: 'improvements', label: 'What I would improve' },
  ];

  return <main id="top" tabIndex={-1} className="container study-layout">
    <Breadcrumb project="DISTYNC"/>
    <StudyHeader kicker="01 / TEAM CAPSTONE" title="DISTYNC: Connecting people, records, and relief operations." intro="A multi-office disaster relief management system designed to make fragmented data and workflows easier to monitor—while respecting established LGU procedures." theme="blue" tags={['Data analytics','Business analysis','Quality assurance','Systems development']}/>
    <div className="study-overview">
      <div><span className="small-label">PROJECT TYPE</span><strong>Team capstone</strong></div>
      <div><span className="small-label">FOCUS</span><strong>LGU disaster relief workflows</strong></div>
      <div><span className="small-label">STACK</span><strong>React · Express · PostgreSQL · Python</strong></div>
    </div>
    <div className="study-grid">
      <article className="study-body">
        <StudySection id="challenge" kicker="01 / CONTEXT" title="The challenge">
          <p>Disaster-relief operations involve coordinated work across barangays, the Municipal Social Welfare and Development Office (MSWDO), and the Office of the Mayor. In the project context, paper forms, spreadsheets, and separate records made household monitoring, distribution tracking, and inventory reconciliation harder to consolidate.</p>
          <p>Our team developed DISTYNC, a centralized role-based Progressive Web Application (PWA) that connects those workflows with reporting, descriptive analytics, and selected offline support.</p>
          <div className="support-overview">
            <span className="small-label">WHO IT SUPPORTS</span>
            <ul>
              <li>Barangay officials — registration and relief distribution</li>
              <li>MSWDO — monitoring, analytics and reports</li>
              <li>Mayor's Office — inventory and forecasting</li>
              <li>Donors / NGOs — public read-only donation information</li>
            </ul>
          </div>
        </StudySection>
        <StudySection id="contribution" kicker="02 / MY PART IN THE TEAM" title="Where I contributed">
          <div className="contribution-list">
            <div><span>01</span><p><strong>Requirements & systems thinking.</strong> Participated in requirements refinement, data dictionary work, architecture planning, technical documentation, and stakeholder discussions.</p></div>
            <div><span>02</span><p><strong>Technology & implementation.</strong> Researched technology choices, established the PostgreSQL database hosted by Supabase, helped start AI-assisted development, and worked on the Mayor's forecasting feature using AI assistance.</p></div>
            <div><span>03</span><p><strong>Validation & communication.</strong> Helped prepare and execute testing, assisted with stakeholder demonstrations and UAT, reviewed findings, and contributed to final presentations.</p></div>
          </div>
        </StudySection>
        <StudySection id="workflow" kicker="03 / BUSINESS ANALYSIS" title="How the operations connect">
          <p>The MSWDO creates the disaster-event context, barangay officials register households and verify relief claims, and DISTYNC records accepted distributions and their inventory effects. Separately, the Mayor's Office maintains stock and relief-pack templates. Recorded and successfully synchronized information supports municipality-wide monitoring.</p>
          <div className="workflow-card">
            <div className="workflow-card-top"><strong>High-level operational workflow</strong><a href="/diagrams/distync-flow.svg" target="_blank" rel="noopener noreferrer" className="diagram-open">Open full diagram <Icon name="upRight" size={13}/></a></div>
            <p className="diagram-scroll-cue diagram-scroll-cue--workflow" id="workflow-scroll-cue">Scroll horizontally to view the full diagram <span aria-hidden="true">↔</span></p>
            <div className="workflow-image-viewport diagram-viewport--workflow" role="region" aria-label="Scrollable high-level operational workflow diagram" aria-describedby="workflow-scroll-cue" tabIndex={0}>
              <img className="diagram-image diagram-image--workflow" src="/diagrams/distync-flow.svg" alt="High-level workflow: MSWDO creates disaster event, Barangay registers evacuees, system assigns stub and QR, Barangay verifies claims, system records distribution and inventory, then MSWDO monitors and reports. Mayor's Office stock and relief packs feed the claim workflow in parallel." loading="lazy"/>
            </div>
            <p>Based on the capstone's documented use cases. Prepared offline work is queued and is centrally accepted only after successful synchronization.</p>
          </div>
        </StudySection>
        <StudySection id="analytics" kicker="04 / DATA ANALYTICS" title="Turning records into insight">
          <p><strong>Descriptive analytics:</strong> The project includes a barangay-level operational heat map showing aggregated disaster-operation indicators—not individual household locations or hazard predictions.</p>
          <p><strong>Forecasting:</strong> The Python analytics service implements Moving Average, Exponential Smoothing and Trend Projection. Where suitable history exists, rolling-origin model evaluation compares errors using MAE and RMSE. A unique recommended model is shown only when the evaluation supports one; this is decision support, not a guarantee of real-world accuracy.</p>
          <div className="analytics-method"><span>Historical usage</span><Icon name="arrow" size={17}/><span>Compare models</span><Icon name="arrow" size={17}/><span>Evaluate errors</span><Icon name="arrow" size={17}/><span>Support planning</span></div>
          <div className={'asset-panel' + (distyncImages.length > 0 ? ' asset-panel-with-gallery' : '')}>
            {distyncImages.length > 0
              ? <ProjectGallery label="DISTYNC approved project images" images={distyncImages}/>
              : <><Icon name="chart" size={24}/><strong>Operational heat map</strong><span>Approved screenshot will be placed here when assets are finalized.</span></>}
          </div>
        </StudySection>
        <StudySection id="testing" kicker="05 / QUALITY ASSURANCE" title="Tested, evaluated, and improved">
          <p>Testing and stakeholder evaluation formed an important part of the project. The results below are those reported by our capstone study under controlled disaster-response scenarios—not production-service guarantees.</p>
          <div className="qa-grid">{qaStats.map(s=><div className="qa-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>
          <p>Across <strong>15 participants</strong>, the manuscript reports 72 accepted UAT cases. Its System Usability Scale result was <strong>67.17</strong>, just below the chosen benchmark of 68—an honest reminder that user familiarization and interface refinement remain important.</p>
          <div className="insight-note"><Icon name="shield" size={20}/><span>Passing the defined test cases does not mean the system is fully secure, universally reliable, or field-deployed for live disaster operations.</span></div>
        </StudySection>
        <StudySection id="improvements" kicker="06 / REFLECTION" title="What I would improve next">
          <p>Before wider adoption, DISTYNC needs continued usability refinement, real-world field validation, stronger protection for sensitive locally stored data, and tested backup and recovery practices. Building it helped me connect technical choices with actual user needs—and taught me to see testing and feedback as essential parts of development.</p>
        </StudySection>
      </article>
      <StudySidebar sections={anchors}>
        <div className="sidebar-detail-block">
          <span className="small-label">TECHNOLOGY</span>
          <div className="side-pills"><Pill>React + Vite</Pill><Pill>Node / Express</Pill><Pill>PostgreSQL</Pill><Pill>Supabase</Pill><Pill>Python / FastAPI</Pill><Pill>PWA</Pill></div>
        </div>
        <div className="sidebar-detail-block">
          <span className="small-label">PROJECT SOURCE</span>
          <p>Team repository available after permission and public-content review.</p>
          {projectLinks.distyncRepo&&<a className="text-link" href={projectLinks.distyncRepo} target="_blank" rel="noopener noreferrer">View source <Icon name="upRight" size={16}/></a>}
        </div>
      </StudySidebar>
    </div>
    <NextProject to="/projects/lost-and-found" title="Campus Lost & Found" subtitle="Next project"/>
  </main>;
}

function LostFound() {
  const screenshotAnchors = projectGalleryImages.lostAndFound.length > 0
    ? [{ id: 'screenshots', label: 'Project images' }]
    : [];
  const anchors: StudyAnchor[] = [
    { id: 'problem', label: 'The problem' },
    { id: 'role', label: 'My role' },
    ...screenshotAnchors,
    { id: 'architecture', label: 'Architecture' },
    { id: 'quality', label: 'Testing & deployment' },
    { id: 'reflection', label: 'Reflection' },
  ];

  return <main id="top" tabIndex={-1} className="container study-layout">
    <Breadcrumb project="Campus Lost & Found"/>
    <StudyHeader kicker="02 / INDIVIDUAL PROJECT" title="Campus Lost & Found: Making it easier to reconnect people and belongings." intro="A full-stack campus application where people can report lost or found items, browse listings, and submit ownership claims—with an AI-assisted report-review feature." theme="pink" tags={['Full-stack development','API integration','Software testing','Gemini AI']}/>
    <div className="study-overview">
      <div><span className="small-label">PROJECT TYPE</span><strong>Individual project</strong></div>
      <div><span className="small-label">FRONTEND</span><strong>React · TypeScript · Vite</strong></div>
      <div><span className="small-label">BACKEND</span><strong>Express · MongoDB · Gemini API</strong></div>
    </div>
    <div className="study-grid">
      <article className="study-body">
        <StudySection id="problem" kicker="01 / THE PROBLEM" title="A more organized way to look for lost items">
          <p>Campus lost-and-found reports can be scattered or incomplete. This project explores a clearer user journey: report an item, browse existing reports, and submit a claim supported by relevant ownership information.</p>
        </StudySection>
        <StudySection id="role" kicker="02 / MY ROLE" title="Built across the stack">
          <p>I developed the frontend and backend, connected routes and REST APIs to MongoDB, and implemented authentication, protected claim workflows, form validation, and the Gemini-powered report-review feature. I used Codex as a development assistant and remained responsible for reviewing and understanding the implementation.</p>
          <div className="journey-grid">
            <div><span>01</span><strong>Report</strong><p>Submit item details using validated forms.</p></div>
            <div><span>02</span><strong>Browse</strong><p>Explore existing lost and found reports.</p></div>
            <div><span>03</span><strong>Claim</strong><p>Provide information to support an ownership request.</p></div>
          </div>
        </StudySection>
        {projectGalleryImages.lostAndFound.length > 0 && <StudySection id="screenshots" kicker="PROJECT VISUALS" title="Selected project images"><ProjectGallery label="Campus Lost & Found approved project images" images={projectGalleryImages.lostAndFound}/></StudySection>}
        <StudySection id="architecture" kicker="03 / ARCHITECTURE" title="From interface to services">
          <p>The React frontend communicates with an Express API, which manages access to MongoDB through Mongoose and integrates Gemini for report-review assistance.</p>
          <div className="workflow-card">
            <div className="workflow-card-top"><strong>Application architecture</strong><a href="/diagrams/lost-found-architecture.svg" target="_blank" rel="noopener noreferrer" className="diagram-open">Open full diagram <Icon name="upRight" size={13}/></a></div>
            <p className="diagram-scroll-cue diagram-scroll-cue--architecture" id="architecture-scroll-cue">Scroll horizontally to view the full diagram <span aria-hidden="true">↔</span></p>
            <div className="workflow-image-viewport diagram-viewport--architecture" role="region" aria-label="Scrollable application architecture diagram" aria-describedby="architecture-scroll-cue" tabIndex={0}>
              <img className="diagram-image diagram-image--architecture" src="/diagrams/lost-found-architecture.svg" alt="Browser interacts with React/Vite frontend; frontend sends authenticated requests to Express API; Express connects to MongoDB Atlas through Mongoose and to Gemini API." loading="lazy"/>
            </div>
            <p>Diagram adapted from the application's own README.</p>
          </div>
        </StudySection>
        <StudySection id="quality" kicker="04 / QUALITY" title="Testing, iteration, and deployment">
          <p>The frontend repository documents Vitest tests, linting, a TypeScript production build, and a GitHub Actions CI workflow. This project also gave me practical experience reviewing API integration, validation, application routes, and deployment behavior.</p>
          <div className="insight-note"><Icon name="check" size={20}/><span>AI tools supported selected development tasks; they did not replace manual review, testing, and technical responsibility.</span></div>
        </StudySection>
        <StudySection id="reflection" kicker="05 / REFLECTION" title="What the project taught me">
          <p>Building the complete user journey strengthened my understanding of how frontend decisions, API contracts, data modeling, and reliability all affect a user's experience. It also reinforced why small tests and good documentation matter.</p>
        </StudySection>
      </article>
      <StudySidebar sections={anchors}>
        <div className="sidebar-detail-block">
          <span className="small-label">SOURCE CODE</span>
          <a className="source-link" href={projectLinks.lostFrontend} target="_blank" rel="noopener noreferrer"><Icon name="github" size={17}/> Frontend repository <Icon name="upRight" size={16}/></a>
          <a className="source-link" href={projectLinks.lostBackend} target="_blank" rel="noopener noreferrer"><Icon name="github" size={17}/> Backend repository <Icon name="upRight" size={16}/></a>
        </div>
        <div className="sidebar-detail-block">
          <span className="small-label">TOOLS & TECHNOLOGIES</span>
          <div className="side-pills"><Pill>React</Pill><Pill>TypeScript</Pill><Pill>Express</Pill><Pill>MongoDB</Pill><Pill>Gemini API</Pill><Pill>Vitest</Pill><Pill>Vercel</Pill></div>
        </div>
      </StudySidebar>
    </div>
    <NextProject to="/projects/distync" title="DISTYNC" subtitle="Other featured project"/>
  </main>;
}
function NextProject({to,title,subtitle}: {to:string;title:string;subtitle:string}) {return <Link className="next-project" to={to}><span>{subtitle}</span><strong>{title}<Icon name="upRight" size={27}/></strong></Link>}
function NotFound(){return <main id="top" tabIndex={-1} className="container not-found"><Kicker>404 / PAGE NOT FOUND</Kicker><h1>Oops. A little detour.</h1><p>This page doesn't seem to exist, but the rest of the portfolio is right where you left it.</p><ButtonLink to="/">Back home</ButtonLink></main>}
export default function App(){return <><a className="skip-link" href="#top">Skip to main content</a><ScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/projects/distync" element={<Distync/>}/><Route path="/projects/lost-and-found" element={<LostFound/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></>}
