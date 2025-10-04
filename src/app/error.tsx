"use client";

import { Home, Newspaper } from "lucide-react";
import { Button } from "passport-ui/button";
import { Card, CardContent } from "passport-ui/card";
import { ContentContainer } from "passport-ui/content-container";
import { PrefetchLink } from "passport-ui/prefetch-link";
import { plural } from "pluralize";

import { getArticleLabel } from "@/components/helpers/config";
import { URLS } from "@/components/helpers/urls";

const articleLabel = plural(getArticleLabel());

export default function Error() {
  return (
    <ContentContainer variant="relaxed">
      <div className="mt-12 flex items-center justify-center">
        <Card className="w-full">
          <CardContent>
            <div className="flex flex-col text-center">
              <h1>500</h1>
              <h4>Uh-oh. Something went wrong.</h4>
              <p className="text-muted-foreground">
                An error occurred while loading the page. Please try again
                later.
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
