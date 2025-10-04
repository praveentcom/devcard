"use client";

import { PrefetchLink } from "passport-ui/prefetch-link";

import { formatDate } from "@/components/helpers/date";
import { URLS } from "@/components/helpers/urls";
import { Article } from "@/types/article";

export type ArticleLike = Pick<
  Article,
  | "slug"
  | "title"
  | "description"
  | "date"
  | "readTime"
  | "tags"
  | "categories"
  | "published"
  | "image"
> & { year: string };

export function ArticleSummaryCard({ article }: { article: ArticleLike }) {
  return (
    <div className="meta-container">
      <PrefetchLink
        href={URLS.ARTICLES(article.year, article.slug)}
        prefetchOnVisible={true}
      >
        <div className="flex gap-2 md:gap-4 group">
          <p className="min-w-24 text-muted-foreground group-hover:text-foreground opacity-70 text-xs md:text-sm">
            {formatDate(article.date)}
          </p>
          <p className="group-hover:underline text-foreground underline-offset-4 decoration-muted-foreground/50 line-clamp-1">
            {article.title}
          </p>
        </div>
      </PrefetchLink>
    </div>
  );
}
