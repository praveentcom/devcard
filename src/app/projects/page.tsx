import type { Metadata } from "next";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { EmptyState } from "passport-ui/empty-state";
import { StructuredData } from "passport-ui/structured-data";

import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { getAllProjectSlugs } from "@/components/helpers/projects";
import { URLS } from "@/components/helpers/urls";
import { ProjectSummaryCard } from "@/components/projects/project-summary-card";

export default function ProjectsPage() {
  const projects = getAllProjectSlugs();

  return (
    <ContentContainer variant="relaxed">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Projects`,
          description:
            "A comprehensive showcase of all my projects and contributions.",
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
        ]}
      />
      <h2>Projects</h2>
      {projects.length > 0 ? (
        <div className="list-container">
          {projects.map((project, index) => (
            <ProjectSummaryCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </ContentContainer>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Projects`,
    description:
      "A comprehensive showcase of all my projects and contributions.",
    keywords: ["projects", "showcase", "contributions"],
    url: URLS.PROJECTS_LIST(),
    image: getRouteSeoImage(URLS.PROJECTS_LIST()),
  });

  return metadata;
}
