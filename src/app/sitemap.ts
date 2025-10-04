import { MetadataRoute } from "next";

import { getAllArticlesIndex } from "@/components/helpers/article";
import { getAllCommunityIndex } from "@/components/helpers/community";
import { getAllEducationSlugs } from "@/components/helpers/education";
import { getAllProjectSlugs } from "@/components/helpers/projects";
import { BASE_URL, URLS } from "@/components/helpers/urls";
import { getAllWorkSlugs } from "@/components/helpers/work";

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * Static Pages
   */
  const staticPages = [
    URLS.HOME(),
    URLS.ABOUT(),
    URLS.ARTICLES_LIST(),
    URLS.COMMUNITY_LIST(),
    URLS.PROJECTS_LIST(),
    URLS.COVER(),
    URLS.RSS_FEED(),
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === URLS.HOME() ? 1 : 0.8,
  }));

  /**
   * Article Pages
   *
   * 1. Articles
   * 2. Article year listing
   * 3. Article tag listing
   * 4. Article category listing
   */
  const allArticles = getAllArticlesIndex();

  const articles = allArticles.map((article) => ({
    url: `${BASE_URL}${URLS.ARTICLES(article.year, article.slug)}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleYears = Array.from(new Set(allArticles.map((a) => a.year))).map(
    (year) => ({
      url: `${BASE_URL}${URLS.ARTICLES_YEAR(year)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  const articleTags = Array.from(
    new Set(allArticles.flatMap((article) => article.tags)),
  ).map((tag) => ({
    url: `${BASE_URL}${URLS.ARTICLES_TAG(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleCategories = Array.from(
    new Set(allArticles.flatMap((article) => article.categories)),
  ).map((category) => ({
    url: `${BASE_URL}${URLS.ARTICLES_CATEGORY(category)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /**
   * Community Pages
   *
   * 1. Contributions
   * 2. Community year listing
   * 3. Community type listing
   */
  const allCommunity = getAllCommunityIndex();

  const communityContributions = allCommunity.map((contribution) => ({
    url: `${BASE_URL}${URLS.COMMUNITY(contribution.year, contribution.slug)}`,
    lastModified: new Date(contribution.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const communityYears = Array.from(
    new Set(allCommunity.map((c) => c.year)),
  ).map((year) => ({
    url: `${BASE_URL}${URLS.COMMUNITY_YEAR(year)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const communityContributionTypes = Array.from(
    new Set(allCommunity.map((c) => c.type)),
  ).map((type) => ({
    url: `${BASE_URL}${URLS.COMMUNITY_TYPE(type)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /**
   * Project Pages
   *
   * 1. Project pages
   * 2. Project stack listing
   */
  const projects = getAllProjectSlugs().map((project) => ({
    url: `${BASE_URL}${URLS.PROJECTS(project.slug)}`,
    lastModified: project.date || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const usedProjectTags = Array.from(
    new Set(getAllProjectSlugs().flatMap((project) => project.stack || [])),
  );
  const projectTags = usedProjectTags.map((tag) => ({
    url: `${BASE_URL}${URLS.PROJECTS_STACK(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /**
   * Work Experience & Education Pages
   *
   * 1. Work experience pages
   * 2. Education pages
   */
  const workExperience = getAllWorkSlugs().map((work) => ({
    url: `${BASE_URL}${URLS.WORK(work.slug)}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const education = getAllEducationSlugs().map((edu) => ({
    url: `${BASE_URL}${URLS.EDUCATION(edu.slug)}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...articles,
    ...articleYears,
    ...articleTags,
    ...articleCategories,
    ...communityContributions,
    ...communityYears,
    ...communityContributionTypes,
    ...projects,
    ...projectTags,
    ...workExperience,
    ...education,
  ];
}
