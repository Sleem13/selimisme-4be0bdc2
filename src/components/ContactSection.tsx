import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, PenLine } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("contact.label")}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>
            {t("contact.title1")} <span className="gradient-text">{t("contact.title2")}</span>
          </h2>
          <div className="arabic-divider mb-4">
            <span className="arabic-ornament">✦</span>
          </div>
          <p className={`text-muted-foreground mb-10 max-w-lg mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t("contact.description")}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="mailto:muhammadsleemo2@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
          >
            <Mail className="w-4 h-4" />
            {t("contact.email")}
          </a>
          <a
            href="https://www.linkedin.com/in/sleemisme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-heading text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="tel:+201020754883"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-heading text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {t("contact.call")}
          </a>
        </motion.div>

        <motion.p
          className={`mt-16 text-muted-foreground text-sm flex items-center justify-center gap-2 ${isRTL ? 'font-arabic' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PenLine className="w-4 h-4" />
          {t("contact.fun")}
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
