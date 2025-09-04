import { format } from "date-fns";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import dart from "highlight.js/lib/languages/dart";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import gradle from "highlight.js/lib/languages/gradle";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import less from "highlight.js/lib/languages/less";
import lua from "highlight.js/lib/languages/lua";
import makefile from "highlight.js/lib/languages/makefile";
import markdown from "highlight.js/lib/languages/markdown";
import perl from "highlight.js/lib/languages/perl";
import php from "highlight.js/lib/languages/php";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import r from "highlight.js/lib/languages/r";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import scala from "highlight.js/lib/languages/scala";
import scss from "highlight.js/lib/languages/scss";
import sql from "highlight.js/lib/languages/sql";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

import { getTagImagePath } from "@/lib/helpers/tag-mapper";
import { Article } from "@/types/article";

// Default file icon path constant
const DEFAULT_FILE_ICON_PATH = "/images/tech-icons/Docs.png";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("c", cpp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("rs", rust);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("rb", ruby);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("kt", kotlin);
hljs.registerLanguage("scala", scala);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("cs", csharp);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("lua", lua);
hljs.registerLanguage("r", r);
hljs.registerLanguage("perl", perl);
hljs.registerLanguage("pl", perl);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("zsh", bash);
hljs.registerLanguage("fish", bash);
hljs.registerLanguage("powershell", powershell);
hljs.registerLanguage("ps1", powershell);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("sass", scss);
hljs.registerLanguage("less", less);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("makefile", makefile);
hljs.registerLanguage("gradle", gradle);
hljs.registerLanguage("sql", sql);

function getFileIcon(filename: string): string {
  if (!filename)
    return `<img src="${DEFAULT_FILE_ICON_PATH}" alt="File" class="w-4 h-4" />`;

  const ext = filename.split(".").pop()?.toLowerCase();

  const extToTagMap: Record<string, string> = {
    js: "JavaScript",
    mjs: "JavaScript",
    jsx: "React",
    ts: "TypeScript",
    tsx: "React",
    html: "HTML5",
    css: "CSS3",
    scss: "Sass",
    sass: "Sass",
    less: "Less",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    xml: "XML",
    md: "Markdown",
    sh: "Bash",
    bash: "Bash",
    zsh: "Bash",
    fish: "Bash",
    ps1: "PowerShell",
    py: "Python",
    java: "Java",
    cpp: "C++",
    cxx: "C++",
    cc: "C++",
    c: "C",
    h: "C",
    hpp: "C++",
    go: "Go",
    rs: "Rust",
    php: "PHP",
    rb: "Ruby",
    swift: "Swift",
    kt: "Kotlin",
    scala: "Scala",
    cs: "C#",
    fs: "F#",
    dart: "Dart",
    lua: "Lua",
    r: "R",
    pl: "Perl",
    sol: "Solidity",
    dockerfile: "Docker",
    makefile: "Makefile",
    gradle: "Gradle",
    pom: "Apache Maven",
    package: "npm",
    lock: "npm",
    toml: "Rust",
    env: "Node.js",
  };

  const tag = extToTagMap[ext || ""];
  if (tag) {
    return `<img src="${getTagImagePath(tag)}" alt="${tag}" class="size-4" />`;
  }

  return '<img src="/images/tech-icons/Docs.png" alt="File" class="size-4" />';
}

function processLists(html: string): string {
  const lines = html.split("\n");
  const result: string[] = [];
  let currentListType: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (currentListType && listItems.length > 0) {
      const listClass =
        currentListType === "ol"
          ? "list-decimal pl-6 ml-4"
          : "list-none pl-0 ml-0";
      result.push(`<${currentListType} class="${listClass}">`);
      result.push(...listItems);
      result.push(`</${currentListType}>`);
      listItems = [];
      currentListType = null;
    }
  };

  for (const line of lines) {
    // Check for unordered list items (-, *, +)
    const unorderedMatch = line.match(/^[\s]*[-*+]\s+(.*)$/);
    // Check for ordered list items (1., 2., etc.)
    const orderedMatch = line.match(/^[\s]*\d+\.\s+(.*)$/);
    // Check for task list items
    const taskUncheckedMatch = line.match(/^[\s]*[-*+]\s+\[\s*\]\s+(.*)$/);
    const taskCheckedMatch = line.match(/^[\s]*[-*+]\s+\[x\]\s+(.*)$/);

    if (taskUncheckedMatch) {
      if (currentListType !== "ul") {
        flushList();
        currentListType = "ul";
      }
      listItems.push(
        `<li class="ml-2 mb-0 text-sm leading-relaxed flex items-center gap-1.5"><input type="checkbox" disabled class="rounded border-border/75 text-primary focus:ring-primary/50" /> ${taskUncheckedMatch[1]}</li>`,
      );
    } else if (taskCheckedMatch) {
      if (currentListType !== "ul") {
        flushList();
        currentListType = "ul";
      }
      listItems.push(
        `<li class="ml-2 mb-0 text-sm leading-relaxed flex items-center gap-1.5"><input type="checkbox" checked disabled class="rounded border-border/75 text-primary focus:ring-primary/50" /> ${taskCheckedMatch[1]}</li>`,
      );
    } else if (unorderedMatch) {
      if (currentListType !== "ul") {
        flushList();
        currentListType = "ul";
      }
      listItems.push(
        `<li class="ml-2 mb-0 text-sm leading-relaxed">• ${unorderedMatch[1]}</li>`,
      );
    } else if (orderedMatch) {
      if (currentListType !== "ol") {
        flushList();
        currentListType = "ol";
      }
      listItems.push(
        `<li class="ml-2 mb-0 text-sm leading-relaxed">${orderedMatch[1]}</li>`,
      );
    } else {
      flushList();
      if (line.trim()) {
        result.push(line);
      }
    }
  }

  flushList(); // Flush any remaining list
  return result.join("\n");
}

