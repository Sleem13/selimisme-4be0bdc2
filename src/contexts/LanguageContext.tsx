import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.about": { en: "About", ar: "نبذة" },
  "nav.story": { en: "Story", ar: "القصة" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.how": { en: "Process", ar: "المنهجية" },
  "nav.experience": { en: "Experience", ar: "الخبرات" },
  "nav.education": { en: "Education", ar: "التعليم" },
  "nav.skills": { en: "Skills", ar: "المهارات" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.contact": { en: "Contact", ar: "تواصل" },

  // Hero
  "hero.tagline": { en: "Analytics . AI . Healthcare", ar: "تحليلات . ذكاء اصطناعي . رعاية صحية" },
  "hero.name.first": { en: "Mohamed Mahmoud", ar: "محمد محمود" },
  "hero.name.last": { en: "Seliem", ar: "سليم" },
  "hero.description": {
    en: "Based in Egypt. Helping healthcare teams and global clients turn clinical chaos into clarity — through ML pipelines, BI dashboards, and data systems that move decisions, not just dashboards.",
    ar: "مقيم في مصر. أساعد فرق الرعاية الصحية والعملاء حول العالم على تحويل الفوضى السريرية إلى وضوح — عبر خطوط تعلم آلي ولوحات ذكاء أعمال وأنظمة بيانات تُحرّك القرارات لا تُزيّن التقارير."
  },
  "hero.headline": { en: "Turning Chaos into Clarity.", ar: "أحوّل الفوضى إلى وضوح." },
  "hero.download": { en: "Download CV", ar: "تحميل السيرة الذاتية" },
  "hero.cta": { en: "Book a Free Discovery Call", ar: "احجز مكالمة استكشافية مجانية" },

  // Marquee
  "marquee.1": { en: "ANALYZE", ar: "حلّل" },
  "marquee.2": { en: "PREDICT", ar: "تنبّأ" },
  "marquee.3": { en: "AUTOMATE", ar: "أتمتة" },
  "marquee.4": { en: "TRANSFORM", ar: "حوّل" },

  // Story (Then → Now)
  "story.label": { en: "My Story", ar: "قصتي" },
  "story.title": { en: "From reading the body to reading the data.", ar: "من قراءة الجسد إلى قراءة البيانات." },
  "story.p0": {
    en: "I started as a physical therapist. Trained in clinical rehabilitation sciences, working inside hospitals and sports centers across Egypt — managing 300+ patient cases a year.",
    ar: "بدأت كأخصائي علاج طبيعي. تدربت في علوم التأهيل السريري، وعملت داخل مستشفيات ومراكز رياضية في مصر — أدرت أكثر من ٣٠٠ حالة سنوياً."
  },
  "story.p1": {
    en: "That put me in front of patients, doctors, and operations teams — learning where decisions get made, where time gets wasted, and where data could have changed the outcome.",
    ar: "وضعني هذا أمام المرضى والأطباء وفرق التشغيل — متعلماً أين تُتخذ القرارات، وأين يُهدر الوقت، وأين كان يمكن للبيانات أن تغير النتيجة."
  },
  "story.p2": {
    en: "Over the years I built the dashboards, ML pipelines, and KPI systems that showed leadership exactly where the practice was winning and bleeding. The reports told the story. Generative AI changed what I could build to fix it. Now I build the systems behind the insights.",
    ar: "على مر السنين بنيت اللوحات وخطوط التعلم الآلي وأنظمة المؤشرات التي أظهرت للقيادة بالضبط أين تربح الممارسة وأين تنزف. التقارير روت القصة. والذكاء التوليدي غيّر ما يمكنني بناءه لحلّها. الآن أبني الأنظمة وراء الرؤى."
  },
  "story.quote.1": { en: "The clinician's eye.", ar: "عين الطبيب." },
  "story.quote.2": { en: "The builder's hands.", ar: "ويدا الصانع." },
  "story.then": { en: "Then", ar: "في البداية" },
  "story.now": { en: "Now", ar: "الآن" },
  "story.then.0": { en: "Clinical Rehab", ar: "تأهيل سريري" },
  "story.then.1": { en: "Patient Care", ar: "رعاية المرضى" },
  "story.then.2": { en: "BI Reports", ar: "تقارير BI" },
  "story.then.3": { en: "SQL & Excel", ar: "SQL وExcel" },
  "story.now.0": { en: "ML Pipelines", ar: "خطوط تعلم آلي" },
  "story.now.1": { en: "Gen-AI Systems", ar: "أنظمة ذكاء توليدي" },
  "story.now.2": { en: "Full-Stack Apps", ar: "تطبيقات متكاملة" },
  "story.now.3": { en: "Decision Analytics", ar: "تحليلات قرار" },

  // Challenge vs Solution
  "cs.label": { en: "Challenge vs Solution", ar: "التحدي مقابل الحل" },
  "cs.title.1": { en: "Every team hits the same walls.", ar: "كل فريق يصطدم بنفس الجدران." },
  "cs.title.2": { en: "Here's how I break through them.", ar: "وهكذا أكسرها." },
  "cs.subtitle": { en: "Patterns I've seen across clinics, hospitals, and operations teams — and the systems that fix them.", ar: "أنماط رأيتها عبر العيادات والمستشفيات وفرق التشغيل — والأنظمة التي تُصلحها." },
  "cs.problem": { en: "Problem", ar: "المشكلة" },
  "cs.solution": { en: "Solution", ar: "الحل" },
  "cs.0.problem": { en: "Hours lost to manual reporting", ar: "ساعات تُهدر في التقارير اليدوية" },
  "cs.0.solution": { en: "Automated ETL & BI Pipelines", ar: "خطوط ETL وذكاء أعمال آلية" },
  "cs.1.problem": { en: "Subjective triage & inconsistent care", ar: "فرز ذاتي ورعاية غير متسقة" },
  "cs.1.solution": { en: "ML-Powered Decision Support", ar: "دعم قرار مدعوم بالتعلم الآلي" },
  "cs.2.problem": { en: "Data scattered across silos", ar: "بيانات مبعثرة عبر صوامع" },
  "cs.2.solution": { en: "Unified Source-of-Truth Dashboards", ar: "لوحات مصدر حقيقة موحدة" },
  "cs.3.problem": { en: "Insights that never reach action", ar: "رؤى لا تصل أبداً إلى التنفيذ" },
  "cs.3.solution": { en: "Analytics That Move Decisions", ar: "تحليلات تُحرّك القرارات" },

  // Services / What I Build
  "svc.label": { en: "What I Build", ar: "ماذا أبني" },
  "svc.title.1": { en: "Four focused practices,", ar: "أربعة تخصصات،" },
  "svc.title.2": { en: "each one moves the needle.", ar: "كل منها يُحرّك المؤشر." },
  "svc.subtitle": { en: "From the first dataset to the deployed decision system — designed to ship and scale.", ar: "من أول مجموعة بيانات إلى نظام القرار المُنشَر — مصممة للإطلاق والتوسع." },
  "svc.0.title": { en: "Healthcare ML & Predictive Analytics", ar: "تعلم آلي وتحليلات تنبؤية للرعاية الصحية" },
  "svc.0.s1": { en: "Clinical Data", ar: "بيانات سريرية" },
  "svc.0.s2": { en: "ML Pipeline", ar: "خط تعلم آلي" },
  "svc.0.s3": { en: "Predicted Outcomes", ar: "نتائج متوقعة" },
  "svc.1.title": { en: "BI Dashboards & Decision Hubs", ar: "لوحات ذكاء أعمال ومراكز قرار" },
  "svc.1.s1": { en: "Raw Data", ar: "بيانات خام" },
  "svc.1.s2": { en: "Power BI Hub", ar: "مركز Power BI" },
  "svc.1.s3": { en: "Smart Decisions", ar: "قرارات ذكية" },
  "svc.2.title": { en: "Healthcare AI Training & Enablement", ar: "تدريب وتمكين الذكاء الاصطناعي الصحي" },
  "svc.2.s1": { en: "AI Skeptics", ar: "متشككو AI" },
  "svc.2.s2": { en: "Hands-On Training", ar: "تدريب عملي" },
  "svc.2.s3": { en: "Daily AI Users", ar: "مستخدمون يوميون" },
  "svc.3.title": { en: "Full-Stack Data Apps", ar: "تطبيقات بيانات متكاملة" },
  "svc.3.s1": { en: "Idea & Spec", ar: "فكرة ومواصفات" },
  "svc.3.s2": { en: "Build & Deploy", ar: "بناء ونشر" },
  "svc.3.s3": { en: "Live Product", ar: "منتج حي" },

  // How I Work
  "how.label": { en: "How I Work", ar: "كيف أعمل" },
  "how.title.1": { en: "A simple process.", ar: "عملية بسيطة." },
  "how.title.2": { en: "Built to ship.", ar: "مصممة للإطلاق." },
  "how.step": { en: "Step", ar: "خطوة" },
  "how.1.title": { en: "Discovery & Architecture", ar: "اكتشاف وهندسة" },
  "how.1.desc": { en: "Identify the real bottleneck — clinical, operational, or analytical — and design the data workflow around it.", ar: "تحديد العائق الحقيقي — السريري أو التشغيلي أو التحليلي — وتصميم سير العمل حوله." },
  "how.2.title": { en: "Execution & Development", ar: "تنفيذ وتطوير" },
  "how.2.desc": { en: "Build the ML model, BI dashboard, or full-stack tool — fast, tested, and tied to a measurable KPI.", ar: "بناء نموذج التعلم الآلي أو لوحة BI أو الأداة المتكاملة — سريعاً ومُختبراً ومرتبطاً بمؤشر قابل للقياس." },
  "how.3.title": { en: "Deployment & Empowerment", ar: "نشر وتمكين" },
  "how.3.desc": { en: "Ship it, integrate it into the team's workflow, and train people so the impact compounds long after I'm gone.", ar: "إطلاقه ودمجه في سير عمل الفريق وتدريب الناس لينمو الأثر طويلاً بعد رحيلي." },

  // About
  "about.label": { en: "About Me", ar: "نبذة عني" },
  "about.title1": { en: "Where", ar: "حيث" },
  "about.health": { en: "Health", ar: "الصحة" },
  "about.meets": { en: "Meets", ar: "تلتقي" },
  "about.technology": { en: "Technology", ar: "بالتكنولوجيا" },
  "about.description": {
    en: "Licensed physical therapist turned data analyst — I bring 5+ years of frontline clinical leadership to every dataset. I've managed 300+ patient cases annually, built ML models that cut misdiagnosis by 18%, and designed dashboards saving 20+ hours/week. I don't just analyze healthcare data — I've lived it.",
    ar: "أخصائي علاج طبيعي مرخّص تحوّلت إلى محلل بيانات — أجلب أكثر من ٥ سنوات من القيادة السريرية الميدانية لكل مجموعة بيانات. أدرت أكثر من ٣٠٠ حالة مريض سنوياً، وبنيت نماذج تعلم آلي قللت التشخيص الخاطئ بنسبة ١٨٪، وصممت لوحات معلومات توفر أكثر من ٢٠ ساعة أسبوعياً. أنا لا أحلل بيانات الرعاية الصحية فحسب — بل عشتها."
  },
  "about.clinical.title": { en: "Clinical Leadership", ar: "القيادة السريرية" },
  "about.clinical.kpi": { en: "300+", ar: "+٣٠٠" },
  "about.clinical.kpiLabel": { en: "Cases/Year", ar: "حالة/سنة" },
  "about.clinical.desc": {
    en: "Led evidence-based rehabilitation across musculoskeletal & neuromuscular cases, achieving 95%+ patient satisfaction through structured milestone tracking and personalized care protocols.",
    ar: "قدت التأهيل المبني على الأدلة عبر حالات العضلات والأعصاب، محققاً رضا مرضى +٩٥٪ من خلال تتبع مراحل منظمة وبروتوكولات رعاية شخصية."
  },
  "about.ai.title": { en: "Predictive Analytics", ar: "التحليلات التنبؤية" },
  "about.ai.kpi": { en: "18%", ar: "١٨٪" },
  "about.ai.kpiLabel": { en: "Misdiagnosis Reduction", ar: "تقليل التشخيص الخاطئ" },
  "about.ai.desc": {
    en: "Engineered supervised ML pipelines with scikit-learn to forecast patient recovery trajectories — enabling data-driven triage that accelerated recovery identification by 22%.",
    ar: "هندست خطوط أنابيب تعلم آلي مُشرَف باستخدام scikit-learn للتنبؤ بمسارات تعافي المرضى — مما أتاح فرزاً مبنياً على البيانات سرّع تحديد التعافي بنسبة ٢٢٪."
  },
  "about.data.title": { en: "Business Intelligence", ar: "ذكاء الأعمال" },
  "about.data.kpi": { en: "20+hrs", ar: "+٢٠ ساعة" },
  "about.data.kpiLabel": { en: "Saved Weekly", ar: "توفير أسبوعي" },
   "about.data.desc": {
     en: "Architected automated ETL pipelines and Power BI dashboards consolidating 5+ fragmented data sources into a unified decision hub — driving 15% operational efficiency gains.",
     ar: "صممت خطوط أنابيب ETL آلية ولوحات Power BI تجمع أكثر من ٥ مصادر بيانات مجزأة في مركز قرارات موحد — محققةً تحسين كفاءة تشغيلية بنسبة ١٥٪."
   },

   // Impact Strip
   "impact.patients": { en: "Patients Managed", ar: "مرضى مُدارة" },
   "impact.patientsDesc": { en: "Cases annually", ar: "حالة سنوية" },
   "impact.recovery": { en: "Faster Recovery", ar: "تعافي أسرع" },
   "impact.recoveryDesc": { en: "Acceleration", ar: "التسريع" },
   "impact.efficiency": { en: "Efficiency Gain", ar: "تحسن الكفاءة" },
   "impact.efficiencyDesc": { en: "Operational boost", ar: "دفعة تشغيلية" },
   "impact.hours": { en: "Hours Saved", ar: "ساعات موفرة" },
   "impact.hoursDesc": { en: "Per week", ar: "كل أسبوع" },

   // Experience
  "exp.label": { en: "Experience", ar: "الخبرات" },
  "exp.title1": { en: "Professional", ar: "المسيرة" },
  "exp.title2": { en: "Journey", ar: "المهنية" },
  "exp.challenge": { en: "Challenge:", ar: "التحدي:" },
  "exp.solution": { en: "Action:", ar: "الإجراء:" },
  "exp.impact": { en: "Result:", ar: "النتيجة:" },

  "exp.0.role": { en: "Data Analyst", ar: "محلل بيانات" },
  "exp.0.company": { en: "Digilians, MTC & MCIT", ar: "ديجيليانز، MTC ووزارة الاتصالات" },
  "exp.0.period": { en: "Nov 2025 – Present", ar: "نوفمبر ٢٠٢٥ – حتى الآن" },
  "exp.0.challenge": {
    en: "Manual healthcare reporting consumed 20+ hrs/week; data scattered across 5+ siloed sources with zero unified visibility.",
    ar: "التقارير الصحية اليدوية استهلكت أكثر من ٢٠ ساعة أسبوعياً؛ البيانات مبعثرة عبر أكثر من ٥ مصادر معزولة بدون رؤية موحدة."
  },
  "exp.0.solution": {
    en: "Spearheaded Python & SQL automation pipelines; architected predictive ML models with scikit-learn; designed interactive Power BI dashboards for executive decision-making.",
    ar: "قدت خطوط أتمتة بـ Python وSQL؛ صممت نماذج تعلم آلي تنبؤية باستخدام scikit-learn؛ أنشأت لوحات Power BI تفاعلية لصنع القرار التنفيذي."
  },
  "exp.0.impact": {
    en: "Delivered 15% efficiency gain, 22% faster recovery identification, and consolidated 5+ data sources into a single source of truth.",
    ar: "حققت تحسين كفاءة بنسبة ١٥٪، وتحديد تعافٍ أسرع بنسبة ٢٢٪، ودمج أكثر من ٥ مصادر بيانات في مصدر حقيقة واحد."
  },

  "exp.1.role": { en: "Senior Physical Therapist", ar: "أخصائي علاج طبيعي أول" },
  "exp.1.company": { en: "Ministry of Health & Population", ar: "وزارة الصحة والسكان" },
  "exp.1.period": { en: "Sep 2020 – Present", ar: "سبتمبر ٢٠٢٠ – حتى الآن" },
  "exp.1.challenge": {
    en: "Managing 300+ patient cases/year while maintaining individualized, evidence-based care quality under high-volume pressure.",
    ar: "إدارة أكثر من ٣٠٠ حالة مريض سنوياً مع الحفاظ على جودة رعاية فردية مبنية على الأدلة تحت ضغط أعداد كبيرة."
  },
  "exp.1.solution": {
    en: "Championed structured treatment protocols with measurable milestone tracking; mentored junior therapists on evidence-based methodologies.",
    ar: "قدت بروتوكولات علاجية منظمة مع تتبع مراحل قابلة للقياس؛ وجّهت المعالجين المبتدئين على المنهجيات المبنية على الأدلة."
  },
  "exp.1.impact": {
    en: "Achieved 95%+ patient satisfaction rate; reduced average recovery timelines through standardized, data-informed care pathways.",
    ar: "حققت معدل رضا مرضى +٩٥٪؛ قللت متوسط فترات التعافي من خلال مسارات رعاية موحدة ومبنية على البيانات."
  },

  "exp.2.role": { en: "Sports Rehabilitation Specialist", ar: "أخصائي تأهيل رياضي" },
  "exp.2.company": { en: "N.E.C for Physical Therapy", ar: "مركز N.E.C للعلاج الطبيعي" },
  "exp.2.period": { en: "Sep 2021 – Apr 2023", ar: "سبتمبر ٢٠٢١ – أبريل ٢٠٢٣" },
  "exp.2.challenge": {
    en: "Athletes demanded accelerated return-to-play without compromising long-term musculoskeletal health.",
    ar: "طالب الرياضيون بعودة سريعة للملاعب دون المساس بصحة الجهاز العضلي الهيكلي طويلة المدى."
  },
  "exp.2.solution": {
    en: "Designed phased recovery programs with performance benchmarking at each milestone; introduced data-driven outcome tracking for treatment optimization.",
    ar: "صممت برامج تعافٍ مرحلية مع قياس الأداء عند كل مرحلة؛ أدخلت تتبع النتائج المبني على البيانات لتحسين العلاج."
  },
  "exp.2.impact": {
    en: "Shortened return-to-play timelines significantly through evidence-based, milestone-driven rehabilitation protocols.",
    ar: "قللت فترات العودة للملاعب بشكل ملحوظ من خلال بروتوكولات تأهيل مبنية على الأدلة ومدفوعة بالمراحل."
  },

  "exp.3.role": { en: "Pediatric Habilitation Therapist", ar: "أخصائي تأهيل أطفال" },
  "exp.3.company": { en: "Nour Elhayat Oasis", ar: "واحة نور الحياة" },
  "exp.3.period": { en: "May 2020 – Mar 2021", ar: "مايو ٢٠٢٠ – مارس ٢٠٢١" },
  "exp.3.challenge": {
    en: "Children with cerebral palsy lacked consistent developmental progress tracking, limiting intervention precision.",
    ar: "أطفال الشلل الدماغي يفتقرون لتتبع متسق لتقدمهم التنموي، مما حدّ من دقة التدخلات."
  },
  "exp.3.solution": {
    en: "Established measurable developmental KPIs for each child; implemented structured habilitation programs with family-centered care coordination.",
    ar: "وضعت مؤشرات أداء تنموية قابلة للقياس لكل طفل؛ طبّقت برامج تأهيل منظمة مع تنسيق رعاية يركز على الأسرة."
  },
  "exp.3.impact": {
    en: "Improved developmental milestone tracking accuracy, enabling earlier detection and more targeted therapeutic interventions.",
    ar: "حسّنت دقة تتبع المراحل التنموية، مما أتاح اكتشافاً أبكر وتدخلات علاجية أكثر استهدافاً."
  },

  // Education
  "edu.label": { en: "Education", ar: "التعليم" },
  "edu.title1": { en: "Academic", ar: "الخلفية" },
  "edu.title2": { en: "Foundation", ar: "الأكاديمية" },

  "edu.0.degree": { en: "B.Sc. Physical Therapy & Rehabilitation Sciences", ar: "بكالوريوس العلاج الطبيعي وعلوم التأهيل" },
  "edu.0.institution": { en: "Kafr El-Sheikh University", ar: "جامعة كفر الشيخ" },
  "edu.0.period": { en: "Aug 2015 – Sep 2020", ar: "أغسطس ٢٠١٥ – سبتمبر ٢٠٢٠" },
  "edu.0.details": {
    en: "Rigorous coursework in physical medicine, biomechanics, and rehabilitation sciences. Thesis on AI applications in mechatronics and therapy — establishing the analytical foundation for a data-driven clinical career.",
    ar: "دراسة مكثفة في الطب الطبيعي والميكانيكا الحيوية وعلوم التأهيل. أطروحة حول تطبيقات الذكاء الاصطناعي في الميكاترونيكس والعلاج — وضع الأساس التحليلي لمسيرة سريرية مبنية على البيانات."
  },

  "edu.1.degree": { en: "Professional Diploma — Applied AI & Data Analytics", ar: "دبلومة مهنية — الذكاء الاصطناعي التطبيقي وتحليل البيانات" },
  "edu.1.institution": { en: "Egyptian Military Academy", ar: "الأكاديمية العسكرية المصرية" },
  "edu.1.period": { en: "Dec 2025 – Aug 2026", ar: "ديسمبر ٢٠٢٥ – أغسطس ٢٠٢٦" },
  "edu.1.details": {
    en: "Intensive training in machine learning, Python, SQL, and healthcare AI integration. Focused on building scalable, production-ready analytical frameworks for clinical decision support systems.",
    ar: "تدريب مكثف في التعلم الآلي وPython وSQL وتكامل الذكاء الاصطناعي في الرعاية الصحية. التركيز على بناء أطر تحليلية قابلة للتوسع وجاهزة للإنتاج لأنظمة دعم القرار السريري."
  },

  // Skills
  "skills.label": { en: "Technical Arsenal", ar: "الترسانة التقنية" },
  "skills.title1": { en: "Capabilities &", ar: "القدرات و" },
  "skills.title2": { en: "Credentials", ar: "الاعتمادات" },
  "skills.technical": { en: "Data & AI Stack", ar: "أدوات البيانات والذكاء الاصطناعي" },
  "skills.clinical": { en: "Clinical Expertise", ar: "الخبرة السريرية" },
  "skills.certifications": { en: "Certifications", ar: "الشهادات" },
  "skills.languages": { en: "Languages", ar: "اللغات" },

  // Projects
  "proj.label": { en: "Impact Portfolio", ar: "حافظة الأثر" },
  "proj.title1": { en: "Case", ar: "دراسات" },
  "proj.title2": { en: "Studies", ar: "حالة" },
  "proj.description": {
    en: "Production-grade projects where clinical domain expertise meets analytical execution — each measured by tangible KPIs and real-world impact.",
    ar: "مشاريع بمستوى إنتاجي حيث تلتقي الخبرة السريرية بالتنفيذ التحليلي — كل منها يُقاس بمؤشرات أداء ملموسة وأثر واقعي."
  },
  "proj.challenge": { en: "Challenge", ar: "التحدي" },
  "proj.solution": { en: "Solution", ar: "الحل" },
  "proj.impact": { en: "Impact", ar: "الأثر" },
  "proj.tools": { en: "Stack", ar: "الأدوات" },

  "proj.0.title": { en: "Patient Outcome Prediction Engine", ar: "محرك التنبؤ بنتائج المرضى" },
  "proj.0.tagline": { en: "ML-powered clinical decision support for smarter triage", ar: "دعم قرارات سريرية مدعوم بالتعلم الآلي لفرز أذكى" },
  "proj.0.challenge": {
    en: "Clinicians relied on subjective assessments for triage across 300+ annual cases — resulting in inconsistent recovery timelines, resource misallocation, and preventable misdiagnoses.",
    ar: "اعتمد الأطباء على التقييمات الذاتية لفرز أكثر من ٣٠٠ حالة سنوية — مما أدى إلى جداول تعافٍ غير متسقة وسوء توزيع الموارد وتشخيصات خاطئة يمكن تجنبها."
  },
  "proj.0.solution": {
    en: "Engineered a supervised ML pipeline using scikit-learn and Pandas to predict patient recovery trajectories from intake data — automating triage prioritization with reproducible, interpretable models.",
    ar: "هندست خط أنابيب تعلم آلي مُشرَف باستخدام scikit-learn وPandas للتنبؤ بمسارات تعافي المرضى من بيانات القبول — أتمتة أولويات الفرز بنماذج قابلة للتكرار والتفسير."
  },
  "proj.0.impact.0.kpi": { en: "22%", ar: "٢٢٪" },
  "proj.0.impact.0.label": { en: "Faster Recovery ID", ar: "تحديد أسرع للتعافي" },
  "proj.0.impact.1.kpi": { en: "18%", ar: "١٨٪" },
  "proj.0.impact.1.label": { en: "Misdiagnosis Reduction", ar: "تقليل التشخيص الخاطئ" },

  "proj.1.title": { en: "Healthcare Operations Dashboard", ar: "لوحة عمليات الرعاية الصحية" },
  "proj.1.tagline": { en: "Unified BI across 5+ fragmented clinical data sources", ar: "ذكاء أعمال موحد عبر أكثر من ٥ مصادر بيانات سريرية مجزأة" },
  "proj.1.challenge": {
    en: "Hospital leadership had zero real-time visibility into department performance — data siloed across spreadsheets, EMRs, and manual logs with no unified source of truth.",
    ar: "افتقرت القيادة الطبية إلى أي رؤية فورية لأداء الأقسام — البيانات معزولة عبر جداول البيانات والسجلات الطبية الإلكترونية والسجلات اليدوية بدون مصدر موحد للحقيقة."
  },
  "proj.1.solution": {
    en: "Architected an automated ETL pipeline and interactive Power BI dashboard — consolidating patient flow, staff utilization, and operational KPIs into a real-time executive decision hub.",
    ar: "صممت خط أنابيب ETL آلي ولوحة Power BI تفاعلية — دمج تدفق المرضى واستغلال الكوادر ومؤشرات الأداء التشغيلية في مركز قرارات تنفيذي فوري."
  },
  "proj.1.impact.0.kpi": { en: "15%", ar: "١٥٪" },
  "proj.1.impact.0.label": { en: "Efficiency Gain", ar: "تحسين الكفاءة" },
  "proj.1.impact.1.kpi": { en: "20+ hrs", ar: "+٢٠ ساعة" },
  "proj.1.impact.1.label": { en: "Saved Weekly", ar: "توفير أسبوعي" },

  "proj.2.title": { en: "Rehabilitation Progress Tracker", ar: "متتبع تقدم التأهيل" },
  "proj.2.tagline": { en: "Standardized KPI tracking for evidence-based therapy optimization", ar: "تتبع مؤشرات أداء موحدة لتحسين العلاج المبني على الأدلة" },
  "proj.2.challenge": {
    en: "Therapists tracked patient progress manually with inconsistent metrics — making it impossible to adjust treatment plans objectively or demonstrate outcomes to stakeholders.",
    ar: "تتبع المعالجون تقدم المرضى يدوياً بمقاييس غير متسقة — مما جعل تعديل خطط العلاج بموضوعية أو إظهار النتائج لأصحاب المصلحة أمراً مستحيلاً."
  },
  "proj.2.solution": {
    en: "Built an automated tracking system with standardized clinical KPIs and visual progress dashboards — enabling real-time, evidence-based therapy adjustments and transparent stakeholder reporting.",
    ar: "بنيت نظام تتبع آلي مع مؤشرات أداء سريرية موحدة ولوحات تقدم بصرية — مما أتاح تعديلات علاجية فورية مبنية على الأدلة وتقارير شفافة لأصحاب المصلحة."
  },
  "proj.2.impact.0.kpi": { en: "95%+", ar: "+٩٥٪" },
  "proj.2.impact.0.label": { en: "Patient Satisfaction", ar: "رضا المرضى" },
  "proj.2.impact.1.kpi": { en: "30%", ar: "٣٠٪" },
  "proj.2.impact.1.label": { en: "Faster Adjustments", ar: "تعديلات أسرع" },

  // Contact
  "contact.label": { en: "Get In Touch", ar: "تواصل معي" },
  "contact.title1": { en: "Let's", ar: "لنبقَ" },
  "contact.title2": { en: "Connect", ar: "على تواصل" },
  "contact.description": {
    en: "Seeking a data analyst who understands healthcare from the inside out? Let's explore how clinical insight and analytical execution can create measurable impact for your organization.",
    ar: "تبحث عن محلل بيانات يفهم الرعاية الصحية من الداخل؟ لنستكشف كيف يمكن للرؤية السريرية والتنفيذ التحليلي أن يصنعا أثراً قابلاً للقياس لمؤسستك."
  },
  "contact.email": { en: "Email Me", ar: "راسلني" },
  "contact.call": { en: "Call", ar: "اتصل" },
  "contact.fun": { en: "When I'm not in the clinic or coding, I write poetry.", ar: "عندما لا أكون في العيادة أو أبرمج، أكتب الشعر." },

  // Footer
  "footer.cta": { en: "Let's Build Something Great", ar: "لنبنِ شيئاً عظيماً" },
  "footer.cta.sub": { en: "Ready to turn healthcare data into actionable intelligence? Let's talk.", ar: "مستعد لتحويل بيانات الرعاية الصحية إلى ذكاء قابل للتنفيذ؟ لنتحدث." },
  "footer.rights": { en: "© 2026 Mohamed Mahmoud Seliem. All rights reserved.", ar: "© ٢٠٢٦ محمد محمود سليم. جميع الحقوق محفوظة." },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "en";
    }
    return "en";
  });

  const isRTL = lang === "ar";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
