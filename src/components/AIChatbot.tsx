import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  { en: "What's your top project?", ar: "ما أفضل مشروع لديك؟" },
  { en: "Are you open for freelance?", ar: "هل تقبل عمل حر؟" },
  { en: "Tell me about your skills", ar: "أخبرني عن مهاراتك" },
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || "Something went wrong. Please try again.");
      return;
    }

    if (!resp.body) {
      onError("No response stream.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIdx);
        buffer = buffer.slice(newlineIdx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          // partial JSON, wait for more
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    // flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Connection error.");
  }
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang, isRTL } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: newMessages,
      onDelta: upsertAssistant,
      onDone: () => setIsTyping(false),
      onError: (err) => {
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${err}` }]);
        setIsTyping(false);
      },
    });
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    const text = lang === "ar" ? reply.ar : reply.en;
    sendMessage(text);
  };

  // Render markdown-like bold text
  const renderContent = (content: string) => {
    return content.split("**").map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="text-cyan-300">{part}</strong> : part
    );
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
        animate={!isOpen ? {
          boxShadow: [
            "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
            "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)",
            "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
          ],
        } : {}}
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
            <div className="h-[320px] overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(6,182,212,0.2) transparent" }}>
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
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
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
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2">
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
