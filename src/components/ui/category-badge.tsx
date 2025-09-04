import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { URLS } from "@/lib/constants/urls";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  asLink?: boolean;
}

export function CategoryBadge({
  category,
  className,
  asLink = false,
}: CategoryBadgeProps) {
  const badgeContent = (
    <Badge variant={"outline"} className={cn("badge-container", className)}>
      <span className="text-xs font-medium">{category}</span>
    </Badge>
  );

  if (!asLink) {
    return badgeContent;
  }

  return (
    <Link href={URLS.ARTICLES_CATEGORY(encodeURIComponent(category))}>
      {badgeContent}
    </Link>
  );
}
