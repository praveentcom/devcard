import "../styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ClientLayout from "@/components/common/client-layout";
import { Analytics } from "@/components/helpers/analytics";
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
} from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { BASE_URL, URLS } from "@/components/helpers/urls";
import { WebVitals } from "@/components/helpers/web-vitals";
import { configData } from "@/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col max-w-full overflow-x-hidden`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    description: SITE_DESCRIPTION,
    keywords: configData.seo.keywords,
    url: BASE_URL,
    image: SITE_IMAGE,
  });

  return {
    ...metadata,
    other: {
      ...metadata.other,
    },
    alternates: {
      ...metadata.alternates,
      types: {
        "application/rss+xml": [
          {
            url: `${BASE_URL}${URLS.RSS_FEED()}`,
            title: `${SITE_TITLE} RSS feed`,
          },
        ],
      },
    },
  };
}
