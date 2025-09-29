import { memo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye } from "lucide-react"
import type { Article } from "@/lib/types"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { LazyImage } from "@/components/ui/lazy-image"

interface OptimizedArticleCardProps {
  article: Article
  dict: any
  locale: Locale
  variant?: "card" | "featured" | "hero"
  priority?: boolean
}

export const OptimizedArticleCard = memo(function OptimizedArticleCard({
  article,
  dict,
  locale,
  variant = "card",
  priority = false,
}: OptimizedArticleCardProps) {
  const isHero = variant === "hero"
  const isFeatured = variant === "featured"

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300",
        isHero && "lg:row-span-2",
        isFeatured && "h-full",
      )}
    >
      <Link
        href={`/${locale}/article/${article.slug}`}
        className="block focus-ring rounded-lg"
        aria-label={`Read article: ${article.title}`}
      >
        <div className={cn("relative overflow-hidden", isHero ? "aspect-[4/3]" : "aspect-video")}>
          <LazyImage
            src={article.coverImage }
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes={
              isHero
                ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={cn("category-badge", `category-${article.category.color}`)}>
              {dict.categories[article.category.slug] || article.category.name}
            </Badge>
          </div>

          {/* Article Stats */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/80 text-sm">
            <div className="flex items-center gap-1" aria-label={`Reading time: ${article.readTime} minutes`}>
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>
                {article.readTime} {dict.common.minutes}
              </span>
            </div>
            <div className="flex items-center gap-1" aria-label={`Views: ${article.views.toLocaleString()}`}>
              <Eye className="h-3 w-3" aria-hidden="true" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <CardContent className={cn("p-6", isHero && "p-8")}>
          <div className="space-y-3">
            <h3
              className={cn(
                "font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance",
                isHero ? "text-2xl lg:text-3xl" : isFeatured ? "text-xl" : "text-lg",
              )}
            >
              {article.title}
            </h3>

            <p className={cn("text-muted-foreground line-clamp-3 text-pretty", isHero ? "text-base" : "text-sm")}>
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <LazyImage
                    src={article.author.avatar }
                    alt={`${article.author.name}'s avatar`}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{article.author.name}</p>
                  <time className="text-muted-foreground" dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {article.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
})
