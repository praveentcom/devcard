"use client";

import { Briefcase } from "lucide-react";
import { EmptyState } from "passport-ui/empty-state";

import { WorkSummaryCard } from "@/components/work/work-summary-card";
import { WorkExperience } from "@/types/work";

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[];
}

export function WorkExperienceSection({
  workExperience,
}: WorkExperienceSectionProps) {
  return (
    <section
      role="region"
      aria-label="Work experience"
      className="section-container"
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Briefcase className="size-3.5" />
        <h6 className="leading-none">Work</h6>
      </div>
      {workExperience.length > 0 ? (
        <div className="list-container">
          {workExperience.map((experience, index) => (
            <WorkSummaryCard key={index} experience={experience} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
