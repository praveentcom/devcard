/**
 * Common pattern for finding items by slug
 */
export function findBySlug<T extends { slug: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

/**
 * Generate static params for an array of items with slugs
 */
export function generateSlugParams<T extends { slug: string }>(
  items: T[],
): { slug: string }[] {
  return items.map((item) => ({ slug: item.slug }));
}
