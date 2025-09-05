"use client";

import { useReportWebVitals } from "next/web-vitals";

import { configData } from "@/data/config";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (!configData.misc.webVitals?.enabled) {
      return null;
    }

    /**
     * Log to console if enabled.
     * This is useful for debugging and development.
     */
    if (configData.misc.webVitals?.logToConsole) {
      console.log("📊 Web Vitals:", {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    /**
     * Google Analytics
     */
    if (
      configData.analytics.googleAnalytics?.measurementId &&
      typeof window !== "undefined" &&
      window.gtag
    ) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    /**
     * Send to analytics services
     */
    sendToAnalytics(metric);
  });

  return null;
}

interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
  delta: number;
}

function sendToAnalytics(metric: WebVitalMetric) {
  const { name, value, rating, id } = metric;

  /**
   * Simple Analytics
   */
  if (
    configData.analytics.simpleAnalytics?.hostname &&
    typeof window !== "undefined" &&
    window.sa_event
  ) {
    window.sa_event("web_vital", {
      metric_name: name,
      metric_value: Math.round(name === "CLS" ? value * 1000 : value),
      metric_rating: rating,
      metric_id: id,
    });
  }

  /**
   * Plausible
   */
  if (
    configData.analytics.plausible?.domain &&
    typeof window !== "undefined" &&
    window.plausible
  ) {
    window.plausible("Web Vital", {
      props: {
        metric: name,
        value: Math.round(name === "CLS" ? value * 1000 : value),
        rating: rating,
      },
    });
  }

  /**
   * Umami
   */
  if (
    configData.analytics.umami?.websiteId &&
    typeof window !== "undefined" &&
    window.umami
  ) {
    window.umami.track("web-vital", {
      metric: name,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      rating: rating,
    });
  }

  /**
   * Mixpanel
   */
  if (
    configData.analytics.mixpanel?.token &&
    typeof window !== "undefined" &&
    window.mixpanel
  ) {
    window.mixpanel.track("Web Vital", {
      metric_name: name,
      metric_value: Math.round(name === "CLS" ? value * 1000 : value),
      metric_rating: rating,
      metric_id: id,
    });
  }

  /**
   * Microsoft Clarity
   */
  if (
    configData.analytics.microsoftClarity?.projectId &&
    typeof window !== "undefined" &&
    window.clarity
  ) {
    window.clarity("event", "web_vital", {
      metric: name,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      rating: rating,
    });
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    sa_event?: (event: string, data?: Record<string, unknown>) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    mixpanel?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    clarity?: (
      action: string,
      event: string,
      data?: Record<string, unknown>,
    ) => void;
  }
}
