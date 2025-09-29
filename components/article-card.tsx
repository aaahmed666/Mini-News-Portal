import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye } from "lucide-react";
import type { Article } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  dict: any;
  locale: Locale;
  variant?: "card" | "featured" | "hero";
  priority?: boolean;
}

export function ArticleCard({
  article,
  dict,
  locale,
  variant = "card",
  priority = false,
}: ArticleCardProps) {
  const isHero = variant === "hero";
  const isFeatured = variant === "featured";

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300",
        (isHero || isFeatured) && "h-full"
      )}
    >
      <Link
        href={`/${locale}/article/${article.slug}`}
        className="flex flex-col h-full"
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isHero || isFeatured ? "h-80" : "aspect-video"
          )}
        >
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={cn(
                "category-badge",
                `category-${article.category.color}`
              )}
            >
              {dict.categories[article.category.slug] || article.category.name}
            </Badge>
          </div>

          {/* Article Stats */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {article.readTime} {dict.common.minutes}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <CardContent
          className={cn("p-6 flex-1 flex flex-col", isHero && "p-8")}
        >
          <div className="space-y-3 flex-1 flex flex-col">
            <h3
              className={cn(
                "font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance",
                isHero
                  ? "text-2xl lg:text-3xl"
                  : isFeatured
                  ? "text-xl"
                  : "text-lg"
              )}
            >
              {article.title}
            </h3>

            <p
              className={cn(
                "text-muted-foreground line-clamp-3 text-pretty",
                isHero ? "text-base" : "text-sm"
              )}
            >
              {article.excerpt}
            </p>

            {/* Author Section */}
            <div className="flex items-center justify-between pt-2 mt-auto">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    {article.author.name}
                  </p>
                  <p className="text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString(
                      locale === "ar" ? "ar-SA" : "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              {article.featured && (
                <Badge
                  variant="secondary"
                  className="text-xs"
                >
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
