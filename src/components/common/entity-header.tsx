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
      <div className="title-container">
        <h1 className="leading-none text-md font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default EntityHeader;
