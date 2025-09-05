import { Calendar, Folders, PencilLine } from "lucide-react";
import type { Metadata } from "next";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { CategoryBadge } from "@/components/article/category-badge";
import { YearBadge } from "@/components/common/year-badge";
import {
  getAllArticleSlugs,
  getAllCategories,
} from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

const articleLabel = plural(getArticleLabel());

export default function ArticlesListPage() {
  const publishedArticles = getAllArticleSlugs();
  const tagSet = new Set<string>();
  publishedArticles.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  const allCategories = getAllCategories();

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${articleLabel}`,
        description: `A collection of ${articleLabel.toLowerCase()} about development, technology, and more.`,
      }}
    >
      <div className="content-container">
        <h1 className="text-md font-medium">{articleLabel}</h1>
        {allCategories.length > 0 && (
          <div className="section-container">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Folders className="size-3" />
              <h2 className="text-xs tracking-wide uppercase font-semibold">
                Categories
              </h2>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allCategories.map((category) => (
                <CategoryBadge key={category} category={category} asLink />
              ))}
            </div>
          </div>
        )}
        {publishedArticles.length > 0 &&
        Array.from(new Set(publishedArticles.map((a) => a.year))).length > 1 ? (
          <div className="section-container">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3" />
              <h2 className="text-xs tracking-wide uppercase font-semibold">
                Browse by year
              </h2>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {Array.from(new Set(publishedArticles.map((a) => a.year))).map(
                (year) => (
                  <YearBadge
                    key={`${year}-article`}
                    year={year}
                    type="article"
                    asLink
                  />
                ),
              )}
            </div>
          </div>
        ) : null}
        {publishedArticles.length > 0 ? (
          <div className="section-container">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <PencilLine className="size-3" />
              <h2 className="text-xs tracking-wide uppercase font-semibold">
                All {articleLabel.toLowerCase()}
              </h2>
            </div>
            <div className="list-container">
              {publishedArticles.map((article) => (
                <ArticleSummaryCard key={article.slug} article={article} />
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
    title: `${articleLabel}`,
    description: `A collection of ${articleLabel.toLowerCase()} about development, technology, and more.`,
    type: "website",
    keywords: [
      articleLabel.toLowerCase(),
      "blog",
      "development",
      "technology",
      "programming",
      "tutorials",
    ],
    url: URLS.ARTICLES_LIST(),
    image: getRouteSeoImage(URLS.ARTICLES_LIST()),
  });

  return metadata;
}
