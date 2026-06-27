import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '../types/user';
import { getUsers } from '../api/users';
import axios, { AxiosError } from 'axios';

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, selectedUser, loading, error, fetchUsers, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used inside UserProvider');
  return ctx;
};


