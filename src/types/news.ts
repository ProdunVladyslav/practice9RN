export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const NEWS_CATEGORIES = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'] as const;
export type NewsCategory = typeof NEWS_CATEGORIES[number];
