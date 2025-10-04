import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { Markdown } from "passport-ui/markdown";
import { StructuredData } from "passport-ui/structured-data";
import { plural } from "pluralize";

import { ArticleHeader } from "@/components/article/article-header";
import {
  getAllArticleSlugs,
  getArticleBySlugRaw,
} from "@/components/helpers/article";
import { getArticleLabel } from "@/components/helpers/config";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { generateArticleSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

const articleLabel = plural(getArticleLabel());

export default async function ArticlePage({ params }: PageProps) {
  const { slug, year } = await params;
  const rawArticle = getArticleBySlugRaw(slug);

  if (!rawArticle) {
    notFound();
  }

  const article = rawArticle.meta;
  const articleYear = article.year;

  if (articleYear !== year) {
    redirect(`/articles/${articleYear}/${article.slug}`);
  }

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={generateArticleSchema({
          ...article,
          content: rawArticle.raw,
        })}
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
            label: article.title,
            href: URLS.ARTICLES(article.year, article.slug),
          },
        ]}
      />
      <div className="section-container">
        <ArticleHeader article={article} />
        <Markdown content={rawArticle.raw} theme="vs" />
      </div>
    </ContentContainer>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawArticle = getArticleBySlugRaw(slug);

  if (!rawArticle) {
    return createNotFoundMetadata(articleLabel);
  }

  const article = rawArticle.meta;

  const metadata = createPageMetadata({
    title: `${article.title} | ${articleLabel}`,
    description: article.description,
    type: "article",
    keywords: [
      articleLabel.toLowerCase(),
      "articles",
      "blog",
      "development",
      "technology",
      "programming",
      "tutorials",
    ],
    publishedTime: article.date,
    url: URLS.ARTICLES(article.year, article.slug),
    image: article.ogImage || article.image,
  });

  if (article.private) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((a) => ({ year: a.year, slug: a.slug }));
}
