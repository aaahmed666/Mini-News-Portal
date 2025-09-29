import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
  dict: any;
}

export function Breadcrumbs({ items, locale, dict }: BreadcrumbsProps) {
  const allItems = [
    { name: dict.navigation.home, href: `/${locale}` },
    ...items,
  ];
  const isRTL = locale === "ar";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        isRTL ? "gap-2" : "space-x-2"
      )}
    >
      {allItems.map((item, index) => (
        <div
          key={index}
          className={cn("flex items-center", isRTL ? "gap-2" : "space-x-2")}
        >
          {index > 0 && (
            <ChevronRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {index === 0 && (
                <Home
                  className={cn("h-4 w-4 inline", isRTL ? "ml-1" : "mr-1")}
                />
              )}
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
