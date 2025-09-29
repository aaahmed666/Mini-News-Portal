export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  views: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
}

export interface SearchResult {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  query: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
