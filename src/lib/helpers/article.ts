import fs from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { generateArticlePlaceholderImage } from "@/lib/helpers/image";
import { calculateReadTime } from "@/lib/helpers/markdown";

const ARTICLE_CONTENT_DIR = path.join(process.cwd(), "data", "articles");

const safeTagsSchema = z.array(z.string());

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: safeTagsSchema,
  categories: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  private: z.boolean().optional(),
  image: z.string().optional(),
  ogImage: z.string().optional(),
  slug: z.string().optional(),
});

export type ArticleFrontmatter = Required<
  Pick<
    z.infer<typeof ArticleFrontmatterSchema>,
    "title" | "description" | "date" | "tags" | "categories" | "published"
  >
> &
  Omit<
    z.infer<typeof ArticleFrontmatterSchema>,
    "title" | "description" | "date" | "tags" | "categories" | "published"
  > & {
    year: string;
    slug: string;
    readTime: number;
  };

export type ArticleIndexItem = ArticleFrontmatter;

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
  const rel = path.relative(ARTICLE_CONTENT_DIR, fullPath);
  const segments = rel.split(path.sep);
  const year = segments[0];
  return year ?? "unknown";
}

/**
 * Derive a slug for an article.
 * Only allows alphanumeric, dash, and underscore. Unsafe characters are removed.
 */
function deriveSlug(
  frontmatterSlug: string | undefined,
  fullPath: string,
): string {
  // Helper to sanitize slug: only [a-zA-Z0-9-_], convert spaces to dashes, remove other chars
  const sanitize = (slug: string) =>
    slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-_]/g, "")
      .replace(/-+/g, "-")
      .replace(/^[-_]+|[-_]+$/g, ""); // Remove leading/trailing dashes/underscores

  if (frontmatterSlug && frontmatterSlug.trim().length > 0)
    return sanitize(frontmatterSlug.trim());
  const base = path.basename(fullPath, path.extname(fullPath));
  return sanitize(base);
}

export function getAllArticleFiles(limit?: number): string[] {
  if (!fs.existsSync(ARTICLE_CONTENT_DIR)) return [];

  return readDirRecursive(ARTICLE_CONTENT_DIR, limit);
}

export function getAllArticleSlugs(): ArticleIndexItem[] {
  const files = getAllArticleFiles();
  const items: ArticleIndexItem[] = files.map((fullPath) => {
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);

    const parsed = ArticleFrontmatterSchema.parse(data);
    const year = extractYearFromPath(fullPath);
    const slug = deriveSlug(parsed.slug, fullPath);
    const readTime = calculateReadTime(content);

    const normalized: ArticleFrontmatter = {
      title: parsed.title,
      description: parsed.description,
      date: parsed.date,
      tags: parsed.tags,
      categories: parsed.categories,
      published: parsed.published ?? true,
      private: parsed.private,
      ogImage: parsed.ogImage,
      image: parsed.image || generateArticlePlaceholderImage(parsed.title),
      slug,
      year,
      readTime,
    };

    return normalized;
  });

  return items
    .filter((p) => p.published && !p.private)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlugCompiled(slug: string): Promise<{
  meta: ArticleIndexItem;
  Content: React.ReactNode;
} | null> {
  const files = getAllArticleFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = ArticleFrontmatterSchema.safeParse(data);
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
  const readTime = calculateReadTime(raw);

  const parsed = ArticleFrontmatterSchema.parse(frontmatter);
  const meta: ArticleFrontmatter = {
    title: parsed.title,
    description: parsed.description,
    date: parsed.date,
    tags: parsed.tags,
    categories: parsed.categories,
    published: parsed.published ?? true,
    private: parsed.private,
    ogImage: parsed.ogImage,
    image: parsed.image || generateArticlePlaceholderImage(parsed.title),
    slug: ensuredSlug,
    year,
    readTime,
  };

  return { meta, Content: content };
}

export function getArticleBySlugRaw(
  slug: string,
): { meta: ArticleIndexItem; raw: string } | null {
  const files = getAllArticleFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = ArticleFrontmatterSchema.safeParse(data);
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
  const parsed = ArticleFrontmatterSchema.parse(data);
  const ensuredSlug = deriveSlug(parsed.slug, match);
  const readTime = calculateReadTime(content);
  const meta: ArticleFrontmatter = {
    title: parsed.title,
    description: parsed.description,
    date: parsed.date,
    tags: parsed.tags,
    categories: parsed.categories,
    published: parsed.published ?? true,
    private: parsed.private,
    ogImage: parsed.ogImage,
    image: parsed.image || generateArticlePlaceholderImage(parsed.title),
    slug: ensuredSlug,
    year,
    readTime,
  };

  return { meta, raw: content };
}

export function getAllArticlesIndex(limit?: number): ArticleIndexItem[] {
  const files = getAllArticleFiles(limit);
  const items: ArticleIndexItem[] = files.map((fullPath) => {
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const parsed = ArticleFrontmatterSchema.parse(data);

    const normalized: ArticleFrontmatter = {
      title: parsed.title,
      description: parsed.description,
      date: parsed.date,
      tags: parsed.tags,
      categories: parsed.categories,
      published: parsed.published ?? true,
      private: parsed.private,
      ogImage: parsed.ogImage,
      image: parsed.image || generateArticlePlaceholderImage(parsed.title),
      readTime: calculateReadTime(content),
      year: extractYearFromPath(fullPath),
      slug: deriveSlug(parsed.slug, fullPath),
    };

    return normalized;
  });

  return items
    .filter((p) => p.published && !p.private)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCategories(): string[] {
  const allCategories = new Set<string>();

  getAllArticlesIndex().forEach((article) => {
    article.categories.forEach((category) => {
      allCategories.add(category);
    });
  });

  return Array.from(allCategories).sort();
}

export function getArticlesByCategory(category: string): ArticleIndexItem[] {
  return getAllArticlesIndex().filter((article) =>
    article.categories.includes(category),
  );
}
