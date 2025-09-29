import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

interface RelatedArticlesProps {
  articles: Article[];
  dict: any;
  locale: Locale;
}

export function RelatedArticles({
  articles,
  dict,
  locale,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-foreground">
          {dict.common.relatedArticles}
        </h2>
        <p className="text-muted-foreground">
          Discover more stories you might find interesting
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            dict={dict}
            locale={locale}
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}
