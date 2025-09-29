"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/lib/i18n";

interface SearchFormProps {
  dict: any;
  locale: Locale;
  initialQuery?: string;
}

export function SearchForm({
  dict,
  locale,
  initialQuery = "",
}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query.trim());
    params.delete("page"); // Reset to first page on new search

    const url = `/${locale}/search?${params.toString()}`;
    router.push(url);

    // Simulate search delay for UX
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleClear = () => {
    setQuery("");
    router.push(`/${locale}/search`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={dict.common.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-20 h-14 text-lg bg-background border-2 focus:border-primary rounded-xl"
          disabled={isLoading}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 rounded-lg"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            dict.common.search
          )}
        </Button>
      </div>
    </form>
  );
}
