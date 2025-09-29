"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === "ar";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);

    // If the first segment is a locale, replace it
    if (segments.length > 0 && (segments[0] === "en" || segments[0] === "ar")) {
      segments[0] = newLocale;
    } else {
      // If no locale in path, prepend the new locale
      segments.unshift(newLocale);
    }

    const newPath = "/" + segments.join("/");
    setIsOpen(false); // Close dropdown after selection
    router.push(newPath);
  };

  return (
    <div
      className="relative w-full md:w-auto"
      ref={dropdownRef}
    >
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full md:w-auto justify-start md:justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 bg-popover border border-border rounded-md shadow-lg z-[9999]",
            "left-0 right-0 md:left-auto md:right-auto md:w-32",
            isRTL ? "md:left-0" : "md:right-0"
          )}
        >
          <div className="py-1">
            <button
              onClick={() => switchLanguage("en")}
              className={cn(
                "w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2",
                isRTL ? "text-right flex-row-reverse" : "text-left",
                locale === "en" ? "bg-accent text-accent-foreground" : ""
              )}
            >
              <span>🇺🇸</span>
              English
            </button>
            <button
              onClick={() => switchLanguage("ar")}
              className={cn(
                "w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2",
                isRTL ? "text-right flex-row-reverse" : "text-left",
                locale === "ar" ? "bg-accent text-accent-foreground" : ""
              )}
            >
              <span>🇸🇦</span>
              العربية
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
