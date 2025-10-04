import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "passport-ui/breadcrumb";
import { ContentContainer } from "passport-ui/content-container";
import { Markdown } from "passport-ui/markdown";
import { StructuredData } from "passport-ui/structured-data";

import { DateRange } from "@/components/common/date-range";
import EntityHeader from "@/components/common/entity-header";
import { formatDateShort } from "@/components/helpers/date";
import { getEducationBySlugContent } from "@/components/helpers/education";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { generateEducationSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EducationPage({ params }: PageProps) {
  const { slug } = await params;
  const educationData = getEducationBySlugContent(slug);

  if (!educationData) {
    notFound();
  }

  const { meta: education, content } = educationData;

  return (
    <ContentContainer variant="relaxed">
      <StructuredData data={generateEducationSchema(education)} />
      <Breadcrumb
        path={[
          {
            label: "Home",
            href: URLS.HOME(),
          },
          {
            label: education.school,
            href: URLS.EDUCATION(education.slug),
          },
        ]}
      />
      <EntityHeader
        imageSrc={education.image}
        title={education.school}
        subtitle={education.degree}
      />
      <div className="meta-container">
        <h4>Program duration</h4>
        <DateRange
          startDate={education.startDate}
          endDate={education.endDate}
        />
      </div>
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
  const educationData = getEducationBySlugContent(slug);

  if (!educationData) {
    return createNotFoundMetadata("Education");
  }

  const { meta: education } = educationData;

  const duration = `${formatDateShort(education.startDate)} - ${
    education.endDate ? formatDateShort(education.endDate) : "Present"
  }`;
  const description = `${education.degree} from ${education.school} (${duration}).`;

  const metadata = createPageMetadata({
    title: `${education.degree} from ${education.school}`,
    description: description,
    type: "article",
    url: URLS.EDUCATION(education.slug),
    image: education.ogImage,
  });

  return metadata;
}

export async function generateStaticParams() {
  const { getAllEducationSlugs } = await import(
    "@/components/helpers/education"
  );
  const educationItems = getAllEducationSlugs();
  return educationItems.map((education) => ({
    slug: education.slug,
  }));
}
