import type { Article } from "@/lib/types";

interface StructuredDataProps {
  article?: Article;
  type?: "website" | "article" | "breadcrumb";
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function StructuredData({
  article,
  type = "website",
  breadcrumbs,
}: StructuredDataProps) {
  let structuredData: any = {};

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "NewsHub",
        description:
          "Your trusted source for breaking news and in-depth analysis",
        url: "https://newshub.example.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://newshub.example.com/en/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: "NewsHub",
          logo: {
            "@type": "ImageObject",
            url: "https://newshub.example.com/logo.png",
          },
        },
      };
      break;

    case "article":
      if (article) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          image: [article.coverImage],
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: {
            "@type": "Person",
            name: article.author.name,
            image: article.author.avatar,
            description: article.author.bio,
          },
          publisher: {
            "@type": "Organization",
            name: "NewsHub",
            logo: {
              "@type": "ImageObject",
              url: "https://newshub.example.com/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://newshub.example.com/article/${article.slug}`,
          },
          articleSection: article.category.name,
          keywords: article.tags.join(", "),
          wordCount: Math.floor(article.content.length / 5), // Rough estimate
          timeRequired: `PT${article.readTime}M`,
          inLanguage: "en-US",
        };
      }
      break;

    case "breadcrumb":
      if (breadcrumbs) {
        const breadcrumbItems = breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        }));

        structuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        };
      }
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
