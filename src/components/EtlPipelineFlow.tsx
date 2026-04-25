import { motion } from "framer-motion";
import { Database, Filter, BrainCircuit, Sparkles } from "lucide-react";

/**
 * Animated ETL pipeline visualization.
 * Pure SVG + CSS — no Three.js. Particles flow along the path between stages.
 * Theme-aware via design tokens.
 */
const stages = [
  { icon: Database, label: "Source", sub: "SQL · CSV · APIs", color: "hsl(var(--primary))" },
  { icon: Filter, label: "Transform", sub: "Clean · Join · Shape", color: "hsl(var(--gold))" },
  { icon: BrainCircuit, label: "Model", sub: "ML · Statistics", color: "hsl(var(--coral))" },
  { icon: Sparkles, label: "Insight", sub: "Dashboards · Decisions", color: "hsl(var(--soft-green))" },
];

const EtlPipelineFlow = () => {
  return (
    <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 overflow-hidden"
         style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-heading tracking-[0.3em] uppercase text-primary mb-1">Live Data Pipeline</p>
          <h4 className="text-lg md:text-xl font-heading font-bold text-foreground">From raw data to clear decisions</h4>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-wider text-muted-foreground px-2.5 py-1 rounded-full border border-border bg-secondary/60">
          <span className="w-1.5 h-1.5 rounded-full bg-soft-green animate-pulse" />
          Streaming
        </span>
      </div>

      {/* SVG flow */}
      <div className="relative w-full">
        <svg viewBox="0 0 800 140" className="w-full h-[140px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="etlLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--soft-green))" stopOpacity="0.6" />
            </linearGradient>
            <filter id="etlGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wavy flowing path through 4 nodes (x: 100, 300, 500, 700) */}
          <path
            id="etlPath"
            d="M 100 70 C 200 30, 250 110, 300 70 S 450 30, 500 70 S 650 110, 700 70"
            stroke="url(#etlLine)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Animated bright pulse overlay along the same path */}
          <path
            d="M 100 70 C 200 30, 250 110, 300 70 S 450 30, 500 70 S 650 110, 700 70"
            stroke="url(#etlLine)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="40 600"
            filter="url(#etlGlow)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-640" dur="6s" repeatCount="indefinite" />
          </path>

          {/* Particles riding the path */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} r="3.5" fill="hsl(var(--primary))" filter="url(#etlGlow)">
              <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 1.2}s`}>
                <mpath href="#etlPath" />
              </animateMotion>
              <animate attributeName="fill" values="hsl(var(--primary));hsl(var(--gold));hsl(var(--coral));hsl(var(--soft-green))" dur="6s" repeatCount="indefinite" begin={`${i * 1.2}s`} />
            </circle>
          ))}

          {/* Node circles */}
          {stages.map((s, i) => {
            const cx = 100 + i * 200;
            return (
              <g key={s.label}>
                <circle cx={cx} cy="70" r="14" fill="hsl(var(--card))" stroke={s.color} strokeWidth="2" filter="url(#etlGlow)" />
                <circle cx={cx} cy="70" r="4" fill={s.color}>
                  <animate attributeName="r" values="3;6;3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                  <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Stage labels (HTML overlay so we get proper icons + responsive text) */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 border"
                style={{ background: `${s.color.replace("hsl(", "hsla(").replace(")", ", 0.1)")}`, borderColor: `${s.color.replace("hsl(", "hsla(").replace(")", ", 0.3)")}` }}
              >
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-xs md:text-sm font-heading font-semibold text-foreground leading-tight">{s.label}</p>
              <p className="text-[10px] md:text-[11px] text-muted-foreground leading-tight mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EtlPipelineFlow;
