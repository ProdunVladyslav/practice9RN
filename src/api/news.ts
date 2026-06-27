import axios from 'axios';
import { NewsResponse } from '../types/news';

const newsClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  timeout: 10_000,
});

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

export const getTopHeadlines = async (category: string, query?: string): Promise<NewsResponse> => {
  const { data } = await newsClient.get('/top-headlines', {
    params: { category, q: query || undefined, apiKey: API_KEY, language: 'en', pageSize: 40 },
  });
  return data;
};
