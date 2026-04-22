import { useLanguage } from "@/contexts/LanguageContext";

const MarqueeStrip = () => {
  const { t, isRTL } = useLanguage();
  const items = [
    t("marquee.1"),
    t("marquee.2"),
    t("marquee.3"),
    t("marquee.4"),
  ];
  // Duplicate for seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative border-y border-border bg-card/40 backdrop-blur-sm overflow-hidden py-5">
      <div
        className={`flex gap-10 whitespace-nowrap ${isRTL ? "marquee-track-rtl" : "marquee-track"}`}
        aria-hidden="true"
      >
        {loop.map((item, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-10 text-2xl md:text-4xl font-heading font-semibold tracking-tight ${
              isRTL ? "font-arabic" : ""
            }`}
          >
            <span className="gradient-text">{item}</span>
            <span className="text-primary/40 text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