export function parseMarkdown(content: string): string {
  const codeBlocks: string[] = [];
  let processedContent = content.replace(
    /```(\w+)?(?:\s+filename="([^"]+)")?\n([\s\S]*?)```/g,
    (match, lang, filename, code) => {
      const trimmedCode = code.trim();
      const originalLines = trimmedCode.split("\n");
      const totalLines = originalLines.length;

      const getLineNumberWidth = (total: number) => {
        if (total < 10) return "w-8";
        if (total < 100) return "w-10";
        if (total < 1000) return "w-12";
        return "w-14";
      };

      const lineNumberWidth = getLineNumberWidth(totalLines);

      const numberedLines = originalLines
        .map((line: string, index: number) => {
          const lineNumber = index + 1;
          const isFirstLine = index === 0;
          const isLastLine = index === originalLines.length - 1;
          const lineNumberPadding = isFirstLine
            ? " pt-2"
            : isLastLine
              ? " pb-2"
              : "";
          const contentPadding = isFirstLine
            ? " pt-2"
            : isLastLine
              ? " pb-2"
              : "";

          let highlightedLine = line || " ";
          if (line.trim()) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                highlightedLine = hljs.highlight(line, {
                  language: lang,
                }).value;
              } catch {
                try {
                  highlightedLine = hljs.highlightAuto(line).value;
                } catch {
                  highlightedLine = line
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                }
              }
            } else {
              try {
                highlightedLine = hljs.highlightAuto(line).value;
              } catch {
                highlightedLine = line
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");
              }
            }
          }

          return `<div class="flex">
          <span class="line-number ${lineNumberWidth}${lineNumberPadding}">${lineNumber}</span>
          <span class="line-content${contentPadding}">${highlightedLine}</span>
        </div>`;
        })
        .join("");

      const filenameHeader = filename
        ? `
        <div class="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/75 text-xs font-medium text-muted-foreground">
          ${getFileIcon(filename)}
          <span>${filename}</span>
        </div>
      `
        : "";

      const codeBlock = `<div class="relative bg-card border border-border rounded-sm overflow-hidden mb-3 group w-full break-inside-avoid">
        ${filenameHeader}
        <pre class="overflow-x-auto p-0 m-0 bg-transparent w-full"><code class="hljs block">${numberedLines}</code></pre>
      </div>`;

      codeBlocks.push(codeBlock);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    },
  );

  processedContent = processedContent
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-sm font-medium mb-2 mt-4 leading-relaxed">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-base font-medium mb-2 mt-5 leading-relaxed">$1</h2>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-md font-medium mb-3 mt-6 leading-relaxed">$1</h1>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">$1</code>',
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/~~(.*?)~~/g, '<del class="line-through opacity-75">$1</del>')
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="rounded-sm max-w-full h-auto my-3 border border-border/75 block" />',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium inline-flex items-center gap-1">$1<svg class="size-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>',
    )
    .replace(/^---$/gm, '<hr class="my-4 border-t border-border/75" />')
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="relative pl-4 py-2 mb-3 bg-muted/30 rounded-sm italic text-sm leading-relaxed text-muted-foreground"><div class="absolute left-1 top-1 bottom-1 w-1 bg-primary/30 rounded-full"></div>$1</blockquote>',
    );

  processedContent = processedContent
    .replace(/\n\n/g, '</p><p class="mb-2 text-sm leading-relaxed">')
    .replace(
      /^(?!<[h|l|p|c|b|i|d|_])/gm,
      '<p class="mb-2 text-sm leading-relaxed">',
    )
    .replace(/(?<!>)$/gm, "</p>")
    .replace(/<p class="mb-2 text-sm leading-relaxed"><\/p>/g, "")
    .replace(
      /<p class="mb-2 text-sm leading-relaxed">(<[h|l|p|c|b|i|d])/g,
      "$1",
    );

  // Restore code blocks first
  codeBlocks.forEach((codeBlock, index) => {
    processedContent = processedContent.replace(
      `__CODE_BLOCK_${index}__`,
      codeBlock,
    );
  });

  // Process lists with proper <ul> and <ol> wrappers AFTER code blocks are restored
  processedContent = processLists(processedContent);

  return processedContent;
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy");
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "MMM yyyy");
}

export function getPublishedArticles(articles: Article[]): Article[] {
  return articles
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticlesBySlug(
  articles: Article[],
  slug: string,
): Article | undefined {
  return articles.find((article) => article.slug === slug && article.published);
}

export function getArticlesByTag(articles: Article[], tag: string): Article[] {
  return articles
    .filter((article) => article.published && article.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>();
  articles
    .filter((article) => article.published)
    .forEach((article) => article.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
