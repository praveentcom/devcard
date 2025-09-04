export interface Project {
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
  ogImage?: string;
}
