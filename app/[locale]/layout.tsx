import type React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { getDictionary, getDirection, type Locale } from "@/lib/i18n";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: {
      default: "NewsHub - Your Trusted News Source",
      template: "%s | NewsHub",
    },
    description: dict.home.subtitle,
    keywords: [
      "news",
      "breaking news",
      "world news",
      "politics",
      "business",
      "technology",
      "sports",
    ],
    authors: [{ name: "NewsHub Team" }],
    creator: "NewsHub",
    publisher: "NewsHub",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.jpg", type: "image/svg+xml" },
        { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" },
      ],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://newshub.example.com"),
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        "en-US": "/en",
        "ar-SA": "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: params.locale === "ar" ? "ar_SA" : "en_US",
      url: `https://newshub.example.com/${params.locale}`,
      title: "NewsHub - Your Trusted News Source",
      description: dict.home.subtitle,
      siteName: "NewsHub",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "NewsHub - Your Trusted News Source",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NewsHub - Your Trusted News Source",
      description: dict.home.subtitle,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const direction = getDirection(params.locale);

  return (
    <div
      dir={direction}
      lang={params.locale}
    >
      <StructuredData type="website" />
      <Navigation
        dict={dict}
        locale={params.locale}
      />
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
