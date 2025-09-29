import { SearchResultCard } from "@/components/search-result-card";
import { SearchEmpty } from "@/components/search-empty";
import type { Article, PaginationInfo } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

interface SearchResultsProps {
  searchData: {
    articles: Article[];
    total: number;
    pagination: PaginationInfo;
  } | null;
  query: string;
  dict: any;
  locale: Locale;
  currentPage: number;
}

export function SearchResults({
  searchData,
  query,
  dict,
  locale,
  currentPage,
}: SearchResultsProps) {
  if (!searchData || searchData.articles.length === 0) {
    return (
      <SearchEmpty
        query={query}
        dict={dict}
        locale={locale}
      />
    );
  }

  const { articles, pagination } = searchData;

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          {dict.search.resultsFor} "{query}"
        </h2>
        <p className="text-muted-foreground">
          Found {pagination.totalItems}{" "}
          {pagination.totalItems === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {articles.map((article) => (
          <SearchResultCard
            key={article.id}
            article={article}
            query={query}
            dict={dict}
            locale={locale}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <SearchPagination
            pagination={pagination}
            query={query}
            dict={dict}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}

interface SearchPaginationProps {
  pagination: PaginationInfo;
  query: string;
  dict: any;
  locale: Locale;
}

function SearchPagination({
  pagination,
  query,
  dict,
  locale,
}: SearchPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", page.toString());
    return `/${locale}/search?${params.toString()}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {pagination.hasPrev && (
        <a
          href={createPageUrl(pagination.currentPage - 1)}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
        >
          {dict.home.pagination.previous}
        </a>
      )}

      <span className="px-4 py-2 text-sm text-muted-foreground">
        {dict.home.pagination.page} {pagination.currentPage} of{" "}
        {pagination.totalPages}
      </span>

      {pagination.hasNext && (
        <a
          href={createPageUrl(pagination.currentPage + 1)}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
        >
          {dict.home.pagination.next}
        </a>
      )}
    </div>
  );
}
