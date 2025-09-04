import DOMPurify from "isomorphic-dompurify";

import { parseMarkdown } from "@/lib/helpers/markdown";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  muted?: boolean;
  className?: string;
}

export function Markdown({ content, muted = true, className }: MarkdownProps) {
  const html = parseMarkdown(content);

  /**
   * Sanitize HTML to prevent XSS attacks
   * Using isomorphic-dompurify for both client and server-side sanitization
   */
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "del",
      "code",
      "pre",
      "ul",
      "ol",
      "li",
      "blockquote",
      "hr",
      "a",
      "img",
      "div",
      "span",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "class",
      "src",
      "alt",
      "type",
      "disabled",
      "checked",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  return (
    <article
      className={cn("article-base", muted && "article-muted", className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
