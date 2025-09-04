const IMAGE_BASE_PATH = "/images/tech-icons/";

export function getTagImagePath(tag: string): string {
  return `${IMAGE_BASE_PATH}${tag}.png`;
}
