import { createContext, useContext, useEffect, ReactNode } from "react";

interface LanguageContextType {
  lang: string;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

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
  "edu.0.period": "2015 – 2020",
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
    "Deep dives into the systems I've built — each tied to a real bottleneck, a deliberate approach, and a measurable outcome.",
  "proj.role": "Role",
  "proj.timeline": "Timeline",
  "proj.context": "Context",
  "proj.challenge": "Challenge",
  "proj.approach": "Approach",
  "proj.solution": "Solution",
  "proj.impact": "Impact",
  "proj.outcomes": "Outcomes",
  "proj.tools": "Stack",
  "proj.learnings": "What I Learned",
  "proj.upNext": "Up Next",

  // GitHub repos
  "github.label": "Open Source",
  "github.title1": "Live on",
  "github.title2": "GitHub",
  "github.description":
    "All my public repositories, fetched live from GitHub — ordered by stars and most recently updated.",
  "github.noDescription": "No description provided.",
  "github.error": "Couldn't load repositories right now. Visit",

  // Project 0 — RehabRL (flagship, live on GitHub)
  "proj.0.title": "RehabRL — Adaptive Rehab Agent",
  "proj.0.tagline":
    "Deep reinforcement learning that prescribes personalized physiotherapy",
  "proj.0.role": "ML Engineer · Clinical Designer",
  "proj.0.timeline": "Flagship · 2025 · Live on GitHub",
  "proj.0.context":
    "Rehab protocols are still mostly one-size-fits-all: the same exercise ladder for very different bodies, injuries, and recovery curves. RehabRL re-frames the problem as sequential decision-making — a reinforcement learning agent that watches a patient's state evolve and prescribes the next exercise prescription instead of following a static plan.",
  "proj.0.challenge":
    "Patient recovery is non-stationary — pain, ROM, strength, fatigue, and adherence shift session to session. Supervised models freeze on a single snapshot; clinicians needed a policy that adapts dose and intensity across an entire recovery arc without ever recommending an unsafe action.",
  "proj.0.solution":
    "Built a Double Dueling DQN with Prioritized Experience Replay over a 28-dimensional patient state and 30 discrete exercise prescriptions, wrapped in a Gym-style rehab environment with a clinically weighted reward (pain, ROM, strength, adherence, safety) and shipped as a Streamlit clinician console.",
  "proj.0.approach.0":
    "Designed a 28-dim PatientState (injury, stage, pain, ROM, strength, fatigue, adherence) and a 30-action exercise space mapped to 50+ real prescriptions.",
  "proj.0.approach.1":
    "Implemented a Dueling Q-Network (~210k params) with residual state encoder, valid-action masking, and soft Polyak target updates.",
  "proj.0.approach.2":
    "Added Prioritized Experience Replay on a SumTree buffer plus ε-greedy exploration to stabilize learning on rare, high-stakes states.",
  "proj.0.approach.3":
    "Shipped a 5-page Streamlit app: training curves, patient assessment with Q-value heatmaps, full trajectory simulation, and model inspector.",
  "proj.0.impact.0.kpi": "30",
  "proj.0.impact.0.label": "Adaptive prescriptions",
  "proj.0.impact.1.kpi": "5×",
  "proj.0.impact.1.label": "DQN vs random baseline",
  "proj.0.outcomes.0":
    "End-to-end RL stack — environment, agent, replay buffer, trainer — built from scratch in PyTorch.",
  "proj.0.outcomes.1":
    "Clinician-facing Streamlit console turns Q-values into readable exercise rationale.",
  "proj.0.outcomes.2":
    "Open-sourced on GitHub as a reference for RL in physical therapy.",
  "proj.0.learnings":
    "The hardest part wasn't the DQN — it was encoding clinical safety into the reward so the agent never trades long-term recovery for a short-term pain drop.",

  // Project 1 — Recovery Trajectory Predictor
  "proj.1.title": "Recovery Trajectory Predictor",
  "proj.1.tagline": "ML model for personalized rehab forecasting",
  "proj.1.role": "Data Scientist · Clinical Lead",
  "proj.1.timeline": "4 months · 2024",
  "proj.1.context":
    "A mid-size physiotherapy network was triaging patients on gut feel. Recovery windows ranged from 2 to 14 weeks with no early signal, so therapist hours and equipment were chronically misallocated.",
  "proj.1.challenge":
    "Therapists couldn't reliably predict which patients would recover quickly versus need extended care, leading to inefficient resource allocation and inconsistent outcomes across clinicians.",
  "proj.1.solution":
    "Built a supervised ML pipeline on 1,000+ anonymized cases — feature-engineered clinical, demographic, and adherence variables to forecast recovery curves at intake.",
  "proj.1.approach.0":
    "Audited 3 years of intake forms and outcome notes to define a clean target variable.",
  "proj.1.approach.1":
    "Engineered 28 features spanning injury type, comorbidities, adherence, and session cadence.",
  "proj.1.approach.2":
    "Compared logistic regression, gradient boosting, and random forest with stratified k-fold CV.",
  "proj.1.approach.3":
    "Shipped a SHAP-backed view so therapists could see why the model flagged each patient.",
  "proj.1.impact.0.kpi": "22%",
  "proj.1.impact.0.label": "Faster recovery ID",
  "proj.1.impact.1.kpi": "18%",
  "proj.1.impact.1.label": "Misdiagnosis cut",
  "proj.1.outcomes.0": "Cut average triage time from 35 minutes to under 10.",
  "proj.1.outcomes.1": "Aligned 6 therapists on a single intake protocol.",
  "proj.1.outcomes.2":
    "Created an audit trail accepted by the clinic's compliance review.",
  "proj.1.learnings":
    "Clinical buy-in lives or dies on explainability — the SHAP layer mattered more than the extra 2% in F1 score.",

