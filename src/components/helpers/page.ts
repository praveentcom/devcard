/**
 * Common pattern for finding items by slug
 * @param items - The items to search through
 * @param slug - The slug to find
 * @returns The item with the matching slug
 */
export function findBySlug<T extends { slug: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

/**
 * Generate static params for an array of items with slugs
 * @param items - The items to generate slugs for
 * @returns The static params
 */
export function generateSlugParams<T extends { slug: string }>(
  items: T[],
): { slug: string }[] {
  return items.map((item) => ({ slug: item.slug }));
}
