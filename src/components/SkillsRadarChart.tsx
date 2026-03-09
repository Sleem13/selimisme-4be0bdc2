import { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface SkillDomain {
  id: string;
  labelEn: string;
  labelAr: string;
  color: string;
  skills: { nameEn: string; nameAr: string; level: number }[];
}

const domains: SkillDomain[] = [
  {
    id: "clinical",
    labelEn: "Clinical",
    labelAr: "سريري",
    color: "hsl(var(--coral))",
    skills: [
      { nameEn: "Assessment & Triage", nameAr: "التقييم والفرز", level: 95 },
      { nameEn: "Musculoskeletal Rehab", nameAr: "تأهيل عضلي هيكلي", level: 92 },
      { nameEn: "Neuromuscular Therapy", nameAr: "علاج عصبي عضلي", level: 88 },
      { nameEn: "Sports Injury", nameAr: "إصابات رياضية", level: 85 },
      { nameEn: "Patient Satisfaction", nameAr: "رضا المرضى", level: 95 },
      { nameEn: "Evidence‑Based Practice", nameAr: "ممارسة مبنية على الأدلة", level: 90 },
    ],
  },
  {
    id: "technical",
    labelEn: "Technical",
    labelAr: "تقني",
    color: "hsl(var(--primary))",
    skills: [
      { nameEn: "Python & SQL", nameAr: "Python و SQL", level: 88 },
      { nameEn: "Machine Learning", nameAr: "تعلم آلي", level: 82 },
      { nameEn: "Power BI / Tableau", nameAr: "Power BI / Tableau", level: 90 },
      { nameEn: "ETL Pipelines", nameAr: "خطوط ETL", level: 85 },
      { nameEn: "Statistical Modeling", nameAr: "نمذجة إحصائية", level: 80 },
      { nameEn: "Automation", nameAr: "الأتمتة", level: 78 },
    ],
  },
  {
    id: "analytical",
    labelEn: "Analytical",
    labelAr: "تحليلي",
    color: "hsl(var(--gold))",
    skills: [
      { nameEn: "Data Wrangling", nameAr: "معالجة البيانات", level: 90 },
      { nameEn: "Healthcare Analytics", nameAr: "تحليلات صحية", level: 92 },
      { nameEn: "KPI Dashboard Design", nameAr: "تصميم لوحات KPI", level: 88 },
      { nameEn: "Predictive Analytics", nameAr: "تحليلات تنبؤية", level: 82 },
      { nameEn: "Research & Reporting", nameAr: "بحث وتقارير", level: 86 },
      { nameEn: "Decision Modeling", nameAr: "نمذجة القرارات", level: 78 },
    ],
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.[0]) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-primary font-heading font-bold">{value}%</p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadarChart() {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";
  const [active, setActive] = useState<string>("clinical");

  const activeDomain = domains.find((d) => d.id === active)!;

  const chartData = activeDomain.skills.map((s) => ({
    name: isRTL ? s.nameAr : s.nameEn,
    value: s.level,
  }));

  return (
    <motion.div
      className="rounded-2xl bg-card border border-border p-6 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h3 className={`text-base font-semibold text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}>
          {isRTL ? "خريطة الكفاءات" : "Competency Radar"}
        </h3>
        <div className="flex gap-2">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`
                px-3 py-1.5 text-xs rounded-lg border font-medium transition-all duration-300
                ${active === d.id
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                }
                ${isRTL ? "font-arabic" : "font-heading"}
              `}
            >
              {isRTL ? d.labelAr : d.labelEn}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid
              stroke="hsl(var(--border))"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="name"
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
                fontFamily: isRTL ? "var(--font-arabic)" : "var(--font-body)",
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name={isRTL ? activeDomain.labelAr : activeDomain.labelEn}
              dataKey="value"
              stroke={activeDomain.color}
              fill={activeDomain.color}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: activeDomain.color,
                strokeWidth: 0,
              }}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend bar */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {activeDomain.skills.map((s) => (
          <div key={s.nameEn} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: activeDomain.color }}
            />
            <span className="text-xs text-muted-foreground">
              {isRTL ? s.nameAr : s.nameEn}
            </span>
            <span className="text-xs font-semibold text-foreground">{s.level}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
