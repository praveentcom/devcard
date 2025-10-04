"use client";

import { HeartHandshake } from "lucide-react";
import { Button } from "passport-ui/button";
import { EmptyState } from "passport-ui/empty-state";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { CommunitySummaryCard } from "@/components/community/community-summary-card";
import { URLS } from "@/components/helpers/urls";
import { CommunityFrontmatter } from "@/types/community";

export function CommunitySection({
  contributions,
}: {
  contributions: CommunityFrontmatter[];
}) {
  return (
    <section
      role="region"
      aria-label="Community Contributions"
      className="section-container"
    >
      <div className="flex items-center justify-between gap-1.5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <HeartHandshake className="size-3.5" />
          <h6 className="leading-none">Community Contributions</h6>
        </div>
        {contributions.length > 2 && (
          <PrefetchLink href={URLS.COMMUNITY_LIST()}>
            <Button>View all &rarr;</Button>
          </PrefetchLink>
        )}
      </div>
      {contributions.length > 0 ? (
        <div className="list-container">
          {contributions.map((contribution, index) => (
            <CommunitySummaryCard key={index} contribution={contribution} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
