import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface HeroProps {
  dict: any;
  locale: Locale;
}

export function Hero({ dict, locale }: HeroProps) {
  const isRTL = locale === "ar";

  return (
    <section className="relative bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance">
                {dict.home.maintitle}{" "}
                <span className="text-primary">NewsHub</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {dict.home.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8"
              >
                <Link href={`/${locale}#latest-news`}>
                  {dict.common.readMore}
                  {isRTL ? (
                    <ArrowLeft className="ml-2 h-5 w-5" />
                  ) : (
                    <ArrowRight className="ml-2 h-5 w-5" />
                  )}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                <Link href={`/${locale}/search`}>{dict.common.search}</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/modern-newsroom.webp"
                alt="NewsHub newsroom"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
