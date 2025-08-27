"use client";

import { Home, Newspaper } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { URLS } from "@/lib/constants/urls";
import { getArticleLabel } from "@/lib/helpers/config";

export default function Error() {
  return (
    <div className="my-16 mx-4 bg-background flex items-center justify-center">
      <div className="container mx-auto max-w-2xl">
        <Card className="text-center py-6">
          <CardHeader>
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-4xl font-bold text-muted-foreground/30 select-none">
                  500
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <h1 className="text-md font-medium">
                Uh-oh. Something went wrong.
              </h1>
              <p className="text-muted-foreground text-sm">
                An error occurred while loading the page.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex mx-auto flex-col md:flex-row gap-3 justify-center w-full">
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-1.5"
              >
                <Link href={URLS.HOME()}>
                  <Home className="size-4" />
                  Back to home
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-1.5"
              >
                <Link href={URLS.ARTICLES_LIST()}>
                  <Newspaper className="size-4" />
                  Browse {getArticleLabel().toLowerCase()}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
