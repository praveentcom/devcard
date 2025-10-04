import { Calendar, Youtube } from "lucide-react";
import Image from "next/image";
import { Button } from "passport-ui/button";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { CommunityTypeButton } from "@/components/community/community-type-button";
import type { CommunityIndexItem } from "@/components/helpers/community";
import { formatDate } from "@/components/helpers/date";
import { generatePlaceholderImageUrl } from "@/components/helpers/image";

interface CommunityHeaderProps {
  contribution: CommunityIndexItem;
}

export function CommunityHeader({ contribution }: CommunityHeaderProps) {
  return (
    <div className="section-container">
      <div className="relative w-full aspect-[1200/628] rounded-sm overflow-hidden">
        <Image
          src={
            contribution.image ||
            generatePlaceholderImageUrl({ text: contribution.title })
          }
          alt={contribution.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
        />
      </div>
      <div className="section-container">
        <div className="flex items-center min-w-0 gap-4">
          <div className="flex items-center gap-1 flex-shrink-0 text-muted-foreground">
            <Calendar className="size-3.5" />
            <span className="text-xs font-medium leading-none">
              {formatDate(contribution.date)}
            </span>
          </div>
        </div>
        <div className="meta-container">
          <h3>{contribution.title}</h3>
          <p className="text-muted-foreground">{contribution.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {contribution.type && <CommunityTypeButton type={contribution.type} />}
        {contribution.youtubeUrl && (
          <PrefetchLink
            href={contribution.youtubeUrl}
            target="_blank"
            className="hide-on-mobile"
          >
            <Button>
              <Youtube />
              Watch on YouTube
            </Button>
          </PrefetchLink>
        )}
        {contribution.externalLinks &&
          contribution.externalLinks.map((link, index) => (
            <PrefetchLink
              key={`${link.title}-${index}`}
              href={link.url}
              target="_blank"
              className="hide-on-mobile"
            >
              <Button>
                {link.title} {"\u2197"}
              </Button>
            </PrefetchLink>
          ))}
      </div>
    </div>
  );
}
