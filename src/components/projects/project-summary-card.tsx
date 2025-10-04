"use client";

import Image from "next/image";
import { PrefetchLink } from "passport-ui/prefetch-link";

import { formatDateShort } from "@/components/helpers/date";
import { URLS } from "@/components/helpers/urls";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  currentTag?: string;
}

export function ProjectSummaryCard({ project }: ProjectCardProps) {
  return (
    <div className="meta-container">
      <PrefetchLink href={URLS.PROJECTS(project.slug)} className="block">
        <div className="flex justify-between items-center gap-4 group">
          <div className="flex gap-2 items-center">
            {project.image && (
              <div className="flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={14}
                  height={14}
                  className="object-cover size-4.5"
                />
              </div>
            )}
            <p className="group-hover:underline text-foreground underline-offset-4 decoration-muted-foreground/50 line-clamp-1">
              {project.title}
            </p>
          </div>
          <p className="min-w-fit text-muted-foreground group-hover:text-foreground opacity-70">
            {formatDateShort(project.date)}
          </p>
        </div>
      </PrefetchLink>
    </div>
  );
}
