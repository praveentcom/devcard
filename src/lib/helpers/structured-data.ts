import { profileData } from "@/data/profile";
import { BASE_URL, URLS } from "@/lib/constants";
import { PROFILE_NAME } from "@/lib/helpers/config";
import { Article } from "@/types/article";
import { Community, CommunityContributionType } from "@/types/community";
import { Education } from "@/types/education";
import { Project } from "@/types/project";
import { WorkExperience } from "@/types/work";

export function generateDefaultSchema() {
  const profile = profileData.profile;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE_NAME,
    description: profile.description,
    url: BASE_URL,
    image: profile.image,
    sameAs: [
      profile.socialMedia?.linkedin,
      profile.socialMedia?.x,
      profile.socialMedia?.instagram,
      profile.socialMedia?.youtube,
      profile.links?.github,
      profile.links?.stackoverflow,
    ].filter(Boolean),
    worksFor:
      profileData.workExperience.length > 0
        ? {
            "@type": "Organization",
            name: profileData.workExperience[0]?.company,
          }
        : undefined,
    alumniOf: profileData.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
  };
}

export function generateArticleSchema(article: Article) {
  const year = new Date(article.date).getFullYear().toString();
  const profile = profileData.profile;

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
        url: profile.image,
      },
    },
    url: URLS.ARTICLES(year, article.slug),
    wordCount: article.content?.split(" ").length || 0,
    timeRequired: `PT${Math.max(1, Math.ceil((article.content?.split(" ").length || 0) / 200))}M`,
    keywords: article.tags.join(", "),
  };
}

export function generateCommunitySchema(
  community: Community & {
    content: string;
    type?: CommunityContributionType;
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

export function generateWorkSchema(work: WorkExperience) {
  return {
    "@context": "https://schema.org",
    "@type": "WorkExperience",
    name: work.role,
    description: work.bulletPoints?.join(". "),
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

export function generateEducationSchema(education: Education) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: education.degree,
    description: education.bulletPoints?.join(". "),
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
