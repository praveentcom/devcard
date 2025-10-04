import { GraduationCap } from "lucide-react";
import { EmptyState } from "passport-ui/empty-state";

import { EducationSummaryCard } from "@/components/education/education-summary-card";
import { Education } from "@/types/education";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section role="region" aria-label="Education" className="section-container">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <GraduationCap className="size-3.5" />
        <h6 className="leading-none">Education</h6>
      </div>
      {education.length > 0 ? (
        <div className="list-container">
          {education.map((edu, index) => (
            <EducationSummaryCard key={index} education={edu} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
