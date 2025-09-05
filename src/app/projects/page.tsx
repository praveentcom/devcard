import type { Metadata } from "next";

import { getRouteSeoImage } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";
import { ProjectSummaryCard } from "@/components/projects/project-summary-card";
import { profileData } from "@/data/profile";
import { PageWithStructuredData } from "@/ui/client";
import { PlaceholderCard } from "@/ui/client";

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
          <PlaceholderCard />
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
