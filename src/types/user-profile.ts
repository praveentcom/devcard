import type { Education } from "@/types/education";
import type { Project } from "@/types/project";
import type { WorkExperience } from "@/types/work";

export interface SocialMediaLinks {
  linkedin?: string;
  x?: string;
  instagram?: string;
  youtube?: string;
}

export interface OtherLinks {
  github?: string;
  stackoverflow?: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  gender?: string;
  email?: string;
  image?: string;
  description?: string;
  bulletPoints?: string[];
  socialMedia?: SocialMediaLinks;
  links?: OtherLinks;
}

export interface ProfileData {
  profile: Profile;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
}
