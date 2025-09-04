import { Metadata } from "next";
import Link from "next/link";

import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Button } from "@/components/ui/button";
import { PageWithStructuredData } from "@/components/ui/common";
import { configData } from "@/data/config";
import { profileData } from "@/data/profile";
import { URLS } from "@/lib/constants";
import { getAllArticlesIndex } from "@/lib/helpers/article";
import { getAllCommunityIndex } from "@/lib/helpers/community";
import { SITE_DESCRIPTION, SITE_IMAGE } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";
import { generateDefaultSchema } from "@/lib/helpers/structured-data";

const recentArticles = getAllArticlesIndex(6);
const recentContributions = getAllCommunityIndex(6);

export default function HomePage() {
  return (
    <PageWithStructuredData structuredData={generateDefaultSchema()}>
      <div className="content-container">
        <div className="section-container">
          {profileData.profile.description && (
            <p className="text-muted-foreground text-sm">
              {profileData.profile.description}
            </p>
          )}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={URLS.BIO()} className="flex items-center gap-1">
                View bio &rarr;
              </Link>
            </Button>
          </div>
        </div>
        {recentArticles.length > 0 && (
          <ArticlesSection articles={recentArticles} />
        )}
        {recentContributions.length > 0 && (
          <CommunitySection contributions={recentContributions} />
        )}
        {profileData.projects.length > 0 && (
          <ProjectsSection
            projects={profileData.projects.map((p) => ({ ...p }))}
          />
        )}
      </div>
    </PageWithStructuredData>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    description: SITE_DESCRIPTION,
    keywords: configData.seo.keywords,
    url: URLS.HOME(),
    image: SITE_IMAGE,
  });

  return metadata;
}
