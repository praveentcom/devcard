import { configData } from "@/data/config";
import { profileData } from "@/data/profile";
import { BASE_URL, URLS } from "@/lib/constants";
import { getAllArticlesIndex } from "@/lib/helpers/article";
import {
  PROFILE_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/helpers/config";

/**
 * Build the complete RSS feed URL for the site
 * @returns Complete RSS feed URL (e.g., "https://devcard.info/feed.xml")
 */
export function buildRSSFeedUrl(): string {
  return `${BASE_URL}${URLS.RSS_FEED()}`;
}

/**
 * Build complete article URL for RSS feeds
 * @param year - Article year
 * @param slug - Article slug
 * @returns Complete article URL (e.g., "https://devcard.info/articles/2025/my-article")
 */
export function buildArticleRSSUrl(year: string, slug: string): string {
  return `${BASE_URL}${URLS.ARTICLES(year, slug)}`;
}

/**
 * Get RSS feed metadata for use in HTML head
 * @returns Object with RSS feed metadata
 */
export function getRSSFeedMetadata() {
  return {
    url: buildRSSFeedUrl(),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    link: `${BASE_URL}${URLS.ARTICLES_LIST()}`,
    language: "en-us",
    managingEditor: profileData.profile.email || "",
    webMaster: profileData.profile.email || "",
    generator: "DevCard RSS Feed Generator",
    categories: ["articles", "blog", "development", "technology", "programming", "tutorials"],
    copyright: `Copyright ${new Date().getFullYear()} ${PROFILE_NAME}. All rights reserved.`,
    image: {
      url: profileData.profile.image || configData.seo.favicon?.png || "",
      title: SITE_TITLE,
      link: `${BASE_URL}${URLS.ARTICLES_LIST()}`,
      width: 144,
      height: 144,
    },
  };
}

/**
 * Get MIME type for image based on URL
 * @param imageUrl - Image URL
 * @returns MIME type string
 */
function getImageMimeType(imageUrl: string): string {
  const extension = imageUrl.toLowerCase().split('.').pop() || '';
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/png';
  }
}

/**
 * Get all published articles formatted for RSS
 * @param limit - Maximum number of articles to return (default: 20)
 * @returns Array of articles with RSS-formatted data
 */
export function getArticlesForRSS(limit: number = 20) {
  return getAllArticlesIndex()
    .filter((article) => article.published !== false)
    .slice(0, limit)
    .map((article) => {
      const imageUrl = article.ogImage || article.image;
      
      return {
        ...article,
        url: buildArticleRSSUrl(article.year, article.slug),
        pubDate: new Date(article.date).toUTCString(),
        author: `${profileData.profile.email || ""} (${PROFILE_NAME})`,
        imageData: imageUrl ? {
          url: imageUrl,
          type: getImageMimeType(imageUrl),
          length: 512000
        } : null,
      };
    });
}

/**
 * Build RSS feed URL with optional parameters
 * @param options - Optional parameters for RSS feed
 * @returns RSS feed URL with query parameters
 */
export function buildRSSFeedUrlWithParams(options?: {
  category?: string;
  tag?: string;
  year?: string;
}): string {
  const baseUrl = buildRSSFeedUrl();

  if (!options) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  if (options.category) params.append("category", options.category);
  if (options.tag) params.append("tag", options.tag);
  if (options.year) params.append("year", options.year);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
