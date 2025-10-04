import { Metadata } from "next";
import { ContentContainer } from "passport-ui/content-container";
import { StructuredData } from "passport-ui/structured-data";

import { ArticleSection } from "@/components/article/article-section";
import { MdContent } from "@/components/common/md-content";
import { CommunitySection } from "@/components/community/community-section";
import { EducationSection } from "@/components/education/education-section";
import { getAllArticlesIndex } from "@/components/helpers/article";
import { getAllCommunityIndex } from "@/components/helpers/community";
import { SITE_DESCRIPTION, SITE_IMAGE } from "@/components/helpers/config";
import { getAllEducationSlugs } from "@/components/helpers/education";
import { getMdContent } from "@/components/helpers/md-content";
import { createPageMetadata } from "@/components/helpers/metadata";
import { getAllProjectSlugs } from "@/components/helpers/projects";
import { generateDefaultSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";
import { getAllWorkSlugs } from "@/components/helpers/work";
import { ProjectsSection } from "@/components/projects/projects-section";
import { WorkExperienceSection } from "@/components/work/work-experience-section";
import { configData } from "@/data/config";

const recentArticles = getAllArticlesIndex(6);
const recentContributions = getAllCommunityIndex(6);
const profileContent = getMdContent("profile/intro.md");
const projects = getAllProjectSlugs();
const workExperience = getAllWorkSlugs();
const education = getAllEducationSlugs();

export default function HomePage() {
  return (
    <ContentContainer variant="relaxed">
      <StructuredData data={generateDefaultSchema()} />
      <div className="section-container">
        <MdContent content={profileContent} />
      </div>
      {recentArticles.length > 0 && (
        <ArticleSection articles={recentArticles} />
      )}
      {recentContributions.length > 0 && (
        <CommunitySection contributions={recentContributions} />
      )}
      {projects.length > 0 && <ProjectsSection projects={projects} />}
      {workExperience.length > 0 && (
        <WorkExperienceSection workExperience={workExperience} />
      )}
      {education.length > 0 && <EducationSection education={education} />}
    </ContentContainer>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    description: SITE_DESCRIPTION,
    keywords: configData.seo.keywords,
    url: URLS.HOME(),
    image: SITE_IMAGE,
  });

  return metadata;
}
