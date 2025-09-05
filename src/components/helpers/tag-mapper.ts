const IMAGE_BASE_PATH = "/images/tech-icons/";

/**
 * Get the image path for a tag
 * @param tag - The tag to get the image path for
 * @returns The image path for the tag
 */
export function getTagImagePath(tag: string): string {
  return `${IMAGE_BASE_PATH}${tag}.png`;
}
