// src/features/equipos/hooks/useEquipoMembers.ts

import { useQuery, useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
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

export const useMultiEquipoMembers = (teamIds: string[]) => {
  const queries = useQueries({
    queries: teamIds.map((teamId) => ({
      queryKey: ["teamMembers", teamId],
      queryFn: () => getTeamMembers(teamId),
      enabled: !!teamId,
    })),
  });

  const data: Record<string, Awaited<ReturnType<typeof getTeamMembers>>> = {};
  teamIds.forEach((teamId, index) => {
    data[teamId] = queries[index]?.data ?? [];
  });

  const isLoading = queries.some((query) => query.isLoading);

  return { data, isLoading };
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
