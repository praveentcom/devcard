"use client";

import { Profile } from "@/types/user-profile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AboutSectionProps {
  profile: Profile;
}

function SimpleIcon({ iconPath }: { iconPath: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
    >
      <path d={iconPath} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

const socialIconPaths = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram:
    "M12 0C8.737 0 8.332.012 7.052.07c-1.28.058-2.159.243-2.93.519A5.92 5.92 0 0 0 1.89 1.89 5.92 5.92 0 0 0 .589 4.122c-.276.771-.461 1.65-.519 2.93C.012 8.332 0 8.737 0 12s.012 3.668.07 4.948c.058 1.28.243 2.159.519 2.93.376 1.012.756 1.688 1.301 2.233.545.545 1.221.925 2.233 1.301.771.276 1.65.461 2.93.519 1.28.058 1.685.07 4.948.07s3.668-.012 4.948-.07c1.28-.058 2.159-.243 2.93-.519a5.92 5.92 0 0 0 2.233-1.301 5.92 5.92 0 0 0 1.301-2.233c.276-.771.461-1.65.519-2.93.058-1.28.07-1.685.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.243-2.159-.519-2.93A5.92 5.92 0 0 0 22.11 1.89 5.92 5.92 0 0 0 19.878.589c-.771-.276-1.65-.461-2.93-.519C15.668.012 15.263 0 12 0zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zm0 10.162a4 4 0 1 0 0-7.999 4 4 0 0 0 0 8zM18.406 4.155a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z",
  youtube:
    "M23.498 6.186a2.97 2.97 0 00-2.103-2.103C19.456 3.5 12 3.5 12 3.5s-7.456 0-9.395.583A2.97 2.97 0 00.502 6.186 31.5 31.5 0 000 12a31.5 31.5 0 00.502 5.814 2.97 2.97 0 002.103 2.103C4.544 20.5 12 20.5 12 20.5s7.456 0 9.395-.583a2.97 2.97 0 002.103-2.103A31.5 31.5 0 0024 12a31.5 31.5 0 00-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z",
  stackoverflow:
    "M17.473 20.5v-5h2v7H3.5v-7h2v5h11.973zM6.485 17.5h9.973v-2H6.485v2zm.311-4.246l.414-1.967 9.775 2.06-.414 1.967-9.775-2.06zm1.26-4.793l.828-1.859 9.019 4.02-.828 1.86-9.019-4.021zm2.422-4.56l1.242-1.6 7.3 6.08-1.242 1.6-7.3-6.08z",
};

export function AboutSection({ profile }: AboutSectionProps) {
  const {
    firstName,
    lastName,
    currentPosition,
    imageUrl,
    description,
    bulletPoints,
    socialMedia,
    links,
  } = profile;

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const nameHref = isHomePage ? "/about" : "/";

  return (
    <Card className="w-full card-shadow py-5">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {imageUrl && (
            <div className="card-image-container">
              <Image
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
                width={150}
                height={150}
                className="profile-image-lg"
              />
            </div>
          )}
          <div className="text-left flex-1 grid gap-4">
            <div className="flex-1 grid">
              <Link 
                href={nameHref}
                className="text-xl font-semibold hover:text-primary transition-colors duration-200 w-fit"
              >
                Hi, I&apos;m {firstName} {lastName}
              </Link>
              {currentPosition && (
                <p className="text-md font-medium text-muted-foreground">
                  {currentPosition}
                </p>
              )}
            </div>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bulletPoints && bulletPoints.length > 0 && (
          <div>
            <p className="font-semibold text-sm mb-2.5">Highlights</p>
            <ul className="bullet-list">
              {bulletPoints.map((point, index) => (
                <li key={index} className="bullet-item">
                  <div className="bullet-dot" />
                  <span className="bullet-text">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {links && Object.values(links).some(Boolean) && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-sm">Links</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(links).map(([platform, url]) => {
                  if (!url) return null;
                  const iconPath =
                    socialIconPaths[platform as keyof typeof socialIconPaths];

                  return (
                    <Button key={platform} variant="outline" size="sm" asChild>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs"
                      >
                        {iconPath ? <SimpleIcon iconPath={iconPath} /> : null}
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          {socialMedia && Object.values(socialMedia).some(Boolean) && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-sm">Socials</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(socialMedia).map(([platform, url]) => {
                  if (!url) return null;
                  const iconPath =
                    socialIconPaths[platform as keyof typeof socialIconPaths];

                  return (
                    <Button key={platform} variant="outline" size="sm" asChild>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs"
                      >
                        {iconPath ? <SimpleIcon iconPath={iconPath} /> : null}
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
