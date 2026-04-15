// src/features/equipos/hooks/useEquipoMembers.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeamMembers,
  addTeamMember,
  removeTeamMember,
} from "@/features/equipos/services/equipoMemberService";

export const useEquipoMembers = (teamId: string) => {
  return useQuery({
    queryKey: ["teamMembers", teamId],
    queryFn: () => getTeamMembers(teamId),
    enabled: !!teamId,
  });
};

export const useAddMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => addTeamMember(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers", teamId] });
    },
  });
};

export const useRemoveMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeTeamMember(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers", teamId] });
    },
  });
};