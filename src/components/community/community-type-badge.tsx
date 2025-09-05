import { MicVocal, MonitorPlay, Presentation } from "lucide-react";
import Link from "next/link";

import { URLS } from "@/components/helpers/urls";
import { EnumCommunityContributionType } from "@/types/community";
import { Badge } from "@/ui/client";
import { cn } from "@/ui/server";

interface CommunityTypeBadgeProps {
  type: EnumCommunityContributionType;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export const getCommunityTypeLabel = (value: EnumCommunityContributionType) => {
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

export const getCommunityTypeIcon = (value: EnumCommunityContributionType) => {
  switch (value) {
    case EnumCommunityContributionType.TALK_SESSION:
      return <MicVocal className="size-3" />;
    case EnumCommunityContributionType.WORKSHOP:
      return <Presentation className="size-3" />;
    case EnumCommunityContributionType.ONLINE_COURSE:
      return <MonitorPlay className="size-3" />;
  }
};

export function CommunityTypeBadge({
  type,
  variant = "outline",
  className,
}: CommunityTypeBadgeProps) {
  return (
    <Link href={URLS.COMMUNITY_TYPE(type)}>
      <Badge variant={variant} className={cn("badge-container", className)}>
        {getCommunityTypeIcon(type)}
        {getCommunityTypeLabel(type)}
      </Badge>
    </Link>
  );
}
