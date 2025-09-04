"use client";

import { Profile } from "@/types/user-profile";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const { description, bulletPoints } = profile;

  return (
    <div className="section-container">
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="bullet-list">
          {bulletPoints.map((point, index) => (
            <li key={index} className="bullet-item">
              <div className="bullet-dot" />
              <span className="bullet-text">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
