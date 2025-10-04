import { Markdown } from "passport-ui/markdown";

interface MdContentProps {
  content: string | null;
  className?: string;
  fallback?: React.ReactNode;
}

export function MdContent({
  content,
  className,
  fallback = null,
}: MdContentProps) {
  if (!content) {
    return fallback;
  }

  return (
    <div className={className}>
      <Markdown content={content} theme="vs" />
    </div>
  );
}
