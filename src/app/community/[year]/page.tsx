import type { Metadata } from "next";

import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { getAllCommunityIndex } from "@/components/helpers/community";
import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { BackButton, PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export default async function CommunityByYearPage({ params }: PageProps) {
  const { year } = await params;
  const contributions = getAllCommunityIndex().filter((c) => c.year === year);

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Community contributions from ${year}`,
        description: `${contributions.length} community contributions in ${year}.`,
      }}
    >
      <BackButton
        href={URLS.COMMUNITY_LIST()}
        label="Community contributions"
      />
      <div className="content-container">
        <div className="grid">
          <h1 className="text-md font-medium">
            Community contributions from {year}
          </h1>
          <p className="text-sm text-muted-foreground">
            {contributions.length} contribution
            {contributions.length === 1 ? "" : "s"}
          </p>
        </div>
        {contributions.length > 0 ? (
          <div className="list-container">
            {contributions.map((community) => (
              <CommunitySummaryCard
                key={`${community.year}-${community.slug}`}
                contribution={community}
              />
            ))}
          </div>
        ) : (
          <PlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const count = getAllCommunityIndex().filter((c) => c.year === year).length;

  const metadata = createPageMetadata({
    title: `Community contributions from ${year}`,
    description: `${count} community contributions in ${year}.`,
    keywords: ["community", "contributions", year],
    url: `${URLS.COMMUNITY_YEAR(year)}`,
    image: getRouteSeoImage(URLS.COMMUNITY_YEAR(year)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const years = Array.from(new Set(getAllCommunityIndex().map((c) => c.year)));
  return years.map((year) => ({ year }));
}
