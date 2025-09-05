/**
 * Get the read time for a piece of content
 * @param content - The content to get the read time for
 * @returns The read time for the content
 */
function getReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default getReadTime;
