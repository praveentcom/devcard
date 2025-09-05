import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DateRange } from "@/components/common/date-range";
import EntityHeader from "@/components/common/entity-header";
import { formatDateShort } from "@/components/helpers/date";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/components/helpers/metadata";
import { findBySlug, generateSlugParams } from "@/components/helpers/page";
import { generateEducationSchema } from "@/components/helpers/structured-data";
import { URLS } from "@/components/helpers/urls";
import { profileData } from "@/data/profile";
import {
  BackButton,
  BulletList,
  MetaCard,
  PageWithStructuredData,
} from "@/ui/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EducationPage({ params }: PageProps) {
  const { slug } = await params;

  const education = profileData.education.find((e) => e.slug === slug);

  if (!education) {
    notFound();
  }

  return (
    <PageWithStructuredData structuredData={generateEducationSchema(education)}>
      <BackButton href={URLS.BIO()} label="Bio" />
      <div className="content-container">
        <EntityHeader
          imageSrc={education.image}
          title={education.school}
          subtitle={education.degree}
        />
        <MetaCard title="Program duration">
          <DateRange
            startDate={education.startDate}
            endDate={education.endDate}
          />
        </MetaCard>
        {education.bulletPoints?.length > 0 && (
          <MetaCard title="Highlights">
            <BulletList items={education.bulletPoints} />
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
  const education = findBySlug(profileData.education, slug);

  if (!education) {
    return createNotFoundMetadata("Education");
  }

  const duration = `${formatDateShort(education.startDate)} - ${
    education.endDate ? formatDateShort(education.endDate) : "Present"
  }`;
  const description = `${education.degree} from ${education.school} (${duration}). ${
    education.bulletPoints?.[0] || ""
  }`;

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
  return generateSlugParams(profileData.education);
}
