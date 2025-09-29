import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { searchArticles } from "@/lib/data";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { SearchSuggestions } from "@/components/search-suggestions";
import { LoadingGrid } from "@/components/loading-grid";

interface SearchPageProps {
  params: { locale: Locale };
  searchParams: {
    q?: string;
    page?: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict.search.title,
    description:
      "Search through our extensive collection of news articles and stories.",
    alternates: {
      canonical: `/${params.locale}/search`,
      languages: {
        en: "/en/search",
        ar: "/ar/search",
      },
    },
    openGraph: {
      title: dict.search.title,
      description:
        "Search through our extensive collection of news articles and stories.",
      url: `/${params.locale}/search`,
      type: "website",
    },
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const dict = await getDictionary(params.locale);
  const query = searchParams.q || "";
  const page = Number.parseInt(searchParams.page || "1", 10);

  let searchData = null;
  if (query.trim()) {
    searchData = await searchArticles(query, page, 12);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground text-balance">
            {dict.search.title}
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover articles, stories, and insights from our extensive news
            archive
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchForm
            dict={dict}
            locale={params.locale}
            initialQuery={query}
          />
        </div>

        {/* Search Results or Suggestions */}
        <div className="max-w-6xl mx-auto">
          {query.trim() ? (
            <Suspense fallback={<LoadingGrid />}>
              <SearchResults
                searchData={searchData}
                query={query}
                dict={dict}
                locale={params.locale}
                currentPage={page}
              />
            </Suspense>
          ) : (
            <SearchSuggestions
              dict={dict}
              locale={params.locale}
            />
          )}
        </div>
      </div>
    </div>
  );
}
