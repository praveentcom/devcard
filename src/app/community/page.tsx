import { Calendar, HeartHandshake } from "lucide-react";
import type { Metadata } from "next";

import { YearBadge } from "@/components/common/year-badge";
import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { getAllCommunitySlugs } from "@/components/helpers/community";
import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { communityData } from "@/data/community";
import { PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

export default function CommunityPage() {
  const publishedContributions = getAllCommunitySlugs();

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Community contributions`,
        description: communityData.descriptionLine1,
        image: communityData.image,
      }}
    >
      <div className="content-container">
        <div className="section-container">
          <h1 className="text-md font-medium">{communityData.title}</h1>
          <div className="title-container text-sm text-muted-foreground">
            <p>{communityData.descriptionLine1}</p>
            <p>{communityData.descriptionLine2}</p>
          </div>
        </div>
        {publishedContributions.length > 0 &&
        Array.from(new Set(publishedContributions.map((c) => c.year))).length >
          1 ? (
          <div className="section-container">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              <h2 className="text-xs tracking-wide uppercase font-semibold">
                Browse by year
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {Array.from(
                new Set(publishedContributions.map((c) => c.year)),
              ).map((year) => (
                <YearBadge
                  key={`${year}-community`}
                  year={year}
                  type="community"
                  asLink
                />
              ))}
            </div>
          </div>
        ) : null}
        {publishedContributions.length > 0 ? (
          <div className="section-container">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HeartHandshake className="size-3" />
              <h2 className="text-xs tracking-wide uppercase font-semibold">
                All community contributions
              </h2>
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
          <PlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Community contributions`,
    description: communityData.descriptionLine1,
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
