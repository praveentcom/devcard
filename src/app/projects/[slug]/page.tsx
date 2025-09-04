import { Calendar, Github, UserRound, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  BackButton,
  BulletList,
  EntityHeader,
  MetaCard,
  PageWithStructuredData,
} from "@/components/ui/common";
import { TagBadge } from "@/components/ui/tag-badge";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants/urls";
import { PROFILE_NAME } from "@/lib/helpers/config";
import { formatDateShort } from "@/lib/helpers/markdown";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/helpers/metadata";
import { generateProjectSchema } from "@/lib/helpers/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = profileData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageWithStructuredData structuredData={generateProjectSchema(project)}>
      <div className="flex items-center justify-between">
        <BackButton href={URLS.PROJECTS_LIST()} label="Projects" />
        <div className="flex gap-4 mb-5">
          {project.githubUrl && (
            <Button asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <Github className="size-3" />
                <span>GitHub</span>
              </Link>
            </Button>
          )}
          {project.url && (
            <Button asChild>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <p>Website</p>
                <p>{"\u2197"}</p>
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="content-container">
        <EntityHeader
          imageSrc={project.image}
          title={project.title}
          subtitle={project.description}
        />
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tag, index) => (
            <TagBadge key={index} tag={tag} source="projects" asLink />
          ))}
        </div>
        {project.date && (
          <MetaCard title="Project date">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="size-3" />
              <p>{formatDateShort(project.date)}</p>
            </div>
          </MetaCard>
        )}
        {project.coAuthors && project.coAuthors.length > 0 ? (
          <MetaCard title="Project authors">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <UsersRound className="size-3" />
              <p>
                {PROFILE_NAME}, {project.coAuthors.join(", ")}
              </p>
            </div>
          </MetaCard>
        ) : (
          <MetaCard title="Project authors">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <UserRound className="size-3" />
              <p>{PROFILE_NAME}</p>
            </div>
          </MetaCard>
        )}
        {project.bulletPoints?.length > 0 && (
          <MetaCard title="Highlights">
            <BulletList items={project.bulletPoints} />
          </MetaCard>
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = profileData.projects.find((p) => p.slug === slug);

  if (!project) {
    return createNotFoundMetadata("Project");
  }

  const metadata = createPageMetadata({
    title: `${project.title}`,
    description: project.description,
    url: URLS.PROJECTS(project.slug),
    image: project.ogImage,
  });

  return metadata;
}

export async function generateStaticParams() {
  return profileData.projects.map((p) => ({ slug: p.slug }));
}
