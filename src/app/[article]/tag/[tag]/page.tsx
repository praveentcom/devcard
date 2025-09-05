import type { Metadata } from "next";
import Image from "next/image";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { getAllArticlesIndex } from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { getTagImagePath } from "@/components/helpers/tag-mapper";
import { URLS } from "@/components/helpers/urls";
import { BackButton, PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

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
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${tag} ${articleLabel.toLowerCase()}`,
        description: `${filteredArticles.length} ${articleLabel.toLowerCase()} tagged with ${tag}.`,
      }}
    >
      <BackButton href={URLS.ARTICLES_LIST()} label={articleLabel} />
      <div className="content-container">
        <div className="flex items-center gap-2">
          <Image
            src={getTagImagePath(tag)}
            alt={`${tag} icon`}
            width={12}
            height={12}
            className="flex-shrink-0 size-3.5"
          />
          <h1 className="text-md font-medium">
            {tag} {articleLabel.toLowerCase()}
          </h1>
        </div>
        {filteredArticles.length > 0 ? (
          <div className="list-container">
            {filteredArticles.map((article, index) => (
              <ArticleSummaryCard key={index} article={article} />
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
