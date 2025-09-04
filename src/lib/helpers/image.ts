import { getArticleLabel } from "./config";

export interface PlaceholderImageOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  text?: string;
}

const PLACEHOLDER_COLORS = {
  WHITE: "ffffff",
  GRAY: "666666",
} as const;

const DEFAULT_BLOG_OPTIONS: Required<PlaceholderImageOptions> = {
  width: 1200,
  height: 628,
  backgroundColor: PLACEHOLDER_COLORS.GRAY,
  textColor: PLACEHOLDER_COLORS.WHITE,
  text: getArticleLabel(),
};

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
    width = DEFAULT_BLOG_OPTIONS.width,
    height = DEFAULT_BLOG_OPTIONS.height,
    backgroundColor = DEFAULT_BLOG_OPTIONS.backgroundColor,
    textColor = DEFAULT_BLOG_OPTIONS.textColor,
    text = DEFAULT_BLOG_OPTIONS.text,
  } = options;

  const baseUrl = `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}.png`;

  if (text) {
    const encodedText = encodeURIComponent(text);
    return `${baseUrl}?text=${encodedText}`;
  }

  return baseUrl;
}

export function generateArticlePlaceholderImage(title: string): string {
  return generatePlaceholderImageUrl({ text: title });
}

export function generateCommunityPlaceholderImage(title: string): string {
  return generatePlaceholderImageUrl({
    text: title,
    backgroundColor: PLACEHOLDER_COLORS.GRAY,
    textColor: PLACEHOLDER_COLORS.WHITE,
  });
}

export function generateOpenGraphImage(title: string): string {
  return generatePlaceholderImageUrl({
    text: title,
    width: 1200,
    height: 628,
    backgroundColor: PLACEHOLDER_COLORS.GRAY,
    textColor: PLACEHOLDER_COLORS.WHITE,
  });
}
