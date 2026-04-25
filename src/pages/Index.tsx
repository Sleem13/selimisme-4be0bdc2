import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import StorySection from "@/components/StorySection";
import ChallengeSolutionSection from "@/components/ChallengeSolutionSection";
import ServicesSection from "@/components/ServicesSection";
import HowIWorkSection from "@/components/HowIWorkSection";
import ImpactStripSection from "@/components/ImpactStripSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import CareerTimeline from "@/components/CareerTimeline";
import AIChatbot from "@/components/AIChatbot";
import GalaxyEffects from "@/components/GalaxyEffects";
import DataAnalyticsBackground from "@/components/DataAnalyticsBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [isGalaxy, setIsGalaxy] = useState(false);

  useEffect(() => {
    const check = () => setIsGalaxy(document.documentElement.classList.contains("galaxy"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen relative" style={{ scrollBehavior: "smooth" }}>
      <DataAnalyticsBackground />
      {isGalaxy && <GalaxyEffects />}
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StorySection />
      <ChallengeSolutionSection />
      <ServicesSection />
      <HowIWorkSection />
      <ImpactStripSection />
      <AboutSection />
      <ExperienceSection />
      <CareerTimeline />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="relative bg-card border-t border-border">
        {/* CTA band */}
        <div className="relative z-10 py-20 md:py-24 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight font-heading"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="gradient-text">{t("footer.cta")}</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t("footer.cta.sub")}
            </motion.p>

            <motion.a
              href="mailto:muhammadsleem03@gmail.com"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-semibold bg-primary text-primary-foreground transition-all duration-300 hover:shadow-lg"
              style={{ boxShadow: "var(--shadow-glow)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {t("contact.email")}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Footer body */}
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-2xl font-heading font-bold gradient-text mb-3">Muhammad Seliem</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Analytics · AI · Healthcare — turning chaos into clarity through data.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.25em] text-muted-foreground mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.25em] text-muted-foreground mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:muhammadsleem03@gmail.com" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  muhammadsleem03@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+201020754883" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  +20 102 075 4883
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sleemisme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4 text-primary" />
                  /in/sleemisme
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Muhammad Seliem. All rights reserved.</p>
            <p>Built with care · Analytics × AI × Healthcare</p>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  );
};

export default Index;
