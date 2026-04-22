import { createContext, useContext, useEffect, ReactNode } from "react";

interface LanguageContextType {
  lang: string;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

const translations: Record<string, string> = {
  // Navbar
  "nav.about": "About",
  "nav.story": "Story",
  "nav.services": "Services",
  "nav.how": "Process",
  "nav.experience": "Experience",
  "nav.education": "Education",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  // Hero
  "hero.tagline": "Analytics . AI . Healthcare",
  "hero.name.first": "Mohamed Mahmoud",
  "hero.name.last": "Seliem",
  "hero.description":
    "Based in Egypt. Helping healthcare teams and global clients turn clinical chaos into clarity — through ML pipelines, BI dashboards, and data systems that move decisions, not just dashboards.",
  "hero.headline": "Turning Chaos into Clarity.",
  "hero.download": "Download CV",
  "hero.cta": "Book a Free Discovery Call",

  // Marquee
  "marquee.1": "ANALYZE",
  "marquee.2": "PREDICT",
  "marquee.3": "AUTOMATE",
  "marquee.4": "TRANSFORM",

  // Story (Then → Now)
  "story.label": "My Story",
  "story.title": "From reading the body to reading the data.",
  "story.p0":
    "I started as a physical therapist. Trained in clinical rehabilitation sciences, working inside hospitals and sports centers across Egypt — managing 300+ patient cases a year.",
  "story.p1":
    "That put me in front of patients, doctors, and operations teams — learning where decisions get made, where time gets wasted, and where data could have changed the outcome.",
  "story.p2":
    "Over the years I built the dashboards, ML pipelines, and KPI systems that showed leadership exactly where the practice was winning and bleeding. The reports told the story. Generative AI changed what I could build to fix it. Now I build the systems behind the insights.",
  "story.quote.1": "The clinician's eye.",
  "story.quote.2": "The builder's hands.",
  "story.then": "Then",
  "story.now": "Now",
  "story.then.0": "Clinical Rehab",
  "story.then.1": "Patient Care",
  "story.then.2": "BI Reports",
  "story.then.3": "SQL & Excel",
  "story.now.0": "ML Pipelines",
  "story.now.1": "Gen-AI Systems",
  "story.now.2": "Full-Stack Apps",
  "story.now.3": "Decision Analytics",

  // Challenge vs Solution
  "cs.label": "Challenge vs Solution",
  "cs.title.1": "Every team hits the same walls.",
  "cs.title.2": "Here's how I break through them.",
  "cs.subtitle":
    "Patterns I've seen across clinics, hospitals, and operations teams — and the systems that fix them.",
  "cs.problem": "Problem",
  "cs.solution": "Solution",
  "cs.0.problem": "Hours lost to manual reporting",
  "cs.0.solution": "Automated ETL & BI Pipelines",
  "cs.1.problem": "Subjective triage & inconsistent care",
  "cs.1.solution": "ML-Powered Decision Support",
  "cs.2.problem": "Data scattered across silos",
  "cs.2.solution": "Unified Source-of-Truth Dashboards",
  "cs.3.problem": "Insights that never reach action",
  "cs.3.solution": "Analytics That Move Decisions",

  // Services / What I Build
  "svc.label": "What I Build",
  "svc.title.1": "Four focused practices,",
  "svc.title.2": "each one moves the needle.",
  "svc.subtitle":
    "From the first dataset to the deployed decision system — designed to ship and scale.",
  "svc.0.title": "Healthcare ML & Predictive Analytics",
  "svc.0.s1": "Clinical Data",
  "svc.0.s2": "ML Pipeline",
  "svc.0.s3": "Predicted Outcomes",
  "svc.1.title": "BI Dashboards & Decision Hubs",
  "svc.1.s1": "Raw Data",
  "svc.1.s2": "Power BI Hub",
  "svc.1.s3": "Smart Decisions",
  "svc.2.title": "Healthcare AI Training & Enablement",
  "svc.2.s1": "AI Skeptics",
  "svc.2.s2": "Hands-On Training",
  "svc.2.s3": "Daily AI Users",
  "svc.3.title": "Full-Stack Data Apps",
  "svc.3.s1": "Idea & Spec",
  "svc.3.s2": "Build & Deploy",
  "svc.3.s3": "Live Product",

  // How I Work
  "how.label": "How I Work",
  "how.title.1": "A simple process.",
  "how.title.2": "Built to ship.",
  "how.step": "Step",
  "how.1.title": "Discovery & Architecture",
  "how.1.desc":
    "Identify the real bottleneck — clinical, operational, or analytical — and design the data workflow around it.",
  "how.2.title": "Execution & Development",
  "how.2.desc":
    "Build the ML model, BI dashboard, or full-stack tool — fast, tested, and tied to a measurable KPI.",
  "how.3.title": "Deployment & Empowerment",
  "how.3.desc":
    "Ship it, integrate it into the team's workflow, and train people so the impact compounds long after I'm gone.",

  // About
  "about.label": "About Me",
  "about.title1": "Where",
  "about.health": "Health",
  "about.meets": "Meets",
  "about.technology": "Technology",
  "about.description":
    "Licensed physical therapist turned data analyst — I bring 5+ years of frontline clinical leadership to every dataset. I've managed 300+ patient cases annually, built ML models that cut misdiagnosis by 18%, and designed dashboards saving 20+ hours/week. I don't just analyze healthcare data — I've lived it.",
  "about.clinical.title": "Clinical Leadership",
  "about.clinical.kpi": "300+",
  "about.clinical.kpiLabel": "Cases/Year",
  "about.clinical.desc":
    "Led evidence-based rehabilitation across musculoskeletal & neuromuscular cases, achieving 95%+ patient satisfaction through structured milestone tracking and personalized care protocols.",
  "about.ai.title": "Predictive Analytics",
  "about.ai.kpi": "18%",
  "about.ai.kpiLabel": "Misdiagnosis Reduction",
  "about.ai.desc":
    "Engineered supervised ML pipelines with scikit-learn to forecast patient recovery trajectories — enabling data-driven triage that accelerated recovery identification by 22%.",
  "about.data.title": "Business Intelligence",
  "about.data.kpi": "20+hrs",
  "about.data.kpiLabel": "Saved Weekly",
  "about.data.desc":
    "Architected automated ETL pipelines and Power BI dashboards consolidating 5+ fragmented data sources into a unified decision hub — driving 15% operational efficiency gains.",

  // Impact Strip
  "impact.patients": "Patients Managed",
  "impact.patientsDesc": "Cases annually",
  "impact.recovery": "Faster Recovery",
  "impact.recoveryDesc": "Acceleration",
  "impact.efficiency": "Efficiency Gain",
  "impact.efficiencyDesc": "Operational boost",
  "impact.hours": "Hours Saved",
  "impact.hoursDesc": "Per week",

  // Experience
  "exp.label": "Experience",
  "exp.title1": "Professional",
  "exp.title2": "Journey",
  "exp.challenge": "Challenge:",
  "exp.solution": "Action:",
  "exp.impact": "Result:",

  "exp.0.role": "Data Analyst",
  "exp.0.company": "Digilians, MTC & MCIT",
  "exp.0.period": "Nov 2025 – Present",
  "exp.0.challenge":
    "Manual healthcare reporting consumed 20+ hrs/week; data scattered across 5+ siloed sources with zero unified visibility.",
  "exp.0.solution":
    "Spearheaded Python & SQL automation pipelines; architected predictive ML models with scikit-learn; designed interactive Power BI dashboards for executive decision-making.",
  "exp.0.impact":
    "Delivered 15% efficiency gain, 22% faster recovery identification, and consolidated 5+ data sources into a single source of truth.",

  "exp.1.role": "Senior Physical Therapist",
  "exp.1.company": "Ministry of Health & Population",
  "exp.1.period": "Sep 2020 – Present",
  "exp.1.challenge":
    "Managing 300+ patient cases/year while maintaining individualized, evidence-based care quality under high-volume pressure.",
  "exp.1.solution":
    "Championed structured treatment protocols with measurable milestone tracking; mentored junior therapists on evidence-based methodologies.",
  "exp.1.impact":
    "Achieved 95%+ patient satisfaction rate; reduced average recovery timelines through standardized, data-informed care pathways.",

  "exp.2.role": "Sports Rehabilitation Specialist",
  "exp.2.company": "N.E.C for Physical Therapy",
  "exp.2.period": "Sep 2021 – Apr 2023",
  "exp.2.challenge":
    "Athletes demanded accelerated return-to-play without compromising long-term musculoskeletal health.",
  "exp.2.solution":
    "Designed phased recovery programs with performance benchmarking at each milestone; introduced data-driven outcome tracking for treatment optimization.",
  "exp.2.impact":
    "Shortened return-to-play timelines significantly through evidence-based, milestone-driven rehabilitation protocols.",

  "exp.3.role": "Pediatric Habilitation Therapist",
  "exp.3.company": "Nour Elhayat Oasis",
  "exp.3.period": "2019 – 2021",
  "exp.3.challenge":
    "Pediatric developmental cases required highly individualized, family-centered care plans with measurable progress.",
  "exp.3.solution":
    "Built developmental KPI tracking systems; partnered with families to align therapy goals with home routines and school environments.",
  "exp.3.impact":
    "Improved developmental milestone achievement rates and strengthened family engagement across long-term care plans.",

  // Education
  "edu.label": "Education",
  "edu.title1": "Academic",
  "edu.title2": "Foundation",
  "edu.0.degree": "B.Sc. in Physical Therapy",
  "edu.0.institution": "Cairo University",
  "edu.0.period": "2014 – 2019",
  "edu.0.details":
    "Comprehensive training in musculoskeletal, neurological, and pediatric rehabilitation. Graduated with clinical honors.",
  "edu.1.degree": "Data Analytics & AI Specialization",
  "edu.1.institution": "Google · Egyptian Military Academy",
  "edu.1.period": "2023 – 2024",
  "edu.1.details":
    "Applied data analytics, statistical modeling, machine learning, and AI integration in healthcare contexts.",

  // Skills
  "skills.label": "Skills & Tools",
  "skills.title1": "Built for",
  "skills.title2": "Impact",
  "skills.technical": "Technical Stack",
  "skills.clinical": "Clinical Expertise",
  "skills.languages": "Languages",
  "skills.certifications": "Certifications",

  // Projects
  "proj.label": "Selected Projects",
  "proj.title1": "Case",
  "proj.title2": "Studies",
  "proj.description":
    "A few of the systems I've built — each one tied to a real bottleneck and a measurable outcome.",
  "proj.challenge": "Challenge",
  "proj.solution": "Solution",
  "proj.impact": "Impact",
  "proj.tools": "Tools",

  "proj.0.title": "Recovery Trajectory Predictor",
  "proj.0.tagline": "ML model for personalized rehab forecasting",
  "proj.0.challenge":
    "Therapists couldn't reliably predict which patients would recover quickly versus need extended care, leading to inefficient resource allocation.",
  "proj.0.solution":
    "Built a supervised ML pipeline using scikit-learn on 1,000+ anonymized cases — feature-engineered clinical, demographic, and adherence variables to forecast recovery curves.",
  "proj.0.impact.0.kpi": "22%",
  "proj.0.impact.0.label": "Faster recovery ID",
  "proj.0.impact.1.kpi": "18%",
  "proj.0.impact.1.label": "Misdiagnosis cut",

  "proj.1.title": "Clinical Operations Decision Hub",
  "proj.1.tagline": "Unified Power BI dashboard for healthcare leadership",
  "proj.1.challenge":
    "Leadership made decisions on 5+ siloed reports manually consolidated each week — costing 20+ hours and creating blind spots.",
  "proj.1.solution":
    "Architected an end-to-end ETL → SQL → Power BI pipeline with DAX measures, drill-through pages, and executive KPI scorecards.",
  "proj.1.impact.0.kpi": "20+hrs",
  "proj.1.impact.0.label": "Saved weekly",
  "proj.1.impact.1.kpi": "15%",
  "proj.1.impact.1.label": "Efficiency gain",

  "proj.2.title": "Patient Outcomes Analytics Platform",
  "proj.2.tagline": "Tableau & Python analytics for outcome tracking",
  "proj.2.challenge":
    "Outcomes data was collected but never analyzed at population level — clinicians lacked feedback loops to refine protocols.",
  "proj.2.solution":
    "Built Python data processing on outcome surveys and Tableau visualizations exposing protocol-level performance and cohort comparisons.",
  "proj.2.impact.0.kpi": "1k+",
  "proj.2.impact.0.label": "Cases analyzed",
  "proj.2.impact.1.kpi": "5+",
  "proj.2.impact.1.label": "Protocols refined",

  // Contact
  "contact.label": "Get in Touch",
  "contact.title1": "Let's",
  "contact.title2": "Connect",
  "contact.description":
    "Have a healthcare data challenge or a project idea? I'd love to hear about it.",
  "contact.email": "Email Me",
  "contact.call": "Call",
  "contact.fun": "When I'm not in the clinic or coding, I write poetry.",

  // Footer
  "footer.cta": "Let's Build Something Great",
  "footer.cta.sub": "Ready to turn healthcare data into actionable intelligence? Let's talk.",
  "footer.rights": "© 2026 Mohamed Mahmoud Seliem. All rights reserved.",
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    try {
      localStorage.removeItem("lang");
    } catch {}
  }, []);

  const t = (key: string): string => translations[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang: "en", t, isRTL: false }}>
      {children}
    </LanguageContext.Provider>
  );
};
