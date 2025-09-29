import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/types";

// Mock dictionary
const mockDict = {
  categories: {
    technology: "Technology",
    business: "Business",
  },
  common: {
    minutes: "minutes",
  },
};

// Mock article data
const mockArticle: Article = {
  id: "1",
  title: "Test Article Title",
  slug: "test-article-title",
  excerpt: "This is a test article excerpt that describes the content.",
  content: "<p>Test content</p>",
  coverImage: "/test-image.jpg",
  category: {
    id: "1",
    name: "Technology",
    slug: "technology",
    color: "tech",
    description: "Tech articles",
  },
  author: {
    id: "1",
    name: "John Doe",
    avatar: "/author.jpg",
    bio: "Test author bio",
  },
  publishedAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
  readTime: 5,
  tags: ["React", "Testing"],
  featured: true,
  views: 1500,
};

describe("ArticleCard", () => {
  it("renders article information correctly", () => {
    render(
      <ArticleCard
        article={mockArticle}
        dict={mockDict}
        locale="en"
        variant="card"
      />
    );

    // Check if title is rendered
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();

    // Check if excerpt is rendered
    expect(
      screen.getByText(/This is a test article excerpt/)
    ).toBeInTheDocument();

    // Check if author name is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check if category is rendered
    expect(screen.getByText("Technology")).toBeInTheDocument();

    // Check if read time is rendered
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("minutes")).toBeInTheDocument();

    // Check if views are rendered
    expect(screen.getByText("1,500")).toBeInTheDocument();
  });

  it("renders featured badge when article is featured", () => {
    render(
      <ArticleCard
        article={mockArticle}
        dict={mockDict}
        locale="en"
        variant="card"
      />
    );

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("does not render featured badge when article is not featured", () => {
    const nonFeaturedArticle = { ...mockArticle, featured: false };

    render(
      <ArticleCard
        article={nonFeaturedArticle}
        dict={mockDict}
        locale="en"
        variant="card"
      />
    );

    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("renders correct link to article", () => {
    render(
      <ArticleCard
        article={mockArticle}
        dict={mockDict}
        locale="en"
        variant="card"
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/article/test-article-title");
  });

  it("renders article image with correct alt text", () => {
    render(
      <ArticleCard
        article={mockArticle}
        dict={mockDict}
        locale="en"
        variant="card"
      />
    );

    const image = screen.getByAltText("Test Article Title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("applies correct variant classes", () => {
    const { container } = render(
      <ArticleCard
        article={mockArticle}
        dict={mockDict}
        locale="en"
        variant="hero"
      />
    );

    // Check if hero variant styling is applied
    const title = screen.getByText("Test Article Title");
    expect(title).toHaveClass("text-2xl", "lg:text-3xl");
  });
});
