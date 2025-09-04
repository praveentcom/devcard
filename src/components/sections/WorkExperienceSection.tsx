import { Briefcase } from "lucide-react";

import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { WorkSummaryCard } from "@/components/work/WorkSummaryCard";
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
        <EmptyPlaceholderCard />
      )}
    </section>
  );
}
