import Image from "next/image";

import { PrefetchLink } from "@/components/ui/prefetch-link";
import { URLS } from "@/lib/constants/urls";
import { formatDateShort } from "@/lib/helpers/markdown";
import { WorkExperience } from "@/types/work";

export function WorkSummaryCard({
  experience,
}: {
  experience: WorkExperience;
}) {
  const endDateText = experience.endDate
    ? formatDateShort(experience.endDate)
    : "Present";

  return (
    <PrefetchLink href={URLS.WORK(experience.slug)} prefetchOnVisible={true}>
      <div className="flex justify-between items-center gap-4 font-medium">
        <div className="flex gap-2 items-center">
          {experience.image && (
            <div className="card-image-container">
              <Image
                src={experience.image}
                alt={`${experience.company} logo`}
                width={12}
                height={12}
                className="object-cover size-4"
              />
            </div>
          )}
          <h1 className="text-sm underline text-foreground underline-offset-4 decoration-accent-foreground/10 hover:decoration-accent-foreground/50 line-clamp-1">
            {experience.company}
          </h1>
        </div>
        <div className="text-xs flex items-center min-w-fit text-muted-foreground">
          <p>{experience.role}</p>
          <p className="before:content-['·'] before:mx-1.5 hide-on-mobile">
            {formatDateShort(experience.startDate)} - {endDateText}
          </p>
        </div>
      </div>
    </PrefetchLink>
  );
}
