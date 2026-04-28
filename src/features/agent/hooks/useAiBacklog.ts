import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AiSuggestionStatus, ApproveAiSuggestionRequest } from "@/features/agent/types/aiBacklog";
import {
  approveAiSuggestion,
  generateAiBacklog,
  getAiSuggestions,
  rejectAiSuggestion,
} from "@/features/agent/services/aiBacklogService";

export const useAiSuggestions = (projectId?: string, status?: AiSuggestionStatus) => {
  return useQuery({
    queryKey: ["aiSuggestions", projectId, status ?? "ALL"],
    queryFn: () => getAiSuggestions(projectId!, status),
    enabled: !!projectId,
  });
};

export const useGenerateAiBacklog = () => {
  return useMutation({
    mutationFn: ({ projectId, maxHours }: { projectId: string; maxHours: number }) =>
      generateAiBacklog(projectId, { maxHours }),
  });
};

export const useApproveAiSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ aiTaskId, payload }: { aiTaskId: string; payload: ApproveAiSuggestionRequest }) =>
      approveAiSuggestion(aiTaskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSuggestions"] });
    },
  });
};

export const useRejectAiSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aiTaskId: string) => rejectAiSuggestion(aiTaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSuggestions"] });
    },
  });
};
