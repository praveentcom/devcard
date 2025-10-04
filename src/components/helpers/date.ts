import { format } from "date-fns";

/**
 * Format a date string to a long format
 * @param dateString - The date string to format
 * @returns The formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd MMM yyyy");
}

/**
 * Format a date string to a short format
 * @param dateString - The date string to format
 * @returns The formatted date string
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "MMM yyyy");
}
