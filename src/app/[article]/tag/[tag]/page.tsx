import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { getAllArticlesIndex } from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { getTagImagePath } from "@/components/helpers/tag-mapper";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

const articleLabel = plural(getArticleLabel());

export default async function TagArticlePage({ params }: PageProps) {
  const { tag } = await params;

  const filteredArticles = getAllArticlesIndex().filter((article) =>
    article.tags.includes(tag),
  );

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${tag} ${articleLabel.toLowerCase()}`,
          description: `${filteredArticles.length} ${articleLabel.toLowerCase()} tagged with ${tag}.`,
        }}
      />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: articleLabel,
            href: URLS.ARTICLES_LIST(),
          },
          {
            label: `${tag} ${articleLabel.toLowerCase()}`,
            href: URLS.ARTICLES_TAG(tag),
          },
        ]}
      />
      <div className="flex items-center gap-2">
        <Image
          src={getTagImagePath(tag)}
          alt={`${tag} icon`}
          width={14}
          height={14}
          className="flex-shrink-0 size-4.5"
        />
        <h2>
          {tag} {articleLabel.toLowerCase()}
        </h2>
      </div>
      {filteredArticles.length > 0 ? (
        <div className="list-container">
          {filteredArticles.map((article, index) => (
            <ArticleSummaryCard key={index} article={article} />
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
  const { tag } = await params;

  const filteredArticles = getAllArticlesIndex().filter((article) =>
    article.tags.includes(tag),
  );

  const metadata = createPageMetadata({
    title: `${tag} ${articleLabel.toLowerCase()}`,
    description: `${filteredArticles.length} ${articleLabel.toLowerCase()} tagged with ${tag}.`,
    keywords: [
      tag,
      articleLabel.toLowerCase(),
      "articles",
      "blog",
      "development",
      "technology",
      "programming",
      "tutorials",
    ],
    url: URLS.ARTICLES_TAG(tag),
    image: getRouteSeoImage(URLS.ARTICLES_TAG(tag)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const tagsWithArticles = new Set<string>();

  getAllArticlesIndex().forEach((article) =>
    article.tags.forEach((tag) => tagsWithArticles.add(tag)),
  );

  return Array.from(tagsWithArticles).map((tag) => ({ tag }));
}
