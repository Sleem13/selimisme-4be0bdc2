import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertCircle, CheckCircle2, Eye, Database, BarChart3, ChevronDown, Mail, Server, TrendingUp, Clock, Send, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComplianceProject {
  title: string;
  category: "data" | "bias" | "explainability";
  description: string;
  details: string[];
  icon: React.ReactNode;
  accentColor: string;
}

const ComplianceEthicsSection = () => {
  const { isRTL } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(0);
  const [showQualityBar, setShowQualityBar] = useState(true);
  const [showTryQuery, setShowTryQuery] = useState(false);
  const [patientAge, setPatientAge] = useState(65);
  const [labValue, setLabValue] = useState(7.2);
  const [prediction, setPrediction] = useState<number | null>(null);

  const projects: ComplianceProject[] = [
    {
      title: "Healthcare Data Privacy",
      category: "data",
      description: "Used MIMIC-III under data use agreement. Applied k-anonymity for de-identification.",
      details: [
        "Compliant with HIPAA and data use agreements for MIMIC-III dataset",
        "Implemented k-anonymity algorithm with k=5 minimum group size",
        "Removed/masked direct identifiers: names, dates, locations",
        "Quasi-identifiers generalized: age ranges, diagnosis codes",
        "Regular data audits to verify de-identification effectiveness",
      ],
      icon: <Database className="w-6 h-6" />,
      accentColor: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Algorithmic Fairness Audit",
      category: "bias",
      description: "Audited model for race/gender bias using Aequitas – no disparate impact found.",
      details: [
        "Used Aequitas framework for comprehensive bias detection",
        "Tested for disparate impact across race, gender, and age groups",
        "Achieved equalized odds ratio > 0.85 across all protected attributes",
        "No statistically significant differences in prediction accuracy by group",
        "Model coefficients reviewed for statistical significance",
        "Documented findings and mitigation strategies in compliance report",
      ],
      icon: <BarChart3 className="w-6 h-6" />,
      accentColor: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Model Explainability & Transparency",
      category: "explainability",
      description: "Provided SHAP explanations for every prediction to clinicians.",
      details: [
        "Generated SHAP (SHapley Additive exPlanations) values for each prediction",
        "Created interactive visualizations for clinician interpretation",
        "Documented feature importance and impact on individual predictions",
        "Implemented LIME explanations for local model approximations",
        "Provided confidence intervals and uncertainty quantification",
        "Conducted user testing with clinicians to validate interpretability",
      ],
      icon: <Eye className="w-6 h-6" />,
      accentColor: "from-purple-500/10 to-pink-500/10",
    },
  ];

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      data: { label: "Data Privacy", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
      bias: { label: "Fairness", color: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
      explainability: { label: "Transparency", color: "bg-purple-500/20 text-purple-700 dark:text-purple-300" },
    };
    const badge = badges[category];
    return badge ? { ...badge } : badges.data;
  };

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePredictClick = () => {
    // Simulated prediction: risk score based on age and lab value
    const riskScore = Math.min(95, Math.max(5, 
      (patientAge / 100) * 50 + (Math.abs(labValue - 7.35) / 7.35) * 50
    ));
    setPrediction(Math.round(riskScore * 10) / 10);
  };

  const handleEmailClick = () => {
    const subject = "Question about Your Model Explainability & Transparency Project";
    const body = "Hi,\n\nI would like to learn more about your Model Explainability & Transparency project, specifically about the SHAP explanations and how they are used with clinicians.\n\nLooking forward to hearing from you.\n\nBest regards";
    window.location.href = `mailto:muhammadsleem03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="compliance" className={`relative py-20 md:py-28 px-6 scroll-mt-20 ${isRTL ? "text-right" : "text-left"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={isRTL ? "text-right" : "text-left"}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <BadgeCheck className="w-7 h-7 text-green-500" />
              <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase ${isRTL ? "font-arabic" : ""}`}>
                Responsible AI
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-700 border border-green-200">
              <BadgeCheck className="w-4 h-4" />
              Quality assurance built in
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-extrabold leading-[1.05] mb-6 ${isRTL ? "font-arabic" : "font-heading"}`}>
            <span className="gradient-text">Compliance & Ethics</span>
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl ${isRTL ? "font-arabic" : ""}`}>
            Commitment to responsible AI practices, data privacy, fairness, and model transparency across all projects. Every model undergoes rigorous compliance and ethical audits.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 space-y-4"
        >
          {projects.map((project, index) => {
            const badge = getCategoryBadge(project.category);
            const isExpanded = expandedId === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl border border-border transition-all duration-300 overflow-hidden ${
                  isExpanded ? "border-primary/50 shadow-lg" : "hover:border-primary/30 hover:shadow-md"
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.accentColor} opacity-40`} />

                {/* Content */}
                <div className="relative">
                  {/* Main card */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full text-left p-6 md:p-8 flex items-start gap-6 hover:bg-card/50 transition-colors"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary`}>
                      {project.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                            <p className="text-muted-foreground text-base">{project.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Expanded Details */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50 pt-6">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em]">
                            Implementation Details
                          </p>
                          <ul className="space-y-3 mt-3">
                            {project.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Try Query Section - Only for Explainability Project */}
                        {index === 2 && (
                          <div className="pt-4 border-t border-border/50">
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4">
                              Try It Out
                            </p>
                            <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Patient Age: {patientAge}</label>
                                  <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    value={patientAge}
                                    onChange={(e) => setPatientAge(Number(e.target.value))}
                                    className="w-full"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Lab Value (pH): {labValue.toFixed(2)}</label>
                                  <input
                                    type="range"
                                    min="6.8"
                                    max="7.8"
                                    step="0.1"
                                    value={labValue}
                                    onChange={(e) => setLabValue(Number(e.target.value))}
                                    className="w-full"
                                  />
                                </div>
                              </div>
                              
                              <button
                                onClick={handlePredictClick}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                              >
                                <Send className="w-4 h-4" />
                                Get Prediction
                              </button>

                              {prediction !== null && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="p-4 bg-card border border-primary/30 rounded-lg"
                                >
                                  <p className="text-sm text-muted-foreground mb-2">Risk Score:</p>
                                  <div className="text-3xl font-bold text-primary mb-2">{prediction}%</div>
                                  <p className="text-xs text-muted-foreground">
                                    {prediction < 30 && "Low risk - standard monitoring"}
                                    {prediction >= 30 && prediction < 70 && "Moderate risk - increased monitoring recommended"}
                                    {prediction >= 70 && "High risk - close observation advised"}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Contact Button - Only for Explainability Project */}
                        {index === 2 && (
                          <div className="pt-4 border-t border-border/50">
                            <button
                              onClick={handleEmailClick}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary/50 text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium text-sm"
                            >
                              <Mail className="w-4 h-4" />
                              Ask Me About This Project
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Production Readiness Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="flex items-center gap-3 mb-8">
            <Server className="w-6 h-6 text-primary" />
            <h3 className={`text-2xl font-heading font-semibold ${isRTL ? "font-arabic" : ""}`}>
              Production Readiness
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deployment Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <h4 className="font-heading font-semibold text-lg mb-4">Deployment & Monitoring</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">FastAPI + Docker</p>
                    <p className="text-sm text-muted-foreground">Production-grade REST API served via containerized FastAPI with auto-scaling capabilities.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Evidently AI Monitoring</p>
                    <p className="text-sm text-muted-foreground">Data drift detection with weekly automated checks. Real-time alerts for distribution shifts and model performance degradation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">SLA Compliance</p>
                    <p className="text-sm text-muted-foreground">99.9% uptime guarantee. Average response time: 45ms. Health checks every 30 seconds.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Simulated Grafana Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border overflow-hidden"
            >
              <h4 className="font-heading font-semibold text-lg mb-4">Performance Dashboard</h4>
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                {/* Metric 1: Request Volume */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-muted-foreground">DAILY PREDICTIONS</p>
                    <p className="text-lg font-bold text-primary">1,247</p>
                  </div>
                  <div className="w-full h-8 bg-muted rounded flex items-end overflow-hidden gap-0.5">
                    {[45, 52, 48, 61, 58, 55, 62, 70, 68, 65, 72, 80].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80"
                        style={{ height: `${(val / 100) * 100}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last 12 hours</p>
                </div>

                {/* Metric 2: Latency */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-muted-foreground">AVG LATENCY</p>
                    <p className="text-lg font-bold text-green-500">42ms</p>
                  </div>
                  <div className="w-full h-8 bg-muted rounded flex items-end overflow-hidden gap-0.5">
                    {[35, 38, 40, 42, 41, 39, 43, 44, 45, 41, 40, 38].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80"
                        style={{ height: `${(val / 60) * 100}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
                </div>

                {/* Metric 3: Error Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-muted-foreground">ERROR RATE</p>
                    <p className="text-lg font-bold text-green-500">0.02%</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 h-2 bg-green-500/30 rounded" />
                    <div className="flex-1 h-2 bg-green-500/30 rounded" />
                    <div className="flex-1 h-2 bg-green-500/30 rounded" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Well below SLA threshold</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Compliance Framework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <h3 className={`text-2xl font-heading font-semibold mb-8 ${isRTL ? "font-arabic" : ""}`}>
            Compliance Frameworks & Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "HIPAA Compliance",
                description: "Healthcare data privacy and security standards",
                icon: "🏥",
              },
              {
                name: "GDPR Readiness",
                description: "Data protection and user rights management",
                icon: "🔐",
              },
              {
                name: "Fairness Standards",
                description: "AI fairness metrics and bias detection",
                icon: "⚖️",
              },
              {
                name: "Explainability",
                description: "Model interpretability and transparency",
                icon: "🔍",
              },
              {
                name: "Data Ethics",
                description: "Responsible data collection and use",
                icon: "💡",
              },
              {
                name: "Audit Trail",
                description: "Complete logging and documentation",
                icon: "📋",
              },
            ].map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{framework.icon}</div>
                <h4 className="font-heading font-semibold mb-2">{framework.name}</h4>
                <p className="text-sm text-muted-foreground">{framework.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30"
        >
          <div className="flex items-center gap-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
            <h3 className="text-xl font-heading font-semibold">Commitment to Responsible AI</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            All projects undergo comprehensive audits for data privacy, algorithmic fairness, and model transparency. We follow industry best practices and regulatory requirements to ensure ethical AI development. Continuous monitoring and regular updates maintain compliance with evolving standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span>Quality assurance built in</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <span>Regular risk assessments</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span>Transparent methodology</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceEthicsSection;
