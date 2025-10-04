import { z } from "zod";

const EducationSchema = z.object({
  slug: z.string(),
  degree: z.string(),
  school: z.string(),
  startDate: z
    .union([z.string(), z.date()])
    .transform((val) =>
      val instanceof Date ? val.toISOString().split("T")[0] : val,
    ),
  endDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) =>
      val instanceof Date ? val.toISOString().split("T")[0] : val,
    ),
  image: z.string().optional(),
  ogImage: z.string().optional(),
});

export type Education = z.infer<typeof EducationSchema> & {
  year: string;
  image: string;
};

export { EducationSchema };
