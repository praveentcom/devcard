import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  categories: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  private: z.boolean().optional(),
  image: z.string().optional(),
  ogImage: z.string().optional(),
  slug: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema> & {
  year: string;
  slug: string;
  readTime: number;
  content: string;
  image: string;
};

export type ArticleFrontmatter = z.infer<typeof ArticleSchema> & {
  year: string;
  slug: string;
  readTime: number;
  image: string;
};

export { ArticleSchema };
