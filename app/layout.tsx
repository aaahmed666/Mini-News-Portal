import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SkipLink } from "@/components/ui/skip-link";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | News Portal",
    default: "News Portal - Stay Informed",
  },
  description:
    "Your trusted source for the latest news and insights across technology, business, sports, and more.",
  keywords: [
    "news",
    "technology",
    "business",
    "sports",
    "entertainment",
    "health",
    "science",
  ],
  authors: [{ name: "News Portal Team" }],
  creator: "News Portal",
  publisher: "News Portal",
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
    other: [
      { url: "/icon-192x192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.jpg", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://news-portal.vercel.app",
    siteName: "News Portal",
    title: "News Portal - Stay Informed",
    description: "Your trusted source for the latest news and insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "News Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News Portal - Stay Informed",
    description: "Your trusted source for the latest news and insights.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://news-portal.vercel.app",
    languages: {
      "en-US": "https://news-portal.vercel.app/en",
      "ar-SA": "https://news-portal.vercel.app/ar",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
        <meta
          name="color-scheme"
          content="light dark"
        />
      </head>
      <body>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div
                id="main-content"
                tabIndex={-1}
              >
                {children}
              </div>
              <Analytics />
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
