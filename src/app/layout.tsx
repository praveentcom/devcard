import "../styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@/components/analytics/Analytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { PrefetchProvider } from "@/components/providers/prefetch-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { configData } from "@/data/config";
import { BASE_URL, URLS } from "@/lib/constants";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_TITLE } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";

import Providers from "./providers";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrefetchProvider>
            <Header />
            <main id="main-content" className="flex-1">
              <Providers>{children}</Providers>
            </main>
            <Footer />
          </PrefetchProvider>
        </ThemeProvider>
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
