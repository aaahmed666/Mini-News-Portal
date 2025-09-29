/**
 * Highlights search terms in text with HTML markup
 */
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;

  const searchTerms = query
    .trim()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  let highlightedText = text;

  searchTerms.forEach((term) => {
    const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="search-highlight">$1</mark>'
    );
  });

  return highlightedText;
}

/**
 * Escapes special regex characters in search terms
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extracts a snippet of text around search terms
 */
export function extractSnippet(
  text: string,
  query: string,
  maxLength = 200
): string {
  if (!query.trim())
    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");

  const searchTerm = query.trim().split(/\s+/)[0].toLowerCase();
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(searchTerm);

  if (index === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
  }

  const start = Math.max(0, index - maxLength / 2);
  const end = Math.min(text.length, start + maxLength);

  let snippet = text.slice(start, end);

  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";

  return snippet;
}
