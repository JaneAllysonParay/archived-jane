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
