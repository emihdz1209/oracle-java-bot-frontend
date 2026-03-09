export type Role = "Manager" | "Developer";

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  role: Role;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
}