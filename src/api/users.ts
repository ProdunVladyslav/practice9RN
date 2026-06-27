import { User } from '../types/user';
import client from './client';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await client.get<User[]>('/users');
  return data;
};

export const getUserById = async (id: number):  Promise<User> => {
  const { data } = await client.get<User>(`/users/${id}`);
  return data;
};


