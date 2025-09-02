import fs from "node:fs";
import path from "node:path";

import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageWithStructuredData } from "@/components/ui/common";
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
      <div className="page-container">
        <div className="grid gap-5">
          <div className="grid">
            <div className="flex items-center gap-1.5">
              <FileText className="size-4 text-primary" />
              <h1 className="text-md font-medium">About</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn more about my background, experiences, and what drives me
              professionally and personally.
            </p>
          </div>

          <div className="space-y-4">
            {hasAboutFile && aboutContent ? (
              <Card>
                <CardContent>
                  <Markdown content={aboutContent} muted />
                </CardContent>
              </Card>
            ) : (
              <EmptyPlaceholderCard
                title="About page not yet written."
                subtitle="This section is currently being crafted. Check back soon to learn more about my background and journey."
              >
                <Button variant="outline" size="xs" asChild>
                  <Link href={URLS.HOME()}>Go home</Link>
                </Button>
              </EmptyPlaceholderCard>
            )}
          </div>
        </div>
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: "About",
    description:
      "Learn more about my background, experiences, and what drives me professionally and personally.",
    keywords:
      "about, background, experience, professional, personal, biography",
    url: URLS.ABOUT(),
    image: getRouteSeoImage(URLS.ABOUT()),
  });

  return metadata;
}
