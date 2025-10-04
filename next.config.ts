import withBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { getEnvConfig } from "./src/components/helpers/env-config";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const envConfig = getEnvConfig();

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "highlight.js", "date-fns"],
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: envConfig.imageRemotePatterns,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: envConfig.contentSecurityPolicy,
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/robots",
        destination: "/robots.txt",
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
      },
    ];

    if (envConfig.isDevelopment) {
      securityHeaders.push({
        key: "X-Development-Mode",
        value: "true",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(withMDX(nextConfig));
