// src/features/equipos/services/equipoMemberService.ts

import { apiClient } from "@/shared/api/apiClient";

export interface TeamMember {
  userId: string;
  teamId: string;
}

export const getTeamMembers = async (teamId: string): Promise<TeamMember[]> => {
  const response = await apiClient.get(`/api/teams/${teamId}/members`);
  return response.data;
};

export const addTeamMember = async (teamId: string, userId: string) => {
  await apiClient.post(`/api/teams/${teamId}/members/${userId}`);
};

export const removeTeamMember = async (teamId: string, userId: string) => {
  await apiClient.delete(`/api/teams/${teamId}/members/${userId}`);
};