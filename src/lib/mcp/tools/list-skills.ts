import { defineTool } from "@lovable.dev/mcp-js";

const SKILLS = {
  technical: [
    "Python",
    "SQL",
    "Power BI",
    "Tableau",
    "scikit-learn",
    "Pandas",
    "ETL Pipelines",
    "DAX",
    "Statistical Modeling",
    "Machine Learning",
    "Automation",
  ],
  clinical: [
    "Clinical Assessment & Triage",
    "Musculoskeletal Rehabilitation",
    "Neuromuscular Therapy",
    "Sports Injury Recovery",
    "Dry Needling & Acupuncture",
    "Pediatric Habilitation",
  ],
  certifications: [
    "Google Data Analytics Professional Certificate",
    "Agile & Lean Methodologies",
    "Applied AI & Healthcare Data Integration",
  ],
};

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description:
    "Returns Mohamed Seliem's technical stack, clinical expertise, and certifications.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS, null, 2) }],
    structuredContent: SKILLS,
  }),
});
