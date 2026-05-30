import { apiClient } from "@/shared/api/apiClient";


import type {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  User,
} from "@/features/users/types/user";

const toRawId = (value: string) => value.replace(/-/g, "").toUpperCase();

const toHyphenatedId = (value: string) => {
  if (!value) return value;
  if (value.includes("-")) return value.toLowerCase();
  const clean = value.replace(/[^0-9a-fA-F]/g, "");
  if (clean.length !== 32) return value;
  return (
    clean.slice(0, 8) +
    "-" +
    clean.slice(8, 12) +
    "-" +
    clean.slice(12, 16) +
    "-" +
    clean.slice(16, 20) +
    "-" +
    clean.slice(20)
  ).toLowerCase();
};

const getUserIdVariants = (userId: string) => {
  const variants = new Set([userId, toRawId(userId), toHyphenatedId(userId)]);
  return Array.from(variants).filter(Boolean);
};

export const createUser = async (
  user: CreateUserRequest
): Promise<CreateUserResponse> => {
  const response = await apiClient.post<CreateUserResponse>(
    "/api/users",
    user
  );

  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/api/users");
  return response.data;
};

export const updateUser = async (
  userId: string,
  user: UpdateUserRequest
): Promise<Partial<User> | undefined> => {
  const variants = getUserIdVariants(userId);
  let lastError: unknown;

  for (const variant of variants) {
    try {
      const response = await apiClient.put<User>(`/api/users/${variant}`, user);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

export const deactivateUser = async (user: User): Promise<Partial<User> | undefined> =>
  updateUser(user.userId, {
    primerNombre: user.primerNombre,
    apellido: user.apellido,
    telefono: user.telefono ?? "",
    email: user.email,
    telegramId: user.telegramId,
    rolId: user.rolId,
    estadoId: 0,
    managerId: user.managerId,
    telegramChatId: user.telegramChatId ?? null,
  });
