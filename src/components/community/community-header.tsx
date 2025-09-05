import { Calendar, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CommunityTypeBadge } from "@/components/community/community-type-badge";
import type { CommunityIndexItem } from "@/components/helpers/community";
import { formatDate } from "@/components/helpers/date";
import { generatePlaceholderImageUrl } from "@/components/helpers/image";
import { Button } from "@/ui/client";

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
        <div className="flex items-center min-w-0 gap-3 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1 flex-shrink-0">
            <Calendar className="size-3" />
            <span>{formatDate(contribution.date)}</span>
          </div>
        </div>
        <div className="title-container">
          <h1 className="font-medium text-lg">{contribution.title}</h1>
          <p className="text-muted-foreground text-sm">
            {contribution.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {contribution.type && <CommunityTypeBadge type={contribution.type} />}
        {/* YouTube Video Link */}
        {contribution.youtubeUrl && (
          <Button asChild>
            <Link
              href={contribution.youtubeUrl}
              target="_blank"
              className="hide-on-mobile"
            >
              <div className="flex gap-1 items-center hover:text-foreground">
                <Youtube className="size-3" />
                <p>Watch on YouTube</p>
              </div>
            </Link>
          </Button>
        )}

        {/* External Links */}
        {contribution.externalLinks &&
          contribution.externalLinks.map((link, index) => (
            <Button key={`${link.title}-${index}`} asChild>
              <Link href={link.url} target="_blank" className="hide-on-mobile">
                <div className="flex gap-1 items-center hover:text-foreground">
                  <p>{link.title}</p>
                  <p>{"\u2197"}</p>
                </div>
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
