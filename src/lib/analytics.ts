/**
 * Analytics event tracking utility.
 * Uses Google Analytics 4 (gtag) if available; falls back to console in dev.
 */
export interface TrackEventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export function trackEvent({ action, category = "engagement", label, value }: TrackEventParams): void {
  const eventName = action;
  const params: Record<string, string | number | undefined> = {
    event_category: category,
    event_label: label,
    value,
  };

  // Remove undefined values
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) delete params[key];
  });

  if (typeof window !== "undefined" && "gtag" in window) {
    try {
      (window as any).gtag("event", eventName, params);
    } catch {
      // silently fail if gtag errors
    }
  } else if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[Analytics]", eventName, params);
  }
}
