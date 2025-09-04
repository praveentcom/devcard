import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BackButton,
  BulletList,
  DateRange,
  EntityHeader,
  MetaCard,
  PageWithStructuredData,
} from "@/components/ui/common";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants/urls";
import { formatDateShort } from "@/lib/helpers/markdown";
import {
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/helpers/metadata";
import { findBySlug, generateSlugParams } from "@/lib/helpers/page";
import { generateEducationSchema } from "@/lib/helpers/structured-data";

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
