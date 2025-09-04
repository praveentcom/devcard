import { MicVocal, MonitorPlay, Presentation } from "lucide-react";
import Link from "next/link";

import { URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EnumCommunityContributionType } from "@/types/community";

import { Badge } from "./badge";

interface ContributionTypeBadgeProps {
  type: EnumCommunityContributionType;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export const getContributionTypeLabel = (
  value: EnumCommunityContributionType,
) => {
  switch (value) {
    case EnumCommunityContributionType.TALK_SESSION:
      return "Talk session";
    case EnumCommunityContributionType.WORKSHOP:
      return "Workshop";
    case EnumCommunityContributionType.ONLINE_COURSE:
      return "Online course";
    default:
      return "Generic contribution";
  }
};

export const getContributionTypeIcon = (
  value: EnumCommunityContributionType,
) => {
  switch (value) {
    case EnumCommunityContributionType.TALK_SESSION:
      return <MicVocal className="size-3" />;
    case EnumCommunityContributionType.WORKSHOP:
      return <Presentation className="size-3" />;
    case EnumCommunityContributionType.ONLINE_COURSE:
      return <MonitorPlay className="size-3" />;
  }
};

export function ContributionTypeBadge({
  type,
  variant = "outline",
  className,
}: ContributionTypeBadgeProps) {
  return (
    <Link href={URLS.COMMUNITY_TYPE(type)}>
      <Badge variant={variant} className={cn("badge-container", className)}>
        {getContributionTypeIcon(type)}
        {getContributionTypeLabel(type)}
      </Badge>
    </Link>
  );
}
