import { Briefcase } from "lucide-react";

import { WorkSummaryCard } from "@/components/work/work-summary-card";
import { WorkExperience } from "@/types/work";
import { PlaceholderCard } from "@/ui/client";

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
        <Briefcase className="size-3" />
        <h2 className="text-xs tracking-wide uppercase font-semibold">Work</h2>
      </div>
      {workExperience.length > 0 ? (
        <div className="list-container">
          {workExperience.map((experience, index) => (
            <WorkSummaryCard key={index} experience={experience} />
          ))}
        </div>
      ) : (
        <PlaceholderCard />
      )}
    </section>
  );
}
