import { describe, it, expect } from "vitest";
import { highlightText, extractSnippet } from "@/lib/search-utils";

describe("search-utils", () => {
  describe("highlightText", () => {
    it("highlights single search term", () => {
      const text = "This is a test article about technology";
      const query = "technology";
      const result = highlightText(text, query);

      expect(result).toBe(
        'This is a test article about <mark class="search-highlight">technology</mark>'
      );
    });

    it("highlights multiple search terms", () => {
      const text = "This is a test article about technology and innovation";
      const query = "technology innovation";
      const result = highlightText(text, query);

      expect(result).toContain(
        '<mark class="search-highlight">technology</mark>'
      );
      expect(result).toContain(
        '<mark class="search-highlight">innovation</mark>'
      );
    });

    it("handles case-insensitive search", () => {
      const text = "This is a TEST article";
      const query = "test";
      const result = highlightText(text, query);

      expect(result).toBe(
        'This is a <mark class="search-highlight">TEST</mark> article'
      );
    });

    it("returns original text when query is empty", () => {
      const text = "This is a test article";
      const query = "";
      const result = highlightText(text, query);

      expect(result).toBe(text);
    });

    it("escapes special regex characters", () => {
      const text = "Price is $100 (USD)";
      const query = "$100";
      const result = highlightText(text, query);

      expect(result).toBe(
        'Price is <mark class="search-highlight">$100</mark> (USD)'
      );
    });
  });

  describe("extractSnippet", () => {
    it("extracts snippet around search term", () => {
      const text =
        "This is a very long article about technology and innovation that contains many words and should be truncated properly";
      const query = "technology";
      const result = extractSnippet(text, query, 50);

      expect(result).toContain("technology");
      expect(result.length).toBeLessThanOrEqual(53); // 50 + "..."
    });

    it("returns truncated text when search term not found", () => {
      const text = "This is a very long article that should be truncated";
      const query = "notfound";
      const result = extractSnippet(text, query, 20);

      expect(result).toBe("This is a very long ...");
    });

    it("returns full text when shorter than max length", () => {
      const text = "Short article";
      const query = "article";
      const result = extractSnippet(text, query, 50);

      expect(result).toBe("Short article");
    });
  });
});
