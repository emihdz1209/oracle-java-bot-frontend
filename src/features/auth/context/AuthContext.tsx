import { createContext, useState } from "react";
import type { ReactNode } from "react";

import type { AuthState, AuthUser } from "@/features/auth/types/auth";
import { TOKEN_STORAGE_KEY } from "@/features/auth/constants/authStorage";

interface AuthContextType {
  auth: AuthState;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem(TOKEN_STORAGE_KEY),
  });

  const login = (user: AuthUser, token: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};