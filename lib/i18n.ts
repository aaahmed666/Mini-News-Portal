export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: Locale
): Promise<{
  common: {
    loading: string;
    error: string;
    retry: string;
    readMore: string;
    backToHome: string;
    search: string;
    searchPlaceholder: string;
    noResults: string;
    categories: string;
    allCategories: string;
    relatedArticles: string;
    publishedOn: string;
    by: string;
    minutes: string;
    readTime: string;
  };
  navigation: {
    home: string;
    search: string;
    about: string;
    contact: string;
  };
  categories: {
    technology: string;
    business: string;
    sports: string;
    entertainment: string;
    health: string;
    science: string;
  };
  home: {
    title: string;
    subtitle: string;
    featuredStories: string;
    pagination: {
      previous: string;
      next: string;
      page: string;
    };
  };
  article: {
    shareArticle: string;
    tags: string;
    author: string;
    publishDate: string;
    lastUpdated: string;
  };
  search: {
    title: string;
    resultsFor: string;
    noResultsTitle: string;
    noResultsDescription: string;
    searchSuggestions: string;
    trySearching: string;
  };
  errors: {
    404: {
      title: string;
      description: string;
      backHome: string;
    };
    500: {
      title: string;
      description: string;
      retry: string;
    };
  };
}> => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);
    // Fallback to English if the requested locale fails
    if (locale !== "en") {
      return await dictionaries.en();
    }
    return {
      common: {
        loading: "Loading...",
        error: "Error",
        retry: "Try again",
        readMore: "Read more",
        backToHome: "Back to home",
        search: "Search",
        searchPlaceholder: "Search...",
        noResults: "No results",
        categories: "Categories",
        allCategories: "All Categories",
        relatedArticles: "Related Articles",
        publishedOn: "Published on",
        by: "By",
        minutes: "minutes",
        readTime: "read",
      },
      navigation: {
        home: "Home",
        search: "Search",
        about: "About",
        contact: "Contact",
      },
      categories: {
        technology: "Technology",
        business: "Business",
        sports: "Sports",
        entertainment: "Entertainment",
        health: "Health",
        science: "Science",
      },
      home: {
        title: "News",
        subtitle: "Latest news and updates",
        featuredStories: "Featured Stories",
        pagination: {
          previous: "Previous",
          next: "Next",
          page: "Page",
        },
      },
      article: {
        shareArticle: "Share Article",
        tags: "Tags",
        author: "Author",
        publishDate: "Publish Date",
        lastUpdated: "Last Updated",
      },
      search: {
        title: "Search Results",
        resultsFor: "Results for",
        noResultsTitle: "No results found",
        noResultsDescription: "Try adjusting your search",
        searchSuggestions: "Suggestions",
        trySearching: "Try searching for:",
      },
      errors: {
        404: {
          title: "Page Not Found",
          description: "The page doesn't exist.",
          backHome: "Go home",
        },
        500: {
          title: "Server Error",
          description: "Something went wrong.",
          retry: "Try again",
        },
      },
    };
  }
};

export const getDirection = (locale: Locale): "ltr" | "rtl" => {
  return locale === "ar" ? "rtl" : "ltr";
};
