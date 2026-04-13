export type Role = "Manager" | "Developer";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  rolId: number;
}

export interface RegisterRequest {
  primerNombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  telegramId: string;
  rolId: number;
  managerEmail?: string;
}

export interface AuthUser {
  userId: string;
  rolId: number;
  email: string;
  role: Role;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
}