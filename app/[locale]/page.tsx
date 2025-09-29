import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getArticles, categories } from "@/lib/data";
import { NewsGrid } from "@/components/news-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Hero } from "@/components/hero";
import { LoadingGrid } from "@/components/loading-grid";

interface HomePageProps {
  params: { locale: Locale };
  searchParams: {
    page?: string;
    category?: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict.home.title,
    description: dict.home.subtitle,
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.subtitle,
      url: `/${params.locale}`,
      type: "website",
    },
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage({
  params,
  searchParams,
}: HomePageProps) {
  const dict = await getDictionary(params.locale);
  const page = Number.parseInt(searchParams.page || "1", 10);
  const category = searchParams.category || "all";

  const { articles, pagination } = await getArticles(
    page,
    12,
    category === "all" ? undefined : category
  );

  return (
    <div className="min-h-screen bg-background">
      <Hero
        dict={dict}
        locale={params.locale}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            {dict.home.title}
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            {dict.home.subtitle}
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            currentCategory={category}
            dict={dict}
            locale={params.locale}
          />
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <NewsGrid
            articles={articles}
            pagination={pagination}
            dict={dict}
            locale={params.locale}
            currentCategory={category}
          />
        </Suspense>
      </main>
    </div>
  );
}
