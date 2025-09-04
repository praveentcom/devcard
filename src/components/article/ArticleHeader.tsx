import { Calendar, Eye, UserRound } from "lucide-react";
import Image from "next/image";

import { CategoryBadge } from "@/components/ui/category-badge";
import { TagBadge } from "@/components/ui/tag-badge";
import { PROFILE_NAME } from "@/lib/helpers/config";
import { generateArticlePlaceholderImage } from "@/lib/helpers/image";
import { formatDate } from "@/lib/helpers/markdown";

import type { ArticleLike } from "./ArticleSummaryCard";

interface ArticleHeaderProps {
  article: ArticleLike;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="section-container">
      <div className="relative w-full aspect-[1200/628] rounded-sm overflow-hidden">
        <Image
          src={article.image || generateArticlePlaceholderImage(article.title)}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
        />
      </div>

      <div className="section-container">
        <div className="flex items-center min-w-0 gap-3 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1 flex-shrink-0">
            <Calendar className="size-3" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Eye className="size-3" />
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <UserRound className="size-3" />
            <span>{PROFILE_NAME}</span>
          </div>
        </div>
        <div className="title-container">
          <h1 className="font-medium text-lg">{article.title}</h1>
          <p className="text-muted-foreground text-sm">{article.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {article.categories.map((category, index) => (
          <CategoryBadge key={index} category={category} asLink />
        ))}
        {article.tags.map((tag, index) => (
          <TagBadge key={index} tag={tag} source="articles" asLink />
        ))}
      </div>
    </div>
  );
}
