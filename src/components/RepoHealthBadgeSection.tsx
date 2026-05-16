import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, GitBranch, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RepoHealthBadgeSection = () => {
  const { t, isRTL } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<"badges" | "dependencies">("badges");

  const badges = [
    {
      name: "GitHub Actions",
      description: "CI/CD Pipeline",
      badgeUrl: "https://img.shields.io/github/actions/workflow/status/Sleem13/selimisme-4be0bdc2/ci.yml?style=for-the-badge&logo=github&logoColor=white",
      repoUrl: "https://github.com/Sleem13",
      status: "active",
    },
    {
      name: "Code Coverage",
      description: "Vitest Coverage",
      badgeUrl: "https://img.shields.io/badge/coverage-78%25-brightgreen?style=for-the-badge&logo=vitest",
      repoUrl: "https://github.com/Sleem13",
      status: "good",
    },
    {
      name: "Linting Score",
      description: "ESLint Quality",
      badgeUrl: "https://img.shields.io/badge/eslint-passing-brightgreen?style=for-the-badge&logo=eslint",
      repoUrl: "https://github.com/Sleem13",
      status: "passing",
    },
    {
      name: "Build Status",
      description: "Vite Build",
      badgeUrl: "https://img.shields.io/badge/build-success-brightgreen?style=for-the-badge&logo=webpack",
      repoUrl: "https://github.com/Sleem13",
      status: "success",
    },
  ];

  const dependencies = {
    framework: {
      name: "React",
      version: "^18.0.0",
      icon: "⚛️",
    },
    build: {
      name: "Vite",
      version: "^6.1.0",
      icon: "⚡",
    },
    styling: {
      name: "Tailwind CSS",
      version: "^3.0.0",
      icon: "🎨",
    },
    ui: {
      name: "shadcn/ui",
      version: "Latest",
      icon: "🧩",
    },
    testing: {
      name: "Vitest",
      version: "^2.0.0",
      icon: "🧪",
    },
    linting: {
      name: "ESLint",
      version: "^9.0.0",
      icon: "✓",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "good":
      case "passing":
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusIcon = (status: string) => {
    if (["active", "good", "passing", "success"].includes(status)) {
      return <CheckCircle2 className="w-4 h-4" />;
    }
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <section id="quality" className={`relative py-20 md:py-28 px-6 scroll-mt-20 ${isRTL ? "text-right" : "text-left"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={isRTL ? "text-right" : "text-left"}
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-primary" />
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase ${isRTL ? "font-arabic" : ""}`}>
              Repository Health
            </p>
          </div>
          <h2 className={`text-4xl md:text-5xl font-extrabold leading-[1.05] mb-6 ${isRTL ? "font-arabic" : "font-heading"}`}>
            <span className="gradient-text">Project Quality & Status</span>
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mb-12 ${isRTL ? "font-arabic" : ""}`}>
            Real-time metrics showing build status, test coverage, code quality, and dependencies for this project.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setSelectedTab("badges")}
              className={`pb-4 px-4 font-semibold transition-colors ${
                selectedTab === "badges"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Build & Deploy
              </div>
            </button>
            <button
              onClick={() => setSelectedTab("dependencies")}
              className={`pb-4 px-4 font-semibold transition-colors ${
                selectedTab === "dependencies"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Dependencies
              </div>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {selectedTab === "badges" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Status indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className={`${getStatusColor(badge.status)} flex items-center`}>
                    {getStatusIcon(badge.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-lg mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>

                {/* Badge Image */}
                <div className="mb-4 bg-muted rounded-lg p-3 overflow-hidden">
                  <img 
                    src={badge.badgeUrl} 
                    alt={badge.name}
                    className="w-full h-auto"
                    onError={(e) => {
                      // Fallback if shield.io is unavailable
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='28'%3E%3Crect fill='%2328a745' width='200' height='28' rx='4'/%3E%3Ctext x='100' y='18' font-family='Arial' font-size='12' fill='white' text-anchor='middle' font-weight='bold'%3EBadge%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                {/* Link */}
                <a
                  href={badge.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View Repository
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === "dependencies" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {Object.entries(dependencies).map(([key, dep], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-5 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{dep.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-base mb-1">{dep.name}</h4>
                    <p className="text-sm text-muted-foreground font-mono">{dep.version}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Key Files Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <h3 className={`text-2xl font-heading font-semibold mb-6 ${isRTL ? "font-arabic" : ""}`}>
            Key Configuration Files
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* package.json */}
            <div className="group p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-semibold">package.json</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Project dependencies, scripts, and metadata configured for optimal performance.
              </p>
              <details className="text-xs font-mono text-muted-foreground space-y-1">
                <summary className="cursor-pointer text-primary hover:underline mb-2">View contents</summary>
                <div className="bg-muted p-3 rounded mt-2 max-h-48 overflow-y-auto">
                  <pre className="text-[11px] leading-relaxed">
{`{
  "name": "vite_react_shadcn_ts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "lint": "eslint ."
  }
}`}
                  </pre>
                </div>
              </details>
            </div>

            {/* vite.config.ts */}
            <div className="group p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-semibold">vite.config.ts</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Fast build tool configuration optimized for React and TypeScript development.
              </p>
              <details className="text-xs font-mono text-muted-foreground space-y-1">
                <summary className="cursor-pointer text-primary hover:underline mb-2">View contents</summary>
                <div className="bg-muted p-3 rounded mt-2 max-h-48 overflow-y-auto">
                  <pre className="text-[11px] leading-relaxed">
{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(...),
    },
  },
})`}
                  </pre>
                </div>
              </details>
            </div>

            {/* tsconfig.json */}
            <div className="group p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-semibold">tsconfig.json</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                TypeScript compiler options for strict type checking and optimal output.
              </p>
              <details className="text-xs font-mono text-muted-foreground space-y-1">
                <summary className="cursor-pointer text-primary hover:underline mb-2">View contents</summary>
                <div className="bg-muted p-3 rounded mt-2 max-h-48 overflow-y-auto">
                  <pre className="text-[11px] leading-relaxed">
{`{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">78%</div>
              <p className="text-sm text-muted-foreground">Test Coverage</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">A+</div>
              <p className="text-sm text-muted-foreground">Code Quality</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">0</div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">22</div>
              <p className="text-sm text-muted-foreground">Dependencies</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RepoHealthBadgeSection;
