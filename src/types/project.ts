import { z } from "zod";

const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  stack: z.array(z.string()),
  description: z.string(),
  url: z.string().optional(),
  githubUrl: z.string().optional(),
  image: z.string().optional(),
  coAuthors: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  date: z
    .union([z.string(), z.date()])
    .transform((val) =>
      val instanceof Date ? val.toISOString().split("T")[0] : val,
    ),
  ogImage: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema> & {
  year: string;
  image: string;
};

export { ProjectSchema };
