import type { MetadataRoute } from "next/types";
import { articles, categories } from "@/lib/data";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://newshub.example.com";

  const routes: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });

    routes.push({
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Add category pages
    categories.forEach((category) => {
      routes.push({
        url: `${baseUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });

    // Add article pages
    articles.forEach((article) => {
      routes.push({
        url: `${baseUrl}/${locale}/article/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  return routes;
}
