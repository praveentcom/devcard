import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import {
  getAllCategories,
  getArticlesByCategory,
} from "@/components/helpers/article";
import { getArticleLabel, getRouteSeoImage } from "@/components/helpers/config";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

const articleLabel = plural(getArticleLabel());

export default async function CategoryArticlePage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const allCategories = getAllCategories();

  if (!allCategories.includes(decodedCategory)) {
    notFound();
  }

  const filteredArticles = getArticlesByCategory(decodedCategory);

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${decodedCategory} ${articleLabel.toLowerCase()}`,
          description: `${filteredArticles.length} ${articleLabel.toLowerCase()} published in this category.`,
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
            label: `${decodedCategory} ${articleLabel.toLowerCase()}`,
            href: URLS.ARTICLES_CATEGORY(category),
          },
        ]}
      />
      <h2>
        {decodedCategory} {articleLabel.toLowerCase()}
      </h2>
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
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const allCategories = getAllCategories();

  if (!allCategories.includes(decodedCategory)) {
    return createNotFoundMetadata("Category");
  }

  const filteredArticles = getArticlesByCategory(decodedCategory);

  const metadata = createPageMetadata({
    title: `${decodedCategory} ${articleLabel.toLowerCase()}`,
    description: `${filteredArticles.length} ${articleLabel.toLowerCase()} published in this category.`,
    keywords: [
      decodedCategory,
      articleLabel.toLowerCase(),
      "articles",
      "blog",
      "development",
      "technology",
      "programming",
      "tutorials",
    ],
    url: URLS.ARTICLES_CATEGORY(category),
    image: getRouteSeoImage(URLS.ARTICLES_CATEGORY(category)),
  });

  return metadata;
}

export async function generateStaticParams() {
  const categoriesWithArticles = getAllCategories();

  return categoriesWithArticles.map((category) => ({
    category: encodeURIComponent(category),
  }));
}
