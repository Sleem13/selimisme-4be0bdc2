import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, PenLine } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-navy">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Looking for someone who blends healthcare insight with data-driven thinking?
            I'd love to explore how we can create impact together.
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
            Email Me
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
            Call
          </a>
        </motion.div>

        {/* Fun fact */}
        <motion.p
          className="mt-16 text-muted-foreground text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PenLine className="w-4 h-4" />
          When I'm not in the clinic or coding, I write poetry.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;