import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { BackButton, PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

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
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${decodedCategory} ${articleLabel.toLowerCase()}`,
        description: `${filteredArticles.length} ${articleLabel.toLowerCase()} published in this category.`,
      }}
    >
      <BackButton href={URLS.ARTICLES_LIST()} label={articleLabel} />
      <div className="content-container">
        <h1 className="text-md font-medium">
          {decodedCategory} {articleLabel.toLowerCase()}
        </h1>
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
