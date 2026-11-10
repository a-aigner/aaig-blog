export const contact = {
  name: "André Aigner",
  role: "Applied AI Engineer",
  location: "Rosenheim, Germany",
  email: "andreaigner@icloud.com",
  linkedin: "https://www.linkedin.com/in/andre-aigner",
  github: "https://github.com/a-aigner",
  cvPdf: "/cv-aigner-andre.pdf",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Python", "JavaScript/TypeScript", "C#", "Java", "Swift", "SQL"] },
  { group: "Frameworks", items: ["Flutter", "Spring Boot", "Selenium", "FastAPI", "Supabase"] },
  { group: "DevOps & Tools", items: ["Docker", "Git", "Linux", "REST APIs", "Scikit-learn"] },
  { group: "Specialties", items: ["Software Development", "Testing Automation", "Microservices", "Machine Learning", "LLM Integration"] },
];

// Curated, AI-engineering-focused keywords shown in the landing "CV at a glance".
// The full skill set still lives in `skills` (used on /uses). AI terms lead.
export const aiHighlights: string[] = [
  "Agentic AI",
  "LLM Integration",
  "RAG",
  "Computer Vision",
  "Machine Learning",
  "PyTorch",
  "Vector DBs",
  "Python",
  "FastAPI",
  "Docker",
  "SQL",
];

export const experience: { period: string; role: string; org: string; place: string }[] = [
  { period: "Sep 2026 – Present", role: "AI Engineer – Vision & Engineering Automation (Intern & Master's Thesis)", org: "3con Technologies GmbH", place: "Ebbs, Austria" },
  { period: "Oct 2025 – Present", role: "Founder & AI Engineer", org: "ARSoftware UG", place: "Landshut, Germany" },
  { period: "Mar 2023 – Aug 2025", role: "Working Student – IT Consulting", org: "intellior GmbH", place: "Stuttgart, Germany" },
  { period: "Apr 2022 – Nov 2022", role: "Intern – Production Technologies", org: "BMW Group", place: "Dingolfing, Germany" },
  { period: "Mar 2021 – Mar 2022", role: "Software Developer (Student Worker)", org: "TRIO Project I", place: "Landshut, Germany" },
];

export const education: { period: string; degree: string; org: string; place: string }[] = [
  { period: "Oct 2025 – Feb 2027 (expected)", degree: "M.Sc. Applied Artificial Intelligence", org: "TH Rosenheim", place: "Rosenheim, Germany" },
  { period: "Mar 2023 – Sep 2025", degree: "B.Sc. Computer Science", org: "OTH Regensburg", place: "Regensburg, Germany" },
  { period: "Sep 2019 – Mar 2023", degree: "Computer Science Studies", org: "HAW Landshut", place: "Landshut, Germany" },
];
