import { PROFILE_NAME } from "@/components/helpers/config";
import {
  getArticlesForRSS,
  getRSSFeedMetadata,
} from "@/components/helpers/rss";

/**
 * Generate RSS feed XML for articles
 */
function generateRSSFeed(): string {
  const articles = getArticlesForRSS(20);
  const metadata = getRSSFeedMetadata();

  const rssItems = articles
    .map((article) => {
      const imageEnclosure = article.imageData
        ? `<enclosure url="${article.imageData.url}" type="${article.imageData.type}" length="${article.imageData.length}" />`
        : "";

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.description}]]></description>
      <link>${article.url}</link>
      <guid isPermaLink="true">${article.url}</guid>
      <pubDate>${article.pubDate}</pubDate>
      <author>${article.author}</author>
      ${imageEnclosure ? `${imageEnclosure}\n      ` : ""}${article.categories?.map((cat) => `<category><![CDATA[${cat}]]></category>`).join("\n      ") || ""}
    </item>`;
    })
    .join("");

  const lastBuildDate =
    articles.length > 0 ? articles[0].pubDate : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${metadata.title}]]></title>
    <description><![CDATA[${metadata.description}]]></description>
    <link>${metadata.link}</link>
    <atom:link href="${metadata.url}" rel="self" type="application/rss+xml"/>
    <language>${metadata.language}</language>
    <copyright><![CDATA[${metadata.copyright}]]></copyright>
    <managingEditor>${metadata.managingEditor} (${PROFILE_NAME})</managingEditor>
    <webMaster>${metadata.webMaster} (${PROFILE_NAME})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>${metadata.generator}</generator>
    <image>
      <url>${metadata.image.url}</url>
      <title><![CDATA[${metadata.image.title}]]></title>
      <link>${metadata.image.link}</link>
      <width>${metadata.image.width}</width>
      <height>${metadata.image.height}</height>
    </image>
    ${metadata.categories?.map((cat) => `<category><![CDATA[${cat}]]></category>`).join("\n      ") || ""}
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`.trim();
}

export async function GET() {
  try {
    const feed = generateRSSFeed();

    return new Response(feed, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
