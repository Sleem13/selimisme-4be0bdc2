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
  "nav.experience": { en: "Experience", ar: "الخبرات" },
  "nav.education": { en: "Education", ar: "التعليم" },
  "nav.skills": { en: "Skills", ar: "المهارات" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.contact": { en: "Contact", ar: "تواصل" },

  // Hero
  "hero.tagline": { en: "Physical Therapist · AI · Data Analytics", ar: "أخصائي علاج طبيعي · ذكاء اصطناعي · تحليل بيانات" },
  "hero.name.first": { en: "Mohamed Mahmoud", ar: "محمد محمود" },
  "hero.name.last": { en: "Seliem", ar: "سليم" },
  "hero.description": {
    en: "5+ years in clinical rehabilitation · Now building ML models & data pipelines that turn healthcare complexity into measurable patient outcomes.",
    ar: "أكثر من ٥ سنوات في التأهيل السريري · أبني الآن نماذج تعلم آلي وخطوط بيانات تحوّل تعقيدات الرعاية الصحية إلى نتائج قابلة للقياس."
  },
  "hero.headline": { en: "Turning Chaos into Clarity.", ar: "أحوّل الفوضى إلى وضوح." },
  "hero.download": { en: "Download CV", ar: "تحميل السيرة الذاتية" },

  // About
  "about.label": { en: "About Me", ar: "نبذة عني" },
  "about.title1": { en: "Where", ar: "حيث" },
  "about.health": { en: "Health", ar: "الصحة" },
  "about.meets": { en: "Meets", ar: "تلتقي" },
  "about.technology": { en: "Technology", ar: "بالتكنولوجيا" },
  "about.description": {
    en: "Licensed physical therapist with 5+ years of clinical experience, now leveraging Python, SQL, and machine learning to transform healthcare delivery. I combine frontline patient empathy with analytical rigor — because better data means better care.",
    ar: "أخصائي علاج طبيعي مرخّص بخبرة تزيد عن ٥ سنوات في المجال السريري، أستثمر الآن Python وSQL والتعلم الآلي لتحويل تقديم الرعاية الصحية. أجمع بين التعاطف المباشر مع المرضى والدقة التحليلية — لأن البيانات الأفضل تعني رعاية أفضل."
  },
  "about.clinical.title": { en: "Clinical Rehabilitation", ar: "التأهيل السريري" },
  "about.clinical.kpi": { en: "95%+", ar: "+٩٥٪" },
  "about.clinical.kpiLabel": { en: "Patient Satisfaction", ar: "رضا المرضى" },
  "about.clinical.desc": {
    en: "5+ years delivering evidence-based therapy across musculoskeletal & neuromuscular cases with consistently high recovery outcomes.",
    ar: "أكثر من ٥ سنوات في تقديم العلاج المبني على الأدلة عبر حالات العضلات والأعصاب مع نتائج تعافٍ عالية باستمرار."
  },
  "about.ai.title": { en: "Healthcare AI", ar: "الذكاء الاصطناعي الصحي" },
  "about.ai.kpi": { en: "ML-Driven", ar: "مدعوم بالتعلم الآلي" },
  "about.ai.kpiLabel": { en: "Predictive Models", ar: "نماذج تنبؤية" },
  "about.ai.desc": {
    en: "Building scikit-learn models to forecast patient outcomes and enable data-driven triage — reducing misdiagnosis risk through intelligent analytics.",
    ar: "بناء نماذج scikit-learn للتنبؤ بنتائج المرضى وتمكين الفرز المبني على البيانات — تقليل مخاطر التشخيص الخاطئ عبر التحليلات الذكية."
  },
  "about.data.title": { en: "Data Analytics", ar: "تحليل البيانات" },
  "about.data.kpi": { en: "15%", ar: "١٥٪" },
  "about.data.kpiLabel": { en: "Efficiency Gain", ar: "تحسين الكفاءة" },
  "about.data.desc": {
    en: "Translating raw healthcare data into Power BI dashboards that consolidate 5+ sources for informed, real-time decision-making.",
    ar: "تحويل البيانات الصحية الخام إلى لوحات Power BI تجمع أكثر من ٥ مصادر لاتخاذ قرارات مستنيرة في الوقت الفعلي."
  },

  // Experience
  "exp.label": { en: "Experience", ar: "الخبرات" },
  "exp.title1": { en: "Professional", ar: "المسيرة" },
  "exp.title2": { en: "Journey", ar: "المهنية" },
  "exp.challenge": { en: "Challenge:", ar: "التحدي:" },
  "exp.solution": { en: "Solution:", ar: "الحل:" },
  "exp.impact": { en: "Impact:", ar: "الأثر:" },

  "exp.0.role": { en: "Data Analyst", ar: "محلل بيانات" },
  "exp.0.company": { en: "Digilians, MTC & MCIT", ar: "ديجيليانز، MTC ووزارة الاتصالات" },
  "exp.0.period": { en: "Nov 2025 – Present", ar: "نوفمبر ٢٠٢٥ – حتى الآن" },
  "exp.0.challenge": {
    en: "Manual healthcare reporting consuming 20+ hrs/week with fragmented data sources.",
    ar: "التقارير الصحية اليدوية تستهلك أكثر من ٢٠ ساعة أسبوعياً مع مصادر بيانات مجزأة."
  },
  "exp.0.solution": {
    en: "Built Python & SQL automation pipelines; designed predictive ML models with scikit-learn.",
    ar: "بناء خطوط أتمتة بـ Python وSQL؛ تصميم نماذج تعلم آلي تنبؤية باستخدام scikit-learn."
  },
  "exp.0.impact": {
    en: "15% efficiency gain, improved triage accuracy, 5+ data sources consolidated into Power BI dashboards.",
    ar: "تحسين الكفاءة بنسبة ١٥٪، تحسين دقة الفرز، دمج أكثر من ٥ مصادر بيانات في لوحات Power BI."
  },

  "exp.1.role": { en: "Physical Therapist", ar: "أخصائي علاج طبيعي" },
  "exp.1.company": { en: "Ministry of Health & Population", ar: "وزارة الصحة والسكان" },
  "exp.1.period": { en: "Sep 2020 – Present", ar: "سبتمبر ٢٠٢٠ – حتى الآن" },
  "exp.1.challenge": {
    en: "Managing high patient volumes while maintaining personalized care quality.",
    ar: "إدارة أعداد كبيرة من المرضى مع الحفاظ على جودة الرعاية الشخصية."
  },
  "exp.1.solution": {
    en: "Implemented evidence-based, structured treatment protocols with measurable milestone tracking.",
    ar: "تطبيق بروتوكولات علاجية منظمة مبنية على الأدلة مع تتبع مراحل قابلة للقياس."
  },
  "exp.1.impact": {
    en: "300+ patient cases annually, 95%+ satisfaction rate through personalized rehabilitation.",
    ar: "أكثر من ٣٠٠ حالة مريض سنوياً، معدل رضا +٩٥٪ من خلال التأهيل الشخصي."
  },

  "exp.2.role": { en: "Sports Injury Therapist", ar: "أخصائي إصابات رياضية" },
  "exp.2.company": { en: "N.E.C for Physical Therapy", ar: "مركز N.E.C للعلاج الطبيعي" },
  "exp.2.period": { en: "Sep 2021 – Apr 2023", ar: "سبتمبر ٢٠٢١ – أبريل ٢٠٢٣" },
  "exp.2.challenge": {
    en: "Athletes needed faster recovery without compromising long-term health.",
    ar: "احتاج الرياضيون إلى تعافٍ أسرع دون المساس بالصحة طويلة المدى."
  },
  "exp.2.solution": {
    en: "Designed structured recovery programs with performance benchmarking at each stage.",
    ar: "تصميم برامج تعافٍ منظمة مع قياس الأداء في كل مرحلة."
  },
  "exp.2.impact": {
    en: "Reduced return-to-play timelines through data-informed rehabilitation milestones.",
    ar: "تقليل فترات العودة للملاعب من خلال مراحل تأهيل مبنية على البيانات."
  },

  "exp.3.role": { en: "Pediatric Therapist", ar: "أخصائي علاج أطفال" },
  "exp.3.company": { en: "Nour Elhayat Oasis", ar: "واحة نور الحياة" },
  "exp.3.period": { en: "May 2020 – Mar 2021", ar: "مايو ٢٠٢٠ – مارس ٢٠٢١" },
  "exp.3.challenge": {
    en: "Children with cerebral palsy needed consistent developmental progress tracking.",
    ar: "أطفال الشلل الدماغي بحاجة لتتبع متسق لتقدمهم التنموي."
  },
  "exp.3.solution": {
    en: "Delivered habilitation services with measurable developmental KPIs for each child.",
    ar: "تقديم خدمات التأهيل مع مؤشرات أداء تنموية قابلة للقياس لكل طفل."
  },
  "exp.3.impact": {
    en: "Improved tracking of developmental milestones, enabling more targeted interventions.",
    ar: "تحسين تتبع المراحل التنموية، مما أتاح تدخلات أكثر استهدافاً."
  },

  // Education
  "edu.label": { en: "Education", ar: "التعليم" },
  "edu.title1": { en: "Academic", ar: "الخلفية" },
  "edu.title2": { en: "Background", ar: "الأكاديمية" },

  "edu.0.degree": { en: "Bachelor's Degree in Physical Therapy", ar: "بكالوريوس العلاج الطبيعي" },
  "edu.0.institution": { en: "Kafr El-Sheikh University", ar: "جامعة كفر الشيخ" },
  "edu.0.period": { en: "Aug 2015 – Sep 2020", ar: "أغسطس ٢٠١٥ – سبتمبر ٢٠٢٠" },
  "edu.0.details": {
    en: "Comprehensive coursework in physical medicine & rehabilitation sciences. Thesis on AI applications in mechatronics and therapy — laying the foundation for a data-driven clinical career.",
    ar: "دراسة شاملة في الطب الطبيعي وعلوم التأهيل. أطروحة حول تطبيقات الذكاء الاصطناعي في الميكاترونيكس والعلاج — وضع الأساس لمسيرة سريرية مبنية على البيانات."
  },

  "edu.1.degree": { en: "Diploma in Applied AI & Data Analytics", ar: "دبلومة في الذكاء الاصطناعي التطبيقي وتحليل البيانات" },
  "edu.1.institution": { en: "Egyptian Military Academy", ar: "الأكاديمية العسكرية المصرية" },
  "edu.1.period": { en: "Dec 2025 – Aug 2026", ar: "ديسمبر ٢٠٢٥ – أغسطس ٢٠٢٦" },
  "edu.1.details": {
    en: "Advanced training in ML, Python, SQL, and healthcare AI integration. Focused on building scalable, reproducible analytical frameworks for clinical decision support.",
    ar: "تدريب متقدم في التعلم الآلي وPython وSQL وتكامل الذكاء الاصطناعي في الرعاية الصحية. التركيز على بناء أطر تحليلية قابلة للتوسع وإعادة الإنتاج لدعم القرار السريري."
  },

  // Skills
  "skills.label": { en: "Skills & More", ar: "المهارات والمزيد" },
  "skills.title1": { en: "Capabilities &", ar: "القدرات و" },
  "skills.title2": { en: "Certifications", ar: "الشهادات" },
  "skills.technical": { en: "Technical", ar: "تقنية" },
  "skills.clinical": { en: "Clinical", ar: "سريرية" },
  "skills.certifications": { en: "Certifications", ar: "الشهادات" },
  "skills.languages": { en: "Languages", ar: "اللغات" },

  // Projects
  "proj.label": { en: "Projects", ar: "المشاريع" },
  "proj.title1": { en: "Case", ar: "دراسات" },
  "proj.title2": { en: "Studies", ar: "حالة" },
  "proj.description": {
    en: "Real-world projects where clinical insight meets analytical execution — each following a structured approach to measurable impact.",
    ar: "مشاريع واقعية حيث تلتقي الرؤية السريرية بالتنفيذ التحليلي — كل منها يتبع نهجاً منظماً لتحقيق أثر قابل للقياس."
  },
  "proj.challenge": { en: "Challenge", ar: "التحدي" },
  "proj.solution": { en: "Solution", ar: "الحل" },
  "proj.impact": { en: "Impact", ar: "الأثر" },
  "proj.tools": { en: "Tools", ar: "الأدوات" },

  "proj.0.title": { en: "Patient Outcome Prediction Engine", ar: "محرك التنبؤ بنتائج المرضى" },
  "proj.0.tagline": { en: "ML-powered triage for smarter clinical decisions", ar: "فرز مدعوم بالتعلم الآلي لقرارات سريرية أذكى" },
  "proj.0.challenge": {
    en: "Clinicians relied on subjective assessments for patient triage, leading to inconsistent recovery timelines and resource misallocation across 300+ annual cases.",
    ar: "اعتمد الأطباء على التقييمات الذاتية لفرز المرضى، مما أدى إلى جداول تعافٍ غير متسقة وسوء توزيع الموارد عبر أكثر من ٣٠٠ حالة سنوية."
  },
  "proj.0.solution": {
    en: "Built a supervised ML pipeline using scikit-learn to predict patient recovery trajectories from intake data — enabling data-driven triage prioritization.",
    ar: "بناء خط أنابيب تعلم آلي مُشرَف باستخدام scikit-learn للتنبؤ بمسارات تعافي المرضى من بيانات القبول — مما أتاح تحديد أولويات الفرز المبني على البيانات."
  },
  "proj.0.impact.0.kpi": { en: "22%", ar: "٢٢٪" },
  "proj.0.impact.0.label": { en: "Faster Recovery Identification", ar: "تحديد أسرع للتعافي" },
  "proj.0.impact.1.kpi": { en: "18%", ar: "١٨٪" },
  "proj.0.impact.1.label": { en: "Reduction in Misdiagnosis", ar: "انخفاض في التشخيص الخاطئ" },

  "proj.1.title": { en: "Healthcare Operations Dashboard", ar: "لوحة عمليات الرعاية الصحية" },
  "proj.1.tagline": { en: "Unified analytics across 5+ clinical data sources", ar: "تحليلات موحدة عبر أكثر من ٥ مصادر بيانات سريرية" },
  "proj.1.challenge": {
    en: "Hospital management lacked visibility into department-level performance — data was siloed across spreadsheets, EMRs, and manual logs with no single source of truth.",
    ar: "افتقرت إدارة المستشفى إلى رؤية أداء الأقسام — كانت البيانات معزولة عبر جداول البيانات والسجلات الطبية الإلكترونية والسجلات اليدوية بدون مصدر موحد للحقيقة."
  },
  "proj.1.solution": {
    en: "Designed an automated ETL pipeline and interactive Power BI dashboard consolidating patient flow, staff utilization, and KPI tracking into a real-time decision hub.",
    ar: "تصميم خط أنابيب ETL آلي ولوحة Power BI تفاعلية تجمع تدفق المرضى واستغلال الكوادر وتتبع مؤشرات الأداء في مركز قرارات فوري."
  },
  "proj.1.impact.0.kpi": { en: "15%", ar: "١٥٪" },
  "proj.1.impact.0.label": { en: "Operational Efficiency Gain", ar: "تحسين الكفاءة التشغيلية" },
  "proj.1.impact.1.kpi": { en: "20+ hrs", ar: "+٢٠ ساعة" },
  "proj.1.impact.1.label": { en: "Weekly Time Saved", ar: "توفير أسبوعي" },

  "proj.2.title": { en: "Rehabilitation Progress Tracker", ar: "متتبع تقدم التأهيل" },
  "proj.2.tagline": { en: "Data-driven therapy planning & outcome visualization", ar: "تخطيط علاجي مبني على البيانات وتصور النتائج" },
  "proj.2.challenge": {
    en: "Therapists tracked patient progress manually with inconsistent metrics, making it difficult to adjust treatment plans or demonstrate outcomes to stakeholders.",
    ar: "تتبع المعالجون تقدم المرضى يدوياً بمقاييس غير متسقة، مما صعّب تعديل خطط العلاج أو إظهار النتائج لأصحاب المصلحة."
  },
  "proj.2.solution": {
    en: "Created an automated tracking system with standardized KPIs and visual progress reports — enabling evidence-based therapy adjustments and transparent reporting.",
    ar: "إنشاء نظام تتبع آلي مع مؤشرات أداء موحدة وتقارير تقدم بصرية — مما أتاح تعديلات علاجية مبنية على الأدلة وتقارير شفافة."
  },
  "proj.2.impact.0.kpi": { en: "95%+", ar: "+٩٥٪" },
  "proj.2.impact.0.label": { en: "Patient Satisfaction", ar: "رضا المرضى" },
  "proj.2.impact.1.kpi": { en: "30%", ar: "٣٠٪" },
  "proj.2.impact.1.label": { en: "Faster Plan Adjustments", ar: "تعديلات أسرع للخطط" },

  // Contact
  "contact.label": { en: "Get In Touch", ar: "تواصل معي" },
  "contact.title1": { en: "Let's", ar: "لنبقَ" },
  "contact.title2": { en: "Connect", ar: "على تواصل" },
  "contact.description": {
    en: "Looking for someone who blends healthcare insight with data-driven thinking? I'd love to explore how we can create impact together.",
    ar: "تبحث عن شخص يجمع بين الرؤية الصحية والتفكير المبني على البيانات؟ أود أن نستكشف كيف يمكننا صنع أثرٍ معاً."
  },
  "contact.email": { en: "Email Me", ar: "راسلني" },
  "contact.call": { en: "Call", ar: "اتصل" },
  "contact.fun": { en: "When I'm not in the clinic or coding, I write poetry.", ar: "عندما لا أكون في العيادة أو أبرمج، أكتب الشعر." },

  // Footer
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
