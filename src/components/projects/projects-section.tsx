"use client";

import { GitPullRequestArrow } from "lucide-react";
import { Button } from "passport-ui/button";
import { EmptyState } from "passport-ui/empty-state";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { URLS } from "@/components/helpers/urls";
import { ProjectSummaryCard } from "@/components/projects/project-summary-card";
import { Project } from "@/types/project";

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
          <GitPullRequestArrow className="size-3.5" />
          <h6 className="leading-none">Projects</h6>
        </div>
        <PrefetchLink href={URLS.PROJECTS_LIST()}>
          <Button>View all &rarr;</Button>
        </PrefetchLink>
      </div>
      {latestProjects.length > 0 ? (
        <div className="list-container">
          {latestProjects.map((project, index) => (
            <ProjectSummaryCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
