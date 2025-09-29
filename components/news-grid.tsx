import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import type { Article, PaginationInfo } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

interface NewsGridProps {
  articles: Article[];
  pagination: PaginationInfo;
  dict: any;
  locale: Locale;
  currentCategory: string;
}

export function NewsGrid({
  articles,
  pagination,
  dict,
  locale,
  currentCategory,
}: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            {dict.common.noResults}
          </h3>
          <p className="text-muted-foreground">
            Try selecting a different category or check back later for new
            articles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-12"
      id="latest-news"
    >
      {/* Featured Articles Section */}
      {pagination.currentPage === 1 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-foreground">
            {dict.home.featuredStories}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {articles.slice(0, 2).map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                dict={dict}
                locale={locale}
                variant={index === 0 ? "hero" : "featured"}
                priority={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Latest Articles
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
            -
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} articles
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles
            .slice(pagination.currentPage === 1 ? 2 : 0)
            .map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                dict={dict}
                locale={locale}
                variant="card"
              />
            ))}
        </div>
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          dict={dict}
          locale={locale}
          currentCategory={currentCategory}
        />
      )}
    </div>
  );
}
