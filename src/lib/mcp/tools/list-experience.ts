import { defineTool } from "@lovable.dev/mcp-js";

const EXPERIENCE = [
  {
    role: "Data Analyst",
    company: "Digilians, MTC & MCIT",
    period: "Nov 2025 – Present",
    highlights: [
      "Python & SQL automation pipelines",
      "Predictive ML models",
      "Power BI dashboards",
      "15% efficiency gain, 22% faster recovery identification",
    ],
  },
  {
    role: "Senior Physical Therapist",
    company: "Ministry of Health & Population",
    period: "Sep 2020 – Present",
    highlights: [
      "300+ patient cases per year",
      "95%+ satisfaction rate",
      "Mentored junior therapists on evidence-based methodologies",
    ],
  },
  {
    role: "Sports Rehabilitation Specialist",
    company: "N.E.C",
    period: "Sep 2021 – Apr 2023",
    highlights: ["Phased recovery programs with performance benchmarking"],
  },
  {
    role: "Pediatric Habilitation Therapist",
    company: "Nour Elhayat Oasis",
    period: "May 2020 – Mar 2021",
    highlights: ["Established measurable developmental KPIs"],
  },
];

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "Returns Mohamed Seliem's career experience timeline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EXPERIENCE, null, 2) }],
    structuredContent: { experience: EXPERIENCE },
  }),
});
