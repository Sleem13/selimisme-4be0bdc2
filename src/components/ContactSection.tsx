import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  PenLine,
  Sparkles,
  MessageCircle,
  Send,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t, isRTL, lang } = useLanguage();

  return (
    <section id="contact" className="bg-background">
      <div className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("contact.label")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("contact.title1")}{" "}
              <span className="gradient-text">{t("contact.title2")}</span>
            </h2>
            <div className="arabic-divider mb-6">
              <span className="arabic-ornament">◆</span>
            </div>
            <p
              className={`text-muted-foreground mb-10 max-w-lg mx-auto ${isRTL ? "font-arabic" : ""}`}
            >
              {t("contact.description")}
            </p>
          </motion.div>

          {/* Chat-style card */}
          <motion.div
            className="max-w-md mx-auto rounded-2xl bg-card border border-border overflow-hidden mb-10 transition-all duration-500 hover:border-primary/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-foreground text-sm font-heading font-semibold">
                  {lang === "ar" ? "محمد سليم" : "Mohamed Seliem"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-green" />
                  <span className="text-soft-green text-[10px]">
                    {lang === "ar" ? "متاح للعمل" : "Available for work"}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="px-5 py-5">
              <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3 mb-4">
                <p
                  className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? "font-arabic text-right" : ""}`}
                >
                  {lang === "ar"
                    ? "مرحباً! 👋 أنا متاح للعمل كمحلل بيانات ومتحمس للتعاون في مشاريع مبتكرة. تواصل معي وخلينا نبني شيء رائع!"
                    : "Hey! 👋 I'm available for data analytics roles and always excited to collaborate on innovative projects. Let's build something great together!"}
                </p>
              </div>

              {/* Action buttons grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <motion.a
                  href="mailto:muhammadsleem03@gmail.com"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-semibold bg-primary text-primary-foreground transition-all duration-300 hover:shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail className="w-3.5 h-3.5" /> {t("contact.email")}
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/sleemisme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-muted-foreground font-heading text-xs font-medium hover:border-primary/40 hover:text-foreground transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.p
            className={`text-muted-foreground text-sm flex items-center justify-center gap-2 ${isRTL ? "font-arabic" : ""}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PenLine className="w-4 h-4" />
            {t("contact.fun")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
