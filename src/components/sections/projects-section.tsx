"use client";

import { GitPullRequestArrow } from "lucide-react";
import Link from "next/link";

import { URLS } from "@/components/helpers/urls";
import { ProjectSummaryCard } from "@/components/projects/project-summary-card";
import { Project } from "@/types/project";
import { PlaceholderCard } from "@/ui/client";
import { Button } from "@/ui/client";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const latestProjects = [...projects]
    .sort((a, b) => {
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 6);

  return (
    <section
      role="region"
      aria-label="Featured projects"
      className="section-container"
    >
      <div className="flex items-center justify-between gap-1.5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <GitPullRequestArrow className="size-3" />
          <h2 className="text-xs tracking-wide uppercase font-semibold">
            Projects
          </h2>
        </div>
        <Button asChild>
          <Link href={URLS.PROJECTS_LIST()} className="flex items-center gap-1">
            View all &rarr;
          </Link>
        </Button>
      </div>
      {latestProjects.length > 0 ? (
        <div className="list-container">
          {latestProjects.map((project, index) => (
            <ProjectSummaryCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <PlaceholderCard />
      )}
    </section>
  );
}
