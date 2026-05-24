import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Parses a KPI string like "22%", "20+", "3x", "500" into a numeric value,
 * prefix, and suffix so we can animate the number and preserve formatting.
 */
function parseKpi(value: string) {
  const match = value.match(/^([^\d]*?)([\d,.]+)([^\d]*?)$/);
  if (!match) return { prefix: "", num: 0, suffix: value, decimals: 0 };
  const numStr = match[2].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    prefix: match[1],
    num: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

export function AnimatedKpi({
  value,
  className,
  style,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");
  const parsed = useRef(parseKpi(value));

  useEffect(() => {
    parsed.current = parseKpi(value);
  }, [value]);

  useEffect(() => {
    if (!isInView) return;
    const { num, decimals } = parsed.current;
    if (num === 0) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toString(),
      );
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  const { prefix, suffix } = parsed.current;

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {isInView ? display : "0"}
      {suffix}
    </span>
  );
}
