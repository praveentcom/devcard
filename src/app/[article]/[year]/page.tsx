import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { getAllArticlesIndex } from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { BackButton, PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

const articleLabel = plural(getArticleLabel());

export default async function ArticlesByYearPage({ params }: PageProps) {
  const { year } = await params;
  const articles = getAllArticlesIndex().filter((a) => a.year === year);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Articles from ${year}`,
        description: `A comprehensive showcase of all my articles from ${year}.`,
      }}
    >
      <BackButton href={URLS.ARTICLES_LIST()} label={articleLabel} />
      <div className="content-container">
        <h1 className="text-md font-medium">
          {articleLabel} from {year}
        </h1>
        {articles.length > 0 ? (
          <div className="list-container">
            {articles.map((article) => (
              <ArticleSummaryCard key={article.slug} article={article} />
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
  const count = getAllArticlesIndex().filter((a) => a.year === year).length;

  const metadata = createPageMetadata({
    title: `${articleLabel} from ${year}`,
    description: `${count} ${articleLabel.toLowerCase()} published in ${year}.`,
    keywords: [
      articleLabel.toLowerCase(),
      year,
      "articles",
      "blog",
      "development",
      "technology",
      "programming",
      "tutorials",
    ],
    url: `${URLS.ARTICLES_YEAR(year)}`,
    image: getRouteSeoImage(URLS.ARTICLES_YEAR(year)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const years = Array.from(new Set(getAllArticlesIndex().map((a) => a.year)));
  return years.map((year) => ({ year }));
}
