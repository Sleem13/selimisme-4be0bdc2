import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Download, Coffee, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  { en: "What's your top project?", ar: "ما أفضل مشروع لديك؟" },
  { en: "Are you open for freelance?", ar: "هل تقبل عمل حر؟" },
  { en: "Download Resume", ar: "تحميل السيرة الذاتية" },
];

// Smart mock responses
function getMockResponse(input: string, lang: "en" | "ar"): string {
  const lower = input.toLowerCase();

  if (lower.includes("project") || lower.includes("مشروع")) {
    return lang === "ar"
      ? "🏆 أفضل مشروع لدي هو **محرك التنبؤ بنتائج المرضى** — نظام ML مبني بـ scikit-learn حقق تحسين ٢٢٪ في تحديد سرعة التعافي وخفض ١٨٪ من أخطاء التشخيص. جمع بين خبرتي السريرية ومهارات تحليل البيانات! 🚀"
      : "🏆 My top project is the **Patient Outcome Prediction Engine** — an ML pipeline built with scikit-learn that achieved 22% faster recovery identification and 18% reduction in misdiagnosis. It's where my clinical expertise meets data science! 🚀";
  }

  if (lower.includes("freelance") || lower.includes("حر") || lower.includes("hire") || lower.includes("available")) {
    return lang === "ar"
      ? "✅ نعم! أنا متاح للعمل الحر ومشاريع الاستشارات في مجالات تحليل البيانات، لوحات Power BI، ونماذج ML الصحية. تواصل معي وخلينا نبني شيء رائع! 💼"
      : "✅ Yes! I'm available for freelance and consulting projects in data analytics, Power BI dashboards, and healthcare ML models. Let's connect and build something great together! 💼";
  }

  if (lower.includes("resume") || lower.includes("cv") || lower.includes("سيرة")) {
    return lang === "ar"
      ? "📄 يمكنك تحميل سيرتي الذاتية مباشرة من [هنا](/Mohamed_Mahmoud_Seliem_CV.pdf). تحتوي على كل التفاصيل عن خبراتي ومهاراتي! 📋"
      : "📄 You can download my CV directly from [here](/Mohamed_Mahmoud_Seliem_CV.pdf). It includes all the details about my experience and skills! 📋";
  }

  if (lower.includes("python") || lower.includes("بايثون")) {
    return lang === "ar"
      ? "🐍 Python هي أداتي الأساسية! عملت على **٥٠+ مجموعة بيانات** باستخدام Pandas وscikit-learn وPython automation. بنيت نماذج تنبؤية وخطوط أتمتة بيانات للقطاع الصحي."
      : "🐍 Python is my primary tool! I've worked with **50+ datasets** using Pandas, scikit-learn, and Python automation. Built predictive models and data pipelines for healthcare analytics.";
  }

  if (lower.includes("experience") || lower.includes("خبر") || lower.includes("work")) {
    return lang === "ar"
      ? "💼 لدي **٥+ سنوات** خبرة: بدأت كأخصائي علاج طبيعي ثم انتقلت لتحليل البيانات. حالياً محلل بيانات في Digilians وMTC ووزارة الاتصالات، أبني نماذج ML ولوحات Power BI. مزيج فريد من الخبرة السريرية والتقنية! 🏥📊"
      : "💼 I have **5+ years** of experience: started as a Physical Therapist then transitioned to Data Analytics. Currently a Data Analyst at Digilians, MTC & MCIT, building ML models and Power BI dashboards. A unique blend of clinical and technical expertise! 🏥📊";
  }

  if (lower.includes("skill") || lower.includes("مهار")) {
    return lang === "ar"
      ? "🛠 مهاراتي التقنية: Python، SQL، Power BI، Tableau، scikit-learn، Machine Learning، Data Analytics، والأتمتة. بالإضافة لخبرة سريرية في التأهيل العضلي والعصبي!"
      : "🛠 My technical skills: Python, SQL, Power BI, Tableau, scikit-learn, Machine Learning, Data Analytics, and Automation. Plus clinical expertise in musculoskeletal & neuromuscular rehab!";
  }

  return lang === "ar"
    ? "مرحباً! 👋 أنا مساعد محمد الذكي. يمكنني مساعدتك في معرفة المزيد عن مشاريعه، مهاراته، أو خبراته. جرب تسألني عن Python أو عن أفضل مشروع!"
    : "Hey there! 👋 I'm Mohamed's AI assistant. I can help you learn more about his projects, skills, or experience. Try asking me about Python, his top project, or his experience!";
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, lang, isRTL } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate response delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1000));

    const response = getMockResponse(text, lang);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    const text = lang === "ar" ? reply.ar : reply.en;
    if (text.includes("Resume") || text.includes("سيرة")) {
      window.open("/Mohamed_Mahmoud_Seliem_CV.pdf", "_blank");
      return;
    }
    sendMessage(text);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? { boxShadow: [
          "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
          "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)",
          "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
        ] } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 15, 30, 0.85)",
              backdropFilter: "blur(24px) saturate(1.3)",
              boxShadow: "0 0 0 1px rgba(100, 200, 255, 0.1) inset, 0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px -10px rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.15)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-heading font-semibold text-sm">Seliem AI</p>
                <p className="text-gray-500 text-xs">{lang === "ar" ? "مساعد التوظيف الذكي" : "Virtual Recruiter Assistant"}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs">{lang === "ar" ? "متصل" : "Online"}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(6,182,212,0.2) transparent" }}>
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-cyan-400/50" />
                  <p className={`text-gray-400 text-sm mb-1 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                    {lang === "ar" ? "مرحباً! 👋" : "Hey there! 👋"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {lang === "ar" ? "اسألني أي شيء عن محمد" : "Ask me anything about Mohamed"}
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-md"
                        : "text-gray-200 rounded-bl-md border border-white/5"
                    }`}
                    style={{
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #06b6d4, #8b5cf6)"
                        : "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {msg.content.split("**").map((part, j) =>
                      j % 2 === 1 ? <strong key={j} className="text-cyan-300">{part}</strong> : part
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="rounded-2xl px-4 py-3 border border-white/5" style={{ background: "rgba(255, 255, 255, 0.04)" }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 0 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs rounded-full border border-cyan-400/20 text-cyan-300 font-medium hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-200"
                  >
                    {lang === "ar" ? reply.ar : reply.en}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === "ar" ? "اكتب سؤالك..." : "Ask me anything..."}
                  className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/40 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-all"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
