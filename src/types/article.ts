export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  categories: string[];
  published: boolean;
  private?: boolean;
  image?: string;
  ogImage?: string;
}
