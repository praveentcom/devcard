export interface CommunityLink {
  title: string;
  url: string;
}

export enum EnumCommunityContributionType {
  TALK_SESSION = "talk-session",
  WORKSHOP = "workshop",
  ONLINE_COURSE = "online-course",
}

export type CommunityContributionType = `${EnumCommunityContributionType}`;

export interface Community {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  published: boolean;
  image?: string;
  youtubeUrl?: string;
  externalLinks?: CommunityLink[];
  type: CommunityContributionType;
  event?: string;
  ogImage?: string;
}

export interface CommunityPageData {
  image?: string;
  title: string;
  descriptionLine1: string;
  descriptionLine2: string;
}
