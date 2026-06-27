import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article, NewsCategory } from '../types/news';
import { getTopHeadlines } from '../api/news';

const FAVORITES_KEY = 'news_favorites';

interface NewsContextType {
  articles: Article[];
  favorites: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
  category: NewsCategory;
  query: string;
  setCategory: (c: NewsCategory) => void;
  setQuery: (q: string) => void;
  setSelectedArticle: (a: Article | null) => void;
  fetchNews: () => Promise<void>;
  toggleFavorite: (a: Article) => void;
  isFavorite: (a: Article) => boolean;
}

const NewsCtx = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory>('general');
  const [query, setQuery] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then(raw => {
      if (raw) setFavorites(JSON.parse(raw));
    });
  }, []);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTopHeadlines(category, query || undefined);
      setArticles(res.articles.filter(a => a.title !== '[Removed]'));
    } catch {
      setError('Failed to load news.');
    } finally {
      setLoading(false);
    }
  }, [category, query]);

  const toggleFavorite = useCallback(async (article: Article) => {
    setFavorites(prev => {
      const exists = prev.some(a => a.url === article.url);
      const next = exists ? prev.filter(a => a.url !== article.url) : [...prev, article];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((article: Article) =>
    favorites.some(a => a.url === article.url), [favorites]);

  return (
    <NewsCtx.Provider value={{
      articles, favorites, selectedArticle, loading, error,
      category, query, setCategory, setQuery, setSelectedArticle,
      fetchNews, toggleFavorite, isFavorite,
    }}>
      {children}
    </NewsCtx.Provider>
  );
};

export const useNewsContext = (): NewsContextType => {
  const ctx = useContext(NewsCtx);
  if (!ctx) throw new Error('useNewsContext must be used inside <NewsProvider>');
  return ctx;
};
