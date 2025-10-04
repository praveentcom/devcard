import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the data directory
 * @param filePath - Path relative to the data directory (e.g., "profile/intro.md")
 * @returns The file content as string, or null if file doesn't exist
 */
export function getMdContent(filePath: string): string | null {
  const fullPath = path.join(process.cwd(), "data", filePath);

  try {
    const content = fs.readFileSync(fullPath, "utf-8");
    return content;
  } catch {
    return null;
  }
}
