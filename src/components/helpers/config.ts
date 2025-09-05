import { plural } from "pluralize";

import { URLS } from "@/components/helpers/urls";
import { configData } from "@/data/config";
import { profileData } from "@/data/profile";

export const PROFILE_NAME = `${profileData.profile.firstName} ${profileData.profile.lastName}`;

/**
 * Site SEO data
 */
export const SITE_TITLE = configData.seo.title || PROFILE_NAME;
export const SITE_DESCRIPTION =
  configData.seo.description || profileData.profile.description || "";
export const SITE_KEYWORDS = configData.seo.keywords || [];
export const SITE_IMAGE =
  configData.seo.image || "https://placehold.co/1200x630.png";

/**
 * Get favicon paths from config with fallbacks to Next.js defaults
 * @returns The favicon paths
 */
export function getFaviconPaths(): {
  ico: string;
  png: string;
  apple: string;
} {
  return {
    ico: configData.seo.favicon?.ico || "/favicon.ico",
    png: configData.seo.favicon?.png || "/icon.png",
    apple: configData.seo.favicon?.apple || "/apple-icon.png",
  };
}

/**
 * Get the article label (plural) from config or fallback
 * @returns The article label (plural)
 */
export function getArticleLabel(): string {
  return configData.misc.content?.articleLabel || "Article";
}

/**
 * Get the article URL slug from config or fallback
 * @returns The article URL slug
 */
export function getArticleSlug(): string {
  return configData.misc.content?.articleSlug || "articles";
}

/**
 * Get the route SEO image from config or fallback
 * @param route - The route to get the SEO image for
 * @returns The SEO image for the route
 */
export function getRouteSeoImage(route: string): string {
  return configData.seo.routeImages?.[route] || SITE_IMAGE;
}

/**
 * Get the navigation items from config or fallback
 * @returns The navigation items
 */
export function getNavigationItems(): {
  href: string;
  label: string;
}[] {
  const baseItems = [
    ...(configData.navigation?.showHomeInNav !== false
      ? [{ href: URLS.HOME(), label: "Home" }]
      : []),
    ...(configData.navigation?.showArticlesInNav !== false
      ? [{ href: URLS.ARTICLES_LIST(), label: plural(getArticleLabel()) }]
      : []),
    ...(configData.navigation?.showCommunityInNav !== false
      ? [{ href: URLS.COMMUNITY_LIST(), label: "Community" }]
      : []),
    ...(configData.navigation?.showProjectsInNav !== false
      ? [{ href: URLS.PROJECTS_LIST(), label: "Projects" }]
      : []),
  ];

  const customItems = configData.navigation?.customMenuItems || [];

  return [...baseItems, ...customItems];
}
