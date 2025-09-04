"use client";

import Link from "next/link";

import { profileData } from "@/data/profile";
import { SimpleIcon, socialIconPaths } from "@/lib/utils/icons";

export function IconLinks() {
  const { socialMedia, links } = profileData.profile;

  const allLinks = [
    ...(links ? Object.entries(links).filter(([, url]) => url) : []),
    ...(socialMedia
      ? Object.entries(socialMedia).filter(([, url]) => url)
      : []),
  ];

  return (
    allLinks.length > 0 && (
      <div className="flex gap-2">
        {allLinks.map(([platform, url]) => {
          const iconPath =
            socialIconPaths[platform as keyof typeof socialIconPaths];

          return (
            <Link
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
            >
              {iconPath && <SimpleIcon iconPath={iconPath} />}
            </Link>
          );
        })}
      </div>
    )
  );
}
