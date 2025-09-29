"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavigationProps {
  dict: any;
  locale: Locale;
}

export function Navigation({ dict, locale }: NavigationProps) {
  console.log(locale, "locale");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: dict.navigation.home, href: `/${locale}` },
    { name: dict.navigation.search, href: `/${locale}/search` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center space-x-2"
        >
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              NH
            </span>
          </div>
          <span className="font-serif font-bold text-xl text-foreground">
            NewsHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
          >
            <Link href={`/${locale}/search`}>
              <Search className="h-4 w-4 mr-2" />
              {dict.common.search}
            </Link>
          </Button>
          <LanguageSwitcher locale={locale} />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80"
            >
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      NH
                    </span>
                  </div>
                  <span className="font-serif font-bold text-xl text-foreground">
                    NewsHub
                  </span>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        isActive(item.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col space-y-4 pt-4 border-t">
                  <Button
                    asChild
                    variant="outline"
                    className="justify-start bg-transparent"
                  >
                    <Link
                      href={`/${locale}/search`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {dict.common.search}
                    </Link>
                  </Button>
                  <LanguageSwitcher locale={locale} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
