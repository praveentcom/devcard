import fs from "node:fs";
import path from "node:path";

import { Metadata } from "next";

import { PageWithStructuredData } from "@/components/ui/common";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { Markdown } from "@/components/ui/markdown";
import { URLS } from "@/lib/constants";
import { getRouteSeoImage } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";
import { generateDefaultSchema } from "@/lib/helpers/structured-data";

export default function CoverPage() {
  const coverPath = path.join(
    process.cwd(),
    "data",
    "profile",
    "cover-letter.md",
  );

  let coverContent: string | null = null;
  let hasCoverFile = false;

  try {
    coverContent = fs.readFileSync(coverPath, "utf-8");
    hasCoverFile = true;
  } catch {
    hasCoverFile = false;
  }

  return (
    <PageWithStructuredData structuredData={generateDefaultSchema()}>
      <div className="content-container">
        <h1 className="text-md font-medium">Cover letter</h1>
        {hasCoverFile && coverContent ? (
          <Markdown content={coverContent} muted />
        ) : (
          <EmptyPlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Cover letter`,
    description:
      "A personalized introduction highlighting my experience and interest in joining your team.",
    keywords: ["cover letter", "introduction", "experience", "skills", "professional", "career"],
    url: URLS.COVER(),
    image: getRouteSeoImage(URLS.COVER()),
  });

  return metadata;
}
