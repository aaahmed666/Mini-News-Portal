"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import type { Article } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  article: Article;
  locale: Locale;
}

export function ShareButtons({ article, locale }: ShareButtonsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [articleUrl, setArticleUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setArticleUrl(
      `${window.location.origin}/${locale}/article/${article.slug}`
    );
  }, [locale, article.slug]);

  if (!isMounted) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-2 bg-transparent"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-2 bg-transparent"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-2 bg-transparent"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-2 bg-transparent"
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-2 bg-transparent"
        >
          <Link2 className="h-4 w-4" />
          Copy Link
        </Button>
      </div>
    );
  }

  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title);
  const encodedExcerpt = encodeURIComponent(article.excerpt);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="gap-2"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="gap-2"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="gap-2"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.email)}
        className="gap-2"
      >
        <Mail className="h-4 w-4" />
        Email
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="gap-2 bg-transparent"
      >
        <Link2 className="h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}
