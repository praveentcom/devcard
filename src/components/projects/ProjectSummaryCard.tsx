import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/lib/constants/urls";
import { formatDateShort } from "@/lib/helpers/markdown";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  currentTag?: string;
}

export function ProjectSummaryCard({ project }: ProjectCardProps) {
  return (
    <div className="meta-container">
      <Link href={URLS.PROJECTS(project.slug)} className="block">
        <div className="flex justify-between items-center gap-4 font-medium">
          <div className="flex gap-2 items-center">
            {project.image && (
              <div className="card-image-container">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={12}
                  height={12}
                  className="object-cover size-4"
                />
              </div>
            )}
            <h1 className="text-sm underline text-foreground underline-offset-4 decoration-accent-foreground/10 hover:decoration-accent-foreground/50 line-clamp-1">
              {project.title}
            </h1>
          </div>
          <p className="text-xs min-w-fit text-muted-foreground">
            {formatDateShort(project.date)}
          </p>
        </div>
      </Link>
    </div>
  );
}
