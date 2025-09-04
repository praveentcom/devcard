"use client";

import { IconLinks } from "@/components/ui/icon-links";
import { configData } from "@/data/config";
import { profileData } from "@/data/profile";

export function Footer() {
  return (
    <footer className="mt-6 py-6 border-t border-border">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="text-center md:text-left grid text-xs text-muted-foreground">
            <p className="font-medium">
              © {new Date().getFullYear()} {profileData.profile.firstName}{" "}
              {profileData.profile.lastName}
            </p>
            <p>{configData.misc.footerSubtitle}</p>
          </div>

          <div className="section-container md:justify-items-end h-min w-min mx-auto md:ml-auto md:mr-0">
            <IconLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
