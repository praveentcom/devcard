import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { URLS } from "@/lib/constants/urls";
import { getTagImagePath } from "@/lib/helpers/tag-mapper";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
  showIcon?: boolean;
  asLink?: boolean;
  source?: "articles" | "projects" | "work";
}

export function TagBadge({
  tag,
  className,
  showIcon = true,
  asLink = false,
  source = "projects",
}: TagBadgeProps) {
  const badgeContent = (
    <Badge variant={"outline"} className={cn("badge-container", className)}>
      {showIcon && (
        <Image
          src={getTagImagePath(tag)}
          alt={`${tag} icon`}
          width={12}
          height={12}
          className="flex-shrink-0 size-3.5"
        />
      )}
      <span>{tag}</span>
    </Badge>
  );

  if (asLink) {
    let href = "";
    switch (source) {
      case "articles":
        href = URLS.ARTICLES_TAG(tag);
        break;
      case "work":
      case "projects":
      default:
        href = URLS.PROJECTS_STACK(tag);
        break;
    }

    return (
      <Link
        href={href}
        className="inline-block"
        aria-label={`View ${tag} ${source}`}
      >
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}
