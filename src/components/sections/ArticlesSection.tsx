import { PencilLine } from "lucide-react";
import Link from "next/link";
import { plural } from "pluralize";

import { ArticleSummaryCard } from "@/components/article/ArticleSummaryCard";
import { Button } from "@/components/ui/button";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { URLS } from "@/lib/constants/urls";
import { ArticleFrontmatter } from "@/lib/helpers/article";
import { getArticleLabel } from "@/lib/helpers/config";

const articleLabel = plural(getArticleLabel());

export function ArticlesSection({
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
          <PencilLine className="size-3" />
          <h2 className="text-xs tracking-wide uppercase font-semibold">
            {articleLabel}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={URLS.RSS_FEED()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <p>RSS feed {"\u2197"}</p>
            </Link>
          </Button>
          {articles.length > 2 && (
            <Button asChild>
              <Link
                href={URLS.ARTICLES_LIST()}
                className="flex items-center gap-1"
              >
                View all &rarr;
              </Link>
            </Button>
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
        <EmptyPlaceholderCard />
      )}
    </section>
  );
}
