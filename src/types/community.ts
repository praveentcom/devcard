import { z } from "zod";

const CommunityLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
});

export enum EnumCommunityContributionType {
  TALK_SESSION = "talk-session",
  WORKSHOP = "workshop",
  ONLINE_COURSE = "online-course",
}

export type CommunityContributionType = `${EnumCommunityContributionType}`;

const CommunitySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  published: z.boolean().default(true),
  image: z.string().optional(),
  ogImage: z.string().optional(),
  slug: z.string().optional(),
  youtubeUrl: z.string().optional(),
  externalLinks: z.array(CommunityLinkSchema).optional(),
  event: z.string().optional(),
  type: z.enum(EnumCommunityContributionType),
});

export type Community = z.infer<typeof CommunitySchema> & {
  year: string;
  slug: string;
  content: string;
  image: string;
};

export type CommunityFrontmatter = z.infer<typeof CommunitySchema> & {
  year: string;
  slug: string;
  image: string;
};

export interface CommunityPageData {
  image?: string;
  title: string;
}

export { CommunityLinkSchema, CommunitySchema };
