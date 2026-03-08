import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Linkedin, PenLine, Sparkles, MessageCircle, Coffee, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PopButton = ({
  href,
  children,
  className,
  style,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}) => {
  const [popped, setPopped] = useState(false);

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={style}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      onClick={() => {
        setPopped(true);
        setTimeout(() => setPopped(false), 600);
      }}
    >
      {children}
      {popped && (
        <motion.span
          className="absolute -top-2 -right-2"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </motion.span>
      )}
    </motion.a>
  );
};

const ContactSection = () => {
  const { t, isRTL, lang } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0a0f24 50%, #060a18 100%)" }}>
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={`text-cyan-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("contact.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("contact.title1")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
                {t("contact.title2")}
              </span>
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)" }} />
              <span className="text-cyan-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)" }} />
            </div>
            <p className={`text-gray-400 mb-10 max-w-lg mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t("contact.description")}
            </p>
          </motion.div>

          {/* Chat-style floating card */}
          <motion.div
            className="relative max-w-md mx-auto rounded-2xl p-[1px] overflow-hidden mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-60" style={{
              background: "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #06b6d4 45%, #8b5cf6 55%, #3b82f6 65%, transparent 80%)",
              animation: "borderSpin 4s linear infinite",
            }} />
            <div className="relative rounded-2xl overflow-hidden" style={{
              background: "rgba(10, 15, 30, 0.8)",
              backdropFilter: "blur(24px) saturate(1.2)",
            }}>
              <style>{`
                @property --border-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                @keyframes borderSpin { to { --border-angle: 360deg; } }
              `}</style>

              {/* Chat header */}
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-heading font-semibold">{lang === "ar" ? "محمد سليم" : "Mohamed Seliem"}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">{lang === "ar" ? "متاح للعمل" : "Available for work"}</span>
                  </div>
                </div>
              </div>

              {/* Chat bubble */}
              <div className="px-5 py-5">
                <div className="bg-white/5 rounded-2xl rounded-tl-md px-4 py-3 mb-4">
                  <p className={`text-gray-300 text-sm leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === "ar"
                      ? "مرحباً! 👋 أنا متاح للعمل كمحلل بيانات ومتحمس للتعاون في مشاريع مبتكرة. تواصل معي وخلينا نبني شيء رائع!"
                      : "Hey! 👋 I'm available for data analytics roles and always excited to collaborate on innovative projects. Let's build something great together!"}
                  </p>
                </div>

                {/* Action buttons grid */}
                <div className="grid grid-cols-2 gap-2">
                  <PopButton
                    href="mailto:muhammadsleemo2@gmail.com"
                    className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-semibold text-white transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {t("contact.email")}
                  </PopButton>

                  <PopButton
                    href="https://wa.me/201020754883"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-semibold text-white transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    WhatsApp
                  </PopButton>

                  <PopButton
                    href="https://www.linkedin.com/in/sleemisme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 font-heading text-xs font-medium hover:border-cyan-400/40 hover:text-white transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </PopButton>

                  <PopButton
                    href="tel:+201020754883"
                    className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 font-heading text-xs font-medium hover:border-violet-400/40 hover:text-white transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    {lang === "ar" ? "لنحتسي قهوة ☕" : "Let's grab a coffee ☕"}
                  </PopButton>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className={`text-gray-500 text-sm flex items-center justify-center gap-2 ${isRTL ? 'font-arabic' : ''}`}
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
