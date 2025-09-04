import { Education } from "@/types/education";

export class EducationItem implements Education {
  slug: string;
  degree: string;
  school: string;
  image?: string;
  startDate: string;
  endDate?: string;
  bulletPoints: string[];

  constructor(init: Education) {
    this.slug = init.slug;
    this.degree = init.degree;
    this.school = init.school;
    this.image = init.image;
    this.startDate = init.startDate;
    this.endDate = init.endDate;
    this.bulletPoints = init.bulletPoints ?? [];
  }
}

export default EducationItem;
