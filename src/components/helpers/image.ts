import { SITE_TITLE } from "@/components/helpers/config";

export interface PlaceholderImageOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  text?: string;
}

export const PLACEHOLDER_COLORS = {
  WHITE: "ffffff",
  GRAY: "666666",
} as const;

/**
 * Generates a placeholder image URL using placehold.co service
 *
 * @param options Configuration options for the placeholder image
 * @returns Complete URL for the placeholder image
 */
export function generatePlaceholderImageUrl(
  options: PlaceholderImageOptions = {},
): string {
  const {
    width = 1200,
    height = 628,
    backgroundColor = PLACEHOLDER_COLORS.GRAY,
    textColor = PLACEHOLDER_COLORS.WHITE,
    text = SITE_TITLE,
  } = options;

  const baseUrl = `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}.png`;

  if (text) {
    const encodedText = encodeURIComponent(text);
    return `${baseUrl}?text=${encodedText}`;
  }

  return baseUrl;
}
