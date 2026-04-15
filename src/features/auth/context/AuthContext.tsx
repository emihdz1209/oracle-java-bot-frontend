/// src/features/auth/context/AuthContext.tsx

import { createContext, useState } from "react";
import type { ReactNode } from "react";

import type {
  AuthState,
  AuthUser,
  LoginResponse,
  Role,
} from "@/features/auth/types/auth";

interface AuthContextType {
  auth: AuthState;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";
const EMPTY_AUTH_STATE: AuthState = { user: null, token: null };

const getStoredAuthState = (): AuthState => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !user) {
    return EMPTY_AUTH_STATE;
  }

  try {
    return {
      token,
      user: JSON.parse(user) as AuthUser,
    };
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    return EMPTY_AUTH_STATE;
  }
};

const mapRole = (rolId: number): Role => {
  switch (rolId) {
    case 1:
      return "MANAGER";
    case 2:
      return "DEVELOPER";
    default:
      return "DEVELOPER";
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthState>(() => getStoredAuthState());

  const login = (data: LoginResponse) => {
    const user: AuthUser = {
      userId: data.userId,
      email: data.email,
      role: mapRole(data.rolId),
    };

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    setAuth({
      token: data.token,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    setAuth(EMPTY_AUTH_STATE);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};