import { createContext } from 'react';

export type User = { id: string; email: string; name?: string };

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (d: { email: string; password: string }) => Promise<void>;
  register: (d: { name?: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
