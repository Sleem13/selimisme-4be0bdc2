import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactStripSection from "@/components/ImpactStripSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import AIChatbot from "@/components/AIChatbot";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Index = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen" style={{ scrollBehavior: "smooth" }}>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="relative z-10 py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight ${isRTL ? 'font-arabic' : 'font-heading'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="gradient-text">{t("footer.cta")}</span>
            </motion.h2>

            <motion.p
              className={`text-muted-foreground text-lg md:text-xl mb-10 ${isRTL ? 'font-arabic' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t("footer.cta.sub")}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.a
                href="mailto:muhammadsleem03@gmail.com"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-semibold bg-primary text-primary-foreground transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-glow)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("contact.email")}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href="https://wa.me/201020754883"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg"
                style={{ background: "hsl(var(--soft-green))" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <div className="arabic-divider max-w-5xl mx-auto px-6">
          <span className="arabic-ornament">◆</span>
        </div>

        <div className="py-6 text-center text-muted-foreground text-xs">
          {t("footer.rights")}
        </div>
      </footer>

      <AIChatbot />
    </div>
  );
};

export default Index;
