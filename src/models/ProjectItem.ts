import { Project } from "@/types/project";

export class ProjectItem implements Project {
  slug: string;
  title: string;
  stack: string[];
  description: string;
  bulletPoints: string[];
  url?: string;
  githubUrl?: string;
  image?: string;
  coAuthors?: string[];
  featured?: boolean;
  date: string;

  constructor(init: Project) {
    this.slug = init.slug;
    this.title = init.title;
    this.stack = init.stack;
    this.description = init.description;
    this.bulletPoints = init.bulletPoints ?? [];
    this.url = init.url;
    this.githubUrl = init.githubUrl;
    this.image = init.image;
    this.coAuthors = init.coAuthors;
    this.featured = init.featured;
    this.date = init.date;
  }
}

export default ProjectItem;
