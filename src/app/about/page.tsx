import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { BackButton, PageWithStructuredData } from "@/components/ui/common";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { Markdown } from "@/components/ui/markdown";
import { URLS } from "@/lib/constants";
import { getRouteSeoImage } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";
import { generateDefaultSchema } from "@/lib/helpers/structured-data";

export default function AboutPage() {
  const aboutPath = path.join(process.cwd(), "data", "profile", "about.md");

  let aboutContent: string | null = null;
  let hasAboutFile = false;

  try {
    aboutContent = fs.readFileSync(aboutPath, "utf-8");
    hasAboutFile = true;
  } catch {
    hasAboutFile = false;
  }

  return (
    <PageWithStructuredData structuredData={generateDefaultSchema()}>
      <BackButton href={URLS.HOME()} label="Home" />
      <div className="content-container">
        <h1 className="text-md font-medium">About</h1>
        {hasAboutFile && aboutContent ? (
          <Card>
            <CardContent>
              <Markdown content={aboutContent} muted />
            </CardContent>
          </Card>
        ) : (
          <EmptyPlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: "About",
    description:
      "Learn more about my background, experiences, and what drives me professionally and personally.",
    keywords: [
      "about",
      "background",
      "experience",
      "professional",
      "personal",
      "biography",
    ],
    url: URLS.ABOUT(),
    image: getRouteSeoImage(URLS.ABOUT()),
  });

  return metadata;
}
