import { Calendar, Folders, PencilLine } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import { plural } from "pluralize";

import { ArticleCategoryButton } from "@/components/article/article-category-button";
import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { YearButton } from "@/components/common/year-button";
import {
  getAllArticleSlugs,
  getAllCategories,
} from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";

const articleLabel = plural(getArticleLabel());

export default function ArticlesListPage() {
  const publishedArticles = getAllArticleSlugs();

  const tagSet = new Set<string>();
  publishedArticles.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));

  const allCategories = getAllCategories();

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${articleLabel}`,
          description: `A collection of ${articleLabel.toLowerCase()} about development, technology, and more.`,
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
        ]}
      />
      <h2>{articleLabel}</h2>
      {allCategories.length > 0 && (
        <div className="section-container">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Folders className="size-3.5" />
            <h6 className="leading-none">Categories</h6>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {allCategories.map((category) => (
              <ArticleCategoryButton
                key={category}
                category={category}
                asLink
              />
            ))}
          </div>
        </div>
      )}
      {publishedArticles.length > 0 &&
      Array.from(new Set(publishedArticles.map((a) => a.year))).length > 1 ? (
        <div className="section-container">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5" />
            <h6 className="leading-none">Browse by year</h6>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from(new Set(publishedArticles.map((a) => a.year))).map(
              (year) => (
                <YearButton
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
            <PencilLine className="size-3.5" />
            <h6 className="leading-none">All {articleLabel.toLowerCase()}</h6>
          </div>
          <div className="list-container">
            {publishedArticles.map((article) => (
              <ArticleSummaryCard key={article.slug} article={article} />
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
