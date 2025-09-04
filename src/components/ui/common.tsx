import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { BlurIn } from "@/components/motion-primitives";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/helpers/markdown";

export function PageWithStructuredData({
  structuredData,
  children,
}: {
  structuredData: object;
  children: ReactNode;
}) {
  return (
    <BlurIn>
      <StructuredData data={structuredData} />
      <div className="page-container">{children}</div>
    </BlurIn>
  );
}

export function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="mb-5">
      <Button asChild>
        <Link
          href={href}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          &larr; {label}
        </Link>
      </Button>
    </div>
  );
}

/**
 * Common entity header (for projects, work, education)
 */
export function EntityHeader({
  imageSrc,
  title,
  subtitle,
}: {
  imageSrc?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-container">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          width={48}
          height={48}
          className="rounded-sm border object-cover size-14"
        />
      )}
      <div className="title-container">
        <h1 className="leading-none text-md font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Common bullet list component
 */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item, index) => (
        <li key={index} className="bullet-item">
          <div className="bullet-dot" />
          <span className="bullet-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Common section card wrapper
 */
export function MetaCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="meta-container">
      <h4 className="text-sm font-medium">{title}</h4>
      {children}
    </div>
  );
}

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
    <div className="flex gap-1 items-center text-sm text-muted-foreground">
      <Calendar className="size-3" />
      <p>
        {formatDateShort(startDate)} -{" "}
        {endDate ? formatDateShort(endDate) : "Present"}
      </p>
    </div>
  );
}
