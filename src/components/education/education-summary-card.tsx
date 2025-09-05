import Image from "next/image";

import { formatDateShort } from "@/components/helpers/date";
import { URLS } from "@/components/helpers/urls";
import { Education } from "@/types/education";
import { PrefetchLink } from "@/ui/client";

export function EducationSummaryCard({ education }: { education: Education }) {
  const endDateText = education.endDate
    ? formatDateShort(education.endDate)
    : "Present";

  return (
    <div className="meta-container">
      <PrefetchLink
        href={URLS.EDUCATION(education.slug)}
        prefetchOnVisible={true}
      >
        <div className="flex justify-between items-center gap-4 font-medium">
          <div className="flex gap-2 items-center">
            {education.image && (
              <div className="flex-shrink-0">
                <Image
                  src={education.image}
                  alt={`${education.school} logo`}
                  width={12}
                  height={12}
                  className="object-cover size-4"
                />
              </div>
            )}
            <h1 className="text-sm underline text-foreground underline-offset-4 decoration-accent-foreground/10 hover:decoration-accent-foreground/50 line-clamp-1">
              {education.school}
            </h1>
          </div>
          <div className="text-xs flex items-center min-w-fit text-muted-foreground">
            <p>{education.degree}</p>
            <p className="before:content-['·'] before:mx-1.5 hide-on-mobile">
              {formatDateShort(education.startDate)} - {endDateText}
            </p>
          </div>
        </div>
      </PrefetchLink>
    </div>
  );
}
