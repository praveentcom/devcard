import { z } from "zod";

const WorkExperienceSchema = z.object({
  slug: z.string(),
  role: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  skills: z.array(z.string()).optional(),
  image: z.string().optional(),
  ogImage: z.string().optional(),
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema> & {
  year: string;
  image: string;
};

export { WorkExperienceSchema };
