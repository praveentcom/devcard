import { Home, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { plural } from "pluralize";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { URLS } from "@/lib/constants";
import { getArticleLabel } from "@/lib/helpers/config";
import { createPageMetadata } from "@/lib/helpers/metadata";

const articleLabel = plural(getArticleLabel());

export default function NotFound() {
  return (
    <div className="my-16 mx-4 bg-background flex items-center justify-center">
      <div className="container mx-auto max-w-2xl">
        <Card className="text-center py-6">
          <CardHeader>
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-4xl font-bold text-muted-foreground/30 select-none">
                  404
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <h1 className="text-md font-medium">
                You&apos;ve reached the void.
              </h1>
              <p className="text-muted-foreground text-sm">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex mx-auto flex-col md:flex-row gap-3 justify-center w-full">
              <Button asChild className="flex items-center gap-1.5">
                <Link href={URLS.HOME()}>
                  <Home className="size-4" />
                  Home
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-1.5">
                <Link href={URLS.ARTICLES_LIST()}>
                  <Newspaper className="size-4" />
                  Browse {articleLabel.toLowerCase()}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createPageMetadata({
    title: `Page not found`,
    description: `The page you're looking for doesn't exist or has been moved. Return to the homepage or browse ${articleLabel.toLowerCase()} to find what you're looking for.`,
  });

  return metadata;
}
