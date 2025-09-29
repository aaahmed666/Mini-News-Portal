import { Search, TrendingUp, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface SearchEmptyProps {
  query: string;
  dict: any;
  locale: Locale;
}

export function SearchEmpty({ query, dict, locale }: SearchEmptyProps) {
  const suggestions = [
    "artificial intelligence",
    "climate change",
    "technology trends",
    "global economy",
    "sports news",
    "health research",
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Empty State Icon */}
      <div className="space-y-4">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            {dict.search.noResultsTitle}
          </h2>
          <p className="text-muted-foreground">
            {dict.search.noResultsDescription.replace("{query}", `"${query}"`)}
          </p>
        </div>
      </div>

      {/* Search Suggestions */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {dict.search.searchSuggestions}
          </h3>

          <p className="text-sm text-muted-foreground">
            {dict.search.trySearching}
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                asChild
                variant="outline"
                size="sm"
                className="rounded-full bg-transparent"
              >
                <Link
                  href={`/${locale}/search?q=${encodeURIComponent(suggestion)}`}
                >
                  {suggestion}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center space-y-2">
            <Clock className="h-8 w-8 mx-auto text-primary" />
            <h4 className="font-medium">Latest News</h4>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href={`/${locale}`}>Browse Recent</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center space-y-2">
            <TrendingUp className="h-8 w-8 mx-auto text-primary" />
            <h4 className="font-medium">Popular Stories</h4>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href={`/${locale}?featured=true`}>View Trending</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center space-y-2">
            <Globe className="h-8 w-8 mx-auto text-primary" />
            <h4 className="font-medium">All Categories</h4>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href={`/${locale}#categories`}>Explore Topics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
