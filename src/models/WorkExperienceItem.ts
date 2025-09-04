import { WorkExperience } from "@/types/work";

export class WorkExperienceItem implements WorkExperience {
  slug: string;
  role: string;
  company: string;
  image?: string;
  startDate: string;
  endDate?: string;
  bulletPoints: string[];
  skills?: string[];

  constructor(init: WorkExperience) {
    this.slug = init.slug;
    this.role = init.role;
    this.company = init.company;
    this.image = init.image;
    this.startDate = init.startDate;
    this.endDate = init.endDate;
    this.bulletPoints = init.bulletPoints ?? [];
    this.skills = init.skills;
  }
}

export default WorkExperienceItem;
