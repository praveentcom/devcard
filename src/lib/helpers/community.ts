import fs from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { generateCommunityPlaceholderImage } from "@/lib/helpers/image";
import { EnumCommunityContributionType } from "@/types/community";

const COMMUNITY_CONTENT_DIR = path.join(process.cwd(), "data", "community");

const CommunityLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
});

export const CommunityFrontmatterSchema = z.object({
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

export type CommunityFrontmatter = Required<
  Pick<
    z.infer<typeof CommunityFrontmatterSchema>,
    "title" | "description" | "date" | "published"
  >
> &
  Omit<
    z.infer<typeof CommunityFrontmatterSchema>,
    "title" | "description" | "date" | "published"
  > & {
    year: string;
    slug: string;
  };

export type CommunityIndexItem = CommunityFrontmatter;

function isMdxFile(filePath: string): boolean {
  return filePath.endsWith(".mdx");
}

function readDirRecursive(dir: string, limit?: number): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readDirRecursive(full, limit));
    } else if (isMdxFile(full)) {
      files.push(full);
    }
  }
  return limit ? files.slice(0, limit) : files;
}

function extractYearFromPath(fullPath: string): string {
  const rel = path.relative(COMMUNITY_CONTENT_DIR, fullPath);
  const segments = rel.split(path.sep);
  const year = segments[0];
  return year ?? "unknown";
}

function deriveSlug(
  frontmatterSlug: string | undefined,
  fullPath: string,
): string {
  if (frontmatterSlug && frontmatterSlug.trim().length > 0)
    return frontmatterSlug.trim();
  const base = path.basename(fullPath, path.extname(fullPath));
  return base;
}

export function getAllCommunityFiles(limit?: number): string[] {
  if (!fs.existsSync(COMMUNITY_CONTENT_DIR)) return [];

  return readDirRecursive(COMMUNITY_CONTENT_DIR, limit);
}

export function getAllCommunitySlugs(): CommunityIndexItem[] {
  const files = getAllCommunityFiles();
  const items: CommunityIndexItem[] = files.map((fullPath) => {
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);

    const parsed = CommunityFrontmatterSchema.parse(data);
    const year = extractYearFromPath(fullPath);
    const slug = deriveSlug(parsed.slug, fullPath);

    const normalized: CommunityFrontmatter = {
      title: parsed.title,
      description: parsed.description,
      date: parsed.date,
      published: parsed.published ?? true,
      image: parsed.image || generateCommunityPlaceholderImage(parsed.title),
      ogImage: parsed.ogImage,
      slug,
      year,
      youtubeUrl: parsed.youtubeUrl,
      externalLinks: parsed.externalLinks,
      type: parsed.type,
      event: parsed.event,
    };

    return normalized;
  });

  return items
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCommunityBySlugCompiled(slug: string): Promise<{
  meta: CommunityIndexItem;
  Content: React.ReactNode;
} | null> {
  const files = getAllCommunityFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = CommunityFrontmatterSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");

  const { content, frontmatter } = await compileMDX<{ [key: string]: unknown }>(
    {
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      },
    },
  );

  const year = extractYearFromPath(match);
  const ensuredSlug = deriveSlug(
    typeof (frontmatter as Record<string, unknown>)?.slug === "string"
      ? ((frontmatter as Record<string, unknown>).slug as string)
      : undefined,
    match,
  );

  const parsed = CommunityFrontmatterSchema.parse(frontmatter);
  const meta: CommunityFrontmatter = {
    title: parsed.title,
    description: parsed.description,
    date: parsed.date,
    published: parsed.published ?? true,
    image: parsed.image || generateCommunityPlaceholderImage(parsed.title),
    ogImage: parsed.ogImage,
    slug: ensuredSlug,
    year,
    youtubeUrl: parsed.youtubeUrl,
    externalLinks: parsed.externalLinks,
    type: parsed.type,
    event: parsed.event,
  };

  return { meta, Content: content };
}

export function getCommunityBySlugRaw(
  slug: string,
): { meta: CommunityIndexItem; raw: string } | null {
  const files = getAllCommunityFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = CommunityFrontmatterSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");
  const { data, content } = matter(raw);
  const year = extractYearFromPath(match);
  const parsed = CommunityFrontmatterSchema.parse(data);
  const ensuredSlug = deriveSlug(parsed.slug, match);
  const meta: CommunityFrontmatter = {
    title: parsed.title,
    description: parsed.description,
    date: parsed.date,
    published: parsed.published ?? true,
    image: parsed.image || generateCommunityPlaceholderImage(parsed.title),
    ogImage: parsed.ogImage,
    slug: ensuredSlug,
    year,
    youtubeUrl: parsed.youtubeUrl,
    externalLinks: parsed.externalLinks,
    type: parsed.type,
    event: parsed.event,
  };

  return { meta, raw: content };
}

export function getAllCommunityIndex(limit?: number): CommunityIndexItem[] {
  const files = getAllCommunityFiles(limit);
  const items: CommunityIndexItem[] = files.map((fullPath) => {
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const parsed = CommunityFrontmatterSchema.parse(data);

    const normalized: CommunityFrontmatter = {
      title: parsed.title,
      description: parsed.description,
      date: parsed.date,
      published: parsed.published ?? true,
      image: parsed.image || generateCommunityPlaceholderImage(parsed.title),
      year: extractYearFromPath(fullPath),
      slug: deriveSlug(parsed.slug, fullPath),
      ogImage: parsed.ogImage,
      youtubeUrl: parsed.youtubeUrl,
      externalLinks: parsed.externalLinks,
      type: parsed.type,
      event: parsed.event,
    };

    return normalized;
  });

  return items
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
