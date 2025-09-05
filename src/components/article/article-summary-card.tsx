import { formatDate } from "@/components/helpers/date";
import { URLS } from "@/components/helpers/urls";
import { Article } from "@/types/article";
import { PrefetchLink } from "@/ui/client";

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
        <div className="flex justify-between items-center gap-4 font-medium">
          <h1 className="text-sm underline text-foreground underline-offset-4 decoration-accent-foreground/10 hover:decoration-accent-foreground/50 line-clamp-1">
            {article.title}
          </h1>
          <p className="text-xs min-w-fit text-muted-foreground">
            {formatDate(article.date)}
          </p>
        </div>
      </PrefetchLink>
    </div>
  );
}
