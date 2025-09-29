import { TrendingUp, Clock, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface SearchSuggestionsProps {
  dict: any;
  locale: Locale;
}

export function SearchSuggestions({ dict, locale }: SearchSuggestionsProps) {
  const trendingTopics = [
    "artificial intelligence",
    "climate change",
    "cryptocurrency",
    "space exploration",
    "renewable energy",
    "quantum computing",
  ];

  const popularCategories = [
    { name: "Technology", icon: "💻", slug: "technology" },
    { name: "Business", icon: "📈", slug: "business" },
    { name: "Sports", icon: "⚽", slug: "sports" },
    { name: "Health", icon: "🏥", slug: "health" },
    { name: "Science", icon: "🔬", slug: "science" },
    { name: "Entertainment", icon: "🎬", slug: "entertainment" },
  ];

  const quickSearches = [
    "breaking news",
    "market analysis",
    "tech innovation",
    "global politics",
    "environmental news",
    "sports updates",
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Discover What's Happening
        </h2>
        <p className="text-muted-foreground">
          Search through thousands of articles or explore trending topics and
          categories
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic) => (
              <Button
                key={topic}
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start h-auto p-3 text-left"
              >
                <Link href={`/${locale}/search?q=${encodeURIComponent(topic)}`}>
                  <div>
                    <div className="font-medium capitalize">{topic}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 50) + 10} articles
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Browse Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularCategories.map((category) => (
              <Button
                key={category.slug}
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start h-auto p-3 text-left"
              >
                <Link href={`/${locale}?category=${category.slug}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">
                        {dict.categories[category.slug] || category.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 100) + 20} articles
                      </div>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-primary" />
              Quick Searches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickSearches.map((search) => (
              <Button
                key={search}
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start h-auto p-3 text-left"
              >
                <Link
                  href={`/${locale}/search?q=${encodeURIComponent(search)}`}
                >
                  <div>
                    <div className="font-medium capitalize">{search}</div>
                    <div className="text-xs text-muted-foreground">
                      Popular search term
                    </div>
                  </div>
                </Link>
              </Button>
            ))}

            <div className="pt-3 border-t">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                <Link href={`/${locale}`}>
                  <Clock className="mr-2 h-4 w-4" />
                  View Latest Articles
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
