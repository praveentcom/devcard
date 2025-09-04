import type { Metadata } from "next";
import Image from "next/image";
import pluralize from "pluralize";

import { ProjectSummaryCard } from "@/components/projects/ProjectSummaryCard";
import { BackButton, PageWithStructuredData } from "@/components/ui/common";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants/urls";
import { getRouteSeoImage } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";
import { getTagImagePath } from "@/lib/helpers/tag-mapper";

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;

  const filteredProjects = profileData.projects.filter((project) =>
    project.stack.includes(tag),
  );

  const metadata = createPageMetadata({
    title: `${tag} projects`,
    description: `${filteredProjects.length} ${pluralize("project", filteredProjects.length)} using ${tag}`,
    keywords: [tag, "projects"],
    url: URLS.PROJECTS_STACK(tag),
    image: getRouteSeoImage(URLS.PROJECTS_STACK(tag)),
  });

  return metadata;
}

export default async function TagProjectsPage({ params }: PageProps) {
  const { tag } = await params;

  const filteredProjects = profileData.projects.filter((project) =>
    project.stack.includes(tag),
  );

  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${tag} projects`,
        description: `${filteredProjects.length} ${pluralize("project", filteredProjects.length)} using ${tag}`,
      }}
    >
      <BackButton href={URLS.PROJECTS_LIST()} label="Projects" />
      <div className="content-container">
        <div className="flex items-center gap-2">
          <Image
            src={getTagImagePath(tag)}
            alt={`${tag} icon`}
            width={12}
            height={12}
            className="flex-shrink-0 size-3.5"
          />
          <h1 className="text-md font-medium">{tag} projects</h1>
        </div>
        {filteredProjects.length > 0 ? (
          <div className="list-container">
            {filteredProjects.map((project, index) => (
              <ProjectSummaryCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholderCard />
        )}
      </div>
    </PageWithStructuredData>
  );
}
