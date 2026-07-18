import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactStripSection from "@/components/ImpactStripSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CustomCursor from "@/components/CustomCursor";
import DataAnalyticsBackground from "@/components/DataAnalyticsBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, MapPin } from "lucide-react";

const GitHubReposSection = lazy(() => import("@/components/GitHubReposSection"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

const Index = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div
      className="bg-background text-foreground min-h-screen relative"
      style={{ scrollBehavior: "smooth" }}
    >
      <DataAnalyticsBackground />
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <ImpactStripSection />
      <ProjectsSection />
      <Suspense fallback={null}>
        <GitHubReposSection />
      </Suspense>
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />


      {/* Footer */}
      <footer className="relative bg-card border-t border-border">
        {/* CTA band */}
        <div
          id="contact"
          className="relative z-10 py-20 md:py-28 px-6 border-b border-border scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: headline + subcopy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRTL ? "text-right" : "text-left"}
            >
              <p
                className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4 ${isRTL ? "font-arabic" : ""}`}
              >
                {t("nav.contact")}
              </p>
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5 ${isRTL ? "font-arabic" : "font-heading"}`}
              >
                <span className="gradient-text">{t("footer.cta")}</span>
              </h2>
              <p
                className={`text-muted-foreground text-base md:text-lg max-w-xl ${isRTL ? "font-arabic" : ""}`}
              >
                {t("footer.cta.sub")}
              </p>
            </motion.div>

            {/* Right: action card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl bg-card border border-border p-7 md:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <a
                href="mailto:muhammadsleem03@gmail.com"
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <span className="flex items-center gap-3 font-heading font-semibold">
                  <Mail className="w-5 h-5" />
                  muhammadsleem03@gmail.com
                </span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <a
                  href="https://www.linkedin.com/in/sleemisme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-secondary border border-border hover:border-primary/40 transition-all"
                >
                  <span className="flex items-center gap-2 text-sm text-foreground/90 font-medium">
                    <Linkedin className="w-4 h-4 text-primary" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Cairo, Egypt
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                Typically replies within 24 hours · Open to remote & hybrid
                roles
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer body */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="text-2xl font-heading font-bold gradient-text mb-3">
              Muhammad Seliem
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-5">
              Analytics · AI · Healthcare — turning chaos into clarity through
              data.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="mailto:muhammadsleem03@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/40 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sleemisme"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/40 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <p className="text-xs font-heading uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach */}
          <div className="md:col-span-4">
            <p className="text-xs font-heading uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Reach
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:muhammadsleem03@gmail.com"
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  muhammadsleem03@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Cairo, Egypt
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open to opportunities
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            {/* Copyright */}
            <p className="text-center md:text-left">
              {t("footer.rights").replace(
                "{year}",
                String(new Date().getFullYear()),
              )}
            </p>

            {/* Location + contact links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {t("footer.location")}
              </span>
              <a
                href={`mailto:${t("footer.email")}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                {t("footer.email")}
              </a>
              <a
                href="https://www.linkedin.com/in/sleemisme"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-primary" />
                LinkedIn
              </a>
            </div>

            {/* Tagline */}
            <p className="text-center md:text-right font-medium">
              {t("footer.tagline")}
            </p>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
