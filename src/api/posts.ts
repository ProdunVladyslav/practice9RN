import { Post } from '../types/post';
import client from './client';

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await client.get<Post[]>('/posts');
  return data;
};
