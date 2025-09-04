import type { Metadata } from "next";

import { ProjectSummaryCard } from "@/components/projects/ProjectSummaryCard";
import { PageWithStructuredData } from "@/components/ui/common";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants/urls";
import { getRouteSeoImage } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";

export default function ProjectsPage() {
  return (
    <PageWithStructuredData
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Projects`,
        description:
          "A comprehensive showcase of all my projects and contributions.",
      }}
    >
      <div className="content-container">
        <h1 className="text-md font-medium">Projects</h1>
        {profileData.projects.length > 0 ? (
          <div className="list-container">
            {profileData.projects.map((project, index) => (
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
