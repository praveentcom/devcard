import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {
  generatePlaceholderImageUrl,
  PLACEHOLDER_COLORS,
} from "@/components/helpers/image";
import { Project, ProjectSchema } from "@/types/project";

const PROJECTS_CONTENT_DIR = path.join(process.cwd(), "data", "projects");

export type ProjectIndexItem = Project;

function getAllProjectFiles(): string[] {
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

  traverseDir(PROJECTS_CONTENT_DIR);
  return files;
}

function extractYearFromPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  const yearIndex = parts.findIndex((part) => part === "projects") + 1;
  return parts[yearIndex] || "unknown";
}

function deriveSlug(
  frontmatterSlug: string | undefined,
  filePath: string,
): string {
  if (frontmatterSlug) return frontmatterSlug;
  return path.basename(filePath, ".mdx");
}

export function getAllProjectSlugs(): ProjectIndexItem[] {
  const files = getAllProjectFiles();
  const projectItems: ProjectIndexItem[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, "utf-8");
      const { data } = matter(raw);
      const parsed = ProjectSchema.safeParse(data);

      if (parsed.success) {
        const year = extractYearFromPath(file);
        const ensuredSlug = deriveSlug(parsed.data.slug, file);

        projectItems.push({
          ...parsed.data,
          year,
          slug: ensuredSlug,
          image:
            parsed.data.image ||
            generatePlaceholderImageUrl({
              text: parsed.data.title,
              backgroundColor: PLACEHOLDER_COLORS.GRAY,
              textColor: PLACEHOLDER_COLORS.WHITE,
            }),
        });
      }
    } catch (error) {
      console.error(`Error processing project file ${file}:`, error);
    }
  }

  return projectItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getProjectBySlugContent(
  slug: string,
): { meta: ProjectIndexItem; content: string } | null {
  const files = getAllProjectFiles();
  const match = files.find((full) => {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const parsed = ProjectSchema.safeParse(data);
    const derivedSlug = deriveSlug(
      parsed.success ? parsed.data.slug : undefined,
      full,
    );
    return derivedSlug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(match, "utf-8");
  const { data, content } = matter(raw);
  const parsed = ProjectSchema.safeParse(data);

  if (!parsed.success) return null;

  const year = extractYearFromPath(match);
  const ensuredSlug = deriveSlug(parsed.data.slug, match);

  const meta: ProjectIndexItem = {
    ...parsed.data,
    year,
    slug: ensuredSlug,
    image:
      parsed.data.image ||
      generatePlaceholderImageUrl({
        text: parsed.data.title,
        backgroundColor: PLACEHOLDER_COLORS.GRAY,
        textColor: PLACEHOLDER_COLORS.WHITE,
      }),
  };

  return { meta, content };
}
