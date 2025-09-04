import { GraduationCap } from "lucide-react";

import { EducationSummaryCard } from "@/components/education/EducationSummaryCard";
import EmptyPlaceholderCard from "@/components/ui/empty-placeholder-card";
import { Education } from "@/types/education";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section role="region" aria-label="Education" className="section-container">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <GraduationCap className="size-3" />
        <h2 className="text-xs tracking-wide uppercase font-semibold">
          Education
        </h2>
      </div>
      {education.length > 0 ? (
        <div className="list-container">
          {education.map((edu, index) => (
            <EducationSummaryCard key={index} education={edu} />
          ))}
        </div>
      ) : (
        <EmptyPlaceholderCard />
      )}
    </section>
  );
}
