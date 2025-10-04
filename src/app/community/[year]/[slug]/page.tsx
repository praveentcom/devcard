import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { Markdown } from "passport-ui/markdown";
import { StructuredData } from "passport-ui/structured-data";

import { CommunityHeader } from "@/components/community/community-header";
import {
  getAllCommunitySlugs,
  getCommunityBySlugRaw,
} from "@/components/helpers/community";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { generateCommunitySchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

export default async function CommunityContributionPage({ params }: PageProps) {
  const { slug } = await params;
  const rawCommunity = getCommunityBySlugRaw(slug);

  if (!rawCommunity) {
    notFound();
  }

  const contribution = rawCommunity.meta;

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={generateCommunitySchema({
          ...contribution,
          content: rawCommunity.raw,
        })}
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
            label: contribution.title,
            href: URLS.COMMUNITY(contribution.year, contribution.slug),
          },
        ]}
      />
      <div className="section-container">
        <CommunityHeader contribution={contribution} />
        <Markdown content={rawCommunity.raw} theme="vs" />
      </div>
    </ContentContainer>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawCommunity = getCommunityBySlugRaw(slug);

  if (!rawCommunity) {
    return createNotFoundMetadata("Community");
  }

  const community = rawCommunity.meta;
  const { year } = await params;

  const metadata = createPageMetadata({
    title: `${community.title}`,
    description: community.description,
    keywords: [community.title, "community", "contributions"],
    publishedTime: new Date(community.date).toISOString(),
    type: "article",
    url: URLS.COMMUNITY(year, community.slug),
    image: community.ogImage || community.image,
  });

  return metadata;
}

export async function generateStaticParams() {
  const contributions = getAllCommunitySlugs();
  return contributions.map((contribution) => ({
    year: contribution.year,
    slug: contribution.slug,
  }));
}
