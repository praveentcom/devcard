import type { Metadata } from "next";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { Card, CardContent } from "passport-ui/card";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";

import { MdContent } from "@/components/common/md-content";
import { getRouteSeoImage } from "@/components/helpers/config";
import { getMdContent } from "@/components/helpers/md-content";
import { createPageMetadata } from "@/components/helpers/metadata";
import { generateDefaultSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";

export default function AboutPage() {
  const aboutContent = getMdContent("profile/about.md");

  return (
    <ContentContainer variant="relaxed">
      <StructuredData data={generateDefaultSchema()} />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: "About",
            href: URLS.ABOUT(),
          },
        ]}
      />
      <h2>About</h2>
      {aboutContent ? (
        <Card>
          <CardContent>
            <MdContent content={aboutContent} />
          </CardContent>
        </Card>
      ) : (
        <EmptyState />
      )}
    </ContentContainer>
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
