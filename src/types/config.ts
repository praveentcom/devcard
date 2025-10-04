import { LucideIcon } from "lucide-react";

export interface ConfigAnalyticsData {
  googleAnalytics?: {
    measurementId: string;
  };
  simpleAnalytics?: {
    hostname: string;
  };
  plausible?: {
    domain: string;
    src?: string;
  };
  umami?: {
    websiteId: string;
    src?: string;
  };
  matomo?: {
    url: string;
    siteId: string;
  };
  microsoftClarity?: {
    projectId: string;
  };
  mixpanel?: {
    token: string;
  };
}

export interface ConfigSeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  favicon?: {
    ico?: string;
    png?: string;
    apple?: string;
  };
  routeImages?: Record<string, string>;
}

export interface ConfigNavigationData {
  showHomeInNav?: boolean;
  showProjectsInNav?: boolean;
  showArticlesInNav?: boolean;
  showCommunityInNav?: boolean;
  customMenuItems?: Array<{
    href: string;
    label: string;
    Icon: LucideIcon;
    external?: boolean;
  }>;
}

export interface ConfigMiscData {
  footerSubtitle?: string;
  locale?: string;
  timezone?: string;
  webVitals?: {
    enabled?: boolean;
    logToConsole?: boolean;
  };
  content?: {
    articleLabel?: string; // e.g., "Article", "Blog", "Essay", "Writing"
    articleSlug?: string; // e.g., "articles", "blog", "essays", "writings"
  };
}

export interface ConfigData {
  analytics: ConfigAnalyticsData;
  seo: ConfigSeoData;
  navigation?: ConfigNavigationData;
  misc: ConfigMiscData;
}
