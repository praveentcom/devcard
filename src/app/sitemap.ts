import { MetadataRoute } from 'next';

import { profileData } from '@/data/profile';
import { BASE_URL } from '@/lib/constants';
import { getAllArticlesIndex } from '@/lib/helpers/article';
import { getAllCommunityIndex } from '@/lib/helpers/community';
import { getArticleSlug } from '@/lib/helpers/config';

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * Static Pages
   */
  const staticPages = [
    '',
    '/bio',
    `/${getArticleSlug()}`,
    '/community',
    '/projects',
    '/cover',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
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
    url: `${BASE_URL}/${getArticleSlug()}/${article.year}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articleYears = Array.from(new Set(allArticles.map((a) => a.year))).map(
    (year) => ({
      url: `${BASE_URL}/${getArticleSlug()}/${year}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  );

  const articleTags = Array.from(
    new Set(allArticles.flatMap((article) => article.tags))
  ).map((tag) => ({
    url: `${BASE_URL}/${getArticleSlug()}/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const articleCategories = Array.from(
    new Set(allArticles.flatMap((article) => article.categories))
  ).map((category) => ({
    url: `${BASE_URL}/${getArticleSlug()}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /**
   * Community Pages
   *
   * 1. Community contributions
   * 2. Community year listing
   * 3. Community contribution type listing
   */
  const allCommunity = getAllCommunityIndex();

  const communityContributions = allCommunity.map((contribution) => ({
    url: `${BASE_URL}/community/${contribution.year}/${contribution.slug}`,
    lastModified: new Date(contribution.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const communityYears = Array.from(
    new Set(allCommunity.map((c) => c.year))
  ).map((year) => ({
    url: `${BASE_URL}/community/${year}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const communityContributionTypes = Array.from(
    new Set(allCommunity.map((c) => c.type))
  ).map((type) => ({
    url: `${BASE_URL}/community/contributions/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /**
   * Project Pages
   *
   * 1. Project pages
   * 2. Project stack listing
   */
  const projects = profileData.projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: project.date || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const usedProjectTags = Array.from(
    new Set(profileData.projects.flatMap((project) => project.stack || []))
  );
  const projectTags = usedProjectTags.map((tag) => ({
    url: `${BASE_URL}/projects/stack/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /**
   * Work Experience & Education Pages
   *
   * 1. Work experience pages
   * 2. Education pages
   */
  const workExperience = profileData.workExperience.map((work) => ({
    url: `${BASE_URL}/work/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  const education = profileData.education.map((edu) => ({
    url: `${BASE_URL}/education/${edu.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
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
