// src/features/equipos/types/equipo.ts

export interface Equipo {
  teamId: string;
  nombre: string;
  descripcion: string;
  ownerId: string;

  // 🔹 NUEVOS CAMPOS DEL BACKEND
  ownerNombre: string;
  totalMembers: number;
}

export interface CreateEquipoRequest {
  nombre: string;
  descripcion: string;
  ownerId: string;
}