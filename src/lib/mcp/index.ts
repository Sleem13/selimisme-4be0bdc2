import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getBio from "./tools/get-bio";
import listExperience from "./tools/list-experience";
import listProjects from "./tools/list-projects";
import listSkills from "./tools/list-skills";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "seliem-portfolio-mcp",
  title: "Seliem Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Mohamed Mahmoud Seliem's portfolio. Use these to answer questions about his bio, experience, featured projects, and skills.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getBio, listExperience, listProjects, listSkills],
});
