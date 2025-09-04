import { getArticleSlug } from "@/lib/helpers/config";
import { getEnvConfig } from "@/lib/helpers/env-config";

const envConfig = getEnvConfig();

export const BASE_URL = envConfig.baseUrl;

export const URLS = {
  // Static pages
  HOME: () => "/",
  BIO: () => "/bio",
  ABOUT: () => "/about",
  COVER: () => "/cover",
  SITEMAP: () => "/sitemap.xml",
  RSS_FEED: () => "/feed.xml",

  // Articles
  ARTICLES: (year: string, slug: string) =>
    `/${getArticleSlug()}/${year}/${slug}`,
  ARTICLES_LIST: () => `/${getArticleSlug()}`,
  ARTICLES_YEAR: (year: string) => `/${getArticleSlug()}/${year}`,
  ARTICLES_TAG: (tag: string) => `/${getArticleSlug()}/tag/${tag}`,
  ARTICLES_CATEGORY: (category: string) =>
    `/${getArticleSlug()}/category/${category}`,

  // Projects
  PROJECTS_LIST: () => "/projects",
  PROJECTS: (slug: string) => `/projects/${slug}`,
  PROJECTS_STACK: (tag: string) => `/projects/stack/${tag}`,

  // Community
  COMMUNITY_LIST: () => "/community",
  COMMUNITY: (year: string, slug: string) => `/community/${year}/${slug}`,
  COMMUNITY_YEAR: (year: string) => `/community/${year}`,
  COMMUNITY_TYPE: (type: string) => `/community/contributions/${type}`,

  // Work & Education
  WORK: (slug: string) => `/work/${slug}`,
  EDUCATION: (slug: string) => `/education/${slug}`,
} as const;
