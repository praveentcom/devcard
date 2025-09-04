import { MetadataRoute } from "next";

import { BASE_URL, URLS } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const allowRobots = process.env.NEXT_PUBLIC_ALLOW_ROBOTS === "true";

  if (!allowRobots) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/private/"],
    },
    sitemap: `${BASE_URL}${URLS.SITEMAP()}`,
  };
}
