import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {
  generatePlaceholderImageUrl,
  PLACEHOLDER_COLORS,
} from "@/components/helpers/image";
import { Education, EducationSchema } from "@/types/education";

const EDUCATION_CONTENT_DIR = path.join(process.cwd(), "data", "education");

export type EducationIndexItem = Education;

function getAllEducationFiles(): string[] {
  const files: string[] = [];

  function traverseDir(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverseDir(fullPath);
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  }

  traverseDir(EDUCATION_CONTENT_DIR);
  return files;
}

function extractYearFromPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  const yearIndex = parts.findIndex((part) => part === "education") + 1;
  return parts[yearIndex] || "unknown";
}

function deriveSlug(
  frontmatterSlug: string | undefined,
  filePath: string,
): string {
  if (frontmatterSlug) return frontmatterSlug;
  return path.basename(filePath, ".mdx");
}

export function getAllEducationSlugs(): EducationIndexItem[] {
  const files = getAllEducationFiles();
  const educationItems: EducationIndexItem[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, "utf-8");
      const { data } = matter(raw);
      const parsed = EducationSchema.safeParse(data);

      if (parsed.success) {
        const year = extractYearFromPath(file);
        const ensuredSlug = deriveSlug(parsed.data.slug, file);

        educationItems.push({
          ...parsed.data,
          year,
          slug: ensuredSlug,
          image:
            parsed.data.image ||
            generatePlaceholderImageUrl({
              text: parsed.data.school,
              backgroundColor: PLACEHOLDER_COLORS.GRAY,
              textColor: PLACEHOLDER_COLORS.WHITE,
            }),
        });
      }
    } catch (error) {
      console.error(`Error processing education file ${file}:`, error);
    }
  }

  return educationItems.sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function getEducationBySlugContent(
  slug: string,
): { meta: EducationIndexItem; content: string } | null {
  const files = getAllEducationFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = EducationSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");
  const { data, content } = matter(raw);
  const parsed = EducationSchema.safeParse(data);

  if (!parsed.success) return null;

  const year = extractYearFromPath(match);
  const ensuredSlug = deriveSlug(parsed.data.slug, match);

  const meta: EducationIndexItem = {
    ...parsed.data,
    year,
    slug: ensuredSlug,
    image:
      parsed.data.image ||
      generatePlaceholderImageUrl({
        text: parsed.data.school,
        backgroundColor: PLACEHOLDER_COLORS.GRAY,
        textColor: PLACEHOLDER_COLORS.WHITE,
      }),
  };

  return { meta, content };
}
