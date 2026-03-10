import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/201020754883"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-lg text-white font-heading font-semibold no-underline animate-float"
      style={{ backgroundColor: "hsl(var(--soft-green))" }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#128C7E",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp
    </motion.a>
  );
};

export default FloatingWhatsApp;
