import { formatDateShort } from "@/components/helpers/date";

/**
 * Date range display component
 */
export function DateRange({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) {
  return (
    <div className="flex gap-1 items-center text-muted-foreground">
      <p>
        {formatDateShort(startDate)} -{" "}
        {endDate ? formatDateShort(endDate) : "Present"}
      </p>
    </div>
  );
}
