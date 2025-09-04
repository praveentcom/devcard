import { Youtube } from "lucide-react";
import Link from "next/link";

import { getContributionTypeLabel } from "@/components/ui/contribution-type-badge";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { URLS } from "@/lib/constants/urls";
import { CommunityIndexItem } from "@/lib/helpers/community";
import { formatDate } from "@/lib/helpers/markdown";

export function CommunitySummaryCard({
  contribution,
}: {
  contribution: CommunityIndexItem;
}) {
  return (
    <div className="meta-container">
      <PrefetchLink
        href={URLS.COMMUNITY(contribution.year, contribution.slug)}
        prefetchOnVisible={true}
      >
        <div className="flex justify-between items-center gap-4 font-medium">
          <h1 className="text-sm underline text-foreground underline-offset-4 decoration-accent-foreground/10 hover:decoration-accent-foreground/50 line-clamp-1">
            {contribution.title}
          </h1>
          <div className="text-xs flex items-center min-w-fit text-muted-foreground">
            <p>{formatDate(contribution.date)}</p>
          </div>
        </div>
      </PrefetchLink>
      <div className="flex line-clamp-2 text-xs font-medium text-muted-foreground">
        <p>
          {contribution.event ?? getContributionTypeLabel(contribution.type)}
        </p>
        {contribution.externalLinks &&
          contribution.externalLinks.map((link, index) => (
            <Link
              href={link.url}
              target="_blank"
              key={`${link.title}-${index}`}
              className="hide-on-mobile"
            >
              <div className="flex gap-1 items-center before:content-['·'] before:mx-1.5 hover:text-foreground">
                <p>{"\u2197"}</p>
                <p>{link.title}</p>
              </div>
            </Link>
          ))}
        {contribution.youtubeUrl && (
          <Link
            href={contribution.youtubeUrl}
            target="_blank"
            className="hide-on-mobile"
          >
            <div className="flex gap-1 items-center before:content-['·'] before:mx-1 hover:text-foreground">
              <Youtube className="size-3" />
              <p>Watch on YouTube</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
