import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Eye, Calendar } from "lucide-react"
import type { Article } from "@/lib/types"
import type { Locale } from "@/lib/i18n"
import { highlightText } from "@/lib/search-utils"

interface SearchResultCardProps {
  article: Article
  query: string
  dict: any
  locale: Locale
}

export function SearchResultCard({ article, query, dict, locale }: SearchResultCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/${locale}/article/${article.slug}`}>
        <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
          {/* Article Image */}
          <div className="relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            <Image
              src={article.coverImage }
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`category-badge category-${article.category.color}`}>
                {dict.categories[article.category.slug] || article.category.name}
              </Badge>
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3
                className="text-xl lg:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance"
                dangerouslySetInnerHTML={{
                  __html: highlightText(article.title, query),
                }}
              />

              <p
                className="text-muted-foreground line-clamp-3 text-pretty"
                dangerouslySetInnerHTML={{
                  __html: highlightText(article.excerpt, query),
                }}
              />
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar }
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{article.author.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{publishedDate}</span>
              </div>

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

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(tag, query),
                    }}
                  />
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{article.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
