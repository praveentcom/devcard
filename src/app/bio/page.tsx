import { Metadata } from "next";

import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { generateDefaultSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { profileData } from "@/data/profile";
import { BackButton, PageWithStructuredData } from "@/ui/client";

export default function BioPage() {
  return (
    <PageWithStructuredData structuredData={generateDefaultSchema()}>
      <BackButton href={URLS.HOME()} label="Home" />
      <div className="content-container">
        <h1 className="text-md font-medium">Bio</h1>
        <AboutSection profile={profileData.profile} />
        <WorkExperienceSection workExperience={profileData.workExperience} />
        <EducationSection education={profileData.education} />
        <ProjectsSection
          projects={profileData.projects.map((p) => ({
            ...p,
          }))}
        />
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Bio`,
    description: `Complete biography and professional background. ${profileData.profile.description}`,
    keywords: [
      "bio",
      "biography",
      "professional background",
      "work experience",
      "education",
      "projects",
    ],
    url: URLS.BIO(),
    image: getRouteSeoImage(URLS.BIO()),
  });

  return metadata;
}
