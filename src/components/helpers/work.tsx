import fs from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import {
  generatePlaceholderImageUrl,
  PLACEHOLDER_COLORS,
} from "@/components/helpers/image";
import { WorkExperience, WorkExperienceSchema } from "@/types/work";

const WORK_CONTENT_DIR = path.join(process.cwd(), "data", "work");

export type WorkExperienceIndexItem = WorkExperience;

function getAllWorkFiles(): string[] {
  const files: string[] = [];
  const years = fs
    .readdirSync(WORK_CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const year of years) {
    const yearDir = path.join(WORK_CONTENT_DIR, year);
    const yearFiles = fs
      .readdirSync(yearDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => path.join(yearDir, file));
    files.push(...yearFiles);
  }

  return files;
}

function extractYearFromPath(filePath: string): string {
  const pathParts = filePath.split(path.sep);
  const yearIndex = pathParts.findIndex((part) => part === "work") + 1;
  return pathParts[yearIndex] || "unknown";
}

function deriveSlug(slug?: string, filePath?: string): string {
  if (slug) return slug;
  if (filePath) {
    const fileName = path.basename(filePath, ".mdx");
    return fileName;
  }
  return "unknown";
}

export function getAllWorkSlugs(): WorkExperienceIndexItem[] {
  const files = getAllWorkFiles();
  const workItems: WorkExperienceIndexItem[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, "utf-8");
      const { data } = matter(raw);
      const parsed = WorkExperienceSchema.safeParse(data);

      if (parsed.success) {
        const year = extractYearFromPath(file);
        const ensuredSlug = deriveSlug(parsed.data.slug, file);

        workItems.push({
          ...parsed.data,
          year,
          slug: ensuredSlug,
          image:
            parsed.data.image ||
            generatePlaceholderImageUrl({
              text: parsed.data.company,
              backgroundColor: PLACEHOLDER_COLORS.GRAY,
              textColor: PLACEHOLDER_COLORS.WHITE,
            }),
        });
      }
    } catch (error) {
      console.error(`Error processing work file ${file}:`, error);
    }
  }

  return workItems.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
}

export async function getWorkBySlugCompiled(slug: string): Promise<{
  meta: WorkExperienceIndexItem;
  Content: React.ReactNode;
} | null> {
  const files = getAllWorkFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = WorkExperienceSchema.safeParse(data);
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

  const parsed = WorkExperienceSchema.parse(frontmatter);
  const meta: WorkExperience = {
    slug: ensuredSlug,
    role: parsed.role,
    company: parsed.company,
    startDate: parsed.startDate,
    endDate: parsed.endDate,
    skills: parsed.skills || [],
    image:
      parsed.image ||
      generatePlaceholderImageUrl({
        text: parsed.company,
        backgroundColor: PLACEHOLDER_COLORS.GRAY,
        textColor: PLACEHOLDER_COLORS.WHITE,
      }),
    ogImage: parsed.ogImage,
    year,
  };

  return { meta, Content: content };
}

export function getWorkBySlugRaw(
  slug: string,
): { meta: WorkExperienceIndexItem; raw: string } | null {
  const files = getAllWorkFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = WorkExperienceSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");
  const { data } = matter(raw);
  const parsed = WorkExperienceSchema.safeParse(data);

  if (!parsed.success) return null;

  const year = extractYearFromPath(match);
  const ensuredSlug = deriveSlug(parsed.data.slug, match);

  const meta: WorkExperienceIndexItem = {
    ...parsed.data,
    year,
    slug: ensuredSlug,
    image:
      parsed.data.image ||
      generatePlaceholderImageUrl({
        text: parsed.data.company,
        backgroundColor: PLACEHOLDER_COLORS.GRAY,
        textColor: PLACEHOLDER_COLORS.WHITE,
      }),
  };

  return { meta, raw };
}

export function getWorkBySlugContent(
  slug: string,
): { meta: WorkExperienceIndexItem; content: string } | null {
  const files = getAllWorkFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = WorkExperienceSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");
  const { data, content } = matter(raw);
  const parsed = WorkExperienceSchema.safeParse(data);

  if (!parsed.success) return null;

  const year = extractYearFromPath(match);
  const ensuredSlug = deriveSlug(parsed.data.slug, match);

  const meta: WorkExperienceIndexItem = {
    ...parsed.data,
    year,
    slug: ensuredSlug,
    image:
      parsed.data.image ||
      generatePlaceholderImageUrl({
        text: parsed.data.company,
        backgroundColor: PLACEHOLDER_COLORS.GRAY,
        textColor: PLACEHOLDER_COLORS.WHITE,
      }),
  };

  return { meta, content };
}
