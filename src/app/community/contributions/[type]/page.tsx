import type { Metadata } from "next";
import { notFound } from "next/navigation";
import pluralize from "pluralize";

import { CommunitySummaryCard } from "@/components/community/CommunitySummaryCard";
import { BackButton, PageWithStructuredData } from "@/components/ui/common";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { URLS } from "@/lib/constants";
import { getAllCommunityIndex } from "@/lib/helpers/community";
import { getRouteSeoImage } from "@/lib/helpers/config";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/helpers/metadata";
import { EnumCommunityContributionType } from "@/types/community";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

function isValidType(
  value: string,
): value is `${EnumCommunityContributionType}` {
  return Object.values(EnumCommunityContributionType).includes(
    value as EnumCommunityContributionType,
  );
}

function getTypeLabel(value: EnumCommunityContributionType) {
  switch (value) {
    case EnumCommunityContributionType.TALK_SESSION:
      return "Talk sessions";
    case EnumCommunityContributionType.WORKSHOP:
      return "Workshops";
    case EnumCommunityContributionType.ONLINE_COURSE:
      return "Online courses";
  }
}

export default async function CommunityByTypePage({ params }: PageProps) {
  const { type } = await params;
  if (!isValidType(type)) {
    notFound();
  }

  const validatedType = type as EnumCommunityContributionType;
  const contributions = getAllCommunityIndex().filter(
    (c) => c.type === validatedType,
  );

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${getTypeLabel(validatedType)}`,
        description: `${contributions.length} ${pluralize("contribution", contributions.length)} for ${getTypeLabel(validatedType)}.`,
      }}
    >
      <BackButton
        href={URLS.COMMUNITY_LIST()}
        label="Community contributions"
      />
      <div className="content-container">
        <h1 className="text-md font-medium">{getTypeLabel(validatedType)}</h1>
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
          <EmptyPlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  if (!isValidType(type)) {
    return createNotFoundMetadata("Community contributions");
  }

  const validatedType = type as EnumCommunityContributionType;
  const typeLabel = getTypeLabel(validatedType);

  const metadata = createPageMetadata({
    title: `${typeLabel}`,
    description: `All community contributions categorized as ${typeLabel.toLowerCase()}.`,
    keywords: [typeLabel.toLowerCase(), "community", "contributions"],
    url: `${URLS.COMMUNITY_TYPE(type)}`,
    image: getRouteSeoImage(URLS.COMMUNITY_TYPE(type)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const all = getAllCommunityIndex();
  const types = Array.from(new Set(all.map((c) => c.type)));
  return types.map((type) => ({ type }));
}
