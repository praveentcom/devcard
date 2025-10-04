import { PROFILE_NAME } from "@/components/helpers/config";
import { BASE_URL, URLS } from "@/components/helpers/urls";
import { configData } from "@/data/config";
import { profile } from "@/data/profile";
import { Article } from "@/types/article";
import { Community } from "@/types/community";
import { Education } from "@/types/education";
import { Project } from "@/types/project";
import { WorkExperience } from "@/types/work";

import { getAllEducationSlugs } from "./education";
import { getAllWorkSlugs } from "./work";

/**
 * Generate the default schema
 * @returns The default schema
 */
export function generateDefaultSchema() {
  const workExperience = getAllWorkSlugs();
  const education = getAllEducationSlugs();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE_NAME,
    description: configData.seo.description,
    url: BASE_URL,
    image: configData.seo.image,
    sameAs: [
      profile.socialLinks?.linkedin,
      profile.socialLinks?.x,
      profile.socialLinks?.instagram,
      profile.socialLinks?.youtube,
      profile.socialLinks?.github,
      profile.socialLinks?.stackoverflow,
    ].filter(Boolean),
    worksFor:
      workExperience.length > 0
        ? {
            "@type": "Organization",
            name: workExperience[0]?.company,
          }
        : undefined,
    alumniOf: education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
  };
}

/**
 * Generate the article schema
 * @param article - The article to generate the schema for
 * @returns The article schema
 */
export function generateArticleSchema(article: Article) {
  const year = new Date(article.date).getFullYear().toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: PROFILE_NAME,
      logo: {
        "@type": "ImageObject",
        url: configData.seo.image,
      },
    },
    url: URLS.ARTICLES(year, article.slug),
    wordCount: article.content?.split(" ").length || 0,
    timeRequired: `PT${Math.max(1, Math.ceil((article.content?.split(" ").length || 0) / 200))}M`,
    keywords: article.tags.join(", "),
  };
}

/**
 * Generate the community schema
 * @param community - The community to generate the schema for
 * @returns The community schema
 */
export function generateCommunitySchema(
  community: Community & {
    content: string;
  },
) {
  const year = new Date(community.date).getFullYear().toString();

  const eventData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: community.title,
    description: community.description,
    image: community.image,
    startDate: new Date(community.date).toISOString(),
    performer: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: BASE_URL,
    },
    organizer: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: BASE_URL,
    },
    url: URLS.COMMUNITY(year, community.slug),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    about: community.description,
    recordedIn: community.youtubeUrl
      ? {
          "@type": "VideoObject",
          url: community.youtubeUrl,
          name: community.title,
          description: community.description,
        }
      : undefined,
  };

  if (community.type) {
    eventData["additionalType"] = URLS.COMMUNITY_TYPE(community.type);
  }

  return eventData;
}

/**
 * Generate the project schema
 * @param project - The project to generate the schema for
 * @returns The project schema
 */
export function generateProjectSchema(project: Project) {
  const programmingLanguages = (project.stack || []).filter(
    Boolean,
  ) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.url || URLS.PROJECTS(project.slug),
    image: project.image,
    author: {
      "@type": "Person",
      name: PROFILE_NAME,
    },
    programmingLanguage: programmingLanguages.join(", "),
    dateCreated: new Date(project.date).toISOString(),
    codeRepository: project.githubUrl,
    contributor: project.coAuthors?.map((name) => ({
      "@type": "Person",
      name,
    })),
  };
}

/**
 * Generate the work schema
 * @param work - The work to generate the schema for
 * @returns The work schema
 */
export function generateWorkSchema(work: WorkExperience) {
  return {
    "@context": "https://schema.org",
    "@type": "WorkExperience",
    name: work.role,
    description: `${work.role} at ${work.company}`,
    worksFor: {
      "@type": "Organization",
      name: work.company || "",
      logo: work.image,
    },
    startDate: new Date(work.startDate).toISOString().split("T")[0],
    endDate: work.endDate
      ? new Date(work.endDate).toISOString().split("T")[0]
      : undefined,
    employee: {
      "@type": "Person",
      name: PROFILE_NAME,
    },
    skills: work.skills?.join(", ") || "",
  };
}

/**
 * Generate the education schema
 * @param education - The education to generate the schema for
 * @returns The education schema
 */
export function generateEducationSchema(education: Education) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: education.degree,
    description: `${education.degree} from ${education.school}`,
    educationalCredentialAwarded: education.degree,
    recognizedBy: {
      "@type": "EducationalOrganization",
      name: education.school,
      logo: education.image,
    },
    validFrom: new Date(education.startDate).toISOString().split("T")[0],
    validUntil: education.endDate
      ? new Date(education.endDate).toISOString().split("T")[0]
      : undefined,
    credentialSubject: {
      "@type": "Person",
      name: PROFILE_NAME,
    },
  };
}
