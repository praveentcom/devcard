import { Button } from "passport-ui/button";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { URLS } from "@/components/helpers/urls";

interface ArticleCategoryButtonProps {
  category: string;
  className?: string;
  asLink?: boolean;
}

export function ArticleCategoryButton({
  category,
  className,
  asLink = false,
}: ArticleCategoryButtonProps) {
  const badgeContent = (
    <Button variant={"outline"} className={className}>
      <span className="text-xs font-medium">{category}</span>
    </Button>
  );

  if (!asLink) {
    return badgeContent;
  }

  return (
    <PrefetchLink href={URLS.ARTICLES_CATEGORY(encodeURIComponent(category))}>
      {badgeContent}
    </PrefetchLink>
  );
}
