import type { Article, Author, Category } from "./types";

// Mock data for development
export const authors: Author[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/professional-woman-journalist.webp",
    bio: "Senior Technology Reporter with 10+ years of experience covering emerging tech trends.",
    social: {
      twitter: "@sarahjtech",
      linkedin: "sarah-johnson-tech",
      email: "sarah@newshub.com",
    },
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    avatar: "/professional-journalist.webp",
    bio: "Business correspondent specializing in Middle East markets and global economics.",
    social: {
      twitter: "@ahmedbiz",
      linkedin: "ahmed-hassan-business",
    },
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    avatar: "/professional-woman-sports-reporter.webp",
    bio: "Sports journalist covering international football and Olympic events.",
    social: {
      twitter: "@mariasports",
      email: "maria@newshub.com",
    },
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    color: "tech",
    description: "Latest in tech innovation",
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    color: "business",
    description: "Market trends and analysis",
  },
  {
    id: "3",
    name: "Sports",
    slug: "sports",
    color: "sports",
    description: "Sports news and updates",
  },
  {
    id: "4",
    name: "Entertainment",
    slug: "entertainment",
    color: "entertainment",
    description: "Entertainment industry news",
  },
  {
    id: "5",
    name: "Health",
    slug: "health",
    color: "health",
    description: "Health and wellness updates",
  },
  {
    id: "6",
    name: "Science",
    slug: "science",
    color: "science",
    description: "Scientific discoveries and research",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title:
      "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
    slug: "ai-breakthrough-machine-learning-2024",
    excerpt:
      "Scientists at leading tech companies have developed a new AI architecture that promises to revolutionize how machines learn and adapt.",
    content: `<p>In a groundbreaking development that could reshape the future of artificial intelligence, researchers have unveiled a revolutionary new approach to machine learning that promises unprecedented capabilities.</p>

<p>The breakthrough, developed through collaboration between leading tech companies and academic institutions, introduces a novel architecture that allows AI systems to learn and adapt with remarkable efficiency.</p>

<h2>Key Innovations</h2>
<p>The new system incorporates several key innovations:</p>
<ul>
<li>Advanced neural network architectures</li>
<li>Improved training methodologies</li>
<li>Enhanced data processing capabilities</li>
<li>Better energy efficiency</li>
</ul>

<p>This development represents a significant leap forward in AI capabilities, with potential applications across numerous industries including healthcare, finance, and autonomous systems.</p>`,
    coverImage: "/futuristic-ai-technology-laboratory.webp",
    category: categories[0],
    author: authors[0],
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    readTime: 5,
    tags: ["AI", "Machine Learning", "Technology", "Innovation"],
    featured: true,
    views: 15420,
  },
  {
    id: "2",
    title: "Global Markets Surge as Economic Indicators Show Strong Recovery",
    slug: "global-markets-economic-recovery-2024",
    excerpt:
      "Stock markets worldwide are experiencing significant gains as key economic indicators point to a robust recovery across major economies.",
    content: `<p>Global financial markets are celebrating as a series of positive economic indicators suggest a strong and sustained recovery is underway across major world economies.</p>

<p>The surge comes after months of uncertainty, with investors now showing renewed confidence in the global economic outlook.</p>

<h2>Market Performance</h2>
<p>Key market movements include:</p>
<ul>
<li>S&P 500 up 3.2% this week</li>
<li>European markets showing strong gains</li>
<li>Asian markets following positive trends</li>
<li>Commodity prices stabilizing</li>
</ul>

<p>Analysts attribute the positive momentum to improved employment figures, stable inflation rates, and increased consumer confidence across multiple regions.</p>`,
    coverImage: "/stock-market-trading-floor-busy.jpg",
    category: categories[1],
    author: authors[1],
    publishedAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    readTime: 4,
    tags: ["Markets", "Economy", "Finance", "Recovery"],
    featured: true,
    views: 12350,
  },
  // Add more articles...
  {
    id: "3",
    title:
      "Championship Final Set as Top Teams Advance in Thrilling Semifinals",
    slug: "championship-final-semifinals-2024",
    excerpt:
      "Two powerhouse teams have secured their spots in the championship final after delivering spectacular performances in yesterday's semifinal matches.",
    content: `<p>The stage is set for an epic championship final as two of the sport's most formidable teams have advanced after delivering breathtaking performances in the semifinal rounds.</p>`,
    coverImage: "/sports-stadium-championship-celebration.webp",
    category: categories[2],
    author: authors[2],
    publishedAt: "2024-01-13T20:15:00Z",
    updatedAt: "2024-01-13T20:15:00Z",
    readTime: 3,
    tags: ["Sports", "Championship", "Finals"],
    featured: false,
    views: 8920,
  },
  // Continue with more articles to reach 12+ for pagination testing
];

// Generate additional articles for testing
for (let i = 4; i <= 24; i++) {
  const categoryIndex = (i - 1) % categories.length;
  const authorIndex = (i - 1) % authors.length;

  articles.push({
    id: i.toString(),
    title: `Sample Article ${i}: Important News Story That Matters`,
    slug: `sample-article-${i}-news-story`,
    excerpt: `This is a sample excerpt for article ${i}. It provides a brief overview of the important news story that readers will find engaging and informative.`,
    content: `<p>This is the full content for article ${i}. It contains detailed information about the news story.</p>`,
    coverImage: `/placeholder.svg?height=400&width=600&query=news article ${i} professional`,
    category: categories[categoryIndex],
    author: authors[authorIndex],
    publishedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    readTime: Math.floor(Math.random() * 8) + 2,
    tags: [`Tag${i}`, "News", categories[categoryIndex].name],
    featured: i <= 6,
    views: Math.floor(Math.random() * 10000) + 1000,
  });
}

// API functions
export async function getArticles(
  page = 1,
  limit = 12,
  category?: string,
  featured?: boolean
): Promise<{ articles: Article[]; total: number; pagination: any }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filteredArticles = [...articles];

  if (category && category !== "all") {
    filteredArticles = filteredArticles.filter(
      (article) => article.category.slug === category
    );
  }

  if (featured !== undefined) {
    filteredArticles = filteredArticles.filter(
      (article) => article.featured === featured
    );
  }

  // Sort by published date (newest first)
  filteredArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    total,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return articles.find((article) => article.slug === slug) || null;
}

export async function getRelatedArticles(
  articleId: string,
  limit = 3
): Promise<Article[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const currentArticle = articles.find((a) => a.id === articleId);
  if (!currentArticle) return [];

  // Get articles from same category, excluding current article
  const related = articles
    .filter(
      (a) => a.id !== articleId && a.category.id === currentArticle.category.id
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);

  return related;
}

export async function searchArticles(
  query: string,
  page = 1,
  limit = 12
): Promise<{ articles: Article[]; total: number; pagination: any }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const searchTerm = query.toLowerCase();
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    total,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
