"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
  dict: any;
  locale: Locale;
}

export function CategoryFilter({
  categories,
  currentCategory,
  dict,
  locale,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categorySlug === "all") {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }

    // Reset to first page when changing category
    params.delete("page");

    const queryString = params.toString();
    const url = `/${locale}${queryString ? `?${queryString}` : ""}`;

    router.push(url, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        {dict.common.categories}
      </h2>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={currentCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange("all")}
          className="rounded-full"
        >
          {dict.common.allCategories}
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={currentCategory === category.slug ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category.slug)}
            className="rounded-full"
          >
            {dict.categories[category.slug] || category.name}
            <Badge
              variant="secondary"
              className="ml-2 text-xs"
            >
              {/* This would show article count in a real app */}
              {Math.floor(Math.random() * 50) + 10}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
