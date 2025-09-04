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

import getFileIcon from "./getFileIcon";

/**
 * Register languages for highlight.js
 */
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

/**
 * Process code blocks in markdown
 * @param content
 * @returns The processed HTML
 */
function processCodeBlocks(content: string): {
  content: string;
  codeBlocks: string[];
} {
  const codeBlocks: string[] = [];

  const processedContent = content.replace(
    /```(\w+)?(?:\s+filename="([^"]+)")?\n([\s\S]*?)```/g,
    (match, lang, filename, code) => {
      const trimmedCode = code.trim();
      const originalLines = trimmedCode.split("\n");
      const totalLines = originalLines.length;

      /**
       * Get the width of the line number
       */
      const getLineNumberWidth = (total: number) => {
        if (total < 10) return "w-8";
        if (total < 100) return "w-10";
        if (total < 1000) return "w-12";
        return "w-14";
      };

      /**
       * Get the width of the line number
       */
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

      /**
       * Get the filename header
       */
      const filenameHeader = filename
        ? `
        <div class="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/75 text-xs font-medium text-muted-foreground">
          ${getFileIcon(filename)}
          <span>${filename}</span>
        </div>
      `
        : "";

      /**
       * Get the code block
       */
      const codeBlock = `<div class="relative bg-card border border-border rounded-sm overflow-hidden mb-3 group w-full break-inside-avoid">
        ${filenameHeader}
        <pre class="overflow-x-auto p-0 m-0 bg-transparent w-full"><code class="hljs block">${numberedLines}</code></pre>
      </div>`;

      codeBlocks.push(codeBlock);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    },
  );

  return { content: processedContent, codeBlocks };
}

export default processCodeBlocks;
