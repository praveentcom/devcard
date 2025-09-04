import { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WorkExperienceSection } from "@/components/sections/WorkExperienceSection";
import { BackButton, PageWithStructuredData } from "@/components/ui/common";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants";
import { getRouteSeoImage } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";
import { generateDefaultSchema } from "@/lib/helpers/structured-data";

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
