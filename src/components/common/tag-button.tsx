import Image from "next/image";
import { Button } from "passport-ui/button";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { getTagImagePath } from "@/components/helpers/tag-mapper";
import { URLS } from "@/components/helpers/urls";

interface TagButtonProps {
  tag: string;
  className?: string;
  showIcon?: boolean;
  asLink?: boolean;
  source?: "articles" | "projects" | "work";
}

export function TagButton({
  tag,
  className,
  showIcon = true,
  asLink = false,
  source = "projects",
}: TagButtonProps) {
  const badgeContent = (
    <Button variant={"outline"} className={className}>
      {showIcon && (
        <Image
          src={getTagImagePath(tag)}
          alt={`${tag} icon`}
          width={14}
          height={14}
          className="flex-shrink-0 size-4.5"
        />
      )}
      <span className="text-xs font-medium">{tag}</span>
    </Button>
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
      <PrefetchLink
        href={href}
        className="inline-block"
        aria-label={`View ${tag} ${source}`}
      >
        {badgeContent}
      </PrefetchLink>
    );
  }

  return badgeContent;
}
