"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationInfo } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pagination: PaginationInfo;
  dict: any;
  locale: Locale;
  currentCategory: string;
}

export function Pagination({
  pagination,
  dict,
  locale,
  currentCategory,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRTL = locale === "ar";

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    if (currentCategory !== "all") {
      params.set("category", currentCategory);
    }

    const queryString = params.toString();
    return `/${locale}${queryString ? `?${queryString}` : ""}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page), { scroll: false });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (pagination.totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrev}
        className="flex items-center gap-2"
      >
        {isRTL ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        {dict.home.pagination.previous}
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-muted-foreground">...</span>
            ) : (
              <Button
                variant={page === pagination.currentPage ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(page as number)}
                className={cn(
                  "min-w-[40px]",
                  page === pagination.currentPage &&
                    "bg-primary text-primary-foreground"
                )}
                aria-current={
                  page === pagination.currentPage ? "page" : undefined
                }
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNext}
        className="flex items-center gap-2"
      >
        {dict.home.pagination.next}
        {isRTL ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
}
