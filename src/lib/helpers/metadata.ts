import { Metadata } from "next";

import { configData } from "@/data/config";
import { BASE_URL } from "@/lib/constants";
import { getFaviconPaths, PROFILE_NAME } from "@/lib/helpers/config";

export function createNotFoundMetadata(type: string): Metadata {
  return {
    title: `${type} not found`,
    description: `The requested ${type.toLowerCase()} could not be found.`,
  };
}

/**
 * Create a complete metadata object with OpenGraph and Twitter cards
 */
export function createPageMetadata(_: {
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  image?: string;
  keywords?: string;
  publishedTime?: string;
  authors?: string[];
  url?: string;
}): Metadata {
  const ogImage = {
    url: _.image || "https://placehold.co/1200x630.png",
    width: 1200,
    height: 630,
    alt: _.title,
  };

  const icons = getFaviconPaths();

  const metadata: Metadata = {
    title: `${PROFILE_NAME} | ${_.title}`,
    description: _.description,
    icons: {
      icon: [
        {
          url: icons.ico,
          type: "image/x-icon",
        },
        {
          url: icons.png,
          type: "image/png",
        },
      ],
      apple: {
        url: icons.apple,
        type: "image/png",
      },
    },
    openGraph: {
      title: _.title,
      description: _.description,
      type: _.type || "website",
      images: [ogImage],
      siteName: PROFILE_NAME,
      url: _.url ? `${BASE_URL}${_.url}` : undefined,
    },
    twitter: {
      card: configData.seo.twitterCard || "summary_large_image",
      title: _.title,
      description: _.description,
      images: [ogImage],
      site: configData.seo.twitterSite,
      creator: configData.seo.twitterCreator,
    },
    authors: _.authors?.map((name) => ({ name })) || [
      {
        name: PROFILE_NAME,
        url: BASE_URL,
      },
    ],
  };

  if (_.keywords) {
    metadata.keywords = _.keywords;
  }

  return metadata;
}
