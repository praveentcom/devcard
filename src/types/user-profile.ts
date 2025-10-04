export interface SocialLinks {
  linkedin?: string;
  x?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  stackoverflow?: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email?: string;
  image?: string;
  socialLinks?: SocialLinks;
}
