import { getTagImagePath } from "@/lib/helpers/tag-mapper";

const DEFAULT_FILE_ICON_PATH = "/images/tech-icons/Docs.png";

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

export default getFileIcon;
