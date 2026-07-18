import { defineTool } from "@lovable.dev/mcp-js";

const BIO = {
  name: "Mohamed Mahmoud Seliem",
  headline: "Physical Therapist → Data Analyst",
  tagline: "Turning Chaos into Clarity",
  location: "Dakahlia, Egypt",
  email: "muhammadsleem03@gmail.com",
  linkedin: "https://linkedin.com/in/sleemisme",
  github: "https://github.com/Sleem13",
  languages: ["Arabic (Native)", "English (Fluent)", "French (Basic)"],
  summary:
    "Licensed Physical Therapist turned Data Analyst with 5+ years of clinical leadership experience. Combines frontline clinical empathy with analytical rigor to build data and AI solutions in healthcare.",
};

export default defineTool({
  name: "get_bio",
  title: "Get bio",
  description:
    "Returns Mohamed Seliem's short bio, tagline, location, and public contact links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(BIO, null, 2) }],
    structuredContent: BIO,
  }),
});
