import { defineTool } from "@lovable.dev/mcp-js";

const PROJECTS = [
  {
    name: "RehabRL",
    description:
      "Deep reinforcement learning agent for adaptive physical therapy protocols.",
    repo: "https://github.com/Sleem13/rehab_rl",
    stack: ["Python", "PyTorch", "Reinforcement Learning"],
  },
  {
    name: "Patient Outcome Prediction Engine",
    description:
      "Supervised ML pipeline that flags at-risk patients earlier from clinical notes and vitals.",
    stack: ["scikit-learn", "Pandas", "Python"],
    impact: {
      "faster recovery identification": "22%",
      "misdiagnosis reduction": "18%",
    },
  },
  {
    name: "Healthcare Operations Dashboard",
    description:
      "Automated ETL + Power BI dashboards consolidating 5+ sources of clinic operations data.",
    stack: ["Power BI", "SQL", "Python", "DAX"],
    impact: {
      "efficiency gain": "15%",
      "hours saved per week": "20+",
    },
  },
  {
    name: "Rehabilitation Progress Tracker",
    description:
      "Standardized clinical KPIs across a therapist team to accelerate plan adjustments.",
    stack: ["Python", "Pandas"],
    impact: {
      "patient satisfaction": "95%+",
      "faster plan adjustments": "30%",
    },
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "Returns Mohamed Seliem's featured case studies and repos with impact metrics.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
