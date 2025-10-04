import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { Markdown } from "passport-ui/markdown";
import { StructuredData } from "passport-ui/structured-data";

import { DateRange } from "@/components/common/date-range";
import EntityHeader from "@/components/common/entity-header";
import { TagButton } from "@/components/common/tag-button";
import { formatDateShort } from "@/components/helpers/date";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { generateWorkSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";
import { getWorkBySlugContent } from "@/components/helpers/work";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const workData = getWorkBySlugContent(slug);

  if (!workData) {
    notFound();
  }

  const { meta: work, content } = workData;

  return (
    <ContentContainer variant="relaxed">
      <StructuredData data={generateWorkSchema(work)} />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: work.company,
            href: URLS.WORK(work.slug),
          },
        ]}
      />
      <EntityHeader
        imageSrc={work.image}
        title={work.company}
        subtitle={work.role}
      />
      <div className="meta-container">
        <h4>Service period</h4>
        <DateRange startDate={work.startDate} endDate={work.endDate} />
      </div>
      {work.skills && work.skills.length > 0 && (
        <div className="meta-container">
          <h4>Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {work.skills.map((tag, index) => (
              <TagButton key={index} tag={tag} source="work" />
            ))}
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

  const workData = getWorkBySlugContent(slug);

  if (!workData) {
    return createNotFoundMetadata("Work");
  }

  const { meta: work } = workData;

  const duration = `${formatDateShort(work.startDate)} - ${
    work.endDate ? formatDateShort(work.endDate) : "Present"
  }`;

  const description = `${work.role} position at ${work.company} (${duration}).`;

  const metadata = createPageMetadata({
    title: `${work.role} at ${work.company}`,
    description: description,
    keywords: [work.role, work.company, "work"],
    url: URLS.WORK(work.slug),
    image: work.ogImage,
  });

  return metadata;
}

export async function generateStaticParams() {
  const { getAllWorkSlugs } = await import("@/components/helpers/work");
  const workItems = getAllWorkSlugs();
  return workItems.map((work) => ({
    slug: work.slug,
  }));
}
