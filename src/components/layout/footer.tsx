"use client";

import { SocialIconLinks } from "@/components/common/social-icons";
import { configData } from "@/data/config";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mt-1.5 mb-2.5">
      <div className="text-center md:text-left grid text-xs text-muted-foreground">
        <p className="text-foreground">
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </p>
        <p>{configData.misc.footerSubtitle}</p>
      </div>

      <div className="section-container md:justify-items-end h-min w-min mx-auto md:ml-auto md:mr-0">
        <SocialIconLinks />
      </div>
    </div>
  );
}
