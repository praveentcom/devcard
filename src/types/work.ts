export interface WorkExperience {
  slug: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  bulletPoints: string[];
  skills?: string[];
  image?: string;
  ogImage?: string;
}
