import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { URLS } from "@/lib/constants/urls";
import { cn } from "@/lib/utils";

interface YearBadgeProps {
  year: string;
  type: "article" | "community";
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  asLink?: boolean;
}

export function YearBadge({
  year,
  type,
  variant = "outline",
  className,
  asLink = false,
}: YearBadgeProps) {
  const safeYear = /^\d+$/.test(year) ? year : "unknown";
  const badgeContent = (
    <Badge variant={variant} className={cn("badge-container", className)}>
      <span className="text-xs font-medium">{safeYear}</span>
    </Badge>
  );

  if (!asLink || safeYear === "unknown") {
    return badgeContent;
  }

  return (
    <Link
      href={
        type === "article"
          ? URLS.ARTICLES_YEAR(safeYear)
          : URLS.COMMUNITY_YEAR(safeYear)
      }
    >
      {badgeContent}
    </Link>
  );
}
