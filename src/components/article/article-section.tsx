import { PencilLine } from "lucide-react";
import { Button } from "passport-ui/button";
import { EmptyState } from "passport-ui/empty-state";
import { PrefetchLink } from "passport-ui/prefetch-link";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/article-summary-card";
import { getArticleLabel } from "@/components/helpers/config";
import { URLS } from "@/components/helpers/urls";
import { ArticleFrontmatter } from "@/types/article";

const articleLabel = plural(getArticleLabel());

export function ArticleSection({
  articles,
}: {
  articles: ArticleFrontmatter[];
}) {
  return (
    <section
      role="region"
      aria-label={`Recent ${articleLabel.toLowerCase()}`}
      className="section-container"
    >
      <div className="flex items-center justify-between gap-1.5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <PencilLine className="size-3.5" />
          <h6 className="leading-none">{articleLabel}</h6>
        </div>
        <div className="flex items-center gap-2">
          <PrefetchLink
            href={URLS.RSS_FEED()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>RSS feed {"\u2197"}</Button>
          </PrefetchLink>
          {articles.length > 2 && (
            <PrefetchLink href={URLS.ARTICLES_LIST()}>
              <Button>View all &rarr;</Button>
            </PrefetchLink>
          )}
        </div>
      </div>
      {articles.length > 0 ? (
        <div className="list-container">
          {articles.map((article, index) => (
            <ArticleSummaryCard key={index} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