  // Project 2 — Clinical Operations Decision Hub
  "proj.2.title": "Clinical Operations Decision Hub",
  "proj.2.tagline": "Unified Power BI dashboard for healthcare leadership",
  "proj.2.role": "Analytics Engineer · BI Lead",
  "proj.2.timeline": "3 months · 2023",
  "proj.2.context":
    "Five department heads were each maintaining their own weekly spreadsheet. Numbers conflicted, definitions drifted, and the executive team spent Monday mornings reconciling instead of deciding.",
  "proj.2.challenge":
    "Leadership made decisions on 5+ siloed reports manually consolidated each week — costing 20+ hours and creating blind spots on capacity and revenue leakage.",
  "proj.2.solution":
    "Architected an end-to-end ETL → SQL → Power BI pipeline with DAX measures, drill-through pages, and executive KPI scorecards governed by a single metric dictionary.",
  "proj.2.approach.0":
    "Mapped every existing report to a canonical metric and retired duplicates.",
  "proj.2.approach.1":
    "Built incremental SQL models with tested grain and freshness checks.",
  "proj.2.approach.2":
    "Designed role-based views: exec scorecard, ops drill-down, finance reconciliation.",
  "proj.2.approach.3":
    "Ran a 2-week shadow period before retiring the legacy spreadsheets.",
  "proj.2.impact.0.kpi": "20+hrs",
  "proj.2.impact.0.label": "Saved weekly",
  "proj.2.impact.1.kpi": "15%",
  "proj.2.impact.1.label": "Efficiency gain",
  "proj.2.outcomes.0": "Single source of truth adopted across 5 departments.",
  "proj.2.outcomes.1":
    "Surfaced a recurring billing gap worth ~6% of monthly revenue.",
  "proj.2.outcomes.2": "Monday leadership meeting cut from 90 to 30 minutes.",
  "proj.2.learnings":
    "Half the work was political: aligning on what 'active patient' meant unlocked more value than any DAX measure.",

  // Project 3 — Patient Outcomes Analytics Platform
  "proj.3.title": "Patient Outcomes Analytics Platform",
  "proj.3.tagline": "Tableau & Python analytics for outcome tracking",
  "proj.3.role": "Analyst · Protocol Researcher",
  "proj.3.timeline": "5 months · 2023",
  "proj.3.context":
    "Post-discharge surveys were collected dutifully and then filed away. No one was closing the loop, so protocols kept being chosen by tradition rather than evidence.",
  "proj.3.challenge":
    "Outcomes data was collected but never analyzed at population level — clinicians lacked feedback loops to refine protocols or compare cohorts fairly.",
  "proj.3.solution":
    "Built Python data processing on outcome surveys and Tableau visualizations exposing protocol-level performance and cohort comparisons with confidence intervals.",
  "proj.3.approach.0":
    "Cleaned and normalized 3 years of free-text and Likert survey responses.",
  "proj.3.approach.1":
    "Standardized cohorts by age, diagnosis, and severity for fair comparisons.",
  "proj.3.approach.2":
    "Built workbooks with protocol-vs-protocol drilldowns and CI bands.",
  "proj.3.approach.3":
    "Facilitated monthly clinical review sessions to turn findings into protocol changes.",
  "proj.3.impact.0.kpi": "1k+",
  "proj.3.impact.0.label": "Cases analyzed",
  "proj.3.impact.1.kpi": "5+",
  "proj.3.impact.1.label": "Protocols refined",
  "proj.3.outcomes.0": "Two underperforming protocols retired with evidence.",
  "proj.3.outcomes.1":
    "Patient-reported satisfaction up 11 points on tracked cohorts.",
  "proj.3.outcomes.2":
    "Established a quarterly outcomes review now embedded in clinic ops.",
  "proj.3.learnings":
    "Confidence intervals saved us from over-claiming — clinicians trusted the work more once uncertainty was visible.",

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
  "footer.cta.sub":
    "Ready to turn healthcare data into actionable intelligence? Let's talk.",
  "footer.rights": "© {year} Mohamed Mahmoud Seliem. All rights reserved.",
  "footer.tagline": "Built with care · Analytics × AI × Healthcare",
  "footer.location": "Cairo, Egypt",
  "footer.email": "muhammadsleem03@gmail.com",
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
