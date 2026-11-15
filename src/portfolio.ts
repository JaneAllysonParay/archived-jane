export type WorkId = 'distync' | 'lostAndFound';

export type WorkChapter = {
  id: string;
  title: string;
};

export type ArchiveWork = {
  id: WorkId;
  slug: string;
  title: string;
  path: string;
  legacyPath: string;
  projectType: string;
  attribution: string;
  role: string;
  academicContext: string;
  summary: string;
  creatorNotes: string;
  areas: string[];
  technologies: string[];
  methods: string[];
  projectTypeTags: string[];
  evidence: string[];
  chapters: WorkChapter[];
};

export const works: ArchiveWork[] = [
  {
    id: 'distync',
    slug: 'distync',
    title: 'DISTYNC',
    path: '/works/distync',
    legacyPath: '/projects/distync',
    projectType: 'Team capstone',
    attribution: 'Team capstone · Jane Allyson Paray, contributor',
    role: 'Requirements and workflow analysis, technology research, Supabase-hosted PostgreSQL setup, forecasting analytics with AI assistance, documentation, testing, and presentations.',
    academicContext: 'Academic team capstone developed around selected local-government disaster-relief workflows. The project was evaluated in controlled scenarios, not deployed as a production government platform.',
    summary: 'A disaster-relief management system designed to connect household registration, relief distribution, inventory management, and municipal monitoring workflows.',
    creatorNotes: 'My work was one part of a team capstone. I have separated my individual contributions from the broader system our team designed and built.',
    areas: ['Data Analytics', 'Business Analysis', 'Software Quality Assurance', 'Systems Development'],
    technologies: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Python', 'FastAPI', 'Progressive Web App'],
    methods: ['Requirements Analysis', 'Workflow Analysis', 'Functional Testing', 'User Acceptance Testing', 'Historical Model Evaluation', 'Moving Average', 'Exponential Smoothing', 'Trend Projection', 'MAE', 'RMSE'],
    projectTypeTags: ['Team Capstone', 'Disaster Relief Management'],
    evidence: ['Operational workflow diagram', 'Barangay operational heat-map screenshot', 'Controlled-test and usability findings'],
    chapters: [
      { id: 'context', title: 'The Context' },
      { id: 'contributions', title: 'My Contributions' },
      { id: 'workflow', title: 'How the System Works' },
      { id: 'analytics', title: 'Turning Data Into Insight' },
      { id: 'testing', title: 'Testing and Evaluation' },
      { id: 'reflection', title: 'Creator’s Notes' },
    ],
  },
  {
    id: 'lostAndFound',
    slug: 'lost-and-found',
    title: 'Campus Lost & Found',
    path: '/works/lost-and-found',
    legacyPath: '/projects/lost-and-found',
    projectType: 'Individual academic project',
    attribution: 'Individual academic project · Jane Allyson Paray',
    role: 'Individual full-stack project owner; used Codex as a development assistant and reviewed the implementation.',
    academicContext: 'Individual academic application with a React frontend and Express API on Vercel, MongoDB Atlas through Mongoose, and Gemini-assisted report review.',
    summary: 'A full-stack campus application for reporting, browsing, and managing lost-and-found items, with AI-assisted report review.',
    creatorNotes: 'I built the application as an individual academic project and used Codex as a development assistant. Connecting the interface, API, data layer, and user flows helped me understand how each part affects the experience.',
    areas: ['Systems Development', 'Software Quality Assurance', 'Full-Stack Development', 'API Development', 'AI Integration'],
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'REST API', 'MongoDB Atlas', 'Mongoose', 'JWT Authentication', 'Gemini API', 'Vitest', 'GitHub Actions', 'Vercel'],
    methods: ['Item Reporting', 'Listing Browsing', 'Ownership Claims', 'Form Validation', 'Frontend Testing', 'Continuous Integration'],
    projectTypeTags: ['Individual Academic Project', 'Campus Application'],
    evidence: ['Source-derived application architecture diagram', 'Documented frontend tests and CI workflow'],
    chapters: [
      { id: 'idea', title: 'The Idea' },
      { id: 'building', title: 'Building the Application' },
      { id: 'journey', title: 'How It Works' },
      { id: 'architecture', title: 'Behind the Scenes' },
      { id: 'iteration', title: 'Testing and Iteration' },
      { id: 'reflection', title: 'Creator’s Notes' },
    ],
  },
];

export const tagGroups = [
  { title: 'Career Interests', tags: ['Data Analytics', 'Business Analysis', 'Software Quality Assurance', 'Systems Development'] },
  {
    title: 'Technologies',
    tags: Array.from(new Set(works.flatMap((work) => work.technologies))).sort((a, b) => a.localeCompare(b)),
  },
  {
    title: 'Methods and Practices',
    tags: Array.from(new Set(works.flatMap((work) => [...work.methods, ...work.areas.filter((area) => ['Full-Stack Development', 'API Development', 'AI Integration'].includes(area))]))).sort((a, b) => a.localeCompare(b)),
  },
  {
    title: 'Project Types',
    tags: Array.from(new Set(works.flatMap((work) => work.projectTypeTags))).sort((a, b) => a.localeCompare(b)),
  },
];

export function workTags(work: ArchiveWork): string[] {
  return Array.from(new Set([...work.areas, ...work.technologies, ...work.methods, ...work.projectTypeTags]));
}
