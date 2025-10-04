import { Home, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "passport-ui/button";
import { Card, CardContent } from "passport-ui/card";
import { ContentContainer } from "passport-ui/content-container";
import { PrefetchLink } from "passport-ui/prefetch-link";
import { plural } from "pluralize";

import { getArticleLabel } from "@/components/helpers/config";
import { createPageMetadata } from "@/components/helpers/metadata";
import { URLS } from "@/components/helpers/urls";

const articleLabel = plural(getArticleLabel());

export default function NotFound() {
  return (
    <ContentContainer variant="relaxed">
      <div className="mt-12 flex items-center justify-center">
        <Card className="w-full">
          <CardContent>
            <div className="flex flex-col text-center">
              <h1>404</h1>
              <h4>Page not found.</h4>
              <p className="text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved. Return to the homepage or browse{" "}
                {articleLabel.toLowerCase()} to find what you&apos;re looking
                for.
              </p>
            </div>
            <div className="flex mx-auto flex-col md:flex-row gap-3 justify-center w-full">
              <PrefetchLink href={URLS.HOME()}>
                <Button>
                  <Home />
                  Home
                </Button>
              </PrefetchLink>
              <PrefetchLink href={URLS.ARTICLES_LIST()}>
                <Button>
                  <Newspaper />
                  Browse {articleLabel.toLowerCase()}
                </Button>
              </PrefetchLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentContainer>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Page not found`,
    description: `The page you're looking for doesn't exist or has been moved. Return to the homepage or browse ${articleLabel.toLowerCase()} to find what you're looking for.`,
  });

  return metadata;
}
