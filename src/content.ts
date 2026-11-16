/** All public facts and outbound destinations live here. Do not fabricate contact details or unapproved project assets. */
export const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? '';
export const formspreeEndpoint = formspreeFormId
  ? `https://formspree.io/f/${encodeURIComponent(formspreeFormId)}`
  : '';

export const site = {
  fullName: "Jane Allyson Paray",
  name: "Jane",
  headline: "Curious about data. Passionate about better systems.",
  role: "Aspiring IT Professional · Data Analytics · Business Analysis · Quality Assurance",
  github: "https://github.com/JaneAllysonParay",
  // Public destinations are listed only when Jane has configured them here.
  email: "janeallyson24@gmail.com",
  linkedin: "https://www.linkedin.com/in/jane-allyson-paray/",
  resumePath: "",
  portraitPath: "/assets/profile/jane-portrait.webp",
  distyncHeatmapPath: "/assets/distync/03-analytics-heatmap.png",
  lostFoundImagePath: "",
};
export const projectLinks = {
  lostFrontend: "https://github.com/JaneAllysonParay/itelect4-project",
  lostBackend: "https://github.com/JaneAllysonParay/itelect4-backend",
  distyncRepo: "https://github.com/dlslfinalproject/distync",
  lostDemo: "https://itelect4-project-pi.vercel.app/",
};

export type PortfolioCredential = {
  id: string;
  title: string;
  issuer?: string;
  program?: string;
  organizer?: string;
  supportedBy?: string;
  credentialType: string;
  dateLabel: 'Completed' | 'Issued';
  date: string;
  courseLength?: string;
  tags: string[];
  credentialUrl?: string;
  /** Original certificate file under public/assets/credentials/, in its supplied format. */
  certificatePath?: string;
};

export const credentials: PortfolioCredential[] = [
  {
    id: "introduction-to-sql",
    title: "Introduction to SQL",
    issuer: "DataCamp",
    credentialType: "Statement of Accomplishment / Course Completion",
    dateLabel: "Completed",
    date: "April 13, 2026",
    courseLength: "2 hours",
    tags: ["SQL Fundamentals", "Data Analytics"],
    credentialUrl:
      "https://www.datacamp.com/statement-of-accomplishment/course/61d8a3125257b3aadab56bdafee7659f3df108a1",
    certificatePath: "/assets/credentials/datacamp-introduction-to-sql.pdf",
  },
  {
    id: "networking-basics",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    credentialType:
      "Certificate of Course Completion / Student-Level Credential",
    dateLabel: "Issued",
    date: "October 14, 2025",
    tags: ["Networking", "IP Addressing", "Network Troubleshooting"],
    credentialUrl:
      "https://www.credly.com/badges/fa84e7d3-3628-4f25-bcaf-9b9beb7d84d8",
    certificatePath: "/assets/credentials/cisco-networking-basics.pdf",
  },
  {
    id: "ai-career-readiness",
    title: "AI Career Readiness Training",
    program: "ASEAN Ahead",
    organizer: "ASEAN Foundation",
    supportedBy: "LinkedIn",
    credentialType: "Certificate of Completion",
    dateLabel: "Issued",
    date: "September 3, 2026",
    tags: ["AI Career Readiness", "Professional Development"],
    certificatePath: "/assets/credentials/asean-ahead-ai-career-readiness.png",
  },
];

export const qaStats = [
  { value: "86 / 86", label: "Functional test cases" },
  { value: "22 / 22", label: "PWA test cases" },
  { value: "23 / 23", label: "Security-related cases" },
  { value: "10 / 10", label: "Reliability checks" },
  { value: "72 / 72", label: "Accepted UAT cases" },
];

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

// Approved project screenshots can be added here when the assets are ready.
// Empty galleries are intentional and do not block the case-study pages.
export const projectGalleryImages: Record<
  "distync" | "lostAndFound",
  ProjectImage[]
> = {
  distync: [],
  lostAndFound: [],
};
