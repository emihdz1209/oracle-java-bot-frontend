export interface CreateUserRequest {
  primerNombre: string;
  apellido: string;
  telefono: string;
  email: string;
  telegramId: string;
}

export interface CreateUserResponse {
  message: string;
  telegramId: string;
  email: string;
}

export interface User {
  primerNombre: string;
  apellido: string;
  telefono: string;
  email: string;
  telegramId: string;
}