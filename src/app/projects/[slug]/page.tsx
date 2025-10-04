import { Github, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { Button } from "passport-ui/button";
import { ContentContainer } from "passport-ui/content-container";
import { Markdown } from "passport-ui/markdown";
import { PrefetchLink } from "passport-ui/prefetch-link";
import { StructuredData } from "passport-ui/structured-data";

import EntityHeader from "@/components/common/entity-header";
import { TagButton } from "@/components/common/tag-button";
import { PROFILE_NAME } from "@/components/helpers/config";
import { formatDateShort } from "@/components/helpers/date";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { getProjectBySlugContent } from "@/components/helpers/projects";
import { generateProjectSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectData = getProjectBySlugContent(slug);

  if (!projectData) {
    notFound();
  }

  const { meta: project, content } = projectData;

  return (
    <ContentContainer variant="relaxed">
      <StructuredData data={generateProjectSchema(project)} />
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
            label: project.title,
            href: URLS.PROJECTS(project.slug),
          },
        ]}
      />
      <div className="section-container">
        <EntityHeader
          imageSrc={project.image}
          title={project.title}
          subtitle={project.description}
        />
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tag, index) => (
            <TagButton key={index} tag={tag} source="projects" asLink />
          ))}
        </div>
      </div>
      {(project.githubUrl || project.url) && (
        <div className="meta-container">
          <h4>Project links</h4>
          <div className="flex gap-4">
            {project.githubUrl && (
              <PrefetchLink
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Github />
                  GitHub {"\u2197"}
                </Button>
              </PrefetchLink>
            )}
            {project.url && (
              <PrefetchLink
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Website {"\u2197"}</Button>
              </PrefetchLink>
            )}
          </div>
        </div>
      )}
      {project.date && (
        <div className="meta-container">
          <h4>Project date</h4>
          <div className="flex items-center gap-1 text-muted-foreground">
            <p>{formatDateShort(project.date)}</p>
          </div>
        </div>
      )}
      {project.coAuthors && project.coAuthors.length > 0 ? (
        <div className="meta-container">
          <h4>Project authors</h4>
          <div className="flex items-center gap-1 text-muted-foreground">
            <p className="leading-none">
              {PROFILE_NAME}, {project.coAuthors.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="meta-container">
          <h4>Project authors</h4>
          <div className="flex items-center gap-1 text-muted-foreground">
            <UserRound className="size-3.5" />
            <p className="leading-none">{PROFILE_NAME}</p>
          </div>
        </div>
      )}
      <div className="section-container">
        <Markdown content={content} theme="vs" />
      </div>
    </ContentContainer>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectData = getProjectBySlugContent(slug);

  if (!projectData) {
    return createNotFoundMetadata("Project");
  }

  const { meta: project } = projectData;

  const metadata = createPageMetadata({
    title: `${project.title}`,
    description: project.description,
    url: URLS.PROJECTS(project.slug),
    image: project.ogImage,
  });

  return metadata;
}

export async function generateStaticParams() {
  const { getAllProjectSlugs } = await import("@/components/helpers/projects");
  const projectItems = getAllProjectSlugs();
  return projectItems.map((project) => ({
    slug: project.slug,
  }));
}
