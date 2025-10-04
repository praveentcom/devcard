import type { Metadata } from "next";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import pluralize from "pluralize";

import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { getAllCommunityIndex } from "@/components/helpers/community";
import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export default async function CommunityByYearPage({ params }: PageProps) {
  const { year } = await params;
  const contributions = getAllCommunityIndex().filter((c) => c.year === year);

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Contributions from ${year}`,
          description: `${contributions.length} contributions in ${year}.`,
        }}
      />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: "Community",
            href: URLS.COMMUNITY_LIST(),
          },
          {
            label: `${year} contributions`,
            href: URLS.COMMUNITY_YEAR(year),
          },
        ]}
      />
      <div className="section-container">
        <h2>Contributions from {year}</h2>
        <p className="text-muted-foreground">
          {contributions.length}{" "}
          {pluralize("contribution", contributions.length)}
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
        <EmptyState />
      )}
    </ContentContainer>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const count = getAllCommunityIndex().filter((c) => c.year === year).length;

  const metadata = createPageMetadata({
    title: `Contributions from ${year}`,
    description: `${count} contributions in ${year}.`,
    keywords: ["community", year],
    url: `${URLS.COMMUNITY_YEAR(year)}`,
    image: getRouteSeoImage(URLS.COMMUNITY_YEAR(year)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const years = Array.from(new Set(getAllCommunityIndex().map((c) => c.year)));
  return years.map((year) => ({ year }));
}
