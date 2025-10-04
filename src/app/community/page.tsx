import { Calendar, HeartHandshake } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";

import { MdContent } from "@/components/common/md-content";
import { YearButton } from "@/components/common/year-button";
import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { getAllCommunitySlugs } from "@/components/helpers/community";
import { getRouteSeoImage } from "@/components/helpers/config";
import { getMdContent } from "@/components/helpers/md-content";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { communityData } from "@/data/community";
import { configData } from "@/data/config";

export default function CommunityPage() {
  const publishedContributions = getAllCommunitySlugs();
  const communityContent = getMdContent("community/intro.md");

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Community Contributions`,
          description: configData.seo.description || "",
          image: communityData.image,
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
        ]}
      />
      <div className="section-container">
        <MdContent content={communityContent} />
      </div>
      {publishedContributions.length > 0 &&
      Array.from(new Set(publishedContributions.map((c) => c.year))).length >
        1 ? (
        <div className="section-container">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3 text-muted-foreground" />
            <h6 className="leading-none">Browse by year</h6>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from(new Set(publishedContributions.map((c) => c.year))).map(
              (year) => (
                <YearButton
                  key={`${year}-community`}
                  year={year}
                  type="community"
                  asLink
                />
              ),
            )}
          </div>
        </div>
      ) : null}
      {publishedContributions.length > 0 ? (
        <div className="section-container">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="size-3 text-muted-foreground" />
            <h6 className="leading-none">Community Contributions</h6>
          </div>
          <div className="list-container">
            {publishedContributions.map((community) => (
              <CommunitySummaryCard
                key={`${community.year}-${community.slug}`}
                contribution={community}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </ContentContainer>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Community Contributions`,
    description: configData.seo.description || "",
    keywords: [
      "community",
      "talks",
      "presentations",
      "conferences",
      "workshops",
      "speaking",
      "developer community",
    ],
    url: URLS.COMMUNITY_LIST(),
    image: getRouteSeoImage(URLS.COMMUNITY_LIST()),
  });

  return metadata;
}
