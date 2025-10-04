import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import pluralize from "pluralize";

import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { getAllCommunityIndex } from "@/components/helpers/community";
import { getRouteSeoImage } from "@/components/helpers/config";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
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
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${getTypeLabel(validatedType)}`,
          description: `${contributions.length} ${pluralize("contribution", contributions.length)}`,
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
            label: getTypeLabel(validatedType),
            href: URLS.COMMUNITY_TYPE(type),
          },
        ]}
      />
      <h2>{getTypeLabel(validatedType)}</h2>
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
  const { type } = await params;
  if (!isValidType(type)) {
    return createNotFoundMetadata("Community");
  }

  const validatedType = type as EnumCommunityContributionType;
  const typeLabel = getTypeLabel(validatedType);

  const metadata = createPageMetadata({
    title: `${typeLabel}`,
    description: `All ${typeLabel.toLowerCase()} contributions.`,
    keywords: [typeLabel.toLowerCase(), "community"],
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
