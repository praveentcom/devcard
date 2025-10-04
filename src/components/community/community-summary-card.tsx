"use client";

import { PrefetchLink } from "passport-ui/prefetch-link";

import { CommunityIndexItem } from "@/components/helpers/community";
import { formatDate } from "@/components/helpers/date";
import { URLS } from "@/components/helpers/urls";

export function CommunitySummaryCard({
  contribution,
}: {
  contribution: CommunityIndexItem;
}) {
  return (
    <div className="meta-container">
      <div className="flex gap-2 md:gap-4 group">
        <p className="min-w-24 text-muted-foreground group-hover:text-foreground opacity-70 text-xs md:text-sm">
          {formatDate(contribution.date)}
        </p>
        <PrefetchLink
          href={URLS.COMMUNITY(contribution.year, contribution.slug)}
          prefetchOnVisible={true}
        >
          <p className="group-hover:underline text-foreground underline-offset-4 decoration-muted-foreground/50 line-clamp-1">
            {contribution.title}
          </p>
        </PrefetchLink>
      </div>
    </div>
  );
}
