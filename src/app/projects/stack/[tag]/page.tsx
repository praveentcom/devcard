import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";
import pluralize from "pluralize";

import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { getAllProjectSlugs } from "@/components/helpers/projects";
import { getTagImagePath } from "@/components/helpers/tag-mapper";
import { URLS } from "@/components/helpers/urls";
import { ProjectSummaryCard } from "@/components/projects/project-summary-card";

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;

  const projects = getAllProjectSlugs();

  const filteredProjects = projects.filter((project) =>
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

  const projects = getAllProjectSlugs();

  const filteredProjects = projects.filter((project) =>
    project.stack.includes(tag),
  );

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${tag} projects`,
          description: `${filteredProjects.length} ${pluralize("project", filteredProjects.length)} using ${tag}`,
        }}
      />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: "Projects",
            href: URLS.PROJECTS_LIST(),
          },
          {
            label: `${tag} projects`,
            href: URLS.PROJECTS_STACK(tag),
          },
        ]}
      />
      <div className="flex items-center gap-2">
        <Image
          src={getTagImagePath(tag)}
          alt={`${tag} icon`}
          width={14}
          height={14}
          className="flex-shrink-0 size-4.5"
        />
        <h2>{tag} projects</h2>
      </div>
      {filteredProjects.length > 0 ? (
        <div className="list-container">
          {filteredProjects.map((project, index) => (
            <ProjectSummaryCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </ContentContainer>
  );
}
