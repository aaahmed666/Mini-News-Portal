"use client";

import { useEffect, useRef } from "react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;

    const element = contentRef.current;

    // Style headings
    const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      heading.classList.add(
        "font-serif",
        "font-bold",
        "text-foreground",
        "mt-8",
        "mb-4"
      );
      if (heading.tagName === "H2") {
        heading.classList.add("text-2xl", "border-b", "border-border", "pb-2");
      }
      if (heading.tagName === "H3") {
        heading.classList.add("text-xl");
      }
    });

    // Style paragraphs
    const paragraphs = element.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.classList.add(
        "text-foreground",
        "leading-relaxed",
        "mb-6",
        "text-pretty"
      );
    });

    // Style lists
    const lists = element.querySelectorAll("ul, ol");
    lists.forEach((list) => {
      list.classList.add("text-foreground", "leading-relaxed", "mb-6", "pl-6");
      if (list.tagName === "UL") {
        list.classList.add("list-disc");
      } else {
        list.classList.add("list-decimal");
      }
    });

    // Style list items
    const listItems = element.querySelectorAll("li");
    listItems.forEach((li) => {
      li.classList.add("mb-2");
    });

    // Style links
    const links = element.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.add("text-primary", "hover:underline", "font-medium");
    });

    // Style blockquotes
    const blockquotes = element.querySelectorAll("blockquote");
    blockquotes.forEach((quote) => {
      quote.classList.add(
        "border-l-4",
        "border-primary",
        "pl-6",
        "py-4",
        "my-6",
        "bg-muted/50",
        "rounded-r-lg",
        "italic",
        "text-muted-foreground"
      );
    });

    // Style code blocks
    const codeBlocks = element.querySelectorAll("pre");
    codeBlocks.forEach((pre) => {
      pre.classList.add(
        "bg-muted",
        "rounded-lg",
        "p-4",
        "overflow-x-auto",
        "my-6",
        "text-sm"
      );
    });

    // Style inline code
    const inlineCode = element.querySelectorAll("code");
    inlineCode.forEach((code) => {
      if (!code.parentElement?.tagName.includes("PRE")) {
        code.classList.add(
          "bg-muted",
          "px-2",
          "py-1",
          "rounded",
          "text-sm",
          "font-mono"
        );
      }
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
