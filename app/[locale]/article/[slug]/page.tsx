import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  User,
} from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RelatedArticles } from "@/components/related-articles";
import { ShareButtons } from "@/components/share-buttons";
import { ArticleContent } from "@/components/article-content";
import { StructuredData } from "@/components/structured-data";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface ArticlePageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  const dict = await getDictionary(params.locale);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    alternates: {
      canonical: `/${params.locale}/article/${article.slug}`,
      languages: {
        en: `/en/article/${article.slug}`,
        ar: `/ar/article/${article.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  const dict = await getDictionary(params.locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.id, 3);

  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    params.locale === "ar" ? "ar-SA" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const updatedDate = new Date(article.updatedAt).toLocaleDateString(
    params.locale === "ar" ? "ar-SA" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const categorySlug = article.category.slug as keyof typeof dict.categories;

  const breadcrumbItems = [
    {
      name: dict.categories[categorySlug] || article.category.name,
      href: `/${params.locale}?category=${article.category.slug}`,
    },
    {
      name: article.title,
    },
  ];

  const isRTL = params.locale === "ar";

  return (
    <>
      <StructuredData
        article={article}
        type="article"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          {
            name: dict.navigation.home,
            url: `https://newshub.example.com/${params.locale}`,
          },
          {
            name: dict.categories[categorySlug] || article.category.name,
            url: `https://newshub.example.com/${params.locale}?category=${article.category.slug}`,
          },
          {
            name: article.title,
            url: `https://newshub.example.com/${params.locale}/article/${article.slug}`,
          },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Link href={`/${params.locale}`}>
                {isRTL ? (
                  <ArrowRight className="h-4 w-4" />
                ) : (
                  <ArrowLeft className="h-4 w-4" />
                )}
                {dict.common.backToHome}
              </Link>
            </Button>
            <Breadcrumbs
              items={breadcrumbItems}
              locale={params.locale}
              dict={dict}
            />
          </div>
        </nav>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Article Header */}
          <header className="space-y-6 mb-8">
            <div className="space-y-4">
              <Badge
                className={`category-badge category-${article.category.color}`}
              >
                {dict.categories[categorySlug] || article.category.name}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight text-balance">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {article.excerpt}
              </p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {dict.common.publishedOn} {publishedDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {article.readTime} {dict.common.minutes}{" "}
                  {dict.common.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Author Info */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">
                        {article.author.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {article.author.bio}
                    </p>

                    {article.author.social && (
                      <div className="flex items-center gap-4 text-xs">
                        {article.author.social.twitter && (
                          <a
                            href={`https://twitter.com/${article.author.social.twitter.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {article.author.social.twitter}
                          </a>
                        )}
                        {article.author.social.email && (
                          <a
                            href={`mailto:${article.author.social.email}`}
                            className="text-primary hover:underline"
                          >
                            {article.author.social.email}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </header>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-muted">
            <Image
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ArticleContent content={article.content} />
          </div>

          {/* Article Footer */}
          <footer className="space-y-8">
            <Separator />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {dict.article.tags}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                {dict.article.shareArticle}
              </h3>
              <ShareButtons
                article={article}
                locale={params.locale}
              />
            </div>

            {/* Article Info */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">
                      {dict.article.publishDate}:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      {publishedDate}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {dict.article.lastUpdated}:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      {updatedDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />
          </footer>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <RelatedArticles
                articles={relatedArticles}
                dict={dict}
                locale={params.locale}
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
