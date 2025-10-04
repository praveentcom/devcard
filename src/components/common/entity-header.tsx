import Image from "next/image";

/**
 * Common entity header (for projects, work, education)
 */
function EntityHeader({
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
      <div className="meta-container">
        <h3>{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default EntityHeader;
