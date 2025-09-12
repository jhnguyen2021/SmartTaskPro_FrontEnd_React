//this is the provider component that wraps your app (<AuthProvider><App/></AuthProvider>).
//It holds state for user and token.
//TOKEN_KEY / USER_KEY → names for storing data in localStorage.

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type User } from './auth-context';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u) as User);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const login = useCallback(async ({ email }: { email: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 200));
    const fakeToken = 'demo.token.123';
    const fakeUser: User = { id: '1', email, name: 'Demo User' };
    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);
  }, []);

  const register = useCallback(
    async ({ email, password }: { name?: string; email: string; password: string }) => {
      await login({ email, password });
    },
    [login]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
