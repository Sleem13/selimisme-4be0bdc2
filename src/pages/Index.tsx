import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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

      {/* Full-width CTA Footer */}
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0d1117 100%)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(6, 182, 212, 0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight ${isRTL ? 'font-arabic' : 'font-heading'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6, #3b82f6)" }}>
                {t("footer.cta")}
              </span>
            </motion.h2>

            <motion.p
              className={`text-gray-400 text-lg md:text-xl mb-10 ${isRTL ? 'font-arabic' : ''}`}
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
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
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
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)]"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2), transparent)" }} />

        <div className="py-6 text-center text-gray-600 text-xs">
          {t("footer.rights")}
        </div>
      </footer>

      {/* AI Chatbot FAB */}
      <AIChatbot />
    </div>
  );
};

export default Index;
