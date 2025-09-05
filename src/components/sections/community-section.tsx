import { HeartHandshake } from "lucide-react";
import Link from "next/link";

import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { CommunityFrontmatter } from "@/components/helpers/community";
import { URLS } from "@/components/helpers/urls";
import { PlaceholderCard } from "@/ui/client";
import { Button } from "@/ui/client";

export function CommunitySection({
  contributions,
}: {
  contributions: CommunityFrontmatter[];
}) {
  return (
    <section
      role="region"
      aria-label="Community contributions"
      className="section-container"
    >
      <div className="flex items-center justify-between gap-1.5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <HeartHandshake className="size-3" />
          <h2 className="text-xs tracking-wide uppercase font-semibold">
            Community contributions
          </h2>
        </div>
        {contributions.length > 2 && (
          <Button asChild>
            <Link
              href={URLS.COMMUNITY_LIST()}
              className="flex items-center gap-1"
            >
              View all &rarr;
            </Link>
          </Button>
        )}
      </div>
      {contributions.length > 0 ? (
        <div className="list-container">
          {contributions.map((contribution, index) => (
            <CommunitySummaryCard key={index} contribution={contribution} />
          ))}
        </div>
      ) : (
        <PlaceholderCard />
      )}
    </section>
  );
}
